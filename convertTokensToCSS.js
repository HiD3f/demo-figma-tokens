const fs = require('fs');
const path = require('path');

// Read the JSON file
const tokensFilePath = path.join(__dirname, 'tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));

// Function to convert RGB to CSS color string
const rgbToCss = ({ r, g, b, a }) => `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;

// Generate CSS custom properties
let cssContent = ':root {\n';

const variables = tokens.variables.map(variable => {
  const { name, resolvedValuesByMode } = variable;
  const color = resolvedValuesByMode['82:0'].resolvedValue;
  return `  --${name.replace(/\//g, '-')}: ${rgbToCss(color)};`;
});

// Sort variables alphabetically
variables.sort();

// Add sorted variables to cssContent
cssContent += variables.join('\n');
cssContent += '\n}\n';

// Write the CSS content to a file
const cssFilePath = path.join(__dirname, 'tokens.css');
fs.writeFileSync(cssFilePath, cssContent, 'utf8');

console.log('CSS file generated successfully:', cssFilePath);
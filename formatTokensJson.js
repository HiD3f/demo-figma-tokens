const fs = require('fs');
const path = require('path');

// Read the JSON file
const tokensFilePath = path.join(__dirname, 'tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));

// Format the JSON with indentation
const formattedJson = JSON.stringify(tokens, null, 2);

// Ensure the /dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Write the formatted JSON to a file in /dist
const formattedJsonFilePath = path.join(distDir, 'tokens.json');
fs.writeFileSync(formattedJsonFilePath, formattedJson, 'utf8');

console.log('Formatted JSON file generated successfully:', formattedJsonFilePath);
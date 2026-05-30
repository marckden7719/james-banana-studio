const fs = require('fs');
const path = require('path');

const sourceIndex = path.join(__dirname, 'index.html');
const destIndex = path.join(__dirname, 'dist', 'client', 'index.html');
const sourcePublic = path.join(__dirname, 'public');
const destPublic = path.join(__dirname, 'dist', 'client');

try {
  console.log('Copying index.html to dist/client...');
  fs.copyFileSync(sourceIndex, destIndex);
  console.log('index.html copied successfully!');
} catch (err) {
  console.error('Error copying index.html:', err);
  process.exit(1);
}

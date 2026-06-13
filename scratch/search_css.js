const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const lines = cssContent.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('mystical-moon-svg') || line.includes('moon') || line.includes('lunar')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('nav-tab') || line.includes('tab-content') || line.includes('click') && line.includes('tab')) {
    console.log(`Line ${idx + 1}: ${line.trim().substring(0, 120)}`);
  }
});

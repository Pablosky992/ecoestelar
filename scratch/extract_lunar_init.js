const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startLine = -1;
let endLine = -1;
let braceCount = 0;
let inside = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('function initLunarTab')) {
    startLine = i;
    inside = true;
  }
  if (inside) {
    const openBraces = (lines[i].match(/{/g) || []).length;
    const closeBraces = (lines[i].match(/}/g) || []).length;
    braceCount += openBraces - closeBraces;
    if (braceCount === 0 && startLine !== i && (openBraces > 0 || closeBraces > 0 || lines[i].includes('}'))) {
      endLine = i;
      break;
    }
  }
}

if (startLine !== -1) {
  console.log(`Found initLunarTab at lines ${startLine + 1} to ${endLine + 1}:`);
  console.log(lines.slice(startLine, endLine + 1).join('\n'));
} else {
  console.log('Function initLunarTab not found');
}

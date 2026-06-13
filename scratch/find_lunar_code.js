const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\narci\\.gemini\\antigravity\\brain\\46ec3d88-1271-460c-9251-2f67e2324751\\.system_generated\\steps\\4740\\content.md';
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let found = false;
  lines.forEach((line, idx) => {
    if (line.includes('initLunarTab') || line.includes('lunar-hem') || line.includes('searchDateBtn')) {
      console.log(`${idx + 1}: ${line}`);
      found = true;
    }
  });
  if (!found) {
    console.log('No matches found.');
  }
} else {
  console.log('File does not exist:', filePath);
}

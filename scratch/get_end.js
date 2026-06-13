const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);
console.log(lines.slice(lines.length - 60).join('\n'));

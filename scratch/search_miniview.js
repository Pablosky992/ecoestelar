const fs = require('fs');
const path = require('path');

const code = fs.readFileSync('app.js', 'utf8');
code.split('\n').forEach((line, idx) => {
  if (line.includes('card-mini-view')) {
    console.log(`${idx+1}: ${line.trim()}`);
  }
});

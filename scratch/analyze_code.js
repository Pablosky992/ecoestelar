const fs = require('fs');

const content = fs.readFileSync('style.css', 'utf8');
const lines = content.split('\n');

console.log("=== style.css: Searching for grimorio styles ===");
lines.forEach((line, idx) => {
  if (line.includes('.grimorio-') || line.includes('grimorio-')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});

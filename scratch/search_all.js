const fs = require('fs');
const path = require('path');

const files = ['index.html', 'app.js', 'style.css', 'tarotDb.js'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const code = fs.readFileSync(f, 'utf8');
    code.split('\n').forEach((line, idx) => {
      if (line.includes('card-title-box') || line.includes('card-name-label')) {
        console.log(`${f}:${idx+1} -> ${line.trim()}`);
      }
    });
  }
});

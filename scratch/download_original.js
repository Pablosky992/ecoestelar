const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://raw.githubusercontent.com/Pablosky992/ecoestelar/main/app.js';
const dest = path.join(__dirname, 'original_app.js');

console.log('Downloading original app.js...');
https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync(dest, data, 'utf8');
    console.log('Downloaded successfully. Saved to scratch/original_app.js');
    
    // Now inspect around initLunarTab
    const lines = data.split('\n');
    let startIdx = -1;
    lines.forEach((line, idx) => {
      if (line.includes('function initLunarTab')) {
        startIdx = idx;
      }
    });
    
    if (startIdx !== -1) {
      console.log('Found initLunarTab in original at line', startIdx + 1);
      for (let i = startIdx - 5; i < startIdx + 100; i++) {
        if (lines[i] !== undefined) {
          console.log(`${i + 1}: ${lines[i]}`);
        }
      }
    } else {
      console.log('initLunarTab not found in original file.');
    }
  });
}).on('error', (err) => {
  console.error('Error downloading:', err);
});

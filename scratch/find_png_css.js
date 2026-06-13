const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\narci\\Desktop\\antigravity\\tarot\\style.css';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
    if (line.includes('.png')) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});

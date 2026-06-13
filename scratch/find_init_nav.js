const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\narci\\Desktop\\antigravity\\tarot\\app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
    if (line.includes('initTabNavigation')) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});

const fs = require('fs');
const path = require('path');

const files = ['index.html', 'app.js'];

files.forEach(file => {
    const filePath = path.join('c:\\Users\\narci\\Desktop\\antigravity\\tarot', file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('.png')) {
                console.log(`${file}:${idx + 1}: ${line.trim()}`);
            }
        });
    }
});

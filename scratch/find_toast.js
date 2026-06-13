const fs = require('fs');
const path = require('path');

const files = ['app.js', 'index.html', 'style.css'];
const search = 'portapapeles';

files.forEach(file => {
    const filePath = path.join('c:\\Users\\narci\\Desktop\\antigravity\\tarot', file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes(search)) {
                console.log(`${file}:${idx + 1}: ${line.trim()}`);
            }
        });
    }
});

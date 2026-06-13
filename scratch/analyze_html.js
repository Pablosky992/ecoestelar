const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\narci\\Desktop\\antigravity\\tarot\\index.html', 'utf8');
const lines = content.split('\n');

const ids = [
    'oracle-tab-content',
    'daily-tab-content',
    'horoscope-tab-content',
    'lunar-tab-content',
    'numerology-tab-content',
    'book-tab-content'
];

ids.forEach(id => {
    let start = -1;
    let end = -1;
    let openDivs = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes(`id="${id}"`)) {
            start = i + 1;
            openDivs = 1;
            continue;
        }
        if (start !== -1) {
            // Count open and close div tags
            const matchesOpen = line.match(/<div/g);
            const matchesClose = line.match(/<\/div>/g);
            if (matchesOpen) openDivs += matchesOpen.length;
            if (matchesClose) openDivs -= matchesClose.length;
            
            if (openDivs <= 0) {
                end = i + 1;
                break;
            }
        }
    }
    
    console.log(`${id}: lines ${start} to ${end}`);
});

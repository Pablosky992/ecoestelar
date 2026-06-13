const fs = require('fs');

const content = fs.readFileSync('c:\\Users\\narci\\Desktop\\antigravity\\tarot\\app.js', 'utf8');
const lines = content.split('\n');

const terms = ['renderLunarTabDetails', 'initTarotBook', 'initHoroscope', 'initNumerology', 'initOnboarding', 'initAstralSettings'];

terms.forEach(term => {
    lines.forEach((line, idx) => {
        if (line.includes(term) && !line.includes('function ' + term)) {
            console.log(`${term} called on line ${idx + 1}: ${line.trim()}`);
        }
    });
});

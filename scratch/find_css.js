const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../style.css');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const keywords = ['.card-wrapper', '.card-inner', '.tapete', '.cards-board', '.lunar-image-gallery', '.lunar-image-card', '.moon-phase-widget'];

lines.forEach((line, idx) => {
  if (keywords.some(kw => line.includes(kw))) {
    console.log(`Line ${idx + 1}: ${line.trim().substring(0, 120)}`);
  }
});

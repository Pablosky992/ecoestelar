const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app.js');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const keywords = ['moon-icon', 'moon-phase', 'logo_luna', 'luna_', 'card-img', 'card_back', 'assets/', 'luna_creciente', 'luna_llena'];

lines.forEach((line, idx) => {
  if (keywords.some(kw => line.includes(kw))) {
    console.log(`Line ${idx + 1}: ${line.trim().substring(0, 120)}`);
  }
});

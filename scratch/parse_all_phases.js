const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../scratch/test_all_phases.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const cards = htmlContent.split('<div class="card">');
cards.shift(); // remove header

cards.forEach(card => {
  const phaseMatch = card.match(/<h3>Phase: (.*?)<\/h3>/);
  const nameMatch = card.match(/<p>(.*?)<\/p>/);
  const pathMatch = card.match(/<path d="([^"]*?)"/);
  
  if (phaseMatch && nameMatch) {
    const phase = phaseMatch[1];
    const name = nameMatch[1];
    const pathVal = pathMatch ? pathMatch[1].replace(/\s+/g, ' ') : 'No path';
    console.log(`Phase: ${phase}, Name: ${name}, Path: ${pathVal}`);
  }
});

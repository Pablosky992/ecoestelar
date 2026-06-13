const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../scratch/test_all_phases.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

const regex = /<h3>Phase: (.*?)<\/h3>[\s\S]*?<p>(.*?)<\/p>[\s\S]*?<path d="([^"]*?)"/g;
let match;
while ((match = regex.exec(htmlContent)) !== null) {
  console.log(`Phase: ${match[1]}, Name: ${match[2]}, Path: ${match[3].replace(/\s+/g, ' ')}`);
}

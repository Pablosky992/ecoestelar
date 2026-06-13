const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'carta-del-dia.html',
  'horoscopo.html',
  'fase-lunar.html',
  'numerologia.html',
  'grimorio.html'
];

console.log('Validating pages script links and structure...');
let allValid = true;

pages.forEach(page => {
  const pagePath = path.join(__dirname, '../', page);
  if (!fs.existsSync(pagePath)) {
    console.error(`Error: Page ${page} does not exist at ${pagePath}`);
    allValid = false;
    return;
  }
  
  const content = fs.readFileSync(pagePath, 'utf8');
  
  // Check if tarotDb.js and app.js are linked
  const hasTarotDb = content.includes('src="tarotDb.js"') || content.includes('src=\'tarotDb.js\'');
  const hasApp = content.includes('src="app.js"') || content.includes('src=\'app.js\'');
  const hasCss = content.includes('href="style.css"') || content.includes('href=\'style.css\'');
  
  console.log(`Page: ${page}`);
  console.log(`  - Linked tarotDb.js: ${hasTarotDb ? 'YES' : 'NO'}`);
  console.log(`  - Linked app.js: ${hasApp ? 'YES' : 'NO'}`);
  console.log(`  - Linked style.css: ${hasCss ? 'YES' : 'NO'}`);
  
  if (!hasTarotDb || !hasApp || !hasCss) {
    allValid = false;
  }
});

if (allValid) {
  console.log('SUCCESS: All 6 static pages exist and have standard assets correctly linked.');
} else {
  console.error('FAILURE: Some page assets or link configurations are missing!');
}

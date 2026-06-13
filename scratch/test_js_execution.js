const fs = require('fs');
const path = require('path');

let jsdom;
try {
  jsdom = require('jsdom');
} catch (e) {
  console.log('JSDOM not installed, skipping headless execution test.');
  process.exit(0);
}

const { JSDOM } = jsdom;
const pages = [
  'index.html',
  'carta-del-dia.html',
  'horoscopo.html',
  'fase-lunar.html',
  'numerologia.html',
  'grimorio.html'
];

let hasErrors = false;

// Load files
const tarotDbCode = fs.readFileSync(path.join(__dirname, '../tarotDb.js'), 'utf8');
const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

pages.forEach(page => {
  const pagePath = path.join(__dirname, '../', page);
  const html = fs.readFileSync(pagePath, 'utf8');
  
  console.log(`\nTesting execution on page: ${page}`);
  
  // Setup JSDOM
  const virtualConsole = new JSDOM.VirtualConsole();
  virtualConsole.on("error", (err) => {
    console.error(`  Console Error on ${page}:`, err.message);
    hasErrors = true;
  });
  virtualConsole.on("jsdomError", (err) => {
    console.error(`  JSDOM Error on ${page}:`, err.message);
    hasErrors = true;
  });
  
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    virtualConsole
  });
  
  // Inject scripts
  try {
    dom.window.eval(tarotDbCode);
    dom.window.eval(appCode);
    console.log(`  - Executed scripts successfully without errors.`);
  } catch (err) {
    console.error(`  - Executed script threw error on ${page}:`, err);
    hasErrors = true;
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log('\nSUCCESS: All pages executed without any console/JSDOM runtime errors.');
  process.exit(0);
}

const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

const getMoonSvgMatch = appJsCode.match(/function getMoonSvg[\s\S]*?^}/m);
eval(getMoonSvgMatch[0]);

console.log("--- Checking Waning Phases ---");
for (let ph = 0.50; ph <= 1.00; ph += 0.05) {
  const phFixed = ph.toFixed(2);
  const svg = getMoonSvg(ph, 'north');
  const pathMatch = svg.match(/<path d="([\s\S]*?)"/);
  
  // Calculate rx and flags in same way
  const isGibbous = ph > 0.25 && ph < 0.75;
  const rx = 48 * Math.abs(1 - 4 * Math.abs(ph - 0.5));
  const lightOnRight = false; // Waning in north
  const sweepOuter = 0;
  const sweepInner = isGibbous ? (lightOnRight ? 1 : 0) : (lightOnRight ? 0 : 1);

  console.log(`Phase: ${phFixed}`);
  console.log(`  isGibbous: ${isGibbous}`);
  console.log(`  rx: ${rx.toFixed(2)}`);
  console.log(`  sweepOuter: ${sweepOuter}, sweepInner: ${sweepInner}`);
  if (pathMatch) {
    console.log(`  Path: ${pathMatch[1].replace(/\s+/g, ' ')}`);
  } else {
    console.log(`  Path: (Full/New Moon)`);
  }
}

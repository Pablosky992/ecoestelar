const fs = require('fs');
const path = require('path');

// Mock DOM
global.localStorage = {
  getItem: () => 'north'
};

const appJsPath = path.join(__dirname, '../app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

// Extract getMoonSvg function
const getMoonSvgMatch = appJsCode.match(/function getMoonSvg[\s\S]*?^}/m);
if (!getMoonSvgMatch) {
  console.error("Could not find getMoonSvg in app.js");
  process.exit(1);
}

// Eval getMoonSvg
eval(getMoonSvgMatch[0]);

// Let's test getMoonSvg for various phases
const phases = [
  { name: "New Moon", phase: 0 },
  { name: "15% Waxing Crescent", phase: 0.075 }, // Waxing crescent
  { name: "First Quarter", phase: 0.25 },
  { name: "Gibbous Waxing", phase: 0.35 },
  { name: "Full Moon", phase: 0.5 },
  { name: "Gibbous Waning", phase: 0.65 },
  { name: "Last Quarter", phase: 0.75 },
  { name: "15% Waning Crescent", phase: 0.925 }  // Waning crescent (like today)
];

phases.forEach(p => {
  const svg = getMoonSvg(p.phase, 'north');
  // Extract the path element
  const pathMatch = svg.match(/<path d="([\s\S]*?)"/);
  if (pathMatch) {
    console.log(`${p.name} (phase ${p.phase}):`);
    console.log(`  Path: ${pathMatch[1].replace(/\s+/g, ' ')}`);
  } else {
    console.log(`${p.name} (phase ${p.phase}): No path found (likely new/full moon)`);
  }
});

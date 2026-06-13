const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

// Extract getMoonSvg and getMoonPhaseDetails functions
const getMoonSvgMatch = appJsCode.match(/function getMoonSvg[\s\S]*?^}/m);
const getMoonPhaseDetailsMatch = appJsCode.match(/function getMoonPhaseDetails[\s\S]*?^}/m);

if (!getMoonSvgMatch || !getMoonPhaseDetailsMatch) {
  console.error("Could not find functions in app.js");
  process.exit(1);
}

eval(getMoonSvgMatch[0]);
eval(getMoonPhaseDetailsMatch[0]);

let html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #080711; color: white; font-family: sans-serif; text-align: center; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 20px; }
    .card { background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); }
    .moon { width: 100px; height: 100px; margin: 0 auto; }
  </style>
</head>
<body>
  <h1>Test Moon Phases (North Hemisphere)</h1>
  <div class="grid">
`;

// Generate all 8 phases
for (let i = 0; i < 8; i++) {
  const phase = i / 8;
  const details = getMoonPhaseDetails(new Date(2019, 11, 26 + phase * 29.53)); // construct date for phase
  const svg = getMoonSvg(phase, 'north');
  html += `
    <div class="card">
      <h3>Phase: ${(phase * 100).toFixed(0)}% (${phase})</h3>
      <p>${details.phaseName}</p>
      <div class="moon">${svg}</div>
    </div>
  `;
}

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../scratch/test_all_phases.html'), html);
console.log("Generated scratch/test_all_phases.html");

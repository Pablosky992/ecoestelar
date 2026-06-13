const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

const getMoonPhaseDetailsMatch = appJsCode.match(/function getMoonPhaseDetails[\s\S]*?^}/m);
eval(getMoonPhaseDetailsMatch[0]);

console.log("--- June 2026 Moon Phase Calculations ---");
for (let d = 1; d <= 30; d++) {
  const date = new Date(2026, 5, d, 12, 0, 0); // June is month 5
  const details = getMoonPhaseDetails(date);
  const illumination = Math.round((details.phase <= 0.5 ? details.phase * 2 : (1 - details.phase) * 2) * 100);
  console.log(`Day ${d}: Phase=${details.phase.toFixed(4)}, Name=${details.phaseName}, Illum=${illumination}%`);
}

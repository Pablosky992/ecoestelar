const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

const getMoonPhaseDetailsMatch = appJsCode.match(/function getMoonPhaseDetails[\s\S]*?^}/m);
eval(getMoonPhaseDetailsMatch[0]);

const date = new Date(2026, 11, 6, 12, 0, 0); // December 6, 2026
const details = getMoonPhaseDetails(date);
const illumination = Math.round((details.phase <= 0.5 ? details.phase * 2 : (1 - details.phase) * 2) * 100);
console.log(`Date: ${date.toDateString()}`);
console.log(`Phase: ${details.phase.toFixed(4)}`);
console.log(`Name: ${details.phaseName}`);
console.log(`Illum: ${illumination}%`);

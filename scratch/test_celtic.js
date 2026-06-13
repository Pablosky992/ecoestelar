const fs = require('fs');
const path = require('path');

// Simulate the DOM and load app.js/style.css logic
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');

console.log("Analyzing Celtic Cross layout CSS rules...");
const celticRules = css.match(/\.layout-celtic[^}]*\}/g);
if (celticRules) {
  celticRules.forEach(rule => console.log(rule));
} else {
  console.log("No layout-celtic rules found!");
}

console.log("\nAnalyzing card-wrapper and card-inner CSS rules...");
const wrapperRules = css.match(/\.card-wrapper\s*\{[^}]*\}/g);
wrapperRules && wrapperRules.forEach(rule => console.log(rule));
const innerRules = css.match(/\.card-inner\s*\{[^}]*\}/g);
innerRules && innerRules.forEach(rule => console.log(rule));

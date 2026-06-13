const fs = require('fs');
const path = require('path');

const domDumpPath = path.join(__dirname, 'dom_dump.html');
if (!fs.existsSync(domDumpPath)) {
  console.error("DOM dump file does not exist!");
  process.exit(1);
}

const html = fs.readFileSync(domDumpPath, 'utf8');

// Find the cell for day 12
const cell12Idx = html.indexOf('<span class="lunar-cal-day-num">12</span>');
if (cell12Idx === -1) {
  console.error("Could not find day 12 cell in HTML");
  process.exit(1);
}

// Find the SVG inside this cell
const svgStart = html.indexOf('<svg', cell12Idx);
const svgEnd = html.indexOf('</svg>', svgStart);
if (svgStart === -1 || svgEnd === -1) {
  console.error("Could not find SVG inside day 12 cell");
  process.exit(1);
}

const svgContent = html.substring(svgStart, svgEnd + 6);
console.log("SVG for June 12 in calendar:");
console.log(svgContent);

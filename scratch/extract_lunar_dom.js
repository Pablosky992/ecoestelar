const fs = require('fs');
const path = require('path');

const domDumpPath = path.join(__dirname, 'dom_dump.html');
if (!fs.existsSync(domDumpPath)) {
  console.error("DOM dump file does not exist!");
  process.exit(1);
}

const html = fs.readFileSync(domDumpPath, 'utf8');

// Find <div class="lunar-tab-moon-svg-container" id="lunar-tab-emoji">...</div>
const startIdx = html.indexOf('id="lunar-tab-emoji"');
if (startIdx === -1) {
  console.error("Could not find id='lunar-tab-emoji' in DOM dump");
  process.exit(1);
}

// Let's find the closing tag of the div.
// It will contain the <svg>...</svg>
const svgStart = html.indexOf('<svg', startIdx);
const svgEnd = html.indexOf('</svg>', svgStart);
if (svgStart === -1 || svgEnd === -1) {
  console.error("Could not find SVG inside lunar-tab-emoji");
  process.exit(1);
}

const svgContent = html.substring(svgStart, svgEnd + 6);
console.log("SVG in DOM dump:");
console.log(svgContent);

// Let's also check the value of the date input to see what date was used
const dateInputIdx = html.indexOf('id="lunar-search-date"');
if (dateInputIdx !== -1) {
  const valueMatch = html.substring(dateInputIdx, dateInputIdx + 200).match(/value="([^"]+)"/);
  console.log("Date input value:", valueMatch ? valueMatch[1] : "not found");
}

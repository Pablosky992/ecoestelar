const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Mock localStorage and window
const dom = new JSDOM(htmlContent, { runScripts: "dangerously" });
const { window } = dom;
global.window = window;
global.document = window.document;
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

// Mock standard window attributes
global.navigator = window.navigator;

// Read app.js and tarotDb.js
const tarotDbCode = fs.readFileSync(path.join(__dirname, '../tarotDb.js'), 'utf8');
const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

// Evaluate them in global context
eval(tarotDbCode);
// Mock window.scrollIntoView since JSDOM doesn't support layout
window.Element.prototype.scrollIntoView = () => {};

eval(appCode);

// Trigger a Celtic Cross spread simulation
console.log("Simulating Celtic Cross spread deal...");
const select = document.getElementById('spread-select');
select.value = 'celtic10';

// Trigger change event
const event = new window.Event('change');
select.dispatchEvent(event);

// Check currentSpread size
console.log("Drawn cards size:", window.currentSpread ? window.currentSpread.length : 0);

// Print the HTML of the board
const board = document.getElementById('cards-board');
console.log("Board classes:", board.className);
console.log("Number of children in board:", board.children.length);

for (let i = 0; i < board.children.length; i++) {
  const child = board.children[i];
  console.log(`Child ${i + 1}: class="${child.className}" data-index="${child.getAttribute('data-index')}" style="${child.getAttribute('style')}" label="${child.querySelector('.placeholder-label').textContent.trim()}"`);
}

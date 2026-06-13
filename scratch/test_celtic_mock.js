const fs = require('fs');
const path = require('path');

// Mock a minimal browser DOM environment
const elements = {};
const mockElement = (tag, id = '') => {
  const el = {
    tagName: tag.toUpperCase(),
    id: id,
    className: '',
    value: 'test question',
    attributes: {},
    style: {
      setProperty: (prop, val) => { el.style[prop] = val; }
    },
    children: [],
    appendChild: (child) => { el.children.push(child); },
    setAttribute: (name, value) => { el.attributes[name] = value; },
    getAttribute: (name) => el.attributes[name] || '',
    classList: {
      add: (cls) => {
        const classes = el.className.split(' ').filter(Boolean);
        if (!classes.includes(cls)) {
          classes.push(cls);
          el.className = classes.join(' ');
        }
      },
      remove: (cls) => {
        const classes = el.className.split(' ').filter(Boolean);
        const idx = classes.indexOf(cls);
        if (idx !== -1) {
          classes.splice(idx, 1);
          el.className = classes.join(' ');
        }
      },
      contains: (cls) => el.className.split(' ').filter(Boolean).includes(cls)
    },
    querySelector: (sel) => {
      if (sel === '.card-inner') return el.children.find(c => c.className === 'card-inner');
      if (sel === '.placeholder-label') return el.children.find(c => c.className.includes('placeholder-label'));
      return null;
    },
    addEventListener: (event, cb) => {
      if (event === 'click') el.clickListener = cb;
    },
    getContext: () => ({
      clearRect: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {}
    }),
    focus: () => {},
    scrollIntoView: () => {}
  };
  return el;
};

let consultClickListener;

const document = {
  getElementById: (id) => {
    if (!elements[id]) {
      elements[id] = mockElement('div', id);
      if (id === 'consult-btn') {
        elements[id].addEventListener = (event, cb) => {
          if (event === 'click') consultClickListener = cb;
        };
      }
    }
    return elements[id];
  },
  createElement: (tag) => mockElement(tag),
  addEventListener: () => {},
  querySelector: (sel) => {
    if (sel === '.reading-table') return mockElement('div');
    return null;
  },
  querySelectorAll: () => []
};

const window = {
  addEventListener: () => {},
  Element: { prototype: {} }
};

global.document = document;
global.window = window;
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = clearTimeout;
global.MutationObserver = function() {
  return { observe: () => {}, disconnect: () => {} };
};

// Mock context variables
global.selectedCategory = 'general';
global.currentSpread = [];
global.totalCardsInSpread = 0;

// Read tarotDb.js and app.js
const tarotDbCode = fs.readFileSync(path.join(__dirname, '../tarotDb.js'), 'utf8');
let appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

// Evaluate tarotDb.js
eval(tarotDbCode);

// Mock drawCards since we want a controlled set of 10 cards
global.drawCards = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push({ id: i, isReversed: false });
  }
  return arr;
};

// Evaluate app.js logic (mocking some init functions)
appCode = appCode.replace(/initLunarTab\(\);/g, '');
appCode = appCode.replace(/initDailyExpressCard\(\);/g, '');
eval(appCode);

// Set spread selection value
elements['spread-select'].value = 'celtic10';

console.log("Simulating click on consult button...");
if (consultClickListener) {
  consultClickListener();
} else {
  console.log("Consult click listener not found!");
}

// Print the HTML of the board
const board = document.getElementById('cards-board');
console.log("Board classes:", board.className);
console.log("Number of children in board:", board.children.length);

for (let i = 0; i < board.children.length; i++) {
  const child = board.children[i];
  const label = child.querySelector('.placeholder-label');
  console.log(`Child ${i + 1}: class="${child.className}" label="${label ? label.textContent : 'none'}"`);
}

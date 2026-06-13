const fs = require('fs');
const path = require('path');

// Mock DOM elements and event listeners
const elements = {};
const listeners = {};

const getMockElement = (id) => {
  if (!elements[id]) {
    elements[id] = {
      value: '',
      textContent: '',
      innerHTML: '',
      style: {},
      classList: {
        add: (cls) => console.log(`[DOM CL] Element #${id} added class: ${cls}`),
        remove: (cls) => console.log(`[DOM CL] Element #${id} removed class: ${cls}`),
        contains: () => false
      },
      addEventListener: (event, callback) => {
        if (!listeners[id]) listeners[id] = {};
        listeners[id][event] = callback;
      },
      appendChild: (child) => {
        if (id === 'cards-board') {
          if (!elements[id].children) elements[id].children = [];
          elements[id].children.push(child);
        }
      },
      focus: () => {},
      scrollIntoView: () => {},
      getContext: () => ({
        fillRect: () => {},
        clearRect: () => {},
        beginPath: () => {},
        arc: () => {},
        fill: () => {},
        stroke: () => {},
        lineTo: () => {},
        moveTo: () => {}
      })
    };
  }
  return elements[id];
};

global.localStorage = {
  store: {
    'lunar_hemisphere': 'north',
    'user_zodiac_sign': 'leo'
  },
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); }
};

global.document = {
  getElementById: getMockElement,
  querySelectorAll: () => [],
  querySelector: (sel) => {
    if (sel.startsWith('#')) {
      return getMockElement(sel.substring(1));
    }
    return getMockElement(sel);
  },
  createElement: (type) => {
    const el = {
      className: '',
      style: {},
      setAttribute: () => {},
      innerHTML: '',
      listeners: {},
      classList: {
        classes: new Set(),
        add(cls) { this.classes.add(cls); },
        remove(cls) { this.classes.delete(cls); },
        contains(cls) { return this.classes.has(cls); }
      },
      addEventListener: (event, callback) => {
        el.listeners[event] = callback;
      },
      querySelector: (sel) => {
        return getMockElement(sel);
      }
    };
    return el;
  }
};

global.window = {
  addEventListener: () => {}
};

global.alert = (msg) => console.log(`[ALERT] ${msg}`);
global.requestAnimationFrame = () => {};

// Load tarotDb.js first
const dbJsPath = 'c:/Users/narci/Desktop/antigravity/tarot/tarotDb.js';
const dbJsCode = fs.readFileSync(dbJsPath, 'utf8');
eval(dbJsCode);

// Load app.js
const appJsPath = 'c:/Users/narci/Desktop/antigravity/tarot/app.js';
const appJsCode = fs.readFileSync(appJsPath, 'utf8');
eval(appJsCode);

console.log('Successfully loaded tarotDb and app.js');

// Helper to run a test consultation
function testSpread(spreadType, category = 'love', question = '¿Qué pasará con mi destino?') {
  console.log(`\n===================================`);
  console.log(`TESTING SPREAD: ${spreadType} (${category})`);
  console.log(`===================================`);
  
  // Set values on elements
  const spreadSelect = getMockElement('spread-select');
  spreadSelect.value = spreadType;
  
  const categorySelect = getMockElement('category-select');
  categorySelect.value = category;
  selectedCategory = category; // Set global variable used in app.js
  
  const questionInput = getMockElement('question-input');
  questionInput.value = question;

  // Clear previous children
  const cardsBoard = getMockElement('cards-board');
  cardsBoard.children = [];

  // Trigger consult click
  console.log('Clicking consult button...');
  if (listeners['consult-btn'] && listeners['consult-btn']['click']) {
    listeners['consult-btn']['click']();
  } else {
    throw new Error('Consult button listener not found!');
  }

  // Simulate flipping each card
  console.log(`Dealt ${cardsBoard.children.length} cards. Flipping them all...`);
  cardsBoard.children.forEach((cardEl, idx) => {
    if (cardEl.listeners['click']) {
      cardEl.listeners['click']();
    } else {
      console.warn(`Card ${idx} does not have a click listener!`);
    }
  });

  // Since showInterpretation uses setTimeout(..., 800), we need to trigger it.
  // We can call showInterpretation directly.
  console.log('Invoking showInterpretation directly (bypassing setTimeout)...');
  showInterpretation();

  // Get result and display it
  const destinyText = getMockElement('destiny-synthesis-text').innerHTML;
  console.log('\n--- Generated Synthesis Narrative ---');
  console.log(destinyText);
  console.log('-------------------------------------\n');

  if (!destinyText || destinyText.includes('undefined')) {
    console.error(`[FAIL] Synthesis for ${spreadType} is empty or has undefined references!`);
    process.exit(1);
  } else {
    console.log(`[PASS] Synthesis for ${spreadType} generated successfully.`);
  }
}

// Run test cases
testSpread('celtic10');
testSpread('mirror4');
testSpread('clarity4');

console.log('\nALL SPREADS TESTED SUCCESSFULLY!');

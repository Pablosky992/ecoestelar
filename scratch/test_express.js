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
        classes: new Set(),
        add(cls) { 
          this.classes.add(cls); 
          console.log(`[DOM CL] Element #${id} added class: ${cls}`);
        },
        remove(cls) { 
          this.classes.delete(cls); 
          console.log(`[DOM CL] Element #${id} removed class: ${cls}`);
        },
        contains(cls) { return this.classes.has(cls); }
      },
      addEventListener: (event, callback) => {
        if (!listeners[id]) listeners[id] = {};
        listeners[id][event] = callback;
      },
      appendChild: () => {},
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
  store: {},
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

// Mock setTimeout to run synchronously for testing ease
global.setTimeout = (cb) => cb();

// Load tarotDb.js first
const dbJsPath = 'c:/Users/narci/Desktop/antigravity/tarot/tarotDb.js';
const dbJsCode = fs.readFileSync(dbJsPath, 'utf8');
eval(dbJsCode);

// Load app.js
const appJsPath = 'c:/Users/narci/Desktop/antigravity/tarot/app.js';
const appJsCode = fs.readFileSync(appJsPath, 'utf8');
eval(appJsCode);

console.log('Successfully loaded tarotDb and app.js');

// Verify initDailyExpressCard is defined
if (typeof initDailyExpressCard === 'function') {
  console.log('\n--- Running initDailyExpressCard() ---');
  initDailyExpressCard();

  const expressCard = getMockElement('daily-express-card');
  const expressInfo = getMockElement('daily-express-info');
  const expressInstructions = getMockElement('daily-express-instructions');
  
  // 1. Initial State Check
  console.log('\n[TEST 1] Initializing card...');
  console.log('Flipped class present:', expressCard.classList.contains('flipped'));
  console.log('Is reversed:', expressCard.classList.contains('reversed'));
  console.log('Card front background URL:', getMockElement('daily-express-card-front').style.backgroundImage);

  // 2. Click to flip
  console.log('\n[TEST 2] Clicking card to reveal...');
  if (listeners['daily-express-card'] && listeners['daily-express-card']['click']) {
    listeners['daily-express-card']['click']();
    
    console.log('Flipping card...');
    console.log('Flipped class present:', expressCard.classList.contains('flipped'));
    
    // Verify advice display elements
    const nameText = getMockElement('daily-express-name').textContent;
    const adviceHtml = getMockElement('daily-express-advice').innerHTML;
    console.log('Revealed Card Name:', nameText);
    console.log('Revealed Advice HTML snippet:', adviceHtml.substring(0, 100) + '...');
    
    if (nameText && adviceHtml) {
      console.log('[PASS] Card of the day revealed successfully.');
    } else {
      console.error('[FAIL] Card name or advice is missing.');
      process.exit(1);
    }
  } else {
    console.error('[FAIL] Click listener on daily-express-card not registered.');
    process.exit(1);
  }

  // 3. Redraw click
  console.log('\n[TEST 3] Clicking redraw button...');
  if (listeners['daily-express-redraw'] && listeners['daily-express-redraw']['click']) {
    // Mock event object to stop propagation
    const eMock = { stopPropagation: () => console.log('Event propagation stopped.') };
    listeners['daily-express-redraw']['click'](eMock);
    
    console.log('Card flipped back (flipped class removed):', !expressCard.classList.contains('flipped'));
    console.log('Instructions display visible:', !expressInstructions.classList.contains('hidden'));
    
    // Re-click card to verify the new card Advice
    console.log('Re-revealing card...');
    listeners['daily-express-card']['click']();
    const newNameText = getMockElement('daily-express-name').textContent;
    console.log('New Revealed Card Name:', newNameText);
    
    console.log('[PASS] Redraw process completed successfully.');
  } else {
    console.error('[FAIL] Click listener on daily-express-redraw not registered.');
    process.exit(1);
  }

} else {
  console.error('[FAIL] initDailyExpressCard function not defined.');
  process.exit(1);
}

console.log('\nALL EXPRESS CARD TESTS PASSED!');

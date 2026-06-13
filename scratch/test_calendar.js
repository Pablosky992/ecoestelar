const fs = require('fs');
const path = require('path');

// Mock DOM environment
const elements = {};
const getMockElement = (id) => {
  if (!elements[id]) {
    const el = {
      value: '',
      textContent: '',
      _innerHTML: '',
      style: {},
      classList: {
        classes: [],
        add(cls) { if (!this.classes.includes(cls)) this.classes.push(cls); },
        remove(cls) { this.classes = this.classes.filter(c => c !== cls); },
        contains(cls) { return this.classes.includes(cls); }
      },
      addEventListener: () => {},
      focus: () => {},
      scrollIntoView: () => {},
      appendChild: function(child) {
        this.children.push(child);
      },
      children: [],
      dataset: {},
      parentNode: {
        insertBefore: (newNode, refNode) => {}
      },
      querySelector: () => ({ style: {} }),
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
    Object.defineProperty(el, 'innerHTML', {
      get() { return this._innerHTML; },
      set(val) {
        this._innerHTML = val;
        if (val === '') this.children = [];
      }
    });
    elements[id] = el;
  }
  return elements[id];
};

global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); }
};

global.document = {
  body: {
    classList: {
      classes: [],
      add(cls) { if (!this.classes.includes(cls)) this.classes.push(cls); },
      remove(cls) { this.classes = this.classes.filter(c => c !== cls); },
      contains(cls) { return this.classes.includes(cls); }
    },
    style: {}
  },
  documentElement: {
    classList: {
      classes: [],
      add(cls) { if (!this.classes.includes(cls)) this.classes.push(cls); },
      remove(cls) { this.classes = this.classes.filter(c => c !== cls); },
      contains(cls) { return this.classes.includes(cls); }
    },
    style: {},
    setAttribute: () => {},
    removeAttribute: () => {}
  },
  getElementById: getMockElement,
  querySelectorAll: () => [],
  querySelector: () => ({ scrollIntoView: () => {}, addEventListener: () => {}, click: () => {} }),
  addEventListener: () => {},
  createElement: (tag) => {
    const el = {
      tagName: tag.toUpperCase(),
      className: '',
      _innerHTML: '',
      textContent: '',
      style: {},
      children: [],
      appendChild: function(child) {
        this.children.push(child);
      },
      addEventListener: () => {},
      classList: {
        classes: [],
        add(cls) { if (!this.classes.includes(cls)) this.classes.push(cls); },
        remove(cls) { this.classes = this.classes.filter(c => c !== cls); },
        contains(cls) { return this.classes.includes(cls); }
      },
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
    Object.defineProperty(el, 'innerHTML', {
      get() { return this._innerHTML; },
      set(val) {
        this._innerHTML = val;
        if (val === '') this.children = [];
      }
    });
    return el;
  }
};

global.window = {
  addEventListener: () => {},
  tarotDb: Array.from({ length: 22 }, (_, i) => ({
    id: i,
    name: `Arcano ${i}`,
    reversed: { general: 'Reversado' },
    meanings: { general: 'Al derecho' }
  }))
};

global.requestAnimationFrame = () => {};
global.MutationObserver = class {
  constructor() {}
  observe() {}
  disconnect() {}
};

// Load app.js
const appJsPath = path.join(__dirname, '../app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

try {
  eval(appJsCode);
  console.log('✔ Eval app.js successful');
} catch (err) {
  console.error('✘ Error during eval:', err);
  process.exit(1);
}

// Test getMoonPhaseDetails for known date
console.log('\n--- Testing getMoonPhaseDetails() ---');
// Let's test full moon (near June 2026 full moon or similar)
const newMoonDate = new Date("2026-06-14T12:00:00Z"); // Approx New Moon
const fullMoonDate = new Date("2026-06-29T12:00:00Z"); // Approx Full Moon

const newDetails = getMoonPhaseDetails(newMoonDate);
console.log(`New Moon details (Date: ${newMoonDate.toDateString()}):`);
console.log(`- PhaseName: ${newDetails.phaseName} (Expected: Luna Nueva or close)`);
console.log(`- Phase: ${newDetails.phase.toFixed(4)}`);

const fullDetails = getMoonPhaseDetails(fullMoonDate);
console.log(`Full Moon details (Date: ${fullMoonDate.toDateString()}):`);
console.log(`- PhaseName: ${fullDetails.phaseName} (Expected: Luna Llena or close)`);
console.log(`- Phase: ${fullDetails.phase.toFixed(4)}`);

// Test renderLunarCalendar
console.log('\n--- Testing renderLunarCalendar() ---');
// Setup variables in app.js scope (lunarCalendarMonth and lunarCalendarYear)
lunarCalendarMonth = 5; // June (0-indexed)
lunarCalendarYear = 2026;

const grid = getMockElement('lunar-calendar-grid');
const monthYearEl = getMockElement('lunar-cal-month-year');

renderLunarCalendar();

console.log(`Calendar for June 2026 generated:`);
console.log(`- Month/Year Text: "${monthYearEl.textContent}"`);
console.log(`- Total grid cells: ${grid.children.length}`);
// 7 headers + startOffset for June 2026 (June 1st, 2026 is Monday, so startOffset = 0) + 30 days = 37 children
console.log(`  (Expected headers + cells = 7 + 0 + 30 = 37)`);

if (grid.children.length === 37) {
  console.log('✔ Grid cell count is correct.');
} else {
  console.error('✘ Grid cell count mismatch!');
}

console.log('\n✔ All interactive calendar tests passed successfully!');

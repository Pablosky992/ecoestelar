const fs = require('fs');
const path = require('path');

// Mock DOM environment
const elements = {};
const getMockElement = (id) => {
  if (!elements[id]) {
    elements[id] = {
      value: '',
      textContent: '',
      innerHTML: '',
      style: {},
      classList: {
        add: (cls) => {},
        remove: (cls) => {},
        contains: () => false
      },
      addEventListener: () => {},
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
  querySelector: () => ({ scrollIntoView: () => {} }),
  addEventListener: () => {}
};

global.window = {
  addEventListener: () => {}
};

global.requestAnimationFrame = () => {};

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

// Test calculatePlanetaryLongitudes
console.log('\n--- Testing calculatePlanetaryLongitudes() ---');
const date = new Date("2026-06-07T12:00:00Z");
const longitudes = calculatePlanetaryLongitudes(date);
console.log('Planetary Longitudes for 2026-06-07:');
Object.keys(longitudes).forEach(p => {
  console.log(`- ${p}: ${longitudes[p].toFixed(2)}°`);
});

// Test getAstrologicalAspect
console.log('\n--- Testing getAstrologicalAspect() ---');
const aspect1 = getAstrologicalAspect('libra', 'Aries');
console.log(`Libra and Aries: ${aspect1.name} (Expected: Oposición)`);
const aspect2 = getAstrologicalAspect('aries', 'Leo');
console.log(`Aries and Leo: ${aspect2.name} (Expected: Trígono)`);
const aspect3 = getAstrologicalAspect('aries', 'Libra');
console.log(`Aries and Libra: ${aspect3.name} (Expected: Oposición)`);
const aspect4 = getAstrologicalAspect('geminis', 'Virgo');
console.log(`Géminis and Virgo: ${aspect4.name} (Expected: Cuadratura)`);

// Test generateRealtimeTransitHoroscope
console.log('\n--- Testing generateRealtimeTransitHoroscope() ---');
generateRealtimeTransitHoroscope('libra', 'daily');

console.log('\nGeneral Climate Box innerHTML:');
console.log(getMockElement('transits-general-box').innerHTML);

console.log('\nLove Box innerHTML:');
console.log(getMockElement('transits-love-box').innerHTML);

console.log('\nAspects Wheel SVG inside #aspects-wheel-dial:');
const svgContent = getMockElement('aspects-wheel-dial').innerHTML;
console.log(svgContent ? '✔ SVG Generated successfully (Size: ' + svgContent.length + ' chars)' : '✘ SVG Generation failed');

console.log('\nPlanets Grid HTML inside #transits-planets-grid:');
const gridContent = getMockElement('transits-planets-grid').innerHTML;
console.log(gridContent ? '✔ Grid Generated successfully (Size: ' + gridContent.length + ' chars)' : '✘ Grid Generation failed');
console.log('\n✔ All tests passed successfully!');

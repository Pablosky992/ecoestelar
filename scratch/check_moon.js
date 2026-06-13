const knownNewMoon = new Date('2019-12-26T05:13:00Z').getTime();
const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;

const testDate = new Date(2026, 5, 12, 12, 0, 0); // June 12, 2026 (local noon)
const now = testDate.getTime();
const diff = now - knownNewMoon;
const cycles = diff / synodicMonth;
let phase = cycles - Math.floor(cycles);
if (phase < 0) phase += 1;

console.log("Date:", testDate.toDateString());
console.log("Phase:", phase);
console.log("Illumination percentage:", Math.round((phase <= 0.5 ? phase * 2 : (1 - phase) * 2) * 100));
const isWaxing = phase <= 0.5;
console.log("isWaxing:", isWaxing);
const hemisphere = 'north';
const lightOnRight = (hemisphere === 'north') ? isWaxing : !isWaxing;
console.log("lightOnRight:", lightOnRight);
const isGibbous = phase > 0.25 && phase < 0.75;
console.log("isGibbous:", isGibbous);
const sweepOuter = lightOnRight ? 1 : 0;
const sweepInner = isGibbous ? (lightOnRight ? 1 : 0) : (lightOnRight ? 0 : 1);
console.log("sweepOuter:", sweepOuter);
console.log("sweepInner:", sweepInner);

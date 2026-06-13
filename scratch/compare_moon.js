// Compare moon phase algorithms for June 2026
const MONTHS_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getMoonPhaseDetailsJD(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const A = Math.floor(y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (y + 4716));
  const F = Math.floor(30.6001 * (m + 1));
  const jd = C + day + E + F - 1524.5;
  
  const daysSinceNew = jd - 2451550.1;
  const newMoons = daysSinceNew / 29.530588853;
  return newMoons - Math.floor(newMoons);
}

function getMoonPhaseDetailsMS(date) {
  const knownNewMoon = new Date('2019-12-26T05:13:00Z').getTime();
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;
  
  const now = date.getTime();
  const diff = now - knownNewMoon;
  const cycles = diff / synodicMonth;
  let phase = cycles - Math.floor(cycles);
  if (phase < 0) phase += 1;
  return phase;
}

console.log("Día | Algoritmo JD | Algoritmo MS | Estado Real (Junio 2026)");
console.log("------------------------------------------------------------");

for (let d = 1; d <= 30; d++) {
  const dateOfCell = new Date(2026, 5, d, 12, 0, 0); // 12:00 local time
  const phaseJD = getMoonPhaseDetailsJD(dateOfCell);
  const phaseMS = getMoonPhaseDetailsMS(dateOfCell);
  
  let label = "";
  if (d === 7) label = "<- Cuarto Menguante (Real)";
  if (d === 15) label = "<- Luna Nueva (Real)";
  if (d === 22) label = "<- Cuarto Creciente (Real)";
  if (d === 29) label = "<- Luna Llena (Real)";
  
  console.log(`${d.toString().padStart(2, ' ')}  |  ${phaseJD.toFixed(4)}    |  ${phaseMS.toFixed(4)}    | ${label}`);
}

function getMoonPhaseDetails(date = new Date()) {
  const knownNewMoon = new Date('2019-12-26T05:13:00Z').getTime();
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000;
  
  const diff = date.getTime() - knownNewMoon;
  let age = (diff % synodicMonth) / (24 * 60 * 60 * 1000);
  if (age < 0) {
    age += 29.530588853;
  }
  
  const phase = age / 29.530588853;
  return { phase, age };
}

console.log('2026-06-12T12:00:00Z', getMoonPhaseDetails(new Date('2026-06-12T12:00:00Z')));

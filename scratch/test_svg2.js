const fs = require('fs');

function getMoonSvg(phase, hemisphere = 'north') {
  const uid = Math.random().toString(36).slice(2, 7);
  const isWaxing = phase <= 0.5;
  let lightOnRight = (hemisphere === 'north') ? isWaxing : !isWaxing;
  
  if (phase < 0.025 || phase > 0.975) {
    return `<svg viewBox="0 0 120 120" style="width:100px; height:100px;" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="48" fill="#1e1b3a"/></svg>`;
  }
  if (phase >= 0.475 && phase <= 0.525) {
    return `<svg viewBox="0 0 120 120" style="width:100px; height:100px;" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="48" fill="#ffffff"/></svg>`;
  }

  const sweepOuter = lightOnRight ? 1 : 0;
  const rx = 48 * Math.abs(1 - 4 * Math.abs(phase - 0.5));
  const safeRx = Math.max(0.5, rx);
  const isGibbous = phase > 0.25 && phase < 0.75;
  const sweepInner = isGibbous ? (lightOnRight ? 1 : 0) : (lightOnRight ? 0 : 1);
  
  return `<svg viewBox="0 0 120 120" style="width:100px; height:100px;" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="48" fill="#1e1b3a" />
    <g clip-path="url(#pm-clip-${uid})">
      <path d="M 60 12
               A 48 48 0 0 ${sweepOuter} 60 108
               A ${safeRx} 48 0 0 ${sweepInner} 60 12"
            fill="#ffffff"/>
    </g>
    <defs><clipPath id="pm-clip-${uid}"><circle cx="60" cy="60" r="48"/></clipPath></defs>
  </svg>`;
}

const html = `
<!DOCTYPE html>
<html>
<body style="background: black; color: white; display: flex; gap: 20px;">
  <div>
    <h3>13% phase (Waxing) 0.13</h3>
    ${getMoonSvg(0.13, 'north')}
  </div>
  <div>
    <h3>87% phase (Waning) 0.87</h3>
    ${getMoonSvg(0.87, 'north')}
  </div>
</body>
</html>
`;

fs.writeFileSync('scratch/test_svg2.html', html);

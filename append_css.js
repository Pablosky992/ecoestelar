const fs = require('fs');
let css = fs.readFileSync('style_old.css', 'utf8');
css += `
/* Reduced Motion / Energy Saver Mode */
body.reduced-motion .stars-container::after,
body.reduced-motion .twinkling {
  display: none !important;
  animation: none !important;
}

body.reduced-motion .logo {
  animation: none !important;
  filter: drop-shadow(0 0 12px rgba(229,193,88,0.45));
}

body.reduced-motion .consult-button::after {
  display: none !important;
  animation: none !important;
}

body.reduced-motion .glass-card:hover {
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 0 0 1px rgba(139, 92, 246, 0.06);
  border-color: rgba(212, 175, 55, 0.12);
}
`;
fs.writeFileSync('style.css', css);

const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Modify paths to parent directory for assets/JS/CSS
html = html.replace(/src="app\.js"/g, 'src="../app.js"');
html = html.replace(/src="tarotDb\.js"/g, 'src="../tarotDb.js"');
html = html.replace(/href="style\.css"/g, 'href="../style.css"');
html = html.replace(/src="assets\//g, 'src="../assets/');
html = html.replace(/url\('assets\//g, 'url(\'../assets/');

// Force active tab to lunar and hide onboarding modal using CSS
const customCss = `
  <style>
    #onboarding-modal { display: none !important; }
    .tab-content { display: none !important; }
    #lunar-tab-content { display: block !important; }
  </style>
`;
html = html.replace('</head>', `${customCss}</head>`);

// Make lunar tab nav item active
html = html.replace('class="nav-tab active" data-tab="oracle"', 'class="nav-tab" data-tab="oracle"');
html = html.replace('class="nav-tab" data-tab="lunar"', 'class="nav-tab active" data-tab="lunar"');

// Inject script to mock Date and run initialization for June 12, 2026
const injectScript = `
  <script>
    // Overwrite page initial state
    window.addEventListener('DOMContentLoaded', () => {
      // Set to June 12, 2026
      selectedLunarDate = new Date(2026, 5, 12, 12, 0, 0);
      lunarCalendarMonth = 5;
      lunarCalendarYear = 2026;
      
      const searchInput = document.getElementById('lunar-search-date');
      if (searchInput) {
        searchInput.value = '2026-06-12';
      }
      
      // Re-render
      if (typeof renderLunarTabDetails === 'function') {
        renderLunarTabDetails(selectedLunarDate);
      }
      if (typeof renderLunarCalendar === 'function') {
        renderLunarCalendar(5, 2026);
      }
    });
  </script>
`;
html = html.replace('</body>', `${injectScript}</body>`);

fs.writeFileSync('scratch/temp_index.html', html);
console.log("temp_index.html generated with mocked date June 12, 2026!");

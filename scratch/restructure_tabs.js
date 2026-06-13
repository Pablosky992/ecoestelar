const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update Tab Menu to add daily card tab
const originalNav = `<nav class="app-nav" aria-label="Navegación principal">
      <button type="button" class="nav-tab active" data-tab="oracle">
        <span class="tab-icon">🔮</span> El Oráculo
      </button>
      <button type="button" class="nav-tab" data-tab="horoscope">
        <span class="tab-icon">✨</span> Tu Horóscopo
      </button>`;

const newNav = `<nav class="app-nav" aria-label="Navegación principal">
      <button type="button" class="nav-tab active" data-tab="oracle">
        <span class="tab-icon">🔮</span> El Oráculo
      </button>
      <button type="button" class="nav-tab" data-tab="daily">
        <span class="tab-icon">🌟</span> Carta del Día
      </button>
      <button type="button" class="nav-tab" data-tab="horoscope">
        <span class="tab-icon">✨</span> Tu Horóscopo
      </button>`;

content = content.replace(originalNav, newNav);

// 2. Remove "Carta del Día Express" widget from "El Oráculo" tab
const widgetStart = '<!-- Carta del Día Express -->';
const startIndex = content.indexOf(widgetStart);

if (startIndex === -1) {
  console.error('Daily card express widget start not found!');
  process.exit(1);
}

const searchSub = content.substring(startIndex);
const classCardClose = '</div>\n      </section>'; // This is the close of the config-panel column
const relativeCloseIndex = searchSub.indexOf(classCardClose);

if (relativeCloseIndex === -1) {
  console.error('Daily card express widget end not found!');
  process.exit(1);
}

const endIndex = startIndex + relativeCloseIndex; // We keep the </section> closing tag of config-panel

// Slice it out
content = content.substring(0, startIndex) + content.substring(endIndex);

// 3. Add the new tab content daily-tab-content
// We can insert it right before book-tab-content or horoscope-tab-content
const insertBeforeMarker = '<!-- Pestaña 3: Tu Horóscopo (Astrología y Tarot) -->';
const insertIndex = content.indexOf(insertBeforeMarker);

if (insertIndex === -1) {
  console.error('Horoscope tab content marker not found!');
  process.exit(1);
}

const dailyTabHtml = `<!-- Pestaña 6: Carta del Día Express -->
    <div id="daily-tab-content" class="tab-content hidden">
      <div class="daily-card-tab-container" style="max-width: 700px; margin: 0 auto 3rem auto;">
        <div class="glass-card" style="padding: 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 2rem;">
          <div>
            <h2 class="panel-title" style="border: none; padding: 0; margin-bottom: 0.5rem; font-size: 1.8rem; text-align: center;">La Carta del Día</h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0; max-width: 500px; margin: 0 auto;">
              Revela tu Arcano de hoy. Recibe un consejo consistente basado en las energías cósmicas del día, o baraja de nuevo para consultar una vibración particular.
            </p>
          </div>

          <!-- El mazo interactivo de la carta diaria -->
          <div class="daily-express-layout" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; width: 100%;">
            <div class="daily-express-card-wrapper" style="perspective: 1000px; width: 170px; height: 280px; margin: 1.5rem 0;">
              <div class="card-wrapper daily-express-card" id="daily-express-card" style="width: 100%; height: 100%;">
                <div class="card-inner">
                  <div class="card-back"></div>
                  <div class="card-front" id="daily-express-card-front"></div>
                </div>
              </div>
            </div>

            <!-- Panel de Instrucciones -->
            <div id="daily-express-instructions" class="daily-express-instructions">
              <p style="font-size: 1.05rem; font-style: italic; color: var(--gold-color); animation: logo-moon-float 4s ease-in-out infinite; margin: 0;">Haz clic en la carta para revelarla</p>
            </div>

            <!-- Panel de Resultados (Oculto inicialmente) -->
            <div id="daily-express-info" class="daily-express-info hidden" style="width: 100%; text-align: center;">
              <h3 id="daily-express-name" class="gold" style="font-family: var(--font-serif); font-size: 1.6rem; letter-spacing: 0.05em; margin-bottom: 1.25rem;">El Sol</h3>
              <div class="narrative-box" id="daily-express-advice" style="background: rgba(8, 7, 17, 0.6); border-left: 4px solid var(--gold-color); padding: 1.75rem 2rem; border-radius: 0 16px 16px 0; text-align: left; line-height: 1.65; font-size: 0.98rem; color: var(--text-main); margin-bottom: 2rem;">
                <!-- El consejo se inyectará aquí -->
              </div>
              
              <button type="button" class="shuffle-button daily-express-redraw" id="daily-express-redraw" style="padding: 0.75rem 2.5rem; font-size: 0.95rem;">
                Obtener otra carta del mazo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    `;

const finalContent = content.substring(0, insertIndex) + dailyTabHtml + content.substring(insertIndex);
fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('HTML restructured successfully!');

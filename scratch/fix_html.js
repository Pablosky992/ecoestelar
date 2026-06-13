const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(filePath, 'utf8');

// We want to find the text starting from 'lunar-transit-personal-box' style and ending before book-tab-content
const startMarker = '<div class="narrative-box" id="lunar-transit-personal-box" style="margin-top: 0.5rem; background: rgba(8, 7,';
const endMarker = '<!-- Pestaña 2: El Libro del Tarot (Enciclopedia) -->';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const replacement = `<div class="narrative-box" id="lunar-transit-personal-box" style="margin-top: 0.5rem; background: rgba(8, 7, 17, 0.5); border-left: 3px solid var(--purple-color);">
                  Introduce tu signo zodiacal para ver la sintonía con la posición lunar de hoy.
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <!-- Galería Visual de Fases Lunares -->
      <section class="lunar-gallery-section" aria-label="Galería de fases lunares" style="margin-top: 2.5rem;">
        <div class="glass-card" style="padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="text-align: center;">
            <h3 class="section-title" style="margin-bottom: 0.5rem; border: none; padding: 0;">Las Fases de la Luna — Galería Mística</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin: 0; margin-bottom: 1.5rem;">Explora la energía única de cada fase lunar y su influencia en el mundo espiritual</p>
          </div>

          <div class="lunar-image-gallery">
            <!-- Luna Llena — Hero image -->
            <div class="lunar-image-card">
              <img src="assets/luna_hero_banner.png" alt="Luna Llena — Plenitud e intuición máxima" loading="lazy">
              <div class="lunar-image-overlay">
                <h4>🌕 Luna Llena — Plenitud e Intuición</h4>
                <p>El velo entre mundos se adelgaza. Tu intuición está en su punto máximo.</p>
              </div>
            </div>

            <!-- Luna Creciente -->
            <div class="lunar-image-card">
              <img src="assets/luna_creciente.png" alt="Luna Creciente — Acción e intención" loading="lazy">
              <div class="lunar-image-overlay">
                <h4>🌒 Luna Creciente</h4>
                <p>Momento de intención y acción. Siembra tus deseos.</p>
              </div>
            </div>

            <!-- Luna Nueva -->
            <div class="lunar-image-card">
              <img src="assets/luna_nueva.png" alt="Luna Nueva — Inicio y siembra" loading="lazy">
              <div class="lunar-image-overlay">
                <h4>🌑 Luna Nueva</h4>
                <p>Ciclo de introspección y nuevos comienzos místicos.</p>
              </div>
            </div>

            <!-- Cuarto Creciente -->
            <div class="lunar-image-card">
              <img src="assets/luna_cuarto.png" alt="Cuarto Creciente — Decisión y acción" loading="lazy">
              <div class="lunar-image-overlay">
                <h4>🌓 Cuarto Creciente</h4>
                <p>Supera obstáculos. El cosmos te reta a decidir.</p>
              </div>
            </div>

            <!-- Luna Menguante -->
            <div class="lunar-image-card">
              <img src="assets/luna_menguante.png" alt="Luna Menguante — Cierre y descanso" loading="lazy">
              <div class="lunar-image-overlay">
                <h4>🌖 Luna Menguante</h4>
                <p>Libera y sana. Cierra ciclos con gratitud.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    `;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('HTML fixed successfully!');

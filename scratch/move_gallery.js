const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove bottom gallery section
const bottomGalleryStart = '<!-- Galería Visual de Fases Lunares -->';
const bottomGalleryEnd = '</section>\n      </main>\n    </div>'; // Wait, let's look at the exact end tags

// Let's use index search to slice safely.
const startIndexToRemove = content.indexOf(bottomGalleryStart);
// Let's find the closing tag of section.lunar-gallery-section
const searchSub = content.substring(startIndexToRemove);
const sectionCloseTag = '</section>';
const endRelativeIndex = searchSub.indexOf(sectionCloseTag);
const endIndexToRemove = startIndexToRemove + endRelativeIndex + sectionCloseTag.length;

if (startIndexToRemove === -1 || endRelativeIndex === -1) {
  console.error('Bottom gallery section not found for removal!');
  process.exit(1);
}

// Slice it out
content = content.substring(0, startIndexToRemove) + content.substring(endIndexToRemove);

// 2. Insert sidebar gallery
// Let's find where to insert: inside config-panel for lunar-tab-content, after the lunar-quick-stats block.
const insertMarker = `<div class="lunar-quick-stats">
              <div class="lunar-stat-item">
                <span class="stat-icon">🌌</span>
                <div class="stat-content">
                  <span class="stat-label">Tránsito Zodíaco</span>
                  <span class="stat-value" id="lunar-tab-transit">Luna en -</span>
                </div>
              </div>
              <div class="lunar-stat-item">
                <span class="stat-icon">🛡️</span>
                <div class="stat-content">
                  <span class="stat-label">Ángel Regente</span>
                  <span class="stat-value">Gabriel</span>
                </div>
              </div>
            </div>
          </div>`; // This </div> closes the glass-card inside config-panel.

const insertIndex = content.indexOf(insertMarker);

if (insertIndex === -1) {
  console.error('Insert marker inside config-panel not found!');
  process.exit(1);
}

const endOfCardIndex = insertIndex + insertMarker.length;

const sidebarGalleryHtml = `

          <!-- Galería Visual de Fases Lunares (Compacta en el lateral) -->
          <div class="glass-card" style="margin-top: 1.5rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="text-align: center;">
              <h3 class="panel-title" style="margin-bottom: 0.25rem; font-size: 1.15rem; border: none; padding: 0;">Galería de Fases</h3>
              <p style="color: var(--text-muted); font-size: 0.78rem; margin: 0; margin-bottom: 0.5rem;">Haz clic en una fase para explorar su grimorio detallado.</p>
            </div>

            <div class="lunar-image-gallery sidebar-gallery">
              <!-- Luna Llena -->
              <div class="lunar-image-card" data-phase="full">
                <img src="assets/luna_llena.png" alt="Luna Llena — Plenitud e intuición máxima" loading="lazy">
                <div class="lunar-image-overlay">
                  <h4>🌕 Luna Llena</h4>
                  <p>Fase de plenitud espiritual, rituales de carga y máxima intuición.</p>
                </div>
              </div>

              <!-- Luna Creciente -->
              <div class="lunar-image-card" data-phase="crescent">
                <img src="assets/luna_creciente.png" alt="Luna Creciente — Acción e intención" loading="lazy">
                <div class="lunar-image-overlay">
                  <h4>🌒 Creciente</h4>
                  <p>Siembra de intenciones, visualización de metas y acción inicial.</p>
                </div>
              </div>

              <!-- Luna Nueva -->
              <div class="lunar-image-card" data-phase="new">
                <img src="assets/luna_nueva.png" alt="Luna Nueva — Inicio y siembra" loading="lazy">
                <div class="lunar-image-overlay">
                  <h4>🌑 Luna Nueva</h4>
                  <p>Ciclo de introspección, vacío y nuevos comienzos místicos.</p>
                </div>
              </div>

              <!-- Cuarto Creciente -->
              <div class="lunar-image-card" data-phase="quarter">
                <img src="assets/luna_cuarto.png" alt="Cuarto Creciente — Decisión y acción" loading="lazy">
                <div class="lunar-image-overlay">
                  <h4>🌓 Cuarto Crec.</h4>
                  <p>Toma de decisiones, superación de obstáculos y fuerza.</p>
                </div>
              </div>

              <!-- Luna Menguante -->
              <div class="lunar-image-card" data-phase="waning">
                <img src="assets/luna_menguante.png" alt="Luna Menguante — Cierre y descanso" loading="lazy">
                <div class="lunar-image-overlay">
                  <h4>🌖 Menguante</h4>
                  <p>Cierre de ciclos, liberación de ataduras y purificación.</p>
                </div>
              </div>
            </div>
          </div>`;

const finalContent = content.substring(0, endOfCardIndex) + sidebarGalleryHtml + content.substring(endOfCardIndex);
fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('HTML restructured successfully!');

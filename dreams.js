// Lógica del Buscador y Analizador de Sueños
// Eco Estelar — voz mística, empática y poética

const initDreams = () => {
  // Asegurarnos de que dreamDb está cargado
  if (!window.dreamDb) {
    console.error('La base de datos de sueños (dreamDb.js) no se cargó correctamente.');
    return;
  }

  // Elementos del DOM - Buscador Tradicional
  const searchInput = document.getElementById('dream-search-input');
  const clearSearchBtn = document.getElementById('dream-clear-btn');
  const categoryButtons = document.querySelectorAll('.dream-cat-btn');
  const dreamGrid = document.getElementById('dream-results-grid');
  const statusTitle = document.getElementById('dream-status-title');
  const statusDesc = document.getElementById('dream-status-desc');

  // Elementos del DOM - Modal
  const dreamModal = document.getElementById('dream-detail-modal');
  const dreamModalBody = document.getElementById('dream-modal-body');
  const closeDreamModalBtn = document.getElementById('close-dream-modal-btn');
  const dreamModalOverlay = document.getElementById('dream-modal-overlay');

  // Elementos del DOM - Selector de Modo
  const modeSearchBtn = document.getElementById('dream-mode-search-btn');
  const modeAnalyzeBtn = document.getElementById('dream-mode-analyze-btn');
  const searchModeContainer = document.getElementById('dream-search-mode-container');
  const analyzeModeContainer = document.getElementById('dream-analyze-mode-container');

  // Elementos del DOM - Analizador por Escrito
  const dreamTextarea = document.getElementById('dream-textarea');
  const dreamTextareaCount = document.getElementById('dream-textarea-count');
  const dreamSubmitAnalysis = document.getElementById('dream-submit-analysis');
  const dreamAnalysisResults = document.getElementById('dream-analysis-results');
  const dreamAnalysisText = document.getElementById('dream-analysis-text');
  const dreamDetectedGrid = document.getElementById('dream-detected-grid');
  const copyDreamAnalysisBtn = document.getElementById('copy-dream-analysis-btn');
  const shareDreamAnalysisBtn = document.getElementById('share-dream-analysis-btn');
  const resetDreamAnalysisBtn = document.getElementById('reset-dream-analysis-btn');
  const toast = document.getElementById('share-toast');
  const dreamPaginationContainer = document.getElementById('dream-pagination-container');

  // Estado del Buscador y Analizador
  let activeMode = 'search'; // 'search' o 'analyze'
  let currentSearchQuery = '';
  let currentCategory = 'populares';
  let searchDebounceTimeout = null;
  let detectedDreams = []; // Guarda los sueños detectados en el último análisis
  let currentPage = 1;
  const itemsPerPage = 22;

  // Inicializar todo
  function init() {
    // Cargar búsqueda desde la URL si existe el parámetro 'q'
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');
    if (queryParam) {
      currentSearchQuery = queryParam;
      if (searchInput) {
        searchInput.value = queryParam;
      }
    }

    renderDreams();
    toggleClearButton();

    // Eventos de selección de modo
    if (modeSearchBtn && modeAnalyzeBtn) {
      modeSearchBtn.addEventListener('click', () => switchMode('search'));
      modeAnalyzeBtn.addEventListener('click', () => switchMode('analyze'));
    }

    // Eventos de búsqueda tradicional
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => {
          currentSearchQuery = e.target.value;
          currentPage = 1;
          toggleClearButton();
          renderDreams();
        }, 200);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        currentPage = 1;
        toggleClearButton();
        renderDreams();
        searchInput.focus();
      });
    }

    // Eventos de categorías
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        currentPage = 1;
        renderDreams();
      });
    });

    // Eventos del Analizador Escrito
    if (dreamTextarea) {
      dreamTextarea.addEventListener('input', updateCharCount);
    }

    if (dreamSubmitAnalysis) {
      dreamSubmitAnalysis.addEventListener('click', analyzeWrittenDream);
    }

    if (copyDreamAnalysisBtn) {
      copyDreamAnalysisBtn.addEventListener('click', copyAnalysisToClipboard);
    }

    if (shareDreamAnalysisBtn) {
      shareDreamAnalysisBtn.addEventListener('click', shareAnalysis);
    }

    if (resetDreamAnalysisBtn) {
      resetDreamAnalysisBtn.addEventListener('click', resetAnalysis);
    }

    // Eventos del Modal
    if (closeDreamModalBtn) {
      closeDreamModalBtn.addEventListener('click', closeDreamDetails);
    }
    if (dreamModalOverlay) {
      dreamModalOverlay.addEventListener('click', closeDreamDetails);
    }

    // Cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dreamModal && !dreamModal.classList.contains('hidden')) {
        closeDreamDetails();
      }
    });
  }

  // Conmutación entre Buscador y Analizador
  function switchMode(mode) {
    activeMode = mode;

    if (mode === 'search') {
      // Activar botones de pestañas
      modeSearchBtn.classList.add('active');
      modeSearchBtn.setAttribute('aria-selected', 'true');
      modeAnalyzeBtn.classList.remove('active');
      modeAnalyzeBtn.setAttribute('aria-selected', 'false');

      // Conmutar contenedores del panel de control
      searchModeContainer.classList.remove('hidden');
      analyzeModeContainer.classList.add('hidden');

      // Conmutar vistas de resultados
      dreamGrid.classList.remove('hidden');
      dreamAnalysisResults.classList.add('hidden');

      // Restaurar cabecera de estado
      renderDreams();
    } else {
      // Activar botones de pestañas
      modeAnalyzeBtn.classList.add('active');
      modeAnalyzeBtn.setAttribute('aria-selected', 'true');
      modeSearchBtn.classList.remove('active');
      modeSearchBtn.setAttribute('aria-selected', 'false');

      // Conmutar contenedores del panel de control
      analyzeModeContainer.classList.remove('hidden');
      searchModeContainer.classList.add('hidden');

      // Si hay un análisis previo, mostrarlo
      if (detectedDreams.length > 0 || (dreamTextarea && dreamTextarea.value.trim().length >= 15 && !dreamAnalysisResults.classList.contains('hidden'))) {
        dreamGrid.classList.add('hidden');
        dreamAnalysisResults.classList.remove('hidden');
        if (statusTitle && statusDesc) {
          statusTitle.textContent = 'Interpretación Revelada';
          statusDesc.textContent = 'Mensajes tejidos a partir de los símbolos de tu relato.';
        }
      } else {
        // Estado limpio del analizador
        dreamGrid.classList.add('hidden');
        dreamAnalysisResults.classList.add('hidden');
        if (statusTitle && statusDesc) {
          statusTitle.textContent = 'El Analizador de Sueños';
          statusDesc.textContent = 'Describe tu visión en el panel izquierdo para revelar su mensaje oculto.';
        }
      }
    }
  }

  // Mostrar/Ocultar botón de limpiar búsqueda tradicional
  function toggleClearButton() {
    if (clearSearchBtn) {
      if (currentSearchQuery.length > 0) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
    }
  }

  // Normalizar texto para búsquedas (quitar tildes, diacríticos y dejar letras a-z y números)
  function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
      .replace(/ñ/g, '##n##')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/##n##/g, 'ñ')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿¡]/g, ' ') // Reemplazar puntuaciones por espacios
      .trim();
  }


  // Actualizar contador de caracteres
  function updateCharCount() {
    if (!dreamTextarea || !dreamTextareaCount) return;
    const len = dreamTextarea.value.length;
    dreamTextareaCount.textContent = `${len} caracteres ${len < 15 ? '/ mínimo 15' : ''}`;
    
    // Cambiar color de advertencia
    if (len < 15) {
      dreamTextareaCount.style.color = '#ef4444';
    } else {
      dreamTextareaCount.style.color = 'var(--text-muted)';
    }
  }

  // Stop words y palabras hipergenéricas que nunca deben disparar símbolos secundarios
  const genericWords = new Set([
    'agua', 'fuego', 'aire', 'tierra', 'casa', 'mar', 'sol', 'luna', 'persona', 'hombre', 
    'mujer', 'amigo', 'familia', 'camino', 'viaje', 'muerte', 'vida', 'cielo', 'noche', 
    'dia', 'luz', 'sueño', 'soñar', 'ver', 'mirar', 'estar', 'ser', 'ir', 'caminar',
    'correr', 'sentir', 'hablar', 'comer', 'beber', 'caer', 'volar', 'morir', 'nacer',
    'ojo', 'mano', 'pie', 'cabeza', 'cuerpo', 'puerta', 'ventana', 'habitacion', 'mesa',
    'dinero', 'oro', 'plata', 'blanco', 'negro', 'rojo', 'azul', 'verde', 'pequeño', 'grande'
  ]);

  // Comprobar coincidencia exacta de palabra con límites léxicos
  function matchesExactWord(normalizedText, word) {
    if (!word || word.length < 2) return false;
    const escaped = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp('(?:^|[^a-z0-9ñ])' + escaped + '(?:$|[^a-z0-9ñ])', 'i');
    return regex.test(normalizedText);
  }

  // Generador de variantes léxicas (plurales y conjugaciones verbales comunes)
  function getWordVariants(word) {
    const norm = normalizeText(word);
    const variants = new Set([norm]);

    // Plurales comunes
    if (norm.endsWith('es') && norm.length > 4) {
      variants.add(norm.slice(0, -2));
    } else if (norm.endsWith('s') && norm.length > 3) {
      variants.add(norm.slice(0, -1));
    }

    // Flexiones verbales en relatos de sueños
    if (norm === 'volar') {
      ['volaba', 'volar', 'volando', 'vuelo', 'volaban', 'vole', 'volamos'].forEach(v => variants.add(v));
    } else if (norm === 'caer' || norm === 'caida') {
      ['caer', 'caian', 'caia', 'caen', 'caida', 'caerme', 'cayeron', 'cayendo'].forEach(v => variants.add(v));
    } else if (norm === 'correr') {
      ['correr', 'corria', 'corrian', 'corriendo', 'corri'].forEach(v => variants.add(v));
    } else if (norm === 'nadar') {
      ['nadar', 'nadaba', 'nadaban', 'nadando', 'nade'].forEach(v => variants.add(v));
    } else if (norm === 'perseguir' || norm === 'persecucion') {
      ['perseguia', 'perseguian', 'perseguir', 'persiguen', 'persiguiendo', 'persecucion'].forEach(v => variants.add(v));
    } else if (norm === 'huir') {
      ['huir', 'huia', 'huian', 'huyendo', 'hui'].forEach(v => variants.add(v));
    } else if (norm === 'morder' || norm === 'mordedura') {
      ['morder', 'mordia', 'mordio', 'mordian', 'mordiendo', 'mordedura'].forEach(v => variants.add(v));
    } else if (norm === 'llorar') {
      ['llorar', 'lloraba', 'llorando', 'llore', 'lloraban'].forEach(v => variants.add(v));
    } else if (norm === 'morir' || norm === 'muerte') {
      ['morir', 'moria', 'muerto', 'muerta', 'morirse', 'fallecer'].forEach(v => variants.add(v));
    }

    return Array.from(variants);
  }

  // Analizar sueño escrito mediante algoritmo jerárquico de precisión y Oráculo con IA
  async function analyzeWrittenDream() {
    if (!dreamTextarea || !dreamTextareaCount) return;
    const rawText = dreamTextarea.value.trim();
    
    if (rawText.length < 15) {
      dreamTextareaCount.textContent = 'El relato es demasiado corto (mínimo 15 caracteres).';
      dreamTextareaCount.style.color = '#ef4444';
      dreamTextarea.focus();
      return;
    }

    const normalizedText = normalizeText(rawText);
    const claimedWords = new Set();
    const directMatches = [];

    // Paso 1: Coincidencias directas por Nombre del Símbolo (Máxima prioridad)
    window.dreamDb.forEach(dream => {
      const cleanName = normalizeText(dream.name);
      const subNames = cleanName.split(' o ');
      
      for (const sub of subNames) {
        const trimmed = sub.trim();
        const variants = getWordVariants(trimmed);
        
        for (const variant of variants) {
          if (matchesExactWord(normalizedText, variant)) {
            directMatches.push({
              dream,
              matchedWord: variant,
              priority: 100 + variant.length,
              matchType: 'direct'
            });
            claimedWords.add(variant);
            break;
          }
        }
      }
    });

    // Paso 2: Coincidencias por Palabras Clave secundarias (solo si no están reclamadas por nombres directos)
    const keywordMatches = [];
    window.dreamDb.forEach(dream => {
      if (directMatches.some(m => m.dream.id === dream.id)) return;

      if (dream.keywords && Array.isArray(dream.keywords)) {
        for (const kw of dream.keywords) {
          const cleanKw = normalizeText(kw);
          if (cleanKw.length < 4 || genericWords.has(cleanKw)) continue;
          if (claimedWords.has(cleanKw)) continue;

          const variants = getWordVariants(cleanKw);
          let matchedVariant = null;
          for (const variant of variants) {
            if (matchesExactWord(normalizedText, variant) && !claimedWords.has(variant)) {
              matchedVariant = variant;
              break;
            }
          }

          if (matchedVariant) {
            keywordMatches.push({
              dream,
              matchedWord: matchedVariant,
              priority: 50 + matchedVariant.length,
              matchType: 'keyword'
            });
            break;
          }
        }
      }
    });

    // Combinar y ordenar por relevancia
    const allMatches = [...directMatches, ...keywordMatches];
    allMatches.sort((a, b) => b.priority - a.priority);

    // Deduplicar variantes repetidas (ej. no meter 'Fuego sagrado' si ya está 'Fuego')
    detectedDreams = [];
    const seenRoots = new Set();

    for (const item of allMatches) {
      const d = item.dream;
      const cleanName = normalizeText(d.name);
      const root = cleanName.split(' ')[0];

      if (seenRoots.has(cleanName) || (cleanName.includes(' ') && seenRoots.has(root))) {
        continue;
      }

      seenRoots.add(cleanName);
      seenRoots.add(root);
      detectedDreams.push(d);

      if (detectedDreams.length >= 4) break; // Máximo 4 arquetipos principales para una lectura profunda y clara
    }

    // 1. Mostrar estado de carga místico con animación astral
    showDreamLoadingState();

    // 2. Intentar consultar al Oráculo con IA (Google Gemini API via Vercel Serverless)
    try {
      const payload = {
        dreamText: rawText,
        detectedSymbols: detectedDreams.map(d => ({
          name: d.name,
          category: d.category,
          meaning: d.meaning
        }))
      };

      const response = await fetch('/api/interpret-dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && data.analysisHtml) {
          renderAiAnalysisResults(data.analysisHtml);
          return;
        }
      }
    } catch (apiErr) {
      console.warn('Oráculo Serverless no disponible o en entorno local. Activando motor de respaldo:', apiErr.message);
    }

    // 3. Fallback: Si la API no está configurada o falla, activar motor local estructurado
    renderLocalAnalysisResults(rawText);
  }

  // Mostrar estado de carga cósmica mientras el Oráculo procesa el relato
  function showDreamLoadingState() {
    if (!dreamAnalysisResults || !dreamAnalysisText || !dreamDetectedGrid) return;

    dreamGrid.classList.add('hidden');
    dreamAnalysisResults.classList.remove('hidden');

    if (statusTitle && statusDesc) {
      statusTitle.textContent = 'Consultando al Oráculo Onírico...';
      statusDesc.textContent = 'Conectando las estrellas con las corrientes de tu inconsciente.';
    }

    dreamAnalysisText.innerHTML = `
      <div class="dream-loading-state">
        <div class="astral-pulse-spinner">🌌</div>
        <p style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--gold-color); margin-bottom: 0.4rem; letter-spacing: 0.04em;">
          ✦ Descifrando el Mensaje de tu Sueño ✦
        </p>
        <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 460px; margin: 0 auto; line-height: 1.6;">
          El oráculo está tejiendo los arquetipos, emociones y escenarios de tu visión bajo la sabiduría cósmica...
        </p>
      </div>
    `;

    dreamDetectedGrid.innerHTML = '';
    dreamDetectedGrid.parentElement.classList.add('hidden');

    // Desplazar suavemente a los resultados
    dreamAnalysisResults.scrollIntoView({ behavior: 'smooth' });
  }

  // Renderizar la interpretación enriquecida por la IA (Gemini)
  function renderAiAnalysisResults(analysisHtml) {
    if (!dreamAnalysisResults || !dreamAnalysisText || !dreamDetectedGrid) return;

    if (statusTitle && statusDesc) {
      statusTitle.textContent = 'Lectura Onírica Revelada';
      statusDesc.textContent = detectedDreams.length > 0 
        ? `Interpretación personalizada con ${detectedDreams.length} arquetipo${detectedDreams.length > 1 ? 's' : ''} cósmico${detectedDreams.length > 1 ? 's' : ''}.`
        : 'Interpretación arquetípica personalizada por el Oráculo de las Estrellas.';
    }

    dreamAnalysisText.innerHTML = analysisHtml;

    // Renderizar tarjetas interactivas de los símbolos detectados si existen
    if (detectedDreams.length > 0) {
      dreamDetectedGrid.parentElement.classList.remove('hidden');
      renderDetectedCards();
    } else {
      dreamDetectedGrid.parentElement.classList.add('hidden');
    }
  }

  // Renderizar la interpretación del motor local estructurado (Fallback seguro)
  function renderLocalAnalysisResults(rawText) {
    if (!dreamAnalysisResults || !dreamAnalysisText || !dreamDetectedGrid) return;

    if (detectedDreams.length === 0) {
      if (statusTitle && statusDesc) {
        statusTitle.textContent = 'El misterio permanece en la sombra...';
        statusDesc.textContent = 'No hemos logrado descifrar símbolos conocidos en tu relato.';
      }

      dreamAnalysisText.innerHTML = `
        <div class="dream-intro-synthesis" style="border-left-color: var(--text-muted);">
          <p><em>Las estrellas guardan un prudente silencio frente a tu relato...</em></p>
          <p>Tu inconsciente ha tejido una visión con códigos muy íntimos o abstractos. No hemos identificado correspondencias directas con nuestro glosario de 1054 símbolos en las palabras clave introducidas.</p>
          <p><strong>✦ Consejo del Oráculo:</strong> Intenta reescribir tu sueño mencionando con mayor concreción los elementos naturales (agua, fuego, árboles, mar), animales (perros, serpientes, aves), partes del cuerpo (dientes, manos), acciones concretas (volar, caer, huir) u objetos tangibles que recuerdes claramente.</p>
        </div>
      `;
      
      dreamDetectedGrid.innerHTML = '';
      dreamDetectedGrid.parentElement.classList.add('hidden');
      return;
    }

    // Símbolos detectados con éxito
    dreamDetectedGrid.parentElement.classList.remove('hidden');
    if (statusTitle && statusDesc) {
      statusTitle.textContent = 'Lectura Onírica Revelada';
      statusDesc.textContent = `Hemos identificado ${detectedDreams.length} arquetipo${detectedDreams.length > 1 ? 's' : ''} onírico${detectedDreams.length > 1 ? 's' : ''} clave en tu visión.`;
    }

    const total = detectedDreams.length;
    const symbolNames = detectedDreams.map(d => `<strong>${d.name}</strong>`);
    let analysisHtml = '';

    // 1. Síntesis Holística e Introducción Narrativa
    if (total === 1) {
      analysisHtml += `
        <div class="dream-intro-synthesis">
          <p style="font-size: 1.05rem; color: var(--gold-light); margin-bottom: 0.5rem; font-family: var(--font-serif);">
            ✦ <strong>Mensaje Primordial de tu Visión</strong> ✦
          </p>
          <p style="margin: 0; font-size: 0.95rem; color: var(--text-main);">
            Tu inconsciente ha proyectado con gran nitidez el arquetipo de ${symbolNames[0]}. Esta visión refleja un proceso interior decisivo en tu vida consciente, invitándote a integrar el significado de este símbolo como un espejo de tus emociones profundas y tu evolución personal.
          </p>
        </div>
      `;
    } else {
      const categories = detectedDreams.map(d => d.category);
      let thematicFocus = 'la integración de tus emociones y tu momento evolutivo';
      if (categories.includes('Animales') && categories.includes('Acciones')) {
        thematicFocus = 'la gestión de tus instintos, tus temores y la forma en que respondes a los desafíos';
      } else if (categories.includes('Naturaleza')) {
        thematicFocus = 'la purificación interior y el fluir de tus corrientes emocionales más profundas';
      } else if (categories.includes('Lugares') || categories.includes('Objetos')) {
        thematicFocus = 'la estructura de tu propia psique, tus recursos personales y la seguridad en tu camino';
      }

      analysisHtml += `
        <div class="dream-intro-synthesis">
          <p style="font-size: 1.05rem; color: var(--gold-light); margin-bottom: 0.5rem; font-family: var(--font-serif);">
            ✦ <strong>Síntesis del Inconsciente: ${detectedDreams.length} Fuerzas en Conexión</strong> ✦
          </p>
          <p style="margin: 0; font-size: 0.95rem; color: var(--text-main);">
            Tu relato entreteje la energía de ${symbolNames.slice(0, -1).join(', ')} y ${symbolNames[symbolNames.length - 1]}. La interacción entre estos símbolos revela un mensaje dirigido a <strong>${thematicFocus}</strong>. En lugar de elementos aislados, tu mente está combinando el escenario, la acción y los arquetipos para guiar tu despertar consciente.
          </p>
        </div>
      `;
    }

    // 2. Desglose Estructurado de Símbolos sin Mezclas ni Redundancias
    analysisHtml += `<div class="dream-symbols-breakdown">`;
    detectedDreams.forEach(dream => {
      const icon = getCategoryIcon(dream.category);
      analysisHtml += `
        <div class="dream-symbol-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <h4 style="font-family: var(--font-serif); color: var(--gold-color); margin: 0; font-size: 1.15rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>${icon}</span> ${dream.name}
            </h4>
            <span style="font-size: 0.75rem; background: rgba(229, 193, 88, 0.12); color: var(--gold-light); padding: 0.2rem 0.6rem; border-radius: 12px; border: 1px solid rgba(229, 193, 88, 0.25); text-transform: uppercase;">
              ${dream.category}
            </span>
          </div>
          <p style="font-size: 0.93rem; line-height: 1.6; color: rgba(243, 244, 246, 0.9); margin: 0;">
            ${dream.meaning}
          </p>
        </div>
      `;
    });
    analysisHtml += `</div>`;

    // 3. Consejo Astral y Alquimia Onírica
    analysisHtml += `
      <div class="dream-alquimia-box">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); margin: 0 0 0.5rem 0; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>🔮</span> Consejo de Integración y Alquimia Onírica
        </h4>
        <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main); margin: 0;">
          Recuerda que cada elemento del sueño es un aspecto de ti mismo/a. Pregúntate qué emoción predominaba durante la visión y cómo resuena con tus decisiones actuales de vigilia. Al integrar la sabiduría de estos arquetipos, transformas la incertidumbre nocturna en claridad y dirección para tu camino.
        </p>
      </div>
    `;

    dreamAnalysisText.innerHTML = analysisHtml;
    renderDetectedCards();
  }

  // Renderizar tarjetas interactivas de símbolos detectados
  function renderDetectedCards() {
    dreamDetectedGrid.innerHTML = '';
    detectedDreams.forEach(dream => {
      const card = document.createElement('article');
      card.className = 'dream-card glass-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Significado de ${dream.name}`);

      const shortDesc = dream.meaning.substring(0, 105) + '...';

      card.innerHTML = `
        <div class="dream-card-header">
          <span class="dream-card-cat">${dream.category}</span>
          <span class="dream-card-icon">${getCategoryIcon(dream.category)}</span>
        </div>
        <h3 class="dream-card-title">${dream.name}</h3>
        <p class="dream-card-preview">${shortDesc}</p>
        <button type="button" class="dream-card-btn">Explorar Símbolo ✦</button>
      `;

      const openAction = () => showDreamDetails(dream);
      card.addEventListener('click', openAction);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAction();
        }
      });

      dreamDetectedGrid.appendChild(card);
    });
  }

  // Copiar lectura al portapapeles
  function copyAnalysisToClipboard() {
    if (!dreamAnalysisText || detectedDreams.length === 0) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dreamAnalysisText.innerHTML;
    
    const paragraphs = tempDiv.querySelectorAll('p');
    let textToCopy = '✦ LECTURA DE SUEÑOS - ECO ESTELAR ✦\n\n';
    paragraphs.forEach(p => {
      textToCopy += p.textContent.trim() + '\n\n';
    });
    textToCopy += 'Consulta tu horóscopo, tarot y sueños en: https://www.ecoestelar.com/significado-suenos.html';

    navigator.clipboard.writeText(textToCopy).then(() => {
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    }).catch(err => {
      console.error('Error al copiar al portapapeles:', err);
    });
  }

  // Compartir lectura
  function shareAnalysis() {
    if (!dreamAnalysisText || detectedDreams.length === 0) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dreamAnalysisText.innerHTML;
    
    const paragraphs = tempDiv.querySelectorAll('p');
    let textToShare = '✦ LECTURA DE SUEÑOS - ECO ESTELAR ✦\n\n';
    paragraphs.forEach(p => {
      textToShare += p.textContent.trim() + '\n\n';
    });
    textToShare += 'Descifra tus sueños en: https://www.ecoestelar.com/significado-suenos.html';

    if (navigator.share && window.location.protocol !== 'file:') {
      navigator.share({
        title: 'Mi Lectura de Sueños - Eco Estelar',
        text: textToShare
      }).catch(err => {
        console.error('Error al compartir:', err);
        copyAnalysisToClipboard();
      });
    } else {
      copyAnalysisToClipboard();
    }
  }

  // Reiniciar el analizador
  function resetAnalysis() {
    if (dreamTextarea) {
      dreamTextarea.value = '';
      updateCharCount();
    }
    detectedDreams = [];
    if (dreamAnalysisResults) {
      dreamAnalysisResults.classList.add('hidden');
    }
    
    if (statusTitle && statusDesc) {
      statusTitle.textContent = 'El Analizador de Sueños';
      statusDesc.textContent = 'Describe tu visión en el panel izquierdo para revelar su mensaje oculto.';
    }
  }

  // Filtrar sueños (Buscador tradicional)
  function getFilteredDreams() {
    const queryNormalized = normalizeText(currentSearchQuery);

    const popularesNames = [
      'agua', 'araña', 'bebé', 'caer', 'casa', 'dientes', 'dinero', 
      'embarazo', 'examen', 'fuego', 'gato', 'lluvia', 'muerte', 
      'oro', 'oscuridad', 'perderse', 'perro', 'sangre', 'serpiente', 'viajar', 
      'volar', 'volcán'
    ];

    return window.dreamDb.filter(dream => {
      let matchesCategory = false;
      if (currentCategory === 'populares') {
        if (!queryNormalized) {
          matchesCategory = popularesNames.includes(dream.name.toLowerCase());
        } else {
          matchesCategory = true;
        }
      } else {
        matchesCategory = currentCategory === 'todos' || dream.category.toLowerCase() === currentCategory;
      }

      if (!matchesCategory) return false;

      if (!queryNormalized) return true;

      const nameNormalized = normalizeText(dream.name);
      const categoryNormalized = normalizeText(dream.category);
      
      const matchesName = nameNormalized.includes(queryNormalized);
      const matchesCategoryText = categoryNormalized.includes(queryNormalized);
      const matchesKeywords = dream.keywords.some(keyword => 
        normalizeText(keyword).includes(queryNormalized)
      );

      return matchesName || matchesCategoryText || matchesKeywords;
    });
  }

  // Renderizar sueños filtrados (Buscador tradicional)
  function renderDreams() {
    if (!dreamGrid) return;
    if (activeMode !== 'search') return; // No renderizar buscador si no estamos en modo búsqueda

    const filtered = getFilteredDreams();
    dreamGrid.innerHTML = '';

    if (filtered.length === 0) {
      if (statusTitle && statusDesc) {
        statusTitle.textContent = 'El silencio no guarda respuesta...';
        statusDesc.textContent = 'Ningún símbolo coincide con tu búsqueda. Intenta con términos más generales (ej: mar, volar, fuego).';
      }
      dreamGrid.classList.add('hidden');
      if (dreamPaginationContainer) {
        dreamPaginationContainer.classList.add('hidden');
      }
      return;
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Asegurar que la página actual está en rango
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    if (statusTitle && statusDesc) {
      if (currentSearchQuery) {
        const count = filtered.length;
        statusTitle.textContent = `${count} símbolo${count > 1 ? 's' : ''} revelado${count > 1 ? 's' : ''}`;
        statusDesc.textContent = `Mostrando resultados para tu búsqueda astral. Página ${currentPage} de ${totalPages}.`;
      } else if (currentCategory === 'populares') {
        statusTitle.textContent = 'Los más buscados';
        statusDesc.textContent = 'Los símbolos oníricos más comunes y sus misterios revelados.';
      } else if (currentCategory === 'todos') {
        statusTitle.textContent = 'El Libro de la Noche';
        statusDesc.textContent = `Explora la interpretación mística de todos los símbolos. Página ${currentPage} de ${totalPages}.`;
      } else {
        const count = filtered.length;
        statusTitle.textContent = `${count} símbolo${count > 1 ? 's' : ''} revelado${count > 1 ? 's' : ''}`;
        statusDesc.textContent = `Mostrando símbolos de la categoría ${getCategoryName(currentCategory)}. Página ${currentPage} de ${totalPages}.`;
      }
    }

    dreamGrid.classList.remove('hidden');

    paginatedItems.forEach(dream => {
      const card = document.createElement('article');
      card.className = 'dream-card glass-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Significado de ${dream.name}`);

      const shortDesc = dream.meaning.substring(0, 105) + '...';

      card.innerHTML = `
        <div class="dream-card-header">
          <span class="dream-card-cat">${dream.category}</span>
          <span class="dream-card-icon">${getCategoryIcon(dream.category)}</span>
        </div>
        <h3 class="dream-card-title">${dream.name}</h3>
        <p class="dream-card-preview">${shortDesc}</p>
        <button type="button" class="dream-card-btn">Explorar Símbolo ✦</button>
      `;

      const openAction = () => showDreamDetails(dream);
      card.addEventListener('click', openAction);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openAction();
        }
      });

      dreamGrid.appendChild(card);
    });

    // Renderizar controles de paginación
    renderPagination(totalPages);
  }

  // Renderizar controles de paginación
  function renderPagination(totalPages) {
    if (!dreamPaginationContainer) return;
    dreamPaginationContainer.innerHTML = '';

    if (totalPages <= 1) {
      dreamPaginationContainer.classList.add('hidden');
      return;
    }
    dreamPaginationContainer.classList.remove('hidden');

    // Anterior
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '‹';
    prevBtn.setAttribute('aria-label', 'Página anterior');
    if (currentPage > 1) {
      prevBtn.addEventListener('click', () => {
        currentPage--;
        renderDreams();
        scrollToGridTop();
      });
    }
    dreamPaginationContainer.appendChild(prevBtn);

    // Determinar qué páginas mostrar (rango a los lados de la actual)
    const range = [];
    const delta = 2; // Número de páginas a mostrar a cada lado
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    let l;
    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          const numBtn = createPageBtn(l + 1);
          dreamPaginationContainer.appendChild(numBtn);
        } else if (i - l > 2) {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'pagination-ellipsis';
          ellipsis.textContent = '...';
          dreamPaginationContainer.appendChild(ellipsis);
        }
      }
      const numBtn = createPageBtn(i);
      dreamPaginationContainer.appendChild(numBtn);
      l = i;
    }

    // Siguiente
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = '›';
    nextBtn.setAttribute('aria-label', 'Página siguiente');
    if (currentPage < totalPages) {
      nextBtn.addEventListener('click', () => {
        currentPage++;
        renderDreams();
        scrollToGridTop();
      });
    }
    dreamPaginationContainer.appendChild(nextBtn);
  }

  function createPageBtn(pageNumber) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pagination-btn ${currentPage === pageNumber ? 'active' : ''}`;
    btn.textContent = pageNumber;
    btn.setAttribute('aria-label', `Ir a página ${pageNumber}`);
    if (currentPage !== pageNumber) {
      btn.addEventListener('click', () => {
        currentPage = pageNumber;
        renderDreams();
        scrollToGridTop();
      });
    }
    return btn;
  }

  function scrollToGridTop() {
    const target = document.getElementById('dream-status-title') || dreamGrid;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Obtener icono para la categoría
  function getCategoryIcon(category) {
    const icons = {
      'Naturaleza': '🌲',
      'Animales': '🦅',
      'Cuerpo y Salud': '🧘',
      'Acciones': '✨',
      'Lugares': '🏰',
      'Objetos': '🗝️',
      'Figuras y Personas': '👤'
    };
    return icons[category] || '💤';
  }


  // Obtener nombre formateado de la categoría
  function getCategoryName(category) {
    const names = {
      'populares': 'Los más buscados',
      'todos': 'Todos los Símbolos',
      'naturaleza': 'Naturaleza y Elementos',
      'animales': 'Animales',
      'cuerpo y salud': 'Cuerpo y Salud',
      'acciones': 'Acciones y Movimiento',
      'lugares': 'Lugares',
      'objetos': 'Objetos',
      'figuras y personas': 'Figuras y Personas'
    };
    return names[category] || category;
  }

  // Mostrar modal con detalles del sueño
  function showDreamDetails(dream) {
    if (!dreamModal || !dreamModalBody) return;

    const tagsHtml = dream.keywords.map(kw => `<span class="dream-tag">${kw}</span>`).join('');

    dreamModalBody.innerHTML = `
      <div class="lunar-modal-header-layout">
        <div class="lunar-modal-image-container flex-center" style="font-size: 3rem; background: rgba(229,193,88,0.06); border-radius: 50%; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
          ${getCategoryIcon(dream.category)}
        </div>
        <div class="lunar-modal-title-container">
          <h2 class="gold" style="margin: 0; font-family: var(--font-serif); font-size: 2rem; letter-spacing: 0.05em;">${dream.name}</h2>
          <p class="purple" style="margin: 0.25rem 0 0 0; font-size: 0.9rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em;">
            Categoría: ${dream.category}
          </p>
        </div>
      </div>
      
      <div class="mystical-divider" style="margin: 1.5rem 0;">
        <svg viewBox="0 0 100 8" fill="none" style="width: 100%; height: 8px;" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4H42M58 4H100" stroke="var(--border-color)" stroke-width="0.75" />
          <polygon points="50,0.5 51.5,3.5 55,3.5 52.5,5.5 54,8.5 50,6.8 46,8.5 47.5,5.5 45,3.5 48.5,3.5" fill="var(--gold-color)" />
        </svg>
      </div>

      <div class="dream-detail-meaning-box">
        <h4 class="gold" style="margin: 0 0 0.75rem 0; font-family: var(--font-serif); font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
          <span>💤</span> El Mensaje del Inconsciente
        </h4>
        <p style="line-height: 1.8; font-size: 1rem; color: var(--text-color); text-align: justify; margin: 0;">
          ${dream.meaning}
        </p>
      </div>

      <div class="dream-detail-keywords-box" style="margin-top: 1.75rem; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
        <h5 class="gold" style="margin: 0 0 0.75rem 0; font-family: var(--font-serif); font-size: 0.95rem;">Correspondencias y Afines:</h5>
        <div class="dream-tags-container" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${tagsHtml}
        </div>
      </div>
    `;

    dreamModal.classList.remove('hidden');
    dreamModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Cerrar modal
  function closeDreamDetails() {
    if (!dreamModal) return;
    dreamModal.classList.add('hidden');
    dreamModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Inicializar
  init();
};

if (document.readyState !== 'loading') {
  initDreams();
} else {
  document.addEventListener('DOMContentLoaded', initDreams);
}

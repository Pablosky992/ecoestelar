// Lógica del Buscador y Analizador de Sueños
// El Eco de las Estrellas — voz mística, empática y poética

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

  // Comprobar coincidencia exacta de palabra clave con límites (evita falsos positivos como "sol" en "soldado")
  function matchesKeyword(normalizedText, cleanKeyword) {
    // Escapar caracteres regex si los hay
    const escaped = cleanKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Coincidencia con límites de caracteres no alfanuméricos a-z0-9ñ
    const regex = new RegExp('(?:^|[^a-z0-9ñ])' + escaped + '(?:$|[^a-z0-9ñ])', 'i');
    return regex.test(normalizedText);
  }


  // Analizar sueño escrito
  function analyzeWrittenDream() {
    if (!dreamTextarea || !dreamTextareaCount) return;
    const rawText = dreamTextarea.value.trim();
    
    if (rawText.length < 15) {
      dreamTextareaCount.textContent = 'El relato es demasiado corto (mínimo 15 caracteres).';
      dreamTextareaCount.style.color = '#ef4444';
      dreamTextarea.focus();
      return;
    }

    const normalizedText = normalizeText(rawText);
    detectedDreams = [];

    // Buscar correspondencias en la base de datos de 1054 términos
    window.dreamDb.forEach(dream => {
      const cleanName = normalizeText(dream.name);
      
      // Comprobar coincidencia con el nombre del símbolo
      let matches = matchesKeyword(normalizedText, cleanName);

      // Si no coincide por nombre, comprobar palabras clave
      if (!matches && dream.keywords) {
        matches = dream.keywords.some(keyword => {
          const cleanKw = normalizeText(keyword);
          return matchesKeyword(normalizedText, cleanKw);
        });
      }

      if (matches) {
        detectedDreams.push(dream);
      }
    });

    // Renderizar resultados del análisis
    renderAnalysisResults(rawText);
  }

  // Renderizar la interpretación y las tarjetas detectadas
  function renderAnalysisResults(rawText) {
    if (!dreamAnalysisResults || !dreamAnalysisText || !dreamDetectedGrid) return;

    dreamGrid.classList.add('hidden');
    dreamAnalysisResults.classList.remove('hidden');

    if (detectedDreams.length === 0) {
      // No se detectaron símbolos
      if (statusTitle && statusDesc) {
        statusTitle.textContent = 'El misterio permanece en la sombra...';
        statusDesc.textContent = 'No hemos logrado descifrar símbolos conocidos en tu relato.';
      }

      dreamAnalysisText.innerHTML = `
        <p><em>Las estrellas guardan un prudente silencio frente a tu relato...</em></p>
        <p>Tu inconsciente ha tejido una visión con códigos muy personales o sutiles. No hemos logrado identificar correspondencias claras con nuestro glosario de 1054 símbolos en las palabras clave introducidas.</p>
        <p><strong>Consejo del Oráculo:</strong> Intenta reescribir tu sueño detallando con mayor precisión los elementos naturales (agua, fuego, árboles), animales (perros, arañas), partes del cuerpo (dientes, manos), acciones concretas (volar, caer, huir) u objetos específicos que recuerdes claramente.</p>
      `;
      
      dreamDetectedGrid.innerHTML = '';
      dreamDetectedGrid.parentElement.classList.add('hidden'); // Ocultar sección de grid
      return;
    }

    // Símbolos detectados
    dreamDetectedGrid.parentElement.classList.remove('hidden');
    if (statusTitle && statusDesc) {
      statusTitle.textContent = 'Lectura Onírica';
      statusDesc.textContent = `Hemos identificado ${detectedDreams.length} símbolo${detectedDreams.length > 1 ? 's' : ''} onírico${detectedDreams.length > 1 ? 's' : ''} clave.`;
    }

    // Generar la interpretación poética e hilada en español
    let analysisHtml = '';
    analysisHtml += `<p>El velo del sueño ha desvelado importantes mensajes para tu evolución álmica. Tu inconsciente te habla mediante <strong>${detectedDreams.length} energías fundamentales</strong>:</p>`;

    const total = detectedDreams.length;
    detectedDreams.forEach((dream, index) => {
      let transition = '';
      if (total === 1) {
        transition = `La presencia de <strong>${dream.name}</strong> en tu visión nos habla de `;
      } else if (index === 0) {
        transition = `La presencia primordial de <strong>${dream.name}</strong> en tu visión nos habla de `;
      } else if (index === total - 1) {
        const lastTransitions = [
          `Finalmente, el influjo de <strong>${dream.name}</strong> te advierte o aconseja que `,
          `Para concluir tu visión, <strong>${dream.name}</strong> te invita a reflexionar sobre el hecho de que `,
          `Como mensaje de cierre, la energía de <strong>${dream.name}</strong> revela que `,
          `Por último, el símbolo de <strong>${dream.name}</strong> corona tu sueño indicando que `,
          `Como epílogo de tu viaje onírico, <strong>${dream.name}</strong> te sugiere que `
        ];
        // Seleccionamos uno aleatorio o basado en algún hash simple (aquí aleatorio)
        transition = lastTransitions[Math.floor(Math.random() * lastTransitions.length)];
      } else {
        const middleTransitions = [
          `Por otro lado, la aparición de <strong>${dream.name}</strong> complementa este mensaje señalando que `,
          `Asimismo, la energía de <strong>${dream.name}</strong> se manifiesta para indicarte que `,
          `De igual modo, el símbolo de <strong>${dream.name}</strong> revela que `,
          `Por otra parte, la vibración de <strong>${dream.name}</strong> evoca que `,
          `Además, contemplar <strong>${dream.name}</strong> en el plano onírico sugiere que `,
          `También, el mensaje oculto tras <strong>${dream.name}</strong> señala que `,
          `En otro aspecto, el influjo de <strong>${dream.name}</strong> te advierte que `
        ];
        const middleIndex = (index - 1) % middleTransitions.length;
        transition = middleTransitions[middleIndex];
      }


      // Convertir primera letra del significado original en minúscula si es adecuado
      let meaningText = dream.meaning;
      if (meaningText.startsWith('El ') || meaningText.startsWith('La ') || meaningText.startsWith('Los ') || meaningText.startsWith('Las ')) {
        // Encontrar primer espacio y poner minúscula a lo que sigue si es apropiado
        const firstSpace = meaningText.indexOf(' ');
        const article = meaningText.substring(0, firstSpace).toLowerCase();
        const rest = meaningText.substring(firstSpace);
        meaningText = article + rest;
      } else if (meaningText.charAt(0) === meaningText.charAt(0).toUpperCase()) {
        meaningText = meaningText.charAt(0).toLowerCase() + meaningText.slice(1);
      }

      analysisHtml += `<p>${transition}${meaningText}</p>`;
    });

    analysisHtml += `<p><strong>✦ Consejo Astral y Alquimia Onírica:</strong> Medita sobre la interacción de estas visiones en tu vida consciente. Las estrellas te recuerdan que los sueños son el espejo de tu vibración interna y el plano vital superior. Permite que estos mensajes guíen tus decisiones cotidianas libres del orgullo del ego. ¡Que la luz cósmica guíe tu despertar!</p>`;

    dreamAnalysisText.innerHTML = analysisHtml;

    // Renderizar tarjetas de los símbolos detectados
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

    // Convertir el HTML de la lectura a texto plano limpio
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = dreamAnalysisText.innerHTML;
    
    // Formatear párrafos con saltos de línea
    const paragraphs = tempDiv.querySelectorAll('p');
    let textToCopy = '✦ LECTURA DE SUEÑOS - EL ECO DE LAS ESTRELLAS ✦\n\n';
    paragraphs.forEach(p => {
      textToCopy += p.textContent + '\n\n';
    });
    textToCopy += 'Consulta tu horóscopo y tarot en: https://elecodelasestrellas.com';

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
    let textToShare = '✦ LECTURA DE SUEÑOS - EL ECO DE LAS ESTRELLAS ✦\n\n';
    paragraphs.forEach(p => {
      textToShare += p.textContent + '\n\n';
    });
    textToShare += 'Consulta tu horóscopo y tarot en: https://elecodelasestrellas.com';

    if (navigator.share && window.location.protocol !== 'file:') {
      navigator.share({
        title: 'Mi Lectura de Sueños',
        text: textToShare
      }).catch(err => {
        console.error('Error al compartir:', err);
        copyAnalysisToClipboard();
      });
    } else {
      // Fallback si no está soportado o estamos en local
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
      'Lugares y Objetos': '🗝️',
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
      'lugares y objetos': 'Lugares y Objetos',
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

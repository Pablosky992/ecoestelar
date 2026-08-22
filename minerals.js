// Lógica del Buscador de Minerales
// Eco Estelar

const initMinerals = () => {
  if (!window.mineralsDb) {
    console.error('La base de datos de minerales (mineralsDb.js) no se cargó.');
    return;
  }

  const searchInput = document.getElementById('mineral-search-input');
  const clearSearchBtn = document.getElementById('mineral-clear-btn');
  const categoryButtons = document.querySelectorAll('.dream-cat-btn');
  const mineralGrid = document.getElementById('mineral-results-grid');
  const statusTitle = document.getElementById('mineral-status-title');
  const statusDesc = document.getElementById('mineral-status-desc');
  const paginationContainer = document.getElementById('mineral-pagination-container');

  // Elementos del Modal Iframe
  const iframeModal = document.getElementById('mineral-iframe-modal');
  const iframe = document.getElementById('mineral-iframe');
  const closeIframeBtn = document.getElementById('close-mineral-iframe-btn');
  const iframeOverlay = document.getElementById('mineral-iframe-overlay');

  let currentSearchQuery = '';
  let currentCategory = 'todos';
  let searchDebounceTimeout = null;
  let currentPage = 1;
  const itemsPerPage = 20;

  function init() {
    renderMinerals();
    toggleClearButton();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounceTimeout);
        searchDebounceTimeout = setTimeout(() => {
          currentSearchQuery = e.target.value;
          currentPage = 1;
          toggleClearButton();
          renderMinerals();
        }, 200);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchQuery = '';
        currentPage = 1;
        toggleClearButton();
        renderMinerals();
        searchInput.focus();
      });
    }

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        currentPage = 1;
        renderMinerals();
      });
    });

    // Eventos del Modal Iframe
    if (closeIframeBtn) closeIframeBtn.addEventListener('click', closeMineralModal);
    if (iframeOverlay) iframeOverlay.addEventListener('click', closeMineralModal);
    
    // Escuchar el botón Atrás del navegador
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.mineral) {
        openMineralModal(e.state.mineral, false);
      } else {
        closeMineralModal(false);
      }
    });

    // Comprobar si la URL de entrada ya apunta a un mineral (para abrir modal directamente)
    const currentPath = window.location.pathname;
    if (currentPath.includes('/minerales/')) {
      const parts = currentPath.split('/');
      const slugWithHtml = parts[parts.length - 1];
      const slug = slugWithHtml.replace('.html', '');
      openMineralModal(slug, false);
    }
  }

  function openMineralModal(slug, push = true) {
    if (!iframeModal || !iframe) return;
    
    // Configurar src del iframe
    iframe.src = `minerales/${slug}.html`;
    iframeModal.classList.remove('hidden');
    iframeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (push) {
      history.pushState({ mineral: slug }, '', `/minerales/${slug}.html`);
    }
  }

  function closeMineralModal(push = true) {
    if (!iframeModal || !iframe) return;
    
    iframeModal.classList.add('hidden');
    iframeModal.setAttribute('aria-hidden', 'true');
    iframe.src = 'about:blank';
    document.body.style.overflow = '';

    if (push) {
      history.pushState(null, '', '/propiedades-minerales.html');
    }
  }

  function toggleClearButton() {
    if (clearSearchBtn) {
      if (currentSearchQuery.length > 0) {
        clearSearchBtn.classList.remove('hidden');
      } else {
        clearSearchBtn.classList.add('hidden');
      }
    }
  }

  function normalizeText(text) {
    if (!text) return '';
    return text.toLowerCase()
      .replace(/ñ/g, '##n##')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/##n##/g, 'ñ')
      .replace(/[^a-z0-9áéíóúñüs]/gi, ' ')
      .trim();
  }

  function getFilteredMinerals() {
    const queryNormalized = normalizeText(currentSearchQuery);

    const filtered = window.mineralsDb.filter(m => {
      // Si hay una búsqueda activa, se ignora el filtro de categoría y se busca de forma global
      if (queryNormalized) {
        const nameNormalized = normalizeText(m.name);
        const subtitleNormalized = normalizeText(m.subtitle);
        const descriptionNormalized = normalizeText(m.description);
        const propertiesNormalized = normalizeText(m.properties);
        const usesNormalized = normalizeText(m.uses);
        
        return nameNormalized.includes(queryNormalized) ||
               subtitleNormalized.includes(queryNormalized) ||
               descriptionNormalized.includes(queryNormalized) ||
               propertiesNormalized.includes(queryNormalized) ||
               usesNormalized.includes(queryNormalized);
      }

      // Si no hay búsqueda activa, se filtra por la categoría actual seleccionada
      return currentCategory === 'todos' || m.category.toLowerCase() === currentCategory;
    });

    // Ordenar alfabéticamente (A-Z) en español, gestionando acentos correctamente
    return filtered.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
  }

  function renderMinerals() {
    if (!mineralGrid) return;

    const filtered = getFilteredMinerals();
    mineralGrid.innerHTML = '';

    if (filtered.length === 0) {
      if (statusTitle && statusDesc) {
        statusTitle.textContent = 'Ninguna piedra responde al llamado...';
        statusDesc.textContent = 'Intenta buscando por otra palabra clave o reseteando los filtros.';
      }
      mineralGrid.innerHTML = '<p style="color:var(--text-muted); font-style:italic; text-align:center; grid-column: 1/-1; padding: 2rem 0;">No se encontraron minerales con ese criterio.</p>';
      if (paginationContainer) {
        paginationContainer.classList.add('hidden');
      }
      return;
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, endIndex);

    if (statusTitle && statusDesc) {
      statusTitle.textContent = `${totalItems} Mineral${totalItems > 1 ? 'es' : ''} Revelado${totalItems > 1 ? 's' : ''}`;
      statusDesc.textContent = `Explora las propiedades mágicas, terapéuticas y científicas del reino mineral. Página ${currentPage} de ${totalPages}.`;
    }

    const catIcons = {
      'Paz y Calma': '🌸',
      'Protección y Limpieza': '🛡️',
      'Amor y Emociones': '💖',
      'Abundancia y Acción': '💰',
      'Intuición y Consciencia': '👁️'
    };

    paginatedItems.forEach(m => {
      const card = document.createElement('article');
      card.className = 'dream-card glass-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Propiedades de ${m.name}`);
      card.style.overflow = 'hidden';

      card.innerHTML = `
        <div style="margin-top: -1.5rem; margin-left: -1.5rem; margin-right: -1.5rem; width: calc(100% + 3rem); height: 130px; overflow: hidden; border-radius: 15px 15px 0 0; border-bottom: 1px solid var(--border-color); margin-bottom: 1rem;">
          <img src="${m.image}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85);" loading="lazy" decoding="async" width="280" height="130">
        </div>
        <div class="dream-card-header">
          <span class="dream-card-cat">${m.category}</span>
          <span class="dream-card-icon">${catIcons[m.category] || '💎'}</span>
        </div>
        <h3 class="dream-card-title">${m.name}</h3>
        <p class="dream-card-preview" style="font-style: italic; color: var(--gold-light); margin-bottom: 0.5rem;">${m.subtitle}</p>
        <p class="dream-card-preview">${m.properties.substring(0, 95)}...</p>
        <button type="button" class="dream-card-btn" style="margin-top: auto;">Ver Ficha Completa ✦</button>
      `;

      card.addEventListener('click', () => {
        openMineralModal(m.slug);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMineralModal(m.slug);
        }
      });

      mineralGrid.appendChild(card);
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) {
      paginationContainer.classList.add('hidden');
      return;
    }
    paginationContainer.classList.remove('hidden');

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '‹';
    if (currentPage > 1) {
      prevBtn.addEventListener('click', () => {
        currentPage--;
        renderMinerals();
        scrollToTop();
      });
    }
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `pagination-btn ${currentPage === i ? 'active' : ''}`;
        btn.textContent = i;
        if (currentPage !== i) {
          btn.addEventListener('click', () => {
            currentPage = i;
            renderMinerals();
            scrollToTop();
          });
        }
        paginationContainer.appendChild(btn);
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        const dots = document.createElement('span');
        dots.className = 'pagination-ellipsis';
        dots.textContent = '...';
        paginationContainer.appendChild(dots);
      }
    }

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = '›';
    if (currentPage < totalPages) {
      nextBtn.addEventListener('click', () => {
        currentPage++;
        renderMinerals();
        scrollToTop();
      });
    }
    paginationContainer.appendChild(nextBtn);
  }

  function scrollToTop() {
    const target = document.getElementById('mineral-status-title') || mineralGrid;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  init();
};

if (document.readyState !== 'loading') {
  initMinerals();
} else {
  document.addEventListener('DOMContentLoaded', initMinerals);
}

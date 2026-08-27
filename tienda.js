/**
 * Tienda Mágica — Catálogo Espiritual y Motor Interactivo
 * Eco Estelar
 */

const STORE_PRODUCTS_DB = [
  {
    id: 'tarot-marsella',
    name: 'Cartas de El Tarot de Marsella',
    category: 'tarot',
    categoryLabel: 'Barajas de Tarot',
    badge: '★ Clásico Universal',
    badgeType: 'gold',
    image: 'assets/tarot_marsella_wide.png',
    rating: 4.8,
    reviews: '2.450+',
    affiliateUrl: 'https://amzn.to/4ejRZ5t',
    shortDesc: 'La baraja histórica y arquetípica por excelencia. 78 cartas con iconografía medieval y simbolismo esotérico puro.',
    details: 'El Tarot de Marsella es la baraja madre de la cartomancia europea. Sus Arcanos Mayores y Menores contienen los códigos geométricos y cromáticos originales para una lectura analítica y profunda del destino.',
    features: ['78 cartas ilustradas de alta calidad', 'Folleto explicativo con tiradas clásicas', 'Ideal para estudio tradicional y simbólico'],
    level: 'Principiante a Avanzado'
  },
  {
    id: 'witches-tarot',
    name: 'Conjunto Cartas Witches Tarot',
    category: 'tarot',
    categoryLabel: 'Barajas de Tarot',
    badge: '✦ Más Popular',
    badgeType: 'purple',
    image: 'assets/cartas_witches.jpg',
    rating: 4.9,
    reviews: '3.800+',
    affiliateUrl: 'https://amzn.to/4w1ESMg',
    shortDesc: 'Arte pagano moderno y vibrante basado en el sistema Rider-Waite. Excelente conexión intuitiva y lecturas visuales.',
    details: 'Creado por Ellen Dugan con ilustraciones de Mark Evans, el Witches Tarot fusiona la estructura clásica con el simbolismo wiccano y de la naturaleza, ofreciendo respuestas llenas de luz y sabiduría práctica.',
    features: ['Baraja completa con acabados premium', 'Libro guía detallado con significados y hechizos', 'Fácil lectura visual intuitiva'],
    level: 'Todos los niveles'
  },
  {
    id: 'tarot-principiantes-libro',
    name: 'Tarot para principiantes: Guía de lectura psíquica',
    category: 'libros',
    categoryLabel: 'Libros y Guías',
    badge: '📖 Imprescindible',
    badgeType: 'blue',
    image: 'assets/tarot_principiantes.jpg',
    rating: 4.7,
    reviews: '1.200+',
    affiliateUrl: 'https://amzn.to/3QbJ3WH',
    shortDesc: 'El manual paso a paso para aprender a interpretar los 78 arcanos, desarrollar tu intuición y realizar tiradas con confianza.',
    details: 'Una guía clara, directa y accesible para perder el miedo a las cartas. Aprende la simbología de cada arcano, tiradas prácticas para el día a día y ejercicios para conectar con tu percepción extrasensorial.',
    features: ['Explicación de los 78 arcanos al derecho e invertidos', 'Tiradas guiadas para amor, dinero y destino', 'Tapa blanda de alta calidad'],
    level: 'Principiante'
  },
  {
    id: 'tapete-adivinacion',
    name: 'Tapete de Terciopelo para Lectura de Tarot',
    category: 'accesorios',
    categoryLabel: 'Altar y Tapetes',
    badge: '✨ Esencial de Lectura',
    badgeType: 'gold',
    image: 'assets/tapete_adivinacion.jpg',
    rating: 4.8,
    reviews: '950+',
    affiliateUrl: 'https://amzn.to/4emDttS',
    shortDesc: 'Superficie de terciopelo suave con grabado de geometría sagrada para proteger tus cartas y consagrar tu espacio de consulta.',
    details: 'El tapete de lectura crea un límite energético entre el plano cotidiano y el espacio ritual. Su tejido de terciopelo protege los bordes de tus cartas de tarot del desgaste y facilita un deslizamiento perfecto durante el barajado.',
    features: ['Tejido de terciopelo grueso y antideslizante', 'Estampado de fases lunares y flor de la vida', 'Incluye bolsa protectora para baraja'],
    level: 'Todos los niveles'
  },
  {
    id: 'palo-santo-premium',
    name: 'Palo Santo Natural del Perú (100% Sostenible)',
    category: 'inciensos',
    categoryLabel: 'Inciensos y Limpieza',
    badge: '🌿 Purificación',
    badgeType: 'green',
    image: 'assets/palo_santo.jpg',
    rating: 4.9,
    reviews: '4.100+',
    affiliateUrl: 'https://amzn.to/4uToY5D',
    shortDesc: 'Madera sagrada recolectada de forma ética. Ideal para sahumar barajas de tarot, cristales y limpiar energías densas.',
    details: 'El aroma dulce y balsámico del Palo Santo eleva la vibración de cualquier estancia, disipa la pesadez mental y consagra las herramientas mágicas antes de cualquier sesión de adivinación o meditación.',
    features: ['Madera recolectada de ramas caídas naturalmente', 'Alto contenido en aceites esenciales y resina', 'Aroma puro sin químicos añadidos'],
    level: 'Todos los niveles'
  },
  {
    id: 'lampara-selenita',
    name: 'Lámpara de Selenita Blanca Natural',
    category: 'decoracion',
    categoryLabel: 'Lámparas y Decoración',
    badge: '💎 Alta Vibración',
    badgeType: 'purple',
    image: 'assets/lampara_selenita.jpg',
    rating: 4.8,
    reviews: '820+',
    affiliateUrl: 'https://amzn.to/4oFHKMb',
    shortDesc: 'Torre de selenita pura con luz cálida. Limpia automáticamente el campo áurico y recarga otros cristales.',
    details: 'La selenita es la piedra de la claridad mental y la conexión con planos superiores. Esta lámpara irradia una luz tenue y mística que aporta paz instantánea a tu altar, dormitorio o espacio de meditación.',
    features: ['Cristal de selenita 100% natural', 'Base y cable con interruptor incluidos', 'Auto-limpiadora de energías ambientales'],
    level: 'Todos los niveles'
  },
  {
    id: 'lampara-sal-himalaya',
    name: 'Lámpara de Sal del Himalaya Auténtica',
    category: 'decoracion',
    categoryLabel: 'Lámparas y Decoración',
    badge: '🔥 Ionización y Calidez',
    badgeType: 'orange',
    image: 'assets/lampara_sal.jpg',
    rating: 4.7,
    reviews: '5.600+',
    affiliateUrl: 'https://amzn.to/4eB1pZm',
    shortDesc: 'Bloque de sal rosa del Himalaya tallado a mano. Genera iones negativos, purifica el aire y crea una atmósfera acogedora.',
    details: 'La luz ámbar de la sal del Himalaya favorece el descanso nocturno, neutraliza las ondas electromagnéticas de dispositivos electrónicos y armoniza el flujo de prana en el hogar.',
    features: ['Sal rosa pura de minas del Himalaya', 'Base de madera tratada y regulador de intensidad', 'Atmósfera relajante para meditación'],
    level: 'Todos los niveles'
  },
  {
    id: 'diario-mistico-vintage',
    name: 'Diario Místico de Cuero Artesanal (Grimorio)',
    category: 'accesorios',
    categoryLabel: 'Altar y Tapetes',
    badge: '📜 Grimorio Personal',
    badgeType: 'gold',
    image: 'assets/cuaderno_vintage.png',
    rating: 4.9,
    reviews: '1.750+',
    affiliateUrl: 'https://amzn.to/4ehxoic',
    shortDesc: 'Cuaderno encuadernado en cuero grabado con páginas de papel de algodón envejecido. Perfecto para registrar tus tiradas.',
    details: 'Lleva tu diario de lecturas, sueños proféticos, rituales y sincronicidades en un grimorio artesanal que resistirá el paso de los años. Cada página tiene un tacto suave y antiguo ideal para tinta o pluma.',
    features: ['Cuero auténtico repujado a mano', '200 páginas de papel vintage de algodón sin sangrado', 'Cierre de cordón de cuero rústico'],
    level: 'Todos los niveles'
  },
  {
    id: 'amatista-drusa',
    name: 'Drusa de Amatista Natural de Uruguay',
    category: 'cristales',
    categoryLabel: 'Cristales y Minerales',
    badge: '💎 Tercer Ojo e Intuición',
    badgeType: 'purple',
    image: 'assets/minerales/amatista.jpg',
    rating: 4.9,
    reviews: '1.300+',
    affiliateUrl: 'https://amzn.to/3Uiem3K',
    shortDesc: 'Racimo de cristales de amatista violeta intenso. Transmuta energías negativas y potencia la intuición y la meditación.',
    details: 'La amatista es la piedra maestra del chakra del tercer ojo y la transmutación alquímica. Colocada junto a tus cartas de tarot, eleva la conexión espiritual y protege las lecturas de influencias externas.',
    features: ['Pieza natural única con cristales brillantes', 'Calidad extra de tono violeta profundo', 'Excelente para cargar joyas y amuletos'],
    level: 'Todos los niveles'
  },
  {
    id: 'cuarzo-rosa-corazon',
    name: 'Corazón de Cuarzo Rosa Natural de Madagascar',
    category: 'cristales',
    categoryLabel: 'Cristales y Minerales',
    badge: '💖 Amor Incondicional',
    badgeType: 'pink',
    image: 'assets/minerales/cuarzo-rosa.jpg',
    rating: 4.8,
    reviews: '980+',
    affiliateUrl: 'https://amzn.to/45WwBhE',
    shortDesc: 'Cristal pulido en forma de corazón. Abre el chakra Anahata, fomenta el amor propio, la ternura y la paz emocional.',
    details: 'El cuarzo rosa es el bálsamo sanador del cuerpo emocional. Ideal para sostener durante meditaciones de perdón, tiradas de tarot sobre relaciones sentimentales y armonización de vínculos afectivos.',
    features: ['Mineral 100% natural de Madagascar pulido suavemente', 'Tono rosado translúcido de alta pureza', 'Tamaño de bolsillo para llevar contigo'],
    level: 'Todos los niveles'
  },
  {
    id: 'turmalina-negra',
    name: 'Turmalina Negra en Bruto (Escudo Protector)',
    category: 'cristales',
    categoryLabel: 'Cristales y Minerales',
    badge: '🛡️ Protección Áurica',
    badgeType: 'dark',
    image: 'assets/minerales/turmalina-negra.jpg',
    rating: 4.9,
    reviews: '2.100+',
    affiliateUrl: 'https://amzn.to/4xuiXhS',
    shortDesc: 'Piedra de enraizamiento y protección psíquica. Desvía radiaciones electromagnéticas y absorbe energías densas.',
    details: 'La turmalina negra es el guardián esencial de cualquier practicante esotérico. Ancla la energía al elemento Tierra (Chakra Raíz) y evita el agotamiento energético tras realizar múltiples lecturas de tarot.',
    features: ['Estructura estriada natural sin tratamientos químicos', 'Excelente disipador de energía estática', 'Imprescindible en la entrada del hogar o altar'],
    level: 'Todos los niveles'
  },
  {
    id: 'pendulo-cuarzo',
    name: 'Péndulo de Cuarzo Transparente Facetado',
    category: 'accesorios',
    categoryLabel: 'Altar y Tapetes',
    badge: '🎯 Radiestesia y Guía',
    badgeType: 'blue',
    image: 'assets/pendulo_cuarzo.png',
    rating: 4.8,
    reviews: '740+',
    affiliateUrl: 'https://amzn.to/4qDtIMa',
    shortDesc: 'Péndulo de 6 facetas con cadena de plata y esfera de sujeción. Respuestas rápidas Sí/No y armonización de chakras.',
    details: 'El cuarzo cristal de roca es el mayor amplificador y programador energético. Este péndulo calibra con precisión las oscilaciones sutiles del campo áurico para responder preguntas binarias y localizar bloqueos.',
    features: ['Cuarzo cristalino facetado de alta simetría', 'Cadena duradera de 20 cm con bolita de agarre', 'Incluye bolsita de terciopelo protectora'],
    level: 'Principiante a Intermedio'
  },
  {
    id: 'pluma-estilografica-vintage',
    name: 'Set de Pluma de Caligrafía Vintage con Tintero y Plumillas',
    category: 'accesorios',
    categoryLabel: 'Altar y Tapetes',
    badge: '✒️ Escritura Sagrada',
    badgeType: 'gold',
    image: 'assets/pluma_estilografica_vintage.jpg',
    rating: 4.8,
    reviews: '890+',
    affiliateUrl: 'https://amzn.to/4xZFfrA',
    shortDesc: 'Set de pluma artesanal con detalles ornamentales de engranajes y alas, tintero y 5 puntas intercambiables. Ideal para tu diario mágico y grimorio.',
    details: 'El acto de escribir a mano con tinta y pluma consagra tus intenciones y ancla tus vivencias al plano físico. Este set de caligrafía vintage con base de soporte y tintero es el complemento perfecto para redactar tus tiradas de tarot, hechizos lunares y reflexiones en tu Libro de las Sombras o Grimorio.',
    features: ['Pluma natural con detalles ornamentales metálicos', 'Incluye tintero, base de apoyo y 5 plumillas de repuesto', 'Caja de presentación retro estilo cartografía antigua'],
    level: 'Todos los niveles'
  },
  {
    id: 'libro-velas-oraculo',
    name: 'Lo que dicen las velas al arder: El oráculo de las velas',
    category: 'libros',
    categoryLabel: 'Libros y Guías',
    badge: '🕯️ Ceromancia y Magia',
    badgeType: 'orange',
    image: 'assets/libro_velas_oraculo.jpg',
    rating: 4.9,
    reviews: '1.150+',
    affiliateUrl: 'https://amzn.to/4wUIMXh',
    shortDesc: 'Guía imprescindible de Mitxel G. Mohn para interpretar la llama, la cera, los restos y los mensajes ocultos en los rituales con velas.',
    details: 'Las velas son el canal de transmutación y comunicación más directo en la magia práctica. En esta obra de referencia, aprenderás a descifrar el comportamiento del fuego, el significado de los restos de cera derretida (ceromancia), la velocidad de consumición y cómo potenciar tus peticiones rituales.',
    features: ['Interpretación completa de llamas, humo y restos de cera', 'Rituales prácticos de protección, amor y prosperidad', 'Editorial Arkano Books, encuadernación de alta calidad'],
    level: 'Todos los niveles'
  },
  {
    id: 'pendulo-amatista-orgonita',
    name: 'Péndulo de Orgonita y Amatista con Bolsa Astral',
    category: 'accesorios',
    categoryLabel: 'Altar y Tapetes',
    badge: '🔮 Radiestesia y Transmutación',
    badgeType: 'purple',
    image: 'assets/pendulo_amatista_orgonita.jpg',
    rating: 4.9,
    reviews: '620+',
    affiliateUrl: 'https://amzn.to/4y1qHHT',
    shortDesc: 'Péndulo cónico facetado de amatista y orgonita con cadena de plata, bolsita de constelaciones doradas y madera de palo santo.',
    details: 'La combinación de la orgonita y la amatista genera un campo bioenergético de alta frecuencia que neutraliza interferencias electromagnéticas y amplifica la sensibilidad radiestésica. Ideal para formular preguntas de orientación intuitiva (Sí/No), medir chakras y sintonizar con la vibración del tercer ojo.',
    features: ['Orgonita con virutas y amatista natural incrustada', 'Cadena resistente con perla de sujeción', 'Incluye bolsita protectora con estampado astral dorado'],
    level: 'Todos los niveles'
  }
];

if (typeof window !== 'undefined') window.STORE_PRODUCTS_DB = STORE_PRODUCTS_DB;
if (typeof globalThis !== 'undefined') globalThis.STORE_PRODUCTS_DB = STORE_PRODUCTS_DB;

// Estado global de la tienda
let currentCategory = 'all';
let currentSearch = '';
let currentSort = 'recommended';

function initStoreEngine() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const searchInput = document.getElementById('store-search-input');
  const clearBtn = document.getElementById('store-search-clear');
  const sortSelect = document.getElementById('store-sort-select');
  const filterChips = document.querySelectorAll('.store-filter-chip');
  const counterEl = document.getElementById('store-results-counter');

  // 1. Render inicial
  renderStore();

  // 2. Eventos de Categoría
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category || 'all';
      renderStore();
    });
  });

  // 3. Evento de Búsqueda
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle('visible', currentSearch.length > 0);
      }
      renderStore();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearch = '';
        clearBtn.classList.remove('visible');
        searchInput.focus();
        renderStore();
      }
    });
  }

  // 4. Evento de Ordenación
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderStore();
    });
  }

  // 5. Parámetros de URL
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('cat');
  if (catParam) {
    const matchingChip = Array.from(filterChips).find(c => c.dataset.category === catParam);
    if (matchingChip) {
      filterChips.forEach(c => c.classList.remove('active'));
      matchingChip.classList.add('active');
      currentCategory = catParam;
      renderStore();
    }
  }

  const productParam = urlParams.get('p');
  if (productParam) {
    const product = STORE_PRODUCTS_DB.find(p => p.id === productParam);
    if (product) {
      setTimeout(() => openStoreDetailModal(product.id), 300);
    }
  }
}

function getFilteredProducts() {
  let list = STORE_PRODUCTS_DB.filter(p => {
    const matchesCat = (currentCategory === 'all' || p.category === currentCategory);
    const q = currentSearch.toLowerCase().trim();
    const matchesQuery = !q || (
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q)) ||
      (p.details && p.details.toLowerCase().includes(q))
    );
    return matchesCat && matchesQuery;
  });

  if (currentSort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

function renderStore() {
  const grid = document.getElementById('product-grid');
  const counterEl = document.getElementById('store-results-counter');
  if (!grid) return;

  const products = getFilteredProducts();
  const showDonation = (currentCategory === 'all' || currentCategory === 'ofrenda') && !currentSearch;

  // Actualizar contador
  if (counterEl) {
    const count = products.length + (showDonation ? 1 : 0);
    counterEl.innerHTML = `Mostrando <strong>${count}</strong> herramientas mágicas`;
  }

  grid.innerHTML = '';

  // 1. Tarjeta Especial de Donación / Ofrenda
  if (showDonation) {
    const donCard = document.createElement('div');
    donCard.className = 'product-card donation-card';
    donCard.innerHTML = `
      <span class="product-badge gold">OFRENDA</span>
      <div class="product-image-wrap donation-action-btn" title="Apoyar a Eco Estelar">
        <img decoding="async" src="assets/hub_ofrenda.png" alt="Apoyo a Eco Estelar" loading="lazy">
      </div>
      <span class="product-category-tag">Santuario Libre</span>
      <h3 class="product-title" style="color: var(--gold-color);">☕ Apoyo Voluntario a Eco Estelar</h3>
      <div class="product-rating">
        <span>★★★★★</span>
        <span class="reviews-count">Comunidad de Luz</span>
      </div>
      <p class="product-short-desc">
        Mantén encendida la luz del santuario y el desarrollo de nuevas herramientas místicas gratuitas con una aportación voluntaria.
      </p>
      <div class="product-actions-row">
        <button type="button" class="consult-button donation-action-btn product-buy-btn" style="border: none; cursor: pointer; box-shadow: 0 0 15px rgba(229, 193, 88, 0.3);">
          ☕ Realizar Ofrenda
        </button>
      </div>
    `;
    grid.appendChild(donCard);
  }

  // 2. Estado vacío si no hay coincidencias
  if (products.length === 0 && !showDonation) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-color); border-radius: 16px;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🔮✨</span>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--gold-color); margin: 0 0 0.5rem 0;">No se encontraron herramientas con esa búsqueda</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0 0 1.25rem 0;">Prueba con otra palabra clave o explora todas las categorías del catálogo.</p>
        <button type="button" class="consult-button" onclick="document.getElementById('store-search-input').value=''; currentSearch=''; currentCategory='all'; document.querySelectorAll('.store-filter-chip').forEach(c=>c.classList.remove('active')); document.querySelector('.store-filter-chip[data-category=\\'all\\']').classList.add('active'); renderStore();" style="padding: 0.6rem 1.5rem; font-size: 0.85rem;">
          Ver Todo el Catálogo
        </button>
      </div>
    `;
    return;
  }

  // 3. Renderizar cada producto
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <span class="product-badge ${p.badgeType}">${p.badge}</span>
      <div class="product-image-wrap" data-id="${p.id}" title="Ver detalles de ${p.name}">
        <img decoding="async" src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <span class="product-category-tag">${p.categoryLabel}</span>
      <h3 class="product-title">${p.name}</h3>
      <div class="product-rating">
        <span>★★★★★</span>
        <span>${p.rating}</span>
        <span class="reviews-count">(${p.reviews})</span>
      </div>
      <p class="product-short-desc">${p.shortDesc}</p>
      <div class="product-actions-row">
        <button type="button" class="product-quick-btn" data-id="${p.id}" title="Ver ficha completa">
          👁️ Ficha
        </button>
        <a href="${p.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="consult-button product-buy-btn">
          Ver en Amazon ↗
        </a>
      </div>
    `;

    // Click en la imagen o en botón de ficha abre modal
    card.querySelector('.product-image-wrap').addEventListener('click', () => openStoreDetailModal(p.id));
    card.querySelector('.product-quick-btn').addEventListener('click', () => openStoreDetailModal(p.id));

    grid.appendChild(card);
  });
}

function openStoreDetailModal(productId) {
  const p = STORE_PRODUCTS_DB.find(item => item.id === productId);
  if (!p) return;

  const existingModal = document.getElementById('store-detail-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'store-detail-modal';
  
  const featuresHtml = p.features.map(f => `<li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.45rem;"><span>✦</span> ${f}</li>`).join('');

  modal.innerHTML = `
    <div class="store-modal-content">
      <button type="button" class="store-modal-close-btn" aria-label="Cerrar modal">&times;</button>
      
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; align-items: flex-start;">
        <div style="width: 160px; height: 190px; border-radius: 12px; overflow: hidden; border: 1.5px solid rgba(229, 193, 88, 0.4); box-shadow: 0 0 25px rgba(229, 193, 88, 0.2); flex-shrink: 0; margin: 0 auto;">
          <img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex: 1; min-width: 240px;">
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--purple-color); font-weight: 700; display: block; margin-bottom: 0.3rem;">
            ${p.categoryLabel} · ${p.level}
          </span>
          <h3 style="font-family: var(--font-serif); font-size: 1.45rem; color: var(--gold-color); margin: 0 0 0.5rem 0; line-height: 1.3;">
            ${p.name}
          </h3>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; font-size: 0.88rem; color: var(--gold-color);">
            <span>★★★★★</span>
            <span>${p.rating} / 5.0</span>
            <span style="color: var(--text-muted); font-size: 0.8rem;">(${p.reviews} valoraciones en Amazon)</span>
          </div>
          <span class="product-badge ${p.badgeType}" style="position: static; display: inline-block;">${p.badge}</span>
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--gold-color); padding: 1rem 1.25rem; border-radius: 0 10px 10px 0; margin-bottom: 1.25rem;">
        <h4 style="font-family: var(--font-serif); color: var(--gold-color); font-size: 1rem; margin: 0 0 0.4rem 0;">
          🌌 Significado y Utilidad Espiritual
        </h4>
        <p style="font-size: 0.92rem; line-height: 1.65; color: var(--text-main); margin: 0;">
          ${p.details}
        </p>
      </div>

      <div style="margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-serif); color: var(--text-main); font-size: 0.95rem; margin: 0 0 0.5rem 0;">
          ✨ Características Principales:
        </h4>
        <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
          ${featuresHtml}
        </ul>
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
        <a href="${p.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="consult-button" style="flex: 1; text-align: center; text-decoration: none; padding: 0.85rem 1.5rem; font-size: 1rem; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; box-shadow: 0 0 20px rgba(229, 193, 88, 0.3);">
          🛒 Ver en Amazon (Comprobar Precio) ↗
        </a>
      </div>

      <p style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin: 0.85rem 0 0 0; font-style: italic;">
        * Enlace de afiliado oficial. Al comprar a través de Amazon, apoyas el mantenimiento de Eco Estelar sin ningún coste adicional para ti.
      </p>
    </div>
  `;

  document.body.appendChild(modal);

  // Cerrar modal
  const closeBtn = modal.querySelector('.store-modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.remove());
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Inicializar en carga
if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') {
    initStoreEngine();
  } else {
    document.addEventListener('DOMContentLoaded', initStoreEngine);
  }
}

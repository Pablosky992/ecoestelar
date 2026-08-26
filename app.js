
function createSlug(text) {
  return text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}

// Application State
let currentSpread = []; // Array of drawn card objects
let flippedCount = 0;
let totalCardsInSpread = 1;
let selectedCategory = 'general';
let isShuffling = false;
let isFromHistory = false;

// Astrological State Variables
let currentAstroSpread = [];
let astroFlippedCount = 0;
let astroTotalCards = 1;
let selectedZodiac = 'aries';
let selectedAstroSpread = 'astro_daily';
let isAstroShuffling = false;
let isAstroFromHistory = false;

// Lunar Calendar State Variables
let selectedLunarDate = new Date();
let lunarCalendarMonth = new Date().getMonth();
let lunarCalendarYear = new Date().getFullYear();

// Astrological correspondences for the 22 Major Arcana (from Golden Dawn and Papus)
const ASTRO_MAP = {
  0: { ruler: "Urano", symbol: "♅", keywords: "Originalidad y libertad", element: "Aire", card: "El Loco" },
  1: { ruler: "Mercurio", symbol: "☿", keywords: "Mente y comunicación", planet: "Mercurio", card: "El Mago" },
  2: { ruler: "La Luna", symbol: "☽", keywords: "Intuición y misterio", planet: "Luna", card: "La Sacerdotisa" },
  3: { ruler: "Venus", symbol: "♀", keywords: "Amor, abundancia y arte", planet: "Venus", card: "La Emperatriz" },
  4: { ruler: "Aries", symbol: "♈", keywords: "Iniciativa y voluntad", sign: "Aries", card: "El Emperador" },
  5: { ruler: "Tauro", symbol: "♉", keywords: "Valores y tradición", sign: "Tauro", card: "El Papa" },
  6: { ruler: "Géminis", symbol: "♊", keywords: "Relaciones y elección", sign: "Géminis", card: "Los Enamorados" },
  7: { ruler: "Cáncer", symbol: "♋", keywords: "Emociones y protección", sign: "Cáncer", card: "El Carro" },
  8: { ruler: "Libra", symbol: "♎", keywords: "Justicia y equilibrio", sign: "Libra", card: "La Justicia" },
  9: { ruler: "Virgo", symbol: "♍", keywords: "Prudencia e introspección", sign: "Virgo", card: "El Ermitaño" },
  10: { ruler: "Júpiter", symbol: "♃", keywords: "Suerte y destino", planet: "Júpiter", card: "La Rueda de la Fortuna" },
  11: { ruler: "Leo", symbol: "♌", keywords: "Coraje y pasión", sign: "Leo", card: "La Fuerza" },
  12: { ruler: "Neptuno", symbol: "♆", keywords: "Entrega y nueva visión", element: "Agua", card: "El Colgado" },
  13: { ruler: "Escorpio", symbol: "♏", keywords: "Transmutación y renacer", sign: "Escorpio", card: "La Muerte" },
  14: { ruler: "Sagitario", symbol: "♐", keywords: "Sanación y templanza", sign: "Sagitario", card: "La Templanza" },
  15: { ruler: "Capricornio", symbol: "♑", keywords: "Deseo y ambición", sign: "Capricornio", card: "El Diablo" },
  16: { ruler: "Marte", symbol: "♂", keywords: "Catarsis y despertar", planet: "Marte", card: "La Torre" },
  17: { ruler: "Acuario", symbol: "♒", keywords: "Fe y esperanza", sign: "Acuario", card: "La Estrella" },
  18: { ruler: "Piscis", symbol: "♓", keywords: "Fantasías y subconsciente", sign: "Piscis", card: "La Luna" },
  19: { ruler: "El Sol", symbol: "☉", keywords: "Vitalidad y claridad", planet: "Sol", card: "El Sol" },
  20: { ruler: "Plutón", symbol: "♇", keywords: "Vocación y juicio final", element: "Fuego", card: "El Juicio" },
  21: { ruler: "Saturno", symbol: "♄", keywords: "Realización y límites", planet: "Saturno", card: "El Mundo" }
};

// Esoteric Zodiac sign information (Papus & Master E.K.)
const ZODIAC_INFO = {
  aries: { name: "Aries", symbol: "♈", element: "Fuego", ruler: "Marte", angel: "Samael", body: "la cabeza y el cerebro", diastesis: "hepática (calor seco)" },
  tauro: { name: "Tauro", symbol: "♉", element: "Tierra", ruler: "Venus", angel: "Anael", body: "el cuello y la garganta", diastesis: "renal (frío seco)" },
  geminis: { name: "Géminis", symbol: "♊", element: "Aire", ruler: "Mercurio", angel: "Raphael", body: "los hombros, brazos y manos", diastesis: "craneal (calor húmedo)" },
  cancer: { name: "Cáncer", symbol: "♋", element: "Agua", ruler: "Luna", angel: "Gabriel", body: "el pecho, pulmones y diafragma", diastesis: "cráneo-abdominal (frío húmedo)" },
  leo: { name: "Leo", symbol: "♌", element: "Fuego", ruler: "Sol", angel: "Michael", body: "el corazón y el plexo cardíaco", diastesis: "cardíaca (calor seco)" },
  virgo: { name: "Virgo", symbol: "♍", element: "Tierra", ruler: "Mercurio", angel: "Raphael", body: "las entrañas, vientre e intestinos", diastesis: "craneal (frío seco)" },
  libra: { name: "Libra", symbol: "♎", element: "Aire", ruler: "Venus", angel: "Anael", body: "los riñones y la región lumbar", diastesis: "renal (calor húmedo)" },
  escorpio: { name: "Escorpio", symbol: "♏", element: "Agua", ruler: "Plutón y Marte", angel: "Samael", body: "los órganos reproductores y sistema sexual", diastesis: "hepática (frío húmedo)" },
  sagitario: { name: "Sagitario", symbol: "♐", element: "Fuego", ruler: "Júpiter", angel: "Zacariel", body: "las caderas y los muslos", diastesis: "torácica (calor seco)" },
  capricornio: { name: "Capricornio", symbol: "♑", element: "Tierra", ruler: "Saturno", angel: "Cassiel", body: "las rodillas y el esqueleto", diastesis: "esplénica (frío seco)" },
  acuario: { name: "Acuario", symbol: "♒", element: "Aire", ruler: "Urano y Saturno", angel: "Cassiel", body: "las piernas y los tobillos", diastesis: "esplénica (calor húmedo)" },
  piscis: { name: "Piscis", symbol: "♓", element: "Agua", ruler: "Neptuno y Júpiter", angel: "Zacariel", body: "los pies y la base linfática", diastesis: "torácica (frío húmedo)" }
};

const PLANETARY_ANGELS = {
  "Saturno": { angel: "Cassiel", genio: "reflexión en la luz astral" },
  "Júpiter": { angel: "Zacariel", genio: "concordia, justicia y arbitraje" },
  "Marte": { angel: "Samael", genio: "fuerza ígnea purificadora" },
  "El Sol": { angel: "Micael", genio: "luz espiritual y soberanía" },
  "Sol": { angel: "Micael", genio: "luz espiritual y soberanía" },
  "Venus": { angel: "Anael", genio: "amor y cohesión en el alma universal" },
  "Mercurio": { angel: "Raphael", genio: "sabiduría y arte intelectual" },
  "La Luna": { angel: "Gabriel", genio: "fluidos y subconsciente" },
  "Luna": { angel: "Gabriel", genio: "fluidos y subconsciente" },
  "Urano": { angel: "Cassiel", genio: "reflexión y desapego en el espacio" },
  "Neptuno": { angel: "Gabriel", genio: "devoción lunar sublimada" },
  "Plutón": { angel: "Samael", genio: "fuerza ígnea de transmutación" }
};

// Helper to sanitize zodiac sign keys (removes accents and lowercases)
function getSanitizedSignKey(signName) {
  if (!signName) return '';
  return signName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Chakras based on Sign Pairs (Master E.K. Spiritual Astrology)
function getAstroChakra(sunSign) {
  const pairs = {
    aries: { name: "Sahásrâra (Coronario)", loc: "Parte más alta de la cabeza", func: "Iniciación y liberación espiritual" },
    libra: { name: "Sahásrâra (Coronario)", loc: "Parte más alta de la cabeza", func: "Iniciación y liberación espiritual" },
    tauro: { name: "Âjñâ (Entrecejo)", loc: "Glándulas pineal y pituitaria", func: "El tercer ojo y el puente superior" },
    piscis: { name: "Âjñâ (Entrecejo)", loc: "Glándulas pineal y pituitaria", func: "El tercer ojo y el puente superior" },
    geminis: { name: "Visuddhi (Laríngeo)", loc: "Cuerdas vocales / Garganta", func: "El centro del Verbo y la expresión del prâna" },
    acuario: { name: "Visuddhi (Laríngeo)", loc: "Cuerdas vocales / Garganta", func: "El centro del Verbo y la expresión del prâna" },
    cancer: { name: "Anâhata (Cardíaco)", loc: "Corazón y pulmones", func: "Actividad respiratoria, circulatoria y amor universal" },
    capricornio: { name: "Anâhata (Cardíaco)", loc: "Corazón y pulmones", func: "Actividad respiratoria, circulatoria y amor universal" },
    leo: { name: "Svâdhistâna (Esplénico)", loc: "Bazo y diafragma", func: "La voluntad de amor, vitalidad y protección" },
    sagitario: { name: "Svâdhistâna (Esplénico)", loc: "Bazo y diafragma", func: "La voluntad de amor, vitalidad y protección" },
    virgo: { name: "Manipûraka (Umbilical)", loc: "Vientre y centros digestivos", func: "La envoltura del deseo y el magnetismo animal" },
    escorpio: { name: "Manipûraka (Umbilical)", loc: "Vientre y centros digestivos", func: "La envoltura del deseo y el magnetismo animal" }
  };
  return pairs[getSanitizedSignKey(sunSign)] || { name: "Mûlâdhâra (Base)", loc: "Base de la columna vertebral", func: "Kundalini y base de la materia" };
}

// Map of Gematria values (Pythagorean system including Spanish character Ñ)
const GEMATRIA_MAP = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, ñ: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

const NUM_SOUL_DB = {
  1: "Deseo profundo de independencia, liderazgo y autosuficiencia. Tu yo interno busca abrir nuevos caminos y destacar por mérito propio.",
  2: "Búsqueda íntima de paz, armonía y cooperación. Tu motivación principal es formar vínculos afectivos estables y actuar como pacificador.",
  3: "Deseo de expresar tu creatividad, alegría y optimismo. Tu alma se nutre de la comunicación, el arte y el contacto social genuino.",
  4: "Necesidad de orden, estabilidad y seguridad. Tu motivación es construir bases sólidas y ver que tus esfuerzos den frutos concretos.",
  5: "Anhelo profundo de libertad, aventura y cambios constantes. Tu alma huye de la rutina y ansía explorar el mundo con independencia.",
  6: "Deseo de proteger, amar y servir a tu familia y comunidad. Buscas crear armonía, belleza y asumir responsabilidades afectivas.",
  7: "Anhelo de introspección, análisis y conocimiento espiritual. Tu alma busca la verdad en la soledad, el estudio y la meditación.",
  8: "Deseo de logro material, éxito y poder constructivo. Tu alma se motiva al organizar, dirigir y liderar proyectos de gran envergadura.",
  9: "Deseo humanitario y altruista de amor incondicional. Tu alma busca ayudar a los demás, sanar heridas y trascender apegos materiales.",
  11: "Llamado espiritual a guiar a otros mediante tu intuición. Tu alma busca la elevación de conciencia y la inspiración mística.",
  22: "Gran constructor universal. Tu alma aspira a materializar grandes ideas y proyectos a nivel colectivo que beneficien a la humanidad.",
  33: "Consagración al servicio universal. Tu alma siente un amor desinteresado y busca ser un faro de iluminación y guía espiritual."
};

const NUM_PERSONALITY_DB = {
  1: "Te muestras como una persona fuerte, segura, dinámica e independiente. A los ojos de los demás pareces un líder nato y alguien emprendedor.",
  2: "Transmites una imagen pacífica, amable, diplomática y cooperadora. Los demás te perciben como alguien sensible, comprensivo y buen oyente.",
  3: "Proyectas carisma, simpatía, alegría y gran elocuencia. Pareces una persona muy sociable, expresiva, artística y llena de vitalidad.",
  4: "Das la impresión de ser alguien serio, trabajador, organizado, práctico y confiable. Transmites estabilidad, orden y honestidad.",
  5: "Te perciben como alguien magnético, aventurero, versátil y lleno de energía. Pareces una persona libre, adaptable y amante del cambio.",
  6: "Muestras una imagen protectora, hogareña, cariñosa y responsable. Das la impresión de ser el hombro en el que todos pueden apoyarse.",
  7: "Proyectas una imagen de reserva, misterio, inteligencia y espiritualidad. Los demás te ven como alguien analítico, culto y reflexivo.",
  8: "Transmites autoridad, fuerza material, éxito y capacidad ejecutiva. Pareces una persona decidida, eficiente y con gran poder físico y mental.",
  9: "Pareces una persona generosa, tolerante, comprensiva y con una visión amplia de la vida. Das la impresión de ser sabia, magnética y mística.",
  11: "Proyectas una vibración magnética especial, inspiradora y visionaria. Pareces un canal directo de ideas elevadas o intuición pura.",
  22: "Transmites la imagen de un organizador magistral. Los demás ven en ti una capacidad única para planificar a gran escala y concretar utopías.",
  33: "Proyectas un aura de paz, compasión infinita y amor protector. Pareces una persona entregada por entero a sanar y consolar a los necesitados."
};

const NUM_DESTINY_DB = {
  1: "Tu misión es aprender a ser autosuficiente, cultivar el coraje y desarrollar el liderazgo positivo, abriendo caminos para otros sin caer en el egoísmo.",
  2: "Tu misión consiste en aprender a cooperar, conciliar y mediar en conflictos, desarrollando la diplomacia, la empatía y fortaleciendo tus relaciones.",
  3: "Tu misión de vida es comunicar, inspirar y esparcir alegría a través de tu creatividad, el arte, la palabra hablada o escrita y tu optimismo natural.",
  4: "Tu camino te exige aprender el valor del trabajo constante, la autodisciplina y el orden, construyendo una vida sólida y segura paso a paso.",
  5: "Tu misión es experimentar la vida en libertad, adaptarte a los cambios con valentía y actuar como un puente de comunicación y versatilidad.",
  6: "Tu camino te llama a asumir responsabilidades afectivas, brindar amor, sostener a tu familia, crear espacios de belleza y sanar a tu entorno.",
  7: "Tu misión es profundizar en el conocimiento, desarrollar tu intuición y espiritualidad, convirtiéndote en un sabio, investigador o maestro mental.",
  8: "Tu sendero te reta a dominar el plano material y financiero, asumiendo la autoridad con justicia y manifestando éxito para proveer a la sociedad.",
  9: "Tu misión es alcanzar el amor universal, el altruismo y el perdón absoluto, ayudando desinteresadamente a la humanidad y soltando los apegos.",
  11: "Tu camino maestro te exige sintonizar con la luz espiritual y ser una fuente de inspiración y elevación espiritual para tu comunidad.",
  22: "Tu sendero te llama a ser un constructor a gran escala, uniendo ideales espirituales con realizaciones físicas prácticas que trasciendan generaciones.",
  33: "Tu misión suprema es encarnar el amor incondicional del maestro, brindando consuelo, sanación y una guía desinteresada a la humanidad."
};

const NUM_POTENTIAL_DB = {
  1: "En tu madurez, destacarás por tu total independencia y por iniciar proyectos innovadores con gran determinación personal.",
  2: "La segunda mitad de tu vida estará marcada por una profunda paz interior, el trabajo colaborativo de éxito y relaciones muy armoniosas.",
  3: "Tus años maduros te traerán una gran expansión creativa, reconocimiento social y la felicidad de expresarte libremente.",
  4: "Tu madurez te regalará una vida estable, un patrimonio firme construido con esfuerzo y la tranquilidad de tener bases seguras.",
  5: "En tu madurez vivirás grandes viajes, renovación constante y una versatilidad que te mantendrá siempre con energía juvenil.",
  6: "Tus años de adultez mayor se centrarán en la calidez del hogar, el afecto incondicional de los tuyos y el rol de consejero familiar.",
  7: "Tu madurez será un período de profunda sabiduría espiritual, estudio de misterios y una rica vida contemplativa interior.",
  8: "La madurez te traerá el máximo logro material, reconocimiento de tu autoridad y la capacidad de gestionar finanzas y éxito.",
  9: "En tu etapa de madurez alcanzarás el desapego evolutivo, realizando labores de ayuda social y conectando con tu dimensión espiritual.",
  11: "Tus años maduros te verán actuar como un canal de inspiración espiritual y guía de conciencia para quienes te rodean.",
  22: "En tu madurez lograrás concretar proyectos colectivos que dejen una huella duradera de orden y bienestar material en el mundo.",
  33: "Tu madurez representará una entrega compasiva y de amor universal, guiando a la comunidad con sabiduría y serenidad espiritual."
};

const NUM_BIRTHDAY_DB = {
  1: { desc: "Liderazgo y originalidad innata. Tienes el impulso de iniciar proyectos.", group: 1 },
  2: { desc: "Gran sensibilidad, diplomacia y predisposición al trabajo en pareja.", group: 2 },
  3: { desc: "Talento creativo, expresión fluida y gran carisma social.", group: 3 },
  4: { desc: "Habilidad para organizar, perseverancia y apego a la estabilidad.", group: 4 },
  5: { desc: "Amor por el cambio, adaptabilidad y una mente inquieta.", group: 5 },
  6: { desc: "Afecto protector, sentido del deber familiar y amor por la armonía.", group: 6 },
  7: { desc: "Mente investigadora, interés por el misterio y necesidad de soledad.", group: 7 },
  8: { desc: "Ambición material, capacidad ejecutiva y resistencia física.", group: 8 },
  9: { desc: "Idealismo, visión compasiva y un fuerte sentido de la justicia.", group: 9 },
  10: { desc: "Poder de voluntad enfocado, nuevos comienzos y magnetismo personal.", group: 1 },
  11: { desc: "Intuición excepcional, sensibilidad psíquica y grandes ideales.", group: 2 },
  12: { desc: "Capacidad de ver el mundo desde el arte y facilidad para convencer.", group: 3 },
  13: { desc: "Fuerza para reconstruir desde las cenizas, disciplina y rigor.", group: 4 },
  14: { desc: "Búsqueda constante de equilibrio a través de viajes y cambios.", group: 5 },
  15: { desc: "Poder de atracción personal, magnetismo y amor por el hogar.", group: 6 },
  16: { desc: "Búsqueda de la verdad a través de crisis evolutivas espirituales.", group: 7 },
  17: { desc: "Claridad mental, ambición y confianza en tu buena estrella.", group: 8 },
  18: { desc: "Intuición profunda, sensibilidad al entorno e imaginación artística.", group: 9 },
  19: { desc: "Independencia férrea, individualismo luminoso y éxito autoconstruido.", group: 1 },
  20: { desc: "Receptividad espiritual, empatía y gran sentido de la cooperación.", group: 2 },
  21: { desc: "Facilidad de expresión, sociabilidad y logro de metas personales.", group: 3 },
  22: { desc: "Gran organizador práctico, capacidad constructiva y alta visión.", group: 4 },
  23: { desc: "Espíritu libre, versatilidad intelectual y comunicación ágil.", group: 5 },
  24: { desc: "Dedicación familiar, amor por la belleza y gran sentido de protección.", group: 6 },
  25: { desc: "Introspección analítica, interés en ciencias o ciencias ocultas.", group: 7 },
  26: { desc: "Voluntad férrea para materializar metas y capacidad ejecutiva.", group: 8 },
  27: { desc: "Mente abierta, humanitarismo amplio y desapego de lo material.", group: 9 },
  28: { desc: "Liderazgo dinámico equilibrado por la necesidad de cooperar.", group: 1 },
  29: { desc: "Espiritualidad intensa, idealismo y gran sensibilidad emocional.", group: 2 },
  30: { desc: "Autoexpresión artística libre, comunicación fluida y sociabilidad.", group: 3 },
  31: { desc: "Construcción firme, apego al orden y sentido práctico del deber.", group: 4 }
};

const NUM_REL_SOUL_DB = {
  1: "Vínculo de profunda independencia. Aunque se aman, ambos necesitan espacio personal para liderar sus propios proyectos sin asfixiarse.",
  2: "Sintonía emocional perfecta. Hay una ternura inmensa, gran empatía y una capacidad natural para consolarse y apoyarse mutuamente.",
  3: "Relación alegre y comunicativa. Disfrutan de la risa, el juego, las reuniones sociales y expresan su amor con gran entusiasmo creativo.",
  4: "Amor sólido y estructurado. Vuestra unión se basa en la lealtad, la seguridad material y el deseo de construir un hogar firme y duradero.",
  5: "Vínculo magnético, apasionado e inestable. Vivirán aventuras y cambios constantes, pero deben cuidar que la impulsividad no los distancie.",
  6: "Conexión sumamente familiar y protectora. El centro de vuestra unión es el cuidado mutuo, el calor del hogar y el bienestar comunitario.",
  7: "Unión espiritual y reflexiva. Se entienden en el silencio, disfrutan de la conversación intelectual profunda y respetan su soledad mística.",
  8: "Afinidad de poder y prosperidad. Juntos son una fuerza arrolladora capaz de generar éxito financiero, dirigir proyectos y prosperar.",
  9: "Amor universal y altruista. Comparten un gran ideal humanitario, se perdonan con facilidad y buscan sanar al mundo como un equipo.",
  11: "Conexión de almas maestras. Os inspiráis mutuamente a elevar vuestra conciencia y a actuar como un canal de luz e intuición para otros.",
  22: "Unión de constructores universales. Tenéis el potencial de materializar grandes ideales prácticos que trasciendan vuestro entorno.",
  33: "Consagración amorosa total. Es una vibración de amor incondicional absoluto y servicio desinteresado para sanar al prójimo juntos."
};

const NUM_REL_PERS_DB = {
  1: "Os mostráis ante la sociedad como una pareja fuerte, líder, segura e independiente, que abre sus propios caminos con orgullo.",
  2: "Proyectáis una imagen de pareja diplomática, amable, colaboradora y sumamente pacífica en vuestro trato social diario.",
  3: "La gente os ve como una pareja muy carismática, alegre, elocuente y sociable, llenando de vitalidad cualquier reunión.",
  4: "Transmitís la imagen de una unión seria, formal, trabajadora, estable y muy confiable en vuestros compromisos.",
  5: "Os mostráis como una pareja magnética, libre, aventurera, cambiante y juvenil, que huye de las normas rígidas.",
  6: "Proyectáis una vibración hogareña, protectora, responsable y sumamente cariñosa hacia vuestra familia y amigos.",
  7: "La sociedad os percibe como una pareja discreta, misteriosa, muy inteligente, formal y con un aura de reserva.",
  8: "Transmitís una imagen de éxito, autoridad, elegancia y solvencia material, proyectando una gran fuerza ejecutiva.",
  9: "Os mostráis como una pareja generosa, sabia, romántica y mística, con una visión humanitaria y abierta de la vida."
};

const NUM_REL_DEST_DB = {
  1: "Vuestro camino conjunto consiste en aprender a motivarse mutuamente hacia la autosuficiencia, liderando proyectos independientes.",
  2: "Vuestra misión como pareja es aprender a convivir en armonía, ejercitando la diplomacia, la empatía y la resolución pacífica de conflictos.",
  3: "Vuestra misión de pareja es comunicar, inspirar y esparcir alegría y optimismo a través de la creatividad o el arte compartido.",
  4: "Vuestro sendero os pide trabajar de forma constante y ordenada, echando bases materiales y emocionales sólidas para vuestra seguridad.",
  5: "Vuestra misión es experimentar la libertad en pareja, adaptándose con valentía a las mudanzas y viajando por el mundo.",
  6: "Vuestra unión tiene como misión asumir responsabilidades afectivas, proteger el núcleo familiar y sanar heridas del entorno.",
  7: "Vuestro propósito es profundizar en el conocimiento intelectual, la investigación o el esoterismo, creciendo en sabiduría interior.",
  8: "Vuestro sendero conjunto os reta a dominar las finanzas y el plano material con absoluta justicia y honestidad espiritual.",
  9: "Vuestra misión evolutiva es vivir con desapego, dedicándose a obras benéficas o humanitarias con amor incondicional universal.",
  11: "Vuestro camino maestro es servir como faro de inspiración espiritual y elevación de conciencia para vuestra comunidad.",
  22: "Vuestro propósito es construir sistemas u obras a gran escala que dejen una huella pr��ctica de bienestar para la sociedad.",
  33: "Vuestra misión de luz es guiar con el ejemplo del amor compasivo incondicional, brindando consuelo espiritual a gran escala."
};

// Benages Couples of Tarot (Francisco Benages)
const TAROT_COUPLES = [
  { c1: 1, c2: 11, name: "El Mago + La Fuerza", desc: "Personas activas, impulso juvenil y gran magnetismo/vitalidad sexual." },
  { c1: 2, c2: 5, name: "La Sacerdotisa + El Sumo Sacerdote", desc: "Pareja espiritual, sentimientos sumamente profundos y una comunicación con raíces sagradas." },
  { c1: 3, c2: 4, name: "La Emperatriz + El Emperador", desc: "Pareja material de éxito, intereses comunes prósperos y concreción de metas en el plano físico." },
  { c1: 8, c2: 9, name: "La Justicia + El Ermitaño", desc: "Unión de la experiencia y la sabiduría. Madurez, introspección compartida y respeto absoluto sin apegos carnales." },
  { c1: 12, c2: 15, name: "El Colgado + El Diablo", desc: "Conjunción de dependencia. Advierte de relaciones de sometimiento, apegos tóxicos o sufrimiento que requiere liberación." },
  { c1: 13, c2: 14, name: "La Muerte + La Templanza", desc: "Relación de transmutación y curación. Período de grandes cambios emocionales y búsqueda de apoyo mutuo." },
  { c1: 18, c2: 19, name: "La Luna + El Sol", desc: "Almas gemelas. Afinidad profunda, unión de lo masculino y femenino en perfecto equilibrio cósmico." },
  { c1: 0, c2: 21, name: "El Loco + El Mundo", desc: "Unión perfecta del espíritu. Viaje culminado con éxito absoluto, libertad y realización mística." }
];


// Astronomical Database of Solar and Lunar Eclipses (2024 - 2030)
const ASTRONOMICAL_ECLIPSES = [
  // 2024
  { date: "2024-03-25", type: "lunar", category: "Penumbral", name: "Eclipse Lunar Penumbral", sign: "Libra", symbol: "♎", desc: "Portal de revisión en vínculos afectivos, justicia kármica y equilibrio relacional." },
  { date: "2024-04-08", type: "solar", category: "Total", name: "Eclipse Solar Total", sign: "Aries", symbol: "♈", desc: "Gran portal de nuevos comienzos, valentía y reinvención de la identidad personal." },
  { date: "2024-09-18", type: "lunar", category: "Parcial", name: "Eclipse Lunar Parcial", sign: "Piscis", symbol: "♓", desc: "Cierre de ciclos kármicos profundos, purificación emocional y despertar intuitivo." },
  { date: "2024-10-02", type: "solar", category: "Anular", name: "Eclipse Solar Anular (Anillo de Fuego)", sign: "Libra", symbol: "♎", desc: "Siembra de acuerdos armónicos, pactos del alma y reestructuración de alianzas." },

  // 2025
  { date: "2025-03-14", type: "lunar", category: "Total", name: "Eclipse Lunar Total (Luna de Sangre)", sign: "Virgo", symbol: "♍", desc: "Purificación profunda de la salud, hábitos y orden material. Sanación del templo físico." },
  { date: "2025-03-29", type: "solar", category: "Parcial", name: "Eclipse Solar Parcial", sign: "Aries", symbol: "♈", desc: "Activación del fuego interior, iniciativa audaz y ruptura de cadenas del pasado." },
  { date: "2025-09-07", type: "lunar", category: "Total", name: "Eclipse Lunar Total (Luna de Sangre)", sign: "Piscis", symbol: "♓", desc: "Clímax espiritual de máxima intuición, disolución de apegos y revelación mística." },
  { date: "2025-09-21", type: "solar", category: "Parcial", name: "Eclipse Solar Parcial", sign: "Virgo", symbol: "♍", desc: "Nuevas metodologías de trabajo, servicio consciente y reorganización de prioridades." },

  // 2026
  { date: "2026-02-17", type: "solar", category: "Anular", name: "Eclipse Solar Anular (Anillo de Fuego)", sign: "Acuario", symbol: "♒", desc: "Apertura a ideas vanguardistas, libertad comunitaria y salto evolutivo en proyectos." },
  { date: "2026-03-03", type: "lunar", category: "Total", name: "Eclipse Lunar Total (Luna de Sangre)", sign: "Virgo", symbol: "♍", desc: "Gran purificación kármica en el discernimiento, servicio y sanación cuerpo-mente." },
  { date: "2026-08-12", type: "solar", category: "Total", name: "Eclipse Solar Total Histórico", sign: "Leo", symbol: "♌", desc: "Portal solar de máxima potencia visible en España y Europa. Renacimiento de la soberanía, brillo auténtico y liderazgo del corazón." },
  { date: "2026-08-28", type: "lunar", category: "Parcial", name: "Eclipse Lunar Parcial", sign: "Piscis", symbol: "♓", desc: "Cierre de patrones ilusorios, catarsis emocional y elevación de la intuición hacia lo sagrado." },

  // 2027
  { date: "2027-02-06", type: "solar", category: "Anular", name: "Eclipse Solar Anular", sign: "Acuario", symbol: "♒", desc: "Revolución de ideales, conexión con redes afines y creación de nuevas estructuras colectivas." },
  { date: "2027-02-20", type: "lunar", category: "Penumbral", name: "Eclipse Lunar Penumbral", sign: "Virgo", symbol: "♍", desc: "Ajustes sutiles en la rutina diaria y decantación de aprendizajes prácticos." },
  { date: "2027-07-18", type: "lunar", category: "Penumbral", name: "Eclipse Lunar Penumbral", sign: "Capricornio", symbol: "♑", desc: "Evaluación de estructuras de responsabilidad, metas a largo plazo y madurez profesional." },
  { date: "2027-08-02", type: "solar", category: "Total", name: "Eclipse Solar Total Monumental", sign: "Leo", symbol: "♌", desc: "Poderosa alineación solar en el Mediterráneo. Manifestación de propósito y soberanía del alma." },
  { date: "2027-08-17", type: "lunar", category: "Penumbral", name: "Eclipse Lunar Penumbral", sign: "Acuario", symbol: "♒", desc: "Liberación de mandatos sociales y reafirmación de la autenticidad individual." },

  // 2028
  { date: "2028-01-12", type: "lunar", category: "Parcial", name: "Eclipse Lunar Parcial", sign: "Cáncer", symbol: "♋", desc: "Sanación del linaje ancestral, emociones del hogar y nutrición afectiva." },
  { date: "2028-01-26", type: "solar", category: "Anular", name: "Eclipse Solar Anular", sign: "Acuario", symbol: "♒", desc: "Visión futurista y siembra de proyectos colaborativos de alto impacto social." },
  { date: "2028-07-06", type: "lunar", category: "Parcial", name: "Eclipse Lunar Parcial", sign: "Capricornio", symbol: "♑", desc: "Cierre de viejos compromisos profesionales y consolidación de verdadera maestría." },
  { date: "2028-07-22", type: "solar", category: "Total", name: "Eclipse Solar Total", sign: "Cáncer", symbol: "♋", desc: "Renovación del templo íntimo, raíces afectivas y nuevo concepto de pertenencia." },
  { date: "2028-12-31", type: "lunar", category: "Total", name: "Eclipse Lunar Total (Luna de Sangre de Nochevieja)", sign: "Cáncer", symbol: "♋", desc: "Culminación kármica excepcional de fin de año, transmutación y apertura a un nuevo ciclo vital." },

  // 2029
  { date: "2029-01-14", type: "solar", category: "Parcial", name: "Eclipse Solar Parcial", sign: "Capricornio", symbol: "♑", desc: "Siembra de disciplina, metas firmes y soberanía en el mundo tangible." },
  { date: "2029-06-12", type: "solar", category: "Parcial", name: "Eclipse Solar Parcial", sign: "Géminis", symbol: "♊", desc: "Apertura de nuevos canales de comunicación, aprendizaje y perspectiva mental." },
  { date: "2029-06-26", type: "lunar", category: "Total", name: "Eclipse Lunar Total (Luna de Sangre)", sign: "Sagitario", symbol: "♐", desc: "Liberación de dogmas limitantes, salto de fe y expansión del horizonte espiritual." },
  { date: "2029-07-11", type: "solar", category: "Parcial", name: "Eclipse Solar Parcial", sign: "Cáncer", symbol: "♋", desc: "Protección del espacio sagrado y nuevos acuerdos en el entorno familiar." },
  { date: "2029-12-05", type: "solar", category: "Parcial", name: "Eclipse Solar Parcial", sign: "Sagitario", symbol: "♐", desc: "Inspiración hacia nuevos ideales de vida y búsqueda de verdades profundas." },
  { date: "2029-12-20", type: "lunar", category: "Total", name: "Eclipse Lunar Total (Luna de Sangre)", sign: "Géminis", symbol: "♊", desc: "Purificación de la mente comunicativa, soltando el ruido y abrazando la claridad interior." },

  // 2030
  { date: "2030-06-01", type: "solar", category: "Anular", name: "Eclipse Solar Anular", sign: "Géminis", symbol: "♊", desc: "Pacto de nuevas ideas y acuerdos de comunicación a gran escala." },
  { date: "2030-06-15", type: "lunar", category: "Parcial", name: "Eclipse Lunar Parcial", sign: "Sagitario", symbol: "♐", desc: "Conclusión de estudios, viajes espirituales y asimilación de sabiduría." },
  { date: "2030-11-25", type: "solar", category: "Total", name: "Eclipse Solar Total", sign: "Sagitario", symbol: "♐", desc: "Nuevas filosofías de vida y expansión audaz de la vocación espiritual." },
  { date: "2030-12-09", type: "lunar", category: "Penumbral", name: "Eclipse Lunar Penumbral", sign: "Géminis", symbol: "♊", desc: "Ajuste del discernimiento y serenidad mental antes del solsticio." }
];

function getEclipseForDate(date = new Date()) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  const dateKey = `${y}-${m}-${d}`;
  return ASTRONOMICAL_ECLIPSES.find(e => e.date === dateKey) || null;
}

// Calculate current moon phase details dynamically
function getMoonPhaseDetails(date = new Date()) {
  // Use milliseconds-based synodic cycle calculation starting from a known New Moon reference.
  // This handles timezone and hour of day transitions, yielding much higher precision.
  const knownNewMoon = new Date('2019-12-26T05:13:00Z').getTime();
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000; // Average synodic cycle in milliseconds
  
  // Set date to noon local time to avoid boundary glitches
  const localDateNoon = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
  const now = localDateNoon.getTime();
  const diff = now - knownNewMoon;
  const cycles = diff / synodicMonth;
  let phase = cycles - Math.floor(cycles);
  if (phase < 0) phase += 1;
  
  let phaseName = "";
  let description = "";
  let icon = "";
  
  if (phase < 0.025 || phase >= 0.975) {
    phaseName = "Luna Nueva";
    description = "Esta noche el cielo viste de oscuro. Es la fase de la <strong>introspección y la siembra</strong>. Las cartas te aconsejan iniciar caminos con mente abierta, libre de prejuicios y expectativas. Es un gran momento para formular consultas sobre nuevos comienzos o proyectos que arrancan desde cero.";
    icon = "🌑";
  } else if (phase >= 0.025 && phase < 0.225) {
    phaseName = "Luna Creciente";
    description = "La luz lunar comienza a brotar. Es la fase de la <strong>intención y la acción inicial</strong>. El influjo cósmico hoy favorece el desarrollo y la siembra activa de tus deseos. Aprovecha el consejo de las cartas para dar el primer paso con valentía.";
    icon = "🌒";
  } else if (phase >= 0.225 && phase < 0.275) {
    phaseName = "Cuarto Creciente";
    description = "La Luna se encuentra dividida a la mitad. Es la fase de la <strong>toma de decisiones y superación de obstáculos</strong>. Hoy el cosmos te reta a tomar partido y actuar. El oráculo te revelará qué fuerzas debes equilibrar para triunfar.";
    icon = "🌓";
  } else if (phase >= 0.275 && phase < 0.475) {
    phaseName = "Luna Giba Creciente";
    description = "La Luna está casi colmada. Es la fase del <strong>perfeccionamiento y la madurez intermedia</strong>. Es un período idóneo para afilar tus herramientas, analizar detalles y confiar en que la claridad final llegará a su debido tiempo.";
    icon = "🌔";
  } else if (phase >= 0.475 && phase < 0.525) {
    phaseName = "Luna Llena";
    description = "La gran linterna de plata brilla en su plenitud. Es la fase de la <strong>máxima intuición, revelación y culminación</strong>. El velo entre lo visible y lo invisible es sumamente delgado. Las respuestas que el oráculo te da son claras, maduras y cargadas de una fuerte iluminación. Confía plenamente en tu voz interior.";
    icon = "🌕";
  } else if (phase >= 0.525 && phase < 0.725) {
    phaseName = "Luna Giba Menguante";
    description = "La Luna inicia su declive luminoso. Es la fase de la <strong>gratitud y la asimilación de aprendizajes</strong>. El consejo de la lectura te invita a reflexionar sobre lo cosechado recientemente y a compartir tu sabiduría con otros.";
    icon = "🌖";
  } else if (phase >= 0.725 && phase < 0.775) {
    phaseName = "Cuarto Menguante";
    description = "La Luna reduce su mitad visible. Es la fase de la <strong>liberación, el perdón y el vaciado espiritual</strong>. El oráculo te impulsa a soltar cargas emocionales viejas, perdonar errores y dejar ir lo que obstaculiza tu libre evolución.";
    icon = "🌗";
  } else {
    phaseName = "Luna Menguante";
    description = "El último hilo de luz se despide del firmamento. Es la fase del <strong>descanso profundo, curación y cierre definitivo de ciclos</strong>. Excelente momento para consultar sobre la resolución final de conflictos, limpiezas energéticas o cómo despedir sanamente etapas de tu vida.";
    icon = "🌘";
  }
  
  return { phase, phaseName, description, icon };
}

/* ==========================================================================
   Generador de SVG de Fase Lunar Mística — Versión Premium
   ========================================================================== */
function getMoonSvg(phase, hemisphere = 'north') {
  const uid = Math.random().toString(36).slice(2, 7); // IDs únicos por instancia
  
  // Determinar si la luz está a la derecha o izquierda
  const isWaxing = phase <= 0.5;
  let lightOnRight = (hemisphere === 'north') ? isWaxing : !isWaxing;
  
  // ─── LUNA NUEVA ──────────────────────────────────────────────────
  if (phase < 0.025 || phase > 0.975) {
    return `<svg viewBox="0 0 120 120" class="mystical-moon-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nm-base-${uid}" cx="45%" cy="38%" r="55%">
          <stop offset="0%"   stop-color="#2a2550"/>
          <stop offset="60%"  stop-color="#0f0d22"/>
          <stop offset="100%" stop-color="#04030a"/>
        </radialGradient>
        <radialGradient id="nm-rim-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(160,140,255,0.18)"/>
        </radialGradient>
        <filter id="nm-glow-${uid}" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Halo mísitco exterior -->
      <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(120,90,220,0.12)" stroke-width="3"/>
      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(120,90,220,0.06)" stroke-width="6"/>
      <!-- Cuerpo lunar oscuro -->
      <circle cx="60" cy="60" r="48" fill="url(#nm-base-${uid})" stroke="rgba(200,180,255,0.07)" stroke-width="0.5"/>
      <!-- Rim glow -->
      <circle cx="60" cy="60" r="48" fill="url(#nm-rim-${uid})"/>
      <!-- Cráteres sutiles -->
      <circle cx="44" cy="48" r="6.5" fill="none" stroke="rgba(90,70,160,0.3)" stroke-width="0.8"/>
      <circle cx="44" cy="48" r="3"   fill="rgba(8,6,20,0.5)"/>
      <circle cx="58" cy="76" r="5.5" fill="none" stroke="rgba(90,70,160,0.25)" stroke-width="0.8"/>
      <circle cx="58" cy="76" r="2.5" fill="rgba(8,6,20,0.4)"/>
      <circle cx="78" cy="60" r="7.5" fill="none" stroke="rgba(90,70,160,0.2)"  stroke-width="0.8"/>
      <circle cx="78" cy="60" r="3.5" fill="rgba(8,6,20,0.35)"/>
      <circle cx="68" cy="38" r="3.5" fill="none" stroke="rgba(90,70,160,0.2)"  stroke-width="0.6"/>
      <!-- Estrellas decorativas alrededor -->
      <circle cx="18" cy="24" r="1.2" fill="rgba(255,255,255,0.7)" filter="url(#nm-glow-${uid})"/>
      <circle cx="100" cy="18" r="0.8" fill="rgba(255,255,255,0.5)"/>
      <circle cx="108" cy="80" r="1"   fill="rgba(255,255,255,0.6)"/>
      <circle cx="14" cy="90" r="0.9"  fill="rgba(255,255,255,0.5)"/>
    </svg>`;
  }

  // ─── LUNA LLENA ──────────────────────────────────────────────────
  if (phase >= 0.475 && phase <= 0.525) {
    return `<svg viewBox="0 0 120 120" class="mystical-moon-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fm-light-${uid}" cx="38%" cy="32%" r="60%">
          <stop offset="0%"   stop-color="#ffffff"/>
          <stop offset="45%"  stop-color="#fff8e8"/>
          <stop offset="80%"  stop-color="#f5d875"/>
          <stop offset="100%" stop-color="#c8951c"/>
        </radialGradient>
        <radialGradient id="fm-halo-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="72%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(229,193,88,0.3)"/>
        </radialGradient>
        <radialGradient id="fm-halo2-${uid}" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stop-color="transparent"/>
          <stop offset="100%" stop-color="rgba(255,240,150,0.12)"/>
        </radialGradient>
        <filter id="fm-glow-${uid}" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- Halos externos -->
      <circle cx="60" cy="60" r="58" fill="url(#fm-halo2-${uid})"/>
      <circle cx="60" cy="60" r="54" fill="url(#fm-halo-${uid})"/>
      <!-- Cuerpo lunar luminoso -->
      <circle cx="60" cy="60" r="48" fill="url(#fm-light-${uid})" filter="url(#fm-glow-${uid})"/>
      <!-- Cráteres visibles -->
      <circle cx="44" cy="48" r="6.5" fill="rgba(180,140,30,0.18)"/>
      <circle cx="44" cy="48" r="3"   fill="rgba(210,168,40,0.15)"/>
      <circle cx="58" cy="76" r="5.5" fill="rgba(180,140,30,0.15)"/>
      <circle cx="58" cy="76" r="2.5" fill="rgba(210,168,40,0.12)"/>
      <circle cx="78" cy="60" r="7.5" fill="rgba(180,140,30,0.14)"/>
      <circle cx="78" cy="60" r="3.5" fill="rgba(210,168,40,0.1)"/>
      <circle cx="35" cy="65" r="4"   fill="rgba(180,140,30,0.12)"/>
      <circle cx="68" cy="38" r="3"   fill="rgba(180,140,30,0.1)"/>
      <!-- Mare (mares lunares) dark patches -->
      <ellipse cx="50" cy="52" rx="11" ry="9"  fill="rgba(160,120,20,0.08)" transform="rotate(-15,50,52)"/>
      <ellipse cx="72" cy="45" rx="8"  ry="6"  fill="rgba(160,120,20,0.07)" transform="rotate(20,72,45)"/>
    </svg>`;
  }

  // ─── FASES PARCIALES ─────────────────────────────────────────────
  const sweepOuter = lightOnRight ? 1 : 0;
  const rx = 48 * Math.abs(1 - 4 * Math.abs(phase - 0.5));
  const safeRx = Math.max(0.5, rx);
  const isGibbous = phase > 0.25 && phase < 0.75;
  const sweepInner = isGibbous ? (lightOnRight ? 1 : 0) : (lightOnRight ? 0 : 1);
  
  return `<svg viewBox="0 0 120 120" class="mystical-moon-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pm-shadow-${uid}" cx="50%" cy="40%" r="55%">
        <stop offset="0%"   stop-color="#1e1b3a"/>
        <stop offset="70%"  stop-color="#0d0b1e"/>
        <stop offset="100%" stop-color="#06050b"/>
      </radialGradient>
      <radialGradient id="pm-light-${uid}" cx="38%" cy="32%" r="60%">
        <stop offset="0%"   stop-color="#ffffff"/>
        <stop offset="50%"  stop-color="#fff8e8"/>
        <stop offset="82%"  stop-color="#f0d060"/>
        <stop offset="100%" stop-color="#b8932c"/>
      </radialGradient>
      <radialGradient id="pm-rim-${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="78%" stop-color="transparent"/>
        <stop offset="100%" stop-color="rgba(229,193,88,0.15)"/>
      </radialGradient>
      <filter id="pm-glow-${uid}" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <clipPath id="pm-clip-${uid}">
        <circle cx="60" cy="60" r="48"/>
      </clipPath>
    </defs>
    <!-- Halo sutil -->
    <circle cx="60" cy="60" r="54" fill="url(#pm-rim-${uid})"/>
    <!-- Fondo oscuro lunar -->
    <circle cx="60" cy="60" r="48" fill="url(#pm-shadow-${uid})" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
    <!-- Cráteres en zona oscura -->
    <circle cx="44" cy="48" r="6.5" fill="rgba(10,8,28,0.7)"/>
    <circle cx="44" cy="48" r="3"   fill="rgba(6,5,15,0.8)"/>
    <circle cx="58" cy="76" r="5.5" fill="rgba(10,8,28,0.6)"/>
    <circle cx="58" cy="76" r="2.5" fill="rgba(6,5,15,0.7)"/>
    <circle cx="78" cy="60" r="7.5" fill="rgba(10,8,28,0.55)"/>
    <circle cx="78" cy="60" r="3.5" fill="rgba(6,5,15,0.6)"/>
    <!-- Sección iluminada con clip -->
    <g clip-path="url(#pm-clip-${uid})">
      <path d="M 60 12
               A 48 48 0 0 ${sweepOuter} 60 108
               A ${safeRx} 48 0 0 ${sweepInner} 60 12"
            fill="url(#pm-light-${uid})"
            filter="url(#pm-glow-${uid})"/>
      <!-- Cráteres en zona iluminada -->
      <circle cx="44" cy="48" r="5" fill="rgba(200,155,30,0.18)"/>
      <circle cx="58" cy="76" r="4" fill="rgba(200,155,30,0.15)"/>
      <circle cx="78" cy="60" r="6" fill="rgba(200,155,30,0.14)"/>
      <!-- Terminador glow line -->
      <line x1="60" y1="12" x2="60" y2="108"
            stroke="rgba(255,240,180,0.12)" stroke-width="2"
            transform="rotate(${lightOnRight ? 0 : 180}, 60, 60)"/>
    </g>
    <!-- Estrellas decorativas -->
    <circle cx="${lightOnRight ? 15 : 105}" cy="30"  r="1.2" fill="rgba(255,255,255,0.6)"/>
    <circle cx="${lightOnRight ? 10 : 110}" cy="80"  r="0.9" fill="rgba(255,255,255,0.5)"/>
    <circle cx="${lightOnRight ? 20 : 100}" cy="100" r="0.8" fill="rgba(255,255,255,0.4)"/>
  </svg>`;
}

// Get Sun Sign (Zodiac Season)
function getSunSign(date = new Date()) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario";
  return "Piscis";
}

// Calculate Moon Sign (Dynamic Sidereal Lunar Position, Aries on 01/01/2026, Aquarius on 06/06/2026)
function getMoonSign(date = new Date()) {
  const refJD = 2451544.5; // Jan 1, 2000 reference
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const A = Math.floor(y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (y + 4716));
  const F = Math.floor(30.6001 * (m + 1));
  const jd = C + day + E + F - 1524.5;

  const days = jd - refJD;
  const position = (days / 27.321661) % 1;
  const deg = (position >= 0 ? position : position + 1) * 360;
  
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  // Offset of 202 degrees to calibrate moon position on Jan 1 2000
  let moonDeg = deg + 202;
  if (moonDeg >= 360) moonDeg -= 360;
  
  const idx = Math.floor(moonDeg / 30);
  return signs[idx];
}

// Card Art SVG Database (Return custom inline SVGs for the 22 Major Arcana)
function getCardSvg(id) {
  const gold = 'var(--gold-color)';
  const purple = 'var(--purple-color)';
  
  // Base SVG wrapper
  const svgStart = `<svg viewBox="0 0 100 100" class="card-art-svg" xmlns="http://www.w3.org/2000/svg">`;
  const svgEnd = `</svg>`;
  
  let content = '';
  
  switch(id) {
    case 0: // El Loco
      content = `
        <circle cx="50" cy="50" r="10" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="${gold}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <path d="M30 40 L50 20 L70 40 L50 80 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="20" r="3" fill="${gold}"/>
        <path d="M15 80 Q50 60 85 80" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 1: // El Mago
      content = `
        <path d="M30 30 Q50 15 70 30 Q50 45 30 30" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M30 70 Q50 55 70 70 Q50 85 30 70" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="30" y1="30" x2="70" y2="70" stroke="${purple}" stroke-width="1.5"/>
        <line x1="70" y1="30" x2="30" y2="70" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="12" fill="none" stroke="${gold}" stroke-width="2"/>
      `;
      break;
    case 2: // La Papisa
      content = `
        <rect x="30" y="35" width="40" height="50" rx="3" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="35" x2="50" y2="85" stroke="${gold}" stroke-width="1"/>
        <path d="M40 50 H60 M40 60 H60 M40 70 H60" stroke="${purple}" stroke-width="1.5"/>
        <path d="M25 20 Q50 40 75 20" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="20" r="6" fill="${gold}"/>
      `;
      break;
    case 3: // La Emperatriz
      content = `
        <path d="M20 70 L50 20 L80 70 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="45" r="15" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <path d="M50 20 V80 M35 70 H65" stroke="${gold}" stroke-width="1"/>
        <path d="M50 12 L55 22 L65 25 L57 32 L60 42 L50 36 L40 42 L43 32 L35 25 L45 22 Z" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 4: // El Emperador
      content = `
        <rect x="25" y="25" width="50" height="50" rx="6" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="25" y1="50" x2="75" y2="50" stroke="${gold}" stroke-width="1"/>
        <line x1="50" y1="25" x2="50" y2="75" stroke="${gold}" stroke-width="1"/>
        <circle cx="50" cy="50" r="8" fill="none" stroke="${purple}" stroke-width="2"/>
        <path d="M40 90 L50 75 L60 90" fill="none" stroke="${gold}" stroke-width="1.5"/>
      `;
      break;
    case 5: // El Papa
      content = `
        <line x1="50" y1="15" x2="50" y2="85" stroke="${gold}" stroke-width="2"/>
        <line x1="30" y1="30" x2="70" y2="30" stroke="${gold}" stroke-width="2"/>
        <line x1="35" y1="42" x2="65" y2="42" stroke="${gold}" stroke-width="1.5"/>
        <line x1="40" y1="55" x2="60" y2="55" stroke="${gold}" stroke-width="1.5"/>
        <path d="M30 80 C30 65 40 65 50 65 C60 65 70 65 70 80" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="65" r="4" fill="${gold}"/>
      `;
      break;
    case 6: // El Enamorado
      content = `
        <path d="M12 40 C12 25 31 20 50 40 C69 20 88 25 88 40 C88 65 50 85 50 85 C50 85 12 65 12 40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M50 35 L40 50 H60 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <line x1="10" y1="15" x2="90" y2="75" stroke="${gold}" stroke-width="1" stroke-dasharray="4,4"/>
        <polygon points="90,75 80,72 87,65" fill="${gold}"/>
      `;
      break;
    case 7: // El Carro
      content = `
        <rect x="25" y="45" width="50" height="35" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="35" cy="80" r="10" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="65" cy="80" r="10" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <path d="M50 15 L25 45 H75 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="35" r="5" fill="${gold}"/>
      `;
      break;
    case 8: // La Justicia
      content = `
        <line x1="20" y1="35" x2="80" y2="35" stroke="${gold}" stroke-width="2"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="${gold}" stroke-width="1.5"/>
        <line x1="30" y1="35" x2="30" y2="60" stroke="${purple}" stroke-width="1"/>
        <line x1="70" y1="35" x2="70" y2="60" stroke="${purple}" stroke-width="1"/>
        <path d="M20 60 Q30 70 40 60" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M60 60 Q70 70 80 60" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <polygon points="50,85 45,75 55,75" fill="${gold}"/>
      `;
      break;
    case 9: // El Ermitaño
      content = `
        <path d="M50 15 Q25 40 25 70 H75 Q75 40 50 15 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="50" cy="45" r="8" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="53" x2="50" y2="85" stroke="${gold}" stroke-width="1.5"/>
        <path d="M40 85 H60" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="50" cy="45" r="3" fill="${gold}"/>
      `;
      break;
    case 10: // La Rueda de la Fortuna
      content = `
        <circle cx="50" cy="50" r="28" fill="none" stroke="${gold}" stroke-width="2"/>
        <circle cx="50" cy="50" r="10" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="10" x2="50" y2="90" stroke="${purple}" stroke-width="1"/>
        <line x1="10" y1="50" x2="90" y2="50" stroke="${purple}" stroke-width="1"/>
        <line x1="22" y1="22" x2="78" y2="78" stroke="${purple}" stroke-width="1"/>
        <line x1="78" y1="22" x2="22" y2="78" stroke="${purple}" stroke-width="1"/>
      `;
      break;
    case 11: // La Fuerza
      content = `
        <path d="M50 20 Q70 5 85 20 Q70 35 50 20 Q30 5 15 20 Q30 35 50 20" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M25 75 C30 55 50 55 55 70 C55 55 70 55 75 75" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="35" cy="60" r="5" fill="${gold}"/>
        <circle cx="65" cy="60" r="5" fill="${gold}"/>
      `;
      break;
    case 12: // El Colgado
      content = `
        <line x1="20" y1="15" x2="80" y2="15" stroke="${gold}" stroke-width="2"/>
        <line x1="30" y1="15" x2="30" y2="85" stroke="${gold}" stroke-width="1.5"/>
        <line x1="70" y1="15" x2="70" y2="85" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="15" x2="50" y2="40" stroke="${purple}" stroke-width="1.5"/>
        <path d="M40 40 L60 40 L50 65 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="65" x2="50" y2="80" stroke="${purple}" stroke-width="1.5"/>
      `;
      break;
    case 13: // La Muerte
      content = `
        <path d="M80 20 Q40 20 30 50 L20 85" fill="none" stroke="${gold}" stroke-width="2"/>
        <path d="M30 50 L75 70" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="35" cy="35" r="6" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="35" y1="41" x2="35" y2="60" stroke="${gold}" stroke-width="1"/>
        <path d="M20 85 H50" stroke="${gold}" stroke-width="1.5"/>
      `;
      break;
    case 14: // La Templanza
      content = `
        <path d="M30 25 H70 L60 55 H40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M30 80 H70 L60 55 H40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M42 38 Q50 50 58 38" fill="none" stroke="${purple}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <path d="M42 68 Q50 55 58 68" fill="none" stroke="${purple}" stroke-width="1.5" stroke-dasharray="2,2"/>
        <circle cx="50" cy="50" r="4" fill="${gold}"/>
      `;
      break;
    case 15: // El Diablo
      content = `
        <polygon points="50,15 35,40 65,40" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M25 25 L35 40 M75 25 L65 40" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="35" cy="55" r="5" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="65" cy="55" r="5" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <path d="M35 60 L50 85 L65 60" fill="none" stroke="${gold}" stroke-width="1.5"/>
      `;
      break;
    case 16: // La Torre
      content = `
        <rect x="35" y="30" width="30" height="55" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <polygon points="30,30 50,12 70,30" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M15 25 L45 40 L40 50 L55 60 L45 75 L85 85" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="38" cy="45" r="2" fill="${gold}"/>
        <circle cx="62" cy="65" r="2" fill="${gold}"/>
      `;
      break;
    case 17: // La Estrella
      content = `
        <polygon points="50,12 53,28 68,20 57,32 72,38 56,43 62,58 50,47 38,58 44,43 28,38 43,32 32,20 47,28" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="3" fill="${purple}"/>
        <circle cx="80" cy="20" r="3" fill="${purple}"/>
        <circle cx="20" cy="70" r="3" fill="${purple}"/>
        <circle cx="80" cy="70" r="3" fill="${purple}"/>
        <path d="M35 85 Q50 65 65 85" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 18: // La Luna
      content = `
        <circle cx="50" cy="50" r="25" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <path d="M50 25 A25 25 0 0 0 25 50 A20 20 0 0 1 50 27" fill="${gold}"/>
        <polygon points="20,75 35,60 30,85" fill="none" stroke="${purple}" stroke-width="1"/>
        <polygon points="80,75 65,60 70,85" fill="none" stroke="${purple}" stroke-width="1"/>
        <path d="M40 90 Q50 78 60 90" fill="none" stroke="${gold}" stroke-width="1"/>
      `;
      break;
    case 19: // El Sol
      content = `
        <circle cx="50" cy="50" r="20" fill="none" stroke="${gold}" stroke-width="2"/>
        <circle cx="50" cy="50" r="14" fill="${gold}" opacity="0.3"/>
        <path d="M50 10 V25 M50 75 V90 M10 50 H25 M75 50 H90 M22 22 L32 32 M68 68 L78 78 M78 22 L68 32 M22 68 L32 58" stroke="${gold}" stroke-width="1.5"/>
        <path d="M50 18 Q55 35 62 38" fill="none" stroke="${purple}" stroke-width="1"/>
        <path d="M50 82 Q45 65 38 62" fill="none" stroke="${purple}" stroke-width="1"/>
      `;
      break;
    case 20: // El Juicio
      content = `
        <path d="M35 15 H65 L60 35 H40 Z" fill="none" stroke="${gold}" stroke-width="1.5"/>
        <line x1="50" y1="35" x2="50" y2="70" stroke="${gold}" stroke-width="1.5"/>
        <path d="M40 70 L50 85 L60 70 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="35" cy="80" r="4" fill="${gold}"/>
        <circle cx="65" cy="80" r="4" fill="${gold}"/>
        <path d="M20 50 Q50 35 80 50" fill="none" stroke="${gold}" stroke-width="1" stroke-dasharray="3,3"/>
      `;
      break;
    case 21: // El Mundo
      content = `
        <ellipse cx="50" cy="50" rx="24" ry="36" fill="none" stroke="${gold}" stroke-width="2"/>
        <path d="M50 25 L40 55 H60 Z" fill="none" stroke="${purple}" stroke-width="1.5"/>
        <circle cx="20" cy="20" r="4" fill="${gold}"/>
        <circle cx="80" cy="20" r="4" fill="${gold}"/>
        <circle cx="20" cy="80" r="4" fill="${gold}"/>
        <circle cx="80" cy="80" r="4" fill="${gold}"/>
      `;
      break;
  }
  
  return svgStart + content + svgEnd;
}

// Convert numbers to Roman numerals
function getRomanNumeral(id) {
  const roman = ["0", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "VIIII", "X", "XI", "XII", "XIII", "XIIII", "XV", "XVI", "XVII", "XVIII", "XVIIII", "XX", "XXI"];
  return roman[id] || id.toString();
}

// Numerological teosophical reduction to 0-21 range
function reduceTarotNumber(num) {
  while (num > 21) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

// Reduction to 1-9 (reserving master numbers 11, 22, 33)
function reduceNumerology(num) {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
}

// Analizar vocales y consonantes de un nombre para obtener el Perfil y estudio kármico
function analyzeNameNumerology(name) {
  const cleanName = name.toLowerCase()
    .replace(/ñ/g, '__tilde_n__')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/__tilde_n__/g, 'ñ')
    .replace(/[^a-zñ]/g, "");
  const vowelsList = ['a', 'e', 'i', 'o', 'u'];
  
  let soulSum = 0;
  let personalitySum = 0;
  let letterCounts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
  let totalLetters = 0;
  
  for (let char of cleanName) {
    const val = GEMATRIA_MAP[char];
    if (val) {
      letterCounts[val]++;
      totalLetters++;
      if (vowelsList.includes(char)) {
        soulSum += val;
      } else {
        personalitySum += val;
      }
    }
  }
  
  return {
    soulSum,
    personalitySum,
    letterCounts,
    totalLetters
  };
}

// Fisher-Yates Shuffling Algorithm
function shuffleDeck(deck) {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
}

// Initialize interface DOM elements
const questionInput = document.getElementById('question-input');
const categorySelect = document.getElementById('category-select');
const spreadSelect = document.getElementById('spread-select');
const consultBtn = document.getElementById('consult-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const cardsBoard = document.getElementById('cards-board');
const deckContainer = document.getElementById('deck-container');
const resultsPanel = document.getElementById('results-panel');
const resetBtn = document.getElementById('reset-btn');
const readingStatusTitle = document.getElementById('reading-status-title');
const readingStatusDesc = document.getElementById('reading-status-desc');
const reversalsToggle = document.getElementById('reversals-toggle');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const historyList = document.getElementById('history-list');

// Horoscope Tab DOM Elements
const zodiacSelect = document.getElementById('zodiac-select');
const astroSpreadSelect = document.getElementById('astro-spread-select');
const astroConsultBtn = document.getElementById('astro-consult-btn');
const astroShuffleBtn = document.getElementById('astro-shuffle-btn');
const astroCardsBoard = document.getElementById('astro-cards-board');
const astroDeckContainer = document.getElementById('astro-deck-container');
const astroResultsPanel = document.getElementById('astro-results-panel');
const astroResetBtn = document.getElementById('astro-reset-btn');
const astroReadingStatusTitle = document.getElementById('astro-reading-status-title');
const astroReadingStatusDesc = document.getElementById('astro-reading-status-desc');
const astroBreakdownGrid = document.getElementById('astro-breakdown-grid');
const astroForecastText = document.getElementById('astro-forecast-text');
const astroSummaryTitle = document.getElementById('astro-summary-title');
const astroSummaryForecastText = document.getElementById('astro-summary-forecast-text');
const astroSpecialSection = document.getElementById('astro-special-section');
const astroSpecialBox = document.getElementById('astro-special-box');
const astroUserSignText = document.getElementById('astro-user-sign-text');
const astroResultTitle = document.getElementById('astro-result-title');

// Transits elements
const astroTransitsConsultBtn = document.getElementById('astro-transits-consult-btn');
const astroTransitsPeriodSelect = document.getElementById('astro-transits-period-select');
const astroTarotFormGroup = document.getElementById('astro-tarot-form-group');
const astroTransitsFormGroup = document.getElementById('astro-transits-form-group');
const astroTarotResultsGroup = document.getElementById('astro-tarot-results-group');
const astroTransitsResultsGroup = document.getElementById('astro-transits-results-group');
const transitsPlanetsGrid = document.getElementById('transits-planets-grid');
const aspectsWheelDial = document.getElementById('aspects-wheel-dial');
const transitsGeneralBox = document.getElementById('transits-general-box');
const transitsLoveBox = document.getElementById('transits-love-box');
const transitsCareerBox = document.getElementById('transits-career-box');
const transitsMindBox = document.getElementById('transits-mind-box');

// Draw N unique cards from the shuffled deck, optionally applying reversed states
function drawCards(count) {
  const shuffled = shuffleDeck(window.tarotDb);
  const allowReversals = reversalsToggle ? reversalsToggle.checked : false;
  return shuffled.slice(0, count).map(card => {
    return {
      ...card,
      isReversed: allowReversals ? (Math.random() < 0.3) : false
    };
  });
}

// Setup Category Selector
if (categorySelect) {
  categorySelect.addEventListener('change', (e) => {
    selectedCategory = e.target.value;
  });
}

// Shuffling Animation Trigger
if (shuffleBtn) {
  shuffleBtn.addEventListener('click', () => {
    if (isShuffling) return;
    isShuffling = true;
    const deck = document.getElementById('mystical-deck');
    if (deck) deck.classList.add('shuffling');
    shuffleBtn.textContent = 'Mezclando astros...';
    shuffleBtn.disabled = true;
    
    setTimeout(() => {
      if (deck) deck.classList.remove('shuffling');
      shuffleBtn.textContent = 'Barajar Mazo';
      shuffleBtn.disabled = false;
      isShuffling = false;
    }, 1800);
  });
}

// Consult Oracle Button click handler
if (consultBtn) {
  consultBtn.addEventListener('click', () => {
  const question = questionInput.value.trim();
  const selectedSpreadVal = spreadSelect ? spreadSelect.value : 'yesno1';
  
  if (!question) {
    alert("Por favor, escribe tu pregunta antes de consultar al oráculo para que las cartas sintonicen con tu energía.");
    questionInput.focus();
    return;
  }

  // Set spread counts and card drawing logic
  cardsBoard.className = 'cards-board';
  if (selectedSpreadVal === 'yesno1') {
    totalCardsInSpread = 1;
    currentSpread = drawCards(1);
  } else if (selectedSpreadVal === 'yesno3' || selectedSpreadVal === 'destiny') {
    totalCardsInSpread = 3;
    currentSpread = drawCards(3);
  } else if (selectedSpreadVal === 'cross5') {
    totalCardsInSpread = 5;
    // Draw 4 unique cards first
    const drawn4 = drawCards(4);
    // Sum their IDs
    const sum = drawn4.reduce((acc, card) => acc + card.id, 0);
    // Reduce teosophically to 0-21 range
    const reducedId = reduceTarotNumber(sum);
    // Retrieve the calculated card from database and determine if reversed
    const rawSynthesisCard = window.tarotDb.find(c => c.id === reducedId);
    const allowReversals = reversalsToggle ? reversalsToggle.checked : false;
    const synthesisCard = {
      ...rawSynthesisCard,
      isReversed: allowReversals ? (Math.random() < 0.3) : false
    };
    // Create the final 5-card spread
    currentSpread = [...drawn4, synthesisCard];
    cardsBoard.classList.add('layout-cross');
  } else if (selectedSpreadVal === 'pyramid6') {
    totalCardsInSpread = 6;
    currentSpread = drawCards(6);
    cardsBoard.classList.add('layout-pyramid');
  } else if (selectedSpreadVal === 'celtic10') {
    totalCardsInSpread = 10;
    currentSpread = drawCards(10);
    cardsBoard.classList.add('layout-celtic');
  } else if (selectedSpreadVal === 'mirror4') {
    totalCardsInSpread = 4;
    currentSpread = drawCards(4);
    cardsBoard.classList.add('layout-mirror');
  } else if (selectedSpreadVal === 'clarity4') {
    totalCardsInSpread = 4;
    currentSpread = drawCards(4);
    cardsBoard.classList.add('layout-clarity');
  }
  flippedCount = 0;

  // Clear previous and deal placeholders
  cardsBoard.innerHTML = '';
  deckContainer.style.display = 'none';
  resultsPanel.classList.add('hidden');

  // Update tapete headers
  readingStatusTitle.textContent = "El Oráculo ha dispuesto tus cartas";
  readingStatusDesc.textContent = "Haz clic en cada carta para revelarla y leer su mensaje.";

  // Generate placeholders or card back wrappers
  currentSpread.forEach((card, index) => {
    let positionName = "Carta " + (index + 1);
    if (selectedSpreadVal === 'destiny') {
      const positions = ["Pasado / Origen", "Presente / Situación", "Futuro / Destino"];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'cross5') {
      const positions = ["A favor (Pro)", "En contra (Contra)", "Consejo / Juez", "Solución / Fallo", "Síntesis Central"];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'pyramid6') {
      const positions = [
        "Plano Mental (Mente)", 
        "Plano Sentimental (Corazón)", 
        "Plano Material (Acción)", 
        "El Obstáculo (Desafío)", 
        "El Apoyo (Recurso)", 
        "Desenlace (Consejo Final)"
      ];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'celtic10') {
      const positions = [
        "Tú (Actual)",
        "El Cruce (Obstáculo)",
        "La Corona (Metas)",
        "La Base (Raíces)",
        "El Pasado (Reciente)",
        "El Futuro (Inmediato)",
        "Tu Actitud",
        "Tu Entorno",
        "Esperanzas/Miedos",
        "El Resultado"
      ];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'mirror4') {
      const positions = [
        "Tu Estado Actual",
        "Su Estado Actual",
        "Tu Proyección sobre Ella/Él",
        "Su Proyección sobre Ti"
      ];
      positionName = positions[index];
    } else if (selectedSpreadVal === 'clarity4') {
      const positions = [
        "El Bloqueo (Duda)",
        "La Fuerza Mágica (Recurso)",
        "La Acción (Conjuro)",
        "La Revelación"
      ];
      positionName = positions[index];
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.className = `card-wrapper dealt${card.isReversed ? ' reversed' : ''}`;
    cardWrapper.style.animationDelay = `${index * 0.25}s`;
    cardWrapper.setAttribute('data-index', index);

    // Remove dealt class after deal animation finishes to allow custom layout transforms (like rotation in Celtic Cross)
    setTimeout(() => {
      cardWrapper.classList.remove('dealt');
      cardWrapper.style.animationDelay = '';
    }, (index * 0.25 + 0.8) * 1000);

    // Create front/back card element structure
    cardWrapper.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      </div>
      <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
        ${positionName}
      </div>
    `;

    // Click handler for card flipping
    cardWrapper.addEventListener('click', function flipHandler() {
      if (cardWrapper.classList.contains('flipped')) return;
      cardWrapper.classList.add('flipped');
      flippedCount++;

      // Once all cards are flipped, show the interpretation
      if (flippedCount === totalCardsInSpread) {
        setTimeout(showInterpretation, 800);
      }
    });

    cardsBoard.appendChild(cardWrapper);
    apply3DTilt(cardWrapper);
  });

  // Smooth scroll to card board
  document.querySelector('.reading-table').scrollIntoView({ behavior: 'smooth' });
});

// Generate dynamic interpretations and display results
function showInterpretation() {
  const selectedSpreadVal = spreadSelect ? spreadSelect.value : 'yesno1';
  const question = questionInput.value.trim();

  // Populate basic header
  document.getElementById('result-question-text').textContent = `"${question}"`;
  
  // Set category badge
  const categoryNames = {
    general: 'General',
    love: 'Amor y Sentimientos',
    work: 'Trabajo y Finanzas',
    health: 'Bienestar y Salud'
  };
  const badge = document.getElementById('result-category-badge');
  badge.textContent = categoryNames[selectedCategory];

  // Setup Panels visibility
  const yesNoPanel = document.getElementById('yesno-verdict-section');
  const destinyPanel = document.getElementById('destiny-synthesis-section');
  const lunarInfluenceSection = document.getElementById('lunar-influence-section');
  
  yesNoPanel.classList.add('hidden');
  destinyPanel.classList.add('hidden');
  if (lunarInfluenceSection) lunarInfluenceSection.classList.add('hidden');

  if (selectedSpreadVal === 'yesno1' || selectedSpreadVal === 'yesno3') {
    yesNoPanel.classList.remove('hidden');
    calculateYesNo(selectedSpreadVal);
  } else {
    // MEJORA 9: Show mystical loader first, then reveal synthesis after 1.5s
    const loaderSection = document.getElementById('oracle-loader-section');
    if (loaderSection) loaderSection.classList.remove('hidden');

    const synthesisRevealFn = () => {
      if (loaderSection) loaderSection.classList.add('hidden');
      destinyPanel.classList.remove('hidden');

      if (selectedSpreadVal === 'destiny') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis Narrativa del Destino";
        generateDestinySynthesis(question);
      } else if (selectedSpreadVal === 'cross5') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis de la Tirada en Cruz";
        generateCrossSynthesis(question);
      } else if (selectedSpreadVal === 'pyramid6') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis de la Pirámide Invertida";
        generatePyramidSynthesis(question);
      } else if (selectedSpreadVal === 'celtic10') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis Evolutiva de la Cruz Celta";
        generateCelticSynthesis(question);
      } else if (selectedSpreadVal === 'mirror4') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Síntesis del Espejo Relacional";
        generateMirrorSynthesis(question);
      } else if (selectedSpreadVal === 'clarity4') {
        document.querySelector('#destiny-synthesis-section .section-title').textContent = "Hechizo de Claridad y Solución";
        generateClaritySynthesis(question);
      }
    };

    setTimeout(synthesisRevealFn, 1600);
  }

  // Populate Lunar Influence
  const lunarInfluenceSymbol = document.getElementById('lunar-influence-symbol');
  const lunarInfluenceText = document.getElementById('lunar-influence-text');
  
  if (lunarInfluenceSection && lunarInfluenceSymbol && lunarInfluenceText) {
    const lunarDetails = getMoonPhaseDetails();
    lunarInfluenceSymbol.textContent = lunarDetails.icon;
    
    let categoryNote = "";
    switch(selectedCategory) {
      case 'love':
        categoryNote = ` En la esfera sentimental, esta fase lunar aconseja enfocar tus intenciones hacia la curación emocional, la receptividad y la escucha mutua.`;
        break;
      case 'work':
        categoryNote = ` Respecto a tus finanzas y profesión, esta energía te sugiere actuar con prudencia, planificar tus pasos con estrategia y no apresurar inversiones.`;
        break;
      case 'health':
        categoryNote = ` En lo que respecta a tu bienestar, aprovecha este influjo cósmico para descansar, depurar tensiones y nutrir tu cuerpo físico.`;
        break;
      default:
        categoryNote = ` A nivel general, esta alineación celeste te invita a sintonizar tu voluntad personal con las leyes naturales del cambio y fluir con el ritmo universal.`;
    }
    
    lunarInfluenceText.innerHTML = `Bajo la influencia de la <strong>${lunarDetails.phaseName}</strong> (${lunarDetails.icon}): ${lunarDetails.description}${categoryNote}`;
    lunarInfluenceSection.classList.remove('hidden');
  }

  // Populate individual card breakdown details
  const breakdownGrid = document.getElementById('breakdown-grid');
  breakdownGrid.innerHTML = '';

  currentSpread.forEach((card, index) => {
    let posLabel = "Carta " + (index + 1);
    if (selectedSpreadVal === 'destiny') {
      const positions = ["Pasado / Origen", "Presente / Situación", "Futuro / Destino"];
      posLabel = positions[index];
    } else if (selectedSpreadVal === 'cross5') {
      const positions = ["A favor (Pro)", "En contra (Contra)", "Consejo / Juez", "Solución / Fallo", "Síntesis Central"];
      posLabel = positions[index];
    } else if (selectedSpreadVal === 'pyramid6') {
      const positions = [
        "Plano Mental (Mente)", 
        "Plano Sentimental (Corazón)", 
        "Plano Material (Acción)", 
        "El Obstáculo (Desafío)", 
        "El Apoyo (Recurso)", 
        "Desenlace (Consejo Final)"
      ];
      posLabel = positions[index];
    }

    const item = document.createElement('div');
    item.className = 'card-breakdown-card';
    
    const miniViewClass = `card-mini-view${card.isReversed ? ' reversed' : ''}`;
    const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
    const meaningText = card.isReversed ? card.reversed[selectedCategory] : card.meanings[selectedCategory];
    const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦", keywords: "Fuerza universal" };

    item.innerHTML = `
      <div class="${miniViewClass}" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      <div class="card-info-content">
        <div class="card-info-header">
          <h4 class="card-info-title">${cardNameDisplay}</h4>
          <span class="position-tag">${posLabel}</span>
        </div>
        <div class="card-astro-badge" title="${astro.keywords}">
          <span class="card-astro-symbol">${astro.symbol}</span>
          <span>Regente: ${astro.ruler} (${astro.keywords})</span>
        </div>
        <p class="card-info-themes"><strong>Energía:</strong> ${card.keyThemes}</p>
        <p class="card-info-meaning">${meaningText}</p>
      </div>
    `;
    breakdownGrid.appendChild(item);
  });

  // Reveal results
  resultsPanel.classList.remove('hidden');
  resultsPanel.scrollIntoView({ behavior: 'smooth' });

  // Update tapete subtitle
  readingStatusTitle.textContent = "Lectura Completada";
  readingStatusDesc.textContent = "Desplázate hacia abajo para leer la síntesis detallada del oráculo.";

  // Save to history (if it's not a reloaded reading)
  if (!isFromHistory) {
    saveReading(question, selectedSpreadVal);
  }
  isFromHistory = false; // Reset flag
}

// Calculate Yes/No answers and sum score weights
function calculateYesNo(type) {
  const badge = document.getElementById('verdict-badge');
  const explanation = document.getElementById('verdict-explanation');

  badge.className = 'verdict-badge'; // Reset classes

  if (type === 'yesno1') {
    const card = currentSpread[0];
    const score = card.isReversed ? (card.yesNoScore * -1) : card.yesNoScore;

    if (score > 0) {
      badge.textContent = 'SÍ';
      badge.classList.add('si');
    } else if (score < 0) {
      badge.textContent = 'NO';
      badge.classList.add('no');
    } else {
      badge.textContent = 'NEUTRO';
      badge.classList.add('neutro');
    }
    
    const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
    const meaningText = card.isReversed ? card.reversed[selectedCategory] : card.meanings[selectedCategory];
    
    let answerText = card.yesNoText;
    if (card.isReversed) {
      if (card.yesNoScore > 0) {
        answerText = "Su energía positiva se encuentra bloqueada u obstaculizada, sugiriendo retrasos u oposiciones a tu consulta.";
      } else if (card.yesNoScore < 0) {
        answerText = "Los aspectos difíciles o negativos de esta carta se muestran atenuados o en vías de resolución, abriendo una ventana de oportunidad o liberación lenta.";
      } else {
        answerText = "Las dudas e incertidumbres se profundizan o se vuelven más complejas, recomendando no actuar precipitadamente.";
      }
    }

    explanation.innerHTML = `<strong>${cardNameDisplay}</strong> responde: ${answerText}<br><br><span style="font-size:0.9rem; color:var(--text-muted);">${meaningText}</span>`;
  } else {
    // 3 Cards spread logic
    let totalScore = 0;
    currentSpread.forEach(card => {
      const score = card.isReversed ? (card.yesNoScore * -1) : card.yesNoScore;
      totalScore += score;
    });

    let verdict = 'NEUTRO';
    if (totalScore > 0) {
      verdict = 'SÍ';
      badge.classList.add('si');
    } else if (totalScore < 0) {
      verdict = 'NO';
      badge.classList.add('no');
    } else {
      verdict = 'NEUTRO / DUDOSO';
      badge.classList.add('neutro');
    }

    badge.textContent = verdict;

    // Build explanatory composite answer
    let listHTML = `<span style="display:block; margin-bottom:1rem; font-weight:500;">La suma de fuerzas del oráculo dictamina un <strong>${verdict}</strong> con balance numerológico (${totalScore > 0 ? '+' : ''}${totalScore}). Aquí está el desglose del consejo:</span><ul style="list-style:none; padding-left:0; display:flex; flex-direction:column; gap:0.75rem;">`;
    
    currentSpread.forEach((card, index) => {
      const score = card.isReversed ? (card.yesNoScore * -1) : card.yesNoScore;
      const bulletColor = score > 0 ? 'var(--success-color)' : (score < 0 ? 'var(--error-color)' : 'var(--neutral-color)');
      const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
      
      let answerText = card.yesNoText;
      if (card.isReversed) {
        if (card.yesNoScore > 0) {
          answerText = "Su energía positiva se encuentra bloqueada u obstaculizada, sugiriendo retrasos u oposiciones.";
        } else if (card.yesNoScore < 0) {
          answerText = "Los aspectos difíciles se muestran atenuados o en vías de resolución, indicando una liberación lenta.";
        } else {
          answerText = "Las dudas se profundizan, indicando confusión o secreto.";
        }
      }

      listHTML += `
        <li style="border-left: 3px solid ${bulletColor}; padding-left: 0.75rem;">
          <strong>${cardNameDisplay}</strong>: ${answerText}
        </li>
      `;
      });
      
      listHTML += `</ul>`;
      explanation.innerHTML = listHTML;
    }
  }
}

// Helper to get adapted narrative details for a card (taking into account reversal state)
function getCardNarrativeDetails(card) {
  const name = card.isReversed ? `${card.name} (Invertida)` : card.name;
  const themes = card.isReversed 
    ? `bloqueos o aspectos desafiantes de ${card.keyThemes.toLowerCase().replace('.', '')}` 
    : card.keyThemes.toLowerCase().replace('.', '');
  const meaning = card.isReversed ? card.reversed[selectedCategory] : card.meanings[selectedCategory];
  return { name, themes, meaning };
}

// Generate the narrative synthesis for past-present-future predictions (Continuous Story)
function generateDestinySynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Past
  const c2 = currentSpread[1]; // Present
  const c3 = currentSpread[2]; // Future

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);

  const categoryIntro = getCategoryIntroText();

  const advice3 = c3.isReversed 
    ? (c3.reversed?.alchemy || c3.reversed?.general || d3.meaning) 
    : (c3.meanings?.advice || c3.meanings?.general || d3.meaning);

  textContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem; line-height: 1.7; color: var(--text-main);">
      <p style="margin: 0; font-size: 0.95rem;">
        El hilo invisible del tiempo se despliega ante tu inquietud sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>. Las cartas no describen sucesos aislados, sino la corriente ininterrumpida y evolutiva de tu alma a través de tres estaciones kármicas:
      </p>

      <div style="border-left: 3px solid var(--gold-color); padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: var(--gold-color); font-size: 0.98rem;">⏳ 1. Raíz en el Pasado: ${d1.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          Todo comenzó bajo la impronta de <strong>${d1.name}</strong> (${d1.meaning}). Aquellas vivencias y decisiones no fueron en vano; sembraron la experiencia necesaria que dio forma a tus cimientos emocionales y mentales, creando el punto de partida de tu situación actual.
        </p>
      </div>

      <div style="border-left: 3px solid #c084fc; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: #c084fc; font-size: 0.98rem;">⚡ 2. Punto de Poder en el Presente: ${d2.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          De aquella semilla germina tu realidad de hoy bajo la tutela de <strong>${d2.name}</strong> (${d2.meaning}). Este es tu momento de libre albedrío y acción consciente: al integrar con madurez este aprendizaje del ahora, desbloqueas y encauzas la corriente hacia lo que está por manifestarse.
        </p>
      </div>

      <div style="border-left: 3px solid #10b981; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: #34d399; font-size: 0.98rem;">🔮 3. Horizonte y Predicción de Futuro: ${d3.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          La energía del presente desemboca directamente en el desenlace marcado por <strong>${d3.name}</strong>. El oráculo predice una resolución clarificadora: <em>${d3.meaning}</em>. Si mantienes el rumbo y aplicas la conciencia adquirida, este arcano vaticina un ciclo de culminación armónica y victoria personal.
        </p>
      </div>

      <div style="background: linear-gradient(135deg, rgba(229, 193, 88, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%); border: 1px dashed var(--gold-color); border-radius: 12px; padding: 1.15rem 1.35rem; margin-top: 0.5rem;">
        <strong style="color: var(--gold-color); font-size: 0.95rem;">✦ Síntesis Alquímica del Oráculo:</strong>
        <p style="margin: 0.35rem 0 0 0; font-size: 0.92rem; line-height: 1.6; color: var(--text-main); font-style: italic;">
          "${advice3}"
        </p>
      </div>
    </div>
  `;
}

// Generate narrative synthesis for 5-card cross spread (Continuous Story)
function generateCrossSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Pro
  const c2 = currentSpread[1]; // Contra
  const c3 = currentSpread[2]; // Consejo
  const c4 = currentSpread[3]; // Solución
  const c5 = currentSpread[4]; // Synthesis

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);
  const d5 = getCardNarrativeDetails(c5);

  const categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem; line-height: 1.7; color: var(--text-main);">
      <p style="margin: 0; font-size: 0.95rem;">
        Una cruz de luz mística se dibuja ante tu consulta sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>. Las fuerzas en juego dialogan entre sí para mostrarte la dinámica completa de tu situación:
      </p>

      <div style="border-left: 3px solid #10b981; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: #34d399; font-size: 0.98rem;">✦ 1. Tu Fortaleza y Aliado Invisible: ${d1.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          Resplandece como tu mayor respaldo: <em>${d1.meaning}</em>. Esta energía es tu ancla segura y el manantial del que debes beber para no perder tu centro.
        </p>
      </div>

      <div style="border-left: 3px solid #f472b6; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: #f472b6; font-size: 0.98rem;">✦ 2. El Desafío y Piedra de Toque: ${d2.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          Tu terreno de prueba se manifiesta con <strong>${d2.name}</strong> (${d2.meaning}). No representa una barrera infranqueable, sino el contrapeso necesario para fortalecer tu templanza y madurez.
        </p>
      </div>

      <div style="border-left: 3px solid var(--gold-color); padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: var(--gold-color); font-size: 0.98rem;">✦ 3. El Consejo Maestro de Acción: ${d3.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          Para resolver la tensión entre el apoyo y el desafío, el oráculo te entrega la clave de <strong>${d3.name}</strong> (${d3.meaning}). Aplica este consejo con determinación práctica.
        </p>
      </div>

      <div style="border-left: 3px solid #38bdf8; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
        <strong style="color: #38bdf8; font-size: 0.98rem;">✦ 4. La Predicción de Desenlace: ${d4.name}</strong>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.35rem 0 0 0;">
          Al dar el paso aconsejado, el camino desemboca en el éxito guiado por <strong>${d4.name}</strong>: <em>${d4.meaning}</em>.
        </p>
      </div>

      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.09) 0%, rgba(229, 193, 88, 0.09) 100%); border-left: 4px solid var(--gold-color); padding: 1.15rem 1.35rem; border-radius: 0 12px 12px 0;">
        <strong style="font-family: var(--font-serif); color: var(--gold-color); font-size: 0.98rem;">✦ El Eje de Síntesis Central: ${d5.name}</strong>
        <p style="margin: 0.35rem 0 0 0; font-size: 0.92rem; line-height: 1.6; color: var(--text-main);">
          En el corazón sagrado de la tirada resuena <strong>${d5.name}</strong>: <em>${d5.meaning}</em>. Esta es la verdad espiritual última que unifica tu experiencia y te guía hacia la plenitud.
        </p>
      </div>
    </div>
  `;
}

// Generate narrative synthesis for Inverted Pyramid spread (Continuous Story)
function generatePyramidSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Mental
  const c2 = currentSpread[1]; // Sentimental
  const c3 = currentSpread[2]; // Material
  const c4 = currentSpread[3]; // Obstáculo
  const c5 = currentSpread[4]; // Apoyo
  const c6 = currentSpread[5]; // Desenlace

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);
  const d5 = getCardNarrativeDetails(c5);
  const d6 = getCardNarrativeDetails(c6);

  const categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>La Pirámide del Destino se despliega para decantar paso a paso tu consulta sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>. Observamos cómo se entrelazan tus tres planos de vida hacia la resolución.</p>
    <p>La base de tu realidad se compone de tres corrientes vivas: en tu <strong>plano mental</strong> rige <strong>${d1.name}</strong> (${d1.meaning}), mientras tu <strong>corazón y emociones</strong> responden a <strong>${d2.name}</strong> (${d2.meaning}), y tu <strong>plano material y práctico</strong> se sostiene en <strong>${d3.name}</strong> (${d3.meaning}).</p>
    <p>Al elevarse y buscar síntesis, estas tres corrientes chocan con el <strong>filtro de prueba o bloqueo</strong> manifestado por <strong>${d4.name}</strong>, el cual exige que ${d4.meaning}. Pero no estás a solas en la travesía: tu <strong>palanca de apoyo incondicional</strong> despierta con <strong>${d5.name}</strong>, recordándote que ${d5.meaning}.</p>
    <p>Finalmente, al pasar por este proceso de purificación y alquimia, la pirámide decanta en la <strong>cúspide y resultado victorioso</strong> representados por <strong>${d6.name}</strong>. El oráculo culmina revelando que ${d6.meaning}</p>
  `;
}

// Reset / Perform another consultation
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Clear inputs and state
    if (questionInput) questionInput.value = '';
    if (resultsPanel) resultsPanel.classList.add('hidden');
    if (deckContainer) deckContainer.style.display = 'flex';
    if (cardsBoard) cardsBoard.innerHTML = '';
    
    // Reset tapete text
    if (readingStatusTitle) readingStatusTitle.textContent = "Prepara tu mente y formula tu pregunta...";
    if (readingStatusDesc) readingStatusDesc.textContent = "Selecciona tus opciones en el panel lateral y pulsa el botón dorado.";
    
    // Smooth scroll back to settings
    const configPanel = document.querySelector('.config-panel');
    if (configPanel) configPanel.scrollIntoView({ behavior: 'smooth' });
  });
}

// Save reading to localStorage
function saveReading(question, spreadType) {
  const history = JSON.parse(localStorage.getItem('tarot_reading_history') || '[]');
  const isAstro = spreadType === 'astro_daily' || spreadType === 'astro_weekly';
  
  const newReading = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    date: new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    question: question,
    category: isAstro ? selectedZodiac : selectedCategory,
    spreadType: spreadType,
    cards: (isAstro ? currentAstroSpread : currentSpread).map(card => {
      return {
        id: card.id,
        name: card.name,
        isReversed: card.isReversed
      };
    })
  };
  
  history.push(newReading);
  localStorage.setItem('tarot_reading_history', JSON.stringify(history));
  loadHistory();
}

// Load and render history items
function loadHistory() {
  if (!historyList) return;
  const history = JSON.parse(localStorage.getItem('tarot_reading_history') || '[]');
  
  if (history.length === 0) {
    historyList.innerHTML = `
      <p class="no-history-text" style="color: var(--text-muted); text-align: center; font-style: italic; padding: 2rem 0;">Aún no has registrado lecturas en tu diario de destino. Las consultas que realices aparecerán aquí.</p>
    `;
    return;
  }
  
  // Sort by timestamp descending
  history.sort((a, b) => b.timestamp - a.timestamp);
  
  historyList.innerHTML = '';
  history.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'history-item';
    itemEl.setAttribute('data-id', item.id);
    
    const spreadLabels = {
      yesno1: 'Sí o No (1 carta)',
      yesno3: 'Sí o No (3 cartas)',
      destiny: 'Tirada del Destino',
      cross5: 'Tirada en Cruz',
      pyramid6: 'Pirámide Invertida',
      celtic10: 'La Cruz Celta',
      mirror4: 'El Espejo Relacional',
      clarity4: 'Hechizo de Claridad',
      astro_daily: 'Horóscopo Diario',
      astro_weekly: 'Horóscopo Semanal'
    };
    
    const categoryLabels = {
      general: 'General',
      love: 'Amor',
      work: 'Trabajo',
      health: 'Salud',
      aries: 'Aries ♈',
      tauro: 'Tauro ♉',
      geminis: 'Géminis ♊',
      cancer: 'Cáncer ♋',
      leo: 'Leo ♌',
      virgo: 'Virgo ♍',
      libra: 'Libra ♎',
      escorpio: 'Escorpio ♏',
      sagitario: 'Sagitario ♐',
      capricornio: 'Capricornio ♑',
      acuario: 'Acuario ♒',
      piscis: 'Piscis ♓'
    };
    
    // Generate mini card views
    let miniCardsHTML = '';
    item.cards.forEach(c => {
      miniCardsHTML += `
        <div class="history-item-mini-card${c.isReversed ? ' reversed' : ''}" style="background-image: url('assets/card_${c.id}.jpg');" title="${c.name}${c.isReversed ? ' (Invertida)' : ''}"></div>
      `;
    });
    
    const cardsSummary = item.cards.map(c => `${c.name}${c.isReversed ? ' (Inv.)' : ''}`).join(', ');
    
    // MEJORA 3: Load saved note for this reading
    const notes = JSON.parse(localStorage.getItem('tarot_reading_notes') || '{}');
    const existingNote = notes[item.id] || '';
    
    itemEl.innerHTML = `
      <div class="history-item-meta">
        <span class="history-item-date">${item.date}</span>
        <div class="history-item-badge-row">
          <span class="history-item-badge category">${categoryLabels[item.category] || item.category}</span>
          <span class="history-item-badge spread">${spreadLabels[item.spreadType] || item.spreadType}</span>
        </div>
      </div>
      <div class="history-item-content">
        <span class="history-item-question">"${item.question}"</span>
        <span class="history-item-summary"><strong>Cartas:</strong> ${cardsSummary}</span>
      </div>
      <div class="history-item-cards">
        ${miniCardsHTML}
      </div>
      <div class="history-note-area ${existingNote ? 'visible' : ''}" data-note-id="${item.id}" style="display: ${existingNote ? 'block' : 'none'}">
        ${existingNote
          ? `<div class="history-note-text-display">💭 ${existingNote}</div>
             <button class="history-note-btn" data-note-action="edit">✏️ Editar nota</button>`
          : `<textarea class="history-note-input" placeholder="Escribe tu reflexión personal sobre esta lectura..." rows="2"></textarea>
             <span class="history-note-saved">✔ Nota guardada</span>`
        }
      </div>
      <button class="history-note-btn" data-note-action="toggle" style="margin-top: 0.4rem;">${existingNote ? '💬 Ver nota' : '➕ Añadir reflexión'}</button>
    `;
    
    // Click on item to restore (but not on note controls)
    itemEl.addEventListener('click', (e) => {
      if (e.target.closest('.history-note-area') || e.target.classList.contains('history-note-btn')) return;
      restoreReading(item.id);
    });
    
    // Note toggle button
    const noteToggleBtn = itemEl.querySelector('[data-note-action="toggle"]');
    const noteArea = itemEl.querySelector('.history-note-area');
    if (noteToggleBtn) {
      noteToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = noteArea.style.display !== 'none';
        noteArea.style.display = isVisible ? 'none' : 'block';
        noteToggleBtn.textContent = isVisible ? (existingNote ? '💬 Ver nota' : '➕ Añadir reflexión') : '✕ Cerrar';
      });
    }
    
    // Auto-save note on blur/change
    const noteTextarea = itemEl.querySelector('.history-note-input');
    if (noteTextarea) {
      noteTextarea.addEventListener('change', (e) => {
        e.stopPropagation();
        const savedNotes = JSON.parse(localStorage.getItem('tarot_reading_notes') || '{}');
        savedNotes[item.id] = noteTextarea.value.trim();
        localStorage.setItem('tarot_reading_notes', JSON.stringify(savedNotes));
        const savedMsg = itemEl.querySelector('.history-note-saved');
        if (savedMsg) { savedMsg.style.display = 'block'; setTimeout(() => { savedMsg.style.display = 'none'; }, 2000); }
      });
      noteTextarea.addEventListener('click', e => e.stopPropagation());
    }
    
    // Edit note button
    const editNoteBtn = itemEl.querySelector('[data-note-action="edit"]');
    if (editNoteBtn) {
      editNoteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const display = noteArea.querySelector('.history-note-text-display');
        const savedNote = notes[item.id] || '';
        if (display) {
          display.outerHTML = `<textarea class="history-note-input" rows="2">${savedNote}</textarea><span class="history-note-saved">✔ Nota guardada</span>`;
          editNoteBtn.style.display = 'none';
          const newTextarea = noteArea.querySelector('.history-note-input');
          if (newTextarea) {
            newTextarea.focus();
            newTextarea.addEventListener('change', (ev) => {
              ev.stopPropagation();
              const savedNotes = JSON.parse(localStorage.getItem('tarot_reading_notes') || '{}');
              savedNotes[item.id] = newTextarea.value.trim();
              localStorage.setItem('tarot_reading_notes', JSON.stringify(savedNotes));
              const savedMsg = noteArea.querySelector('.history-note-saved');
              if (savedMsg) { savedMsg.style.display = 'block'; setTimeout(() => { savedMsg.style.display = 'none'; }, 2000); }
            });
            newTextarea.addEventListener('click', ev => ev.stopPropagation());
          }
        }
      });
    }
    
    historyList.appendChild(itemEl);
  });
}

// Restore a past reading
function restoreReading(id) {
  const history = JSON.parse(localStorage.getItem('tarot_reading_history') || '[]');
  // Find matching reading (support both string and numeric IDs)
  const reading = history.find(item => String(item.id) === String(id));
  if (!reading) return;
  
  const isAstro = reading.spreadType === 'astro_daily' || reading.spreadType === 'astro_weekly' || reading.spreadType === 'astro_houses';
  const currentPath = window.location.pathname.toLowerCase();
  
  // Redireccionar si el usuario está en la página equivocada para esta lectura
  if (isAstro && !currentPath.includes('horoscopo.html')) {
    window.location.href = 'horoscopo.html?reading=' + id;
    return;
  } else if (!isAstro && !currentPath.includes('index.html') && currentPath !== '/' && currentPath !== '' && !currentPath.endsWith('/')) {
    window.location.href = 'index.html?reading=' + id;
    return;
  }
  
  if (isAstro) {
    isAstroFromHistory = true;
    selectedZodiac = reading.category;
    selectedAstroSpread = reading.spreadType;
    if (zodiacSelect) zodiacSelect.value = selectedZodiac;
    if (astroSpreadSelect) astroSpreadSelect.value = selectedAstroSpread;
    
    // Switch active tab styling
    document.querySelectorAll('.nav-tab').forEach(t => {
      if (t.getAttribute('data-tab') === 'horoscope') {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
    const oracleTab = document.getElementById('oracle-tab-content');
    if (oracleTab) oracleTab.classList.add('hidden');
    const bookTab = document.getElementById('book-tab-content');
    if (bookTab) bookTab.classList.add('hidden');
    const horoscopeTab = document.getElementById('horoscope-tab-content');
    if (horoscopeTab) horoscopeTab.classList.remove('hidden');
    const numTab = document.getElementById('numerology-tab-content');
    if (numTab) numTab.classList.add('hidden');
    const dailyTab = document.getElementById('daily-tab-content');
    if (dailyTab) dailyTab.classList.add('hidden');
    
    currentAstroSpread = reading.cards.map(savedCard => {
      const dbCard = window.tarotDb.find(c => c.id === savedCard.id);
      return {
        ...dbCard,
        isReversed: savedCard.isReversed
      };
    });
    
    astroFlippedCount = currentAstroSpread.length;
    astroTotalCards = currentAstroSpread.length;
    
    astroCardsBoard.className = 'cards-board' + (selectedAstroSpread === 'astro_houses' ? ' layout-houses' : '');
    astroCardsBoard.innerHTML = '';
    if (astroDeckContainer) astroDeckContainer.style.display = 'none';
    if (astroResultsPanel) astroResultsPanel.classList.add('hidden');
    
    currentAstroSpread.forEach((card, index) => {
      let posLabel = "Carta " + (index + 1);
      if (selectedAstroSpread === 'astro_weekly') {
        const positions = ["Energía Regente de la Semana", "El Desafío Semanal / Obstáculo", "El Consejo Astral / Solución"];
        posLabel = positions[index];
      } else if (selectedAstroSpread === 'astro_houses') {
        const positions = [
          "Casa I: Personalidad",
          "Casa II: Recursos",
          "Casa III: Entorno",
          "Casa IV: Hogar",
          "Casa V: Creatividad",
          "Casa VI: Trabajo/Salud",
          "Casa VII: Pareja",
          "Casa VIII: Transformación",
          "Casa IX: Filosofía",
          "Casa X: Profesión",
          "Casa XI: Amistad",
          "Casa XII: Subconsciente"
        ];
        posLabel = positions[index];
      } else {
        posLabel = "Tu Consejo Diario";
      }
      
      const cardWrapper = document.createElement('div');
      cardWrapper.className = `card-wrapper dealt flipped${card.isReversed ? ' reversed' : ''}`;
      cardWrapper.setAttribute('data-index', index);
      
      setTimeout(() => {
        cardWrapper.classList.remove('dealt');
      }, 800);
      
      if (selectedAstroSpread === 'astro_houses') {
        const angle = Math.PI - (index * Math.PI / 6);
        const R = 210;
        const centerX = 310;
        const centerY = 310;
        const left = Math.round(centerX + R * Math.cos(angle) - 55);
        const top = Math.round(centerY + R * Math.sin(angle) - 90);
        cardWrapper.style.left = `${left}px`;
        cardWrapper.style.top = `${top}px`;
      }
      
      cardWrapper.innerHTML = `
        <div class="card-inner">
          <div class="card-back"></div>
          <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
        </div>
        <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
          ${posLabel}
        </div>
      `;
      astroCardsBoard.appendChild(cardWrapper);
      apply3DTilt(cardWrapper);
    });
    
    if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "Lectura del Diario Cargada";
    if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = `Mostrando tu horóscopo del ${reading.date}`;
    
    showAstroInterpretation();
    document.querySelector('#horoscope-tab-content .reading-table').scrollIntoView({ behavior: 'smooth' });
    return;
  }
  
  isFromHistory = true;
  selectedCategory = reading.category;
  
  questionInput.value = reading.question;
  
  if (categorySelect) categorySelect.value = selectedCategory;
  if (spreadSelect) spreadSelect.value = reading.spreadType;
  
  // Switch active tab styling to oracle
  document.querySelectorAll('.nav-tab').forEach(t => {
    if (t.getAttribute('data-tab') === 'oracle') {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  const oracleTab = document.getElementById('oracle-tab-content');
  if (oracleTab) oracleTab.classList.remove('hidden');
  const bookTab = document.getElementById('book-tab-content');
  if (bookTab) bookTab.classList.add('hidden');
  if (document.getElementById('horoscope-tab-content')) document.getElementById('horoscope-tab-content').classList.add('hidden');
  if (document.getElementById('numerology-tab-content')) document.getElementById('numerology-tab-content').classList.add('hidden');
  if (document.getElementById('daily-tab-content')) document.getElementById('daily-tab-content').classList.add('hidden');
  
  currentSpread = reading.cards.map(savedCard => {
    const dbCard = window.tarotDb.find(c => c.id === savedCard.id);
    return {
      ...dbCard,
      isReversed: savedCard.isReversed
    };
  });
  
  flippedCount = currentSpread.length;
  totalCardsInSpread = currentSpread.length;
  
  cardsBoard.innerHTML = '';
  deckContainer.style.display = 'none';
  resultsPanel.classList.add('hidden');
  
  cardsBoard.className = 'cards-board';
  if (reading.spreadType === 'cross5') {
    cardsBoard.classList.add('layout-cross');
  } else if (reading.spreadType === 'pyramid6') {
    cardsBoard.classList.add('layout-pyramid');
  } else if (reading.spreadType === 'celtic10') {
    cardsBoard.classList.add('layout-celtic');
  } else if (reading.spreadType === 'mirror4') {
    cardsBoard.classList.add('layout-mirror');
  } else if (reading.spreadType === 'clarity4') {
    cardsBoard.classList.add('layout-clarity');
  }
  
  currentSpread.forEach((card, index) => {
    let positionName = "Carta " + (index + 1);
    if (reading.spreadType === 'destiny') {
      const positions = ["Pasado / Origen", "Presente / Situación", "Futuro / Destino"];
      positionName = positions[index];
    } else if (reading.spreadType === 'cross5') {
      const positions = ["A favor (Pro)", "En contra (Contra)", "Consejo / Juez", "Solución / Fallo", "Síntesis Central"];
      positionName = positions[index];
    } else if (reading.spreadType === 'pyramid6') {
      const positions = [
        "Plano Mental (Mente)", 
        "Plano Sentimental (Corazón)", 
        "Plano Material (Acción)", 
        "El Obstáculo (Desafío)", 
        "El Apoyo (Recurso)", 
        "Desenlace (Consejo Final)"
      ];
      positionName = positions[index];
    } else if (reading.spreadType === 'celtic10') {
      const positions = [
        "Tú (Actual)",
        "El Cruce (Obstáculo)",
        "La Corona (Metas)",
        "La Base (Raíces)",
        "El Pasado (Reciente)",
        "El Futuro (Inmediato)",
        "Tu Actitud",
        "Tu Entorno",
        "Esperanzas/Miedos",
        "El Resultado"
      ];
      positionName = positions[index];
    } else if (reading.spreadType === 'mirror4') {
      const positions = [
        "Tu Estado Actual",
        "Su Estado Actual",
        "Tu Proyección sobre Ella/Él",
        "Su Proyección sobre Ti"
      ];
      positionName = positions[index];
    } else if (reading.spreadType === 'clarity4') {
      const positions = [
        "El Bloqueo (Duda)",
        "La Fuerza Mágica (Recurso)",
        "La Acción (Conjuro)",
        "La Revelación"
      ];
      positionName = positions[index];
    }
    
    const cardWrapper = document.createElement('div');
    cardWrapper.className = `card-wrapper dealt flipped${card.isReversed ? ' reversed' : ''}`;
    cardWrapper.setAttribute('data-index', index);
    
    setTimeout(() => {
      cardWrapper.classList.remove('dealt');
    }, 800);
    
    cardWrapper.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      </div>
      <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
        ${positionName}
      </div>
    `;
    cardsBoard.appendChild(cardWrapper);
    apply3DTilt(cardWrapper);
  });
  
  readingStatusTitle.textContent = "Lectura del Diario Cargada";
  readingStatusDesc.textContent = `Mostrando la consulta del ${reading.date}`;
  
  showInterpretation();
  
  document.querySelector('.reading-table').scrollIntoView({ behavior: 'smooth' });
}

// Clear all history
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas vaciar tu Diario de Destino? Esta acción eliminará permanentemente todas tus tiradas guardadas.')) {
      localStorage.removeItem('tarot_reading_history');
      loadHistory();
    }
  });
}

// Initialize history on startup
loadHistory();

// Initialize moon phase widget in header
function initMoonPhaseHeader() {
  const moonIcon = document.getElementById('moon-icon');
  const moonName = document.getElementById('moon-name');
  const moonDesc = document.getElementById('moon-phase-description');
  const moonWidget = document.getElementById('moon-phase-widget');
  
  if (moonIcon && moonName) {
    const details = getMoonPhaseDetails();
    const illum = Math.round(100 * (1 - Math.abs(1 - 2 * details.phase)));
    moonIcon.innerHTML = getMoonSvg(details.phase, localStorage.getItem('lunar_hemisphere') || 'north');
    moonName.textContent = `${details.phaseName} (${illum}%)`;
    if (moonDesc) {
      moonDesc.innerHTML = details.description;
    }
  }

  if (moonWidget) {
    moonWidget.addEventListener('click', () => {
      const isInsideSubfolder = window.location.pathname.includes('/minerales/');
      window.location.href = isInsideSubfolder ? '../fase-lunar.html' : 'fase-lunar.html';
    });
  }
}
initMoonPhaseHeader();

// Interactive Constellations Background (Canvas HTML5 - Mobile Optimized)
function initConstellations() {
  const canvas = document.getElementById('constellations-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const isMobile = width <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const particles = [];
  const particleCount = isMobile 
    ? Math.min(25, Math.max(15, Math.floor((width * height) / 32000)))
    : Math.min(90, Math.max(35, Math.floor((width * height) / 16000)));
  const mouse = { x: 0, y: 0, active: false };

  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * (isMobile ? 0.1 : 0.15);
      this.vy = (Math.random() - 0.5) * (isMobile ? 0.1 : 0.15);
      this.radius = Math.random() * 1.4 + 0.7;
      this.alpha = Math.random();
      this.twinkleSpeed = Math.random() * 0.015 + 0.005;
      this.twinkleDir = Math.random() < 0.5 ? 1 : -1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      this.alpha += this.twinkleSpeed * this.twinkleDir;
      if (this.alpha <= 0.2) {
        this.alpha = 0.2;
        this.twinkleDir = 1;
      } else if (this.alpha >= 1) {
        this.alpha = 1;
        this.twinkleDir = -1;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 193, 88, ${this.alpha * 0.75})`;
      if (!isMobile) {
        ctx.shadowBlur = this.radius * 2;
        ctx.shadowColor = 'rgba(229, 193, 88, 0.4)';
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // ShootingStar definition for occasional shooting stars background effect
  class ShootingStar {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.length = 0;
      this.alpha = 0;
      this.active = false;
      this.fadeSpeed = 0;
      this.lineWidth = 0;
      this.shadowBlur = 0;
      this.isBright = false;
    }

    trigger() {
      this.x = Math.random() * width;
      this.y = Math.random() * (height * 0.4); // Start in top 40% of screen
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // roughly 45 degrees downward
      const speed = Math.random() * 8 + 6; // fast motion
      
      if (Math.random() < 0.5) {
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
      } else {
        this.vx = -Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
      }
      
      this.isBright = Math.random() < 0.25;

      if (this.isBright) {
        this.length = Math.random() * 80 + 100;
        this.lineWidth = Math.random() * 1.2 + 1.8;
        this.shadowBlur = isMobile ? 0 : (Math.random() * 8 + 14);
        this.fadeSpeed = Math.random() * 0.008 + 0.007;
      } else {
        this.length = Math.random() * 50 + 40;
        this.lineWidth = Math.random() * 0.8 + 1.0;
        this.shadowBlur = isMobile ? 0 : (Math.random() * 4 + 6);
        this.fadeSpeed = Math.random() * 0.018 + 0.012;
      }

      this.alpha = 1;
      this.active = true;
    }

    update() {
      if (!this.active) return;
      if (document.body.classList.contains('reduced-motion')) {
        this.active = false;
        return;
      }
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.fadeSpeed;
      if (this.alpha <= 0 || this.x < -100 || this.x > width + 100 || this.y > height + 100) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.beginPath();
      const trailX = this.x - this.vx * (this.length / 10);
      const trailY = this.y - this.vy * (this.length / 10);

      const grad = ctx.createLinearGradient(this.x, this.y, trailX, trailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
      if (this.isBright) {
        grad.addColorStop(0.2, `rgba(229, 193, 88, ${this.alpha * 0.95})`);
        grad.addColorStop(0.6, `rgba(139, 92, 246, ${this.alpha * 0.5})`);
      } else {
        grad.addColorStop(0.2, `rgba(229, 193, 88, ${this.alpha * 0.75})`);
      }
      grad.addColorStop(1, 'rgba(139, 92, 246, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = this.lineWidth;
      ctx.lineCap = 'round';
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(trailX, trailY);
      
      if (!isMobile) {
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.isBright ? 'rgba(229, 193, 88, 0.7)' : 'rgba(229, 193, 88, 0.4)';
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Star());
  }

  const shootingStars = [];
  const maxShootingStars = isMobile ? 1 : 2;
  for (let i = 0; i < maxShootingStars; i++) {
    shootingStars.push(new ShootingStar());
  }
  let nextShootingStarTime = Date.now() + Math.random() * 12000 + 8000;

  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });
  }

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    const targetCount = isMobile
      ? Math.min(25, Math.max(15, Math.floor((width * height) / 32000)))
      : Math.min(90, Math.max(35, Math.floor((width * height) / 16000)));
    if (particles.length < targetCount) {
      const diff = targetCount - particles.length;
      for (let i = 0; i < diff; i++) particles.push(new Star());
    } else if (particles.length > targetCount) {
      particles.splice(targetCount);
    }
  });

  let isAnimating = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isAnimating = false;
    } else if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(animate);
    }
  });

  let isScrolling = false;
  let scrollTimeout = null;
  if (isMobile) {
    window.addEventListener('scroll', () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    }, { passive: true });
  }

  function animate() {
    if (!isAnimating) return;

    // Skip heavy redraw during active mobile scroll to ensure 60/120fps native touch scrolling
    if (isMobile && isScrolling) {
      requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    shootingStars.forEach(s => {
      s.update();
      s.draw();
    });

    if (!document.body.classList.contains('reduced-motion') && Date.now() > nextShootingStarTime) {
      const inactive = shootingStars.find(s => !s.active);
      if (inactive) {
        inactive.trigger();
        nextShootingStarTime = Date.now() + Math.random() * 14000 + 10000;
      }
    }

    const maxDist = isMobile ? 50 : 95;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.14;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(229, 193, 88, ${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }
    }

    if (mouse.active && !isMobile) {
      const mouseMaxDist = 135;
      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseMaxDist) {
          const alpha = (1 - dist / mouseMaxDist) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      });
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize constellations background
initConstellations();

/* ==========================================================================
   INSTANT PAGE PREFETCHING FOR ULTRA-FAST MOBILE NAVIGATION
   ========================================================================== */
(function initInstantNavigation() {
  const prefetched = new Set();

  function prefetchUrl(url) {
    if (!url || prefetched.has(url) || url.startsWith('#') || url.startsWith('javascript:')) return;
    prefetched.add(url);

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'document';
    document.head.appendChild(link);
  }

  function handleInteraction(e) {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
      prefetchUrl(href);
    }
  }

  document.addEventListener('mouseover', handleInteraction, { passive: true });
  document.addEventListener('touchstart', handleInteraction, { passive: true });
})();


const LUNAR_RITUALS = {
  "Luna Nueva": "Excelente momento para meditar en silencio y establecer propósitos. Escribe en un papel tus intenciones para este ciclo y visualízalas bajo el cielo oscuro.",
  "Luna Creciente": "Enciende una vela dorada o verde y enfócate en la atracción de abundancia y nuevos proyectos. Haz afirmaciones positivas sobre el crecimiento de tus metas.",
  "Cuarto Creciente": "Fase de acción. Realiza un ritual de empoderamiento visualizándote superando cualquier obstáculo. Enciende una vela violeta para transmutar miedos en valentía.",
  "Luna Giba Creciente": "Analiza tus planes. Es propicio realizar infusiones de hierbas (té de manzanilla o menta) para calmar la mente y afinar detalles prácticos de tu vida.",
  "Luna Llena": "Ritual de consagración. Expón tus cristales, amuletos y agua al brillo plateado de la luna llena. Medita bajo su luz enfocándote en la revelación y la gratitud.",
  "Luna Giba Menguante": "Espacio de agradecimiento. Da las gracias por los frutos recibidos y comienza a identificar de forma lógica qué hábitos o relaciones necesitas soltar.",
  "Cuarto Menguante": "Ritual de destierro y desapego. Escribe en un trozo de papel aquello que deseas soltar de tu vida (malos hábitos, miedos o ataduras) y quémalo con cuidado.",
  "Luna Menguante": "Limpieza y purificación. Sahúma tu hogar con romero o lavanda para disolver energías densas y preparar el espacio para el silencio del nuevo ciclo."
};

const LUNAR_TAROT_CARE = {
  "Luna Nueva": "Purificación absoluta. Envuelve tu mazo de tarot en un paño de seda violeta y déjalo reposar toda la noche sobre un lecho de sal marina (sin contacto directo) para limpiar su energía acumulada.",
  "Luna Creciente": "Magnetización. Pasa cada una de las cartas por el humo de un incienso de sándalo o mirra, decretando que el mazo canalice mensajes de crecimiento y claridad.",
  "Cuarto Creciente": "Fuerza activa. Mezcla bien las cartas boca abajo y ordénalas en secuencia numérica de arcanos. Expón el mazo a la luz del atardecer para reactivar su vitalidad.",
  "Luna Giba Creciente": "Afinación intuitiva. Sostén el mazo entre tus manos a la altura del corazón e insufla tu aliento sobre él tres veces mientras visualizas luz dorada limpiando las cartas.",
  "Luna Llena": "Consagración total. Coloca tu mazo en una ventana donde reciba la luz directa de la Luna Llena durante unas horas. Esto potenciará al máximo su sensibilidad predictiva.",
  "Luna Giba Menguante": "Descanso protector. Guarda tu mazo junto a un cristal de cuarzo transparente o una amatista dentro de su caja de madera para estabilizar sus vibraciones.",
  "Cuarto Menguante": "Limpieza de remanentes. Pasa el mazo de cartas por el humo de salvia blanca o romero seco para liberar cualquier energía residual que haya quedado tras lecturas intensas.",
  "Luna Menguante": "Silencio sagrado. Evita realizar lecturas complejas o predictivas de gran calado durante estos días. Deja descansar el mazo en un espacio oscuro y reservado."
};

const ZODIAC_SIGNS_LIST = [
  "aries", "tauro", "geminis", "cancer", "leo", "virgo", 
  "libra", "escorpio", "sagitario", "capricornio", "acuario", "piscis"
];

// Navigation & Tarot Book Encyclopedia Logic
function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const oracleContent = document.getElementById('oracle-tab-content');
  const bookContent = document.getElementById('book-tab-content');
  const horoscopeContent = document.getElementById('horoscope-tab-content');
  const numerologyContent = document.getElementById('numerology-tab-content');
  const lunarContent = document.getElementById('lunar-tab-content');
  const dailyContent = document.getElementById('daily-tab-content');

  // Auto-initialize features based on which content divs are active/present on the page
  if (bookContent) {
    initTarotBook();
  }
  if (lunarContent) {
    renderLunarTabDetails();
  }
  if (horoscopeContent) {
    // Load saved zodiac sign if available
    const savedZodiac = localStorage.getItem('user_zodiac_sign');
    if (savedZodiac && zodiacSelect) {
      zodiacSelect.value = savedZodiac;
      selectedZodiac = savedZodiac;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-tab');
      if (!target) return; // If standard link without data-tab, let browser navigate
      
      e.preventDefault();

      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Activate clicked tab
      tab.classList.add('active');

      // Hide all first
      if (oracleContent) oracleContent.classList.add('hidden');
      if (bookContent) bookContent.classList.add('hidden');
      if (horoscopeContent) horoscopeContent.classList.add('hidden');
      if (numerologyContent) numerologyContent.classList.add('hidden');
      if (lunarContent) lunarContent.classList.add('hidden');
      if (dailyContent) dailyContent.classList.add('hidden');

      if (target === 'oracle' && oracleContent) {
        oracleContent.classList.remove('hidden');
      } else if (target === 'daily' && dailyContent) {
        dailyContent.classList.remove('hidden');
      } else if (target === 'horoscope' && horoscopeContent) {
        horoscopeContent.classList.remove('hidden');
        const savedZodiac = localStorage.getItem('user_zodiac_sign');
        if (savedZodiac && zodiacSelect) {
          zodiacSelect.value = savedZodiac;
          selectedZodiac = savedZodiac;
        }
      } else if (target === 'book' && bookContent) {
        bookContent.classList.remove('hidden');
        initTarotBook();
      } else if (target === 'numerology' && numerologyContent) {
        numerologyContent.classList.remove('hidden');
      } else if (target === 'lunar' && lunarContent) {
        lunarContent.classList.remove('hidden');
        renderLunarTabDetails();
      }
    });
  });
}

function getMinorArcanaSuitInfo(cardId) {
  if (cardId < 22) return null;
  if (cardId >= 22 && cardId <= 35) {
    return { symbol: "🔥", suit: "Bastos", rank: getMinorArcanaRankName(cardId - 22) };
  } else if (cardId >= 36 && cardId <= 49) {
    return { symbol: "💧", suit: "Copas", rank: getMinorArcanaRankName(cardId - 36) };
  } else if (cardId >= 50 && cardId <= 63) {
    return { symbol: "⚔️", suit: "Espadas", rank: getMinorArcanaRankName(cardId - 50) };
  } else if (cardId >= 64 && cardId <= 77) {
    return { symbol: "🌿", suit: "Oros", rank: getMinorArcanaRankName(cardId - 64) };
  }
  return null;
}

function getMinorArcanaRankName(offset) {
  const ranks = ["As", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Sota", "Caballero", "Reina", "Rey"];
  return ranks[offset] || "";
}

let isBookInitialized = false;
function initTarotBook() {
  if (isBookInitialized) return;
  
  const bookGrid = document.getElementById('book-grid');
  const bookSearch = document.getElementById('book-search');
  if (!bookGrid) return;

  bookGrid.innerHTML = '';
  
  // Render cards sorted by ID
  const sortedCards = [...window.tarotDb].sort((a, b) => a.id - b.id);
  
  sortedCards.forEach(card => {
    const cardEl = document.createElement('a');
    cardEl.className = 'book-card-item';
    cardEl.style.textDecoration = 'none';
    const slug = createSlug(card.name);
    cardEl.href = "?carta=" + slug;
    cardEl.setAttribute('data-id', card.id);
    cardEl.setAttribute('data-name', card.name.toLowerCase());
    
    cardEl.innerHTML = `
      <div class="book-card-art" style="background-image: url('assets/card_${card.id}.jpg');"></div>
      <span class="book-card-name">${card.name}</span>
    `;
    
    cardEl.addEventListener('click', (e) => {
      e.preventDefault();
      openCardDetailModal(card.id);
    });
    
    bookGrid.appendChild(cardEl);
  });

  // Search filter keyup event
  if (bookSearch) {
    bookSearch.addEventListener('input', () => {
      if (typeof window.applyBookFilter === 'function') {
        window.applyBookFilter();
      } else {
        const term = bookSearch.value.toLowerCase().trim();
        const cardItems = bookGrid.querySelectorAll('.book-card-item');
        
        cardItems.forEach(item => {
          const name = item.getAttribute('data-name');
          item.style.display = name.includes(term) ? 'flex' : 'none';
        });
      }
    });
  }

  isBookInitialized = true;
}

// Modal Details Grimorio Lógica
window.currentModalCardId = 0;

function navigateBookCard(targetId, direction) {
  const bookEl = document.getElementById('grimorio-book-el');
  if (!bookEl) {
    openCardDetailModal(targetId);
    return;
  }
  
  bookEl.classList.add(direction === 'next' ? 'page-turning-next' : 'page-turning-prev');
  
  setTimeout(() => {
    openCardDetailModal(targetId);
  }, 300);
}

function openCardDetailModal(cardId) {
  window.currentModalCardId = cardId;
  const modal = document.getElementById('card-detail-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  const card = window.tarotDb.find(c => c.id === cardId);
  if (!card) return;
  
  if (window.history.pushState) {
    const slug = createSlug(card.name);
    const newUrl = window.location.pathname + '?carta=' + slug;
    if (window.location.search !== '?carta=' + slug) {
       window.history.pushState({ path: newUrl }, '', newUrl);
    }
  }

  const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦", keywords: "Fuerza universal" };
  const romanId = card.id < 22 ? getRomanNumeral(card.id) : "";
  const subTitle = card.id < 22 ? `Arcano ${romanId}` : "Arcano Menor";
  
  const totalCards = window.tarotDb.length;
  const prevId = cardId === 0 ? totalCards - 1 : cardId - 1;
  const nextId = cardId === totalCards - 1 ? 0 : cardId + 1;

  modalBody.innerHTML = `
    <div class="grimorio-book-container">
      <button type="button" class="book-nav-btn prev-btn" id="book-prev-btn" aria-label="Arcano anterior">&lsaquo;</button>
      
      <div class="grimorio-book" id="grimorio-book-el">
        <div class="book-spine"></div>
        
        <!-- PAGINA IZQUIERDA: Arte de la Carta -->
        <div class="book-page left-page">
          <div class="page-ornament"></div>
          <div class="grimorio-header">
            <span class="grimorio-number">${subTitle}</span>
            <h3 class="grimorio-title">${card.name}</h3>
          </div>
          <div class="grimorio-card-art-wrapper">
            <div class="grimorio-card-art" style="background-image: url('assets/card_${card.id}.jpg');"></div>
          </div>
          <div class="grimorio-astro-details">
            <div class="card-astro-badge">
              <span class="card-astro-symbol">${astro.symbol || '✦'}</span>
              <span>Regencia: <strong>${card.astrology || astro.ruler}</strong></span>
            </div>
            <p class="grimorio-themes"><strong>Fuerzas Clave:</strong> ${card.keyThemes}</p>
          </div>
        </div>
        
        <!-- PAGINA DERECHA: Significados del Arcano -->
        <div class="book-page right-page">
          <div class="page-ornament"></div>
          
          <div class="grimorio-tabs">
            <button type="button" class="grimorio-tab active" id="tab-upright-btn">✦ Senda Luminosa</button>
            <button type="button" class="grimorio-tab" id="tab-reversed-btn">✦ Senda Sombra</button>
            <button type="button" class="grimorio-tab" id="tab-symbolism-btn">✦ Simbología</button>
          </div>
          
          <div class="grimorio-meanings-scroll">
            <!-- PESTAÑA 1: DERECHO -->
            <div class="grimorio-content-section" id="meaning-upright-content">
              <h4 class="grimorio-section-title upright">✦ Senda Luminosa (Derecho)</h4>
              <p><strong>Visión del Alma:</strong> ${card.meanings.general}</p>
              <p><strong>Amor & Vínculos:</strong> ${card.meanings.love}</p>
              <p><strong>Trabajo & Prosperidad:</strong> ${card.meanings.work}</p>
              <p><strong>Salud & Bienestar:</strong> ${card.meanings.health}</p>
              ${card.meanings.advice ? `
              <div class="grimorio-advice-box">
                <div class="box-title">🗝️ Consejo del Oráculo</div>
                <p style="margin:0; font-size:0.91rem; line-height:1.55;">${card.meanings.advice}</p>
              </div>` : ''}
            </div>
            
            <!-- PESTAÑA 2: INVERTIDO -->
            <div class="grimorio-content-section hidden" id="meaning-reversed-content">
              <h4 class="grimorio-section-title reversed">✦ Senda Sombra (Invertido)</h4>
              <p><strong>Retos & Bloqueos:</strong> ${card.reversed.general}</p>
              <p><strong>Amor en Desequilibrio:</strong> ${card.reversed.love}</p>
              <p><strong>Trabajo & Finanzas:</strong> ${card.reversed.work}</p>
              <p><strong>Salud & Cuidado:</strong> ${card.reversed.health}</p>
              ${card.reversed.alchemy ? `
              <div class="grimorio-alchemy-box">
                <div class="box-title">🔮 Alquimia de Transmutación</div>
                <p style="margin:0; font-size:0.91rem; line-height:1.55;">${card.reversed.alchemy}</p>
              </div>` : ''}
            </div>

            <!-- PESTAÑA 3: SIMBOLOGÍA -->
            <div class="grimorio-content-section hidden" id="meaning-symbolism-content">
              <h4 class="grimorio-section-title symbolism">✦ Simbología & Misterios</h4>
              <div class="grimorio-meta-grid">
                <div class="grimorio-meta-item">
                  <span class="meta-label">Elemento</span>
                  <span class="meta-val">${card.element || astro.element || 'Cosmos'}</span>
                </div>
                <div class="grimorio-meta-item">
                  <span class="meta-label">Regente</span>
                  <span class="meta-val">${card.astrology || astro.ruler}</span>
                </div>
                <div class="grimorio-meta-item" style="grid-column: 1 / -1;">
                  <span class="meta-label">Misterio Sagrado</span>
                  <span class="meta-val">${card.numerology || (card.id < 22 ? 'Arcano Mayor ' + romanId : 'Arcano Menor')}</span>
                </div>
              </div>
              <p><strong>Iconografía Sagrada:</strong> ${card.symbolism || 'Iconografía sagrada y misterios del Tarot de Marsella y Rider-Waite.'}</p>
              <p><strong>Respuesta Oracular (Sí / No):</strong> ${card.yesNoText || (card.yesNoScore > 0 ? 'Sí rotundo.' : card.yesNoScore < 0 ? 'No por ahora.' : 'Pausa y reflexión.')}</p>
            </div>
            
            <div class="grimorio-footer-sigil">
              <span>🜁 🜂 🜃 🜄 🜀</span>
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" class="book-nav-btn next-btn" id="book-next-btn" aria-label="Arcano siguiente">&rsaquo;</button>
    </div>
  `;

  // Bind tabs
  const tabUpright = document.getElementById('tab-upright-btn');
  const tabReversed = document.getElementById('tab-reversed-btn');
  const tabSymbolism = document.getElementById('tab-symbolism-btn');
  const uprightContent = document.getElementById('meaning-upright-content');
  const reversedContent = document.getElementById('meaning-reversed-content');
  const symbolismContent = document.getElementById('meaning-symbolism-content');
  
  function switchGrimorioTab(activeBtn, activeContent) {
    [tabUpright, tabReversed, tabSymbolism].forEach(btn => btn && btn.classList.remove('active'));
    [uprightContent, reversedContent, symbolismContent].forEach(cnt => cnt && cnt.classList.add('hidden'));
    
    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.remove('hidden');
  }

  if (tabUpright) {
    tabUpright.addEventListener('click', () => switchGrimorioTab(tabUpright, uprightContent));
  }
  if (tabReversed) {
    tabReversed.addEventListener('click', () => switchGrimorioTab(tabReversed, reversedContent));
  }
  if (tabSymbolism) {
    tabSymbolism.addEventListener('click', () => switchGrimorioTab(tabSymbolism, symbolismContent));
  }
  
  // Bind navigation buttons
  const prevBtn = document.getElementById('book-prev-btn');
  const nextBtn = document.getElementById('book-next-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateBookCard(prevId, 'prev'));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateBookCard(nextId, 'next'));
  }

  // Display modal and set book-mode class
  modal.classList.add('book-mode');
  modal.classList.remove('hidden');
}

function closeCardDetailModal() {
  const modal = document.getElementById('card-detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('book-mode');
  }
  if (window.history.pushState && window.location.search.includes('carta=')) {
    window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
  }
}

// Bind modal closing events
function setupModalEvents() {
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCardDetailModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeCardDetailModal);
  }
  
  // Close on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCardDetailModal();
    }
  });
}

// Apply 3D Tilt and custom shine sheen reflections on hover
function apply3DTilt(cardWrapper) {
  if (!cardWrapper) return;
  const inner = cardWrapper.querySelector('.card-inner');
  if (!inner) return;

  let ticking = false;

  cardWrapper.addEventListener('mousemove', (e) => {
    if (cardWrapper.classList.contains('flipping')) return;

    if (!ticking) {
      requestAnimationFrame(() => {
        if (cardWrapper.classList.contains('flipping')) {
          ticking = false;
          return;
        }

        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const angleX = (yc - y) / 10; // Suavizado del ángulo a max ~9 grados
        const angleY = (x - xc) / 10;

        cardWrapper.classList.add('tilting');

        const isFlipped = cardWrapper.classList.contains('flipped');
        const rotationY = isFlipped ? angleY + 180 : angleY;
        
        inner.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)';
        inner.style.transform = `rotateY(${rotationY}deg) rotateX(${angleX}deg) scale(1.04)`;

        // Update CSS variables for shine positioning
        const px = (x / rect.width) * 100;
        const py = (y / rect.height) * 100;
        cardWrapper.style.setProperty('--shine-x', `${px}%`);
        cardWrapper.style.setProperty('--shine-y', `${py}%`);
        
        ticking = false;
      });
      ticking = true;
    }
  });

  cardWrapper.addEventListener('mouseleave', () => {
    cardWrapper.classList.remove('tilting');
    if (cardWrapper.classList.contains('flipping')) return;
    
    const isFlipped = cardWrapper.classList.contains('flipped');
    inner.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    inner.style.transform = isFlipped ? 'rotateY(180deg) rotateX(0deg) scale(1)' : 'rotateY(0deg) rotateX(0deg) scale(1)';
  });
}

// Astrological Transit Engine Metadata & Data Structures
const PLANET_METADATA = {
  sun: { name: "Sol", symbol: "☀️", keyword: "Esencia e Identidad" },
  moon: { name: "Luna", symbol: "🌙", keyword: "Emociones y Subconsciente" },
  mercury: { name: "Mercurio", symbol: "☿", keyword: "Mente y Comunicación" },
  venus: { name: "Venus", symbol: "♀", keyword: "Amor y Armonía" },
  mars: { name: "Marte", symbol: "♂", keyword: "Acción y Fuerza" },
  jupiter: { name: "Júpiter", symbol: "♃", keyword: "Expansión y Suerte" },
  saturn: { name: "Saturno", symbol: "♄", keyword: "Estructura y Lección" }
};

const ASPECT_TEXTS = {
  general: {
    conjunction: "El Sol y Saturno convergen con tu energía, marcando un período de profunda redefinición personal. Sientes el peso de tus decisiones, pero también la autoridad para cambiar tu rumbo.",
    trine: "El flujo de Saturno y el Sol es excepcionalmente suave hoy. Tus planes estructurados avanzan sin esfuerzo, dándote estabilidad y el respeto de quienes te rodean.",
    sextile: "Se abren oportunidades sólidas para consolidar proyectos a largo plazo. La disciplina te resulta natural y encuentras apoyo en figuras de autoridad.",
    square: "Sientes fricción entre tus deseos inmediatos y tus responsabilidades. Saturno te exige paciencia; no fuerces los resultados hoy, es momento de planificar.",
    opposition: "Pueden surgir tensiones o límites impuestos por otros. Es un llamado a equilibrar tus necesidades individuales con tus compromisos.",
    none: "El clima general es de estabilidad y calma. Un buen momento para centrarte en tu rutina diaria y en construir cimientos firmes sin prisa."
  },
  love: {
    conjunction: "Venus se funde con tu signo, potenciando al máximo tu magnetismo personal. Es un momento idóneo para expresar lo que sientes y abrir tu corazón.",
    trine: "El amor fluye de manera natural y espontánea. Si estás en pareja, la armonía y la complicidad se renuevan. Si estás soltero, atraes conexiones afines.",
    sextile: "Las conversaciones afectivas son fluidas y sanadoras. Excelente momento para citas, reconciliaciones o para fortalecer lazos de amistad.",
    square: "Tensiones en el ámbito afectivo por diferencias de criterio o expectativas. Evita discusiones acaloradas y busca comprender el punto de vista del otro.",
    opposition: "Una polaridad en tus relaciones te invita a negociar. Lo que te molesta del otro puede ser un espejo de lo que necesitas trabajar en ti mismo.",
    none: "Las energías afectivas están estables. Es un día favorable para el amor propio, el autocuidado y disfrutar de pequeños placeres sin presiones."
  },
  career: {
    conjunction: "Júpiter y Marte inyectan una dosis de vitalidad extrema a tu sector profesional. Estás listo para liderar, iniciar proyectos y expandir tus fronteras.",
    trine: "El viento sopla a tu favor en el trabajo y los negocios. Tus esfuerzos se traducen en oportunidades de expansión y reconocimiento financiero.",
    sextile: "Tu productividad es alta y tus ideas de negocio son bien recibidas. Es un buen momento para negociar contratos o planificar inversiones.",
    square: "Sensación de impaciencia o sobrecarga en tus tareas. Evita el conflicto con colegas y canaliza el exceso de energía en actividades físicas.",
    opposition: "Debes balancear tu ambición profesional con el descanso. Cuidado con promesas excesivas de socios o superiores que no se puedan cumplir.",
    none: "Tu panorama laboral se mantiene en orden. Buen momento para organizar tu agenda, finalizar pendientes y avanzar paso a paso."
  },
  mind: {
    conjunction: "Mercurio activa tu mente a niveles muy altos. Tu capacidad de aprendizaje y comunicación está en su punto álgido; escribe y comparte tus ideas.",
    trine: "Tu pensamiento es claro y tu intuición espiritual está agudizada. Buen momento para la meditación, la lectura o estudios filosóficos.",
    sextile: "Tu comunicación es asertiva y persuasiva. Es un día ideal para exámenes, entrevistas, o para resolver malentendidos pendientes.",
    square: "Ruido mental o dispersión en tus ideas. Te cuesta concentrarte; tómate pausas para calmar la mente y evita tomar decisiones apresuradas.",
    opposition: "Fricción en las comunicaciones. Esfuérzate por ser muy claro al expresarte para evitar malentendidos con quienes te rodean.",
    none: "Estabilidad mental y serenidad. Tu subconsciente procesa las lecciones recientes de manera pacífica. Buen día para la introspección."
  }
};

const ZODIAC_ORDER = ["aries", "tauro", "geminis", "cancer", "leo", "virgo", "libra", "escorpio", "sagitario", "capricornio", "acuario", "piscis"];

function getSignIndex(signName) {
  return ZODIAC_ORDER.indexOf(getSanitizedSignKey(signName));
}

function getAstroDateString(period, date = new Date()) {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  
  if (period === 'daily' || period === 'astro_daily' || period === 'astro_houses') {
    return date.toLocaleDateString('es-ES', options);
  } else if (period === 'weekly' || period === 'astro_weekly') {
    const nextWeek = new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000);
    const dayStart = date.getDate();
    const monthStart = date.toLocaleDateString('es-ES', { month: 'long' });
    const dayEnd = nextWeek.getDate();
    const monthEnd = nextWeek.toLocaleDateString('es-ES', { month: 'long' });
    const yearEnd = nextWeek.getFullYear();
    
    if (monthStart === monthEnd) {
      return `semana del ${dayStart} al ${dayEnd} de ${monthStart} de ${yearEnd}`;
    } else {
      return `semana del ${dayStart} de ${monthStart} al ${dayEnd} de ${monthEnd} de ${yearEnd}`;
    }
  } else {
    const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    return `${capitalizedMonth} de ${date.getFullYear()}`;
  }
}

// Calculate celestial planetary longitudes (0 to 360 degrees) from Jan 1, 2026 epoch
function calculatePlanetaryLongitudes(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = Math.floor(A / 4);
  const C = 2 - A + B;
  const E = Math.floor(365.25 * (y + 4716));
  const F = Math.floor(30.6001 * (m + 1));
  const jd = C + day + E + F - 1524.5;

  const msPerDay = 86400000;
  const epoch = new Date('2026-01-01T00:00:00Z');
  const days = (date - epoch) / msPerDay;
  
  // 1. Sun Apparent Orbit (365.25 days cycle, base 280 deg on Jan 1)
  const sunLong = (280.0 + days * (360.0 / 365.25)) % 360;
  
  // 2. Moon Sidereal Orbit (27.321661 days cycle, base 202 deg on Jan 1 2000)
  const daysSince2000 = jd - 2451544.5;
  const moonPos = (daysSince2000 / 27.321661) % 1;
  let moonLong = (moonPos >= 0 ? moonPos : moonPos + 1) * 360 + 202;
  moonLong = moonLong % 360;
  
  // 3. Mercury Orbit (87.97 days cycle, max 28 degrees elongation from Sun)
  const mercuryLong = (sunLong + 24.0 * Math.sin(days * (2 * Math.PI / 87.97) + 1.2) + 360) % 360;
  
  // 4. Venus Orbit (224.7 days cycle, max 48 degrees elongation from Sun)
  const venusLong = (sunLong + 44.0 * Math.sin(days * (2 * Math.PI / 224.7) + 0.5) + 360) % 360;
  
  // 5. Mars Orbit (686.98 days cycle, base 240 deg on Jan 1, 2026)
  const marsLong = (240.0 + days * (360.0 / 686.98) + 360) % 360;
  
  // 6. Jupiter Orbit (4332.59 days cycle, base 80 deg on Jan 1, 2026)
  const jupiterLong = (80.0 + days * (360.0 / 4332.59) + 360) % 360;
  
  // 7. Saturn Orbit (10759.22 days cycle, base 340 deg on Jan 1, 2026)
  const saturnLong = (340.0 + days * (360.0 / 10759.22) + 360) % 360;
  
  return {
    sun: sunLong,
    moon: moonLong,
    mercury: mercuryLong,
    venus: venusLong,
    mars: marsLong,
    jupiter: jupiterLong,
    saturn: saturnLong
  };
}

// Check aspect between user sign and planet sign
function getAstrologicalAspect(userSign, planetSign) {
  const userIdx = getSignIndex(userSign);
  const planetIdx = getSignIndex(planetSign);
  if (userIdx === -1 || planetIdx === -1) return { type: "none", name: "Neutro", symbol: "•", description: "Tránsito neutral con influencia moderada." };
  
  const diff = Math.abs(userIdx - planetIdx);
  const dist = Math.min(diff, 12 - diff);
  
  switch(dist) {
    case 0:
      return { type: "conjunction", name: "Conjunción", symbol: "☌", description: "Fusión de energías y autoexpresión intensa." };
    case 2:
      return { type: "sextile", name: "Sextil", symbol: "✶", description: "Oportunidades armónicas y fluidez mental." };
    case 3:
      return { type: "square", name: "Cuadratura", symbol: "□", description: "Tensión interna, desafíos y llamado a la acción." };
    case 4:
      return { type: "trine", name: "Trígono", symbol: "△", description: "Gran fluidez, suerte natural y armonía celestial." };
    case 6:
      return { type: "opposition", name: "Oposición", symbol: "☍", description: "Reto relacional, polaridad y necesidad de equilibrio." };
    default:
      return { type: "none", name: "Neutro", symbol: "•", description: "Tránsito neutral con influencia moderada." };
  }
}

// Render aspects SVG wheel
function renderAspectsWheel(userSign, planetLongitudes) {
  const container = document.getElementById('aspects-wheel-dial');
  if (!container) return;

  const width = 320;
  const height = 320;
  const cx = width / 2;
  const cy = height / 2;
  
  const userSignIdx = getSignIndex(userSign);
  const userAngleDeg = userSignIdx * 30 + 15;
  
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="max-width:100%; display:block; margin:0 auto;">`;
  
  svg += `
    <defs>
      <radialGradient id="wheel-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(13, 11, 26, 0.95)" />
        <stop offset="100%" stop-color="rgba(8, 7, 17, 0.95)" />
      </radialGradient>
      <filter id="gold-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="aspect-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;
  
  svg += `<circle cx="${cx}" cy="${cy}" r="150" fill="url(#wheel-bg)" stroke="var(--border-color)" stroke-width="1.5" />`;
  svg += `<circle cx="${cx}" cy="${cy}" r="115" fill="none" stroke="rgba(212, 175, 55, 0.08)" stroke-width="1" />`;
  svg += `<circle cx="${cx}" cy="${cy}" r="85" fill="none" stroke="rgba(212, 175, 55, 0.05)" stroke-width="1" />`;
  
  const signs = [
    { symbol: "♈", name: "Aries" },
    { symbol: "♉", name: "Tauro" },
    { symbol: "♊", name: "Géminis" },
    { symbol: "♋", name: "Cáncer" },
    { symbol: "♌", name: "Leo" },
    { symbol: "♍", name: "Virgo" },
    { symbol: "♎", name: "Libra" },
    { symbol: "♏", name: "Escorpio" },
    { symbol: "♐", name: "Sagitario" },
    { symbol: "♑", name: "Capricornio" },
    { symbol: "♒", name: "Acuario" },
    { symbol: "♓", name: "Piscis" }
  ];
  
  signs.forEach((s, idx) => {
    const angleStart = (idx * 30 - 90) * Math.PI / 180;
    const angleEnd = ((idx + 1) * 30 - 90) * Math.PI / 180;
    const angleMid = (idx * 30 + 15 - 90) * Math.PI / 180;
    
    const x1 = cx + 115 * Math.cos(angleStart);
    const y1 = cy + 115 * Math.sin(angleStart);
    const x2 = cx + 150 * Math.cos(angleStart);
    const y2 = cy + 150 * Math.sin(angleStart);
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(212, 175, 55, 0.15)" stroke-width="0.75" />`;
    
    const tx = cx + 132 * Math.cos(angleMid);
    const ty = cy + 132 * Math.sin(angleMid) + 4.5;
    
    const isUserSign = (idx === userSignIdx);
    const signColor = isUserSign ? 'var(--gold-color)' : 'var(--text-muted)';
    const fontWeight = isUserSign ? 'bold' : 'normal';
    const fontSize = isUserSign ? '14px' : '11px';
    
    svg += `<text x="${tx}" y="${ty}" fill="${signColor}" font-size="${fontSize}" font-weight="${fontWeight}" text-anchor="middle" class="zodiac-symbol-text">${s.symbol}</text>`;
    
    if (isUserSign) {
      const xStart = cx + 148 * Math.cos(angleStart);
      const yStart = cy + 148 * Math.sin(angleStart);
      const xEnd = cx + 148 * Math.cos(angleEnd);
      const yEnd = cy + 148 * Math.sin(angleEnd);
      svg += `<path d="M ${xStart} ${yStart} A 148 148 0 0 1 ${xEnd} ${yEnd}" fill="none" stroke="var(--gold-color)" stroke-width="3.5" filter="url(#gold-glow-filter)" />`;
    }
  });
  
  const userRad = (userAngleDeg - 90) * Math.PI / 180;
  const userX = cx + 100 * Math.cos(userRad);
  const userY = cy + 100 * Math.sin(userRad);
  
  const planets = Object.keys(planetLongitudes);
  planets.forEach(p => {
    const long = planetLongitudes[p];
    const planetSignIdx = Math.floor(long / 30);
    const planetSign = signs[planetSignIdx].name;
    const aspect = getAstrologicalAspect(userSign, planetSign);
    
    const planetRad = (long - 90) * Math.PI / 180;
    const planetX = cx + 100 * Math.cos(planetRad);
    const planetY = cy + 100 * Math.sin(planetRad);
    
    if (aspect.type !== 'none' && aspect.type !== 'conjunction') {
      let strokeColor = '';
      if (aspect.type === 'trine') { strokeColor = '#06b6d4'; }
      else if (aspect.type === 'sextile') { strokeColor = '#10b981'; }
      else if (aspect.type === 'square') { strokeColor = '#ef4444'; }
      else if (aspect.type === 'opposition') { strokeColor = '#8b5cf6'; }
      
      svg += `<line x1="${userX}" y1="${userY}" x2="${planetX}" y2="${planetY}" stroke="${strokeColor}" stroke-width="1.75" filter="url(#aspect-glow)" opacity="0.85" />`;
    }
    
    const meta = PLANET_METADATA[p];
    const px = cx + 100 * Math.cos(planetRad);
    const py = cy + 100 * Math.sin(planetRad);
    
    if (aspect.type === 'conjunction') {
      svg += `<circle cx="${px}" cy="${py}" r="12" fill="none" stroke="var(--gold-color)" stroke-width="1" opacity="0.6" stroke-dasharray="2 2" />`;
    }
    
    svg += `
      <g class="planet-node-group" cursor="pointer">
        <circle cx="${px}" cy="${py}" r="9" fill="rgba(8, 7, 17, 0.9)" stroke="var(--border-color)" stroke-width="1" />
        <text x="${px}" y="${py + 3}" fill="var(--text-main)" font-size="8px" text-anchor="middle">${meta.symbol}</text>
        <title>${meta.name} en ${planetSign} (${Math.floor(long % 30)}°) - Aspecto: ${aspect.name}</title>
      </g>
    `;
  });
  
  svg += `
    <g transform="translate(${cx}, ${cy}) scale(0.6)">
      <circle cx="0" cy="0" r="16" fill="rgba(212, 175, 55, 0.05)" stroke="var(--gold-color)" stroke-width="0.75" />
      <polygon points="0,-12 3,-3 12,-3 5,2 8,11 0,6 -8,11 -5,2 -12,-3 -3,-3" fill="var(--gold-color)" />
    </g>
  `;
  
  svg += `</svg>`;
  container.innerHTML = svg;
}

// Render planetary grid cards
function renderPlanetaryGrid(longitudes, userSign) {
  const grid = document.getElementById('transits-planets-grid');
  if (!grid) return;
  
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  let html = "";
  
  const planets = Object.keys(longitudes);
  planets.forEach(p => {
    const long = longitudes[p];
    const signIdx = Math.floor(long / 30);
    const signName = signs[signIdx];
    const signDeg = Math.floor(long % 30);
    
    const signKey = getSanitizedSignKey(signName);
    const signData = ZODIAC_INFO[signKey] || { symbol: "✦", element: "Éter", ruler: "Cosmos" };
    const aspect = getAstrologicalAspect(userSign, signName);
    const meta = PLANET_METADATA[p];
    
    const elementClass = "element-" + getSanitizedSignKey(signData.element);
    
    let aspectClass = "aspect-" + aspect.type;
    let aspectDisplay = aspect.type !== 'none' ? `<span class="aspect-badge ${aspectClass}">${aspect.symbol} ${aspect.name}</span>` : '<span class="aspect-badge aspect-none">Neutro</span>';
    
    let description = "";
    if (p === 'sun') {
      description = `Vitalidad en ${signName}. Afecta a tu expresión y foco.`;
    } else if (p === 'moon') {
      description = `Emociones en ${signName}. Rige tu intuición y subconsciente.`;
    } else if (p === 'mercury') {
      description = `Intelecto en ${signName}. Rige tu comunicación e ideas.`;
    } else if (p === 'venus') {
      description = `Afecto en ${signName}. Rige tus relaciones y goce.`;
    } else if (p === 'mars') {
      description = `Fuerza en ${signName}. Rige tu iniciativa y empuje físico.`;
    } else if (p === 'jupiter') {
      description = `Expansión en ${signName}. Trae crecimiento y oportunidades.`;
    } else if (p === 'saturn') {
      description = `Madurez en ${signName}. Aporta disciplina y estructura.`;
    }
    
    html += `
      <div class="planet-transit-card ${elementClass}">
        <div class="planet-card-header">
          <span class="planet-symbol">${meta.symbol}</span>
          <div class="planet-name-wrap">
            <h4 class="planet-name">${meta.name}</h4>
            <span class="planet-keyword">${meta.keyword}</span>
          </div>
        </div>
        <div class="planet-card-body">
          <div class="planet-position">
            <strong>${signDeg}° ${signName}</strong> 
            <span class="element-badge">${signData.symbol} ${signData.element}</span>
          </div>
          <div class="planet-aspect-line">
            Relación: ${aspectDisplay}
          </div>
          <p class="planet-influence-desc">${description}</p>
        </div>
      </div>
    `;
  });
  
  grid.innerHTML = html;
}

// Generate the transit narrative horoscopes
function generateRealtimeTransitHoroscope(userSign, period) {
  const date = new Date();
  const longitudes = calculatePlanetaryLongitudes(date);
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  // Render sub-visuals
  renderAspectsWheel(userSign, longitudes);
  renderPlanetaryGrid(longitudes, userSign);
  
  const userSignData = ZODIAC_INFO[getSanitizedSignKey(userSign)];
  const sunSign = signs[Math.floor(longitudes.sun / 30)];
  const moonSign = signs[Math.floor(longitudes.moon / 30)];
  const mercurySign = signs[Math.floor(longitudes.mercury / 30)];
  const venusSign = signs[Math.floor(longitudes.venus / 30)];
  const marsSign = signs[Math.floor(longitudes.mars / 30)];
  const jupiterSign = signs[Math.floor(longitudes.jupiter / 30)];
  const saturnSign = signs[Math.floor(longitudes.saturn / 30)];
  
  const sunAspect = getAstrologicalAspect(userSign, sunSign);
  const moonAspect = getAstrologicalAspect(userSign, moonSign);
  const mercuryAspect = getAstrologicalAspect(userSign, mercurySign);
  const venusAspect = getAstrologicalAspect(userSign, venusSign);
  const marsAspect = getAstrologicalAspect(userSign, marsSign);
  const jupiterAspect = getAstrologicalAspect(userSign, jupiterSign);
  const saturnAspect = getAstrologicalAspect(userSign, saturnSign);
  
  let generalText = "";
  if (period === 'daily') {
    generalText = `Hoy, con el Sol transitando por ${sunSign} (${sunAspect.name} a tu signo) y la Luna en ${moonSign}, el clima celeste te invita a un ritmo introspectivo. Como nativo de ${userSignData.name}, tu energía se acopla a la cualidad ${userSignData.diastesis} de tu elemento ${userSignData.element}. ${ASPECT_TEXTS.general[sunAspect.type]}`;
  } else if (period === 'weekly') {
    generalText = `Esta semana, la influencia de Saturno en ${saturnSign} (${saturnAspect.name}) y el Sol en ${sunSign} marcan una pauta de estructuración. Es tiempo de mirar a largo plazo y dejar ir lo superfluo. ${ASPECT_TEXTS.general[saturnAspect.type]} Para tu signo ${userSignData.name}, esto requiere disciplina física, afectando especialmente a ${userSignData.body}.`;
  } else {
    generalText = `El panorama mensual está dominado por el tránsito de Saturno por ${saturnSign} y tu regencia tradicional de ${userSignData.ruler}. Te encuentras en un cruce kármico de consolidación. ${ASPECT_TEXTS.general[saturnAspect.type]} Las lecciones de límites y madurez se reflejan en tu entorno; confía en el tiempo.`;
  }
  
  let loveText = "";
  if (period === 'daily') {
    loveText = `En el terreno amoroso, el influjo de Venus en ${venusSign} (${venusAspect.name}) se combina con la Luna en ${moonSign}. ${ASPECT_TEXTS.love[venusAspect.type]} Escucha tu intuición corporal, pues tu sensibilidad física en ${userSignData.body} está activa hoy.`;
  } else if (period === 'weekly') {
    loveText = `Durante los próximos siete días, las relaciones sentimentales exigen honestidad y equilibrio. La tensión o fluidez de Venus en ${venusSign} (${venusAspect.name}) marca el tono de tus vínculos. ${ASPECT_TEXTS.love[venusAspect.type]} Dedica tiempo a escuchar y a cultivar tu paz interior.`;
  } else {
    loveText = `Este mes, tu vida afectiva experimenta un ciclo de replanteamientos profundos. Con Venus transitando por ${venusSign}, tu sector de relaciones se ilumina. ${ASPECT_TEXTS.love[venusAspect.type]} Se aclaran dudas y se fortalecen compromisos basados en el crecimiento mutuo.`;
  }
  
  let careerText = "";
  if (period === 'daily') {
    careerText = `Tu energía física de hoy está guiada por Marte en ${marsSign} y la expansión de Júpiter en ${jupiterSign} (${jupiterAspect.name}). ${ASPECT_TEXTS.career[jupiterAspect.type]} Evita la dispersión de fuerzas y céntrate en un objetivo material claro a la vez.`;
  } else if (period === 'weekly') {
    careerText = `El clima laboral de la semana demanda estrategia. Con Júpiter en ${jupiterSign} y Marte en ${marsSign} (${marsAspect.name}), dispones del empuje necesario para superar cualquier reto profesional. ${ASPECT_TEXTS.career[marsAspect.type]} Planifica tus movimientos financieros con cautela y orden.`;
  } else {
    careerText = `A nivel mensual, las metas profesionales y el éxito material están en primer plano. El tránsito de Júpiter por ${jupiterSign} abre portales de expansión. ${ASPECT_TEXTS.career[jupiterAspect.type]} Es el momento de presentar propuestas, pedir aumentos o dar saltos importantes de carrera.`;
  }
  
  let mindText = "";
  if (period === 'daily') {
    mindText = `Mentalmente, Mercurio en ${mercurySign} (${mercuryAspect.name}) aporta un ritmo específico a tus pensamientos hoy. ${ASPECT_TEXTS.mind[mercuryAspect.type]} Rige tu mente de aire o tierra, conectándote con la expresión del Verbo y tu chakra regente.`;
  } else if (period === 'weekly') {
    mindText = `Esta semana, las comunicaciones y estudios se ven favorecidos por Mercurio en ${mercurySign}. ${ASPECT_TEXTS.mind[mercuryAspect.type]} Tu agudeza mental te ayudará a cerrar acuerdos importantes, siempre que evites el cansancio psicológico.`;
  } else {
    mindText = `A lo largo de este mes, tu enfoque mental y espiritual entra en una fase de purificación. Con Mercurio transitando por ${mercurySign}, tu forma de ver el mundo madura. ${ASPECT_TEXTS.mind[mercuryAspect.type]} Dedica tiempo a la contemplación y a nutrir tu alma de sabiduría hermética.`;
  }
  
  if (transitsGeneralBox) transitsGeneralBox.innerHTML = `<p>${generalText}</p>`;
  if (transitsLoveBox) transitsLoveBox.innerHTML = `<p>${loveText}</p>`;
  if (transitsCareerBox) transitsCareerBox.innerHTML = `<p>${careerText}</p>`;
  if (transitsMindBox) transitsMindBox.innerHTML = `<p>${mindText}</p>`;
}

// Initialize everything
initTabNavigation();
setupModalEvents();

// Initialize Horoscope interactions and bindings
function initHoroscope() {
  if (astroShuffleBtn) {
    astroShuffleBtn.addEventListener('click', () => {
      if (isAstroShuffling) return;
      isAstroShuffling = true;
      const deck = document.getElementById('astro-mystical-deck');
      if (deck) deck.classList.add('shuffling');
      astroShuffleBtn.textContent = 'Barajando astros...';
      astroShuffleBtn.disabled = true;
      
      setTimeout(() => {
        if (deck) deck.classList.remove('shuffling');
        astroShuffleBtn.textContent = 'Barajar Astros';
        astroShuffleBtn.disabled = false;
        isAstroShuffling = false;
      }, 1800);
    });
  }

  if (astroConsultBtn) {
    astroConsultBtn.addEventListener('click', () => {
      selectedZodiac = zodiacSelect.value;
      selectedAstroSpread = astroSpreadSelect.value;
      
      // Persist user sign
      localStorage.setItem('user_zodiac_sign', selectedZodiac);
      
      if (selectedAstroSpread === 'astro_daily') {
        astroTotalCards = 1;
        currentAstroSpread = drawCards(1);
      } else if (selectedAstroSpread === 'astro_houses') {
        astroTotalCards = 12;
        currentAstroSpread = drawCards(12);
      } else {
        astroTotalCards = 3;
        currentAstroSpread = drawCards(3);
      }
      astroFlippedCount = 0;
      
      astroCardsBoard.className = 'cards-board' + (selectedAstroSpread === 'astro_houses' ? ' layout-houses' : '');
      astroCardsBoard.innerHTML = '';
      if (astroDeckContainer) astroDeckContainer.style.display = 'none';
      if (astroResultsPanel) astroResultsPanel.classList.add('hidden');
      
      if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "El cosmos ha alineado tu tirada";
      if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = "Haz clic en cada carta para revelar su mensaje y descubrir tu horóscopo.";
      
      currentAstroSpread.forEach((card, index) => {
        let posLabel = "Carta " + (index + 1);
        if (selectedAstroSpread === 'astro_weekly') {
          const positions = ["Energía Regente de la Semana", "El Desafío Semanal / Obstáculo", "El Consejo Astral / Solución"];
          posLabel = positions[index];
        } else if (selectedAstroSpread === 'astro_houses') {
          const positions = [
            "Casa I: Personalidad",
            "Casa II: Recursos",
            "Casa III: Entorno",
            "Casa IV: Hogar",
            "Casa V: Creatividad",
            "Casa VI: Trabajo/Salud",
            "Casa VII: Pareja",
            "Casa VIII: Transformación",
            "Casa IX: Filosofía",
            "Casa X: Profesión",
            "Casa XI: Amistad",
            "Casa XII: Subconsciente"
          ];
          posLabel = positions[index];
        } else {
          posLabel = "Tu Consejo Diario";
        }
        
        const cardWrapper = document.createElement('div');
        cardWrapper.className = `card-wrapper dealt${card.isReversed ? ' reversed' : ''}`;
        cardWrapper.style.animationDelay = `${index * 0.15}s`;
        cardWrapper.setAttribute('data-index', index);
        
        // Remove dealt class after deal animation finishes to allow custom layout transforms
        setTimeout(() => {
          cardWrapper.classList.remove('dealt');
          cardWrapper.style.animationDelay = '';
        }, (index * 0.15 + 0.8) * 1000);
        
        if (selectedAstroSpread === 'astro_houses') {
          const angle = Math.PI - (index * Math.PI / 6);
          const R = 210;
          const centerX = 310;
          const centerY = 310;
          const left = Math.round(centerX + R * Math.cos(angle) - 55);
          const top = Math.round(centerY + R * Math.sin(angle) - 90);
          cardWrapper.style.left = `${left}px`;
          cardWrapper.style.top = `${top}px`;
        }
        
        cardWrapper.innerHTML = `
          <div class="card-inner">
            <div class="card-back"></div>
            <div class="card-front" style="background-image: url('assets/card_${card.id}.jpg');"></div>
          </div>
          <div class="placeholder-label" style="text-align:center; color: var(--gold-color); margin-top:0.75rem; font-size:0.75rem; font-weight:600;">
            ${posLabel}
          </div>
        `;
        
        cardWrapper.addEventListener('click', () => {
          if (cardWrapper.classList.contains('flipped')) return;
          cardWrapper.classList.add('flipped');
          astroFlippedCount++;
          
          if (astroFlippedCount === astroTotalCards) {
            setTimeout(showAstroInterpretation, 800);
          }
        });
        
        astroCardsBoard.appendChild(cardWrapper);
        apply3DTilt(cardWrapper);
      });
      
      document.querySelector('#horoscope-tab-content .reading-table').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (astroResetBtn) {
    astroResetBtn.addEventListener('click', () => {
      if (astroResultsPanel) astroResultsPanel.classList.add('hidden');
      if (astroDeckContainer) astroDeckContainer.style.display = 'flex';
      astroCardsBoard.innerHTML = '';
      
      if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "Alinea tu energía con el Zodíaco...";
      if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = "Elige tu signo y realiza la tirada para consultar el clima astral.";
      
      document.querySelector('#horoscope-tab-content .config-panel').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Astro Mode Toggles
  const astroModeBtns = document.querySelectorAll('#astro-mode-toggle .mode-btn');
  astroModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-astro-mode');
      
      // Update active class on buttons
      astroModeBtns.forEach(b => {
        if (b.getAttribute('data-astro-mode') === mode) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
      
      // Toggle form visibility
      if (mode === 'tarot') {
        if (astroTarotFormGroup) astroTarotFormGroup.classList.remove('hidden');
        if (astroTransitsFormGroup) astroTransitsFormGroup.classList.add('hidden');
        
        const readingTable = document.querySelector('#horoscope-tab-content .reading-table');
        if (readingTable) readingTable.classList.remove('hidden');
        
        if (astroResultsPanel && !astroResultsPanel.classList.contains('hidden')) {
          if (astroTarotResultsGroup) astroTarotResultsGroup.classList.remove('hidden');
          if (astroTransitsResultsGroup) astroTransitsResultsGroup.classList.add('hidden');
          if (astroResetBtn) astroResetBtn.textContent = 'REALIZAR OTRA TIRADA ASTRO';
        }
      } else if (mode === 'transits') {
        if (astroTarotFormGroup) astroTarotFormGroup.classList.add('hidden');
        if (astroTransitsFormGroup) astroTransitsFormGroup.classList.remove('hidden');
        
        const readingTable = document.querySelector('#horoscope-tab-content .reading-table');
        if (readingTable) readingTable.classList.add('hidden');
        
        if (astroResultsPanel && !astroResultsPanel.classList.contains('hidden')) {
          if (astroTarotResultsGroup) astroTarotResultsGroup.classList.add('hidden');
          if (astroTransitsResultsGroup) astroTransitsResultsGroup.classList.remove('hidden');
          if (astroResetBtn) astroResetBtn.textContent = 'CONSULTAR OTROS TRÁNSITOS';
        }
      }
    });
  });

  // Transit Consulting Action
  if (astroTransitsConsultBtn) {
    astroTransitsConsultBtn.addEventListener('click', () => {
      selectedZodiac = zodiacSelect.value;
      const period = astroTransitsPeriodSelect.value;
      
      // Persist user sign
      localStorage.setItem('user_zodiac_sign', selectedZodiac);
      
      if (astroResultsPanel) {
        astroResultsPanel.classList.remove('hidden');
        if (astroTarotResultsGroup) astroTarotResultsGroup.classList.add('hidden');
        if (astroTransitsResultsGroup) astroTransitsResultsGroup.classList.remove('hidden');
        
        if (astroResultTitle) {
          const dateStr = getAstroDateString(period);
          if (period === 'daily') {
            astroResultTitle.textContent = `Tu Clima Celeste Diario (${dateStr})`;
          } else if (period === 'weekly') {
            astroResultTitle.textContent = `Tu Clima Celeste Semanal (${dateStr})`;
          } else {
            astroResultTitle.textContent = `Tu Clima Celeste Mensual (${dateStr})`;
          }
        }
        
        const userSignData = ZODIAC_INFO[selectedZodiac];
        if (astroUserSignText) {
          astroUserSignText.innerHTML = `Zodiaco: <strong>${userSignData.symbol} ${userSignData.name}</strong> (${userSignData.element}) | Tránsitos en Tiempo Real`;
        }
        
        if (astroResetBtn) astroResetBtn.textContent = 'CONSULTAR OTROS TRÁNSITOS';
      }
      
      generateRealtimeTransitHoroscope(selectedZodiac, period);
      astroResultsPanel.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// Generate the narrative forecast and show astro interpretation
function showAstroInterpretation() {
  const date = new Date();
  const sunSign = getSunSign(date);
  const moonSign = getMoonSign(date);
  const moonPhase = getMoonPhaseDetails(date);
  const userSignData = ZODIAC_INFO[selectedZodiac];
  
  if (astroResultTitle) {
    const dateStr = getAstroDateString(selectedAstroSpread);
    if (selectedAstroSpread === 'astro_daily') {
      astroResultTitle.textContent = `Tu Horóscopo Diario (${dateStr})`;
    } else if (selectedAstroSpread === 'astro_houses') {
      astroResultTitle.textContent = `Tu Rueda de las 12 Casas Astrológicas (${dateStr})`;
    } else {
      astroResultTitle.textContent = `Tu Horóscopo Semanal (${dateStr})`;
    }
  }
  if (astroUserSignText) {
    astroUserSignText.innerHTML = `Zodiaco: <strong>${userSignData.symbol} ${userSignData.name}</strong> (${userSignData.element}) | Tránsito de Hoy`;
  }
  
  // Populate climate cols
  const userCol = document.querySelector('.user-sign-info');
  if (userCol) {
    document.getElementById('climate-user-icon').textContent = userSignData.symbol;
    document.getElementById('climate-user-name').textContent = userSignData.name;
    document.getElementById('climate-user-desc').innerHTML = `Signo de <strong>${userSignData.element}</strong>, regido por <strong>${userSignData.ruler}</strong>.<br>Rige físicamente: <strong>${userSignData.body}</strong>.<br>Cualidad astral: <strong>${userSignData.diastesis}</strong>.`;
  }
  
  const sunCol = document.querySelector('.sun-transit-info');
  if (sunCol) {
    const sunRuler = ZODIAC_INFO[getSanitizedSignKey(sunSign)].ruler;
    const primarySunRuler = sunRuler.split(' y ')[0];
    const sunAngel = PLANETARY_ANGELS[primarySunRuler] ? PLANETARY_ANGELS[primarySunRuler].angel : "Gabriel";
    const sunChakra = getAstroChakra(sunSign);
    document.getElementById('climate-sun-name').textContent = `Temporada de ${sunSign}`;
    document.getElementById('climate-sun-desc').innerHTML = `Sol en ${sunSign}, regido por <strong>${sunRuler}</strong>.<br>Ángel guía: <strong>${sunAngel}</strong>.<br>Chakra activo: <strong>${sunChakra.name.split(' ')[0]}</strong> (${sunChakra.loc}).`;
  }
  
  const moonCol = document.querySelector('.moon-transit-info');
  if (moonCol) {
    const moonRuler = ZODIAC_INFO[getSanitizedSignKey(moonSign)].ruler;
    const primaryMoonRuler = moonRuler.split(' y ')[0];
    const moonAngel = PLANETARY_ANGELS[primaryMoonRuler] ? PLANETARY_ANGELS[primaryMoonRuler].angel : "Gabriel";
    document.getElementById('climate-moon-icon').innerHTML = getMoonSvg(moonPhase.phase, localStorage.getItem('lunar_hemisphere') || 'north');
    document.getElementById('climate-moon-name').textContent = `${moonPhase.phaseName} en ${moonSign}`;
    document.getElementById('climate-moon-desc').innerHTML = `Luna en ${moonSign}, regido por <strong>${moonRuler}</strong>.<br>Ángel guía: <strong>${moonAngel}</strong>.<br>Influencia: <em>${moonPhase.description.split('.')[0]}</em>.`;
  }
  
  // Create forecast text
  let forecastText = "";
  if (selectedAstroSpread === 'astro_daily') {
    forecastText = generateDailyAstroForecast(sunSign, moonSign, moonPhase, userSignData);
  } else if (selectedAstroSpread === 'astro_houses') {
    forecastText = generateHousesAstroForecast(sunSign, moonSign, moonPhase, userSignData);
  } else {
    forecastText = generateWeeklyAstroForecast(sunSign, moonSign, moonPhase, userSignData);
  }
  if (astroForecastText) astroForecastText.innerHTML = forecastText;
  
  // Set quick summary forecast paragraph
  if (astroSummaryTitle) {
    if (selectedAstroSpread === 'astro_daily') {
      astroSummaryTitle.textContent = "Tu Clave del Día";
    } else if (selectedAstroSpread === 'astro_houses') {
      astroSummaryTitle.textContent = "Tu Eje Ascendente - Medio Cielo";
    } else {
      astroSummaryTitle.textContent = "Tu Clave de la Semana";
    }
  }
  if (astroSummaryForecastText) {
    let summaryText = "";
    if (selectedAstroSpread === 'astro_daily') {
      const card = currentAstroSpread[0];
      const cardName = card.isReversed ? `${card.name} (Invertida)` : card.name;
      const themes = card.isReversed ? "los bloqueos a transformar y la cautela" : (card.keyThemes || "la expansión y la claridad").toLowerCase().replace('.', '');
      summaryText = `Hoy, bajo el influjo estelar de <strong>${cardName}</strong>, el firmamento te llama a sintonizar con <em>${themes}</em>. Tu clave para estas 24 horas como nativo de <strong>${userSignData.name}</strong> es actuar desde la serenidad interior, cuidando tu energía física y tomando decisiones meditadas sin apresurar los tiempos cósmicos.`;
    } else if (selectedAstroSpread === 'astro_houses' && currentAstroSpread.length === 12) {
      const c1 = currentAstroSpread[0];
      const c10 = currentAstroSpread[9];
      const name1 = c1.isReversed ? `${c1.name} (Invertida)` : c1.name;
      const name10 = c10.isReversed ? `${c10.name} (Invertida)` : c10.name;
      summaryText = `El mapa de las 12 Casas revela tu eje maestro de evolución: <strong>${name1}</strong> rige tu Casa I (Identidad y Autoexpresión) mientras <strong>${name10}</strong> corona tu Casa X (Destino y Profesión). Tu gran triunfo en este ciclo dependerá de alinear tu autenticidad más pura con tus más altas ambiciones mundanas.`;
    } else if (selectedAstroSpread === 'astro_weekly' && currentAstroSpread.length === 3) {
      const c1 = currentAstroSpread[0];
      const c2 = currentAstroSpread[1];
      const c3 = currentAstroSpread[2];
      const name1 = c1.isReversed ? `${c1.name} (Invertida)` : c1.name;
      const name2 = c2.isReversed ? `${c2.name} (Invertida)` : c2.name;
      const name3 = c3.isReversed ? `${c3.name} (Invertida)` : c3.name;
      summaryText = `Tu semana para <strong>${userSignData.name}</strong> se proyecta como una travesía de transformación integral: arrancas con la corriente de <strong>${name1}</strong>, superarás la prueba de aprendizaje de <strong>${name2}</strong> a mitad de semana, y alcanzarás una resolución victoriosa aplicando el consejo maestro de <strong>${name3}</strong>.`;
    }
    astroSummaryForecastText.innerHTML = summaryText;
  }
  
  // Check for synergies and couples
  let matches = [];
  
  currentAstroSpread.forEach(card => {
    const cardAstro = ASTRO_MAP[card.id];
    if (cardAstro) {
      if (cardAstro.sign && getSanitizedSignKey(cardAstro.sign) === selectedZodiac) {
        matches.push(`
          <div class="astro-synergy-badge">
            <span class="synergy-icon">✨</span>
            <div class="synergy-text-content">
              <h4>Sinergia de Identidad Astral Máxima</h4>
              <p>Has extraído <strong>${card.name}</strong>, el arcano regente directo de tu signo <strong>${userSignData.name}</strong>. Esta alineación amplifica tu poder personal, indicando que el mensaje del oráculo describe tu yo más íntimo y tus decisiones de forma crucial hoy.</p>
            </div>
          </div>
        `);
      }
      if (cardAstro.sign && getSanitizedSignKey(cardAstro.sign) === getSanitizedSignKey(sunSign)) {
        matches.push(`
          <div class="astro-synergy-badge">
            <span class="synergy-icon">☀️</span>
            <div class="synergy-text-content">
              <h4>Sinergia de Tránsito Solar</h4>
              <p>La carta <strong>${card.name}</strong> representa la temporada actual de <strong>${sunSign}</strong>. Esto señala que las circunstancias externas de la sociedad y el clima colectivo del momento facilitan la manifestación de este arcano en tu vida.</p>
            </div>
          </div>
        `);
      }
    }
  });
  
  if (selectedAstroSpread === 'astro_weekly' && currentAstroSpread.length === 3) {
    const ids = currentAstroSpread.map(c => c.id);
    TAROT_COUPLES.forEach(couple => {
      if (ids.includes(couple.c1) && ids.includes(couple.c2)) {
        matches.push(`
          <div class="tarot-couple-card">
            <span class="couple-icon">🔮</span>
            <div class="couple-text-content">
              <h4>Conjunción Arquetípica: ${couple.name}</h4>
              <p>${couple.desc} La aparición conjunta de estos arcanos esta semana indica un entrelazamiento de fuerzas kármicas destinadas al aprendizaje en tus relaciones o tu equilibrio interno.</p>
            </div>
          </div>
        `);
      }
    });
  }
  
  if (matches.length > 0) {
    if (astroSpecialSection && astroSpecialBox) {
      astroSpecialBox.innerHTML = matches.join("");
      astroSpecialSection.classList.remove('hidden');
    }
  } else {
    if (astroSpecialSection) astroSpecialSection.classList.add('hidden');
  }
  
  // Populate individual card breakdowns
  if (astroBreakdownGrid) {
    astroBreakdownGrid.innerHTML = "";
    currentAstroSpread.forEach((card, index) => {
      let posLabel = "Tránsito Diario";
      if (selectedAstroSpread === 'astro_weekly') {
        const positions = ["Energía Regente de la Semana", "El Desafío Semanal / Obstáculo", "El Consejo Astral / Solución"];
        posLabel = positions[index];
      } else if (selectedAstroSpread === 'astro_houses') {
        const positions = [
          "Casa I: Personalidad",
          "Casa II: Recursos",
          "Casa III: Entorno",
          "Casa IV: Hogar",
          "Casa V: Creatividad",
          "Casa VI: Trabajo/Salud",
          "Casa VII: Pareja",
          "Casa VIII: Transformación",
          "Casa IX: Filosofía",
          "Casa X: Profesión",
          "Casa XI: Amistad",
          "Casa XII: Subconsciente"
        ];
        posLabel = positions[index];
      }
      
      const cardNameDisplay = card.isReversed ? `${card.name} (Invertida)` : card.name;
      const meaningText = card.isReversed ? (card.reversed?.general || card.meanings?.general) : card.meanings?.general;
      const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦", keywords: "Fuerza universal" };
      
      let cardRuler = astro.ruler;
      const primaryCardRuler = cardRuler.split(' y ')[0];
      let cardAngel = PLANETARY_ANGELS[primaryCardRuler] ? PLANETARY_ANGELS[primaryCardRuler].angel : "Gabriel";
      
      const item = document.createElement('div');
      item.className = 'card-breakdown-card';
      const miniViewClass = `card-mini-view${card.isReversed ? ' reversed' : ''}`;
      
      item.innerHTML = `
        <div class="${miniViewClass}" style="background-image: url('assets/card_${card.id}.jpg');"></div>
        <div class="card-info-content">
          <div class="card-info-header">
            <h4 class="card-info-title">${cardNameDisplay}</h4>
            <span class="position-tag">${posLabel}</span>
          </div>
          <div class="card-astro-badge" title="${astro.keywords}">
            <span class="card-astro-symbol">${astro.symbol}</span>
            <span>Regencia: ${astro.ruler} (Ángel: <strong>${cardAngel}</strong>)</span>
          </div>
          <p class="card-info-themes"><strong>Fuerza Astral:</strong> ${astro.keywords}</p>
          <p class="card-info-meaning">${meaningText}</p>
        </div>
      `;
      astroBreakdownGrid.appendChild(item);
    });
  }
  
  if (astroResultsPanel) {
    astroResultsPanel.classList.remove('hidden');
    astroResultsPanel.scrollIntoView({ behavior: 'smooth' });
  }
  
  if (astroReadingStatusTitle) astroReadingStatusTitle.textContent = "Predicción Completada";
  if (astroReadingStatusDesc) astroReadingStatusDesc.textContent = "Desplázate hacia abajo para ver el oráculo y el clima astral.";
  
  if (!isAstroFromHistory) {
    saveReading(`Consulta del Horóscopo (${selectedZodiac})`, selectedAstroSpread);
  }
  isAstroFromHistory = false;
}

function generateDailyAstroForecast(sunSign, moonSign, moonPhase, userSignData) {
  const card = currentAstroSpread[0];
  const cardName = card.isReversed ? `${card.name} (Invertida)` : card.name;
  const meaning = card.isReversed ? (card.reversed?.general || card.meanings?.general) : card.meanings?.general;
  const love = card.isReversed ? (card.reversed?.love || meaning) : (card.meanings?.love || meaning);
  const work = card.isReversed ? (card.reversed?.work || meaning) : (card.meanings?.work || meaning);
  const health = card.isReversed ? (card.reversed?.health || meaning) : (card.meanings?.health || meaning);
  const advice = card.isReversed ? (card.reversed?.alchemy || card.reversed?.general || meaning) : (card.meanings?.advice || card.meanings?.general || meaning);
  const astro = ASTRO_MAP[card.id];

  const sunChakra = getAstroChakra(sunSign);
  const transitRuler = ZODIAC_INFO[getSanitizedSignKey(moonSign)].ruler;
  const lunarAngel = PLANETARY_ANGELS[transitRuler.split(' y ')[0]] ? PLANETARY_ANGELS[transitRuler.split(' y ')[0]].angel : "Gabriel";
  const isWaning = moonPhase.phaseName.toLowerCase().includes('menguante') || moonPhase.phaseName === 'Luna Nueva';

  let forecast = `
    <div class="daily-forecast-container" style="display: flex; flex-direction: column; gap: 1.35rem; line-height: 1.7; color: var(--text-main);">
      
      <div style="background: rgba(229, 193, 88, 0.05); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.15rem; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>☀️</span> Clima Cósmico de Hoy para ${userSignData.name}
        </h4>
        <p style="font-size: 0.93rem; color: var(--text-muted); margin: 0;">
          El firmamento te recibe hoy con el <strong>Sol transitando por ${sunSign}</strong> y la <strong>Luna en ${moonSign} (${moonPhase.phaseName})</strong>. Tu naturaleza de <strong>${userSignData.element}</strong>, custodiada por <strong>${userSignData.ruler}</strong>, recibe el influjo directo del arcano <strong>${cardName}</strong>, cuya frecuencia primordial vibra en sintonía con <em>${astro ? astro.keywords.toLowerCase() : 'el orden universal'}</em>.
        </p>
      </div>

      <!-- Predicción Central del Arcano -->
      <div style="border-left: 3px solid var(--gold-color); padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.85rem; padding-bottom: 0.85rem; border-radius: 0 10px 10px 0;">
        <strong style="color: var(--gold-color); font-size: 0.98rem;">✦ El Mensaje del Oráculo para las Próximas 24 Horas:</strong>
        <p style="font-size: 0.93rem; color: var(--text-muted); margin: 0.4rem 0 0 0;">
          ${meaning}
        </p>
      </div>

      <!-- Áreas del Día: Amor, Trabajo, Salud -->
      <div style="background: rgba(8, 7, 17, 0.5); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.05rem; margin: 0 0 0.85rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🔮</span> Predicción del Día por Áreas
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">
            <strong style="color: #f472b6;">❤️ Amor y Vínculos:</strong> ${love}
          </p>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">
            <strong style="color: var(--gold-color);">💼 Trabajo y Finanzas:</strong> ${work}
          </p>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0;">
            <strong style="color: #38bdf8;">🌿 Vitalidad y Templo Corporal:</strong> ${health} Cuida especialmente <strong>${userSignData.body}</strong> y sintoniza con tu chakra de <strong>${sunChakra.loc}</strong> (${sunChakra.name}).
          </p>
        </div>
      </div>

      <!-- Consejo Alquímico -->
      <div style="background: linear-gradient(135deg, rgba(229, 193, 88, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%); border: 1px dashed var(--gold-color); border-radius: 14px; padding: 1.15rem 1.35rem;">
        <strong style="color: var(--gold-color); font-size: 0.95rem;">🗝️ Clave de Alquimia Diaria:</strong>
        <p style="font-size: 0.92rem; color: var(--text-main); margin: 0.35rem 0 0.5rem 0; font-style: italic;">
          "${advice}"
        </p>
        <span style="display: block; font-size: 0.82rem; color: var(--text-muted); border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 0.5rem;">
          Ángel custodio del día: <strong>${lunarAngel}</strong>. ${!isWaning ? 'Fase de luz propicia para sembrar intenciones y magnetizar deseos.' : 'Fase lunar menguante ideal para purificar tu energía y soltar tensiones innecesarias.'}
        </span>
      </div>

    </div>
  `;

  return forecast;
}

function generateWeeklyAstroForecast(sunSign, moonSign, moonPhase, userSignData) {
  const c1 = currentAstroSpread[0]; // Energía Regente
  const c2 = currentAstroSpread[1]; // Desafío
  const c3 = currentAstroSpread[2]; // Consejo y Desenlace

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);

  const sunRuler = ZODIAC_INFO[getSanitizedSignKey(sunSign)].ruler;
  const primarySunRuler = sunRuler.split(' y ')[0];
  const sunAngel = PLANETARY_ANGELS[primarySunRuler] ? PLANETARY_ANGELS[primarySunRuler].angel : "Gabriel";
  const sunChakra = getAstroChakra(sunSign);

  // Specific domain interpretations extracted from rich tarotDb
  const love1 = c1.isReversed ? (c1.reversed?.love || d1.meaning) : (c1.meanings?.love || d1.meaning);
  const love2 = c2.isReversed ? (c2.reversed?.love || d2.meaning) : (c2.meanings?.love || d2.meaning);
  const love3 = c3.isReversed ? (c3.reversed?.love || d3.meaning) : (c3.meanings?.love || d3.meaning);

  const work1 = c1.isReversed ? (c1.reversed?.work || d1.meaning) : (c1.meanings?.work || d1.meaning);
  const work2 = c2.isReversed ? (c2.reversed?.work || d2.meaning) : (c2.meanings?.work || d2.meaning);
  const work3 = c3.isReversed ? (c3.reversed?.work || d3.meaning) : (c3.meanings?.work || d3.meaning);

  const health1 = c1.isReversed ? (c1.reversed?.health || d1.meaning) : (c1.meanings?.health || d1.meaning);
  const health2 = c2.isReversed ? (c2.reversed?.health || d2.meaning) : (c2.meanings?.health || d2.meaning);
  const health3 = c3.isReversed ? (c3.reversed?.health || d3.meaning) : (c3.meanings?.health || d3.meaning);

  const advice3 = c3.isReversed ? (c3.reversed?.alchemy || c3.reversed?.general || d3.meaning) : (c3.meanings?.advice || c3.meanings?.general || d3.meaning);

  let forecast = `
    <div class="weekly-forecast-container" style="display: flex; flex-direction: column; gap: 1.5rem; line-height: 1.7; color: var(--text-main);">
      
      <!-- 1. Cabecera Astral -->
      <div style="background: rgba(229, 193, 88, 0.05); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.15rem; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🌌</span> Clima Celeste Semanal para ${userSignData.name} (${userSignData.element})
        </h4>
        <p style="font-size: 0.93rem; color: var(--text-muted); margin: 0;">
          Esta semana los hilos del destino se entretejen bajo la radiación del <strong>Sol en ${sunSign}</strong> y las corrientes de la <strong>Luna en ${moonSign} (${moonPhase.phaseName})</strong>. Como nativo de <strong>${userSignData.name}</strong>, regido por <strong>${userSignData.ruler}</strong>, tu vibración de ${userSignData.element.toLowerCase()} se activa para procesar un ciclo kármico de evolución, toma de decisiones y expansión consciente.
        </p>
      </div>

      <!-- 2. Relato Predictivo Continuo -->
      <div>
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.15rem; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>📜</span> El Hilo Kármico Semanal: De la Causa al Desenlace
        </h4>
        
        <!-- Fase 1 -->
        <div style="margin-bottom: 1.25rem; border-left: 3px solid var(--gold-color); padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
          <strong style="color: var(--gold-color); font-size: 0.98rem;">✦ 1. Apertura y Energía Base: ${d1.name}</strong>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.4rem 0 0 0;">
            Los primeros compases de la semana arrancan marcados por la presencia de <strong>${d1.name}</strong>. Esta vibración establece el tono de tus motivaciones: <em>${d1.meaning}</em>. En tu signo <strong>${userSignData.name}</strong>, esto te empuja a tomar la iniciativa y no posponer decisiones cruciales, otorgándote una plataforma de impulso consciente.
          </p>
        </div>

        <!-- Fase 2 -->
        <div style="margin-bottom: 1.25rem; border-left: 3px solid #c084fc; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
          <strong style="color: #c084fc; font-size: 0.98rem;">✦ 2. El Crisol de Prueba y Desafío: ${d2.name}</strong>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.4rem 0 0 0;">
            Hacia la mitad del ciclo, el firmamento pondrá a prueba tu temple mediante el influjo de <strong>${d2.name}</strong>. El reto no surge para detenerte, sino para purificar tu intención: <em>${d2.meaning}</em>. Deberás prestar atención a no caer en reacciones precipitadas, apegos o bloqueos de orgullo; tu maestría consistirá en responder desde la templanza y la visión elevada.
          </p>
        </div>

        <!-- Fase 3 -->
        <div style="margin-bottom: 1.25rem; border-left: 3px solid #10b981; padding-left: 1rem; background: rgba(255, 255, 255, 0.02); padding-top: 0.75rem; padding-bottom: 0.75rem; border-radius: 0 10px 10px 0;">
          <strong style="color: #34d399; font-size: 0.98rem;">✦ 3. La Clave de Triunfo y Desenlace: ${d3.name}</strong>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0.4rem 0 0 0;">
            El cierre de la semana decanta de forma victoriosa si aplicas la sabiduría de <strong>${d3.name}</strong>. El oráculo predice una resolución clarificadora: <em>${d3.meaning}</em>. La integración armónica de este arcano despeja las incertidumbres anteriores, permitiéndote culminar los 7 días con mayor serenidad, madurez y alineación con tu destino.
          </p>
        </div>
      </div>

      <!-- 3. Pronóstico Predictivo por Áreas Vitales -->
      <div style="background: rgba(8, 7, 17, 0.5); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.15rem; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🧭</span> Pronóstico Detallado por Dimensiones Vitales
        </h4>
        
        <div style="display: flex; flex-direction: column; gap: 1.1rem;">
          <div>
            <strong style="color: #f472b6; font-size: 0.95rem;">❤️ Amor y Vínculos Afectivos:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0 0;">
              En tus relaciones, el tránsito de <em>${d1.name}</em> a <em>${d3.name}</em> señala una semana de clarificación emocional. Si tienes pareja, será vital trascender pequeños malentendidos (${d2.name}) abriendo el diálogo sincero: ${love3}. Si estás soltero o en búsqueda, tu magnetismo natural aumentará conforme liberes expectativas rígidas y permitas que la autenticidad guíe tus encuentros.
            </p>
          </div>

          <div>
            <strong style="color: var(--gold-color); font-size: 0.95rem;">💼 Trabajo, Proyectos y Prosperidad:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0 0;">
              A nivel profesional y económico, la estrategia es tu mayor aliada. Inicias con el empuje de <em>${d1.name}</em>, pero deberás vigilar posibles demoras o contratos confusos bajo <em>${d2.name}</em>. La predicción de éxito se concreta hacia el final del ciclo: ${work3}. Mantén orden en tus números y confía en tu talento.
            </p>
          </div>

          <div>
            <strong style="color: #38bdf8; font-size: 0.95rem;">🌿 Vitalidad, Cuerpo y Salud:</strong>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0 0;">
              El cuerpo somatiza los tránsitos celestes. Para <strong>${userSignData.name}</strong>, es crucial prestar atención a <strong>${userSignData.body}</strong> y a tu centro energético de <strong>${sunChakra.loc}</strong> (${sunChakra.name}). ${health2} Modera el estrés con momentos de meditación, descanso reparador y respiración consciente.
            </p>
          </div>
        </div>
      </div>

      <!-- 4. Alquimia y Decreto Semanal -->
      <div style="background: linear-gradient(135deg, rgba(229, 193, 88, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%); border: 1px dashed var(--gold-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.05rem; margin: 0 0 0.4rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🗝️</span> Consejo Oracular & Alquimia Semanal
        </h4>
        <p style="font-size: 0.92rem; color: var(--text-main); margin: 0 0 0.75rem 0; font-style: italic;">
          "${advice3}"
        </p>
        <div style="font-size: 0.86rem; color: #fef08a; border-top: 1px solid rgba(229, 193, 88, 0.2); padding-top: 0.6rem;">
          ✨ <strong>Decreto de Poder para ${userSignData.name}</strong>: <em>"Alineo mi voluntad con el orden cósmico. Acojo el aprendizaje con serenidad y decreto que mi luz interior disuelve toda sombra y abre caminos de abundancia, salud y paz."</em>
        </div>
      </div>

    </div>
  `;

  return forecast;
}

function generateHousesAstroForecast(sunSign, moonSign, moonPhase, userSignData) {
  const housesInfo = [
    { name: "Casa I: Identidad y Personalidad", desc: "El yo exterior, tu temperamento y cómo te presentas al mundo." },
    { name: "Casa II: Recursos y Valores", desc: "Tus finanzas, bienes materiales, seguridad y autoestima." },
    { name: "Casa III: Comunicación y Entorno", desc: "Tus pensamientos, estudios, hermanos y cómo te comunicas." },
    { name: "Casa IV: Hogar y Raíces", desc: "Tu familia, tu infancia, tus bases emocionales y tu intimidad." },
    { name: "Casa V: Creatividad y Romance", desc: "Tus pasiones, amores, hijos, ocio y autoexpresión." },
    { name: "Casa VI: Rutina y Salud", desc: "Tu trabajo diario, hábitos, bienestar físico y espíritu de servicio." },
    { name: "Casa VII: Relaciones y Pareja", desc: "Tus contratos, matrimonio, socios y el espejo de tu alma." },
    { name: "Casa VIII: Transformación y Karma", desc: "La regeneración, crisis, recursos compartidos, herencias y sexualidad." },
    { name: "Casa IX: Sabiduría y Expansión", desc: "Tus estudios superiores, viajes largos, espiritualidad y filosofía de vida." },
    { name: "Casa X: Destino y Profesión", desc: "Tu carrera, estatus social, metas mundanas y éxito profesional." },
    { name: "Casa XI: Ideales y Amigos", desc: "Tus grupos sociales, amigos, esperanzas y proyectos colectivos." },
    { name: "Casa XII: Subconsciente y Trascendencia", desc: "El karma, el subconsciente, tus miedos ocultos y la espiritualidad secreta." }
  ];

  const c1 = currentAstroSpread[0];
  const c4 = currentAstroSpread[3];
  const c7 = currentAstroSpread[6];
  const c10 = currentAstroSpread[9];

  const name1 = c1.isReversed ? `${c1.name} (Invertida)` : c1.name;
  const name4 = c4.isReversed ? `${c4.name} (Invertida)` : c4.name;
  const name7 = c7.isReversed ? `${c7.name} (Invertida)` : c7.name;
  const name10 = c10.isReversed ? `${c10.name} (Invertida)` : c10.name;

  let forecast = `
    <div class="houses-forecast-container" style="display: flex; flex-direction: column; gap: 1.5rem; line-height: 1.7; color: var(--text-main);">
      
      <!-- 1. Cabecera -->
      <div style="background: rgba(229, 193, 88, 0.05); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.15rem; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🪐</span> Gran Mandala de las 12 Casas para ${userSignData.name}
        </h4>
        <p style="font-size: 0.93rem; color: var(--text-muted); margin: 0;">
          La Rueda de las 12 Casas Astrológicas despliega una radiografía holística de tu existencia bajo el influjo del <strong>Sol en ${sunSign}</strong> y la <strong>Luna en ${moonSign}</strong>. Cada casa actúa como un portal donde una faceta de tu destino se manifiesta e interactúa con el resto de tu universo personal.
        </p>
      </div>

      <!-- 2. Los Cuatro Pilares Angulares (La Cruz Cardinal del Destino) -->
      <div style="background: rgba(8, 7, 17, 0.5); border: 1px solid var(--border-color); border-radius: 14px; padding: 1.35rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.1rem; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🏛️</span> Los Cuatro Ángulos Maestros (La Cruz Mayor)
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
          
          <div style="border-left: 3px solid var(--gold-color); padding-left: 0.75rem; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: 0 8px 8px 0;">
            <strong style="color: var(--gold-color); font-size: 0.9rem;">✦ Casa I (Ascendente / Tu Yo):</strong>
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.95rem; margin: 0.2rem 0;">${name1}</div>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Rige tu energía vital, temperamento y la fuerza con la que comienzas este ciclo.</p>
          </div>

          <div style="border-left: 3px solid #38bdf8; padding-left: 0.75rem; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: 0 8px 8px 0;">
            <strong style="color: #38bdf8; font-size: 0.9rem;">✦ Casa IV (Fondo de Cielo / Raíces):</strong>
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.95rem; margin: 0.2rem 0;">${name4}</div>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Rige tu hogar, tu mundo emocional más íntimo y tu estabilidad de base.</p>
          </div>

          <div style="border-left: 3px solid #f472b6; padding-left: 0.75rem; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: 0 8px 8px 0;">
            <strong style="color: #f472b6; font-size: 0.9rem;">✦ Casa VII (Descendente / Pareja):</strong>
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.95rem; margin: 0.2rem 0;">${name7}</div>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Rige tus alianzas afectivas, contratos, matrimonio y el espejo de tu alma.</p>
          </div>

          <div style="border-left: 3px solid #34d399; padding-left: 0.75rem; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: 0 8px 8px 0;">
            <strong style="color: #34d399; font-size: 0.9rem;">✦ Casa X (Medio Cielo / Vocación):</strong>
            <div style="font-weight: 600; color: var(--text-main); font-size: 0.95rem; margin: 0.2rem 0;">${name10}</div>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin: 0;">Rige tus metas mundanas, éxito profesional, reputación y destino social.</p>
          </div>

        </div>
      </div>
  `;

  const quadrants = [
    { title: "Primer Cuadrante: Desarrollo de la Identidad Personal (Casas I a III)", startIndex: 0 },
    { title: "Segundo Cuadrante: Integración Material y Emocional (Casas IV a VI)", startIndex: 3 },
    { title: "Tercer Cuadrante: Relación con el Espejo Externo (Casas VII a IX)", startIndex: 6 },
    { title: "Cuarto Cuadrante: Trascendencia y Destino Cósmico (Casas X a XII)", startIndex: 9 }
  ];

  quadrants.forEach((q) => {
    forecast += `
      <div class="quadrant-block" style="margin-bottom: 0.5rem; border: 1.5px solid rgba(229, 193, 88, 0.15); border-radius: 14px; padding: 1.35rem 1.5rem; background: rgba(8, 7, 17, 0.45);">
        <h4 style="color: var(--gold-color); margin-top: 0; margin-bottom: 1.15rem; font-size: 1.05rem; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px dashed rgba(229, 193, 88, 0.2); padding-bottom: 0.5rem;">${q.title}</h4>
        <div style="display: flex; flex-direction: column; gap: 1.1rem;">
    `;

    for (let i = 0; i < 3; i++) {
      const idx = q.startIndex + i;
      const card = currentAstroSpread[idx];
      const house = housesInfo[idx];
      const cardName = card.isReversed ? `${card.name} (Invertida)` : card.name;
      const meaning = card.isReversed ? (card.reversed?.general || card.meanings?.general) : card.meanings?.general;
      const astro = ASTRO_MAP[card.id] || { ruler: "Cosmos", symbol: "✦" };

      forecast += `
        <div class="house-item" style="border-left: 2px solid ${card.isReversed ? 'var(--purple-color, #c084fc)' : 'var(--gold-color)'}; padding-left: 0.75rem;">
          <h5 style="color: var(--text-main); font-size: 0.95rem; margin: 0 0 0.25rem 0; font-weight: 600;">
            ${house.name} &mdash; <span style="color: var(--gold-color);">${cardName}</span> 
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal; margin-left: 0.5rem;">(Ref: ${astro.symbol} ${astro.ruler})</span>
          </h5>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0 0 0.35rem 0; font-style: italic;">${house.desc}</p>
          <p style="font-size: 0.88rem; color: var(--text-main); margin: 0; line-height: 1.55;">${meaning}</p>
        </div>
      `;
    }

    forecast += `
        </div>
      </div>
    `;
  });

  const sunChakra = getAstroChakra(sunSign);
  const sunRuler = ZODIAC_INFO[getSanitizedSignKey(sunSign)].ruler;
  const primarySunRuler = sunRuler.split(' y ')[0];
  const sunAngel = PLANETARY_ANGELS[primarySunRuler] ? PLANETARY_ANGELS[primarySunRuler].angel : "Gabriel";
  
  forecast += `
      <!-- 4. Gran Síntesis Kármica -->
      <div style="background: linear-gradient(135deg, rgba(229, 193, 88, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%); border: 1px dashed var(--gold-color); border-radius: 14px; padding: 1.25rem 1.5rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.05rem; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <span>🔮</span> Gran Síntesis del Mandala Astrológico
        </h4>
        <p style="font-size: 0.92rem; color: var(--text-main); margin: 0 0 0.75rem 0; line-height: 1.65;">
          La Rueda de las Casas demuestra que no existen áreas aisladas en tu vida: tus emociones familiares (Casa IV) sostienen tus victorias profesionales (Casa X), y el cultivo de tu verdad interior (Casa I) es la clave para la plenitud en tus relaciones afectivas (Casa VII). El cosmos destaca tu chakra de <strong>${sunChakra.loc}</strong> (${sunChakra.name}) como tu gran canalizador energético.
        </p>
        <div style="font-size: 0.86rem; color: #fef08a; border-top: 1px solid rgba(229, 193, 88, 0.2); padding-top: 0.6rem;">
          ✨ <strong>Invocación de Cierre para ${userSignData.name}</strong>: <em>Bajo la custodia del arcángel ${sunAngel}, asumo la maestría sobre mi destino, transmutando cada desafío en sabiduría y abriéndome a la bendición de todas las casas del cielo.</em>
        </div>
      </div>

    </div>
  `;

  return forecast;
}

function getBirthdayElement(day) {
  const agua = [1, 5, 7, 10, 14, 16, 19, 23, 25, 28];
  const fuego = [2, 4, 8, 11, 13, 17, 20, 22, 26, 29, 31];
  const aire = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
  
  if (agua.includes(day)) return { name: "Agua", focus: "Ciencia e Intelecto", color: "var(--gold-color)" };
  if (fuego.includes(day)) return { name: "Fuego", focus: "Negocios y Finanzas", color: "var(--purple-color)" };
  if (aire.includes(day)) return { name: "Aire", focus: "Arte y Creatividad", color: "var(--success-color)" };
  return { name: "Éter", focus: "Espiritualidad", color: "var(--neutral-color)" };
}

function generateKarmicStudyHTML(letterCounts, totalLetters) {
  const KARMIC_LESSONS_MAP = {
    1: "El alma trae consigo el desafío de la autoconfianza. Tu senda en esta vida te invita a encontrar el centro de tu propia voluntad, a tomar decisiones desde la soberanía interior y a confiar en tu criterio sin buscar validación externa.",
    2: "La cooperación y la diplomacia son las lecciones que el karma ha reservado para ti. Aprender a escuchar, a ceder con elegancia y a tejer alianzas auténticas es el camino de crecimiento que tu alma ha elegido transitar.",
    3: "La autoexpresión cróe te pide salir de la sombra y compartir tu mundo interior. Tu mayor regalo es la creatividad: cuando te permites ser visto, enciendes una luz que otros necesitan.",
    4: "La constancia y la estructura son las maestras de tu camino. El alma aprende en esta vida a construir con paciencia, a honrar los compromisos y a encontrar libertad dentro del orden, no huyendo de él.",
    5: "El cambio y la flexibilidad son los maestros que tu karma te envía. Abrirte a lo inesperado, viajar —física o metafóricamente— y recibir la novedad sin resistencia es el aprendizaje central de tu alma.",
    6: "La responsabilidad amorosa es la lección que tu karma propone. Aprender a comprometerte, a cuidar sin perder tu centro y a dar amor sin condiciones —empezando por ti mismo— son los pilares de tu crecimiento.",
    7: "La fe y la profundidad espiritual son los regalos que tu alma aún tiene que descubrir. Cultivar la meditación, la introspectoín honesta y la conexión con algo más grande que el ego te abre puertas que ningún cálculo puede abrir.",
    8: "La madurez en el mundo material es tu aprendizaje profundo. Comprender el verdadero valor de los recursos —no sólo económicos sino también energéticos— y administrarlos con integridad y visión es el terreno donde tu alma crece.",
    9: "La generosidad y el perdón universal son las lecciones que tu karma ha trazado para este ciclo. Aprender a entregarte a los demás sin expectativas de retorno, y a soltar el apego a los resultados, es la forma más elevada que tu alma puede alcanzar."
  };

  const KARMIC_EXCESSES_MAP = {
    1: "La energía del 1 fluye en abundancia a través de ti, y con ella viene el reto del ego. La tendencia al individualismo o la necesidad de control puede convertirse en una sombra si no se canaliza hacia el liderazgo consciente y la humildad genuina.",
    2: "La sensibilidad que te define puede convertirse en hiper-dependencia si no se equilibra. Tu alma aprende a dar desde la plenitud, no desde el miedo al abandono, y a poner límites desde el amor propio.",
    3: "Tu creatividad y elocuencia son dones inmensos, pero la dispersión puede convertirlos en promesas sin forma. La constancia será siempre tu mayor alquimia: transforma la inspiración en creación real.",
    4: "La fortaleza de la estructura puede volverse rigidez si no se airea. Tu alma aprende que las reglas son un punto de partida, no el destino. Abrirte a la imperfectión es parte del plan cósmico para ti.",
    5: "El brillo de tu libertad puede quemarse demasiado rápido si no encuentra cánce. La búsqueda de estimulación constante puede ser una huida más que una expansión. La paz que buscas afuera también vive adentro.",
    6: "El amor que das es genuino, pero a veces carga más de lo que le pertenece cargar. Soltar el control sobre los demás es un acto de amor tan profundo como cualquier cuidado. Tu deber más sagrado empieza contigo.",
    7: "Tu mente es un instrumento extraordinario, pero cuando el análisis reemplaza al corazón, el alma se enfría. El escepticismo puede ser un escudo; dejár caer esa armadura para conectar desde la vulnerabilidad real es tu mayor valentía.",
    8: "El poder y la abundancia fluyen hacia ti, pero cuando el éxito material se convierte en el único horizonte, el alma pierde su norte. El dinero es una energía; la sabiduría es saber cuándo usarla para crecer y cuándo para servir.",
    9: "Tu impulso de entregarte a los demás es uno de los más bellos que existen, pero cuando la entrega nace del miedo a no ser amado, se convierte en carga. El verdadero altruismo empieza por la autogenerosión."
  };

  let karmicHTML = '';
  
  const lessons = [];
  for (let num = 1; num <= 9; num++) {
    if (letterCounts[num] === 0) {
      lessons.push(num);
    }
  }
  
  const excesses = [];
  const expectedFractions = { 1: 0.20, 2: 0.08, 3: 0.10, 4: 0.10, 5: 0.20, 6: 0.10, 7: 0.08, 8: 0.08, 9: 0.14 };
  for (let num = 1; num <= 9; num++) {
    const count = letterCounts[num];
    const expected = Math.max(1, Math.round(totalLetters * expectedFractions[num]));
    if (count > expected + 1) {
      excesses.push(num);
    }
  }
  
  if (lessons.length > 0) {
    karmicHTML += `
      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--gold-color); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>✨</span> Lecciones del Alma en esta Encarnación
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.5;">
          Estas vibraciones numéricas no aparecen en las letras de tu nombre. El cosmos las señala como los aprendizajes que tu alma ha elegido transitar en este ciclo de vida:
        </p>
        <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.50rem;">
          ${lessons.map(num => `
            <li style="border-left: 2px solid var(--gold-color); padding-left: 0.75rem; font-size: 0.9rem; line-height: 1.5;">
              <strong>✦ Vibración ${num}:</strong> ${KARMIC_LESSONS_MAP[num]}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  } else {
    karmicHTML += `
      <div style="margin-bottom: 1.5rem;">
        <h4 style="color: var(--success-color); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>✅</span> El Alma Completa su Crculo
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
          Hay una belleza especial en tu nombre: cada vibración del 1 al 9 está presente en él. El cosmos te dice que traes contigo un equipaje de experiencias integradas. Tu alma conoce los sabores de cada número, y eso te da una riqueza interior poco común.
        </p>
      </div>
    `;
  }
  
  if (excesses.length > 0) {
    karmicHTML += `
      <div>
        <h4 style="color: var(--purple-color); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>⚡</span> Intensidades a Transmutar en este Ciclo
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem; line-height: 1.5;">
          Estas vibraciones aparecen con gran fuerza en las letras de tu nombre. No son defectos: son energías muy presentes que piden ser canalizadas con conciencia para convertirse en tu mayor fortaleza:
        </p>
        <ul style="list-style: none; padding-left: 0; display: flex; flex-direction: column; gap: 0.50rem;">
          ${excesses.map(num => `
            <li style="border-left: 2px solid var(--purple-color); padding-left: 0.75rem; font-size: 0.9rem; line-height: 1.5;">
              <strong>✦ Vibración ${num}:</strong> ${KARMIC_EXCESSES_MAP[num]}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  } else {
    karmicHTML += `
      <div>
        <h4 style="color: var(--success-color); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 600;">
          <span>✅</span> Armonía de las Intensidades
        </h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
          Qué equilibrio tan bello habita en tu nombre. Ninguna vibración desborda a las demás. El cosmos ha tejido en tus letras una orquesta donde cada instrumento suena en su justa medida, permitiéndote navegar tus talentos con fluidez y sin obsesiones que te pesen.
        </p>
      </div>
    `;
  }
  
  return karmicHTML;
}

function calculateNumerologyProfile() {
  const nameInput = document.getElementById('num-name-input');
  const birthInput = document.getElementById('num-birth-input');
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!nameInput || !birthInput) return;
  
  const name = nameInput.value.trim();
  const birthDate = birthInput.value;
  
  if (!name || !birthDate) {
    alert("Por favor, introduce tu nombre completo y tu fecha de nacimiento para que los números revelen tu vibración.");
    if (!name) nameInput.focus();
    else birthInput.focus();
    return;
  }
  
  // Analyze name
  const nameAnalysis = analyzeNameNumerology(name);
  if (nameAnalysis.totalLetters === 0) {
    alert("Por favor, introduce un nombre válido con letras del abecedario.");
    nameInput.focus();
    return;
  }
  
  const soulRaw = nameAnalysis.soulSum;
  const personalityRaw = nameAnalysis.personalitySum;
  
  const soulVal = reduceNumerology(soulRaw);
  const personalityVal = reduceNumerology(personalityRaw);
  
  // Destiny / Sendero de Vida
  const dateParts = birthDate.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const dayVal = parseInt(dateParts[2], 10);
  
  let dateDigitSum = 0;
  const birthDigitsStr = birthDate.replace(/[^0-9]/g, '');
  for (let digit of birthDigitsStr) {
    dateDigitSum += parseInt(digit, 10);
  }
  const destinyVal = reduceNumerology(dateDigitSum);
  
  // Potential
  const potentialVal = reduceNumerology(destinyVal + dayVal);
  
  // Render values
  document.getElementById('num-soul-val').textContent = soulVal;
  document.getElementById('num-soul-desc').innerHTML = NUM_SOUL_DB[soulVal] || "Deseos internos de tu alma.";
  
  document.getElementById('num-personality-val').textContent = personalityVal;
  document.getElementById('num-personality-desc').innerHTML = NUM_PERSONALITY_DB[personalityVal] || "Cómo te ven los demás.";
  
  document.getElementById('num-destiny-val').textContent = destinyVal;
  document.getElementById('num-destiny-desc').innerHTML = NUM_DESTINY_DB[destinyVal] || "Tu misión de vida y sendero natal.";
  
  document.getElementById('num-potential-val').textContent = potentialVal;
  document.getElementById('num-potential-desc').innerHTML = NUM_POTENTIAL_DB[potentialVal] || "Tus logros y virtudes en la madurez.";
  
  const bdayDbItem = NUM_BIRTHDAY_DB[dayVal] || { desc: "Tu día natal.", group: 1 };
  const elementObj = getBirthdayElement(dayVal);
  document.getElementById('num-birthday-val').textContent = dayVal;
  document.getElementById('num-birthday-desc').innerHTML = `<strong>Día natal: ${dayVal}</strong>. Elemento <span style="color: ${elementObj.color}; font-weight: 600;">${elementObj.name}</span> (${elementObj.focus}).<br>${bdayDbItem.desc}`;
  
  // Narrative Analysis
  const analysisBox = document.getElementById('num-analysis-box');
  const soulMsg = NUM_SOUL_DB[soulVal] || "";
  const personalityMsg = NUM_PERSONALITY_DB[personalityVal] || "";
  const destinyMsg = NUM_DESTINY_DB[destinyVal] || "";
  const potentialMsg = NUM_POTENTIAL_DB[potentialVal] || "";
  
  analysisBox.innerHTML = `
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>Tu Esencia Interior y Proyección Exterior:</strong><br>
      A nivel interno, tu alma resuena con la vibración <strong>${soulVal}</strong>, manifestando un <em>${soulMsg.charAt(0).toLowerCase() + soulMsg.slice(1)}</em>. 
      Sin embargo, la imagen exterior que proyectas hacia los demás está regida por la vibración <strong>${personalityVal}</strong>: <em>${personalityMsg.charAt(0).toLowerCase() + personalityMsg.slice(1)}</em>. 
      Esta combinación describe un puente dinámico entre tus motivaciones más secretas y la máscara con la que navegas la sociedad.
    </p>
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>Tu Sendero de Vida y Herramientas Natales:</strong><br>
      Tu misión evolutiva o Sendero de Vida está marcado por el número <strong>${destinyVal}</strong>. Los astros y los números indican que <em>${destinyMsg.charAt(0).toLowerCase() + destinyMsg.slice(1)}</em>. 
      Para recorrer este camino con éxito, tu día de nacimiento (<strong>${dayVal}</strong>) te otorga una serie de herramientas innatas: <em>${bdayDbItem.desc}</em>. Perteneces al elemento <strong>${elementObj.name}</strong>, lo que potencia tus inclinaciones hacia el área de <strong>${elementObj.focus}</strong>.
    </p>
    <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.95rem;">
      <strong>Tu Logro y Cosecha en la Madurez:</strong><br>
      Finalmente, tu Número Potencial de cierre es el <strong>${potentialVal}</strong>. Esta vibración guiará la segunda etapa de tu vida y tus años de plenitud, prometiendo que <em>${potentialMsg.charAt(0).toLowerCase() + potentialMsg.slice(1)}</em>.
    </p>
  `;
  
  // Karmic Study
  const karmicBox = document.getElementById('num-karmic-box');
  karmicBox.innerHTML = generateKarmicStudyHTML(nameAnalysis.letterCounts, nameAnalysis.totalLetters);
  
  // Toggle results wrappers
  document.getElementById('num-personal-results').classList.remove('hidden');
  document.getElementById('num-compat-results').classList.add('hidden');
  
  // Show Panel
  resultsPanel.classList.remove('hidden');
  
  if (readingTitle) readingTitle.textContent = "Tu Perfil Numerológico Kármico";
  if (readingDesc) readingDesc.textContent = `Análisis completado para: "${name}"`;
  
  resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function getElementalMatch(e1, e2) {
  const key = `${e1.name}-${e2.name}`;
  const reverseKey = `${e2.name}-${e1.name}`;
  
  if (e1.name === e2.name) {
    if (e1.name === "Agua") return { pct: 95, label: "Afinidad Perfecta", desc: "Vuestras emociones y sensibilidad fluyen en perfecta armonía intelectual y espiritual, compartiendo una profunda empatía." };
    if (e1.name === "Fuego") return { pct: 95, label: "Pasión Desbordante", desc: "Vuestra unión arde con intensidad creadora, ambición compartida y acción. Deben cuidar el control mutuo." };
    if (e1.name === "Aire") return { pct: 95, label: "Sintonía Intelectual", desc: "Compartís un espacio libre de comunicación, arte e ideas. Vuestro entendimiento verbal es inmediato y estimulante." };
  }
  if (key === "Fuego-Aire" || reverseKey === "Fuego-Aire") {
    return { pct: 90, label: "Inspiración Mutua", desc: "El Aire aviva y expande el Fuego de la acción, la pasión y los proyectos comunes. Es una relación sumamente dinámica y creativa." };
  }
  if (key === "Agua-Aire" || reverseKey === "Agua-Aire") {
    return { pct: 80, label: "Fluidez Armónica", desc: "El Aire mueve las Aguas de la sensibilidad profunda, impulsando vuestra intuición, arte y comprensión emocional compartida." };
  }
  if (key === "Agua-Fuego" || reverseKey === "Agua-Fuego") {
    return { pct: 50, label: "Tensión Alquímica", desc: "El Fuego puede evaporar el Agua o el Agua apagar la pasión del Fuego. Esta unión requiere paciencia, tacto y respeto consciente de vuestros ritmos." };
  }
  return { pct: 70, label: "Alquimia Templada", desc: "Vuestros elementos se complementan de manera templada, requiriendo comunicación constante para encontrar el equilibrio de fuerzas." };
}

function calculateRelationshipCompatibility() {
  const name1Input = document.getElementById('num-name-input-p1');
  const birth1Input = document.getElementById('num-birth-input-p1');
  const name2Input = document.getElementById('num-name-input-p2');
  const birth2Input = document.getElementById('num-birth-input-p2');
  
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!name1Input || !birth1Input || !name2Input || !birth2Input) return;
  
  const name1 = name1Input.value.trim();
  const birth1 = birth1Input.value;
  const name2 = name2Input.value.trim();
  const birth2 = birth2Input.value;
  
  if (!name1 || !birth1 || !name2 || !birth2) {
    alert("Por favor, introduce el nombre completo y la fecha de nacimiento de ambas personas para calcular su afinidad cósmica.");
    if (!name1) name1Input.focus();
    else if (!birth1) birth1Input.focus();
    else if (!name2) name2Input.focus();
    else birth2Input.focus();
    return;
  }
  
  // Analyze Person 1
  const na1 = analyzeNameNumerology(name1);
  if (na1.totalLetters === 0) {
    alert("Por favor, introduce un nombre válido para la Persona 1.");
    name1Input.focus();
    return;
  }
  const soul1 = reduceNumerology(na1.soulSum);
  const pers1 = reduceNumerology(na1.personalitySum);
  
  const dateParts1 = birth1.split('-');
  const day1 = parseInt(dateParts1[2], 10);
  let dsum1 = 0;
  for (let digit of birth1.replace(/[^0-9]/g, '')) {
    dsum1 += parseInt(digit, 10);
  }
  const dest1 = reduceNumerology(dsum1);
  
  // Analyze Person 2
  const na2 = analyzeNameNumerology(name2);
  if (na2.totalLetters === 0) {
    alert("Por favor, introduce un nombre válido para la Persona 2.");
    name2Input.focus();
    return;
  }
  const soul2 = reduceNumerology(na2.soulSum);
  const pers2 = reduceNumerology(na2.personalitySum);
  
  const dateParts2 = birth2.split('-');
  const day2 = parseInt(dateParts2[2], 10);
  let dsum2 = 0;
  for (let digit of birth2.replace(/[^0-9]/g, '')) {
    dsum2 += parseInt(digit, 10);
  }
  const dest2 = reduceNumerology(dsum2);
  
  // Relationship sum reductions
  const soulRelVal = reduceNumerology(soul1 + soul2);
  const persRelVal = reduceNumerology(pers1 + pers2);
  const destRelVal = reduceNumerology(dest1 + dest2);
  
  // Elemental Chemistry
  const elem1 = getBirthdayElement(day1);
  const elem2 = getBirthdayElement(day2);
  const elemMatch = getElementalMatch(elem1, elem2);
  
  // Calculate Global Compatibility Percentage
  let finalScore = elemMatch.pct;
  if (soul1 === soul2) finalScore += 10;
  if (dest1 === dest2) finalScore += 10;
  if (pers1 === pers2) finalScore += 5;
  
  const checkComplementary = (v1, v2) => {
    return (v1 === 1 && v2 === 2) || (v1 === 2 && v2 === 1) ||
           (v1 === 3 && v2 === 6) || (v1 === 6 && v2 === 3) ||
           (v1 === 4 && v2 === 8) || (v1 === 8 && v2 === 4);
  };
  if (checkComplementary(soul1, soul2)) finalScore += 5;
  if (checkComplementary(dest1, dest2)) finalScore += 5;
  
  finalScore = Math.max(40, Math.min(99, finalScore));
  
  // Render Values
  document.getElementById('num-compat-percent-val').textContent = `${finalScore}%`;
  document.getElementById('num-compat-title-val').textContent = elemMatch.label;
  document.getElementById('num-compat-summary-val').innerHTML = elemMatch.desc;
  
  document.getElementById('num-compat-soul-val').textContent = soulRelVal;
  document.getElementById('num-compat-soul-desc').innerHTML = NUM_REL_SOUL_DB[soulRelVal] || "Afinidad de sentimientos.";
  
  document.getElementById('num-compat-personality-val').textContent = persRelVal;
  document.getElementById('num-compat-personality-desc').innerHTML = NUM_REL_PERS_DB[persRelVal] || "Afinidad de comportamiento.";
  
  document.getElementById('num-compat-destiny-val').textContent = destRelVal;
  document.getElementById('num-compat-destiny-desc').innerHTML = NUM_REL_DEST_DB[destRelVal] || "Propósito y camino de vida conjunto.";
  
  document.getElementById('num-compat-alchemy-val').textContent = `${elem1.name} + ${elem2.name}`;
  document.getElementById('num-compat-alchemy-desc').innerHTML = `<strong>Alquimia elemental:</strong> Día natal ${day1} (${elem1.name}) y Día natal ${day2} (${elem2.name}).`;
  
  // Narrative Sinastría Box
  const soulRelMsg = NUM_REL_SOUL_DB[soulRelVal] || "";
  const persRelMsg = NUM_REL_PERS_DB[persRelVal] || "";
  const destRelMsg = NUM_REL_DEST_DB[destRelVal] || "";
  
  const analysisBox = document.getElementById('num-compat-analysis-box');
  analysisBox.innerHTML = `
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>El Vínculo Íntimo del Alma:</strong><br>
      Vuestra afinidad del alma suma el número de relación <strong>${soulRelVal}</strong>. Esto nos indica que en lo más profundo del corazón, vuestro vínculo emocional representa un: <em>${soulRelMsg.charAt(0).toLowerCase() + soulRelMsg.slice(1)}</em>. 
      Compartís vuestras alegrías y miedos desde una raíz íntima que define la esencia afectiva de la relación.
    </p>
    <p style="margin-bottom: 1.25rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>La Interacción y Trato en el Día a Día:</strong><br>
      A nivel exterior y social, la combinación de vuestras personalidades da el número <strong>${persRelVal}</strong>: <em>${persRelMsg.charAt(0).toLowerCase() + persRelMsg.slice(1)}</em>. 
      Esta vibración rige vuestro entendimiento cotidiano, vuestras salidas sociales y la máscara colectiva que presentáis ante vuestros amigos y familiares.
    </p>
    <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.95rem;">
      <strong>El Propósito y Misión de Pareja:</strong><br>
      Vuestro Destino Compartido como pareja vibra con la cifra <strong>${destRelVal}</strong>. Esto señala la misión de aprendizaje y crecimiento evolutivo de vuestro camino juntos: <em>${destRelMsg.charAt(0).toLowerCase() + destRelMsg.slice(1)}</em>.
    </p>
  `;
  
  // Advice Box
  const adviceBox = document.getElementById('num-compat-advice-box');
  let adviceText = "";
  if (finalScore >= 90) {
    adviceText = `Vuestra afinidad cósmica es excepcionalmente elevada (<strong>${finalScore}%</strong>). Gozáis de una sintonía natural muy fluida tanto en el plano emocional como en el práctico. El consejo del oráculo para vosotros es **nutrir el vínculo mediante la gratitud diaria** y no dar por sentado el gran entendimiento que tenéis. Apoyaros mutuamente para emprender proyectos compartidos, ya que la sinergia numérica multiplica vuestro éxito personal y espiritual.`;
  } else if (finalScore >= 75) {
    adviceText = `Tenéis una compatibilidad muy saludable y equilibrada (<strong>${finalScore}%</strong>). Compartís áreas clave de afinidad que os permiten comunicaros con facilidad y resolver contratiempos sin dañar el núcleo emocional. El consejo astral es **enfocarse en lo que os une en lugar de las pequeñas diferencias**. Practicad la escucha receptiva y fomentad momentos a solas para profundizar en vuestra intimidad, fortaleciendo el puente de vuestro Destino Compartido.`;
  } else {
    adviceText = `Vuestro vínculo presenta una compatibilidad del <strong>${finalScore}%</strong>, lo que indica un sendero de **gran aprendizaje y transmutación mutua**. Encontráis tensiones debido a vuestros diferentes ritmos emocionales y elementales (<strong>${elemMatch.label}</strong>). El consejo del oráculo es **hacer de la paciencia y la diplomacia vuestro templo común**. Recordad que los opuestos se atraen para pulir sus imperfecciones; vuestras diferencias no son barreras, sino oportunidades para crecer en madurez y tolerancia, aprendiendo a amar sin imponer vuestro propio ego.`;
  }
  adviceBox.innerHTML = `<p style="line-height: 1.6; font-size: 0.95rem;">${adviceText}</p>`;
  
  // Show Panel
  document.getElementById('num-personal-results').classList.add('hidden');
  document.getElementById('num-compat-results').classList.remove('hidden');
  resultsPanel.classList.remove('hidden');
  
  if (readingTitle) readingTitle.textContent = "Sinastría de Compatibilidad";
  if (readingDesc) readingDesc.textContent = `Afinidad calculada entre "${name1}" y "${name2}"`;
  
  resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function calculatePersonalYear() {
  const birthInput = document.getElementById('num-year-birth-input');
  const targetYearInput = document.getElementById('num-year-target-input');
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!birthInput || !targetYearInput || !resultsPanel) return;
  
  const birthDateVal = birthInput.value;
  const targetYearVal = parseInt(targetYearInput.value, 10);
  
  if (!birthDateVal || isNaN(targetYearVal)) {
    alert("Por favor, introduce tu fecha de nacimiento y un año válido para consultar.");
    return;
  }
  
  const birthDate = new Date(birthDateVal + "T00:00:00");
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1; // 1-indexed
  
  let daySum = day.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  let monthSum = month.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  let yearSum = targetYearVal.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  
  let totalSum = daySum + monthSum + yearSum;
  
  while (totalSum > 9) {
    totalSum = totalSum.toString().split('').reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  
  const personalYear = totalSum;
  
  const YEAR_DB = {
    1: {
      title: "Siembra e Inicios",
      subtitle: "Año 1: El Despertar del Sembrador",
      desc: "Este es un año para tomar la iniciativa, iniciar nuevos proyectos y plantar las semillas de lo que deseas construir durante los próximos 9 años. Te sentirás con gran originalidad, fuerza individual y deseos de libertad. El consejo de tu Grimorio es confiar en tu poder personal, evitar la indecisión y tomar las riendas de tu destino sin esperar la aprobación de otros."
    },
    2: {
      title: "Paciencia y Cooperación",
      subtitle: "Año 2: La Gestación en la Sombra",
      desc: "Un período para cultivar la paciencia, las alianzas y el detalle. Las semillas que plantaste el año pasado están echando raíces profundas bajo tierra. Es propicio para escuchar, colaborar, establecer relaciones afectivas o comerciales firmes y practicar la diplomacia. Tu consejo evolutivo es aprender a esperar el momento cósmico idóneo."
    },
    3: {
      title: "Autoexpresión y Florecimiento",
      subtitle: "Año 3: La Expansión Creadora",
      desc: "Año expansivo caracterizado por la alegría de vivir, la socialización, los viajes y la explosión de tu creatividad. Momento para escribir, pintar, expresarse y dejar volar tu imaginación. El consejo de tu Grimorio es cultivar tus talentos y no dispersar tu energía en múltiples focos que no puedas culminar."
    },
    4: {
      title: "Trabajo Firme y Estructura",
      subtitle: "Año 4: La Base del Templo",
      desc: "Un período de esfuerzo sostenido, disciplina, orden y consolidación profesional. Exige perseverancia y paciencia para construir cimientos sólidos. Excelente para compras inmobiliarias, firmas notariales y reorganizar tu rutina de salud física. El consejo astral es aceptar las reglas del esfuerzo concreto."
    },
    5: {
      title: "Cambio, Aventura y Libertad",
      subtitle: "Año 5: La Espiral del Viento",
      desc: "Un ciclo dinámico repleto de transformaciones repentinas, viajes imprevistos, adaptabilidad y magnetismo personal. Es ideal para liberarse de hábitos obsoletos, expandir tus horizontes y conocer personas inspiradoras. El consejo del oráculo es fluir con las sorpresas del camino sin caer en impulsos autodestructivos."
    },
    6: {
      title: "Responsabilidad y Amor familiar",
      subtitle: "Año 6: La Armonía del Hogar",
      desc: "Año consagrado a la familia, el amor, las relaciones estables y el bienestar comunitario. Tu responsabilidad se pondrá a prueba para mediar en conflictos familiares y brindar protección emocional. Buen momento para decorar tu espacio íntimo o casarse. El consejo evolutivo es actuar desde el amor incondicional."
    },
    7: {
      title: "Introspección y Sabiduría Espiritual",
      subtitle: "Año 7: El Templo Interior",
      desc: "Un año de retiro y descanso exterior para dar paso al estudio de temas profundos, la meditación y el autoanálisis. Sentirás deseos de silencio y soledad reparadora. El consejo de tu Grimorio es conectar con el espíritu, practicar meditación diaria y no forzar los negocios materiales."
    },
    8: {
      title: "Logro Material y Cosecha Kármica",
      subtitle: "Año 8: La Cosecha de la Tierra",
      desc: "El ciclo del éxito, el reconocimiento ejecutivo y la justicia material. Cosecharás lo sembrado en los años anteriores. Excelente para grandes finanzas, dirección de personal y ejercer tu autoridad. El consejo evolutivo es recordar que todo poder terrenal debe alinearse con la ética y el espíritu."
    },
    9: {
      title: "Cierre, Balance y Transmutación",
      subtitle: "Año 9: La Purificación del Alma",
      desc: "Año de culminación, balance y limpieza profunda. Es momento de dejar ir lo que no sirve (relaciones, trabajos, apegos) para preparar el terreno para un nuevo ciclo de 9 años. Se aconseja realizar obras benéficas, perdonar viejos rencores y cultivar el desapego material para transmutar tu karma."
    }
  };
  
  const yearData = YEAR_DB[personalYear];
  
  document.getElementById('num-year-title').innerHTML = `Año Personal ${personalYear} &mdash; <span class="gold">${yearData.title}</span>`;
  document.getElementById('num-year-subtitle').textContent = yearData.subtitle;
  document.getElementById('num-year-desc').innerHTML = yearData.desc;
  
  const forecastBox = document.getElementById('num-year-forecast-box');
  forecastBox.innerHTML = `
    <p style="margin-bottom: 1rem; line-height: 1.6; font-size: 0.95rem;">
      <strong>Vibración del año ${targetYearVal}:</strong><br>
      Al combinar tu día natal (${day}) y tu mes de nacimiento (${month}) con las vibraciones del año en curso (${targetYearVal}), tu ciclo vital se sitúa en la frecuencia <strong>${personalYear}</strong>. 
      Esta frecuencia es regida de forma kármica por las lecciones de <em>${yearData.title.toLowerCase()}</em>, indicando un puente de aprendizaje crucial.
    </p>
    <p style="margin-bottom: 0; line-height: 1.6; font-size: 0.95rem;">
      <strong>Consejo Evolutivo Específico:</strong><br>
      Durante los próximos meses, los astros te sugieren sintonizar con la vibración de <strong>${personalYear}</strong> mediante respiraciones pausadas. Evita iniciar el siguiente gran ciclo de proyectos si te encuentras en año 9, o no dudes en dar el gran salto inicial si estás en año 1. Cada ciclo cósmico tiene su tiempo de siembra, espera, florecimiento y transmutación.
    </p>
  `;
  
  renderYearTimeline(personalYear);
  
  document.getElementById('num-personal-results').classList.add('hidden');
  document.getElementById('num-compat-results').classList.add('hidden');
  document.getElementById('num-year-results').classList.remove('hidden');
  resultsPanel.classList.remove('hidden');
  
  if (readingTitle) readingTitle.textContent = "Tu Clima Numerológico del Ciclo de Vida";
  if (readingDesc) readingDesc.textContent = `Año consultado: ${targetYearVal} (Año Personal ${personalYear})`;
  
  resultsPanel.scrollIntoView({ behavior: 'smooth' });
}

function renderYearTimeline(activeYear) {
  const timeline = document.getElementById('year-timeline-display');
  if (!timeline) return;
  timeline.innerHTML = '';
  
  const track = document.createElement('div');
  track.className = 'timeline-track';
  timeline.appendChild(track);
  
  const labels = {
    1: "Siembra",
    2: "Espera",
    3: "Expansión",
    4: "Cimiento",
    5: "Cambio",
    6: "Armonía",
    7: "Sabiduría",
    8: "Poder",
    9: "Balance"
  };
  
  for (let i = 1; i <= 9; i++) {
    const node = document.createElement('div');
    node.className = `timeline-node${i === activeYear ? ' active' : ''}`;
    node.innerHTML = `
      <span class="node-number">${i}</span>
      <span class="node-label">${labels[i]}</span>
    `;
      timeline.appendChild(node);
  }
}

function calculateMirrorHour(selectedTime) {
  const timeInput = document.getElementById('num-mirror-time-input');
  const selectElem = document.getElementById('num-mirror-select');
  
  let time = selectedTime;
  if (!time) {
    time = (timeInput && timeInput.value) ? timeInput.value : '11:11';
  }
  
  if (typeof getMirrorHourData !== 'function') return;
  const data = getMirrorHourData(time);
  if (!data) return;
  
  // Sync input and select
  if (timeInput) timeInput.value = data.time;
  if (selectElem) {
    const opt = selectElem.querySelector(`option[value="${data.time}"]`);
    if (opt) selectElem.value = data.time;
  }
  
  // Sync active chip
  const chips = document.querySelectorAll('#num-mirror-form .mirror-chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-time') === data.time) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const resultsPanel = document.getElementById('num-results-panel');
  const personalResults = document.getElementById('num-personal-results');
  const compatResults = document.getElementById('num-compat-results');
  const yearResults = document.getElementById('num-year-results');
  const mirrorResults = document.getElementById('num-mirror-results');
  
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');

  if (personalResults) personalResults.classList.add('hidden');
  if (compatResults) compatResults.classList.add('hidden');
  if (yearResults) yearResults.classList.add('hidden');
  if (mirrorResults) mirrorResults.classList.remove('hidden');
  if (resultsPanel) resultsPanel.classList.remove('hidden');

  if (readingTitle) readingTitle.textContent = `Sincronicidad Revelada: ${data.time}`;
  if (readingDesc) readingDesc.textContent = "El cosmos y tus guías espirituales te transmiten el siguiente mensaje:";

  // Fill in content
  const typeBadge = document.getElementById('num-mirror-type-badge');
  const displayTime = document.getElementById('num-mirror-display-time');
  const displayTitle = document.getElementById('num-mirror-display-title');
  const displayAngel = document.getElementById('num-mirror-display-angel');
  const displaySpiritual = document.getElementById('num-mirror-display-spiritual');
  const angelDesc = document.getElementById('num-mirror-angel-desc');
  const numerologyDesc = document.getElementById('num-mirror-numerology-desc');
  const tarotName = document.getElementById('num-mirror-tarot-name');
  const tarotDesc = document.getElementById('num-mirror-tarot-desc');
  const adviceDesc = document.getElementById('num-mirror-advice-desc');
  const affirmationBox = document.getElementById('num-mirror-affirmation-box');

  let typeLabel = "HORA ESPEJO";
  if (data.type === 'master') typeLabel = "HORA MAESTRA";
  else if (data.type === 'sequential') typeLabel = "SECUENCIA CÓSMICA";
  else if (data.type === 'inverted') typeLabel = "HORA INVERTIDA";
  else if (data.type === 'triple') typeLabel = "HORA TRIPLE";
  else if (data.type === 'custom') typeLabel = "HORA SINCRÓNICA";

  if (typeBadge) typeBadge.textContent = typeLabel;
  if (displayTime) displayTime.textContent = data.time;
  if (displayTitle) displayTitle.textContent = data.title;
  if (displayAngel) displayAngel.textContent = `Ángel Custodio: ${data.angelName} (${data.angelMeaning})`;
  if (displaySpiritual) displaySpiritual.textContent = data.spiritualMessage;
  if (angelDesc) angelDesc.textContent = `${data.angelName} es el regente de esta sincronía. ${data.angelMeaning}`;
  if (numerologyDesc) numerologyDesc.textContent = data.numerology;
  if (tarotName) tarotName.textContent = data.tarotCard;
  if (tarotDesc) tarotDesc.textContent = data.tarotMeaning;
  if (adviceDesc) adviceDesc.textContent = data.advice;
  if (affirmationBox) affirmationBox.innerHTML = `"${data.affirmation}"`;

  renderMirrorHoursCatalog(data.time);
}

function renderMirrorHoursCatalog(activeTime) {
  const catalogGrid = document.getElementById('mirror-hours-catalog-grid');
  if (!catalogGrid || typeof MIRROR_HOURS_DB === 'undefined') return;

  catalogGrid.innerHTML = '';
  const times = Object.keys(MIRROR_HOURS_DB);

  times.forEach(t => {
    const item = MIRROR_HOURS_DB[t];
    let typeName = 'Espejo';
    let isSpecial = false;
    if (item.type === 'master') { typeName = 'Maestra'; isSpecial = true; }
    else if (item.type === 'sequential') { typeName = 'Secuencia'; isSpecial = true; }
    else if (item.type === 'inverted') { typeName = 'Invertida'; isSpecial = true; }
    else if (item.type === 'triple') { typeName = 'Triple'; isSpecial = true; }

    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `catalog-mirror-pill${t === activeTime ? ' active' : ''}${isSpecial ? ' secondary' : ''}`;
    pill.innerHTML = `
      <span class="pill-time">${t}</span>
      <span class="pill-type">${typeName}</span>
    `;
    pill.addEventListener('click', () => {
      calculateMirrorHour(t);
      const resultsMat = document.querySelector('.reading-table');
      if (resultsMat && window.innerWidth <= 768) {
        resultsMat.scrollIntoView({ behavior: 'smooth' });
      }
    });
    catalogGrid.appendChild(pill);
  });
}

function toggleNumerologyMode(mode) {
  const modeBtns = document.querySelectorAll('#numerology-tab-content .numerology-mode-toggle .mode-btn');
  const personalForm = document.getElementById('num-personal-form');
  const compatForm = document.getElementById('num-compat-form');
  const yearForm = document.getElementById('num-year-form');
  const mirrorForm = document.getElementById('num-mirror-form');
  
  const personalResults = document.getElementById('num-personal-results');
  const compatResults = document.getElementById('num-compat-results');
  const yearResults = document.getElementById('num-year-results');
  const mirrorResults = document.getElementById('num-mirror-results');
  const resultsPanel = document.getElementById('num-results-panel');
  const readingTitle = document.getElementById('num-reading-status-title');
  const readingDesc = document.getElementById('num-reading-status-desc');
  
  if (!personalForm || !compatForm || !yearForm) return;
  
  modeBtns.forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  personalForm.classList.add('hidden');
  compatForm.classList.add('hidden');
  yearForm.classList.add('hidden');
  if (mirrorForm) mirrorForm.classList.add('hidden');
  
  if (mode === 'personal') {
    personalForm.classList.remove('hidden');
  } else if (mode === 'compatibility') {
    compatForm.classList.remove('hidden');
  } else if (mode === 'year') {
    yearForm.classList.remove('hidden');
  } else if (mode === 'mirror') {
    if (mirrorForm) mirrorForm.classList.remove('hidden');
    calculateMirrorHour('11:11');
    return;
  }
  
  if (resultsPanel) resultsPanel.classList.add('hidden');
  if (personalResults) personalResults.classList.add('hidden');
  if (compatResults) compatResults.classList.add('hidden');
  if (yearResults) yearResults.classList.add('hidden');
  if (mirrorResults) mirrorResults.classList.add('hidden');
  
  if (readingTitle) readingTitle.textContent = "Descubre las vibraciones de tu destino...";
  if (readingDesc) readingDesc.textContent = "Introduce los datos en el panel lateral para iniciar el cálculo.";
}

function initNumerology() {
  const calculateBtn = document.getElementById('num-calculate-btn');
  const compatBtn = document.getElementById('num-compat-btn');
  const yearBtn = document.getElementById('num-year-btn');
  const mirrorBtn = document.getElementById('num-mirror-btn');
  const mirrorSelect = document.getElementById('num-mirror-select');
  const mirrorNowBtn = document.getElementById('num-mirror-now-btn');
  const mirrorChips = document.querySelectorAll('#num-mirror-form .mirror-chip');
  const mirrorTimeInput = document.getElementById('num-mirror-time-input');
  const resetBtn = document.getElementById('num-reset-btn');
  const nameInput = document.getElementById('num-name-input');
  
  // Mode toggle buttons
  const modeBtns = document.querySelectorAll('#numerology-tab-content .numerology-mode-toggle .mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleNumerologyMode(btn.getAttribute('data-mode'));
    });
  });
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateNumerologyProfile);
  }
  
  if (compatBtn) {
    compatBtn.addEventListener('click', calculateRelationshipCompatibility);
  }

  if (yearBtn) {
    yearBtn.addEventListener('click', calculatePersonalYear);
  }

  if (mirrorBtn) {
    mirrorBtn.addEventListener('click', () => {
      const val = mirrorTimeInput ? mirrorTimeInput.value : (mirrorSelect ? mirrorSelect.value : '11:11');
      calculateMirrorHour(val);
    });
  }

  if (mirrorSelect) {
    mirrorSelect.addEventListener('change', () => {
      calculateMirrorHour(mirrorSelect.value);
    });
  }

  if (mirrorNowBtn) {
    mirrorNowBtn.addEventListener('click', () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${hh}:${mm}`;
      if (mirrorTimeInput) mirrorTimeInput.value = currentTime;
      calculateMirrorHour(currentTime);
    });
  }

  mirrorChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const t = chip.getAttribute('data-time');
      calculateMirrorHour(t);
    });
  });
  
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Clear personal inputs
      if (nameInput) nameInput.value = '';
      const birthInput = document.getElementById('num-birth-input');
      if (birthInput) birthInput.value = '';
      
      // Clear compatibility inputs
      const nameP1 = document.getElementById('num-name-input-p1');
      const birthP1 = document.getElementById('num-birth-input-p1');
      const nameP2 = document.getElementById('num-name-input-p2');
      const birthP2 = document.getElementById('num-birth-input-p2');
      
      if (nameP1) nameP1.value = '';
      if (birthP1) birthP1.value = '';
      if (nameP2) nameP2.value = '';
      if (birthP2) birthP2.value = '';

      // Clear year inputs
      const birthYearInput = document.getElementById('num-year-birth-input');
      const targetYearInput = document.getElementById('num-year-target-input');
      if (birthYearInput) birthYearInput.value = '';
      if (targetYearInput) targetYearInput.value = '2026';

      // Clear mirror inputs
      if (mirrorTimeInput) mirrorTimeInput.value = '11:11';
      if (mirrorSelect) mirrorSelect.value = '11:11';
      
      const resultsPanel = document.getElementById('num-results-panel');
      if (resultsPanel) resultsPanel.classList.add('hidden');
      
      // Reset headers
      const activeBtn = document.querySelector('#numerology-tab-content .numerology-mode-toggle .mode-btn.active');
      const mode = activeBtn ? activeBtn.getAttribute('data-mode') : 'personal';
      toggleNumerologyMode(mode);
      
      const configPanel = document.querySelector('#numerology-tab-content .config-panel');
      if (configPanel) configPanel.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        calculateNumerologyProfile();
      }
    });
  }
}

/* ==========================================================================
   Tarot New Spreads Synthesis Logic
   ========================================================================== */

function getCategoryIntroText() {
  switch(selectedCategory) {
    case 'love': return 'la esfera sentimental y afectiva';
    case 'work': return 'tu panorama laboral, profesional o económico';
    case 'health': return 'tu bienestar físico, mental y energético';
    default: return 'los senderos generales de tu destino';
  }
}

function generateCelticSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Tú
  const c2 = currentSpread[1]; // Obstáculo
  const c3 = currentSpread[2]; // Corona
  const c4 = currentSpread[3]; // Base
  const c5 = currentSpread[4]; // Pasado
  const c6 = currentSpread[5]; // Futuro
  const c7 = currentSpread[6]; // Tu actitud
  const c8 = currentSpread[7]; // Entorno
  const c9 = currentSpread[8]; // Esperanzas/Miedos
  const c10 = currentSpread[9]; // Resultado

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);
  const d5 = getCardNarrativeDetails(c5);
  const d6 = getCardNarrativeDetails(c6);
  const d7 = getCardNarrativeDetails(c7);
  const d8 = getCardNarrativeDetails(c8);
  const d9 = getCardNarrativeDetails(c9);
  const d10 = getCardNarrativeDetails(c10);

  const categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>Nos adentramos en el sagrado mandala de la Cruz Celta para explorar en profundidad <strong>${categoryIntro}</strong> y tu pregunta: <em>"${question}"</em>. Diez arcanos tejen un relato continuo e integrado de tu alma.</p>
    <p><strong>Acto I — El Núcleo del Ahora:</strong> En el centro te encuentras tú, impregnado por la energía de <strong>${d1.name}</strong> (${d1.meaning}). Esta vibración se encuentra directamente cruzada por <strong>${d2.name}</strong>, señalando la prueba concreta que te desafía a madurar (${d2.meaning}).</p>
    <p><strong>Acto II — Eje de Raíces y Aspiraciones:</strong> Tu mente y tus <strong>metas más elevadas</strong> anhelan la luz de <strong>${d3.name}</strong> (${d3.meaning}), mientras que tus <strong>fundamentos profundos y subconscientes</strong> se afianzan en la sabiduría de <strong>${d4.name}</strong> (${d4.meaning}).</p>
    <p><strong>Acto III — La Corriente del Tiempo:</strong> Tu <strong>pasado reciente</strong> aún resuena con la lección de <strong>${d5.name}</strong> (${d5.meaning}), la cual impulsa de forma natural el <strong>futuro inminente</strong> que se abre paso con <strong>${d6.name}</strong> (${d6.meaning}).</p>
    <p><strong>Acto IV — Alquimia Interior y Entorno:</strong> Tu <strong>postura interna</strong> ante la vida está moldeada por <strong>${d7.name}</strong> (${d7.meaning}), mientras que las energías de tu <strong>entorno exterior</strong> responden a <strong>${d8.name}</strong> (${d8.meaning}). En lo más íntimo, tus <strong>esperanzas y temores</strong> laten con <strong>${d9.name}</strong> (${d9.meaning}).</p>
    <div style="background: rgba(229, 193, 88, 0.06); border-left: 3px solid var(--gold-color); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin-top: 1.5rem;">
      <p style="margin: 0; font-family: var(--font-serif); color: var(--gold-color); font-weight: 600; font-size: 0.95rem;">✦ Culminación y Destino Revelado:</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
        Todas estas corrientes confluyen armónicamente en el resultado final guiado por <em>${d10.name}</em>, recordándote que: ${d10.meaning} Acoge este mensaje y camina con la serenidad de quien se sabe guiado por las estrellas.
      </p>
    </div>
  `;
}

function generateMirrorSynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // Tu estado
  const c2 = currentSpread[1]; // Su estado
  const c3 = currentSpread[2]; // Tu proyección
  const c4 = currentSpread[3]; // Su proyección

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);

  const categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>El espejo místico del oráculo se abre ante tu pregunta sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>, revelando la danza invisible de energías que se refleja entre ambas almas.</p>
    <p>En tu <strong>mundo interior</strong> resuena con fuerza la vibración de <strong>${d1.name}</strong> (${d1.meaning}). Esta postura interna se encuentra de frente con el <strong>estado del alma de la otra persona</strong>, guiada por <strong>${d2.name}</strong> (${d2.meaning}).</p>
    <p>A partir de esta dinámica esencial nacen las proyecciones: lo que tú <strong>anhelas o proyectas</strong> sobre el vínculo viene teñido por <strong>${d3.name}</strong> (${d3.meaning}), mientras que lo que la otra persona <strong>proyecta o espera</strong> de ti vibra en la frecuencia de <strong>${d4.name}</strong> (${d4.meaning}).</p>
    <div style="background: rgba(139, 92, 246, 0.08); border-left: 3px solid var(--purple-color); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin-top: 1.5rem;">
      <p style="margin: 0; font-family: var(--font-serif); color: var(--gold-color); font-weight: 600; font-size: 0.95rem;">✦ Sabiduría del Espejo Relacional:</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
        Al comprender las verdaderas necesidades de <em>${d1.name}</em> e integrar la realidad de <em>${d2.name}</em>, disipas la niebla de las proyecciones marcadas por <em>${d3.name}</em> y <em>${d4.name}</em>. El amor auténtico florece en el espacio donde dos almas se ven con absoluta verdad.
      </p>
    </div>
  `;
}

function generateClaritySynthesis(question) {
  const textContainer = document.getElementById('destiny-synthesis-text');
  
  const c1 = currentSpread[0]; // El Bloqueo
  const c2 = currentSpread[1]; // La Fuerza Mágica
  const c3 = currentSpread[2]; // La Acción
  const c4 = currentSpread[3]; // La Revelación

  const d1 = getCardNarrativeDetails(c1);
  const d2 = getCardNarrativeDetails(c2);
  const d3 = getCardNarrativeDetails(c3);
  const d4 = getCardNarrativeDetails(c4);

  const categoryIntro = getCategoryIntroText();

  textContainer.innerHTML = `
    <p>El oráculo acoge tu búsqueda de luz y respuestas sobre <strong>${categoryIntro}</strong>: <em>"${question}"</em>. Cuatro arcanos abren una vía de transmutación para disipar la niebla y devolver la armonía a tu camino.</p>
    <p>Comenzamos por reconocer el <strong>bloqueo u sombra actual</strong> encarnado por <strong>${d1.name}</strong> (${d1.meaning}). Nombrar y comprender esta resistencia es el primer paso indispensable hacia tu liberación.</p>
    <p>Para disolver esta atadura, el cosmos despierta en ti una <strong>fuerza mágica e íntima</strong> a través de <strong>${d2.name}</strong> (${d2.meaning}). Este es el don interior en el que debes apoyarte sin dudar.</p>
    <p>La <strong>acción transformadora</strong> que te corresponde emprender hoy viene señalada por <strong>${d3.name}</strong> (${d3.meaning}). Un movimiento consciente desencadena la magia.</p>
    <div style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--success-color); padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin-top: 1.5rem;">
      <p style="margin: 0; font-family: var(--font-serif); color: var(--success-color); font-weight: 600; font-size: 0.95rem;">✦ La Revelación y Claridad Final:</p>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6; color: var(--text-main);">
        Al dar este paso con valentía, la niebla se disipa por completo revelando la luz de <em>${d4.name}</em>: ${d4.meaning} Acoge esta victoria interior y permite que la serenidad reine en tu ser.
      </p>
    </div>
  `;
}


// Initialize everything on page load
initTabNavigation();
setupModalEvents();
initHoroscope();
initNumerology();

/* ==========================================================================
   Pestaña Mística de La Luna (Influencia Lunar y Tránsitos)
   ========================================================================== */



function initLunarTab() {
  const moonWidget = document.getElementById('moon-phase-widget');
  if (moonWidget) {
    moonWidget.addEventListener('click', () => {
      const lunarTabBtn = document.querySelector('.nav-tab[data-tab="lunar"]');
      if (lunarTabBtn) {
        lunarTabBtn.click();
      }
    });
  }

  // Hemisphere buttons
  const northBtn = document.getElementById('lunar-hem-north');
  const southBtn = document.getElementById('lunar-hem-south');
  if (northBtn && southBtn) {
    northBtn.addEventListener('click', () => {
      northBtn.classList.add('active');
      southBtn.classList.remove('active');
      localStorage.setItem('lunar_hemisphere', 'north');
      renderLunarTabDetails();
      renderLunarCalendar();
      initMoonPhaseHeader();
    });
    southBtn.addEventListener('click', () => {
      southBtn.classList.add('active');
      northBtn.classList.remove('active');
      localStorage.setItem('lunar_hemisphere', 'south');
      renderLunarTabDetails();
      renderLunarCalendar();
      initMoonPhaseHeader();
    });
  }

  // Set active hemisphere on start
  const savedHem = localStorage.getItem('lunar_hemisphere') || 'north';
  if (savedHem === 'south' && southBtn) {
    southBtn.classList.add('active');
    if (northBtn) northBtn.classList.remove('active');
  } else if (northBtn) {
    northBtn.classList.add('active');
    if (southBtn) southBtn.classList.remove('active');
  }

  // Zodiac sign selector
  const signSelect = document.getElementById('lunar-user-sign-select');
  if (signSelect) {
    signSelect.addEventListener('change', () => {
      updateLunarTransitPersonalAdvice();
    });

    // Load saved sign
    const savedSign = localStorage.getItem('user_zodiac_sign');
    if (savedSign) {
      signSelect.value = savedSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  }

  // Astral date query picker
  const searchDateInput = document.getElementById('lunar-search-date');
  const searchDateBtn = document.getElementById('lunar-search-date-btn');
  if (searchDateInput && searchDateBtn) {
    const todayStr = new Date().toLocaleDateString('sv'); // YYYY-MM-DD
    searchDateInput.value = todayStr;
    
    searchDateBtn.addEventListener('click', () => {
      const val = searchDateInput.value;
      if (!val) return;
      
      const [year, month, day] = val.split('-').map(Number);
      selectedLunarDate = new Date(year, month - 1, day);
      
      // Update calendar navigation to that month and year
      lunarCalendarMonth = selectedLunarDate.getMonth();
      lunarCalendarYear = selectedLunarDate.getFullYear();
      
      renderLunarCalendar();
      renderLunarTabDetails(selectedLunarDate);
      
      // Update selected date indicators
      const indicator = document.getElementById('lunar-selected-date-indicator');
      const textEl = document.getElementById('lunar-selected-date-text');
      const titleEl = document.getElementById('lunar-clima-title');
      
      const today = new Date();
      const isToday = selectedLunarDate.getDate() === today.getDate() && 
                      selectedLunarDate.getMonth() === today.getMonth() && 
                      selectedLunarDate.getFullYear() === today.getFullYear();
                      
      if (indicator && textEl && titleEl) {
        if (isToday) {
          indicator.classList.add('hidden');
          titleEl.textContent = "La Influencia Lumínica de Hoy";
        } else {
          indicator.classList.remove('hidden');
          const dayFormatted = day.toString().padStart(2, '0');
          const monthFormatted = month.toString().padStart(2, '0');
          textEl.textContent = `Viendo: ${dayFormatted}/${monthFormatted}/${year}`;
          titleEl.textContent = "La Influencia Lumínica Elegida";
        }
      }
    });
  }

  // --- Lógica del modal interactivo de detalles de fases lunares ---
  const lunarModal = document.getElementById('lunar-modal');
  const lunarModalClose = document.getElementById('lunar-modal-close');
  const lunarModalBackdrop = document.getElementById('lunar-modal-backdrop');
  const lunarCards = document.querySelectorAll('.lunar-image-card');
  
  const lunarPhasesData = {
    full: {
      title: "Luna Llena",
      subtitle: "Fase de Plenitud, Revelación e Intuición Máxima",
      image: "assets/luna_llena.webp",
      influence: "La Luna Llena es el momento en que la energía cósmica alcanza su cúspide. Simboliza la culminación de proyectos, la iluminación de lo que estaba oculto en el subconsciente y el punto de mayor sensibilidad psíquica. Durante esta fase, las emociones pueden ser intensas y las percepciones extrasensoriales están muy potenciadas. Es una temporada ideal para la autoexpresión, la manifestación de deseos y la celebración de los logros.",
      ritual: "<strong>Ritual de Carga y Manifestación:</strong> Escribe en un papel las metas que has alcanzado y agradece al universo. Para manifestar, coloca tus cristales y un vaso con agua purificada bajo la luz directa de la luna llena toda la noche. Al día siguiente, bebe el agua cargada con la energía lunar para impregnar tu cuerpo físico y astral de vitalidad, claridad y protección espiritual.",
      tarot: "<strong>Consagración y Limpieza del Mazo:</strong> Es la fase perfecta para limpiar y cargar tu mazo de cartas de Tarot. Expón el mazo directamente a los rayos de la luna llena sobre el alféizar de una ventana. Su luz purificará cualquier energía residual acumulada y sintonizará tus lecturas con tu vibración espiritual más alta."
    },
    crescent: {
      title: "Luna Creciente",
      subtitle: "Fase de Intención, Siembra y Acción Inicial",
      image: "assets/luna_creciente.webp",
      influence: "La Luna Creciente marca el inicio del crecimiento de la luz. Representa el impulso para actuar, la siembra de nuevas intenciones y la recolección de ideas innovadoras. La energía cósmica nos empuja hacia adelante, inspirándonos a superar la inercia y a dar los primeros pasos con valentía. Es una fase de creatividad, planificación estructurada y enfoque mental en tus deseos.",
      ritual: "<strong>Ritual de Intenciones del Sembrador:</strong> Enciende una vela verde o dorada. Escribe en tu diario de destino 3 objetivos claros que quieras hacer crecer en las próximas semanas. Visualízate lográndolos mientras sostienes un cuarzo transparente en tus manos. Conserva el papel debajo de tu almohada o en un lugar secreto.",
      tarot: "<strong>Activación del Mazo:</strong> Realiza lecturas enfocadas en proyectos que inician. Para cargar tus cartas con esta vibración, baraja el mazo con suavidad y visualiza una luz dorada que emana de tus manos, infundiendo al Tarot la energía del crecimiento y el dinamismo."
    },
    new: {
      title: "Luna Nueva",
      subtitle: "Fase de Introspección, Renacimiento y Vacío Místico",
      image: "assets/luna_nueva.webp",
      influence: "La Luna Nueva es el momento de total oscuridad en el cielo. Representa el punto cero, el útero cósmico donde todo nace y donde todo descansa. Es el ciclo ideal para replegarse, mirar hacia el interior (introspección), meditar en el silencio y soltar apegos. La energía de hoy nos invita a purificar la mente y el espíritu, limpiando el terreno para el ciclo que comienza.",
      ritual: "<strong>Ritual de Vacío y Purificación:</strong> Enciende un incienso de sándalo o copal. Escribe en un papel aquello que te limita o te causa ansiedad. Quema el papel de forma segura en un cuenco resistente al fuego, entregando tus miedos al fuego sagrado para transmutarlos en sabiduría. Medita 10 minutos en silencio absoluto.",
      tarot: "<strong>Limpieza y Descanso:</strong> Se aconseja dar un respiro a tus lecturas profundas o realizar tiradas terapéuticas de autoconocimiento. Envuelve tu mazo de Tarot en un paño de seda violeta o negra y colócalo junto a una piedra de obsidiana o turmalina negra para absorber y neutralizar las vibraciones densas."
    },
    quarter: {
      title: "Cuarto Creciente",
      subtitle: "Fase de Decisión, Superación y Fuerza de Voluntad",
      image: "assets/luna_cuarto.webp",
      influence: "El Cuarto Creciente representa el equilibrio perfecto de luz y sombra (media luna). En este punto, el universo te reta a superar los primeros obstáculos que surgen tras sembrar tus metas en la Luna Nueva. Es una fase que exige tomar decisiones firmes, templar el carácter y demostrar resistencia mental y disciplina. La energía cósmica es de lucha constructiva y autoafirmación.",
      ritual: "<strong>Ritual de Fuerza y Enfoque:</strong> Coloca tres velas amarillas en forma de triángulo. Escribe en una tarjeta tus mayores desafíos actuales. Sostén un cuarzo ahumado o citrino en tu mano dominante, respira hondo y repite tres veces: 'Soy fuerte, soy constante, ningún obstáculo desvía mi camino'. Guarda la tarjeta en tu billetera como recordatorio visual.",
      tarot: "<strong>Tiradas de Bloqueos:</strong> Es el momento ideal para realizar la tirada 'Hechizo de Claridad' o 'La Cruz Celta', enfocando las preguntas en destrabar dificultades. Limpia el mazo pasándolo a través del humo de un sahumerio de romero o ruda."
    },
    waning: {
      title: "Luna Menguante",
      subtitle: "Fase de Cierre, Liberación, Desapego y Destierro",
      image: "assets/luna_menguante_v2.webp",
      influence: "La Luna Menguante marca el declive paulatino de la luz. Es el momento cósmico para soltar, liberar lo que ya no sirve, perdonar, sanar viejas heridas y cerrar ciclos afectivos o laborales. La energía te invita a la limpieza profunda de tu entorno físico y de tus cuerpos sutiles, eliminando la toxicidad y el cansancio acumulado para descansar de verdad.",
      ritual: "<strong>Ritual de Destierro y Despojo:</strong> Limpia tu hogar barriendo desde el interior hacia la puerta de salida mientras visualizas que expulsas las energías estancadas. Toma un baño purificador con sal marina y unas gotas de aceite de lavanda o eucalipto, decretando que el agua arrastra y disuelve todo dolor y fatiga.",
      tarot: "<strong>Purificación Profunda del Mazo:</strong> Coloca tus cartas sobre una superficie plana y pon una piedra de sal de roca o selenita encima del mazo durante 24 horas. Esto descargará por completo la energía impregnada por consultas anteriores, dejándolo neutralizado y en paz."
    }
  };

  if (lunarModal && lunarModalClose && lunarModalBackdrop) {
    // Abrir modal al hacer clic en las tarjetas de la galería
    lunarCards.forEach(card => {
      card.addEventListener('click', () => {
        const phaseKey = card.getAttribute('data-phase');
        const data = lunarPhasesData[phaseKey];
        if (data) {
          document.getElementById('lunar-modal-img').src = data.image;
          document.getElementById('lunar-modal-img').alt = data.title;
          document.getElementById('lunar-modal-title').textContent = data.title;
          document.getElementById('lunar-modal-subtitle').textContent = data.subtitle;
          document.getElementById('lunar-modal-influence').innerHTML = data.influence;
          document.getElementById('lunar-modal-ritual').innerHTML = data.ritual;
          document.getElementById('lunar-modal-tarot').innerHTML = data.tarot;
          
          lunarModal.classList.remove('hidden');
          lunarModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
        }
      });
    });

    // Cerrar modal
    const closeModal = () => {
      lunarModal.classList.add('hidden');
      lunarModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    lunarModalClose.addEventListener('click', closeModal);
    lunarModalBackdrop.addEventListener('click', closeModal);
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lunarModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // Inicializar Calendario Lunar
  initLunarCalendar();
}

function renderLunarTabDetails(date = selectedLunarDate) {
  const moonPhase = getMoonPhaseDetails(date);
  const moonSign = getMoonSign(date);
  const savedHem = localStorage.getItem('lunar_hemisphere') || 'north';
  const eclipse = getEclipseForDate(date);

  // Calculate age and illumination percentage
  const age = (moonPhase.phase * 29.53059).toFixed(1);
  const illumination = Math.round((moonPhase.phase <= 0.5 ? moonPhase.phase * 2 : (1 - moonPhase.phase) * 2) * 100);

  // Invert icons for southern hemisphere if growing/shrinking
  let icon = moonPhase.icon;
  if (savedHem === 'south') {
    if (icon === '🌒') icon = '🌘';
    else if (icon === '🌓') icon = '🌗';
    else if (icon === '🌔') icon = '🌖';
    else if (icon === '🌖') icon = '🌔';
    else if (icon === '🌗') icon = '🌓';
    else if (icon === '🌘') icon = '🌒';
  }

  // Render eclipse banner if today or selected date is an eclipse
  const eclipseBanner = document.getElementById('lunar-eclipse-banner');
  if (eclipseBanner) {
    if (eclipse) {
      eclipseBanner.classList.remove('hidden');
      const isSolar = eclipse.type === 'solar';
      eclipseBanner.innerHTML = `
        <div class="eclipse-card-badge ${isSolar ? 'solar' : 'lunar'}">
          <span>${isSolar ? '☀️ PORTAL DE ECLIPSE SOLAR' : '🩸 PORTAL DE ECLIPSE LUNAR'} (${eclipse.category.toUpperCase()})</span>
        </div>
        <h4 class="eclipse-card-title">${eclipse.name} en ${eclipse.sign} ${eclipse.symbol}</h4>
        <p class="eclipse-card-desc">${eclipse.desc}</p>
        <div class="eclipse-card-advice">
          <strong>🔮 Consejo Místico del Portal:</strong> Los eclipses operan como potentes aceleradores del destino y catalizadores de transformación kármica. Durante estas 48 horas no se aconseja forzar acuerdos ni cargar mazos/cristales a la intemperie; dedica este influjo a la introspección profunda, el desapego y la elevación de conciencia.
        </div>
      `;
    } else {
      eclipseBanner.classList.add('hidden');
      eclipseBanner.innerHTML = '';
    }
  }

  // Render text content
  const emojiEl = document.getElementById('lunar-tab-emoji');
  const phaseNameEl = document.getElementById('lunar-tab-phase-name');
  const illuminationEl = document.getElementById('lunar-tab-illumination');
  const ageEl = document.getElementById('lunar-tab-age');
  const transitEl = document.getElementById('lunar-tab-transit');
  const angelEl = document.getElementById('lunar-tab-angel');
  const descEl = document.getElementById('lunar-tab-phase-desc');
  const ritualEl = document.getElementById('lunar-tab-ritual');
  const careEl = document.getElementById('lunar-tab-tarot-care');

  if (emojiEl) emojiEl.innerHTML = getMoonSvg(moonPhase.phase, savedHem);
  if (phaseNameEl) phaseNameEl.textContent = moonPhase.phaseName;
  if (illuminationEl) illuminationEl.textContent = `${illumination}%`;
  if (ageEl) ageEl.textContent = `${age} días`;
  if (transitEl) transitEl.textContent = `Luna en ${moonSign}`;
  if (angelEl) {
    const sanitizedSign = getSanitizedSignKey(moonSign);
    angelEl.textContent = ZODIAC_INFO[sanitizedSign] ? ZODIAC_INFO[sanitizedSign].angel : "Gabriel";
  }
  
  if (descEl) {
    let rawDesc = moonPhase.description;
    if (savedHem === 'south' && moonPhase.phaseName !== 'Luna Nueva' && moonPhase.phaseName !== 'Luna Llena') {
      rawDesc += ` <br><br><em>Nota del Hemisferio Sur:</em> Al encontrarte en el hemisferio sur, la apariencia visual de la iluminación está invertida y se desplaza de izquierda a derecha.`;
    }
    descEl.innerHTML = rawDesc;
  }

  // Render rituals and care
  if (ritualEl) {
    ritualEl.innerHTML = LUNAR_RITUALS[moonPhase.phaseName] || "Fase de recarga y meditación.";
  }
  if (careEl) {
    careEl.innerHTML = LUNAR_TAROT_CARE[moonPhase.phaseName] || "Mantén tu mazo protegido.";
  }

  updateLunarTransitPersonalAdvice(date);
}

function updateLunarTransitPersonalAdvice(date = selectedLunarDate) {
  const moonSign = getMoonSign(date);
  const signSelect = document.getElementById('lunar-user-sign-select');
  const adviceBox = document.getElementById('lunar-transit-personal-box');
  
  if (!signSelect || !adviceBox) return;
  
  const userSign = signSelect.value;
  if (!userSign) {
    adviceBox.innerHTML = "Selecciona tu signo zodiacal para recibir tu consejo.";
    return;
  }

  const cleanUserSign = userSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cleanMoonSign = moonSign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const userIdx = ZODIAC_SIGNS_LIST.indexOf(cleanUserSign);
  const moonIdx = ZODIAC_SIGNS_LIST.indexOf(cleanMoonSign);

  if (userIdx === -1 || moonIdx === -1) {
    adviceBox.innerHTML = "No se pudo calcular la sintonía astrológica hoy.";
    return;
  }

  const diff = (userIdx - moonIdx + 12) % 12;
  let aspectTitle = "";
  let aspectDesc = "";

  const isToday = new Date().toDateString() === date.toDateString();
  const aspectComplement = isToday ? "hoy" : "este día";

  if (diff === 0) {
    aspectTitle = "Conjunción (Mismo Signo)";
    aspectDesc = `La Luna transita ${aspectComplement} por tu propio signo natal. Es un día de alta sensibilidad emocional y gran lucidez interna. Tus deseos íntimos y tu mente consciente están en perfecta armonía. Excelente momento para escucharte a ti mismo y meditar.`;
  } else if (diff === 4 || diff === 8) {
    aspectTitle = "Trígono (Armonía Elemental)";
    aspectDesc = `La Luna transita por un signo de tu mismo elemento. Las emociones fluyen de manera natural y sin resistencia. Sentirás paz, optimismo y gran facilidad para expresarte. Es un período idóneo para la creatividad, la lectura del tarot y proyectos artísticos.`;
  } else if (diff === 2 || diff === 10) {
    aspectTitle = "Sextil (Sintonía Amigable)";
    aspectDesc = `La Luna se encuentra en un signo compatible y afín con tu elemento. Se estimula la comunicación afectiva y el entendimiento con los demás. Las oportunidades prácticas surgen ${aspectComplement} a través de conversaciones sinceras y encuentros con personas queridas.`;
  } else if (diff === 6) {
    aspectTitle = "Oposición (Tensión Polar)";
    aspectDesc = `La Luna está ${aspectComplement} en tu signo opuesto complementario. Tus sentimientos íntimos y tus deseos del ego externo pueden entrar en contradicción o verse reflejados con gran intensidad en los demás. Busca la conciliación, respira hondo y evita discusiones precipitadas.`;
  } else if (diff === 3 || diff === 9) {
    aspectTitle = "Cuadratura (Desafío Dinámico)";
    aspectDesc = `La Luna se sitúa en un signo que genera tensión con tu naturaleza cardinal. Puedes sentir impaciencia, bloqueos emocionales o incomodidad con las exigencias del entorno. El oráculo te aconseja ser flexible, descansar más y no tomarte las tensiones de forma personal ${aspectComplement}.`;
  } else {
    aspectTitle = "Ajuste y Reorganización (Inconjunción)";
    aspectDesc = `La Luna transita por un signo disonante o neutro con tu energía. Podrías percibir una ligera incomodidad emocional o cansancio físico inexplicable. Es un día ideal para ir despacio, reorganizar tus prioridades y no sobrecargarte de responsabilidades o dramas ajenos.`;
  }

  adviceBox.innerHTML = `
    <strong>Sintonía Lunar: ${aspectTitle}</strong><br>
    <p style="margin-top: 0.5rem; font-size: 0.95rem; line-height: 1.5; color: var(--text-main);">${aspectDesc}</p>
  `;
}

function initLunarCalendar() {
  const grid = document.getElementById('lunar-calendar-grid');
  const monthYearEl = document.getElementById('lunar-cal-month-year');
  const prevBtn = document.getElementById('lunar-cal-prev');
  const nextBtn = document.getElementById('lunar-cal-next');
  const todayBtn = document.getElementById('lunar-cal-today');
  
  if (!grid || !monthYearEl || !prevBtn || !nextBtn) return;
  
  if (!grid.dataset.initialized) {
    grid.dataset.initialized = 'true';
    
    prevBtn.addEventListener('click', () => {
      lunarCalendarMonth--;
      if (lunarCalendarMonth < 0) {
        lunarCalendarMonth = 11;
        lunarCalendarYear--;
      }
      renderLunarCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
      lunarCalendarMonth++;
      if (lunarCalendarMonth > 11) {
        lunarCalendarMonth = 0;
        lunarCalendarYear++;
      }
      renderLunarCalendar();
    });

    if (todayBtn) {
      todayBtn.addEventListener('click', () => {
        const now = new Date();
        lunarCalendarMonth = now.getMonth();
        lunarCalendarYear = now.getFullYear();
        selectedLunarDate = now;
        renderLunarCalendar();
        renderLunarTabDetails(now);
      });
    }
    
    const backToTodayBtn = document.getElementById('lunar-back-to-today-btn');
    if (backToTodayBtn) {
      backToTodayBtn.addEventListener('click', () => {
        selectedLunarDate = new Date();
        lunarCalendarMonth = selectedLunarDate.getMonth();
        lunarCalendarYear = selectedLunarDate.getFullYear();
        
        // Reset input value to today
        const searchDateInput = document.getElementById('lunar-search-date');
        if (searchDateInput) {
          searchDateInput.value = selectedLunarDate.toLocaleDateString('sv');
        }
        
        renderLunarCalendar();
        renderLunarTabDetails(selectedLunarDate);
        
        const indicator = document.getElementById('lunar-selected-date-indicator');
        if (indicator) indicator.classList.add('hidden');
        
        const titleEl = document.getElementById('lunar-clima-title');
        if (titleEl) titleEl.textContent = "La Influencia Lumínica de Hoy";
      });
    }

    renderUpcomingEclipseChips();
  }
  
  renderLunarCalendar();
}

function renderUpcomingEclipseChips(year = lunarCalendarYear) {
  const container = document.getElementById('eclipse-quick-chips');
  const titleEl = document.getElementById('eclipse-chips-title');
  if (!container) return;
  
  const currentYear = year || lunarCalendarYear || new Date().getFullYear();
  
  // Filter eclipses for the active year in calendar
  let eclipses = ASTRONOMICAL_ECLIPSES.filter(e => e.date.startsWith(`${currentYear}-`));
  
  if (titleEl) {
    titleEl.textContent = `Portales de Eclipse de ${currentYear}`;
  }
  
  // If no eclipses for this specific year (e.g. browsing far into past/future), fallback to upcoming
  if (eclipses.length === 0) {
    if (titleEl) titleEl.textContent = `Próximos Portales de Eclipse`;
    const todayStr = new Date().toLocaleDateString('sv');
    eclipses = ASTRONOMICAL_ECLIPSES.filter(e => e.date >= todayStr).slice(0, 4);
    if (eclipses.length === 0) {
      eclipses = ASTRONOMICAL_ECLIPSES.slice(-4);
    }
  }

  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  container.innerHTML = eclipses.map(e => {
    const [y, m, d] = e.date.split('-');
    const shortDate = `${parseInt(d)} ${monthNames[parseInt(m) - 1]} ${y}`;
    const isSolar = e.type === 'solar';
    const isCurrentMonth = parseInt(m) === (lunarCalendarMonth + 1) && parseInt(y) === lunarCalendarYear;
    const activeStyle = isCurrentMonth ? 'border-color: var(--gold-color); background: rgba(229, 193, 88, 0.18); font-weight: 700;' : '';
    return `
      <button type="button" class="eclipse-chip ${isSolar ? 'solar-chip' : 'lunar-chip'}" data-eclipse-date="${e.date}" style="${activeStyle}" title="${e.name} en ${e.sign} (${e.category}): ${e.desc}">
        <span>${isSolar ? '☀️' : '🩸'}</span>
        <strong>${shortDate}</strong> • ${e.name.replace('Eclipse ', '')} (${e.sign})
      </button>
    `;
  }).join('');

  container.querySelectorAll('.eclipse-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const dateStr = btn.getAttribute('data-eclipse-date');
      if (!dateStr) return;
      const [yearNum, monthNum, dayNum] = dateStr.split('-').map(Number);
      const targetDate = new Date(yearNum, monthNum - 1, dayNum, 12, 0, 0);
      
      lunarCalendarMonth = targetDate.getMonth();
      lunarCalendarYear = targetDate.getFullYear();
      selectedLunarDate = targetDate;
      
      renderLunarCalendar();
      renderLunarTabDetails(selectedLunarDate);
      
      // Update input and indicator
      const searchDateInput = document.getElementById('lunar-search-date');
      if (searchDateInput) searchDateInput.value = dateStr;
      
      const indicator = document.getElementById('lunar-selected-date-indicator');
      const textEl = document.getElementById('lunar-selected-date-text');
      const titleMainEl = document.getElementById('lunar-clima-title');
      if (indicator && textEl && titleMainEl) {
        indicator.classList.remove('hidden');
        textEl.textContent = `Viendo: ${dayNum.toString().padStart(2, '0')}/${monthNum.toString().padStart(2, '0')}/${yearNum}`;
        titleMainEl.textContent = "La Influencia Lumínica Elegida";
      }

      // Smooth scroll to eclipse banner or climate
      const banner = document.getElementById('lunar-eclipse-banner');
      if (banner) banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

function renderLunarCalendar() {
  const grid = document.getElementById('lunar-calendar-grid');
  const monthYearEl = document.getElementById('lunar-cal-month-year');
  if (!grid || !monthYearEl) return;
  
  renderUpcomingEclipseChips(lunarCalendarYear);
  
  grid.innerHTML = '';
  
  const MONTHS_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthYearEl.textContent = `${MONTHS_NAMES[lunarCalendarMonth]} ${lunarCalendarYear}`;
  
  const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  WEEKDAYS.forEach(day => {
    const div = document.createElement('div');
    div.className = 'lunar-cal-header';
    div.textContent = day;
    grid.appendChild(div);
  });
  
  const firstDay = new Date(lunarCalendarYear, lunarCalendarMonth, 1).getDay();
  const startOffset = (firstDay + 6) % 7; 
  
  const daysInMonth = new Date(lunarCalendarYear, lunarCalendarMonth + 1, 0).getDate();
  
  for (let i = 0; i < startOffset; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'lunar-cal-day empty';
    grid.appendChild(emptyDiv);
  }
  
  const today = new Date();
  const savedHem = localStorage.getItem('lunar_hemisphere') || 'north';

  const ZODIAC_SHORT_SYMBOLS = {
    "Aries": "♈",
    "Tauro": "♉",
    "Géminis": "♊",
    "Cáncer": "♋",
    "Leo": "♌",
    "Virgo": "♍",
    "Libra": "♎",
    "Escorpio": "♏",
    "Sagitario": "♐",
    "Capricornio": "♑",
    "Acuario": "♒",
    "Piscis": "♓"
  };
  
  for (let d = 1; d <= daysInMonth; d++) {
    const dateOfCell = new Date(lunarCalendarYear, lunarCalendarMonth, d);
    const moonPhase = getMoonPhaseDetails(dateOfCell);
    const moonSign = getMoonSign(dateOfCell);
    const zodiacSymbol = ZODIAC_SHORT_SYMBOLS[moonSign] || "✦";
    const illumination = Math.round((moonPhase.phase <= 0.5 ? moonPhase.phase * 2 : (1 - moonPhase.phase) * 2) * 100);
    const eclipse = getEclipseForDate(dateOfCell);
    
    const div = document.createElement('div');
    div.className = 'lunar-cal-day';
    
    const isToday = dateOfCell.getDate() === today.getDate() && 
                    dateOfCell.getMonth() === today.getMonth() && 
                    dateOfCell.getFullYear() === today.getFullYear();
                    
    const isSelected = dateOfCell.getDate() === selectedLunarDate.getDate() && 
                       dateOfCell.getMonth() === selectedLunarDate.getMonth() && 
                       dateOfCell.getFullYear() === selectedLunarDate.getFullYear();
                       
    if (isToday) div.classList.add('today');
    if (isSelected) div.classList.add('selected-day');

    let majorPhaseBadge = '';
    if (eclipse) {
      div.classList.add(eclipse.type === 'solar' ? 'eclipse-solar' : 'eclipse-lunar');
      majorPhaseBadge = `<span class="lunar-major-phase-badge ${eclipse.type === 'solar' ? 'badge-solar-eclipse' : 'badge-lunar-eclipse'}" title="${eclipse.name}">⚡ ${eclipse.type === 'solar' ? 'Solar' : 'Lunar'}</span>`;
    } else if (moonPhase.phase < 0.02 || moonPhase.phase >= 0.98) {
      majorPhaseBadge = '<span class="lunar-major-phase-badge" title="Luna Nueva">Nueva</span>';
    } else if (moonPhase.phase >= 0.235 && moonPhase.phase <= 0.265) {
      majorPhaseBadge = '<span class="lunar-major-phase-badge" title="Cuarto Creciente">Cuarto</span>';
    } else if (moonPhase.phase >= 0.485 && moonPhase.phase <= 0.515) {
      majorPhaseBadge = '<span class="lunar-major-phase-badge" title="Luna Llena">Llena</span>';
    } else if (moonPhase.phase >= 0.735 && moonPhase.phase <= 0.765) {
      majorPhaseBadge = '<span class="lunar-major-phase-badge" title="Cuarto Menguante">Meng.</span>';
    }
    
    div.innerHTML = `
      ${majorPhaseBadge}
      <div class="lunar-cal-day-top">
        <span class="lunar-cal-day-num">${d}</span>
        <span class="lunar-cal-zodiac" title="Tránsito: Luna en ${moonSign}">${zodiacSymbol} ${moonSign.substring(0, 3)}</span>
      </div>
      <div class="lunar-cal-day-moon">
        ${getMoonSvg(moonPhase.phase, savedHem)}
      </div>
      <div class="lunar-cal-day-bottom">
        <span class="lunar-cal-illumination" title="Iluminación: ${illumination}%">${illumination}%</span>
      </div>
    `;

    if (eclipse) {
      div.title = `⚡ ¡DÍA DE ECLIPSE! • ${eclipse.name} en ${eclipse.sign} (${eclipse.category}) • ${d} de ${MONTHS_NAMES[lunarCalendarMonth]} de ${lunarCalendarYear} • Clic para ver influencia y consejos`;
    } else {
      div.title = `${d} de ${MONTHS_NAMES[lunarCalendarMonth]} de ${lunarCalendarYear} • ${moonPhase.phaseName} en ${moonSign} (${illumination}% luz) • Clic para ver influencias`;
    }
    
    div.addEventListener('click', () => {
      selectedLunarDate = dateOfCell;
      
      const selectedPrev = grid.querySelector('.lunar-cal-day.selected-day');
      if (selectedPrev) selectedPrev.classList.remove('selected-day');
      div.classList.add('selected-day');
      
      renderLunarTabDetails(selectedLunarDate);
      
      const indicator = document.getElementById('lunar-selected-date-indicator');
      const textEl = document.getElementById('lunar-selected-date-text');
      const titleEl = document.getElementById('lunar-clima-title');
      
      if (indicator && textEl && titleEl) {
        if (isToday) {
          indicator.classList.add('hidden');
          titleEl.textContent = "La Influencia Lumínica de Hoy";
        } else {
          indicator.classList.remove('hidden');
          const dayFormatted = d.toString().padStart(2, '0');
          const monthFormatted = (lunarCalendarMonth + 1).toString().padStart(2, '0');
          textEl.textContent = `Viendo: ${dayFormatted}/${monthFormatted}/${lunarCalendarYear}`;
          titleEl.textContent = "La Influencia Lumínica Elegida";
        }
      }
    });
    
    grid.appendChild(div);
  }
}

/* ==========================================================================
   DAILY TAROT WISDOM DATABASE (Consejos Diarios Enriquecidos 78 Arcanos)
   ========================================================================== */
const DAILY_WISDOM_DB = {
  0: { // El Loco
    upright: {
      energyDesc: "El cosmos abre una página en blanco frente a ti. La energía de hoy vibra con el impulso de la aventura, la ligereza del alma y la valentía sagrada de dar un salto de fe sin llevar cargas del pasado.",
      oracleMessage: "No necesitas tener todas las respuestas ni un plan milimétrico para comenzar. Confía en esa corazonada que late en tu pecho: cuando te atreves a dar el primer paso con inocencia y alegría, el universo teje el camino bajo tus pies.",
      dailyAction: "Atrévete hoy a romper la rutina con algo inesperado: toma una ruta distinta, inicia una conversación espontánea o di 'sí' a una oportunidad que te saca de tu zona de confort.",
      shadowWarning: "Distingue la audacia sabia de la imprudencia ciega. Camina con entusiasmo pero mirando dónde pisas para no tropezar con descuidos tontos.",
      affirmation: "'Camino con ligereza, fe y corazón abierto. Confío en lo desconocido y me entrego a la magia de los nuevos comienzos.'",
      dailyRitual: "Abre una ventana durante 2 minutos, respira hondo el aire fresco visualizando cómo sueltas tus viejas preocupaciones como hojas al viento, y sonríe al cielo decretando libertad."
    },
    reversed: {
      energyDesc: "Hoy puedes experimentar una encrucijada entre el miedo paralizante al cambio o, por el contrario, la tentación de actuar con precipitación e irresponsabilidad.",
      oracleMessage: "El oráculo te pide serenar la mente. Si sientes pánico a dar un paso importante, recuerda que el miedo solo es energía esperando ser canalizada. Si estás actuando por puro capricho para escapar de un compromiso, detén la marcha.",
      dailyAction: "Revisa qué decisiones estás postergando por temor al qué dirán, o qué proyectos estás descuidando por falta de constancia. Elige el orden consciente.",
      shadowWarning: "Evita tomar decisiones financieras o afectivas impulsivas sin haber medido las consecuencias reales a medio plazo.",
      affirmation: "'Canalizo mi libertad con sabiduría. Abrazo la prudencia sin permitir que el miedo detenga mi evolución.'",
      dailyRitual: "Coloca tus dos pies descalzos sobre el suelo durante 3 minutos, cierra los ojos y visualiza raíces doradas que te anclan a la tierra, devolviéndote la estabilidad."
    }
  },
  1: { // El Mago
    upright: {
      energyDesc: "Hoy eres un canal vivo de manifestación y poder personal. Tienes la chispa del Fuego, la agilidad del Aire, la fluidez del Agua y el realismo de la Tierra a tu entera disposición.",
      oracleMessage: "Todo lo que necesitas para resolver un dilema o iniciar un proyecto ya habita en ti. Tus palabras tienen un magnetismo especial y tu mente está afilada para la estrategia y la creatividad práctica.",
      dailyAction: "Haz esa llamada crucial, envía esa propuesta o inicia la tarea que requiera tu máxima elocuencia. Hoy tienes el don de convencer, cautivar y liderar.",
      shadowWarning: "No disperses tu energía en diez direcciones a la vez. El verdadero mago enfoca su vara en un solo objetivo a la vez para convertirlo en oro.",
      affirmation: "'Poseo los talentos, la claridad y la voluntad para transformar mis ideas en triunfos tangibles. Yo soy el creador de mi realidad.'",
      dailyRitual: "Enciende una cerilla o contempla la luz de una vela amarilla durante un minuto mientras sostienes tu libreta o bolígrafo de trabajo, consagrando tu mente para el éxito."
    },
    reversed: {
      energyDesc: "Existe hoy el riesgo de caer en la duda sobre tu propia valía (síndrome del impostor) o de toparte con personas que prometen mucho y cumplen poco mediante palabras engañosas.",
      oracleMessage: "No te dejes deslumbrar por apariencias vacías ni sabotees tus propias capacidades. La energía invertida te advierte que la manipulación o las mentiras piadosas siempre terminan pasando factura.",
      dailyAction: "Sé impecable con tus palabras y exige total transparencia en tus acuerdos del día. Si dudas de tus talentos, anota tres logros reales que hayas alcanzado por tu propio esfuerzo.",
      shadowWarning: "Cuidado con prometer cosas que no puedes cumplir o con intentar controlar a otros mediante artimañas psicológicas.",
      affirmation: "'Alineo mis talentos con la verdad y la honestidad. Mi poder es auténtico y no necesita máscaras para brillar.'",
      dailyRitual: "Lávate las manos y el rostro con agua fresca frotando una pizca de sal, visualizando que eliminas toda confusión mental y palabras tóxicas del entorno."
    }
  },
  2: { // La Papisa
    upright: {
      energyDesc: "Día de silencio sagrado, intuición despierta y conexión profunda con los misterios de tu alma. Las verdades más importantes no se gritan en el ruido externo, sino que se susurran en tu quietud interior.",
      oracleMessage: "No fuerces las cosas hoy; muchas situaciones se encuentran en fase de gestación invisible. Si tienes dudas ante una decisión, no consultes a diez personas: aíslate 15 minutos en silencio y escucha tu primer pálpito íntimo.",
      dailyAction: "Dedica un espacio a la lectura pausada, el estudio místico o la anotación de tus sueños. Guarda discreción sobre tus planes más íntimos; el secreto protege la semilla.",
      shadowWarning: "Evita la frialdad emocional o aislarte tanto que te vuelvas inaccesible para quienes de verdad te aman.",
      affirmation: "'Mi intuición es sabia, pura y certera. Escucho la voz de mi alma en el silencio y confío en los tiempos divinos de la vida.'",
      dailyRitual: "Bebe un vaso de agua mineral despacio y a sorbos conscientes antes de salir de casa o al comenzar tu jornada, decretando que nutres tu sexto sentido y tu paz mental."
    },
    reversed: {
      energyDesc: "La niebla de la duda puede empañar tu visión. Podrías sentir desconexión de tu intuición o estar juzgando situaciones con rigidez, secretos incómodos o prejuicios.",
      oracleMessage: "El oráculo te alerta sobre información retenida o verdades a medias en tu entorno. No te fíes de los rumores de pasillo y pregúntate si tú mismo estás ocultando algo por miedo al juicio ajeno.",
      dailyAction: "Atrévete a hablar con claridad y suavidad sobre lo que te incomoda, disolviendo los muros de silencio que enfrían tus relaciones.",
      shadowWarning: "No uses el silencio como castigo pasivo-agresivo ni reprimas tus emociones hasta que tu cuerpo las somatice en dolores físicos.",
      affirmation: "'Disuelvo toda niebla y desconfianza. Me permito expresar mi verdad con serenidad y abro mi corazón a la luz.'",
      dailyRitual: "Enciende una varita de incienso de lavanda o sándalo y pasa el humo suavemente alrededor de tu cabeza y pecho para despejar bloqueos mentales."
    }
  },
  3: { // La Emperatriz
    upright: {
      energyDesc: "La abundancia viva del cosmos te envuelve hoy. La energía es de florecimiento, fertilidad creadora, deleite sensorial y nutrición de tus proyectos y vínculos afectivos.",
      oracleMessage: "Date permiso para disfrutar de la belleza, cuidar tu cuerpo y recibir las bendiciones materiales y emocionales que la vida tiene para ti. Todo lo que riegues hoy con amor y paciencia crecerá con fuerza.",
      dailyAction: "Haz algo que deleite tus cinco sentidos (un baño relajante, cocinar con mimo, rodearte de flores o arte) y avanza en tus proyectos creativos con confianza.",
      shadowWarning: "Evita la tentación del gasto impulsivo por vanidad o el apego asfixiante hacia las personas que amas.",
      affirmation: "'Merezco la abundancia, el placer y el amor en todas sus formas. La vida florece generosa a mi alrededor.'",
      dailyRitual: "Riega con cariño una planta de tu hogar mientras visualizas cómo esa agua nutre y hace germinar tus mayores anhelos de prosperidad."
    },
    reversed: {
      energyDesc: "Hoy puede manifestarse un bloqueo en tu creatividad, sensación de escasez o agotamiento por dar demasiado a los demás descuidando tu propio templo.",
      oracleMessage: "No puedes servir de un pozo vacío. El oráculo te recuerda que antes de cuidar a otros, debes reponer tu propia energía y perdonarte por sentirte cansado o desanimado.",
      dailyAction: "Establece un límite cariñoso pero firme: tómate una pausa y dedícate una hora exclusivamente a ti sin sentir culpa.",
      shadowWarning: "Cuidado con caer en el victimismo, la queja constante o la manipulación a través del reproche sentimental.",
      affirmation: "'Me nutro a mí mismo con respeto y ternura. Mi valor no depende del sacrificio ni de la aprobación ajena.'",
      dailyRitual: "Prepárate una infusión tibia de manzanilla con una cucharadita de miel y tómala en silencio sintiendo el calor reconfortante en tu pecho."
    }
  },
  4: { // El Emperador
    upright: {
      energyDesc: "Día de autoridad serena, estructura sólida, disciplina y dominio práctico. La energía te impulsa a poner orden en el caos y construir sobre cimientos indestructibles.",
      oracleMessage: "Es momento de tomar las riendas con firmeza y pragmatismo. Tus proyectos necesitan dirección clara, presupuestos realistas y límites saludables. Cumple tu palabra y actúa como el protector de tu propio reino.",
      dailyAction: "Organiza tus tareas prioritarias, revisa tus finanzas y mantén una postura erguida y segura ante negociaciones o compromisos del día.",
      shadowWarning: "Evita la terquedad inflexible o intentar imponer tu voluntad por la fuerza bruta; la verdadera autoridad inspira, no tiraniza.",
      affirmation: "'Construyo mi vida sobre cimientos de orden, disciplina y seguridad. Soy el soberano de mi propio destino.'",
      dailyRitual: "Ordena meticulosamente tu espacio de trabajo o escritorio y coloca una piedra firme o moneda pesada como ancla de estabilidad material."
    },
    reversed: {
      energyDesc: "Puedes percibir rigidez mental excesiva, choques con figuras de autoridad o, en el polo opuesto, descontrol y caos por falta de disciplina.",
      oracleMessage: "El oráculo te advierte que la inflexibilidad te romperá ante los vientos imprevistos. Flexibiliza tus métodos sin perder de vista tu objetivo final; la adaptabilidad es señal de auténtica maestría.",
      dailyAction: "Revisa qué reglas autoimpuestas te están asfixiando y aprende a delegar responsabilidades en quienes te rodean.",
      shadowWarning: "Cuidado con los estallidos de mal genio por frustración o con caer en la pereza total por sentirte abrumado por las normas.",
      affirmation: "'La verdadera fuerza es sabia y flexible. Lidero mi vida con templanza, justicia y respeto hacia los demás.'",
      dailyRitual: "Realiza estiramientos lentos de cuello y hombros durante 3 minutos respirando hondo para soltar el peso del control."
    }
  },
  5: { // El Sumo Sacerdote / El Papa
    upright: {
      energyDesc: "La vibración de hoy resuena con la sabiduría espiritual, los valores éticos elevados, la enseñanza y la búsqueda de consejo sabio y bienintencionado.",
      oracleMessage: "Conecta con tus principios más nobles. Hoy es un día favorable para aprender, estudiar, buscar el asesoramiento de un mentor o mediar en conflictos con diplomacia y benevolencia.",
      dailyAction: "Comparte tus conocimientos con generosidad sincera, escucha el consejo de personas con experiencia y actúa con rectitud moral intachable.",
      shadowWarning: "No te aferres a dogmas ciegos ni juzgues a otros por tener caminos espirituales o estilos de vida diferentes al tuyo.",
      affirmation: "'Camino guiado por principios nobles de verdad y compasión. Aprendo de cada alma que cruza mi sendero.'",
      dailyRitual: "Enciende una vela blanca o incienso de mirra y dedica 5 minutos a enviar mentalmente bendiciones y gratitud a tus maestros y ancestros."
    },
    reversed: {
      energyDesc: "Riesgo de toparse con consejos malintencionados, hipocresía en el entorno o rebeldía estéril contra mandatos que ya no resuenan contigo.",
      oracleMessage: "No sigas ciegamente las reglas solo por complacer a la tradición si estas apagan tu verdad interior. Cuestiona con respeto y escucha tu propia brújula moral antes de aceptar imposiciones.",
      dailyAction: "Libérate de un mandato o expectativa familiar obsoleta y toma una decisión basada en tu auténtica conciencia ética.",
      shadowWarning: "Evita la rebeldía sin causa o caer en fanatismos que solo buscan tener la razón a toda costa.",
      affirmation: "'Honro mi propia brújula moral. Encuentro la santidad en la autenticidad y la verdad de mi corazón.'",
      dailyRitual: "Escribe en un papel una creencia limitante que hayas heredado del pasado y quémala con cuidado decretando tu emancipación espiritual."
    }
  },
  6: { // Los Enamorados
    upright: {
      energyDesc: "Día de elecciones trascendentales dictadas por el corazón, armonía de polaridades, belleza vincular y magnetismo afectivo.",
      oracleMessage: "El universo te coloca ante una encrucijada donde debes elegir desde el amor y la vocación genuina, no desde el miedo o la conveniencia fría. Tus relaciones se benefician de una comunicación tierna y cómplice.",
      dailyAction: "Expresa tu afecto sin reservas a quienes amas y toma esa decisión pendiente alineándote con lo que de verdad enciende tu alma.",
      shadowWarning: "Cuidado con la indecisión crónica o jugar a dos bandas intentando quedar bien con todo el mundo.",
      affirmation: "'Elijo desde el amor más puro y consciente. Atraigo relaciones armónicas que elevan mi vibración y mi espíritu.'",
      dailyRitual: "Coloca ambas manos sobre tu pecho sintiendo los latidos de tu corazón y visualiza un rayo de luz rosa y esmeralda que expande tu aura."
    },
    reversed: {
      energyDesc: "Tensiones en los vínculos, dudas desgastantes, tentaciones tóxicas o sensación de desconexión entre lo que sientes y lo que haces.",
      oracleMessage: "La carta invertida te pide honestidad radical. Si estás en una encrucijada afectiva o laboral, pregúntate qué estás sacrificando por miedo a la soledad o al cambio. La fidelidad a uno mismo es innegociable.",
      dailyAction: "Aclara malentendidos mediante una charla madura y sincera, sin evasiones ni promesas que no piensas cumplir.",
      shadowWarning: "Evita la infidelidad a tus propios principios morales o la manipulación emocional por celos e inseguridades.",
      affirmation: "'Me mantengo fiel a mi verdad interior. Tomo decisiones claras y sanas que honran mi paz y mi dignidad.'",
      dailyRitual: "Escribe en un papel las dos opciones de tu dilema actual y quema la duda al fuego de una vela declarando claridad absoluta."
    }
  },
  7: { // El Carro
    upright: {
      energyDesc: "Energía de avance imparable, determinación férrea, triunfo sobre los obstáculos y dominio de fuerzas opuestas hacia una meta clara.",
      oracleMessage: "Tienes las riendas de tu vida firmemente sujetas. No te dejes desviar por distracciones ni dudas externas; mantén la mirada fija en el horizonte y avanza con coraje y disciplina.",
      dailyAction: "Enfócate en tu objetivo principal del día y no pares hasta completarlo. Es un día óptimo para resolver trámites, viajar o dar zancadas profesionales.",
      shadowWarning: "No atropelles a los demás en tu prisa por llegar; la victoria más noble es aquella que no deja heridos en el camino.",
      affirmation: "'Tengo la fuerza, el foco y la dirección para triunfar sobre cualquier obstáculo. Avanzo con paso firme y victorioso.'",
      dailyRitual: "Al salir de casa, visualiza un escudo de luz dorada alrededor de tu cuerpo y camina con la espalda erguida y respiración rítmica."
    },
    reversed: {
      energyDesc: "Sensación de pérdida de rumbo, choques de ego, impulsividad descontrolada o frustración por retrasos en tus planes de viaje o trabajo.",
      oracleMessage: "Si los caballos de tu carruaje tiran en direcciones contrarias, frenar a tiempo es un acto de sabiduría. No fuerces la marcha si el terreno está resbaladizo; recalibra tu estrategia con calma.",
      dailyAction: "Revisa qué actitudes agresivas o impacientes te están desgastando y recupera el control de tus emociones antes de actuar.",
      shadowWarning: "Cuidado con las discusiones al volante, el exceso de velocidad o las palabras hirientes dichas en un momento de rabia.",
      affirmation: "'Recupero el control sereno de mi carruaje vital. Domino mis impulsos y conduzco mi energía con maestría.'",
      dailyRitual: "Siéntate en silencio durante 3 minutos, cuenta diez respiraciones lentas y bebe un vaso de agua fresca antes de reaccionar ante cualquier imprevisto."
    }
  },
  8: { // La Justicia
    upright: {
      energyDesc: "Día de equilibrio kármico, claridad mental absoluta, decisiones justas, honestidad intachable y cosecha de lo sembrado.",
      oracleMessage: "Todo lo que hagas hoy tendrá una repercusión directa y transparente. Actúa con rectitud, revisa contratos o documentos legales con rigor y busca el equilibrio ético en tus relaciones.",
      dailyAction: "Pon en orden tus papeles, salda cuentas pendientes y sé justo y ecuánime tanto contigo mismo como con quienes te rodean.",
      shadowWarning: "Evita la frialdad implacable o juzgarte con una severidad excesiva que no deje espacio para la compasión humana.",
      affirmation: "'La verdad y la justicia divina guían mis actos. Cosecho con serenidad el fruto de mis intenciones nobles y transparentes.'",
      dailyRitual: "Enciende una vela blanca frente a ti y coloca dos objetos equilibrados a sus lados como símbolo de armonía y claridad mental."
    },
    reversed: {
      energyDesc: "Podrías percibir injusticias en el entorno, tentación de autoengaño, severidad desmedida o evasión de responsabilidades pasadas.",
      oracleMessage: "El oráculo te invita a no buscar culpables afuera y examinar tu propia cuota de responsabilidad. Acepta las consecuencias de tus actos con madurez y busca reparar lo dañado con humildad.",
      dailyAction: "Reconoce un error con nobleza y pide disculpas sinceras si heriste a alguien, liberándote de la pesada carga del orgullo.",
      shadowWarning: "No justifiques trampas ni caigas en el rencor hacia quienes crees que no te trataron con equidad.",
      affirmation: "'Me perdono y perdono a los demás. Acepto las lecciones de la vida y restauro el equilibrio en mi corazón.'",
      dailyRitual: "Escribe una carta de perdón sincero hacia una persona (o hacia ti mismo) y destrúyela en paz decretando liberación kármica."
    }
  },
  9: { // El Ermitaño
    upright: {
      energyDesc: "Vibración de recogimiento sabio, introspección fecunda, búsqueda de la verdad profunda, madurez y prudencia.",
      oracleMessage: "En medio del bullicio del mundo, tu mayor fortaleza hoy reside en tu silencio interior. Tómate un tiempo para meditar, estudiar y reflexionar sobre tus metas a largo plazo. Tu propia lámpara ilumina el sendero.",
      dailyAction: "Regálate momentos de soledad constructiva, lee sobre temas que nutran tu alma y no apresures decisiones que requieren maduración.",
      shadowWarning: "Evita aislarte por amargura o creer que nadie puede comprenderte; la soledad sabia enriquece, no desconecta del amor.",
      affirmation: "'Llevo mi propia lámpara encendida en la noche. En mi silencio interior encuentro la respuesta perfecta y la paz.'",
      dailyRitual: "Apaga pantallas y luces artificiales durante 15 minutos esta noche y contempla en silencio la llama de una vela agradeciendo tu sabiduría."
    },
    reversed: {
      energyDesc: "Sensación de aislamiento doloroso, terquedad de ermitaño hosco, rechazo a la ayuda ajena o prisa ciega por escapar de ti mismo.",
      oracleMessage: "Cuidado con encerrarte en tu cueva por miedo a ser herido o juzgado. El oráculo te recuerda que el conocimiento no sirve de nada si se pudre en la oscuridad sin ser compartido con el mundo.",
      dailyAction: "Abre la puerta al encuentro: llama a un buen amigo, da un paseo al aire libre y permite que otros te apoyen con su afecto.",
      shadowWarning: "No caigas en la queja solitaria ni te obsesiones con detalles insignificantes que solo alimentan el pesimismo.",
      affirmation: "'Comparto mi luz sin miedo y recibo con gratitud el cariño y la compañía de quienes me rodean.'",
      dailyRitual: "Escribe un mensaje de cariño o agradecimiento a alguien que haya sido un faro en tu vida en momentos difíciles."
    }
  },
  10: { // La Rueda de la Fortuna
    upright: {
      energyDesc: "Sincronicidades cósmicas, giros favorables del destino, cierre de viejos ciclos y apertura de puertas inesperadas.",
      oracleMessage: "La vida es una danza en continuo movimiento. Si atraviesas un momento difícil, la rueda gira hacia la luz; si estás en la cima, mantén la humildad y la gratitud. Fluye con los cambios sin oponer resistencia.",
      dailyAction: "Aprovecha las oportunidades imprevistas que surjan hoy. Di 'sí' a una invitación inesperada o inicia una nueva rutina.",
      shadowWarning: "No te apegues a las circunstancias temporales ni pretendas controlar lo incontrolable; tu poder reside en cómo respondes al cambio.",
      affirmation: "'Acepto el giro benéfico de mi destino. Me abro a la buena fortuna, las sincronicidades y los nuevos ciclos de luz.'",
      dailyRitual: "Lanza una moneda al aire formulando un anhelo noble de prosperidad y guárdala en tu monedero como imán de abundancia."
    },
    reversed: {
      energyDesc: "Resistencia al cambio, sensación de mala racha o bucles repetitivos donde sientes que tropiezas con la misma piedra.",
      oracleMessage: "La rueda parece atascada porque te aferras a métodos viejos para resolver problemas nuevos. Cuando tú cambias tu forma de ver las cosas, el ciclo kármico se desbloquea de inmediato.",
      dailyAction: "Identifica qué hábito o pensamiento negativo estás repitiendo por inercia y toma la firme decisión de actuar diferente hoy.",
      shadowWarning: "No te victimices culpando a la 'mala suerte'; asume el control de tu actitud y la fortuna volverá a sonreírte.",
      affirmation: "'Rompo viejos patrones y ciclos repetitivos. Yo tengo el poder de girar mi rueda hacia la victoria y la dicha.'",
      dailyRitual: "Da 3 giros lentos sobre ti mismo en el sentido de las agujas del reloj decretando reinicio, limpieza y desbloqueo total."
    }
  },
  11: { // La Fuerza
    upright: {
      energyDesc: "Poder del amor incondicional, dominio del instinto con suavidad, coraje sereno, paciencia infinita y salud vigorosa.",
      oracleMessage: "Las mayores batallas no se ganan con agresión ni gritos, sino con la ternura inquebrantable de quien domina sus propias emociones. Trata a tus miedos y a las personas difíciles como a un león fiero que se rinde ante una caricia sabia.",
      dailyAction: "Responde a las provocaciones con calma y diplomacia. Dedica energía al cuidado de tu cuerpo con ejercicio saludable o buena nutrición.",
      shadowWarning: "No intentes someter a otros mediante la fuerza bruta o la terquedad; la compasión es tu arma más poderosa.",
      affirmation: "'Mi fuerza es el amor, la paciencia y el autocontrol. Domo cualquier tormenta con serenidad y dulzura infinita.'",
      dailyRitual: "Acaricia a tu mascota o abrázate a ti mismo fuertemente durante un minuto respirando hondo y decretando paz invencible."
    },
    reversed: {
      energyDesc: "Agotamiento físico o emocional, estallidos de cólera reprimida, debilidad de voluntad o sensación de impotencia.",
      oracleMessage: "Tu león interior está herido o desbordado. El oráculo te pide no exigirte más de la cuenta hoy: reconoce tus límites, descansa tu cuerpo y no te sientas culpable por necesitar una tregua.",
      dailyAction: "Haz una pausa en tus batallas cotidianas, pospón confrontaciones y mímate con descanso reparador y comida sana.",
      shadowWarning: "Cuidado con los arrebatos de ira de los que luego te arrepientas o con rendirte ante la primera dificultad por desánimo.",
      affirmation: "'Reconozco mi vulnerabilidad sin juzgarme. Recupero mi vigor vital en el descanso, el silencio y la ternura.'",
      dailyRitual: "Aplica unas gotas de aceite esencial de lavanda o romero en tus sienes y nuca dándote un masaje suave y relajante."
    }
  },
  12: { // El Colgado
    upright: {
      energyDesc: "Pausa sagrada, cambio radical de perspectiva, iluminación espiritual, paciencia fértil y entrega consciente al proceso de la vida.",
      oracleMessage: "A veces la mayor acción es no hacer nada y observar desde un ángulo totalmente opuesto. Deja de forzar una solución que no depende de ti en este momento; en la quietud de la entrega se revelará la respuesta mágica.",
      dailyAction: "Mira ese problema que te agobia poniéndote en los zapatos de la otra persona. Acepta las demoras como una bendición que te protege.",
      shadowWarning: "Distingue la pausa reflexiva del martirio inútil; no te quedes colgado de situaciones tóxicas por pura inercia.",
      affirmation: "'En la pausa sagrada encuentro la iluminación. Suelto el control y miro el mundo con nuevos ojos llenos de paz.'",
      dailyRitual: "Recuéstate en el suelo o cama con las piernas elevadas contra la pared durante 5 minutos para cambiar la perspectiva y la circulación."
    },
    reversed: {
      energyDesc: "Sensación de sacrificio estéril, terquedad en causas perdidas, victimismo ('pobre de mí') o parálisis por miedo a soltar.",
      oracleMessage: "El oráculo te pregunta: ¿de qué te sirve seguir sacrificándote por algo o alguien que no valora tu entrega? Desata tus propios nudos, ponte de pie y reclama tu derecho a avanzar.",
      dailyAction: "Di 'no' a una exigencia que te drena y corta amarras con un compromiso que ya no tiene sentido en tu presente.",
      shadowWarning: "Deja de quejarte de tu situación si tú mismo eres quien se niega a soltar las cuerdas que te aprisionan.",
      affirmation: "'Me libero del papel de mártir. Corto amarras con lo que me ata y me pongo de pie con dignidad y poder.'",
      dailyRitual: "Desata un nudo hecho previamente en una cinta o cuerda mientras decretas con fuerza: '¡Quedo libre de toda atadura!'"
    }
  },
  13: { // La Muerte / El Arcano XIII
    upright: {
      energyDesc: "Transformación profunda, renacimiento sagrado, poda necesaria y cierre definitivo de lo que ya no tiene vida.",
      oracleMessage: "No temas a la transformación: nada muere en el universo, todo se transmuta en una octava superior. Para que florezca la primavera en tu alma, es imprescindible que caigan las hojas secas del pasado.",
      dailyAction: "Despréndete de algo viejo hoy: dona ropa que no uses, borra archivos viejos o perdona un agravio del pasado dejando ir el rencor.",
      shadowWarning: "No intentes revivir situaciones que ya cumplieron su ciclo; la resistencia al cambio solo prolonga el sufrimiento.",
      affirmation: "'Dejo ir con gratitud lo que ya cumplió su ciclo. Renazco con más fuerza, luz y sabiduría renovada.'",
      dailyRitual: "Haz una limpieza a fondo de un cajón o rincón de tu casa, tirando o donando lo innecesario para abrir paso a la nueva energía."
    },
    reversed: {
      energyDesc: "Aferramiento desesperado a lo que ya murió, miedo visceral al cambio, agonía prolongada o resistencia al duelo.",
      oracleMessage: "El oráculo te advierte con amor: estás regando una planta de plástico esperando que dé frutos vivos. Acepta que esa etapa concluyó; la vida te aguarda con infinitas bendiciones al otro lado de tu miedo.",
      dailyAction: "Acepta la realidad de un final con madurez y despídete con respeto, dando el primer paso hacia tu nuevo presente.",
      shadowWarning: "Cuidado con quedar atrapado en nostalgias que te impiden ver las nuevas oportunidades que hoy tocan a tu puerta.",
      affirmation: "'Suelto el pasado sin miedo ni rencor. Confío en que lo que se va deja lugar a bendiciones infinitamente mayores.'",
      dailyRitual: "Escribe lo que te cuesta soltar en un papel y quémalo de forma segura en un cuenco, esparciendo las cenizas en la tierra."
    }
  },
  14: { // La Templanza
    upright: {
      energyDesc: "Alquimia espiritual, moderación, armonía fluida, sanación integral, paciencia de ángel y reconciliación de opuestos.",
      oracleMessage: "El arte de la vida es mezclar los ingredientes con sabiduría y dulzura. Hoy es un día propicio para sanar heridas, mediar en tensiones familiares o de pareja y encontrar el equilibrio justo en tus hábitos.",
      dailyAction: "Actúa como un puente de paz en tus conversaciones, busca el término medio y modera cualquier exceso en tus comidas o gastos.",
      shadowWarning: "Evita los extremos emocionales o la impaciencia por acelerar procesos que requieren maduración serena.",
      affirmation: "'La armonía divina fluye a través de mí. Transmuto cualquier discordia en paz, salud y perfecto equilibrio.'",
      dailyRitual: "Vierte agua pura de un vaso a otro lentamente tres veces sin derramar una sola gota, decretando equilibrio en tu cuerpo y mente."
    },
    reversed: {
      energyDesc: "Desbalance emocional, impaciencia, choques por intolerancia, mezclas incompatibles o desasosiego interno.",
      oracleMessage: "Has perdido el centro por intentar abarcar demasiado o por caer en excesos que desgastan tu cuerpo y tu paz mental. El oráculo te pide frenar, respirar y restaurar la sobriedad en tus rutinas.",
      dailyAction: "Identifica en qué área estás cometiendo excesos y restablece un ritmo pausado de descanso y buena alimentación.",
      shadowWarning: "No busques soluciones rápidas y drásticas para dilemas que requieren tacto, paciencia y diplomacia.",
      affirmation: "'Recupero mi centro de calma y equilibrio. La serenidad es mi mayor refugio ante la prisa del mundo.'",
      dailyRitual: "Prepara una infusión de tila o menta y bébela en completo silencio, alejado de teléfonos y ruidos externos."
    }
  },
  15: { // El Diablo
    upright: {
      energyDesc: "Magnetismo terrenal poderoso, pasión creadora, ambición material, sombra inconsciente y lucidez de ataduras.",
      oracleMessage: "El Diablo te muestra tus deseos más viscerales y las cadenas que tú mismo has consentido llevar. Canaliza esa fuerza volcánica hacia metas productivas y creativas sin dejarte atrapar por obsesiones o dependencias.",
      dailyAction: "Reconoce tus tentaciones y sombras sin culpa, pero decide conscientemente si te hacen libre o si te están encadenando.",
      shadowWarning: "Cuidado con las adicciones, los celos posesivos, la codicia material o manipular a otros por beneficio propio.",
      affirmation: "'Reconozco mis sombras y las ilumino con conciencia. Soy libre de toda atadura y dueño absoluto de mi voluntad.'",
      dailyRitual: "Enciende una vela y visualiza cómo cortas un cordón invisible de dependencia tóxica con unas tijeras de luz dorada."
    },
    reversed: {
      energyDesc: "Despertar del engaño, ruptura de cadenas tóxicas, liberación de adicciones y recuperación de la soberanía personal.",
      oracleMessage: "Una venda se cae de tus ojos. El oráculo te felicita porque estás dando el paso decisivo para salir de una situación o relación que te aprisionaba. Eres mucho más fuerte que cualquier apego del pasado.",
      dailyAction: "Corta definitivamente con un hábito perjudicial o aléjate de un entorno que drena tu dignidad y tu energía vital.",
      shadowWarning: "No caigas en la trampa de volver atrás por debilidad momentánea; tu libertad ganada no tiene precio.",
      affirmation: "'Rompo las cadenas que me limitaban. Reclamo mi soberanía espiritual, mi dignidad y mi libertad absoluta.'",
      dailyRitual: "Toma un baño o ducha de agua tibia frotando sal marina en tus hombros y cuello visualizando la disolución de cargas densas."
    }
  },
  16: { // La Torre
    upright: {
      energyDesc: "Revelación liberadora, caída de falsas estructuras, desahogo necesario y verdad incontestable que rompe ilusiones.",
      oracleMessage: "El rayo de la verdad destruye la prisión que creías hogar. Si un plan o expectativa se derrumba hoy, no te desesperes: era una estructura falsa construida sobre arena. Sobre las ruinas construirás tu vida auténtica.",
      dailyAction: "Acepta la verdad desnuda sin disfraces, suelta el orgullo y agradece que el engaño ha caído antes de causar más daño.",
      shadowWarning: "No intentes reconstruir muros podridos; deja que el aire fresco limpie el terreno para tu nuevo renacer.",
      affirmation: "'Acepto la verdad que me libera. Sobre las ruinas de lo falso, construyo mi vida auténtica y luminosa.'",
      dailyRitual: "Rompe en pedazos un papel donde hayas escrito tus viejas rigideces mentales y sonríe al cielo sintiendo alivio y ligereza."
    },
    reversed: {
      energyDesc: "Negación ante el derrumbe inminente, aferramiento a una crisis evitable o pánico ante los cambios drásticos.",
      oracleMessage: "Estás sosteniendo las paredes de una torre que se tambalea con tus propias manos. Cuanto más te resistas a aceptar la realidad, más agotador será el desenlace. Permite que caiga lo que no se sostiene.",
      dailyAction: "Deja de encubrir errores ajenos o propios y da paso a la honestidad total aunque requiera valentía.",
      shadowWarning: "Cuidado con prolongar el sufrimiento por miedo al qué dirán o por terror a empezar de nuevo.",
      affirmation: "'Suelto la resistencia al cambio. Permito que caigan las máscaras y recibo con valentía mi renovación.'",
      dailyRitual: "Respira hondo y exhala con un suspiro sonoro tres veces seguidas liberando toda la tensión acumulada en tu pecho."
    }
  },
  17: { // La Estrella
    upright: {
      energyDesc: "Esperanza renovada, bendición cósmica, inspiración artística, generosidad transparente y fe en un futuro radiante.",
      oracleMessage: "Las aguas de la sanación y la esperanza fluyen en tu vida. Es uno de los días más auspiciosos del tarot: tus plegarias y anhelos son escuchados por el universo. Comparte tu luz con autenticidad y confía en tu estrella.",
      dailyAction: "Dedica tiempo a tus proyectos artísticos o solidarios, sonríe a quienes crucen tu camino y mantén viva tu ilusión más pura.",
      shadowWarning: "No te quedes solo en fantasías etéreas; derrama tu agua sobre la tierra para que tus dones den frutos reales.",
      affirmation: "'Las estrellas guían mi camino con bendiciones infinitas. Mi esperanza es firme y mi destino es luminoso.'",
      dailyRitual: "Coloca un cuenco con agua limpia cerca de la ventana reflejando el cielo nocturno y formula tus tres mayores deseos con fe."
    },
    reversed: {
      energyDesc: "Desánimo pasajero, pesimismo, falta de fe en ti mismo o sensación de desconexión de tus sueños más queridos.",
      oracleMessage: "El oráculo te recuerda que la estrella sigue brillando en el firmamento aunque las nubes de tu mente no te dejen verla hoy. No permitas que una decepción del pasado te ciegue ante las bendiciones de tu porvenir.",
      dailyAction: "Reconecta con lo que de verdad enciende tu alegría: escucha tu música favorita, pasea en la naturaleza o habla con alguien positivo.",
      shadowWarning: "Evita el cinismo amargo o juzgar tu valor personal por un bache temporal en el camino.",
      affirmation: "'Enciendo mi propia estrella interior. La noche más oscura es la que anuncia el amanecer más hermoso.'",
      dailyRitual: "Enciende una vela azul celeste o blanca y repite tres veces con el corazón abierto: 'Confío en mi futuro y me abro a recibir milagros'."
    }
  },
  18: { // La Luna
    upright: {
      energyDesc: "Intuición psíquica profunda, sueños reveladores, misterio del subconsciente y navegación sabia en la penumbra.",
      oracleMessage: "Tus sentidos extrasensoriales están muy despiertos, pero el terreno puede prestarse a ilusiones o miedos infundados. No tomes decisiones definitivas en plena niebla; escucha tus sueños y camina con prudencia.",
      dailyAction: "Anota tus sueños al despertar, investiga lo que está oculto bajo la superficie y confía en tu sexto sentido.",
      shadowWarning: "Cuidado con los celos imaginarios, la paranoia o dejarte arrastrar por fantasmas del pasado que no son reales.",
      affirmation: "'Navego mis mareas emocionales con serenidad y lucidez. La luz de mi intuición disuelve cualquier engaño.'",
      dailyRitual: "Coloca un vaso con agua fresca y una hoja de laurel en tu mesita de noche para tener sueños protectores y lucidez mental."
    },
    reversed: {
      energyDesc: "Disipación de la niebla, revelación de engaños ocultos, superación de temores y salida hacia la claridad.",
      oracleMessage: "La luz de la verdad comienza a disipar las sombras. Una mentira o confusión que te quitaba el sueño queda al descubierto, permitiéndote tomar decisiones firmes y sanas.",
      dailyAction: "Afronta las cosas tal como son, pide explicaciones claras si las necesitas y deja atrás los miedos irracionales.",
      shadowWarning: "No temas enfrentarte a la realidad; por dura que parezca, siempre es más sana que una mentira reconfortante.",
      affirmation: "'La niebla se disipa y la claridad reina en mi mente. Veo las cosas tal como son y elijo la paz y la verdad.'",
      dailyRitual: "Lávate los ojos y el rostro con agua fresca decretando: 'Mis ojos ven la verdad con amor, sabiduría y discernimiento'."
    }
  },
  19: { // El Sol
    upright: {
      energyDesc: "Éxito radiante, alegría contagiosa, claridad meridiana, vitalidad plena, calidez y bendición en todas las áreas.",
      oracleMessage: "El Sol es la carta más afortunada del Tarot. Todo lo que emprendas hoy cuenta con el respaldo de la luz cósmica. Es un día para brillar sin pedir disculpas, celebrar la vida y compartir tu felicidad con generosidad.",
      dailyAction: "Sonríe, sal a disfrutar del día, lidera tus proyectos con entusiasmo y transmite optimismo a quienes te rodean.",
      shadowWarning: "Evita la soberbia, el orgullo o quemar a los demás con actitudes arrogantes; el verdadero sol alumbra a todos con ternura.",
      affirmation: "'Yo soy luz, éxito, salud y dicha radiante. Todo lo que toco hoy se llena de bendición, victoria y amor.'",
      dailyRitual: "Sal al aire libre durante 5 minutos, abre los brazos hacia el sol y siente cómo su energía dorada recarga tu vitalidad."
    },
    reversed: {
      energyDesc: "Nubes pasajeras sobre tu brillo, orgullo herido, optimismo excesivamente ingenuo o retraso menor en tus planes.",
      oracleMessage: "El sol sigue brillando detrás de esa pequeña nube. No te dejes desanimar por un contratiempo puntual ni permitas que una crítica ajena apague tu entusiasmo creador.",
      dailyAction: "Mantén una actitud positiva y humilde, pule los detalles de tu plan y no dependas del aplauso de los demás para sentirte valioso.",
      shadowWarning: "Cuidado con la vanidad herida o querer imponer tu brillo por encima de los demás para compensar inseguridades.",
      affirmation: "'Mi sol interior es inagotable. Ninguna nube pasajera puede apagar la luz divina que habita en mi alma.'",
      dailyRitual: "Enciende una vela dorada o amarilla y sonríe frente al espejo agradeciendo de corazón 3 cosas maravillosas de tu vida hoy."
    }
  },
  20: { // El Juicio
    upright: {
      energyDesc: "Despertar de conciencia, llamado vocacional superior, perdón liberador, resurrección de proyectos y claridad kármica.",
      oracleMessage: "El clarín del destino suena para ti. Es momento de dejar atrás tu viejo 'yo' con todas sus culpas y responder al llamado de tu verdadero propósito. Recibes una segunda oportunidad que debes aprovechar con madurez.",
      dailyAction: "Toma esa decisión trascendental que has estado postergando y perdónate por completo por tus errores del pasado.",
      shadowWarning: "No te juzgues con crueldad ni vivas prisionero de remordimientos estériles; el juicio divino es absolución y renacer.",
      affirmation: "'Escucho el llamado de mi alma y despierto a mi verdadero propósito. Me libero del pasado y renazco en plenitud.'",
      dailyRitual: "Respira hondo, alza los brazos al cielo y decreta en voz alta: '¡Acepto mi renacimiento espiritual aquí y ahora!'."
    },
    reversed: {
      energyDesc: "Sordera ante el llamado interior, miedo a madurar, dudas paralizantes o temor excesivo al juicio y opinión ajena.",
      oracleMessage: "Sabes en tu fuero interno lo que debes hacer, pero sigues postergándolo por miedo a asumir la responsabilidad de tu vida. Nadie vendrá a vivir tu destino por ti; da el paso con valentía.",
      dailyAction: "Enfréntate a esa verdad pendiente y toma la decisión que tu corazón te exige sin esperar la aprobación de otros.",
      shadowWarning: "Cuidado con culpar a tus padres, exparejas o al pasado para justificar tu falta de acción en el presente.",
      affirmation: "'Me perdono por mis dudas del pasado. Hoy elijo escuchar mi voz interior y avanzar hacia mi destino sin miedo.'",
      dailyRitual: "Escribe una carta a tu 'yo del pasado' expresándole perdón incondicional y quémala en señal de absolución total."
    }
  },
  21: { // El Mundo
    upright: {
      energyDesc: "Plenitud absoluta, coronación de esfuerzos, éxito universal, cierre triunfal de ciclo y danza en armonía cósmica.",
      oracleMessage: "Has alcanzado la cima de la montaña. Todos tus esfuerzos pasados se coronan con éxito y satisfacción profunda. Estás en el lugar correcto, en el momento exacto y en sintonía con la totalidad del universo.",
      dailyAction: "Celebra tus logros, concluye ese proyecto con orgullo, viaja o expande tus horizontes sin límites.",
      shadowWarning: "Disfruta de la cima con gratitud y humildad, recordando que cada meta alcanzada es el umbral hacia una nueva aventura evolutiva.",
      affirmation: "'Todo está en perfecto orden divino. Celebro mi plenitud, mi éxito y mi unión armónica con el universo entero.'",
      dailyRitual: "Dibuja un círculo imaginario de luz dorada a tu alrededor con tu dedo índice, entra en él con paso firme y decreta: '¡Habito mi plenitud!'."
    },
    reversed: {
      energyDesc: "Éxito a punto de caramelo frenado por un detalle final, falta de cierre, miedo a culminar o visión estrecha.",
      oracleMessage: "Estás a un solo paso de cruzar la meta. No te rindas en el último metro por pereza o miedo al éxito; remata esa tarea pendiente y corona tu esfuerzo con maestría.",
      dailyAction: "Completa ese último trámite o conversación que falta para cerrar el ciclo de manera impecable.",
      shadowWarning: "Cuidado con la trampa del perfeccionismo paralizante; lo hecho con amor y entrega es mejor que lo perfecto nunca terminado.",
      affirmation: "'Culmino con éxito y maestría cada ciclo que inicio. Me abro a recibir los laureles de mi esfuerzo y dedicación.'",
      dailyRitual: "Da un aplauso sonoro o un toque de campana en las 4 esquinas de tu habitación decretando victoria y cierre perfecto."
    }
  }
};

function getMinorArcanaDailyWisdom(card, isReversed) {
  const isWands = card.name.includes('Bastos');
  const isCups = card.name.includes('Copas');
  const isSwords = card.name.includes('Espadas');
  const isPentacles = card.name.includes('Oros');

  let elementTheme = "Fuego (Acción y Pasión)";
  let elementGlow = "🔥";
  if (isCups) { elementTheme = "Agua (Emociones y Vínculos)"; elementGlow = "💧"; }
  else if (isSwords) { elementTheme = "Aire (Mente y Claridad)"; elementGlow = "⚔️"; }
  else if (isPentacles) { elementTheme = "Tierra (Materia y Prosperidad)"; elementGlow = "🪙"; }

  if (!isReversed) {
    return {
      energyDesc: `El influjo de ${card.name} baña tu día con la vibración de ${elementGlow} ${elementTheme}. Clima: ${card.keyThemes}.`,
      oracleMessage: card.meanings.general,
      dailyAction: card.meanings.advice || `Alinea tus acciones con el mensaje de ${card.name}: confía en tu enfoque y avanza en tu propósito con firmeza.`,
      shadowWarning: `No descuides el equilibrio elemental de ${elementTheme}; mantén la templanza y no actúes por prisa o sobreexigencia.`,
      affirmation: `'Acojo la bendición de ${card.name}. Mi voluntad, mi mente y mi corazón vibran en perfecta armonía creadora.'`,
      dailyRitual: isWands ? "Enciende una vela dorada consagrando tu pasión creadora." :
                   isCups ? "Toma un vaso de agua con intención de paz y amor propio." :
                   isSwords ? "Respira hondo durante 2 minutos visualizando claridad mental cristalina." :
                   "Coloca una moneda limpia en tu mesa de trabajo como ancla de prosperidad."
    };
  } else {
    return {
      energyDesc: `La energía de ${card.name} se presenta en polaridad de sombra o desafío. Clima de transmutación: ${card.keyThemes}.`,
      oracleMessage: card.reversed.general,
      dailyAction: card.reversed.alchemy || `Revisa qué aspecto de ${card.name} te está bloqueando y toma un paso consciente para liberarlo hoy.`,
      shadowWarning: `Cuidado con caer en los bloqueos arquetípicos de esta carta; no reacciones desde el miedo ni la rigidez.`,
      affirmation: `'Transmuto cualquier bloqueo en sabiduría. Mi poder de adaptación es infinito y elijo la paz interior.'`,
      dailyRitual: "Lávate las manos con agua fresca y una pizca de sal marina visualizando cómo se disuelve todo obstáculo del camino."
    };
  }
}

/* ==========================================================================
   Carta del Día Express Lógica
   ========================================================================== */
function initDailyExpressCard() {
  const expressCard = document.getElementById('daily-express-card');
  const expressCardFront = document.getElementById('daily-express-card-front');
  const expressInfo = document.getElementById('daily-express-info');
  const expressInstructions = document.getElementById('daily-express-instructions');
  const expressName = document.getElementById('daily-express-name');
  const expressAdvice = document.getElementById('daily-express-advice');
  const expressRedraw = document.getElementById('daily-express-redraw');

  if (!expressCard) return;

  const todayStr = new Date().toLocaleDateString('sv'); // Formato YYYY-MM-DD
  let state = null;

  // Cargar estado de localStorage
  try {
    const saved = localStorage.getItem('tarot_daily_express');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === todayStr) {
        state = parsed;
      }
    }
  } catch (e) {
    console.error("Error al cargar tarot_daily_express:", e);
  }

  // Si no hay estado para hoy, generar uno
  if (!state) {
    state = generateDailyExpressState(todayStr);
  }

  // Renderizar según el estado actual
  renderExpressCardState(state);
  apply3DTilt(expressCard);

  // Evento al pulsar la carta
  expressCard.addEventListener('click', () => {
    if (state.flipped) return;
    
    state.flipped = true;
    saveDailyExpressState(state);
    
    // Animación de voltear y mostrar el consejo
    expressCard.classList.add('flipped');
    
    setTimeout(() => {
      showExpressAdvice(state);
    }, 300);
  });

  // Evento para obtener otra carta
  if (expressRedraw) {
    expressRedraw.addEventListener('click', (e) => {
      e.stopPropagation(); // Evitar que el clic en el botón active el volteo de la carta
      
      // Animación de voltear al reverso primero
      expressCard.classList.remove('flipped');
      expressInfo.classList.add('hidden');
      expressInstructions.classList.remove('hidden');
      
      setTimeout(() => {
        // Generar un estado totalmente nuevo (ignora la consistencia del día al barajar a mano)
        state = generateDailyExpressState(todayStr, true);
        renderExpressCardState(state);
      }, 300);
    });
  }

  function generateDailyExpressState(dateStr, forceRandom = false) {
    let cardId;
    
    if (forceRandom) {
      cardId = Math.floor(Math.random() * 22);
    } else {
      // Usar la fecha como semilla para consistencia
      let seed = 0;
      for (let i = 0; i < dateStr.length; i++) {
        seed += dateStr.charCodeAt(i);
      }
      cardId = seed % 22;
    }
    
    const isReversed = (Math.random() < 0.2); // 20% de probabilidad de salir invertida
    
    const newState = {
      date: dateStr,
      cardId: cardId,
      isReversed: isReversed,
      flipped: false
    };
    
    saveDailyExpressState(newState);
    return newState;
  }

  function saveDailyExpressState(s) {
    try {
      localStorage.setItem('tarot_daily_express', JSON.stringify(s));
    } catch (e) {
      console.error("Error al guardar tarot_daily_express:", e);
    }
  }

  function renderExpressCardState(s) {
    // Poner el fondo correspondiente en el front de la carta
    if (expressCardFront) {
      expressCardFront.style.backgroundImage = `url('assets/card_${s.cardId}.jpg')`;
    }
    
    // Configurar si está invertida
    if (s.isReversed) {
      expressCard.classList.add('reversed');
    } else {
      expressCard.classList.remove('reversed');
    }

    if (s.flipped) {
      expressCard.classList.add('flipped');
      showExpressAdvice(s);
    } else {
      expressCard.classList.remove('flipped');
      expressInfo.classList.add('hidden');
      expressInstructions.classList.remove('hidden');
    }
  }

  function showExpressAdvice(s) {
    const card = window.tarotDb.find(c => c.id === s.cardId);
    if (!card) return;

    // 1. Título con Arcano y Polaridad
    expressName.textContent = card.name + (s.isReversed ? " — Polaridad Invertida" : " — Luz al Derecho");
    
    // 2. Badges de Arquetipo, Planeta, Elemento y Polaridad
    const badgesContainer = document.getElementById('daily-express-badges');
    if (badgesContainer) {
      const polarityClass = s.isReversed ? 'reversed' : 'upright';
      const polarityText = s.isReversed ? '⚡ Sombra / Transmutación' : '🌟 Luz / Expansión';
      badgesContainer.innerHTML = `
        <span class="daily-archetype-badge">🔢 Arcano ${card.id <= 21 ? card.id : card.numerology}</span>
        <span class="daily-archetype-badge astro">🪐 ${card.astrology}</span>
        <span class="daily-archetype-badge element">✨ ${card.element}</span>
        <span class="daily-archetype-badge polarity ${polarityClass}">${polarityText}</span>
      `;
    }

    // 3. Obtener Sabiduría Diaria (Mayor o Menor)
    let wisdom = null;
    if (s.cardId <= 21 && DAILY_WISDOM_DB[s.cardId]) {
      wisdom = s.isReversed ? DAILY_WISDOM_DB[s.cardId].reversed : DAILY_WISDOM_DB[s.cardId].upright;
    } else {
      wisdom = getMinorArcanaDailyWisdom(card, s.isReversed);
    }

    // 4. Consejo Principal Estructurado
    let adviceHTML = `
      <div style="margin-bottom: 1.15rem;">
        <h4 style="color: var(--gold-color); font-family: var(--font-serif); font-size: 1.1rem; margin: 0 0 0.35rem 0; display: flex; align-items: center; gap: 0.45rem;">
          <span>🌌</span> Clima Energético de Hoy
        </h4>
        <p style="margin: 0; line-height: 1.6; color: var(--text-main); font-size: 0.95rem;">
          ${wisdom.energyDesc}
        </p>
      </div>

      <div style="margin-bottom: 1.15rem;">
        <h4 style="color: var(--gold-light, #f3e5ab); font-family: var(--font-serif); font-size: 1.05rem; margin: 0 0 0.35rem 0; display: flex; align-items: center; gap: 0.45rem;">
          <span>✦</span> El Mensaje Sagrado del Oráculo
        </h4>
        <p style="margin: 0; line-height: 1.65; color: var(--text-muted); font-size: 0.94rem;">
          ${wisdom.oracleMessage}
        </p>
      </div>

      <div style="background: rgba(229, 193, 88, 0.05); border-left: 3px solid var(--gold-color); padding: 0.85rem 1.1rem; border-radius: 0 10px 10px 0; margin-bottom: 1rem;">
        <h4 style="color: var(--gold-color); font-size: 0.95rem; margin: 0 0 0.25rem 0; font-family: var(--font-sans); font-weight: 700; display: flex; align-items: center; gap: 0.4rem;">
          <span>🎯</span> Tu Acción Concreta de Hoy
        </h4>
        <p style="margin: 0; line-height: 1.55; color: var(--text-main); font-size: 0.92rem;">
          ${wisdom.dailyAction}
        </p>
      </div>

      <div style="background: rgba(239, 68, 68, 0.05); border-left: 3px solid #f87171; padding: 0.85rem 1.1rem; border-radius: 0 10px 10px 0; margin-bottom: 0.25rem;">
        <h4 style="color: #fca5a5; font-size: 0.92rem; margin: 0 0 0.25rem 0; font-family: var(--font-sans); font-weight: 600; display: flex; align-items: center; gap: 0.4rem;">
          <span>⚠️</span> Alerta de Consciencia
        </h4>
        <p style="margin: 0; line-height: 1.5; color: var(--text-muted); font-size: 0.9rem;">
          ${wisdom.shadowWarning}
        </p>
      </div>
    `;

    expressAdvice.innerHTML = adviceHTML;

    // 5. Afirmación del Día
    const affirmationBox = document.getElementById('daily-affirmation');
    if (affirmationBox) {
      affirmationBox.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--purple-color); font-weight: 700;">✦ Decreto del Día</span>
          <span style="font-size: 1.02rem; font-style: italic; color: var(--text-main);">${wisdom.affirmation}</span>
        </div>
      `;
    }

    // 6. Ritual del Día
    const ritualText = document.getElementById('daily-ritual-text');
    if (ritualText) {
      ritualText.innerHTML = wisdom.dailyRitual;
    }

    expressInstructions.classList.add('hidden');
    expressInfo.classList.remove('hidden');

    // Desplazamiento suave en móviles para ver la revelación completa
    if (window.innerWidth <= 768) {
      expressInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

// Start lunar tab initialization after all constants are declared
initLunarTab();
initDailyExpressCard();

// --- Observador de Mutaciones Global para gestionar el volteo de cartas fluidamente ---
const cardFlipObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const cardWrapper = mutation.target;
      if (cardWrapper.classList.contains('card-wrapper')) {
        const wasFlipped = mutation.oldValue && mutation.oldValue.split(' ').includes('flipped');
        const isFlipped = cardWrapper.classList.contains('flipped');

        if (wasFlipped !== isFlipped) {
          const inner = cardWrapper.querySelector('.card-inner');
          if (inner) {
            // Añadir clase temporal para bloquear los eventos de mousemove tilt
            cardWrapper.classList.add('flipping');
            
            // Limpiar estilos inline para que la transición CSS pura de .card-inner tome el control
            inner.style.transform = '';
            inner.style.transition = '';

            // Volver a permitir el tilt una vez termine la transición (850ms)
            setTimeout(() => {
              cardWrapper.classList.remove('flipping');
            }, 850);
          }
        }
      }
    }
  });
});

// Comenzar a observar los cambios de clase en todos los descendientes del body
cardFlipObserver.observe(document.body, {
  attributes: true,
  attributeFilter: ['class'],
  subtree: true,
  attributeOldValue: true
});

/* ==========================================================================
   MEJORA 4: Pregunta Guiada — Sugerencias por categoría
   ========================================================================== */
(function initGuidedQuestions() {
  const categorySelect = document.getElementById('category-select');
  const panel = document.getElementById('guided-questions-panel');
  const questionInput = document.getElementById('question-input');
  if (!categorySelect || !panel || !questionInput) return;

  const suggestions = {
    general: [
      '¿Qué energía rige mi camino en este momento?',
      '¿Qué necesito ver con más claridad en mi vida?',
      '¿Cuál es el próximo paso que debo dar?',
      '¿Qué lección de vida estoy atravesando ahora?'
    ],
    love: [
      '¿Qué puedo hacer para mejorar mi relación de pareja?',
      '¿Qué siente esta persona por mí?',
      '¿Qué necesito soltar para atraer el amor que merezco?',
      '¿Cómo puedo conectar más profundamente con mi pareja?'
    ],
    work: [
      '¿Qué energía atrae la prosperidad a mi vida ahora?',
      '¿Cuál es el bloqueo que frena mi crecimiento profesional?',
      '¿Es este proyecto o empleo lo que mi alma necesita?',
      '¿Qué talento debo potenciar para alcanzar mis metas?'
    ],
    health: [
      '¿Qué área de mi bienestar necesita más atención?',
      '¿Qué hábito o emoción está afectando mi salud?',
      '¿Cómo puedo recuperar mi vitalidad y equilibrio?',
      '¿Qué mensaje me envía mi cuerpo en este momento?'
    ]
  };

  function renderSuggestions(cat) {
    const list = suggestions[cat] || suggestions.general;
    panel.innerHTML = `<p class="guided-q-title">✨ Sugerencias de preguntas:</p>`;
    list.forEach(q => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'guided-q-chip';
      btn.textContent = q;
      btn.addEventListener('click', () => {
        questionInput.value = q;
        questionInput.dispatchEvent(new Event('input'));
      });
      panel.appendChild(btn);
    });
    panel.classList.add('visible');
  }

  categorySelect.addEventListener('change', () => {
    renderSuggestions(categorySelect.value);
  });

  // Show on focus of question input
  questionInput.addEventListener('focus', () => {
    if (!questionInput.value.trim()) renderSuggestions(categorySelect.value);
  });

  questionInput.addEventListener('input', () => {
    if (questionInput.value.trim()) {
      panel.classList.remove('visible');
    }
  });
})();

/* ==========================================================================
   MEJORA 1: Daily Card — Lectura Completa con Afirmación + Ritual
   ========================================================================== */
(function enhanceDailyCard() {
  const affirmations = {
    0:  'Hoy me lanzo al vacío con confianza. El universo me sostiene.',
    1:  'Tengo el poder de manifestar todo lo que mi mente crea.',
    2:  'Mi intuición es mi guía más sabia. La escucho en silencio.',
    3:  'La abundancia fluye hacia mí de forma natural y amorosa.',
    4:  'Lidero mi vida desde la fuerza y la claridad interior.',
    5:  'Me abro a la sabiduría que el universo tiene para mí hoy.',
    6:  'Elijo el amor. Elijo la conexión. Elijo el corazón.',
    7:  'Avanzo con determinación hacia mis metas más elevadas.',
    8:  'Tengo fuerza para enfrentar cualquier desafío con gracia.',
    9:  'La soledad no me asusta: en ella encuentro mi verdad.',
    10: 'Los ciclos cambian y yo confío en el fluir de la rueda.',
    11: 'Actúo con integridad. El equilibrio es mi estado natural.',
    12: 'Pauso, observo y dejo que el universo revele su plan.',
    13: 'Dejo ir lo viejo sin miedo. La renovación ya está aquí.',
    14: 'La paciencia y la templanza son mis aliadas hoy.',
    15: 'Reconozco mis sombras y las transformo en sabiduría.',
    16: 'Lo que se rompe hoy abre paso a algo más verdadero.',
    17: 'La esperanza brilla en mí. El futuro es luminoso y bello.',
    18: 'Confío en mis sueños. La intuición me guía en la noche.',
    19: 'Me permito brillar. La alegría es mi verdadera naturaleza.',
    20: 'Escucho el llamado de mi alma y respondo con valentía.',
    21: 'He llegado. Celebro mis logros y me abro a lo que sigue.'
  };

  const rituals = {
    0:  'Da un pequeño paso hoy hacia algo que aún no has intentado. Anota en un papel qué te da miedo y luego quémalo simbólicamente.',
    1:  'Enciende una vela amarilla o naranja. Visualiza tu intención más poderosa y escríbela tres veces como si ya fuera realidad.',
    2:  'Dedica 10 minutos al silencio total. Pon tu mano en el corazón y pregúntate: ¿qué siento pero no me permito escuchar?',
    3:  'Lleva flores, fruta o algo hermoso a tu espacio hoy. Activa la energía de Venus agradeciendo tres cosas que tienes.',
    4:  'Organiza un espacio de tu vida que necesita estructura. Cada acción ordenada invoca la energía del Emperador.',
    5:  'Lee algo que te inspire espiritualmente o habla con alguien de mayor experiencia. Busca un mentor o maestro simbólico.',
    6:  'Escribe una carta de amor... a ti mismo. Menciona tres cosas que te gustan de quien eres hoy.',
    7:  'Establece una meta concreta para esta semana y el primer paso que darás hoy. La claridad atrae la victoria.',
    8:  'Haz ejercicio físico o una actividad que te dé sensación de fuerza. El cuerpo es el templo de tu poder interior.',
    9:  'Busca un momento de soledad consciente en la naturaleza. Camina lento, observa y agradece.',
    10: 'Escribe en papel qué ciclo sientes que está cerrando y qué deseas iniciar. Luego coloca el papel bajo una vela.',
    11: 'Examina una decisión pendiente con imparcialidad. Lista pros y contras y confía en tu criterio interno.',
    12: 'Haz una pausa voluntaria en un área donde llevas mucho tiempo esforzándote. A veces rendirse es sabiduría.',
    13: 'Libera un objeto, hábito o emoción que ya no te sirve. Regálalo, deshazte de él o simplemente di "gracias y adiós".',
    14: 'Bebe agua lentamente y con consciencia. Mezcla actividades: el arte y lo práctico. La moderación es magia.',
    15: 'Observa sin juzgar un patrón que sabes que repites. La consciencia ya es el inicio de la libertad.',
    16: 'Acepta que algo en tu vida está cambiando sin que tú lo controles. Escribe qué te liberaría si dejases de aferrarte.',
    17: 'Mira el cielo esta noche o pon fotos de estrellas cerca. Escribe tres deseos genuinos del corazón.',
    18: 'Antes de dormir, registra tus sueños en un cuaderno de luna. La luna te habla cuando te rindes.',
    19: 'Sal al sol si puedes. Ríe, canta o baila aunque sea un minuto. La alegría es la vibración más alta.',
    20: 'Escucha música que te mueva el alma. Pregúntate: ¿cuál es mi llamado más profundo? Anota lo primero que surja.',
    21: 'Celebra algo que hayas logrado. Incluso lo pequeño merece reconocimiento. Honra tu camino recorrido.'
  };

  // Override showExpressAdvice to add full reading
  const originalInit = window.initDailyExpressCardOverride;
  
  // We patch the showExpressAdvice function by watching for the info panel reveal
  const observer = new MutationObserver(() => {
    const info = document.getElementById('daily-express-info');
    const adviceEl = document.getElementById('daily-express-advice');
    const badgesEl = document.getElementById('daily-express-badges');
    const affirmEl = document.getElementById('daily-affirmation');
    const ritualEl = document.getElementById('daily-ritual-text');
    if (!info || !adviceEl || info.classList.contains('hidden')) return;
    
    // Find current card from the express state
    try {
      const saved = localStorage.getItem('tarot_daily_express');
      if (!saved) return;
      const state = JSON.parse(saved);
      const card = window.tarotDb.find(c => c.id === state.cardId);
      if (!card) return;
      
      // Populate badges
      if (badgesEl && badgesEl.children.length === 0) {
        const astro = ASTRO_MAP[card.id];
        const badges = [
          { icon: '🌟', label: 'Arcano ' + card.id },
          { icon: astro ? astro.symbol : '✦', label: astro ? astro.ruler : 'Cosmos' },
          { icon: '🔑', label: card.keyThemes }
        ];
        badges.forEach(b => {
          const span = document.createElement('span');
          span.className = 'daily-archetype-badge';
          span.textContent = `${b.icon} ${b.label}`;
          badgesEl.appendChild(span);
        });
      }
      
      // Populate affirmation
      if (affirmEl && !affirmEl.textContent.trim()) {
        affirmEl.textContent = affirmations[card.id] || affirmations[0];
      }
      
      // Populate ritual
      if (ritualEl && !ritualEl.textContent.trim()) {
        ritualEl.textContent = rituals[card.id] || rituals[0];
      }
    } catch(e) { /* silent */ }
  });
  
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

  // Also init yearly spread and natal card when daily tab opens
  const dailyTab = document.querySelector('[data-tab="daily"]');
  if (dailyTab) {
    dailyTab.addEventListener('click', () => {
      setTimeout(() => {
        initYearlySpread();
        initNatalCard();
      }, 100);
    });
  }
  // Init on load too
  setTimeout(() => {
    initYearlySpread();
    initNatalCard();
  }, 500);
})();

/* ==========================================================================
   MEJORA 5: Tirada de los 12 Meses y Arcano Guía del Año
   ========================================================================== */
const YEARLY_MONTHS_META = [
  { name: 'Enero', season: 'Invierno', seasonName: '❄️ Invierno: Siembra', element: 'Tierra / Inicio de Ciclo' },
  { name: 'Febrero', season: 'Invierno', seasonName: '❄️ Invierno: Purificación', element: 'Aire / Claridad Interior' },
  { name: 'Marzo', season: 'Primavera', seasonName: '🌸 Primavera: Despertar', element: 'Fuego / Impulso Vital' },
  { name: 'Abril', season: 'Primavera', seasonName: '🌸 Primavera: Brotes', element: 'Tierra / Enraizamiento' },
  { name: 'Mayo', season: 'Primavera', seasonName: '🌸 Primavera: Plenitud', element: 'Tierra / Placer y Arte' },
  { name: 'Junio', season: 'Verano', seasonName: '☀️ Verano: Expansión', element: 'Aire / Comunicación' },
  { name: 'Julio', season: 'Verano', seasonName: '☀️ Verano: Calor Emocional', element: 'Agua / Sentimientos Profundos' },
  { name: 'Agosto', season: 'Verano', seasonName: '☀️ Verano: Cosecha Solar', element: 'Fuego / Brillo y Pasión' },
  { name: 'Septiembre', season: 'Otoño', seasonName: '🍂 Otoño: Recolección', element: 'Tierra / Orden y Trabajo' },
  { name: 'Octubre', season: 'Otoño', seasonName: '🍂 Otoño: Balanza', element: 'Aire / Verdad y Justicia' },
  { name: 'Noviembre', season: 'Otoño', seasonName: '🍂 Otoño: Misterio', element: 'Agua / Muerte y Renacer' },
  { name: 'Diciembre', season: 'Invierno', seasonName: '❄️ Invierno: Cierre de Ciclo', element: 'Fuego / Luz en la Noche' }
];

function calculatePersonalYearArcana(birthdateStr, year) {
  if (!birthdateStr) {
    const digits = `${year}`.split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 22) {
      sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return sum === 22 ? 0 : sum;
  }

  const [bYear, bMonth, bDay] = birthdateStr.split('-').map(Number);
  const digits = `${bDay}${bMonth}${year}`.split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 22) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum === 22 ? 0 : sum;
}

function getYearlySpreadState(birthdateStr, selectedYear) {
  const year = Number(selectedYear) || new Date().getFullYear();
  let birthSeed = 0;
  let isPersonalized = false;

  if (birthdateStr) {
    const digits = birthdateStr.replace(/-/g, '').split('').map(Number);
    birthSeed = digits.reduce((a, b) => a + b, 0);
    isPersonalized = true;
  }

  const yearMasterId = calculatePersonalYearArcana(birthdateStr, year);
  const masterCard = window.tarotDb.find(c => c.id === yearMasterId);
  const masterAstro = ASTRO_MAP[yearMasterId] || { ruler: 'Cosmos', symbol: '✦', keywords: 'Fuerza universal' };

  const yearSeed = year * 100 + birthSeed;
  const currentMonthIdx = new Date().getMonth();
  const currentYearNum = new Date().getFullYear();

  const months = YEARLY_MONTHS_META.map((meta, idx) => {
    const seed = (yearSeed + idx * 7 + 13) % 22;
    const isReversed = ((yearSeed + idx * 3 + 5) % 7) === 0;
    const card = window.tarotDb.find(c => c.id === seed);
    const astro = ASTRO_MAP[seed] || { ruler: 'Cosmos', symbol: '✦', keywords: 'Fuerza universal' };
    const isCurrent = (year === currentYearNum && idx === currentMonthIdx);

    return {
      index: idx,
      name: meta.name,
      seasonName: meta.seasonName,
      element: meta.element,
      year: year,
      isCurrent: isCurrent,
      cardId: seed,
      cardName: card.name,
      isReversed: isReversed,
      keyThemes: card.keyThemes,
      astro: astro,
      general: isReversed ? card.reversed.general : card.meanings.general,
      love: isReversed ? card.reversed.love : card.meanings.love,
      work: isReversed ? card.reversed.work : card.meanings.work,
      advice: isReversed ? card.reversed.alchemy : card.meanings.advice
    };
  });

  return {
    year,
    isPersonalized,
    birthdateStr,
    masterId: yearMasterId,
    masterCard,
    masterAstro,
    months
  };
}

let activeYearlyState = null;

function initYearlySpread(force = false) {
  const grid = document.getElementById('yearly-spread-grid');
  if (!grid) return;

  const yearSelect = document.getElementById('yearly-select-year');
  const birthInput = document.getElementById('yearly-birthdate-sync');
  const recalcBtn = document.getElementById('yearly-recalculate-btn');
  const shareBtn = document.getElementById('yearly-share-btn');

  const selectedYear = yearSelect ? Number(yearSelect.value) : new Date().getFullYear();
  const savedBirth = localStorage.getItem('user_birthdate') || (birthInput ? birthInput.value : '');

  if (birthInput && savedBirth && !birthInput.value) {
    birthInput.value = savedBirth;
  }

  activeYearlyState = getYearlySpreadState(savedBirth, selectedYear);

  // 1. Renderizar Banner del Arcano Maestro del Año
  const banner = document.getElementById('yearly-master-arcana-banner');
  if (banner && activeYearlyState.masterCard) {
    const mc = activeYearlyState.masterCard;
    const ma = activeYearlyState.masterAstro;
    const isPers = activeYearlyState.isPersonalized;
    
    banner.innerHTML = `
      <div class="yearly-master-img" style="background-image: url('assets/card_${mc.id}.jpg');"></div>
      <div class="yearly-master-info">
        <span class="yearly-master-tag">${isPers ? '🌟 Tu Arcano Maestro del Año Personal' : '🔮 Arcano Maestro Colectivo'} ${activeYearlyState.year}</span>
        <h3 class="yearly-master-title">${mc.name} (Arcano ${mc.id})</h3>
        <p class="yearly-master-desc">
          <strong>Lección y Corriente Guía:</strong> ${mc.keyThemes}. ${mc.meanings.advice}
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="natal-num-pill">${ma.symbol} ${ma.ruler}</span>
          <span class="natal-num-pill purple">✨ ${mc.element}</span>
          <span class="natal-num-pill">🔑 ${ma.keywords}</span>
        </div>
      </div>
    `;
  }

  // 2. Renderizar Resumen de las 4 Estaciones Cósmicas
  const seasonsGrid = document.getElementById('yearly-seasons-summary');
  if (seasonsGrid) {
    const q1 = activeYearlyState.months.slice(0, 3).map(m => m.cardName).join(', ');
    const q2 = activeYearlyState.months.slice(3, 6).map(m => m.cardName).join(', ');
    const q3 = activeYearlyState.months.slice(6, 9).map(m => m.cardName).join(', ');
    const q4 = activeYearlyState.months.slice(9, 12).map(m => m.cardName).join(', ');

    seasonsGrid.innerHTML = `
      <div class="yearly-season-pill">
        <div class="yearly-season-name">❄️ T1 (Ene-Mar)</div>
        <div class="yearly-season-theme">Siembra y Claridad</div>
      </div>
      <div class="yearly-season-pill">
        <div class="yearly-season-name">🌸 T2 (Abr-Jun)</div>
        <div class="yearly-season-theme">Brote y Expansión</div>
      </div>
      <div class="yearly-season-pill">
        <div class="yearly-season-name">☀️ T3 (Jul-Sep)</div>
        <div class="yearly-season-theme">Plenitud y Cosecha</div>
      </div>
      <div class="yearly-season-pill">
        <div class="yearly-season-name">🍂 T4 (Oct-Dic)</div>
        <div class="yearly-season-theme">Balanza y Cierre</div>
      </div>
    `;
  }

  // 3. Renderizar Cuadrícula de los 12 Meses
  grid.innerHTML = '';
  activeYearlyState.months.forEach((m) => {
    const shortMeaning = m.general.length > 75 ? m.general.substring(0, 72) + '...' : m.general;
    
    const div = document.createElement('div');
    div.className = `yearly-month-card${m.isCurrent ? ' current-month' : ''}`;
    div.innerHTML = `
      ${m.isCurrent ? '<span class="yearly-current-badge">ESTE MES</span>' : ''}
      <div class="yearly-month-header-row">
        <span class="yearly-month-label">${m.name}</span>
        <span class="yearly-season-tag-mini">${m.seasonName.split(':')[0]}</span>
      </div>
      <div class="yearly-month-mini-card${m.isReversed ? ' reversed' : ''}" style="background-image: url('assets/card_${m.cardId}.jpg');"></div>
      <div class="yearly-month-card-name">${m.cardName}${m.isReversed ? ' ↺' : ''}</div>
      <div class="yearly-month-card-msg">${shortMeaning}</div>
    `;
    
    div.addEventListener('click', () => showMonthReading(m.index, activeYearlyState));
    grid.appendChild(div);
  });

  // Event listeners (una sola vez)
  if (yearSelect && !yearSelect.dataset.bound) {
    yearSelect.dataset.bound = 'true';
    yearSelect.addEventListener('change', () => {
      initYearlySpread(true);
    });
  }

  if (recalcBtn && !recalcBtn.dataset.bound) {
    recalcBtn.dataset.bound = 'true';
    recalcBtn.addEventListener('click', () => {
      if (birthInput && birthInput.value) {
        localStorage.setItem('user_birthdate', birthInput.value);
      }
      initYearlySpread(true);
    });
  }

  if (shareBtn && !shareBtn.dataset.bound) {
    shareBtn.dataset.bound = 'true';
    shareBtn.addEventListener('click', () => {
      if (!activeYearlyState) return;
      let text = `🌌 Mi Tirada del Año ${activeYearlyState.year} en Eco Estelar\n` +
        `🌟 Arcano Maestro: ${activeYearlyState.masterCard.name}\n\n`;

      activeYearlyState.months.forEach(m => {
        text += `🗓️ ${m.name} ${m.year}: ${m.cardName}${m.isReversed ? ' (Invertida)' : ''} ➔ ${m.general.substring(0, 60)}...\n`;
      });

      text += `\nConsulta tu Tirada de 12 Meses en: ${window.location.href}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          shareBtn.innerHTML = '<span>✅</span> ¡Guía Anual Copiada al Portapapeles!';
          setTimeout(() => {
            shareBtn.innerHTML = '<span>📋</span> Copiar la Guía Anual Completa';
          }, 2500);
        }).catch(() => {});
      }
    });
  }
}

function showMonthReading(monthIndex, yearlyState) {
  if (!yearlyState || !yearlyState.months[monthIndex]) return;

  const currentModal = document.getElementById('yearly-reading-modal');
  if (currentModal) currentModal.remove();

  const m = yearlyState.months[monthIndex];
  const astro = m.astro;

  const prevIdx = (monthIndex - 1 + 12) % 12;
  const nextIdx = (monthIndex + 1) % 12;
  const prevMonthName = yearlyState.months[prevIdx].name;
  const nextMonthName = yearlyState.months[nextIdx].name;

  const modal = document.createElement('div');
  modal.id = 'yearly-reading-modal';
  modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(4,3,10,0.88);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);animation:modal-zoom-in 0.3s ease;padding: 1rem; box-sizing: border-box;';
  
  modal.innerHTML = `
    <div style="background:rgba(13,11,26,0.98);border:1px solid rgba(229,193,88,0.35);border-radius:20px;padding:2.25rem 2rem;max-width:580px;width:100%;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 15px 50px rgba(0,0,0,0.7), 0 0 35px rgba(229,193,88,0.15);">
      
      <!-- Botón cerrar -->
      <button type="button" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:var(--text-muted);font-size:1.6rem;cursor:pointer;line-height:1;transition:color 0.2s;" onclick="this.closest('#yearly-reading-modal').remove()">×</button>
      
      <!-- Cabecera del Mes -->
      <div style="margin-bottom: 1.25rem;">
        <span style="font-size:0.75rem;color:var(--purple-color);letter-spacing:0.12em;text-transform:uppercase;font-weight:700;display:block;margin-bottom:0.25rem;">
          ${m.seasonName} · Mes ${monthIndex + 1} de 12
        </span>
        <h3 style="font-family:var(--font-serif);font-size:1.6rem;color:var(--gold-color);margin:0;letter-spacing:0.04em;">
          ${m.name} ${m.year}
        </h3>
      </div>

      <!-- Fila de Carta e Info Principal -->
      <div style="display:flex;gap:1.25rem;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;">
        <div style="width:100px;flex-shrink:0;aspect-ratio:2/3.3;background-image:url('assets/card_${m.cardId}.jpg');background-size:cover;background-position:center;border-radius:10px;transform:${m.isReversed ? 'rotate(180deg)' : 'none'};box-shadow:0 0 25px rgba(229,193,88,0.25);border:1px solid rgba(229,193,88,0.4);"></div>
        <div style="flex:1;min-width:200px;">
          <h4 style="font-family:var(--font-serif);font-size:1.25rem;color:var(--text-main);margin:0 0 0.35rem 0;">
            ${m.cardName} ${m.isReversed ? '— Energía Invertida' : '— Luz al Derecho'}
          </h4>
          <p style="font-size:0.85rem;color:var(--text-muted);margin:0 0 0.5rem 0;">
            ${astro.symbol} <strong>Regente:</strong> ${astro.ruler} · <strong>Elemento:</strong> ${m.element}
          </p>
          <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
            <span class="natal-num-pill" style="font-size:0.75rem;padding:0.2rem 0.65rem;">🔑 ${m.keyThemes}</span>
          </div>
        </div>
      </div>

      <!-- Desglose de Predicciones por Áreas -->
      <div style="display:flex;flex-direction:column;gap:1rem;margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.03);border-left:3px solid var(--gold-color);padding:0.85rem 1.1rem;border-radius:0 10px 10px 0;">
          <h5 style="color:var(--gold-color);font-size:0.92rem;margin:0 0 0.25rem 0;font-family:var(--font-sans);font-weight:700;">
            🌌 Clima General y Energía Evolutiva
          </h5>
          <p style="font-size:0.9rem;line-height:1.6;color:var(--text-main);margin:0;">
            ${m.general}
          </p>
        </div>

        <div style="background:rgba(255,255,255,0.03);border-left:3px solid #f472b6;padding:0.85rem 1.1rem;border-radius:0 10px 10px 0;">
          <h5 style="color:#f472b6;font-size:0.92rem;margin:0 0 0.25rem 0;font-family:var(--font-sans);font-weight:700;">
            💖 Amor y Vínculos
          </h5>
          <p style="font-size:0.9rem;line-height:1.6;color:var(--text-main);margin:0;">
            ${m.love}
          </p>
        </div>

        <div style="background:rgba(255,255,255,0.03);border-left:3px solid #38bdf8;padding:0.85rem 1.1rem;border-radius:0 10px 10px 0;">
          <h5 style="color:#38bdf8;font-size:0.92rem;margin:0 0 0.25rem 0;font-family:var(--font-sans);font-weight:700;">
            💼 Trabajo, Proyectos y Finanzas
          </h5>
          <p style="font-size:0.9rem;line-height:1.6;color:var(--text-main);margin:0;">
            ${m.work}
          </p>
        </div>

        <div style="background:rgba(255,255,255,0.03);border-left:3px solid var(--purple-color);padding:0.85rem 1.1rem;border-radius:0 10px 10px 0;">
          <h5 style="color:var(--purple-color);font-size:0.92rem;margin:0 0 0.25rem 0;font-family:var(--font-sans);font-weight:700;">
            🗝️ Consejo del Oráculo
          </h5>
          <p style="font-size:0.9rem;line-height:1.6;color:var(--text-main);margin:0;">
            ${m.advice}
          </p>
        </div>
      </div>

      <!-- Barra de Navegación entre Meses -->
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:1rem;border-top:1px solid var(--border-color);gap:0.5rem;flex-wrap:wrap;">
        <button type="button" id="prev-month-modal-btn" class="consult-button" style="padding:0.5rem 1rem;font-size:0.82rem;">
          ◀ ${prevMonthName}
        </button>
        <span style="font-size:0.8rem;color:var(--text-muted);">${monthIndex + 1} / 12</span>
        <button type="button" id="next-month-modal-btn" class="consult-button" style="padding:0.5rem 1rem;font-size:0.82rem;">
          ${nextMonthName} ▶
        </button>
      </div>

    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  const prevBtn = modal.querySelector('#prev-month-modal-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showMonthReading(prevIdx, yearlyState);
    });
  }

  const nextBtn = modal.querySelector('#next-month-modal-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showMonthReading(nextIdx, yearlyState);
    });
  }
}

/* ==========================================================================
   MEJORA 6: Arcano Natal Enriquecido (Enciclopedia y Tríada Sagrada del Tarot)
   ========================================================================== */
const NATAL_ARCANA_DB = {
  0: { // El Loco
    name: "El Loco",
    number: "0 / XXII",
    element: "Aire / Éter Cósmico",
    planet: "Urano",
    crystal: "Cuarzo Transparente / Aguamarina",
    powerColor: "Amarillo Radiante y Blanco",
    soulMission: "Tu alma encarnó para ser un faro de libertad, innovación y ruptura de viejos paradigmas. Has venido a recordar al mundo que la vida es una aventura sagrada y que el verdadero crecimiento surge cuando confiamos en lo desconocido y damos saltos de fe con inocencia, alegría y corazón abierto.",
    innateGifts: "Espontaneidad magnética, optimismo inagotable, capacidad innata de empezar de cero sin rencores, visión sin prejuicios y un coraje genuino para explorar caminos donde nadie más se atreve a caminar.",
    karmicShadow: "La trampa de la irresponsabilidad, la inconstancia o la huida crónica de los compromisos afectivos y materiales por miedo a perder tu libertad. Tu gran aprendizaje es entender que el compromiso consciente no aprisiona, sino que expande tu propósito.",
    loveAndVocation: "En el amor necesitas una pareja que vuele a tu lado sin jaulas, basada en la complicidad y el respeto al espacio mutuo. En lo profesional destacas como emprendedor, artista vanguardista, filósofo, creador de contenido disruptivo o impulsor de nuevas tendencias.",
    lifeMantra: "'Soy un alma libre, pura y soberana. Camino con fe absoluta en el universo y me abro a la magia infinita de la vida.'"
  },
  1: { // El Mago
    name: "El Mago",
    number: "I (1)",
    element: "Aire / Fuego Mental",
    planet: "Mercurio",
    crystal: "Citrino / Pirita / Ojo de Tigre",
    powerColor: "Amarillo Dorado y Rojo Rubí",
    soulMission: "Tu misión de vida es la maestría de la manifestación consciente. Encarnaste como un puente vivo entre el cielo y la tierra, con el propósito sagrado de convertir ideas abstractas e ilusiones en realidades tangibles, prósperas y útiles para el colectivo.",
    innateGifts: "Elocuencia brillante, ingenio rápido, habilidad comunicativa excepcional, versatilidad para dominar múltiples disciplinas y un magnetismo persuasivo capaz de inspirar y liderar proyectos.",
    karmicShadow: "La tentación de la manipulación, el síndrome del impostor o la dispersión mental por querer abarcar demasiados proyectos sin concluir ninguno. Tu desafío es la integridad absoluta de la palabra y el enfoque disciplinado.",
    loveAndVocation: "En el amor buscas mentes brillantes con las que puedas dialogar, crear proyectos compartidos y debatir con ingenio. En lo laboral destacas en comunicación, ventas, tecnología, psicología, liderazgo empresarial, docencia y diseño estratégico.",
    lifeMantra: "'Dispongo de todas las herramientas para triunfar. Mis pensamientos, palabras y acciones crean milagros reales.'"
  },
  2: { // La Sacerdotisa / La Papisa
    name: "La Sacerdotisa",
    number: "II (2)",
    element: "Agua / Éter Místico",
    planet: "La Luna",
    crystal: "Piedra Luna / Selenita / Amatista",
    powerColor: "Azul Índigo y Plata",
    soulMission: "Tu alma es custodia de los misterios invisibles, la memoria ancestral y la sabiduría intuitiva. Has venido a este plano a enseñar el valor del silencio, la escucha interior, la diplomacia sutil y la sanación profunda a través del conocimiento oculto y la empatía.",
    innateGifts: "Percepción extrasensorial profunda, sexto sentido certero, capacidad innata para descifrar secretos y motivaciones ajenas, serenidad pacificadora y un talento natural para la investigación y el estudio.",
    karmicShadow: "El aislamiento defensivo, la frialdad emocional, guardar secretos que envenenan los vínculos o juzgar con severidad silenciosa. Tu lección es abrir el corazón y compartir tu sabiduría sin miedo a ser herida.",
    loveAndVocation: "En las relaciones buscas conexiones de alma profundas, místicas y leales; te resulta insoportable la superficialidad. En lo profesional brillas en psicología, investigación, tarot y astrología, escritura, archivística, medicina holística y asesoría estratégica confidencial.",
    lifeMantra: "'Mi intuición es sabia y certera. En mi silencio interior escucho la voz sagrada del cosmos.'"
  },
  3: { // La Emperatriz
    name: "La Emperatriz",
    number: "III (3)",
    element: "Tierra Fértil / Agua Creadora",
    planet: "Venus",
    crystal: "Cuarzo Rosa / Esmeralda / Jade Verde",
    powerColor: "Verde Esmeralda y Rosa Cuarzo",
    soulMission: "Encarnaste como canal viva de la abundancia, la fertilidad creadora y el amor incondicional. Tu propósito es embellecer el mundo, nutrir los sueños de quienes te rodean y manifestar prosperidad material y afectiva a través del arte, la calidez y el deleite sensorial.",
    innateGifts: "Creatividad desbordante, carisma arrollador, elegancia natural, don para hacer florecer cualquier proyecto o negocio y una capacidad maternal/nutricia que reconforta a cualquier alma afligida.",
    karmicShadow: "El apego posesivo, el drama emocional, la vanidad o la dependencia de la aprobación externa. Tu gran prueba kármica es recordar que tu valor propio es infinito y no depende de lo que des a los demás.",
    loveAndVocation: "En el amor eres apasionado, generoso y muy afectuoso; necesitas romance, caricias y deleite compartido. En lo profesional triunfas en diseño, arte, gastronomía, eventos, medicina, relaciones públicas, estética, moda y dirección creativa.",
    lifeMantra: "'Soy un imán vivo de abundancia, belleza y amor. Todo lo que toco con mi amor florece en prosperidad.'"
  },
  4: { // El Emperador
    name: "El Emperador",
    number: "IV (4)",
    element: "Fuego Terrenal / Estructura",
    planet: "Aries / Marte",
    crystal: "Jaspe Rojo / Hematita / Granate",
    powerColor: "Rojo Escarlata y Dorado Solar",
    soulMission: "Tu misión de vida es ser el arquitecto de la estabilidad, el orden y la justicia protectora. Has venido a crear estructuras seguras, liderar con rectitud inquebrantable y convertir el caos en imperios prósperos y duraderos para tu familia y comunidad.",
    innateGifts: "Liderazgo nato, capacidad estratégica y ejecutiva excepcional, resiliencia ante la presión, lealtad a toda prueba y un sentido del deber y la organización envidiables.",
    karmicShadow: "La rigidez mental, el autoritarismo, el miedo a mostrar vulnerabilidad o la dificultad para delegar y perdonar errores. Tu maestría reside en comprender que la fuerza más sublime es flexible como el bambú.",
    loveAndVocation: "En el amor ofreces protección, lealtad incondicional y seguridad duradera; valoras la honestidad y los proyectos de vida compartidos. En el trabajo destacas en alta dirección, leyes, ingeniería, arquitectura, gestión patrimonial y fuerzas de orden o gobierno.",
    lifeMantra: "'Gobierno mi vida con orden, fuerza y nobleza. Construyo un legado sólido de paz y prosperidad.'"
  },
  5: { // El Sumo Sacerdote / El Papa
    name: "El Sumo Sacerdote",
    number: "V (5)",
    element: "Tierra / Aire Espiritual",
    planet: "Tauro / Quirón",
    crystal: "Lapislázuli / Sodalita / Zafiro",
    powerColor: "Azul Real y Púrpura Imperial",
    soulMission: "Tu alma es un puente sagrado de transmisión ética, enseñanza y unión espiritual. Tu propósito es tender puentes entre la tradición ancestral y las nuevas conciencias, guiando a otros a través del consejo sabio, la educación y la búsqueda del sentido trascendental.",
    innateGifts: "Vocación pedagógica innata, capacidad para mediar en conflictos con ecuanimidad, oratoria inspiradora, don de consejo y un respeto profundo por los valores humanistas.",
    karmicShadow: "El dogmatismo inflexible, la intolerancia ante quienes piensan distinto o la hipocresía moral. Tu desafío evolutivo es cuestionar tus propios paradigmas y respetar el camino individual de cada alma.",
    loveAndVocation: "En el amor valoras la lealtad, los valores compartidos y el crecimiento intelectual y espiritual en pareja. En lo laboral destacas en docencia universitaria, abogacía, mediación, filosofía, psicoterapia, asesoría espiritual y dirección institucional.",
    lifeMantra: "'Enseño con el ejemplo y aprendo con humildad. Mi corazón es un templo de sabiduría y tolerancia.'"
  },
  6: { // Los Enamorados
    name: "Los Enamorados",
    number: "VI (6)",
    element: "Aire / Conexión Cósmica",
    planet: "Géminis",
    crystal: "Rodocrosita / Aventurina Verde / Ágata",
    powerColor: "Rosa Pastel, Celeste y Esmeralda",
    soulMission: "Tu propósito es aprender y enseñar el arte sagrado de la elección consciente desde el corazón. Has venido a unir polaridades, celebrar la belleza de los vínculos humanos y demostrar que el amor auténtico es la fuerza más transformadora del universo.",
    innateGifts: "Sensibilidad estética exquisita, empatía vincular, carisma magnético, diplomacia pacificadora y un talento único para conectar a personas y crear alianzas fértiles.",
    karmicShadow: "La indecisión crónica, el miedo al compromiso profundo por terror a perder otras opciones o la dependencia emocional. Tu gran maestría es aprender a decir 'sí' desde tu verdad interior sin titubeos.",
    loveAndVocation: "Para ti el amor es el eje central de tu existencia; buscas una comunión de almas con pasión, respeto y diálogo constante. En lo profesional brillas en diseño, diplomacia, psicología de parejas, marketing de moda, artes visuales y coaching de relaciones.",
    lifeMantra: "'Elijo siempre desde el amor más puro. Mis vínculos son espejos de luz y crecimiento espiritual.'"
  },
  7: { // El Carro
    name: "El Carro",
    number: "VII (7)",
    element: "Agua / Fuego de Victoria",
    planet: "Cáncer / Marte",
    crystal: "Ojo de Halcón / Malaquita / Ámbar",
    powerColor: "Dorado Brillante y Amarillo Eléctrico",
    soulMission: "Tu misión de vida es la victoria sobre la adversidad mediante la autodeterminación y el dominio de las emociones. Has encarnado para ser un pionero imparable, superando cualquier límite y demostrando que la disciplina enfocada conquista cualquier horizonte.",
    innateGifts: "Fuerza de voluntad inquebrantable, rapidez mental para resolver crisis, capacidad para liderar bajo presión y un instinto ganador que convierte obstáculos en trampolines.",
    karmicShadow: "La impaciencia desmedida, el atropello a los sentimientos ajenos en la prisa por triunfar o la agresividad ante los retrasos. Tu lección es comprender que la pausa también forma parte de la estrategia victoriosa.",
    loveAndVocation: "En el amor necesitas a alguien independiente y apasionado que comparta tu ritmo de vida dinámico y no tema a tus ambiciones. En el plano laboral destacas en transporte, comercio internacional, deportes de élite, tecnología innovadora y emprendimientos de alto impacto.",
    lifeMantra: "'Tengo el timón de mi destino. Avanzo con coraje, foco y maestría hacia el triunfo de mis sueños.'"
  },
  8: { // La Justicia
    name: "La Justicia",
    number: "VIII (8)",
    element: "Aire / Balanza Kármica",
    planet: "Libra / Saturno",
    crystal: "Turmalina Negra / Obsidiana / Fluorita",
    powerColor: "Blanco Puro y Azul Cobalto",
    soulMission: "Tu misión es ser guardián de la verdad, el equilibrio kármico y la honestidad radical. Has venido a restablecer el orden ético, disolver el autoengaño en tu entorno y enseñar que toda causa engendra un efecto ineludible en el tejido cósmico.",
    innateGifts: "Mente analítica brillante, objetividad intachable, capacidad para tomar decisiones difíciles sin titubear, discernimiento moral y serenidad ante el caos.",
    karmicShadow: "La severidad implacable, el perfeccionismo paralizante, la frialdad o la dificultad para perdonarte a ti mismo y a los demás. Tu desafío es integrar la compasión y la ternura en tus juicios.",
    loveAndVocation: "En tus relaciones exiges honestidad total, equidad y respeto mutuo; no toleras mentiras ni manipulaciones. En lo profesional destacas en leyes, auditoría, arbitraje, bioética, consultoría de calidad, contabilidad y magistratura.",
    lifeMantra: "'Camino en la verdad y la equidad divina. Cosecho con serenidad y gratitud los frutos de mis buenas intenciones.'"
  },
  9: { // El Ermitaño
    name: "El Ermitaño",
    number: "IX (9)",
    element: "Tierra / Fuego Interior",
    planet: "Virgo / Mercurio Retrógrado",
    crystal: "Cuarzo Ahumado / Labradorita / Ágata Musgosa",
    powerColor: "Gris Perla, Ocre y Azul Noche",
    soulMission: "Tu alma es un faro de introspección, prudencia y sabiduría milenaria. Tu propósito vital es explorar las profundidades del conocimiento humano y espiritual, encender tu propia lámpara en la soledad fecunda y alumbrar el sendero para las generaciones venideras.",
    innateGifts: "Madurez precoz, capacidad profunda de análisis y reflexión, independencia emocional, discreción absoluta y una intuición filosófica única.",
    karmicShadow: "El aislamiento amargado, el escepticismo destructivo o creer que nadie puede comprender tu mundo interior. Tu lección es recordar que la luz de tu lámpara debe ser compartida para que cumpla su cometido divino.",
    loveAndVocation: "En el amor buscas un compañero maduro con quien compartir silencios cómplices, intimidad espiritual y respeto absoluto por la soledad de cada uno. En lo profesional brillas en investigación científica, escritura, arqueología, psicología profunda, archivística y asesoría filosófica.",
    lifeMantra: "'Llevo mi propia luz en la noche. En mi silencio interior descubro la verdad que libera mi alma.'"
  },
  10: { // La Rueda de la Fortuna
    name: "La Rueda de la Fortuna",
    number: "X (10)",
    element: "Fuego / Giro del Destino",
    planet: "Júpiter",
    crystal: "Pirita / Ojo de Tigre / Aventurina Naranja",
    powerColor: "Dorado Solar, Naranja y Púrpura",
    soulMission: "Tu misión de vida es dominar el arte de fluir con los ciclos del destino, la sincronicidad cósmica y la adaptabilidad. Has venido a enseñar a la humanidad que nada es estático y que la verdadera fortuna reside en reinventarse con optimismo ante cada giro vital.",
    innateGifts: "Visión para detectar oportunidades antes que nadie, resiliencia asombrosa para renacer de las crisis, optimismo contagioso y una sintonía especial con la suerte y el azar.",
    karmicShadow: "El fatalismo ('todo es culpa de la mala suerte'), la ludopatía o la pereza esperando que el destino resuelva lo que te corresponde hacer con tu propio esfuerzo.",
    loveAndVocation: "En el amor experimentas relaciones kármicas intensas y transformadoras; necesitas una pareja adaptable que disfrute de los viajes y cambios de vida. En el trabajo destacas en bolsa, inversiones, comercio global, marketing digital, producción de eventos y turismo.",
    lifeMantra: "'Acepto con sabiduría los giros del destino. Conduzco la rueda de mi vida hacia la abundancia y la dicha.'"
  },
  11: { // La Fuerza
    name: "La Fuerza",
    number: "XI (11)",
    element: "Fuego / Amor Transformador",
    planet: "Leo / Sol",
    crystal: "Cornalina / Rubí / Granate Rojo",
    powerColor: "Rojo Pasión, Dorado y Naranja",
    soulMission: "Tu misión es demostrar la soberanía del amor sobre el instinto salvaje. Has venido a sanar heridas emocionales profundas a través de la dulzura, la paciencia infinita y el coraje sereno, demostrando que la ternura desarma a cualquier león rugiente.",
    innateGifts: "Poder de convicción amoroso, resistencia física y anímica colosal, magnetismo apasionado, don para pacificar conflictos y una generosidad sin límites.",
    karmicShadow: "La represión de las emociones viscerales hasta explotar en ira ciega, o el desgaste por intentar salvar o controlar a personas destructivas.",
    loveAndVocation: "En tus relaciones entregas una pasión arrolladora y lealtad inquebrantable; necesitas reciprocidad profunda y respeto por tu fuego. En lo profesional brillas en veterinaria, rescate de fauna, medicina intensiva, defensa de derechos humanos, psicoterapia corporal y artes escénicas.",
    lifeMantra: "'Mi fuerza suprema es el amor y la serenidad. Domo cualquier tormenta con la nobleza de mi espíritu.'"
  },
  12: { // El Colgado
    name: "El Colgado",
    number: "XII (12)",
    element: "Agua / Éter de Iluminación",
    planet: "Neptuno",
    crystal: "Aguamarina / Celestina / Cuarzo Azul",
    powerColor: "Azul Turquesa y Verde Agua",
    soulMission: "Tu alma encarnó para romper la visión materialista del mundo mediante una nueva perspectiva espiritual. Tu propósito es enseñar el valor de la pausa sagrada, el desapego consciente del ego y la entrega generosa al flujo superior del universo.",
    innateGifts: "Capacidad para ver soluciones donde otros solo ven callejones sin salida, empatía infinita, talento artístico y visionario, y una paciencia mística extraordinaria.",
    karmicShadow: "El victimismo ('siempre me sacrifico por todos y nadie me lo agradece'), la parálisis ante la acción o permanecer en situaciones tóxicas por resignación pasiva.",
    loveAndVocation: "En el amor eres profundamente devoto, romántico y comprensivo; debes cuidar no atraer parejas dependientes. En lo profesional destacas en artes visuales, fotografía, composición musical, yoga y meditación, trabajo social y labores humanitarias.",
    lifeMantra: "'En la pausa sagrada encuentro la iluminación. Suelto el control y miro el mundo con ojos de paz.'"
  },
  13: { // La Muerte / El Arcano XIII
    name: "La Muerte (La Transformación)",
    number: "XIII (13)",
    element: "Agua Fija / Alquimia Profunda",
    planet: "Escorpio / Plutón",
    crystal: "Obsidiana Nevada / Turmalina Negra / Malaquita",
    powerColor: "Negro Profundo, Blanco y Borgoña",
    soulMission: "Tu alma es un catalizador vivo de renacimiento y purificación. Tu misión es ayudar a personas y sistemas a cerrar ciclos agotados, superar duelos y podar lo obsoleto para que la verdadera esencia luminosa pueda renacer con fuerza invencible.",
    innateGifts: "Resiliencia sobrehumana para reconstruirte tras cualquier crisis, intuición psicológica quirúrgica, honestidad radical y la capacidad de regenerar cualquier entorno degradado.",
    karmicShadow: "El miedo visceral al cambio que te lleva a aferrarte a relaciones o trabajos tóxicos ya muertos, o la frialdad destructiva cuando te sientes traicionado.",
    loveAndVocation: "En el amor buscas fusiones de alma completas, transformadoras y leales; las relaciones a medias tintas no tienen cabida en tu vida. En lo laboral destacas en cirugía, psiquiatría profunda, gestión de crisis corporativas, reciclaje ecológico, tanatología y bioenergética.",
    lifeMantra: "'Dejo ir con gratitud lo que cumplió su ciclo. Renazco más sabio, libre y luminoso en cada instante.'"
  },
  14: { // La Templanza
    name: "La Templanza",
    number: "XIV (14)",
    element: "Fuego / Agua Alquímica",
    planet: "Sagitario / Venus",
    crystal: "Amatista / Angelita / Cuarzo Verde",
    powerColor: "Azul Celeste, Violeta y Oro Suave",
    soulMission: "Tu propósito vital es ser un puente de sanación, armonía y alquimia entre opuestos. Has encarnado para calmar las aguas turbulentas del mundo, mediar entre culturas o posturas irreconciliables y enseñar la belleza del equilibrio y la moderación.",
    innateGifts: "Don innato de sanación energética y emocional, diplomacia exquisita, capacidad para mezclar talentos diversos y una paz interior contagiosa.",
    karmicShadow: "La pasividad ante abusos por miedo al conflicto, la postergación de decisiones cruciales o la tendencia a los excesos cuando pierdes tu centro.",
    loveAndVocation: "En tus relaciones buscas paz, ternura, complicidad serena y crecimiento mutuo sin sobresaltos dramáticos. En lo laboral triunfas en mediación diplomática, farmacia holística, medicina integrativa, psicología comunitaria, enología y química verde.",
    lifeMantra: "'Soy un canal de paz y sanación divina. La armonía fluye en mi mente, mi cuerpo y mis relaciones.'"
  },
  15: { // El Diablo
    name: "El Diablo",
    number: "XV (15)",
    element: "Tierra / Fuego Instintivo",
    planet: "Capricornio / Plutón",
    crystal: "Obsidiana Negra / Ojo de Tigre / Granate",
    powerColor: "Rojo Carmesí y Negro Azabache",
    soulMission: "Tu alma encarnó para dominar y transmutar las fuerzas de la materia, la ambición, el deseo y la sombra inconsciente. Tu misión es desvelar los mecanismos de manipulación y adicción para enseñar a otros la verdadera libertad y soberanía espiritual.",
    innateGifts: "Magnetismo personal irresistible, capacidad colosal para generar riqueza material, astucia estratégica y un conocimiento visceral de la psique humana.",
    karmicShadow: "La codicia material, la manipulación emocional, las adicciones o el miedo a perder el control sobre los demás. Tu prueba de fuego es usar tu inmenso poder para empoderar al colectivo en lugar de encadenarlo.",
    loveAndVocation: "En el amor eres magnético, sensual y apasionado; tu camino es aprender a amar desde la libertad mutua y no desde el apego posesivo. En lo profesional brillas en finanzas de alto nivel, política, leyes corporativas, negocios de gran escala, psicología forense y dirección de espectáculos.",
    lifeMantra: "'Reconozco mi poder terrenal y lo pongo al servicio de la luz. Soy soberano y libre de toda atadura.'"
  },
  16: { // La Torre
    name: "La Torre",
    number: "XVI (16)",
    element: "Fuego / Aire del Rayo",
    planet: "Marte / Urano",
    crystal: "Lepidolita / Cuarzo Ahumado / Pirita",
    powerColor: "Rojo Fuego, Gris Tormenta y Amarillo Rayo",
    soulMission: "Tu propósito es ser un liberador de almas aprisionadas en estructuras falsas y mentiras reconfortantes. Has venido a destruir el ego ilusorio, sacudir zonas de confort asfixiantes y demostrar que la verdad más cruda es mil veces más sagrada que una jaula dorada.",
    innateGifts: "Valentía inaudita ante las crisis repentinas, lucidez para detectar la hipocresía institucional, capacidad de reinvención fulgurante y un dinamismo renovador.",
    karmicShadow: "La resistencia desesperada ante lo inevitable que prolonga el dolor, o provocar rupturas y conflictos innecesarios por pura intolerancia.",
    loveAndVocation: "En tus relaciones necesitas autenticidad absoluta y constante evolución; las mentiras o apariencias destruyen el vínculo de inmediato. En lo profesional destacas en demolición y arquitectura reconstructiva, gestión de emergencias, periodismo de investigación, cirugía de urgencias y reestructuración empresarial.",
    lifeMantra: "'Abrazo la verdad que me libera. Sobre los escombros de lo falso construyo mi grandeza eterna.'"
  },
  17: { // La Estrella
    name: "La Estrella",
    number: "XVII (17)",
    element: "Aire / Agua Celestial",
    planet: "Acuario / Venus",
    crystal: "Aguamarina / Amazonita / Cuarzo Cristal",
    powerColor: "Azul Turquesa, Plata y Verde Menta",
    soulMission: "Tu misión de vida es ser un faro viviente de esperanza, inspiración cósmica y generosidad desinteresada. Has venido a recordar a la humanidad que después de cada tormenta el cielo se llena de estrellas, y que la fe en el futuro es la semilla de todos los milagros.",
    innateGifts: "Transparencia de alma, creatividad artística sublime, optimismo visionario, magnetismo pacificador y una conexión directa con las energías sutiles del universo.",
    karmicShadow: "El desánimo por idealismo excesivo ('el mundo es demasiado cruel'), la desconexión con la realidad práctica o dar tanto a otros que quedas desprotegido.",
    loveAndVocation: "En el amor buscas un alma afín con la que compartir ideales nobles, arte y ternura cristalina. En lo laboral destacas en artes, ecología, astronomía, humanitarismo, diseño del futuro, terapias de sanación y comunicación inspiracional.",
    lifeMantra: "'Mi esperanza es firme y mi destino es luminoso. Irradio bendiciones, belleza y paz en cada paso.'"
  },
  18: { // La Luna
    name: "La Luna",
    number: "XVIII (18)",
    element: "Agua / Mareas Subconscientes",
    planet: "Piscis / La Luna",
    crystal: "Piedra Luna / Labradorita / Selenita",
    powerColor: "Plata Lunar, Azul Marino y Blanco Perla",
    soulMission: "Tu alma es exploradora de los abismos del subconsciente, los sueños premonitorios y la memoria emocional colectiva. Tu misión es navegar en la oscuridad con la brújula de la intuición y rescatar perlas de sabiduría oculta para transformarlas en arte y sanación.",
    innateGifts: "Mediumnidad e intuición psíquica hiperdesarrollada, imaginación poética deslumbrante, capacidad para conectar con el dolor ajeno y talento para el misticismo.",
    karmicShadow: "La paranoia, los celos imaginarios, la confusión mental o dejarte paralizar por miedos ancestrales irracionales. Tu desafío es anclar tus pies a la tierra y distinguir la intuición pura del espejismo del ego.",
    loveAndVocation: "En el amor eres intensamente sensible y devoto; necesitas una pareja sólida que te ofrezca seguridad y contención emocional. En lo profesional brillas en psicología analítica, interpretación de sueños, poesía, cine fantástico, música ambiental, astrología y tarot.",
    lifeMantra: "'Navego mis mareas con serenidad y lucidez. La luz divina de mi intuición disuelve cualquier temor.'"
  },
  19: { // El Sol
    name: "El Sol",
    number: "XIX (19)",
    element: "Fuego Radiante / Luz Vital",
    planet: "El Sol / Leo",
    crystal: "Citrino / Piedra Sol / Ámbar Dorado",
    powerColor: "Amarillo Oro, Blanco Brillante y Naranja",
    soulMission: "Tu propósito sagrado es irradiar alegría, calidez, vitalidad y éxito en todas las direcciones. Encarnaste para iluminar los rincones oscuros del mundo con tu entusiasmo contagioso, celebrar la fraternidad humana y liderar desde la generosidad y el gozo de vivir.",
    innateGifts: "Carisma irresistible, alegría de vivir natural, claridad mental meridiana, liderazgo cálido y un talento innato para el éxito y la prosperidad en todo lo que emprendes.",
    karmicShadow: "La vanidad, el egocentrismo, el orgullo herido o quemar a los demás con actitudes dominantes. Tu maestría es recordar que el verdadero sol alumbra a todos por igual sin vanagloriarse.",
    loveAndVocation: "En el amor entregas calidez, lealtad radiante y alegría compartida; necesitas una relación transparente donde ambos brillen con luz propia. En lo profesional destacas en docencia infantil, dirección de empresas, artes escénicas, liderazgo comunitario, recreación y emprendimientos solares.",
    lifeMantra: "'Yo soy luz, alegría y éxito abundante. Todo lo que ilumino con mi presencia se llena de dicha y bendición.'"
  },
  20: { // El Juicio
    name: "El Juicio",
    number: "XX (20)",
    element: "Fuego / Aire del Clarín Cósmico",
    planet: "Plutón / Mercurio Superior",
    crystal: "Moldavita / Amatista / Cuarzo Rutilado",
    powerColor: "Púrpura Místico, Dorado y Blanco",
    soulMission: "Tu misión de vida es responder y despertar al llamado superior de la conciencia. Has venido a este mundo a romper cadenas kármicas ancestrales, promover el perdón liberador y resucitar proyectos y almas que parecían perdidos para integrarlos a una nueva dimensión espiritual.",
    innateGifts: "Claridad vocacional implacable, don de absolución y perdón, oratoria que despierta conciencias dormidas y una visión global de los propósitos cósmicos.",
    karmicShadow: "La autocrítica destructiva, vivir atrapado en culpas pasadas o juzgar a la familia con resentimiento. Tu desafío evolutivo es concederte el perdón incondicional y renacer en libertad.",
    loveAndVocation: "En tus relaciones buscas vínculos maduros basados en la sinceridad, la evolución mutua y la capacidad de perdonar y reinventarse. En el plano laboral destacas en vocaciones de servicio público, abogacía de causas nobles, medicina regenerativa, psicoterapia transpersonal y liderazgo ético.",
    lifeMantra: "'Escucho el llamado de mi alma y despierto a mi grandeza. Me perdono, me libero y renazco en plenitud.'"
  },
  21: { // El Mundo
    name: "El Mundo",
    number: "XXI (21)",
    element: "Tierra Integrada / Cuatro Elementos",
    planet: "Saturno / Todo el Zodíaco",
    crystal: "Diamante / Zafiro Estrella / Cuarzo Arcoíris",
    powerColor: "Dorado Cósmico, Verde Esmeralda y Violeta",
    soulMission: "Tu alma encarnó para alcanzar la consumación y maestría de la existencia terrenal y espiritual. Tu propósito es integrar todos tus talentos, expandir tus horizontes más allá de fronteras geográficas o culturales y celebrar la danza cósmica de la totalidad y el éxito universal.",
    innateGifts: "Visión global y cosmopolita, capacidad para culminar proyectos monumentales con éxito, sabiduría integral y una sensación de estar en el lugar correcto en el momento exacto.",
    karmicShadow: "El miedo a concluir etapas por no saber qué vendrá después, el perfeccionismo paralizante o la visión estrecha por temor a salir de tu entorno seguro.",
    loveAndVocation: "En el amor experimentas una plenitud armónica; disfrutas de parejas internacionales, viajes compartidos y enriquecimiento cultural continuo. En lo profesional brillas en diplomacia global, comercio exterior, grandes corporaciones internacionales, artes universales, antropología y ecología planetaria.",
    lifeMantra: "'Habito mi plenitud absoluta. Danzo en perfecta armonía con el universo y celebro el triunfo de mi camino.'"
  }
};

function calculateTarotNatalProfile(birthdateStr) {
  if (!birthdateStr) return null;
  const [year, month, day] = birthdateStr.split('-').map(Number);
  
  const digits = `${day}${month}${year}`.split('').map(Number);
  let sum1 = digits.reduce((a, b) => a + b, 0);
  let steps = [`${day}/${month}/${year} ➔ Dígitos: ${digits.join('+')} = ${sum1}`];
  
  let principalId = sum1;
  while (principalId > 22) {
    const subDigits = principalId.toString().split('').map(Number);
    principalId = subDigits.reduce((a, b) => a + b, 0);
    steps.push(`Reducción: ${subDigits.join('+')} = ${principalId}`);
  }
  
  const arcanoPrincipalId = (principalId === 22) ? 0 : principalId;

  let dayNum = day;
  if (dayNum > 22) {
    dayNum = day.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  const arcanoDonId = (dayNum === 22) ? 0 : dayNum;

  let shadowId = (22 - (arcanoPrincipalId === 0 ? 22 : arcanoPrincipalId));
  if (shadowId === 22 || shadowId === 0) shadowId = 0;

  return {
    birthdateStr,
    day, month, year,
    steps,
    calcFormula: steps.join(' ➔ '),
    principalId: arcanoPrincipalId,
    donId: arcanoDonId,
    shadowId: shadowId
  };
}

function initNatalCard() {
  const btn = document.getElementById('natal-reveal-btn');
  const result = document.getElementById('natal-card-result');
  if (!btn || result.dataset.initialized) return;
  result.dataset.initialized = 'true';

  let currentProfile = null;
  let activeDisplayCardId = null;

  function renderNatalProfile(cardId, isTriadSelect = false) {
    const card = window.tarotDb.find(c => c.id === cardId);
    const natal = NATAL_ARCANA_DB[cardId];
    if (!card || !natal) return;

    activeDisplayCardId = cardId;

    // 1. Imagen y Encabezado Hero
    const imgEl = document.getElementById('natal-card-img');
    if (imgEl) imgEl.style.backgroundImage = `url('assets/card_${card.id}.jpg')`;

    const numEl = document.getElementById('natal-life-number');
    if (numEl) numEl.textContent = `Arcano ${natal.number}`;

    const nameEl = document.getElementById('natal-card-name');
    if (nameEl) nameEl.textContent = card.name;

    // 2. Desglose de Cálculo
    const calcEl = document.getElementById('natal-calc-badge');
    if (calcEl && currentProfile) {
      calcEl.innerHTML = `🧮 <strong>Fórmula de Reducción Sagrada:</strong> ${currentProfile.calcFormula}`;
    }

    // 3. Badges de Correspondencias
    const pillsEl = document.getElementById('natal-pills');
    if (pillsEl) {
      pillsEl.innerHTML = `
        <span class="natal-num-pill">🪐 ${natal.planet}</span>
        <span class="natal-num-pill">✨ ${natal.element}</span>
        <span class="natal-num-pill purple">💎 ${natal.crystal}</span>
        <span class="natal-num-pill purple">🎨 ${natal.powerColor}</span>
        <span class="natal-num-pill">🔑 ${card.keyThemes}</span>
      `;
    }

    // 4. Bloques de Interpretación Profunda
    const missionEl = document.getElementById('natal-desc-mission');
    if (missionEl) missionEl.textContent = natal.soulMission;

    const giftsEl = document.getElementById('natal-desc-gifts');
    if (giftsEl) giftsEl.textContent = natal.innateGifts;

    const shadowEl = document.getElementById('natal-desc-shadow');
    if (shadowEl) shadowEl.textContent = natal.karmicShadow;

    const loveEl = document.getElementById('natal-desc-love');
    if (loveEl) loveEl.textContent = natal.loveAndVocation;

    const mantraEl = document.getElementById('natal-desc-mantra');
    if (mantraEl) mantraEl.textContent = natal.lifeMantra;

    // 5. Actualizar estado activo en las tarjetas de la tríada
    const triadCards = document.querySelectorAll('.natal-triad-card');
    triadCards.forEach(tc => {
      if (Number(tc.dataset.cardId) === cardId) {
        tc.classList.add('active');
      } else {
        tc.classList.remove('active');
      }
    });

    result.classList.remove('hidden');

    if (isTriadSelect && window.innerWidth <= 768) {
      document.getElementById('natal-reading-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderTriadCards(profile) {
    const triadGrid = document.getElementById('natal-triad-grid');
    if (!triadGrid) return;

    const triadDefs = [
      {
        tag: '🌟 Misión de Vida',
        role: 'Propósito sagrado del alma',
        id: profile.principalId
      },
      {
        tag: '💎 Don Innato',
        role: 'Talento activo al nacer (Día)',
        id: profile.donId
      },
      {
        tag: '⚖️ Desafío Kármico',
        role: 'Sombra a integrar en esta vida',
        id: profile.shadowId
      }
    ];

    triadGrid.innerHTML = '';
    triadDefs.forEach(def => {
      const card = window.tarotDb.find(c => c.id === def.id);
      const natal = NATAL_ARCANA_DB[def.id];
      if (!card || !natal) return;

      const div = document.createElement('div');
      div.className = `natal-triad-card ${def.id === profile.principalId ? 'active' : ''}`;
      div.dataset.cardId = def.id;
      div.innerHTML = `
        <span class="natal-triad-tag">${def.tag}</span>
        <div class="natal-triad-img" style="background-image: url('assets/card_${def.id}.jpg');"></div>
        <div class="natal-triad-name">${card.name}</div>
        <div class="natal-triad-role">${def.role}</div>
      `;

      div.addEventListener('click', () => {
        renderNatalProfile(def.id, true);
      });

      triadGrid.appendChild(div);
    });
  }

  btn.addEventListener('click', (e) => {
    const input = document.getElementById('natal-birthdate');
    if (!input || !input.value) {
      input.style.borderColor = 'var(--error-color)';
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
      return;
    }
    
    localStorage.setItem('user_birthdate', input.value);
    initYearlySpread(true);
    
    currentProfile = calculateTarotNatalProfile(input.value);
    if (!currentProfile) return;

    renderTriadCards(currentProfile);
    renderNatalProfile(currentProfile.principalId, false);

    if (e && e.isTrusted) {
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Botón para compartir o copiar perfil natal
  const shareBtn = document.getElementById('natal-share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (!currentProfile) return;
      const principalCard = window.tarotDb.find(c => c.id === currentProfile.principalId);
      const donCard = window.tarotDb.find(c => c.id === currentProfile.donId);
      const shadowCard = window.tarotDb.find(c => c.id === currentProfile.shadowId);
      const natal = NATAL_ARCANA_DB[currentProfile.principalId];

      const text = `🌟 Mi Carta Natal del Tarot (Eco Estelar)\n` +
        `📅 Nacimiento: ${currentProfile.day}/${currentProfile.month}/${currentProfile.year}\n` +
        `✨ Misión de Vida: ${principalCard.name} (${natal.number})\n` +
        `💎 Don Innato: ${donCard.name}\n` +
        `⚖️ Desafío Kármico: ${shadowCard.name}\n` +
        `🪐 Planeta: ${natal.planet} | Elemento: ${natal.element}\n` +
        `📜 Mantra: ${natal.lifeMantra}\n\n` +
        `Descubre tu Arcano Natal en: ${window.location.href}`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          shareBtn.innerHTML = '<span>✅</span> ¡Perfil Copiado al Portapapeles!';
          setTimeout(() => {
            shareBtn.innerHTML = '<span>📋</span> Copiar mi Perfil Astral del Tarot';
          }, 2500);
        }).catch(() => {});
      }
    });
  }

  // Cargar fecha guardada automáticamente
  const savedDate = localStorage.getItem('user_birthdate');
  if (savedDate) {
    const input = document.getElementById('natal-birthdate');
    if (input) {
      input.value = savedDate;
      btn.click();
    }
  }
}

/* ==========================================================================
   MEJORA 2: Compartir Lectura
   ========================================================================== */
(function initShareReading() {
  const shareBtn = document.getElementById('share-reading-btn');
  const toast = document.getElementById('share-toast');
  if (!shareBtn || !toast) return;

  shareBtn.addEventListener('click', () => {
    // Build shareable text from current reading
    const question = document.getElementById('result-question-text')?.textContent || '';
    const category = document.getElementById('result-category-badge')?.textContent || '';
    const synthesisEl = document.getElementById('destiny-synthesis-text');
    const synthesisText = synthesisEl ? synthesisEl.innerText : '';
    
    const cardEls = document.querySelectorAll('#cards-board .card-wrapper.flipped');
    const cardNames = [...cardEls].map(el => {
      const front = el.querySelector('.card-front');
      const label = el.querySelector('.placeholder-label');
      return label ? label.textContent.trim() : '';
    }).filter(Boolean);
    
    let text = `✨ Eco Estelar — Mi lectura del ${new Date().toLocaleDateString('es-ES')}\n\n`;
    text += `📍 Categoría: ${category}\n`;
    text += `❓ Pregunta: ${question}\n\n`;
    if (synthesisText) {
      text += `🔮 Síntesis del Oráculo:\n${synthesisText.substring(0, 600)}${synthesisText.length > 600 ? '...' : ''}\n\n`;
    }
    text += `🃏 Descubre tu lectura en Eco Estelar`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showShareToast());
    } else {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showShareToast();
    }
  });

  function showShareToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }
})();

/* ==========================================================================
   MEJORA 7: Grimorio — Filtros por grupo y vista lista/cuadrícula
   ========================================================================== */
(function initBookFilters() {
  // Element map by arcano id → element (Fire/Earth/Air/Water)
  const elementMap = {
    0: 'air', 1: 'air', 2: 'water', 3: 'earth', 4: 'fire',
    5: 'earth', 6: 'air', 7: 'water', 8: 'fire', 9: 'earth',
    10: 'fire', 11: 'fire', 12: 'water', 13: 'water', 14: 'fire',
    15: 'earth', 16: 'fire', 17: 'air', 18: 'water', 19: 'fire',
    20: 'fire', 21: 'earth'
  };

  // Populate ASTRO_MAP and elementMap dynamically for Minor Arcana (cards 22 to 77)
  for (let id = 22; id <= 77; id++) {
    if (id >= 22 && id <= 35) {
      ASTRO_MAP[id] = { ruler: "Elemento Fuego", symbol: "🜂", keywords: "Pasión · Acción · Voluntad", element: "fire" };
      elementMap[id] = 'fire';
    } else if (id >= 36 && id <= 49) {
      ASTRO_MAP[id] = { ruler: "Elemento Agua", symbol: "🜄", keywords: "Emoción · Intuición · Amor", element: "water" };
      elementMap[id] = 'water';
    } else if (id >= 50 && id <= 63) {
      ASTRO_MAP[id] = { ruler: "Elemento Aire", symbol: "🜁", keywords: "Mente · Conflicto · Razón", element: "air" };
      elementMap[id] = 'air';
    } else if (id >= 64 && id <= 77) {
      ASTRO_MAP[id] = { ruler: "Elemento Tierra", symbol: "🜃", keywords: "Materia · Estabilidad · Cuerpo", element: "earth" };
      elementMap[id] = 'earth';
    }
  }

  const filterChips = document.querySelectorAll('.book-filter-chip');
  const viewGridBtn = document.getElementById('book-view-grid');
  const viewListBtn = document.getElementById('book-view-list');
  
  let activeFilter = 'all';
  let activeView = 'grid';

  function applyFilter() {
    const items = document.querySelectorAll('.book-card-item');
    items.forEach(item => {
      const id = parseInt(item.getAttribute('data-id') || item.dataset.id || '0');
      let visible = true;
      
      if (activeFilter === 'mayores') {
        visible = id <= 21;
      } else if (activeFilter === 'menores') {
        visible = id >= 22;
      } else if (['fire','water','earth','air'].includes(activeFilter)) {
        visible = elementMap[id] === activeFilter;
      }
      
      // Also apply search input
      const bookSearch = document.getElementById('book-search');
      if (bookSearch && visible) {
        const term = bookSearch.value.toLowerCase().trim();
        if (term) {
          const name = item.getAttribute('data-name') || '';
          visible = name.includes(term);
        }
      }
      
      item.style.display = visible ? '' : 'none';
    });
  }

  // Expose filter application globally
  window.applyBookFilter = applyFilter;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });

  if (viewGridBtn) {
    viewGridBtn.addEventListener('click', () => {
      const grid = document.getElementById('book-grid');
      if (!grid) return;
      grid.classList.remove('list-view');
      viewGridBtn.classList.add('active');
      if (viewListBtn) viewListBtn.classList.remove('active');
    });
  }

  if (viewListBtn) {
    viewListBtn.addEventListener('click', () => {
      const grid = document.getElementById('book-grid');
      if (!grid) return;
      grid.classList.add('list-view');
      viewListBtn.classList.add('active');
      if (viewGridBtn) viewGridBtn.classList.remove('active');
    });
  }
  
  // Re-apply filter when book tab initializes (lazy)
  const bookTabBtn = document.querySelector('[data-tab="book"]');
  if (bookTabBtn) {
    bookTabBtn.addEventListener('click', () => {
      setTimeout(applyFilter, 300);
    });
  }
})();

/* ==========================================================================
   AJUSTES ASTRALES Y ACCESIBILIDAD (MEJORAS 10, 11, 12, 13)
   ========================================================================== */

// 10. Drawer de Ajustes Astrales
(function initSettingsPanel() {
  const triggerBtn = document.getElementById('astral-settings-btn');
  const panel = document.getElementById('astral-settings-panel');
  const closeBtn = document.getElementById('settings-close-btn');

  if (!panel || !closeBtn) return;

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      panel.classList.toggle('hidden');
    });
  }

  // Allow any additional button with .open-settings-trigger to open settings
  document.querySelectorAll('.open-settings-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      panel.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
  });

  const contactBtn = document.getElementById('contact-email-btn');
  const contactModal = document.getElementById('contact-modal');
  const contactCloseBtn = document.getElementById('contact-modal-close-btn');

  if (contactBtn && contactModal && contactCloseBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Ocultar el panel de ajustes primero
      panel.classList.add('hidden');
      // Mostrar el modal de contacto
      contactModal.classList.remove('hidden');
    });

    contactCloseBtn.addEventListener('click', () => {
      contactModal.classList.add('hidden');
    });

    // Cerrar si se hace clic fuera del modal
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.add('hidden');
      }
    });
  }

  // Modal de Ofrenda / Donaciones
  const donationBtns = document.querySelectorAll('.donation-action-btn');
  const donationModal = document.getElementById('donation-modal');
  const donationCloseBtn = document.getElementById('donation-modal-close-btn');

  if (donationModal) {
    donationBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        panel.classList.add('hidden');
        donationModal.classList.remove('hidden');
      });
    });

    if (donationCloseBtn) {
      donationCloseBtn.addEventListener('click', () => {
        donationModal.classList.add('hidden');
      });
    }

    donationModal.addEventListener('click', (e) => {
      if (e.target === donationModal) {
        donationModal.classList.add('hidden');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('hidden') && 
        !panel.contains(e.target) && 
        !triggerBtn.contains(e.target)) {
      panel.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      panel.classList.add('hidden');
      const onboardingModal = document.getElementById('onboarding-modal');
      if (onboardingModal) onboardingModal.classList.add('hidden');
    }
  });
})();

// 10, 13. Temas, Contraste y Tamaño de Fuente
(function initAccessibilityAndThemes() {
  const btnDark = document.getElementById('theme-dark-btn');
  const btnLight = document.getElementById('theme-light-btn');
  const contrastToggle = document.getElementById('high-contrast-toggle');
  const fontBtns = document.querySelectorAll('.font-btn');

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      if (btnLight) btnLight.classList.add('active');
      if (btnDark) btnDark.classList.remove('active');
    } else {
      document.body.classList.remove('light-mode');
      if (btnDark) btnDark.classList.add('active');
      if (btnLight) btnLight.classList.remove('active');
    }
    localStorage.setItem('tarot_theme', theme);
  }

  if (btnDark) btnDark.addEventListener('click', () => setTheme('dark'));
  if (btnLight) btnLight.addEventListener('click', () => setTheme('light'));

  const savedTheme = localStorage.getItem('tarot_theme') || 'dark';
  setTheme(savedTheme);

  function setContrast(isHigh) {
    if (isHigh) {
      document.body.classList.add('high-contrast');
      if (contrastToggle) contrastToggle.checked = true;
    } else {
      document.body.classList.remove('high-contrast');
      if (contrastToggle) contrastToggle.checked = false;
    }
    localStorage.setItem('tarot_contrast', isHigh ? 'high' : 'normal');
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('change', () => {
      setContrast(contrastToggle.checked);
    });
  }

  const savedContrast = localStorage.getItem('tarot_contrast');
  setContrast(savedContrast === 'high');

  const reducedMotionToggle = document.getElementById('reduced-motion-toggle');

  function setReducedMotion(isReduced) {
    if (isReduced) {
      document.body.classList.add('reduced-motion');
      if (reducedMotionToggle) reducedMotionToggle.checked = true;
    } else {
      document.body.classList.remove('reduced-motion');
      if (reducedMotionToggle) reducedMotionToggle.checked = false;
    }
    localStorage.setItem('tarot_reduced_motion', isReduced ? 'true' : 'false');
  }

  if (reducedMotionToggle) {
    reducedMotionToggle.addEventListener('change', () => {
      setReducedMotion(reducedMotionToggle.checked);
    });
  }

  const savedReducedMotion = localStorage.getItem('tarot_reduced_motion');
  setReducedMotion(savedReducedMotion === 'true');

  function setFontSize(size) {
    document.documentElement.setAttribute('data-font-size', size);
    fontBtns.forEach(btn => {
      if (btn.getAttribute('data-size') === size) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    localStorage.setItem('tarot_font_size', size);
  }

  fontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.getAttribute('data-size') || 'medium';
      setFontSize(size);
    });
  });

  const savedFontSize = localStorage.getItem('tarot_font_size') || 'medium';
  setFontSize(savedFontSize);
})();

// 12. Audio Ambiente Generativo (Web Audio API)
(function initAmbientAudioSystem() {
  let audio = null;
  const toggle = document.getElementById('audio-toggle');
  const slider = document.getElementById('audio-volume');

  function startAudio() {
    if (!audio) {
      audio = new Audio('assets/ambient_meditation.mp3');
      audio.loop = true;
      audio.addEventListener('timeupdate', () => {
        localStorage.setItem('tarot_audio_time', audio.currentTime);
      });
    }
    const vol = slider ? parseFloat(slider.value) : 0.5;
    audio.volume = vol;

    const savedTime = localStorage.getItem('tarot_audio_time');
    if (savedTime !== null && audio.currentTime === 0) {
      audio.currentTime = parseFloat(savedTime);
    }

    localStorage.setItem('tarot_audio_playing', 'true');

    audio.play().catch(err => {
      console.log("Autoplay bloqueado por políticas del navegador:", err);
      // Wait for user interaction to resume playing
      const resumeOnInteraction = () => {
        if (localStorage.getItem('tarot_audio_playing') === 'true') {
          audio.play().then(() => {
            document.removeEventListener('click', resumeOnInteraction);
            document.removeEventListener('touchstart', resumeOnInteraction);
          }).catch(e => console.log("Aún bloqueado:", e));
        }
      };
      document.addEventListener('click', resumeOnInteraction);
      document.addEventListener('touchstart', resumeOnInteraction);
    });
  }

  function stopAudio() {
    if (audio) {
      audio.pause();
    }
    localStorage.setItem('tarot_audio_playing', 'false');
  }

  function updateVolume(vol) {
    if (audio) {
      audio.volume = vol;
    }
  }

  if (toggle && slider) {
    const savedVol = localStorage.getItem('tarot_volume');
    if (savedVol !== null) {
      slider.value = savedVol;
    }

    const isPlaying = localStorage.getItem('tarot_audio_playing') === 'true';
    if (isPlaying) {
      toggle.checked = true;
      startAudio();
    } else {
      toggle.checked = false;
    }

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        startAudio();
      } else {
        stopAudio();
      }
    });

    slider.addEventListener('input', () => {
      const vol = parseFloat(slider.value);
      updateVolume(vol);
      localStorage.setItem('tarot_volume', vol);
    });
  }
})();

// 11. Modal de Onboarding / Guía
(function initOnboarding() {
  const modal = document.getElementById('onboarding-modal');
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.onboarding-dots .dot');
  const btnPrev = document.getElementById('onboarding-prev-btn');
  const btnNext = document.getElementById('onboarding-next-btn');
  const btnSkip = document.getElementById('onboarding-skip-btn');
  const btnClose = document.getElementById('onboarding-close-btn');
  const checkboxDontShow = document.getElementById('onboarding-dont-show-checkbox');
  const btnReplay = document.getElementById('replay-onboarding-btn');

  if (!modal) return;

  let currentStep = 1;
  const totalSteps = slides.length;

  const tabMapping = {
    1: 'oracle',
    2: 'daily',
    3: 'horoscope',
    4: 'lunar',
    5: 'numerology',
    6: 'book',
    7: 'dreams',
    8: 'shop'
  };

  function showStep(step) {
    currentStep = step;
    
    slides.forEach(slide => {
      const slideStep = parseInt(slide.getAttribute('data-step') || '1');
      if (slideStep === step) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step') || '1');
      if (dotStep === step) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    if (btnPrev) {
      if (step === 1) {
        btnPrev.classList.add('disabled');
        btnPrev.disabled = true;
      } else {
        btnPrev.classList.remove('disabled');
        btnPrev.disabled = false;
      }
    }

    if (btnNext) {
      if (step === totalSteps) {
        btnNext.textContent = 'Comenzar';
      } else {
        btnNext.textContent = 'Siguiente';
      }
    }

    // Cambiar de pestaña programáticamente en segundo plano
    const tabName = tabMapping[step];
    if (tabName) {
      const tabBtn = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
      if (tabBtn) {
        tabBtn.click();
      }
    }
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      showStep(currentStep + 1);
    } else {
      closeOnboarding();
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  function closeOnboarding() {
    modal.classList.add('hidden');
    localStorage.setItem('tarot_onboarding_completed', 'true');
  }

  function openOnboarding() {
    modal.classList.remove('hidden');
    showStep(1);
    if (checkboxDontShow) {
      checkboxDontShow.checked = false;
    }
  }

  if (btnNext) btnNext.addEventListener('click', nextStep);
  if (btnPrev) btnPrev.addEventListener('click', prevStep);
  if (btnSkip) btnSkip.addEventListener('click', closeOnboarding);
  if (btnClose) btnClose.addEventListener('click', closeOnboarding);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.getAttribute('data-step') || '1');
      showStep(step);
    });
  });

  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      const settingsPanel = document.getElementById('astral-settings-panel');
      if (settingsPanel) {
        settingsPanel.classList.add('hidden');
      }
      openOnboarding();
    });
  }

  const isCompleted = localStorage.getItem('tarot_onboarding_completed');
  if (isCompleted !== 'true') {
    setTimeout(openOnboarding, 1200);
  }
})();

/* ==========================================================================
   Sección Legal y Cookies
   ========================================================================== */

const LEGAL_TEXTS = {
  aviso: {
    title: "Aviso Legal",
    content: `
      <p><strong>1. DATOS IDENTIFICATIVOS</strong></p>
      <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), a continuación se reflejan los siguientes datos: el titular de este dominio web es Pablo, con dirección a estos efectos en Barcelona (España) y correo electrónico de contacto: Consultasydudasvarias@hotmail.com.</p>
      <p><strong>2. USUARIOS</strong></p>
      <p>El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
      <p><strong>3. USO DEL PORTAL</strong></p>
      <p>Eco Estelar proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Pablo o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos.</p>
      <p><strong>4. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</strong></p>
      <p>Pablo no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.</p>
      <p>El contenido astrológico y de tarot del portal tiene fines de entretenimiento y ocio. Las lecturas no deben sustituir asesoramiento profesional, médico, psicológico, legal o financiero.</p>
    `
  },
  privacidad: {
    title: "Política de Privacidad",
    content: `
      <p><strong>1. TRATAMIENTO DE DATOS PERSONALES</strong></p>
      <p>En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te informamos que "Eco Estelar" está diseñado bajo el principio de <strong>Privacidad por Diseño</strong>. Esto significa que nuestra aplicación <strong>no requiere registro de usuario, no recopila nombres, direcciones de correo ni información de pago</strong> para funcionar.</p>
      <p><strong>2. DATOS ALMACENADOS LOCALMENTE</strong></p>
      <p>Toda la información introducida en la web (como tu signo del zodiaco, preferencias de volumen, modo oscuro o datos temporales de las lecturas de tarot) se almacena exclusivamente de forma local en tu propio dispositivo utilizando la tecnología <code>localStorage</code> de tu navegador web. <strong>Nosotros no transferimos, leemos ni almacenamos esta información en nuestros servidores.</strong> Eres dueño absoluto de tus datos y puedes eliminarlos en cualquier momento borrando el historial/datos de tu navegador.</p>
      <p><strong>3. CORREOS DE CONTACTO</strong></p>
      <p>Si decides contactarnos a través del correo electrónico Consultasydudasvarias@hotmail.com, los datos personales que nos facilites (tu email y nombre) serán tratados única y exclusivamente para responder a tu consulta, no siendo cedidos a terceros ni añadidos a listas de marketing sin tu consentimiento explícito.</p>
      <p><strong>4. DERECHOS DEL USUARIO</strong></p>
      <p>Puedes ejercer tus derechos de acceso, rectificación, limitación y suprimir los datos escribiendo a nuestro correo de contacto.</p>
    `
  },
  cookies: {
    title: "Política de Cookies",
    content: `
      <p><strong>¿Qué son las cookies?</strong></p>
      <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>
      <p><strong>¿Qué tipos de cookies utiliza esta página web?</strong></p>
      <ul>
        <li><strong>Cookies técnicas y de personalización (Propias):</strong> Utilizamos <code>localStorage</code> (una tecnología similar a las cookies) para recordar tus preferencias de interfaz (modo noche, tamaño de texto, volumen de la música) y el estado de la guía interactiva. Estas cookies son necesarias para el correcto funcionamiento estético y técnico de la web.</li>
        <li><strong>Cookies de análisis o publicidad (De terceros):</strong> Actualmente o en el futuro, podríamos integrar servicios de publicidad de terceros (redes publicitarias). Estos terceros podrían instalar cookies en tu dispositivo para analizar el tráfico o mostrarte anuncios personalizados basados en tu navegación. Puedes aceptar o rechazar estas cookies mediante el banner de consentimiento que aparece al entrar en la web.</li>
      </ul>
      <p><strong>Revocación y eliminación de cookies</strong></p>
      <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador (Chrome, Firefox, Safari, Edge, etc.).</p>
    `
  }
};

(function initLegalAndCookies() {
  // --- Cookies Banner Logic ---
  const banner = document.getElementById('cookies-banner');
  const btnAccept = document.getElementById('btn-accept-cookies');
  const btnReject = document.getElementById('btn-reject-cookies');
  
  // Check if consent is already given
  const consent = localStorage.getItem('tarot_cookie_consent');
  if (!consent && banner) {
    // Small delay to allow initial animations to run before showing banner
    setTimeout(() => {
      banner.classList.remove('hidden');
    }, 1500);
  }
  
  const handleConsent = (value) => {
    localStorage.setItem('tarot_cookie_consent', value);
    if (banner) {
      banner.classList.add('hidden');
    }
  };
  
  if (btnAccept) btnAccept.addEventListener('click', () => handleConsent('all'));
  if (btnReject) btnReject.addEventListener('click', () => handleConsent('technical'));

  // --- Legal Modal Logic ---
  const legalModal = document.getElementById('legal-modal');
  const legalCloseBtn = document.getElementById('legal-close-btn');
  const legalTitle = document.getElementById('legal-modal-title');
  const legalBody = document.getElementById('legal-modal-body');
  const legalLinks = document.querySelectorAll('.legal-link');
  
  if (legalModal && legalCloseBtn) {
    legalCloseBtn.addEventListener('click', () => {
      legalModal.classList.add('hidden');
    });
    
    legalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const type = link.getAttribute('data-legal');
        const data = LEGAL_TEXTS[type];
        if (data) {
          legalTitle.textContent = data.title;
          legalBody.innerHTML = data.content;
          legalModal.classList.remove('hidden');
          // Hide cookies banner temporarily if open so it doesn't overlap excessively
          if (banner && !banner.classList.contains('hidden')) {
            banner.style.zIndex = 10;
          }
        }
      });
    });
  }
})();

// Lógica de Sub-pestañas de la sección de Carta del Día
(function initDailySubTabs() {
  const tabs = document.querySelectorAll('.daily-sub-tab');
  const sections = document.querySelectorAll('.daily-section-content');

  if (tabs.length === 0 || sections.length === 0) return;

  function switchDailySub(subName) {
    tabs.forEach(tab => {
      const name = tab.getAttribute('data-daily-sub');
      if (name === subName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    sections.forEach(section => {
      const id = section.id;
      if (id === `daily-${subName}-section`) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const subName = tab.getAttribute('data-daily-sub') || 'express';
      switchDailySub(subName);
    });
  });

  // Iniciar por defecto en Consejo Diario
  switchDailySub('express');
})();

window.addEventListener('popstate', (e) => {
  const urlParams = new URLSearchParams(window.location.search);
  const carta = urlParams.get('carta');
  if (carta) {
     const card = window.tarotDb.find(c => createSlug(c.name) === carta);
     if (card) {
        // Prevent pushing state again
        const origPush = window.history.pushState;
        window.history.pushState = function(){};
        openCardDetailModal(card.id);
        window.history.pushState = origPush;
     }
  } else {
     const modal = document.getElementById('card-detail-modal');
     if (modal && !modal.classList.contains('hidden')) {
        // Prevent pushing state
        const origPush = window.history.pushState;
        window.history.pushState = function(){};
        closeCardDetailModal();
        window.history.pushState = origPush;
     }
  }
});

// Initial load check
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Abrir carta del día desde URL si procede
    const carta = urlParams.get('carta');
    if (carta && window.tarotDb) {
       const card = window.tarotDb.find(c => createSlug(c.name) === carta);
       if (card) {
          openCardDetailModal(card.id);
       }
    }
    
    // Restaurar lectura antigua de Tarot/Horóscopo desde URL si procede
    const readingId = urlParams.get('reading');
    if (readingId) {
      restoreReading(readingId);
      // Limpiar el parámetro de la URL
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, 500);
});

// Scan and tag mineral category cards dynamically for aesthetic glowing effects
(function initMineralCategoryTags() {
  function tagCards() {
    document.querySelectorAll('.dream-card').forEach(card => {
      const catEl = card.querySelector('.dream-card-cat');
      if (catEl) {
        const catText = catEl.textContent.trim().toLowerCase();
        if (catText.includes('paz')) card.classList.add('cat-paz-y-calma');
        else if (catText.includes('protección') || catText.includes('proteccion') || catText.includes('limpieza')) card.classList.add('cat-proteccion-y-limpieza');
        else if (catText.includes('amor') || catText.includes('emociones')) card.classList.add('cat-amor-y-emociones');
        else if (catText.includes('abundancia') || catText.includes('acción') || catText.includes('accion')) card.classList.add('cat-abundancia-y-accion');
        else if (catText.includes('intuición') || catText.includes('intuicion') || catText.includes('consciencia')) card.classList.add('cat-intuicion-y-consciencia');
      }
    });
  }

  // Run on load
  if (document.readyState !== 'loading') {
    tagCards();
  } else {
    document.addEventListener('DOMContentLoaded', tagCards);
  }

  // Observe page mutations (useful when page changes or grid re-renders)
  const targetNode = document.body;
  if (targetNode) {
    const observer = new MutationObserver((mutationsList) => {
      let run = false;
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          run = true;
          break;
        }
      }
      if (run) tagCards();
    });
    observer.observe(targetNode, { childList: true, subtree: true });
  }
})();


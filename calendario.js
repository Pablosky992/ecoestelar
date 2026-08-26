// Calendario Místico y de Rituales — Lógica de la Página
// Eco Estelar

// Estado de la Aplicación para el Calendario
let activeCalendarMonth = new Date().getMonth();
let activeCalendarYear = new Date().getFullYear();
let selectedCalendarDate = new Date();
let currentCategoryFilter = 'all';

// Base de Datos de Rituales Fijos (Sabbats, Portales y Tradicionales)
const MYSTICAL_EVENTS_DB = [
  // =========================================================================
  // --- 1. SABBATS DE LA RUEDA DEL AÑO (WICCA / TRADICIÓN CELTA) ---
  // =========================================================================
  {
    name: "Imbolc (Festival del Fuego y de la Diosa Brigid)",
    category: "sabbat",
    emoji: "🌱",
    element: "🔥 Fuego y Agua",
    planet: "☀️ Sol Naciente y Venus",
    timing: "Atardecer o Crepúsculo (1 y 2 de Febrero)",
    month: 1, // Febrero (0-indexed)
    day: 1,
    astroDesc: "Imbolc (que significa literalmente 'en el vientre') celebra los primeros destellos de luz que regresan a la Tierra y el despertar de la vida vegetal bajo el manto invernal. Es la festividad sagrada de la diosa celta Brigid, patrona del fuego del hogar, la forja alquímica, la poesía inspirada y los manantiales curativos. Este sabbat rige la purificación profunda del templo físico y espiritual, la bendición de velas para todo el año y la consagración de semillas que germinarán en primavera.",
    ingredients: "Una vela blanca o verde claro, un cuenco con leche templada (de vaca o vegetal con miel), hojas de romero seco o laurel, un cristal de cuarzo blanco o selenita, y papel pergamino con tinta dorada o negra.",
    affirmation: "'Bajo el fuego sagrado y purificador de Brigid, consagro mis anhelos. Dejo ir la frialdad y el estancamiento del pasado; abro mi corazón al calor de los nuevos comienzos. Mi camino resplandece en sabiduría y vitalidad.'",
    steps: [
      "1. Purificación del Espacio: Enciende las hojas de romero o laurel en un recipiente ignífugo. Pasa el humo aromático en círculos por todo tu altar y esquinas de la habitación, decretando la salida de energías densas y cansancio invernal.",
      "2. Ofrenda de Nutrición a la Tierra: Coloca el cuenco de leche con miel en el centro de tu altar como muestra de respeto a las corrientes nutricias de la naturaleza y al despertar de la fertilidad.",
      "3. El Fuego de Brigid: Enciende la vela blanca. Siéntate en posición cómoda, contempla la llama fija durante 3 minutos y visualiza que su calor derrite cualquier bloqueo, miedo o duda en tu mente.",
      "4. Declaración de las Tres Semillas: Escribe en el pergamino tres compromisos o metas de evolución personal que emprenderás con paciencia y disciplina en los meses venideros.",
      "5. Consagración del Talismán: Pasa el papel suavemente por encima del calor de la llama (sin quemarlo) y unge tu cuarzo con una gota de leche y miel. Guarda el pergamino en tu cofre o grimorio personal."
    ],
    closing: "Deja consumir la vela en un lugar seguro. A la mañana siguiente, vierte la ofrenda de leche con miel al pie de una planta sana o árbol en agradecimiento a la Madre Tierra."
  },
  {
    name: "Ostara (Equinoccio de Primavera y Renacimiento)",
    category: "sabbat",
    emoji: "🌸",
    element: "💨 Aire y Tierra",
    planet: "♈ Sol en Aries y Marte",
    timing: "Amanecer del Equinoccio Solar (20 - 21 de Marzo)",
    month: 2, // Marzo
    day: 20,
    astroDesc: "Ostara marca el instante del equilibrio cósmico absoluto: el día y la noche tienen exactamente la misma duración en todo el planeta. El Sol ingresa al grado 0 de Aries, encendiendo el Año Nuevo Astrológico. Esta festividad de la fertilidad y la doncella Eostre celebra la victoria definitiva de la luz sobre la oscuridad, la germinación activa de proyectos y el balance sagrado entre el impulso masculino (acción) y el receptáculo femenino (intuición).",
    ingredients: "Semillas de flores o hierbas aromáticas (lavanda, albahaca o manzanilla), una maceta pequeña con tierra fértil, pétalos de flores frescas de temporada, una vela verde o amarilla brillante, y un cuarzo verde o aventurina.",
    affirmation: "'En perfecto equilibrio cósmico, planto las semillas de mi destino. Que la fuerza vital de la primavera despierte mi valentía y haga florecer mis proyectos con belleza, salud y prosperidad inagotables.'",
    steps: [
      "1. Baño de Flores y Despertar: Date una ducha relajante y vierte sobre tus hombros un preparado de agua tibia infusionada con pétalos de flores aromáticas para revitalizar tu campo áurico.",
      "2. El Altar del Equilibrio: Coloca la vela verde en el centro, rodeada por los pétalos frescos formando un círculo que represente el renacimiento perpetuo.",
      "3. Imantación de Semillas: Toma las semillas entre tus palmas unidas en postura de oración (Anjali Mudra). Cierra los ojos y proyecta en ellas tus tres mayores deseos para esta nueva estación.",
      "4. Siembra Consciente: Entierra las semillas en la maceta con tierra fértil mientras recitas el decreto de Ostara en voz alta tres veces, sintiendo la vibración en tu pecho.",
      "5. Activación por Fuego y Agua: Enciende la vela verde y riega por primera vez la tierra bendecida, sintiendo que unes el fuego de la voluntad con el agua de la emoción creadora."
    ],
    closing: "Coloca la maceta en un lugar donde reciba los primeros rayos del sol matutino. Cuida esta planta como el reflejo vivo de tus propias metas en crecimiento."
  },
  {
    name: "Beltane (El Gran Fuego de la Pasión y la Abundancia)",
    category: "sabbat",
    emoji: "🌺",
    element: "🔥 Fuego y Tierra",
    planet: "♉ Venus y Tauro",
    timing: "Medianoche o Atardecer (30 de Abril y 1 de Mayo)",
    month: 4, // Mayo
    day: 1,
    astroDesc: "Beltane es el clímax de la primavera y la celebración suprema de la fertilidad, el amor erótico y el matrimonio sagrado entre el Dios Sol y la Diosa Tierra. Las energías de la naturaleza alcanzan un punto de máximo magnetismo y éxtasis creativo. Es la noche tradicional de las hogueras purificadoras de Bel, ideal para rituales de atracción afectiva, magnetismo personal, despertar del deseo y florecimiento de proyectos artísticos o materiales.",
    ingredients: "Cintas de colores (roja para la pasión, rosa para el amor puro, verde para la fertilidad/dinero y blanca para la paz), sahumerio de sándalo o jazmín, una vela roja o fucsia, y flores silvestres.",
    affirmation: "'Enciendo el fuego sagrado de mi pasión y creatividad. Soy un imán divino de amor incondicional, alegría y prosperidad. Mi corazón late en sintonía con la vida y reclamo la abundancia en todas sus expresiones.'",
    steps: [
      "1. Sahumerio del Deseo: Enciende el sahumerio de jazmín o sándalo y pásalo en espirales alrededor de tu cuerpo, inhalando su aroma para despertar la sensualidad y el magnetismo.",
      "2. El Trenzado Sagrado: Toma las cuatro cintas de colores. Ve trenzándolas con calma y precisión. Por cada nudo o cruce, decreta un deseo específico de amor, vitalidad o riqueza.",
      "3. El Encendido del Fuego de Bel: Enciende la vela roja y coloca la trenza de cintas a sus pies, absorbiendo la luz cálida y la energía del fuego creador.",
      "4. Danza y Elevación de Energía: Pon música suave o tambores rítmicos; respira hondo y conecta con el latido de tu corazón, sintiendo la energía kundalini ascender por tu columna.",
      "5. Sellar la Trenza de Vida: Pasa los extremos de la trenza rápidamente por el calor del humo aromático para sellar tus peticiones."
    ],
    closing: "Ata la trenza de cintas a una rama de árbol, planta de tu balcón o guárdala en tu joyero como amuleto de atracción durante todo el verano."
  },
  {
    name: "Litha (Solsticio de Verano y Triunfo del Sol)",
    category: "sabbat",
    emoji: "☀️",
    element: "🔥 Fuego Cósmico y Éter",
    planet: "♋ Solsticio de Cáncer y Sol",
    timing: "Mediodía Solar del Solsticio (21 - 22 de Junio)",
    month: 5, // Junio
    day: 21,
    astroDesc: "Litha celebra el día más largo del año y el apogeo supremo del poder solar. La luz triunfa en su máxima expresión cósmica antes de que los días comiencen a acortarse lentamente. Es un portal de poder personal, soberanía del alma, victoria sobre la adversidad y transmutación de sombras mediante el fuego purificador. La magia de las hierbas recolectadas en este solsticio posee su máxima potencia curativa y protectora.",
    ingredients: "Hojas de laurel frescas, ramas de romero, una vela dorada, amarilla o naranja, un plato de barro o resistente al fuego, y un cristal solar (pirita, citrino u ojo de tigre).",
    affirmation: "'Bajo el sol cenital de Litha, reclamo mi soberanía y mi poder personal. Brillo con luz propia sin pedir disculpas. Quemo cualquier sombra de temor y consagro mi camino a la victoria, la salud y la dicha.'",
    steps: [
      "1. Carga Solar del Talismán: Coloca tu citrino o pirita bajo la luz directa del sol a mediodía durante al menos 30 minutos para saturarlo de magnetismo solar de triunfo.",
      "2. Las Tres Hojas de la Victoria: Toma tres hojas de laurel. Con un bolígrafo de tinta negra o dorada, escribe en cada una: 'TRIUNFO', 'PROSPERIDAD' y 'SALUD RADIANTE'.",
      "3. Encendido del Fuego Sagrado: Enciende la vela dorada a mediodía, agradeciendo en voz alta al Sol por la vida, el calor y los frutos que maduran en tu existencia.",
      "4. Quema Alquímica: Quema las tres hojas de laurel una a una en la llama de la vela, sosteniéndolas con pinzas y dejando caer las cenizas en el plato de barro.",
      "5. Sahumar con Romero: Pasa una ramita de romero encendida por encima de tu cabeza para sellar tu aura con una armadura de luz solar protectora."
    ],
    closing: "Sopla las cenizas del laurel al viento al aire libre mirando hacia el Este, visualizando que el universo materializa tus victorias."
  },
  {
    name: "Lammas / Lughnasadh (La Primera Cosecha y Gratitud)",
    category: "sabbat",
    emoji: "🌾",
    element: "🌿 Tierra y Fuego",
    planet: "♌ Sol en Leo y Júpiter",
    timing: "Tarde o Atardecer (1 de Agosto)",
    month: 7, // Agosto
    day: 1,
    astroDesc: "Lughnasadh es el festival de la primera cosecha de granos y trigo, dedicado al dios solar celta Lugh. Simboliza el sacrificio sagrado del grano que muere para renacer en forma de pan y alimentar al pueblo. Es el momento supremo del año para la gratitud material, la consagración del trabajo y la multiplicación del dinero mediante la generosidad consciente y el compartir.",
    ingredients: "Un trozo de pan artesano o espigas de trigo, un cuenco con granos variados (arroz, maíz, lentejas), 7 monedas de curso legal, una vela amarilla o marrón y canela en polvo.",
    affirmation: "'Agradezco con devoción los frutos maduros de mi esfuerzo y la infinita generosidad de la Tierra. Comparto mi abundancia con alegría y declaro que mis recursos económicos se multiplican de forma constante y bendecida.'",
    steps: [
      "1. El Mandil de Granos: Coloca los granos en el cuenco y entierra en ellos las 7 monedas, espolvoreando una pizca de canela encima para activar la atracción financiera.",
      "2. Consagración del Pan: Sostén el pan entre tus manos sobre el cuenco. Cierra los ojos y rememora todo lo que has trabajado y superado en los últimos 6 meses.",
      "3. El Fuego de la Cosecha: Enciende la vela amarilla en honor a la abundancia recibida y al trabajo fructífero.",
      "4. Partir y Compartir: Parte el pan en dos con tus propias manos. Come una mitad saboreándola con gratitud absoluta.",
      "5. Decretar el Triunfo Material: Pasa las 7 monedas por el humo de la canela y guarda una en tu billetera como moneda imán inamovible."
    ],
    closing: "Desmenuza la otra mitad del pan en un jardín, parque o bosque para alimentar a las aves y agradecer a los espíritus de la naturaleza."
  },
  {
    name: "Mabon (Equinoccio de Otoño y Segunda Cosecha)",
    category: "sabbat",
    emoji: "🍎",
    element: "💧 Agua y Tierra",
    planet: "♎ Sol en Libra y Venus",
    timing: "Puesta de Sol del Equinoccio (21 - 22 de Septiembre)",
    month: 8, // Septiembre
    day: 22,
    astroDesc: "Mabon marca el segundo equinoccio del año: la noche y el día vuelven a igualarse mientras la naturaleza inicia su repliegue hacia el descanso invernal. Es la fiesta de la vendimia y la cosecha de manzanas. Representa la necesidad de equilibrio interior, serenidad mental y asimilación de aprendizajes, soltando el exceso de equipaje emocional antes de ingresar en la mitad oscura del ciclo.",
    ingredients: "Una manzana roja madura, canela en polvo, una vela naranja o borgoña, hojas secas de otoño y una varita de incienso de mirra o sándalo.",
    affirmation: "'En equilibrio y paz profunda, entro en este tiempo de introspección. Agradezco las lecciones de la luz y abrazo la sabiduría de la sombra. Suelto lo innecesario y me asiento en mi verdad interior.'",
    steps: [
      "1. El Círculo de Balance: Coloca las hojas secas formando un círculo sobre tu altar, simbolizando la rueda eterna del tiempo y la madurez.",
      "2. El Corte de la Estrella: Corta la manzana por la mitad de forma horizontal para revelar el pentagrama sagrado de semillas en su centro.",
      "3. Unción de Especias: Espolvorea un toque de canela sobre ambas mitades de la manzana para endulzar el balance entre tu lado racional y tu lado emocional.",
      "4. El Encendido del Ocaso: Enciende la vela naranja mientras contemplas el atardecer, respirando serenidad y agradeciendo los frutos del año.",
      "5. Comunión con la Sabiduría: Come una de las mitades de la manzana en silencio meditativo, asimilando la sabiduría cosechada en este ciclo."
    ],
    closing: "Deja la otra mitad de la manzana al pie de un árbol frondoso como ofrenda a la Tierra antes de que comience el invierno."
  },
  {
    name: "Samhain (La Noche de los Ancestros y Año Nuevo Brujo)",
    category: "sabbat",
    emoji: "🎃",
    element: "🌌 Éter y Agua Profunda",
    planet: "♏ Plutón y Luna Negra",
    timing: "Medianoche (31 de Octubre a 1 de Noviembre)",
    month: 9, // Octubre
    day: 31,
    astroDesc: "Samhain es el sabbat más sagrado del calendario esotérico, marcando el fin del año wiccano y el inicio de la estación oscura. En esta noche, el velo entre el mundo físico y el plano espiritual se disuelve por completo. Es el momento supremo para honrar el linaje ancestral, recibir consejo de los guías de luz, cortar ataduras kármicas dañinas y consagrar la transmutación del alma en el fuego del caldero sagrado.",
    ingredients: "Una vela blanca (luz para los ancestros), una vela negra (para absorber negatividad y cortar lazos), un vaso de agua pura, incienso de mirra o copal, una foto o recuerdo de familiares trascendidos y un papel negro.",
    affirmation: "'Honro a quienes caminaron antes que yo y agradezco la sabiduría que fluye en mi sangre. Con amor y firmeza, corto todo lazo kármico de dolor y desamor. Me envuelvo en protección divina y renazco en luz.'",
    steps: [
      "1. Sahumerio del Umbral: Quema mirra o copal por todas las habitaciones, sahumando especialmente puertas y ventanas para sellar el espacio contra influencias bajas.",
      "2. El Altar de la Memoria: Coloca el vaso de agua pura y la foto de tus ancestros. Enciende la vela blanca dedicándoles una oración de gratitud y paz eterna.",
      "3. El Papel del Destierro: En el papel negro, escribe con bolígrafo blanco o lápiz los miedos, dolores, hábitos autodestructivos o culpas que destierras para siempre de tu vida.",
      "4. El Fuego de la Transmutación: Enciende la vela negra. Quema el papel con sumo cuidado en un cuenco seguro, visualizando cómo esas cargas se disuelven en cenizas.",
      "5. Silencio y Conexión Oracular: Con la vela blanca encendida, realiza una tirada de Tarot o medita en silencio durante 10 minutos, atento a los mensajes intuitivos que recibas de tus guías."
    ],
    closing: "Deja que la vela blanca se consuma en su totalidad. Entierra las cenizas del papel negro fuera de tu hogar para sellar la transmutación definitiva."
  },
  {
    name: "Yule (Solsticio de Invierno y Renacimiento del Sol)",
    category: "sabbat",
    emoji: "🎄",
    element: "❄️ Tierra y Fuego de Esperanza",
    planet: "♑ Saturno y Solsticio de Capricornio",
    timing: "La Noche más Larga del Año (21 - 22 de Diciembre)",
    month: 11, // Diciembre
    day: 21,
    astroDesc: "Yule celebra la noche más larga del año y el instante sagrado en que el Sol Niño renace en las entrañas de la Gran Madre. Representa la fe inquebrantable en medio de la oscuridad más profunda, el triunfo de la esperanza sobre el desánimo y la promesa eterna de la luz. Es el momento perfecto para encender el leño sagrado de Yule, formular los 12 deseos del año venidero y bendecir el hogar con ramas de pino y acebo.",
    ingredients: "Ramas de pino, abeto o romero fresco, una vela dorada o roja, papel pergamino, una campana o cuenco tibetano, y varitas de canela.",
    affirmation: "'En la noche más oscura, enciendo la chispa invencible de mi luz interior. Mi fe permanece firme; sé que el renacimiento es seguro. Invoco la paz, la salud y la victoria para el nuevo ciclo solar.'",
    steps: [
      "1. La Corona del Renacimiento: Coloca las ramas de pino en círculo en tu mesa o altar, situando la vela dorada en el centro como símbolo del Sol naciente.",
      "2. Los 12 Decretos de Yule: Escribe en el pergamino 12 anhelos o propósitos espirituales y materiales para los 12 meses del nuevo año solar.",
      "3. El Encendido del Sol Niño: Enciende la vela dorada en el centro de las ramas de pino, sintiendo cómo la luz reconfortante invade tu templo y tu mente.",
      "4. El Toque de Campana: Toca la campana o haz sonar el cuenco 3 veces sobre el pergamino para alejar cualquier duda o negatividad que impida la manifestación.",
      "5. Sahumar la Esperanza: Quema una varita de canela en la llama de la vela, esparciendo su fragancia cálida por toda la estancia."
    ],
    closing: "Guarda el pergamino de los 12 deseos bajo tu árbol o en tu rincón sagrado hasta la Nochevieja para consagrar su manifestación en el Año Nuevo."
  },

  // =========================================================================
  // --- 2. LOS 12 PORTALES NUMÉRICOS SAGRADOS (1/1 AL 12/12) ---
  // =========================================================================
  {
    name: "Portal 1/1 (Apertura de Senderos y Voluntad Creadora)",
    category: "portal",
    emoji: "✨",
    element: "🔥 Fuego Primordial",
    planet: "☀️ El Sol y El Mago (Arcano I)",
    timing: "Al Despertar o Mediodía (1 de Enero)",
    month: 0, // Enero
    day: 1,
    astroDesc: "El Portal 1/1 activa la vibración del número uno, el Arcano de El Mago y el punto de origen de toda manifestación en el cosmos. Es el vórtice de la voluntad consciente, el liderazgo personal y la siembra de la dirección que tomará tu energía durante los siguientes doce meses.",
    ingredients: "Una vela verde o dorada, 3 monedas brillantes, una pizca de canela en polvo y una hoja blanca en blanco.",
    affirmation: "'Doy el primer paso en victoria, claridad y soberanía. Soy el/la creador/a consciente de mi realidad. Mis senderos se abren y la fortuna acompaña cada una de mis decisiones.'",
    steps: [
      "1. El Primer Paso Firme: Al levantarte, pisa fuerte primero con el pie derecho, decretando éxito y seguridad para todo tu año.",
      "2. El Hechizo de las Monedas: Coloca las 3 monedas en forma de triángulo sobre la hoja blanca y espolvorea canela en su centro.",
      "3. El Encendido de la Voluntad: Enciende la vela verde en el centro del triángulo de monedas, visualizando estabilidad financiera y nuevos proyectos floreciendo.",
      "4. Redactar el Eje Maestro: Escribe en la hoja tu palabra guía para este año (ej: 'ABUNDANCIA', 'LIBERTAD', 'MAESTRÍA', 'AMOR').",
      "5. Consagración: Pasa las tres monedas por el calor de la vela y guárdalas juntas en tu billetera durante todo el año."
    ],
    closing: "Deja consumir la vela y conserva la hoja con tu palabra guía a la vista en tu espacio de trabajo."
  },
  {
    name: "Portal 2/2 (El Espejo Astral, Dualidad y Discernimiento)",
    category: "portal",
    emoji: "✨",
    element: "💧 Agua Sagrada",
    planet: "🌙 La Luna y La Sacerdotisa (Arcano II)",
    timing: "Noche o Atardecer (2 de Febrero)",
    month: 1, // Febrero
    day: 2,
    astroDesc: "El Portal 2/2 activa la vibración del dos: la dualidad armónica, el espejo de la autopercepción, el matrimonio alquímico interno y la visión del Arcano de La Sacerdotisa. Es un portal para disolver autoengaños, armonizar vínculos afectivos y escuchar la voz del inconsciente.",
    ingredients: "Un espejo de mano, una vela blanca lisa, un cuarzo transparente o selenita, e incienso de jazmín o sándalo.",
    affirmation: "'Frente al espejo del universo, reconozco mi luz y abrazo mi sombra. Me acepto en integridad divina. Mi intuición es pura, sabia y certera.'",
    steps: [
      "1. Sahumar el Espejo: Pasa el humo de jazmín sobre la superficie del espejo para purificar memorias energéticas previas.",
      "2. El Halo de Luz: Coloca el espejo de pie frente a ti y enciende la vela blanca detrás o a un lado, creando un suave resplandor.",
      "3. Mirada al Alma: Sostén el cuarzo entre tus manos. Mírate a los ojos en el reflejo durante 3 minutos respirando lento y profundo.",
      "4. Declaración de Autoaceptación: Recita la afirmación en voz alta con total ternura hacia tu propio ser.",
      "5. El Cierre del Espejo: Cubre el espejo con un paño limpio y colócalo boca abajo."
    ],
    closing: "Deja consumir la vela blanca en paz y duerme con el cuarzo bajo tu almohada para recibir sueños reveladores."
  },
  {
    name: "Portal 3/3 (Tríada Divina, Creatividad y Expansión Mental)",
    category: "portal",
    emoji: "✨",
    element: "💨 Aire y Fuego",
    planet: "♃ Júpiter y La Emperatriz (Arcano III)",
    timing: "Mañana o Mediodía (3 de Marzo)",
    month: 2, // Marzo
    day: 3,
    astroDesc: "El Portal 3/3 canaliza la vibración de la Trinidad sagrada: mente, cuerpo y espíritu en perfecta sinergia creadora. Rige la autoexpresión elocuente, la expansión de horizontes mentales, el florecimiento de proyectos artísticos y el optimismo jupiteriano.",
    ingredients: "Una vela amarilla brillante, hojas de papel, lápices de colores y sahumerio de cítricos (naranja o limón).",
    affirmation: "'Pienso, siento y actúo en perfecta sintonía divina. Expreso mi verdad creativa con libertad y atraigo el éxito y la expansión a todas mis creaciones.'",
    steps: [
      "1. Despeje Mental: Enciende el sahumerio cítrico para disipar la fatiga intelectual y despertar la chispa creativa.",
      "2. El Mapa Creativo: Dibuja o escribe con colores vivos tus tres proyectos o metas más ilusionantes del año.",
      "3. Encendido de la Mente: Enciende la vela amarilla visualizando que tu cerebro se ilumina con ideas brillantes.",
      "4. El Triángulo de Poder: Dobla la hoja en forma de triángulo equilátero, sellando la unión de tus pensamientos, emociones y acciones.",
      "5. Consagración: Pasa el triángulo por el humo aromático tres veces en el sentido de las agujas del reloj."
    ],
    closing: "Guarda el triángulo dentro de tu libro de estudio favorito o en tu libreta de proyectos."
  },
  {
    name: "Portal 4/4 (Estabilidad de los Cuatro Pilares y Prosperidad Firme)",
    category: "portal",
    emoji: "✨",
    element: "🌿 Tierra Sólida",
    planet: "🪐 Saturno y El Emperador (Arcano IV)",
    timing: "Tarde o Puesta de Sol (4 de Abril)",
    month: 3, // Abril
    day: 4,
    astroDesc: "El Portal 4/4 activa la vibración del cuatro: los cuatro puntos cardinales, los cuatro elementos y las bases inquebrantables de la materia. Es el momento supremo para rituales de enraizamiento, seguridad patrimonial, orden en las finanzas y consolidación de metas a largo plazo.",
    ingredients: "Una vela marrón o verde bosque, un cuenco con tierra fértil o una piedra pesada, y sal marina gruesa.",
    affirmation: "'Construyo mi vida sobre cimientos indestructibles de orden, salud y prosperidad. Mis finanzas están protegidas y mis proyectos crecen firmes y seguros.'",
    steps: [
      "1. Enraizamiento Físico: Siéntate descalzo/a con los pies firmes en el suelo. Respira hondo y visualiza raíces doradas que bajan hacia el centro de la Tierra.",
      "2. El Altar de los Cuatro Pilares: Coloca la piedra o cuenco de tierra en el centro de tu espacio.",
      "3. El Círculo de Sal Protectora: Traza un círculo fino de sal marina alrededor de la vela verde.",
      "4. El Encendido de la Estructura: Enciende la vela y decreta en voz alta la estabilidad de tu hogar y tus ingresos.",
      "5. Asentamiento del Talismán: Coloca la piedra consagrada en la entrada de tu casa o en tu rincón de trabajo."
    ],
    closing: "Deja consumir la vela. La piedra permanecerá como ancla de estabilidad durante todo el ciclo."
  },
  {
    name: "Portal 5/5 (El Quinto Elemento, Libertad y Transformación)",
    category: "portal",
    emoji: "✨",
    element: "🌪️ Éter y Aire",
    planet: "☿ Mercurio y El Sumo Sacerdote (Arcano V)",
    timing: "Cualquier hora del 5 de Mayo",
    month: 4, // Mayo
    day: 5,
    astroDesc: "El Portal 5/5 activa la vibración del cinco: el cambio dinámico, el despertar del Quinto Elemento (Éter o Espíritu), los viajes del alma y la ruptura de patrones obsoletos. Favorece la toma de decisiones audaces, la adaptabilidad y la liberación de la monotonía.",
    ingredients: "Una vela azul o violeta, hojas de menta o eucalipto, y un papel blanco con pluma.",
    affirmation: "'Abrazo el cambio con valor e inteligencia. Soy libre, flexible y confío plenamente en las nuevas oportunidades que el universo despliega ante mí.'",
    steps: [
      "1. Sahumar la Libertad: Quema las hojas de menta o eucalipto para despejar el campo áurico de pereza o ataduras.",
      "2. Lista de las Cinco Anclas: Escribe en el papel 5 hábitos, excusas o miedos que han frenado tu avance y de los que hoy te despides.",
      "3. El Fuego de la Transmutación: Enciende la vela violeta y quema el papel de las anclas con cuidado en un recipiente seguro.",
      "4. Declarar los Nuevos Caminos: Mientras arde el papel, declara en voz alta los 5 nuevos rumbos que emprenderás.",
      "5. Apertura de Ventanas: Abre de par en par las ventanas para que el aire renueve la atmósfera de tu estancia."
    ],
    closing: "Esparce las cenizas al viento fuera de tu hogar visualizando tu vuelo libre y sin ataduras."
  },
  {
    name: "Portal 6/6 (Armonía Cósmica, Sanación del Linaje y Amor)",
    category: "portal",
    emoji: "✨",
    element: "🌸 Agua y Venus",
    planet: "♀ Venus y Los Enamorados (Arcano VI)",
    timing: "Atardecer o Noche (6 de Junio)",
    month: 5, // Junio
    day: 6,
    astroDesc: "El Portal 6/6 vibra con el número seis: la armonía del hogar, los vínculos basados en la lealtad, la reconciliación y la belleza del alma. Es un portal sagrado para endulzar relaciones familiares, sanar heridas del corazón y atraer conexiones de almas afines.",
    ingredients: "Una vela rosa, miel pura, pétalos de rosa o flores blancas, y sahumerio de lavanda o vainilla.",
    affirmation: "'En mi hogar y en mi corazón reina la perfecta armonía. Sano mis relaciones con amor incondicional y atraigo vínculos sinceros, leales y enriquecedores.'",
    steps: [
      "1. Sahumar la Dulzura: Enciende el sahumerio de lavanda o vainilla para impregnar el ambiente de ternura y paz.",
      "2. El Círculo del Afecto: Coloca los pétalos de flores formando un círculo protector alrededor de la vela rosa.",
      "3. El Papel de la Reconciliación: Escribe los nombres de tus seres queridos o de personas con las que desees limar asperezas, ungiendo el papel con una gota de miel.",
      "4. El Encendido del Amor: Enciende la vela rosa, cerrando los ojos y envolviendo a esas personas en una esfera de luz rosada.",
      "5. Bendición de la Paz: Coloca las palmas de tus manos sobre tu pecho y respira serenidad durante 5 minutos."
    ],
    closing: "Deja consumir la vela y entierra el papel con miel bajo una planta con flores hermosas."
  },
  {
    name: "Portal 7/7 (El Ojo Místico, Alta Magia e Intuición Profunda)",
    category: "portal",
    emoji: "✨",
    element: "🔮 Éter y Agua Psíquica",
    planet: "♆ Neptuno y El Carro (Arcano VII)",
    timing: "Noche (7 de Julio)",
    month: 6, // Julio
    day: 7,
    astroDesc: "El Portal 7/7 vibra con el número místico por excelencia: los 7 chakras, las 7 leyes herméticas y el despertar del tercer ojo. Es el día más potente del verano para realizar consultas profundas al Tarot, meditaciones de canalización y consagración de herramientas mágicas.",
    ingredients: "Una vela morada o plateada, aceite esencial de lavanda, tu mazo de Tarot favorito y una copa con agua pura.",
    affirmation: "'Abro mi visión interior a la sabiduría cósmica. Confío plenamente en mi intuición; mis percepciones son claras, certeras y guiadas por la luz divina.'",
    steps: [
      "1. Unción del Tercer Ojo: Aplica una microgota de aceite de lavanda en tu entrecejo (Chakra Ajna) realizando un suave masaje circular.",
      "2. El Encendido de la Visión: Enciende la vela morada en un espacio en penumbra y silencio.",
      "3. Consagración del Oráculo: Pasa tu mazo de Tarot suavemente sobre el calor de la vela (sin acercarlo al fuego) decretando su claridad.",
      "4. Tirada de Evolución Espiritual: Baraja las cartas y extrae 3 Arcanos para conocer el mensaje crucial que tus guías tienen para ti hoy.",
      "5. Elixir de Intuición: Bebe la copa de agua lentamente antes de dormir para retener los mensajes en tus sueños."
    ],
    closing: "Deja consumir la vela en un lugar seguro y anota en tu diario las revelaciones de tu lectura."
  },
  {
    name: "Portal 8/8 (La Puerta del León, Sirio y Abundancia Imperial)",
    category: "portal",
    emoji: "✨",
    element: "🦁 Fuego Solar y Luz Estelar",
    planet: "♌ Sol en Leo, Estrella Sirio y La Fuerza (Arcano VIII)",
    timing: "Mediodía Solar o Amanecer (8 de Agosto)",
    month: 7, // Agosto
    day: 8,
    astroDesc: "El Portal de la Puerta del León (Lionsgate) es el vórtice de manifestación más celebrado del año esotérico. Ocurre cuando la estrella Sirio se alinea con el cinturón de Orión y el Sol en Leo. Rige el poder personal infinito (símbolo del infinito ∞ del número 8), el éxito financiero extraordinario y el renacimiento áurico de la realeza del alma.",
    ingredients: "Una vela dorada o naranja brillante, pirita o citrino, 3 hojas secas de laurel y una copa de agua con una pizca de sal marina.",
    affirmation: "'Reclamo mi poder real bajo el portal de la Puerta del León. Abro las compuertas de la abundancia infinita. Soy próspero/a, soberano/a y capaz de manifestar todos los anhelos de mi corazón.'",
    steps: [
      "1. Sahumerio Dorado: Quema canela o incienso de mirra alrededor de tu altar para magnetizar riqueza y honor.",
      "2. El Fuego del León: Enciende la vela dorada y coloca a sus pies el cristal de pirita o citrino.",
      "3. La Copa de Sal: Coloca la copa de agua con sal a la izquierda para absorber cualquier duda sobre tu propio merecimiento.",
      "4. El Fuego del Laurel: Quema las 3 hojas de laurel en la llama de la vela, visualizando con nitidez tus mayores metas financieras logradas.",
      "5. Carga del Talismán: Toma el cristal con tus manos, siente su vibración cálida y colócalo en tu bolso o billetera."
    ],
    closing: "Vierte el agua con sal por el desagüe y conserva el cristal cargado como tu imán de riqueza constante."
  },
  {
    name: "Portal 9/9 (Culminación Kármica, Perdón y Liberación del Alma)",
    category: "portal",
    emoji: "✨",
    element: "🍂 Tierra y Fuego Alquímico",
    planet: "♄ Saturno y El Ermitaño (Arcano IX)",
    timing: "Atardecer (9 de Septiembre)",
    month: 8, // Septiembre
    day: 9,
    astroDesc: "El Portal 9/9 vibra con la culminación, la síntesis del viaje y el cierre definitivo de ciclos. Rige la capacidad de perdonar, soltar viejas deudas emocionales y ascender a un nivel evolutivo superior libre de amargura o apegos.",
    ingredients: "Una vela blanca, papel pergamino, un hilo negro o morado, sahumerio de romero y tijeras consagradas.",
    affirmation: "'Cierro con amor y profunda gratitud los ciclos que ya cumplieron su propósito en mi vida. Perdono el pasado, asimilo su maestría y avanzo libre hacia mi nuevo destino.'",
    steps: [
      "1. Escribir los Lazos del Pasado: Escribe en el papel las situaciones, personas o dolores que te mantuvieron atado/a.",
      "2. El Nudo y el Corte: Enrolla el papel y átalo con el hilo negro. Toma las tijeras y corta el hilo de un solo golpe decretando: 'Corto y libero'.",
      "3. La Quema del Pasado: Enciende la vela blanca y quema el papel atado en un cuenco seguro, visualizando cómo se disuelven los lazos kármicos.",
      "4. Sahumar la Paz: Pasa el humo del romero por tu pecho y cabeza, sintiendo una profunda ligereza y alivio interior.",
      "5. Decreto del Vacío Fértil: Respira hondo 9 veces, afirmando tu libertad emocional y espiritual."
    ],
    closing: "Entierra las cenizas en la tierra exterior, dejando ir definitivamente el pasado."
  },
  {
    name: "Portal 10/10 (El Salto Cuántico, Soberanía y Nueva Octava)",
    category: "portal",
    emoji: "✨",
    element: "⚡ Éter y Fuego Creador",
    planet: "☉ El Sol y La Rueda de la Fortuna (Arcano X)",
    timing: "Mañana o Mediodía (10 de Octubre)",
    month: 9, // Octubre
    day: 10,
    astroDesc: "El Portal 10/10 representa el renacimiento espiritual y la apertura de una nueva octava de conciencia (1+0 = 1). Marca el instante en que la Rueda de la Fortuna gira a tu favor, permitiéndote liderar tu vida con coraje y definir un nuevo plan maestro a 6 meses.",
    ingredients: "Una vela roja o naranja, un cuaderno o libreta nueva y sahumerio de eucalipto o menta.",
    affirmation: "'Doy inicio a un nuevo nivel evolutivo en mi existencia. Asumo el liderazgo de mi destino con coraje, fe y determinación inquebrantable. La rueda gira a mi favor.'",
    steps: [
      "1. Purificar la Mente: Enciende el sahumerio de eucalipto para despejar tu campo de visión mental.",
      "2. Estrenar el Cuaderno Maestro: Abre tu nueva libreta y escribe en la portada: 'Mi Nueva Octava de Victoria — Portal 10/10'.",
      "3. Los Tres Objetivos Mayores: Redacta tus 3 metas principales a manifestar en los próximos 6 meses con fechas estimadas.",
      "4. El Encendido del Liderazgo: Enciende la vela roja contemplando la llama con determinación y seguridad en tu éxito.",
      "5. Sello de la Voluntad: Coloca tu mano derecha sobre el cuaderno y repite el decreto tres veces con voz firme."
    ],
    closing: "Deja consumir la vela y revisa tu cuaderno cada semana para evaluar tu avance."
  },
  {
    name: "Portal 11/11 (La Gran Puerta del Yo Superior y Manifestación)",
    category: "portal",
    emoji: "✨",
    element: "💫 Luz Divina y Éter",
    planet: "⭐ Número Maestro 11 y La Fuerza / La Justicia",
    timing: "11:11 AM o 11:11 PM (11 de Noviembre)",
    month: 10, // Noviembre
    day: 11,
    astroDesc: "El Portal 11/11 es universalmente reconocido como la cúspide de la alineación cósmica y la manifestación instantánea. La vibración maestra del 11 actúa como un puente directo entre tu conciencia terrenal y tu Yo Superior, acelerando la sincronía y la materialización de los anhelos del alma.",
    ingredients: "Una vela blanca y una vela dorada, aceite de sándalo o mirra, flores blancas y papel pergamino para tus 11 intenciones.",
    affirmation: "'Me alineo en perfecta resonancia con la luz de mi Yo Superior. Mis pensamientos son puros, mis intenciones son elevadas y manifiesto bendiciones en armonía con el universo.'",
    steps: [
      "1. El Altar de la Doble Columna: Coloca las flores blancas. Sitúa la vela blanca a la izquierda y la dorada a la derecha formando un portal.",
      "2. Unción Sagrada: Aplica una gota de sándalo en tus sienes, muñecas y entrecejo para elevar tu frecuencia vibratoria.",
      "3. Escribir las 11 Intenciones: Escribe en el pergamino 11 decretos redactados en tiempo presente con gratitud (ej: 'Agradezco la perfecta salud de mi cuerpo').",
      "4. La Meditación de las 11:11: A las 11:11 enciende ambas velas y permanece en silencio absoluto, visualizando un pilar de luz blanca que desciende desde el cosmos sobre tu coronilla.",
      "5. Sellar el Pergamino: Pasa el papel entre ambas velas y dóblalo en cuatro partes con reverencia."
    ],
    closing: "Guarda el pergamino en tu cofre sagrado y deja consumir las velas bajo vigilancia."
  },
  {
    name: "Portal 12/12 (Integración Cósmica, Sello Dorado y Protección)",
    category: "portal",
    emoji: "✨",
    element: "👑 Éter Dorado",
    planet: "♃ Júpiter y El Colgado / El Mundo",
    timing: "Noche (12 de Diciembre)",
    month: 11, // Diciembre
    day: 12,
    astroDesc: "El Portal 12/12 representa el cierre de la rueda geométrica del año (los 12 signos, los 12 meses, las 12 casas). Activa la integración de todas las lecciones vividas y sella tu campo áurico en un escudo de luz protectora antes del solsticio de invierno.",
    ingredients: "Una vela morada o dorada, incienso de olíbano o copal, un vaso de agua con unas gotas de limón y un cordón dorado.",
    affirmation: "'Integro en mi alma la sabiduría de todo este ciclo. Sello mi aura con luz dorada inquebrantable. Estoy listo/a para recibir las bendiciones del nuevo ciclo que nace.'",
    steps: [
      "1. Sahumar el Cierre: Quema el incienso de olíbano o copal por toda tu estancia, sellando energéticamente tu templo.",
      "2. El Encendido de la Integración: Enciende la vela morada o dorada visualizando una burbuja de luz violeta protectora a tu alrededor.",
      "3. Meditación de la Gratitud Total: Recuerda los 12 meses transcurridos; agradece los momentos felices y bendice los aprendizajes de los momentos difíciles.",
      "4. El Elixir de Purificación: Bebe el vaso de agua con limón visualizando que limpia cualquier residuo de tensión física.",
      "5. El Nudo Dorado de Protección: Haz 12 nudos en el cordón dorado recitando una bendición por cada uno, y átalo a tu muñeca izquierda o cabecero de cama."
    ],
    closing: "Deja consumir la vela sabiendo que tu año energético queda sellado y protegido."
  },

  // =========================================================================
  // --- 3. FESTIVIDADES TRADICIONALES Y SANTOS ESOTÉRICOS ---
  // =========================================================================
  {
    name: "Noche de Reyes y Epifanía (Las Tres Llaves del Destino)",
    category: "traditional",
    emoji: "👑",
    element: "⭐ Aire y Éter",
    planet: "♃ Júpiter y La Estrella",
    timing: "Noche de Reyes (5 al 6 de Enero)",
    month: 0, // Enero
    day: 5,
    astroDesc: "La víspera de la Epifanía está impregnada de la magia de los Tres Reyes Magos astrólogos guiados por la estrella de Belén. Rige la ilusión pura, la apertura de puertas cerradas y la recepción de dones espirituales y materiales del universo.",
    ingredients: "Un vaso de agua pura, un plato con granos (arroz y avena), tres llaves metálicas antiguas o llaves en desuso, y una vela blanca.",
    affirmation: "'Sigo mi estrella guía con fe y humildad. Las tres llaves del destino abren para mí las puertas del amor verdadero, la salud perfecta y la prosperidad económica.'",
    steps: [
      "1. Ofrenda de Respeto: Coloca el vaso de agua y el plato de granos en la ventana o entrada de tu casa como ofrenda de acogida.",
      "2. Las Tres Llaves en Cruz: Coloca las tres llaves sobre tu altar formando una cruz o triángulo.",
      "3. La Carta de los 3 Dones: Escribe al universo tres peticiones sinceras de crecimiento espiritual y material.",
      "4. El Fuego de la Epifanía: Enciende la vela blanca y lee tu carta en voz alta con profunda emoción.",
      "5. El Sueño Revelador: Coloca la carta bajo tu almohada durante la noche del 5 al 6 de enero."
    ],
    closing: "Por la mañana, guarda una de las tres llaves en tu bolso o billetera como amuleto abrecaminos durante todo el año."
  },
  {
    name: "Día de la Candelaria (Purificación del Fuego Bendito)",
    category: "traditional",
    emoji: "🕯️",
    element: "🔥 Fuego Sagrado",
    planet: "☀️ El Sol y Vesta",
    timing: "Amanecer o Mediodía (2 de Febrero)",
    month: 1, // Febrero
    day: 2,
    astroDesc: "La fiesta tradicional de la Candelaria representa la bendición de la luz protectora contra tempestades y sombras. Es el momento clásico para bendecir las velas que se usarán en el hogar a lo largo de todo el año.",
    ingredients: "Un juego de velas de distintos colores (blanca, verde, roja, amarilla), agua bendita o agua con sal marina, y una ramita de olivo o romero.",
    affirmation: "'Bendigo la luz de este fuego sagrado. Que estas velas protejan mi hogar de toda adversidad, disuelvan cualquier sombra y mantengan encendida la llama de la paz y el amor.'",
    steps: [
      "1. Agrupar las Velas: Coloca todas tus velas en una cesta o bandeja de madera en tu altar.",
      "2. Aspersión Sagrada: Con la ramita de olivo o romero, rocía unas gotas de agua con sal sobre las velas decretando su consagración.",
      "3. Encendido Testigo: Enciende una vela blanca central y deja que su llama bendiga al resto del grupo.",
      "4. Oración de Protección: Recita la afirmación con devoción mirando la luz.",
      "5. Guardado Sagrado: Guarda estas velas consagradas en un paño blanco, listas para encenderlas en momentos de necesidad."
    ],
    closing: "Deja consumir la vela blanca central en tu mesa de comedor para atraer paz al hogar."
  },
  {
    name: "Lupercalia y San Valentín (Alquimia del Amor y Autoamor)",
    category: "traditional",
    emoji: "💖",
    element: "💧 Agua y Fuego",
    planet: "♀ Venus y El Amor",
    timing: "Atardecer (14 de Febrero)",
    month: 1, // Febrero
    day: 14,
    astroDesc: "Heredera de las antiguas Lupercales romanas de fertilidad y del día tradicional de los enamorados, esta fecha concentra la energía colectiva del afecto. Es ideal para endulzamientos de pareja sana, atracción de almas gemelas y consagración del amor propio.",
    ingredients: "Una vela rosa o roja, una cucharada de miel pura, canela en polvo, pétalos de rosa y una foto tuya (o de la pareja).",
    affirmation: "'Soy digno/a de amar y ser amado/a en libertad, lealtad y ternura. Endulzo mi energía y me abro a una conexión de amor profunda, madura y feliz.'",
    steps: [
      "1. Preparación del Plato del Afecto: Coloca los pétalos de rosa formando un corazón en un plato de cerámica.",
      "2. El Papel del Endulzamiento: Escribe en un papel tu nombre completo y las cualidades afectivas que mereces y ofreces.",
      "3. La Miel y Canela: Vierte la cucharada de miel sobre el papel y espolvorea canela en polvo encima, visualizando dulzura y pasión.",
      "4. El Encendido del Corazón: Enciende la vela rosa colocándola junto al plato, contemplando la luz con gratitud en el pecho.",
      "5. Meditación de Amor Propio: Abrázate a ti mismo/a durante 2 minutos afirmando tu infinito valor divino."
    ],
    closing: "Una vez consumida la vela, envuelve los restos en papel de aluminio y entiérralos en una maceta con flores."
  },
  {
    name: "San Jorge (Protección del Dragón, Valor y el Laurel)",
    category: "traditional",
    emoji: "🛡️",
    element: "🔥 Fuego y Tierra",
    planet: "♂ Marte y El Hierro",
    timing: "Mediodía (23 de Abril)",
    month: 3, // Abril
    day: 23,
    astroDesc: "La festividad de San Jorge y el Dragón representa el triunfo del coraje y la pureza espiritual sobre las fuerzas del caos, el miedo y la envidia. Es un día tradicional de protección de propiedades, bendición de espadas simbólicas y superación de juicios o enemigos ocultos.",
    ingredients: "Una vela roja, una rosa roja fresca, hojas de laurel seco, aceite de oliva y un objeto metálico protector.",
    affirmation: "'Con la lanza del coraje y el escudo de la verdad, venzo todo temor y disuelvo cualquier ataque o envidia. Mi fortaleza es inquebrantable y triunfo en toda prueba.'",
    steps: [
      "1. Unción de la Vela: Unta la vela roja con unas gotas de aceite de oliva desde la base hacia la mecha para elevar tu escudo protector.",
      "2. El Círculo de Laurel: Rodea la vela con hojas de laurel seco como símbolo de victoria inmortal.",
      "3. La Rosa del Valor: Coloca la rosa roja junto a tu objeto metálico en el altar.",
      "4. El Encendido Marcial: Enciende la vela roja con firmeza, recitando el decreto con autoridad espiritual.",
      "5. Quema de los Miedos: Quema una hoja de laurel en la llama visualizando cómo tu miedo se convierte en valentía."
    ],
    closing: "Conserva los pétalos de la rosa seca en un saquito rojo como talismán protector en tu coche o bolso."
  },
  {
    name: "Noche de Walpurgis (El Gran Sahumerio y Purificación)",
    category: "traditional",
    emoji: "🧹",
    element: "🔥 Fuego y Humo Sagrado",
    planet: "♄ Saturno y Plutón",
    timing: "Noche (30 de Abril a 1 de Mayo)",
    month: 3, // Abril
    day: 30,
    astroDesc: "La víspera de Beltane es la noche tradicional de la quema de la pesadez acumulada en el invierno y el destierro de bajas vibraciones antes de la gran fiesta primaveral. Es la noche suprema del barrido mágico del hogar.",
    ingredients: "Una escoba de paja o ramas de romero, una vela negra (destierro) y una vela blanca (bendición), sal gruesa e incienso de ruda o azufre vegetal.",
    affirmation: "'Barro de mi hogar y de mi mente toda discordia, envidia o pesadez. Purifico este recinto sagrado y abro las puertas de par en par a las bendiciones de la luz.'",
    steps: [
      "1. El Barrido Místico: Barre enérgicamente toda la casa desde la habitación más profunda hacia la puerta principal de salida.",
      "2. El Umbral de Sal: Coloca una línea fina de sal gruesa en el umbral exterior de la puerta de entrada para sellar la entrada contra malas intenciones.",
      "3. El Fuego del Destierro: Enciende la vela negra en un lugar seguro para que absorba cualquier resto de negatividad.",
      "4. El Fuego de la Paz: Enciende la vela blanca para llenar el espacio de armonía luminosa.",
      "5. Sahumar con Ruda: Pasa el humo de ruda o romero por todos los marcos de las puertas."
    ],
    closing: "Recoge la sal del umbral a la mañana siguiente con una pala y tírala a la basura fuera de tu casa."
  },
  {
    name: "Noche Mágica de San Juan (Fuego Sagrado y Agua del Sereno)",
    category: "traditional",
    emoji: "🔥",
    element: "🔥 Fuego y 💧 Agua",
    planet: "☀️ El Sol y La Luna Llena de San Juan",
    timing: "Noche del 23 al 24 de Junio",
    month: 5, // Junio
    day: 23,
    astroDesc: "La noche más mágica y popular del año reúne la fuerza del fuego purificador y el agua bendecida por el rocío del sereno nocturno. Es la festividad tradicional para quemar lo viejo, saltar las hogueras de la renovación, lavarse el rostro para la belleza y consagrar amuletos botánicos.",
    ingredients: "Ramas de romero, lavanda, hipérico (hierba de San Juan) o ruda, un cuenco con agua limpia de manantial, papel blanco y una vela roja o naranja.",
    affirmation: "'En la noche sagrada de San Juan, quemo mis pesares y renazco en fuerza, belleza y juventud. El fuego me purifica y el agua del sereno bendice mi rostro y mi alma.'",
    steps: [
      "1. La Maceración del Sereno: Coloca el cuenco de agua con las ramas aromáticas en tu ventana o terraza para que reciba el influjo de la noche mágica.",
      "2. La Carta de lo que se Quema: Escribe en el papel todo aquello que te causó dolor, rupturas o deudas en el último año.",
      "3. La Hoguera Alquímica: Enciende la vela roja. Quema el papel con cuidado visualizando que todo ese dolor se transforma en luz liberadora.",
      "4. El Baño de Rostro Matutino: Al amanecer del 24 de junio, lávate la cara con el agua del sereno de hierbas sin secarte con toalla.",
      "5. El Laurel de la Fortuna: Guarda una hoja de laurel pasada por el humo de la vela en tu monedero durante todo el año."
    ],
    closing: "Riega las plantas de tu hogar con el agua sobrante de hierbas para bendecir tu casa con vitalidad."
  },
  {
    name: "Lágrimas de San Lorenzo / Perseidas (Lluvia de Deseos)",
    category: "traditional",
    emoji: "🌠",
    element: "⭐ Éter Estelar",
    planet: "🌌 Constelación de Perseo y Urano",
    timing: "Madrugada del 12 al 13 de Agosto",
    month: 7, // Agosto
    day: 12,
    astroDesc: "El pico de la lluvia de meteoros de las Perseidas conecta la atmósfera terrestre con el polvo cósmico del cometa Swift-Tuttle. Es la noche más propicia para formular intenciones sublimes al cielo nocturno, sintonizar con la inmensidad del universo y practicar la meditación estelar.",
    ingredients: "Un cuenco con agua que refleje el cielo, pétalos de flores blancas, una vela azul celeste y un papel blanco con tus 3 mayores anhelos.",
    affirmation: "'Como estrellas que descienden para iluminar la noche, mis anhelos más puros se manifiestan en la Tierra con armonía y gracia divina. Confío en mi destino.'",
    steps: [
      "1. El Espejo de las Estrellas: Coloca el cuenco de agua y los pétalos cerca de una ventana o al aire libre bajo el cielo nocturno.",
      "2. Mirada al Firmamento: Contempla el cielo durante 10 minutos, respirando hondo y sintonizando con el silencio sideral.",
      "3. Escribir los Deseos Cósmicos: Escribe en el papel tus tres peticiones redactadas con claridad y fe.",
      "4. El Encendido Celeste: Enciende la vela azul celeste como faro de paz y serenidad mental.",
      "5. El Sello del Agua Estelar: Humedece las cuatro puntas del papel en el cuenco de agua y déjalo secar al lado de la vela."
    ],
    closing: "Guarda el papel seco en tu diario esotérico hasta el próximo verano."
  },
  {
    name: "San Miguel Arcángel (Corte de Lazos Kármicos y Espada Azul)",
    category: "traditional",
    emoji: "⚔️",
    element: "🔥 Fuego Celestial y 💨 Aire",
    planet: "☀️ El Sol y Arcángel Miguel",
    timing: "Mediodía o Atardecer (29 de Septiembre)",
    month: 8, // Septiembre
    day: 29,
    astroDesc: "La festividad del Príncipe de las Milicias Celestiales, San Miguel Arcángel, es el día por excelencia para cortar ataduras tóxicas, lazos energéticos desgastantes con exparejas o personas vampíricas, y sellar el aura con la espada de llama azul de la verdad.",
    ingredients: "Una vela azul rey o dorada, incienso de sándalo o ruda, una cinta o hilo azul, tijeras y una imagen de San Miguel o una espada simbólica.",
    affirmation: "'San Miguel Arcángel a mi derecha, a mi izquierda, delante y detrás. Con tu espada de luz azul, corta todo lazo de apego, envidia y discordia. Reclamo mi libertad y mi paz.'",
    steps: [
      "1. Sahumerio de Protección: Enciende el incienso de sándalo y pasa el humo alrededor de tus hombros y espalda.",
      "2. El Lazo de la Atadura: Ata suavemente la cinta azul alrededor de tus muñecas, simbolizando las ataduras emocionales que deseas soltar.",
      "3. El Corte con la Espada: Con las tijeras consagradas, corta la cinta azul de un solo golpe diciendo con fuerza: '¡Quedo libre y en paz!'.",
      "4. El Encendido de la Victoria: Enciende la vela azul rey, visualizando un escudo de luz azul eléctrico a tu alrededor.",
      "5. Decreto de Sellado: Recita la afirmación tres veces con la mano derecha sobre el corazón."
    ],
    closing: "Quema los trozos de la cinta cortada en un recipiente seguro y desecha las cenizas fuera de tu casa."
  },
  {
    name: "Día de Todos los Santos (Luz Eterna y Sahumerio de Paz)",
    category: "traditional",
    emoji: "🕯️",
    element: "🕊️ Aire y Éter",
    planet: "🌙 La Luna y Júpiter",
    timing: "Mañana o Tarde (1 de Noviembre)",
    month: 10, // Noviembre
    day: 1,
    astroDesc: "El día posterior a Samhain se consagra a la elevación de las almas, la paz espiritual del hogar y el agradecimiento a los seres queridos que ya alcanzaron la luz. Es un momento propicio para limpiezas de armonía familiar y sahumerios dulces.",
    ingredients: "Una vela blanca lisa, un vaso de agua pura, flores blancas e incienso de mirra, benjuí o copal.",
    affirmation: "'Envuelvo mi hogar y a mis ancestros en luz eterna y bendición. Que la paz, la serenidad y el amor reinen en este templo y en los corazones de mi familia.'",
    steps: [
      "1. El Vaso de la Luz: Coloca el vaso de agua limpia y las flores blancas en tu mesa o altar.",
      "2. El Encendido de la Paz: Enciende la vela blanca ofreciendo una oración sincera por la paz de todos los difuntos de tu linaje.",
      "3. Sahumar con Benjuí: Recorre tu casa con el incienso de benjuí o mirra desde el interior hacia afuera, dejando una atmósfera dulce y pacífica.",
      "4. Bendición del Umbral: Pasa el humo por el marco de la puerta de entrada.",
      "5. Momento de Quietud: Siéntate unos minutos en silencio sintiendo el amor incondicional que te rodea."
    ],
    closing: "Deja consumir la vela blanca en un lugar seguro y cambia el agua del vaso al día siguiente."
  },
  {
    name: "Santa Lucía (La Corona de Velas y Despertar de la Visión)",
    category: "traditional",
    emoji: "👁️",
    element: "✨ Luz Solar en el Invierno",
    planet: "☀️ Sol y Venus",
    timing: "Noche (13 de Diciembre)",
    month: 11, // Diciembre
    day: 13,
    astroDesc: "La festividad de Santa Lucía ('portadora de la luz') conmemora la victoria de la visión espiritual en los días más cortos y oscuros del año previo a Yule. Rige la curación de la vista física y psíquica, la claridad ante encrucijadas y la protección contra la ceguera emocional.",
    ingredients: "Una vela blanca, un cuenco con agua tibia infusionada con manzanilla, y miel de abejas.",
    affirmation: "'Que la bendita luz de Santa Lucía aclare mi mirada y disuelva toda niebla de duda o confusión. Elijo ver la verdad con amor, sabiduría y discernimiento.'",
    steps: [
      "1. La Infusión de Claridad: Prepara la infusión de manzanilla y déjala entibiar.",
      "2. El Fuego de la Visión: Enciende la vela blanca en tu altar.",
      "3. El Lavado de Ojos: Humedece dos algodones limpios en la manzanilla y colócalos sobre tus párpados cerrados durante 5 minutos.",
      "4. Meditación de la Luz: Retira los algodones, abre los ojos y contempla la llama de la vela sintiendo alivio y frescura en tu mirada.",
      "5. Consagración del Decreto: Repite la afirmación en voz alta con total certeza de claridad."
    ],
    closing: "Deja consumir la vela y bebe un té de manzanilla con miel antes de dormir."
  },
  {
    name: "Nochevieja (La Gran Transmutación y Siembra de Fortuna)",
    category: "traditional",
    emoji: "🍇",
    element: "👑 Fuego y Oro",
    planet: "🪐 Saturno (Cierre) y ☀️ Sol (Reinicio)",
    timing: "Noche del 31 de Diciembre a medianoche",
    month: 11, // Diciembre
    day: 31,
    astroDesc: "La noche final del año reúne la fuerza condensada de todo el ciclo vivido. Es el momento supremo para la purificación, la expulsión de pesares viejos y la atracción magnética del amor, la salud radiante y la prosperidad para los próximos 365 días.",
    ingredients: "Una copa para el brindis, un anillo u objeto de oro puro, 12 uvas (o pasas), una prenda de color rojo o amarillo, un papel de quemar y una vela dorada.",
    affirmation: "'Dejo ir con gratitud infinita todo lo vivido en el año que concluye. Me abro a la victoria, la salud perfecta y la riqueza ilimitada en este año nuevo que nace.'",
    steps: [
      "1. El Barrido del Año Viejo: Barre tu hogar hacia la puerta exterior antes de las 10:00 PM para expulsar la energía estancada.",
      "2. El Papel del Desahogo: Escribe en un papel las lágrimas, deudas o dificultades del año que termina y quémalo antes de medianoche.",
      "3. El Hechizo del Oro en la Copa: Introduce el anillo de oro limpio en tu copa de champán, sidra o zumo.",
      "4. Las 12 Uvas de la Manifestación: Come las 12 uvas al son de las campanadas, decretando un deseo por cada campanada.",
      "5. El Brindis Consagrado: Brinda con el anillo dentro de la copa, bebe el líquido (con precaución) y colócate el anillo de inmediato decretando abundancia."
    ],
    closing: "Lleva el anillo de oro durante el 1 de enero como talismán magnetizador de prosperidad."
  }
];

// =========================================================================
// --- 4. RITUALES DINÁMICOS DE LUNACIONES Y ECLIPSES ---
// =========================================================================

function getLunationRitual(date, moonPhase) {
  const phase = moonPhase.phase;
  
  // Luna Llena (Aprox 48.5% a 51.5% o phaseName === 'Luna Llena')
  if (moonPhase.phaseName === "Luna Llena" || (phase >= 0.485 && phase <= 0.515)) {
    return {
      name: "Esplendor de Luna Llena 🌕 (Consagración y Máxima Intuición)",
      category: "moon",
      emoji: "🌕",
      element: "💧 Agua y Plata Cósmica",
      planet: "🌙 Luna en Plenitud",
      timing: "Noche de plenilunio (bajo la luz visible de la Luna)",
      astroDesc: "La gran linterna de plata brilla hoy en su apogeo absoluto, vertiendo torrentes de magnetismo y luz plateada sobre el inconsciente y las facultades psíquicas. La Luna Llena rige la cosecha emocional, la carga máxima de barajas de Tarot y cristales, y la disolución consciente de ataduras o dolores viejos.",
      ingredients: "Una vela blanca lisa, un cuenco con agua limpia (para cargar bajo el sereno), una varita de incienso de romero o sándalo, tu mazo de Tarot y un cuarzo blanco o selenita.",
      affirmation: "'Bajo el amparo y la luz purificadora de esta Luna Llena, libero los miedos y ataduras de mi pasado. Agradezco las cosechas de mi alma y me abro al flujo infinito de la sabiduría universal.'",
      steps: [
        "1. Baño de Humo Purificador: Enciende el incienso de romero y pásalo en suaves espirales alrededor de tu cuerpo y de tu mazo de Tarot.",
        "2. El Agua de Luna: Coloca el cuenco de agua en tu ventana para que absorba el magnetismo de los rayos lunares directos.",
        "3. La Carga de Cristales: Coloca tu cuarzo o selenita junto al cuenco de agua, pidiendo que se recargue con intuición pura.",
        "4. Escribir para Soltar: En un papel pequeño, escribe aquello de lo que deseas desapegarte (rencores, bloqueos, deudas afectivas).",
        "5. Alquimia de Liberación: Quema el papel en la llama de la vela blanca en un recipiente seguro, decretando tu liberación definitiva."
      ],
      closing: "Bebe un sorbo del agua cargada a la mañana siguiente para retener la claridad psíquica y riega una planta con el resto."
    };
  }
  
  // Luna Nueva (Aprox < 2.5% o >= 97.5% o phaseName === 'Luna Nueva')
  if (moonPhase.phaseName === "Luna Nueva" || phase < 0.025 || phase >= 0.975) {
    return {
      name: "Semilla de Luna Nueva 🌑 (Siembra de Intenciones y Vacío Fértil)",
      category: "moon",
      emoji: "🌑",
      element: "🌌 Éter y Tierra Fecunda",
      planet: "🌑 Conjunción Sol-Luna",
      timing: "Noche sin luna o crepúsculo",
      astroDesc: "El firmamento se viste de oscuridad absoluta, marcando el renacimiento de la Luna en el vientre del cosmos. Es el instante de silencio supremo donde se gestan las nuevas realidades. Rige la introspección silenciosa, la siembra de metas a 28 días y el inicio de proyectos que arrancan desde cero.",
      ingredients: "Una vela azul marino o blanca, una maceta pequeña con tierra fértil (o tu diario esotérico), semillas de lavanda o flores, y sahumerio de copal o ruda.",
      affirmation: "'En la fecunda oscuridad de esta Luna Nueva, planto mis anhelos con absoluta certeza y fe. Confío plenamente en el ritmo divino para verlos florecer en el momento perfecto.'",
      steps: [
        "1. Sahumerio del Silencio: Quema copal o ruda para limpiar el ambiente de cansancio y propiciar un estado de recogimiento profundo.",
        "2. Meditación en Penumbra: Apaga las luces y permanece 5 minutos en silencio, sintiendo la energía latente de tus metas en el corazón.",
        "3. La Lista de las 5 Semillas: Escribe en tu diario hasta 5 intenciones redactadas en presente y positivo.",
        "4. El Faro de la Manifestación: Enciende la vela azul y lee tus intenciones en voz alta tres veces con emoción sentida.",
        "5. Siembra Física: Entierra las semillas en la maceta junto a tu lista doblada en cuatro partes, simbolizando su enraizamiento material."
      ],
      closing: "Riega la maceta con amor y cuídala como el reflejo de tus proyectos nacientes."
    };
  }

  // Cuarto Creciente (Aprox 22.5% a 27.5%)
  if (moonPhase.phaseName === "Cuarto Creciente" || (phase >= 0.225 && phase <= 0.275)) {
    return {
      name: "Impulso de Cuarto Creciente 🌓 (Acción Decidida y Superación)",
      category: "moon",
      emoji: "🌓",
      element: "🔥 Fuego y Aire",
      planet: "🌓 Luna Cuadratura Sol",
      timing: "Tarde o primeras horas de la noche",
      astroDesc: "La Luna se encuentra dividida exactamente a la mitad iluminada. Es la fase del esfuerzo consciente, la toma de decisiones audaces y la superación de las primeras dudas u obstáculos que surgen tras la siembra de la Luna Nueva. Requiere disciplina y coraje.",
      ingredients: "Una vela verde o naranja, una hoja de laurel, canela en polvo y un cuarzo ojo de tigre.",
      affirmation: "'Tengo el valor, la claridad y la fuerza para superar cualquier obstáculo. Mis metas toman forma con determinación y avanzo con paso firme hacia el éxito.'",
      steps: [
        "1. Sahumar la Determinación: Quema un pellizco de canela para activar la vitalidad y la constancia mental.",
        "2. El Decreto en el Laurel: Escribe en la hoja de laurel el paso concreto que darás esta semana para avanzar en tu meta.",
        "3. El Encendido de la Fuerza: Enciende la vela naranja sosteniendo el ojo de tigre en tu mano dominante.",
        "4. Visualización del Triunfo: Contempla la llama visualizándote superando el reto que tienes por delante.",
        "5. Conservación del Laurel: Guarda el laurel dentro de tu agenda de trabajo hasta la Luna Llena."
      ],
      closing: "Deja consumir la vela y lleva el ojo de tigre contigo durante tus reuniones o gestiones importantes."
    };
  }

  // Cuarto Menguante (Aprox 72.5% a 77.5%)
  if (moonPhase.phaseName === "Cuarto Menguante" || (phase >= 0.725 && phase <= 0.775)) {
    return {
      name: "Liberación de Cuarto Menguante 🌗 (Perdón y Desintoxicación)",
      category: "moon",
      emoji: "🌗",
      element: "💧 Agua Purificadora",
      planet: "🌗 Luna Cuadratura Sol",
      timing: "Madrugada o antes de acostarse",
      astroDesc: "La mitad iluminada de la Luna comienza su retiro final. Es la fase propicia para romper malos hábitos, cancelar deudas, limpiar el hogar de energías estancadas, hacer limpiezas corporales y practicar el perdón sincero para no cargar pesos innecesarios.",
      ingredients: "Un puñado de sal marina gruesa, una vela blanca, un vaso de agua con vinagre y hojas de eucalipto o salvia.",
      affirmation: "'Dejo ir toda tensión, hábito dañino o rencor. Me limpio en cuerpo, mente y alma. Hago espacio para la paz y la renovación interior.'",
      steps: [
        "1. Baño de Descarga: Disuelve la sal marina en un cuenco con agua tibia y viértela sobre tu cuerpo al final de la ducha (del cuello hacia abajo).",
        "2. El Vaso Absorbedor: Coloca el vaso de agua con una cucharada de vinagre y sal en una esquina de tu dormitorio para absorber la pesadez.",
        "3. Sahumar con Salvia: Enciende el eucalipto o salvia para limpiar tu campo áurico de cansancio acumulado.",
        "4. El Fuego del Perdón: Enciende la vela blanca decretando que perdonas a quienes te ofendieron y te perdonas a ti mismo/a.",
        "5. Descanso Profundo: Bebe un vaso de agua pura antes de dormir y entrégate al descanso restaurador."
      ],
      closing: "Tira el agua con vinagre por el desagüe a la mañana siguiente y enjuaga bien el vaso."
    };
  }

  return null;
}

// =========================================================================
// --- 5. RITUALES DINÁMICOS DE ECLIPSES ---
// =========================================================================

function getEclipseRitual(date, eclipse) {
  const isSolar = eclipse.type === 'solar';
  
  if (isSolar) {
    return {
      name: `Portal de ${eclipse.name} en ${eclipse.sign} ☀️ (Redirección del Destino)`,
      category: "eclipse",
      emoji: "⚡",
      element: "🔥 Fuego Cósmico Oculto",
      planet: `☉ Sol Eclipsado en ${eclipse.sign}`,
      timing: "Durante las 24-48 horas del Eclipse Solar",
      astroDesc: `El Sol queda temporalmente oculto por la Luna en Luna Nueva, provocando un reinicio cuántico en el tejido de la conciencia. Este ${eclipse.name} en el signo de ${eclipse.sign} actúa como un catalizador kármico acelerado: abre puertas imprevistas, desvía caminos que ya no te servían y te empuja hacia tu verdadero propósito del alma. Durante un eclipse solar NO se recomienda hacer magia manipulativa ni forzar acuerdos; es un momento sagrado para el silencio, la rendición ante el plan divino y la autoobservación profunda.`,
      ingredients: "Una vela blanca o dorada, un vaso de agua pura, incienso de sándalo o mirra, y un cuaderno para anotar revelaciones intuitivas.",
      affirmation: `'Acepto la sabiduría del cosmos y la redirección divina de mis pasos. Me rindo ante lo que debe transformarse y confío en que este portal despeja mi sendero hacia mi más alto bien en ${eclipse.sign}.'`,
      steps: [
        "1. Silencio y Calma Mental: Apaga dispositivos electrónicos durante al menos una hora para no sobrecargar tu sistema nervioso.",
        "2. Sahumar la Quietud: Enciende el incienso de sándalo y respira hondo, relajando la musculatura y el entrecejo.",
        "3. El Encendido del Faro: Enciende la vela blanca como ancla de luz y estabilidad en medio de la alineación cósmica.",
        "4. Escritura de Aceptación: Escribe en tu cuaderno aquello que sientas que ya no tiene fuerza en tu vida y que estás dispuesto/a a soltar con madurez.",
        "5. Meditación en el Vacío: Permanece en postura meditativa sintiendo que te alineas con el eje de los nodos lunares del destino."
      ],
      closing: "Deja consumir la vela en un lugar seguro. No expongas tus cuarzos o barajas a la intemperie durante el eclipse; déjalos resguardados en tu altar interior."
    };
  } else {
    return {
      name: `Portal de ${eclipse.name} en ${eclipse.sign} 🩸 (Purificación Kármica y Catarsis)`,
      category: "eclipse",
      emoji: "⚡",
      element: "💧 Agua Profunda y Sombra Alquímica",
      planet: `🌙 Luna Eclipsada en ${eclipse.sign}`,
      timing: "Durante las 24-48 horas del Eclipse Lunar",
      astroDesc: `La Tierra proyecta su sombra sobre la Luna Llena, tiñéndola de tonos rojizos (Luna de Sangre). Este ${eclipse.name} en el signo de ${eclipse.sign} ilumina la sombra del inconsciente, revelando secretos, apegos ocultos y patrones kármicos que estaban listos para su purificación definitiva. Es un tiempo de profunda catarsis emocional, corte de lazos kármicos y rendición interior.`,
      ingredients: "Una vela blanca lisa, sal marina gruesa, un vaso de agua pura, y sahumerio de copal o ruda.",
      affirmation: `'Bajo este portal de eclipse lunar, abrazo mi sombra con amor y la transmuto en sabiduría. Corto todo patrón kármico limitante en ${eclipse.sign} y elijo la paz y la verdad de mi alma.'`,
      steps: [
        "1. Baño de Sal Descargante: Date una ducha tibia y frota suavemente sal marina en tus antebrazos y nuca para drenar la sobrecarga emocional.",
        "2. Sahumerio del Despojo: Quema copal o ruda pasando el humo alrededor de tu campo áurico de la cabeza a los pies.",
        "3. El Encendido de la Verdad: Enciende la vela blanca y contempla su llama con serenidad, permitiendo que afloren las emociones sin juzgarlas.",
        "4. Quema del Lazo Kármico: Escribe en un papel el patrón repetitivo o miedo que te ha pesado en este signo y quémalo en la llama con respeto.",
        "5. Sellado de Paz: Bebe el vaso de agua pura visualizando que purificas tu templo interior de cualquier vestigio de dolor."
      ],
      closing: "Desecha las cenizas en la tierra o tíralas por el desagüe con agua corriente decretando tu total liberación."
    };
  }
}

// =========================================================================
// --- 6. RITUALES DIARIOS SEGÚN EL PLANETA REGENTE DEL DÍA ---
// =========================================================================

const PLANETARY_DAYS_DB = [
  // 0: Domingo (Sol)
  {
    name: "Ritual Solar de Vitalidad y Éxito Radiante ☀️",
    planet: "☉ El Sol",
    element: "🔥 Fuego Divino",
    timing: "Al amanecer o Mediodía Solar",
    color: "#e5c158",
    astroDesc: "El domingo está regido por el Sol, dador de vida, conciencia, vitalidad y brillo personal. Es el día ideal para rituales de salud, recarga de energía física, liderazgo, consagración del propósito de vida y gratitud por las victorias alcanzadas.",
    ingredients: "Una vela dorada o amarilla, una ramita de romero o canela, una moneda dorada y una pizca de azúcar.",
    affirmation: "'Soy un reflejo vivo de la luz solar. Irradio salud, confianza y magnetismo. Mi propósito se cumple con alegría y el éxito bendice mis pasos.'",
    steps: [
      "1. Baño de Luz Solar: Sal al aire libre o abre una ventana orientada al sol durante 5 minutos, absorbiendo su calor con las palmas abiertas.",
      "2. El Endulzamiento del Éxito: Coloca la moneda en un platito y espolvorea una pizca de azúcar y canela sobre ella.",
      "3. Encendido Solar: Enciende la vela dorada y lee el decreto con voz firme y alegre.",
      "4. Sahumar la Alegría: Enciende la ramita de romero y pasa su humo por tu cabeza y hombros.",
      "5. Consagración: Lleva la moneda contigo como imán de vitalidad y buena fortuna."
    ],
    closing: "Deja consumir la vela y comienza tu semana con la mente enfocada en el triunfo."
  },
  // 1: Lunes (Luna)
  {
    name: "Ritual Lunar de Intuición y Paz Emocional 🌙",
    planet: "🌙 La Luna",
    element: "💧 Agua Sagrada",
    timing: "Atardecer o antes de dormir",
    color: "#a78bfa",
    astroDesc: "El lunes está regido por la Luna, señora de las mareas emocionales, la intuición, los sueños lúcidos y el hogar íntimo. Es el día propicio para armonizar los estados de ánimo, realizar tiradas de Tarot para la semana y purificar el aura.",
    ingredients: "Una vela blanca o plateada, un vaso de agua pura, aceite esencial de lavanda y tus cartas de Tarot.",
    affirmation: "'Sintonizo con la serenidad de mis aguas internas. Mi intuición es clara, mi mente está en calma y mi hogar está protegido por la luz sagrada.'",
    steps: [
      "1. Unción de Paz: Aplica una gota de aceite de lavanda en tus sienes y nuca para serenar el flujo mental.",
      "2. El Vaso de la Claridad: Coloca el vaso de agua limpia en tu mesita de noche o altar.",
      "3. El Encendido Blanco: Enciende la vela blanca en penumbra, respirando lento durante 3 minutos.",
      "4. Consulta Oracular de la Semana: Extrae una carta de tu mazo de Tarot para conocer la lección emocional de tus próximos días.",
      "5. Elixir de Sueños: Bebe la mitad del vaso de agua antes de acostarte para retener mensajes en tus sueños."
    ],
    closing: "A la mañana siguiente, vierte el agua restante en una maceta en agradecimiento al ciclo lunar."
  },
  // 2: Martes (Marte)
  {
    name: "Ritual Marcial de Fuerza, Coraje y Protección ⚔️",
    planet: "♂ Marte",
    element: "🔥 Fuego Valeroso",
    timing: "Mañana o Mediodía",
    color: "#f87171",
    astroDesc: "El martes está regido por Marte, planeta del impulso, la acción decisiva, el coraje y la protección activa. Es el día perfecto para romper estancamientos, vencer la pereza o el miedo, cortar lazos de discordia y defender tu espacio vital.",
    ingredients: "Una vela roja, un objeto metálico (llave o medalla), pimienta negra o clavo de olor, y papel blanco.",
    affirmation: "'Reclamo mi poder y mi valentía marcial. Ningún obstáculo detiene mi avance; corto cualquier influencia discordante y avanzo con fuerza inquebrantable.'",
    steps: [
      "1. El Papel del Reto: Escribe en el papel el obstáculo o temor que estás decidido/a a vencer esta semana.",
      "2. El Escudo Metálico: Coloca tu llave o medalla metálica sobre el papel como ancla de fortaleza.",
      "3. El Encendido del Fuego: Enciende la vela roja con decisión y postura erguida.",
      "4. Activación con Clavo de Olor: Quema un clavo de olor en la llama para activar la energía de ruptura de bloqueos.",
      "5. Decreto de Firmeza: Recita la afirmación con voz enérgica mirando el fuego."
    ],
    closing: "Lleva la llave o medalla en tu bolsillo como recordatorio de tu valor invencible."
  },
  // 3: Miércoles (Mercurio)
  {
    name: "Ritual Mercurial de Claridad Mental y Buena Comunicación 📜",
    planet: "☿ Mercurio",
    element: "💨 Aire Inteligente",
    timing: "Mañana o tarde de estudio",
    color: "#facc15",
    astroDesc: "El miércoles está regido por Mercurio, el mensajero de los dioses, señor del intelecto, los acuerdos comerciales, el aprendizaje y la fluidez comunicativa. Es el día ideal para firmar contratos, estudiar, escribir o negociar con éxito.",
    ingredients: "Una vela amarilla, hojas de menta o albahaca seca, un bolígrafo nuevo y una hoja en blanco.",
    affirmation: "'Mi mente es aguda, clara y receptiva. Me comunico con elocuencia, encanto y verdad. Mis ideas fluyen y abren puertas de entendimiento y prosperidad.'",
    steps: [
      "1. Sahumar la Mente: Enciende las hojas de menta o albahaca y pasa el humo alrededor de tu cabeza para despejar dudas.",
      "2. La Lista de Acuerdos: Escribe con el bolígrafo tus metas de estudio, llamadas pendientes o proyectos de comunicación.",
      "3. El Encendido Amarillo: Enciende la vela amarilla visualizando que tus palabras convencen e inspiran a los demás.",
      "4. Consagración del Bolígrafo: Pasa el bolígrafo tres veces por encima del calor de la vela decretando su efectividad.",
      "5. Ejercicio de Respiración: Realiza 10 respiraciones conscientes inhalando claridad y exhalando confusión."
    ],
    closing: "Utiliza este bolígrafo consagrado para firmar documentos o redactar tus textos importantes."
  },
  // 4: Jueves (Júpiter)
  {
    name: "Ritual Jupiteriano de Gran Fortuna y Expansión 🍀",
    planet: "♃ Júpiter",
    element: "🌌 Éter Benéfico y Fuego",
    timing: "Mediodía o Tarde",
    color: "#60a5fa",
    astroDesc: "El jueves está regido por Júpiter, el Gran Benefactor del zodiaco, señor de la abundancia infinita, la generosidad, la buena suerte y la expansión espiritual y material. Es el mejor día para rituales de dinero, negocios y atracción de oportunidades providenciales.",
    ingredients: "Una vela azul rey o dorada, una rama de canela, 4 monedas de curso legal y un billete.",
    affirmation: "'Abro las compuertas de mi vida a la generosidad del universo. Merezco la riqueza, la expansión y la buena fortuna en todos mis caminos. Mi dinero se multiplica con bendición.'",
    steps: [
      "1. El Altar de las 4 Esquinas: Coloca las 4 monedas formando un cuadrado y sitúa el billete en el centro.",
      "2. El Sahumerio de Canela: Enciende la rama de canela para activar el flujo de atracción del dinero.",
      "3. El Encendido Jupiteriano: Enciende la vela azul en el centro del billete con alegría y gratitud.",
      "4. El Decreto de la Riqueza: Recita la afirmación mientras visualizas tus cuentas saldadas y tus ingresos creciendo.",
      "5. Imantación del Dinero: Pasa el billete por el humo de la canela y guárdalo en tu billetera como billete imán."
    ],
    closing: "Deja consumir la vela y utiliza una de las monedas para hacer una donación o propina generosa."
  },
  // 5: Viernes (Venus)
  {
    name: "Ritual Venusino de Amor Propio, Belleza y Magnetismo 🌹",
    planet: "♀ Venus",
    element: "💧 Agua Dulce y Tierra Fértil",
    timing: "Atardecer o Noche",
    color: "#f472b6",
    astroDesc: "El viernes está regido por Venus, diosa del amor, la armonía estética, la sensualidad, el placer sano y la diplomacia. Es el día perfecto para rituales de belleza, endulzamientos afectivos, reconciliaciones y elevación de la autoestima.",
    ingredients: "Una vela rosa o verde esmeralda, pétalos de rosa fresca, un espejo pequeño y perfume o agua de rosas.",
    affirmation: "'Soy un canal sagrado de belleza, amor y gracia. Me amo y me apruebo incondicionalmente. Atraigo a mi vida personas leales, cariñosas y en sintonía con mi corazón.'",
    steps: [
      "1. Baño de Rosas: Rocía agua de rosas sobre tu rostro y cuello, sintiendo frescura y magnetismo.",
      "2. El Círculo del Espejo: Coloca el espejo plano en el altar y rodéalo con los pétalos de rosa.",
      "3. El Encendido de Venus: Enciende la vela rosa, contemplando la llama reflejada en el cristal del espejo.",
      "4. Decreto de Belleza Interior: Mírate en el espejo con una sonrisa sincera y recita la afirmación con ternura.",
      "5. Bendición del Perfume: Pasa tu frasco de perfume habitual por encima del calor de la vela para consagrarlo."
    ],
    closing: "Deja consumir la vela y utiliza tu perfume consagrado durante tus citas o encuentros sociales."
  },
  // 6: Sábado (Saturno)
  {
    name: "Ritual Saturnino de Corte Kármico, Orden y Protección Pesada 🛡️",
    planet: "🪐 Saturno",
    element: "🌿 Tierra Profunda",
    timing: "Atardecer o Noche",
    color: "#475569",
    astroDesc: "El sábado está regido por Saturno, el señor del tiempo, la estructura kármica, la madurez y los límites firmes. Es el día idóneo para hacer limpiezas energéticas pesadas, desterrar malos espíritus o envidias, poner límites sanos y ordenar prioridades.",
    ingredients: "Una vela blanca o gris/negra, sal marina gruesa, carbón con mirra o ruda seca, y una piedra negra (turmalina u obsidiana).",
    affirmation: "'Establezco límites inquebrantables de protección en mi vida. Corto todo residuo kármico del pasado y asumo mi madurez con disciplina y paz interior.'",
    steps: [
      "1. El Sahumerio Pesado: Quema mirra o ruda por todas las esquinas y rincones oscuros de tu hogar.",
      "2. El Círculo de Sal: Traza un círculo de sal marina gruesa alrededor de tu vela para sellar la protección.",
      "3. La Piedra de Absorción: Sostén tu turmalina negra y deposita en ella cualquier cansancio o pesadez acumulada en la semana.",
      "4. El Encendido Saturnino: Enciende la vela decretando el corte de ataduras y la salida de toda envidia.",
      "5. Orden Material: Ordena un cajón o espacio de tu habitación como símbolo físico de orden mental."
    ],
    closing: "Lava la turmalina bajo agua corriente con sal para descargarla y déjala junto a la puerta de entrada."
  }
];

function getDailyPlanetaryRitual(date) {
  const dayOfWeek = date.getDay(); // 0: Domingo, 1: Lunes...
  const basePlanetary = PLANETARY_DAYS_DB[dayOfWeek] || PLANETARY_DAYS_DB[0];
  
  // Tránsito lunar del día para personalizarlo aún más si está disponible getMoonSign
  let moonSignText = "";
  if (typeof getMoonSign === 'function') {
    const sign = getMoonSign(date);
    moonSignText = ` (Luna en ${sign})`;
  }

  return {
    name: `${basePlanetary.name}${moonSignText}`,
    category: "daily",
    emoji: basePlanetary.planet.includes("☉") ? "☀️" : basePlanetary.planet.includes("🌙") ? "🌙" : basePlanetary.planet.includes("♂") ? "⚔️" : basePlanetary.planet.includes("☿") ? "📜" : basePlanetary.planet.includes("♃") ? "🍀" : basePlanetary.planet.includes("♀") ? "🌹" : "🛡️",
    element: basePlanetary.element,
    planet: basePlanetary.planet,
    timing: basePlanetary.timing,
    astroDesc: `${basePlanetary.astroDesc} En este día, el influjo del regente planetario baña la atmósfera terrenal con sus cualidades específicas, permitiéndote sintonizar tu mente y tu templo con el ritmo cósmico semanal.`,
    ingredients: basePlanetary.ingredients,
    affirmation: basePlanetary.affirmation,
    steps: basePlanetary.steps,
    closing: basePlanetary.closing
  };
}

// =========================================================================
// --- 7. RESOLVEDOR PRINCIPAL DE EVENTOS / RITUALES ---
// =========================================================================

function getEventForDate(date) {
  const d = date.getDate();
  const m = date.getMonth(); // 0-indexed
  
  // 1. Si el filtro activo es 'daily', siempre devuelve el ritual diario planetario
  if (currentCategoryFilter === 'daily') {
    return getDailyPlanetaryRitual(date);
  }

  // Si el filtro activo es 'eclipse', comprobar eclipse primero
  if (currentCategoryFilter === 'eclipse') {
    if (typeof getEclipseForDate === 'function') {
      const eclipse = getEclipseForDate(date);
      if (eclipse) return getEclipseRitual(date, eclipse);
    }
  }

  // Si el filtro activo es 'moon', comprobar lunación primero
  if (currentCategoryFilter === 'moon') {
    if (typeof getMoonPhaseDetails === 'function') {
      const moonPhase = getMoonPhaseDetails(date);
      const lunation = getLunationRitual(date, moonPhase);
      if (lunation) return lunation;
    }
  }

  // 2. Buscar en la base de datos de eventos fijos (Sabbats, Portales, Tradicionales)
  let foundEvent = MYSTICAL_EVENTS_DB.find(ev => ev.month === m && ev.day === d);
  if (foundEvent) {
    // Si hay un filtro específico activo y el evento no coincide pero hay eclipse/luna, dar paso
    if (currentCategoryFilter === 'all' || currentCategoryFilter === foundEvent.category) {
      return foundEvent;
    }
  }
  
  // 3. Comprobar si hay eclipse astronómico
  if (typeof getEclipseForDate === 'function') {
    const eclipse = getEclipseForDate(date);
    if (eclipse) {
      return getEclipseRitual(date, eclipse);
    }
  }

  // 4. Comprobar lunación dinámica (Luna Llena, Nueva, Cuartos)
  if (typeof getMoonPhaseDetails === 'function') {
    const moonPhase = getMoonPhaseDetails(date);
    const lunation = getLunationRitual(date, moonPhase);
    if (lunation) return lunation;
  }
  
  // Si encontramos un evento fijo que no coincidía con un filtro específico pero no hubo eclipse/luna
  if (foundEvent) return foundEvent;

  // 5. Si no hay evento cósmico mayor, devuelve el ritual planetario del día
  return getDailyPlanetaryRitual(date);
}

// =========================================================================
// --- 8. INICIALIZACIÓN Y RENDERIZADO DEL CALENDARIO ---
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  setupNavigationHighlight();
  initMysticalCalendar();
});

function setupNavigationHighlight() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('href') === 'calendario.html') {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

function initMysticalCalendar() {
  const calGrid = document.getElementById('calendar-grid');
  const prevBtn = document.getElementById('cal-prev-btn');
  const nextBtn = document.getElementById('cal-next-btn');
  
  if (!calGrid || !prevBtn || !nextBtn) return;
  
  selectedCalendarDate = new Date();
  activeCalendarMonth = selectedCalendarDate.getMonth();
  activeCalendarYear = selectedCalendarDate.getFullYear();
  
  prevBtn.addEventListener('click', () => {
    activeCalendarMonth--;
    if (activeCalendarMonth < 0) {
      activeCalendarMonth = 11;
      activeCalendarYear--;
    }
    renderMysticalCalendar();
  });
  
  nextBtn.addEventListener('click', () => {
    activeCalendarMonth++;
    if (activeCalendarMonth > 11) {
      activeCalendarMonth = 0;
      activeCalendarYear++;
    }
    renderMysticalCalendar();
  });
  
  const todayBtn = document.getElementById('cal-today-btn');
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      selectDayOfDate(new Date());
    });
  }
  
  const filtersContainer = document.getElementById('calendar-filters');
  if (filtersContainer) {
    filtersContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.calendar-filter-chip');
      if (!chip) return;
      
      document.querySelectorAll('.calendar-filter-chip').forEach(btn => {
        btn.classList.remove('active');
      });
      chip.classList.add('active');
      
      currentCategoryFilter = chip.dataset.filter || 'all';
      renderMysticalCalendar();
    });
  }
  
  const completeBtn = document.getElementById('ritual-complete-toggle-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', toggleRitualCompletion);
  }
  
  renderMysticalCalendar();
  updateCompletedRitualsHistory();
  selectDayOfDate(new Date());
}

function renderMysticalCalendar() {
  const calGrid = document.getElementById('calendar-grid');
  const monthYearEl = document.getElementById('cal-month-year');
  if (!calGrid || !monthYearEl) return;
  
  calGrid.innerHTML = '';
  
  const MONTHS_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthYearEl.textContent = `${MONTHS_NAMES[activeCalendarMonth]} ${activeCalendarYear}`;
  
  const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  WEEKDAYS.forEach(day => {
    const div = document.createElement('div');
    div.className = 'mystical-cal-weekday';
    div.textContent = day;
    calGrid.appendChild(div);
  });
  
  const firstDay = new Date(activeCalendarYear, activeCalendarMonth, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(activeCalendarYear, activeCalendarMonth + 1, 0).getDate();
  
  for (let i = 0; i < startOffset; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'mystical-cal-day empty';
    calGrid.appendChild(emptyDiv);
  }
  
  const today = new Date();

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'mystical-cal-day';
    dayDiv.dataset.day = d;
    
    const cellDate = new Date(activeCalendarYear, activeCalendarMonth, d);
    const dateStr = cellDate.toLocaleDateString('sv');
    dayDiv.dataset.dateStr = dateStr;
    
    const numSpan = document.createElement('span');
    numSpan.className = 'mystical-cal-day-num';
    numSpan.textContent = d;
    dayDiv.appendChild(numSpan);
    
    const isToday = cellDate.getDate() === today.getDate() && 
                    cellDate.getMonth() === today.getMonth() && 
                    cellDate.getFullYear() === today.getFullYear();
                    
    const isSelected = cellDate.getDate() === selectedCalendarDate.getDate() && 
                       cellDate.getMonth() === selectedCalendarDate.getMonth() && 
                       cellDate.getFullYear() === selectedCalendarDate.getFullYear();
                       
    if (isToday) dayDiv.classList.add('today');
    if (isSelected) dayDiv.classList.add('active');
    
    // Obtener evento
    const event = getEventForDate(cellDate);
    
    if (event) {
      dayDiv.dataset.hasEvent = 'true';
      dayDiv.dataset.eventCategory = event.category;
      
      const shouldHighlight = (currentCategoryFilter === 'all' && event.category !== 'daily') || 
                              (currentCategoryFilter === event.category);

      if (shouldHighlight) {
        dayDiv.classList.add(`event-${event.category}`);
        
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'mystical-cal-emoji';
        emojiSpan.textContent = event.emoji;
        dayDiv.appendChild(emojiSpan);
      }
      
      const isCompleted = localStorage.getItem(`ritual_completed_${dateStr}`);
      if (isCompleted === 'true' && shouldHighlight) {
        dayDiv.classList.add('completed');
        
        const checkBadge = document.createElement('span');
        checkBadge.className = 'mystical-cal-completed-badge';
        checkBadge.textContent = '✓';
        dayDiv.appendChild(checkBadge);
      }
    }
    
    dayDiv.addEventListener('click', () => {
      document.querySelectorAll('.mystical-cal-day').forEach(cell => {
        cell.classList.remove('active');
      });
      dayDiv.classList.add('active');
      
      selectedCalendarDate = new Date(activeCalendarYear, activeCalendarMonth, d);
      renderRitualDetailsForDate(selectedCalendarDate);
      updateQuickDateWidget(selectedCalendarDate);

      // En dispositivos móviles, desplazar con suavidad al panel de detalles
      if (window.innerWidth <= 768) {
        const detailPanel = document.getElementById('ritual-detail-panel');
        if (detailPanel) {
          detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
    
    calGrid.appendChild(dayDiv);
  }
  
  updateMonthSpiritualProgress();
}

function selectDayOfDate(date) {
  selectedCalendarDate = date;
  activeCalendarMonth = date.getMonth();
  activeCalendarYear = date.getFullYear();
  
  renderMysticalCalendar();
  renderRitualDetailsForDate(date);
  updateQuickDateWidget(date);
}

function updateQuickDateWidget(date) {
  const quickDateText = document.getElementById('quick-date-text');
  const quickDateIcon = document.getElementById('quick-date-icon');
  
  if (!quickDateText) return;
  
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formatted = date.toLocaleDateString('es-ES', options);
  
  quickDateText.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  
  const event = getEventForDate(date);
  if (event) {
    quickDateIcon.textContent = event.emoji;
  } else {
    quickDateIcon.textContent = "📅";
  }
}

function renderRitualDetailsForDate(date) {
  const ritualNameEl = document.getElementById('ritual-name');
  const ritualBadgeEl = document.getElementById('ritual-badge');
  const ritualElementBadge = document.getElementById('ritual-element-badge');
  const ritualTimingBadge = document.getElementById('ritual-timing-badge');
  const ritualIntroDesc = document.getElementById('ritual-intro-desc');
  const ritualContentBlock = document.getElementById('ritual-content-block');
  const ritualClosingEl = document.getElementById('ritual-closing');
  
  if (!ritualNameEl || !ritualContentBlock) return;
  
  const event = getEventForDate(date);
  const dateStr = date.toLocaleDateString('sv');
  
  if (event) {
    if (ritualIntroDesc) ritualIntroDesc.classList.add('hidden');
    ritualContentBlock.classList.remove('hidden');
    
    ritualNameEl.textContent = event.name;
    
    if (ritualBadgeEl) {
      ritualBadgeEl.className = `ritual-detail-badge ${event.category}`;
      let categoryName = "Evento Cósmico";
      if (event.category === 'sabbat') categoryName = "🔥 Rueda del Año (Sabbat)";
      if (event.category === 'moon') categoryName = "🔮 Fase Lunar (Grimorio)";
      if (event.category === 'eclipse') categoryName = "⚡ Portal de Eclipse";
      if (event.category === 'traditional') categoryName = "💙 Tradición Popular";
      if (event.category === 'portal') categoryName = "✨ Portal Numérico";
      if (event.category === 'daily') categoryName = "🪐 Ritual Planetario Diario";
      ritualBadgeEl.textContent = categoryName;
      ritualBadgeEl.classList.remove('hidden');
    }

    if (ritualElementBadge) {
      if (event.element) {
        ritualElementBadge.textContent = event.element;
        ritualElementBadge.classList.remove('hidden');
      } else {
        ritualElementBadge.classList.add('hidden');
      }
    }

    if (ritualTimingBadge) {
      if (event.timing) {
        ritualTimingBadge.textContent = `⏰ ${event.timing}`;
        ritualTimingBadge.classList.remove('hidden');
      } else {
        ritualTimingBadge.classList.add('hidden');
      }
    }
    
    const astroDescEl = document.getElementById('ritual-astro-desc');
    const ingredientsEl = document.getElementById('ritual-ingredients');
    const affirmationEl = document.getElementById('ritual-affirmation');
    
    if (astroDescEl) astroDescEl.innerHTML = event.astroDesc;
    if (ingredientsEl) ingredientsEl.innerHTML = event.ingredients;
    if (affirmationEl) affirmationEl.innerHTML = event.affirmation;
    
    const stepsContainer = document.getElementById('ritual-steps');
    if (stepsContainer) {
      stepsContainer.innerHTML = '';
      
      event.steps.forEach(step => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'ritual-step-item';
        
        const match = step.match(/^(\d+)\.\s*(.*)/);
        if (match) {
          const stepNum = match[1];
          const stepText = match[2];
          stepDiv.innerHTML = `
            <div class="ritual-step-num">${stepNum}</div>
            <div class="ritual-step-text">${stepText}</div>
          `;
        } else {
          stepDiv.innerHTML = `
            <div class="ritual-step-num">✦</div>
            <div class="ritual-step-text">${step}</div>
          `;
        }
        stepsContainer.appendChild(stepDiv);
      });
    }

    if (ritualClosingEl) {
      ritualClosingEl.innerHTML = event.closing || "Conserva tus talismanes consagrados y mantén la mente en serenidad y fe.";
    }
    
    updateRitualCompleteButtonState(dateStr);
  }
}

function updateRitualCompleteButtonState(dateStr) {
  const completeBtn = document.getElementById('ritual-complete-toggle-btn');
  const btnIcon = document.getElementById('ritual-btn-check-icon');
  
  if (!completeBtn || !btnIcon) return;
  
  const isCompleted = localStorage.getItem(`ritual_completed_${dateStr}`) === 'true';
  
  if (isCompleted) {
    completeBtn.classList.add('completed');
    btnIcon.textContent = '✓';
    completeBtn.innerHTML = `<span id="ritual-btn-check-icon">✓</span> ¡Ritual Consagrado y Realizado! ✨`;
  } else {
    completeBtn.classList.remove('completed');
    btnIcon.textContent = '⬜';
    completeBtn.innerHTML = `<span id="ritual-btn-check-icon">⬜</span> Marcar Ritual como Realizado`;
  }
}

function toggleRitualCompletion() {
  const dateStr = selectedCalendarDate.toLocaleDateString('sv');
  const key = `ritual_completed_${dateStr}`;
  const completeBtn = document.getElementById('ritual-complete-toggle-btn');
  
  const isCompleted = localStorage.getItem(key) === 'true';
  
  if (isCompleted) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, 'true');
    
    if (completeBtn) {
      completeBtn.classList.add('completed-animate');
      setTimeout(() => {
        completeBtn.classList.remove('completed-animate');
      }, 600);
    }
  }
  
  renderMysticalCalendar();
  renderRitualDetailsForDate(selectedCalendarDate);
  updateMonthSpiritualProgress();
  updateCompletedRitualsHistory();
}

function updateMonthSpiritualProgress() {
  const percentEl = document.getElementById('calendar-progress-percent');
  const fillEl = document.getElementById('calendar-progress-fill');
  const textEl = document.getElementById('calendar-progress-text');
  
  if (!percentEl || !fillEl || !textEl) return;
  
  const daysInMonth = new Date(activeCalendarYear, activeCalendarMonth + 1, 0).getDate();
  let totalEventsCount = 0;
  let completedEventsCount = 0;
  
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(activeCalendarYear, activeCalendarMonth, d);
    const dateStr = cellDate.toLocaleDateString('sv');
    const event = getEventForDate(cellDate);
    
    if (event) {
      const isRelevant = (currentCategoryFilter === 'all' && event.category !== 'daily') || 
                         (currentCategoryFilter === event.category);

      if (isRelevant) {
        totalEventsCount++;
        const isCompleted = localStorage.getItem(`ritual_completed_${dateStr}`) === 'true';
        if (isCompleted) {
          completedEventsCount++;
        }
      }
    }
  }
  
  let percent = 0;
  if (totalEventsCount > 0) {
    percent = Math.round((completedEventsCount / totalEventsCount) * 100);
  }
  
  percentEl.textContent = `${percent}%`;
  fillEl.style.width = `${percent}%`;
  
  if (totalEventsCount === 0) {
    textEl.textContent = "No hay eventos destacados para este filtro en este mes.";
  } else if (completedEventsCount === 0) {
    textEl.textContent = `Tienes ${totalEventsCount} rituales destacados este mes. ¡Consagra tu primer ritual!`;
  } else if (completedEventsCount < totalEventsCount) {
    textEl.textContent = `Has realizado ${completedEventsCount} de ${totalEventsCount} rituales destacados este mes.`;
  } else {
    textEl.textContent = `¡Felicidades! Has completado los ${totalEventsCount} rituales destacados de este ciclo. ✨`;
  }
}

function updateCompletedRitualsHistory() {
  const historyListEl = document.getElementById('calendar-history-list');
  const historyCountEl = document.getElementById('calendar-history-count');
  if (!historyListEl || !historyCountEl) return;

  historyListEl.innerHTML = '';
  
  const completedKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const match = key.match(/^ritual_completed_(\d{4}-\d{2}-\d{2})$/);
      if (match) {
        completedKeys.push(match[1]);
      }
    }
  }

  completedKeys.sort((a, b) => b.localeCompare(a));
  historyCountEl.textContent = completedKeys.length;

  if (completedKeys.length === 0) {
    historyListEl.innerHTML = `
      <p style="color: var(--text-muted); font-style: italic; text-align: center; margin: 0.5rem 0; font-size: 0.8rem;">
        No has consagrado rituales aún.
      </p>
    `;
    return;
  }

  completedKeys.forEach(dateStr => {
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const cellDate = new Date(year, month, day);

    const event = getEventForDate(cellDate);
    const emoji = event ? event.emoji : '✨';
    const name = event ? event.name : 'Ritual Místico';
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

    const itemEl = document.createElement('button');
    itemEl.type = 'button';
    itemEl.className = 'history-item-btn';
    itemEl.innerHTML = `
      <span style="display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 75%;">
        <span style="flex-shrink: 0;">${emoji}</span>
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${name}</span>
      </span>
      <span style="color: var(--gold-color); font-size: 0.75rem; white-space: nowrap; font-family: monospace; flex-shrink: 0;">${formattedDate}</span>
    `;

    itemEl.addEventListener('click', () => {
      activeCalendarYear = cellDate.getFullYear();
      activeCalendarMonth = cellDate.getMonth();
      selectDayOfDate(cellDate);
      
      const detailPanel = document.getElementById('ritual-detail-panel');
      if (detailPanel) {
        detailPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    historyListEl.appendChild(itemEl);
  });
}

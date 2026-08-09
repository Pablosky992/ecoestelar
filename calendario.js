// Calendario Místico y de Rituales — Lógica de la Página
// Eco Estelar

// Estado de la Aplicación para el Calendario
let activeCalendarMonth = new Date().getMonth();
let activeCalendarYear = new Date().getFullYear();
let selectedCalendarDate = new Date();
let currentCategoryFilter = 'all';

// Base de Datos de Rituales Fijos (Categorías: sabbat, traditional, portal)
const MYSTICAL_EVENTS_DB = [
  // --- SABBATS (Rueda del Año) ---
  {
    name: "Imbolc (Festival de la Luz)",
    category: "sabbat",
    emoji: "🌱",
    month: 1, // Febrero (0-indexed)
    day: 1, // Se celebra el 1 y 2 de febrero (coincide con Portal 2/2)
    astroDesc: "Imbolc celebra los primeros destellos de luz que regresan a la Tierra y el despertar de la primavera bajo el manto invernal. Es la festividad de la diosa Brigid, patrona del fuego del hogar, la poesía y la herrería. Rige la purificación, la inspiración y la preparación para la germinación de nuevas ideas.",
    ingredients: "Una vela blanca o verde, leche con miel (u ofrenda similar), romero seco o laurel para sahumerio, y papel pergamino.",
    affirmation: "'Bajo el fuego purificador de Brigid, consagro mis anhelos. Dejo ir la frialdad del pasado y abro mi corazón al calor de los nuevos comienzos. Mi camino resplandece.'",
    steps: [
      "1. Limpieza del Altar: Purifica tu espacio quemando las hojas de romero o laurel. Despeja tu mente de resentimientos o estancamientos.",
      "2. Ofrenda de Leche y Miel: Coloca un pequeño cuenco con leche templada y una cucharada de miel en tu altar como ofrenda de nutrición a las fuerzas de la naturaleza.",
      "3. El Encendido de la Vela: Enciende la vela blanca. Siéntate frente a ella y visualiza que su llama es el calor sagrado que derrite el hielo de tus bloqueos.",
      "4. Declaración de Intenciones: Escribe en el pergamino tres compromisos contigo mismo que requieran dedicación y constancia en los meses venideros.",
      "5. Consagración: Pasa el papel suavemente por encima del calor de la llama (sin quemarlo) y guárdalo en un cajón donde guardes tus pertenencias más valiosas."
    ]
  },
  {
    name: "Ostara (Equinoccio de Primavera)",
    category: "sabbat",
    emoji: "🌸",
    month: 2, // Marzo
    day: 20, // Equinoccio solar aproximado
    astroDesc: "Ostara marca el equilibrio absoluto: el día y la noche duran lo mismo. El Sol entra en Aries y la naturaleza estalla en vida. Rige la fertilidad espiritual, la germinación activa de tus intenciones y el equilibrio armónico entre tu polaridad masculina (acción) y femenina (intuición).",
    ingredients: "Semillas de flores o hierbas aromáticas, una maceta pequeña con tierra fértil, pétalos de flores de estación y una vela verde o amarilla.",
    affirmation: "'En perfecto equilibrio cósmico, planto las semillas de mi destino. Que la fuerza vital de la Tierra nutra mis intenciones y las haga florecer en luz y belleza.'",
    steps: [
      "1. Baño de Flores: Date una ducha relajante y enjuaga tu cuerpo con agua templada en la que hayas sumergido pétalos de flores aromáticas.",
      "2. Preparación del Semillero: Toma la maceta y coloca la tierra. Sostén las semillas entre tus manos y visualiza que en ellas depositas tus metas más queridas (amor, prosperidad, salud).",
      "3. La Siembra Física: Entierra las semillas suavemente en la maceta mientras repites la afirmación del día en voz alta.",
      "4. El Fuego Germinador: Enciende la vela verde a un lado de la maceta, permitiendo que su luz proyecte vitalidad y crecimiento sobre tu siembra.",
      "5. Riego Consciente: Riega la maceta por primera vez sintiendo que el agua bendice la manifestación física de tus sueños. Cuida esta planta como símbolo de tus propios logros."
    ]
  },
  {
    name: "Beltane (El Fuego de la Pasión)",
    category: "sabbat",
    emoji: "🌺",
    month: 4, // Mayo
    day: 1,
    astroDesc: "Beltane celebra la fertilidad máxima de la Tierra, la unión de las energías masculina y femenina, y el florecimiento del deseo. Es una noche de pasión, éxtasis, amor y abundancia creativa. La energía cósmica es altamente magnética e idónea para rituales de atracción, romance y proyectos audaces.",
    ingredients: "Cintas de colores (rojo, blanco, verde, rosa), sahumerio de sándalo o jazmín, y una vela roja.",
    affirmation: "'Consagro mi pasión y enciendo el fuego de mi creatividad. Soy un canal de amor incondicional y atraigo la abundancia a todas las áreas de mi existencia.'",
    steps: [
      "1. Sahumerio del Amor: Enciende el sahumerio de jazmín o sándalo y pásalo alrededor de tu cuerpo para despertar tu magnetismo y sensualidad interior.",
      "2. El Encendido de la Pasión: Enciende la vela roja. Concéntrate en el calor de la llama y visualiza tu vida rebosante de vitalidad, alegría y relaciones apasionadas.",
      "3. El Lazo de la Unión: Toma las cintas de colores. Ve trenzándolas con calma. Por cada cruce de cinta, decreta un deseo (ej: rojo para el amor pasional, rosa para el afecto sano, verde para la salud, blanco para la paz).",
      "4. Sellar el Hechizo: Ata la trenza de cintas a una planta exterior o rama de árbol cercana para que la naturaleza selle tu petición.",
      "5. Meditación Activa: Permanece unos minutos sintiendo los latidos de tu corazón y la energía vital correr por tus venas."
    ]
  },
  {
    name: "Litha (Solsticio de Verano)",
    category: "sabbat",
    emoji: "☀️",
    month: 5, // Junio
    day: 21, // Solsticio solar aproximado
    astroDesc: "Litha celebra el día más largo del año y el apogeo del poder del Sol. Representa la luz máxima, la victoria de la conciencia y la abundancia plena. Es un portal de purificación profunda mediante el elemento fuego y agua, permitiendo recargar tu vibración personal con la máxima fuerza cósmica disponible.",
    ingredients: "Hojas de laurel frescas, un plato resistente al fuego, una vela dorada, amarilla o naranja, y un cristal (ojo de tigre o pirita).",
    affirmation: "'Bajo el sol cenital de Litha, reclamo mi poder personal, brillo con luz propia y consagro mi camino hacia la abundancia. Nada apaga mi luz interna.'",
    steps: [
      "1. Carga del Cristal: Coloca tu pirita u ojo de tigre bajo los rayos del sol durante la mañana para cargarlo con vibraciones de valor y riqueza.",
      "2. El laurel de los deseos: Escribe en tres hojas de laurel individuales tres logros o deseos de prosperidad que quieras manifestar.",
      "3. El Fuego Solar: Enciende la vela dorada o amarilla a mediodía (u hora cercana). Agradece en voz alta las bendiciones que ya tienes en tu vida.",
      "4. Quema Sagrada: Quema las hojas de laurel una a una en la llama de la vela, dejando que las cenizas caigan en el plato resistente al fuego.",
      "5. Liberación de Cenizas: Sopla las cenizas al viento fuera de tu hogar para que el cosmos transporte tus intenciones al plano material."
    ]
  },
  {
    name: "Lammas / Lughnasadh (La Cosecha)",
    category: "sabbat",
    emoji: "🌾",
    month: 7, // Agosto
    day: 1,
    astroDesc: "Lughnasadh es el festival de la primera cosecha. Celebra los frutos maduros del esfuerzo y la generosidad de la Madre Tierra. Es un momento sagrado para la gratitud material, la consagración de tus ingresos y el compartir con otros para asegurar la continuidad de la abundancia.",
    ingredients: "Un trozo de pan casero o espigas de trigo, granos de maíz o arroz, una vela amarilla o marrón, y monedas.",
    affirmation: "'Agradezco los frutos de mi trabajo y la infinita generosidad de la Tierra. Comparto mi abundancia y declaro que mi prosperidad se multiplica cada día.'",
    steps: [
      "1. Altar de Granos: Coloca los granos de maíz o arroz en un cuenco pequeño en el centro de tu altar rodeado de las monedas para magnetizar la fortuna.",
      "2. Consagración del Pan: Toma el trozo de pan entre tus manos. Visualiza todo el esfuerzo que has puesto este año y siente orgullo por tus logros.",
      "3. Fuego de Agradecimiento: Enciende la vela amarilla. Ofrece una oración de agradecimiento al universo por el alimento, el hogar y el trabajo.",
      "4. Partir el Pan: Divide el pan en dos trozos. Come una parte saboreándola conscientemente y la otra colócala en una zona de jardín o bajo un árbol como ofrenda de retorno a la tierra.",
      "5. Sahumar la Cosecha: Pasa humo de canela o incienso por encima de tu billetera o monedas consagradas."
    ]
  },
  {
    name: "Mabon (Equinoccio de Otoño)",
    category: "sabbat",
    emoji: "🍎",
    month: 8, // Septiembre
    day: 22, // Equinoccio solar aproximado
    astroDesc: "Mabon representa la segunda cosecha y el segundo equilibrio del año. Nos preparamos para los meses de frío e introspección. Es una época para el balance personal, la gratitud y la purificación mental, soltando el exceso de equipaje emocional antes de que comience el invierno espiritual.",
    ingredients: "Una manzana roja, canela en polvo, una vela naranja o marrón, y hojas secas de otoño.",
    affirmation: "'En equilibrio y armonía, entro en este ciclo de introspección. Agradezco las lecciones de la luz y abrazo la sabiduría de la sombra con serenidad.'",
    steps: [
      "1. El Círculo de Hojas: Coloca las hojas secas formando un círculo protector alrededor de tu vela.",
      "2. Endulzar la Manzana: Corta la manzana por la mitad horizontalmente (revelando la estrella de cinco puntas en su centro). Espolvorea un poco de canela encima de las mitades.",
      "3. Encender el Equilibrio: Enciende la vela naranja. Medita en las dos mitades de tu vida: tu luz (fortalezas) y tu sombra (debilidades). Acepta ambas partes.",
      "4. Ofrenda Otoñal: Deja una mitad de la manzana en la naturaleza bajo un árbol grande como muestra de respeto y gratitud estacional.",
      "5. Consumo Sagrado: Come la otra mitad de la manzana, visualizando que te asientas en una vibración de equilibrio emocional interno."
    ]
  },
  {
    name: "Samhain (El Portal de los Ancestros)",
    category: "sabbat",
    emoji: "🎃",
    month: 9, // Octubre
    day: 31, // Víspera de Todos los Santos (Samhain)
    astroDesc: "Samhain marca el fin del año wiccano y el inicio de la mitad oscura del año. El velo entre el mundo físico y el espiritual se vuelve sumamente delgado. Es el momento supremo para honrar a los ancestros, recibir su guía y realizar una profunda purificación de energías densas o karmas pasados.",
    ingredients: "Una vela blanca (luz para los difuntos) y una vela negra (para absorber negatividad), una foto de seres queridos fallecidos, sahumerio de mirra o copal.",
    affirmation: "'Honro a quienes caminaron antes que yo y agradezco su legado en mi sangre. Corto con amor cualquier lazo kármico denso y abrazo la transformación sagrada.'",
    steps: [
      "1. Sahumerio Limpiador: Quema mirra o copal y purifica los rincones de tu hogar para sellarlo contra energías bajas y dar la bienvenida a guías de luz.",
      "2. El Altar Ancestral: Coloca la foto de tus familiares fallecidos. Ofrece un vaso de agua pura y enciende la vela blanca para guiar su camino espiritual.",
      "3. La Vela Negra de la Transmutación: Enciende la vela negra a cierta distancia. Escribe en un papel un hábito o dolor emocional que desees desterrar de tu vida.",
      "4. El Fuego Transmutador: Quema el papel en la llama de la vela negra, visualizando cómo ese karma o atadura se rompe definitivamente en este portal.",
      "5. Meditación y Silencio: Apaga la vela negra y mantén encendida la vela blanca. Pide en silencio protección y guía a tus ancestros."
    ]
  },
  {
    name: "Yule (Solsticio de Invierno)",
    category: "sabbat",
    emoji: "🎄",
    month: 11, // Diciembre
    day: 21, // Solsticio solar aproximado
    astroDesc: "Yule es la noche más larga del año, celebrando el nacimiento del sol y el retorno paulatino de la luz. Representa la esperanza en el invierno más oscuro, la fe en la vida y el renacimiento espiritual. Es un momento ideal para formular deseos solemnes y encender hogueras mágicas en el corazón del hogar.",
    ingredients: "Una vela dorada o roja, pino fresco o acebo, papel pergamino y una campana (o cuenco sonoro).",
    affirmation: "'En la noche más larga, enciendo la chispa del Sol. Mi fe no titubea en la oscuridad; sé que el renacimiento es seguro. Invoco la luz del amor y el éxito.'",
    steps: [
      "1. Corona de Yule: Coloca las ramas de pino o acebo en círculo en tu mesa o altar como símbolo del ciclo sin fin de la vida.",
      "2. Declarar los 12 Deseos: Escribe en tu pergamino 12 deseos o metas para el nuevo año solar que comienza.",
      "3. El Nacimiento del Sol: Enciende la vela dorada en el centro de tu círculo de pino, sintiendo que devuelves la luz espiritual a tu mente y hogar.",
      "4. El Sonido Limpiador: Toca la campana o el cuenco tres veces por encima del pergamino de deseos para alejar cualquier sombra o duda de su cumplimiento.",
      "5. El Guardado: Dobla el pergamino y guárdalo bajo el árbol de navidad u otro lugar decorativo festivo hasta que comience el nuevo año."
    ]
  },

  // --- TRADICIONALES Y POPULARES ---
  {
    name: "Año Nuevo y Portal 1/1",
    category: "traditional",
    emoji: "✨",
    month: 0, // Enero
    day: 1,
    astroDesc: "El inicio del calendario civil se une con el Portal Numérico 1/1. Es un día de apertura de caminos total y de siembra de la abundancia financiera y emocional para los próximos 365 días. La mente colectiva está alineada con el reinicio, potenciando tus intenciones.",
    ingredients: "Un puñado de lentejas secas, 3 monedas de curso legal, y una vela verde de prosperidad.",
    affirmation: "'Doy el primer paso del año en victoria, abundancia y luz. Recibo la riqueza en todas sus formas y consagro mis caminos. La fortuna me acompaña.'",
    steps: [
      "1. El Primer Paso: Al levantarte, pisa fuerte primero con el pie derecho, decretando éxito para tus proyectos.",
      "2. El Rito de las Lentejas: Coloca un puñado de lentejas secas junto a las 3 monedas dentro de tus bolsillos principales o billetera para retener la riqueza.",
      "3. Encender la Fortuna: Enciende la vela verde y visualiza cómo tus finanzas fluyen libres de deudas durante todo el año.",
      "4. El Decreto de las Monedas: Golpea suavemente las monedas entre sí a mediodía, pidiendo que tu dinero se duplique.",
      "5. Regalo a la Tierra: Al final del día, entierra las lentejas en tu jardín o en una maceta para simbolizar que tu dinero crecerá desde la tierra."
    ]
  },
  {
    name: "Noche de Reyes y Epifanía",
    category: "traditional",
    emoji: "👑",
    month: 0, // Enero
    day: 5,
    astroDesc: "La víspera de la Epifanía está cargada de magia infantil e ilusión colectiva. Rige el recibir regalos del universo, la inocencia del espíritu y la revelación de la estrella interior que guía a los magos del alma hacia su autorrealización.",
    ingredients: "Un vaso de agua pura, un plato con granos (arroz, avena) y tres llaves metálicas viejas.",
    affirmation: "'Sigo mi estrella guía interior con fe e inocencia. Las puertas de la oportunidad se abren ante mí y recibo los regalos del universo con gratitud.'",
    steps: [
      "1. Ofrenda de Ilusión: Coloca el vaso de agua y el plato de granos en la ventana o entrada de tu casa como ofrenda de agradecimiento y respeto.",
      "2. Hechizo de las Llaves: Pon las tres llaves en tu altar junto a una vela blanca para consagrar la apertura de puertas en el amor, salud y trabajo.",
      "3. La Carta de los 3 Regalos: Escribe al universo tres peticiones sinceras de crecimiento espiritual y material.",
      "4. El Sueño del Mago: Coloca la carta bajo tu almohada y duerme esta noche confiando en que recibirás guía onírica mística.",
      "5. Cierre: Por la mañana, guarda una de las llaves en tu bolso o billetera como amuleto abrecaminos para el resto del año."
    ]
  },
  {
    name: "Día de San Valentín (Endulzamiento)",
    category: "traditional",
    emoji: "💖",
    month: 1, // Febrero
    day: 14,
    astroDesc: "San Valentín canaliza la corriente colectiva del amor. Es una fecha ideal para realizar rituales de endulzamiento para fortalecer relaciones existentes, atraer un amor sano o, más importante, realizar un ritual profundo de amor propio y autoaceptación espiritual.",
    ingredients: "Una vela rosa o roja, miel pura de abejas, canela en polvo, pétalos de rosa y papel blanco.",
    affirmation: "'Soy digno/a de amar y ser amado/a en libertad y respeto. Endulzo mi energía y abro mis caminos afectivos a una conexión sana, madura y cósmica.'",
    steps: [
      "1. Escribir la Intención: Escribe en el papel tu nombre completo y, si tienes pareja, el suyo debajo. Si buscas amor, escribe las cualidades del alma que buscas.",
      "2. El Círculo de Pétalos: Coloca el papel en un plato y rodéalo con los pétalos de rosa formando un círculo protector.",
      "3. Endulzar el Papel: Vierte una cucharada de miel sobre los nombres y espolvorea canela en polvo encima visualizando armonía, ternura y pasión.",
      "4. Encender el Afecto: Enciende la vela rosa a un lado del plato, visualizando cómo tu vida amorosa se impregna de dulzura.",
      "5. Cierre Sagrado: Una vez consumida la vela, dobla el papel con miel en un envoltorio de aluminio y entiérralo cerca de una planta con flores hermosas."
    ]
  },
  {
    name: "Noche de Walpurgis",
    category: "traditional",
    emoji: "🧹",
    month: 3, // Abril
    day: 30,
    astroDesc: "La noche de Walpurgis es la víspera de Beltane. Es la festividad tradicional de la purificación por fuego, la quema de la negatividad acumulada en invierno y la protección del hogar contra influencias discordantes. Los portales espirituales se abren a la renovación.",
    ingredients: "Una vela blanca y una vela negra, una escoba de paja (o cepillo similar), y sal gorda con agua.",
    affirmation: "'Barro de mi hogar y de mi mente cualquier rastro de duda, temor o envidia. Purifico mi espacio y abro las puertas a las bendiciones de la luz.'",
    steps: [
      "1. El Barrido Místico: Barre toda tu casa desde el fondo hacia la puerta principal de entrada, visualizando que expulsas la pesadez mental y las malas vibraciones.",
      "2. El Círculo de Sal: Espolvorea una línea fina de sal gorda en el umbral de tu puerta de entrada para sellar tu hogar contra envidias o bajas energías.",
      "3. Transmutar el Fuego: Enciende la vela negra en un lugar seguro para que absorba la negatividad que quede en el ambiente.",
      "4. Encender la Purificación: Enciende la vela blanca para atraer la bendición y la armonía cósmica tras la limpieza.",
      "5. Ventilación: Abre las ventanas unos minutos para que el aire fresco del inicio de Beltane renueve por completo la atmósfera de tu templo físico."
    ]
  },
  {
    name: "Noche de San Juan (La Magia del Fuego)",
    category: "traditional",
    emoji: "🔥",
    month: 5, // Junio
    day: 23,
    astroDesc: "La noche más mágica y tradicional del año wiccano y del folclore popular. Coincidiendo con la fuerza residual de Litha, es la noche del fuego purificador y del agua protectora. Se utiliza para romper hechizos, purificar el karma y atraer suerte mediante rituales botánicos y de transmutación ígnea.",
    ingredients: "Hojas de laurel frescas, papel pergamino, agua limpia dejada al aire libre (sereno), ramas de romero o lavanda, y una vela roja o naranja.",
    affirmation: "'Bajo el fuego purificador de San Juan, quemo mis dolores y transmutó mis limitaciones. Me limpio con el agua sagrada y recibo la bendición de la salud y la belleza.'",
    steps: [
      "1. Preparación del Agua: Coloca un cuenco con agua limpia y las ramas de romero y lavanda en tu ventana a la luz del sereno (dejar reposar toda la noche).",
      "2. La Carta de Liberación: Escribe en el papel todo lo que te ha causado tristeza, deudas, miedos o rupturas en el último año.",
      "3. La Quema Sagrada: Enciende la vela roja. Quema el papel con cuidado visualizando que toda esa negatividad se disuelve en cenizas.",
      "4. El Baño de Rostro: A la mañana siguiente (24 de junio), lávate la cara con el agua de romero y lavanda que recibió el sereno, pidiendo salud, belleza y protección espiritual.",
      "5. Conservación del laurel: Guarda una hoja de laurel en tu cartera como imán de dinero para todo el año."
    ]
  },
  {
    name: "Lluvia de Estrellas (Perseidas)",
    category: "traditional",
    emoji: "🌠",
    month: 7, // Agosto
    day: 12, // Pico de las Perseidas / Lágrimas de San Lorenzo
    astroDesc: "Las Perseidas o Lágrimas de San Lorenzo son la lluvia de estrellas más espectacular del año. Astrológicamente representan la lluvia de ideas cósmicas, la manifestación directa de los deseos del alma y la conexión de la Tierra con el espacio sideral sagrado. Es un día para decretar con fuerza mental.",
    ingredients: "Un cuenco con agua de manantial, pétalos blancos, papel para deseos y una vela azul celeste.",
    affirmation: "'Como estrellas que caen para dar luz al cielo, mis deseos se manifiestan con fluidez en la Tierra. Acepto el flujo cósmico y confío en mi destino.'",
    steps: [
      "1. Meditación de Apertura: Si es posible, sal a un espacio exterior o mira al cielo durante la noche. Respira hondo y sintoniza con el cosmos infinito.",
      "2. El Espejo de Agua: Coloca el cuenco de agua y los pétalos en una mesa donde refleje el cielo nocturno.",
      "3. Escribir los Deseos Estelares: Escribe en tu papel tus tres mayores anhelos. Sé muy específico.",
      "4. El Encendido Azul: Enciende la vela azul para sintonizar con la tranquilidad cósmica y la fe mental.",
      "5. Sellar con Agua: Humedece las puntas del papel de deseos en el cuenco de agua de pétalos y déjalo secar al lado de la vela hasta que esta se consuma."
    ]
  },
  {
    name: "Día de Todos los Santos (Sahumerio)",
    category: "traditional",
    emoji: "🕯️",
    month: 10, // Noviembre (0-indexed)
    day: 1,
    astroDesc: "El día posterior a Samhain se dedica a la Epifanía de la luz y la memoria de las almas puras. Es una fecha ideal para realizar limpiezas energéticas profundas en el hogar (sahumerios) y encender luces de agradecimiento, reforzando la protección espiritual del hogar.",
    ingredients: "Sahumerio de mirra, incienso o benjuí, una vela blanca lisa y un vaso de agua.",
    affirmation: "'Envuelvo mi hogar en luz protectora. Agradezco las bendiciones invisibles y declaro que en este espacio reina la paz, el amor y la abundancia espiritual.'",
    steps: [
      "1. Encendido de Luz: Coloca el vaso de agua limpia en tu altar y enciende la vela blanca para honrar la paz de las almas difuntas y tus guías protectores.",
      "2. Sahumar el Templo: Enciende el sahumerio de mirra o incienso. Recorre tu casa de adentro hacia afuera esparciendo el humo por las esquinas.",
      "3. Decretar Protección: Mientras sahumas, repite la afirmación o decreta protección personal para todos los que habitan el hogar.",
      "4. Limpieza del Umbral: Pasa el humo alrededor de los marcos de las ventanas y puertas principales.",
      "5. Reposo Espiritual: Deja que la vela blanca se consuma del todo en un espacio seguro, visualizando paz interior."
    ]
  },
  {
    name: "Nochevieja / Fin de Año",
    category: "traditional",
    emoji: "🍇",
    month: 11, // Diciembre
    day: 31,
    astroDesc: "La noche final del año reúne la fuerza acumulada de todo el ciclo vivido. Es el momento álgido para la purificación, el desapego definitivo de lo viejo y la atracción magnética del éxito y el amor para el ciclo que nace a medianoche.",
    ingredients: "Una copa de brindis, un objeto de oro (como un anillo), una prenda interior roja o amarilla, y un papel de quemar.",
    affirmation: "'Dejo ir con gratitud el año que termina y libero sus pesos. Recibo el año nuevo con los brazos abiertos, rebosante de salud, amor y prosperidad.'",
    steps: [
      "1. Limpieza de Fin de Año: Barre la casa hacia afuera antes de medianoche para expulsar la energía estancada del año viejo.",
      "2. Hechizo del Oro: Coloca el anillo de oro dentro de tu copa de champán o sidra para el brindis de medianoche para atraer abundancia.",
      "3. Vestimenta Astral: Lleva una prenda interior de color rojo (para el amor y pasión) o amarillo (para la prosperidad económica).",
      "4. El Vaso de Agua: Llena un vaso de agua por la tarde y tíralo a la calle a medianoche para expulsar las lágrimas y penas del año vivido.",
      "5. El Brindis Consagrado: Brinda con el anillo de oro en la copa, bebe el líquido (con cuidado de no tragarte el anillo) y ponte el anillo de nuevo decretando riqueza."
    ]
  },

  // --- PORTALES NUMÉRICOS ---
  {
    name: "Portal de la Dualidad 2/2 (El Espejo Astral)",
    category: "portal",
    emoji: "✨",
    month: 1, // Febrero (0-indexed)
    day: 2,
    astroDesc: "El Portal 2/2 activa la vibración de la dualidad armónica, el espejo de la autopercepción y el equilibrio entre luz y sombra. Coincidiendo con las corrientes de renovación de Imbolc, este portal es un momento sagrado para mirar dentro del alma con honestidad, disolver autoengaños y fortalecer la visión psíquica.",
    ingredients: "Un espejo pequeño, una vela blanca, un cuarzo transparente o selenita, e incienso de jazmín o mirra.",
    affirmation: "'Frente al espejo del universo, reconozco mi luz y mi sombra. Me acepto en integridad divina y elijo ver mi verdad con claridad y amor.'",
    steps: [
      "1. Sahumerio del Espejo: Enciende el incienso de jazmín y pasa el humo sobre la superficie del espejo para limpiar cualquier memoria energética.",
      "2. El Fuego de la Verdad: Coloca el espejo de pie frente a ti y enciende la vela blanca justo detrás de él, creando un halo de luz suave a su alrededor.",
      "3. Conexión Tercer Ojo: Sostén el cuarzo transparente entre tus manos. Mírate fijamente a los ojos en el espejo, respirando lento durante dos minutos.",
      "4. Pronunciar el Decreto: Recita la afirmación en voz alta con seguridad, sintiendo cómo se disuelven tus dudas de identidad o autovaloración.",
      "5. El Cierre del Espejo: Guarda el espejo boca abajo y deja que la vela blanca se consuma por completo."
    ]
  },
  {
    name: "Portal 3/3 (Creatividad y Expansión)",
    category: "portal",
    emoji: "✨",
    month: 2, // Marzo
    day: 3,
    astroDesc: "El Portal 3/3 canaliza la vibración de la tríada divina: mente, cuerpo y espíritu en perfecta armonía creativa. Es un día idóneo para la autoexpresión, expandir tus límites mentales y realizar rituales de manifestación de metas intelectuales o artísticas.",
    ingredients: "Una vela amarilla, hojas de papel en blanco, lápices de colores y sahumerio de mandarina o limón.",
    affirmation: "'Pienso, siento y actúo en perfecta alineación cósmica. Expreso mi verdad creativa con libertad y atraigo el éxito y la expansión a mis proyectos.'",
    steps: [
      "1. Sahumar la Mente: Enciende el sahumerio cítrico para despejar tu mente de ideas fijas o cansancio intelectual.",
      "2. Dibujar tus Metas: Toma el papel y dibuja o escribe de forma muy creativa y colorida tus 3 metas principales de este año.",
      "3. El Encendido Amarillo: Enciende la vela amarilla, el color de la mente y la inteligencia creativa.",
      "4. Decretar los 3 Pilares: Lee tus 3 metas en voz alta sintiendo que tu cuerpo físico, mente mental y espíritu divino cooperan para su logro.",
      "5. Guardado Activo: Dobla el papel en tres partes y guárdalo dentro de tu libro de lectura favorito."
    ]
  },
  {
    name: "Portal 4/4 (Estabilidad y Estructura)",
    category: "portal",
    emoji: "✨",
    month: 3, // Abril
    day: 4,
    astroDesc: "El Portal 4/4 activa la vibración del número cuatro, representando las bases sólidas, la estabilidad terrenal y la materialización práctica. Es el momento perfecto para realizar rituales de enraizamiento, seguridad financiera y protección de tus bienes materiales.",
    ingredients: "Una vela marrón o verde, un cuenco con tierra de jardín o una piedra grande y pesada, y sal marina.",
    affirmation: "'Construyo mi vida sobre bases de gran solidez y seguridad. La estabilidad material me rodea y mis finanzas están protegidas de cualquier viento discordante.'",
    steps: [
      "1. Meditación de Enraizamiento: Siéntate en el suelo. Coloca las palmas de tus manos en el suelo y visualiza que echas raíces profundas hacia la Tierra.",
      "2. El Cuenco del Asentamiento: Coloca la tierra de jardín y la piedra en un cuenco en tu altar.",
      "3. Encender la Estructura: Enciende la vela marrón o verde, que simboliza el crecimiento firme y la seguridad material.",
      "4. Hechizo de la Piedra: Sostén la piedra y deposita en ella tu deseo de estabilidad familiar y económica. Colócala en la entrada de tu casa.",
      "5. Sal de la Tierra: Rodea la vela con un círculo fino de sal marina para proteger tu petición."
    ]
  },
  {
    name: "Portal 5/5 (El Quinto Elemento y Cambio)",
    category: "portal",
    emoji: "✨",
    month: 4, // Mayo
    day: 5,
    astroDesc: "El Portal 5/5 conecta con la energía del número cinco: el cambio dinámico, el despertar de la conciencia, el viaje del alma y el Quinto Elemento (Éter). Favorece los rituales para romper la monotonía, tomar decisiones de cambio importantes y abrirse a nuevas aventuras vitales.",
    ingredients: "Una vela azul o morada, hojas de menta o eucalipto, y un mapa o una imagen del mundo.",
    affirmation: "'Abrazo el cambio dinámico con valor e inteligencia. Soy libre, flexible y confío plenamente en las oportunidades que el universo despliega ante mí.'",
    steps: [
      "1. Sahumerio de Eucalipto: Quema las hojas de eucalipto para despejar el campo áurico de la fatiga o inmovilismo.",
      "2. Visualizar Caminos: Mira la imagen del mundo o mapa y decreta los viajes o cambios de residencia/trabajo que deseas experimentar.",
      "3. Encender el Cambio: Enciende la vela azul o morada, el color de la transmutación y el éter espiritual.",
      "4. Decreto del 5: Escribe en un papel las 5 cosas del pasado de las que te liberas para poder avanzar sin anclas.",
      "5. Quema de las Anclas: Quema el papel de las anclas en la llama de la vela, dejando que el humo se lleve el pasado."
    ]
  },
  {
    name: "Portal 6/6 (Armonía y Vínculos Sanos)",
    category: "portal",
    emoji: "✨",
    month: 5, // Junio
    day: 6,
    astroDesc: "El Portal 6/6 activa la vibración del número seis: la armonía del hogar, el afecto desinteresado y los lazos afectivos de calidad. Es un portal ideal para rituales de conciliación familiar, endulzamientos de amistad y sanación de viejos dolores del corazón.",
    ingredients: "Una vela rosa, miel de flores, sahumerio de vainilla o lavanda, y un papel rosa.",
    affirmation: "'En mi hogar y en mi corazón reina la perfecta armonía. Sano mis relaciones con amor incondicional y atraigo vínculos basados en la lealtad y el afecto sincero.'",
    steps: [
      "1. Sahumar la Armonía: Enciende el sahumerio de vainilla o lavanda sintiendo que su aroma dulce pacifica el ambiente familiar.",
      "2. El Papel del Perdón: Escribe en el papel el nombre de los miembros de tu familia o amigos con los que deseas sanar tensiones y dibuja un corazón grande que los envuelva.",
      "3. Encender la Vela Rosa: Enciende la vela y medita en el amor incondicional. Visualiza a esas personas envueltas en luz rosa de paz.",
      "4. El Baño de Miel: Coloca unas gotitas de miel sobre los nombres escritos como símbolo de dulzura en la comunicación futura.",
      "5. Reposo: Coloca el papel doblado bajo la vela (con precaución) hasta que se consuma."
    ]
  },
  {
    name: "Portal 7/7 (Sabiduría e Intuición)",
    category: "portal",
    emoji: "✨",
    month: 6, // Julio
    day: 7,
    astroDesc: "El Portal 7/7 vibra con el número sagrado siete, el número del misticismo, la verdad profunda y la conexión psíquica con los planos superiores de conciencia. Es un día ideal para realizar tiradas profundas de Tarot, meditaciones de canalización o consagrar tu tercer ojo.",
    ingredients: "Una vela morada o plateada, aceite esencial de lavanda o sándalo, tus cartas de Tarot, y un vaso de agua limpia.",
    affirmation: "'Abro mi tercer ojo a la sabiduría cósmica y confío plenamente en mi voz interior. Mi intuición es clara, certera y alineada con la verdad universal.'",
    steps: [
      "1. Consagración del Tercer Ojo: Coloca una gota de aceite esencial de lavanda en la yema de tu dedo y realiza un suave masaje circular en tu entrecejo (chakra Ajna).",
      "2. El Encendido Místico: Enciende la vela morada o plateada en silencio, con la luz de tu habitación apagada.",
      "3. Limpieza de Cartas: Pasa tu mazo de Tarot suavemente por el humo de un sahumerio o por encima del calor de la vela decretando su limpieza.",
      "4. Realizar la Consulta: Realiza una lectura de Tarot centrada en tu evolución espiritual, prestando especial atención a las respuestas del oráculo hoy.",
      "5. Reposo Psíquico: Bebe el vaso de agua lentamente antes de dormir para retener la claridad psíquica."
    ]
  },
  {
    name: "Portal 8/8 (Portal de la Puerta del León)",
    category: "portal",
    emoji: "✨",
    month: 7, // Agosto
    day: 8,
    astroDesc: "El Portal de la Puerta del León es uno de los eventos esotéricos anuales más intensos y esperados. Ocurre cuando la estrella Sirio se alinea con la Tierra y el cinturón de Orión en el signo de Leo. Rige el poder personal infinito, el éxito financiero majestuoso, el renacimiento áurico y la manifestación de riquezas materiales elevadas.",
    ingredients: "Una vela dorada o naranja, pirita u ojo de tigre, hojas de laurel seco, y una copa de agua con una pizca de sal marina.",
    affirmation: "'Reclamo mi poder real bajo el portal de la Puerta del León. Abro las compuertas de la abundancia infinita. Soy fuerte, abundante y exitoso/a.'",
    steps: [
      "1. Sahumar la Abundancia: Enciende una rama de canela o incienso dorado y pásala alrededor de tu altar visualizando éxito financiero majestuoso.",
      "2. El Encendido del León: Enciende la vela dorada y coloca a su pie el cristal de pirita u ojo de tigre.",
      "3. Círculo de Sal Marina: Coloca la copa de agua con la pizca de sal en tu altar para absorber cualquier duda mental o limitación.",
      "4. Quema de laurel: Quema tres hojas de laurel en la llama de la vela visualizando con nitidez tus metas de prosperidad económica logradas.",
      "5. Carga de Luz: Coloca el cristal cargado en tu billetera o bolso para que actúe como imán de riqueza constante."
    ]
  },
  {
    name: "Portal 9/9 (Cierre de Ciclos y Sabiduría)",
    category: "portal",
    emoji: "✨",
    month: 8, // Septiembre
    day: 9,
    astroDesc: "El Portal 9/9 vibra con la culminación, la asimilación del aprendizaje vital y el cierre de etapas obsoletas. Te impulsa a desapegarte de resentimientos y a perdonar para poder abrir la puerta a un nuevo nivel evolutivo. Es un día de sanación kármica.",
    ingredients: "Una vela blanca lisa, papel blanco, un hilo morado o negro, y sahumerio de romero.",
    affirmation: "'Cierro con amor y gratitud las etapas que ya cumplieron su propósito. Perdono el pasado, asimilo su sabiduría y avanzo libre hacia mi nuevo destino.'",
    steps: [
      "1. Escribir los Pendientes: Escribe en el papel los nombres de personas o situaciones del pasado con las que sientas resentimiento o dolor.",
      "2. Atar con el Hilo: Dobla el papel y átalo con el hilo morado o negro como símbolo de que sellas y cierras esa etapa.",
      "3. Encender el Perdón: Enciende la vela blanca y quema el papel atado con el hilo visualizando con calma que liberas y bendices ese pasado.",
      "4. Sahumar la paz: Pasa el humo del romero por tu cuerpo sintiendo ligereza física e interna.",
      "5. Enterrar las Cenizas: Entierra las cenizas del papel quemado en la tierra exterior, dejando ir definitivamente el karma viejo."
    ]
  },
  {
    name: "Portal 10/10 (Nuevos Caminos y Liderazgo)",
    category: "portal",
    emoji: "✨",
    month: 9, // Octubre
    day: 10,
    astroDesc: "El Portal 10/10 representa el renacimiento espiritual, la vibración del número diez (el inicio de una nueva octava tras el nueve). Activa el valor para liderar tu vida, definir nuevas metas solemnes y tomar las riendas de tu destino personal.",
    ingredients: "Una vela roja o naranja, un cuaderno nuevo para metas, y sahumerio de menta o eucalipto.",
    affirmation: "'Doy inicio a un nuevo nivel evolutivo en mi vida. Asumo el liderazgo de mi destino con coraje, fe y determinación absoluta. El triunfo me pertenece.'",
    steps: [
      "1. Purificar el Espacio: Enciende el sahumerio de eucalipto para energizar tu mente y despertar tu fuerza de voluntad.",
      "2. Estrenar el Cuaderno: Abre tu cuaderno nuevo de metas y escribe en la primera página: 'Mi Camino de Éxito iniciado el 10/10'.",
      "3. Definir la Nueva Meta: Escribe detalladamente tu principal meta personal o profesional a manifestar en los próximos seis meses.",
      "4. Encender el Liderazgo: Enciende la vela roja visualizando tu triunfo y valor para superar cualquier obstáculo.",
      "5. Lectura Diaria: Lee esta meta cada mañana para enfocar tu energía subconsciente en su cumplimiento."
    ]
  },
  {
    name: "Portal 11/11 (Portal de la Iluminación Mayor)",
    category: "portal",
    emoji: "✨",
    month: 10, // Noviembre
    day: 11,
    astroDesc: "El Portal 11/11 es considerado el portal espiritual más poderoso y sagrado del año. La vibración maestra del 11 activa la conexión directa con tu Yo Superior, la iluminación de la conciencia y la manifestación instantánea de los deseos del alma. Es una fecha de meditación profunda e intenciones puras.",
    ingredients: "Una vela blanca y una dorada, aceite esencial de sándalo o mirra, flores blancas, y una hoja de pergamino para tus 11 intenciones.",
    affirmation: "'Me conecto con la luz infinita de mi Yo Superior. Alineo mis intenciones con el plano divino y declaro que mi vida es un reflejo de iluminación, amor y éxito.'",
    steps: [
      "1. Altar de Iluminación: Adorna tu altar con las flores blancas. Coloca la vela blanca (espíritu) y la vela dorada (luz solar) juntas.",
      "2. Unción Sagrada: Aplica una gota de aceite de sándalo en tus sienes y en tus muñecas para elevar tu frecuencia vibracional.",
      "3. Escribir las 11 Intenciones: Escribe con calma en tu pergamino 11 deseos específicos redactados en tiempo presente con gratitud.",
      "4. Encendido del Canal: Enciende ambas velas y realiza una meditación en silencio a las 11:11 (mañana o noche) visualizando que un canal de luz blanca entra por tu coronilla.",
      "5. El Guardado Sagrado: Dobla el pergamino y guárdalo en tu caja o cofre místico favorito, leyendo sus intenciones en cada portal numérico posterior."
    ]
  },
  {
    name: "Portal 12/12 (Conexión Cósmica Final)",
    category: "portal",
    emoji: "✨",
    month: 11, // Diciembre
    day: 12,
    astroDesc: "El Portal 12/12 activa la vibración del número doce, el número de la finalización cósmica y la integración de todos los aprendizajes del año. Representa la conexión del alma con el gran Sol Central del universo. Es el momento perfecto para sellar tu energía protectora y agradecer.",
    ingredients: "Una vela morada, sahumerio de incienso puro o copal, y un vaso de agua con limón.",
    affirmation: "'Integro en mi alma los aprendizajes de este año y sello mi aura con luz dorada protectora. Estoy listo/a para recibir las bendiciones del ciclo venidero.'",
    steps: [
      "1. Sahumerio del Sello: Quema incienso o copal para purificar por completo tu aura y espacio antes de sellar tu año energético.",
      "2. El Encendido de la Integración: Enciende la vela morada visualizando una luz violeta protectora que forma un capullo a tu alrededor.",
      "3. Meditación de Cierre: Siéntate en paz, respira hondo y recuerda las bendiciones del año transcurrido. Agradece cada reto.",
      "4. El Elíxir de Limpieza: Bebe el vaso de agua con limón visualizando que purificas tu cuerpo físico de toxinas y tensiones.",
      "5. Cierre: Deja consumir la vela sabiendo que tu año energético queda sellado bajo protección de luz."
    ]
  }
];

// Inicialización de la Página al cargar
document.addEventListener('DOMContentLoaded', () => {
  // Asegurarnos de que el menú de navegación marque correctamente la pestaña
  setupNavigationHighlight();
  
  // Inicializar Calendario
  initMysticalCalendar();
});

// Resalta la pestaña activa de manera correcta
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

// Inicialización principal del calendario
function initMysticalCalendar() {
  const calGrid = document.getElementById('calendar-grid');
  const prevBtn = document.getElementById('cal-prev-btn');
  const nextBtn = document.getElementById('cal-next-btn');
  
  if (!calGrid || !prevBtn || !nextBtn) return;
  
  // Establecer fecha actual
  selectedCalendarDate = new Date();
  activeCalendarMonth = selectedCalendarDate.getMonth();
  activeCalendarYear = selectedCalendarDate.getFullYear();
  
  // Event listeners para los botones de cambio de mes
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
  
  // Event listener para el botón "Hoy" (regresar al día actual)
  const todayBtn = document.getElementById('cal-today-btn');
  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      selectDayOfDate(new Date());
    });
  }
  
  // Event listeners para los Filtros de Categoría
  const filtersContainer = document.getElementById('calendar-filters');
  if (filtersContainer) {
    filtersContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.calendar-filter-chip');
      if (!chip) return;
      
      // Quitar clase active a todos los chips y ponerla al seleccionado
      document.querySelectorAll('.calendar-filter-chip').forEach(btn => {
        btn.classList.remove('active');
      });
      chip.classList.add('active');
      
      // Actualizar filtro y volver a renderizar
      currentCategoryFilter = chip.dataset.filter;
      renderMysticalCalendar();
    });
  }
  
  // Event listener para el botón de completar ritual
  const completeBtn = document.getElementById('ritual-complete-toggle-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', toggleRitualCompletion);
  }
  
  // Primera renderización del calendario y widget de progreso
  renderMysticalCalendar();
  
  // Inicializar e inyectar el historial de rituales consagrados
  updateCompletedRitualsHistory();
  
  // Seleccionar por defecto el día de hoy al arrancar
  selectDayOfDate(new Date());
}

// Renderiza los días y auras en el calendario
function renderMysticalCalendar() {
  const calGrid = document.getElementById('calendar-grid');
  const monthYearEl = document.getElementById('cal-month-year');
  if (!calGrid || !monthYearEl) return;
  
  calGrid.innerHTML = '';
  
  // Actualizar el título del mes y año
  const MONTHS_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthYearEl.textContent = `${MONTHS_NAMES[activeCalendarMonth]} ${activeCalendarYear}`;
  
  // Renderizar las cabeceras de los días de la semana (Lunes a Domingo)
  const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  WEEKDAYS.forEach(day => {
    const div = document.createElement('div');
    div.className = 'mystical-cal-weekday';
    div.textContent = day;
    calGrid.appendChild(div);
  });
  
  // Obtener el día de la semana en que inicia el mes
  // getDay() retorna 0 para Domingo, 1 para Lunes...
  const firstDay = new Date(activeCalendarYear, activeCalendarMonth, 1).getDay();
  // Ajustar para iniciar en Lunes (desplazar Domingo al final)
  const startOffset = (firstDay + 6) % 7;
  
  // Obtener número de días en el mes
  const daysInMonth = new Date(activeCalendarYear, activeCalendarMonth + 1, 0).getDate();
  
  // Agregar celdas vacías previas
  for (let i = 0; i < startOffset; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'mystical-cal-day empty';
    calGrid.appendChild(emptyDiv);
  }
  
  // Renderizar los días del mes
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'mystical-cal-day';
    dayDiv.dataset.day = d;
    
    // Crear el objeto fecha correspondiente a este día
    const cellDate = new Date(activeCalendarYear, activeCalendarMonth, d);
    
    // Almacenar fecha serializada
    dayDiv.dataset.dateStr = cellDate.toLocaleDateString('sv'); // Formato 'AAAA-MM-DD'
    
    // Número del día
    const numSpan = document.createElement('span');
    numSpan.className = 'mystical-cal-day-num';
    numSpan.textContent = d;
    dayDiv.appendChild(numSpan);
    
    // Verificar si es el día de hoy
    const today = new Date();
    if (cellDate.getDate() === today.getDate() && 
        cellDate.getMonth() === today.getMonth() && 
        cellDate.getFullYear() === today.getFullYear()) {
      dayDiv.classList.add('today');
    }
    
    // Verificar si es el día actualmente seleccionado en el panel de detalles
    if (cellDate.getDate() === selectedCalendarDate.getDate() && 
        cellDate.getMonth() === selectedCalendarDate.getMonth() && 
        cellDate.getFullYear() === selectedCalendarDate.getFullYear()) {
      dayDiv.classList.add('active');
    }
    
    // Buscar si este día tiene algún ritual/evento
    const event = getEventForDate(cellDate);
    
    if (event) {
      dayDiv.dataset.hasEvent = 'true';
      dayDiv.dataset.eventCategory = event.category;
      
      // Aplicar estilo de aura según la categoría del evento
      dayDiv.classList.add(`event-${event.category}`);
      
      // Añadir emoji correspondiente
      const emojiSpan = document.createElement('span');
      emojiSpan.className = 'mystical-cal-emoji';
      emojiSpan.textContent = event.emoji;
      dayDiv.appendChild(emojiSpan);
      
      // Ocultar la aura si el filtro de categoría está activo y no coincide
      if (currentCategoryFilter !== 'all' && currentCategoryFilter !== event.category) {
        // En lugar de ocultar el día entero, le quitamos las clases visuales de evento
        dayDiv.classList.remove(`event-${event.category}`);
        dayDiv.querySelector('.mystical-cal-emoji')?.remove();
        dayDiv.dataset.hasEvent = 'false';
      }
      
      // Comprobar si el ritual ya fue marcado como completado en localStorage
      const isCompleted = localStorage.getItem(`ritual_completed_${dayDiv.dataset.dateStr}`);
      if (isCompleted === 'true' && dayDiv.dataset.hasEvent === 'true') {
        dayDiv.classList.add('completed');
        
        // Agregar checkmark badge
        const checkBadge = document.createElement('span');
        checkBadge.className = 'mystical-cal-completed-badge';
        checkBadge.textContent = '✓';
        dayDiv.appendChild(checkBadge);
      }
    }
    
    // Evento de clic en el día del calendario
    dayDiv.addEventListener('click', () => {
      // Remover clase active de todos los días y ponerla a este
      document.querySelectorAll('.mystical-cal-day').forEach(cell => {
        cell.classList.remove('active');
      });
      dayDiv.classList.add('active');
      
      // Actualizar fecha seleccionada
      selectedCalendarDate = new Date(activeCalendarYear, activeCalendarMonth, d);
      
      // Renderizar los detalles del ritual del día elegido
      renderRitualDetailsForDate(selectedCalendarDate);
      updateQuickDateWidget(selectedCalendarDate);
    });
    
    calGrid.appendChild(dayDiv);
  }
  
  // Actualizar el progreso espiritual del mes
  updateMonthSpiritualProgress();
}

// Devuelve el objeto evento para una fecha dada (fija o dinámica de luna)
function getEventForDate(date) {
  const d = date.getDate();
  const m = date.getMonth(); // 0-indexed
  
  // 1. Buscar en la base de datos de eventos fijos (sabbats, portales, tradicionales)
  let foundEvent = MYSTICAL_EVENTS_DB.find(ev => ev.month === m && ev.day === d);
  if (foundEvent) return foundEvent;
  
  // 2. Si no es fecha fija, calcular dinámicamente si es Luna Nueva o Luna Llena
  // getMoonPhaseDetails está disponible globalmente en app.js
  if (typeof getMoonPhaseDetails === 'function') {
    const moon = getMoonPhaseDetails(date);
    if (moon.phaseName === "Luna Llena") {
      return {
        name: "Esplendor de Luna Llena 🌕 (Consagración y Liberación)",
        category: "moon",
        emoji: "🌕",
        astroDesc: "La gran linterna celestial brilla hoy en su apogeo, vertiendo torrentes de magnetismo y luz plateada sobre el inconsciente y las facultades intuitivas. La Luna Llena rige la cosecha emocional, la gratitud y la disolución consciente de dolores, hábitos o relaciones que ya cumplieron su propósito evolutivo.",
        ingredients: "Una vela blanca lisa, un cuenco con agua limpia (dejar reposar bajo el sereno), una varita de incienso de romero o sándalo, y un cristal de cuarzo blanco o selenita.",
        affirmation: "'Bajo el amparo y la luz purificadora de esta Luna Llena, libero los miedos y ataduras de mi pasado. Agradezco las cosechas de mi alma y me abro al flujo infinito del universo.'",
        steps: [
          "1. Limpieza Energética: Enciende el incienso de romero y pásalo en suaves espirales alrededor de tu cuerpo y espacio para purificar tu aura de energías densas.",
          "2. Consagración del Cristal: Sostén tu cuarzo o selenita entre tus manos y visualiza que se carga de luz lunar, luego colócalo junto al cuenco de agua cerca de una ventana.",
          "3. Escribir para Soltar: Escribe en un trozo de papel aquellos hábitos, deudas afectivas, bloqueos o rencores de los que deseas desapegarte definitivamente.",
          "4. Alquimia del Fuego: Enciende la vela blanca y quema el papel con sumo cuidado en un recipiente seguro, visualizando que toda negatividad se transmuta en humo liberador.",
          "5. Elixir de Claridad: Bebe un sorbo del agua consagrada por la luna antes de dormir, decretando que la sabiduría celestial ilumine tus sueños."
        ]
      };
    } else if (moon.phaseName === "Luna Nueva") {
      return {
        name: "Semilla de Luna Nueva 🌑 (Intenciones y Renovación)",
        category: "moon",
        emoji: "🌑",
        astroDesc: "El firmamento se viste de oscuridad absoluta hoy, marcando el renacimiento de la luna y el vacío cósmico donde se gestan las nuevas realidades. La Luna Nueva rige la introspección silenciosa, la siembra de anhelos del alma y la manifestación de metas que crecerán a lo largo del mes.",
        ingredients: "Una vela azul marino o blanca, una maceta pequeña con tierra fértil (o un jardín exterior), semillas de lavanda o flores, y tu diario esotérico.",
        affirmation: "'En la fecunda oscuridad de esta Luna Nueva, planto mis anhelos con absoluta certeza y amor. Confío plenamente en el ritmo divino para verlos florecer.'",
        steps: [
          "1. Sahumerio del Vacío: Quema copal o incienso de ruda para limpiar el ambiente de cansancio y propiciar un estado de absoluto recogimiento mental.",
          "2. Meditación en Calma: Apaga todas las luces y permanece en silencio durante 5 minutos para sintonizar con la infinita energía latente de tus deseos internos.",
          "3. Sembrar Intenciones: Escribe en tu diario sagrado una lista de un máximo de 5 propósitos que quieras iniciar en este ciclo, redactados en presente y positivo.",
          "4. El Faro de Manifestación: Enciende la vela azul y lee tus intenciones en voz alta tres veces, sintiendo en tu corazón la alegría de verlas manifestadas.",
          "5. Siembra Física: Entierra las semillas en la tierra junto a tu lista de intenciones doblada en cuatro partes, simbolizando que tus sueños echan raíces en el plano material."
        ]
      };
    }
  }
  
  return null;
}

// Selecciona un día específico y carga sus datos en los paneles
function selectDayOfDate(date) {
  selectedCalendarDate = date;
  activeCalendarMonth = date.getMonth();
  activeCalendarYear = date.getFullYear();
  
  // Renderizar de nuevo para actualizar clases CSS
  renderMysticalCalendar();
  
  // Cargar detalles
  renderRitualDetailsForDate(date);
  updateQuickDateWidget(date);
}

// Actualiza el widget lateral con la fecha seleccionada
function updateQuickDateWidget(date) {
  const quickDateText = document.getElementById('quick-date-text');
  const quickDateIcon = document.getElementById('quick-date-icon');
  
  if (!quickDateText) return;
  
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const formatted = date.toLocaleDateString('es-ES', options);
  
  // Capitalizar primera letra de la fecha
  quickDateText.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  
  const event = getEventForDate(date);
  if (event) {
    quickDateIcon.textContent = event.emoji;
  } else {
    quickDateIcon.textContent = "📅";
  }
}

// Renderiza la información del ritual del día elegido en el tapete de detalles
function renderRitualDetailsForDate(date) {
  const ritualNameEl = document.getElementById('ritual-name');
  const ritualBadgeEl = document.getElementById('ritual-badge');
  const ritualIntroDesc = document.getElementById('ritual-intro-desc');
  const ritualContentBlock = document.getElementById('ritual-content-block');
  const completeBtn = document.getElementById('ritual-complete-toggle-btn');
  
  if (!ritualNameEl || !ritualContentBlock) return;
  
  const event = getEventForDate(date);
  const dateStr = date.toLocaleDateString('sv');
  
  if (event) {
    // Mostrar bloque de contenido de rituales y ocultar la intro de ayuda
    ritualIntroDesc.classList.add('hidden');
    ritualContentBlock.classList.remove('hidden');
    
    // Nombre del evento
    ritualNameEl.textContent = event.name;
    
    // Categoría/Badge del evento
    ritualBadgeEl.className = `ritual-detail-badge ${event.category}`;
    
    // Cambiar texto de badge
    let categoryName = "Evento Cósmico";
    if (event.category === 'sabbat') categoryName = "Rueda del Año (Sabbat)";
    if (event.category === 'moon') categoryName = "Fase Lunar (Grimorio)";
    if (event.category === 'traditional') categoryName = "Tradición Popular";
    if (event.category === 'portal') categoryName = "Portal Numérico";
    ritualBadgeEl.textContent = categoryName;
    ritualBadgeEl.classList.remove('hidden');
    
    // Rellenar las secciones del ritual
    document.getElementById('ritual-astro-desc').innerHTML = event.astroDesc;
    document.getElementById('ritual-ingredients').innerHTML = event.ingredients;
    document.getElementById('ritual-affirmation').innerHTML = event.affirmation;
    
    // Pasos del ritual (Limpiar y volver a poblar con diseño premium)
    const stepsContainer = document.getElementById('ritual-steps');
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
    
    // Actualizar el estado del botón de completado
    updateRitualCompleteButtonState(dateStr);
    
  } else {
    // Ocultar bloque del ritual y mostrar mensaje del día tranquilo
    ritualContentBlock.classList.add('hidden');
    ritualIntroDesc.classList.remove('hidden');
    ritualBadgeEl.classList.add('hidden');
    
    ritualNameEl.textContent = "✦ Energía Astral Tranquila ✦";
    ritualIntroDesc.innerHTML = `
      La energía cósmica de este día es de reposo y enraizamiento. No se registran portales numéricos ni solsticios activos.<br><br>
      <span style="font-size: 0.9rem; color: var(--gold-color);">Es un momento idóneo para recargar velas, realizar meditación en silencio o consultar al Oráculo de Tarot para tus dudas.</span>
    `;
  }
}

// Actualiza el texto e icono del botón de completado
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

// Event listener del botón de completado
function toggleRitualCompletion() {
  const dateStr = selectedCalendarDate.toLocaleDateString('sv');
  const key = `ritual_completed_${dateStr}`;
  const completeBtn = document.getElementById('ritual-complete-toggle-btn');
  
  const isCompleted = localStorage.getItem(key) === 'true';
  
  if (isCompleted) {
    // Marcar como incompleto
    localStorage.removeItem(key);
  } else {
    // Marcar como completado y guardar en el localStorage
    localStorage.setItem(key, 'true');
    
    // Micro-animación de destello al completar
    if (completeBtn) {
      completeBtn.classList.add('completed-animate');
      setTimeout(() => {
        completeBtn.classList.remove('completed-animate');
      }, 600);
    }
  }
  
  // Renderizar de nuevo el calendario para actualizar los badges
  renderMysticalCalendar();
  // Volver a renderizar detalles para actualizar el estado del botón
  renderRitualDetailsForDate(selectedCalendarDate);
  // Actualizar el widget de progreso del mes
  updateMonthSpiritualProgress();
  // Actualizar la lista lateral del historial de consagraciones
  updateCompletedRitualsHistory();
}

// Calcula el progreso de rituales completados en el mes activo
function updateMonthSpiritualProgress() {
  const percentEl = document.getElementById('calendar-progress-percent');
  const fillEl = document.getElementById('calendar-progress-fill');
  const textEl = document.getElementById('calendar-progress-text');
  
  if (!percentEl || !fillEl || !textEl) return;
  
  // Obtener todos los días del mes actual que tienen un ritual/evento
  const daysInMonth = new Date(activeCalendarYear, activeCalendarMonth + 1, 0).getDate();
  let totalEventsCount = 0;
  let completedEventsCount = 0;
  
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(activeCalendarYear, activeCalendarMonth, d);
    const dateStr = cellDate.toLocaleDateString('sv');
    
    // Buscar si hay evento y si coincide con la categoría del filtro
    const event = getEventForDate(cellDate);
    if (event) {
      // Si hay filtro activo de categoría y no coincide, no lo contamos para el progreso del mes
      if (currentCategoryFilter !== 'all' && currentCategoryFilter !== event.category) {
        continue;
      }
      
      totalEventsCount++;
      const isCompleted = localStorage.getItem(`ritual_completed_${dateStr}`) === 'true';
      if (isCompleted) {
        completedEventsCount++;
      }
    }
  }
  
  // Calcular porcentaje
  let percent = 0;
  if (totalEventsCount > 0) {
    percent = Math.round((completedEventsCount / totalEventsCount) * 100);
  }
  
  // Actualizar barra de progreso y porcentaje
  percentEl.textContent = `${percent}%`;
  fillEl.style.width = `${percent}%`;
  
  // Actualizar mensaje descriptivo
  if (totalEventsCount === 0) {
    textEl.textContent = "No hay eventos activos para esta categoría en este mes.";
  } else if (completedEventsCount === 0) {
    textEl.textContent = `Tienes ${totalEventsCount} rituales sugeridos este mes. ¡Consagra tu primer ritual!`;
  } else if (completedEventsCount < totalEventsCount) {
    textEl.textContent = `Has realizado ${completedEventsCount} de ${totalEventsCount} rituales este mes.`;
  } else {
    textEl.textContent = `¡Felicidades! Has completado los ${totalEventsCount} rituales sugeridos de este ciclo. ✨`;
  }
}

// Inyecta dinámicamente y mantiene al día el historial lateral de consagraciones
function updateCompletedRitualsHistory() {
  const historyListEl = document.getElementById('calendar-history-list');
  const historyCountEl = document.getElementById('calendar-history-count');
  if (!historyListEl || !historyCountEl) return;

  historyListEl.innerHTML = '';
  
  // 1. Obtener todas las claves del localStorage que representan rituales realizados
  const completedKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const match = key.match(/^ritual_completed_(\d{4}-\d{2}-\d{2})$/);
      if (match) {
        completedKeys.push(match[1]); // Añade la fecha serializada YYYY-MM-DD
      }
    }
  }

  // 2. Ordenar las fechas en orden cronológico descendente (las más recientes arriba)
  completedKeys.sort((a, b) => b.localeCompare(a));

  // Actualizar el contador lateral del widget
  historyCountEl.textContent = completedKeys.length;

  if (completedKeys.length === 0) {
    historyListEl.innerHTML = `
      <p style="color: var(--text-muted); font-style: italic; text-align: center; margin: 0.5rem 0; font-size: 0.8rem;">
        No has consagrado rituales aún.
      </p>
    `;
    return;
  }

  // 3. Crear y agregar dinámicamente cada elemento al panel
  completedKeys.forEach(dateStr => {
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed en JS
    const day = parseInt(parts[2], 10);
    const cellDate = new Date(year, month, day);

    // Obtener los datos del ritual para ese día
    const event = getEventForDate(cellDate);
    const emoji = event ? event.emoji : '✨';
    const name = event ? event.name : 'Ritual Místico';
    
    // Formatear la fecha para mostrar (DD/MM/YYYY)
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;

    // Crear el elemento de botón interactivo
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

    // Manejador de evento al hacer clic para navegar al mes/año del ritual y seleccionarlo
    itemEl.addEventListener('click', () => {
      // Ajustar mes y año activos
      activeCalendarYear = cellDate.getFullYear();
      activeCalendarMonth = cellDate.getMonth();
      
      // Seleccionar día y cargar detalles
      selectDayOfDate(cellDate);
      
      // Desplazar con animación fluida hacia el panel de detalles del ritual
      const detailPanel = document.getElementById('ritual-detail-panel');
      if (detailPanel) {
        detailPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    historyListEl.appendChild(itemEl);
  });
}

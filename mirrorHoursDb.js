/**
 * Eco Estelar — Base de Datos de Horas Espejo, Invertidas, Triples, Maestras y Secuencias
 * Fundamentada en Numerología Pitagórica, Angelología Cabalística y Arcanos del Tarot de Marsella.
 * Textos profundamente elaborados para una inmersión mística completa.
 */

const MIRROR_HOURS_DB = {
  // =========================================================================
  // 🌟 LAS 24 HORAS ESPEJO PRINCIPALES (00:00 - 23:23)
  // =========================================================================

  "00:00": {
    time: "00:00",
    type: "mirror",
    title: "El Renacimiento y la Nada Creadora",
    angelName: "Mumiah",
    angelMeaning: "Ángel número 72 de la Cábala, custodio del renacimiento, el cierre sagrado de ciclos y la regeneración espiritual profunda.",
    spiritualMessage: "El 00:00 es el punto cero del cosmos, el misterio del vacío fértil donde la totalidad aún no ha tomado forma física pero contiene en potencia todas las creaciones del universo. Al toparte con esta hora sagrada, los planos sutiles te indican que un ciclo vital de gran trascendencia ha llegado a su consumación definitiva. Estás situado en el umbral entre lo que fue y lo que será: un lienzo en blanco absoluto concedido por la providencia para rediseñar tu destino sin las ataduras, culpas ni cargas del pasado.",
    numerology: "Número 0 (Suma 0): En la numerología pitagórica y hermética, el cero representa el Huevo Cósmico, el Ouroboros y la Fuente Primordial inagotable. Representa la eternidad, el infinito y la unión indisoluble con la divinidad.",
    tarotCard: "El Loco (Arcano 0 / XXII)",
    tarotMeaning: "Simboliza el salto de fe hacia lo desconocido, la inocencia recuperada y la libertad absoluta del alma que camina ligera de equipaje confiando ciegamente en el sendero del universo.",
    affirmation: "Me despojo de todo lo que fue. En el silencio de este nuevo comienzo, renazco libre, pleno y alineado con mi mayor propósito.",
    advice: "Dedica unos minutos a la introspección silenciosa. Perdona las viejas heridas, decreta el cierre consciente de etapas agotadas y atrévete a dar el primer paso en ese nuevo proyecto o cambio de vida."
  },

  "01:01": {
    time: "01:01",
    type: "mirror",
    title: "La Voluntad y el Liderazgo Creador",
    angelName: "Elemiah",
    angelMeaning: "Ángel del coraje interior, la iniciativa victoriosa y el descubrimiento de los talentos ocultos del alma.",
    spiritualMessage: "El 01:01 es un poderoso recordatorio de tu condición como artífice consciente de tu propia realidad. Esta sincronicidad suele manifestarse cuando dudas de tu fuerza o cuando estás a punto de iniciar una empresa que requiere valentía. En el plano de las relaciones, puede señalar que alguien piensa en ti con profunda admiración y respeto, reconociendo tu luz y magnetismo. El cosmos te exige que dejes de esperar la validación ajena y tomes con firmeza las riendas de tu vida.",
    numerology: "Número 2 (1+1): El 1 representa el impulso pionero y la chispa divina, que al duplicarse (1+1=2) se transforma en la semilla de una alianza fecunda y en el puente entre la idea y su primera manifestación.",
    tarotCard: "El Mago (Arcano I)",
    tarotMeaning: "Dispones sobre tu mesa mística de los cuatro elementos (bastos, copas, espadas y oros) para transformar tu entorno y materializar tus más altas aspiraciones.",
    affirmation: "Tengo el poder, la inteligencia y la determinación para transformar mis visiones en realidades tangibles.",
    advice: "Pasa de la deliberación a la acción concreta. No postergues más esa conversación o iniciativa; el momento óptimo para sembrar tu liderazgo es ahora."
  },

  "02:02": {
    time: "02:02",
    type: "mirror",
    title: "La Intuición y la Dualidad Sagrada",
    angelName: "Achaiah",
    angelMeaning: "Ángel de la paciencia reflexiva, el desvelo de los misterios de la naturaleza y la perseverancia serena.",
    spiritualMessage: "El 02:02 te advierte que existen dinámicas y acontecimientos gestándose tras el velo de lo visible que muy pronto saldrán a la luz. Es una llamada urgente a silenciar el ruido mental para escuchar los susurros de tu voz interior. En el ámbito vincular, sugiere la necesidad de empatía, escucha activa y reconciliación de polaridades; no todo es blanco o negro, y la verdadera sabiduría radica en abrazar los matices de la experiencia humana.",
    numerology: "Número 4 (2+2): La suma de los dos números duales engendra el 4, el símbolo del cuadrado sagrado, la estabilidad terrenal, el trabajo constante y la maduración sólida.",
    tarotCard: "La Papisa / La Sacerdotisa (Arcano II)",
    tarotMeaning: "La guardiana de los misterios y el conocimiento velado. Invita a la prudencia, al estudio interior y a la gestación silenciosa antes de revelar los planes al mundo.",
    affirmation: "Escucho con reverencia la sabiduría de mi intuición. En la calma y la paciencia encuentro todas las respuestas que busco.",
    advice: "Evita tomar decisiones precipitadas basadas en juicios superficiales. Guarda tus proyectos para ti mientras maduran y cultiva la serenidad ante la incertidumbre."
  },

  "03:03": {
    time: "03:03",
    type: "mirror",
    title: "La Comunicación y la Expansión Creativa",
    angelName: "Aladiah",
    angelMeaning: "Ángel de la gracia divina, la sanación kármica, el perdón regenerador y la armonización de conflictos.",
    spiritualMessage: "El 03:03 vibra con la radiante energía de la autoexpresión, la elocuencia y el florecimiento social. Esta hora espejo se te presenta cuando tus palabras y creaciones tienen el don de sanar, inspirar o desbloquear situaciones estancadas. Los guías te alientan a expresar tus sentimientos con total autenticidad y a rodearte de personas que eleven tu frecuencia vibratoria, dejando atrás relaciones que apagan tu chispa natural.",
    numerology: "Número 6 (3+3): La trinidad duplicada da lugar al 6, el número pitagórico de la belleza, la armonía del corazón, el equilibrio hogareño y la responsabilidad compasiva.",
    tarotCard: "La Emperatriz (Arcano III)",
    tarotMeaning: "Representa la Madre Cósmica, la creatividad en su máxima expresión, la fertilidad de las ideas y la abundancia desbordante de la naturaleza.",
    affirmation: "Mi voz es un canal de armonía y verdad. Abro mis brazos a la belleza, la creatividad y la abundancia que me corresponden por derecho divino.",
    advice: "Utiliza tu talento para comunicar: escribe, pinta, dialoga o aclara con amor esa conversación pendiente. La creatividad es tu mejor medicina."
  },

  "04:04": {
    time: "04:04",
    type: "mirror",
    title: "La Estructura y la Protección Firme",
    angelName: "Yezalel",
    angelMeaning: "Ángel de la lealtad, la reconciliación conyugal y la rectitud en los acuerdos materiales y espirituales.",
    spiritualMessage: "El 04:04 es un escudo de protección celestial que desciende sobre tu plano material. El universo te recuerda que para edificar un templo duradero se requieren cimientos inquebrantables. Esta hora te invita a revisar tus hábitos diarios, tu descanso, tu salud física y tus finanzas. Si estás atravesando una época de desafíos o sobrecarga laboral, los ángeles te aseguran que tu disciplina y tenacidad te llevarán a una victoria rotunda.",
    numerology: "Número 8 (4+4): La unión de las dos estructuras produce el 8, símbolo del infinito vertical, la justicia cósmica, el poder de manifestación económica y la Ley de Retribución Universal.",
    tarotCard: "El Emperador (Arcano IV)",
    tarotMeaning: "Simboliza la autoridad benevolente, el orden sobre el caos, la estabilidad inquebrantable y el dominio pragmático de las leyes terrenales.",
    affirmation: "Construyo mi vida sobre bases firmes de disciplina y rectitud. La protección divina resguarda cada uno de mis pasos.",
    advice: "Pon orden en tus espacios físicos y organiza tus metas con un plan estructurado. No temas poner límites claros y saludables a quienes intenten sobrepasarlos."
  },

  "05:05": {
    time: "05:05",
    type: "mirror",
    title: "La Transformación y el Movimiento Vital",
    angelName: "Hekamiah",
    angelMeaning: "Ángel de la lealtad incondicional, la liberación de opresiones y el coraje para defender la verdad.",
    spiritualMessage: "El 05:05 anuncia que los vientos del cambio están soplando con fuerza a tu favor. Esta sincronicidad es un catalizador que te impulsa a romper la monotonía y abandonar la zona de confort. Aunque las transiciones puedan despertar vértigo, el cosmos te está desprendiendo de moldes viejos para abrirte a experiencias expansivas: viajes, nuevos aprendizajes, cambios profesionales o renovaciones vitales que oxigenarán tu alma.",
    numerology: "Número 10 → 1 (5+5): El 5 simboliza los cinco sentidos y el libre albedrío. Su suma (10) encarna la culminación de una rueda de aprendizaje para renacer en la unidad del 1.",
    tarotCard: "El Papa / El Hierofante (Arcano V)",
    tarotMeaning: "El gran maestro espiritual y puente entre el cielo y la tierra. Invita a buscar enseñanzas elevadas, mantener la ética y conectar con la sabiduría tradicional.",
    affirmation: "Abrazo el cambio como una bendición de crecimiento. Suelto el miedo a lo desconocido y me abro a la aventura de vivir plenamente.",
    advice: "Acepta las invitaciones y giros inesperados con curiosidad y entusiasmo. Todo lo que hoy se mueve en tu vida está conspirando para tu mayor evolución."
  },

  "06:06": {
    time: "06:06",
    type: "mirror",
    title: "La Elección del Corazón y la Armonía",
    angelName: "Leuviah",
    angelMeaning: "Ángel de la serenidad interior, la memoria sagrada del alma y la victoria sobre la melancolía.",
    spiritualMessage: "El 06:06 se manifiesta ante ti para recordarte que el amor más urgente y sagrado es el que te debes a ti mismo. Si te hallas ante una encrucijada moral, sentimental o vital, esta hora te insta a elegir desde la paz y la coherencia interior, y jamás desde la necesidad de complacer a terceros o el temor a la soledad. La armonía que anhelas en el exterior florecerá en la misma medida en que honres tu propia dignidad.",
    numerology: "Número 12 → 3 (6+6): El 12 representa las doce pruebas del alma y los signos del zodiaco, que reducidos al 3 simbolizan la síntesis creadora tras resolver la prueba de la elección.",
    tarotCard: "El Enamorado (Arcano VI)",
    tarotMeaning: "Arquetipo de la decisión consciente, la alineación con los verdaderos valores del alma y la belleza sagrada de los lazos afectivos honestos.",
    affirmation: "Elijo siempre desde el amor propio y la paz mental. Honro mis sentimientos y camino en perfecta coherencia con mi verdad.",
    advice: "Haz un balance de tus relaciones afectivas. Pregúntate si estás dando más de lo que recibes y reequilibra la balanza con afecto y asertividad."
  },

  "07:07": {
    time: "07:07",
    type: "mirror",
    title: "El Despertar Místico y la Sabiduría",
    angelName: "Yeiayel",
    angelMeaning: "Ángel de la protección en los viajes del cuerpo y del espíritu, la buena fortuna y el renombre bien merecido.",
    spiritualMessage: "El 07:07 es una de las horas espejo de mayor calibre místico y esotérico. Verla repetidamente es una confirmación cósmica de que tu despertar espiritual está acelerándose y tus esfuerzos están en perfecta sintonía con las leyes universales. Se aproximan revelaciones profundas, momentos 'eureka' y sincronicidades que confirmarán tus sospechas intuitivas. Estás siendo guiado hacia un nivel superior de conciencia.",
    numerology: "Número 14 → 5 (7+7): El 7 es el número sagrado de la introspección y el misticismo; duplicado da 14 (la alquimia templada) que reduce al 5 (el ser humano conectado con el cosmos).",
    tarotCard: "El Carro (Arcano VII)",
    tarotMeaning: "Representa el triunfo indiscutible de la mente y el espíritu sobre los instintos, el avance imparable y el autodominio victorioso del destino.",
    affirmation: "Mi mente está abierta a la luz de la verdad cósmica. Conduzco mi vida con certeza, sabiduría y respaldo espiritual.",
    advice: "Dedica tiempo al estudio esotérico, la meditación o la lectura profunda. Confía plenamente en tus corazonadas; tu canal intuitivo está extraordinariamente afinado."
  },

  "08:08": {
    time: "08:08",
    type: "mirror",
    title: "La Justicia Kármica y la Abundancia",
    angelName: "Nith-Haiah",
    angelMeaning: "Ángel de la sabiduría de los misterios esotéricos, la paz profunda y el dominio de las fuerzas espirituales.",
    spiritualMessage: "El 08:08 te recuerda la infalibilidad de la Ley de Causa y Efecto. Todo pensamiento, palabra y acto de integridad que has sembrado con paciencia en el pasado está madurando para entregarte su justa cosecha. Si has sufrido injusticias o malentendidos, el universo intervendrá para equilibrar la balanza. Asimismo, te advierte que mantengas la máxima transparencia y rectitud en tus finanzas y acuerdos profesionales.",
    numerology: "Número 16 → 7 (8+8): El 8 duplicado forma el 16 (la caída de lo falso), que al reducirse al 7 revela la victoria de la verdad y el conocimiento espiritual auténtico.",
    tarotCard: "La Justicia (Arcano VIII)",
    tarotMeaning: "Símbolo de la espada del discernimiento y la balanza del equilibrio perfecto. Dictamina resoluciones justas, honestidad y acuerdos que llegan a buen puerto.",
    affirmation: "Confío en la perfecta justicia del universo. Cosecho con gratitud y serenidad los frutos de mi integridad y trabajo constante.",
    advice: "Revisa tus asuntos legales, administrativos o financieros. Actúa con honestidad intachable y permite que la justicia cósmica se encargue de lo que escapa a tu control."
  },

  "09:09": {
    time: "09:09",
    type: "mirror",
    title: "La Culminación y la Luz Interior",
    angelName: "Seheiah",
    angelMeaning: "Ángel de la longevidad, la protección contra la adversidad y la prudencia iluminada.",
    spiritualMessage: "El 09:09 es un llamado solemne a la culminación consciente de etapas. Hay ciclos, amistades, proyectos o apegos emocionales que ya han cumplido su función en tu viaje evolutivo y deben ser despedidos con gratitud y reverencia. Tu luz interior es lo suficientemente sabia y poderosa como para guiarte en medio de la niebla. Conéctate con la compasión universal y comparte tu sabiduría con quienes necesitan orientación.",
    numerology: "Número 18 → 9 (9+9): El 9 es el número de la maestría humanitaria y el fin de los números simples; duplicado da 18 (el reino del subconsciente) y se reintegra en el 9 de la madurez absoluta.",
    tarotCard: "El Ermitaño (Arcano IX)",
    tarotMeaning: "El sabio peregrino que camina en la noche con su linterna y su báculo, buscando la verdad esencial sin dejarse encandilar por las apariencias del mundo.",
    affirmation: "Agradezco y despido los ciclos concluidos. Mi linterna interior ilumina mi sendero con claridad, paz y desapego sagrado.",
    advice: "Regálate momentos de silencio y soledad nutricia. No temas cerrar capítulos con elegancia; lo que concluye hoy abre las puertas a bendiciones de mayor calibre."
  },

  "10:10": {
    time: "10:10",
    type: "mirror",
    title: "El Giro del Destino y las Oportunidades",
    angelName: "Lecabel",
    angelMeaning: "Ángel de la claridad mental, el ingenio estratégico, la resolución de dilemas complejos y el éxito profesional.",
    spiritualMessage: "El 10:10 es una señal de aceleración kármica. La Rueda del Destino comienza a girar con vigor hacia una fase de expansión, desbloqueo y oportunidades imprevistas. Si has sentido que tu vida estaba en pausa, prepárate: asuntos laborales, mudanzas o nuevas ilusiones sentimentales tomarán un dinamismo vertiginoso. El universo te pide que mantengas tu mente ágil, flexible y receptiva a los giros afortunados.",
    numerology: "Número 20 → 2 (10+10): El 10 duplicado engendra el 20 (el renacer del Juicio), que reduce al 2 de la receptividad y la alianza armoniosa con el fluir de la existencia.",
    tarotCard: "La Rueda de la Fortuna (Arcano X)",
    tarotMeaning: "Simboliza los ciclos universales, la evolución inevitable de las circunstancias y la capacidad de surfear las olas del cambio sin perder el centro.",
    affirmation: "Acepto los giros favorables que la vida me presenta. Fluyo con los ciclos cósmicos y aprovecho cada oportunidad con entusiasmo.",
    advice: "Permanece atento a llamadas, propuestas y coincidencias durante los próximos días. Atrévete a dar el 'sí' a nuevas posibilidades que rompan tu rutina."
  },

  "11:11": {
    time: "11:11",
    type: "mirror",
    title: "El Portal Cósmico de la Manifestación",
    angelName: "Lehahiah",
    angelMeaning: "Ángel de la paz sublime, la serenidad inalterable, el orden divino y la lealtad cósmica.",
    spiritualMessage: "El 11:11 es el código de sincronicidad universal por excelencia, un faro de activación estelar que resuena en la memoria del alma. Cuando tus ojos se cruzan con este cuarteto de unos, se abre un portal de alineación directa entre tus pensamientos y la creación de tu realidad. Los guías te transmiten: 'Tus pensamientos son semillas de manifestación instantánea; mantén tu mente enfocada únicamente en lo que deseas atraer'. Es un recordatorio de tu naturaleza multidimensional y de que estás en el lugar y momento correctos.",
    numerology: "Número Maestro 11 y 22 (1+1+1+1=4): La duplicación del Número Maestro 11 engendra el Maestro 22, la vibración del Gran Arquitecto que plasma las visiones espirituales en sólidas realidades físicas (4).",
    tarotCard: "La Fuerza (Arcano XI)",
    tarotMeaning: "El autodominio amoroso del espíritu sobre la materia, la doma del león interior mediante la dulzura del alma y la confianza inquebrantable en el poder divino.",
    affirmation: "Mis pensamientos crean milagros. Estoy en perfecta sincronía con el universo y manifiesto mi más alta verdad con amor y certeza.",
    advice: "Detén lo que estés haciendo en cuanto veas esta hora. Cierra los ojos, respira hondo, visualiza tu mayor anhelo como si ya fuera una realidad y agradece de corazón por su manifestación."
  },

  "12:12": {
    time: "12:12",
    type: "mirror",
    title: "La Claridad y la Renovación Espiritual",
    angelName: "Aniel",
    angelMeaning: "Ángel de la victoria sobre las ataduras kármicas, la inspiración divina y la ruptura de patrones mentales limitantes.",
    spiritualMessage: "El 12:12 te asegura que cualquier pausa o aparente retraso en tu vida no es un castigo, sino una preparación sagrada. Estás accediendo a un cambio radical de perspectiva que te permitirá comprender el porqué de situaciones del pasado que te dolían. Al liberarte de la necesidad de controlarlo todo y adoptar una mirada más elevada, la solución a tus encrucijadas aparecerá con una nitidez asombrosa.",
    numerology: "Número 24 → 6 (12+12): El 24 representa la armonización de las 24 horas del día cósmico, reduciéndose al 6 de la belleza, la reconciliación familiar y la paz del espíritu.",
    tarotCard: "El Colgado (Arcano XII)",
    tarotMeaning: "El iniciado que contempla el mundo al revés con una aureola de iluminación. Simboliza la entrega consciente, la paciencia fértil y el desapego transformador.",
    affirmation: "Miro mi vida con ojos renovados. Renuncio al control egoico y permito que la sabiduría divina ordene todas mis circunstancias.",
    advice: "Cambia de rutina o busca un momento para meditar. No intentes forzar desenlaces apresurados; la claridad madurará por sí misma en el momento exacto."
  },

  "13:13": {
    time: "13:13",
    type: "mirror",
    title: "La Metamorfosis y el Renacer",
    angelName: "Yeiazel",
    angelMeaning: "Ángel del consuelo profundo, la liberación de la aflicción emocional y la renovación de las fuerzas vitales.",
    spiritualMessage: "El 13:13 es la llamada a una metamorfosis sagrada. Al igual que la oruga debe disolverse para convertirse en mariposa, ciertas ideas preconcebidas, miedos ancestrales o roles que asumías por complacer a otros están muriendo. El universo está limpiando el terreno de tu vida con bisturí de luz para que pueda nacer una versión tuya infinitamente más libre, sabia, madura y empoderada.",
    numerology: "Número 26 → 8 (13+13): El 13 es el número de la alquimia; duplicado da 26 (el valor numérico del Nombre Sagrado en la Cábala) y reduce al 8 del equilibrio y la fuerza material.",
    tarotCard: "La Muerte / Arcano Sin Nombre (Arcano XIII)",
    tarotMeaning: "La guadaña que corta lo marchito para dejar el suelo limpio y fértil. Simboliza el renacimiento inevitable, la purificación del alma y la regeneración radical.",
    affirmation: "Suelto con gratitud lo que ha cumplido su ciclo. Abrazo mi transformación y florezco en mi versión más auténtica y poderosa.",
    advice: "Limpia tus armarios, deshazte de objetos que ya no usas y despídete de hábitos nocivos. Abrir espacio físico y mental acelera tu renacimiento."
  },

  "14:14": {
    time: "14:14",
    type: "mirror",
    title: "La Alquimia, el Equilibrio y la Templanza",
    angelName: "Veuliah",
    angelMeaning: "Ángel de la prosperidad fecunda, la liberación interior y la victoria pacífica sobre las contradicciones.",
    spiritualMessage: "El 14:14 es un bálsamo de sanación y templanza que el cosmos derrama sobre tu centro emocional. Esta hora te aconseja serenar los impulsos, evitar la polarización en discusiones y buscar el punto medio en todas las cosas. Cuando viertes paciencia en tu copa y mezclas tus emociones con serenidad, las aguas internas se calman y la salud, la paz y el entendimiento con los demás florecen espontáneamente.",
    numerology: "Número 28 → 1 (14+14): El 28 (los ciclos de la luna y la regeneración) reduce al 1 de los nuevos comienzos fundamentados en la maestría del autocontrol.",
    tarotCard: "La Templanza (Arcano XIV)",
    tarotMeaning: "El ángel solar que transvasa el agua de una jarra a otra en flujo continuo. Representa la alquimia interior, la armonía de los opuestos y la sanación espiritual.",
    affirmation: "Soy un templo de calma y armonía. Mis emociones fluyen en perfecta paz, restaurando mi bienestar y serenidad.",
    advice: "Bebe un vaso de agua con intención consciente, practica respiraciones profundas y evita reaccionar al instante ante situaciones irritantes. Tu serenidad es tu mayor victoria."
  },

  "15:15": {
    time: "15:15",
    type: "mirror",
    title: "El Magnetismo y el Deseo Apasionado",
    angelName: "Ariel",
    angelMeaning: "Ángel de las visiones reveladoras, los descubrimientos luminosos y la custodia de la abundancia de la madre tierra.",
    spiritualMessage: "El 15:15 enciende tu magnetismo personal, tu carisma y la pasión en el ámbito sentimental y creativo. Atraerás miradas y oportunidades con una facilidad asombrosa. Sin embargo, esta sincronicidad también encierra una sabia advertencia: vigila que la pasión no degenere en apego, obsesión o necesidad de validación externa. Canaliza tu inmenso magnetismo para construir y no para encadenarte a tentaciones efímeras.",
    numerology: "Número 30 → 3 (15+15): El 15 duplicado engendra el 30, reduciéndose al 3 de la fertilidad creadora, el entusiasmo y la alegría comunicativa.",
    tarotCard: "El Diablo (Arcano XV)",
    tarotMeaning: "La fuerza primordial del fuego instintivo, el poder terrenal y la prueba iniciática de dominar las propias cadenas inconscientes para alcanzar la verdadera libertad.",
    affirmation: "Canalizo mi pasión y magnetismo con sabiduría. Disfruto de la vida con alegría mientras mantengo mi espíritu libre de ataduras.",
    advice: "Disfruta de tus placeres y del romance, pero mantén la lucidez y la soberanía sobre tus decisiones. No te comprometas con nada que comprometa tu paz espiritual."
  },

  "16:16": {
    time: "16:16",
    type: "mirror",
    title: "La Liberación de Ilusiones y la Verdad",
    angelName: "Menadel",
    angelMeaning: "Ángel del trabajo liberador, la reconexión con la verdad esencial y la superación del orgullo y las falsas seguridades.",
    spiritualMessage: "El 16:16 es una sacudida de verdad que el universo te envía cuando estás sosteniendo estructuras, empleos, expectativas o relaciones que ya no tienen sustento real. Si un plan se frustra o una ilusión se desmorona, no lo interpretes como un castigo, sino como un rescate divino: la vida está demoliendo lo postizo para que puedas construir sobre roca firme y con total autenticidad.",
    numerology: "Número 32 → 5 (16+16): Los 32 senderos de la sabiduría de la Cábala reducidos al 5 de la libertad conquistada tras superar el apego a las formas rígidas.",
    tarotCard: "La Torre (Arcano XVI)",
    tarotMeaning: "El rayo de luz divina que desmorona la torre del ego y las falsas creencias, abriendo paso a la liberación del alma y a la entrada del aire fresco.",
    affirmation: "Agradezco la verdad que me libera de toda ilusión. Reconstruyo mi camino sobre cimientos sagrados de honestidad y fortaleza.",
    advice: "No gastes energía en apuntalar situaciones insostenibles. Acepta los cambios imprevistos con humildad y prepárate para edificar una vida mucho más auténtica."
  },

  "17:17": {
    time: "17:17",
    type: "mirror",
    title: "La Esperanza, la Suerte y la Estrella Guía",
    angelName: "Vehuel",
    angelMeaning: "Ángel de la elevación del alma, la nobleza del corazón, la generosidad y la inspiración artística luminosa.",
    spiritualMessage: "El 17:17 es una de las mayores caricias cósmicas. Representa la luz de la Estrella que brilla en la noche más oscura, asegurándote que tus proyectos más nobles y sinceros cuentan con la bendición directa del universo. La suerte te acompaña en tus empeños, la inspiración artística o intelectual fluirá con gracia y tus relaciones se llenarán de ternura. Es tiempo de sembrar con esperanza porque la tierra de tu vida es fértil.",
    numerology: "Número 34 → 7 (17+17): La suma de los dos diecisietes produce 34, que al reducirse al 7 místico confirma el triunfo de la sabiduría y la alineación espiritual.",
    tarotCard: "La Estrella (Arcano XVII)",
    tarotMeaning: "La doncella que derrama agua cristalina en la tierra y el arroyo bajo siete estrellas. Simboliza la fe incondicional, la belleza, la generosidad y la bendición celestial.",
    affirmation: "Estoy protegido y guiado por mi estrella divina. Mis sueños florecen en armonía con el universo y mi futuro está colmado de bendiciones.",
    advice: "Mantén una actitud generosa y optimista. Da gracias por adelantado por los milagros cotidianos y no dudes en compartir tus dones con quienes te rodean."
  },

  "18:18": {
    time: "18:18",
    type: "mirror",
    title: "La Magia Lunar y los Misterios del Subconsciente",
    angelName: "Daniel",
    angelMeaning: "Ángel de la elocuencia reconfortante, el consuelo en la tristeza y la capacidad de discernir entre la ilusión y la verdad.",
    spiritualMessage: "El 18:18 señala que tu mundo subconsciente, tus sueños nocturnos y tu sensibilidad intuitiva están en un punto de máxima efervescencia. Sin embargo, también advierte sobre el peligro de proyectar temores imaginarios o dejarse envolver por la nostalgia. Es momento de iluminar tus miedos profundos con la linterna de la conciencia y distinguir entre un presentimiento real y una mera aprensión del ego.",
    numerology: "Número 36 → 9 (18+18): El 18 duplicado da 36 (los 36 justos que sostienen el mundo), que reduce al 9 de la compasión universal y el cierre de viejas heridas emocionales.",
    tarotCard: "La Luna (Arcano XVIII)",
    tarotMeaning: "El misterio de las aguas profundas, los ciclos selenitas, el despertar de los dones psíquicos y la prueba de atravesar la noche oscura hacia el amanecer.",
    affirmation: "Abrazo mi sensibilidad con amor y disipo las sombras del miedo con la luz de mi confianza interior.",
    advice: "Anota tus sueños en una libreta nada más despertar y evita tomar decisiones trascendentales si te sientes emocionalmente vulnerable o confuso."
  },

  "19:19": {
    time: "19:19",
    type: "mirror",
    title: "La Luz Solar, el Éxito y la Claridad",
    angelName: "Yeialel",
    angelMeaning: "Ángel de la fuerza mental inquebrantable, la sanación de dolencias y la victoria radiante sobre la tristeza.",
    spiritualMessage: "El 19:19 es el resplandor del mediodía en tu vida. Todo aquello que estuvo oculto en la incertidumbre recibe ahora la luz cálida de la verdad y el éxito. Se avecinan celebraciones, reconocimientos profesionales, vitalidad física desbordante y momentos de profunda armonía fraterna con tus seres queridos. Los ángeles te invitan a disfrutar de este periodo de dicha y compartir tu calor humano con el mundo.",
    numerology: "Número 38 → 11 → 2 (19+19): El 38 se eleva al Número Maestro 11 de la intuición inspiradora, que resuelve en el 2 de la unión fraternal y el amor compartido.",
    tarotCard: "El Sol (Arcano XIX)",
    tarotMeaning: "La gloria del astro rey bendiciendo a dos niños que bailan en armonía. Representa la felicidad pura, la claridad mental, el éxito y la fraternidad universal.",
    affirmation: "Irradio luz, vitalidad y éxito en cada paso. Agradezco la calidez, la alegría y la abundancia que colman mi existencia.",
    advice: "Sal a la naturaleza, toma un baño de sol consciente y celebra tus victorias con las personas que amas. Tu entusiasmo es contagioso."
  },

  "20:20": {
    time: "20:20",
    type: "mirror",
    title: "El Llamado del Juicio y la Revelación",
    angelName: "Umabel",
    angelMeaning: "Ángel de las afinidades sinceras del alma, la astronomía sagrada y el entendimiento de las leyes cósmicas.",
    spiritualMessage: "El 20:20 anuncia que un llamado de despertar o una revelación crucial está a punto de manifestarse. Algo que esperabas desde hace tiempo encuentra su resolución definitiva o recibirás una noticia que cambiará favorablemente tu perspectiva de futuro. Se te concede una segunda oportunidad para renacer con mayor madurez y alinearte sin excusas con tu verdadera vocación de vida.",
    numerology: "Número 40 → 4 (20+20): El 40 (número bíblico de la purificación y la preparación interior) se asienta en el 4 de la estabilidad sólida y el orden restablecido.",
    tarotCard: "El Juicio (Arcano XX)",
    tarotMeaning: "El ángel trompetero que despierta a las almas de sus tumbas. Simboliza la redención, el despertar de la vocación superior y la liberación de viejos juicios y culpas.",
    affirmation: "Escucho el llamado sagrado de mi vocación. Me desprendo de la culpa y renazco a una vida de plenitud y servicio.",
    advice: "Mantente abierto a noticias, mensajes y reencuentros. Perdona los errores del pasado y asume con valentía esta nueva oportunidad que la vida te entrega."
  },

  "21:21": {
    time: "21:21",
    type: "mirror",
    title: "La Realización Total y la Corona del Éxito",
    angelName: "Damabiah",
    angelMeaning: "Ángel del manantial inagotable de sabiduría, la protección benevolente y el éxito en empresas trascendentes.",
    spiritualMessage: "El 21:21 es el presagio de la victoria completa y la coronación de tus esfuerzos. Has recorrido un largo camino de aprendizajes y pruebas; ahora el universo te abre las puertas a la realización suprema. Esta sincronicidad suele anticipar éxitos profesionales rotundos, reconocimiento público, viajes lejanos enriquecedores o la consolidación plena de un proyecto vital que dejará huella.",
    numerology: "Número 42 → 6 (21+21): El 42 representa la consagración de la obra, que reduce al 6 del amor universal, la armonía plena y la paz consumada.",
    tarotCard: "El Mundo (Arcano XXI)",
    tarotMeaning: "La danzante cósmica rodeada por la corona de laurel y los cuatro vivientes. Representa la totalidad integrada, la victoria sobre la materia y la celebración dichosa de existir.",
    affirmation: "Soy uno con la abundancia y la perfección del cosmos. Celebro mis logros con profunda humildad, alegría y gratitud.",
    advice: "Celebra tus triunfos, da gracias a quienes te apoyaron en el camino y prepárate para disfrutar de la recompensa a tu perseverancia."
  },

  "22:22": {
    time: "22:22",
    type: "mirror",
    title: "El Gran Constructor y la Misión Maestra",
    angelName: "Habuhiah",
    angelMeaning: "Ángel de la fecundidad suprema, la sanación física y espiritual, y la abundancia desbordante de las cosechas.",
    spiritualMessage: "El 22:22 porta la doble potencia del Número Maestro 22, la vibración del Gran Arquitecto del Cosmos. Esta sincronicidad es un llamado a elevar tus miras: tus dones no son solo para ti, sino para edificar obras, empresas, ideas o comunidades que beneficien a muchas personas. El universo te confirma que tus mayores esfuerzos están siendo respaldados con una fuerza titánica y tu perseverancia cambiará realidades.",
    numerology: "Número Maestro 22 y 44 → 8 (22+22): El 44 es el número maestro de la estructura planetaria, que reduce al 8 del poder infinito de manifestación material y espiritual.",
    tarotCard: "El Loco y El Mundo (La Totalidad)",
    tarotMeaning: "La integración perfecta entre la libertad infinita del espíritu (El Loco) y la manifestación perfecta en la Tierra (El Mundo).",
    affirmation: "Tengo el poder y la sabiduría para manifestar grandes obras. Mi perseverancia deja una huella imborrable de bien en el mundo.",
    advice: "No te desanimes por la magnitud de tus metas. Trabaja con constancia día a día; estás construyendo algo monumental y trascendente."
  },

  "23:23": {
    time: "23:23",
    type: "mirror",
    title: "El Mensajero Alado y el Apoyo Cósmico",
    angelName: "Haiaiel",
    angelMeaning: "Ángel de la armadura espiritual invencible, la liberación de opresiones y el coraje frente a la noche.",
    spiritualMessage: "El 23:23 te asegura que jamás caminas en soledad. Tus protectores espirituales y tus ancestros custodian tus espaldas con una armadura de luz invulnerable. Si has sentido temor a ser juzgado o incomprendido, este es el momento de alzar la voz con firmeza y defender tus ideales con nobleza. Una comunicación o mensaje revelador llegará para abrirte un nuevo sendero de avance.",
    numerology: "Número 46 → 10 → 1 (23+23): El 23 es el número de la comunicación y el viaje; duplicado forma el 46, reduciendo al 1 de un nuevo liderazgo heroico y protegido.",
    tarotCard: "El Rey de Bastos / El Caballero de la Luz",
    tarotMeaning: "La energía del fuego creador, la lealtad incondicional, la valentía para emprender batallas justas y la protección constante.",
    affirmation: "Camino con valor invencible y confianza plena. Mis guías espirituales resguardan cada uno de mis pasos y decisiones.",
    advice: "Di lo que sientes con asertividad y amor. No temas a los desafíos; tienes la fuerza y el respaldo cósmico para salir victorioso de cualquier trance."
  },

  // =========================================================================
  // 🔢 SECUENCIAS PROGRESIVAS Y ESCALERAS CÓSMICAS
  // =========================================================================

  "12:34": {
    time: "12:34",
    type: "sequential",
    title: "La Escalera del Destino y el Avance Continuo",
    angelName: "Mebahiah",
    angelMeaning: "Ángel de la lucidez moral, el cumplimiento de los pasos sagrados y la edificación serena.",
    spiritualMessage: "La secuencia 1-2-3-4 es la firma cósmica de la progresión ordenada e imparable. Si miras el reloj exactamente a las 12:34, el universo te envía una confirmación contundente: cada paso que estás dando en tu vida está encajando con precisión en un plan evolutivo superior. Es un mensaje de consuelo y ánimo ante la impaciencia; estás subiendo los peldaños correctos. No intentes saltarte etapas ni busques atajos artificiales: la progresión gradual en la que te encuentras es la garantía de que tu victoria será sólida y duradera.",
    numerology: "Suma teosófica 1+2+3+4 = 10 → 1: La integración de los cuatro elementos fundamentales de la creación que culmina en la Rueda de la Fortuna (10) y renace en el liderazgo triunfal del 1.",
    tarotCard: "El Carro y La Rueda de la Fortuna",
    tarotMeaning: "El avance victorioso que se apoya en los ciclos favorables del destino para conquistar metas elevadas.",
    affirmation: "Cada paso que doy me acerca con firmeza a mis mayores sueños. Confío plenamente en el orden y ritmo perfecto de mi camino.",
    advice: "Mantén tu ritmo constante sin desfallecer. Celebra los pequeños avances diarios y ten fe en que la constancia superará cualquier obstáculo."
  },

  "01:23": {
    time: "01:23",
    type: "sequential",
    title: "El Inicio de la Escalera y la Primera Huella",
    angelName: "Elemiah",
    angelMeaning: "Ángel del coraje pionero, la iniciativa luminosa y el inicio de empresas prósperas.",
    spiritualMessage: "El 01:23 es el pistoletazo de salida del cosmos para tus proyectos dormidos. Simboliza los tres primeros pasos de toda creación: la chispa de la idea (1), la gestación reflexiva (2) y la primera manifestación visible (3). Si has estado dudando sobre si iniciar una formación, emprender un negocio o abrir tu corazón a una nueva etapa afectiva, esta sincronicidad es la luz verde que estabas esperando.",
    numerology: "Suma 0+1+2+3 = 6: La trinidad del avance ordenado que florece en el 6 de la belleza, la armonía hogareña y el bienestar integral.",
    tarotCard: "El Mago y La Emperatriz",
    tarotMeaning: "La alianza sagrada entre el poder de iniciativa y la fertilidad creadora que asegura un inicio venturoso.",
    affirmation: "Doy el primer paso con valentía y alegría. El universo bendice mis comienzos con entusiasmo y prosperidad.",
    advice: "No esperes a que todas las condiciones sean ideales para actuar. Da hoy el primer paso concreto; el camino se irá abriendo a medida que avances."
  },

  "02:34": {
    time: "02:34",
    type: "sequential",
    title: "La Consolidación del Crecimiento Sólido",
    angelName: "Achaiah",
    angelMeaning: "Ángel de la paciencia activa y las semillas que germinan con raíces profundas.",
    spiritualMessage: "El 02:34 marca la transición sagrada entre la concepción de un plan y su consolidación en la materia. Has superado las dudas iniciales y ahora entras en una fase de estabilización y crecimiento seguro. El cosmos te pide que no aflojes el esfuerzo y sigas puliendo tus talentos con mimo y dedicación; los frutos de tu constancia están madurando.",
    numerology: "Suma 0+2+3+4 = 9: El número de la madurez, la maestría humanitaria y la sabiduría que corona las obras bien estructuradas.",
    tarotCard: "La Papisa y El Emperador",
    tarotMeaning: "La unión de la intuición profunda con la estructura pragmática para consolidar un éxito estable.",
    affirmation: "Mis esfuerzos maduran con solidez y propósito. Avanzo con paciencia y paso firme hacia mi realización.",
    advice: "Cuida los aspectos administrativos y prácticos de tu vida. La combinación de orden y calma garantizará tu crecimiento."
  },

  "03:45": {
    time: "03:45",
    type: "sequential",
    title: "El Salto Cuántico de la Creatividad",
    angelName: "Aladiah",
    angelMeaning: "Ángel de la gracia divina, el perdón regenerador y el desbloqueo de dones ocultos.",
    spiritualMessage: "El 03:45 es un potente catalizador de expansión y desbloqueo. Esta sincronicidad te muestra que la creatividad (3), la disciplina (4) y la capacidad de transformación (5) se han armonizado en tu interior para producir un salto cualitativo. Estás a punto de superar barreras mentales que antes te frenaban y alcanzar un nivel superior de libertad y autoexpresión.",
    numerology: "Suma 0+3+4+5 = 12 → 3: La rueda alquímica de la superación que renace en el 3 de la alegría creadora y la elocuencia.",
    tarotCard: "La Emperatriz y El Papa",
    tarotMeaning: "La creatividad fecunda guiada por la sabiduría ética y la enseñanza espiritual elevada.",
    affirmation: "Rompo viejos límites con creatividad y confianza. Mi potencial se expande hacia nuevos horizontes de luz.",
    advice: "Atrévete a innovar en tu entorno laboral o personal. Propón ideas audaces y comparte tus visiones con seguridad."
  },

  "04:56": {
    time: "04:56",
    type: "sequential",
    title: "La Cosecha de la Maestría y la Plenitud",
    angelName: "Yezalel",
    angelMeaning: "Ángel de la fidelidad a la obra, la concordia conyugal y la consumación armoniosa.",
    spiritualMessage: "El 04:56 es una secuencia de muy alta frecuencia que anticipa la llegada de una etapa de armonía plena, reconocimiento y estabilidad duradera tras haber superado una prueba de perseverancia. La estructura firme que has construido (4), tu flexibilidad ante los cambios (5) y el amor puesto en cada detalle (6) dan como fruto una serenidad inquebrantable.",
    numerology: "Suma 0+4+5+6 = 15 → 6: La transmutación del esfuerzo terrenal en belleza, equilibrio familiar y amor incondicional.",
    tarotCard: "El Emperador y El Enamorado",
    tarotMeaning: "La autoridad bien ejercida que protege los vínculos sagrados del corazón y celebra la belleza del hogar.",
    affirmation: "Cosecho en paz y dicha los frutos de mi constancia. Mi vida se colma de estabilidad, amor y belleza.",
    advice: "Agradece por cada logro y dedica tiempo de calidad a disfrutar del bienestar que has edificado junto a tus seres queridos."
  },

  // =========================================================================
  // 👑 HORAS MAESTRAS COMPUESTAS (11:XX & 22:XX)
  // =========================================================================

  "11:22": {
    time: "11:22",
    type: "master",
    title: "El Puente Sagrado de los Grandes Maestros",
    angelName: "Lehahiah y Habuhiah",
    angelMeaning: "Unión cósmica entre la Paz Sublime (11) y la Gran Manifestación Fecunda (22).",
    spiritualMessage: "El 11:22 es una de las configuraciones numéricas más elevadas y poderosas del esoterismo. Conecta directamente el Número Maestro 11 (la alta intuición espiritual, la visión del alma y la canalización divina) con el Número Maestro 22 (el Gran Arquitecto y la capacidad de plasmar obras monumentales en la Tierra). Ver las 11:22 significa que el universo te está entregando la sabiduría para convertir una visión espiritual o un ideal altruista en una realidad física, tangible y transformadora para tu vida y tu comunidad.",
    numerology: "Doble Número Maestro (11 + 22 = 33 / Suma 6): La suma de los dos maestros engendra el 33, el Maestro Avatar del Amor Incondicional y Servicio Sagrado, que reduce al 6 de la armonía universal.",
    tarotCard: "La Fuerza y El Mundo",
    tarotMeaning: "El espíritu que domina sutilmente la materia para coronar una obra de realización universal.",
    affirmation: "Soy un canal sagrado entre el cielo y la tierra. Tengo la visión intuitiva y el poder material para manifestar obras luminosas.",
    advice: "Baja tus visiones a tierra: redacta el plan de acción, contacta con personas clave y comienza a asentar los cimientos de tu gran proyecto."
  },

  "11:33": {
    time: "11:33",
    type: "master",
    title: "La Visión Iluminada y el Amor Trascendente",
    angelName: "Lehahiah y Lauviah",
    angelMeaning: "Unión de la Inspiración Divina (11) y la Misericordia de los Maestros Ascendidos (33).",
    spiritualMessage: "El 11:33 combina la intuición pionera del Maestro 11 con la compasión, la sanación y la sabiduría trascendente del Maestro 33. Es un llamado directo a sanar y guiar a través de tus palabras, tu arte, tus consejos o tu mera presencia. Si ves esta hora, estás siendo convocado a convertirte en un faro de esperanza para quienes te rodean, ejerciendo un liderazgo compasivo y elevando la vibración del entorno.",
    numerology: "Maestro 11 + 33 = 44 → 8: La unión de la visión y la compasión engendra el Maestro 44, el poder de sanación colectiva y justicia espiritual universal.",
    tarotCard: "La Fuerza y La Estrella",
    tarotMeaning: "La fe inquebrantable que derrama bendición, consuelo y guía en los corazones heridos.",
    affirmation: "Mi corazón irradia amor compasivo y verdad. Mi presencia es un remanso de paz y luz para quienes me rodean.",
    advice: "Practica la escucha atenta y la empatía desinteresada. Un gesto de afecto tuyo hoy puede cambiar el rumbo del día de otra persona."
  },

  "11:44": {
    time: "11:44",
    type: "master",
    title: "La Fortaleza Espiritual y la Protección Inquebrantable",
    angelName: "Lehahiah y Yezalel",
    angelMeaning: "La Iluminación Cósmica respaldada por una Legión de Ángeles Guardianes.",
    spiritualMessage: "El 11:44 fusiona la visión espiritual del 11 con la indestructible armadura material y angélica del 44. Es un mensaje de máxima seguridad cósmica: ante cualquier incertidumbre, conflicto o cambio drástico, tus guías y maestros han levantado una muralla impenetrable de protección a tu alrededor. Tus propósitos están resguardados por la providencia divina; avanza sin vacilar.",
    numerology: "Maestro 11 + 44 = 55 → 10 → 1: La vibración de la gran victoria evolutiva que abre paso a un nuevo inicio invulnerable.",
    tarotCard: "La Fuerza y El Emperador",
    tarotMeaning: "El poder del espíritu aliado con la autoridad terrenal para garantizar una victoria absoluta.",
    affirmation: "Estoy resguardado por la luz invencible del cosmos. Ningún obstáculo puede frenar el avance de mi alma.",
    advice: "Despreocúpate de las amenazas o dudas infundadas. Mantén la cabeza alta, respira con calma y actúa con firmeza."
  },

  "11:55": {
    time: "11:55",
    type: "master",
    title: "La Metamorfosis Maestra y la Gran Liberación",
    angelName: "Lehahiah y Hekamiah",
    angelMeaning: "La Iluminación que rompe definitivamente con las ataduras del pasado.",
    spiritualMessage: "El 11:55 es el anuncio de un salto cuántico en tu destino. Combina la iluminación intuitiva del 11 con el poder de transformación radical del 55. Esta hora te avisa de que viejas estructuras que limitaban tu libertad se disolverán rápidamente para dar paso a una etapa de plenitud, autenticidad y soberanía personal nunca antes experimentada.",
    numerology: "Suma 1+1+5+5 = 12 → 3: La superación de las pruebas kármicas que culmina en el florecimiento creativo del 3.",
    tarotCard: "La Fuerza y La Torre Iluminada",
    tarotMeaning: "La ruptura de viejas jaulas para liberar el vuelo del pájaro hacia la luz del sol.",
    affirmation: "Me libero de toda atadura del pasado. Abrazo mi transformación con gozo y camino hacia mi mayor libertad.",
    advice: "No te resistas a las despedidas de personas o situaciones que se desgastan por sí solas. Lo que hoy se retira te devuelve tus alas."
  },

  "22:11": {
    time: "22:11",
    type: "master",
    title: "La Consagración de la Obra y el Retorno de la Maestría",
    angelName: "Habuhiah y Lehahiah",
    angelMeaning: "El Gran Constructor bendecido por la Paz Celestial y el Orden Divino.",
    spiritualMessage: "El 22:11 es el reflejo complementario del 11:22. Si el 11:22 es la visión espiritual que desciende a la materia, el 22:11 es la obra terrenal que asciende a consagrarse espiritualmente. Significa que tus esfuerzos prácticos, tus negocios, estudios o proyectos familiares están alcanzando una categoría de excelencia y están listos para ser bendecidos con longevidad y reconocimiento.",
    numerology: "Maestro 22 + 11 = 33 → 6: La obra concluida que se eleva a servicio de amor incondicional para el mundo.",
    tarotCard: "El Mundo y El Mago",
    tarotMeaning: "La maestría consumada que utiliza todos los recursos del universo con sabiduría e integridad.",
    affirmation: "Consagro mis obras al bien superior. Todo lo que construyo con amor y constancia perdura en el tiempo.",
    advice: "Dedica un momento a contemplar lo que has logrado hasta hoy con gratitud. Estás en un punto de maestría en tu labor."
  },

  "22:33": {
    time: "22:33",
    type: "master",
    title: "La Alianza de los Constructores y Sanadores del Mundo",
    angelName: "Habuhiah y Lauviah",
    angelMeaning: "Fecundidad Material unida a la Gracia Mística y el Servicio Universal.",
    spiritualMessage: "El 22:33 reúne a los dos maestros de mayor impacto humano: el Maestro 22 (el Gran Constructor de estructuras) y el Maestro 33 (el Maestro de la Compasión y el Servicio Sagrado). Esta sincronicidad es un llamado a unir fuerzas con personas de corazón noble para llevar a cabo iniciativas humanitarias, artísticas o comunitarias que eleven la calidad de vida de tu entorno.",
    numerology: "Maestro 22 + 33 = 55 → 10 → 1: La cumbre de la maestría colaborativa que inaugura una nueva era de luz.",
    tarotCard: "El Mundo y La Emperatriz",
    tarotMeaning: "La gran cosecha de la tierra compartida con amor y generosidad hacia todos los seres.",
    affirmation: "Unifico mi fuerza y mi corazón al servicio del bien común. Mi labor genera abundancia, sanación y alegría.",
    advice: "Busca crear alianzas y sinergias con personas afines. El trabajo en equipo con propósitos elevados multiplicará tus resultados por diez."
  },

  "22:44": {
    time: "22:44",
    type: "master",
    title: "El Bastión Cósmico y la Máxima Estabilidad Terrenal",
    angelName: "Habuhiah y Yezalel",
    angelMeaning: "La Inmortalidad de la Obra Bien Hecha y la Consolidación Material Total.",
    spiritualMessage: "El 22:44 es el sello de la solidez inexpugnable. Une el Maestro 22 con el Maestro 44, representando el punto culminante del poder material, la seguridad financiera, el amparo legal y la estabilidad patrimonial. Si has estado lidiando con incertidumbres económicas o familiares, esta hora te garantiza que estás entrando en un periodo de prosperidad blindada.",
    numerology: "Maestro 22 + 44 = 66 → 12 → 3: La doble perfección de la armonía que resuelve en la alegría fecunda.",
    tarotCard: "El Emperador y El Mundo",
    tarotMeaning: "El reino de la abundancia estable y la protección definitiva del patrimonio.",
    affirmation: "Mis cimientos son eternos e inquebrantables. Vivo en un estado de abundancia, orden y seguridad plena.",
    advice: "Asegura tus logros, invierte con prudencia y comparte tu bienestar con generosidad hacia quienes te rodean."
  },

  "22:55": {
    time: "22:55",
    type: "master",
    title: "La Revolución del Orden y la Expansión de Estructuras",
    angelName: "Habuhiah y Hekamiah",
    angelMeaning: "La Evolución Dinámica de las Grandes Obras y la Modernización sin Pérdida de Raíces.",
    spiritualMessage: "El 22:55 te muestra la unión de la firmeza constructora (22) con el dinamismo expansivo (55). Te dice que es hora de actualizar tus viejos modelos de negocio, tus métodos de trabajo o tu manera de relacionarte. No tengas miedo de modernizarte o internacionalizarte: la estructura es fuerte y resistirá con éxito cualquier innovación.",
    numerology: "Maestro 22 + 55 = 77 → 14 → 5: La iluminación espiritual que dinamiza la materia y abre caminos internacionales.",
    tarotCard: "El Mundo y El Carro",
    tarotMeaning: "Expansión global, superación de fronteras y victoria de las ideas vanguardistas.",
    affirmation: "Innovo y expando mis horizontes sobre bases firmes. Abrazo el crecimiento sin perder mis raíces.",
    advice: "Atrévete a incorporar nuevas tecnologías, idiomas o métodos a tus proyectos. La expansión de tus horizontes está asegurada."
  },

  // =========================================================================
  // 🔄 HORAS INVERTIDAS POPULARES
  // =========================================================================

  "01:10": {
    time: "01:10",
    type: "inverted",
    title: "El Espejo Oculto y las Bendiciones Inesperadas",
    angelName: "Aladiah",
    angelMeaning: "Ángel de la gracia divina, la reconciliación y la restitución del honor.",
    spiritualMessage: "El 01:10 refleja que alguien en tu entorno siente un aprecio, respeto o amor silencioso hacia ti que aún no ha manifestado verbalmente. Esta hora invertida te anima a cultivar la amabilidad cotidiana y confiar en que la bondad que irradias regresará multiplicada a tu vida por caminos inesperados.",
    numerology: "Número 2 (1+1+0=2): La vibración de la empatía, la cooperación y el florecimiento de los afectos verdaderos.",
    tarotCard: "El Mago y la Rueda de la Fortuna",
    tarotMeaning: "La capacidad de transformar situaciones cotidianas en oportunidades mágicas de conexión humana.",
    affirmation: "Irradio bondad y recibo con gratitud las bendiciones secretas que el universo prepara para mí.",
    advice: "Presta atención a los gestos sutiles de las personas a tu alrededor y no dudes en tender la mano a quien lo necesite."
  },

  "02:20": {
    time: "02:20",
    type: "inverted",
    title: "Buenas Noticias y Alivio en Camino",
    angelName: "Elemiah",
    angelMeaning: "Ángel de la victoria interior y el fin de los periodos de incertidumbre.",
    spiritualMessage: "El 02:20 es una señal reconfortante del universo para apaciguar tus preocupaciones. Aquellas dudas sobre salud, trámites administrativos, finanzas o proyectos que te tenían en vilo están encontrando un desenlace muy favorable. Las buenas noticias están en camino hacia tu puerta.",
    numerology: "Número 4 (2+2+0=4): Seguridad, cimientos consolidados y disipación de la inestabilidad.",
    tarotCard: "La Papisa y El Emperador",
    tarotMeaning: "La intuición que encuentra una solución práctica y firme en el mundo material.",
    affirmation: "Mi mente está en paz. Recibo con alegría y alivio las buenas noticias que se aproximan a mi vida.",
    advice: "Suelta la ansiedad del control. Respira con calma y prepárate para recibir respuestas positivas."
  },

  "03:30": {
    time: "03:30",
    type: "inverted",
    title: "La Intuición y la Protección de tu Energía",
    angelName: "Sehaliah",
    angelMeaning: "Ángel de la motivación espiritual y el escudo contra influencias densas.",
    spiritualMessage: "El 03:30 es una advertencia amorosa para cuidar tu energía vital. Tu intuición te está avisando de conversaciones, personas o ambientes que drenan tu entusiasmo con quejas, críticas o chismes. No participes en juicios ajenos y preserva tu paz como tu tesoro más preciado.",
    numerology: "Número 6 (3+3+0=6): Restauración de la armonía en el hogar y en el círculo íntimo.",
    tarotCard: "La Emperatriz y La Justicia",
    tarotMeaning: "El discernimiento lúcido para cortar con elegancia lo que desequilibra tu armonía.",
    affirmation: "Protejo mi energía y mi paz interior. Solo doy entrada en mi vida a personas y pensamientos que sumen luz.",
    advice: "Aprende a decir 'no' sin culpa a compromisos que no resuenan contigo y mantén un aura de serenidad."
  },

  "04:40": {
    time: "04:40",
    type: "inverted",
    title: "La Fidelidad a tus Valores y la Prueba Moral",
    angelName: "Mebahiah",
    angelMeaning: "Ángel de la rectitud moral, la lucidez espiritual y el cumplimiento de promesas.",
    spiritualMessage: "El 04:40 se manifiesta cuando has sido puesto a prueba en tu paciencia, lealtad o ética. Esta sincronicidad te felicita y te confirma que mantenerte fiel a tus principios sagrados, sin caer en atajos fáciles, será el mayor garante de tu éxito y prestigio duradero.",
    numerology: "Número 8 (4+4+0=8): Retribución kármica justa y consolidación de la abundancia limpia.",
    tarotCard: "El Emperador y La Fuerza",
    tarotMeaning: "La nobleza del carácter y la fuerza moral que vencen cualquier obstáculo terrenal.",
    affirmation: "Camino con rectitud e integridad. Mi lealtad a mis principios es mi mayor escudo y gloria.",
    advice: "No negocies tus valores por ganancias a corto plazo. El camino noble es el que siempre perdura."
  },

  "05:50": {
    time: "05:50",
    type: "inverted",
    title: "Una Sorpresa Agradable en el Horizonte",
    angelName: "Caliel",
    angelMeaning: "Ángel de la verdad divina, la justicia fulgurante y el amparo ante la adversidad.",
    spiritualMessage: "El 05:50 anuncia un giro alegre e imprevisto que romperá la monotonía de tu semana. Algo que dabas por perdido, una oportunidad que creías cerrada o un reencuentro largamente anhelado resurgirá con fuerza para devolverte la sonrisa y la ilusión.",
    numerology: "Número 1 (5+5+0=10 → 1): El renacer del impulso creador y la apertura de nuevos caminos.",
    tarotCard: "El Papa y La Rueda de la Fortuna",
    tarotMeaning: "El consejo sabio o sincronicidad que desbloquea una gran puerta de oportunidad.",
    affirmation: "Doy la bienvenida a las sorpresas felices y a los milagros que renuevan mi alegría de vivir.",
    advice: "Mantén una actitud espontánea y receptiva. Si algo cambia de repente en tu agenda, acéptalo con una sonrisa."
  },

  "10:01": {
    time: "10:01",
    type: "inverted",
    title: "El Orden en las Prioridades del Alma",
    angelName: "Lecabel",
    angelMeaning: "Ángel del talento estratégico, la lucidez matemática y la visión de futuro.",
    spiritualMessage: "El 10:01 advierte sobre la dispersión mental. Si estás intentando abarcar demasiados frentes a la vez o postergando lo verdaderamente importante por atender urgencias ajenas, esta hora te insta a pausar, jerarquizar tus metas y no descuidar tu mundo interior ni a quienes amas.",
    numerology: "Número 2 (1+0+0+1=2): Equilibrio entre la ambición externa y la nutrición afectiva.",
    tarotCard: "La Rueda de la Fortuna y El Mago",
    tarotMeaning: "El arte de enfocar la energía creadora con precisión para no desgastarse en lo superficial.",
    affirmation: "Ordeno mi mente y dedico mi tiempo a lo que realmente enriquece mi vida y mi espíritu.",
    advice: "Haz una lista de tus tres prioridades reales para hoy y dedícales tu mejor energía antes de atender distracciones."
  },

  "12:21": {
    time: "12:21",
    type: "inverted",
    title: "Protección Sagrada Contra la Desconfianza",
    angelName: "Haamiah",
    angelMeaning: "Ángel de los rituales sagrados, la protección contra energías adversas y la búsqueda de la verdad.",
    spiritualMessage: "El 12:21 aparece cuando alguien en tu entorno puede estar proyectando envidias o dudas sobre tus talentos. El universo te pide que no permitas que las opiniones ajenas apaguen tu entusiasmo ni hagan mella en tu autoestima. Estás bajo un manto de protección sagrada.",
    numerology: "Número 6 (1+2+2+1=6): Sanación de la autoimagen, armonía hogareña y equilibrio afectivo.",
    tarotCard: "El Colgado y El Mundo",
    tarotMeaning: "La capacidad de trascender las críticas ajenas para coronar tu propio éxito en plenitud.",
    affirmation: "Confío en mi luz y en mis capacidades. Ningún juicio externo puede apagar la verdad de mi alma.",
    advice: "Guarda tus próximos pasos para ti y no busques la aprobación de personas que no celebran tus triunfos."
  },

  "13:31": {
    time: "13:31",
    type: "inverted",
    title: "La Superación de una Inquietud Oculta",
    angelName: "Hahahel",
    angelMeaning: "Ángel de la fe incondicional, la consagración espiritual y el coraje interior.",
    spiritualMessage: "El 13:31 te anuncia que una preocupación que te quitaba el sueño o una etapa de tensión familiar/laboral está llegando a su resolución. El universo te transmite serenidad y fortaleza para afrontar el desenlace con una madurez ejemplar.",
    numerology: "Número 8 (1+3+3+1=8): Restauración del orden, sanación kármica y equilibrio material.",
    tarotCard: "La Muerte y La Emperatriz",
    tarotMeaning: "De la transformación y el dolor aparente nace un florecimiento hermoso, fértil y renovado.",
    affirmation: "Suelto la preocupación y el miedo. Todo en mi vida se acomoda para mi mayor bienestar y paz.",
    advice: "Respira profundo y confía en los tiempos de la vida: las soluciones ya están en marcha, solo requieres serenidad."
  },

  "14:41": {
    time: "14:41",
    type: "inverted",
    title: "El Hallazgo de Respuestas y Claridad",
    angelName: "Sehaliah",
    angelMeaning: "Ángel de la lucidez mental, el rescate espiritual y la vitalidad regenerada.",
    spiritualMessage: "El 14:41 indica que encontrarás una respuesta, un documento o una solución que creías perdida o inaccesible. Una conversación sincera y sosegada permitirá disipar un malentendido con alguien querido.",
    numerology: "Número 10 → 1 (1+4+4+1=10 → 1): Nuevo inicio claro y armónico tras superar la confusión.",
    tarotCard: "La Templanza y El Emperador",
    tarotMeaning: "La combinación perfecta entre la serenidad emocional y la concreción práctica.",
    affirmation: "Tengo la claridad y la sabiduría necesarias para resolver cualquier dilema con calma y templanza.",
    advice: "Escucha con atención las conversaciones y señales a tu alrededor; la respuesta que buscas vendrá de forma muy sencilla."
  },

  "15:51": {
    time: "15:51",
    type: "inverted",
    title: "Un Amor o Pasión que Renace con Fuerza",
    angelName: "Mihael",
    angelMeaning: "Ángel de la armonía conyugal, la reconciliación afectiva y la fecundidad creadora.",
    spiritualMessage: "El 15:51 es el presagio de un renacer en el plano del corazón o la reconexión apasionada con una vocación artística que tenías olvidada. Se reaviva una chispa mágica en tu vida afectiva que te llenará de ilusión y vitalidad.",
    numerology: "Número 3 (1+5+5+1=12 → 3): Expresión amorosa desbordante, creatividad y dicha compartida.",
    tarotCard: "El Diablo y El Papa",
    tarotMeaning: "La transmutación del deseo pasional en un amor noble, consciente, maduro y duradero.",
    affirmation: "Abro mi corazón al amor verdadero y disfruto de mis pasiones con plenitud y conciencia.",
    advice: "Ten un detalle especial con esa persona importante o retoma hoy mismo ese proyecto creativo que hace vibrar tu corazón."
  },

  "20:02": {
    time: "20:02",
    type: "inverted",
    title: "La Reafirmación de la Fe y la Compañía Divina",
    angelName: "Umabel",
    angelMeaning: "Ángel del consuelo en la soledad, el amor fraterno y el conocimiento de la creación.",
    spiritualMessage: "Si te has sentido solo, incomprendido o exhausto por las exigencias cotidianas, el 20:02 es un abrazo celestial directo a tu corazón. El cosmos te susurra que tu esfuerzo tiene sentido, que eres infinitamente valioso y que legiones de protectores guían cada uno de tus pasos.",
    numerology: "Número 4 (2+0+0+2=4): Soporte incondicional, amparo divino y estabilidad duradera.",
    tarotCard: "El Juicio y La Papisa",
    tarotMeaning: "El despertar a la certeza interior de que nunca has estado abandonado por el universo.",
    affirmation: "Nunca estoy solo. La divinidad me acompaña, me sostiene y me guía en cada instante de mi vida.",
    advice: "Pon tu mano sobre el pecho, cierra los ojos y siente la fuerza inagotable de tu latido. Todo saldrá bien."
  },

  "21:12": {
    time: "21:12",
    type: "inverted",
    title: "La Cosecha de la Armonía y la Paz Familiar",
    angelName: "Damabiah",
    angelMeaning: "Ángel de la fuente inagotable de bondad, el bienestar hogareño y la dulzura.",
    spiritualMessage: "El 21:12 confirma que tus esfuerzos por conciliar en tu familia, pareja o entorno laboral están dando sus frutos. Las tensiones se disipan y se instaura un clima de colaboración, afecto sincero y entendimiento mutuo.",
    numerology: "Número 6 (2+1+1+2=6): El número de la armonía conyugal, el calor de hogar y la paz del alma.",
    tarotCard: "El Mundo y El Colgado",
    tarotMeaning: "La consumación de una visión de vida madura, solidaria y llena de dicha compartida.",
    affirmation: "Soy un imán de paz y armonía. Mis relaciones florecen en un ambiente de respeto y amor mutuo.",
    advice: "Agradece por la paz reconquistada y comparte un momento de calidad y cariño con los tuyos."
  },

  "23:32": {
    time: "23:32",
    type: "inverted",
    title: "El Discernimiento y la Sabiduría Nocturna",
    angelName: "Haiaiel",
    angelMeaning: "Ángel de la protección nocturna, la armadura de luz y la lucidez mental.",
    spiritualMessage: "El 23:32 te aconseja desconectar de pantallas, preocupaciones y ruidos antes de entregarte al sueño. Tu mente subconsciente procesará una decisión trascendental durante la noche. Al despertar con la mente despejada, sabrás con certeza absoluta qué camino tomar.",
    numerology: "Número 10 → 1 (2+3+3+2=10 → 1): El renacer matutino con liderazgo y convicción renovada.",
    tarotCard: "El Juicio y La Emperatriz",
    tarotMeaning: "La revelación creadora que brota en el silencio reparador del alma.",
    affirmation: "Entrego mis inquietudes a la noche. Duermo en paz y despierto con absoluta claridad y energía renovada.",
    advice: "Toma una infusión relajante, apaga el móvil media hora antes de dormir y pide a tus guías que te revelen respuestas en sueños."
  },

  // =========================================================================
  // ⭐ HORAS TRIPLES DESTACADAS
  // =========================================================================

  "01:11": {
    time: "01:11",
    type: "triple",
    title: "El Destello del Impulso Creador",
    angelName: "Elemiah",
    angelMeaning: "Ángel de la intuición precursora y la visión emprendedora.",
    spiritualMessage: "Triple vibración del 1: Una idea precursora e innovadora está germinando en tu mente. No la descartes por parecer osada; contiene el potencial de transformar tu realidad y abrirte caminos extraordinarios.",
    numerology: "Número 3 (1+1+1=3): Fertilidad de ideas, optimismo radiante y manifestación creadora.",
    tarotCard: "El Mago",
    tarotMeaning: "La habilidad innata para iniciar proyectos con éxito y encender la chispa divina.",
    affirmation: "Confío en mis ideas luminosas y tengo el coraje de manifestarlas en el mundo físico.",
    advice: "Apunta en tu libreta cualquier idea o intuición que se te ocurra hoy; es una semilla de oro para tu futuro."
  },

  "02:22": {
    time: "02:22",
    type: "triple",
    title: "La Alianza Sagrada y la Confianza en el Proceso",
    angelName: "Achaiah",
    angelMeaning: "Ángel de la paciencia sagrada y las semillas que germinan bajo tierra.",
    spiritualMessage: "Triple vibración del 2: Todo se está acomodando en tus relaciones y proyectos. Aunque no veas aún los brotes en la superficie, el universo está tejiendo los hilos invisibles para tu mayor bien.",
    numerology: "Número 6 (2+2+2=6): Armonía, protección divina y consolidación de vínculos verdaderos.",
    tarotCard: "La Papisa",
    tarotMeaning: "La sabiduría silenciosa que sabe respetar el tiempo de maduración de la vida.",
    affirmation: "Confío en los tiempos divinos. Todo en mi vida se gesta y madura en perfecta sincronía.",
    advice: "No te impacientes ni intentes apresurar desenlaces. Sigue regando tus metas con constancia y amor."
  },

  "03:33": {
    time: "03:33",
    type: "triple",
    title: "La Presencia de los Maestros Ascendidos",
    angelName: "Lauviah",
    angelMeaning: "Ángel de la revelación mística, la victoria espiritual y la música celestial.",
    spiritualMessage: "Triple vibración del 3: Los guías espirituales y los maestros de sabiduría están extraordinariamente cerca de ti. Estás profundamente amado, bendecido y protegido; tus plegarias han sido escuchadas.",
    numerology: "Número 9 (3+3+3=9): Compasión universal, amor incondicional y trascendencia del alma.",
    tarotCard: "La Emperatriz",
    tarotMeaning: "La gracia creadora de la Madre Universal derramando abundancia y sabiduría.",
    affirmation: "Estoy rodeado por el amor de mis guías. Mi alma camina cobijada por la sabiduría divina.",
    advice: "Envía un pensamiento de agradecimiento al cosmos y dedica un acto de bondad desinteresada a alguien hoy."
  },

  "04:44": {
    time: "04:44",
    type: "triple",
    title: "La Legión de Ángeles Protectores a tu Alrededor",
    angelName: "Yezalel",
    angelMeaning: "Ángel de la alianza inquebrantable y la protección absoluta del hogar.",
    spiritualMessage: "Triple vibración del 4: 'No temas, legiones de ángeles custodian tu espíritu, tu hogar y tus seres queridos'. La prueba o reto que estás atravesando se resolverá con victoria y solidez inquebrantable.",
    numerology: "Número 12 → 3 (4+4+4=12 → 3): La superación de la prueba para renacer en alegría y orden.",
    tarotCard: "El Emperador",
    tarotMeaning: "La firmeza indestructible y la protección inexpugnable del orden superior.",
    affirmation: "Estoy plenamente protegido, a salvo y guiado por la fuerza celestial en todo momento.",
    advice: "Siéntete seguro y confiado. Ningún obstáculo ni negatividad tiene poder frente a tu luz interior."
  },

  "05:55": {
    time: "05:55",
    type: "triple",
    title: "La Gran Transformación Liberadora del Destino",
    angelName: "Hekamiah",
    angelMeaning: "Ángel del coraje supremo y la ruptura de ataduras del pasado.",
    spiritualMessage: "Triple vibración del 5: Un cambio mayor y sumamente positivo está tocando a tu puerta. Rompe con viejas cadenas, deja atrás el conformismo y abraza con valentía la libertad de ser quien realmente eres.",
    numerology: "Número 15 → 6 (5+5+5=15 → 6): La transmutación del deseo material en una armonía espiritual superior.",
    tarotCard: "El Papa",
    tarotMeaning: "La guía sabia y luminosa para transitar las grandes metamorfosis del destino.",
    affirmation: "Me abro a la transformación con gozo y valentía. Todo cambio en mi vida me conduce a una mayor plenitud.",
    advice: "Atrévete a dar ese salto vital que venías posponiendo. El universo sostiene tus alas con amor."
  }
};

/**
 * Función de búsqueda inteligente para cualquier hora
 */
function getMirrorHourData(timeInput) {
  if (!timeInput) return null;
  
  // Normalizar formato "HH:MM"
  let cleanTime = timeInput.trim();
  if (cleanTime.length === 4 && !cleanTime.includes(':')) {
    cleanTime = cleanTime.substring(0, 2) + ':' + cleanTime.substring(2);
  }
  
  if (MIRROR_HOURS_DB[cleanTime]) {
    return MIRROR_HOURS_DB[cleanTime];
  }
  
  // Cálculo dinámico para cualquier hora personalizada
  const parts = cleanTime.split(':');
  if (parts.length === 2) {
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 23 && m >= 0 && m <= 59) {
      const hStr = h.toString().padStart(2, '0');
      const mStr = m.toString().padStart(2, '0');
      const formatted = `${hStr}:${mStr}`;
      
      if (MIRROR_HOURS_DB[formatted]) {
        return MIRROR_HOURS_DB[formatted];
      }
      
      // Cálculo de reducción teosófica
      const digits = (hStr + mStr).split('').map(d => parseInt(d, 10));
      const sum = digits.reduce((a, b) => a + b, 0);
      let reduced = sum;
      while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33) {
        reduced = reduced.toString().split('').map(Number).reduce((a, b) => a + b, 0);
      }
      
      const arcanaNames = {
        1: "El Mago (Iniciativa y Poder de Manifestación)",
        2: "La Papisa (Intuición y Sabiduría Secreta)",
        3: "La Emperatriz (Creatividad, Fertilidad y Belleza)",
        4: "El Emperador (Estructura, Orden y Estabilidad)",
        5: "El Papa (Enseñanza Elevada y Guía Ética)",
        6: "El Enamorado (Elecciones del Corazón y Armonía)",
        7: "El Carro (Victoria, Autodominio y Avance)",
        8: "La Justicia (Equilibrio Kármico e Integridad)",
        9: "El Ermitaño (Introspección y Luz Interior)",
        11: "La Fuerza (Número Maestro: Autodominio Espiritual)",
        22: "El Gran Constructor (Número Maestro: Manifestación Suprema)",
        33: "El Maestro Guía (Amor Incondicional y Servicio Divino)"
      };

      const arcanaName = arcanaNames[reduced] || `Arcano Mayor ${reduced}`;

      return {
        time: formatted,
        type: "custom",
        title: `Vibración Sincrónica del Momento (${formatted})`,
        angelName: "Guía Guardián Astral",
        angelMeaning: "La presencia atenta del universo custodiando tu minuto presente.",
        spiritualMessage: `Has mirado el reloj exactamente a las ${formatted}. En la tradición esotérica, toparte de forma espontánea con un minuto preciso no es fruto del azar, sino un llamado de tu mente subconsciente para que te detengas, respires con serenidad y reconectes con tu centro vital. La vibración de las ${hStr} horas unida a los ${mStr} minutos emite una frecuencia de atención plena que te pide alinear tus pensamientos presentes con tus intenciones más puras.`,
        numerology: `Suma teosófica de dígitos: ${digits.join('+')} = ${sum} → Reducción a Raíz Vibracional ${reduced}.`,
        tarotCard: arcanaName,
        tarotMeaning: `Esta hora conecta con la lección arquetípica de ${arcanaName}, recordándote el valor de la presencia consciente, el foco mental y la armonía interior.`,
        affirmation: `En este instante (${formatted}), me encuentro en paz, centrado en mi corazón y alineado con el fluir perfecto de mi destino.`,
        advice: "Respira hondo tres veces, suelta cualquier prisa innecesaria, agradece por este instante y continúa tu jornada con serenidad y claridad."
      };
    }
  }
  
  return null;
}

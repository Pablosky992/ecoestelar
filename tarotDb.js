// Base de datos de los 78 Arcanos del Tarot (22 Mayores y 56 Menores)
// El Eco de las Estrellas — voz mística, empática y poética

window.tarotDb = [
  {
    "id": 0,
    "name": "El Loco",
    "keyThemes": "Umbral de lo nuevo · Salto de fe · Libertad del ser · Comienzo sin mapa · Confianza cósmica.",
    "yesNoScore": 1,
    "yesNoText": "El universo susurra un sí luminoso: lánzate al vacío con el corazón abierto, pues más allá del borde conocido aguarda la magia que tu alma buscaba.",
    "meanings": {
      "general": "El Loco aparece en tu camino como un viento fresco que barre las telarañas del ayer. El cosmos te invita a soltar los cálculos y a confiar en esa chispa interior que siempre sabe hacia dónde ir. Hay en ti un potencial todavía sin nombre, una semilla que solo florece si te permites plantar sin saber aún el fruto.",
      "love": "En el terreno del corazón, esta energía trae el frescor de lo espontáneo: conexiones que nacen de la risa, amores que no piden permiso ni fecha de caducidad. Si buscas un vínculo, el universo te anima a abrirte sin armadura; si ya lo tienes, te invita a redescubrirte junto al otro como si fuera el primer día.",
      "work": "El oráculo percibe un horizonte lleno de posibilidades profesionales aún inexploradas. Puede que llegue una propuesta inesperada, o que sientas el impulso de trazar tu propio sendero. Confía en ese entusiasmo que arde en tu pecho: es la brújula más honesta que tienes.",
      "health": "Tu energía vital late con una frescura renovada. El cuerpo pide movimiento, aire, novedad. Escucha esa llamada al exterior, pero sin descuidar la prudencia: la aventura más hermosa comienza con los pies bien puestos en la tierra."
    },
    "reversed": {
      "general": "Algo en ti se resiste a dar el paso, y ese miedo disfrazado de precaución dispersa tu energía en mil direcciones. El oráculo te pide que te detengas: ¿estás actuando desde la libertad auténtica o desde una huida que no quieres nombrar?",
      "love": "Las emociones vuelan sin ancla. Alguien en esta dinámica —quizás tú mismo— teme el compromiso real y lo evita con promesas que se deshacen como niebla. El corazón pide honestidad antes de seguir dando.",
      "work": "Los impulsos sin reflexión pueden costar caro en este momento. Antes de abandonar o de actuar de forma radical, haz una pausa y traza aunque sea un boceto de lo que viene después. La valentía no riñe con la sabiduría.",
      "health": "El cuerpo lanza señales que la mente pasa por alto. Presta atención a los pequeños descuidos que, acumulados, se vuelven grandes. Bajar el ritmo no es rendirse: es escuchar."
    }
  },
  {
    "id": 1,
    "name": "El Mago",
    "keyThemes": "Poder de manifestación · Voluntad creadora · Ingenio · Acción consciente · Recursos disponibles.",
    "yesNoScore": 1,
    "yesNoText": "Sí, y con una claridad poderosa: posees exactamente lo que necesitas para hacer realidad lo que deseas. El momento es tuyo.",
    "meanings": {
      "general": "El Mago despliega ante ti la mesa de los cuatro elementos: tienes en tus manos las herramientas, el talento y la voluntad para transformar tu visión en algo tangible. El universo no te pide que esperes más; te pide que actúes con intención, con conciencia, con esa fuerza tranquila que conoce su propio poder.",
      "love": "En el amor, esta energía habla de magnetismo genuino, de palabras que abren corazones y de la capacidad de crear conexiones profundas. Si buscas pareja, tu presencia es tu mayor don: muéstrate. Si ya tienes un vínculo, es tiempo de reavivar la chispa con creatividad y presencia plena.",
      "work": "Las estrellas auguran un período de gran eficacia y brillantez profesional. Tus ideas tienen el potencial de convertirse en realidad: negocia, propón, crea. Tu mente es tu herramienta más poderosa ahora mismo.",
      "health": "Mente y cuerpo vibran en sintonía. Existe una capacidad de recuperación admirable en ti, un ritmo vital que fluye cuando te permites estar completamente presente en cada acción que realizas."
    },
    "reversed": {
      "general": "El poder se tuerce cuando se usa sin ética o sin dirección real. El oráculo detecta una sombra de manipulación —propia o ajena— o un talento que permanece sin florecer por miedo o pereza disfrazada. Es momento de revisar desde dónde actúas.",
      "love": "Las palabras pueden estar ocultando más de lo que revelan. Existe la posibilidad de que alguien en este vínculo use el encanto como pantalla. Confía en lo que percibes más allá de lo que se dice.",
      "work": "Hay fricciones por falta de honestidad en el entorno profesional o económico. El oráculo te pide que revises si tus métodos están alinados con tus valores más profundos.",
      "health": "El exceso de tensión mental se traduce en el cuerpo. El sistema nervioso pide descanso. Reduce el ruido, respira y vuelve a tu centro."
    }
  },
  {
    "id": 2,
    "name": "La Papisa",
    "keyThemes": "Sabiduría interior · Silencio fértil · Intuición · Misterio velado · Paciencia sagrada.",
    "yesNoScore": 0,
    "yesNoText": "El oráculo pide silencio antes de responder. Hay verdades que aún no han aflorado a la superficie. Espera, escucha hacia adentro: la respuesta llegará en el momento exacto.",
    "meanings": {
      "general": "La Papisa custodia los secretos del alma como guardiana del umbral entre lo visible y lo invisible. Te invita a confiar en tu saber más silencioso, ese que no necesita ser demostrado ni explicado. Algo importante está gestándose en las profundidades: dale tiempo, dale espacio, dale respeto.",
      "love": "Este amor vive más en los silencios que en las palabras, más en una mirada que en mil declaraciones. Hay una complicidad sutil y una atracción espiritual que no se apresura. Si esperas a alguien, el universo te pide que seas fiel a tu propia interioridad antes de abrirte.",
      "work": "El oráculo aconseja observar, estudiar y guardar tus planes con discreción. No todo lo que sabes necesita ser compartido ahora. Investiga, profundiza, y firma solo cuando tengas absoluta claridad.",
      "health": "El cuerpo habla en susurros. Presta especial atención a tus ritmos internos, al descanso y a la quietud. Las respuestas a lo que necesitas sanar ya están en ti."
    },
    "reversed": {
      "general": "Cuando la Papisa aparece invertida, los secretos se filtran, la intuición se ignora y el ruido exterior ahoga la voz interior. El oráculo te invita a desconectarte del alboroto y a recuperar el hilo de tu propia verdad.",
      "love": "Algo no se está diciendo —o algo se dice que no es verdad. La frialdad emocional o el miedo a la intimidad real están bloqueando lo que podría florecer. Habla desde el corazón.",
      "work": "Las decisiones apresuradas basadas en información incompleta pueden generar complicaciones. Ve con calma, verifica y no te dejes llevar por rumores del entorno.",
      "health": "Las emociones que se reprimen buscan salida a través del cuerpo. Dale voz a lo que sientes antes de que el cuerpo necesite hablar más fuerte."
    }
  },
  {
    "id": 3,
    "name": "La Emperatriz",
    "keyThemes": "Abundancia · Fertilidad creadora · Plenitud sensorial · Naturaleza generosa · Amor que nutre.",
    "yesNoScore": 1,
    "yesNoText": "Sí, con una generosidad desbordante. La tierra está fértil y lo que siembres con amor florecerá de forma magnífica.",
    "meanings": {
      "general": "La Emperatriz trae consigo el perfume de la tierra en flor: es la energía que hace crecer, que nutre sin condición, que celebra la belleza como forma de sabiduría. Todo proyecto, relación o deseo que toques ahora tiene el potencial de convertirse en algo real, abundante y hermoso.",
      "love": "El corazón rebosa. Este es un tiempo de afecto sincero, de caricias que sanan y de una sensualidad que celebra la vida. Si buscas amor, estás lista para recibirlo con toda tu luz. Si ya lo vives, es momento de profundizar en la ternura y en los proyectos compartidos.",
      "work": "La productividad y la creatividad se alían para darte resultados visibles y gratificantes. Los proyectos dan frutos, los ingresos fluyen y tu capacidad de crear valor es enorme en este momento.",
      "health": "Existe una vitalidad regeneradora pulsando en tu sistema. El cuerpo agradece el contacto con la naturaleza, el descanso gozoso y la alimentación consciente. Celébralo."
    },
    "reversed": {
      "general": "Cuando la Emperatriz pierde su equilibrio, la abundancia se convierte en exceso o en bloqueo. El oráculo percibe una energía creativa atascada o una dependencia afectiva que necesita ser reconocida y transformada.",
      "love": "Los celos o el control ahogan lo que debería crecer en libertad. El amor que domina no nutre. Es tiempo de revisar desde dónde das y desde dónde recibes en esta relación.",
      "work": "La desorganización o el derroche pueden estar minando recursos que con más cuidado rendirían mucho más. Un proyecto estancado necesita nueva perspectiva para retomar su impulso.",
      "health": "El cuerpo puede estar pidiendo atención en áreas relacionadas con el equilibrio hormonal o el autocuidado básico. La ansiedad busca salida a través del cuerpo: escúchala."
    }
  },
  {
    "id": 4,
    "name": "El Emperador",
    "keyThemes": "Orden · Autoridad benévola · Protección · Estructura sólida · Disciplina que libera.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero requiere que construyas desde la solidez. Establece estructura, traza límites claros y actúa con la autoridad tranquila de quien conoce su terreno.",
    "meanings": {
      "general": "El Emperador convoca la energía de quien sabe edificar. No hablamos de control por el control mismo, sino de la sabiduría de crear cimientos que permitan que todo lo demás se eleve con seguridad. Las bases que construyas ahora durarán.",
      "love": "Este vínculo tiene solidez y potencial de largo plazo. Hay alguien en esta historia que ofrece protección, constancia y lealtad. Si buscas estabilidad afectiva, las condiciones se están alineando para recibirla.",
      "work": "Es tiempo de consolidar, de formalizar y de liderar con claridad. Las posiciones de autoridad o responsabilidad te favorecen. La organización financiera da resultados tangibles y sostenibles.",
      "health": "La disciplina es tu medicina. Rutinas saludables, estructura en tus horarios y el ejercicio constante fortalecen tanto el cuerpo como la mente."
    },
    "reversed": {
      "general": "El orden se ha vuelto rigidez o ha colapsado en caos. El oráculo percibe una energía de control excesivo o de completa falta de estructura que está generando desequilibrio en tu vida.",
      "love": "Las dinámicas de control o el orgullo que impide la comunicación real están erosionando lo que debería ser un refugio. El amor necesita espacio, no solo paredes.",
      "work": "Los conflictos con figuras de autoridad o la falta de organización personal están bloqueando el avance. Es momento de revisar cómo ejerces —o permites— el poder.",
      "health": "La tensión acumulada busca salida. El cuerpo rígido refleja una mente que no cede. Aprende a soltar para que la energía fluya nuevamente."
    }
  },
  {
    "id": 5,
    "name": "El Papa",
    "keyThemes": "Guía espiritual · Enseñanza sagrada · Alianzas éticas · Tradición sabia · Bendición.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el camino está bendecido cuando lo recorres con integridad, buscando consejo sabio y honrando los acuerdos que suscribes con el alma.",
    "meanings": {
      "general": "El Papa aparece como puente entre el cielo y la tierra, recordándote que no estás solo en tu camino. Hay en tu entorno —o dentro de ti mismo— una fuente de sabiduría disponible. Busca al mentor, honra la enseñanza, actúa desde tus valores más elevados.",
      "love": "Los vínculos que crecen sobre el suelo firme de los valores compartidos tienen una profundidad que el tiempo no erosiona. Este arcano augura compromisos genuinos, conversaciones que tocan el alma y uniones que reciben la bendición del tiempo.",
      "work": "El consejo de alguien con experiencia puede abrirte puertas que tú solo no verías. Invierte en tu formación, respeta las normas del juego y actúa con transparencia: tu reputación es tu mayor capital.",
      "health": "Confía en la sabiduría que combina el saber médico con la atención a tu mundo interior. La paz mental es la mejor medicina preventiva."
    },
    "reversed": {
      "general": "La sabiduría se ha distorsionado en dogma, y la guía se ha convertido en control. El oráculo te invita a cuestionar con respeto las autoridades que te limitan y a encontrar tu propia verdad espiritual.",
      "love": "Hay desacuerdos profundos sobre valores, expectativas o compromisos. Lo que se mantiene solo por las apariencias ya no tiene la energía vital que el amor necesita.",
      "work": "Cuidado con los consejos interesados disfrazados de experiencia. Verifica la información antes de actuar y confía en tu propio criterio tanto como en el de los demás.",
      "health": "El cuerpo puede estar reflejando tensiones psicosomáticas ligadas a la rigidez mental o a conflictos no resueltos con figuras de autoridad."
    }
  },
  {
    "id": 6,
    "name": "El Enamorado",
    "keyThemes": "Elección desde el corazón · Amor en plenitud · Alineación de valores · Decisión consciente · Vínculo sagrado.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero la calidad de este sí depende de una elección hecha desde lo más honesto de tu corazón, no desde el miedo ni la comodidad.",
    "meanings": {
      "general": "El Enamorado no habla solo de romance: habla de ese momento en que el alma debe elegir con plena conciencia. Hay una encrucijada ante ti, y el universo te pide que te preguntes qué es lo que verdaderamente amas, a qué aspiras realmente. Desde ahí vendrá tu respuesta más auténtica.",
      "love": "El corazón vibra con la frecuencia del encuentro genuino. Hay o llegará una conexión de esas que cambian el mapa de quién eres. Si estás en pareja, es un momento para renovar el compromiso desde una elección consciente y renovada.",
      "work": "El oráculo te anima a seguir aquello que te apasiona de verdad. Una decisión profesional importante se avecina; guíate por tus valores, no solo por la rentabilidad inmediata.",
      "health": "El equilibrio entre lo que das y lo que recibes se refleja en tu bienestar. Elige hábitos que nazcan del amor propio, no de la exigencia."
    },
    "reversed": {
      "general": "La indecisión crónica o las elecciones hechas desde el ego están creando un laberinto del que es difícil salir. El oráculo te pide que te detengas y te preguntes qué quieres realmente, sin el ruido de las expectativas ajenas.",
      "love": "Hay tensiones, dudas o interferencias que enturbian lo que podría ser hermoso. La comunicación honesta —aunque duela— es el único camino hacia la claridad.",
      "work": "Una asociación o decisión tomada con prisas puede traer complicaciones. Revisa los acuerdos con calma antes de comprometerte.",
      "health": "La mente dividida agota el cuerpo. Resolver las tensiones internas es el primer paso para recuperar la energía."
    }
  },
  {
    "id": 7,
    "name": "El Carro",
    "keyThemes": "Victoria con control · Determinación · Fuerza de voluntad · Avance decidido · Dominio del camino.",
    "yesNoScore": 1,
    "yesNoText": "Sí, y con fuerza. El camino está despejado para quien sepa tomar las riendas con decisión y mantener la mirada en el horizonte.",
    "meanings": {
      "general": "El Carro invoca la energía del guerrero que ha aprendido a gobernar sus propios impulsos. Cuando las fuerzas contrarias son domadas por la voluntad, el avance es inevitable. Hay un objetivo al que estás más cerca de lo que crees: no te detengas ahora.",
      "love": "En el amor, esta energía trae dinamismo, conquista y un avance que se siente como una corriente poderosa. Si hay distancia, acórtala. Si hay un deseo, exprésalo. El movimiento es la clave.",
      "work": "Los ascensos, los logros y el reconocimiento están al alcance de quienes no ceden. Tu perseverancia y capacidad de liderazgo son tus mayores activos en este ciclo.",
      "health": "El cuerpo responde al impulso de moverse, de activarse, de sentirse vivo. Un buen programa de ejercicio o actividad física potenciará tu energía de forma notable."
    },
    "reversed": {
      "general": "El rumbo se ha perdido o la velocidad descontrolada está generando accidentes. El oráculo percibe arrogancia o dispersión que impide llegar a destino. Detente, recalibra y vuelve a avanzar con intención.",
      "love": "La impaciencia o el afán de control están creando fricciones innecesarias. El amor no se conquista con fuerza: se gana con presencia y escucha.",
      "work": "Las decisiones impulsivas o la falta de planificación pueden generar tropiezos costosos. Ahora mismo, la prudencia es más poderosa que la velocidad.",
      "health": "El cuerpo está acusando un ritmo insostenible. Antes de que el agotamiento se imponga, elige conscientemente el descanso."
    }
  },
  {
    "id": 8,
    "name": "La Justicia",
    "keyThemes": "Equilibrio cósmico · Verdad que pesa · Ley de causa y efecto · Claridad objetiva · Integridad.",
    "yesNoScore": 1,
    "yesNoText": "Sí, si has actuado con honestidad: recibirás exactamente lo que has sembrado, ni más ni menos. El cosmos es un espejo perfecto.",
    "meanings": {
      "general": "La Justicia no juzga con severidad, sino con ecuanimidad. Te recuerda que el universo mantiene un equilibrio perfecto y que cada acción tiene su eco. Ahora es tiempo de mirar con objetividad, de asumir lo que te corresponde y de confiar en que la balanza encontrará su punto justo.",
      "love": "Las relaciones que se nutren de respeto mutuo y honestidad tienen un suelo firme. Puede llegar un momento de formalización o de resolución de un asunto pendiente. La equidad en el dar y el recibir es el secreto de la durabilidad.",
      "work": "Los contratos, acuerdos y procesos administrativos se resuelven favorablemente cuando hay integridad de por medio. Si has actuado bien, los frutos llegarán. Si no, el oráculo te invita a corregir el rumbo antes de que la balanza hable.",
      "health": "El cuerpo busca su equilibrio natural. La atención a los riñones, la postura y el balance entre tensión y reposo te devolverá la armonía que necesitas."
    },
    "reversed": {
      "general": "Algo no está en equilibrio: puede ser una injusticia que sufres o una falta de honestidad que debes reconocer. El oráculo te pide que te hagas cargo de tu parte en la historia.",
      "love": "La falta de reciprocidad o de honestidad está pesando sobre el vínculo. El amor no puede florecer donde no hay igualdad de condiciones.",
      "work": "Hay riesgos legales, contractuales o éticos que requieren atención inmediata. No ignores las señales de alerta.",
      "health": "El desequilibrio físico refleja un desajuste más profundo. Recuperar la armonía requiere atender tanto el cuerpo como la mente."
    }
  },
  {
    "id": 9,
    "name": "El Ermitaño",
    "keyThemes": "Retiro sabio · Luz interior · Madurez espiritual · Soledad fértil · Camino propio.",
    "yesNoScore": 0,
    "yesNoText": "No todavía. El universo te pide que te retires a tu interior, que ilumines lo que aún no ves con claridad. La respuesta vendrá cuando hayas encontrado tu propia verdad.",
    "meanings": {
      "general": "El Ermitaño avanza despacio, pero cada paso que da está lleno de conciencia. Te invita a honrar el poder del silencio, a desconectarte del ruido del mundo por un tiempo y a encender la linterna de tu sabiduría más íntima. Lo que necesitas saber ya está dentro de ti.",
      "love": "El amor maduro no necesita apresurarse. Este tiempo de quietud puede ser el más revelador: ¿qué es lo que realmente buscas? ¿Qué necesitas en un vínculo para sentirte en paz? Las respuestas están esperándotes en la honestidad de tu soledad.",
      "work": "Los proyectos que construyen lentamente tienen raíces más profundas. No esperes resultados inmediatos: el proceso mismo es el aprendizaje más valioso.",
      "health": "El cuerpo pide pausa. La longevidad se cultiva respetando los ciclos naturales del organismo. Revísate con calma, sin prisa."
    },
    "reversed": {
      "general": "El aislamiento se ha vuelto una trampa en lugar de un refugio. La terquedad o la rigidez mental están impidiendo el avance que el alma necesita. Ábrelo un poco: hay ayuda disponible si decides recibirla.",
      "love": "El resentimiento silenciado durante demasiado tiempo corroe lo que podría sanar. Es hora de hablar, de salir del ostracismo emocional.",
      "work": "El rechazo a adaptarte o a pedir ayuda está generando demoras innecesarias. La experiencia ajena también es sabiduría.",
      "health": "El letargo físico y mental pide movimiento. Un pequeño cambio de rutina puede ser el primer paso hacia la recuperación."
    }
  },
  {
    "id": 10,
    "name": "La Rueda de la Fortuna",
    "keyThemes": "Ciclos del cosmos · Giro del destino · Sincronicidad · Abundancia inesperada · Movimiento perpetuo.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el giro de la rueda te favorece en este instante. Las circunstancias están cambiando a tu favor de maneras que todavía no puedes imaginar del todo.",
    "meanings": {
      "general": "La Rueda gira y los ciclos se renuevan. El universo te recuerda que ni las tormentas ni las bonanzas son permanentes: eres tú quien permanece mientras el escenario cambia. Úsate esta energía de cambio a tu favor; abraza lo nuevo que llega con curiosidad y apertura.",
      "love": "Un encuentro fortuito, un giro inesperado o una energía renovada irrumpe en tu vida sentimental. El destino parece tener algo que enseñarte a través de lo que llega o de lo que se mueve.",
      "work": "Las oportunidades llaman a tu puerta de formas inesperadas. Estate atento a las señales, a las coincidencias significativas, a las puertas que se abren sin que hayas llamado del todo.",
      "health": "El cuerpo y su energía vital también se mueven en ciclos. Si estás en un momento bajo, la rueda promete que se eleva de nuevo. Si estás en lo alto, cuida lo que tienes con gratitud."
    },
    "reversed": {
      "general": "La resistencia al cambio está haciendo que el ciclo gire en tu contra. El oráculo te anima a soltar el control de lo que no depende de ti y a confiar en que la rueda siempre vuelve a subir.",
      "love": "La inestabilidad emocional o la repetición de los mismos patrones sin aprendizaje está desgastando el vínculo. El cambio que necesitas empezar es interno.",
      "work": "Un período de turbulencias económicas o laborales pide prudencia y paciencia. No es tiempo de apostar todo; es tiempo de conservar y esperar el siguiente giro.",
      "health": "Las fluctuaciones en tu bienestar están vinculadas a los ritmos de estrés. Cultiva una rutina que te ancle cuando el entorno se mueve demasiado rápido."
    }
  },
  {
    "id": 11,
    "name": "La Fuerza",
    "keyThemes": "Valentía suave · Dominio interior · Compasión como poder · Resistencia del alma · Amor que transforma.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero tu victoria llegará no por la fuerza bruta, sino por la sabiduría de quien sabe cuándo avanzar y cuándo sostenerse con gracia.",
    "meanings": {
      "general": "La Fuerza no domina por imposición sino por amor. En ti habita una capacidad de transformar las circunstancias más difíciles a través de la paciencia, la compasión y esa voluntad silenciosa que no necesita demostrar nada. Confía en esa fortaleza interior.",
      "love": "El amor más poderoso es el que sana sin controlar, el que permanece sin asfixiar. Esta energía habla de vínculos capaces de atravesar tormentas y salir más enriquecidos.",
      "work": "Tienes la capacidad de lidiar con situaciones complejas o con personas difíciles desde un lugar de ecuanimidad y diplomacia. Esa habilidad vale más que cualquier habilidad técnica.",
      "health": "La fuerza de voluntad aplicada al cuidado del cuerpo puede obrar maravillas. Un hábito construido con amor y constancia tiene el poder de transformar tu bienestar."
    },
    "reversed": {
      "general": "Cuando la fuerza se distorsiona, aparece el miedo en su lugar, o la ira que no encuentra cauce sano. El oráculo te invita a reconocer dónde estás cediendo tu poder o usándolo de forma que no te honra.",
      "love": "Los celos, el dominio o la inseguridad están erosionando lo que podría ser hermoso. El amor genuino no necesita demostrar su poder.",
      "work": "Un exceso de agresividad o de pasividad está generando conflictos en tu entorno profesional. Busca el equilibrio entre afirmar y ceder.",
      "health": "El sistema inmunológico refleja el estado emocional. Trabajar la gestión de las emociones intensas será un camino directo hacia la recuperación física."
    }
  },
  {
    "id": 12,
    "name": "El Colgado",
    "keyThemes": "Nueva perspectiva · Entrega voluntaria · Pausa sagrada · Sacrificio que ilumina · Ver lo invisible.",
    "yesNoScore": -1,
    "yesNoText": "No en este momento y tal como están las cosas. Antes de avanzar, el universo te pide que te detengas y que veas la situación desde un ángulo completamente nuevo.",
    "meanings": {
      "general": "El Colgado ha elegido su postura, no le ha sido impuesta. Hay en esta imagen la paradoja del que suelta el control para ganar la iluminación. En tu vida, algo necesita ser observado desde otro ángulo radicalmente diferente. La pausa no es derrota; es la antesala de la comprensión.",
      "love": "Esta relación está en un compás de espera que tiene su propio sentido. No forces ni aceleres: algo está integrándose en lo profundo. La soltura afectiva puede ser el mayor acto de amor que hagas ahora.",
      "work": "Los proyectos se detienen para que puedas verlos con más claridad. Antes de invertir más energía, observa qué perspectiva has estado ignorando. La demora tiene una lección.",
      "health": "El cuerpo necesita pausa real, no la pausa incómoda que das entre una actividad y otra. Descansa profundamente. Medita. Escucha."
    },
    "reversed": {
      "general": "El victimismo o el sacrificio sin propósito está agotando tu energía vital. El oráculo te pregunta: ¿te estás entregando por amor o por miedo a la alternativa?",
      "love": "Permanecer en un lugar de sufrimiento por no querer soltar lo que ya no nutre es una forma de autoengaño. El amor propio también es sagrado.",
      "work": "La obstinación en proyectos que ya no tienen futuro o la pereza que paraliza son sombras que el arcano señala. Es tiempo de tomar una decisión, aunque incomode.",
      "health": "La hiperexigencia hacia uno mismo o la depresión silenciosa piden ser nombradas. Pide ayuda: eso también requiere valentía."
    }
  },
  {
    "id": 13,
    "name": "La Muerte",
    "keyThemes": "Transformación radical · Final que libera · Transmutación · Soltar para renacer · Umbral del ser.",
    "yesNoScore": -1,
    "yesNoText": "No en la forma en que esto está planteado ahora. Lo que conoces necesita morir para que algo más verdadero y más libre pueda nacer. Es un no que abre paso a un sí más profundo.",
    "meanings": {
      "general": "La Muerte no llega con crueldad sino con la honestidad de quien sabe que ningún árbol puede crecer si no deja caer las hojas que ya cumplieron su ciclo. Algo en tu vida ha llegado a su conclusión natural. Honra ese final: es el umbral desde el que comienza lo más auténtico.",
      "love": "Este arcano puede señalar el final de una relación que ya no tenía hacia dónde crecer, o una profunda transformación en la forma de amarte y de amar. Soltar no siempre es perder; a veces es el acto de amor más grande.",
      "work": "Una etapa profesional cierra para que otra, más alineada con lo que eres ahora, pueda abrirse. El desprendimiento de lo obsoleto es el primer acto del renacimiento creativo.",
      "health": "El cuerpo se renueva cuando se le permite soltar lo que ya no le sirve: toxinas, hábitos, patrones. Un nuevo ciclo de salud puede comenzar desde aquí."
    },
    "reversed": {
      "general": "El miedo al cambio ha convertido el umbral en una prisión. El aferrarse a lo que ya terminó no lo hace volver; solo prolonga el dolor. El universo te invita con gentileza a soltar.",
      "love": "Sostener un amor que ya agotó su energía vital por miedo a la soledad es una forma de no honrar ni la relación ni a ti mismo.",
      "work": "Resistir la transformación necesaria en el plano laboral puede generar pérdidas mayores. La adaptación valiente es la mejor inversión.",
      "health": "El cuerpo está acusando la resistencia al cambio en forma de cronicidades que no terminan de sanar. El primer paso es interior."
    }
  },
  {
    "id": 14,
    "name": "La Templanza",
    "keyThemes": "Armonía · Alquimia interior · Moderación sabia · Paciencia que fluye · Curación gradual.",
    "yesNoScore": 1,
    "yesNoText": "Sí, todo se resolverá con la gracia de quien sabe mezclar las aguas con calma. La paciencia y el equilibrio son tus mejores aliados en este momento.",
    "meanings": {
      "general": "La Templanza es el arte de mezclar sin apresurar, de encontrar el punto de equilibrio donde los opuestos se disuelven en armonía. El universo te invita a no extremar las cosas, a fluir con la confianza de quien sabe que el tiempo es sabio.",
      "love": "La relación se nutre de comprensión mutua, de una comunicación que no hiere, de la capacidad de encontrar el punto medio entre lo que cada uno necesita. Esta es la energía que hace que el amor madure hermosamente.",
      "work": "El ambiente colaborativo, los acuerdos diplomáticos y el trabajo constante sin prisa dan sus frutos de forma sostenida. Es un período de estabilidad constructiva.",
      "health": "La curación avanza lentamente pero con solidez. El equilibrio entre actividad y descanso, entre cuerpo y mente, es la clave de tu bienestar en este ciclo."
    },
    "reversed": {
      "general": "Los excesos o la falta de moderación están generando desequilibrios que el oráculo señala con suavidad. Volver al centro requiere solo que te detengas un momento a escuchar.",
      "love": "La incomunicación o los extremos emocionales están generando tensión innecesaria. La paciencia no es resignación; es el espacio donde florece la comprensión.",
      "work": "Tensiones en el equipo o desajustes financieros piden atención. Revisa los acuerdos con calma y sin dramatismo.",
      "health": "El sistema nervioso está sobrecargado. La moderación, el ritmo y el descanso son la mejor medicina que puedes recetar a tu propio cuerpo ahora mismo."
    }
  },
  {
    "id": 15,
    "name": "El Diablo",
    "keyThemes": "Sombra que enseña · Ataduras que revelan · Deseo consciente · Pasión sin cadenas · Libertad interior.",
    "yesNoScore": -1,
    "yesNoText": "Algo te mantiene atado a una situación que ya no te libera. Si buscas paz y autenticidad, el oráculo señala que hay ataduras que necesitas examinar antes de avanzar.",
    "meanings": {
      "general": "El Diablo no es el enemigo: es el espejo de lo que niegas en ti. Muestra las ataduras invisibles que el ego teje alrededor de tus miedos y deseos más profundos. Mirarlo de frente sin juicio es el primer paso hacia una libertad real. ¿A qué te sientes encadenado que en secreto no quieres soltar?",
      "love": "Hay una atracción poderosa e intensa en juego, llena de magnetismo y pasión. Pero el oráculo también pregunta: ¿este vínculo te eleva o te ancla en tus sombras? La honestidad contigo mismo es la llave de esta carta.",
      "work": "Ambiciones grandes, poder y dinero tienen su lugar, pero cuando se convierten en el único motor, el alma paga el precio. Revisa si tus métodos están alineados con la persona que quieres ser.",
      "health": "El cuerpo habla de excesos que se han acumulado. El deseo de placer también necesita límites que lo hagan sostenible."
    },
    "reversed": {
      "general": "Las cadenas se rompen. Algo que te tenía atado —una adicción, una dependencia, una creencia limitante— pierde su poder sobre ti. El proceso de liberación, aunque incómodo, ya comenzó.",
      "love": "Te estás liberando de una dinámica de codependencia o de una relación que te quitaba más de lo que te daba. Es un momento de recuperar tu propia luz.",
      "work": "Te alejas de ambientes o prácticas que no honraban tu integridad. Esta separación abre espacio para algo más auténtico.",
      "health": "La desintoxicación —física o emocional— avanza. Tu cuerpo recupera su fuerza cuando dejas de alimentar lo que te debilitaba."
    }
  },
  {
    "id": 16,
    "name": "La Torre",
    "keyThemes": "Despertar repentino · Caída de ilusiones · Liberación por la crisis · Verdad que ilumina · Reconstrucción.",
    "yesNoScore": -1,
    "yesNoText": "No, y si insistes en mantener lo que se está derrumbando, el colapso será mayor. Lo que cae no era tuyo de verdad: espacio libre para construir desde la verdad.",
    "meanings": {
      "general": "La Torre cae porque sus cimientos eran falsas verdades. Lo que parece un desastre es en realidad una liberación violenta pero necesaria. El universo desmanteló lo que tú no te atreviste a soltar. En medio del caos, busca la revelación: siempre hay una.",
      "love": "Una verdad oculta sale a la superficie con fuerza. Puede ser doloroso, pero también es profundamente liberador. Lo que quede de pie tras esta tormenta valdrá infinitamente más.",
      "work": "Un cambio drástico en el entorno profesional —que puede sentirse como una pérdida— está abriendo espacio para algo nuevo. No te aferres a los escombros.",
      "health": "El cuerpo pide un freno de emergencia. Ignora las señales de alerta por más tiempo y pagará el precio. Detente ahora: es la señal más sabia que puedes dar."
    },
    "reversed": {
      "general": "El colapso se retrasa, pero la tensión acumulada bajo la superficie sigue creciendo. El oráculo te pide que no postergues lo inevitable: la honestidad temprana duele menos que el derrumbe tardío.",
      "love": "Una crisis latente se resiste a estallar, pero la presión es real. Hablar a tiempo puede salvar lo que el silencio está destruyendo.",
      "work": "Sostener artificialmente una situación que no tiene futuro solo prolonga el desgaste. La valentía de cerrar puede ser el inicio de algo mucho mejor.",
      "health": "El estrés crónico no resuelto se convierte en enfermedad. Atiende los síntomas que llegan como avisos antes de que se conviertan en alarmas."
    }
  },
  {
    "id": 17,
    "name": "La Estrella",
    "keyThemes": "Esperanza viva · Guía del cosmos · Curación pacífica · Fe renovada · Generosidad del universo.",
    "yesNoScore": 1,
    "yesNoText": "Sí, con toda la ternura y la certeza del cosmos. Estás siendo guiado hacia algo hermoso. Confía.",
    "meanings": {
      "general": "La Estrella vierte sus aguas sobre la tierra y el alma, recordándote que el universo no te ha olvidado. Hay una luz suave pero constante iluminando tu camino. La curación llega, la inspiración regresa, la fe en el futuro se renueva como la hierba después de la lluvia.",
      "love": "Hay un amor puro, sincero y transparente esperando florecer —o renovándose si ya existe. Este arcano habla de almas afines, de conexiones que sanan en lugar de herir, de la posibilidad real de encontrar paz en el amor.",
      "work": "El reconocimiento y la abundancia llegan de forma orgánica cuando actúas desde tu autenticidad. Este es un período fértil para sembrar proyectos con visión de largo plazo.",
      "health": "La curación avanza suavemente pero con profundidad. El cuerpo responde al amor propio y a la tranquilidad emocional. Cuida tu espíritu y tu cuerpo te lo agradecerá."
    },
    "reversed": {
      "general": "La desilusión ha nublado temporalmente tu capacidad de ver la luz. El oráculo te pide que no confundas una noche oscura con la ausencia permanente de estrellas. Están ahí, aunque no las veas aún.",
      "love": "Las promesas rotas o las expectativas no cumplidas han empañado lo que podría recuperar su brillo. Es tiempo de revisar qué necesitas sanar internamente para volver a confiar.",
      "work": "El éxito esperado se demora, pero no se cancela. Revisa si el camino necesita ajustes o si simplemente el tiempo aún no ha llegado.",
      "health": "El desánimo tiene un efecto directo sobre el sistema inmunológico y la energía vital. Cuida tu estado emocional con la misma diligencia con que cuidas lo externo."
    }
  },
  {
    "id": 18,
    "name": "La Luna",
    "keyThemes": "Aguas del inconsciente · Ilusión y verdad · Miedos que enseñan · Intuición en la oscuridad · Sueños reveladores.",
    "yesNoScore": 0,
    "yesNoText": "La respuesta está velada por las sombras de lo que no ves con claridad todavía. Antes de actuar, atraviesa los miedos que distorsionan tu percepción de la realidad.",
    "meanings": {
      "general": "La Luna reina sobre las aguas del inconsciente y te invita a navegar por ellas con la brújula de la intuición, no del intelecto. Hay algo que no se ve a simple vista: un miedo disfrazado de certeza, una ilusión disfrazada de reality. El oráculo te pide que vayas despacio y que confíes en lo que sientes antes que en lo que calculas.",
      "love": "Los miedos al abandono, los malentendidos o las sombras del pasado pueden estar colorando lo que percibes en el presente. Antes de concluir algo, pregúntate: ¿ves lo que es o lo que temes?",
      "work": "El panorama profesional está rodeado de niebla. No es el mejor momento para decisiones definitivas. Observa, espera, aclara. La verdad saldrá a la luz cuando estés listo para verla.",
      "health": "El plano emocional y el físico están profundamente conectados en este momento. Los patrones de ansiedad, los sueños intensos y la inestabilidad anímica piden atención amorosa."
    },
    "reversed": {
      "general": "La niebla comienza a disiparse. Las ilusiones caen y lo que permanece es más real y sólido de lo que esperabas. La claridad que llega puede ser sorprendente pero necesaria.",
      "love": "Los malentendidos se resuelven, las verdades ocultas emergen y la relación puede comenzar a caminar sobre suelo más honesto y firme.",
      "work": "Lo que estaba oculto en el entorno laboral —ya sean intrigas o simplemente información importante— sale a la luz. Ahora puedes tomar decisiones más informadas.",
      "health": "Los estados de ansiedad o los patrones depresivos que nublaban tu bienestar comienzan a ceder cuando les das voz y les permites ser vistos."
    }
  },
  {
    "id": 19,
    "name": "El Sol",
    "keyThemes": "Claridad radiante · Éxito luminoso · Alegría genuina · Verdad que ilumina · Vitalidad generosa.",
    "yesNoScore": 1,
    "yesNoText": "Sí, con la certeza brillante del Sol al mediodía. El éxito, la claridad y la alegría te acompañan. Este es uno de los mejores augurios del oráculo.",
    "meanings": {
      "general": "El Sol aparece y todo lo ilumina. No quedan rincones oscuros donde la duda pueda esconderse. La verdad sale a la luz, el éxito se vuelve visible y la alegría de estar vivo se siente en cada célula. Es un tiempo de plenitud que merece ser celebrado.",
      "love": "El amor brilla con su luz más cálida. Bodas, reconciliaciones, momentos de ternura genuina y la dicha de compartir la vida con alguien que te eleva. Si buscas amor, este arcano es la mejor señal de que el camino está despejado.",
      "work": "Los logros se consolidan, el reconocimiento llega y la abundancia fluye. Tu trabajo habla por ti y el mundo lo nota. Es tiempo de brillo público y de disfrutar los frutos de tu esfuerzo.",
      "health": "Energía desbordante, vitalidad renovada y una alegría de vivir que se convierte en la mejor medicina. El cuerpo florece cuando el alma está en paz."
    },
    "reversed": {
      "general": "El Sol sigue brillando, aunque en este momento lo ves a través de nubes temporales. El éxito llega, pero con un pequeño retraso. La alegría está ahí, solo necesita que quites lo que la ensombrece.",
      "love": "Pequeños malentendidos o el exceso de ego están opacando lo que podría ser hermoso. Un gesto de humildad puede devolver la luz al vínculo.",
      "work": "Los frutos de tu trabajo merecen más reconocimiento del que están recibiendo. El oráculo te anima a brillar sin esperar permiso.",
      "health": "Cuida la energía que gastas en exceso: incluso el Sol necesita su noche para poder amanecer de nuevo. El descanso es parte del ciclo vital."
    }
  },
  {
    "id": 20,
    "name": "El Juicio",
    "keyThemes": "Llamada del alma · Renacimiento consciente · Absolución del pasado · Despertar espiritual · Nueva identidad.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el momento de tu despertar y liberación ha llegado. Algo importante que esperabas se resolverá de forma que podrás comenzar desde un lugar completamente nuevo.",
    "meanings": {
      "general": "El Juicio no condena: invita. Es el llamado de tu alma a despertar a una versión de ti mismo más auténtica, más libre, más consciente. El pasado queda absuelto y el camino se abre hacia una nueva identidad. ¿Estás listo para responder a esa llamada?",
      "love": "El renacer en el amor puede tomar muchas formas: una reconciliación bajo nuevas reglas, el regreso de alguien del pasado transformado, o el inicio de una relación que sientes que el alma ya conocía. Hay magia en este reencuentro.",
      "work": "Noticias esperadas, decisiones importantes o el inicio de una vocación que finalmente se alinea con quién eres de verdad. Un ciclo cierra con honores y otro comienza con propósito.",
      "health": "Una recuperación notable está en camino. El cuerpo responde al despertar interior con una renovación de energía que puede sorprenderte."
    },
    "reversed": {
      "general": "Hay una resistencia a responder a la llamada del alma, un miedo al cambio que te mantiene en un lugar conocido aunque ya no te nutra. El oráculo te invita a confiar en el proceso de tu propio despertar.",
      "love": "Los rencores no procesados o la incapacidad de soltar el pasado están bloqueando un presente que podría ser renovado. El perdón —de otros y de ti mismo— abre la puerta.",
      "work": "Los retrasos en resoluciones importantes piden paciencia. Si has hecho tu parte con honestidad, el resultado llegará en el momento apropiado.",
      "health": "Las recaídas físicas a veces ocurren antes del salto final hacia la recuperación. No te desanimes: el proceso tiene su propio ritmo."
    }
  },
  {
    "id": 21,
    "name": "El Mundo",
    "keyThemes": "Realización absoluta · Culminación gloriosa · Plenitud integrada · Éxito del alma · El viaje completo.",
    "yesNoScore": 1,
    "yesNoText": "Sí, con la plenitud absoluta del universo detrás de ti. La culminación que buscabas está en su momento de mayor madurez. Celébralo.",
    "meanings": {
      "general": "El Mundo es la corona del viaje, el momento en que el alma abraza todo lo que ha aprendido y se integra con el cosmos en un acto de plenitud perfecta. No hay nada fuera de su lugar. Has llegado, aunque el camino continúe. Este es un momento de celebración genuina.",
      "love": "La plenitud afectiva se manifiesta de la forma más hermosa. Una relación que es espejo y complemento, un amor que integra sin asfixiar, una convivencia que celebra la vida compartida.",
      "work": "La culminación de un ciclo importante de trabajo, estudios o proyectos trae el reconocimiento que mereces. El mundo literal o metafórico abre sus puertas para ti.",
      "health": "El cuerpo, la mente y el espíritu vibran en una armonía que rara vez se experimenta. Estás en uno de los mejores momentos vitales para tu bienestar integral."
    },
    "reversed": {
      "general": "Estás tan cerca de la meta que casi puedes tocarla, pero algo —quizás el perfeccionismo, quizás el miedo al éxito— te impide cruzar el umbral final. El oráculo te anima a dar ese último paso.",
      "love": "Pequeñas frustraciones o la resistencia a comprometerse plenamente están postergando lo que podría ser una relación extraordinaria.",
      "work": "Los proyectos están casi listos; los estudios están casi terminados. No cedas en el tramo final: la perseverancia en este último trecho marcará la diferencia.",
      "health": "El cuerpo refleja que falta algo por integrar. Atiende lo que se ha quedado sin resolver y el equilibrio pleno que buscas llegará."
    }
  },
  {
    "id": 22,
    "name": "As de Bastos",
    "keyThemes": "Fuego creador · Impulso vital · Nueva pasión · Semilla de acción · Voluntad divina.",
    "yesNoScore": 1,
    "yesNoText": "Sí, rotundo. Una semilla divina se ha plantado en tu camino y tiene toda la fuerza del cosmos para crecer.",
    "meanings": {
      "general": "El As de Bastos brota en tu lectura como una llamarada sagrada. Representa el chispazo de la creación, esa fuerza inicial que te empuja a emprender, a crear y a gritar 'aquí estoy'. Es una invitación del universo a no dudar de tu fuego interior: si sientes la llamada a iniciar algo nuevo, hazlo con la certeza de que el cosmos te provee de la madera necesaria.",
      "love": "En el amor, esta energía es dinamismo y deseo ardiente. Augura el nacimiento de un romance apasionado o una renovación eléctrica en tu relación actual. Se siente la atracción física y espiritual en su punto más ágil; atrévete a encender el juego de la seducción sin tapujos.",
      "work": "El oráculo visualiza un despegue creativo inmediato. Llegan proyectos llenos de entusiasmo, ideas innovadoras o la oportunidad de arrancar un negocio propio. Es el momento perfecto para proponer y tomar la iniciativa: tu entusiasmo es contagioso y abrirá puertas.",
      "health": "Tu vitalidad está en su punto de efervescencia. La energía física fluye con fuerza; es un gran momento para deportes dinámicos y actividades que despierten tu cuerpo del letargo. Respira hondo y canaliza este calor de forma constructiva."
    },
    "reversed": {
      "general": "El fuego se ahoga por falta de aire o exceso de prisa. El oráculo detecta ideas que se apagan antes de encenderse o una impaciencia que quema tus propios proyectos. Haz una pausa y busca el foco; no desperdicies tu energía vital en mil rumbos estériles.",
      "love": "La pasión inicial se enfría o se vuelve conflicto latente por diferencias de ritmo. Alguien está forzando las cosas o perdiendo el interés rápidamente. La chispa necesita aire y espacio para respirar.",
      "work": "Hay demoras en proyectos que parecían urgentes. El entusiasmo decae debido a la falta de planificación o a trabas externas. No tires la toalla; ajusta los cimientos antes de avivar la llama de nuevo.",
      "health": "Agotamiento físico o bajón de energía. Has gastado tus reservas con demasiada prisa y el cuerpo pide reposo. Evita los excesos y busca reconectarte con la tierra para equilibrar tu fuego."
    }
  },
  {
    "id": 23,
    "name": "Dos de Bastos",
    "keyThemes": "Planificación · Poder personal · Decisión en el umbral · Horizonte de espera · Visión del mañana.",
    "yesNoScore": 0,
    "yesNoText": "Es un momento de pausa y elección. El oráculo te pide equilibrar tus opciones antes de avanzar.",
    "meanings": {
      "general": "El Dos de Bastos te sitúa en la almena de tu propio castillo, sosteniendo el mundo en tus manos mientras observas el horizonte. Las bases ya están puestas, pero ahora debes decidir hacia dónde dirigir tu voluntad creadora. Es un arcano de madurez y de ambición controlada: el universo te pide que planifiques con calma antes de dar el gran salto exterior.",
      "love": "En tus vínculos, esta carta habla de proyectos a futuro y de la necesidad de alinear visiones comunes. Si estás soltero, es una fase de autodescubrimiento donde decides qué tipo de compañero merece tu luz. En pareja, planifiquen viajes o metas compartidas.",
      "work": "Se presentan opciones de expansión y alianzas importantes. Estás evaluando si quedarte en tu zona segura o cruzar las fronteras conocidas. La planificación estratégica será tu mejor aliada para tomar la decisión correcta.",
      "health": "Salud estable que se mantiene gracias al orden mental. El cuerpo responde bien a las rutinas y al descanso planificado. No descuides la vista y la postura al proyectar tu energía hacia el exterior."
    },
    "reversed": {
      "general": "El oráculo detecta indecisión paralizante o miedo a abandonar la comodidad del hogar conocido. Te estás limitando a observar la vida pasar en lugar de participar activamente en ella. La seguridad excesiva a veces es una jaula dorada.",
      "love": "Falta de metas comunes en la pareja o indecisión afectiva. Hay dudas sobre si seguir construyendo juntos o tomar caminos separados. La falta de comunicación sobre el futuro genera un estancamiento molesto.",
      "work": "Proyectos bloqueados por falta de previsión o por no querer asumir riesgos. Te sientes atado a un puesto o situación económica por miedo a lo desconocido. Es hora de recuperar tu poder personal.",
      "health": "El sedentarismo y la apatía minan tu energía. El cuerpo pide salir al aire libre y romper con la rutina cotidiana para activar la circulación de tu fuerza vital."
    }
  },
  {
    "id": 24,
    "name": "Tres de Bastos",
    "keyThemes": "Expansión · Visión lejana · Barcos que llegan · Liderazgo creativo · Progreso manifiesto.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el camino de la expansión está abierto. Tus visiones comienzan a materializarse en el plano real.",
    "meanings": {
      "general": "El Tres de Bastos canta la llegada del progreso. Has tomado tus decisiones y ahora contemplas cómo tus barcos navegan hacia el puerto del éxito. Tus proyectos no solo están vivos, sino que comienzan a expandirse más allá de lo que imaginaste. El universo te invita a mantener la mirada en lo alto y a confiar en la maduración de tus esfuerzos.",
      "love": "En el amor, esta energía habla de un horizonte luminoso y de la llegada de nuevas experiencias compartidas. Puede augurar relaciones a distancia que se consolidan o el inicio de una etapa afectiva más libre y aventurera.",
      "work": "Fase de expansión comercial, nuevas oportunidades laborales y reconocimiento de tu liderazgo. Tus esfuerzos del pasado empiezan a dar frutos tangibles; sigue sembrando con visión de largo plazo.",
      "health": "Tu vitalidad se expande y se renueva. Hay fuerza en tus músculos y claridad en tu mente. Excelente período para viajes de sanación, retiros o actividades en la naturaleza que ensanchen tus pulmones."
    },
    "reversed": {
      "general": "El oráculo advierte sobre barcos que se retrasan o expectativas frustradas por impaciencia. Puede haber una decepción temporal por no ver los resultados tan rápido como deseabas. Cultiva la paciencia del navegante.",
      "love": "Dificultades en relaciones a larga distancia o falta de sintonía en planes compartidos. El temor a la libertad del otro puede generar celos o distanciamiento emocional.",
      "work": "Los proyectos sufren demoras o problemas logísticos imprevistos. Te falta visión global o te estás perdiendo en detalles irrelevantes en lugar de enfocar el plan general. Recalibra el rumbo.",
      "health": "Cierto cansancio derivado de la espera o del estrés de planificar demasiados proyectos a la vez. Reduce tus compromisos y permite que el cuerpo asimile su propio ritmo."
    }
  },
  {
    "id": 25,
    "name": "Cuatro de Bastos",
    "keyThemes": "Celebración · Estabilidad gozosa · Armonía familiar · Hogar sagrado · Éxito compartido.",
    "yesNoScore": 1,
    "yesNoText": "Sí, las bases que has construido son seguras. Puedes confiar en la estabilidad de esta situación.",
    "meanings": {
      "general": "El Cuatro de Bastos es una guirnalda de flores que adorna tu vida. Es uno de los arcanos más benévolos de la baraja, representando la alegría del regreso a casa, la celebración de un logro merecido y la paz de sentirte rodeado de quienes amas. El universo te pide que te detengas a disfrutar de la belleza de lo que has construido.",
      "love": "Amor pleno, armonía y felicidad compartida. Es el arcano clásico de los compromisos, bodas y la creación de un hogar feliz. Si buscas pareja, augura un encuentro en un entorno festivo y de gran calidez.",
      "work": "Estabilidad laboral e ingresos que te permiten relajarte. Hay un ambiente de colaboración óptimo y tus méritos son celebrados por tus compañeros y superiores. Buen momento para festejar metas cumplidas.",
      "health": "Bienestar radiante y cuerpo en plena armonía. Te sientes fuerte y en paz. Es un gran ciclo para disfrutar de la buena mesa y de momentos de ocio con moderación, nutriendo el alma tanto como el cuerpo."
    },
    "reversed": {
      "general": "La fiesta se empaña por pequeñas tensiones domésticas o una incapacidad de disfrutar tus propios éxitos. Aunque las bases son sólidas, hay una insatisfacción silenciosa que te impide relajarte por completo.",
      "love": "Pequeños roces en el ámbito familiar o de pareja que dificultan la convivencia pacífica. La armonía exterior oculta pequeñas demandas no expresadas que deben ser conversadas.",
      "work": "La estabilidad está asegurada, pero el clima laboral se siente tenso o poco estimulante. Cuidado con caer en la autocomplacencia; no dejes que el éxito del pasado te impida seguir creciendo.",
      "health": "Pequeños desajustes digestivos o fatiga acumulada tras períodos de fiesta o excesos en el autocuidado. El cuerpo te pide volver al orden y a los hábitos sencillos."
    }
  },
  {
    "id": 26,
    "name": "Cinco de Bastos",
    "keyThemes": "Competencia · Conflicto de ideas · Tormenta creativa · Rivalidad sana · Esfuerzo de adaptación.",
    "yesNoScore": -1,
    "yesNoText": "No en este momento. Hay un conflicto o pérdida latente que requiere tu aprendizaje antes de avanzar.",
    "meanings": {
      "general": "El Cinco de Bastos muestra a varios jóvenes cruzando sus varas en una lucha que parece más un entrenamiento o debate que una guerra destructiva. Este arcano representa la tensión del crecimiento: la competencia, el intercambio energético y la necesidad de afirmar tus ideas ante los demás. El universo te dice que no temas al conflicto constructivo: de la fricción nace la luz.",
      "love": "Roces cotidianos, debates apasionados o pequeñas rivalidades en la pareja. No hay maldad, sino una necesidad de marcar espacios individuales. Si estás soltero, puede que compitas con otros por la atención de alguien; mantén tu autenticidad.",
      "work": "Lluvia de ideas intensa, competencia en el entorno laboral o necesidad de destacar en un proceso de selección. Aunque el ambiente se sienta competitivo, tienes el ingenio necesario para salir adelante si actúas con ética.",
      "health": "Tensión acumulada en los músculos debido a la competencia diaria o al estrés. El cuerpo pide liberar adrenalina de forma segura: el deporte de contacto o los ejercicios de alta intensidad te vendrán de maravilla."
    },
    "reversed": {
      "general": "El conflicto ha dejado de ser constructivo y se ha vuelto una lucha caótica y desgastante. El oráculo detecta discusiones estériles donde nadie escucha y todos quieren tener la razón. Es momento de bajar las armas.",
      "love": "Discusiones destructivas o luchas de poder que desgastan el amor. Alguien está actuando con terquedad defensiva. Den un paso atrás antes de herirse mutuamente.",
      "work": "Intrigas laborales, sabotaje o falta de coordinación en el equipo de trabajo. Los proyectos se atascan debido a discusiones de egos. Busca el consenso o retírate del drama.",
      "health": "Agotamiento por exceso de estrés y peleas cotidianas. Tu sistema inmunológico se resiente cuando mantienes la mente en estado de alerta constante. Busca el silencio y el descanso."
    }
  },
  {
    "id": 27,
    "name": "Seis de Bastos",
    "keyThemes": "Victoria brillante · Reconocimiento · Triunfo público · Corona de laureles · Confianza recuperada.",
    "yesNoScore": 1,
    "yesNoText": "Sí, la luz regresa. Se augura un triunfo legítimo o un intercambio justo que sanará tu corazón.",
    "meanings": {
      "general": "El Seis de Bastos te muestra cabalgando entre la multitud, portando una vara coronada de laurel. Es el arcano del éxito reconocido, de los honores legítimos y de la superación de las pruebas del camino. El universo corona tu perseverancia y te invita a disfrutar del aplauso ajeno, pero recordando mantener el corazón humilde ante la victoria.",
      "love": "Amor victorioso y correspondido. Si has atravesado dificultades de pareja, esta energía augura reconciliación y el triunfo del afecto. Si buscas pareja, tu magnetismo personal está en su punto ágil: atraerás miradas de admiración.",
      "work": "Éxito profesional sobresaliente: ascensos, aumentos, proyectos aprobados con honores o victoria en litigios y concursos. Tu liderazgo es valorado y te conviertes en un referente en tu ámbito.",
      "health": "Excelente salud y recuperación de cualquier dolencia anterior. La fuerza vital regresa a tus células de forma luminosa; te sientes lleno de vigor, belleza y prestancia física."
    },
    "reversed": {
      "general": "La victoria se demora o el reconocimiento que recibes se siente vacío. El oráculo detecta sombras de orgullo excesivo, vanidad o una caída de tu posición de liderazgo debido a la autocomplacencia.",
      "love": "Problemas de ego en la relación. Uno de los dos busca el protagonismo absoluto o ignora las necesidades del otro para alimentar su propia vanidad. La humildad y la escucha sanarán el vínculo.",
      "work": "Falta de apoyo de tu equipo o retraso en recibir el reconocimiento que mereces. Puede que alguien más se esté atribuyendo tus méritos. Mantén la calma y defiende tu labor con profesionalismo.",
      "health": "Pérdida temporal de vitalidad debido al desgaste de mantener una imagen perfecta ante el mundo. Libera la presión social y permite que tu cuerpo descanse en privado."
    }
  },
  {
    "id": 28,
    "name": "Siete de Bastos",
    "keyThemes": "Defensa del territorio · Coraje · Resistencia firme · Mantenerse firme · Ventaja moral.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero requerirá tu coraje y una estrategia inteligente. Mantén tu posición con firmeza.",
    "meanings": {
      "general": "El Siete de Bastos te sitúa en la cima de una colina, defendiendo tu posición contra fuerzas que intentan desafiarte desde abajo. Sostienes la vara con firmeza y tus pies están bien asentados. Este arcano es una llamada al valor y a la resistencia: aunque te sientas presionado, tienes la ventaja moral y la fuerza para prevalecer. No cedas ni un milímetro de tu verdad.",
      "love": "Estás defendiendo tu relación de interferencias familiares o externas con gran valentía. Si estás soltero, esta energía te invita a poner límites claros y a no conformarte con menos de lo que mereces por temor a la soledad.",
      "work": "Enfrentas retos importantes en tu carrera profesional, críticas o competencia agresiva. Mantén tu postura y defiende tus proyectos con argumentos sólidos; tu determinación será tu mayor escudo.",
      "health": "El sistema de defensas del cuerpo está activo y alerta. Si has estado enfermo, tu organismo lucha con eficacia para recuperar su equilibrio. Ayúdale con una alimentación pura y pensamientos de poder."
    },
    "reversed": {
      "general": "El cansancio hace mella en tu defensa y sientes el impulso de rendirte ante la presión exterior. El oráculo te pide que revises si la lucha sigue teniendo sentido o si estás defendiendo una causa perdida por mero orgullo.",
      "love": "Inseguridad en el vínculo afectivo. Te sientes a la defensiva de forma constante, interpretando cada comentario de tu pareja como un ataque. Baja la guardia para permitir el encuentro real.",
      "work": "Te sientes abrumado por las demandas de tu puesto o por la hostilidad en el entorno laboral. Puede que sea momento de buscar mediación o de replantearte si ese lugar honra tus esfuerzos.",
      "health": "Defensas bajas por exceso de tensión física y emocional. El cuerpo está agotado de luchar en tantos frentes. Prioriza el descanso, el sueño reparador y los suplementos naturales."
    }
  },
  {
    "id": 29,
    "name": "Ocho de Bastos",
    "keyThemes": "Velocidad pura · Mensajes del cosmos · Movimiento rápido · Viaje inminente · Flechas de amor.",
    "yesNoScore": 1,
    "yesNoText": "Sí, y llegará con gran velocidad. Prepárate para moverte rápido y adaptarte al cambio.",
    "meanings": {
      "general": "El Ocho de Bastos muestra ocho varas volando por el aire en trayectoria descendente, a punto de tocar tierra. Todo se acelera en tu vida: los retrasos terminan, las noticias que esperabas llegan de golpe y el estancamiento da paso a un torbellino de acontecimientos rápidos. El universo te pide que afines tus reflejos para capturar las oportunidades al vuelo.",
      "love": "Amor rápido y repentino. Declaraciones inesperadas, mensajes apasionados que cambian el rumbo del día o un flechazo instantáneo que te roba el aliento. Déjate llevar por el fluir del romance.",
      "work": "Comunicaciones fluidas, llamadas urgentes, propuestas comerciales inmediatas y viajes de negocios productivos. Los proyectos que estaban paralizados avanzan a paso de gigante; es tiempo de acción ágil.",
      "health": "Flujo de energía vital acelerado y vigoroso. Las funciones del cuerpo se agilizan y los procesos de recuperación son sorprendentemente rápidos. Excelente momento para actividades dinámicas y dinámicas deportivas."
    },
    "reversed": {
      "general": "La prisa se convierte en caos y las flechas caen desordenadas. El oráculo advierte sobre malentendidos por mensajes redactados con prisa o accidentes leves por actuar de forma atolondrada. Reduce la velocidad.",
      "love": "Impaciencia emocional que asusta al otro o promesas hechas al calor del momento que luego no se cumplen. Los celos o las sospechas se expanden rápido debido a la falta de comunicación serena.",
      "work": "Retrasos imprevistos en comunicaciones críticas o cancelación de viajes planificados. Los proyectos se dispersan por querer abarcar demasiadas cosas a la vez con prisa. Organiza tus tareas.",
      "health": "Tensión, hiperactividad o problemas para conciliar el sueño debido a una mente que gira a mil revoluciones por minuto. Practica meditación y ejercicios de respiración para calmar el sistema."
    }
  },
  {
    "id": 30,
    "name": "Nueve de Bastos",
    "keyThemes": "Resiliencia · Última línea de defensa · Fortaleza del alma · Cansancio pero constancia · Guardia alta.",
    "yesNoScore": 1,
    "yesNoText": "Sí, estás a un solo paso de tu meta. Sostén tu energía y confía en tu inmensa fortaleza.",
    "meanings": {
      "general": "El Nueve de Bastos muestra a un guerrero con la cabeza vendada, apoyado en su vara, mirando con recelo pero sin rendirse detrás de una empalizada de ocho varas fijas. Has librado muchas batallas y estás cansado, pero el oráculo te recuerda que tu fortaleza es inmensa. Estás a punto de cruzar el umbral del éxito; resiste este último tramo con honor.",
      "love": "Miras el amor con cautela debido a heridas del pasado que aún no han sanado del todo. Aunque te proteges con celo, la energía de esta carta te anima a no cerrar la puerta del todo: tu corazón es fuerte y sabrá discernir.",
      "work": "Etapa de mucha presión laboral o financiera donde debes sostener la posición a pesar del cansancio. Tu persistencia y profesionalismo te mantendrán a flote; el éxito llegará a quienes no abandonen.",
      "health": "Capacidad de resistencia física notable a pesar de la fatiga acumulada. Si estás en un proceso de recuperación médica, sigue adelante con tu tratamiento: el cuerpo tiene la memoria y la fuerza para sanar."
    },
    "reversed": {
      "general": "La terquedad te impide ver que la batalla ya ha terminado o te estás defendiendo de enemigos imaginarios. El oráculo te pide que sueltes la empalizada: no todo el mundo busca herirte, y la desconfianza crónica te aísla.",
      "love": "Barreras emocionales infranqueables en el vínculo. Te niegas a perdonar viejos roces o a abrirte de verdad por miedo a que se repita la historia. La sanación requiere vulnerabilidad.",
      "work": "Agotamiento absoluto (burnout) por intentar resistir en un entorno laboral insostenible. No confundas persistencia con terquedad estéril; a veces, retirarse a tiempo es la mayor victoria.",
      "health": "Colapso de las reservas de energía debido a la tensión prolongada. El cuerpo exige que bajes la guardia y te permitas descansar de verdad antes de que el estrés provoque una dolencia mayor."
    }
  },
  {
    "id": 31,
    "name": "Diez de Bastos",
    "keyThemes": "Carga pesada · Sobreesfuerzo · Responsabilidad extrema · Agotamiento · Final del trayecto.",
    "yesNoScore": 0,
    "yesNoText": "Sí, pero ten cuidado con las cargas excesivas. El ciclo se completa, es momento de liberar peso.",
    "meanings": {
      "general": "El Diez de Bastos muestra a un hombre encorvado bajo el peso de diez varas que carga hacia una ciudad lejana. Has asumido demasiados compromisos y responsabilidades, y el camino se ha vuelto una tortura. El universo te recuerda que, aunque tu voluntad sea inmensa, no puedes cargarlo todo solo. Es hora de delegar o soltar cargas ajenas antes de quebrarte.",
      "love": "El amor se siente como un deber pesado o una carga en lugar de un refugio de paz. Estás asumiendo toda la responsabilidad de sostener la relación o de cuidar al otro, descuidando tus propias necesidades vitales.",
      "work": "Exceso de tareas, horas extras no compensadas y una presión económica asfixiante. Has querido demostrar que puedes con todo, pero has llegado a tu límite físico. Habla con tu equipo y redistribuye labores.",
      "health": "Dolores de espalda, tensión en hombros y cuello, y un cansancio generalizado que no se quita durmiendo. Tu cuerpo grita que alivies el peso diario. Escucha a tu columna y reduce tu agenda laboral."
    },
    "reversed": {
      "general": "El peso se vuelve insostenible y la carga se desparrama por el suelo. El oráculo señala que el colapso ya está aquí o que estás a punto de soltar conscientemente responsabilidades que no te corresponden. Siente el alivio.",
      "love": "Ruptura de la dinámica de codependencia o liberación de un vínculo tóxico que te consumía. Decides que ya no es tu deber salvar a nadie más y vuelves a cuidar de tu propia vida.",
      "work": "Decides delegar tareas de forma drástica o renunciar a un puesto que destruía tu salud por exceso de exigencias. Es una liberación necesaria para tu futuro profesional y financiero.",
      "health": "Alivio progresivo de las tensiones físicas al incorporar terapias corporales, masajes y, sobre todo, límites claros en tu vida diaria. La ligereza regresa a tus articulaciones."
    }
  },
  {
    "id": 32,
    "name": "Sota de Bastos",
    "keyThemes": "Mensajero entusiasta · Chispa de aventura · Curiosidad juvenil · Noticia inspiradora · Potencial lúdico.",
    "yesNoScore": 1,
    "yesNoText": "Sí, una noticia refrescante o una nueva oportunidad de aprendizaje viene hacia ti.",
    "meanings": {
      "general": "La Sota de Bastos contempla con fascinación su vara florecida, en medio de un desierto dorado. Trae la energía del explorador, el mensajero de buenas nuevas y el aprendiz entusiasta que no teme equivocarse. El universo te envía una dosis de curiosidad y juego: abraza las ideas que te despierten una sonrisa sin preocuparte aún por su rentabilidad.",
      "love": "Amor juguetón, coqueteos frescos y mensajes que traen risas y complicidad. Si buscas pareja, augura un encuentro con alguien con espíritu de niño, aventurero y con una conversación chispeante y ligera.",
      "work": "El nacimiento de un proyecto creativo que te devuelve la ilusión por tu labor. Puede llegar una propuesta de estudios, un taller o una oferta de trabajo junior que te permitirá explorar nuevos talentos.",
      "health": "Energía vital fresca y ágil. Te sientes rejuvenecer internamente; tu cuerpo pide movimiento lúdico como el baile, el juego o paseos espontáneos. Excelente período para renovar tu imagen y tu espíritu."
    },
    "reversed": {
      "general": "El oráculo detecta entusiasmo de corta duración o dispersión infantil. Te dejas llevar por impulsos pasajeros que dejas a medias al primer obstáculo. Falta madurez y constancia para materializar el fuego.",
      "love": "Promesas inmaduras o un pretendiente inconstante que busca solo el juego de la conquista y huye ante el menor compromiso real. No pongas tu corazón en manos de quien no sabe lo que quiere.",
      "work": "Falta de seriedad en proyectos que requieren disciplina. Hay retrasos en comunicaciones o ideas mal fundamentadas que se caen por falta de investigación previa. Ve con más rigor profesional.",
      "health": "Pequeños accidentes por descuido o falta de atención al mover el cuerpo. Regula tu hiperactividad y evita actuar con prisa innecesaria al realizar actividades físicas."
    }
  },
  {
    "id": 33,
    "name": "Caballero de Bastos",
    "keyThemes": "Búsqueda apasionada · Impulsividad · Acción audaz · Viaje apresurado · Fuego que avanza.",
    "yesNoScore": 1,
    "yesNoText": "Sí, lánzate a la acción. El movimiento decidido y el valor te traerán lo que buscas.",
    "meanings": {
      "general": "El Caballero de Bastos cabalga a toda velocidad sobre su corcel de fuego, portando su vara como una lanza. Representa la acción pura, la audacia de quien se lanza a la aventura sin mirar atrás y la pasión que no admite demoras. El universo te inyecta el coraje necesario para dar un paso drástico en tu vida; cabalga con fe en tu propio valor.",
      "love": "Romance intenso, directo y lleno de magnetismo erótico. Alguien irrumpe en tu vida como un torbellino de fuego, proponiéndote una aventura inolvidable. Goza del viaje con pasión, pero mantén un ancla en la tierra.",
      "work": "Decisiones rápidas, viajes imprevistos altamente productivos y una audacia que te permite cerrar tratos difíciles o adelantar a la competencia. Confía en tus corazonadas y actúa sin vacilar.",
      "health": "Vitalidad y fuerza física arrolladora. Te sientes capaz de comerte el mundo; canaliza esta potencia a través de deportes intensos, danza o actividades que exijan el máximo rendimiento de tu cuerpo."
    },
    "reversed": {
      "general": "La audacia se ha vuelto temeridad irracional o impaciencia destructiva. El oráculo detecta una prisa innecesaria que puede generar conflictos o accidentes. El fuego descontrolado quema el bosque en lugar de dar luz.",
      "love": "Relación inestable y tempestuosa donde los celos o la impaciencia emocional provocan discusiones frecuentes. Alguien busca solo la adrenalina del momento y teme echar raíces afectivas.",
      "work": "Riesgos financieros tomados con ligereza o conflictos en el trabajo por actitudes arrogantes y apresuradas. El oráculo te pide detener el caballo y revisar la viabilidad del plan.",
      "health": "Agotamiento repentino por forzar el cuerpo más allá de sus límites reales. Cuidado con lesiones musculares o tirones por falta de calentamiento previo. Calma el galope."
    }
  },
  {
    "id": 34,
    "name": "Reina de Bastos",
    "keyThemes": "Magnetismo · Confianza solar · Calidez nutridora · Independencia creadora · Alegría de vivir.",
    "yesNoScore": 1,
    "yesNoText": "Sí, confía en tu poder magnético y en tu sabiduría receptiva. Atraerás lo que es tuyo por derecho.",
    "meanings": {
      "general": "La Reina de Bastos se sienta en su trono adornado con leones y girasoles, sosteniendo una vara y una flor con un gato negro a sus pies. Su mirada irradia confianza, calor y un magnetismo solar inmenso. El universo te pide que te sitúes en tu propio trono: eres dueño de tu destino, posees una belleza radiante y tienes la capacidad de nutrir a tu entorno con tu alegría.",
      "love": "Amor correspondido, sensualidad plena y un vínculo basado en el respeto a la independencia de cada uno. Si buscas amor, tu magnetismo personal está en su apogeo: muéstrate con orgullo y naturalidad.",
      "work": "Liderazgo carismático y éxito en proyectos creativos u organizativos. Tu presencia inspira confianza y tu capacidad de trabajo es inmensa. Buen período para emprender o liderar equipos humanos.",
      "health": "Salud vibrante y una gran sintonía con las necesidades de tu cuerpo. Tu energía es contagiosa e inspira a otros a cuidarse. Excelente momento para actividades creativas y al aire libre."
    },
    "reversed": {
      "general": "El oráculo percibe inseguridad disfrazada de arrogancia o una actitud controladora y celosa hacia el entorno. Puede que estés cediendo tu luz al permitir que el miedo o el resentimiento apaguen tu girasol.",
      "love": "Dinámicas de celos, drama innecesario o manipulación afectiva en la pareja. Uno de los dos busca llamar la atención de forma constante a costa de la paz del otro. Cultiva la autovaloración.",
      "work": "Conflictos con colegas debido a actitudes autoritarias o a una competitividad mal enfocada. Revisa si estás liderando desde la inspiración o desde el miedo a perder tu posición.",
      "health": "Desequilibrio energético debido a altibajos emocionales. Puedes sufrir fatiga por intentar sostener la vida de todos a tu alrededor. Recuerda que tu primer deber es contigo misma."
    }
  },
  {
    "id": 35,
    "name": "Rey de Bastos",
    "keyThemes": "Visión inspiradora · Liderazgo maestro · Emprendedor nato · Voluntad madura · Generosidad señorial.",
    "yesNoScore": 1,
    "yesNoText": "Sí, actúa con la nobleza y firmeza de un líder. El orden y la maestría te garantizan el éxito.",
    "meanings": {
      "general": "El Rey de Bastos observa su reino desde un trono sobrio pero poderoso. Ha integrado el fuego de la juventud en una voluntad madura, sabia y generosa. Es el arcano del líder que no necesita gritar para ser escuchado, el visionario que abre caminos para los demás. El universo te pide que actúes con la nobleza e integridad de quien conoce su propio poder.",
      "love": "Un amor sólido, protector y apasionado. La relación se basa en la lealtad absoluta y el apoyo mutuo en las metas de vida. Si buscas pareja, augura la llegada de alguien maduro, seguro y de gran corazón.",
      "work": "Éxito comercial sobresaliente, capacidad de fundar empresas o de liderar grandes proyectos con visión a largo plazo. Tu palabra es respetada y tus inversiones tienden a dar frutos estables.",
      "health": "Vigor físico y salud de hierro sostenida en el tiempo. Tu energía vital está anclada en hábitos sabios y en una mente serena que sabe cómo gestionar la tensión del día a día."
    },
    "reversed": {
      "general": "El liderazgo se tuerce en tiranía o arrogancia estéril. El oráculo detecta terquedad, falta de compasión hacia los colaboradores o decisiones comerciales impulsivas tomadas desde el orgullo herido.",
      "love": "El orgullo y la falta de flexibilidad están creando una brecha en la pareja. Las discusiones se estancan porque nadie quiere ceder o disculparse. El amor pide derretir el hielo del ego.",
      "work": "Problemas en el entorno laboral por decisiones despóticas o falta de planificación real a pesar de las grandes promesas. Recalibra tus metas y escucha los consejos sabios de tu equipo.",
      "health": "Riesgo de problemas cardiovasculares o hipertensión por exceso de estrés y no saber soltar el control del trabajo. Tu cuerpo te pide que delegues y respires con calma."
    }
  },
  {
    "id": 36,
    "name": "As de Copas",
    "keyThemes": "Amor incondicional · Manantial de emociones · Intuición sagrada · Bendición del alma · Nueva comunión.",
    "yesNoScore": 1,
    "yesNoText": "Sí, rotundo. Una semilla divina se ha plantado en tu camino y tiene toda la fuerza del cosmos para crecer.",
    "meanings": {
      "general": "El As de Copas flota sobre las aguas, con una copa rebosante de la que brotan cinco chorros de agua pura que alimentan un estanque con flores de loto. Es el manantial sagrado de los sentimientos, el nacimiento de un amor puro o una paz espiritual inmensa. El universo abre tu corazón para que recibas y viertas afecto sin condiciones ni temores.",
      "love": "Amor en su estado más puro e inspirador. Puede significar el inicio de una relación de almas afines, la reconciliación total tras una crisis o la llegada de un sentimiento de comunión profunda y gozosa en tu vida.",
      "work": "Proyectos artísticos o laborales que nacen de una verdadera vocación y amor por lo que haces. Las relaciones con compañeros se basan en la empatía y la ayuda mutua; ambiente laboral armónico.",
      "health": "Sanación emocional y física profunda. Tu energía vital fluye limpia como el agua de manantial; excelente momento para desintoxicar el organismo, terapias de agua y meditación devocional."
    },
    "reversed": {
      "general": "El manantial se estanca o la copa se vuelca, derramando la energía emocional en el vacío. El oráculo detecta un vacío interno, sequedad afectiva o una tendencia a reprimir lo que sientes por miedo a ser herido.",
      "love": "Bloqueo emocional en el vínculo o desilusión amorosa. Sientes que das mucho más afecto del que recibes, lo que te genera un vacío silencioso. Es tiempo de nutrir primero tu propio amor propio.",
      "work": "Falta de motivación o inspiración en tus tareas diarias. Sientes que realizas un trabajo vacío de sentido para ti. Busca proyectos que conecten con tu sensibilidad o tu creatividad.",
      "health": "Desequilibrio de líquidos en el cuerpo o somatización de emociones reprimidas en forma de cansancio o tristeza. Permítete llorar y liberar la tensión contenida."
    }
  },
  {
    "id": 37,
    "name": "Dos de Copas",
    "keyThemes": "Unión sagrada · Alianza de almas · Afinidad mutua · Reconciliación · Pacto del corazón.",
    "yesNoScore": 0,
    "yesNoText": "Es un momento de pausa y elección. El oráculo te pide equilibrar tus opciones antes de avanzar.",
    "meanings": {
      "general": "El Dos de Copas muestra a dos jóvenes brindando con sus copas bajo el caduceo de Hermes y la cabeza de un león alado. Es el arcano del encuentro sagrado, la atracción mutua y la armonía perfecta entre dos voluntades. El universo bendice tus alianzas y te invita a construir puentes basados en la reciprocidad, la escucha y el afecto sincero.",
      "love": "El amor correspondido en su máxima expresión. Augura el inicio de un noviazgo feliz, la consolidación de la pareja o un entendimiento mutuo exquisito. Hay equilibrio en el dar y recibir afecto.",
      "work": "Asociaciones comerciales prósperas basadas en la confianza y el beneficio mutuo. Las negociaciones fluyen de forma natural y los acuerdos se firman con alegría. Excelente trabajo en equipo.",
      "health": "Equilibrio físico y mental óptimo. La sintonía con las personas de tu entorno tiene un efecto directo y sanador sobre tu sistema nervioso. Te sientes en paz y en armonía con tu cuerpo."
    },
    "reversed": {
      "general": "La comunicación se quiebra o la balanza afectiva se desequilibra. El oráculo detecta malentendidos en tus alianzas, distanciamiento frío o una falta de reciprocidad que duele en silencio.",
      "love": "Fricciones en la pareja por falta de empatía o malentendidos menores que se agrandan por orgullo. La desconfianza empieza a enturbiar el agua limpia del vínculo; siéntense a hablar con el corazón abierto.",
      "work": "Ruptura de acuerdos comerciales o tensiones con tu socio o compañero de tareas. No firmes contratos sin revisar las letras pequeñas; asegúrate de que el trato sea verdaderamente justo.",
      "health": "Somatización de tensiones afectivas. El estrés de las relaciones difíciles repercute en tu estómago o pecho; busca espacios de soledad para recuperar tu propio centro energético."
    }
  },
  {
    "id": 38,
    "name": "Tres de Copas",
    "keyThemes": "Celebración compartida · Círculo de apoyo · Amistad verdadera · Abundancia social · Gozo de vivir.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el camino de la expansión está abierto. Tus visiones comienzan a materializarse en el plano real.",
    "meanings": {
      "general": "El Tres de Copas muestra a tres mujeres danzando en un círculo con sus copas en alto, rodeadas de flores y frutos de la tierra. Representa la alegría de la amistad verdadera, la sororidad, el compartir comunitario y el gozo de celebrar la vida con quienes te sostienen. El universo te pide que busques tu círculo de apoyo y brindes por el camino recorrido.",
      "love": "Amistad que se transforma en amor, o una relación de pareja que cuenta con el apoyo alegre de amigos y familiares. Si buscas amor, los eventos sociales, fiestas y reuniones grupales serán tu mejor escenario.",
      "work": "Trabajo en equipo armónico y productivo. Los logros se celebran de forma grupal y hay un ambiente de compañerismo muy grato. Proyectos colaborativos y artísticos altamente favorecidos.",
      "health": "Salud fuerte que se nutre del bienestar social. El compartir con otros, la risa y el afecto comunitario elevan tus defensas naturales y te devuelven el vigor físico. Celébralo sin excesos."
    },
    "reversed": {
      "general": "El círculo se distorsiona en cotilleo o excesos festivos que agotan tu energía. El oráculo detecta que estás descuidando tu vida privada por un deseo de aprobación social o rodeándote de amistades superficiales.",
      "love": "Terceras personas interfiriendo en el vínculo sentimental o celos infundados en el grupo de amigos. Asegúrate de que las opiniones ajenas no afecten las decisiones íntimas de tu pareja.",
      "work": "Falta de coordinación en tareas grupales por exceso de distracción o charlas estériles. Alguien en el equipo no está asumiendo su responsabilidad, recargando a los demás. Pongan orden.",
      "health": "Agotamiento físico por excesos en la alimentación, el alcohol o la falta de horas de sueño reparador. Tu cuerpo te pide moderación y un período de desintoxicación suave."
    }
  },
  {
    "id": 39,
    "name": "Cuatro de Copas",
    "keyThemes": "Apatía temporal · Contemplación · Oportunidad velada · Descontento interior · Retiro del deseo.",
    "yesNoScore": 1,
    "yesNoText": "Sí, las bases que has construido son seguras. Puedes confiar en la estabilidad de esta situación.",
    "meanings": {
      "general": "El Cuatro de Copas muestra a un joven sentado bajo un árbol con los brazos cruzados, mirando tres copas en el césped mientras ignora una cuarta copa que le ofrece una mano misteriosa desde una nube. Representa el aburrimiento, la apatía o la ceguera ante los regalos del cosmos debido al descontento interno. El universo te pide que mires más allá de tu insatisfacción: la ayuda está cerca.",
      "love": "Rutina o desinterés temporal en la pareja. Te sientes aburrido del vínculo o nostálgico del pasado, ignorando los gestos de afecto del presente. Si estás soltero, puedes estar cerrado a nuevas opciones afectivas por aferrarte a un recuerdo.",
      "work": "Desmotivación en tus tareas profesionales. Sientes que has tocado un techo o que el trabajo carece de estímulos intelectuales y emocionales. Revisa si hay propuestas o caminos que estás descartando sin analizar.",
      "health": "Cierto letargo vital y falta de tono muscular. El cuerpo responde a una mente aburrida y desanimada. Un cambio ligero en tu dieta o incorporar paseos cotidianos ayudará a romper el bucle de la apatía."
    },
    "reversed": {
      "general": "Despiertas del letargo. El oráculo detecta que estás volviendo a abrir los ojos al entorno, dispuesto a aceptar la copa que te ofrece la vida. El estancamiento emocional termina y recuperas las ganas de actuar.",
      "love": "Decides salir de la rutina afectiva o abrir el corazón a nuevas personas tras una fase de aislamiento nostálgico. La pareja se renueva al buscar juntos nuevos intereses y proyectos.",
      "work": "Recuperas la iniciativa laboral. Empiezas a notar opciones de progreso que habías ignorado y te muestras receptivo a sugerencias y ofertas profesionales externas. El flujo vuelve.",
      "health": "La vitalidad regresa a medida que cambia tu actitud mental. Decides cuidar tu bienestar de forma activa, buscando asesoramiento profesional o cambiando hábitos nocivos con constancia."
    }
  },
  {
    "id": 40,
    "name": "Cinco de Copas",
    "keyThemes": "Pérdida y duelo · Lamento del ayer · Copas que quedan en pie · Esperanza velada · Transición emocional.",
    "yesNoScore": -1,
    "yesNoText": "No en este momento. Hay un conflicto o pérdida latente que requiere tu aprendizaje antes de avanzar.",
    "meanings": {
      "general": "El Cinco de Copas muestra a una figura envuelta en un manto oscuro, contemplando con pesar tres copas derramadas mientras da la espalda a dos copas que permanecen en pie tras ella con un puente hacia un castillo al fondo. Es el arcano del duelo y del lamento por el pasado. El universo acoge tu dolor con compasión, pero te recuerda con dulzura: no todo se ha perdido, date la vuelta.",
      "love": "Tristeza por una ruptura afectiva o por expectativas rotas en la pareja. Estás concentrado en lo que salió mal o en lo que el otro no te dio, descuidando el afecto que aún te rodea y la posibilidad de sanar.",
      "work": "Pérdidas económicas o proyectos frustrados que te generan desánimo. El oráculo te aconseja no estancarte en el lamento por la inversión perdida; analiza los recursos que te quedan y cruza el puente.",
      "health": "La melancolía y la pena restan fuerza a tu organismo. Tu sistema inmune es vulnerable ante la tristeza prolongada. Busca el apoyo de seres queridos o profesionales para procesar el dolor de forma sana."
    },
    "reversed": {
      "general": "El duelo comienza a disiparse. El oráculo detecta que decides darte la vuelta y ver las copas que quedan en pie. Empiezas a cruzar el puente de la reconciliación y a mirar el futuro con una luz de esperanza.",
      "love": "El corazón sana tras una herida de amor. Decides perdonar los agravios del pasado y abrirte a la posibilidad de reconstruir tu vida afectiva, ya sea con tu pareja actual o con una nueva conexión.",
      "work": "Superas un fracaso laboral anterior. Dejas ir la queja por el negocio fallido y empiezas a usar los recursos y aprendizajes restantes para emprender una nueva andadura con más sabiduría.",
      "health": "Recuperación de la vitalidad a medida que liberas el dolor emocional contenido. El pecho se ensancha, la respiración es más fluida y el organismo recupera su fuerza natural de regeneración."
    }
  },
  {
    "id": 41,
    "name": "Seis de Copas",
    "keyThemes": "Seis de Copas · Agua · victoria · armonía y reciprocidad.",
    "yesNoScore": 1,
    "yesNoText": "Sí, la luz regresa. Se augura un triunfo legítimo o un intercambio justo que sanará tu corazón.",
    "meanings": {
      "general": "Seis de Copas se manifiesta en tu tirada como una llamada a sentir con el corazón libre. Esta energía representa la influencia del agua en tu camino, recordándote que todo gran viaje empieza con un paso firme y consciente. El universo te pide que prestes atención a la sabiduría del día a día, pues en los pequeños gestos reside la clave de tu realización material y espiritual.",
      "love": "En el ámbito del afecto, esta carta sugiere un período de aprendizaje sincero. Si buscas pareja, el oráculo te aconseja sintonizar con tu propia vibración y autenticidad; si ya compartes tu vida con alguien, es momento de cultivar la empatía y la paciencia, permitiendo que la corriente fluya sin forzar compases.",
      "work": "Tus proyectos profesionales y financieros entran en una fase de desarrollo donde la constancia dará frutos estables. No te apresures; el camino del éxito duradero se esculpe paso a paso, honrando los acuerdos y trabajando con integridad. Se avecinan opciones interesantes si te mantienes receptivo.",
      "health": "El cuerpo físico te pide regresar a ritmos más naturales y sencillos. Escucha las demandas de descanso de tus células, incorpara alimentos puros y paseos que te enraícen con la tierra. La salud es el reflejo directo del alma en paz."
    },
    "reversed": {
      "general": "Seis de Copas invertido sugiere un bloqueo de energía en la esfera del agua. Te estás resistiendo a ver las circunstancias con objetividad, o estás actuando con un exceso de impaciencia que disipa tus fuerzas. El oráculo aconseja detener el galope mental y volver a tu centro antes de seguir adelante.",
      "love": "Hay pequeños malentendidos en el terreno afectivo. El orgullo o el temor a la vulnerabilidad están creando una distancia innecesaria en la relación. Abre el diálogo honesto y permite que se caiga la máscara del ego.",
      "work": "Fase de demoras o gastos imprevistos que te exigen orden y prudencia. No tomes decisiones financieras precipitadas ni te dejes llevar por falsas promesas de ganancias rápidas. Asegura los cimientos de tu labor.",
      "health": "El cuerpo refleja el cansancio acumulado por las tensiones emocionales y el estrés diario. Tu sistema inmunológico pide que bajes la guardia y te regales momentos de verdadero silencio y reposo reparador."
    }
  },
  {
    "id": 42,
    "name": "Siete de Copas",
    "keyThemes": "Ilusiones múltiples · Elecciones del deseo · Castillos en el aire · Confusión mental · Espejismos del alma.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero requerirá tu coraje y una estrategia inteligente. Mantén tu posición con firmeza.",
    "meanings": {
      "general": "El Siete de Copas muestra a una figura de espaldas ante una nube cargada de siete copas rebosantes de visiones: joyas, dragones, castillos, serpientes, coronas. Representa la tentación de la imaginación desbocada, los deseos múltiples y la confusión de no saber qué es real y qué es mero espejismo. El universo te pide que bajes a la tierra y elijas con la guía del discernimiento.",
      "love": "Fantasías excesivas sobre el amor o la pareja ideal. Sientes atracción por múltiples personas pero sin concretar un compromiso real. Si estás en pareja, cuidado con crear castillos en el aire que no coinciden con la persona real a tu lado.",
      "work": "Muchas ideas interesantes en el papel pero poca ejecución concreta. Corres el riesgo de dispersar tus esfuerzos en proyectos ilusorios o poco viables comercialmente. Define un plan claro y ejecuta.",
      "health": "Síntomas difusos o problemas de salud que tienen una raíz psicosomática debido a la ansiedad de querer controlarlo todo. La meditación de enraizamiento te ayudará a calmar la mente de ilusiones."
    },
    "reversed": {
      "general": "La nube de fantasías se disipa y los espejismos caen. El oráculo detecta que recuperas la claridad mental, distinguiendo la ilusión de la verdad. Decides tomar una opción concreta y construir sobre el suelo real.",
      "love": "Decides ver a tu pareja tal como es, con sus virtudes y límites, dejando de lado ideales de cuento de hadas. Si estás soltero, dejas el coqueteo disperso para centrarte en una conexión verdadera.",
      "work": "Descartas proyectos poco viables y te enfocas en metas profesionales y financieras concretas y realistas. Los negocios avanzan al poner los pies en la tierra y aplicar disciplina práctica.",
      "health": "Claridad en diagnósticos médicos difusos y adopción de un plan de cuidado físico estructurado y realista. El cuerpo responde bien a la disciplina y a la rutina diaria sin fantasías."
    }
  },
  {
    "id": 43,
    "name": "Ocho de Copas",
    "keyThemes": "Retiro voluntario · Abandonar el ayer · Búsqueda espiritual · Camino en la penumbra · Soltar el logro.",
    "yesNoScore": 1,
    "yesNoText": "Sí, y llegará con gran velocidad. Prepárate para moverte rápido y adaptarte al cambio.",
    "meanings": {
      "general": "El Ocho de Copas muestra a un hombre apoyado en su cayado, alejándose en la noche hacia las montañas mientras deja atrás ocho copas perfectamente apiladas en primer plano. Representa el valor de retirarse de una situación que, aunque parezca completa, ya no alimenta tu alma. El universo apoya tu viaje interior en busca de un sentido más profundo.",
      "love": "Decides alejarte de una relación que ya no te nutre emocionalmente, a pesar de los esfuerzos invertidos en ella. Si estás soltero, es una fase de introspección donde decides sanar en soledad antes de buscar compañía.",
      "work": "Renuncia voluntaria a un puesto de trabajo o a un negocio que te daba seguridad económica pero ningún crecimiento interior. Te atreves a buscar un camino profesional más alineado con tus valores espirituales.",
      "health": "El cuerpo pide un retiro del mundanal ruido. El descanso prolongado, el ayuno suave de alimentos y de pantallas, y la meditación en silencio restaurarán tu sistema energético y tu vitalidad."
    },
    "reversed": {
      "general": "El oráculo detecta un temor a soltar lo conocido, quedándote en una situación insatisfactoria por miedo al vacío o a la soledad del camino. Te resistes a emprender el viaje interior que tu alma te pide.",
      "love": "Permanecer en una relación agotada solo por rutina o por no asumir el dolor del final. Esta indecisión prolonga la insatisfacción de ambos. Siente el valor de tomar una decisión honesta.",
      "work": "Rechazas una oportunidad de cambio profesional por miedo a perder la seguridad económica actual, a pesar de que el ambiente de trabajo te consume. Evalúa si el precio que pagas vale la comodidad.",
      "health": "Síntomas de agotamiento crónico o desgana debido al estancamiento existencial. La energía vital vuelve a fluir solo cuando te atreves a realizar los cambios que tu alma necesita."
    }
  },
  {
    "id": 44,
    "name": "Nueve de Copas",
    "keyThemes": "Deseo cumplido · Satisfacción personal · Abundancia emocional · Banquete del ser · Contentamiento.",
    "yesNoScore": 1,
    "yesNoText": "Sí, estás a un solo paso de tu meta. Sostén tu energía y confía en tu inmensa fortaleza.",
    "meanings": {
      "general": "El Nueve de Copas muestra a un hombre rollizo y sonriente sentado con los brazos cruzados ante una mesa semicircular cubierta con un manto azul, sobre la cual lucen alineadas nueve copas llenas de luz. Es el arcano de la satisfacción, el gozo de ver tus deseos cumplidos y la paz de estar a gusto contigo mismo. El universo celebra tu plenitud interior y material.",
      "love": "Amor gozoso, plenitud afectiva y una relación donde te sientes profundamente valorado y mimado. Si estás soltero, esta energía augura un período de gran atractivo personal donde disfrutas de tu propia compañía y atraes abundancia afectiva.",
      "work": "Éxito comercial, prosperidad material y consecución de las metas financieras que te habías propuesto. Tus proyectos son valorados y te sitúas en una posición de desahogo económico muy grata.",
      "health": "Excelente salud, vitalidad y una sensación de comodidad en tu propio cuerpo. Disfrutas de los placeres sensoriales con alegría y gratitud. Cuida la moderación en banquetes para conservar tu bienestar intacto."
    },
    "reversed": {
      "general": "El oráculo detecta autocomplacencia excesiva, egoísmo o un vacío existencial que intentas llenar con compras materiales o excesos físicos. La insatisfacción interior no se cura acumulando copas vacías.",
      "love": "Orgullo o frialdad emocional en la relación. Alguien busca solo su propia comodidad y satisfacción en el vínculo, descuidando el bienestar afectivo del otro. Cultiva la empatía mutua.",
      "work": "Insatisfacción a pesar del éxito financiero. Sientes que has logrado tus metas materiales pero que te falta un propósito real en tu labor. Revisa tus motivaciones más profundas.",
      "health": "Dolencias derivadas de excesos en la alimentación, el alcohol o la inactividad física. El cuerpo te pide recuperar el orden y depurar el organismo con una rutina más limpia."
    }
  },
  {
    "id": 45,
    "name": "Diez de Copas",
    "keyThemes": "Felicidad absoluta · Armonía familiar · Hogar bendecido · Arcoíris de copas · Amor integrado.",
    "yesNoScore": 0,
    "yesNoText": "Sí, pero ten cuidado con las cargas excesivas. El ciclo se completa, es momento de liberar peso.",
    "meanings": {
      "general": "El Diez de Copas muestra a una familia celebrando con alegría bajo un arcoíris formado por diez copas doradas en el cielo azul, al lado de su hogar. Es el arcano de la felicidad afectiva plena, la armonía familiar absoluta y la paz de saberte amado en tu entorno íntimo. El universo bendice tu hogar y te asegura que el amor verdadero es real.",
      "love": "Amor pleno, duradero y feliz. Augura la consolidación de la pareja, matrimonio feliz y proyectos de vida en común muy prósperos. Si buscas amor, augura el encuentro con tu compañero de vida.",
      "work": "Ambiente laboral óptimo basado en la colaboración mutua y valores compartidos. Los proyectos fluyen sin rivalidades y los beneficios económicos se traducen en seguridad para tu hogar.",
      "health": "Salud excelente a nivel físico, emocional y espiritual. Hay una armonía total en tu organismo que se nutre del bienestar y el amor de tus seres queridos. Disfruta de esta bendición vital."
    },
    "reversed": {
      "general": "La armonía familiar se rompe por desacuerdos o discusiones domésticas. El oráculo detecta tensiones bajo el techo del hogar, distanciamiento emocional o la pérdida temporal de un espacio de paz.",
      "love": "Crisis de comunicación en la pareja por no compartir la misma visión de hogar o metas familiares. Las apariencias de felicidad exterior ocultan roces reales que deben ser tratados con amor y verdad.",
      "work": "Falta de espíritu de colaboración en el entorno laboral. Hay desavenencias en el equipo o descontento con las condiciones de trabajo que afectan tu paz mental en casa. Busca el diálogo sereno.",
      "health": "Las tensiones emocionales del ámbito familiar se somatizan en el cuerpo en forma de dolores musculares o insomnio. El bienestar familiar es clave para tu salud física."
    }
  },
  {
    "id": 46,
    "name": "Sota de Copas",
    "keyThemes": "Mensajero de afecto · Sensibilidad poética · Noticias creativas · Pez en la copa · Alma receptiva.",
    "yesNoScore": 1,
    "yesNoText": "Sí, una noticia refrescante o una nueva oportunidad de aprendizaje viene hacia ti.",
    "meanings": {
      "general": "La Sota de Copas contempla divertida un pez que asoma la cabeza desde su copa, rodeada de un paisaje de mar suave. Trae la energía del artista joven, el mensajero de buenas noticias afectivas y la sensibilidad intuitiva que no teme expresarse. El universo te pide que abras tu mente a la poesía de la vida y escuches tus corazonadas.",
      "love": "Noticia de amor, carta romántica, declaraciones sinceras o el inicio de una conexión tierna y llena de fantasía poética. Si buscas pareja, tu dulzura y receptividad serán tu mejor imán afectivo.",
      "work": "Propuestas de carácter artístico, ideas creativas e inspiradas y un ambiente laboral donde se valora la empatía. Excelente momento para iniciar cursos de escritura, pintura o música.",
      "health": "Cuerpo sensible y receptivo. Te beneficias enormemente de terapias emocionales, masajes y actividades suaves que conecten tu físico con el agua y la relajación mental profunda."
    },
    "reversed": {
      "general": "El oráculo detecta inmadurez afectiva, susceptibilidad excesiva o una tendencia a escapar de la realidad mediante fantasías estériles. Te dejas llevar por arrebatos emocionales infantiles.",
      "love": "Alguien inmaduro emocionalmente en la relación que se ofende con facilidad o promete afectos que no tiene la solidez de sostener en el tiempo. Evita el melodrama infantil en la pareje.",
      "work": "Falta de rigor en proyectos creativos. Te pierdes en divagaciones artísticas descuidando la organización práctica de tus tareas profesionales. Pon límites a tu imaginación laboral.",
      "health": "Hipersensibilidad a alimentos o al entorno. Tu cuerpo somatiza de forma inmediata los cambios emocionales del día; cuida tu entorno energético y físico con esmero."
    }
  },
  {
    "id": 47,
    "name": "Caballero de Copas",
    "keyThemes": "Mensajero romántico · Búsqueda del grial · Invitación al amor · Imaginación creativa · Calma que cabalga.",
    "yesNoScore": 1,
    "yesNoText": "Sí, lánzate a la acción. El movimiento decidido y el valor te traerán lo que buscas.",
    "meanings": {
      "general": "El Caballero de Copas avanza despacio sobre su blanco corcel, sosteniendo la copa con elegancia en su mano, portando un casco adornado con alas. Trae la energía del caballero andante, el buscador de la belleza y el portador de una invitación sincera. El universo te pide que sigas tus ideales con caballerosidad y delicadeza.",
      "love": "Llega una propuesta de amor sincera, una invitación romántica o una declaración de sentimientos que te conmoverá profundamente. Si estás en pareja, es un ciclo para reavivar la ternura y la galantería en el vínculo.",
      "work": "Propuestas de negocios interesantes basadas en la cooperación, contratos favorables y la oportunidad de poner tu creatividad al servicio de tu carrera. Las negociaciones fluyen con tacto y diplomacia.",
      "health": "Salud equilibrada y cuerpo en armonía. Te sientes en paz; las terapias alternativas suaves, el descanso junto al agua y la respiración profunda aportarán gran bienestar a tu sistema vital."
    },
    "reversed": {
      "general": "El oráculo advierte sobre falsas promesas de amor o un exceso de idealización que conduce a la desilusión. Cuidado con seductores poco confiables que usan las palabras para manipular tus sentimientos.",
      "love": "Desengaño amoroso por idealizar en demasía a tu pareja o a tu pretendiente. Descubres que la realidad no coincide con tus fantasías románticas. Acepta al otro con sus imperfecciones.",
      "work": "Propuestas profesionales poco realistas o socios que prometen grandes ganancias pero sin un plan concreto detrás. Revisa los números con frialdad y no te dejes llevar por el entusiasmo inicial.",
      "health": "Inestabilidad emocional que altera tus ritmos biológicos. Puedes sufrir altibajos de energía debidos a una mente que oscila entre la euforia y la desilusión. Busca anclarte a la tierra."
    }
  },
  {
    "id": 48,
    "name": "Reina de Copas",
    "keyThemes": "Intuición profunda · Empatía infinita · Madre del corazón · Clarividencia sutil · Refugio de amor.",
    "yesNoScore": 1,
    "yesNoText": "Sí, confía en tu poder magnético y en tu sabiduría receptiva. Atraerás lo que es tuyo por derecho.",
    "meanings": {
      "general": "La Reina de Copas contempla una copa ornamentada de forma magnífica a la orilla del mar, sentada en un trono tallado con querubines y conchas. Representa la sabiduría de las emociones, la intuición clarividente y el amor compasivo que acoge todo dolor sin juzgar. El universo te pide que confíes plenamente en tu sexto sentido y actúes con empatía.",
      "love": "Amor compasivo, profunda complicidad espiritual y una empatía total en la pareja. Si buscas amor, tu dulzura y tu capacidad de escucha profunda atraerán al compañero adecuado de forma natural.",
      "work": "Tus corazonadas profesionales son acertadas en esta fase. Excelente desempeño en profesiones de ayuda (psicología, medicina, trabajo social) o en el arte. Tu equipo encuentra en ti un refugio de calma.",
      "health": "Cuerpo en sintonía con tu energía espiritual. Gran capacidad de autocuración a través de la meditación, la respiración consciente y la escucha de los mensajes sutiles que te envía el organismo."
    },
    "reversed": {
      "general": "El oráculo detecta susceptibilidad extrema, inestabilidad emocional o manipulación sentimental basada en el victimismo. Estás ahogándote en tu propio mar de emociones sin anclas.",
      "love": "Dependencia afectiva, celos asfixiantes o tendencia a asumir el papel de salvadora en la relación de pareja. Recuerda que no puedes sanar a quien no desea hacer su propio trabajo de alma.",
      "work": "Te dejas afectar demasiado por el clima laboral o las críticas del entorno. Tu sensibilidad interfiere con tu objetividad profesional; pon límites emocionales en tu área de trabajo.",
      "health": "Trastornos psicosomáticos o retención de líquidos debido a tensiones emocionales no expresadas. Tu cuerpo te pide purificar tus emociones y soltar las cargas afectivas de los demás."
    }
  },
  {
    "id": 49,
    "name": "Rey de Copas",
    "keyThemes": "Dominio emocional · Consejero sabio · Compasión madura · Calma en la tormenta · Templanza del alma.",
    "yesNoScore": 1,
    "yesNoText": "Sí, actúa con la nobleza y firmeza de un líder. El orden y la maestría te garantizan el éxito.",
    "meanings": {
      "general": "El Rey de Copas se sienta en su trono flotante sobre un mar revuelto, con un barco navegando y un pez saltando al fondo, sosteniendo su cetro y su copa con absoluta serenidad. Representa el dominio de las emociones: el sabio que siente con profundidad pero no se deja arrastrar por la tormenta. El universo te invita a actuar con madurez, templanza y compasión.",
      "love": "Un amor maduro, estable, protector y comprensivo. Hay un entendimiento silencioso y una gran seguridad afectiva en el vínculo. Si buscas pareja, augura la llegada de un consejero o compañero sabio.",
      "work": "Liderazgo comprensivo, éxito en mediaciones comerciales y la capacidad de mantener la cabeza fría ante crisis financieras o laborales. Tu experiencia y tu calma son muy valoradas por tus colaboradores.",
      "health": "Salud mental y física sólida. Tu sistema nervioso se mantiene fuerte gracias a tu madurez emocional. Sabes cuándo descansar y cómo no permitir que las tensiones del entorno alteren tu ritmo vital."
    },
    "reversed": {
      "general": "El oráculo advierte sobre manipulación emocional astuta, frialdad disfrazada de sabiduría o una tendencia a reprimir tus sentimientos mediante adicciones o silencios hirientes.",
      "love": "Falta de honestidad afectiva en la pareja. Alguien actúa con frialdad controladora o retira su cariño como forma de castigo. El amor pide derribar las barreras del orgullo egoísta.",
      "work": "Ambientes laborales tensos donde se usa el chantaje emocional o el favoritismo. Cuidado con socios o jefes de doble cara; mantén tus acuerdos por escrito y actúa con total transparencia.",
      "health": "Riesgo de adicciones o desequilibrios físicos por reprimir emociones intensas. Tu cuerpo te pide que hables con honestidad y busques un canalizador saludable para tu mundo emocional."
    }
  },
  {
    "id": 50,
    "name": "As de Espadas",
    "keyThemes": "Claridad mental · Verdad cortante · Decisión rotunda · Victoria del intelecto · Fuerza de ideas.",
    "yesNoScore": 1,
    "yesNoText": "Sí, rotundo. Una semilla divina se ha plantado en tu camino y tiene toda la fuerza del cosmos para crecer.",
    "meanings": {
      "general": "El As de Espadas muestra una mano divina emergiendo de una nube, sosteniendo una espada erguida cuya punta atraviesa una corona adornada con ramas de laurel y olivo. Representa el rayo de la verdad, la claridad mental que corta toda niebla y la victoria del intelecto. El universo te concede el discernimiento necesario para tomar una decisión definitiva.",
      "love": "Conversación aclaratoria de gran honestidad que cambia el rumbo de la relación. Se rompen las ilusiones y se ve la verdad de frente. Si buscas amor, esta energía te pide claridad sobre tus límites.",
      "work": "Avances intelectuales significativos, ideas brillantes aprobadas con éxito y decisiones comerciales tajantes y productivas. Buen momento para redactar contratos o definir estrategias legales y comerciales.",
      "health": "Mente afilada y despejada. Tu salud responde bien a la disciplina mental; excelente período para cirugías exitosas si fueran necesarias, o para iniciar dietas y rutinas rigurosas y depurativas."
    },
    "reversed": {
      "general": "El oráculo advierte sobre palabras hirientes usadas con ira o ideas confusas que te llevan a tomar decisiones equivocadas. La espada sin control hiere a quien la sostiene tanto como al oponente.",
      "love": "Discusiones hirientes donde se busca herir con la palabra más que solucionar. El orgullo intelectual impide la reconciliación. Recuerda que tener la razón no siempre cura el corazón.",
      "work": "Falta de claridad en acuerdos o proyectos bloqueados por problemas legales mal resueltos. Cuidado con cometer errores por precipitación intelectual; revisa cada documento con lupa.",
      "health": "Migrañas, fatiga mental extrema o insomnio debido a pensamientos repetitivos y obsesivos. Tu cuerpo te pide silenciar la mente mediante el descanso, el silencio y la desconexión total."
    }
  },
  {
    "id": 51,
    "name": "Dos de Espadas",
    "keyThemes": "Decisión bloqueada · Ojos vendados · Tregua mental · Conflicto interno · Equilibrio inestable.",
    "yesNoScore": 0,
    "yesNoText": "Es un momento de pausa y elección. El oráculo te pide equilibrar tus opciones antes de avanzar.",
    "meanings": {
      "general": "El Dos de Espadas muestra a una mujer con los ojos vendados y los brazos cruzados sobre el pecho, sosteniendo dos espadas en equilibrio perfecto ante un mar nocturno y una luna creciente. Representa la tregua mental, la parálisis ante una elección difícil y la tendencia a cerrar los ojos ante la realidad. El universo te pide que te quites la venda y asumas tu decisión.",
      "love": "Estancamiento afectivo por no querer abordar una verdad incómoda en la pareja. Ambos prefieren mantener una tregua fría antes que hablar del asunto real. Saca a la luz lo que callas.",
      "work": "Negociaciones bloqueadas por falta de acuerdo o indecisión a la hora de elegir entre dos propuestas de trabajo o de inversión. La parálisis por análisis te está costando oportunidades reales.",
      "health": "Tensión en la vista y en el sistema nervioso por reprimir la verdad. El cuerpo te pide calma y soledad para integrar tus opciones antes de que la venda se caiga por la fuerza de las circunstancias."
    },
    "reversed": {
      "general": "La venda se cae y te ves obligado a mirar la verdad de frente. El oráculo detecta que decides tomar la decisión que postergabas, asumiendo las consecuencias con valor y claridad mental.",
      "love": "Se termina la tregua en la relación. Salen a la luz los problemas ocultos y se inicia una fase de conversación honesta —y tal vez difícil— necesaria para renovar o cerrar el vínculo.",
      "work": "Tomas finalmente la decisión laboral o financiera que evitabas. Se desbloquean los proyectos estancados al elegir un camino definitivo, disipando la incertidumbre del equipo.",
      "health": "Alivio del dolor de cabeza y del estrés acumulado al tomar una postura definida. Tu cuerpo recupera su fluidez natural cuando dejas de luchar contra tu propia verdad interna."
    }
  },
  {
    "id": 52,
    "name": "Tres de Espadas",
    "keyThemes": "Dolor del corazón · Verdad dolorosa · Decepción liberadora · Duelo de la mente · Sanación del alma.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el camino de la expansión está abierto. Tus visiones comienzan a materializarse en el plano real.",
    "meanings": {
      "general": "El Tres de Espadas muestra un corazón rojo atravesado por tres espadas bajo un cielo lluvioso y gris. Es el arcano del dolor emocional, la desilusión y la traición que quiebra las expectativas de la mente. Aunque la imagen es dolorosa, el oráculo te recuerda: las espadas también limpian el camino de mentiras, liberando tu corazón de lo que no era real.",
      "love": "Decepción amorosa, ruptura sentimental o el descubrimiento de una verdad dolorosa en la pareja. El alma atraviesa un duelo necesario; permite que las lágrimas limpien la herida para poder sanar.",
      "work": "Pérdida de un empleo, cancelación de contratos importantes o roces dolorosos con socios. Mantén la cabeza fría: esta separación dolorosa te redirige hacia entornos profesionales más íntegros.",
      "health": "El dolor emocional afecta a tu corazón físico y a tu respiración. Puedes sentir opresión en el pecho; practica respiraciones lentas y date el tiempo y el espacio sagrados para transmutar tu pena."
    },
    "reversed": {
      "general": "La tormenta amaina y las espadas comienzan a retirarse del corazón. El oráculo detecta que el dolor empieza a ceder paso al perdón y al aprendizaje. Estás listo para reconstruir tu vida.",
      "love": "Inicio de la reconciliación tras una crisis profunda o superación total del duelo por una separación anterior. Te permites volver a confiar en el amor libre de resentimientos del ayer.",
      "work": "Superas las pérdidas financieras o el despido del pasado. Empiezas a visualizar nuevas ofertas de empleo y a restaurar tu confianza profesional con una mentalidad más sabia y curtida.",
      "health": "Alivio progresivo de la opresión en el pecho y la angustia. Tu vitalidad retorna a medida que decides perdonar y soltar las penas acumuladas en tu memoria emocional."
    }
  },
  {
    "id": 53,
    "name": "Cuatro de Espadas",
    "keyThemes": "Santuario de reposo · Recuperación mental · Meditación sabia · Pausa tras la batalla · Paz silenciosa.",
    "yesNoScore": 1,
    "yesNoText": "Sí, las bases que has construido son seguras. Puedes confiar en la estabilidad de esta situación.",
    "meanings": {
      "general": "El Cuatro de Espadas muestra el relieve de un guerrero sobre su tumba en una iglesia, con tres espadas colgadas en la pared sobre él y una cuarta a su lado. Es el arcano del santuario voluntario, el descanso del guerrero tras la batalla y la paz que da la meditación silenciosa. El universo te pide a gritos que te retires del combate diario y repares tu mente.",
      "love": "Pausa necesaria en la relación para calmar las aguas tras discusiones intensas. Si estás soltero, es una fase de celibato o retiro afectivo sabio para sanar tu mente antes de abrirte de nuevo.",
      "work": "Vacaciones merecidas, retiro temporal del mundanal ruido de la oficina o aplazamiento de negociaciones tensas. No es momento de actuar, sino de recuperar fuerzas y planificar en silencio.",
      "health": "Tu cuerpo exige reposo absoluto, sueño reparador y relajación. Excelente período para convalecencias exitosas, retiros espirituales y técnicas de meditación que induzcan ondas de paz en tu cerebro."
    },
    "reversed": {
      "general": "El descanso termina y el guerrero vuelve a levantarse de su lecho, tomando su espada. El oráculo detecta que recuperas las fuerzas y decides reintegrarte a la acción cotidiana con una perspectiva renovada.",
      "love": "Deciden romper el distanciamiento en la pareja y retomar el contacto con una actitud más calmada y dispuesta al diálogo constructivo. La frialdad da paso al encuentro.",
      "work": "Retornas a tus labores profesionales tras un período de baja o descanso con las pilas cargadas y nuevas ideas organizativas. Se activa la resolución de tareas atrasadas.",
      "health": "Superación definitiva de una enfermedad o convalecencia prolongada. Tu cuerpo recupera su energía vital y te sientes listo para reanudar tus actividades físicas diarias con prudencia."
    }
  },
  {
    "id": 54,
    "name": "Cinco de Espadas",
    "keyThemes": "Derrota aparente · Victoria vacía · Conflicto de egos · Orgullo que aísla · Retirada inteligente.",
    "yesNoScore": -1,
    "yesNoText": "No en este momento. Hay un conflicto o pérdida latente que requiere tu aprendizaje antes de avanzar.",
    "meanings": {
      "general": "El Cinco de Espadas muestra a un joven sonriente recogiendo tres espadas del suelo mientras otras dos figuras se alejan con tristeza hacia el mar bajo un cielo tormentoso. Es el arcano de la victoria vacía: has ganado la discusión a costa de perder la relación o de dañar tu integridad. El universo te invita a reflexionar: ¿vale la pena ganar a toda costa?",
      "love": "Discusiones hirientes donde se busca doblegar al otro más que dialogar. Hay resentimiento y frialdad acumulados en la pareja por luchas de poder estériles. El orgullo está destruyendo el afecto.",
      "work": "Ambiente laboral hostil, intrigas de pasillo y competitividad tóxica. Puede que sufras una traición o que tú mismo estés usando métodos dudosos para destacar. Detente y revisa tus valores.",
      "health": "Desgaste energético severo debido al estrés de las peleas cotidianas. Tu sistema nervioso está agotado; la ira reprimida altera tus digestiones y tu sueño. Busca la paz antes que la razón."
    },
    "reversed": {
      "general": "Se termina la lucha de egos. El oráculo detecta que decides deponer tu orgullo o alejarte definitivamente de un conflicto tóxico que no te aportaba nada constructivo. Sientes el alivio de la paz.",
      "love": "Deciden pedir disculpas sinceras y dejar de lado las recriminaciones mutuas en la pareja. Si la relación ya no tiene arreglo, asumen la separación con madurez, sin buscar culpables.",
      "work": "Cierras una etapa de conflictos laborales al buscar la mediación o decidir cambiar de equipo o de empresa. Dejas atrás el drama de la oficina para enfocar tu energía en tu crecimiento real.",
      "health": "Recuperación de la paz mental al liberar el resentimiento y el rencor acumulados. Tu cuerpo responde de inmediato con una respiración más profunda y un sueño verdaderamente reparador."
    }
  },
  {
    "id": 55,
    "name": "Seis de Espadas",
    "keyThemes": "Transición necesaria · Viaje al horizonte · Aguas que se calman · Dejar la tormenta · Guía silenciosa.",
    "yesNoScore": 1,
    "yesNoText": "Sí, la luz regresa. Se augura un triunfo legítimo o un intercambio justo que sanará tu corazón.",
    "meanings": {
      "general": "El Seis de Espadas muestra a un barquero conduciendo a una mujer y a un niño en su barca hacia una orilla lejana, con seis espadas clavadas en la proa ante un mar que empieza a calmarse. Representa la transición obligada pero necesaria hacia aguas más tranquilas. El universo te asegura que, aunque el viaje sea triste o incierto, vas hacia un lugar mejor.",
      "love": "Deciden alejarse juntos de un entorno familiar conflictivo o de viejos patrones de discusión para reconstruir la relación en calma. Si estás soltero, indica que estás soltando el dolor del ayer para navegar hacia un nuevo amor.",
      "work": "Cambios de puesto, traslados geográficos provechosos o la transición hacia un nuevo modelo de negocio con más estabilidad económica. El camino inicial es austero pero seguro.",
      "health": "Mejora progresiva y gradual de la salud. Dejas atrás el período más agudo de una enfermedad o crisis emocional y navegas hacia la recuperación; los climas templados y el descanso junto al agua te beneficiarán."
    },
    "reversed": {
      "general": "El oráculo detecta resistencia a realizar el cambio necesario, quedándote encallado en medio de la tormenta por miedo al viaje. El barco se inunda debido a que sigues cargando con las espadas del ayer.",
      "love": "El pasado amoroso interfiere con tu presente, impidiéndote avanzar con tu pareja actual o iniciar un nuevo vínculo con soltura. La falta de resolución de antiguos dolores estanca la barca.",
      "work": "Retrasos en traslados o cambios laborales por indecisión o problemas administrativos imprevistos. Te resistes a actualizar tus métodos de trabajo, dificultando la transición del negocio.",
      "health": "Dificultad para superar una dolencia por no querer cambiar los hábitos nocivos del pasado. El cuerpo te pide realizar la transición a una vida más limpia de forma definitiva."
    }
  },
  {
    "id": 56,
    "name": "Siete de Espadas",
    "keyThemes": "Estrategia astuta · Independencia oculta · Escapada del peligro · Plan secreto · Cuidado de espías.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero requerirá tu coraje y una estrategia inteligente. Mantén tu posición con firmeza.",
    "meanings": {
      "general": "El Siete de Espadas muestra a un hombre alejándose a hurtadillas de un campamento militar, cargando cinco espadas en sus manos mientras mira hacia atrás a las dos que ha dejado clavadas en el suelo. Representa la astucia, la estrategia individual para evitar el conflicto directo y la necesidad de actuar con prudencia y reserva. El universo te aconseja discreción.",
      "love": "Hay una falta de transparencia en la relación. Alguien está ocultando sus verdaderos motivos o huyendo de las conversaciones difíciles. Si buscas pareja, ve con cautela ante personas demasiado esquivas.",
      "work": "Estrategias de negocio inteligentes que requieren total discreción frente a la competencia. Protege tus ideas, contraseñas y patentes; no es momento de revelar tus cartas comerciales todavía.",
      "health": "Tu cuerpo te pide buscar segundas opiniones médicas o tratamientos alternativos con discreción. Evita el desgaste de discutir tus decisiones de salud con quienes no te comprenderían."
    },
    "reversed": {
      "general": "La verdad sale a la luz y los planes secretos se descubren. El oráculo detecta que la falta de honestidad del pasado pasa factura o que decides confesar lo que ocultabas por el bien de tu paz mental.",
      "love": "Se descubren las mentiras o los secretos en la pareja, forzando una conversación honesta e ineludible. Aunque la verdad incomode, es la única base sobre la que se puede sanar o cerrar con honor.",
      "work": "Auditorías o revisiones que sacan a la luz fallos en el equipo o manejos dudosos de dinero. Decides actuar con total transparencia y corregir las irregularidades antes de que causen daños mayores.",
      "health": "Claridad sobre síntomas médicos que habías intentado ignorar o automedicar con discreción. El tratamiento honesto y directo con un profesional médico te devuelve el bienestar."
    }
  },
  {
    "id": 57,
    "name": "Ocho de Espadas",
    "keyThemes": "Prisión mental · Manos atadas · Venda del miedo · Salida disponible · Autoexigencia limitante.",
    "yesNoScore": 1,
    "yesNoText": "Sí, y llegará con gran velocidad. Prepárate para moverte rápido y adaptarte al cambio.",
    "meanings": {
      "general": "El Ocho de Espadas muestra a una mujer atada y con los ojos vendados, rodeada por ocho espadas clavadas en el barro ante un castillo al fondo, con un hilillo de agua a sus pies. El camino detrás de ella está libre de espadas: su prisión está hecha de su propia venda y temor. El universo te susurra al oído: la salida está libre, quítate la venda.",
      "love": "Te sientes atrapado o impotente en tu relación actual, creyendo que no tienes opciones de cambio. La carta te recuerda que las ataduras son en gran parte mentales; tú tienes la llave de tu propia libertad afectiva.",
      "work": "Sensación de estancamiento profesional absoluto por miedo a perder la seguridad económica. Te limitas a ti mismo al creer que no tienes el talento necesario para cambiar de puesto. Despierta tu confianza.",
      "health": "La ansiedad y los miedos limitantes bloquean tu energía física. Puedes sufrir tensiones musculares severas o fobias que limitan tus movimientos cotidianos. Trata primero tu mente y tu cuerpo se liberará."
    },
    "reversed": {
      "general": "Empiezas a desatar tus manos y a quitarte la venda de los ojos. El oráculo detecta que recuperas la confianza en tus capacidades y comprendes que las barreras que te limitaban eran solo ilusiones mentales.",
      "love": "Decides romper la dinámica de victimismo o impotencia en la pareja. Asumes la responsabilidad de tu felicidad y tomas decisiones firmes para liberar tu vida sentimental del drama paralizante.",
      "work": "Superas el temor a la incertidumbre laboral. Empiezas a enviar currículums, a proponer mejoras o a planificar tu propio negocio, rompiendo el bucle del estancamiento financiero.",
      "health": "Alivio progresivo de la ansiedad y las fobias limitantes. Tu cuerpo se destensa y recuperas la movilidad y la energía física a medida que tu mente se abre a pensamientos de libertad."
    }
  },
  {
    "id": 58,
    "name": "Nueve de Espadas",
    "keyThemes": "Noche oscura · Ansiedad extrema · Pesadillas mentales · Dolor del pensamiento · Despertar de la angustia.",
    "yesNoScore": 1,
    "yesNoText": "Sí, estás a un solo paso de tu meta. Sostén tu energía y confía en tu inmensa fortaleza.",
    "meanings": {
      "general": "El Nueve de Espadas muestra a una figura sentada en su lecho en la oscuridad, con el rostro cubierto por sus manos en un gesto de profunda angustia, mientras nueve espadas cuelgan horizontalmente sobre ella en la pared. Es la noche oscura del alma, el tormento de los pensamientos obsesivos que magnifican el peligro. El oráculo te consuela: los monstruos están en tu mente, enciende la luz.",
      "love": "Angustia, celos obsesivos o temor constante al abandono en la pareja. Estás proyectando tus peores miedos sobre el vínculo, creando una tensión ficticia pero muy dañina. Calma tu mente antes de hablar.",
      "work": "Estrés laboral extremo que te quita el sueño. Temores infundados de quiebra, despido o fracaso que te paralizan. Revisa los datos reales de tus finanzas y verás que la realidad es mucho más suave que tus pesadillas.",
      "health": "Insomnio severo, dolores de cabeza por tensión mental y un desgaste del sistema nervioso que altera tus ritmos vitales. Practica la higiene del sueño, apaga las pantallas temprano y medita en la calma."
    },
    "reversed": {
      "general": "La pesadilla termina y la luz del amanecer entra por la ventana. El oráculo detecta que la angustia cede paso a la razón y los pensamientos obsesivos pierden su poder sobre ti. Decides buscar ayuda y respirar.",
      "love": "Liberación de miedos y sospechas infundadas en la pareja. Deciden hablar con honestidad de lo que les preocupa, disipando la niebla del temor mutuo. La confianza regresa al lecho compartido.",
      "work": "Superas la etapa de máxima presión y estrés en el trabajo. Aprendes a no llevarte los problemas de la oficina a la cama y a delegar tareas con mayor tranquilidad mental, aliviando las finanzas.",
      "health": "Retorno progresivo del sueño reparador y de la calma nerviosa. Tu cuerpo se regenera al recibir el descanso necesario; la meditación y el ejercicio suave te devuelven el equilibrio de tus biorritmos."
    }
  },
  {
    "id": 59,
    "name": "Diez de Espadas",
    "keyThemes": "Final del dolor · Tocar fondo · Nuevo amanecer · Traición superada · Rendición liberadora.",
    "yesNoScore": 0,
    "yesNoText": "Sí, pero ten cuidado con las cargas excesivas. El ciclo se completa, es momento de liberar peso.",
    "meanings": {
      "general": "El Diez de Espadas muestra a un hombre tendido boca abajo sobre la arena, con diez espadas clavadas en su espalda bajo un cielo negro, pero con un sol dorado que empieza a asomar en el horizonte sobre el mar. Has tocado fondo y la mente ya no puede sufrir más. Es un final definitivo y crudo, pero el oráculo te recuerda: la noche ha terminado, ya solo puedes subir.",
      "love": "Ruptura definitiva o el fin abrupto de una mentira dolorosa en la pareja. El dolor es inmenso pero necesario para liberarte de una dinámica destructiva. El sol del mañana promete un amor más limpio.",
      "work": "Fin de un proyecto comercial de forma difícil o pérdida total de un empleo. Has llegado al límite de tu resistencia en ese lugar; asume el final con rendición y prepárate para construir desde cero.",
      "health": "Colapso físico por agotamiento nervioso severo o dolor de espalda agudo. Tu cuerpo ha dicho 'basta' de la forma más tajante. Entrégate al descanso absoluto y al cuidado profesional; la reconstrucción ya se inicia."
    },
    "reversed": {
      "general": "Comienzas a levantarte de la arena tras el colapso total. El oráculo detecta que el dolor ha cumplido su ciclo de enseñanza y empiezas a sanar las heridas del pasado. Sientes la fuerza del nuevo amanecer.",
      "love": "Superación del dolor por una ruptura del pasado. Decides retirar las espadas de tu memoria afectiva y te permites volver a mirar la vida con ilusión, sanando el corazón con madurez.",
      "work": "Reconstruyes tu vida profesional y financiera tras una quiebra o despido. Usas los aprendizajes del fracaso para cimentar tu nuevo negocio con mayor prudencia y bases sólidas.",
      "health": "Recuperación de la vitalidad física tras una crisis de salud grave o postración. Tu organismo se regenera de forma lenta pero constante, respondiendo al deseo del alma de volver a la luz."
    }
  },
  {
    "id": 60,
    "name": "Sota de Espadas",
    "keyThemes": "Mente vigilante · Curiosidad incisiva · Mensajero de verdad · Viento que desafía · Guardia intelectual.",
    "yesNoScore": 1,
    "yesNoText": "Sí, una noticia refrescante o una nueva oportunidad de aprendizaje viene hacia ti.",
    "meanings": {
      "general": "La Sota de Espadas sostiene su espada con ambas manos sobre una colina azotada por el viento, bajo un cielo con nubes veloces y aves que vuelan en círculos. Representa la vigilancia intelectual, la curiosidad de quien busca la verdad oculta tras las apariencias y la agilidad para reaccionar ante desafíos. El universo te pide que aguces el ingenio y defiendas tu verdad.",
      "love": "Conversaciones directas y sin rodeos en la pareja. Se analizan los problemas con lógica y frialdad objetiva, poniendo límites a los chantajes emocionales. Si buscas pareja, te atraerá el intelecto y la mente afilada.",
      "work": "Investigación minuciosa de contratos, análisis de mercado eficaces y la capacidad de descubrir errores en los proyectos antes de su ejecución. Excelente período para estudios rigurosos y debates intelectuales.",
      "health": "Mente hiperactiva que desgasta el físico. Tu cuerpo responde a la tensión de estar siempre alerta; practica disciplinas que coordinen cuerpo y mente, como el yoga o el taichí, para calmar el viento cerebral."
    },
    "reversed": {
      "general": "El oráculo detecta chismes estériles, espionaje malintencionado o una actitud defensiva e inmadura que genera discusiones innecesarias. Cuidado con usar tu intelecto solo para criticar.",
      "love": "Sospechas infundadas y control obsesivo en la pareja (revisar mensajes, espionaje mutuo). Esta desconfianza destruye la intimidad afectiva del vínculo; siéntense a hablar con honestidad madura.",
      "work": "Filtración de datos confidenciales o discusiones absurdas en el trabajo por malentendidos de comunicación. No te dejes llevar por comentarios de pasillo; verifica las fuentes de información.",
      "health": "Cansancio visual, tensión en la mandíbula (bruxismo) o dolores musculares por nerviosismo y estrés mental acumulado. Tu cuerpo te pide relajar la guardia y desconectarte del ruido."
    }
  },
  {
    "id": 61,
    "name": "Caballero de Espadas",
    "keyThemes": "Carga lógica · Prisa mental · Acción decidida · Verdad defensora · Viento enfurecido.",
    "yesNoScore": 1,
    "yesNoText": "Sí, lánzate a la acción. El movimiento decidido y el valor te traerán lo que buscas.",
    "meanings": {
      "general": "El Caballero de Espadas cabalga al galope en medio de la tormenta, blandiendo su espada con mirada feroz y decidida. Representa la acción impetuosa guiada por la razón pura, la urgencia de defender una idea justa y el avance veloz que no admite obstáculos. El universo te pide que actúes con determinación férrea, pero sin descuidar el impacto de tus actos.",
      "love": "Discusión intensa e intelectual en la pareja donde se exigen aclaraciones inmediatas. Si buscas amor, alguien con una personalidad arrolladora, directa e inteligente irrumpirá en tu vida con prisa.",
      "work": "Estrategias comerciales audaces aplicadas con rapidez, resolución inmediata de crisis legales o financieras y negociaciones intensas y decididas. Tu agilidad mental te da la delantera en el mercado.",
      "health": "Energía cerebral muy potente que exige acción. Tu cuerpo pide movimiento rápido; el ejercicio aeróbico de alta intensidad o correr al aire libre te ayudará a equilibrar la sobrecarga de tus circuitos neuronales."
    },
    "reversed": {
      "general": "La prisa intelectual se convierte en agresión verbal o decisiones comerciales temerarias tomadas con ira. El oráculo te advierte: la arrogancia y la falta de empatía destruyen tus propios avances.",
      "love": "Ruptura o crisis en la pareja debido a comentarios hirientes hechos sin pensar. Alguien actúa con frialdad implacable, ignorando los sentimientos del otro por imponer su razón lógica. Calma el galope verbal.",
      "work": "Proyectos arruinados por actuar con prisa y desorganización mental. Discusiones destructivas con colegas por diferencias de criterio técnico. Detén el caballo y escucha al equipo antes de avanzar.",
      "health": "Riesgo de accidentes por imprudencia o agotamiento del sistema nervioso por hiperactividad mental sostenida. Tu cuerpo exige desacelerar la marcha de tus pensamientos obsesivos."
    }
  },
  {
    "id": 62,
    "name": "Reina de Espadas",
    "keyThemes": "Objetividad clara · Límites sabios · Verdad sin adornos · Independencia mental · Dolor integrado.",
    "yesNoScore": 1,
    "yesNoText": "Sí, confía en tu poder magnético y en tu sabiduría receptiva. Atraerás lo que es tuyo por derecho.",
    "meanings": {
      "general": "La Reina de Espadas se sienta en su trono decorado con nubes y querubines, sosteniendo su espada erguida con una mano y extendiendo la otra con gesto de límites firmes en medio de un cielo despejado. Es el arcano de la objetividad pura, la mente que piensa sin la interferencia del dolor emocional y la honestidad que no pide disculpas. El universo te invita a trazar límites claros.",
      "love": "Relación basada en el respeto intelectual y la independencia emocional. Si estás soltero, esta energía te pide que pongas la razón por delante del deseo y evalúes con frialdad si esa persona es compatible con tu vida.",
      "work": "Juicio comercial certero, análisis objetivos de finanzas e independencia profesional valorada. Destacas por tu capacidad de organizar y decidir con total neutralidad, ganándote el respeto del sector.",
      "health": "Salud física mantenida gracias a la disciplina mental e higiénica. Sabes poner límites a tus excesos con firmeza. Buen momento para desintoxicaciones rigurosas y chequeos médicos generales."
    },
    "reversed": {
      "general": "El oráculo detecta amargura, cinismo hiriente o una frialdad emocional extrema debido a heridas del pasado no sanadas. Estás usando tu intelecto como una armadura para no permitir que nadie se acerque.",
      "love": "Distanciamiento frío y hostilidad silenciosa en la pareja. El orgullo impide la reconciliación y los límites se han convertido en un muro de piedra que aísla los corazones. Permítete un poco de vulnerabilidad.",
      "work": "Conflictos laborales por actitudes demasiado críticas, sarcásticas o rígidas con tus subordinados o compañeros de tareas. Lidera desde la verdad objetiva pero con tacto y humanidad.",
      "health": "Dolores musculares crónicos por rigidez física y tensión nerviosa sostenida. Tu cuerpo te pide derretir la armadura emocional con baños templados, masajes y sobre todo, perdón profundo."
    }
  },
  {
    "id": 63,
    "name": "Rey de Espadas",
    "keyThemes": "Autoridad del intelecto · Ley y verdad · Juicio neutral · Sabiduría analítica · Justicia de la mente.",
    "yesNoScore": 1,
    "yesNoText": "Sí, actúa con la nobleza y firmeza de un líder. El orden y la maestría te garantizan el éxito.",
    "meanings": {
      "general": "El Rey de Espadas se sienta de frente en su trono adornado con mariposas, sosteniendo su espada ligeramente inclinada con mirada seria y analítica. Representa la maestría de la mente, la autoridad de quien juzga con total neutralidad y sabiduría, y la defensa de la verdad y la ley. El universo te pide que dejes de lado el drama y analices tu situación con total objetividad.",
      "love": "Pareja que se comunica con gran madurez y respeto intelectual, resolviendo problemas mediante el diálogo lógico y racional. Si buscas amor, augura la llegada de un consejero o profesional serio, inteligente y justo.",
      "work": "Éxito en asuntos legales, asesoramientos financieros de alto nivel y un liderazgo profesional respetado por su honestidad e imparcialidad. Tus decisiones se basan en datos sólidos y en la ética comercial.",
      "health": "Salud mental y física excelente coordinada por la disciplina y el autocuidado inteligente. Confía en la medicina basada en evidencias y en profesionales médicos capacitados para cualquier tratamiento que necesites."
    },
    "reversed": {
      "general": "La autoridad intelectual se desvía en despotismo, manipulación legal astuta o frialdad despiadada. El oráculo te advierte contra el uso de la lógica para herir o controlar a los que te rodean.",
      "love": "Falta de afecto real en el vínculo debido a una rigidez lógica y autoritaria de uno de los dos. Las discusiones se tornan en juicios donde se busca sentenciar al otro más que amarle. Ablanda el juicio.",
      "work": "Litigios comerciales complicados por falta de honestidad o abusos de autoridad en el trabajo. No intentes tomar atajos legales dudosos; el precio que pagarás en tu reputación financiera será muy alto.",
      "health": "Tensión nerviosa extrema que altera tus ritmos biológicos básicos (digestión, sueño). Tu mente analítica gira sin parar en bucles estériles; el cuerpo te pide reposo intelectual y relajación mental."
    }
  },
  {
    "id": 64,
    "name": "As de Oros",
    "keyThemes": "Semilla de riqueza · Salud sólida · Oportunidad tangible · Abundancia terrenal · Base de prosperidad.",
    "yesNoScore": 1,
    "yesNoText": "Sí, rotundo. Una semilla divina se ha plantado en tu camino y tiene toda la fuerza del cosmos para crecer.",
    "meanings": {
      "general": "El As de Oros muestra una mano divina emergiendo de una nube cargada de luz, sosteniendo un gran disco dorado con una estrella grabada sobre un jardín florido con un arco de rosas al fondo. Representa la semilla de la prosperidad material, una oportunidad de oro para consolidar tu salud, tu hogar o tus finanzas. El universo siembra riqueza en tu sendero; cuida el brote.",
      "love": "Amor sólido, seguro y con bases reales para construir a largo plazo. Augura la llegada de un compañero de vida con intenciones muy serias de construir estabilidad y hogar común contigo.",
      "work": "Nueva oferta de empleo muy rentable, inicio de un negocio próspero o inversión financiera exitosa. La suerte material te acompaña; asienta las bases con contratos claros y trabajo constante.",
      "health": "Vitalidad física excelente y una gran fuerza regeneradora en tu organismo. Excelente ciclo para iniciar tratamientos preventivos de salud, rutinas de nutrición y ejercicios que fortalezcan tus huesos y músculos."
    },
    "reversed": {
      "general": "El oráculo advierte sobre oportunidades financieras perdidas por avaricia o retrasos en la materialización de ingresos por no poner los cimientos prácticos necesarios. La riqueza mal administrada se deshace.",
      "love": "El interés material empaña el sentimiento sincero en la pareja. Discusiones recurrentes sobre dinero o posesiones que desgastan el afecto. El amor es un valor del alma, no de la cartera.",
      "work": "Retrasos en la recepción de un dinero esperado o inversiones financieras fallidas por imprudencia o codicia excesiva. No te dejes llevar por promesas de riqueza rápida; trabaja paso a paso.",
      "health": "Descuido de la salud física por dar prioridad absoluta a lo material. El cuerpo te pide atención a la alimentación y al descanso adecuado; no sacrifiques tu bienestar físico por tus finanzas."
    }
  },
  {
    "id": 65,
    "name": "Dos de Oros",
    "keyThemes": "Adaptabilidad · Malabares financieros · Cambio fluido · Equilibrio del día a día · Flexibilidad vital.",
    "yesNoScore": 0,
    "yesNoText": "Es un momento de pausa y elección. El oráculo te pide equilibrar tus opciones antes de avanzar.",
    "meanings": {
      "general": "El Dos de Oros muestra a un joven en la playa realizando malabarismos con dos grandes discos dorados enmarcados por el símbolo del infinito, con barcos subiendo y bajando en el mar tormentoso al fondo. Representa la adaptabilidad ante los cambios de la fortuna económica y física, y la habilidad de hacer malabares con tus tareas diarias sin perder la sonrisa.",
      "love": "Haces malabares para compaginar el tiempo de pareja con tus obligaciones profesionales y familiares. Aunque hay equilibrio flexible, cuida que la corriente de las tareas diarias no enfríe el encuentro íntimo.",
      "work": "Fluctuaciones económicas normales y la necesidad de priorizar gastos con inteligencia. Eres capaz de adaptarte a nuevos proyectos y horarios flexibles de forma ágil; la versatilidad es tu mayor ventaja laboral.",
      "health": "Necesidad de equilibrar el esfuerzo físico con el reposo adecuado de forma dinámica. El cuerpo responde bien a rutinas de ejercicio variadas que mejoren tu coordinación y flexibilidad general."
    },
    "reversed": {
      "general": "El oráculo detecta dispersión, desorganización financiera severa o fatiga por intentar sostener demasiados compromisos económicos y físicos a la vez. Los malabares fallan y los discos caen al suelo.",
      "love": "Inestabilidad emocional y falta de constancia en el compromiso afectivo. Te dejas llevar por los altibajos cotidianos, descuidando la atención que tu pareja necesita para sentirse segura y amada.",
      "work": "Pérdidas de dinero por desorden administrativo o retrasos en entregas de proyectos por intentar abarcar múltiples tareas a la vez. Pon orden en tu agenda laboral y delega responsabilidades.",
      "health": "Desequilibrio físico general derivado del estrés de un ritmo de vida caótico y sin rutinas básicas de alimentación y sueño. Tu cuerpo te pide orden y constancia en tu cuidado diario."
    }
  },
  {
    "id": 66,
    "name": "Tres de Oros",
    "keyThemes": "Trabajo en equipo · Maestría del oficio · Colaboración experta · Construcción sólida · Reconocimiento inicial.",
    "yesNoScore": 1,
    "yesNoText": "Sí, el camino de la expansión está abierto. Tus visiones comienzan a materializarse en el plano real.",
    "meanings": {
      "general": "El Tres de Oros muestra a un joven escultor trabajando en un templo de piedra, mientras un monje y un arquitecto le consultan con planos en la mano. Representa la colaboración constructiva, la maestría en el oficio y el valor de unir diferentes saberes para lograr una obra bella y duradera. El universo te pide que cooperes con expertos y trabajes con esmero.",
      "love": "Deciden construir juntos metas materiales a largo plazo en la pareja (comprar casa, iniciar un negocio común). El amor madura al aliarse en tareas constructivas diarias y apoyarse mutuamente.",
      "work": "Trabajo en equipo altamente productivo, reconocimiento a la calidad de tu oficio de parte de tus superiores o clientes, y la oportunidad de perfeccionar tus conocimientos técnicos. Éxito profesional sólido.",
      "health": "Tu salud se beneficia de una rutina de autocuidado bien estructurada bajo la guía de profesionales expertos (entrenadores, nutricionistas, médicos). El trabajo constante da frutos estables en tu cuerpo."
    },
    "reversed": {
      "general": "El oráculo detecta falta de sintonía en el equipo de trabajo, mediocridad por pereza o discusiones tontas por orgullo profesional. La obra común se resiente debido a que nadie quiere coordinar sus talentos.",
      "love": "Falta de apoyo mutuo en las tareas del hogar o de construcción común en la pareja. Alguien elude sus compromisos diarios, generando tensiones en el suelo sobre el que se asienta el vínculo.",
      "work": "Dificultades en proyectos por falta de cualificación técnica o roces de egos con socios y compañeros de tareas. Revisa los planos comerciales con calma antes de seguir esculpiendo la piedra.",
      "health": "Falta de constancia en tus tratamientos de salud. Te dejas llevar por la pereza descuidando la rutina física de forma recurrente; recupera la disciplina del artesano en tu cuidado corporal."
    }
  },
  {
    "id": 67,
    "name": "Cuatro de Oros",
    "keyThemes": "Aferramiento · Seguridad material · Miedo a la escasez · Posesividad afectiva · Control financiero.",
    "yesNoScore": 1,
    "yesNoText": "Sí, las bases que has construido son seguras. Puedes confiar en la estabilidad de esta situación.",
    "meanings": {
      "general": "El Cuatro de Oros muestra a un hombre sentado con gesto defensivo, sosteniendo un disco con sus brazos, pisando otros dos y coronado por un cuarto. Su cuerpo está rígido por el afán de retener lo que tiene por miedo a perderlo. Representa la estabilidad financiera pero conseguida a costa del aislamiento y la rigidez mental. El universo te invita a soltar un poco.",
      "love": "Celos, posesividad y dinámicas de control que asfixian el amor en la pareja. Estás aferrándote al otro por miedo a la soledad, olvidando que el afecto real solo florece en el espacio de la libertad mutua.",
      "work": "Seguridad financiera asegurada, pero con una mentalidad de tacañería o miedo a invertir que bloquea tu expansión. Te resistes a proponer innovaciones profesionales por temor a perder lo que ya has consolidado.",
      "health": "Rigidez en las articulaciones, estreñimiento o retención debido a una mente aferrada y defensiva. Tu cuerpo te pide estiramientos, hidratación generosa y aprender a respirar soltando el control de las cosas."
    },
    "reversed": {
      "general": "La rigidez mental se ablanda. El oráculo detecta que decides soltar el aferramiento a lo material y superar el miedo a la escasez. Empiezas a compartir tus recursos y tus afectos con generosidad libre.",
      "love": "Deciden romper con las dinámicas de celos y posesividad en la pareja, permitiendo que el vínculo respire de nuevo. Si estás soltero, dejas atrás la coraza defensiva dispuesta a abrirte al encuentro.",
      "work": "Te atreves a invertir en tu expansión comercial o profesional, rompiendo con el temor a perder ahorros. Los negocios avanzan al permitir que el dinero fluya de forma inteligente y constructiva.",
      "health": "Alivio de la rigidez física y de los problemas digestivos. Tu cuerpo recupera su fluidez a medida que aprendes a relajar tu mente y a soltar el estrés del control material diario."
    }
  },
  {
    "id": 68,
    "name": "Cinco de Oros",
    "keyThemes": "Cinco de Oros · Tierra · desafío · cambio e inestabilidad.",
    "yesNoScore": -1,
    "yesNoText": "No en este momento. Hay un conflicto o pérdida latente que requiere tu aprendizaje antes de avanzar.",
    "meanings": {
      "general": "Cinco de Oros se manifiesta en tu tirada como una llamada a materializar con el corazón libre. Esta energía representa la influencia del tierra en tu camino, recordándote que todo gran viaje empieza con un paso firme y consciente. El universo te pide que prestes atención a la sabiduría del día a día, pues en los pequeños gestos reside la clave de tu realización material y espiritual.",
      "love": "En el ámbito del afecto, esta carta sugiere un período de aprendizaje sincero. Si buscas pareja, el oráculo te aconseja sintonizar con tu propia vibración y autenticidad; si ya compartes tu vida con alguien, es momento de cultivar la empatía y la paciencia, permitiendo que la corriente fluya sin forzar compases.",
      "work": "Tus proyectos profesionales y financieros entran en una fase de desarrollo donde la constancia dará frutos estables. No te apresures; el camino del éxito duradero se esculpe paso a paso, honrando los acuerdos y trabajando con integridad. Se avecinan opciones interesantes si te mantienes receptivo.",
      "health": "El cuerpo físico te pide regresar a ritmos más naturales y sencillos. Escucha las demandas de descanso de tus células, incorpara alimentos puros y paseos que te enraícen con la tierra. La salud es el reflejo directo del alma en paz."
    },
    "reversed": {
      "general": "Cinco de Oros invertido sugiere un bloqueo de energía en la esfera del tierra. Te estás resistiendo a ver las circunstancias con objetividad, o estás actuando con un exceso de impaciencia que disipa tus fuerzas. El oráculo aconseja detener el galope mental y volver a tu centro antes de seguir adelante.",
      "love": "Hay pequeños malentendidos en el terreno afectivo. El orgullo o el temor a la vulnerabilidad están creando una distancia innecesaria en la relación. Abre el diálogo honesto y permite que se caiga la máscara del ego.",
      "work": "Fase de demoras o gastos imprevistos que te exigen orden y prudencia. No tomes decisiones financieras precipitadas ni te dejes llevar por falsas promesas de ganancias rápidas. Asegura los cimientos de tu labor.",
      "health": "El cuerpo refleja el cansancio acumulado por las tensiones emocionales y el estrés diario. Tu sistema inmunológico pide que bajes la guardia y te regales momentos de verdadero silencio y reposo reparador."
    }
  },
  {
    "id": 69,
    "name": "Seis de Oros",
    "keyThemes": "Generosidad equilibrada · Dar y recibir · Ayuda justa · Balanza comercial · Flujo de recursos.",
    "yesNoScore": 1,
    "yesNoText": "Sí, la luz regresa. Se augura un triunfo legítimo o un intercambio justo que sanará tu corazón.",
    "meanings": {
      "general": "El Seis de Oros muestra a un hombre rico portando una balanza en equilibrio con una mano, mientras reparte monedas con la otra a dos mendigos arrodillados en el suelo. Representa el flujo justo de los recursos, la generosidad consciente y la reciprocidad en el dar y recibir. El universo te pide que compartas tu abundancia si estás arriba, o aceptes la ayuda con gratitud si estás abajo.",
      "love": "Amor equilibrado y generoso en la pareja. Ambos se apoyan mutuamente de forma equitativa, sin que uno asuma todo el peso emocional o financiero. Hay respeto total al valor y las necesidades de cada uno.",
      "work": "Obtención de becas, préstamos bancarios favorables, aumentos de sueldo justos o un ambiente de trabajo donde se valora e incentiva tu talento. Las finanzas fluyen con equilibrio y orden constructivo.",
      "health": "Bienestar físico sostenido al equilibrar de forma inteligente tu gasto de energía y tu descanso. El cuerpo agradece que inviertas en una alimentación de calidad y en masajes y terapias preventivas."
    },
    "reversed": {
      "general": "El oráculo advierte sobre generosidad egoísta (dar solo por buscar control o aplauso ajeno) o un desequilibrio severo donde alguien se aprovecha de tus recursos afectivos o materiales sin dar nada a cambio.",
      "love": "Dinámicas de dependencia económica o chantaje afectivo en la pareja. Uno de los dos asume el control del vínculo a través del dinero o exige una sumisión injusta. Restauren el equilibrio mutuo.",
      "work": "Problemas en el trabajo por favoritismos injustos o deudas que no se cobran en el plazo previsto. No prestes dinero a socios sin garantías legales sólidas; cuida tus cuentas con rigor.",
      "health": "Gasto inútil de energía física por intentar complacer a todos a tu alrededor. Tu cuerpo te pide que pongas límites claros y reserves fuerzas para tu propio cuidado vital."
    }
  },
  {
    "id": 70,
    "name": "Siete de Oros",
    "keyThemes": "Paciencia sagrada · Evaluación de la cosecha · Pausa del labriego · Inversión lenta · Maduración del fruto.",
    "yesNoScore": 1,
    "yesNoText": "Sí, pero requerirá tu coraje y una estrategia inteligente. Mantén tu posición con firmeza.",
    "meanings": {
      "general": "El Siete de Oros muestra a un campesino apoyado en su azadón, contemplando en silencio los frutos de una vid que crecen adornados con siete discos dorados en primer plano. Representa la paciencia sagrada de quien ha sembrado con esmero y sabe esperar la maduración natural del fruto. El universo te dice: no fuerces las cosas, tu cosecha llegará a su hora.",
      "love": "La pareja está en una fase de consolidación y espera paciente, evaluando lo construido juntos hasta ahora para decidir el siguiente paso. El amor duradero requiere maduración lenta y respeto al ritmo del otro.",
      "work": "Inversiones de largo plazo que avanzan con lentitud pero seguridad, y proyectos profesionales que exigen paciencia antes de dar ganancias notables. Excelente ciclo para evaluar tus metas de carrera con calma.",
      "health": "Procesos de curación lenta que requieren constancia e constancia. No te desanimes si no ves mejoría inmediata; tu cuerpo está asimilando los cambios saludables que has incorporado de forma progresiva."
    },
    "reversed": {
      "general": "Impaciencia destructiva o decepción por una cosecha que consideras escasa para tu esfuerzo. El oráculo detecta frustración, pereza a mitad de camino o una tendencia a abandonar tus proyectos antes de que den fruto.",
      "love": "Ansiedad afectiva que sabotea el vínculo. Exiges garantías inmediatas de amor o compromisos apresurados que la otra parte aún no está lista para dar de forma madura. Calma tu impaciencia.",
      "work": "Pérdida de motivación en un proyecto por no ver ganancias rápidas, con riesgo de abandonar inversiones valiosas por impaciencia laboral. Revisa tus bases comerciales antes de rendirte.",
      "health": "Abandono de rutinas de salud por falta de resultados visibles en el corto plazo. Recuerda que la regeneración celular del cuerpo requiere tiempo; sé constante en tus buenos hábitos diarios."
    }
  },
  {
    "id": 71,
    "name": "Ocho de Oros",
    "keyThemes": "Dedicación experta · Trabajo de artesano · Detalle minucioso · Rutina productiva · Aprendizaje continuo.",
    "yesNoScore": 1,
    "yesNoText": "Sí, y llegará con gran velocidad. Prepárate para moverte rápido y adaptarte al cambio.",
    "meanings": {
      "general": "El Ocho de Oros muestra a un joven artesano sentado en su banco de trabajo, cincelando con esmero un disco de oro tras haber colgado otros seis ya listos en la pared. Representa la dedicación minuciosa al trabajo diario, la constancia de quien perfecciona su oficio con humildad y el gusto por la labor bien hecha. El universo premia la constancia de tu esfuerzo.",
      "love": "La pareja se nutre del cuidado de los detalles cotidianos cotidianos cotidianos. El amor maduro se construye día a día mediante pequeños gestos de afecto sincero, respeto mutuo y ayuda en las tareas del hogar.",
      "work": "Etapa de mucha concentración profesional, aprendizaje de técnicas especializadas avanzadas y una productividad intachable que te abrirá puertas. Tus clientes y jefes valoran tu rigor técnico.",
      "health": "Salud fuerte mantenida gracias a una disciplina diaria impecable. Eres constante en tus rutinas de ejercicio, nutrición y descanso; tu cuerpo responde a este orden meticuloso con vigor y vitalidad."
    },
    "reversed": {
      "general": "El oráculo detecta perfeccionismo obsesivo que te agota, o pereza y chapucería que minan la calidad de tu trabajo. Cuidado con caer en una rutina laboral aburrida que apague tu chispa creadora.",
      "love": "Aburrimiento y monotonía en la pareja por exceso de atención al trabajo o a las tareas cotidianas cotidianas, descuidando el romance y la diversión compartidos. Programen salidas espontáneas.",
      "work": "Falta de concentración en tus tareas o estancamiento profesional en un puesto repetitivo que no te permite crecer intelectualmente. Busca formación técnica para actualizar tus habilidades.",
      "health": "Problemas físicos por movimientos repetitivos en el trabajo o rigidez física por una disciplina deportiva excesivamente monótona y sin descansos. Flexibiliza tus hábitos de salud."
    }
  },
  {
    "id": 72,
    "name": "Nueve de Oros",
    "keyThemes": "Independencia próspera · Jardín de abundancia · Autonomía del alma · Halcón en el guante · Disfrute refinado.",
    "yesNoScore": 1,
    "yesNoText": "Sí, estás a un solo paso de tu meta. Sostén tu energía y confía en tu inmensa fortaleza.",
    "meanings": {
      "general": "El Nueve de Oros muestra a una mujer vestida con ropajes elegantes en medio de un viñedo cargado de uvas y nueve discos dorados, sosteniendo un halcón encapuchado en su mano enguantada. Representa la prosperidad lograda por tu propio esfuerzo, la independencia personal impecable y el placer de disfrutar del refinamiento de la vida en paz. El universo honra tu autonomía.",
      "love": "Disfrutas de tu vida afectiva desde un lugar de total plenitud y autosuficiencia personal. Si estás en pareja, el vínculo se basa en la libertad individual y en el orgullo mutuo; no hay dependencias insanas.",
      "work": "Éxito comercial brillante fruto de tu labor en solitario, autonomía financiera total y la capacidad de regalarte lujos legítimos sin dar explicaciones a nadie. Tus finanzas están sólidas y en expansión.",
      "health": "Salud vibrante y belleza física radiante que se cultiva con esmero. Disfrutas de retiros de bienestar, spas, masajes y una alimentación de alta calidad que nutre tu cuerpo de forma impecable."
    },
    "reversed": {
      "general": "El oráculo detecta una soledad oculta bajo las apariencias de éxito material, o un miedo a perder tu independencia que te impide vincularte con los demás de forma sincera y profunda.",
      "love": "Dificultad para permitir la intimidad afectiva en la pareja por temor a perder tu espacio propio. La desconfianza hacia el compromiso real crea una distancia fría en el lecho. Aprende a compartir.",
      "work": "Inseguridad económica camuflada tras compras innecesarias o lujos que no puedes permitirte en realidad. Revisa tu contabilidad con calma antes de comprometer tus recursos financieros.",
      "health": "Desequilibrio físico por exceso de refinamiento o falta de contacto directo con la tierra simple. Tu cuerpo te pide descalzarte en la hierba, comer de forma más rústica y relajar tu mente de posesiones."
    }
  },
  {
    "id": 73,
    "name": "Diez de Oros",
    "keyThemes": "Legado duradero · Riqueza familiar · Raíces profundas · Seguridad intergeneracional · Éxito total.",
    "yesNoScore": 0,
    "yesNoText": "Sí, pero ten cuidado con las cargas excesivas. El ciclo se completa, es momento de liberar peso.",
    "meanings": {
      "general": "El Diez de Oros muestra a tres generaciones en el arco de entrada de un castillo señorial: un anciano con capa de querubines acariciando dos perros, una pareja con un niño pequeño al fondo, y diez discos dorados entrelazados en el paisaje. Representa la culminación de la seguridad material, el legado familiar duradero y la riqueza que trasciende el tiempo. Tus raíces son firmes.",
      "love": "Amor sólido integrado en la comunidad y la familia. Planes estables de futuro, herencias compartidas o la compra de bienes familiares que aseguran el bienestar de todos los miembros del hogar.",
      "work": "Éxito comercial duradero, consolidación de empresas familiares prósperas o inversiones a largo plazo de gran estabilidad. Tu carrera profesional te brinda la seguridad de un patrimonio sólido.",
      "health": "Salud sólida cimentada en tu herencia genética favorable y en hábitos saludables tradicionales transmitidos en el hogar. Excelente período para cuidar el bienestar de los ancianos y niños de tu familia."
    },
    "reversed": {
      "general": "El oráculo detecta disputas familiares dolorosas por dinero, herencias o propiedades. Hay tensiones graves bajo el tejado señorial, donde la riqueza material no oculta la frialdad afectiva mutua.",
      "love": "Conflictos con tu pareja por interferencias financieras o familiares en el vínculo. Se discute más por el patrimonio o por las exigencias de la familia política que por el sentimiento real. Tracen límites.",
      "work": "Problemas en la empresa familiar por diferencias de criterio entre generaciones o pérdidas económicas por malas inversiones del patrimonio común. Actúen con asesoramiento legal neutral.",
      "health": "Preocupaciones excesivas por el futuro económico de la familia que perturban tu salud física en el ahora. Comparte la carga mental con tu entorno y prioriza la paz en tu mesa cotidiana."
    }
  },
  {
    "id": 74,
    "name": "Sota de Oros",
    "keyThemes": "Estudiante concentrado · Semilla de aprendizaje · Plan práctico · Noticia material · Mente enraizada.",
    "yesNoScore": 1,
    "yesNoText": "Sí, una noticia refrescante o una nueva oportunidad de aprendizaje viene hacia ti.",
    "meanings": {
      "general": "La Sota de Oros contempla con absoluta concentración el disco de oro que sostiene con ambas manos, de pie sobre un prado verde rodeado de árboles jóvenes y montañas al fondo. Trae la energía del estudiante humilde, el aprendiz de oficios prácticos y el portador de planes económicos viables. El universo te pide que te concentres y estudies con rigor.",
      "love": "Amor práctico, de intenciones sinceras pero de pasos lentos. Si buscas pareja, augura un encuentro con alguien estudioso, ordenado y que valora la estabilidad real por encima de los fuegos artificiales temporales.",
      "work": "Inicio de estudios especializados muy rentables, ofertas de prácticas profesionales bien remuneradas o el diseño detallado de un plan de negocio viable y realista. Paso a paso hacia la maestría.",
      "health": "Cuerpo que responde bien a la disciplina física metódica. Excelente período para iniciar rutinas de gimnasio sencillas, caminatas diarias y aprender sobre el funcionamiento biológico de tu organismo."
    },
    "reversed": {
      "general": "El oráculo detecta falta de concentración en tus estudios, pereza física o una tendencia a buscar atajos rápidos en las finanzas descuidando el trabajo de cimientos del día a día.",
      "love": "Falta de interés real en construir a futuro en la pareja por inmadurez o desgana. Las tareas cotidianas se descuidan, generando roces continuos por la falta de implicación de uno de los dos.",
      "work": "Proyectos laborales atrasados por desinterés en el detalle o falta de formación técnica. Evita iniciar inversiones comerciales sin haber estudiado primero el mercado con absoluto rigor científico.",
      "health": "Sedentarismo extremo y descuido de las rutinas de nutrición básicas por pereza mental. Tu cuerpo te pide reactivar tu metabolismo corporal mediante la constancia y el orden diario."
    }
  },
  {
    "id": 75,
    "name": "Caballero de Oros",
    "keyThemes": "Progreso lento · Fiabilidad absoluta · Esfuerzo metódico · Labriego paciente · Tierra firme.",
    "yesNoScore": 1,
    "yesNoText": "Sí, lánzate a la acción. El movimiento decidido y el valor te traerán lo que buscas.",
    "meanings": {
      "general": "El Caballero de Oros contempla sus campos arados de pie sobre su caballo negro, sosteniendo su disco con firmeza en su guantelete. Cabalga despacio, con la paciencia de quien sabe que los ciclos de la tierra no admiten prisas pero garantizan la cosecha. Representa la fiabilidad intachable, el trabajo duro y el honor del deber cumplido. Avanza con constancia.",
      "love": "Amor leal, seguro y de total confianza. Puede que el romance carezca de grandes pasiones teatrales, pero ofrece un refugio inexpugnable de lealtad y apoyo constante en las tareas de la vida.",
      "work": "Avances laborales lentos pero sumamente seguros, reputación intachable por tu seriedad y fiabilidad en los plazos de entrega, e inversiones estables de bajo riesgo que se revalorizan con el tiempo.",
      "health": "Fuerza física y resistencia notables basadas en tu disciplina e constancia diaria. Sabes escuchar a tu cuerpo de forma pragmática, incorporando rutinas saludables sólidas y constantes."
    },
    "reversed": {
      "general": "El oráculo detecta terquedad paralizante, estancamiento total en una rutina laboral aburrida, o avaricia que te impide disfrutar de los frutos de tu esfuerzo. El caballo negro se niega a avanzar.",
      "love": "Monotonía y aburrimiento crónico en la pareja por no querer romper la rutina diaria ni incorporar cambios. La falta de incentivos románticos apaga el fuego del vínculo. Despierten el afecto.",
      "work": "Retrasos en el desarrollo profesional por excesiva rigidez mental y rechazo sistemático a innovar en tus métodos comerciales. Abre tu mente a nuevas herramientas técnicas del sector.",
      "health": "Dolores musculares crónicos debido a la falta de flexibilidad física y de estiramientos. Tu cuerpo te pide incorporar natación, yoga o ejercicios que aporten elasticidad a tus articulaciones."
    }
  },
  {
    "id": 76,
    "name": "Reina de Oros",
    "keyThemes": "Abundancia doméstica · Nutrición del alma · Confort práctico · Madre tierra · Generosidad sabia.",
    "yesNoScore": 1,
    "yesNoText": "Sí, confía en tu poder magnético y en tu sabiduría receptiva. Atraerás lo que es tuyo por derecho.",
    "meanings": {
      "general": "La Reina de Oros se sienta en su trono de piedra decorado con motivos frutales y cabezas de cabra, rodeada de un jardín florecido con un conejo a sus pies, contemplando con ternura el gran disco dorado en su regazo. Representa el confort doméstico, la nutrición física de calidad y la abundancia que se comparte con amor práctico. Eres el refugio cálido de tu entorno.",
      "love": "Amor cálido, protector, hogareño y sensual. La pareja disfruta del confort mutuo, de la buena mesa y de un hogar decorado con amor. Si buscas pareja, tu sensualidad natural y tu ternura serán tu mejor imán.",
      "work": "Excelente gestión de las finanzas domésticas e ingresos comerciales prósperos. Tu liderazgo laboral se basa en la generosidad y el cuidado práctico de tus colaboradores; ambiente muy productivo.",
      "health": "Salud vibrante y gran sintonía con las necesidades nutricionales de tu cuerpo. Excelente ciclo para disfrutar de la buena alimentación natural, masajes reparadores y terapias de enraizamiento terrestre."
    },
    "reversed": {
      "general": "El oráculo detecta desconfianza económica excesiva, descuido del hogar o un desequilibrio físico derivado de la ansiedad por las posesiones. Sientes que tu mesa se enfría por falta de calidez sincera.",
      "love": "Dinámicas de posesividad, celos domésticos o excesivo control de los gastos cotidianos cotidianos cotidianos que desgastan la armonía en la pareja. El amor se congela en un clima de quejas materiales. Sean generosos.",
      "work": "Problemas en el trabajo por actitudes desconfiadas, desorganización financiera o excesiva competitividad con tus compañeras. Lidera desde el apoyo mutuo y no desde el miedo a la escasez.",
      "health": "Desequilibrios digestivos debido al estrés y a una mala alimentación derivada de la ansiedad material diaria. Tu cuerpo te pide purificar tu dieta e incorporar rutinas de descanso y paz."
    }
  },
  {
    "id": 77,
    "name": "Rey de Oros",
    "keyThemes": "Maestría material · Constructor de imperios · Riqueza consolidada · Proveedor generoso · Éxito terrenal.",
    "yesNoScore": 1,
    "yesNoText": "Sí, actúa con la nobleza y firmeza de un líder. El orden y la maestría te garantizan el éxito.",
    "meanings": {
      "general": "El Rey de Oros se sienta en su trono decorado con cabezas de toro, rodeado de parras de uvas y castillos al fondo, portando su cetro y su disco con mirada de absoluta satisfacción material. Representa al constructor que ha consolidado su imperio material con esfuerzo constante, honradez e inteligencia práctica. El universo te pide que lideres tus finanzas con maestría y compartas tu éxito.",
      "love": "Amor duradero, de total confianza, fidelidad intachable y una gran estabilidad afectiva y doméstica. Hay seguridad absoluta en la pareja de cara al futuro. Si buscas amor, augura la llegada de un excelente proveedor.",
      "work": "Éxito comercial supremo, inversiones rentables estables de largo plazo y el reconocimiento como líder financiero en tu sector. Tu capacidad para materializar la riqueza es excelsa; actúa con integridad ética.",
      "health": "Vigor físico y salud excelente cimentada en la disciplina diaria y en una sintonía pragmática con las necesidades de tu cuerpo. Gozas de una gran longevidad biológica gracias a tu mente serena."
    },
    "reversed": {
      "general": "El oráculo detecta ambición despiadada, tacañería o una completa falta de ética comercial en tus negocios cotidianos cotidianos. Cuidado con ceder todo tu valor personal al tamaño de tu cuenta de ahorros.",
      "love": "La pareja sufre por el excesivo materialismo de uno de los dos, que pretende compensar la falta de afecto sincero con regalos costosos. La lealtad real no se compra con dinero. Sean sinceros.",
      "work": "Riesgos de pérdidas de dinero por negocios tomados con avaricia o deudas comerciales difíciles de saldar por mala administración. Revisa tus cuentas con rigor ético antes de avanzar.",
      "health": "Dolencias físicas derivadas del exceso de peso o falta de ejercicio regular por sedentarismo gozoso. Tu cuerpo te pide disciplina física y moderación en el disfrute sensorial cotidiano."
    }
  }
];

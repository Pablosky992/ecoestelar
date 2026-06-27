/**
 * El Eco de las Estrellas - Lógica del Blog y Sabiduría Cósmica (Edición Ilustrada)
 */

// Base de Datos Estática de Artículos
const ARTICULOS_DB = [
  {
    id: "numerologia-destino",
    title: "Guía Completa de Numerología: Calcula tu Sendero de Vida y Número de Destino",
    badge: "Numerología",
    image: "assets/numerologia_cabala.png",
    date: "24 de Junio, 2026",
    author: "El Eco de las Estrellas",
    excerpt: "Descubre cómo los números determinan tu personalidad y misión en la Tierra. Paso a paso para realizar la Gematría pitagórica del nombre y el misterio de los Números Maestros.",
    body: `
      <p>La numerología es una disciplina ancestral que se fundamenta en principios matemáticos e intuitivos que datan de la antigüedad. No es una técnica puramente adivinatoria del futuro, sino una herramienta de autoayuda, introspección personal y orientación espiritual para sintonizar con la vibración cósmica.</p>
      
      <img src="assets/numerologia_cabala.png" alt="Símbolos Geométricos Mysticos y Números Cósmicos Flotando en el Universo">

      <h3>El Origen Pitagórico</h3>
      <p>Se atribuye la creación de esta disciplina al célebre matemático y filósofo griego <strong>Pitágoras</strong> hace aproximadamente 2700 años. Pitágoras propuso que el universo está constituido por vibraciones ordenadas matemáticamente. Su teoría establece una cadena directa de correspondencia vibratoria:</p>
      <div style="text-align:center; font-family:var(--font-serif); margin:1.5rem 0; font-size:1.2rem; color:var(--gold-color);">
        Números &rarr; Sonidos &rarr; Vibraciones &rarr; Planetas
      </div>
      <p>De acuerdo con esta visión, cada número emite una frequency energética particular que interactúa de forma constante con los seres humanos y el entorno. Estas vibraciones personales tienden a manifestarse repetidamente en la vida cotidiana para ayudarnos a alinear nuestra conciencia con la armonía cósmica.</p>

      <h3>1. Cómo Calcular tu Número de Sendero de Vida (Fecha de Nacimiento)</h3>
      <p>Tu número de destino o sendero de vida revela tu carácter innato, tus talentos y, lo más importante, tu misión de vida en esta encarnación terrenal.</p>
      <p><strong>Procedimiento paso a paso:</strong></p>
      <ol>
        <li>Suma todos los dígitos que componen tu fecha de nacimiento completa (día, mes y año).</li>
        <li>Reduce el total sumando sus dígitos de forma repetida hasta obtener un valor de un solo dígito (del 1 al 9).</li>
        <li><strong>Regla de los Números Maestros:</strong> Si durante el proceso de reducción el total parcial de la suma resulta en <strong>11, 22 o 33</strong>, el cálculo se detiene inmediatamente. Estos números poseen un rango energético superior y no deben reducirse a un solo dígito.</li>
      </ol>
      <p><strong>Ejemplo práctico:</strong> Si naciste el 8 de noviembre de 1980 (08/11/1980):<br>
      Suma: 8 (día) + 1 + 1 (mes) + 1 + 9 + 8 + 0 (año) = 28.<br>
      Reducción: 2 + 8 = 10 &rarr; 1 + 0 = 1. Tu número personal es el <strong>1</strong>.</p>

      <h3>2. Cómo Calcular la Vibración de tu Nombre (Gematría Pitagórica)</h3>
      <p>Esta metodología permite descubrir la vibración del yo externo y social a través del nombre y los apellidos completos, convirtiendo cada letra en un número según la tabla pitagórica:</p>
      <div class="table-container" style="overflow-x:auto; margin: 1.5rem 0;">
        <table style="width:100%; border-collapse:collapse; border:1px solid var(--border-color); text-align:center; font-family:var(--font-serif);">
          <thead>
            <tr style="background:rgba(255,255,255,0.05); color:var(--gold-color);">
              <th style="padding:0.5rem; border:1px solid var(--border-color);">1</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">2</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">3</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">4</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">5</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">6</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">7</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">8</th>
              <th style="padding:0.5rem; border:1px solid var(--border-color);">9</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">A, J, S</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">B, K, T</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">C, L, U</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">D, M, V</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">E, N, W</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">F, O, X</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">G, P, Y</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">H, Q, Z</td>
              <td style="padding:0.5rem; border:1px solid var(--border-color);">I, R</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Simplemente sustituye cada letra de tu nombre completo por el número correspondiente, suma todos los valores y redúcelos de la misma manera que la fecha de nacimiento.</p>

      <h3>3. Significado Profundo de los Números de Destino (1 al 9)</h3>
      <ul>
        <li><strong>Número 1 (El Líder):</strong> Liderazgo, independencia, creatividad e iniciativa. Su misión es aprender a ser autosuficiente y abrir caminos para otros sin caer en el egoísmo o el autoritarismo. Representa la vibración de los nuevos comienzos, de la chispa creadora y de la fuerza iniciadora que no teme caminar en solitario.</li>
        <li><strong>Número 2 (El Diplomático):</strong> Cooperación, diplomacia y búsqueda del equilibrio. Su misión es aprender a conciliar y mediar en conflictos, desarrollando una empatía sincera sin descuidar sus propios límites. Representa la dualidad, la receptividad y el arte de la escucha.</li>
        <li><strong>Número 3 (El Comunicador):</strong> Creatividad, optimismo y carisma. Su misión de vida es comunicar e inspirar a través del arte, la escritura o la palabra hablada, llevando alegría al entorno y disolviendo la negatividad mediante la expresión espontánea del corazón.</li>
        <li><strong>Número 4 (El Constructor):</strong> Orden, lealtad y disciplina. Su misión es establecer estructuras seguras y bases firmes en el plano terrenal. Debe equilibrar su necesidad de seguridad con la flexibilidad ante los cambios inesperados de la vida.</li>
        <li><strong>Número 5 (El Aventurero):</strong> Espíritu libre, dinamismo y adaptabilidad. Su misión es experimentar la libertad personal con responsabilidad, sirviendo como puente de comunicación e intercambio entre personas de diversas culturas o formas de pensar.</li>
        <li><strong>Número 6 (El Protector):</strong> Amor familiar, responsabilidad y honestidad. Su camino exige asumir compromisos afectivos, cuidar del núcleo familiar, crear belleza en el hogar y actuar como sanador energético de sus seres queridos.</li>
        <li><strong>Número 7 (El Buscador):</strong> Intelecto, introspección, análisis y vida espiritual. Su misión es estudiar los misterios de la existencia en soledad, actuando como un puente entre la ciencia racional y la intuición mística profunda.</li>
        <li><strong>Número 8 (El Ejecutivo):</strong> Éxito material, ambición y capacidad de mando. Su misión es dominar las finanzas y el plano material con absoluta rectitud ética, actuando como un administrador justo que provee al bienestar de la sociedad.</li>
        <li><strong>Número 9 (El Humanitario):</strong> Altruismo, compasión y perdón. Su sendero le llama a servir incondicionalmente a la humanidad, desapegándose de las ambiciones puramente egoístas para sintonizar con el amor universal.</li>
      </ul>

      <h3>4. Los Números Maestros y la Trascendencia Evolutiva</h3>
      <p>Los números maestros (11, 22 y 33) se asocian con un plano vibratorio superior, una gran responsabilidad espiritual y lecciones kármicas intensas. Describen el sendero evolutivo que toda alma debe transitar:</p>
      <ul>
        <li><strong>Número Maestro 11 (La Percepción Espiritual):</strong> Representa la sintonía directa con lo invisible, el canal o puente con los planos sutiles. Su vibración exige una constante alineación con la verdad divina, sirviendo como faro intuitivo para otros. A menudo sufren tensiones internas porque perciben verdades invisibles que el mundo material rechaza.</li>
        <li><strong>Número Maestro 22 (El Constructor Material):</strong> Posee la intuición y el idealismo del 11 pero con el poder práctico de plasmar esos ideales espirituales en realidades concretas, proyectos a gran escala y obras de infraestructura o sistemas sociales que trasciendan generaciones.</li>
        <li><strong>Número Maestro 33 (La Iluminación Colectiva):</strong> Considerado la vibración del avatar o guía compasivo. Representa el amor universal puro puesto enteramente al servicio de curar, guiar y consolar a la humanidad sin esperar ninguna recompensa terrenal. Su sendero exige un desa      <p>Además del número de destino, la numerología pitagórica analiza el <strong>Año Personal</strong> actual de cada individuo para entender los tránsitos y las tareas que el cosmos nos asigna en cada ciclo de 9 años. Este número se obtiene sumando tu día de nacimiento, tu mes de nacimiento y el año en curso. Por ejemplo, si naciste el 8 de noviembre y deseas saber tu tránsito para el año 2026: 8 + 11 (mes) + 2026 &rarr; 8 + 1 + 1 + 2 + 0 + 2 + 6 = 20 &rarr; 2. Estarías en un Año Personal 2, un periodo ideal para asociarse, cultivar la paciencia y evitar decisiones precipitadas.</p>
    `
  },
  {
    id: "astrologia-basica",
    title: "Introducción al Zodiaco: Elementos, Planetas y Casas Astrológicas",
    badge: "Astrología",
    image: "assets/luna_hero_banner.png",
    date: "25 de Junio, 2026",
    author: "El Eco de las Estrellas",
    excerpt: "Aprende los fundamentos para leer tu mapa natal. Qué significan las 12 casas de la experiencia humana, las regencias planetarias y la fuerza arquetípica de los 4 elementos.",
    body: `
      <p>La astrología es el lenguaje simbólico del cielo. El zodiaco comprende 12 signos que representan el recorrido anual del Sol a través de las constelaciones terrestres, permaneciendo un mes en cada una de ellas y simbolizando el desarrollo completo de la conciencia humana.</p>

      <img src="assets/luna_hero_banner.png" alt="El firmamento estrellado e influjo cósmico sobre el zodiaco">

      <h3>1. Los Cuatro Elementos de la Astrología</h3>
      <p>Los signos zodiacales se dividen en cuatro elementos de la naturaleza, que describen la energía básica, el temperamento y la forma en que el individuo procesa el mundo:</p>
      <ul>
        <li><strong>Fuego (Aries, Leo, Sagitario):</strong> Dinámicos, optimistas, independientes y sumamente activos. Buscan la autoexpresión libre de su voluntad. En su polo de sombra, pueden caer en la impaciencia, la ira o la tiranía egoísta hacia los demás.</li>
        <li><strong>Tierra (Tauro, Virgo, Capricornio):</strong> Prácticos, realistas, disciplinados y orientados a dar frutos materiales. Buscan estabilidad y seguridad física. Su reto es no caer en el materialismo áido, el miedo a los cambios o la rigidez de pensamiento.</li>
        <li><strong>Aire (Géminis, Libra, Acuario):</strong> Intelectuales, elocuentes, sociables y lógicos. Procesan la realidad a través de las ideas y la comunicación. Su debilidad es la dispersión, la inconstancia o la desconexión emocional con su propia corporalidad.</li>
        <li><strong>Agua (Cáncer, Escorpio, Piscis):</strong> Emocionales, sumamente intuitivos, empáticos y sensibles. Sienten y absorben el entorno como esponjas energéticas. Su gran desafío evolutivo es no dejarse arrastrar por la hipersensibilidad, el victimismo o la codependencia afectiva.</li>
      </ul>

      <h3>2. Los Planetas and sus Regencias Astrales</h3>
      <p>Los planetas representan arquetipos psíquicos activos dentro de nosotros. La astrología asigna a cada signo un planeta regente que actúa como el canal principal de su energía:</p>
      <ul>
        <li><strong>El Sol (☀️):</strong> Rige a <em>Leo</em>. Representa el núcleo del Ego consciente, la identidad, la fuerza de voluntad creadora y la chispa divina que nos impulsa a brillar.</li>
        <li><strong>La Luna (🌙):</strong> Rige a <em>Cáncer</em>. Representa el subconsciente, el mundo de la memoria emocional, la madre, la nutrición afectiva y la intuición psíquica.</li>
        <li><strong>Mercurio (☿):</strong> Rige a <em>Géminis</em> (mente asociativa, curiosidad intelectual) y a <em>Virgo</em> (mente analítica, discernimiento y sentido del orden práctico).</li>
        <li><strong>Venus (♀):</strong> Rige a <em>Tauro</em> (los placeres físicos, los recursos estables y el amor propio) y a <em>Libra</em> (la armonía en pareja, las artes estéticas y la diplomacia social).</li>
        <li><strong>Marte (♂):</strong> Rige a <em>Aries</em>. Fuerza física de ataque, iniciativa, impulso sexual básico y el coraje de conquistar nuevos horizontes territoriales.</li>
        <li><strong>Júpiter (♃):</strong> Rige a <em>Sagitario</em>. El gran planeta benefactor de la expansión espiritual, los estudios filosóficos superiores, el optimismo y la buena estrella en el destino.</li>
        <li><strong>Saturno (♄):</strong> Rige a <em>Capricornio</em>. El señor del karma y de las lecciones del tiempo. Rige las estructuras rígidas, los límites constructivos, la disciplina, la paciencia y el esfuerzo recompensado a largo plazo.</li>
      </ul>

      <h3>3. Las 12 Casas Astrológicas: Escenarios de la Experiencia</h3>
      <p>Una carta natal divide la bóveda celeste en 12 áreas llamadas casas. Cada una de ellas representa un escenario específico donde los planetas expresan su fuerza arquetípica:</p>
      <ol>
        <li><strong>Casa I (Ascendente):</strong> La personalidad exterior, la constitución corporal, la máscara social y la energía con la que iniciamos los proyectos de vida. (Aries)</li>
        <li><strong>Casa II:</strong> Los recursos económicos ganados con esfuerzo propio, la abundancia material, las posesiones y la autovaloración. (Tauro)</li>
        <li><strong>Casa III:</strong> La comunicación, el intelecto cotidiano, los hermanos, el entorno cercano, los estudios escolares y los viajes cortos por tierra. (Géminis)</li>
        <li><strong>Casa IV (Fondo del Cielo):</strong> Las raíces familiares, los ancestros, el hogar de origen, la relación íntima con la madre y la vejez. (Cáncer)</li>
        <li><strong>Casa V:</strong> La creatividad lúdica, los romances amorosos, los hijos, el ocio, el juego y las creaciones artísticas que nacen del ego. (Leo)</li>
        <li><strong>Casa VI:</strong> La rutina laboral diaria, el cuidado de la salud física, el servicio a los demás, la higiene personal y las mascotas. (Virgo)</li>
        <li><strong>Casa VII (Descendente):</strong> Los contratos formales, los matrimonios, los socios comerciales, los acuerdos y los rivales declarados. (Libra)</li>
        <li><strong>Casa VIII:</strong> La transmutación interna, las crisis psicológicas, los recursos financieros compartidos, las herencias, la sexualidad tántrica y las ciencias ocultas. (Escorpio)</li>
        <li><strong>Casa IX:</strong> Los estudios universitarios, la filosofía de vida, las religiones, el gurú o guía intelectual y los viajes al extranjero de larga duración. (Sagitario)</li>
        <li><strong>Casa X (Mediocielo):</strong> El estatus profesional ante la sociedad, la vocación del alma, el reconocimiento público y la figura del padre. (Capricornio)</li>
        <li><strong>Casa XI:</strong> Los proyectos colectivos, los círculos de amigos, los ideales humanitarios, el salario indirecto y los protectores influyentes. (Acuario)</li>
        <li><strong>Casa XII:</strong> El karma acumulado, el aislamiento regenerativo (hospitales, monasterios), el inconsciente colectivo, los sacrificios y la disolución del ego en la Fuente. (Piscis)</li>
      </ol>

      <h3>4. Los Tránsitos Planetarios y la Astrología Evolutiva</h3>
      <p>A diferencia de la astrología puramente horóscopa de revista, la astrología evolutiva concibe tu carta natal no como una condena de nacimiento, sino como una partitura musical dinámica. Los planetas continuúan moviéndose en el cielo e interactúan constantemente con los puntos fijos de tu carta natal. A esta relación la llamamos <strong>tránsitos planetarios</strong>. Por ejemplo, cuando Saturno transita por tu Casa VII, es muy probable que tus relaciones de pareja pasen por un período de prueba y realismo, empujándote a madurar tu forma de vincularte con los demás.</p>
    `
  },
  {
    id: "espejo-del-tarot",
    title: "El Tarot como Espejo del Alma: Filosofía de Consulta y Métodos de Limpieza",
    badge: "Tarot",
    image: "assets/tarot_marsella_wide.png",
    date: "26 de Junio, 2026",
    author: "El Eco de las Estrellas",
    excerpt: "Desmitificando el tarot. Aprende por qué el oráculo es una guía para el crecimiento personal, cómo formular preguntas empoderadoras y limpiar las energías de tu mazo.",
    body: `
      <p>El tarot ha sido malinterpretado históricamente como una herramienta de adivinación pasiva o fatalista. Sin embargo, su verdadero propósito es esotérico y evolutivo: actuar como un <strong>espejo del alma</strong>. Es un instrumento de desarrollo personal, meditación y autoconocimiento diseñado para hacer consciente lo inconsciente y ayudarnos a tomar decisiones conscientes dueñas de nuestro propio destino.</p>

      <img src="assets/tarot_marsella_wide.png" alt="Baraja completa del Tarot de Marsella y tapete de lectura espiritual">

      <h3>1. El Enfoque Evolutivo del Tarot</h3>
      <p>La baraja de tarot está compuesta por 78 cartas divididas en <strong>22 Arcanos Mayores</strong> (arquetipos espirituales del viaje evolutivo del alma) y <strong>56 Arcanos Menores</strong> (experiencias, elementos y tránsitos de la vida cotidiana). Cuando realizas una lectura, las cartas no deciden tu futuro de forma rígida; reflejan tus dinámicas psicológicas actuales para ayudarte a comprender las causas y efectos de tu conducta en el presente.</p>
      <p>El tarotista no predice desgracias ineludibles. Su rol es aportar lucidez mental y ofrecer alternativas prácticas para que el consultante sea <strong>causativo</strong> (creador activo de su realidad) en lugar de un mero efecto pasivo de las circunstancias externas.</p>

      <h3>2. Cómo Formular Preguntas Efectivas al Oráculo</h3>
      <p>Formular mal las preguntas es la principal causa de lecturas confusas y desmotivadoras. Para obtener respuestas claras y sabias, debemos cambiar las preguntas predictivas cerradas por preguntas evolutivas abiertas:</p>
      <ul>
        <li><strong>Mantén el enfoque en ti mismo:</strong> No preguntes por la conducta o sentimientos de terceros sin su consentimiento. Enfócate en tu propia reacción y evolución.
          <br>❌ <em>Incorrecto:</em> ¿Mi pareja me está mintiendo?
          <br>✔️ <em>Correcto:</em> ¿Cómo puedo fomentar una comunicación más transparente y honesta con mi pareja?
        </li>
        <li><strong>Evita preguntas cerradas de Sí o No:</strong> Fomentan la pasividad mental y limitan la riqueza simbólica del oráculo.
          <br>❌ <em>Incorrecto:</em> ¿Conseguiré el empleo?
          <br>✔️ <em>Correcto:</em> ¿Qué habilidades necesito potenciar y qué bloqueos debo liberar para triunfar en esta entrevista laboral?
        </li>
        <li><strong>Enfréntate a las sombras (Shadow Work):</strong> Pregunta qué te bloquea de la abundancia o el amor en vez de esperar milagros pasivos del exterior.
          <br>❌ <em>Incorrecto:</em> ¿Ganaré la lotería pronto?
          <br>✔️ <em>Correcto:</em> ¿Qué creencias limitantes sobre el éxito o la carencia heredé de mi linaje familiar y cómo puedo transmutarlas hoy?
        </li>
      </ul>

      <h3>3. Higiene Espiritual: Cómo Limpiar Energéticamente tu Mazo</h3>
      <p>Las cartas absorben las vibraciones del entorno y de las personas que las tocan. Para mantener despejada la conexión intuitiva con tus cartas, es aconsejable limpiarlas en las siguientes situaciones:</p>
      <ol>
        <li>Al comprar o recibir el mazo por primera vez (elimina las energías de fabricación y transporte).</li>
        <li>Si otras personas tocan tu mazo.</li>
        <li>Antes de iniciar una lectura profunda.</li>
        <li>Si sientes que las respuestas son repetitivas, confusas o incoherentes.</li>
      </ol>

      <h4>Métodos Seguros de Limpieza:</h4>
      <ul>
        <li><strong>Sahumerio de Palo Santo o Salvia:</strong> Enciende la madera o hierba sagrada y pasa el abanico de cartas repetidamente a través de las corrientes de humo aromático para disolver la energía acumulada.</li>
        <li><strong>Baño de Luz de Luna:</strong> Coloca tu mazo en el alféizar de una ventana bajo el influjo de la luna llena durante la noche. Es el método más sintonizado con el inconsciente y las energías lunares.</li>
        <li><strong>Limpieza con Cristales:</strong> Coloca una piedra de <strong>selenita</strong>, <strong>turmalina negra</strong> o <strong>cuarzo transparente</strong> sobre el mazo apilado durante unas horas. Estos minerales absorben y disuelven las energías densas acumuladas de forma pasiva y segura.</li>
        <li><strong>Soplar y golpear:</strong> Extiende las cartas, sopla con suavidad una vez a lo largo del mazo y, tras apilarlo, dale un golpe seco con los nudillos de tu mano dominante para romper el magnetismo estancado al instante.</li>
      </ul>

      <h3>4. El Simbolismo Cromático y Postural en el Tarot de Marsella</h3>
      <p>De acuerdo con las enseñanzas tradicionales de autores como Fernanda Nosenzo, cada detalle en las cartas del Tarot de Marsella emite un mensaje codificado para el inconsciente:</p>
      <ul>
        <li><strong>Los Siete Colores Sagrados:</strong> El <em>Blanco</em> representa la divinidad y la iniciación pura; el <em>Negro</em> es la sombra fértil y la muerte iniciática de la que resurge la vida; el <em>Rojo</em> simboliza la acción vital, la fuerza terrenal y la pasión; el <em>Azul</em> representa la serenidad mental y las leyes sutiles; el <em>Verde</em> es la regeneración natural de la materia; y el <em>Amarillo</em> representa la luz solar de la verdad.</li>
        <li><strong>El Lenguaje Corporal:</strong> Si los personajes miran a la derecha, su atención está puesta en el futuro y la acción lógica; si miran a la izquierda, señalan introspección, memoria emocional e intuición sutil. Los pies cubiertos por túnicas representan raíces y motivaciones espirituales, mientras que los pies descalzos conectan directamente con las corrientes telúricas de la tierra.</li>
      </ul>
    `
  },
  {
    id: "secreto-arcanos-menores",
    title: "El Secreto del Tarot de Marsella: Cómo leer los Arcanos Menores sin perderte",
    badge: "Tarot",
    image: "assets/arcanos_menores_banner.jpg",
    date: "27 de Junio, 2026",
    author: "El Eco de las Estrellas",
    excerpt: "Desvela el código místico que une los elementos naturales y la numerología para leer las 56 cartas de los Arcanos Menores con total precisión y fluidez.",
    body: `
      <p>El Tarot de Marsella es la baraja madre de la cartomancia occidental. Sus Arcanos Mayores —como El Mago, La Emperatriz o El Mundo— son fácilmente reconocibles por sus ricas ilustraciones llenas de personajes y detalles medievales. Sin embargo, cuando nos adentramos en el territorio de los Arcanos Menores, la cosa cambia.</p>

      <img src="assets/arcanos_menores_banner.jpg" alt="Tarotista realizando una tirada de tarot con velas y tapete de astrología">

      <p>Frente a las 56 cartas que componen los palos de Copas, Bastos, Espadas y Oros, muchos principiantes se sienten perdidos. Al no mostrar escenas dinámicas con personas, sino patrones geométricos y numéricos, es común pensar: <em>¿Cómo voy a recordar el significado de todo esto?</em></p>
      
      <p>El secreto del Tarot de Marsella es que no necesitas memorizar 56 definiciones de memoria. Este mazo se lee a través de un código perfecto que une dos elements: <strong>la energía del palo (el elemento)</strong> y <strong>el significado del número (la numerología)</strong>. Si aprendes a combinarlos, sabrás leer cualquier carta al instante.</p>

      <h3>Los 4 Palos: ¿Qué aspecto de la vida maneja cada uno?</h3>
      <p>Para entender qué terreno estás pisando en una lectura, lo primero es identificar el palo de la carta. Cada uno de ellos está ligado a un elemento de la naturaleza y a una faceta de la experiencia humana:</p>
      <ul>
        <li><strong>Copas (Elemento Agua):</strong> Representan el mundo emocional. Hablan de los sentimientos, las relaciones de pareja, la familia, la amistad, el amor propio y la intuición sutil.</li>
        <li><strong>Oros (Elemento Tierra):</strong> Gobiernan el plano material. Están relacionados con el dinero, el trabajo, los negocios, la salud física, las propiedades y todo aquello que se puede tocar, concretar y construir a largo plazo.</li>
        <li><strong>Espadas (Elemento Aire):</strong> Manejan el plano mental. Simbolizan los pensamientos, el intelecto, la comunicación, las dudas, las leyes, las verdades dolorosas y los conflictos verbales.</li>
        <li><strong>Bastos (Elemento Fuego):</strong> Son la pura energía vital. Hablan de la pasión, la creatividad, los proyectos que se inician, la acción decidida, el instinto y el impulso sexual primario.</li>
      </ul>

      <div class="narrative-box" style="background: rgba(8, 7, 17, 0.6); border-left: 4px solid var(--gold-color); padding: 1.2rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; font-size: 0.95rem;">
        <strong>Guía de Consulta rápida:</strong> Si en algún momento tienes dudas sobre la interpretación exacta de una carta de Oros, Copas, Bastos o Espadas, recuerda que puedes buscar su desglose profundo en nuestro <a href="grimorio.html" style="color: var(--gold-color); text-decoration: underline;">Libro del Tarot (Grimorio)</a>.
      </div>

      <h3>El Código Numérico: El viaje del 1 al 10</h3>
      <p>En el Tarot de Marsella, los números nos indican en qué etapa de desarrollo y maduración se encuentra la energía elemental del palo. Aquí tienes el mapa numérico básico:</p>
      <ul>
        <li><strong>Los Ases (1):</strong> El inicio puro. Es el potencial, la semilla cósmica, la oportunidad que se presenta en bruto pero que aún debe desarrollarse y pulirse.</li>
        <li><strong>Los Dos (2):</strong> La dualidad y la gestación. Es un momento de acumulación pasiva, de espera, de mirar hacia adentro o de elegir con calma entre dos opciones.</li>
        <li><strong>Los Tres (3):</strong> La primera explosión. Representa la acción directa, el entusiasmo inicial, la creatividad desbordada, los primeros frutos y el movimiento.</li>
        <li><strong>Los Cuatros (4):</strong> La estabilidad. Es la base sólida, la seguridad, el orden absoluto y el descanso merecido (aunque con el riesgo de caer en la monotonía y la rigidez).</li>
        <li><strong>Los Cincos (5):</strong> El desafío o la crisis. Rompe la rigidez del cuatro para introducir un cambio sumamente necesario, una prueba de voluntad o una nueva perspectiva.</li>
        <li><strong>Los Seis (6):</strong> La armonía y el placer. Representa la belleza, el equilibrio recobrado, el reencuentro con los demás y el disfrute pacífico.</li>
        <li><strong>Los Sietes (7):</strong> La acción consciente. Es el número del éxito dinámico, el avance con determinación, la conquista de metas y el esfuerzo enfocado.</li>
        <li><strong>Los Ochos (8):</strong> La perfección y la justicia. Representa el equilibrio perfecto, la concentración interna, el orden y la organización minuciosa.</li>
        <li><strong>Los Nueves (9):</strong> La transición y el desapego. El final del ciclo está muy cerca; es un momento de crisis positiva, madurez profunda y preparación solitaria para lo nuevo.</li>
        <li><strong>Los Dieces (10):</strong> La culminación. Representa la totalidad, el cierre absoluto de una gran etapa y la preparación inminente para volver a empezar desde el As.</li>
      </ul>

      <img src="assets/arcanos_menores_cards.jpg" alt="Abanico de cartas de Arcanos Menores del Tarot de Marsella">

      <h3>El Arte de Combinar: Un ejemplo práctico</h3>
      <p>¿Cómo se traduce esto en una lectura real? Es tan sencillo como sumar el concepto del número con la naturaleza del palo. Imagina que en tu tirada aparece el <strong>Cuatro de Copas</strong>:</p>
      <ul>
        <li>Tomamos el significado del <strong>4</strong> (Estabilidad, seguridad, bases firmes).</li>
        <li>Lo unimos al significado de las <strong>Copas</strong> (Emociones, relaciones).</li>
        <li><strong>Resultado:</strong> La carta nos habla de una situación emocional o de pareja completamente estable y segura. Sin embargo, al ser una estructura tan cerrada, nos advierte sobre el peligro latente de caer en el aburrimiento, la rutina o el estancamiento por falta de estímulos externos.</li>
      </ul>

      <p>¿Y si sale el <strong>As de Bastos</strong>?</p>
      <ul>
        <li>Sumamos el <strong>As (1)</strong> (Semilla, potencial de inicio, oportunidad) con los <strong>Bastos</strong> (Proyectos, pasión, fuego, instinto).</li>
        <li><strong>Resultado:</strong> El universo te está otorgando una inyección tremenda de energía vital para arrancar un nuevo proyecto profesional o creativo con muchísima fuerza.</li>
      </ul>

      <h3>Conclusión: La geometría sagrada en tus manos</h3>
      <p>El Tarot de Marsella no necesita disfraces ni dibujos complejos para hablarte. Su belleza reside en su pureza geométrica y abstracta. Cuando dejas de ver los Arcanos Menores como simples dibujos repetitivos y empiezas a verlos como un mapa numérico vivo, la lectura fluye de forma natural y directa desde tu subconsciente.</p>

      <div class="narrative-box" style="background: rgba(8, 7, 17, 0.6); border-left: 4px solid var(--purple-color); padding: 1.2rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; font-size: 0.95rem;">
        <strong>Ponlo en práctica:</strong> ¿Quieres ver cómo interactúan los números y los elementos en una respuesta real? Despeja tu mente de dudas, formula tu pregunta en nuestro <a href="index.html" style="color: var(--purple-color); text-decoration: underline;">Oráculo Interactivo</a> y observa con nuevos ojos el patrón de las cartas que el destino elija para ti hoy.
      </div>

      <h3 style="border-left-color: var(--purple-color);">Lecturas Recomendadas</h3>
      <p>Para aquellos que deseen dominar el arte de la estructura y la geometría sagrada de este mazo a nivel experto, la obra <strong>"La Vía del Tarot" de Alejandro Jodorowsky</strong> es considerada la biblia contemporánea de este sistema. Puedes adquirir esta guía de referencia directa aquí: <a href="https://amzn.to/4xNJE1z" target="_blank" rel="noopener noreferrer" style="color: var(--gold-color); text-decoration: underline;">Comprar La Vía del Tarot en Amazon</a>.</p>
      
      <p>También disponéis de esta otra maravillosa guía introductoria: <strong>"Tarot para principiantes"</strong>, una guía sencilla para aprender a leer las cartas del tarot, diseñar tiradas básicas y desarrollar el potencial psíquico y de adivinación. Puedes conseguirla aquí: <a href="https://amzn.to/4fZHvtj" target="_blank" rel="noopener noreferrer" style="color: var(--gold-color); text-decoration: underline;">Comprar Tarot para Principiantes en Amazon</a>.</p>
    `
  },
  {
    id: "guia-fases-lunares",
    title: "Guía de Fases Lunares: Cómo influyen en tus emociones y decisiones",
    badge: "La Luna",
    image: "assets/luna_llena.webp",
    date: "27 de Junio, 2026",
    author: "El Eco de las Estrellas",
    excerpt: "Aprende cómo sincronizar tus planes, rituales y decisiones con el ciclo de 29.5 días de la Luna para dejar de nadar a contracorriente.",
    body: `
      <p>¿Te has fijado en cómo algunos días desbordas energía y optimismo, mientras que otros solo te apetece retirarte del mundo y sumergirte en tus pensamientos? No estás a solas en este vaivén emocional. Desde tiempos ancestrales, la humanidad ha sabido que la Luna no solo gobierna las mareas de nuestros océanos, sino también nuestras propias mareas internas: las emociones, la intuición y la energía vital.</p>

      <img src="assets/fases_lunares_banner.jpg" alt="Altar lunar esotérico con fases de la luna y cartas del tarot">

      <p>Entender las fases de la luna y su significado místico te permite dejar de luchar contra tu propio ritmo y empezar a fluir con el universo. Cuando sincronizas tus proyectos, tus rituales y tus decisiones con el ciclo lunar, todo parece encajar con menor esfuerzo.</p>

      <div class="narrative-box" style="background: rgba(8, 7, 17, 0.6); border-left: 4px solid var(--gold-color); padding: 1.2rem 1.5rem; border-radius: 0 12px 12px 0; margin: 1.5rem 0; font-size: 0.95rem;">
        <strong>Sintonía Astral en Tiempo Real:</strong> Antes de empezar, recuerda que puedes comprobar el estado del cielo hoy mismo en nuestra página de inicio para ver la <strong>Fase Lunar de Hoy</strong> y descubrir qué vibración te acompaña en este preciso instante.
      </div>

      <h3>El ciclo lunar y sus 4 fases principales: Cómo canalizar su energía</h3>
      <p>Cada mes, la Luna completa un viaje de 29,5 días en el que nace, crece, brilla en todo su esplendor y vuelve a desvanecerse. Cada una de estas etapas tiene una carga energética única que puedes aprovechar a tu favor.</p>

      <h4>1. Luna Nueva: El Inicio y la Siembra de Intenciones</h4>
      <p>La Luna Nueva es el momento en que el satélite queda completamente a oscuras, oculto en el cielo nocturno. Místicamente, representa el vacío fértil: el lienzo en blanco antes de la creación.</p>
      <ul>
        <li><strong>Cómo influye en tus emociones:</strong> Es común sentir una bajada de energía física, pero un aumento de la introspección. Es un periodo de calma, silencio interior y reflexión profunda. Si te sientes un poco más ermitaño de lo habitual, respétalo; tu alma te está pidiendo un respiro.</li>
        <li><strong>Qué hacer en Luna Nueva:</strong> Es el momento perfecto para sembrar semillas. No es una fase para actuar con agresividad, sino para planificar, meditar sobre tus próximos objetivos y escribir tus intenciones para las próximas semanas.</li>
      </ul>
      
      <p style="font-size: 0.95rem; font-style: italic; color: var(--text-muted); border-left: 2px solid var(--border-color); padding-left: 1rem;">
        <strong>Recomendación de Alquimia Digital:</strong> Para plasmar tus decretos y manifestar en cada inicio de ciclo, te recomendamos llevar un registro físico en un <em>Diario de Manifestación Astral</em>. Escribir tus metas a mano bajo esta Luna le da un anclaje mágico a tu subconsciente.
      </p>

      <img src="assets/luna_creciente.webp" alt="La Luna Creciente emergiendo en la oscuridad" style="max-height: 250px;">

      <h4>2. Cuarto Creciente: La Fuerza de la Acción y el Desarrollo</h4>
      <p>A medida que una fina línea de luz empieza a dibujarse en el cielo (pasando por la hermosa Luna Giba Creciente), la energía del cosmos se activa. La luz crece, y con ella, tus ganas de comerte el mundo.</p>
      <ul>
        <li><strong>Cómo influye en tus emociones:</strong> Notarás un subidón de motivación, claridad mental y fuerza de voluntad. Es una etapa de optimismo, pero también pueden surgir los primeros desafíos o dudas sobre los planes que trazaste en la Luna Nueva.</li>
        <li><strong>Qué hacer en esta fase:</strong> Es la hora de la acción. Trabaja duro en tus proyectos, haz esa llamada importante, inicia ese nuevo hábito o lánzate a por lo que quieres. Como siempre os recordamos en el panel de nuestra web, cuando la vibración es creciente, es el periodo idóneo para afilar tus herramientas, analizar detalles y confiar en que la claridad final llegará a su debido tiempo.</li>
      </ul>

      <img src="assets/luna_llena.webp" alt="La Luna Llena brillando en todo su esplendor" style="max-height: 250px;">

      <h4>3. Luna Llena: La Culminación y la Explosión Mágica</h4>
      <p>Llegamos al clímax del ciclo. La Luna se muestra redonda, brillante y en su máxima expresión de luz. En el plano esotérico, la Luna Llena representa la cosecha, la iluminación de lo que estaba oculto y la expansión de la intuición.</p>
      <ul>
        <li><strong>Cómo influye en tus emociones:</strong> Es la fase más intensa. Al estar la energía cósmica al 100%, las emociones se desbordan y se magnifican. Es habitual sufrir de insomnio, tener sueños extremadamente vívidos (casi proféticos) o sentir una sensibilidad a flor de piel. Las conexiones con el subconsciente están completamente abiertas.</li>
        <li><strong>Qué hacer en Luna Llena:</strong> Es el momento de agradecer los frutos recogidos y de realizar rituales de luna llena enfocados en la atracción de abundancia o la recarga de amuletos. También es la noche perfecta para exponer tus barajas de tarot a la luz de la ventana para que se purifiquen con su magnetismo.</li>
      </ul>

      <img src="assets/luna_menguante.webp" alt="La Luna Menguante disolviendo su luz en el espacio" style="max-height: 250px;">

      <h4>4. Cuarto Menguante: La Liberación y el Cierre de Ciclos</h4>
      <p>El viaje luminoso comienza a decrecer. La Luna va perdiendo su brillo paulatinamente, invitándonos a hacer lo mismo con todo aquello que nos pesa en la espalda. Místicamente, es la fase del desapego y la limpieza profunda.</p>
      <ul>
        <li><strong>Cómo influye en tus emociones:</strong> Tras la tormenta emocional de la Luna Llena, llega una sensación de alivio y madurez. Es una fase ideal para la aceptación, la calma y el análisis objetivo de lo que ha funcionado y lo que no durante el mes.</li>
        <li><strong>Qué hacer en esta fase:</strong> Es el momento de soltar. Ideal para terminar tareas pendientes, hacer limpieza a fondo en casa (tirar lo viejo), romper lazos con relaciones tóxicas, desintoxicar el cuerpo y, sobre todo, descansar. No inicies proyectos nuevos aquí; espera a que el ciclo se renueve.</li>
      </ul>

      <p style="font-size: 0.95rem; font-style: italic; color: var(--text-muted); border-left: 2px solid var(--border-color); padding-left: 1rem;">
        Si sientes que hay bloqueos o patrones repetitivos que te cuesta romper en esta fase de cierre, puedes consultar nuestro apartado de <a href="calendario.html" style="color: var(--gold-color); text-decoration: underline;">Rituales de despojo y protección</a> para ayudarte a canalizar esta energía de liberación de forma efectiva.
      </p>

      <h3>El impacto del ciclo lunar en el mundo de los sueños</h3>
      <p>Como habrás podido comprobar si eres un seguidor asiduo de nuestro espacio, la Luna y el plano astral dictan directamente la intensidad de nuestro descanso. Durante las fases crecientes y llenas, la actividad cerebral nocturna se dispara, abriendo portales a mensajes del subconsciente que a menudo se traducen en imágenes confusas o premoniciones mientras duermes.</p>
      <p>Si te despiertas con la sensación de que tu mente ha estado intentando decirte algo importante a través de un sueño extraño, no lo dejes pasar; puedes buscar el significado en nuestro <a href="significado-suenos.html" style="color: var(--gold-color); text-decoration: underline;">Diccionario de Sueños</a>.</p>

      <h3>Conclusión: Aprende a surfear tus olas astrales</h3>
      <p>Vivimos en una sociedad que nos exige ser productivos, alegres y activos las 24 horas del día, los 7 días de la semana. Sin embargo, la naturaleza nos demuestra que todo en el universo tiene un proceso de expansión y otro de contracción. La Luna no brilla siempre con la misma intensidad, y tú tampoco tienes por qué hacerlo.</p>
      <p>A partir de hoy, te invitamos a mirar al cielo (o a consultar el widget interactivo de nuestra web). Cuando aprendes a planificar tu vida respetando las fases de la luna, dejas de nadar a contracorriente y empiezas a surfear la energía del cosmos.</p>
    `
  }
];

// Inicialización de la Interfaz del Blog
function initBlog() {
  const blogGrid = document.getElementById('blog-grid');
  const listView = document.getElementById('blog-list-view');
  const postView = document.getElementById('blog-post-view');
  
  const articleTitle = document.getElementById('article-title');
  const articleBadge = document.getElementById('article-badge');
  const articleDate = document.getElementById('article-date');
  const articleAuthor = document.getElementById('article-author');
  const articleBody = document.getElementById('article-body');
  
  const backBtn = document.getElementById('blog-back-btn');
  const bottomBackBtn = document.getElementById('blog-bottom-back-btn');

  if (!blogGrid || !listView || !postView) return;

  // Renderizar Tarjetas de la Lista
  function renderBlogList() {
    blogGrid.innerHTML = '';
    ARTICULOS_DB.forEach(post => {
      const card = document.createElement('div');
      card.className = 'glass-card blog-post-card';
      card.style.cssText = 'display:flex; flex-direction:column; justify-content:space-between; padding:1.5rem; transition:var(--transition-smooth);';
      
      card.innerHTML = `
        <div>
          <div class="blog-card-img-wrapper">
            <img src="${post.image}" alt="${post.title}" class="blog-card-img">
          </div>
          <span class="article-badge" style="display:inline-block; font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--gold-color); border:1.5px solid var(--border-color); padding:0.25rem 0.6rem; border-radius:12px; margin-bottom:0.75rem;">${post.badge}</span>
          <h3 class="gold" style="font-family:var(--font-serif); font-size:1.25rem; line-height:1.4; margin-bottom:0.75rem; text-align:left;">${post.title}</h3>
          <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.5; margin-bottom:1.5rem; text-align:left;">${post.excerpt}</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:0.85rem; margin-top:auto;">
          <span style="font-size:0.75rem; color:var(--text-muted);">${post.date}</span>
          <button type="button" class="read-more-btn" data-id="${post.id}" style="background:transparent; border:1px solid var(--gold-color); color:var(--gold-color); padding:0.35rem 0.85rem; border-radius:15px; font-size:0.8rem; cursor:pointer; font-weight:600; transition:var(--transition-smooth);">Leer Artículo &rarr;</button>
        </div>
      `;
      blogGrid.appendChild(card);
    });

    // Agregar Eventos a los Botones e Imagenes
    document.querySelectorAll('.blog-post-card').forEach(card => {
      card.querySelectorAll('.read-more-btn, .blog-card-img-wrapper').forEach(el => {
        el.addEventListener('click', () => {
          const id = card.querySelector('.read-more-btn').getAttribute('data-id');
          openArticle(id);
        });
      });
    });
  }

  // Abrir un Artículo
  function openArticle(id, pushState = true) {
    const post = ARTICULOS_DB.find(a => a.id === id);
    if (!post) return;

    articleTitle.textContent = post.title;
    articleBadge.textContent = post.badge;
    articleDate.textContent = post.date;
    articleAuthor.textContent = post.author;
    articleBody.innerHTML = post.body;

    listView.classList.add('hidden');
    postView.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      const url = new URL(window.location);
      url.searchParams.set('art', id);
      window.history.pushState({ artId: id }, '', url);
    }
  }

  // Volver a la Lista
  function showList(pushState = true) {
    postView.classList.add('hidden');
    listView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) {
      const url = new URL(window.location);
      url.searchParams.delete('art');
      window.history.pushState({}, '', url);
    }
  }

  // Eventos de Navegación Atrás
  backBtn.addEventListener('click', () => showList());
  bottomBackBtn.addEventListener('click', () => showList());

  // Escuchar Popstate (Botón atrás del navegador)
  window.addEventListener('popstate', (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const artId = urlParams.get('art');
    if (artId) {
      openArticle(artId, false);
    } else {
      showList(false);
    }
  });

  // Carga Inicial
  renderBlogList();

  const urlParams = new URLSearchParams(window.location.search);
  const initialArtId = urlParams.get('art');
  if (initialArtId) {
    openArticle(initialArtId, false);
  }
}

// Iniciar en la Carga del Documento
window.addEventListener('DOMContentLoaded', () => {
  initBlog();
});

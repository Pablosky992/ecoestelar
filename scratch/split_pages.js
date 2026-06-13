const fs = require('fs');
const path = require('path');

const projectDir = 'c:\\Users\\narci\\Desktop\\antigravity\\tarot';
const indexHtmlPath = path.join(projectDir, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Copiar index.html original como respaldo por seguridad
fs.writeFileSync(indexHtmlPath + '.original_spa', indexHtmlContent, 'utf8');

const lines = indexHtmlContent.split('\n');

// 1. Extraer cabecera común (Líneas 1 a 97)
// Ajustamos a 1-indexed (línea 1 a 98 en JS es índice 0 a 97)
const headerLines = lines.slice(0, 97);
let headerBlock = headerLines.join('\n');

// 2. Extraer pie común (Líneas 1214 a 1473, es decir, del final de numerology hasta el final del archivo)
const footerLines = lines.slice(1213); // del índice 1213 en adelante (línea 1214)
let footerBlock = footerLines.join('\n');

// 3. Extraer los bloques de contenido de cada sección
const sections = {
    oracle: lines.slice(98, 291).join('\n'),       // Pestaña 1: El Oráculo (líneas 99 a 291)
    daily: lines.slice(291, 411).join('\n'),        // Pestaña 6: Carta del día (líneas 292 a 411)
    horoscope: lines.slice(411, 697).join('\n'),    // Pestaña 3: Horóscopo (líneas 412 a 697)
    lunar: lines.slice(697, 912).join('\n'),        // Pestaña 5: La Luna (líneas 698 a 912)
    book: lines.slice(912, 947).join('\n'),         // Pestaña 2: El libro (líneas 913 a 947)
    numerology: lines.slice(947, 1213).join('\n')   // Pestaña 4: Numerología (líneas 948 a 1213)
};

// 4. Configurar información de páginas
const pages = [
    { filename: 'index.html', key: 'oracle', title: 'El Oráculo del Destino — El Eco de las Estrellas' },
    { filename: 'carta-del-dia.html', key: 'daily', title: 'Carta del Día — El Eco de las Estrellas' },
    { filename: 'horoscopo.html', key: 'horoscope', title: 'Tu Horóscopo Diario — El Eco de las Estrellas' },
    { filename: 'fase-lunar.html', key: 'lunar', title: 'La Luna y tu Energía — El Eco de las Estrellas' },
    { filename: 'numerologia.html', key: 'numerology', title: 'Estudio de Numerología Kármica — El Eco de las Estrellas' },
    { filename: 'grimorio.html', key: 'book', title: 'El Libro del Tarot (Grimorio) — El Eco de las Estrellas' }
];

// Reemplazar referencias .png por .webp en los bloques de contenido
for (const key in sections) {
    sections[key] = sections[key]
        .replace(/luna_llena\.png/g, 'luna_llena.webp')
        .replace(/luna_creciente\.png/g, 'luna_creciente.webp')
        .replace(/luna_nueva\.png/g, 'luna_nueva.webp')
        .replace(/luna_cuarto\.png/g, 'luna_cuarto.webp')
        .replace(/luna_menguante_v2\.png/g, 'luna_menguante_v2.webp');
}

// También en el footerBlock y headerBlock por si acaso
footerBlock = footerBlock
    .replace(/luna_llena\.png/g, 'luna_llena.webp')
    .replace(/luna_creciente\.png/g, 'luna_creciente.webp')
    .replace(/luna_nueva\.png/g, 'luna_nueva.webp')
    .replace(/luna_cuarto\.png/g, 'luna_cuarto.webp')
    .replace(/luna_menguante_v2\.png/g, 'luna_menguante_v2.webp');

headerBlock = headerBlock
    .replace(/logo_luna_v2\.png/g, 'logo_luna_v2.webp')
    .replace(/luna_llena\.png/g, 'luna_llena.webp')
    .replace(/luna_creciente\.png/g, 'luna_creciente.webp')
    .replace(/luna_nueva\.png/g, 'luna_nueva.webp')
    .replace(/luna_cuarto\.png/g, 'luna_cuarto.webp')
    .replace(/luna_menguante_v2\.png/g, 'luna_menguante_v2.webp');

// Función para generar la navegación estática con enlaces
function generateNavigation(activeKey) {
    const navItems = [
        { key: 'oracle', file: 'index.html', label: '🔮 El Oráculo' },
        { key: 'daily', file: 'carta-del-dia.html', label: '🌟 Carta del Día' },
        { key: 'horoscope', file: 'horoscopo.html', label: '✨ Tu Horóscopo' },
        { key: 'lunar', file: 'fase-lunar.html', label: '🌙 La Luna' },
        { key: 'numerology', file: 'numerologia.html', label: '🔢 Numerología' },
        { key: 'book', file: 'grimorio.html', label: '📖 El Libro del Tarot' }
    ];

    let html = '    <nav class="app-nav" aria-label="Navegación principal">\n';
    navItems.forEach(item => {
        const activeClass = item.key === activeKey ? ' active' : '';
        html += `      <a href="${item.file}" class="nav-tab${activeClass}">\n        <span class="tab-icon">${item.label.split(' ')[0]}</span> ${item.label.split(' ').slice(1).join(' ')}\n      </a>\n`;
    });
    html += '    </nav>';
    return html;
}

// 5. Escribir cada página
pages.forEach(page => {
    // Personalizar el título en la cabecera
    let pageHeader = headerBlock.replace(
        /<title>.*?<\/title>/,
        `<title>${page.title}</title>`
    );

    // Reemplazar el menú de navegación dinámico por el estático con enlaces
    // El menú dinámico original empieza en la línea 75: <nav class="app-nav" ...> ... </nav>
    // En nuestro headerBlock, buscamos esa sección y la reemplazamos entera
    const navRegex = /<nav class="app-nav"[\s\S]*?<\/nav>/;
    pageHeader = pageHeader.replace(navRegex, generateNavigation(page.key));

    // El contenido de la sección elegida debe estar activo (sin clase "hidden")
    let activeContent = sections[page.key];
    // Asegurarse de que no tenga la clase "hidden"
    activeContent = activeContent.replace(/class="tab-content hidden"/, 'class="tab-content"');

    // Combinar todo
    const pageContent = `${pageHeader}\n\n${activeContent}\n\n${footerBlock}`;

    // Guardar archivo
    const outputPath = path.join(projectDir, page.filename);
    fs.writeFileSync(outputPath, pageContent, 'utf8');
    console.log(`Página generada: ${page.filename}`);
});

console.log('División de páginas finalizada con éxito.');

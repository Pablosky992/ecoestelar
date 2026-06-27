const fs = require('fs');

try {
  const indexContent = fs.readFileSync('index.html', 'utf8');
  const startTag = '<!-- Contact Modal (FormSubmit) -->';
  const endTag = '<!-- Legal Modal -->';
  
  const startIdx = indexContent.indexOf(startTag);
  const endIdx = indexContent.indexOf(endTag);
  
  if (startIdx !== -1 && endIdx !== -1) {
    const modalHtml = indexContent.substring(startIdx, endIdx);
    console.log('Modal extraído con éxito (largo:', modalHtml.length, ')');
    
    const files = [
      'calendario.html',
      'carta-del-dia.html',
      'fase-lunar.html',
      'grimorio.html',
      'horoscopo.html',
      'numerologia.html',
      'significado-suenos.html',
      'tienda.html'
    ];
    
    files.forEach(file => {
      if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('id="contact-modal"')) {
          if (content.includes('<!-- Legal Modal -->')) {
            content = content.replace('<!-- Legal Modal -->', modalHtml + '\n\n  <!-- Legal Modal -->');
          } else {
            content = content.replace('</body>', modalHtml + '\n</body>');
          }
          fs.writeFileSync(file, content, 'utf8');
          console.log(`Inyectado modal en ${file}`);
        } else {
          console.log(`${file} ya tiene el modal.`);
        }
      }
    });
  } else {
    console.log('No se pudo encontrar el bloque delimitado en index.html');
  }
} catch (e) {
  console.error(e);
}

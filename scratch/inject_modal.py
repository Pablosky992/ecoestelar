import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extraer el bloque del modal de contacto
modal_match = re.search(r'(<!-- Contact Modal.*?FormSubmit -->.*?</div>\s*</div>\s*</div>)', index_content, re.DOTALL)
if modal_match:
    modal_html = modal_match.group(1)
    print("Modal extraído correctamente")
    
    files = ['calendario.html', 'carta-del-dia.html', 'fase-lunar.html', 'grimorio.html', 'horoscopo.html', 'numerologia.html', 'significado-suenos.html', 'tienda.html']
    for file in files:
        if os.path.exists(file):
            with open(file, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'id="contact-modal"' not in content:
                # Inyectar el bloque antes de <!-- Legal Modal --> o si no antes de </body>
                if '<!-- Legal Modal -->' in content:
                    new_content = content.replace('<!-- Legal Modal -->', modal_html + '\n\n  <!-- Legal Modal -->')
                else:
                    new_content = content.replace('</body>', modal_html + '\n</body>')
                with open(file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Inyectado modal de contacto en {file}")
            else:
                print(f"{file} ya contiene el modal")
else:
    print("Error: No se pudo extraer el modal de index.html")

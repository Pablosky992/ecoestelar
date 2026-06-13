const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scratchDir = 'c:\\Users\\narci\\Desktop\\antigravity\\tarot\\scratch';
const assetsDir = 'c:\\Users\\narci\\Desktop\\antigravity\\tarot\\assets';

// 1. Instalar webp-converter localmente en scratch si no está
if (!fs.existsSync(path.join(scratchDir, 'node_modules', 'webp-converter'))) {
    console.log('Instalando webp-converter...');
    execSync('npm install webp-converter --no-save', { cwd: scratchDir, stdio: 'inherit' });
}

const webp = require(path.join(scratchDir, 'node_modules', 'webp-converter'));

// Lista de archivos PNG a convertir en assets/
const pngFiles = [
    'logo_luna.png',
    'logo_luna_v2.png',
    'luna_creciente.png',
    'luna_cuarto.png',
    'luna_llena.png',
    'luna_menguante.png',
    'luna_menguante_v2.png',
    'luna_nueva.png'
];

async function convertAll() {
    for (const file of pngFiles) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = inputPath.replace('.png', '.webp');
        if (fs.existsSync(inputPath)) {
            console.log(`Convirtiendo ${file} a WebP...`);
            // cwebp quality 80 is very good
            try {
                const result = await webp.cwebp(inputPath, outputPath, "-q 80");
                console.log(`Convertido con éxito: ${file} -> ${outputPath}`);
            } catch (err) {
                console.error(`Error al convertir ${file}:`, err);
            }
        } else {
            console.log(`Archivo no encontrado: ${inputPath}`);
        }
    }
}

convertAll();

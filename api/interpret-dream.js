/**
 * Vercel Serverless Function: Oráculo Onírico con Google Gemini API
 * Ruta: /api/interpret-dream
 */

module.exports = async (req, res) => {
  // Lista de orígenes permitidos
  const origin = req.headers.origin || req.headers.referer || '';
  const allowedOrigins = [
    'https://www.ecoestelar.com',
    'https://ecoestelar.com',
    'http://localhost',
    'http://127.0.0.1'
  ];

  const isAllowed = allowedOrigins.some(domain => origin.startsWith(domain)) ||
                    origin.includes('.vercel.app') ||
                    !origin; // Permite peticiones directas del mismo servidor

  // Configurar cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', isAllowed ? (req.headers.origin || '*') : 'https://www.ecoestelar.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Bloquear peticiones de orígenes no autorizados
  if (origin && !isAllowed) {
    console.warn(`Petición bloqueada desde origen no autorizado: ${origin}`);
    return res.status(403).json({ error: 'Acceso no autorizado desde este dominio.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY no está configurada en las variables de entorno de Vercel.');
    return res.status(200).json({
      success: false,
      fallback: true,
      reason: 'GEMINI_API_KEY_NOT_CONFIGURED'
    });
  }

  try {
    const { dreamText, detectedSymbols } = req.body || {};

    if (!dreamText || typeof dreamText !== 'string' || dreamText.trim().length < 10) {
      return res.status(400).json({ error: 'El relato del sueño es demasiado corto o inválido.' });
    }

    // Preparar el contexto de la base de datos de Eco Estelar
    let symbolsContext = '';
    if (Array.isArray(detectedSymbols) && detectedSymbols.length > 0) {
      symbolsContext = detectedSymbols.map(s => 
        `- Símbolo: "${s.name}" (Categoría: ${s.category})\n  Definición oficial de Eco Estelar: "${s.meaning}"`
      ).join('\n\n');
    }

    const systemPrompt = `Eres el Oráculo Onírico de Eco Estelar (ecoestelar.com), una guía esotérica, sabia, profunda, poética y empática de interpretación de sueños.
Tu misión es descifrar la visión del soñante conectando sus emociones, escenarios y arquetipos en una lectura literaria fluida, mística y reveladora.

REGLAS FUNDAMENTALES:
1. FUENTE SAGRADA (ECO ESTELAR): Si se proporcionan definiciones oficiales de símbolos abajo, úsalas como la base de significado primordial.
2. CONOCIMIENTO ARQUETÍPICO UNIVERSAL: Si el relato contiene símbolos, personajes, detalles o emociones adicionales no catalogados en las definiciones proporcionadas, compleméntalos magistralmente utilizando psicología arquetípica de Carl Jung, simbolismo esotérico universal y folclore mitológico.
3. TONO Y ESTILO: Místico, respetuoso, lúcido, reconfortante y trascendental (sin sonar genérico ni usar clichés vacíos).
4. FORMATO DE SALIDA: Devuelve ÚNICAMENTE código HTML limpio y estilizado (SIN bloques de código markdown como \`\`\`html). Utiliza exactamente la estructura de etiquetas indicada a continuación.

ESTRUCTURA HTML EXACTA DE RESPUESTA:
<div class="dream-intro-synthesis">
  <p style="font-size: 1.05rem; color: var(--gold-light); margin-bottom: 0.5rem; font-family: var(--font-serif);">
    ✦ <strong>Síntesis del Inconsciente: El Tejido de tu Visión</strong> ✦
  </p>
  <p style="margin: 0; font-size: 0.95rem; color: var(--text-main);">
    [Aquí redactas una introducción poética y reveladora de 1 a 2 párrafos que integre el escenario, la acción y las emociones del soñante, explicando el hilo conductor que une toda la experiencia onírica.]
  </p>
</div>

<div class="dream-symbols-breakdown">
  <!-- Por cada símbolo clave presente en el sueño (tanto los oficiales como los detectados por tu sabiduría arquetípica, máximo 4): -->
  <div class="dream-symbol-card">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
      <h4 style="font-family: var(--font-serif); color: var(--gold-color); margin: 0; font-size: 1.15rem; display: flex; align-items: center; gap: 0.4rem;">
        <span>[Icono Emoji apropiado, ej. 🌲, 🦅, 🌊, 🗝️, 🧘]</span> [Nombre del Símbolo]
      </h4>
      <span style="font-size: 0.75rem; background: rgba(229, 193, 88, 0.12); color: var(--gold-light); padding: 0.2rem 0.6rem; border-radius: 12px; border: 1px solid rgba(229, 193, 88, 0.25); text-transform: uppercase;">
        [Categoría del Símbolo]
      </span>
    </div>
    <p style="font-size: 0.93rem; line-height: 1.6; color: rgba(243, 244, 246, 0.9); margin: 0;">
      [Interpretación profunda, rica y conectada con la experiencia narrada por el usuario.]
    </p>
  </div>
</div>

<div class="dream-alquimia-box">
  <h4 style="color: var(--gold-color); font-family: var(--font-serif); margin: 0 0 0.5rem 0; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
    <span>🔮</span> Consejo de Integración y Alquimia Onírica
  </h4>
  <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-main); margin: 0;">
    [Consejo práctico y espiritual para transformar el mensaje de este sueño en una guía lúcida para la vida cotidiana de vigilia.]
  </p>
</div>`;

    const userMessage = `RELATO DEL SUEÑO DEL USUARIO:
"${dreamText.trim()}"

${symbolsContext ? `SÍMBOLOS OFICIALES IDENTIFICADOS EN LA WEB (ECO ESTELAR):\n${symbolsContext}` : 'No se encontraron símbolos exactos en el glosario base; utiliza tu sabiduría arquetípica universal para descifrar todos los elementos del relato.'}

Por favor, genera la interpretación completa siguiendo la estructura HTML indicada.`;

    // Intentar primero con gemini-2.0-flash, con fallback a gemini-1.5-flash
    const modelsToTry = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let rawResultText = '';
    let lastError = null;

    for (const model of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\n${userMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048
            }
          })
        });

        if (!response.ok) {
          const errData = await response.text();
          throw new Error(`Gemini API HTTP ${response.status}: ${errData}`);
        }

        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim().length > 0) {
          rawResultText = candidateText;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Fallo con el modelo ${model}:`, err.message);
      }
    }

    if (!rawResultText) {
      console.error('No se pudo obtener respuesta de la API de Gemini:', lastError);
      return res.status(200).json({
        success: false,
        fallback: true,
        error: lastError ? lastError.message : 'No candidate returned'
      });
    }

    // Limpiar posibles bloques de código \`\`\`html si la IA los incluyó
    let cleanHtml = rawResultText.trim();
    if (cleanHtml.startsWith('\`\`\`html')) {
      cleanHtml = cleanHtml.replace(/^\`\`\`html\s*/i, '').replace(/\s*\`\`\`$/, '');
    } else if (cleanHtml.startsWith('\`\`\`')) {
      cleanHtml = cleanHtml.replace(/^\`\`\`\s*/i, '').replace(/\s*\`\`\`$/, '');
    }

    return res.status(200).json({
      success: true,
      analysisHtml: cleanHtml
    });

  } catch (globalErr) {
    console.error('Error interno en /api/interpret-dream:', globalErr);
    return res.status(200).json({
      success: false,
      fallback: true,
      error: globalErr.message
    });
  }
};

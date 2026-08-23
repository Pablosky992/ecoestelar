/**
 * Vercel Serverless Function: Oráculo Onírico con Google Gemini API
 * Ruta: /api/interpret-dream
 */

module.exports = async (req, res) => {
  // Lista de orígenes permitidos
  const origin = req.headers.origin || req.headers.referer || '';
  const allowedPatterns = [
    'ecoestelar.com',
    'www.ecoestelar.com',
    'localhost',
    '127.0.0.1',
    '.vercel.app'
  ];

  const isAllowed = !origin || allowedPatterns.some(pattern => origin.includes(pattern));

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

  const apiKey = process.env.GEMINI_API_KEY || process.env.GENINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY no está configurada en las variables de entorno de Vercel.');
    return res.status(200).json({
      success: false,
      fallback: true,
      reason: 'GEMINI_API_KEY_NOT_CONFIGURED'
    });
  }

  // 1. Limitador de peticiones por IP (Anti-Spam / Anti-DDoS: Máximo 10 peticiones por minuto por IP)
  const ipLimits = global.dreamRateLimits || new Map();
  global.dreamRateLimits = ipLimits;

  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const userRecord = ipLimits.get(clientIp) || { count: 0, resetTime: now + 60000 };

  if (now > userRecord.resetTime) {
    userRecord.count = 0;
    userRecord.resetTime = now + 60000;
  }

  if (userRecord.count >= 10) {
    console.warn(`Límite de peticiones excedido para la IP: ${clientIp}`);
    return res.status(429).json({ error: 'Has alcanzado el límite de interpretaciones por minuto. Por favor, aguarda un momento.' });
  }

  userRecord.count++;
  ipLimits.set(clientIp, userRecord);

  try {
    const { dreamText, detectedSymbols } = req.body || {};

    if (!dreamText || typeof dreamText !== 'string' || dreamText.trim().length < 10) {
      return res.status(400).json({ error: 'El relato del sueño es demasiado corto o inválido.' });
    }

    if (dreamText.length > 1500) {
      return res.status(400).json({ error: 'El relato no puede exceder los 1500 caracteres.' });
    }

    const cleanDreamText = dreamText.trim().substring(0, 1500);

    // Preparar el contexto de la base de datos de Eco Estelar
    let symbolsContext = '';
    if (Array.isArray(detectedSymbols) && detectedSymbols.length > 0) {
      symbolsContext = detectedSymbols.map(s => 
        `- Símbolo: "${s.name}" (Categoría: ${s.category})\n  Definición oficial de Eco Estelar: "${s.meaning}"`
      ).join('\n\n');
    }

    const systemPrompt = `Eres el Oráculo Onírico Superior de Eco Estelar (ecoestelar.com), una guía esotérica, sabia, profunda, literaria y profundamente empática de interpretación de sueños.
Tu propósito es descifrar la visión del soñante conectando con máxima precisión sus emociones explícitas, personajes, escenarios y arquetipos en una lectura rica, reveladora y personalizada.

INSTRUCCIONES CLAVE DE INTERPRETACIÓN:
1. INTEGRACIÓN EMOCIONAL DIRECTA (MUY IMPORTANTE): Si el soñante menciona explícitamente cómo se sentía (ej: "estaba nerviosa y ansiosa", "sentía miedo", "tenía paz"), NUNCA le preguntes qué sentía de forma genérica. Interpreta directamente el significado profundo de esa emoción dentro del contexto del sueño (por ejemplo: la ansiedad al comprar junto a la pareja refleja la presión por decisiones materiales compartidas, el miedo al compromiso o a la escasez, o la necesidad de armonizar expectativas mutuas).
2. DESGLOSE MULTIDIMENSIONAL: Identifica e interpreta entre 2 y 4 arquetipos clave presentes en el relato (incluyendo acciones, figuras como pareja/familiares, objetos y el estado emocional/psicológico predominante).
3. FUENTE SAGRADA (ECO ESTELAR): Si se proporcionan definiciones oficiales de símbolos abajo, úsalas como la base de significado primordial y expande su sabiduría.
4. PSICOLOGÍA ARQUETÍPICA Y ESOTERISMO: Aplica la psicología analítica de Carl Jung (la sombra, el ánima/ánimus, la individuación) y el simbolismo cósmico universal.
5. FORMATO DE SALIDA: Devuelve ÚNICAMENTE código HTML limpio y estilizado (SIN bloques de código markdown como \`\`\`html). Utiliza exactamente la estructura de etiquetas indicada a continuación.

ESTRUCTURA HTML EXACTA DE RESPUESTA:
<div class="dream-intro-synthesis">
  <p style="font-size: 1.05rem; color: var(--gold-light); margin-bottom: 0.6rem; font-family: var(--font-serif);">
    ✦ <strong>Síntesis del Inconsciente: El Tejido Profundo de tu Visión</strong> ✦
  </p>
  <p style="margin: 0 0 0.85rem 0; font-size: 0.96rem; line-height: 1.7; color: var(--text-main);">
    [Primer párrafo: Interpretación global y poética que conecta el escenario, las figuras presentes y la acción central con el momento vital del soñante.]
  </p>
  <p style="margin: 0; font-size: 0.96rem; line-height: 1.7; color: var(--text-main);">
    [Segundo párrafo: Análisis específico de la carga emocional experimentada en el sueño y lo que revela sobre sus dinámicas conscientes o temores inconscientes.]
  </p>
</div>

<div class="dream-symbols-breakdown">
  <!-- De 2 a 4 tarjetas de símbolos enriquecidas (acciones, figuras, elementos, estados emocionales): -->
  <div class="dream-symbol-card">
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
      <h4 style="font-family: var(--font-serif); color: var(--gold-color); margin: 0; font-size: 1.15rem; display: flex; align-items: center; gap: 0.4rem;">
        <span>[Emoji apropiado, ej. 🛒, 👥, ⚡, 🗝️]</span> [Nombre del Símbolo o Arquetipo]
      </h4>
      <span style="font-size: 0.75rem; background: rgba(229, 193, 88, 0.12); color: var(--gold-light); padding: 0.2rem 0.6rem; border-radius: 12px; border: 1px solid rgba(229, 193, 88, 0.25); text-transform: uppercase;">
        [Categoría]
      </span>
    </div>
    <p style="font-size: 0.93rem; line-height: 1.65; color: rgba(243, 244, 246, 0.92); margin: 0;">
      [Interpretación detallada, elaborada y conectada directamente con la vivencia del sueño.]
    </p>
  </div>
</div>

<div class="dream-alquimia-box">
  <h4 style="color: var(--gold-color); font-family: var(--font-serif); margin: 0 0 0.5rem 0; font-size: 1.05rem; display: flex; align-items: center; gap: 0.5rem;">
    <span>🔮</span> Consejo de Integración y Alquimia Onírica
  </h4>
  <p style="font-size: 0.93rem; line-height: 1.65; color: var(--text-main); margin: 0;">
    [Consejo práctico, empático y transformador para aplicar la sabiduría de este sueño en la vida real, abordando las emociones sentidas y aportando claridad y serenidad.]
  </p>
</div>`;

    const userMessage = `RELATO DEL SUEÑO:
"${dreamText.trim()}"

${symbolsContext ? `SÍMBOLOS OFICIALES IDENTIFICADOS EN ECO ESTELAR:\n${symbolsContext}` : 'Descifra los arquetipos, figuras, acciones y emociones mediante tu sabiduría arquetípica universal.'}

Por favor, genera la lectura onírica completa y elaborada siguiendo la estructura HTML indicada.`;

    let rawResultText = '';
    let lastError = null;

    // Si la clave es de Groq (gsk_...)
    if (apiKey.startsWith('gsk_')) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 2048
          })
        });

        if (!response.ok) {
          const errData = await response.text();
          throw new Error(`Groq API HTTP ${response.status}: ${errData}`);
        }

        const data = await response.json();
        rawResultText = data?.choices?.[0]?.message?.content;
      } catch (err) {
        lastError = err;
        console.warn('Fallo con Groq API:', err.message);
      }
    } 
    // Si la clave es de OpenAI / OpenRouter (sk-...)
    else if (apiKey.startsWith('sk-')) {
      try {
        const isOpenRouter = apiKey.startsWith('sk-or-');
        const url = isOpenRouter ? 'https://openrouter.ai/api/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions';
        const model = isOpenRouter ? 'google/gemini-2.0-flash-001' : 'gpt-4o-mini';

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 2048
          })
        });

        if (!response.ok) {
          const errData = await response.text();
          throw new Error(`OpenAI/OpenRouter HTTP ${response.status}: ${errData}`);
        }

        const data = await response.json();
        rawResultText = data?.choices?.[0]?.message?.content;
      } catch (err) {
        lastError = err;
        console.warn('Fallo con OpenAI/OpenRouter API:', err.message);
      }
    }
    // Google Gemini API por defecto (gemini-3.6-flash, gemini-2.5-flash)
    else {
      const modelsToTry = ['gemini-3.6-flash', 'gemini-2.5-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-flash-latest'];
      for (const model of modelsToTry) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const response = await fetch(url, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
            },
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
    }

    if (!rawResultText) {
      console.error('No se pudo obtener respuesta de la API de IA:', lastError);
      return res.status(200).json({
        success: false,
        fallback: true,
        error: lastError ? lastError.message : 'No response returned from AI model'
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

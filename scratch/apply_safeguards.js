const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Make shuffleBtn listener safe
const shuffleOld = `// Shuffling Animation Trigger
shuffleBtn.addEventListener('click', () => {
  if (isShuffling) return;
  isShuffling = true;
  const deck = document.getElementById('mystical-deck');
  deck.classList.add('shuffling');
  shuffleBtn.textContent = 'Mezclando astros...';
  shuffleBtn.disabled = true;
  
  setTimeout(() => {
    deck.classList.remove('shuffling');
    shuffleBtn.textContent = 'Barajar Mazo';
    shuffleBtn.disabled = false;
    isShuffling = false;
  }, 1800);
});`;

const shuffleNew = `// Shuffling Animation Trigger
if (shuffleBtn) {
  shuffleBtn.addEventListener('click', () => {
    if (isShuffling) return;
    isShuffling = true;
    const deck = document.getElementById('mystical-deck');
    if (deck) deck.classList.add('shuffling');
    shuffleBtn.textContent = 'Mezclando astros...';
    shuffleBtn.disabled = true;
    
    setTimeout(() => {
      if (deck) deck.classList.remove('shuffling');
      shuffleBtn.textContent = 'Barajar Mazo';
      shuffleBtn.disabled = false;
      isShuffling = false;
    }, 1800);
  });
}`;

// 2. Make resetBtn listener safe
const resetOld = `// Reset / Perform another consultation
resetBtn.addEventListener('click', () => {
  // Clear inputs and state
  questionInput.value = '';
  resultsPanel.classList.add('hidden');
  deckContainer.style.display = 'flex';
  cardsBoard.innerHTML = '';
  
  // Reset tapete text
  readingStatusTitle.textContent = "Prepara tu mente y formula tu pregunta...";
  readingStatusDesc.textContent = "Selecciona tus opciones en el panel lateral y pulsa el botón dorado.";
  
  // Scroll back to top of form
  document.querySelector('.config-panel').scrollIntoView({ behavior: 'smooth' });
});`;

const resetNew = `// Reset / Perform another consultation
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Clear inputs and state
    if (questionInput) questionInput.value = '';
    if (resultsPanel) resultsPanel.classList.add('hidden');
    if (deckContainer) deckContainer.style.display = 'flex';
    if (cardsBoard) cardsBoard.innerHTML = '';
    
    // Reset tapete text
    if (readingStatusTitle) readingStatusTitle.textContent = "Prepara tu mente y formula tu pregunta...";
    if (readingStatusDesc) readingStatusDesc.textContent = "Selecciona tus opciones en el panel lateral y pulsa el botón dorado.";
    
    // Scroll back to top of form
    const configPanel = document.querySelector('.config-panel');
    if (configPanel) configPanel.scrollIntoView({ behavior: 'smooth' });
  });
}`;

// Helper to wrap consultBtn listener block (using substring search and replace)
function wrapConsultBtn(src) {
  const targetStart = `// Consult Oracle Button click handler\nconsultBtn.addEventListener('click', () => {`;
  const startIdx = src.indexOf(targetStart);
  if (startIdx === -1) {
    console.error('Could not find consultBtn target start!');
    return src;
  }
  
  // Find the closing }); of the consultBtn handler
  // It is right before "// Reset / Perform another consultation"
  const targetEnd = `// Reset / Perform another consultation`;
  const endIdx = src.indexOf(targetEnd, startIdx);
  if (endIdx === -1) {
    console.error('Could not find target end for consultBtn!');
    return src;
  }
  
  // We want to find the last '});' before the targetEnd
  const subSection = src.substring(startIdx, endIdx);
  const lastCloseBraceIdx = subSection.lastIndexOf('});');
  if (lastCloseBraceIdx === -1) {
    console.error('Could not find closing brace for consultBtn!');
    return src;
  }
  
  const absoluteCloseBraceIdx = startIdx + lastCloseBraceIdx;
  
  const before = src.substring(0, startIdx);
  const handlerBody = src.substring(startIdx + targetStart.length, absoluteCloseBraceIdx);
  const after = src.substring(absoluteCloseBraceIdx + 3);
  
  console.log('Successfully wrapped consultBtn listener block.');
  return before + `// Consult Oracle Button click handler\nif (consultBtn) {\n  consultBtn.addEventListener('click', () => {` + handlerBody + `  });\n}` + after;
}

// Apply replacements
if (code.includes(shuffleOld)) {
  code = code.replace(shuffleOld, shuffleNew);
  console.log('Replaced shuffleBtn code.');
} else {
  console.log('Warning: shuffleBtn code match not found.');
}

if (code.includes(resetOld)) {
  code = code.replace(resetOld, resetNew);
  console.log('Replaced resetBtn code.');
} else {
  console.log('Warning: resetBtn code match not found.');
}

code = wrapConsultBtn(code);

// 3. Replace initTabNavigation with safe multi-page version
const tabNavOld = `function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const oracleContent = document.getElementById('oracle-tab-content');
  const bookContent = document.getElementById('book-tab-content');
  const horoscopeContent = document.getElementById('horoscope-tab-content');
  const numerologyContent = document.getElementById('numerology-tab-content');
  const lunarContent = document.getElementById('lunar-tab-content');
  const dailyContent = document.getElementById('daily-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Activate clicked tab
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');
      
      // Hide all first
      oracleContent.classList.add('hidden');
      bookContent.classList.add('hidden');
      if (horoscopeContent) horoscopeContent.classList.add('hidden');
      if (numerologyContent) numerologyContent.classList.add('hidden');
      if (lunarContent) lunarContent.classList.add('hidden');
      if (dailyContent) dailyContent.classList.add('hidden');

      if (target === 'oracle') {
        oracleContent.classList.remove('hidden');
      } else if (target === 'daily') {
        if (dailyContent) {
          dailyContent.classList.remove('hidden');
        }
      } else if (target === 'horoscope') {
        if (horoscopeContent) {
          horoscopeContent.classList.remove('hidden');
          // Load saved zodiac sign if available
          const savedZodiac = localStorage.getItem('user_zodiac_sign');
          if (savedZodiac && zodiacSelect) {
            zodiacSelect.value = savedZodiac;
            selectedZodiac = savedZodiac;
          }
        }
      } else if (target === 'book') {
        bookContent.classList.remove('hidden');
        // Lazy initialize the book grid if it hasn't been done
        initTarotBook();
      } else if (target === 'numerology') {
        if (numerologyContent) {
          numerologyContent.classList.remove('hidden');
        }
      } else if (target === 'lunar') {
        if (lunarContent) {
          lunarContent.classList.remove('hidden');
          renderLunarTabDetails();
        }
      }
    });
  });
}`;

const tabNavNew = `function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const oracleContent = document.getElementById('oracle-tab-content');
  const bookContent = document.getElementById('book-tab-content');
  const horoscopeContent = document.getElementById('horoscope-tab-content');
  const numerologyContent = document.getElementById('numerology-tab-content');
  const lunarContent = document.getElementById('lunar-tab-content');
  const dailyContent = document.getElementById('daily-tab-content');

  // Auto-initialize features based on which content divs are active/present on the page
  if (bookContent) {
    initTarotBook();
  }
  if (lunarContent) {
    renderLunarTabDetails();
  }
  if (horoscopeContent) {
    // Load saved zodiac sign if available
    const savedZodiac = localStorage.getItem('user_zodiac_sign');
    if (savedZodiac && zodiacSelect) {
      zodiacSelect.value = savedZodiac;
      selectedZodiac = savedZodiac;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-tab');
      if (!target) return; // If standard link without data-tab, let browser navigate
      
      e.preventDefault();

      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Activate clicked tab
      tab.classList.add('active');

      // Hide all first
      if (oracleContent) oracleContent.classList.add('hidden');
      if (bookContent) bookContent.classList.add('hidden');
      if (horoscopeContent) horoscopeContent.classList.add('hidden');
      if (numerologyContent) numerologyContent.classList.add('hidden');
      if (lunarContent) lunarContent.classList.add('hidden');
      if (dailyContent) dailyContent.classList.add('hidden');

      if (target === 'oracle' && oracleContent) {
        oracleContent.classList.remove('hidden');
      } else if (target === 'daily' && dailyContent) {
        dailyContent.classList.remove('hidden');
      } else if (target === 'horoscope' && horoscopeContent) {
        horoscopeContent.classList.remove('hidden');
        const savedZodiac = localStorage.getItem('user_zodiac_sign');
        if (savedZodiac && zodiacSelect) {
          zodiacSelect.value = savedZodiac;
          selectedZodiac = savedZodiac;
        }
      } else if (target === 'book' && bookContent) {
        bookContent.classList.remove('hidden');
        initTarotBook();
      } else if (target === 'numerology' && numerologyContent) {
        numerologyContent.classList.remove('hidden');
      } else if (target === 'lunar' && lunarContent) {
        lunarContent.classList.remove('hidden');
        renderLunarTabDetails();
      }
    });
  });
}`;

if (code.includes(tabNavOld)) {
  code = code.replace(tabNavOld, tabNavNew);
  console.log('Replaced initTabNavigation code.');
} else {
  console.log('Warning: initTabNavigation code match not found.');
}

// 4. Update the contact email button event listener logic to make it robust and not copy null.
// Let's find where the contactBtn listener is in app.js
const contactOld = `  // MEJORA: Contact Email Click auto-copies email
  const contactBtn = document.getElementById('contact-email-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = "expondudas@yahoo.com";
      navigator.clipboard.writeText(email).then(() => {
        showShareToast("📧 ¡Correo electrónico copiado al portapapeles! responderemos pronto ✨");
      }).catch(err => {
        console.error("No se pudo copiar el correo: ", err);
      });
    });
  }`;

const contactNew = `  // MEJORA: Contact Email Click auto-copies email
  const contactBtn = document.getElementById('contact-email-btn');
  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = "expondudas@yahoo.com";
      // Fallback copy logic
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showShareToast("📧 ¡Correo electrónico copiado al portapapeles! responderemos pronto ✨");
        }).catch(err => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  }

  function fallbackCopyText(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showShareToast("📧 ¡Correo electrónico copiado al portapapeles! responderemos pronto ✨");
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }`;

if (code.includes(contactOld)) {
  code = code.replace(contactOld, contactNew);
  console.log('Replaced contactBtn copy logic.');
} else {
  console.log('Warning: contactBtn copy logic match not found.');
}

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully wrote app.js changes.');

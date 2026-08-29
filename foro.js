/**
 * ============================================================================
 * Eco Estelar — Motor del Foro Místico y Comunidad (foro.js)
 * Conectividad Supabase en tiempo real, protección anti-spam y moderación
 * ============================================================================
 */

(function () {
  "use strict";

  const SUPABASE_URL = "https://acnxqztgfnmsltjorzle.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjbnhxenRnZm5tc2x0am9yemxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMDY0NzUsImV4cCI6MjEwMzU4MjQ3NX0.ExIDdQYXMzJp44P6tbY9e4QG3hke8VD1xm0hoAJD5Ds";

  let supabaseClient = null;
  if (typeof window.supabase !== "undefined") {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  const state = {
    categories: [],
    threads: [],
    currentCategory: "all",
    currentSearch: "",
    currentSort: "recent",
    activeThreadId: null,
    activeThread: null,
    activeReplies: [],
    isAdmin: localStorage.getItem("tarot_forum_admin") === "true",
    userProfile: {
      alias: localStorage.getItem("tarot_user_alias") || "",
      sign: localStorage.getItem("tarot_user_sign") || "♈",
      avatar: localStorage.getItem("tarot_user_avatar") || "🧙"
    },
    lastPostTime: 0,
    lastReplyTime: 0
  };

  const DEFAULT_CATEGORIES = [
    { id: "tiradas", name: "Interpretación de Tiradas", description: "Comparte tus lecturas de cartas y pide segundas opiniones a la comunidad.", icon: "🔮", display_order: 1 },
    { id: "astrologia", name: "Astrología y Tránsitos", description: "Debates sobre signos, compatibilidad, planetas retrógrados y cartas astrales.", icon: "✨", display_order: 2 },
    { id: "suenos", name: "El Rincón de los Sueños", description: "Cuéntanos tus visiones nocturnas y descubre su significado simbólico.", icon: "💤", display_order: 3 },
    { id: "minerales", name: "Minerales y Amuletos", description: "Propiedades de gemas, limpieza de cristales y consagración de péndulos.", icon: "💎", display_order: 4 },
    { id: "rituales", name: "Rituales y Fases Lunares", description: "Intenciones de Luna Nueva, rituales de Luna Llena y limpiezas del hogar.", icon: "🕯️", display_order: 5 },
    { id: "general", name: "Taberna Astral", description: "Presentaciones, charla mística libre y preguntas varias.", icon: "☕", display_order: 6 }
  ];

  function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatRelativeTime(dateString) {
    if (!dateString) return "recientemente";
    const date = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);

    if (diffSec < 45) return "hace unos instantes";
    if (diffSec < 3600) {
      const mins = Math.max(1, Math.floor(diffSec / 60));
      return "hace " + mins + (mins === 1 ? " minuto" : " minutos");
    }
    if (diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600);
      return "hace " + hours + (hours === 1 ? " hora" : " horas");
    }
    const days = Math.floor(diffSec / 86400);
    if (days === 1) return "ayer";
    if (days < 30) return "hace " + days + " días";
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  }

  function showToast(msg, isError) {
    let toast = document.getElementById("forum-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "forum-toast";
      toast.className = "forum-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = "forum-toast show " + (isError ? "error" : "success");
    setTimeout(function () {
      toast.className = "forum-toast";
    }, 3800);
  }

  async function fetchCategories() {
    try {
      if (supabaseClient) {
        const res = await supabaseClient
          .from("forum_categories")
          .select("*")
          .order("display_order", { ascending: true });
        if (!res.error && res.data && res.data.length > 0) {
          state.categories = res.data;
          renderCategoryPills();
          renderStats();
          return;
        }
      }
    } catch (e) {
      console.warn("Error fetching categories:", e);
    }
    state.categories = DEFAULT_CATEGORIES;
    renderCategoryPills();
    renderStats();
  }

  async function fetchThreads() {
    const listContainer = document.getElementById("threads-list-container");
    if (!listContainer) return;

    listContainer.innerHTML = '<div class="forum-loading-state"><div class="forum-spinner"></div><p>Sintonizando con las voces del Templo...</p></div>';

    try {
      if (supabaseClient) {
        let query = supabaseClient.from("forum_threads").select("*");

        if (state.currentCategory !== "all") {
          query = query.eq("category_id", state.currentCategory);
        }

        if (state.currentSort === "pinned") {
          query = query.order("is_pinned", { ascending: false }).order("created_at", { ascending: false });
        } else if (state.currentSort === "replies") {
          query = query.order("replies_count", { ascending: false }).order("created_at", { ascending: false });
        } else {
          query = query.order("is_pinned", { ascending: false }).order("created_at", { ascending: false });
        }

        const res = await query;
        if (!res.error && res.data) {
          state.threads = res.data;
          renderThreads();
          renderStats();
          return;
        }
      }
    } catch (e) {
      console.warn("Error fetching threads:", e);
    }

    state.threads = [];
    renderThreads();
  }

  async function fetchThreadDetail(threadId) {
    const detailContainer = document.getElementById("thread-detail-container");
    const listSection = document.getElementById("threads-list-section");
    const heroSection = document.getElementById("forum-hero-section");
    const controlsSection = document.getElementById("forum-controls-section");

    if (!detailContainer) return;

    detailContainer.classList.remove("hidden");
    if (listSection) listSection.classList.add("hidden");
    if (heroSection) heroSection.classList.add("hidden");
    if (controlsSection) controlsSection.classList.add("hidden");

    detailContainer.innerHTML = '<div class="forum-loading-state"><div class="forum-spinner"></div><p>Invocando el hilo del destino...</p></div>';

    try {
      if (supabaseClient) {
        const tRes = await supabaseClient.from("forum_threads").select("*").eq("id", threadId).single();
        if (tRes.error || !tRes.data) {
          detailContainer.innerHTML = '<div class="forum-empty-card glass-card"><span class="empty-icon">🕯️</span><h3>El tema no fue encontrado</h3><p>Es posible que haya sido eliminado por moderación.</p><button type="button" class="consult-button" id="btn-err-back">Volver al Foro</button></div>';
          const errBtn = document.getElementById("btn-err-back");
          if (errBtn) errBtn.onclick = function () { window.location.hash = ""; };
          return;
        }
        state.activeThread = tRes.data;

        const rRes = await supabaseClient.from("forum_replies").select("*").eq("thread_id", threadId).order("created_at", { ascending: true });
        state.activeReplies = (!rRes.error && rRes.data) ? rRes.data : [];
        renderThreadDetailView();
        return;
      }
    } catch (e) {
      console.error("Error fetching thread detail:", e);
    }

    detailContainer.innerHTML = '<div class="forum-empty-card glass-card"><h3>Error al conectar con el santuario</h3><button type="button" class="consult-button" id="btn-err-back-2">Volver al Foro</button></div>';
    const errBtn2 = document.getElementById("btn-err-back-2");
    if (errBtn2) errBtn2.onclick = function () { window.location.hash = ""; };
  }

  function renderCategoryPills() {
    const container = document.getElementById("category-pills-container");
    const select = document.getElementById("new-thread-category");
    if (!container) return;

    let html = '<button type="button" class="forum-room-chip ' + (state.currentCategory === "all" ? "active" : "") + '" data-cat="all">🌟 Todas las Salas</button>';
    state.categories.forEach(function (cat) {
      const active = state.currentCategory === cat.id ? "active" : "";
      html += '<button type="button" class="forum-room-chip ' + active + '" data-cat="' + cat.id + '">' + cat.icon + " " + escapeHtml(cat.name) + '</button>';
    });
    container.innerHTML = html;

    if (select) {
      select.innerHTML = state.categories.map(function (c) {
        return '<option value="' + c.id + '">' + c.icon + " " + escapeHtml(c.name) + '</option>';
      }).join("");
    }

    container.querySelectorAll(".forum-room-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.currentCategory = btn.getAttribute("data-cat");
        renderCategoryPills();
        fetchThreads();
      });
    });
  }

  function renderStats() {
    const threadsEl = document.getElementById("stats-threads-count");
    const repliesEl = document.getElementById("stats-replies-count");
    const roomsEl = document.getElementById("stats-rooms-count");
    if (threadsEl) threadsEl.textContent = state.threads.length;
    if (roomsEl) roomsEl.textContent = state.categories.length;
    if (repliesEl) {
      const totalReplies = state.threads.reduce(function (acc, t) {
        return acc + (t.replies_count || 0);
      }, 0);
      repliesEl.textContent = totalReplies;
    }
  }

  function renderThreads() {
    const listContainer = document.getElementById("threads-list-container");
    if (!listContainer) return;

    let filtered = state.threads;
    if (state.currentSearch.trim() !== "") {
      const q = state.currentSearch.toLowerCase();
      filtered = filtered.filter(function (t) {
        return (t.title && t.title.toLowerCase().includes(q)) ||
          (t.content && t.content.toLowerCase().includes(q)) ||
          (t.author_name && t.author_name.toLowerCase().includes(q));
      });
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = '<div class="forum-empty-card glass-card"><span class="empty-icon">✨</span><h3>Aún no hay temas en esta sala</h3><p>Sé la primera alma en compartir una tirada o duda mística con la comunidad.</p><button type="button" class="consult-button pulse-button" id="btn-open-create-thread-empty">✍️ Iniciar Primer Tema</button></div>';
      const btn = document.getElementById("btn-open-create-thread-empty");
      if (btn) btn.addEventListener("click", openCreateThreadModal);
      return;
    }

    let html = "";
    filtered.forEach(function (thread) {
      const cat = state.categories.find(function (c) { return c.id === thread.category_id; }) || { name: "General", icon: "☕" };
      const pinnedBadge = thread.is_pinned ? '<span class="forum-badge-pinned">📌 Fijado</span>' : "";
      const lockedBadge = thread.is_locked ? '<span class="forum-badge-locked">🔒 Cerrado</span>' : "";

      html += '<article class="forum-thread-card glass-card ' + (thread.is_pinned ? "is-pinned" : "") + '" data-thread-id="' + thread.id + '">' +
        '<div class="thread-card-header"><div class="thread-card-category"><span>' + cat.icon + " " + escapeHtml(cat.name) + '</span>' + pinnedBadge + lockedBadge + '</div><span class="thread-card-date">' + formatRelativeTime(thread.created_at) + '</span></div>' +
        '<h3 class="thread-card-title"><a href="#tema=' + thread.id + '" class="thread-title-link">' + escapeHtml(thread.title) + '</a></h3>' +
        '<p class="thread-card-snippet">' + escapeHtml(thread.content.substring(0, 160)) + (thread.content.length > 160 ? "..." : "") + '</p>' +
        '<div class="thread-card-footer"><div class="thread-card-author"><span class="author-avatar">' + (thread.author_avatar || "🧙") + '</span><span class="author-name">' + escapeHtml(thread.author_name) + '</span><span class="author-sign">' + (thread.author_sign || "✨") + '</span></div><div class="thread-card-meta"><span class="thread-meta-item" title="Comentarios">💬 <strong>' + (thread.replies_count || 0) + '</strong></span></div></div></article>';
    });

    listContainer.innerHTML = html;
    listContainer.querySelectorAll(".forum-thread-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".thread-title-link")) return;
        const id = card.getAttribute("data-thread-id");
        if (id) window.location.hash = "tema=" + id;
      });
    });
  }

  function renderThreadDetailView() {
    const detailContainer = document.getElementById("thread-detail-container");
    if (!detailContainer || !state.activeThread) return;

    const thread = state.activeThread;
    const cat = state.categories.find(function (c) { return c.id === thread.category_id; }) || { name: "Comunidad", icon: "✨" };

    let adminControls = "";
    if (state.isAdmin) {
      adminControls = '<div class="forum-admin-bar"><span class="admin-label">👑 Moderador:</span><button type="button" class="admin-action-btn delete-btn" id="btn-admin-delete-thread">🗑️ Eliminar Tema</button><button type="button" class="admin-action-btn pin-btn" id="btn-admin-pin-thread">' + (thread.is_pinned ? "📍 Desfijar" : "📌 Fijar") + '</button><button type="button" class="admin-action-btn lock-btn" id="btn-admin-lock-thread">' + (thread.is_locked ? "🔓 Abrir Respuestas" : "🔒 Cerrar Tema") + '</button></div>';
    }

    let repliesHtml = "";
    if (state.activeReplies.length === 0) {
      repliesHtml = '<div class="forum-no-replies"><p>Aún no hay respuestas en este debate. ¡Sé la primera voz en iluminar este mensaje!</p></div>';
    } else {
      state.activeReplies.forEach(function (reply, idx) {
        let replyAdminBtn = "";
        if (state.isAdmin) {
          replyAdminBtn = '<button type="button" class="admin-reply-delete-btn" data-reply-id="' + reply.id + '" title="Eliminar">🗑️</button>';
        }

        repliesHtml += '<div class="forum-reply-card glass-card" id="reply-' + reply.id + '"><div class="reply-header"><div class="reply-author-info"><span class="reply-avatar">' + (reply.author_avatar || "🧙") + '</span><span class="reply-author-name">' + escapeHtml(reply.author_name) + '</span><span class="reply-author-sign">' + (reply.author_sign || "✨") + '</span></div><div class="reply-meta-right"><span class="reply-date">#' + (idx + 1) + " • " + formatRelativeTime(reply.created_at) + '</span>' + replyAdminBtn + '</div></div><div class="reply-content">' + escapeHtml(reply.content).replace(/\n/g, "<br>") + '</div></div>';
      });
    }

    let replyFormHtml = "";
    if (thread.is_locked) {
      replyFormHtml = '<div class="forum-locked-notice glass-card">🔒 Este tema ha sido cerrado por la moderación del Templo.</div>';
    } else {
      replyFormHtml = '<div class="forum-reply-composer glass-card"><h4 class="gold" style="margin: 0 0 1rem 0; font-family: var(--font-serif); font-size: 1.15rem;">✍️ Responder a este tema</h4><form id="form-reply-thread"><div class="composer-grid"><div class="form-group"><label for="reply-author-name">Tu Nombre / Alias:</label><input type="text" id="reply-author-name" class="forum-input" maxlength="35" placeholder="Ej. Selene_Lunar" value="' + escapeHtml(state.userProfile.alias) + '" required></div><div class="form-group"><label for="reply-author-sign">Signo Astral:</label><select id="reply-author-sign" class="forum-select"><option value="♈" ' + (state.userProfile.sign === "♈" ? "selected" : "") + '>♈ Aries</option><option value="♉" ' + (state.userProfile.sign === "♉" ? "selected" : "") + '>♉ Tauro</option><option value="♊" ' + (state.userProfile.sign === "♊" ? "selected" : "") + '>♊ Géminis</option><option value="♋" ' + (state.userProfile.sign === "♋" ? "selected" : "") + '>♋ Cáncer</option><option value="♌" ' + (state.userProfile.sign === "♌" ? "selected" : "") + '>♌ Leo</option><option value="♍" ' + (state.userProfile.sign === "♍" ? "selected" : "") + '>♍ Virgo</option><option value="♎" ' + (state.userProfile.sign === "♎" ? "selected" : "") + '>♎ Libra</option><option value="♏" ' + (state.userProfile.sign === "♏" ? "selected" : "") + '>♏ Escorpio</option><option value="♐" ' + (state.userProfile.sign === "♐" ? "selected" : "") + '>♐ Sagitario</option><option value="♑" ' + (state.userProfile.sign === "♑" ? "selected" : "") + '>♑ Capricornio</option><option value="♒" ' + (state.userProfile.sign === "♒" ? "selected" : "") + '>♒ Acuario</option><option value="♓" ' + (state.userProfile.sign === "♓" ? "selected" : "") + '>♓ Piscis</option></select></div><div class="form-group"><label for="reply-author-avatar">Avatar Místico:</label><select id="reply-author-avatar" class="forum-select"><option value="🧙" ' + (state.userProfile.avatar === "🧙" ? "selected" : "") + '>🧙 Mago</option><option value="🔮" ' + (state.userProfile.avatar === "🔮" ? "selected" : "") + '>🔮 Oráculo</option><option value="🌙" ' + (state.userProfile.avatar === "🌙" ? "selected" : "") + '>🌙 Sacerdotisa</option><option value="☀️" ' + (state.userProfile.avatar === "☀️" ? "selected" : "") + '>☀️ Alquimista</option><option value="🦅" ' + (state.userProfile.avatar === "🦅" ? "selected" : "") + '>🦅 Chamán</option><option value="🌿" ' + (state.userProfile.avatar === "🌿" ? "selected" : "") + '>🌿 Druida</option><option value="🦉" ' + (state.userProfile.avatar === "🦉" ? "selected" : "") + '>🦉 Sabio</option><option value="🕯️" ' + (state.userProfile.avatar === "🕯️" ? "selected" : "") + '>🕯️ Místico</option></select></div></div><input type="text" name="forum_check_hp" id="reply-hp-check" style="display:none !important;" tabindex="-1" autocomplete="off"><div class="form-group" style="margin-top: 1rem;"><label for="reply-content">Tu Mensaje o Consejo:</label><textarea id="reply-content" class="forum-textarea" rows="4" maxlength="1500" placeholder="Escribe con respeto y sabiduría mística..." required></textarea><div class="form-char-count"><span id="reply-chars">0</span>/1500 caracteres</div></div><div class="composer-actions"><button type="submit" class="consult-button pulse-button" id="btn-submit-reply">✨ Publicar Respuesta</button></div></form></div>';
    }

    detailContainer.innerHTML = '<div class="forum-detail-wrapper"><nav class="forum-breadcrumbs"><a href="#" class="breadcrumb-link" id="btn-back-to-forum">← Volver al Foro</a><span class="breadcrumb-sep">/</span><span class="breadcrumb-current">' + cat.icon + " " + escapeHtml(cat.name) + '</span></nav>' + adminControls + '<article class="forum-main-thread-card glass-card"><header class="main-thread-header"><div class="main-thread-badge">' + cat.icon + " " + escapeHtml(cat.name) + '</div><h1 class="main-thread-title">' + escapeHtml(thread.title) + '</h1><div class="main-thread-author-bar"><div class="author-meta-left"><span class="author-avatar large">' + (thread.author_avatar || "🧙") + '</span><div><div class="author-name-row"><strong>' + escapeHtml(thread.author_name) + '</strong><span class="author-sign-pill">' + (thread.author_sign || "✨") + '</span></div><span class="author-post-date">Publicado ' + formatRelativeTime(thread.created_at) + '</span></div></div><div class="thread-replies-counter">💬 <strong>' + state.activeReplies.length + '</strong> respuestas</div></div></header><div class="main-thread-body">' + escapeHtml(thread.content).replace(/\n/g, "<br>") + '</div></article><section class="forum-replies-section"><h3 class="gold" style="font-family: var(--font-serif); margin: 2rem 0 1rem 0;">Respuestas de la Comunidad (' + state.activeReplies.length + ')</h3><div class="replies-list-container">' + repliesHtml + '</div></section>' + replyFormHtml + '</div>';

    const backBtn = document.getElementById("btn-back-to-forum");
    if (backBtn) backBtn.addEventListener("click", function (e) { e.preventDefault(); window.location.hash = ""; });

    const replyTextarea = document.getElementById("reply-content");
    const charsCount = document.getElementById("reply-chars");
    if (replyTextarea && charsCount) {
      replyTextarea.addEventListener("input", function () { charsCount.textContent = replyTextarea.value.length; });
    }

    const replyForm = document.getElementById("form-reply-thread");
    if (replyForm) replyForm.addEventListener("submit", handleReplySubmit);

    if (state.isAdmin) {
      const delThreadBtn = document.getElementById("btn-admin-delete-thread");
      const pinThreadBtn = document.getElementById("btn-admin-pin-thread");
      const lockThreadBtn = document.getElementById("btn-admin-lock-thread");
      if (delThreadBtn) delThreadBtn.addEventListener("click", function () { adminDeleteThread(thread.id); });
      if (pinThreadBtn) pinThreadBtn.addEventListener("click", function () { adminTogglePin(thread.id, !thread.is_pinned); });
      if (lockThreadBtn) lockThreadBtn.addEventListener("click", function () { adminToggleLock(thread.id, !thread.is_locked); });

      detailContainer.querySelectorAll(".admin-reply-delete-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const rId = btn.getAttribute("data-reply-id");
          if (rId) adminDeleteReply(rId);
        });
      });
    }
  }

  function openCreateThreadModal() {
    const modal = document.getElementById("create-thread-modal");
    if (modal) {
      modal.classList.remove("hidden");
      const titleInput = document.getElementById("new-thread-title");
      if (titleInput) titleInput.focus();
    }
  }

  function closeCreateThreadModal() {
    const modal = document.getElementById("create-thread-modal");
    if (modal) modal.classList.add("hidden");
  }

  async function handleCreateThreadSubmit(e) {
    e.preventDefault();
    const hp = document.getElementById("thread-hp-check");
    if (hp && hp.value.trim() !== "") { showToast("Error de verificación", true); return; }

    const now = Date.now();
    if (now - state.lastPostTime < 45000) {
      const wait = Math.ceil((45000 - (now - state.lastPostTime)) / 1000);
      showToast("Espera " + wait + "s antes de publicar otro tema.", true);
      return;
    }

    const title = document.getElementById("new-thread-title").value.trim();
    const categoryId = document.getElementById("new-thread-category").value;
    const content = document.getElementById("new-thread-content").value.trim();
    const alias = document.getElementById("new-thread-alias").value.trim();
    const sign = document.getElementById("new-thread-sign").value;
    const avatar = document.getElementById("new-thread-avatar").value;

    if (!title || !content || !alias) { showToast("Completa todos los campos requeridos.", true); return; }
    if (title.length < 5) { showToast("El título debe tener al menos 5 caracteres.", true); return; }
    if (content.length < 15) { showToast("El contenido debe tener al menos 15 caracteres.", true); return; }

    state.userProfile = { alias: alias, sign: sign, avatar: avatar };
    localStorage.setItem("tarot_user_alias", alias);
    localStorage.setItem("tarot_user_sign", sign);
    localStorage.setItem("tarot_user_avatar", avatar);

    const submitBtn = document.getElementById("btn-submit-new-thread");
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Invocando tema..."; }

    try {
      if (supabaseClient) {
        const res = await supabaseClient.from("forum_threads").insert([{
          category_id: categoryId,
          title: title,
          content: content,
          author_name: alias,
          author_sign: sign,
          author_avatar: avatar,
          is_pinned: false,
          is_locked: false,
          replies_count: 0
        }]).select().single();

        if (res.error) throw res.error;
        state.lastPostTime = Date.now();
        showToast("✨ ¡Tema publicado con éxito en el Templo!");
        closeCreateThreadModal();
        document.getElementById("form-create-thread").reset();

        if (res.data && res.data.id) {
          window.location.hash = "tema=" + res.data.id;
        } else {
          fetchThreads();
        }
        return;
      }
    } catch (err) {
      console.error("Error creating thread:", err);
      showToast("No se pudo publicar el tema. Inténtalo de nuevo.", true);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "✨ Publicar en el Foro"; }
    }
  }

  async function handleReplySubmit(e) {
    e.preventDefault();
    if (!state.activeThread) return;

    const hp = document.getElementById("reply-hp-check");
    if (hp && hp.value.trim() !== "") { showToast("Error de verificación", true); return; }

    const now = Date.now();
    if (now - state.lastReplyTime < 15000) {
      const wait = Math.ceil((15000 - (now - state.lastReplyTime)) / 1000);
      showToast("Espera " + wait + "s antes de enviar otra respuesta.", true);
      return;
    }

    const alias = document.getElementById("reply-author-name").value.trim();
    const sign = document.getElementById("reply-author-sign").value;
    const avatar = document.getElementById("reply-author-avatar").value;
    const content = document.getElementById("reply-content").value.trim();

    if (!alias || !content) { showToast("Escribe tu nombre y tu respuesta.", true); return; }
    if (content.length < 5) { showToast("La respuesta debe tener al menos 5 caracteres.", true); return; }

    state.userProfile = { alias: alias, sign: sign, avatar: avatar };
    localStorage.setItem("tarot_user_alias", alias);
    localStorage.setItem("tarot_user_sign", sign);
    localStorage.setItem("tarot_user_avatar", avatar);

    const submitBtn = document.getElementById("btn-submit-reply");
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Enviando..."; }

    try {
      if (supabaseClient) {
        const res = await supabaseClient.from("forum_replies").insert([{
          thread_id: state.activeThread.id,
          content: content,
          author_name: alias,
          author_sign: sign,
          author_avatar: avatar
        }]).select().single();

        if (res.error) throw res.error;

        const newCount = (state.activeThread.replies_count || 0) + 1;
        await supabaseClient.from("forum_threads").update({ replies_count: newCount, updated_at: new Date().toISOString() }).eq("id", state.activeThread.id);

        state.lastReplyTime = Date.now();
        showToast("🌟 Respuesta publicada con éxito");
        fetchThreadDetail(state.activeThread.id);
        return;
      }
    } catch (err) {
      console.error("Error submitting reply:", err);
      showToast("Hubo un error al enviar tu respuesta.", true);
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "✨ Publicar Respuesta"; }
    }
  }

  const ADMIN_HASH_HEX = "21b32bd97e1d9d70e08c71dd61d4349070417eeb1e1da3384527720c03eb9bb8";

  async function computeSha256(text) {
    if (!text) return "";
    try {
      const msgBuffer = new TextEncoder().encode(text.trim());
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    } catch (e) {
      console.warn("Crypto subtle not available:", e);
      return "";
    }
  }

  async function toggleAdminMode() {
    if (state.isAdmin) {
      if (confirm("¿Deseas cerrar la sesión de moderador?")) {
        state.isAdmin = false;
        localStorage.removeItem("tarot_forum_admin");
        showToast("Modo moderador desactivado");
        if (state.activeThreadId) fetchThreadDetail(state.activeThreadId);
        else fetchThreads();
      }
    } else {
      const pass = prompt("Introduce la Clave Secreta de Moderador de Eco Estelar:");
      if (pass !== null && pass.trim() !== "") {
        const computed = await computeSha256(pass);
        if (computed === ADMIN_HASH_HEX) {
          state.isAdmin = true;
          localStorage.setItem("tarot_forum_admin", "true");
          showToast("👑 Modo Moderador Activado");
          if (state.activeThreadId) fetchThreadDetail(state.activeThreadId);
          else fetchThreads();
        } else {
          showToast("Clave de moderador incorrecta", true);
        }
      }
    }
  }

  async function adminDeleteThread(threadId) {
    if (!confirm("⚠️ ¿Estás seguro de que deseas eliminar este tema y todas sus respuestas?")) return;
    try {
      if (supabaseClient) {
        const res = await supabaseClient.from("forum_threads").delete().eq("id", threadId);
        if (res.error) throw res.error;
        showToast("🗑️ Tema eliminado correctamente");
        window.location.hash = "";
      }
    } catch (e) {
      console.error(e);
      showToast("Error al eliminar tema", true);
    }
  }

  async function adminTogglePin(threadId, isPinned) {
    try {
      if (supabaseClient) {
        const res = await supabaseClient.from("forum_threads").update({ is_pinned: isPinned }).eq("id", threadId);
        if (res.error) throw res.error;
        showToast(isPinned ? "📌 Tema fijado" : "📍 Tema desfijado");
        fetchThreadDetail(threadId);
      }
    } catch (e) {
      console.error(e);
      showToast("Error al fijar tema", true);
    }
  }

  async function adminToggleLock(threadId, isLocked) {
    try {
      if (supabaseClient) {
        const res = await supabaseClient.from("forum_threads").update({ is_locked: isLocked }).eq("id", threadId);
        if (res.error) throw res.error;
        showToast(isLocked ? "🔒 Tema cerrado" : "🔓 Tema reabierto");
        fetchThreadDetail(threadId);
      }
    } catch (e) {
      console.error(e);
      showToast("Error al bloquear tema", true);
    }
  }

  async function adminDeleteReply(replyId) {
    if (!confirm("¿Eliminar este comentario?")) return;
    try {
      if (supabaseClient && state.activeThread) {
        const res = await supabaseClient.from("forum_replies").delete().eq("id", replyId);
        if (res.error) throw res.error;
        const newCount = Math.max(0, (state.activeThread.replies_count || 1) - 1);
        await supabaseClient.from("forum_threads").update({ replies_count: newCount }).eq("id", state.activeThread.id);
        showToast("🗑️ Respuesta eliminada");
        fetchThreadDetail(state.activeThread.id);
      }
    } catch (e) {
      console.error(e);
      showToast("Error al eliminar respuesta", true);
    }
  }

  function handleRouting() {
    const hash = window.location.hash;
    const detailContainer = document.getElementById("thread-detail-container");
    const listSection = document.getElementById("threads-list-section");
    const heroSection = document.getElementById("forum-hero-section");
    const controlsSection = document.getElementById("forum-controls-section");

    if (hash.startsWith("#tema=")) {
      const threadId = hash.replace("#tema=", "").trim();
      if (threadId) {
        state.activeThreadId = threadId;
        fetchThreadDetail(threadId);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    state.activeThreadId = null;
    state.activeThread = null;
    if (detailContainer) detailContainer.classList.add("hidden");
    if (listSection) listSection.classList.remove("hidden");
    if (heroSection) heroSection.classList.remove("hidden");
    if (controlsSection) controlsSection.classList.remove("hidden");

    if (hash.startsWith("#sala=")) {
      const sala = hash.replace("#sala=", "").trim();
      state.currentCategory = sala || "all";
    }

    renderCategoryPills();
    fetchThreads();
  }

  function initForum() {
    if (!document.getElementById("threads-list-container")) return;

    fetchCategories();
    handleRouting();

    window.addEventListener("hashchange", handleRouting);

    const searchInput = document.getElementById("forum-search-input");
    const searchClear = document.getElementById("forum-search-clear");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.currentSearch = searchInput.value;
        if (searchClear) searchClear.classList.toggle("hidden", searchInput.value === "");
        renderThreads();
      });
    }

    if (searchClear) {
      searchClear.addEventListener("click", function () {
        searchInput.value = "";
        state.currentSearch = "";
        searchClear.classList.add("hidden");
        renderThreads();
      });
    }

    const sortSelect = document.getElementById("forum-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.currentSort = sortSelect.value;
        fetchThreads();
      });
    }

    const btnOpenModal = document.getElementById("btn-open-create-thread");
    const btnCloseModal = document.getElementById("btn-close-create-thread");
    const createModal = document.getElementById("create-thread-modal");
    const formCreate = document.getElementById("form-create-thread");

    if (btnOpenModal) btnOpenModal.addEventListener("click", openCreateThreadModal);
    if (btnCloseModal) btnCloseModal.addEventListener("click", closeCreateThreadModal);

    if (createModal) {
      createModal.addEventListener("click", function (e) {
        if (e.target === createModal) closeCreateThreadModal();
      });
    }

    if (formCreate) {
      formCreate.addEventListener("submit", handleCreateThreadSubmit);
    }

    const threadContent = document.getElementById("new-thread-content");
    const threadChars = document.getElementById("new-thread-chars");
    if (threadContent && threadChars) {
      threadContent.addEventListener("input", function () {
        threadChars.textContent = threadContent.value.length;
      });
    }

    const inputAlias = document.getElementById("new-thread-alias");
    const selectSign = document.getElementById("new-thread-sign");
    const selectAvatar = document.getElementById("new-thread-avatar");
    if (inputAlias && state.userProfile.alias) inputAlias.value = state.userProfile.alias;
    if (selectSign && state.userProfile.sign) selectSign.value = state.userProfile.sign;
    if (selectAvatar && state.userProfile.avatar) selectAvatar.value = state.userProfile.avatar;

    // Atajo de teclado discreto: Ctrl + Alt + M (o Cmd + Alt + M en Mac)
    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === "m" || e.key === "M")) {
        e.preventDefault();
        toggleAdminMode();
      }
    });

    // Disparador discreto para móvil / táctil: 3 toques rápidos en el texto de Copyright
    const copyrightTrigger = document.getElementById("forum-copyright-trigger");
    if (copyrightTrigger) {
      let clickCount = 0;
      let clickTimer = null;
      copyrightTrigger.addEventListener("click", function () {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () {
          if (clickCount >= 3) {
            toggleAdminMode();
          }
          clickCount = 0;
        }, 400);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForum);
  } else {
    initForum();
  }
})();

/* ============================================================
   Lista de presentes | Rebeca & Pedro
   ------------------------------------------------------------
   PIX_KEY e PIX_NAME são definidos em js/config.js (injetado a
   partir dos secrets no deploy). Não ficam no código-fonte público.
   ============================================================ */

// Formata telefone BR: "31999999999" -> "(31) 99999-9999"
function formatPhoneBR(digits) {
  const d = String(digits || '').replace(/\D/g, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digits || '';
}

const PIX_KEY_DISPLAY = formatPhoneBR(PIX_KEY);  // PIX_KEY vem do config.js

/* Categorias (ordem de exibição) */
const CATEGORIES = [
  { id: 'all',        label: 'Todos',           emoji: '🌿' },
  { id: 'eletro',     label: 'Eletrodomésticos', emoji: '🔌' },
  { id: 'moveis',     label: 'Móveis',           emoji: '🛋️' },
  { id: 'cozinha',    label: 'Cozinha & Mesa',   emoji: '🍽️' },
  { id: 'casa',       label: 'Casa & Limpeza',   emoji: '🧺' },
  { id: 'cama-banho', label: 'Cama & Banho',     emoji: '🛏️' },
  { id: 'luademel',   label: 'Lua de mel',       emoji: '✈️' },
  { id: 'divertidos', label: 'Divertidos',       emoji: '🎉' },
];
const CAT_EMOJI = Object.fromEntries(CATEGORIES.map(c => [c.id, c.emoji]));

/* Itens da lista (extraídos do documento dos noivos) */
const GIFTS = [
  { id: 'sala-jantar',      name: 'Conjunto Sala de Jantar: Mesa com 4 Cadeiras', price: 595.99,  cat: 'moveis',    img: 'assets/presentes/img-01.png', link: 'https://mpago.la/2TLi2tJ' },
  { id: 'geladeira',        name: 'Geladeira / Refrigerador Compacto',            price: 3051.99, cat: 'eletro',    img: 'assets/presentes/img-02.png', link: 'https://mpago.la/2ChGpTY' },
  { id: 'cama-box',         name: 'Cama Box de Casal King com Colchão',           price: 2300,    cat: 'moveis',    img: 'assets/presentes/img-03.png', link: 'https://mpago.la/2B3yE1G' },
  { id: 'sofa',             name: 'Sofá Retrátil 2 lugares',                      price: 1368.13, cat: 'moveis',    img: 'assets/presentes/img-04.png', link: 'https://mpago.la/2Z7Ev3E' },
  { id: 'mesa-estudos',     name: 'Mesa de estudos',                              price: 526.21,  cat: 'moveis',    img: 'assets/presentes/img-05.png', link: 'https://mpago.la/2dMci9R' },
  { id: 'fogao',            name: 'Fogão 4 bocas',                                price: 841.93,  cat: 'eletro',    img: 'assets/presentes/img-06.png', link: 'https://mpago.la/22hp8ZP' },
  { id: 'airfryer',         name: 'AirFryer',                                     price: 526.21,  cat: 'eletro',    img: 'assets/presentes/img-07.png', link: 'https://mpago.la/1JntYpB' },
  { id: 'liquidificador',   name: 'Liquidificador Philco',                        price: 157.86,  cat: 'eletro',    img: 'assets/presentes/img-08.png', link: 'https://mpago.la/1RtwBKt' },
  { id: 'mixer',            name: 'Mixer 3 em 1',                                 price: 299.21,  cat: 'eletro',    img: 'assets/presentes/img-09.png', link: 'https://mpago.la/1yrBwRf' },
  { id: 'mop',              name: 'Mop giratório',                                price: 75.77,   cat: 'casa',      img: 'assets/presentes/img-10.png', link: 'https://mpago.la/2K2JSSe' },
  { id: 'varal',            name: 'Varal de chão',                                price: 117.87,  cat: 'casa',      img: 'assets/presentes/img-11.png', link: 'https://mpago.la/2EWewp1' },
  { id: 'aspirador',        name: 'Aspirador de pó',                              price: 210.48,  cat: 'eletro',    img: 'assets/presentes/img-12.png', link: 'https://mpago.la/19BVHEa' },
  { id: 'batedeira',        name: 'Batedeira Inox',                               price: 315.72,  cat: 'eletro',    img: 'assets/presentes/img-13.png', link: 'https://mpago.la/2pLcWuv' },
  { id: 'jogo-pratos',      name: 'Jogo de pratos',                               price: 263.10,  cat: 'cozinha',   img: 'assets/presentes/img-14.png', link: 'https://mpago.la/2yvwNHY' },
  { id: 'aparelho-jantar',  name: 'Aparelho de jantar',                           price: 589.35,  cat: 'cozinha',   img: 'assets/presentes/img-15.png', link: 'https://mpago.la/2L4U1ge' },
  { id: 'potes-vidro',      name: 'Kit de potes de vidro herméticos',             price: 78.93,   cat: 'cozinha',   img: 'assets/presentes/img-16.png', link: 'https://mpago.la/2WgyDZb' },
  { id: 'panelas',          name: 'Jogo de Panelas Tramontina',                   price: 522.61,  cat: 'cozinha',   img: 'assets/presentes/img-17.png', link: 'https://mpago.la/2EmCDP6' },
  { id: 'jarra',            name: 'Jarra de vidro',                               price: 55.78,   cat: 'cozinha',   img: 'assets/presentes/img-18.png', link: 'https://mpago.la/2WGm9Yv' },
  { id: 'tapete-banheiro',  name: 'Tapete de banheiro',                           price: 55,      cat: 'cama-banho',img: 'assets/presentes/img-19.png', link: 'https://mpago.la/1xQBZyq' },
  { id: 'suporte-banheiro', name: 'Suporte para banheiro',                        price: 60,      cat: 'cama-banho',img: 'assets/presentes/img-20.png', link: 'https://mpago.la/1ji2wm1' },
  { id: 'lixeira',          name: 'Lixeira 60L com pedal',                        price: 190,     cat: 'casa',      img: 'assets/presentes/img-21.png', link: 'https://mpago.la/1q42dRb' },
  { id: 'cabideiro',        name: 'Cabideiro de madeira',                         price: 75,      cat: 'moveis',    img: 'assets/presentes/img-22.png', link: 'https://mpago.la/14SXfQa' },
  { id: 'xicaras',          name: 'Jogo de xícaras com pires',                    price: 135,     cat: 'cozinha',   img: 'assets/presentes/img-23.png', link: 'https://mpago.la/2gFuKsx' },
  { id: 'tabua',            name: 'Tábua de corte Inox',                          price: 60,      cat: 'cozinha',   img: 'assets/presentes/img-24.png', link: 'https://mpago.la/2NPb16w' },
  { id: 'espremedor',       name: 'Espremedor de frutas',                         price: 100,     cat: 'cozinha',   img: 'assets/presentes/img-25.png', link: 'https://mpago.la/2eXJJBK' },
  { id: 'kit-bacia',        name: 'Kit Bacia',                                    price: 35,      cat: 'casa',      img: 'assets/presentes/img-26.png', link: 'https://mpago.la/13C2cdK' },
  { id: 'balanca',          name: 'Balança corporal',                             price: 50,      cat: 'casa',      img: 'assets/presentes/img-27.png', link: 'https://mpago.la/1qLD3Xj' },
  { id: 'purificador',      name: 'Purificador de água',                          price: 400,     cat: 'eletro',    img: 'assets/presentes/img-28.png', link: 'https://mpago.la/2y6vJVk' },
  { id: 'escada',           name: 'Escada 3 degraus',                             price: 150,     cat: 'casa',      img: 'assets/presentes/img-29.png', link: 'https://mpago.la/2mz26Aw' },
  { id: 'descanso-panela',  name: 'Descanso de panela',                           price: 100,     cat: 'cozinha',   img: 'assets/presentes/img-30.png', link: 'https://mpago.la/2RX3Sjj' },
  { id: 'primeira-compra',  name: 'Ajuda na primeira compra para casa nova',      price: 700,     cat: 'casa',      img: 'assets/presentes/img-31.png', link: 'https://mpago.la/19mZyAQ' },
  { id: 'uber-aeroporto',   name: 'Uber pro aeroporto',                           price: 200,     cat: 'luademel',  img: 'assets/presentes/img-32.png', link: 'https://mpago.la/1zJDyCt' },
  { id: 'lua-passagens',    name: 'Lua de mel: ajuda nas passagens',              price: 1000,    cat: 'luademel',  img: 'assets/presentes/img-33.png', link: 'https://mpago.la/2Bnc6Yt' },
  { id: 'lua-hospedagem',   name: 'Lua de mel: ajuda na hospedagem',              price: 1500,    cat: 'luademel',  img: 'assets/presentes/img-34.png', link: 'https://mpago.la/1KPCMVx' },
  { id: 'lua-looks',        name: 'Lua de mel: ajuda nos looks da noiva',         price: 350,     cat: 'luademel',  img: 'assets/presentes/img-35.png', link: 'https://mpago.la/24bMxXM' },
  { id: 'lua-passeios',     name: 'Lua de mel: passeios',                         price: 800,     cat: 'luademel',  img: 'assets/presentes/img-36.png', link: 'https://mpago.la/2VbWGu5' },
  { id: 'fila-jantar',      name: 'Primeiro na fila do jantar',                   price: 250,     cat: 'divertidos',img: 'assets/presentes/img-37.png', link: 'https://mpago.la/1Vw1mFZ' },
  { id: 'cortinas',         name: 'Ajuda nas Cortinas da casa',                   price: 600,     cat: 'casa',      img: 'assets/presentes/img-38.png', link: 'https://mpago.la/1g5gywB' },
  { id: 'vale-lanche',      name: 'Vale 1 lanche pros noivos',                    price: 100,     cat: 'divertidos',img: 'assets/presentes/img-39.png', link: 'https://mpago.la/2x88GLg' },
  { id: 'camisa-galo',      name: 'Proibir que o noivo use camisa do galo na viagem', price: 370, cat: 'divertidos',img: 'assets/presentes/img-40.png', link: 'https://mpago.la/1mrNyYx' },
  { id: 'doramas',          name: 'Proibir que a noiva assista doramas na viagem', price: 400,    cat: 'divertidos',img: 'assets/presentes/img-41.png', link: 'https://mpago.la/1kLYdFJ' },
  { id: 'escorredor',       name: 'Escorredor de macarrão',                       price: 50,      cat: 'cozinha',   img: 'assets/presentes/img-42.png', link: 'https://mpago.la/14KRp4e' },
  { id: 'travessas',        name: 'Conjunto com 4 travessas oval rasa média',     price: 300,     cat: 'cozinha',   img: 'assets/presentes/img-43.png', link: 'https://mpago.la/16Fwb4c' },
  { id: 'cama-solteiro',    name: 'Jogo de cama Solteiro: 5 peças (cinza-branco)', price: 365,    cat: 'cama-banho',img: 'assets/presentes/img-44.png', link: 'https://mpago.la/1cWSsdh' },
  { id: 'cama-casal',       name: 'Jogo de Cama Casal King 5 Peças Bege',         price: 430,     cat: 'cama-banho',img: 'assets/presentes/img-45.png', link: 'https://mpago.la/34gwyDZ' },
  { id: 'espagueteira',     name: 'Espagueteira Inox',                            price: 230,     cat: 'cozinha',   img: 'assets/presentes/img-46.png', link: 'https://mpago.la/2Vghx4C' },
  { id: 'sanduicheira',     name: 'Sanduicheira / grill',                         price: 140,     cat: 'eletro',    img: 'assets/presentes/img-47.png', link: 'https://mpago.la/23TrmJq' },
  { id: 'petisqueira',      name: 'Petisqueira madeira e porcelana',              price: 165,     cat: 'cozinha',   img: 'assets/presentes/img-48.png', link: 'https://mpago.la/2hUzvxM' },
];

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/* ====== Máscara BRL (estilo cents-up) ====== */
function formatBRLDigits(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '';
  const padded = digits.padStart(3, '0');
  const cents  = padded.slice(-2);
  const reais  = String(parseInt(padded.slice(0, -2), 10) || 0);
  const reaisFmt = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return reaisFmt + ',' + cents;
}
function readBRLValue(input) {
  const digits = String(input.value || '').replace(/\D/g, '');
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
}

/* ====== Lembra o nome do convidado ====== */
const LAST_NAME_KEY = 'rp_last_name_v1';
function getLastName() { try { return localStorage.getItem(LAST_NAME_KEY) || ''; } catch { return ''; } }
function setLastName(n) { try { localStorage.setItem(LAST_NAME_KEY, String(n || '')); } catch {} }

/* ====== Preview do comprovante ====== */
function renderReceiptPreview(file, wrapEl) {
  // wrapEl é o .receipt-preview (com botão remove + media interna)
  const media = wrapEl.querySelector('.receipt-preview__media');
  if (!media) return;
  media.innerHTML = '';
  if (!file) { wrapEl.style.display = 'none'; return; }
  wrapEl.style.display = 'flex';
  if (file.type.startsWith('image/')) {
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url; img.alt = 'comprovante';
    img.onload = () => URL.revokeObjectURL(url);
    media.appendChild(img);
  } else {
    const ico = document.createElement('div');
    ico.className = 'receipt-preview__file';
    ico.textContent = '📄 ' + file.name;
    media.appendChild(ico);
  }
}
function hideReceiptPreview(wrapEl) {
  if (!wrapEl) return;
  const media = wrapEl.querySelector('.receipt-preview__media');
  if (media) media.innerHTML = '';
  wrapEl.style.display = 'none';
}

/* ============================================================
   GiftStore: camada de armazenamento
   ------------------------------------------------------------
   Se SHEETS_WEB_APP_URL estiver preenchido (em js/config.js),
   usa Google Sheets via Apps Script. Senão, cai pra localStorage
   (modo demonstração, NÃO compartilha entre dispositivos).
   ============================================================ */
const GiftStore = {
  KEY: 'rp_presentes_v1',

  useBackend() {
    return typeof SHEETS_WEB_APP_URL === 'string' && /^https?:\/\//.test(SHEETS_WEB_APP_URL);
  },

  _token() {
    return typeof SHEETS_TOKEN === 'string' ? SHEETS_TOKEN : '';
  },
  _withToken(payload) {
    return { ...payload, token: this._token() };
  },

  async getClaimed() {
    if (this.useBackend()) {
      try {
        const url = SHEETS_WEB_APP_URL + '?token=' + encodeURIComponent(this._token());
        const r = await fetch(url, { method: 'GET' });
        const j = await r.json();
        if (!j.ok) throw new Error(j.error || 'erro ao ler');
        return j.claimed || {};
      } catch (e) {
        console.error('[GiftStore] falha ao buscar status', e);
        return {};
      }
    }
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; }
    catch { return {}; }
  },

  async claim(payload) {
    // payload: { id, item, convidado, metodo, receiptBase64, receiptFilename, receiptMime }
    if (this.useBackend()) {
      const r = await fetch(SHEETS_WEB_APP_URL, {
        method: 'POST',
        body: JSON.stringify(this._withToken(payload)),
        // sem header Content-Type pra evitar preflight CORS no Apps Script
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || 'falha ao registrar');
      return j;
    }
    const data = JSON.parse(localStorage.getItem(this.KEY) || '{}');
    data[payload.id] = {
      convidado: payload.convidado,
      metodo: payload.metodo,
      em: new Date().toISOString(),
    };
    localStorage.setItem(this.KEY, JSON.stringify(data));
    return { ok: true };
  },

  async pixLivre(payload) {
    // payload: { convidado, valor, receiptBase64?, receiptFilename?, receiptMime? }
    if (this.useBackend()) {
      const r = await fetch(SHEETS_WEB_APP_URL, {
        method: 'POST',
        body: JSON.stringify(this._withToken({ kind: 'pix_livre', ...payload })),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || 'falha ao registrar');
      return j;
    }
    // demo localStorage
    const KEY = 'rp_pixlivre_v1';
    const data = JSON.parse(localStorage.getItem(KEY) || '[]');
    data.push({ ...payload, em: new Date().toISOString() });
    localStorage.setItem(KEY, JSON.stringify(data));
    return { ok: true };
  },

  async reset() {
    if (this.useBackend()) { alert('Reset não disponível com backend ligado.'); return; }
    localStorage.removeItem(this.KEY);
    location.reload();
  },
};
window.GiftStore = GiftStore;

/* ============================================================
   Estado & Render
   ============================================================ */
let activeFilter = 'all';
let claimedCache = {};
let isLoading = true;

const els = {
  filters:  () => document.getElementById('gift-filters'),
  list:     () => document.getElementById('gift-list'),
  progress: () => document.getElementById('gift-progress'),
  count:    () => document.getElementById('gift-count'),
  progressWrap: () => document.getElementById('gift-progresswrap'),
  modeNote: () => document.getElementById('mode-note'),
};

function renderModeNote() {
  const el = els.modeNote();
  if (!el) return;
  if (GiftStore.useBackend()) {
    el.style.display = 'none';
  } else {
    el.style.display = '';
    el.textContent = '⚠️ Modo demonstração: o controle ainda está local. Configure o Google Sheets em js/config.js para ativar o controle compartilhado.';
  }
}

function renderFilters() {
  const wrap = els.filters();
  wrap.innerHTML = '';
  CATEGORIES.forEach((c) => {
    const has = c.id === 'all' || GIFTS.some(g => g.cat === c.id);
    if (!has) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'gift-filter' + (c.id === activeFilter ? ' is-active' : '');
    b.textContent = `${c.emoji} ${c.label}`;
    b.addEventListener('click', () => { activeFilter = c.id; renderList(); renderFilters(); });
    wrap.appendChild(b);
  });
}

function renderProgress() {
  const wrap = els.progressWrap();
  if (isLoading) {
    wrap.classList.add('is-loading');
    els.progress().style.width = '0%';
    els.count().innerHTML = '<span class="skel skel--text" style="width:240px;height:.7em"></span>';
    return;
  }
  wrap.classList.remove('is-loading');
  const claimed = Object.keys(claimedCache).length;
  const total = GIFTS.length;
  const pct = total ? Math.round((claimed / total) * 100) : 0;
  els.progress().style.width = pct + '%';
  els.count().textContent = `${claimed} de ${total} presentes já escolhidos`;
}

function renderSkeletons() {
  const list = els.list();
  list.innerHTML = '';
  // ~ 8 skeleton cards
  for (let i = 0; i < 8; i++) {
    const card = document.createElement('article');
    card.className = 'gift-card gift-card--skel';
    card.innerHTML = `
      <div class="gift-card__media skel"></div>
      <div class="gift-card__skelline skel" style="width:80%"></div>
      <div class="gift-card__skelline skel" style="width:50%;height:.9em"></div>
      <div class="gift-card__skelbtn skel"></div>
    `;
    list.appendChild(card);
  }
}

function giftCard(g) {
  const claimed = !!claimedCache[g.id];
  const card = document.createElement('article');
  card.className = 'gift-card' + (claimed ? ' is-claimed' : '');
  card.innerHTML = `
    <div class="gift-card__media">
      <img src="${g.img}" alt="${g.name}" loading="lazy">
      ${claimed ? '<span class="gift-card__overlay">Presenteado 💝</span>' : ''}
    </div>
    <h3 class="gift-card__name">${g.name}</h3>
    <p class="gift-card__price">${brl(g.price)}</p>
    ${claimed
      ? `<span class="gift-card__badge">Presenteado 💝</span>`
      : `<button type="button" class="btn btn--coral gift-card__btn">Presentear</button>`}
  `;
  if (!claimed) {
    card.querySelector('.gift-card__btn').addEventListener('click', () => openModal(g));
  }
  return card;
}

function renderList() {
  if (isLoading) { renderSkeletons(); return; }
  const list = els.list();
  list.innerHTML = '';
  const items = GIFTS
    .filter(g => activeFilter === 'all' || g.cat === activeFilter)
    .sort((a, b) => Number(!!claimedCache[a.id]) - Number(!!claimedCache[b.id]));

  if (!items.length) {
    list.innerHTML = '<p class="gift-empty">Nenhum item nesta categoria.</p>';
    return;
  }
  items.forEach(g => list.appendChild(giftCard(g)));
}

function renderAll() {
  renderModeNote();
  renderFilters();
  renderProgress();
  renderList();
}

async function refreshClaimedAndRender() {
  // garante skeleton enquanto carrega
  isLoading = true;
  renderAll();
  try {
    claimedCache = await GiftStore.getClaimed();
  } catch (e) {
    console.error(e);
    claimedCache = {};
  }
  isLoading = false;
  renderAll();
}

/* ============================================================
   MODAL
   ============================================================ */
let modalGift = null;

function openModal(g) {
  modalGift = g;
  const m = document.getElementById('gift-modal');
  m.querySelector('[data-modal-name]').textContent = g.name;
  m.querySelector('[data-modal-price]').textContent = brl(g.price);
  m.querySelector('[data-modal-pixkey]').textContent = PIX_KEY_DISPLAY;
  m.querySelector('[data-modal-pixname]').textContent = PIX_NAME;
  m.querySelector('[data-modal-buylink]').href = g.link;
  m.querySelector('[data-modal-img]').src = g.img;
  m.querySelector('[data-modal-img]').alt = g.name;

  // reset form
  m.querySelector('[data-field-name]').value = getLastName();
  m.querySelectorAll('[data-field-method]').forEach(r => r.checked = false);
  const file = m.querySelector('[data-field-receipt]');
  file.value = '';
  m.querySelector('[data-receipt-label]').textContent = 'Selecionar arquivo';
  hideReceiptPreview(m.querySelector('[data-receipt-wrap]'));
  m.querySelector('[data-modal-error]').textContent = '';
  m.querySelector('[data-modal-confirm]').textContent = 'Confirmar ✓';
  setSubmitting(m, false);

  m.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  validateGiftForm();
  setTimeout(() => {
    const nameField = m.querySelector('[data-field-name]');
    nameField.focus();
    if (nameField.value) nameField.select();
  }, 50);
}

function validateGiftForm() {
  const m = document.getElementById('gift-modal');
  if (!m) return false;
  const nome   = m.querySelector('[data-field-name]').value.trim();
  const metodo = m.querySelector('[data-field-method]:checked');
  const file   = m.querySelector('[data-field-receipt]').files[0];
  const valid  = !!nome && !!metodo && !!file;
  m.querySelector('[data-modal-confirm]').disabled = !valid;
  return valid;
}

function setSubmitting(modal, on) {
  modal.classList.toggle('is-submitting', !!on);
  modal.querySelectorAll('input, .btn--outline, .gift-form__filebtn').forEach(el => {
    if (el.tagName === 'INPUT') el.disabled = !!on;
  });
}

function closeModal() {
  const m = document.getElementById('gift-modal');
  m.classList.remove('is-open');
  document.body.style.overflow = '';
  modalGift = null;
}

async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    return ok;
  }
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // result: "data:image/jpeg;base64,XXXX"
      const dataUrl = reader.result;
      const base64 = dataUrl.split(',')[1];
      resolve({ base64, mime: file.type || 'application/octet-stream' });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setupModal() {
  const m = document.getElementById('gift-modal');
  m.querySelector('.gift-modal__close').addEventListener('click', closeModal);
  m.querySelector('[data-modal-backdrop]').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && m.classList.contains('is-open')) closeModal();
  });

  // Copy PIX key
  const copyBtn = m.querySelector('[data-modal-copy]');
  const feedback = m.querySelector('[data-copy-feedback]');
  copyBtn.addEventListener('click', async () => {
    const ok = await copyToClipboard(PIX_KEY);
    feedback.textContent = ok ? 'Chave copiada! ✅' : 'Não consegui copiar 😕';
    copyBtn.classList.add('is-copied');
    setTimeout(() => { feedback.textContent = ''; copyBtn.classList.remove('is-copied'); }, 2500);
  });

  // File label + preview
  const fileInput = m.querySelector('[data-field-receipt]');
  const fileLabel = m.querySelector('[data-receipt-label]');
  const wrapEl    = m.querySelector('[data-receipt-wrap]');
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if (f && f.size > 8 * 1024 * 1024) {
      m.querySelector('[data-modal-error]').textContent = 'Comprovante muito grande (máx. 8MB).';
      fileInput.value = '';
      fileLabel.textContent = 'Selecionar arquivo';
      hideReceiptPreview(wrapEl);
      validateGiftForm();
      return;
    }
    fileLabel.textContent = f ? f.name : 'Selecionar arquivo';
    if (f) renderReceiptPreview(f, wrapEl); else hideReceiptPreview(wrapEl);
    m.querySelector('[data-modal-error]').textContent = '';
    validateGiftForm();
  });

  // Live validation
  m.querySelector('[data-field-name]').addEventListener('input', validateGiftForm);
  m.querySelectorAll('[data-field-method]').forEach(r => r.addEventListener('change', validateGiftForm));

  // Remover comprovante
  const removeBtn = m.querySelector('[data-receipt-remove]');
  if (removeBtn) removeBtn.addEventListener('click', () => {
    fileInput.value = '';
    fileLabel.textContent = 'Selecionar arquivo';
    hideReceiptPreview(wrapEl);
    validateGiftForm();
  });

  // Confirm
  const confirmBtn = m.querySelector('[data-modal-confirm]');
  const errEl = m.querySelector('[data-modal-error]');
  confirmBtn.addEventListener('click', async () => {
    if (!modalGift) return;
    if (!validateGiftForm()) return;
    errEl.textContent = '';

    const nome = m.querySelector('[data-field-name]').value.trim();
    const metodo = m.querySelector('[data-field-method]:checked').value;
    const file = m.querySelector('[data-field-receipt]').files[0];

    setSubmitting(m, true);
    confirmBtn.textContent = 'Enviando…';
    try {
      const { base64, mime } = await readFileAsBase64(file);
      await GiftStore.claim({
        id: modalGift.id,
        item: modalGift.name,
        valor: modalGift.price,
        convidado: nome,
        metodo,
        receiptBase64: base64,
        receiptFilename: file.name,
        receiptMime: mime,
      });
      setLastName(nome);
      closeModal();
      showToast(`Presente confirmado! Obrigada, ${nome.split(' ')[0]}! 💝`, 'success');
      await refreshClaimedAndRender();
    } catch (e) {
      console.error(e);
      errEl.textContent = 'Algo deu errado: ' + (e.message || 'tente de novo em alguns segundos.');
      setSubmitting(m, false);
      confirmBtn.textContent = 'Confirmar ✓';
    }
  });
}

function showToast(msg, type) {
  const t = document.getElementById('gift-toast');
  if (!t) return;
  t.classList.remove('is-shown', 'is-success');
  t.innerHTML = (type === 'success' ? '<span class="gift-toast__check">✓</span>' : '') + `<span>${msg}</span>`;
  if (type === 'success') t.classList.add('is-success');
  // forçar reflow pra reanimar
  void t.offsetWidth;
  t.classList.add('is-shown');
  clearTimeout(showToast._tid);
  showToast._tid = setTimeout(() => t.classList.remove('is-shown'), 5500);
}

/* ============================================================
   MODAL PIX LIVRE (presentear com valor livre)
   ============================================================ */
function openPixLivreModal() {
  const m = document.getElementById('pixlivre-modal');
  m.querySelector('[data-pl-pixkey]').textContent = PIX_KEY_DISPLAY;
  m.querySelector('[data-pl-pixname]').textContent = PIX_NAME;
  m.querySelector('[data-pl-name]').value = getLastName();
  m.querySelector('[data-pl-value]').value = '';
  m.querySelector('[data-pl-receipt]').value = '';
  m.querySelector('[data-pl-receipt-label]').textContent = 'Selecionar arquivo';
  hideReceiptPreview(m.querySelector('[data-pl-wrap]'));
  m.querySelector('[data-pl-error]').textContent = '';
  m.querySelector('[data-pl-feedback]').textContent = '';
  m.querySelector('[data-pl-confirm]').textContent = 'Confirmar ✓';
  setSubmitting(m, false);
  m.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  validatePixLivreForm();
  setTimeout(() => {
    const nameField = m.querySelector('[data-pl-name]');
    nameField.focus();
    if (nameField.value) nameField.select();
  }, 50);
}

function validatePixLivreForm() {
  const m = document.getElementById('pixlivre-modal');
  if (!m) return false;
  const nome  = m.querySelector('[data-pl-name]').value.trim();
  const valor = readBRLValue(m.querySelector('[data-pl-value]'));
  const file  = m.querySelector('[data-pl-receipt]').files[0];
  const valid = !!nome && valor > 0 && !!file;
  m.querySelector('[data-pl-confirm]').disabled = !valid;
  return valid;
}

function closePixLivreModal() {
  const m = document.getElementById('pixlivre-modal');
  m.classList.remove('is-open');
  document.body.style.overflow = '';
}

function setupPixLivreModal() {
  const m = document.getElementById('pixlivre-modal');
  if (!m) return;
  m.querySelector('.gift-modal__close').addEventListener('click', closePixLivreModal);
  m.querySelector('[data-pl-backdrop]').addEventListener('click', closePixLivreModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && m.classList.contains('is-open')) closePixLivreModal();
  });

  const copyBtn = m.querySelector('[data-pl-copy]');
  const feedback = m.querySelector('[data-pl-feedback]');
  copyBtn.addEventListener('click', async () => {
    const ok = await copyToClipboard(PIX_KEY);
    feedback.textContent = ok ? 'Chave copiada! ✅' : 'Não consegui copiar 😕';
    setTimeout(() => feedback.textContent = '', 2500);
  });

  // Máscara BRL
  const valueInput = m.querySelector('[data-pl-value]');
  valueInput.addEventListener('input', () => {
    valueInput.value = formatBRLDigits(valueInput.value);
    validatePixLivreForm();
  });

  // Nome
  m.querySelector('[data-pl-name]').addEventListener('input', validatePixLivreForm);

  // File + preview
  const fileInput = m.querySelector('[data-pl-receipt]');
  const fileLabel = m.querySelector('[data-pl-receipt-label]');
  const wrapEl    = m.querySelector('[data-pl-wrap]');
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if (f && f.size > 8 * 1024 * 1024) {
      m.querySelector('[data-pl-error]').textContent = 'Comprovante muito grande (máx. 8MB).';
      fileInput.value = '';
      fileLabel.textContent = 'Selecionar arquivo';
      hideReceiptPreview(wrapEl);
      validatePixLivreForm();
      return;
    }
    fileLabel.textContent = f ? f.name : 'Selecionar arquivo';
    if (f) renderReceiptPreview(f, wrapEl); else hideReceiptPreview(wrapEl);
    m.querySelector('[data-pl-error]').textContent = '';
    validatePixLivreForm();
  });

  // Remover comprovante
  const removeBtn = m.querySelector('[data-pl-receipt-remove]');
  if (removeBtn) removeBtn.addEventListener('click', () => {
    fileInput.value = '';
    fileLabel.textContent = 'Selecionar arquivo';
    hideReceiptPreview(wrapEl);
    validatePixLivreForm();
  });

  const confirmBtn = m.querySelector('[data-pl-confirm]');
  const errEl = m.querySelector('[data-pl-error]');
  confirmBtn.addEventListener('click', async () => {
    if (!validatePixLivreForm()) return;
    errEl.textContent = '';
    const nome  = m.querySelector('[data-pl-name]').value.trim();
    const valor = readBRLValue(valueInput);
    const file  = fileInput.files[0];

    setSubmitting(m, true);
    confirmBtn.textContent = 'Enviando…';
    try {
      const { base64, mime } = await readFileAsBase64(file);
      await GiftStore.pixLivre({
        convidado: nome,
        valor,
        receiptBase64: base64,
        receiptFilename: file.name,
        receiptMime: mime,
      });
      setLastName(nome);
      closePixLivreModal();
      showToast(`Obrigada, ${nome.split(' ')[0]}! PIX de ${brl(valor)} registrado. 💝`, 'success');
    } catch (e) {
      console.error(e);
      errEl.textContent = 'Algo deu errado: ' + (e.message || 'tente de novo em alguns segundos.');
      setSubmitting(m, false);
      confirmBtn.textContent = 'Confirmar ✓';
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  // Preenche a caixa de PIX do topo (dados vêm do config.js)
  const pixDisplay = document.querySelector('[data-pix-display]');
  const pixName    = document.querySelector('[data-pix-name]');
  if (pixDisplay) pixDisplay.textContent = PIX_KEY_DISPLAY;
  if (pixName)    pixName.textContent = PIX_NAME;

  setupModal();
  setupPixLivreModal();
  // botão "Presentear com PIX livre" do topo
  const top = document.getElementById('pix-livre-trigger');
  if (top) top.addEventListener('click', openPixLivreModal);
  // expor pra debug
  window.openPixLivreModal = openPixLivreModal;

  renderAll(); // mostra skeletons + modeNote imediatamente
  await refreshClaimedAndRender();
});

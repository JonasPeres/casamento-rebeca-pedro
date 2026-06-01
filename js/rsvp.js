/* ============================================================
   Confirmação de presença (RSVP) | Rebeca & Pedro
   Salva nome, idade e telefone na aba "Presenca" da planilha.
   ============================================================ */
(function () {
  const modal = document.getElementById('rsvp-modal');
  const trigger = document.getElementById('rsvp-trigger');
  if (!modal || !trigger) return;

  const nameEl  = modal.querySelector('[data-rsvp-name]');
  const ageEl   = modal.querySelector('[data-rsvp-age]');
  const phoneEl = modal.querySelector('[data-rsvp-phone]');
  const errEl   = modal.querySelector('[data-rsvp-error]');
  const confirmBtn = modal.querySelector('[data-rsvp-confirm]');

  function useBackend() {
    return typeof SHEETS_WEB_APP_URL === 'string' && /^https?:\/\//.test(SHEETS_WEB_APP_URL);
  }
  function token() {
    return typeof SHEETS_TOKEN === 'string' ? SHEETS_TOKEN : '';
  }

  /* ---- máscara de telefone BR ---- */
  function maskPhone(v) {
    const d = String(v || '').replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2)  return d.length ? '(' + d : '';
    if (d.length <= 6)  return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  function phoneDigits() {
    return String(phoneEl.value || '').replace(/\D/g, '');
  }

  /* ---- validação ---- */
  function validate() {
    const nome = nameEl.value.trim();
    const idade = ageEl.value;
    const phone = phoneDigits();
    const ageOk = idade !== '' && Number(idade) >= 0 && Number(idade) <= 120;
    const valid = !!nome && ageOk && phone.length >= 10;
    confirmBtn.disabled = !valid;
    return valid;
  }

  /* ---- toast ---- */
  function toast(msg, type) {
    const t = document.getElementById('gift-toast');
    if (!t) return;
    t.classList.remove('is-shown', 'is-success');
    t.innerHTML = (type === 'success' ? '<span class="gift-toast__check">✓</span>' : '') + `<span>${msg}</span>`;
    if (type === 'success') t.classList.add('is-success');
    void t.offsetWidth;
    t.classList.add('is-shown');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove('is-shown'), 5500);
  }

  /* ---- abrir / fechar ---- */
  function open() {
    nameEl.value = '';
    ageEl.value = '';
    phoneEl.value = '';
    errEl.textContent = '';
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Confirmar presença ✓';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => nameEl.focus(), 50);
  }
  function close() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ---- envio ---- */
  async function submit() {
    if (!validate()) return;
    errEl.textContent = '';
    const payload = {
      kind: 'rsvp',
      nome: nameEl.value.trim(),
      idade: Number(ageEl.value),
      telefone: maskPhone(phoneEl.value),
    };

    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Enviando…';
    [nameEl, ageEl, phoneEl].forEach(el => el.disabled = true);

    try {
      if (useBackend()) {
        const r = await fetch(SHEETS_WEB_APP_URL, {
          method: 'POST',
          body: JSON.stringify({ ...payload, token: token() }),
        });
        const j = await r.json();
        if (!j.ok) throw new Error(j.error || 'falha ao registrar');
      } else {
        const KEY = 'rp_presenca_v1';
        const data = JSON.parse(localStorage.getItem(KEY) || '[]');
        data.push({ ...payload, em: new Date().toISOString() });
        localStorage.setItem(KEY, JSON.stringify(data));
      }
      close();
      toast(`Presença confirmada! Até 19.09, ${payload.nome.split(' ')[0]}! 💚`, 'success');
    } catch (e) {
      console.error(e);
      errEl.textContent = 'Algo deu errado: ' + (e.message || 'tente de novo em alguns segundos.');
    } finally {
      [nameEl, ageEl, phoneEl].forEach(el => el.disabled = false);
      confirmBtn.textContent = 'Confirmar presença ✓';
      validate();
    }
  }

  /* ---- listeners ---- */
  trigger.addEventListener('click', open);
  modal.querySelector('.gift-modal__close').addEventListener('click', close);
  modal.querySelector('[data-rsvp-backdrop]').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  nameEl.addEventListener('input', validate);
  ageEl.addEventListener('input', validate);
  phoneEl.addEventListener('input', () => { phoneEl.value = maskPhone(phoneEl.value); validate(); });
  confirmBtn.addEventListener('click', submit);
})();

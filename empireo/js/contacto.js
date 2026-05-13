/* ============================================
   EMPÍREO — Validación del formulario de contacto
   ============================================ */

(function () {

  const form       = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');
  const resetBtn   = document.getElementById('resetBtn');
  const charCount  = document.getElementById('charCount');
  const mensajeEl  = document.getElementById('mensaje');

  if (!form) return; // Solo corre en contacto.html

  // ── Contador de caracteres del textarea ──────────────────────────
  if (mensajeEl && charCount) {
    mensajeEl.addEventListener('input', () => {
      const len = mensajeEl.value.length;
      charCount.textContent = `${len} / 2000`;
      charCount.classList.toggle('char-count--warn', len > 1800);
    });
  }

  // ── Validación en tiempo real (al salir del campo) ───────────────
  ['nombre', 'email', 'asunto', 'mensaje'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('input', () => {
      // Limpia el error mientras el usuario escribe (si ya había uno)
      if (document.getElementById(`group-${id}`).classList.contains('field--error')) {
        validateField(id);
      }
    });
  });

  // ── Submit ────────────────────────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields  = ['nombre', 'email', 'asunto', 'mensaje'];
    const results = fields.map(id => validateField(id));
    const allOk   = results.every(Boolean);

    if (!allOk) {
      // Hace foco en el primer campo con error
      const firstError = fields.find(id =>
        document.getElementById(`group-${id}`).classList.contains('field--error')
      );
      if (firstError) document.getElementById(firstError).focus();
      return;
    }

    // Simulación de envío (reemplazá con fetch a tu backend si querés)
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.querySelector('.submit-text').textContent = 'Enviando…';

    setTimeout(() => {
      form.style.display        = 'none';
      successBox.style.display  = 'flex';
    }, 800);
  });

  // ── Reset ─────────────────────────────────────────────────────────
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      if (charCount) charCount.textContent = '0 / 2000';

      ['nombre', 'email', 'asunto', 'mensaje'].forEach(id => clearError(id));

      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.disabled = false;
        btn.querySelector('.submit-text').textContent = 'Enviar mensaje';
      }

      successBox.style.display = 'none';
      form.style.display       = 'flex';
    });
  }

  // ── Funciones de validación ───────────────────────────────────────

  function validateField(id) {
    const el    = document.getElementById(id);
    const value = el ? el.value.trim() : '';

    switch (id) {
      case 'nombre':
        if (!value) return setError(id, 'El nombre no puede estar vacío.');
        if (value.length < 2) return setError(id, 'El nombre debe tener al menos 2 caracteres.');
        return clearError(id);

      case 'email':
        if (!value) return setError(id, 'El correo no puede estar vacío.');
        if (!isValidEmail(value)) return setError(id, 'El formato del correo no es válido (ejemplo@dominio.com).');
        return clearError(id);

      case 'asunto':
        if (!value) return setError(id, 'El asunto no puede estar vacío.');
        if (value.length < 3) return setError(id, 'El asunto debe tener al menos 3 caracteres.');
        return clearError(id);

      case 'mensaje':
        if (!value) return setError(id, 'El mensaje no puede estar vacío.');
        if (value.length < 10) return setError(id, 'El mensaje debe tener al menos 10 caracteres.');
        return clearError(id);

      default:
        return true;
    }
  }

  function isValidEmail(email) {
    // RFC-5322 simplificado: usuario@dominio.extensión
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  }

  function setError(id, message) {
    const group = document.getElementById(`group-${id}`);
    const error = document.getElementById(`error-${id}`);
    const input = document.getElementById(id);
    if (group) group.classList.add('field--error');
    if (error) error.textContent = message;
    if (input) input.setAttribute('aria-invalid', 'true');
    return false;
  }

  function clearError(id) {
    const group = document.getElementById(`group-${id}`);
    const error = document.getElementById(`error-${id}`);
    const input = document.getElementById(id);
    if (group) group.classList.remove('field--error');
    if (error) error.textContent = '';
    if (input) input.setAttribute('aria-invalid', 'false');
    return true;
  }

})();

/* ============================================
   EMPÍREO — JavaScript Principal
   ============================================ */

// === Hamburger Menu ===
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const expanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });

  // Cerrar el menú al hacer click en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();


// === Mapa interactivo (zoom al hover) ===
(function () {
  const map = document.querySelector('.map');
  if (!map) return;

  map.addEventListener('mousemove', (e) => {
    const rect = map.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    map.style.transformOrigin = `${x}% ${y}%`;
    map.style.transform = 'scale(2)';
  });

  map.addEventListener('mouseleave', () => {
    map.style.transform       = 'scale(1)';
    map.style.transformOrigin = 'center center';
  });
})();


// === Modal de personaje ===
(function () {
  const overlay = document.getElementById('characterModal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.modal-close');

  // Abrir modal al hacer click en una card
  document.querySelectorAll('.character-card[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.modal;
      openModal(id);
    });
  });

  // Cerrar
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function openModal(id) {
    const data = characterData[id];
    if (!data) return;

    overlay.querySelector('#modal-name').textContent  = data.name;
    overlay.querySelector('#modal-alias').textContent = data.alias || '';
    overlay.querySelector('#modal-desc').textContent  = data.description;

    // Imagen
    const imgEl = overlay.querySelector('#modal-img');
    if (data.image) {
      imgEl.src = data.image;
      imgEl.alt = data.name;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
    }

    // Tags
    const tagsEl = overlay.querySelector('#modal-tags');
    tagsEl.innerHTML = (data.tags || [])
      .map(t => `<span class="modal-tag">${t}</span>`)
      .join('');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
})();


// === Datos de personajes (centralizado aquí) ===
// Agrega o edita personajes en este objeto.
// La key debe coincidir con el atributo data-modal de cada .character-card
const characterData = {
  violet: {
    name: 'Violet Sorrengail',
    alias: 'La Chica de los Libros',
    description:
      'Hija de la General Sorrengail, Violet fue criada para ser escribana, pero el destino —y su madre— la enviaron a Basgiath. Frágil de cuerpo pero de voluntad inquebrantable, víncula con no uno, sino dos dragones en una hazaña sin precedentes, desatando una cadena de secretos que sacudirá a toda Navarre.',
    image: 'img/violet.jpg',
    tags: ['Protagonista', 'Jinete', 'Cuadernos de Basgiath'],
  },
  xaden: {
    name: 'Xaden Riorson',
    alias: 'El Comandante de Ala',
    description:
      'Hijo del líder de la última rebelión, Xaden carga desde niño con una marca de rebelde y los secretos más oscuros de Navarre. Su frialdad calculada oculta una lealtad feroz hacia quienes ama. Es el antagonista que se convierte en algo mucho más complicado.',
    image: 'img/xaden.jpg',
    tags: ['Comandante', 'Jinete', 'Sgaeyl'],
  },
  liam: {
    name: 'Liam Mairi',
    alias: 'El Guardián',
    description:
      'Compañero de cuadrante y guardia asignado por Xaden para proteger a Violet. Su lealtad y buen corazón lo convierten en uno de los personajes más queridos de la saga.',
    image: '',
    tags: ['Jinete', 'Cuadrante de Violet'],
  },
  rhiannon: {
    name: 'Rhiannon Matthias',
    alias: 'Rhi',
    description:
      'La mejor amiga de Violet desde el primer día en Basgiath. Astuta, valiente y con una lealtad que no tiene precio. Su vínculo con Violet es uno de los pilares emocionales de la historia.',
    image: '',
    tags: ['Jinete', 'Mejor amiga'],
  },
  dain: {
    name: 'Dain Aetos',
    alias: 'El Líder de Cuadrante',
    description:
      'Amigo de la infancia de Violet y líder del cuadrante Alas de Cola. Inteligente y protector, aunque sus secretos y su lealtad al sistema lo colocan en tensión permanente con aquellos a quienes quiere.',
    image: '',
    tags: ['Líder de Cuadrante', 'Amigo de la infancia'],
  },
  andarna: {
    name: 'Andarna',
    alias: 'La Dragona Dorada',
    description:
      'La dragona más joven y peculiar de toda Basgiath. Su vínculo con Violet es único e inexplicable. Sus escamas doradas ocultan un poder que aún el mundo no comprende del todo.',
    image: '',
    tags: ['Dragona', 'Segundo vínculo de Violet'],
  },
};

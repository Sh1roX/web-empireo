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
// === LIGHTBOX MODERNO (con navegación y responsive) ===
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxName = document.getElementById('lightbox-name');
  const lightboxAlias = document.getElementById('lightbox-alias');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxTags = document.getElementById('lightbox-tags');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  let currentCharacterId = null;
  let characterKeys = [];

  function openLightbox(characterId) {
    const character = characterData[characterId];
    if (!character) return;

    currentCharacterId = characterId;

    // Imagen
    if (character.image) {
      lightboxImg.src = character.image;
      lightboxImg.alt = character.name;
      lightboxImg.style.display = 'block';
    } else {
      lightboxImg.style.display = 'none';
    }

    // Textos
    lightboxName.textContent = character.name;
    lightboxAlias.textContent = character.alias || '';
    lightboxDescription.textContent = character.description || '';

    // Tags
    lightboxTags.innerHTML = '';
    if (character.tags && character.tags.length) {
      character.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        lightboxTags.appendChild(tagSpan);
      });
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentCharacterId = null;
  }

  function navigateLightbox(direction) {
    if (!characterKeys.length) return;
    const currentIndex = characterKeys.indexOf(currentCharacterId);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % characterKeys.length;
    } else {
      newIndex = (currentIndex - 1 + characterKeys.length) % characterKeys.length;
    }
    openLightbox(characterKeys[newIndex]);
  }

  // Configurar eventos en las cards
  function setupLightbox() {
    const cards = document.querySelectorAll('.character-card[data-modal]');
    characterKeys = [];
    
    cards.forEach(card => {
      const characterId = card.dataset.modal;
      if (characterId && characterData[characterId]) {
        characterKeys.push(characterId);
        // Remover eventos anteriores y agregar nuevo
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', (e) => {
          e.preventDefault();
          openLightbox(characterId);
        });
      }
    });

    // Si no se encontraron cards con data-modal, usar las keys del objeto
    if (characterKeys.length === 0) {
      characterKeys = Object.keys(characterData);
    }

    // Eventos de los botones
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox('next'));

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'ArrowRight') navigateLightbox('next');
      }
    });

    // Cerrar al hacer clic fuera del contenido
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  setupLightbox();
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
    image: '/web-empireo/img/violet.webp',
    tags: ['Protagonista', 'Jinete', 'Cuadernos de Basgiath'],
  },
  xaden: {
    name: 'Xaden Riorson',
    alias: 'El Comandante de Ala',
    description:
      'Hijo del líder de la última rebelión, Xaden carga desde niño con una marca de rebelde y los secretos más oscuros de Navarre. Su frialdad calculada oculta una lealtad feroz hacia quienes ama. Es el antagonista que se convierte en algo mucho más complicado.',
    image: '/web-empireo/img/xaden.webp',
    tags: ['Comandante', 'Jinete', 'Sgaeyl'],
  },
  liam: {
    name: 'Liam Mairi',
    alias: 'El Guardián',
    description:
      'Compañero de cuadrante y guardia asignado por Xaden para proteger a Violet. Su lealtad y buen corazón lo convierten en uno de los personajes más queridos de la saga.',
    image: '/web-empireo/img/liam.webp',
    tags: ['Jinete', 'Cuadrante de Violet'],
  },
  rhiannon: {
    name: 'Rhiannon Matthias',
    alias: 'Rhi',
    description:
      'La mejor amiga de Violet desde el primer día en Basgiath. Astuta, valiente y con una lealtad que no tiene precio. Su vínculo con Violet es uno de los pilares emocionales de la historia.',
    image: '/web-empireo/img/rhiannon.webp',
    tags: ['Jinete', 'Mejor amiga'],
  },
  dain: {
    name: 'Dain Aetos',
    alias: 'El Líder de Cuadrante',
    description:
      'Amigo de la infancia de Violet y líder del cuadrante Alas de Cola. Inteligente y protector, aunque sus secretos y su lealtad al sistema lo colocan en tensión permanente con aquellos a quienes quiere.',
    image: '/web-empireo/img/dain.webp',
    tags: ['Líder de Cuadrante', 'Amigo de la infancia'],
  },
  andarna: {
    name: 'Andarna',
    alias: 'La Dragona Dorada',
    description:
      'La dragona más joven y peculiar de toda Basgiath. Su vínculo con Violet es único e inexplicable. Sus escamas doradas ocultan un poder que aún el mundo no comprende del todo.',
    image: '/web-empireo/img/andarna.webp',
    tags: ['Dragona', 'Segundo vínculo de Violet'],
  },
};

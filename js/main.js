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

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// === Mapa interactivo ===
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

// === DATOS DE PERSONAJES ===
const characterData = {
  violet: {
    name: 'Violet Sorrengail',
    alias: 'La Chica de los Libros',
    description: 'Hija de la General Sorrengail, Violet fue criada para ser escribana, pero el destino —y su madre— la enviaron a Basgiath. Frágil de cuerpo pero de voluntad inquebrantable, víncula con no uno, sino dos dragones en una hazaña sin precedentes.',
    image: '/web-empireo/img/violet.webp',
    tags: ['Protagonista', 'Jinete', 'Cuadernos de Basgiath'],
  },
  xaden: {
    name: 'Xaden Riorson',
    alias: 'El Comandante de Ala',
    description: 'Hijo del líder de la última rebelión, Xaden carga desde niño con una marca de rebelde y los secretos más oscuros de Navarre. Su frialdad calculada oculta una lealtad feroz hacia quienes ama.',
    image: '/web-empireo/img/xaden.webp',
    tags: ['Comandante', 'Jinete', 'Sgaeyl'],
  },
  liam: {
    name: 'Liam Mairi',
    alias: 'El Guardián',
    description: 'Compañero de cuadrante y guardia asignado por Xaden para proteger a Violet. Su lealtad y buen corazón lo convierten en uno de los personajes más queridos de la saga.',
    image: '/web-empireo/img/liam.webp',
    tags: ['Jinete', 'Cuadrante de Violet'],
  },
  rhiannon: {
    name: 'Rhiannon Matthias',
    alias: 'Rhi',
    description: 'La mejor amiga de Violet desde el primer día en Basgiath. Astuta, valiente y con una lealtad que no tiene precio.',
    image: '/web-empireo/img/rhiannon.webp',
    tags: ['Jinete', 'Mejor amiga'],
  },
  dain: {
    name: 'Dain Aetos',
    alias: 'El Líder de Cuadrante',
    description: 'Amigo de la infancia de Violet y líder del cuadrante Alas de Cola. Inteligente y protector, aunque sus secretos y su lealtad al sistema lo colocan en tensión.',
    image: '/web-empireo/img/dain.webp',
    tags: ['Líder de Cuadrante', 'Amigo de la infancia'],
  },
  andarna: {
    name: 'Andarna',
    alias: 'La Dragona Dorada',
    description: 'La dragona más joven y peculiar de toda Basgiath. Su vínculo con Violet es único e inexplicable. Sus escamas doradas ocultan un poder que aún el mundo no comprende.',
    image: '/web-empireo/img/andarna.webp',
    tags: ['Dragona', 'Segundo vínculo de Violet'],
  },
};

// === LIGHTBOX (VERSIÓN CORREGIDA) ===
(function() {
  // Esperar a que el DOM esté listo
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      console.error('❌ No se encontró el elemento #lightbox en el HTML');
      return;
    }

    console.log('✅ Lightbox encontrado, inicializando...');

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxName = document.getElementById('lightbox-name');
    const lightboxAlias = document.getElementById('lightbox-alias');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxTags = document.getElementById('lightbox-tags');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentId = null;
    const charactersList = Object.keys(characterData);

    // Función global para abrir el lightbox
    window.openLightbox = function(id) {
      console.log('🔓 Abriendo lightbox para:', id);
      const char = characterData[id];
      if (!char) {
        console.error('❌ Personaje no encontrado:', id);
        return;
      }
      
      currentId = id;
      
      if (lightboxImg && char.image) {
        lightboxImg.src = char.image;
        lightboxImg.alt = char.name;
        lightboxImg.style.display = 'block';
      } else if (lightboxImg) {
        lightboxImg.style.display = 'none';
      }
      
      if (lightboxName) lightboxName.textContent = char.name;
      if (lightboxAlias) lightboxAlias.textContent = char.alias || '';
      if (lightboxDescription) lightboxDescription.textContent = char.description || '';
      
      if (lightboxTags) {
        lightboxTags.innerHTML = '';
        if (char.tags && char.tags.length) {
          char.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            lightboxTags.appendChild(span);
          });
        }
      }
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    // Cerrar lightbox
    function closeLightbox() {
      console.log('🔒 Cerrando lightbox');
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      currentId = null;
    }

    // Navegar
    function navigate(direction) {
      if (!currentId || charactersList.length === 0) return;
      const currentIndex = charactersList.indexOf(currentId);
      if (currentIndex === -1) return;
      
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % charactersList.length;
      } else {
        newIndex = (currentIndex - 1 + charactersList.length) % charactersList.length;
      }
      window.openLightbox(charactersList[newIndex]);
    }

    // Asignar eventos
    if (closeBtn) closeBtn.onclick = closeLightbox;
    if (prevBtn) prevBtn.onclick = () => navigate('prev');
    if (nextBtn) nextBtn.onclick = () => navigate('next');

    // Cerrar con ESC
    document.onkeydown = function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navigate('prev');
        if (e.key === 'ArrowRight') navigate('next');
      }
    };

    // Cerrar al hacer clic fuera
    lightbox.onclick = function(e) {
      if (e.target === lightbox) closeLightbox();
    };

    // === VINCULAR CARDS ===
    const cards = document.querySelectorAll('.character-card');
    console.log(`📇 Cards encontradas: ${cards.length}`);
    
    cards.forEach((card, index) => {
      const modalId = card.getAttribute('data-modal');
      if (modalId) {
        console.log(`🔗 Vinculando card ${index + 1}: ${modalId}`);
        card.style.cursor = 'pointer';
        
        // Remover event listeners anteriores clonando
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        newCard.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(`🖱️ Click en card: ${modalId}`);
          window.openLightbox(modalId);
        });
      } else {
        console.warn(`⚠️ Card ${index + 1} no tiene data-modal`);
      }
    });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();

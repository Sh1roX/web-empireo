/* ============================================
   EMPÍREO — JavaScript Principal (VERSIÓN CORREGIDA)
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
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    map.style.transformOrigin = x + '% ' + y + '%';
    map.style.transform = 'scale(2)';
  });

  map.addEventListener('mouseleave', () => {
    map.style.transform = 'scale(1)';
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
    tags: ['Protagonista', 'Jinete', 'Cuadernos de Basgiath']
  },
  xaden: {
    name: 'Xaden Riorson',
    alias: 'El Comandante de Ala',
    description: 'Hijo del líder de la última rebelión, Xaden carga desde niño con una marca de rebelde y los secretos más oscuros de Navarre. Su frialdad calculada oculta una lealtad feroz hacia quienes ama.',
    image: '/web-empireo/img/xaden.webp',
    tags: ['Comandante', 'Jinete', 'Sgaeyl']
  },
  liam: {
    name: 'Liam Mairi',
    alias: 'El Guardián',
    description: 'Compañero de cuadrante y guardia asignado por Xaden para proteger a Violet. Su lealtad y buen corazón lo convierten en uno de los personajes más queridos de la saga.',
    image: '/web-empireo/img/liam.webp',
    tags: ['Jinete', 'Cuadrante de Violet']
  },
  rhiannon: {
    name: 'Rhiannon Matthias',
    alias: 'Rhi',
    description: 'La mejor amiga de Violet desde el primer día en Basgiath. Astuta, valiente y con una lealtad que no tiene precio.',
    image: '/web-empireo/img/rhiannon.webp',
    tags: ['Jinete', 'Mejor amiga']
  },
  dain: {
    name: 'Dain Aetos',
    alias: 'El Líder de Cuadrante',
    description: 'Amigo de la infancia de Violet y líder del cuadrante Alas de Cola. Inteligente y protector, aunque sus secretos y su lealtad al sistema lo colocan en tensión.',
    image: '/web-empireo/img/dain.webp',
    tags: ['Líder de Cuadrante', 'Amigo de la infancia']
  },
  andarna: {
    name: 'Andarna',
    alias: 'La Dragona Dorada',
    description: 'La dragona más joven y peculiar de toda Basgiath. Su vínculo con Violet es único e inexplicable. Sus escamas doradas ocultan un poder que aún el mundo no comprende.',
    image: '/web-empireo/img/andarna.webp',
    tags: ['Dragona', 'Segundo vínculo de Violet']
  }
};

// === LIGHTBOX (VERSIÓN CORREGIDA SIN ERRORES) ===
(function() {
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
      console.error('No se encontró #lightbox');
      return;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxName = document.getElementById('lightbox-name');
    const lightboxAlias = document.getElementById('lightbox-alias');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxTags = document.getElementById('lightbox-tags');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    const personajesOrden = ['violet', 'xaden', 'liam', 'rhiannon', 'dain', 'andarna'];
    let personajeActual = null;

    function mostrarPersonaje(id) {
      const char = characterData[id];
      if (!char) return;
      
      personajeActual = id;
      
      if (lightboxImg) {
        lightboxImg.src = char.image;
        lightboxImg.alt = char.name;
        lightboxImg.style.display = 'block';
      }
      if (lightboxName) lightboxName.textContent = char.name;
      if (lightboxAlias) lightboxAlias.textContent = char.alias || '';
      if (lightboxDescription) lightboxDescription.textContent = char.description || '';
      
      if (lightboxTags) {
        lightboxTags.innerHTML = '';
        if (char.tags && char.tags.length) {
          char.tags.forEach(function(tag) {
            var span = document.createElement('span');
            span.textContent = tag;
            lightboxTags.appendChild(span);
          });
        }
      }
    }

    function navegar(direccion) {
      if (!personajeActual) return;
      var idx = personajesOrden.indexOf(personajeActual);
      var nuevaIdx;
      if (direccion === 'siguiente') {
        nuevaIdx = (idx + 1) % personajesOrden.length;
      } else {
        nuevaIdx = (idx - 1 + personajesOrden.length) % personajesOrden.length;
      }
      mostrarPersonaje(personajesOrden[nuevaIdx]);
    }

    window.openLightbox = function(id) {
      mostrarPersonaje(id);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      personajeActual = null;
    }

    if (closeBtn) {
      closeBtn.innerHTML = '✕';
      closeBtn.onclick = closeLightbox;
    }
    if (prevBtn) {
      prevBtn.innerHTML = '‹';
      prevBtn.onclick = function() { navegar('anterior'); };
    }
    if (nextBtn) {
      nextBtn.innerHTML = '›';
      nextBtn.onclick = function() { navegar('siguiente'); };
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
      if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navegar('anterior');
        if (e.key === 'ArrowRight') navegar('siguiente');
      }
    });

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    var cards = document.querySelectorAll('.character-card');
    console.log('Tarjetas encontradas:', cards.length);
    
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var modalId = card.getAttribute('data-modal');
      if (modalId) {
        console.log('Vinculando:', modalId);
        card.style.cursor = 'pointer';
        
        var newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        (function(id) {
          newCard.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Click en:', id);
            window.openLightbox(id);
          });
        })(modalId);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();

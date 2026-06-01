// ============================================
// REPARACIÓN COMPLETA DEL LIGHTBOX
// ============================================

// 1. Arreglar el HTML de los botones
const closeBtn = document.getElementById('lightbox-close');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

if (closeBtn) {
    closeBtn.innerHTML = '✕';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.width = '40px';
    closeBtn.style.height = '40px';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
}

if (prevBtn) {
    prevBtn.innerHTML = '‹';
    prevBtn.style.fontSize = '48px';
    prevBtn.style.fontWeight = 'bold';
    prevBtn.style.width = '50px';
    prevBtn.style.height = '80px';
    prevBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
    prevBtn.style.color = 'white';
    prevBtn.style.border = 'none';
    prevBtn.style.cursor = 'pointer';
    prevBtn.style.borderRadius = '0 12px 12px 0';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = '0';
    prevBtn.style.top = '50%';
    prevBtn.style.transform = 'translateY(-50%)';
}

if (nextBtn) {
    nextBtn.innerHTML = '›';
    nextBtn.style.fontSize = '48px';
    nextBtn.style.fontWeight = 'bold';
    nextBtn.style.width = '50px';
    nextBtn.style.height = '80px';
    nextBtn.style.backgroundColor = 'rgba(0,0,0,0.6)';
    nextBtn.style.color = 'white';
    nextBtn.style.border = 'none';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.borderRadius = '12px 0 0 12px';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = '0';
    nextBtn.style.top = '50%';
    nextBtn.style.transform = 'translateY(-50%)';
}

// 2. Lista de personajes en orden
const personajesOrden = ['violet', 'xaden', 'liam', 'rhiannon', 'dain', 'andarna'];
let personajeActual = null;

// 3. Función para actualizar el lightbox con un personaje
function mostrarPersonaje(id) {
    const char = characterData[id];
    if (!char) return;
    
    personajeActual = id;
    
    const img = document.getElementById('lightbox-img');
    const nameEl = document.getElementById('lightbox-name');
    const aliasEl = document.getElementById('lightbox-alias');
    const descEl = document.getElementById('lightbox-description');
    const tagsEl = document.getElementById('lightbox-tags');
    
    if (img) {
        img.src = char.image;
        img.alt = char.name;
        img.style.display = 'block';
    }
    if (nameEl) nameEl.textContent = char.name;
    if (aliasEl) aliasEl.textContent = char.alias || '';
    if (descEl) descEl.textContent = char.description || '';
    
    if (tagsEl) {
        tagsEl.innerHTML = '';
        if (char.tags && char.tags.length) {
            char.tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                span.style.background = 'rgba(212,175,55,0.15)';
                span.style.border = '1px solid rgba(212,175,55,0.4)';
                span.style.padding = '5px 12px';
                span.style.borderRadius = '30px';
                span.style.fontSize = '0.75rem';
                span.style.color = '#e6c87a';
                tagsEl.appendChild(span);
            });
        }
    }
}

// 4. Función para navegar
function navegar(direccion) {
    if (!personajeActual) return;
    const idx = personajesOrden.indexOf(personajeActual);
    let nuevaIdx;
    if (direccion === 'siguiente') {
        nuevaIdx = (idx + 1) % personajesOrden.length;
    } else {
        nuevaIdx = (idx - 1 + personajesOrden.length) % personajesOrden.length;
    }
    mostrarPersonaje(personajesOrden[nuevaIdx]);
}

// 5. Asignar eventos
if (closeBtn) {
    closeBtn.onclick = () => {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    };
}

if (prevBtn) prevBtn.onclick = () => navegar('anterior');
if (nextBtn) nextBtn.onclick = () => navegar('siguiente');

// 6. Cerrar con ESC
document.onkeydown = function(e) {
    const lightbox = document.getElementById('lightbox');
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') navegar('anterior');
        if (e.key === 'ArrowRight') navegar('siguiente');
    }
};

// 7. Cerrar al hacer clic fuera
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
}

// 8. Sobrescribir openLightbox para que use mostrarPersonaje
window.openLightbox = function(id) {
    mostrarPersonaje(id);
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
};

// 9. Re-vincular las cards
document.querySelectorAll('.character-card').forEach(card => {
    const id = card.getAttribute('data-modal');
    if (id) {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        newCard.addEventListener('click', () => window.openLightbox(id));
    }
});

console.log('✅ TODO REPARADO! Haz clic en un personaje y prueba las flechas');
})();

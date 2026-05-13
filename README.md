# Empíreo — Proyecto Web

Sitio web fan de la saga Empíreo de Rebecca Yarros.

## Estructura de carpetas

```
empireo/
├── index.html              ← Página principal (Home)
│
├── css/
│   └── styles.css          ← Todos los estilos del proyecto
│
├── js/
│   └── main.js             ← JavaScript: menú, mapa, modal y datos de personajes
│
├── pages/
│   ├── sinopsis.html       ← Página de Sinopsis
│   ├── libros.html         ← Página de Libros
│   ├── personajes.html     ← Galería de Personajes (con modal)
│   └── mapa.html           ← Mapa interactivo
│
└── img/                    ← (Carpeta a crear) Imágenes del proyecto
    ├── Mapa.jpg
    ├── violet.jpg
    ├── xaden.jpg
    ├── liam.jpg
    ├── rhiannon.jpg
    ├── dain.jpg
    └── andarna.jpg
```

## Agregar imágenes de personajes

1. Creá una carpeta `img/` en la raíz del proyecto.
2. Colocá las imágenes con los nombres indicados arriba.
3. Si una imagen no existe, la galería muestra automáticamente un placeholder con la inicial del personaje.

## Agregar nuevos personajes

En `js/main.js`, dentro del objeto `characterData`, agregá un nuevo personaje:

```js
nuevo_personaje: {
  name: 'Nombre Completo',
  alias: 'Apodo',
  description: 'Descripción del personaje...',
  image: '../img/nombre_imagen.jpg',   // o '' si no tenés imagen
  tags: ['Tag1', 'Tag2'],
},
```

Luego en `pages/personajes.html`, agregá una nueva `.character-card` con el atributo `data-modal="nuevo_personaje"`.

## Tecnologías

- HTML5 semántico
- CSS3 con variables personalizadas (sin frameworks)
- JavaScript vanilla (sin dependencias)
- Fuentes: Cinzel + EB Garamond (Google Fonts)

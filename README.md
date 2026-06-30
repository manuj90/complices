# Cómplices

Experiencia web inmersiva que recrea la instalación física de **Cómplices**: una maqueta interactiva de ciudad donde cada edificio abre un recorrido audiovisual a pantalla completa.

**Promesa central:** *Vas a entender lo que significa formar parte de algo más grande que vos.*

## Qué hace la experiencia

1. **Intro narrativa** — Texto en pantalla que plantea la idea de que nada existe completamente solo.
2. **Maqueta 3D** — Ciudad navegable en Three.js con pines sobre edificios emblemáticos. El participante elige el orden del recorrido.
3. **Cinco espacios + cierre** — Cada pin despliega una experiencia independiente con narración, visuales, música y controles Anterior/Siguiente. Al completar los cinco, se desbloquea el cierre final.

| Espacio | Tema | Destacado |
|---------|------|-----------|
| **Faro** | Inmensidad del océano | Video del mar con cortinas que se abren; peces en loop |
| **Museo** | Arte y humanidad | Narración + lienzo para dibujar |
| **Pareja** | Amor cotidiano | Ventanas con videos que se revelan progresivamente |
| **Obelisco** | Buenos Aires y su gente | Ciudad de fondo + escenas de estadio y bar en loop |
| **Observatorio** | Cosmos y conexión | Diálogo en pantalla dividida (A / B) |
| **Cierre** | El participante como obra | Narración final + silueta en cámara (maqueta del cierre) |

Tras cada recorrido entra una **fase de loop** con la atmósfera de ese espacio hasta que el usuario regresa a la maqueta.

## Stack

- React 19 + TypeScript + Vite
- Three.js / React Three Fiber (maqueta 3D)
- Framer Motion + GSAP (animaciones)
- Música: archivos locales en `public/media/audio/` o YouTube embebido
- Videos: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (store público)

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`. Usá auriculares para la mejor experiencia.

### Medios

| Tipo | Ubicación | Notas |
|------|-----------|-------|
| Audio | `public/media/audio/` | MP3 opcionales; si no existen, se usa YouTube |
| Video | Vercel Blob | URLs en `src/data/videos.ts` |
| Logo | `src/assets/Logo.svg` | |

Los videos **no** van en el repo. Subilos al Blob store con `access: 'public'` bajo la ruta `video/` (p. ej. `video/faro/Mar.mp4`).

Variable opcional para otro store o CDN:

```env
VITE_BLOB_VIDEO_BASE=https://tu-store.public.blob.vercel-storage.com/video
```

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm run preview  # vista previa del build
npm run lint     # oxlint
```

## Estructura del código

```
src/
├── components/
│   ├── city/          # Maqueta 3D y pines
│   ├── experiences/   # Reproductor y visuales por espacio
│   └── ui/            # Audio, diálogos, controles de paso, etc.
├── data/
│   ├── experiences.ts # Textos, narraciones y configuración de pines
│   ├── media.ts       # Rutas de audio y IDs de YouTube
│   └── videos.ts      # URLs de video en Blob
├── context/           # Estado global (experiencia activa, progreso)
└── pages/             # Home (maqueta) y Acerca
```

## Deploy

Pensado para [Vercel](https://vercel.com). El build es estático (`vite build` → `dist/`). Configurá `VITE_BLOB_VIDEO_BASE` si usás un store distinto al predeterminado en `videos.ts`.

## Licencia

Proyecto privado — uso restringido al equipo de Cómplices.
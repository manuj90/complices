# Cómplices

Base limpia para la web de marca de **Cómplices**. El deploy en Vercel se mantiene igual; solo cambia el contenido del sitio.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 + shadcn/ui
- Three.js, Motion, GSAP, Lucide, React Router

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí `http://localhost:5173`.

## Agregar componentes shadcn

```bash
npx shadcn@latest add button card
```

## Assets

| Archivo | Uso |
|---------|-----|
| `src/assets/logo-blanco.svg` / `logo-nego.svg` | Logo según tema del sistema |
| `public/caras-blancas.svg` / `caras-negras.svg` | Favicon según tema del sistema |

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción
npm run preview  # vista previa del build
```

## Estructura

```
src/
├── assets/          # Logo y recursos de marca
├── components/ui/   # Logo + componentes shadcn
├── lib/             # Utilidades y tokens de marca
└── pages/           # Rutas de la web
```

## Deploy

Pensado para [Vercel](https://vercel.com). Build estático (`vite build` → `dist/`).
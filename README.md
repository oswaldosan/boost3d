# Boost Digital — Landing

Landing page para **Boost Digital HN** (Next.js + React Three Fiber). El hero combina copy animado con Framer Motion y una escena 3D del logo en GLB.

## Requisitos

- Node.js 20+ (recomendado)
- npm

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando     | Descripción              |
|------------|---------------------------|
| `npm run dev`   | Servidor de desarrollo    |
| `npm run build` | Build de producción       |
| `npm run start` | Servidor tras el build    |
| `npm run lint`  | ESLint                    |

## Estructura relevante

- `src/app/` — App Router, layout, metadata y SEO (JSON-LD).
- `src/components/ui/` — Secciones de la landing.
- `src/components/3d/HeroScene.tsx` — Canvas R3F: modelo `public/3d/Logo3.glb`, partículas, luces, post-proceso.
- `src/lib/constants.ts` — Textos y datos de marca.

## Convención del modelo 3D

El código asigna materiales y animaciones por **nombre de malla** en el GLB (p. ej. `Shape8`, `Shape11`, `Shape12`, `Shape62`). Si re-exportas el archivo desde Blender u otra herramienta, conserva esos nombres o actualiza el `traverse` en `HeroScene.tsx`.

**Shape11** suele incluir el texto secundario del logo y, en muchos exports, el **pico triangular** debajo del wordmark en la misma geometría. En escena usa el mismo material naranja que **Shape12** (flecha). Para quitar solo el texto, separa mallas en tu herramienta 3D y exporta de nuevo.

## Accesibilidad y rendimiento

- `prefers-reduced-motion: reduce`: menos parallax en el logo/cámara, sin estrellas fugaces ni bloom.
- El scroll del hero actualiza un **ref** (no `setState` por frame) para no re-renderizar React al hacer scroll.
- Un solo listener `pointermove` en el hero alimenta logo, cámara y partículas.

## Despliegue

Proyecto listo para [Vercel](https://vercel.com) u otro hosting compatible con Next.js. Ajusta `metadataBase` y URLs en `src/app/layout.tsx` si cambia el dominio.

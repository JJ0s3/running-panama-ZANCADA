# Arquitectura vigente — ZANCADA Performance

Actualizado: 2026-11-05. Fuente de verdad: código de `main` y PRs aprobados.

## Producto activo

ZANCADA es una aplicación web de eventos de running en Panamá y pasaporte personal. La página principal (`app/page.tsx`) monta `components/event-passport-app.tsx`; el conjunto de cinco pantallas está dentro de esa experiencia. Otras pantallas históricas en `components/` permanecen por compatibilidad o referencia, pero no son el punto de entrada de producción.

## Arquitectura actual

```text
Safari / navegador / acceso iPhone
  ↓
Next.js 16 · App Router (app/page.tsx, layout.tsx)
  ├─ event-passport-app.tsx → Inicio / Eventos / Preparación / Dorsal
  ├─ results-hub.tsx → Resultados con fuentes externas
  ├─ event-tour.tsx → recorrido guiado de 10 paradas
  ├─ preparation-hub.tsx → recursos / checklist / orientación Fasty
  └─ route-viewer.tsx → Leaflet, rutas GPX / OpenStreetMap
            ↓
lib/event-passport.ts, domain.ts, results-catalog.ts,
route-sources.ts, parse-gpx.ts
            ↓
Catálogo curado + estado local del navegador
  ├─ favoritos y participaciones autodeclaradas
  ├─ información del dorsal personal
  └─ preferencia visual y guía
```

`app/api/race-route/route.ts` facilita la consulta de rutas bajo las condiciones implementadas en el proyecto; **no representa un servicio de autenticación o persistencia de usuarios**.

## Experiencia visual

- `app/performance-dark.css`: identidad oscura.
- `app/performance-themes.css`: tema claro y cambios de tema.
- `app/performance-polish.css`: correcciones responsive, legibilidad y diseño de componentes.
- `public/branding/`: wordmark para claro/oscuro y símbolo Z; `app/icon.tsx`, `app/apple-icon.tsx` y `app/manifest.ts`: iconos y metadatos de instalación.
- La marca oscura usa letras claras **sin una placa blanca**; los SVG mantienen naranja y azul.

## Modelo de datos y límites

Los eventos y las fuentes se documentan en `lib/event-passport.ts` y `docs/research/PANAMA_RUNNING_EVENTS_2026.md`. Los favoritos, el pasaporte y la configuración se conservan en `localStorage` del dispositivo. No hay cuentas, sincronización en nube, inscripción oficial ni validación de dorsales. No presentar enlaces a resultados externos como clasificación propia.

La asistencia Fasty es **contextual** a la preparación y a la información disponible: no atribuirle procesamiento remoto de IA no implementado.

## Calidad y publicación

`npm run typecheck`, `npm test`, `npm run build`. Las pruebas Playwright de `scripts/performance-qa.mjs` se ejecutan con el workflow `.github/workflows/performance-qa.yml` y comprueban interfaz responsive, contraste, navegación, guía e iconos PWA.

Un PR validado se fusiona en `main`; GitHub/Vercel generan un deployment nuevo. Ver [guía de despliegue](../deployment/README.md), [README principal](../../README.md) y [registro de cambios](../../CHANGELOG.md).

## Evolución técnica futura (no implementada)

Separación de módulos de pantallas y estilos históricos, autenticación y sincronización opcional, y automatización del catálogo. Deben abordarse en PRs independientes sin introducir datos ficticios como si fueran oficiales.

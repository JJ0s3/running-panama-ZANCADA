# zancada.

**Mañana de carrera.**

Tu pasaporte de carreras en Panamá: descubre eventos, consulta recorridos documentados, encuentra resultados publicados y organiza tus preparativos.

> **Rediseño propuesto — Opción B:** tema Papel + Mango + Pacífico basado en la guía PDF entregada por el proyecto. Está en revisión: **producción mantiene ZANCADA v2 hasta que la preview sea aprobada**.

## Cinco espacios

| Pantalla | Función |
|---|---|
| Inicio | Próxima carrera, cuenta regresiva, próximas, resultados y guardadas |
| Eventos | Carreras curadas, filtros, fechas, mapas GPX y registro externo |
| Resultados | Fuentes públicas de carreras y filtros, no tiempos inventados |
| Plan | Fasty y recursos generales para preparar tu siguiente salida |
| Dorsal | Historial personal y participaciones autodeclaradas, no oficiales |

Los guardados y checklist se almacenan solo en este navegador. No hay pagos, inscripción propia, dorsales oficiales ni GPS de seguimiento.

## Diseño Opción B

**Papel** \`#F5F1E8\` · **Mango** \`#FF6B2C\` · **Pacífico** \`#1E4FD8\` · **Tinta** \`#15171C\`. Archivo y DM Mono. Tarjetas redondeadas, botones en píldora, fechas azules, navegación inferior oscura de cinco iconos y un onboarding breve.

- [Decisiones y trazabilidad del rediseño](docs/design/ZANCADA_OPTION_B_2026.md)
- [Especificación funcional v2](docs/product/ZANCADA_V2_ESPECIFICACION.md)
- [Manual de usuario](docs/GUIA_USUARIO_ZANCADA_V2.md)
- [Registro de cambios](CHANGELOG.md)

## Tecnologías y desarrollo

Next.js (App Router), React, TypeScript, Leaflet + OpenStreetMap, CSS y pruebas con \`node --test\`.

\`\`\`bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
\`\`\`

**Repositorio:** https://github.com/JJ0s3/running-panama-ZANCADA  
**Web de producción (v2 actual):** https://runningpanamajj.vercel.app

*Producto independiente. Catálogo y resultados con fuentes atribuidas. Fasty es una ayuda de preparación en modo demostración; no presta asesoría médica ni representa una IA remota.*

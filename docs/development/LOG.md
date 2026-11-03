# Development Log

## 2026-11-03 — Identidad ZANCADA y Fasty
- Se conserva la paleta negro/naranja/blanco hueso aprobada; se rechaza el verde previo.
- Se define público principal: corredor principiante; Inicio responde «¿qué hago hoy?».
- Se elige **Fasty** como nombre definitivo del asistente (reemplaza BRÍO).
- Se documentan tres conceptos de avatar y cinco de monograma Z; ningún icono final aprobado aún.
- Se documentan plan, contenido curado, estructura de tour y decisiones de alcance.
- Implementación incremental en rama `feat/zancada-identity-fasty-docs`; no modificar producción.
- Referencias externas consultadas: NHS, Nike Run Club y ACSM. Se adoptan principios, no se copian planes.

## Iteraciones siguientes
Por commit: fecha, problema, decisión, archivos, pruebas ejecutadas, resultado y pendientes.

## 2026-11-03 — Incremento UI/UX y tour interactivo
- Rama `feat/zancada-guided-onboarding-ux` desde `feat/zancada-identity-fasty-docs`.
- Sistema de botones con feedback de hover/press, jerarquía de acciones y motion tokens CSS; sin librería nueva.
- Recorrido de Fasty: 10 paradas, spotlight real, scroll, navegación entre Inicio, Mi plan, Explorar y Asistente.
- Primera visita: recorrido automático; omitir/cerrar guarda preferencia `zancada-tour-v2`; reinicio desde Mi perfil.
- Feedback al registrar actividades; explicaciones contextualizadas en progreso.
- Pendientes explícitos: sesiones completables enlazadas al plan, módulo Aprende, eventos reales, avatar definitivo y revisión manual en móvil.
- Validar CI, Vercel preview y experiencia táctil antes de fusionar; no confundir compilación con pruebas end-to-end.

## 2026-11-03 — Diseño editorial iOS (referencias en video)
- Referencias revisadas del video: exploración de Refero con interfaces Any Distance, comunidad de running y campañas deportivas de Nike/Adidas/New Balance. Se extrajeron patrones generales de composición editorial, jerarquía deportiva y navegación móvil, sin copiar pantallas.
- Se conserva la paleta aprobada negro/naranja/blanco hueso.
- Cambio arquitectónico de Inicio: bienvenida editorial, sesión principal visible, pista vectorial con geometría propia, franja semanal interactiva, Fasty y métricas con nueva jerarquía.
- Navegación con iconos coherentes y dock flotante con acabado iOS en móvil.
- Tipografía: Barlow Condensed para titulares de carrera, DM Sans para interfaz, Instrument Serif para contraste editorial. Fallbacks definidos; fuentes servidas por Google Fonts.
- No se agregaron librerías de animación ni componentes externos; conservar controles existentes y tour.
- Limitación: la franja semanal informa de días configurados, no de sesiones completadas. No simular progreso no registrado.
- Pendiente: captura y revisión visual en iPhone/Android, optimización de recursos de fuentes y accesibilidad.

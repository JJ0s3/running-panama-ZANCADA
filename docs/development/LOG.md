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

## 2026-11-03 — Reconstrucción Ultraviolet desde Stitch
- Recepción del ZIP de diseño con Inicio y Mi Plan (light/dark), código HTML de referencia y dos DESIGN.md.
- Decisión: construir implementación React propia en `components/ultraviolet-runner.tsx` y `app/ultraviolet.css`, preservando la implementación anterior para comparar.
- Pantallas: Inicio con Fasty, sesión del día, progreso y registro; Mi Plan con calendario, configuración, sesiones marcables y ayuda; Carreras con filtros y guardados; Fasty como pantalla protagonista y propuestas confirmables.
- Compatibilidad con `zancada-demo-v1` y `zancada-tour-v2` para preservar datos y onboarding.
- Datos sintéticos identificados, sin inventar telemetría o inscripciones reales.
- Revisión pendiente: pruebas CI, preview y evaluación visual en móvil antes de fusionar.

## 2026-11-03 — ZANCADA 0.4: Mi Plan iOS
- Cambio solicitado: tipografía menos tecnológica y mayor semejanza conceptual con la planificación semanal de referencia; diferenciarse claramente de RB Fitness.
- Rama: `feat/zancada-plan-ios-v04` desde la propuesta ultravioleta Stitch.
- Componente nuevo `components/plan-experience.tsx`: semanas navegables, gráfica de kilómetros por día calculada de `activities`, duración total, sesiones marcadas, objetivo, detalle Fasty y ajustes.
- Estilos nuevos `app/plan-ios.css`: pila de fuentes del sistema, superficies menos brillantes, alta legibilidad y barras propias; se elimina import de fuentes web anterior.
- La métrica de sesiones es una marca manual del usuario; se diferencia de la distancia real guardada.
- Antes de fusionar: revisar CI, preview Vercel y pruebas visuales Safari/iPhone, 360 px y escritorio.

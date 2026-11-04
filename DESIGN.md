# ZANCADA — Design System 0.2

## Decisiones aprobadas
- Identidad enérgica para principiantes, no dashboard administrativo.
- Paleta: Ink `#111115`, Orange `#FF5A1F`, Bone `#F4F1EB`, White `#FFFFFF`, Secondary `#707078`.
- Tipografía objetivo: Barlow Condensed (títulos) + Inter (cuerpo), con fallback del sistema.
- Jerarquía del Inicio: saludo/perfil, Fasty, entrenamiento hoy, objetivo, agenda, progreso, eventos.
- Fasty es coach educativo y asistente con confirmación (motor demo por reglas).
- Onboarding proactivo de primera visita, omisible y reabrible desde Perfil.
- Gráficos con semántica de movimiento: carril, ruta, zancada, meta, hito; sin saturación.
- Acciones móviles >=44px, contraste probado, `prefers-reduced-motion`, navegación con teclado.

## Aún por decidir
Monograma Z final (cinco conceptos documentados) y avatar Fasty final (tres conceptos). No introducir activos definitivos sin elección consciente.

## Referencias vivas
- [Conceptos de identidad](docs/design/IDENTITY-CONCEPTS.md)
- [Onboarding](docs/design/ONBOARDING.md)
- [Arquitectura Fasty](docs/architecture/ASSISTANT-FASTY.md)

## Dirección 0.2.2 — ZANCADA editorial iOS
- **Principio:** la aplicación debe parecer un producto editorial de running, no una suma de tarjetas repetidas.
- Uso de proporciones asimétricas, pista representada en arcos, sesiones protagonistas y agrupación semanal.
- iOS como referencia de interacción: superficies táctiles, dock translúcido, legibilidad y continuidad; no copiar UI de Apple.
- Fuentes: Barlow Condensed, DM Sans, Instrument Serif; fallbacks en CSS. Jerarquía clara y textos accesibles.
- Paleta invariable; fotografía futura solo con licencia y justificación narrativa.
- Revisión pendiente: Safari móvil, teclado, reduced motion y 320-390px.

## ZANCADA 0.3 — Ultraviolet Fluid Performance (Stitch source)
- Fuente de dirección visual: archivo de proyecto Stitch entregado por el propietario, cuatro pantallas (Inicio claro/oscuro, Mi Plan claro/oscuro) y dos DESIGN.md.
- Decisión para esta iteración: **variación oscura ultravioleta** como nueva propuesta activa. Supersede la paleta naranja en la rama v0.3, sin reescribir ni borrar las alternativas históricas.
- Tokens clave: background #121318, card #1e1f25, elevated #292a2f, primary #7628f9, lavender #cfbdff, cyan #7df4ff.
- Tipografía Space Grotesk / Inter; datos y encabezados con jerarquía de rendimiento deportivo.
- Fasty: símbolo geométrico provisional con cara minimalista en violeta, presencia persistente en home/plan/chat.
- Navegación iOS-inspired: bottom dock translúcido y táctil; mismo flujo funcional en escritorio mediante sidebar.
- Arte original en CSS para promocionales y eventos ficticios; no se utilizan capturas Stitch como interfaz ni fotografías sin licencia.
- Las pantallas del ZIP tienen contenido de ejemplo como Z2 y RPE, calorías, inscritos y zonas de pulso; **no se copia esa telemetría** porque la demo no la registra.
- Se mantiene tour funcional para secciones existentes. Revisar spotlight y acceso con VoiceOver/manual Safari.

## 0.4 — Refinamiento iOS de Mi Plan
- Referencia principal proporcionada por el propietario: pantalla de calendario y carga semanal de running, con tipografía iOS limpia, barras verticales y resumen compacto.
- Se rechazan el saludo y la estructura del dashboard de fitness RB como base visual para ZANCADA.
- **Tipografía:** pila nativa `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `Arial`. No empaquetar ni redistribuir SF Pro.
- **Mi Plan:** jerarquía contextual y gráfica de distancia de los siete días de la semana; lista de sesiones y edición como contenido secundario.
- **Integridad:** únicamente distancia, duración y sesiones marcadas. No mostrar potencia (CP), estrés (RSB), elevación, frecuencia cardíaca ni zonas si no existen fuentes de datos reales.
- **Fasty:** breve nota contextual dentro de la sesión, no un gran panel de chat invadiendo la planificación.
- **Interacción:** navegación entre semanas, selección de días, sesión completada explícitamente, configuración de objetivo y disponibilidad.
- **Estados:** días sin actividad muestran indicador vacío (no barra inventada), y progreso del plan cuenta solo sesiones marcadas, no es una puntuación fisiológica.
- El estilo se encapsula en `app/plan-ios.css` y la pantalla en `components/plan-experience.tsx`, para evitar reescribir el resto de ZANCADA.

## 0.5 — Spatial Running Edition (DesignMD 3D & Hyperrealism)
- Referencia: https://designmd.app/library/3d-hyperrealism (consultada 2026-11-03).
- El documento **no prescribe una tipografía comercial exclusiva**: declara `-apple-system, sans-serif` (display 700, cuerpo 400, 16px/1.6). ZANCADA adopta ese principio, evitando combinaciones de múltiples familias que rompan Safari iPhone.
- Principios adaptados: profundidad en capas, iluminación material, sombras múltiples, jerarquía editorial, composición asimétrica, toques táctiles de corto recorrido y control de movimiento reducido.
- Color: se conservan ultravioleta oscuro y amarillo de ZANCADA. Se usan tonos metálicos arena/plateados en la ilustración Z, sin asumir la paleta literal navy/verde/burdeos del ejemplo.
- En Inicio, el objeto `Z` se construye con gradientes, transformaciones 3D CSS y capas — **no existe un modelo 3D/WebGL cargado**. Esta decisión protege el peso de la demo móvil. No describir la pieza como hiperrealismo 3D de producción.
- Fasty tiene una figura táctil/pseudovolumétrica independiente, ya integrada en Inicio y en su pantalla. No se presenta como avatar final aprobado.
- Diferenciación de RB: portada de revista de running y arte de marca, sin titular de gimnasio, sin tres tarjetas iguales, sin electrocardiograma inventado; métricas en una banda editorial continua.
- El tour mantiene los IDs `data-tour-id` de Inicio/Fasty después de extraer los componentes.
- Pendiente: revisar contraste, Safari iPhone y calidad artística; valorar escena 3D real solo si justifica el rendimiento.

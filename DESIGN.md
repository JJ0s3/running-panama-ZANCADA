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

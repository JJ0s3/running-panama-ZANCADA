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

## 2026-11-03 — QA iPhone y acento amarillo controlado
- Material revisado: video de navegación iPhone aportado por el usuario, con problemas visibles de textos comprimidos, tarjetas de métricas estrechas y estilos del tour heredados de la versión naranja.
- Rama `fix/zancada-iphone-typography-tour` sobre `feat/zancada-plan-ios-v04`.
- Unificación de tipografía: pila del sistema en todo ZANCADA, pesos moderados, encabezados con line-height y tracking moderados. Retirado import de fuentes web heredadas en `app/globals.css`.
- Añadido `app/iphone-polish.css` importado al final: ajustes de etiquetas, formularios iOS (16px para evitar zoom involuntario), tarjetas de métricas reordenadas en móvil, botones, dock inferior y safe areas.
- Acento nuevo amarillo cálido `#FFD85A` en señales, estados seleccionados y ayudas de Fasty. El violeta sigue siendo la acción principal.
- Guía Fasty aislada con clases `zt-*` y rediseñada para violeta/amarillo; conserva `zancada-tour-v2` para no reiniciar automáticamente recorridos ya terminados.
- Añadidas pruebas de regresión estática. **CI no constituye una prueba de layout iPhone**: queda pendiente prueba manual en Safari iOS de 375/390 px, orientación, teclado y zoom.

## 2026-11-03 — Corrección real de tour y tipografía (video 19:52)
- Causa encontrada: el tour buscaba `data-zt-id` mientras los elementos de Inicio, Mi Plan, Carreras y Fasty están marcados con `data-tour-id`. El error se produjo al renombrar indiscriminadamente clases CSS; dejó la guía con fondo oscurecido sin spotlight funcional.
- Solución: selector correcto, re-medición de posición al cambiar sección, movimiento de scroll al objetivo, observación de scroll y resize, y timeout de búsqueda tras el render.
- Corregido el conflicto de cascada: se elimina `globals.css` del layout activo (era el tema naranja de versiones anteriores) y se establece un reset y tipografía uniforme en `iphone-polish.css`.
- Menos textos en mayúsculas en Inicio; navegación de etiquetas más legibles. Estadísticas de Mi Plan ahora pasan de tres columnas estrechas a dos, con una tercera fila ancha en móvil.
- Violeta y amarillo mantenidos como acentos coherentes.
- Tests de regresión revisan que los destinos marcados coincidan con los selectores y que no vuelva a cargarse el CSS del tema anterior.
- Verificación pendiente: iPhone Safari real; no considerar CI prueba visual.

## 2026-11-03 — Diseño espacial derivado de DesignMD
- Rama `design/zancada-spatial-3d-direction` desde `fix/zancada-tour-spotlight-mobile-v2`.
- Fuente DesignMD 3D & Hyperrealism estudiada: tipografía nativa Apple, profundidad/material, sombras, composición irregular y motion. No se copia la web ni sus recursos protegidos.
- Implementados `SpatialHero`, `FastyArtifact` y `SpatialFastyLanding` en componente propio; estilizados en `app/spatial-edition.css`.
- Inicio reorganizado: titular editorial, escultura Z, sesión y acciones. Fasty pasa a panel narrativo de material distintivo.
- Métricas: banda continua en lugar de cuadrícula convencional. Mi Plan conserva cálculo real y recibe superficie con profundidad.
- Sin frameworks adicionales ni promesas de WebGL: pseudo-3D CSS, compatible con reducción de movimiento.
- Pruebas: comprobar montaje y continuidad del tour; CI, typecheck y build; revisión visual Safari pendiente.

## 2026-11-03 — QA de recuadros y tutorial en iPhone (video 20:23)
- Material revisado: video Safari iPhone de 12.5 segundos a 384×832. En el recorrido Fasty, el marco resaltado encuadraba regiones parciales de tarjetas mucho más altas que el espacio disponible; la Z se acercaba al título; el oscurecimiento del fondo competía con la explicación.
- Corrección funcional: los destinos del tour ahora apuntan a elementos concretos (nombre y duración del entrenamiento; texto Fasty; métricas; distancia para registro; actividades; días del calendario; botones de evento; preguntas; perfil), no a bloques enormes.
- Se reescribió la iluminación como cuatro capas exteriores con un hueco realmente transparente y borde separado; el usuario puede ver el contenido resaltado.
- El scroll de pestañas se vuelve determinista al navegar y la geometría del foco se calcula y recorta en `lib/tour-geometry.ts`. Se añadieron pruebas de límites, targets fuera de pantalla y geometría desktop.
- Estabilidad visual: en pantallas estrechas se separa la escultura Z del titular y de la sesión; se limita su altura; se ajustan CTA, anchos y bordes de tarjetas y resumen semanal para evitar recortes.
- Nuevas pruebas comprueban anclas semánticas en componentes y la geometría del foco. **Aún no equivalen a pruebas visuales automatizadas**; Safari real requiere revisión.
- Rama `fix/zancada-spatial-card-tour-qa`, basada en Spatial Edition, sin alterar producción.

## 2026-11-03 — Reorientación running-first tras video del usuario (20:47)
- Se revisó el video de 36.2 s con problemas visibles de encabezado de Carreras fuera de pantalla, filtros «5K/10K» cortados, portada demasiado abstracta y un emoji verde alrededor del avatar de Fasty.
- Causa del icono verde: carácter decorativo ✳ en `SpatialFastyLanding` que iOS dibuja como emoji; no corresponde a métricas ni a permisos de la aplicación.
- Rama `fix/zancada-running-first-reset` desde `fix/zancada-spatial-card-tour-qa`. No modifica `main` ni producción.
- Retirados los experimentos `components/spatial-zancada.tsx` y `app/spatial-edition.css` de la rama; se conserva la historia Git para regresar si fuera necesario.
- Nuevo `components/running-focus.tsx`: portada deportiva con pista SVG, siguiente sesión, tiempo y acciones. Nuevo `app/running-first.css` para identidad responsive y correcciones de navegación, Carreras y Fasty.
- Restaurado el avatar pequeño, geométrico, violeta de Fasty en Inicio y pantalla de asistente. Se conserva lógica de chat por reglas y onboarding.
- Actualizados tests y browser QA para cuatro pestañas y dos pasos del tour. Aún requiere revisión con Safari real y feedback de diseño del propietario.

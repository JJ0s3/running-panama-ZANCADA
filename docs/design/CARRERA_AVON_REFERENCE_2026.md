# Referencia visual — Carrera AVON 2026 → ZANCADA
**Fecha de análisis:** 2026-11-03 (hora Panamá)
**Fuente pública:** https://carreraavon.com/
**Auditoría reproducible:** [GitHub Actions — Reference Audit](https://github.com/JJ0s3/running-panama-ZANCADA/actions/runs/41766184110)
**Propósito:** adaptación crítica de patrones UI/UX para ZANCADA; no copia del diseño ni relación comercial con AVON.

## 1. Tecnología comprobada en navegador
Se ejecutó Chromium móvil 390×844 contra la portada pública y se examinaron `meta generator`, clases del cuerpo, recursos CSS/JS y estilos computados:
- CMS: **WordPress**. El HTML contiene `wp-content`/`wp-includes`.
- Constructor: **Elementor 4.3.5** y **Elementor Pro 4.3.2** (aparecen archivos `elementor-pro`).
- Tema: **Hello Elementor**.
- Fuentes computadas: **Archivo Black** en texto de impacto (`43px/34.4px` en el elemento observado), **Nunito Sans** en botón de países (`16px/24px`, 700) y enlaces de navegación (`18px/20px`, 800).
- Scripts visibles: jQuery 3.7.1, Swiper 8.4.5, GTM; botón WhatsApp vía Joinchat.
- Lo que **no** indica la evidencia: usar Next.js, React, Webflow o Framer para Carrera AVON. Los indicadores revisados son negativos.
- No es posible identificar de forma pública y concluyente su backend de inscripción propio; el botón lleva a **sports.ipuclub.com/login**, una plataforma externa.

## 2. Patrones que conviene adaptar
1. **Portada emocional:** imagen de personas y titular de alta presencia, con acción muy visible.
2. **Selección didáctica:** cada país aparece con una fecha grande y una unidad visual clara. Para ZANCADA, equivalentes de distancias, fechas y provincias.
3. **Información con pictogramas:** lugar, hora, ruta, pago y kit como bloques scan-friendly.
4. **Tres pasos narrativos:** cuenta/IPU/inscripción en AVON. Para ZANCADA: **descubrir → confirmar inscripción externa → registrar participación personal**. ZANCADA no otorga IPU.
5. **Jerarquía de la fotografía:** personas reales y eventos humanos, no solo círculos abstractos.
6. **Microfeedback:** botones con estado hover, foco, click; tipografía fuerte, etiquetas sobrias.

## 3. Qué implementamos en la iteración
- **Tipografía:** Archivo Black para grandes titulares, Nunito Sans para UI y lectura (Google Fonts); fallback de sistema. No se usa Archivo Black en botones o texto largo.
- **Paleta ZANCADA conservada:** violeta `#7550D5`, amarillo `#FFD85A`, tinta `#211B37`, superficies `#F5F3FB`. Se rechaza copiar rosa/cian de AVON.
- **Fotografías ilustrativas reales** con procedencia visible y texto alternativo: una fotografía en la portada y alternancia de tres en tarjetas. No representan las carreras anunciadas; el aviso «FOTOGRAFÍA ILUSTRATIVA» evita esa confusión.
- **Flujo de tres tarjetas interactivas** en Inicio con iconos de descubrir, preparar y guardar historia, enlazado a las funcionalidades existentes.
- **Detalle de evento:** tarjetas con iconos de inscripción, preparación y fuentes; sin eliminar condiciones de inscripción externa.
- **Modelo AVON Panamá corregido**: 5K y 10K, hora 6:30, kit anunciado 7 de noviembre en Mall Multiplaza (hora por confirmar), registro externo por portal IPU (su botón público conduce al login).

## 4. Fotos editoriales y licencias
Las fotos de AVON **no se reutilizan**: son propiedad de su titular y el sitio es solo referencia.
Se escogieron fotografías marcadas en Unsplash como **Free to use under the Unsplash License**; la licencia general permite uso comercial pero **pueden ser necesarios permisos de personas reconocibles/marcas**. No afirmar apoyo de esas personas a ZANCADA; reemplazar por imágenes con autorizaciones claras antes de una campaña comercial.

- **Mike Cox:** corredores del Chicago Marathon 2025 — https://unsplash.com/photos/a-group-of-runners-participating-in-a-marathon-race-laxDhpYqZZc
- **Justin Lagat:** corredores en carrera — https://unsplash.com/photos/group-of-runners-competing-in-a-marathon-race-outdoors-GKBCHlMSvrg
- **Miguel A Amutio:** maratón urbana — https://unsplash.com/photos/a-group-of-people-running-in-an-urban-marathon-QyhWAiNPIX8
- Licencia: https://unsplash.com/license
- Limitaciones sobre derechos de imagen: https://help.unsplash.com/en/articles/2646379-what-if-there-s-a-brand-or-identifiable-person-depicted-in-an-image-that-i-download

**No utilizar** estas imágenes en tarjetas como «foto del evento», ni en afirmaciones de patrocinios, ni como representación de un participante de AVON.

## 5. Criterios de aceptación
- Tipografía y elementos de marca coherentes en Inicio, Eventos, Detalle, Mi Dorsal y Fasty.
- Colores violeta/amarillo visibles sin aumentar ruido visual ni reducir contraste.
- Fotografías no confunden al usuario sobre la carrera real; tienen alt y crédito.
- Flujo de tres pasos ejecuta navegación real; botones con foco/touch.
- Datos de AVON en catálogo corresponden a fuente primaria y no inventan inscripciones.
- Sin overflow horizontal ni componentes comprimidos a 375px y 390px.
- Respeto a `prefers-reduced-motion`, tour de Fasty y comportamiento de registro personal.
- La demo debe seguir siendo funcional sin descargar las imágenes (fallback de fondo).

## 6. Qué no copiar
- Logos AVON, su paleta rosa/cian, su nombre/identidad en componentes ZANCADA.
- Fotografías del organizador o textos propios de AVON fuera de datos públicos de eventos.
- El portal de pagos/IPU y cualquier credencial oficial.
- Contadores, inscritos, chip, estadísticas o premios sin respaldo por la fuente de cada evento.

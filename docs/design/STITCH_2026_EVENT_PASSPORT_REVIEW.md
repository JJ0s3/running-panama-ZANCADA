# Investigación de referencia — Stitch iOS Sports Interface (Panamá Tactile Light)

**Revisión:** 2026-11-03. **Material original del propietario:** ZIP `stitch_ios_sports_interface_project (1).zip` (3 capturas, 3 archivos HTML y `panam_tactile_light/DESIGN.md`).
**Estado:** referencia conceptual; NO hechos de eventos ni código de producción.

## Pantallas incluidas
1. `inicio_panam_t_ctil_light/screen.png`: portada clara con botón físico carmesí, evento protagonista, referencia al clima y sección de preparación. También muestra telemetría ficticia (GPS, pulsos, FC, ritmo), que ZANCADA no tiene ni debe imitar como dato real.
2. `eventos_panam_t_ctil_light/screen.png`: listado de carreras por mes/categoría, imagen de evento, badges, fecha, distancia, precio, aforo, CTA y zona de ruta con altimetría. Se adapta el patrón de ficha rica, pero precios, aforos e inscripciones de la imagen son demostrativos, no fuentes.
3. `mi_dorsal_panam_t_ctil_light/screen.png`: placa de dorsal grande con nombre, número `#1408`, evento, kit, estado de chip, QR, clima, altimetría, checklist y palmarés. Es la inspiración más fuerte **como metáfora física**, no como autorización o acreditación.

## Lenguaje visual observado
- Paleta del ZIP: superficies frías claras `#F8F9FF`, navy `#0E1C2E`, carmesí `#D72638`, arena `#D9901A`, placas blancas; estilo «Tactile & Skeuomorphic Modern».
- Tipografías propuestas en `DESIGN.md`: **Space Grotesk** para números/títulos y **Hanken Grotesk** para lectura. Evitar tracking exagerado y varias familias repartidas por pestañas (problema detectado en Safari previamente).
- CTA con borde superior iluminado y borde inferior hundido; esquinas de 8–16px; micro-bordes y etiquetas.
- El objeto dorsal usa numeración tabular grande, círculos/perforaciones, sellos y divisiones físicas.
- El PDF/QR/reglamento son **acciones útiles condicionadas a una fuente real**, no decoración.

## Adaptación ZANCADA (inspiración, no copia)
| Patrón en Stitch | Adaptación | Protección |
|---|---|---|
| Dorsal físico | Dorsal personal táctil, número opcional dado por usuario | «Registro personal / no acredita acceso»; sin QR oficial |
| Placas de kit/horario | Módulos informativos enlazados a fuente | «Por confirmar» si ausencia de evidencia |
| Badges federado/oficial | Procedencia de datos y última revisión | Prohibida insignia oficial sin validación de organizador |
| Lista de eventos con fotos | Catálogo curado con arte propio o fotos autorizadas | No copiar medios de Stitch/organizadores |
| Tracker y métricas fisiológicas | No aparecen en Home; preparación solo secundaria | Sin telemetría inventada |
| Palmarés | Pasaporte de resultados personales | No inventar tiempos ni clasificaciones |
| Color carmesí y navy | Experimento visual propio bajo QA de iPhone | Mantener accesibilidad e identidad propia |
| Acciones inscripción | Redirección a canal externo | Declarar explícitamente que ZANCADA no procesa inscripción |

## Experiencia de «Mi Dorsal»
- **Sin inscripción:** ilustración tenue de dorsal vacío y CTA al catálogo.
- **Declarado por usuario:** dorsal con `nombre`, `carrera`, `distancia`, `categoría`, `número si existe`; sello visible **NO VERIFICADO**.
- **Logística:** horario, lugar, kit, ruta, contacto cuando existen datos contrastados.
- **Previa:** checklist editable, estado y recordatorios.
- **Día de carrera:** acceso rápido a ubicación, horario y enlace a la fuente.
- **Después:** resultado personal y recuerdo; sin medal/posición «oficial» sin evidencia.

## Riesgos visuales y pruebas
- Evitar que códigos QR de muestra sean interpretados como reales.
- No mostrar escudos/insignias de FEPAT ni «federado» sin acuerdo formal.
- Evitar fuentes demasiado condensadas, tamaño de texto inferior a 12px en contenido crítico y barras horizontales comprimidas.
- Probar 375px y 390px en Chromium y Safari; navegación de iOS, safe-area, teclado y estado de tour.
- Dar prioridad a tareas concretas antes que efectos decorativos.

## Resultado de la revisión
Aprobado: **dorsal objeto táctil**, estructura de ficha de carrera rica y navegación evento–dorsal–Fasty. Rechazado: simulación de resultados, QR de control, chip RFID, medidores fisiológicos y «evento oficial» de la referencia.

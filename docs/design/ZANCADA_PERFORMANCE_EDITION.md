# ZANCADA · Performance Edition — guía de diseño y validación

**Fecha:** 04/11/2026 · **Estado:** propuesta de estilo, separada de producción  
**Referencia:** imagen conceptual de ZANCADA aprobada por el usuario (iPhone, grafito + naranja + azul eléctrico).

## Regla principal

**Conservar la aplicación ZANCADA v2 y cambiar su identidad visual.** La imagen es una dirección estética, no una especificación de funcionalidades, datos reales ni geografía. Por tanto, no se añaden maratones de Madrid/Valencia/Barcelona, estadísticas ficticias, entrenamiento simulado o un nuevo agente de IA.

## Identidad

| Token | Valor | Uso |
|---|---|---|
| Fondo nocturno | \`#080D15\` | Lienzo general |
| Panel deportivo | \`#111B2A\` | Tarjetas |
| Naranja performance | \`#FF721F\` | CTA, estado activo, Fasty |
| Azul eléctrico | \`#00C8FF\` | Navegación secundaria, iconos, mapas, enlaces |
| Blanco humo | \`#F3F7FF\` | Titulares y cifras |
| Línea de acero | \`#324358\` | Bordes |
| Texto secundario | \`#BBC8D8\` | Fechas, explicaciones |

Tipografía: **Racing Sans One** en marca y titulares, **Barlow Condensed** en estadísticas/acciones/etiquetas, **Barlow** para texto de lectura. Fallbacks disponibles cuando falle Google Fonts. Composición tipo carrera: diagonales discretas, profundidad y bordes de energía, sin introducir contenido engañoso.

## Lo que se conserva del código

- Inicio con hero fotográfico editorial, estadísticas de la demo y tarjetas informativas.
- Eventos reales documentados, fuente externa de inscripción y guardados.
- Resultados con filtros y enlaces originales, sin copiar tablas de atletas.
- Rutas GPX cuando están documentadas y visor Leaflet dentro de la app.
- Preparación con Fasty y recursos públicos, sin IA remota nueva.
- Mi Dorsal como pasaporte personal autodeclarado, no como acreditación.
- Guía interactiva **original de 10 pasos**, con las mismas decisiones, texto y scroll.
- Misma disposición responsive original: menú lateral en escritorio y cinco accesos móviles.

## Qué se implementa

- \`app/performance-dark.css\`: nueva capa final de estilos, sin reordenar componentes.
- \`app/page.tsx\`: nuevo import final.
- \`components/event-passport-app.tsx\`: **solo reemplazo de iconos de navegación** por la familia del concepto; etiquetas/rutas sin cambios.
- \`tests/performance-dark.test.mjs\`: regresión de la interfaz y la lógica.
- \`scripts/performance-qa.mjs\`: Playwright Chromium en 320/390/430/768/1280 px.
- \`.github/workflows/performance-qa.yml\`: QA de captura y funciones críticas, con artefactos visuales.

## Reglas de fidelidad al producto

1. No usar la ilustración de concepto como hero de producción: contiene eventos, regiones y progresos ajenos a los datos de ZANCADA.
2. Mantener todas las fotografías originales y sus avisos de imagen ilustrativa.
3. No alterar API GPX, catálogos, fecha de Panamá, estado de \`localStorage\` ni entradas de Fasty.
4. No convertir los cinco apartados reales en Plan/Entrenar/Progreso/Eventos de la ilustración.
5. No omitir Resultados ni Dorsal de la navegación por motivos estéticos.
6. Garantizar texto naranja sobre oscuro y tinta oscura sobre botón naranja; textos secundarios legibles.
7. Validar que en escritorio el menú lateral permanece y no aparece una barra inferior duplicada.
8. Respetar \`prefers-reduced-motion\`, foco de teclado y áreas de clic accesibles.
9. Verificar el recorrido de diez pasos **completo** y el aspecto de Fasty también en chat y guía.

## Condiciones antes de desplegar

\`\`\`bash
npm ci
npm run typecheck
npm test
npm run build
\`\`\`

Revisar capturas de Chromium y navegador manual. Aprobar vista previa del PR antes de fusionar a \`main\`. Producción de ZANCADA v2 queda intacta hasta entonces.

## Limitaciones conservadas

No hay inscripciones ni pagos reales, dorsales oficiales, posiciones individuales copiadas o recomendaciones clínicas. Resultados externos y fuentes GPX pueden cambiar; no afirmar que hay información en vivo sin verificación.

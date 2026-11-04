# ZANCADA · Corrección de rumbo: paleta y tipografía, sin rediseñar la estructura

**Fecha:** 04/11/2026  
**Referencia:** \`ZANCADA-guia-rediseno.pdf\`, páginas 2 y 3.  
**Estado:** rama de revisión; \`main\` conserva ZANCADA v2.

## Alcance aprobado

El objetivo de esta revisión es **mantener exactamente la composición y funcionalidad de ZANCADA v2** y aplicar exclusivamente su nueva identidad cromática y detalles tipográficos. No es el rediseño completo «Opción B» implementado inicialmente en este PR.

### Qué se conserva de \`main\`

- Portada con hero fotográfico realista (fotografías editoriales identificadas como ilustrativas), métricas, tarjetas y presentación de carreras.
- Barra lateral en escritorio; encabezado con marca centrada y barra de cinco botones en móvil.
- Catálogo y fichas de carrera con imágenes, búsqueda y filtros.
- Resultados, visor de rutas GPX con Leaflet, Fasty en Preparación, Mi Dorsal y guardados.
- **Recorrido guiado original de diez pasos**, sus capítulos, animación de desplazamiento y resaltado.
- Datos del pasaporte almacenados en el mismo \`localStorage\`, sin migración.

### Tokens nuevos (PDF página 2)

| Token | Hex | Uso |
|---|---|---|
| Papel | \`#F5F1E8\` | Fondo y degradado suave de la estructura existente |
| Mango | \`#FF6B2C\` | Acciones principales con texto Tinta |
| Pacífico | \`#1E4FD8\` | Enlaces, iconos, títulos destacados y estados |
| Tinta | \`#15171C\` | Texto base, zonas oscuras |
| Piedra | \`#5F6168\` | Secundarios |
| Arena | \`#E9E3D6\` | Bordes y divisores |
| Blanco | \`#FFFFFF\` | Tarjetas |
| Pacífico suave | \`#E8EDFB\` | Ayudas y fondos de información |

**Tipografía:** Hanken Grotesk permanece en párrafos y controles; los titulares más visibles usan Archivo variable, con cifras condensadas, y las fechas/etiquetas principales usan DM Mono. Evita imponer una tipografía genérica al cuerpo entero.

### Implementación

- \`app/page.tsx\`: solo importa la hoja \`palette-refresh.css\` **al final**, sin tocar componentes.
- \`app/palette-refresh.css\`: reemplazos de color en Inicio, Eventos, Resultados, Fasty, Mi Dorsal, tarjetas, CTA, guía y barra inferior, con las mismas dimensiones y disposiciones.
- \`tests/palette-refresh.test.mjs\`: protege la conservación de las funcionalidades y del recorrido original.
- QA de navegador a 390 px y escritorio, comprobando colores, imágenes y disposición.

**Decisión técnica:** se conserva el CSS anterior como está para facilitar una comparación clara y una reversión inmediata. En una fase posterior se podrá consolidar las capas CSS sin alteraciones visuales.

### Límites que permanecen

Demo sin pago ni inscripción propia. Las imágenes siguen siendo ilustrativas, los resultados provienen de fuentes enlazadas y los dorsales son personales, no acreditaciones oficiales.

**Criterio para aprobar:** la interfaz debe parecerse a ZANCADA v2 antes de la intervención, excepto por la paleta, la tipografía destacada y el color de iconos y estados.

# ZANCADA — Rediseño Opción B

**Estado:** rama de propuesta, no desplegada en producción. **Base:** \`main\` v2.  
**Referencia principal:** documento entregado por el usuario, *ZANCADA-guia-rediseno.pdf* (5 páginas, 04/11/2026).

## Objetivo

Pasar de un portal informativo genérico a una **app deportiva propia**. Se conserva la lógica funcional de ZANCADA v2: catálogo curado, inscripción externa, rutas GPX, resultados referenciados, Fasty en Preparación, guardados y Mi Dorsal personal.

## Correspondencia exacta con el PDF

| Página | Regla de la guía | Implementación |
|---|---|---|
| 1 | Papel cálido en vez de blanco, Mango como único acento fuerte, Archivo y DM Mono | \`app/option-b.css\` |
| 1 | Una tarjeta destacada mango y selector de 3 vistas en el inicio | \`components/option-b-home.tsx\` |
| 2 | Papel \`#F5F1E8\`, Blanco \`#FFF\`, Mango \`#FF6B2C\`, Pacífico \`#1E4FD8\`, Tinta \`#15171C\`, Piedra \`#5F6168\` | Tokens CSS nuevos, sin gradientes |
| 3 | Píldoras, tarjeta hero radio 28, filas blancas radio 20, fecha 56×56 | Home y catálogo |
| 3 | Barra flotante Tinta 64px, cinco iconos, activo circular Mango 52px | Menú de navegación en todas las pantallas |
| 4 | Sustituir textos largos, métricas, pasos numerados y fotos de banco | Nueva portada y tarjetas |
| 4 | Inicio con Próximas / Resultados / Guardadas | Selector funcional con datos y estado real |
| 4 | Guía de tres pantallas, no bloque en el inicio | \`components/event-tour.tsx\` |
| 5 | Contraste, targets >=44px, etiquetas aria, \`prefers-reduced-motion\` | Estilos y pruebas nuevas |

## Estructura

- **\`components/option-b-home.tsx\`**: portada exclusiva, hero, fila de carrera, pestañas, guardadas y resultados.
- **\`app/option-b.css\`**: tokens y diseño del nuevo sistema visual, cargado último.
- **\`components/event-passport-app.tsx\`**: orquestación de vistas, estado guardado, inscripción personal, Fasty, mapas.
- **\`components/event-tour.tsx\`**: onboarding de tres visitas interactivas.
- **\`tests/option-b-design.test.mjs\`**: pruebas de reglas visuales críticas y continuidad funcional.

## Decisiones de conservación

1. **Inscripción**: enlace al proveedor externo; el registro en la app es una declaración personal.
2. **Mapa**: GPX mostrado mediante Leaflet en la ficha cuando hay fuente; sin inventar rutas.
3. **Resultados**: índices públicos con filtros, sin copiar datos personales ni crear cronometrajes ficticios.
4. **Mi dorsal**: no acredita acceso ni asigna números oficiales.
5. **Fasty**: orientación contextual en Plan/Preparación, sin prometer capacidades de IA externa.
6. **Datos**: mismo \`localStorage\`; sin migración ni pérdida intencionada de información.

## Implementación segura y validación

1. Ejecutar \`npm run typecheck && npm test && npm run build\`.
2. Validar en 320, 360, 390, 430, 768 y escritorio; probar Scroll/teclado y touch.
3. Reproducir: guardar carrera → Guardadas → ficha → GPX → inscripción externa → Mi Dorsal → Preparación → Resultados.
4. Revisar que fotos ilustrativas no se asocien a eventos específicos (se retiran de las tarjetas principales).
5. Verificar que la barra flotante no tape contenido y que haya una sola tarjeta Mango destacada por pantalla.
6. Confirmar contraste de los textos. Mango es **relleno con texto Tinta**, nunca texto naranja sobre fondo Papel.
7. Aprobar la preview antes de cualquier fusión en \`main\`.

## Deuda técnica reconocida

El diseño Opción B se incorpora al final de la cadena de hojas de estilo existente para **minimizar regresiones** en los módulos de rutas, Resultados y Fasty. Como siguiente trabajo se recomienda consolidar esas hojas, retirar CSS y componentes heredados que ya no usa la vista activa y sustituir Google Fonts CSS por \`next/font\` cuando se valide la paridad tipográfica. Este cambio no requiere una migración de datos.

## Límites de la demo

Sin inscripción/pago real, dorsal oficial, cronometraje en vivo o datos médicos. Las fuentes externas pueden variar; las atribuciones se mantienen. La referencia del usuario define el aspecto gráfico, no constituye una afiliación con organizadores.

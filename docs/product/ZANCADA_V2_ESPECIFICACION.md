# ZANCADA v2 — Especificación funcional y de diseño

**Versión de documentación:** 2.1 · **Corte:** 04/11/2026 · **Repositorio:** JJ0s3/running-panama-ZANCADA  
**Estado:** implementación local comprobada, publicación remota del código pendiente.

## 1. Visión y alcance

ZANCADA es el pasaporte de carreras para Panamá. El recorrido principal es **descubrir → consultar datos y ruta → inscribirse en la fuente externa → prepararse → consultar resultados → guardar la experiencia**. La propuesta no es otro rastreador de kilómetros.

Usuarios: debutantes en 5K, corredores habituales, personas interesadas en eventos regionales y participantes que buscan referencias de resultados.

## 2. Arquitectura de información

1. **Inicio:** evento destacado, próximos eventos, guardados, accesos a resultados.
2. **Eventos:** catálogo curado (10 candidatos registrados), búsqueda, distancias, fichas, mapas y enlace externo de inscripción.
3. **Resultados:** cinco referencias iniciales de Papaya25; búsqueda, año, mes, modalidad, estado y acceso a la fuente.
4. **Preparación:** Fasty, preguntas y orientación general, checklist y enlaces a recursos públicos.
5. **Mi Dorsal:** participación autodeclarada, número solo si el usuario lo introduce, recordatorios personales.

En móvil: navegación inferior **de cinco botones proporcionados**, marca ZANCADA PTY centrada y perfil a la derecha. En escritorio: menú lateral; la barra inferior **no** debe duplicarse.

## 3. Sistema visual «Panamá Tactile Light»

| Token | Color | Propósito |
|---|---|---|
| Rojo deportivo | `#D72638` | Acciones y estado activo |
| Azul marino | `#0D1D38` | Encabezados, contraste |
| Dorado | `#D9901A` | Logros/acento |
| Azul niebla | `#E6EEFF` | Superficies y contextos |
| Lienzo | `#F4F6FA` | Base del fondo |

Tipografías de referencia: **Space Grotesk** (titulares) y **Hanken Grotesk** (lectura). Tarjetas redondeadas, relieve ligero, iconos con etiqueta y cifras legibles. El fondo usa un difuminado moderado azul/rojo/dorado, sin sacrificar contraste. Fotografías editoriales identificadas como *ilustrativas*.

Inspiración del video: transiciones breves, desplazamiento contextual, enfoque de elementos verdaderos y capítulos de ayuda. Respetar `prefers-reduced-motion`.

## 4. Funcionalidad y confianza

| Función | Incluido en la demo local | Límite |
|---|---|---|
| Eventos | 10 carreras curadas | Cupos/horarios sujetos a cambios |
| Rutas | Visor Leaflet, GPX disponible y aviso de ausencia | Nunca trazar rutas no documentadas |
| Resultados | 5 referencias, filtros y fuente | Sin cronometraje propio ni posiciones importadas |
| Fasty | Ayuda contextual de preparación | Reglas de demostración; no IA remota, diagnóstico o plan clínico |
| Dorsal | Declaración de participación y número voluntario | No es credencial, QR ni inscripción verificada |
| Datos | Preferencias y checklist en `localStorage` | No hay cuentas ni sincronización |
| Guía | Spotlight, scroll y navegación real | Requiere QA en dispositivos móviles |

**Fuentes:** enlaces originales de organizadores y [Papaya25](https://papaya25.info/resultados.php). La referencia visual no implica colaboración ni autorización para reproducir sus tablas o marcas.

## 5. Requisitos y casos de uso

- **CU-01:** Buscar una carrera, leer su ficha, guardar y acudir a inscripción externa.
- **CU-02:** Consultar mapa y elegir distancia; si no hay GPX, mostrar el estado sin ruta.
- **CU-03:** Ver resultados publicados y filtrarlos; abrir cronometraje en su origen.
- **CU-04:** Pedir a Fasty orientación de preparación y consultar checklist.
- **CU-05:** Declarar una inscripción realizada fuera y añadir número voluntariamente.
- **CU-06:** Explorar la guía mediante capítulos y elementos resaltados.

Los errores de red, GPX, carga vacía o fuentes inconsistentes deben explicarse sin inventar datos. Las interacciones principales deben ser accesibles por teclado y táctiles.

## 6. Arquitectura tecnológica

Next.js 16 (App Router), React 19, TypeScript, Lucide, CSS; Leaflet + OpenStreetMap; backend de rutas `app/api/race-route/route.ts`; parser `lib/parse-gpx.ts`; catálogo `lib/results-catalog.ts`. Pruebas de `node --test`, TypeScript y build.

No exponer secretos ni `.env*`. Respetar límites de descarga, allowlist de fuentes GPX y atribución cartográfica.

## 7. Validación y release

En la PC, el 04/11/2026 el usuario confirmó `npm run typecheck` sin errores, **46/46** tests aprobados y `npm run build` exitoso. Después se aplicó una corrección CSS móvil; su regresión final debe verificarse de nuevo antes de publicar.

`chore/zancada-quality-gates` contiene el código local con modificaciones sin push; **no confundir** esta rama de documentación con el código de la app v2. Publicación recomendada: revisión de cambios → CI → preview de Vercel → validación real 320/390/430 px + escritorio → merge → producción.

## 8. Fuera de alcance

Inscripción y pagos, tiempos/chips oficiales, autenticación multiusuario, integración en vivo con proveedores, seguimiento GPS, recomendaciones médicas, rutas no verificadas, resultados de terceros copiados y certificación integral de accesibilidad.

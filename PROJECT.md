# ZANCADA — Documento maestro de producto

## Visión actual (desde 2026-11-03)
ZANCADA es **el pasaporte digital del corredor en Panamá**: descubrir eventos, informarse, guardar carreras, registrar de manera personal participaciones realizadas en canales externos, preparar la logística, ver un dorsal personal no acreditativo y conservar resultados/recuerdos.

**No es otro tracker de running.** Kilómetros, rutinas y planes quedan como funciones de apoyo a la experiencia alrededor de eventos.

### Propuesta de valor
> Descubre carreras en Panamá, prepárate para correrlas y conserva tu historia de eventos en un solo lugar.

### Decisiones y documentación
- [ADR-0006 — Cambio a plataforma de eventos/pasaporte](docs/decisions/ADR-0006-eventos-pasaporte.md)
- [Blueprint completo: navegación, dorsal, Fasty, modelo de datos, roadmap y criterios](docs/product/EVENTS_PASSPORT_BLUEPRINT.md)
- [Revisión de las tres pantallas Stitch](docs/design/STITCH_2026_EVENT_PASSPORT_REVIEW.md)
- [10 eventos públicos curados, fuentes y vacíos](docs/research/PANAMA_RUNNING_EVENTS_2026.md)
- [Historial de desarrollo](docs/development/LOG.md)

## MVP revisado
**Must:** Home próxima carrera; catálogo con detalles y fuentes; favoritos; participación **declarada**; Mi Dorsal personal sin QR de acreditación; calendario; Fasty orientado a logística; perfil/onboarding.
**Should:** checklist, cuenta regresiva, ruta/mapa cuando exista fuente, kit, materiales y recursos. Se priorizan checklist y cuenta regresiva para completar el primer flujo.
**Demo+:** pasaporte de carreras realizadas, resultados personales, fotos autorizadas, hitos sobrios.
**Futuro:** pagos/inscripción oficial, organizadores, cronometría, resultados oficiales, identidad verificada, tracking GPS.

## Arquitectura y ejecución
Next.js/React + TypeScript. Primera iteración de eventos con catálogo curado tipado y estado local aislado bajo clave nueva; sin Notion ni backend nuevo. Dominios `events`, `favorites`, `participations`, `bib`, `checklist`, `calendar`, `sources`. Supabase/RLS y acceso organizadores son extensiones posteriores, no presupuestos de esta demo.

## Límites de confianza
- Enlace a inscripción externa: no significa «registrado» en ZANCADA.
- Guardado: no implica participar.
- Participación declarada: no prueba inscripción pagada ni crea dorsal oficial.
- Número de dorsal: solo si lo aporta el usuario. No generar QR/código oficial ni insignias de federaciones.
- Datos de evento: adjuntar fuente y fecha; valores desconocidos se presentan como tales.
- Fotos y material externo: únicamente con permiso/licencia o arte propio.

## Flujo principal
`Ver evento → explorar detalles/fuentes → guardar → registrar participación personal → ver Mi Dorsal → checklist / calendario → carrera → resultado personal`.

## Criterio de terminado
Un usuario completa el flujo sin confundir información curada con información oficial ni un dorsal personal con credencial de acceso; QA móvil en 375/390px, accesibilidad, pruebas y build pasan; documentación, fuentes y límites actualizados.

## Estado de entrega
ZANCADA Performance (v2.2.0) fue integrada a `main` el 4 de noviembre de 2026 mediante PR #16 y publicada en Vercel. La aplicación mantiene las cinco secciones del pasaporte, los temas claro/oscuro, Fasty, fuentes y guía de diez pasos. Las próximas entregas deben registrarse en el [CHANGELOG](CHANGELOG.md) y seguir el [procedimiento de despliegue](docs/deployment/README.md).

## Historial
Hasta la v0.6, ZANCADA era una demo funcional de plan y registro. Se conservan las ramas y el registro de decisiones anteriores; el giro a eventos ocurre explícitamente con ADR-0006.

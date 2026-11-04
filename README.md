# ZANCADA — Pasaporte del corredor en Panamá

**Nueva dirección (desde 2026-11-03):** descubre carreras, conoce sus detalles, guárdalas, organiza una participación ya inscrita por medios externos y conserva tu dorsal digital **personal** y su preparación. No es otro tracker GPS.

## Estado de la rama de desarrollo
Primera vertical **eventos + inscripción declarada + dorsal + checklist + Fasty**. No se realizan pagos ni inscripciones, no se crean dorsales/QR oficiales y ninguna fuente pública equivale a una alianza con organizadores.

## Ejecutar
Node.js 22+.
```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

## Incluye esta demo
- Inicio con carrera destacada / próxima participación, fechas y Fasty.
- Catálogo curado de **10 carreras reales anunciadas públicamente** en Panamá, con fecha de revisión 2026-11-03, enlaces a fuentes y filtros.
- Ficha con información documentada, enlace de registro externo cuando se identificó y campos ausentes sin inventar.
- Guardados independientes de participación personal.
- Formulario explícito «Ya me inscribí afuera» (declaración del usuario, no verificada).
- Mi Dorsal personal con número solamente si lo aporta el corredor; aviso visible «NO ACREDITA ACCESO» y sin QR oficial.
- Checklist por participación, agenda inicial, historial personal, Fasty de preguntas frecuentes por reglas y onboarding guiado.
- Estado local privado en `zancada-event-passport-v1`; no se sincroniza ni se solicitan documentos de identidad.

## Fuera de alcance en esta fase
Inscripciones/pagos reales, verificación del organizador, chips, QR oficiales, clasificaciones verificadas, clima en vivo, fotografías sin licencia, mapas/GPX completos, cuentas multiusuario, portal de organizadores y tracking GPS.

## Documentación técnica y de producto
- [PROJECT.md](PROJECT.md): visión y prioridades actuales.
- [ADR-0006](docs/decisions/ADR-0006-eventos-pasaporte.md): decisión formal y límites de confianza.
- [Blueprint de producto](docs/product/EVENTS_PASSPORT_BLUEPRINT.md): flujos, IA, MVP, Fasty, modelo de datos y roadmap.
- [Eventos y fuentes](docs/research/PANAMA_RUNNING_EVENTS_2026.md): catálogo curado con evidencias y pendientes.
- [Revisión Stitch](docs/design/STITCH_2026_EVENT_PASSPORT_REVIEW.md): qué se adapta y qué se rechaza.
- [DESIGN.md](DESIGN.md): sistema visual activo e historia.
- [Pruebas automatizadas](.github/workflows/ci.yml) y [QA móvil de eventos](.github/workflows/event-passport-qa.yml).

La implementación previa centrada en entrenamiento sigue disponible en el historial/ramas, pero no es el núcleo del nuevo MVP.

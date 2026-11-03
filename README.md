# ZANCADA · Running Panamá

Demo funcional mobile-first para explorar eventos de running, establecer objetivos, organizar entrenamientos, registrar actividades y consultar un asistente accionable de demostración.

## Estado
**v0.1 · Fundación de la demo**. Eventos sintéticos claramente identificados; información guardada en el navegador. No hay autenticación, IA generativa ni inscripciones reales todavía.

## Empezar
Requiere Node.js 22 o superior.

```bash
npm install
npm run dev
```

Abrir http://localhost:3000. Pruebas: `npm test`; comprobación de tipos: `npm run typecheck`; compilación: `npm run build`.

## Qué incluye
- Dashboard con actividades y progreso real del estado local.
- Perfil editable, objetivo 5K/10K/media maratón y agenda de cuatro semanas.
- Registro manual de actividad con kilómetros, tiempo, esfuerzo y notas.
- Catálogo de **cuatro eventos ficticios** con filtros y favoritos.
- Asistente de reglas: preguntas sobre progreso y agenda, propuestas de registro, meta y favoritos con confirmación.
- Recorrido guiado opcional y navegación adaptativa a móviles.

## Límites importantes
- El progreso vive en `localStorage` de ese navegador: no hay sincronización entre dispositivos ni cuentas reales. No introducir información sensible.
- Los eventos son ficticios. No son convocatorias reales ni incluyen enlaces oficiales de inscripción.
- Los planes son demostrativos y no constituyen indicaciones médicas o entrenamiento individual validado.
- La integración Supabase y el asistente con modelo de IA se incorporarán en fases posteriores.

## Documentación
- [PROJECT.md](PROJECT.md): alcance, arquitectura, criterios y ciclo de desarrollo.
- [DESIGN.md](DESIGN.md): identidad y reglas de UX.
- [CI](.github/workflows/ci.yml): pruebas, typecheck y build en GitHub Actions.

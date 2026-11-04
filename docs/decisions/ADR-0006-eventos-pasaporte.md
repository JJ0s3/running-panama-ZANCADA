# ADR-0006 — ZANCADA pasa a ser una plataforma de eventos y pasaporte del corredor

**Fecha:** 2026-11-03
**Estado:** Aceptada para implementación incremental
**Origen:** nueva dirección solicitada por el propietario; Stitch «Panamá Tactile Light»
**Rama:** `feat/zancada-event-passport-foundation`
**No sustituye producción automáticamente.**

## Contexto
ZANCADA comenzó como una demo de entrenamiento, registro de actividad y asistencia por reglas. Iteraciones visuales recientes produjeron pantallas parecidas a un tracker y alejaron el producto de una necesidad diferenciada. La referencia entregada contiene Inicio, Eventos, Mi Dorsal y un sistema de diseño táctil orientado a competiciones.

## Decisión
**ZANCADA es un pasaporte digital del corredor, centrado en descubrir eventos, preparar la participación, conservar un dorsal personal y recordar el resultado.**

Flujo principal: `descubrir → consultar ficha/fuentes → guardar → registrar participación externa → preparar/checklist → dorsal personal → día del evento → resultado/historial`.

El registro de kilómetros y entrenamientos queda subordinado a la preparación de carreras, sin competir con Strava, Garmin, Nike Run Club ni sistemas de cronometraje.

## Terminología honesta
- **Evento público curado:** ficha informativa editada por ZANCADA a partir de fuentes públicas. No implica respaldo del organizador.
- **Evento guardado:** favorito. No implica inscripción.
- **Participación declarada:** el usuario declara que se inscribió por fuera, opcionalmente guarda su número real. No la verificamos.
- **Dorsal personal:** presentación visual de información declarada; NO es acceso a la carrera, credencial, boleto, código de control ni dorsal oficial.
- **Inscripción verificada:** estado futuro únicamente con respaldo verificable de organizador/plataforma con consentimiento y conexión válida.
- **Resultado personal:** tiempo/posición introducidos por el usuario; **resultado oficial** requeriría fuente oficial.
- **Evento oficial/verificado:** insignia prohibida hasta validación directa del organizador.

No inventar numeración de dorsal, chip RFID, QR de ingreso, pago, cupos, telemetría, categorías, horarios, rutas ni clima. La ausencia se expresa como «Por confirmar» o «Consultar la fuente oficial». No presentar capturas Stitch como hechos.

## Nuevas prioridades
1. Inicio con próxima carrera, pasos pendientes e información fuente; no como tablero de kilómetros.
2. Explorar eventos públicos curados, filtro y ficha con fuente.
3. Guardar eventos y registrar participación declarada sin pagos.
4. Mi Dorsal personal, con estados claros y sin pretensiones oficiales.
5. Calendario y checklist por evento.
6. Fasty como asistente logístico y educativo de eventos.
7. Perfil y onboarding narrado por Fasty.
8. Resultado personal/pasaporte después del evento.

## Guía visual (adaptación, no copia)
De Stitch se adaptan: dorsal que parece un objeto físico, bordes/perforaciones no funcionales, grandes números, etiquetas, acentos rojo y arena, navy, fondos claros y jerarquía de horarios/logística. No se replica contenido ni código de las pantallas ni se adoptan afirmaciones no comprobadas. Se prioriza **Space Grotesk solo para cifras/títulos y una sola tipografía de lectura accesible**, sujeto a prueba iPhone: el archivo de diseño sugiere Hanken Grotesk. Los activos se desarrollan independientemente.

## Principios de implementación
- Mantener Next.js/TypeScript y el repo existente; reemplazar por incrementos revisables, no mediante refactor global sin pruebas.
- Catálogo público curado estático al inicio, trazabilidad y fecha de revisión por campo cuando haga falta.
- Datos privados `savedEvents`, `participations`, `checklist` en almacenamiento de demo; futura persistencia Supabase con políticas RLS, control por propietario y mínima recopilación de PII.
- Integraciones de inscripción y resultados solo mediante canal oficial autorizado; redirección externa identificada.
- `event.organizerVerification` separado de `event.sourceReliability`. Nunca convertir una fuente consultada en insignia oficial.
- QA: estados vacío, expirado, desconocido, móvil Safari, contraste, accesibilidad, timezone America/Panama, variaciones de mes/año y tiempos.

## Riesgos y mitigaciones
- **Suplantación:** sin QR de acceso, credenciales oficiales o insignias falsas.
- **Información desactualizada:** mostrar fuente y fecha de consulta, botón «Ver fuente» y revisión antes de cada evento.
- **Derechos de autor:** enlaces y resúmenes propios; fotos solo con licencia o permiso, o arte original.
- **Privacidad:** sin documentos de identidad, datos médicos o número de póliza para una demo; no exponer registros de participación como públicos.
- **Confusión entre carreras con nombres parecidos:** identificadores propios, organizador, ubicación y enlaces específicos.
- **Cobros:** no integrar pagos en esta fase.

## Alternativas rechazadas
- Tracker GPS y entrenamiento como núcleo: baja diferenciación, alto coste y servicios deportivos competidores.
- Imitación literal de Stitch/FEPAT: referencias visuales no constituyen respaldo oficial.
- «Registrado = inscrito/verificado»: incorrecto sin confirmación del organizador.
- Inventar 100 eventos: menos útil que ocho a quince con fuente.

## Criterios de aceptación del primer incremento
- El primer pantallazo explica que es una experiencia de eventos.
- Se pueden descubrir carreras con fuentes verificables y distinguir lo desconocido.
- Guardar ≠ inscripción; la participación personal requiere acción explícita.
- Dorsal personal no finge QR/credencial oficial.
- Las acciones principales son utilizables a 375–390px; no hay overflow.
- Pasan tests del dominio y build, más QA de navegador móvil antes de PR listo para fusionar.

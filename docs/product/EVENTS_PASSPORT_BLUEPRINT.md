# ZANCADA — Blueprint de producto 1.0: eventos, dorsal y pasaporte

**Decisión base:** [ADR-0006](../decisions/ADR-0006-eventos-pasaporte.md)
**Fecha:** 2026-11-03 · **Audiencia:** producto, diseño, ingeniería, QA

## 1. Posicionamiento
**Propuesta de valor:** descubre eventos de running en Panamá, organiza tu participación, lleva la información esencial el día de carrera y conserva cada experiencia en un pasaporte digital. No sustituye a la inscripción oficial, el cronometraje ni el seguimiento GPS.

**JTBD:** «Quiero correr una carrera, pero tengo que buscar la convocatoria, inscribirme, saber dónde recojo el kit, organizar mi llegada, revisar la ruta y después recuperar mis resultados en varios sitios».

**North-star observable de demo:** número de participantes que llegan de descubrir un evento a guardar o registrar una participación de manera informada. No usar kilómetros acumulados como métrica principal.

## 2. Arquitectura de información

### Navegación primaria
1. **Inicio:** mi próxima carrera si tengo participación; si no, evento recomendado y CTA «Explorar carreras». Estado de inscripción declarado, tiempo hasta carrera, pendientes de preparación, mensaje contextual de Fasty.
2. **Eventos:** catálogo curado, filtros por fecha/distancia/región, detalle con ficha y fuente, guardar y registro de participación.
3. **Mi dorsal:** si no existe participación, estado vacío orientado a guardar o registrar; si existe, muestra el dorsal personal y todos los pendientes útiles. Pasaporte/historial accesible desde aquí.
4. **Fasty:** búsqueda de eventos, preguntas de logística, checklist, preparación y acciones explicitadas/confirmadas.
5. **Perfil/Ayuda:** preferencias, eventos personales, privacidad, reiniciar recorrido; no requiere una quinta pestaña en móvil.

### Jerarquía secundaria
- Detalle de evento: **Información esencial → Inscripción → Preparación → Ruta / llegada → Kit → Horarios → Reglamento / fuentes**.
- Dorsal: **Identidad del evento → Número declarado → Estatus claramente personal → Preparación → Indicaciones → Resultado**.
- Calendario: dentro de Próxima carrera y accesible desde Inicio/Mi Dorsal. Prioriza fechas de eventos y retiros; entrenamiento es secundario.
- Plan de entrenamiento: sub-sección opcional de «Preparación», no Home ni tab principal.

## 3. Home propuesto
**Sin participación:** headline «Tu próxima historia empieza en una salida», evento destacado con fuente, dos o tres próximas carreras, agenda de fechas, Fasty («¿Qué debería saber antes de elegir?»), estado de pasaporte vacío.

**Con participación declarada:** portada «Tu próxima carrera», distancia, fecha, ubicación y cuenta regresiva derivada de la fecha local de Panamá; cinta «Registrada por ti · no verificada»; CTA «Ver mi dorsal»; checklist y estado logístico; enlace externo a la fuente de evento; sugerencia breve de Fasty; otras carreras discretas.

**Después de carrera:** recuerdo y registro de resultado personal; CTA «Añadir tiempo», sin reclamar posiciones oficiales.

## 4. Eventos: página y detalle
### Resumen en tarjeta
Nombre, fecha/hora si disponible, distancia(s), lugar, modalidad, fuente/fecha de consulta, guardado y enlace «Ver detalles». Imágenes solo autorizadas/propias. Estados «inscripción abierta/cerrada» solo si fuente fechada y confirmada; de lo contrario «Consultar con organizador».

### Detalle (orden en móvil)
Portada y badge «Datos públicos» → ficha rápida (fecha, hora, lugar, distancias) → CTA externos claros «Inscripción en sitio del organizador» cuando proceda → guardar → «Registrar mi participación» → ruta/ubicación → kit/entrega → horarios → categorías/precio → reglamento/contacto → resultados/fotos si existen → fuente y última revisión.

Todo dato no documentado: `null`; se muestra «Por confirmar», nunca un placeholder con apariencia oficial.

## 5. Mi dorsal: objeto digital con estados
**Visual:** fondo papel texturizado sutil (sin asset de terceros), cantoneras, perforaciones puramente visuales, número tabular muy grande, nombre, evento, distancia, estado y fuente. El dorsal personal **no incorpora QR escaneable de ingreso**.

**Guardado:** no existe dorsal; CTA «Registrar participación». 
**Declarado:** vista del dorsal con número únicamente si el usuario lo introduce; si no, «Número por confirmar». Etiqueta visible «Registro personal — no acredita inscripción».
**Verificado:** FUTURO, solo tras confirmación documentada por organizador; visual y metadatos diferentes.
**En preparación:** checklist/cuentas regresivas, sin afirmar clima no consultado.
**Día del evento:** hora y punto de salida solo si fuentes disponibles; enlace al organizador y mapa, acceso offline futuro.
**Terminado:** dorsal recuerdo más resultado ingresado por usuario; resultados oficiales solo al integrar su fuente.

**Inscripción externa:** al presionar «Inscribirme oficialmente», se abre la URL de inscripción confirmada; ZANCADA no recoge pagos ni asume automáticamente inscripción.
**Registro de participación:** formulario con evento, distancia/categoría opcionales, número de dorsal **opcional**, confirmación «Ya hice mi inscripción fuera de ZANCADA». No exigir documentos personales.

## 6. Fasty: asistente de carreras
Intenciones: `find_events`, `event_details`, `kit_pickup`, `start_location`, `registration_status`, `view_bib`, `countdown`, `checklist`, `results`, `event_calendar`.
- Contextualizado en el evento que abrió el usuario. Responde desde datos curados y sus URLs.
- Si la fuente no confirma retiro de kit o altimetría: «Aún no encuentro una hora confirmada. Verifica en la fuente».
- No consulta base privada sin consentimiento; no inventa credenciales oficiales.
- Las operaciones que mutan guardados/participaciones requieren interacción/confirmación de usuario.
- Mantener un motor de reglas demo antes de añadir LLM, con mensajes honestos.

## 7. Modelo relacional — diseño propuesto
`users(id, display_name, region, preferences, created_at)`
`organizers(id, name, website, verified_at NULL)`
`events(id, organizer_id NULL, name, starts_at_local, timezone, city, region, venue, description, source_url, last_checked_at, source_level, status)`
`event_distances(id, event_id, km, category_id NULL, start_time NULL, price NULL, currency NULL)`
`event_sources(id, event_id, field_path, url, checked_at, evidence_note, reliability)`
`routes(id, event_distance_id, start_place, finish_place, geojson_url NULL, elevation_m NULL, source_url NULL)`
`kit_pickups(id, event_id, place, starts_at, ends_at, source_url)`
`registrations(id, user_id, event_id, distance_id NULL, state, self_reported_at, source_registration_id NULL, verified_at NULL)`
`bib_records(id, registration_id, number NULL, category NULL, corral NULL, issued_by ENUM('self','organizer'), credential_url NULL)`
`checklist_items(id, registration_id, code, title, checked_at NULL, provenance)`
`event_favorites(user_id, event_id, saved_at)`
`personal_results(id, registration_id, duration_seconds NULL, place NULL, entered_at, official_source_url NULL)`
`calendar_items(id, user_id, event_id NULL, kind, starts_at, title, source)`
`resources(id, event_id NULL, title, type, url, provenance)`

Restricciones: `registrations.user_id` y `bib_records.registration_id` privados (RLS futura), claves foráneas, `source_registration_id` nunca generado localmente como falso ID oficial, URLs permitidas https, event dates interpretadas en `America/Panama`. Las categorías y distancias son tablas separadas, porque una carrera puede tener múltiples pruebas.

### Demo sin backend (fase 1)
`EventRecord` estático con evidencia y valores opcionales; `SavedEvent[]`; `SelfReportedParticipation[]` con `bibNumber?: string`; `ChecklistState`. Persistencia local con clave nueva/versionada para no tocar el estado previo de entrenamientos `zancada-demo-v1`.
Se debe soportar migración futura a Supabase, sin dependencia de Notion.

## 8. MVP revisado y razonado
**MUST HAVE (primera vertical end-to-end):**
- Home próxima carrera/estado vacío; catálogo 8–12 eventos curados; detalle con fuentes; guardar; registrar participación declarada; Mi Dorsal personal; calendario de evento; Fasty contextual por reglas; perfil y tour reescrito.
**SHOULD HAVE tras primera validación:**
- Checklist por evento, cuenta regresiva, vista de ruta (si datos públicos), enlace a mapas, retiro de kit, fotos/resultados enlazados, preparación.
- Se eleva **checklist + cuenta regresiva a la primera entrega funcional** cuando el esfuerzo lo permita: completan la propuesta de valor con poco coste.
**DEMO+:** Pasaporte de carreras completadas, resultado personal, badges sobrios, fotos únicamente con licencia, recomendaciones por distancia.
**FUTURO:** Registro oficial integrado, pagos, chip/QR emitido por organizador, verificación, portal organizadores, cronometraje, resultados oficiales, live tracking, API y notificaciones.

### Validación de la priorización
- **Requisito crítico:** que el usuario pueda terminar un flujo realista de «encontrar carrera → guardarla → declararse inscrito → ver dorsal personal».
- **Requisito legal/producto:** no crear una credencial que parezca apta para entrar a un evento.
- **Requisito de datos:** toda ficha enlaza al origen; vacíos son explícitos.
- **Regla de alcance:** si no mejora la preparación o experiencia alrededor del evento, diferir.

## 9. Recorrido guiado
Fasty presenta el valor de la plataforma, después se desplaza a: portada de carrera → catálogo → detalle → guardar → registrar participación declarada → Mi Dorsal → checklist → calendario → Fasty. Se detiene si no hay elemento visible, permite atrás/adelante/saltar y se puede repetir desde Ayuda.

Una guía no puede forzar inscripción real. Para la demo, el tour debe explicar la diferencia entre inscripción externa y registro personal.

## 10. Roadmap de implementación
- **I0 (documentación y datos):** ADR, blueprint, revisión Stitch, 8–12 eventos con enlaces reales y campos opcionales, tests de consistencia.
- **I1 (flujo):** Home orientada al evento, Eventos listado+detalle y fuente, guardados.
- **I2 (pasaporte):** formulario de participación declarada, dorsal sin QR, persistencia de demo, checklist básico.
- **I3 (asistente+guía):** Fasty de logística y onboarding por las nuevas pantallas.
- **I4 (calidad):** QA móvil Safari+Chromium, accesibilidad, estados, revalidación de fuentes, PR y revisión antes de producción.
- **I5 (futuro):** Supabase y conectores solo con reglas de privacidad/procedencia.

## 11. Métricas UX y criterios de calidad
- Tareas 1-4 completables sin explicaciones externas.
- Diferencia visual entre «guardado», «participación declarada» y «verificado» (inactivo).
- Ningún control de inscripción local sugiere que hubo pago.
- Móvil 375/390px: sin overflow; targets ≥44px; sticky bottom no tapa CTA; tour sin bloqueos.
- Narración Fasty legible en español; teclado, foco, `prefers-reduced-motion`.
- No se inventan mapas/horarios/clima/puestos/cupos; fechas vencidas se archivan en UI.

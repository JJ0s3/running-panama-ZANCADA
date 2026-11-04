# Catálogo curado de carreras Panamá — corte 2026-11-03

**Propósito:** datos públicos para la demo de ZANCADA, NO gestión ni respaldo del organizador.
**Regla:** incluir solo datos publicados; lo no confirmado permanece vacío. Las fuentes de inscripción/status pueden cambiar y deben revisarse justo antes de la carrera.

| ID / evento | Fecha local | Lugar publicado | Distancias publicadas | Fuente y tipo |
|---|---|---|---|---|
| `avon-2026` Carrera AVON Panamá | 2026-11-08 | Cinta Costera 3, Ciudad de Panamá | ruta aprox. 5K | [carreraavon.com](https://carreraavon.com/) (organizador) y [Papaya25](https://papaya25.info/events/carrera-avon) (inscripción) |
| `pafra-nov-2026` Campeonato PAFRA noviembre | 2026-11-15 | Clayton, Ciudad de Panamá | 2K, 3K, 5K, 8K, 10K | [calendario Papaya25](https://papaya25.info/calendario.php) (plataforma de inscripción) |
| `maraton-intl-2026` Maratón Internacional de Panamá | 2026-11-15 | Ciudad de Panamá; salida por confirmar | 42K, 21K, 10K, 5K y relevos | [web del evento](https://maratoninternacionaldepanama.com/) (organizador) y [condiciones](https://maratoninternacionaldepanama.com/terminos-y-condiciones/) |
| `futuro-david-2026` Carrera por el Futuro 5K | 2026-11-22 | Parque de las Madres, David, Chiriquí | 5K; 1K infantil figura en ficha técnica | [Stryd Panama](https://carreras.strydpanama.com/race/6d494596-07e0-4108-af73-8fdb57cca548) (registro de evento) |
| `christmas-night-2026` Christmas Night Run Fest | 2026-12-05 | Calzada de Amador, Panamá | 5K | [carrerasnocturnaspty.com](https://carrerasnocturnaspty.com/) (sitio del evento) |
| `dogs-2026` Christmas Running With Dogs (The Original) | 2026-12-06 | Mirador del Pacífico, Cinta Costera 1 | 3K | [calendario Panama Runners](https://panamarunners.com/site/index.php?s=cDBoMnBPLlJzZWVNbGxhRWMxbzJsMF8yc09vUnRlbk1lbHZFZTE%3D) (organizador) |
| `pafra-dec-2026` Campeonato PAFRA diciembre | 2026-12-06 | Clayton, Ciudad de Panamá | 2K, 3K, 5K, 8K, 10K | [calendario Papaya25](https://papaya25.info/calendario.php) (plataforma de inscripción) |
| `navidad-penonome-2026` Carrera Navideña Penonomé | 2026-12-13 | El Retorno, Penonomé, Coclé | 0.5K, 1K, 5K | [ficha Panama Runners](https://panamarunners.com/v2/?e=185) (organizador) |
| `santas-race-2026` Santa's Race 2026 | 2026-12-13 | Ciudad del Saber, Panamá | 5K | [santasrace.com](https://www.santasrace.com/) (evento/organizador) |
| `san-silvestre-2026` San Silvestre Despedida de Temporada | 2026-12-27 | Clayton, Ciudad del Saber | 5K, 1K | [calendario Panama Runners](https://panamarunners.com/site/index.php?s=cDBoMnBPLlJzZWVNbGxhRWMxbzJsMF8yc09vUnRlbk1lbHZFZTE%3D) (organizador) |

## Notas y evidencias clave
- **AVON:** el sitio del evento lista Panamá 8/nov y tarifa de US$20; Papaya25 indica 6:30am y ruta de 5.10km; se conserva distancia redondeada 5K en UI, sin confundir perfil GPX con trazado homologado.
- **PAFRA:** fechas/lugar/distancias provienen de la plataforma Papaya25. Falta página de ficha oficial individual y condiciones; no presumir inscripciones abiertas sin refrescar fuente.
- **Maratón internacional:** web principal confirma 15/nov y el sitio/condiciones mencionan distancias; anuncia cupos 42K agotados y mantenimiento parcial de pagos online. **No mostrar «inscripciones abiertas» de manera global**.
- **Carrera por el Futuro:** la ficha Stryd muestra tarifa US$20 en resumen y US$25 para 5K adultos en el texto técnico. Precio **por confirmar**; no mostrar ninguno como definitivo.
- **Christmas Night Run Fest 5/dic, Amador:** **no confundir** con «Christmas Night Run Jamón & Pavo 19/dic» de Panama Runners; son registros distintos con nombres similares.
- **Running with Dogs:** fecha/lugar/3K de Panama Runners; no se verificó precio, kit ni hora exacta de inicio en la ficha disponible.
- **Navideña Penonomé:** organizador diferencia convocatoria 06:00 y salidas 0.5K 06:30, 1K 06:40 y 5K 07:00; retiro de material 12/dic 11–17 h en Lucia Coffee House. Mantener horas por distancia.
- **Santa's Race:** organizador confirma 13/dic 07:00, 5K, Ciudad del Saber y US$10; activar número en sitio original según modalidad de compra. ZANCADA no puede generar/validar ese BIB.
- **San Silvestre:** fecha/lugar/distancias de calendario; fuente oficial de inscripción individual y precio no encontrados.

## Validación de procedencia
- `primary`: dominio del organizador o ficha del evento; `registration`: plataforma de inscripción; `aggregator`: calendario de terceros. Son clases de evidencia, **no badges oficiales**.
- Cada registro debe incluir `sourceUrl`, `sourceLevel` y `lastCheckedAt=2026-11-03`.
- `registrationUrl` solo cuando el sitio original lleve a un registro real; si se dispone únicamente de la ficha general, botón «Ver información externa».
- `status`, `routeUrl`, `kitPickup`, `elevation`, `weather`, `resultUrl`, `photoLicense` son opcionales. Nunca rellenarlos de forma ficticia sin indicador demo visible.

## Pendientes de investigación
- Verificar hora/modalidad y registro individual de PAFRA, Running With Dogs y San Silvestre.
- Confirmar precios de Stryd (discrepancia), kit y ruta de todos los eventos.
- Obtener fotografías con licencia o autorización por escrito. Se utilizará arte propio de ZANCADA hasta entonces.
- Revalidar cada evento al menos a 7 días de su fecha y antes de afirmar disponibilidad de inscripciones.

## Exclusiones deliberadas
- No incluimos `Tabogazo`: la convocatoria combina aguas abiertas, SUP/kayak/remo y no se ajusta al núcleo inicial de carreras a pie.
- No incluimos triatlones: su gestión requiere modelo multideporte y distancias segmentadas.
- No convertimos el contenido ilustrado de Stitch en registros reales.

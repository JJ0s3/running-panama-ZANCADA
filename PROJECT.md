# ZANCADA — Documento maestro

## Visión
Demo funcional y escalable para running en Panamá. Unir objetivo, plan, calendario, registro, progreso y descubrimiento local en un recorrido coherente.

## Alcance v0.1
Dashboard, perfil editable, objetivos, sesiones de entrenamiento, registro manual, métricas, eventos ficticios identificados, favoritos, asistente de reglas con confirmación y tour guiado.

## Fuera de alcance
GPS, Strava, Garmin, Apple Health, pagos, marketplace, comunidad, nutrición, diagnósticos y personalización clínica.

## Arquitectura
Monolito Next.js + TypeScript. Funciones de dominio aisladas en lib/, componentes en components/, datos demo en memoria/localStorage; migración a Supabase para cuentas reales en siguiente fase. Nunca guardar secretos en cliente.

## Ciclo de desarrollo
1. Definir historia y criterios de aceptación.
2. Diseñar flujo, componentes y estados.
3. Implementar cambios pequeños.
4. Probar lógica, integración y responsive.
5. Corregir y revisar accesibilidad/seguridad.
6. Crear commit y comprobar CI.
7. Registrar decisiones y preparar iteración.

## Criterio de terminado
La funcionalidad funciona con datos reales del estado de la demo, no solo tarjetas decorativas; pruebas y build pasan; los datos falsos están identificados; documentación actualizada.

## Próximo hito
Persistencia multiusuario con Supabase, catálogo curado y asistente de herramientas conectado a un proveedor configurable.

## Iteración v0.2 — Fasty y diseño propio
- Paleta aprobada: tinta, naranja y blanco hueso; ver `DESIGN.md`.
- Coach nombrado **Fasty**, con identidad final aún en exploración.
- Mejoras planeadas: inicio «qué hago hoy», sesiones con explicaciones, progreso basado en actividades reales, onboarding spotlight, iconografía Z propia.
- Investigación de planes y decisiones en [documentación](docs/README.md).
- Verificación requerida: pruebas unitarias, TypeScript, build y smoke test móvil. No confundir «CI correcto» con «UX validada».

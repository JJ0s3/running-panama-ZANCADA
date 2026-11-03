# Arquitectura técnica · estado actual

Monolito Next.js + TypeScript. Código de negocio en `lib/domain.ts`, interfaz principal en `components/runner-app.tsx`, estilos en `app/globals.css`. La demo actual usa `localStorage`: no es una cuenta sincronizada ni una base de datos remota.

## Próxima refactorización
Separar `features/profile`, `features/plans`, `features/activities`, `features/events`, `features/assistant` y `components/tour`. Mantener servicios puros y pruebas. Introducir Supabase solo después de una frontera de repositorios tipada.

## Modelo futuro
profiles, goals, plans, plan_sessions, activities, events, saved_events, resources, assistant_action_log. Relacionar actividades registradas con sesiones previstas y no asumir que kilómetros = porcentaje de plan.

## Seguridad y honestidad
Datos ficticios etiquetados, nada de secretos en el cliente, confirmación antes de acciones de asistente, reglas de entrenamiento conservadoras. No llamar «IA» al asistente por reglas.

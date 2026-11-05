# Despliegue de ZANCADA — operación actual

Actualizado: 2026-11-05.

## Producción

- **URL canónica:** https://runningpanamajj.vercel.app
- **GitHub:** https://github.com/JJ0s3/running-panama-ZANCADA
- **Rama de producción:** `main`
- **Vercel:** proyecto `runningpanamajj`, equipo `lossims`
- **Node.js:** 22.x, framework Next.js, raíz del proyecto `./`
- **Entrega Performance:** [PR #16](https://github.com/JJ0s3/running-panama-ZANCADA/pull/16), merge `c7ec547` del 2026-11-04.

La URL estable **no** es la URL de preview con identificadores aleatorios. No utilizar `?utm_source=chatgpt.com` ni otros parámetros de seguimiento al compartir: `https://runningpanamajj.vercel.app` es suficiente. Si en Safari aparece un enlace largo, abrir el dominio canónico directamente, no la URL temporal de revisión.

## Pipeline de desarrollo

1. Crear una rama desde `main` (`feat/`, `fix/` o `docs/`).
2. Cambiar código y documentación coherente con las funciones realmente presentes.
3. Validar `npm ci`, `npm run typecheck`, `npm test`, `npm run build`.
4. Abrir PR y revisar GitHub Actions, Vercel Preview y QA visual cuando corresponda.
5. Revisar móvil claro/oscuro, escritorio, guía, Eventos/Resultados/Dorsal/Fasty y estado local persistido.
6. Fusionar el PR aprobado a `main`; Vercel inicia automáticamente un despliegue Production.
7. **Verificar `READY`, SHA y alias `runningpanamajj.vercel.app`.** La compilación por sí sola no demuestra que el dominio apunte a la versión nueva.

## Comprobación posterior al despliegue

- Inicio carga con ambas variantes de tema.
- Logotipo oscuro integrado en cabecera, sin placa blanca; logotipo marino sobre claro.
- Catálogo ofrece lista y cuadrícula de dos columnas en teléfono.
- Resultados, mapas/GPX (si hay ruta), Fasty y Mi Dorsal funcionan.
- Guía conserva diez pasos, botones legibles y cierre operativo.
- `/apple-icon`, `/icon` sirven PNG; `/manifest.webmanifest` identifica `ZANCADA`.
- No hay desbordamiento en 320, 390, 430, 768 o 1280 px.
- Los enlaces a inscripción y resultados externos mantienen atribución.

## iPhone — añadir a pantalla de inicio

Abrir el dominio estable **en Safari** → Compartir → **Añadir a pantalla de inicio** → confirmar nombre **ZANCADA**. Para actualizar un acceso antiguo con icono anterior, quitar el acceso de la pantalla de inicio y añadirlo de nuevo (los datos locales del sitio pueden depender del contexto de almacenamiento; evitar borrar datos del sitio sin respaldo).

`app/apple-icon.tsx` genera el PNG del símbolo Z; `app/manifest.ts` define nombre corto y modo standalone.

## Dominios más cortos

El dominio `runningpanamajj.vercel.app` puede compartirse sin marca de ChatGPT. Para reducirlo aún más, vincular en Vercel un **dominio propio** (por ejemplo, `zancada.pa` solo si está registrado y disponible), configurar DNS y validación HTTPS. **No se debe anunciar como adquirido un dominio sin comprobar su titularidad y configuración**.

## Límites actuales

Este release no tiene cuentas ni base de datos de usuarios: el pasaporte, los favoritos y la preferencia de tema son locales al navegador. No hay variables de Supabase ni credenciales de IA para el flujo actual. Los dominios Preview pueden estar protegidos por las opciones de Vercel.

Historial: [CHANGELOG](../../CHANGELOG.md) · [Arquitectura](../architecture/OVERVIEW.md) · [README](../../README.md).

> **Histórico:** procedimiento de la primera demo. Para operación vigente consulte [docs/deployment/README.md](deployment/README.md).

# Despliegue y revisión de preview — ZANCADA

## Estado de la primera entrega

- Rama: `feat/demo-foundation-v0.1`
- PR: https://github.com/JJ0s3/running-panama-ZANCADA/pull/1
- Pipeline: `npm test`, `npm run typecheck`, `npm run build`
- Estado de datos: solo demo sintética en `localStorage`; sin credenciales ni variables de servidor.
- **No fusionar a `main` antes de comprobar la experiencia en la preview.**

## Conectar con Vercel

1. Iniciar sesión en el espacio de Vercel propietario del proyecto.
2. **Add New → Project → Import Git Repository**.
3. Elegir `JJ0s3/running-panama-ZANCADA`. Si no aparece, conceder al GitHub App de Vercel acceso a ese repositorio, desde GitHub → Settings → Applications → Installed GitHub Apps → Vercel → Configure.
4. Framework: **Next.js**; Root Directory: **./**; Node.js: **22.x**. No introducir claves secretas ni variables de Supabase en esta versión.
5. Seleccionar despliegue desde la rama `feat/demo-foundation-v0.1` en el dashboard de Vercel (o generar una preview del PR cuando el Git esté conectado). Evitar tratar el README de `main` como aplicación publicable.
6. Revisar el resultado de compilación y guardar la URL de preview en el PR.

## Smoke test en móvil (preferiblemente 360 × 800 y 390 × 844)

- [ ] No existe desplazamiento horizontal ni texto cortado.
- [ ] Los cuatro elementos de navegación inferior funcionan.
- [ ] Inicio muestra las métricas iniciales sin errores.
- [ ] Registrar 5 km / 30 min modifica kilómetros e historial.
- [ ] Recargar conserva los datos de demostración.
- [ ] Cambiar días de entrenamiento modifica las sesiones propuestas.
- [ ] Explorar filtra 5K, 10K y Trail correctamente.
- [ ] Guardar un evento ficticio actualiza su estado sin inventar inscripción.
- [ ] El asistente consulta progreso y agenda desde el estado actual.
- [ ] El asistente solo modifica el estado después de confirmar.
- [ ] El recorrido guiado abre y puede cerrarse.
- [ ] Pueden usarse todas las acciones con teclado y las etiquetas son legibles.
- [ ] No aparecen errores inesperados en consola.

## Prueba de escritorio

- [ ] A 1280 px funciona la navegación lateral.
- [ ] Las tarjetas aprovechan el espacio sin perder jerarquía.
- [ ] La interfaz no muestra errores de hidratación en Next.js.

## Criterio de aprobación

No fusionar por el simple hecho de que compile. Cerrar los defectos críticos del flujo principal; dejar constancia de los problemas no bloqueantes y de las capturas móvil/escritorio.

## Próximos incrementos

1. Persistencia multiusuario con Supabase y un modo demo separado.
2. Entrenamientos asociados a sesiones y planes validados.
3. Asistente con herramientas tipadas y parámetros explícitos.
4. Eventos reales curados, fuentes verificables y enlaces oficiales.

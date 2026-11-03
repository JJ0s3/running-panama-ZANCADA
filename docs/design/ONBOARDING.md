# Tour de ZANCADA guiado por Fasty

## Primera visita
Mostrar bienvenida contextual automáticamente en primera visita a la demo. Puede omitirse y relanzarse desde Perfil/Ayuda. No usar el botón «Recorrido guiado» en el header.

## Pasos
0. Introducción de Fasty: qué aporta ZANCADA.
1. Objetivo actual: qué meta estamos preparando.
2. Entrenamiento hoy: qué hacer, por qué y cómo debe sentirse.
3. Plan semanal: correr, recuperación y descansos.
4. Registro rápido: guardar datos reales.
5. Progreso: comprender datos e hitos sin exagerar.
6. Explorar Panamá: distinguir claramente eventos demo de eventos verificados.
7. Aprende: recursos relacionados con términos de la sesión (cuando exista el módulo).
8. Perfil: preferencias y reinicio del recorrido.
9. Fasty: preguntar y confirmar acciones antes de modificar datos.

## Diseño técnico propuesto
Estado del tour: `onboardingVersion`, `step`, `open`; persistencia local inicial; nombres de destino mediante `data-tour-id`; enfoque visual con overlay y portal; `scrollIntoView({behavior:'smooth',block:'center'})` tras navegación; reposition con medición del rectángulo y viewport. Control de foco, Escape, omitir y reduced motion. Evitar saltos bruscos. 
Asegurar que en móvil el panel explicativo no tape el objetivo enfocado. No bloquear al usuario ni simular guardados.
## Aceptación
Activación primera visita, opción omitir, reabrir desde perfil, foco visible, navegación por teclado, 360px, 390px y desktop.

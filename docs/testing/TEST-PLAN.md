# Plan de pruebas

## Funcional
- [ ] Guardar actividad cambia métricas y persiste tras recarga.
- [ ] Plan muestra descansos explícitos y detalles legibles.
- [ ] Fasty utiliza registro real y confirma toda acción mutadora.
- [ ] Eventos demo se identifican claramente.
- [ ] Onboarding de primera visita, omitir y reiniciar.

## Responsive y accesibilidad
- [ ] 360x800, 390x844, 768px y desktop 1280px.
- [ ] Orden de tabulación, foco visible y controles >=44px.
- [ ] Contraste de texto y etiquetas de iconos.
- [ ] Reduced motion, panel tour sin tapar controles.

## CI
`npm test` / `npm run typecheck` / `npm run build`. No declarar completas las pruebas visuales sin inspección del navegador.

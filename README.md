# ZANCADA 🏁

**El pasaporte digital del corredor en Panamá.**

Descubre carreras, consulta sus rutas y resultados en las fuentes originales, prepara tu participación con Fasty y conserva tus experiencias en un pasaporte personal. Diseñada para **iPhone, móviles y escritorio**, con modos claro y oscuro.

[**🌐 Abrir ZANCADA**](https://runningpanamajj.vercel.app) · [**📖 Guía de usuario**](docs/GUIA_USUARIO_ZANCADA_V2.md) · [**🧪 Pruebas**](docs/testing/TEST-PLAN.md) · [**🚀 Despliegue**](docs/deployment/README.md)

> **Estado:** publicada en producción mediante Vercel desde `main`. Última entrega de identidad deportiva: [PR #16](https://github.com/JJ0s3/running-panama-ZANCADA/pull/16), fusionado el 4 de noviembre de 2026. Las futuras correcciones se registran mediante PR y el [CHANGELOG](CHANGELOG.md).

## Qué puedes hacer

| Sección | Función |
| --- | --- |
| **Inicio** | Próxima carrera, métricas del catálogo y accesos rápidos |
| **Eventos** | Catálogo curado, búsqueda y filtros; vista de lista o cuadrícula; fichas, mapas y enlaces externos |
| **Resultados** | Referencias de resultados publicados por terceros, con filtros y atribución |
| **Preparación · Fasty** | Orientación contextual, checklist y recursos para el día de carrera |
| **Mi Dorsal** | Carreras guardadas, participación autodeclarada y pasaporte personal |

**Importante:** ZANCADA **no inscribe en carreras, no acredita participaciones, no genera dorsales oficiales, no cronometra y no proporciona seguimiento GPS**. La inscripción y los resultados oficiales se consultan con cada organizador. El estado personal se guarda localmente en el navegador; **no existe cuenta ni sincronización en la nube** en esta versión. Fasty es asistencia contextual de preparación; no se debe presentar como un servicio de IA remota.

## Experiencia visual

- Tema **oscuro Performance** (grafito, naranja y azul eléctrico) y **claro**, con preferencia local persistente.
- Identidad ZANCADA en la cabecera y símbolo Z para el acceso de pantalla de inicio de iOS.
- Cinco destinos visibles; navegación lateral en escritorio y barra inferior compacta en móvil.
- Fotografías editoriales identificadas como ilustrativas; mapas GPX cuando existe ruta documentada.
- Guía interactiva de **10 paradas**, presentada con Fasty.

## Stack técnico

| Capa | Tecnologías |
| --- | --- |
| Aplicación | Next.js 16 (App Router), React 19, TypeScript |
| Estilos y UI | CSS por capas, Lucide, fuentes deportivas y modos de color |
| Eventos y estado | Catálogo tipado y `localStorage` (sin backend de cuentas) |
| Mapas | Leaflet, OpenStreetMap, GPX y endpoint interno de rutas |
| Calidad | Node test runner, TypeScript, Playwright en GitHub Actions |
| Distribución | Vercel, dominio público estable, manifest PWA y Apple touch icon |

## Ejecutar localmente

Requiere **Node.js 22** y npm.

```bash
git clone https://github.com/JJ0s3/running-panama-ZANCADA.git
cd running-panama-ZANCADA
npm ci
npm run dev
```

Abrir `http://localhost:3000`. Para validar:

```bash
npm run typecheck
npm test
npm run build
```

No se requieren credenciales para el flujo actual. Ver `package.json` y `.env.example` para las opciones efectivamente soportadas.

## Organización del código

```text
app/                 App Router, estilos, manifest, iconos y API de rutas
components/          Pantallas, Fasty, guía, visor de rutas y resultados
lib/                 Catálogo, dominio, GPX, resultados y lógica pura
public/branding/     Logotipos y símbolo oficiales en formato vectorial
tests/               Pruebas de regresión
scripts/             QA visual automatizado y auditorías
.github/workflows/   CI, build y revisiones de UI
docs/                Producto, arquitectura, decisiones y publicación
```

La pantalla principal activa es `components/event-passport-app.tsx`. Se conservan componentes y CSS históricos de etapas anteriores; su presencia no significa que sean rutas o servicios activos. Consultar [arquitectura vigente](docs/architecture/OVERVIEW.md).

## Publicación y control de cambios

1. Crear rama desde `main` (por ejemplo, `fix/`, `feat/` o `docs/`).
2. Mantener el cambio limitado, documentarlo y abrir un pull request.
3. Revisar `npm run typecheck`, `npm test`, `npm run build` y QA visual cuando corresponda.
4. Usar la URL temporal de **Preview** para validar; fusionar únicamente al aprobarse.
5. El merge en `main` activa el despliegue **Production** de Vercel en [runningpanamajj.vercel.app](https://runningpanamajj.vercel.app); verificar el SHA del deployment.

No confundir un enlace temporal `runningpanamajj-<id>-lossims.vercel.app` con la URL pública estable.

### Documentación

[Visión del producto](PROJECT.md) · [Especificación v2](docs/product/ZANCADA_V2_ESPECIFICACION.md) · [Arquitectura](docs/architecture/OVERVIEW.md) · [Diseño Performance](docs/design/ZANCADA_PERFORMANCE_EDITION.md) · [Historial](CHANGELOG.md) · [Guía de despliegue](docs/deployment/README.md).

---

**Estado actual:** aplicación web publicada, centrada en carreras y pasaporte personal. Las extensiones de cuentas, inscripción, pagos o resultados oficiales son propuestas futuras, no funciones existentes.

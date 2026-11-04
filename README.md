# ZANCADA · Pasaporte del corredor 🇵🇦

**Descubre la carrera. Conoce la ruta. Prepárate. Guarda tu historia.**

ZANCADA v2 es una aplicación web *mobile-first* para descubrir carreras en Panamá, consultar rutas y referencias de resultados, organizar preparativos y conservar un pasaporte personal del corredor.

> **Estado:** versión v2 validada en la PC del proyecto, aún **sin publicar desde la rama local** `chore/zancada-quality-gates`. Esta rama documental no contiene los nuevos componentes de la aplicación.

## Cinco espacios

| Sección | Qué puedes hacer |
|---|---|
| **Inicio** | Ver la carrera destacada, tus guardados y accesos relevantes |
| **Eventos** | Buscar eventos, filtrar distancias, revisar su ficha y consultar mapas integrados |
| **Resultados** | Filtrar referencias de carreras y abrir sus resultados en la fuente |
| **Preparación** | Consultar con Fasty, revisar checklist y recursos para el día de carrera |
| **Mi dorsal** | Registrar una participación declarada y tu número, si lo conoces |

**Importante:** ZANCADA no cobra inscripciones, no certifica resultados, no emite dorsales oficiales y no realiza seguimiento GPS. Las fuentes externas se atribuyen y pueden cambiar. Los datos del pasaporte se guardan en tu navegador, no en una cuenta.

## Identidad visual

Paleta deportiva panameña: marino `#0D1D38`, rojo `#D72638`, dorado `#D9901A`, azul claro `#E6EEFF` y superficies `#F4F6FA`. La versión móvil tiene marca centrada, cinco tarjetas de navegación estables y fondo difuminado. Referencias: Stitch suministrado por el proyecto y [Papaya25 Resultados](https://papaya25.info/resultados.php), sin afiliación.

## Desarrollo

- Next.js 16 / React 19 / TypeScript / CSS; Lucide.
- Mapas integrados con Leaflet y OpenStreetMap; rutas GPX mediante una API del proyecto.
- Node.js 22.x usado en CI/Vercel (en desarrollo local se comprobó con Node.js 26).
- Pruebas: `npm run typecheck`, `npm test`, `npm run build`.

```bash
npm install
npm run dev
```

**Documentación:** [Especificación v2](docs/product/ZANCADA_V2_ESPECIFICACION.md) · [Guía de usuario](docs/GUIA_USUARIO_ZANCADA_V2.md) · [Publicación](docs/RELEASE_ZANCADA_V2.md) · [Cambios](CHANGELOG.md).

**Código:** [JJ0s3/running-panama-ZANCADA](https://github.com/JJ0s3/running-panama-ZANCADA)  
**Publicación prevista:** https://runningpanamajj.vercel.app — verificar SHA desplegada; un enlace existente no acredita que v2 esté en producción.

# Entrega a GitHub y Vercel · ZANCADA v2

**Objetivo:** publicar exactamente los archivos validados en la computadora, incluidos el ajuste móvil y esta documentación.

## Situación inicial

- Local: `C:\Users\jm908\Projects\running-panama-ZANCADA`, rama `chore/zancada-quality-gates`, con cambios sin commit.
- Remoto: `JJ0s3/running-panama-ZANCADA`; rama `main` conserva una versión anterior.
- Esta rama `docs/zancada-v2-manual-20261104` **contiene solo documentos**. No publiquen todavía la versión v2 desde ella.
- Proyecto Vercel: `runningpanamajj` / equipo LOSSIMS; objetivo `https://runningpanamajj.vercel.app/`.

## Integración segura desde PowerShell

```powershell
cd "$HOME\Projects\running-panama-ZANCADA"
git status -sb
git fetch origin
git cherry-pick <SHA_DEL_COMMIT_DOCUMENTAL>
```

**Importante:** si se modificó README o alguno de los documentos locales, el cherry-pick puede requerir resolver conflictos; no usar `reset --hard` ni `--force`.

Verificar que `app/zancada-mobile-fix.css`, `app/tactile-overhaul.css`, `components/results-hub.tsx`, `components/preparation-hub.tsx` y `components/route-viewer.tsx` estén presentes.

```powershell
npm run typecheck
npm test
npm run build
git status -sb
git diff --check
git add README.md CHANGELOG.md docs app components lib tests package.json package-lock.json tsconfig.json
git diff --cached --stat
git commit -m "feat: ZANCADA v2 con resultados rutas preparación y documentación"
git push -u origin chore/zancada-quality-gates
```

Revisa el `git diff --cached --stat` antes de confirmar. No incluir `.env*`, `.next`, `node_modules` o credenciales. Si el cherry-pick creó su propio commit, el segundo commit incluirá solo el código local.

## PR y despliegue

1. Crear PR **`chore/zancada-quality-gates` → `main`**.
2. Verificar CI, listado de archivos y vista previa de Vercel (si hay cuota).
3. Probar 320, 375, 390, 430 px, tableta y escritorio; comprobar logo centrado, cinco botones, fondo difuminado, mapas, resultados, Fasty y dorsal.
4. Después del QA, fusionar el PR. Vercel debería generar producción desde `main`.
5. Comprobar dominio, SHA desplegada, estados de red y consola. Si la cuota de Vercel bloquea la compilación, **no declarar éxito**.

## Recuperación

Si algo falla, detener el release y conservar la rama local. Revisar checks y logs, revertir por PR si hubo merge y usar rollback del despliegue cuando corresponda. Nunca sobrescribir `main` con un commit remoto que no contenga los cambios locales.

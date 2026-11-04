import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('components/event-passport-app.tsx');
const theme=read('app/option-b.css');
const page=read('app/page.tsx');
const model=read('lib/event-passport.ts');

test('User-supplied Opción B overrides previous prototype visual layers',()=>{
 assert.ok(page.indexOf("import './option-b.css'")>page.indexOf("import './tactile-overhaul.css'"));
 assert.match(theme,/#F5F1E8/);
 assert.match(theme,/#FF6B2C/);
 assert.match(theme,/#1E4FD8/);
 assert.match(theme,/--zb-font:'Archivo'/);
});

test('Actual GPS routes remain inside ZANCADA',()=>{
 assert.match(app,/import RouteViewer from '\.\/route-viewer'/);
 assert.match(app,/<RouteViewer event=\{selectedEvent\}/);
 assert.match(read('components/route-viewer.tsx'),/L\.polyline\(route\.points/);
 assert.match(read('lib/route-sources.ts'),/papaya25\.info\/events\/carrera-avon\/routes\/15\/gpx/);
 assert.match(read('app\/api\/race-route\/route.ts'),/routeFor\(id,distance\)/);
});

test('Fasty is still in Plan and not displayed as a generic AI-led home block',()=>{
 assert.match(app,/import PreparationHub/);
 assert.match(app,/<PreparationHub event=\{eventForFasty\}/);
 assert.match(app,/\['fasty','Plan',Activity\]/);
 assert.doesNotMatch(app,/className="ep-fasty-strip"/);
});

test('No illustrative event photos are falsely attributed; registration remains external',()=>{
 assert.doesNotMatch(app,/images\.unsplash\.com/);
 assert.match(app,/Ya me inscribí afuera/);
 assert.match(model,/distancesKm:\[5,10\]/);
 assert.match(model,/Fuentes discrepan/);
});

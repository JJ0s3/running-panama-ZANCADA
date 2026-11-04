import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('components/event-passport-app.tsx');
const theme=read('app/tactile-overhaul.css');
const page=read('app/page.tsx');
const base=read('app/event-passport.css');
const model=read('lib/event-passport.ts');
test('Stitch Tactile Light is the active theme and preserves event-first design',()=>{
 assert.ok(page.indexOf("import './tactile-overhaul.css'")>page.indexOf("import './avon-inspiration.css'"));
 assert.match(base,/Space\+Grotesk/);
 assert.match(base,/Hanken\+Grotesk/);
 assert.match(theme,/#D72638/);
 assert.match(theme,/#0D1D38/);
 assert.match(theme,/#E6EEFF/);
 assert.match(theme,/#F4F6FA/);
});
test('Actual GPS routes appear inside the app, not external-only redirection',()=>{
 assert.match(app,/import RouteViewer from '\.\/route-viewer'/);
 assert.match(app,/<RouteViewer event=\{selectedEvent\}/);
 assert.match(app,/className="st-home-metrics"/);
 assert.match(read('components/route-viewer.tsx'),/L\.polyline\(route\.points/);
 assert.match(read('lib/route-sources.ts'),/papaya25\.info\/events\/carrera-avon\/routes\/15\/gpx/);
 assert.match(read('app\/api\/race-route\/route.ts'),/routeFor\(id,distance\)/);
});
test('Fasty remains focused within preparation, not elevated in the home',()=>{
 assert.match(app,/import PreparationHub/);
 assert.match(app,/<PreparationHub event=\{eventForFasty\}/);
 assert.match(app,/\['fasty','Preparación',Footprints\]/);
 assert.doesNotMatch(app,/className="ep-fasty-strip"/);
});
test('Photos are still illustrative and registration remains external',()=>{
 assert.match(app,/images\.unsplash\.com/);
 assert.match(app,/Fotografía ilustrativa/);
 assert.match(app,/Ya me inscribí afuera/);
 assert.match(model,/distancesKm:\[5,10\]/);
 assert.match(model,/Fuentes discrepan/);
});

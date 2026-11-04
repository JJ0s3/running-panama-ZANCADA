import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=read('app/page.tsx'),css=read('app/palette-refresh.css');
const app=read('components/event-passport-app.tsx');
const tour=read('components/event-tour.tsx');
const results=read('components/results-hub.tsx');
test('New palette overrides the old colors last without replacing the page component',()=>{
 assert.match(page,/import UltraRunner/);
 assert.match(page,/import EventPassportApp/);
 assert.ok(page.indexOf("import './palette-refresh.css'")>page.indexOf("import './zancada-mobile-fix.css'"));
 assert.match(page,/return <EventPassportApp\/>/);
 for(const color of ['#F5F1E8','#FF6B2C','#1E4FD8','#15171C','#5F6168','#E9E3D6','#E8EDFB'])assert.ok(css.includes(color),color);
 for(const obsolete of ['#D72638','#B20024','#7550D5','#5A37AF','#B6102E'])assert.ok(!css.toUpperCase().includes(obsolete.toUpperCase()),obsolete);
});
test('Body still uses existing readable font, while Archivo displays and DM Mono labels are targeted',()=>{
 assert.match(css,/--z-archivo:'Archivo'/);
 assert.match(css,/--z-mono:'DM Mono'/);
 assert.match(css,/\.ep-home-heading h1/);
 assert.match(css,/\.st-home-metrics button strong/);
 assert.match(css,/\.ep-home-date/);
 assert.doesNotMatch(css,/\.ep-app\s*\{\s*font-family:/);
});
test('Original photographic home, menus, results and full ten-step guided tour remain',()=>{
 assert.match(app,/images\.unsplash\.com/);
 assert.match(app,/className="za-hero-photo"/);
 assert.match(app,/className="st-home-metrics"/);
 assert.match(app,/className="za-journey"/);
 assert.match(app,/className="ep-sidebar"/);
 assert.match(app,/className="ep-bottom-nav"/);
 assert.match(app,/ResultsPreview/);
 assert.match(app,/className="ep-event-card za-event-card"/);
 assert.match(tour,/target:'upcoming'/);
 assert.match(tour,/target:'calendar'/);
 assert.match(tour,/target:'fasty'/);
 assert.equal((tour.match(/target:'/g)||[]).length,10);
 assert.match(tour,/scrollTo\(\{top,behavior:/);
});
test('Maps, assistant and local personal bib retain their connections',()=>{
 assert.match(app,/<RouteViewer event=\{selectedEvent\}/);
 assert.match(app,/<PreparationHub event=\{eventForFasty\}/);
 assert.match(app,/Ya me inscribí afuera/);
 assert.match(app,/className="ep-bib-object"/);
 assert.match(results,/filterResultCatalog/);
 assert.match(results,/Consultar en Papaya25/);
});
test('Existing mobile dock and spotlight have only color and font overrides, no size changes',()=>{
 assert.match(css,/\.ep-bottom-nav button\.active/);
 assert.match(css,/\.st-tour-chapters button.active/);
 assert.match(css,/\.ep-tour-outline/);
 assert.doesNotMatch(css,/\.ep-bottom-nav\s*\{[^}]*\b(height|grid-template-columns|left|right|bottom|padding)\s*:/s);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const page=read('app/page.tsx');
const css=read('app/performance-dark.css');
const app=read('components/event-passport-app.tsx');
const tour=read('components/event-tour.tsx');
const originalResults=read('components/results-hub.tsx');

test('Performance visual layer loads last, keeps original ZANCADA v2 pages',()=>{
 assert.ok(page.indexOf("import './performance-dark.css';")>page.indexOf("import './zancada-mobile-fix.css';"));
 assert.match(page,/return <EventPassportApp\/>/);
 for(const color of ['#080D15','#FF721F','#00C8FF','#F3F7FF','#324358'])assert.ok(css.includes(color),color);
 assert.match(css,/--zp-display:'Racing Sans One'/);
 assert.match(css,/--zp-condensed:'Barlow Condensed'/);
 assert.match(css,/--zp-body:'Barlow'/);
});

test('Navigation keeps five original views and changes icons without changing actions',()=>{
 for(const fragment of ["['inicio','Inicio',House]","['eventos','Eventos',CalendarDays]","['resultados','Resultados',Clock3]","['fasty','Preparación',Activity]","['dorsal','Mi dorsal',Ticket]"]){
  assert.ok(app.includes(fragment),fragment);
 }
 assert.match(app,/onClick=\{\(\)=>goto\(key\)\}/);
 assert.match(css,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
 assert.match(css,/\.ep-bottom-nav button\.active svg/);
 assert.match(css,/border-radius:999px!important/);
 assert.match(css,/\.ep-logo b\{display:none!important\}/);
});

test('The photograph-led home and demo functionality remain intact',()=>{
 assert.match(app,/editorialPhotos=\[/);
 assert.match(app,/className="za-hero-photo"/);
 assert.match(app,/className="st-home-metrics"/);
 assert.match(app,/className="za-journey"/);
 assert.match(app,/className="ep-sidebar"/);
 assert.match(app,/className="ep-bottom-nav"/);
 assert.match(app,/<RouteViewer event=\{selectedEvent\}/);
 assert.match(app,/<PreparationHub event=\{eventForFasty\}/);
 assert.match(app,/Ya me inscribí afuera/);
 assert.match(app,/className="ep-bib-object"/);
 assert.match(originalResults,/filterResultCatalog/);
 assert.match(originalResults,/Consultar en Papaya25/);
});

test('Fasty is recolored as a sporty character; no new AI or external data pipeline',()=>{
 assert.match(app,/function FastyFace\(\)/);
 assert.match(css,/\.ep-avatar::before/);
 assert.match(css,/\.ep-avatar::after/);
 assert.match(css,/\.ep-fasty-header/);
 assert.match(css,/\.ep-fasty-chat/);
 assert.match(css,/\.ep-fasty-form/);
 assert.doesNotMatch(page,/performance-metrics|generated-fake-plan|training-ai-api/);
});

test('The original 10 stop guide is preserved unmodified',()=>{
 assert.equal((tour.match(/target:'/g)||[]).length,10);
 for(const key of ['intro','upcoming','catalog','event-detail','fasty']) assert.ok(tour.includes("target:'"+key+"'"));
 assert.match(tour,/zancada-event-tour-v1/);
 assert.match(tour,/scrollTo\(\{top,behavior:/);
 assert.match(css,/\.st-tour-chapters button\.active/);
 assert.match(css,/\.ep-tour-outline/);
});

test('Dark theme supports desktop side rail, mobile bottom dock, reduced motion and focus',()=>{
 assert.match(css,/@media\(min-width:961px\)/);
 assert.match(css,/@media\(max-width:960px\)/);
 assert.match(css,/@media\(max-width:390px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/:focus-visible/);
 assert.match(css,/env\(safe-area-inset-bottom\)/);
});

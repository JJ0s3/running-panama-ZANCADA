import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('components/event-passport-app.tsx');
const page=read('app/page.tsx');
const css=read('app/option-b.css');
const home=read('components/option-b-home.tsx');
const model=read('lib/event-passport.ts');
const tour=read('components/event-tour.tsx');

test('Opción B is the last active CSS layer and matches the supplied color tokens',()=>{
 assert.ok(page.indexOf("import './option-b.css'")>page.indexOf("import './zancada-mobile-fix.css'"));
 for(const hex of ['#F5F1E8','#FF6B2C','#1E4FD8','#15171C','#5F6168','#E9E3D6'])assert.ok(css.includes(hex),hex);
 assert.match(css,/Archivo:wdth,wght/);
 assert.match(css,/DM\+Mono/);
 assert.match(css,/--zb-radius-hero:28px/);
 assert.match(css,/--zb-radius-card:20px/);
});

test('New home has one mango hero, countdown, three real segmented views and race rows',()=>{
 assert.match(app,/import OptionBHome from '\.\/option-b-home'/);
 assert.match(app,/<OptionBHome featured=\{featured\}/);
 assert.match(home,/className="zb-featured"/);
 assert.match(home,/className="zb-featured-number"/);
 assert.match(home,/daysToEvent\(featured.date\)/);
 assert.match(home,/role="tablist"/);
 for(const label of ['Próximas','Resultados','Guardadas'])assert.ok(home.includes(label));
 assert.match(home,/RESULT_CATALOG\.slice\(0,4\)/);
 assert.match(home,/savedIds\.includes/);
 assert.doesNotMatch(home,/za-journey|st-home-metrics|images\.unsplash/);
});

test('The new navigation has five accessible icon targets and a floating ink pill',()=>{
 for(const tab of ["['inicio','Inicio',House]","['eventos','Eventos',CalendarDays]","['resultados','Resultados',Clock3]","['fasty','Plan',Activity]","['dorsal','Dorsal',Ticket]"])assert.ok(app.includes(tab),tab);
 assert.match(app,/aria-label=\{label\} aria-current=/);
 assert.match(css,/grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
 assert.match(css,/background:var\(--zb-ink\)!important/);
 assert.match(css,/button\.active svg/);
 assert.match(css,/env\(safe-area-inset-bottom\)/);
});

test('Generic race photos are removed while routes, sources, Fasty and passport persist',()=>{
 assert.doesNotMatch(app,/images\.unsplash\.com|za-detail-event-photo|za-race-photo/);
 assert.match(app,/className="ep-detail-cover zb-detail-cover"/);
 assert.match(app,/<RouteViewer event=\{selectedEvent\}/);
 assert.match(app,/<PreparationHub event=\{eventForFasty\}/);
 assert.match(app,/Ya me inscribí afuera/);
 assert.match(app,/className="ep-bib-object"/);
 assert.match(model,/Fuentes discrepan/);
});

test('First-use onboarding is three visual stops and can still be skipped or replayed',()=>{
 assert.equal((tour.match(/target:'/g)||[]).length,3);
 assert.match(tour,/target:'intro'/);
 assert.match(tour,/target:'catalog'/);
 assert.match(tour,/target:'fasty'/);
 assert.match(tour,/scrollTo\(\{top,behavior:/);
 assert.match(tour,/zancada-event-tour-v1/);
});

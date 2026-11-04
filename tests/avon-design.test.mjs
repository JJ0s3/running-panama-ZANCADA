import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const app=read('components/event-passport-app.tsx');
const style=read('app/avon-inspiration.css');
const base=read('app/event-passport.css');
const page=read('app/page.tsx');
const model=read('lib/event-passport.ts');
test('the active UI loads original AVON-inspired design after the base stylesheet',()=>{
 assert.ok(page.indexOf("import './avon-inspiration.css'")>page.indexOf("import './event-passport.css'"));
 assert.match(base,/fonts.googleapis.com\/css2\?family=Archivo\+Black/);
 assert.match(base,/family=Nunito\+Sans/);
 assert.match(style,/--za-display:'Archivo Black'/);
 assert.match(style,/--ep-body:'Nunito Sans'/);
});
test('ZANCADA retains its violet and yellow identity',()=>{
 assert.match(style,/--za-violet:#7550d5/);
 assert.match(style,/--za-yellow:#ffd85a/);
 assert.doesNotMatch(style,/#[Ff][Ff]1470/);
});
test('human photography is licensed-source illustrative, not passed off as local events',()=>{
 assert.match(app,/images\.unsplash\.com/);
 assert.match(app,/fotograf[ií]a ilustrativa/i);
 assert.match(app,/Fotografía ilustrativa/);
 assert.match(app,/credit:'Mike Cox'/);
 assert.match(app,/credit:'Justin Lagat'/);
 assert.match(app,/credit:'Miguel A Amutio'/);
 assert.doesNotMatch(app,/avon-logo|fepat-logo|chip RFID/i);
});
test('home includes interactive icon-led 3-step instruction cards',()=>{
 assert.match(app,/za-journey-grid/);
 assert.match(app,/Descubre/);
 assert.match(app,/Prepárate/);
 assert.match(app,/Guarda tu historia/);
 assert.match(app,/onClick=\{\(\)=>goto\('eventos'\)\}/);
 assert.match(app,/onClick=\{\(\)=>goto\('dorsal'\)\}/);
});
test('AVON Panama catalog corrected from official site: 5K and 10K, kit and external registration',()=>{
 assert.match(model,/id:'avon-2026'/);
 assert.match(model,/distancesKm:\[5,10\]/);
 assert.match(model,/registrationUrl:'https:\/\/sports\.ipuclub\.com\/login'/);
 assert.match(model,/kitInfo:'Retiro de kit anunciado/);
});

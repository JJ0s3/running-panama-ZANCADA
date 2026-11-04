import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const tour=read('components/guided-tour.tsx');
const app=read('components/ultraviolet-runner.tsx');
const plan=read('components/plan-experience.tsx');
const spatial=read('components/spatial-zancada.tsx');
const layout=read('app/layout.tsx');
const mobile=read('app/iphone-polish.css');
const stops=['today','fasty','goal','register','progress','calendar','events','coach','profile'];
test('the guide queries real ZANCADA anchors rather than the renamed CSS prefix',()=>{
 assert.match(tour,/data-tour-id=/);
 assert.doesNotMatch(tour,/data-zt-id=/);
 for(const id of stops)assert.ok((app+plan+spatial).includes('data-tour-id="'+id+'"'),'Missing visible tour anchor: '+id);
});
test('tour keeps measuring after tab navigation',()=>{
 assert.match(tour,/setInterval\(/);
 assert.match(tour,/getBoundingClientRect\(/);
 assert.match(tour,/addEventListener\('scroll'/);
 assert.match(tour,/onNavigate\(current\.page\)/);
});
test('legacy orange stylesheet is not loaded in the active ultraviolet app',()=>{
 assert.doesNotMatch(layout,/\.\/globals\.css/);
 assert.match(mobile,/\.zt-spotlight/);
 assert.match(mobile,/\.uv-app h1/);
});
test('mobile navigation and plan statistics reflow for iPhone',()=>{
 assert.match(mobile,/max-width:760px/);
 assert.match(mobile,/\.uv-app \.uv-dock button span/);
 assert.match(mobile,/\.uv-app \.zi-week-stats\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

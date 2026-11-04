import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const load=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const entry=load('app/page.tsx');
const app=load('components/ultraviolet-runner.tsx');
const spatial=load('components/spatial-zancada.tsx');
const css=load('app/spatial-edition.css');
test('spatial design is mounted last without replacing app domain',()=>{
 assert.match(entry,/import '\.\/spatial-edition\.css'/);
 assert.match(app,/<SpatialHero/);
 assert.match(app,/<FastyArtifact/);
 assert.match(app,/PlanExperience/);
 assert.match(app,/zancada-demo-v1/);
});
test('Fasty onboarding anchors survive component extraction',()=>{
 for(const id of ['today','fasty'])assert.ok(spatial.includes('data-tour-id="'+id+'"'),'Missing '+id);
 for(const id of ['goal','register','progress'])assert.ok(app.includes('data-tour-id="'+id+'"'),'Missing '+id);
});
test('spatial edition uses system typography and respects reduced motion',()=>{
 assert.match(css,/-apple-system/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/--sp-gold:#ffda64/);
 assert.match(css,/sp-object-main/);
});
test('editorial metric layout collapses without fixed desktop widths',()=>{
 assert.match(css,/\.uv-app \.sp-metrics/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/grid-template-columns:1fr 1fr/);
});

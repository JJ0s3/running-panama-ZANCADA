import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const load=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const page=load('app/page.tsx'),runner=load('components/ultraviolet-runner.tsx');
const home=load('components/running-focus.tsx'),css=load('app/running-first.css');
test('running-first design loads without experimental spatial assets',()=>{
 assert.match(page,/import '\.\/running-first\.css'/);
 assert.doesNotMatch(page,/spatial-edition\.css/);
 assert.doesNotMatch(runner,/SpatialHero|FastyArtifact|SpatialFastyLanding/);
 assert.match(runner,/<RunningHero/);
 assert.match(runner,/<FastyFace\/>/);
 assert.match(runner,/<PlanExperience/);
});
test('running identity foregrounds training and a track',()=>{
 assert.match(home,/TU PRÓXIMA SESIÓN/);
 assert.match(home,/run-track-svg/);
 assert.match(home,/MINUTOS/);
 assert.match(home,/data-tour-id="today"/);
 assert.match(home,/onPlan/);
});
test('Fasty old mark is restored and no green emoji ornament is rendered',()=>{
 assert.match(runner,/function FastyFace/);
 assert.match(runner,/run-fasty-aura/);
 assert.match(runner,/run-coach-avatar/);
 assert.doesNotMatch(runner,/✳|SpatialFastyLanding/);
 assert.doesNotMatch(home,/✳/);
});
test('mobile screens use running typography and responsive components',()=>{
 assert.match(css,/run-hero-visual\{order:-1/);
 assert.match(css,/\.uv-app \.uv-page-intro\{display:flex;flex-direction:column/);
 assert.match(css,/\.uv-app \.uv-filter button\{flex:0 0 auto;white-space:nowrap/);
 assert.match(css,/\.uv-app \.run-fasty-screen h1/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});

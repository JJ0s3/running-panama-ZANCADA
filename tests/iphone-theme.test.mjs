import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const tour=readFileSync(new URL('../components/guided-tour.tsx',import.meta.url),'utf8');
const mobile=readFileSync(new URL('../app/iphone-polish.css',import.meta.url),'utf8');
const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');

test('Fasty onboarding retains saved completion preference',()=>{
 assert.match(tour,/zancada-tour-v2/);
 assert.doesNotMatch(tour,/zancada-zt-v2/);
});

test('onboarding has isolated, ultraviolet classes and progress',()=>{
 assert.match(tour,/className="zt-root"/);
 assert.match(tour,/className="zt-spotlight"/);
 assert.match(tour,/zt-next/);
 assert.match(tour,/zt-back/);
 assert.match(mobile,/\.zt-spotlight\s*\{/);
 assert.match(mobile,/--z-amber:\s*#FFD85A/);
});

test('iPhone font and touch layout overrides load after application styles',()=>{
 assert.ok(page.indexOf("import './iphone-polish.css'")>page.indexOf("import './plan-ios.css'"));
 assert.match(mobile,/text-size-adjust:100%/);
 assert.match(mobile,/font-size:16px/);
 assert.match(mobile,/env\(safe-area-inset-bottom\)/);
 assert.match(mobile,/max-width:390px/);
});

test('labels remain visible across narrow tabs',()=>{
 assert.match(mobile,/\.uv-app \.uv-dock button span/);
 assert.match(mobile,/white-space:nowrap/);
 assert.match(mobile,/\.uv-app \.uv-metrics\{grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\)\}/);
});

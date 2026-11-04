import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const compile=(p)=>{
 const source=readFileSync(new URL('../'+p,import.meta.url),'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}});
 const mod={exports:{}};new Function('module','exports',compiled.outputText)(mod,mod.exports);return mod.exports;
};
const {parseGpx}=compile('lib/parse-gpx.ts');
const {routeFor,centerForCity}=compile('lib/route-sources.ts');
test('GPX parser reads actual trkpt and rtept coordinates',()=>{
 assert.deepEqual(parseGpx('<gpx><trk><trkseg><trkpt lat="8.96" lon="-79.5"></trkpt><trkpt lon="-79.51" lat="8.97"/></trkseg></trk></gpx>'),[[8.96,-79.5],[8.97,-79.51]]);
 assert.deepEqual(parseGpx("<gpx><rte><rtept lat='8.9' lon='-79.5'/><rtept lat='9' lon='-79.6'/></rte></gpx>"),[[8.9,-79.5],[9,-79.6]]);
});
test('Unsafe and duplicate coordinates are skipped',()=>{
 assert.deepEqual(parseGpx('<trkpt lat="999" lon="0"/><trkpt lat="8.9" lon="-79.5"/><trkpt lat="8.9" lon="-79.5"/><trkpt lat="9.0" lon="-79.5"/>'),[[8.9,-79.5],[9,-79.5]]);
 assert.throws(()=>parseGpx('a'.repeat(2_000_001)),/límite/);
});
test('GPX URLs are allowlisted; other events have only approximate city view',()=>{
 assert.equal(routeFor('avon-2026',5)?.publisher,'Papaya25');
 assert.match(routeFor('avon-2026',10)?.gpxUrl??'',/routes\/16\/gpx$/);
 assert.match(routeFor('santas-race-2026',5)?.gpxUrl??'',/routes\/14\/gpx$/);
 assert.equal(routeFor('fake-event',5),undefined);
 assert.ok(centerForCity('David, Chiriquí')[0]>8);
});

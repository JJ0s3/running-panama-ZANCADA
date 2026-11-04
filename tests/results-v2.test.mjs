import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const load=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const code=load('lib/results-catalog.ts');
const js=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const module={exports:{}};
new Function('module','exports',js)(module,module.exports);
const {RESULT_CATALOG,filterResultCatalog,resultDate}=module.exports;

test('five published-source events with unique IDs and anchored URLs',()=>{
 assert.equal(RESULT_CATALOG.length,5);
 assert.equal(new Set(RESULT_CATALOG.map(e=>e.id)).size,RESULT_CATALOG.length);
 for(const e of RESULT_CATALOG){assert.ok(/^https:\/\/papaya25\.info\//.test(e.sourceUrl));assert.match(e.date,/^2026-\d\d-\d\d$/)}
});
test('the live-style source is NOT represented as currently live',()=>{
 const record=RESULT_CATALOG.find(x=>x.id==='cerro-azul-trail-2026');
 assert.equal(record.linkStatus,'followup');
 assert.ok(!code.includes("linkStatus:'live'"));
});
test('query normalizes accents and matches location, modality',()=>{
 assert.equal(filterResultCatalog(RESULT_CATALOG,{query:'cerro azul'}).length,2);
 assert.equal(filterResultCatalog(RESULT_CATALOG,{query:'Pacora'}).length,1);
 assert.equal(filterResultCatalog(RESULT_CATALOG,{query:'PANAMA PACIFICO'}).length,1);
});
test('year month modality and status filters combine correctly',()=>{
 assert.equal(filterResultCatalog(RESULT_CATALOG,{year:'2025'}).length,0);
 assert.equal(filterResultCatalog(RESULT_CATALOG,{month:'11'}).length,1);
 assert.equal(filterResultCatalog(RESULT_CATALOG,{modality:'Trail'}).length,1);
 assert.equal(filterResultCatalog(RESULT_CATALOG,{month:'10',status:'published'}).length,4);
 assert.equal(filterResultCatalog(RESULT_CATALOG,{status:'followup'}).length,1);
});
test('Panama dates do not shift backward',()=>{
 assert.match(resultDate('2026-11-01'),/1 de noviembre de 2026/);
});
test('Results component has controls, provenance and no copied athlete timing',()=>{
 const app=load('components/results-hub.tsx');
 assert.match(app,/type="search"/);
 assert.match(app,/Explorar ficha/);
 assert.match(app,/Consultar en Papaya25/);
 assert.match(app,/No hay integración oficial/);
 assert.doesNotMatch(app,/BIB 126|26:26\.00|fastestRunner/i);
});

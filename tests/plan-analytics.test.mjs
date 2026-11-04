import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const input=readFileSync(new URL('../lib/plan-analytics.ts',import.meta.url),'utf8');
const js=ts.transpileModule(input,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const module={exports:{}};
new Function('module','exports',js)(module,module.exports);
const {weeklyActivitySummary,markedSessionProgress}=module.exports;
const week=[{key:'2026-11-02'},{key:'2026-11-03'},{key:'2026-11-04'}];
test('la gráfica semanal usa únicamente registros de la semana seleccionada',()=>{
 const activities=[
  {id:'1',date:'2026-11-02',distance:2,minutes:18},
  {id:'2',date:'2026-11-03',distance:3.5,minutes:26},
  {id:'3',date:'2026-10-31',distance:40,minutes:170}
 ];
 assert.deepEqual(weeklyActivitySummary(week,activities),{dailyKm:[2,3.5,0],distance:5.5,minutes:44,activities:2});
});
test('un día sin registros se mantiene en cero',()=>{
 assert.deepEqual(weeklyActivitySummary(week,[]).dailyKm,[0,0,0]);
});
test('el progreso cuenta solo sesiones del plan y no duplica fechas',()=>{
 const sessions=[{date:'2026-11-02',title:'Suave',minutes:20},{date:'2026-11-04',title:'Suave',minutes:25}];
 assert.deepEqual(markedSessionProgress(sessions,['2026-11-02','2026-11-02','2026-10-31']),{count:1,percent:50});
});
test('plan sin sesiones no inventa porcentaje',()=>{
 assert.deepEqual(markedSessionProgress([],['2026-11-03']),{count:0,percent:0});
});

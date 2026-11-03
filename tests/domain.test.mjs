import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import ts from 'typescript';
const source=readFileSync(new URL('../lib/domain.ts',import.meta.url),'utf8');const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod={exports:{}};new Function('module','exports',compiled)(mod,mod.exports);
const {pace,kmTotal,planSessions,parseActivity,races}=mod.exports;
test('ritmo',()=>assert.equal(pace(5,30),'6:00/km'));
test('distancia acumulada',()=>assert.equal(kmTotal([{distance:5},{distance:3.5}]),8.5));
test('planes con sesiones',()=>assert.equal(planSessions({distance:10,date:'2027-03-01',days:[1,3,6]},new Date('2027-01-04T12:00:00Z')).length,12));
test('interpretación de actividad',()=>assert.equal(parseActivity('Hoy corrí 5 km'),5));
test('eventos claramente ficticios',()=>assert.ok(races.every(e=>e.demo===true)));

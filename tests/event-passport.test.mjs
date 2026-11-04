import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
const input=readFileSync(new URL('../lib/event-passport.ts',import.meta.url),'utf8');
const output=ts.transpileModule(input,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const module={exports:{}};
new Function('module','exports',output)(module,module.exports);
const {events,emptyPassport,eventById,daysToEvent,recordParticipation,toggleSaved,toggleChecklist,sanitizedPassport,eventChecklist}=module.exports;
test('exactly ten real-public-source candidates, all unique, dated and HTTPS-linked',()=>{
 assert.equal(events.length,10);
 assert.equal(new Set(events.map(e=>e.id)).size,events.length);
 for(const e of events){
  assert.match(e.date,/^2026-\d\d-\d\d$/);
  assert.ok(e.sourceUrl.startsWith('https://'),e.name);
  assert.ok(e.distancesKm.length>0);
  assert.equal(e.lastCheckedAt,'2026-11-03');
  assert.ok(!e.name.toLowerCase().includes('ficticio'));
 }
});
test('self-reported participation never assigns an official bib number',()=>{
 const saved=toggleSaved(emptyPassport,'santas-race-2026');
 assert.deepEqual(saved.savedIds,['santas-race-2026']);
 assert.equal(saved.participations.length,0,'Saving cannot register a user');
 const declared=recordParticipation(saved,'santas-race-2026',5,'','2026-11-03T21:00:00-05:00');
 assert.equal(declared.participations[0].bibNumber,undefined);
 assert.equal(declared.participations[0].eventId,'santas-race-2026');
 assert.equal(emptyPassport.participations.length,0);
});
test('bib number only reflects the number typed by the user, never generated',()=>{
 const next=recordParticipation(emptyPassport,'avon-2026',5,'  1408  ','2026-11-03');
 assert.equal(next.participations[0].bibNumber,'1408');
});
test('participation rejects invalid distances and unknown events',()=>{
 assert.throws(()=>recordParticipation(emptyPassport,'avon-2026',42,'','2026-11-03'));
 assert.throws(()=>recordParticipation(emptyPassport,'unknown',5,'','2026-11-03'));
});
test('checklist is scoped to a specific event and never edits others',()=>{
 const s=toggleChecklist(emptyPassport,'santas-race-2026','kit');
 assert.deepEqual(s.completedChecklist['santas-race-2026'],['kit']);
 assert.deepEqual(toggleChecklist(s,'santas-race-2026','kit').completedChecklist['santas-race-2026'],[]);
 assert.equal(s.completedChecklist['avon-2026'],undefined);
});
test('stored state rejects unknown identifiers, invalid distances and untrusted checklist codes',()=>{
 const s=sanitizedPassport({savedIds:['avon-2026','fake','avon-2026'],participations:[{eventId:'santas-race-2026',distanceKm:5,declaredAt:'a'},{eventId:'avon-2026',distanceKm:100,declaredAt:'b'}],completedChecklist:{'avon-2026':['kit','danger'],'fake':['kit']}});
 assert.deepEqual(s.savedIds,['avon-2026']);
 assert.equal(s.participations.length,1);
 assert.deepEqual(s.completedChecklist['avon-2026'],['kit']);
 assert.equal(s.completedChecklist.fake,undefined);
});
test('days to race uses the calendar date in Panama, not timezone of device',()=>{
 assert.equal(daysToEvent('2026-11-08',new Date('2026-11-04T02:00:00Z')),5);
 assert.equal(daysToEvent('2026-11-03',new Date('2026-11-04T02:00:00Z')),0);
});

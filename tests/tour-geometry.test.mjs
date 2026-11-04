import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';

const input=readFileSync(new URL('../lib/tour-geometry.ts',import.meta.url),'utf8');
const js=ts.transpileModule(input,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const module={exports:{}};
new Function('module','exports',js)(module,module.exports);
const {clipTourFocus}=module.exports;

test('a short visible session highlights without covering the tour panel',()=>{
 const focus=clipTourFocus({top:122,left:17,width:350,height:83},{width:384,height:720,panelTop:404,mobile:true});
 assert.deepEqual(focus,{top:115,left:10,width:364,height:97});
 assert.ok(focus.top+focus.height<404);
});
test('tall cards are safely clipped above the mobile guide',()=>{
 const focus=clipTourFocus({top:112,left:16,width:351,height:610},{width:384,height:720,panelTop:405,mobile:true});
 assert.ok(focus);
 assert.ok(focus.top+focus.height<=390);
 assert.ok(focus.height<610);
});
test('offscreen target does not create a fake tiny spotlight',()=>{
 assert.equal(clipTourFocus({top:600,left:16,width:300,height:55},{width:384,height:720,panelTop:397,mobile:true}),null);
});
test('invalid layout dimensions are rejected',()=>{
 assert.equal(clipTourFocus({top:10,left:10,width:0,height:0},{width:384,height:720,panelTop:397,mobile:true}),null);
 assert.equal(clipTourFocus({top:NaN,left:10,width:40,height:50},{width:384,height:720,panelTop:397,mobile:true}),null);
});
test('desktop spotlight uses the whole viewport without interfering with panel',()=>{
 const focus=clipTourFocus({top:200,left:280,width:480,height:150},{width:1280,height:850,panelTop:0,mobile:false});
 assert.deepEqual(focus,{top:193,left:273,width:494,height:164});
});

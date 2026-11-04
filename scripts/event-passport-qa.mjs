import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='http://127.0.0.1:3000';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const shot=async(page,name)=>{
 const buff=await page.screenshot({path:`qa/${name}.jpg`,type:'jpeg',quality:63,animations:'disabled'});
 if(process.env.QA_INLINE==='1')console.log(`QA_IMAGE_BEGIN ${name}\n${buff.toString('base64')}\nQA_IMAGE_END ${name}`);
};
async function audit(page,label){
 const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 console.log('VIEWPORT',label,JSON.stringify(result));
 assert.ok(Math.max(result.scrollWidth,result.body)<=result.width+3,`Horizontal overflow on ${label}`);
 const nav=await page.locator('.ep-bottom-nav').boundingBox();
 assert.ok(nav&&nav.x>=0&&nav.x+nav.width<=result.width+2,'Navigation not within iPhone viewport');
}
try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const page=await ctx.newPage();
 await page.addInitScript(()=>localStorage.setItem('zancada-event-tour-v1','done'));
 await page.goto(base,{waitUntil:'networkidle'});
 await page.locator('.ep-home').waitFor();
 assert.match(await page.locator('.ep-home-heading h1').innerText(),/próxima historia/i);
 await audit(page,'home');
 await shot(page,'events-home-iphone');
 await page.locator('.ep-bottom-nav').getByRole('button',{name:'Eventos'}).click();
 await page.locator('.ep-events-grid').waitFor();
 assert.equal(await page.locator('.ep-event-card').count(),10);
 await audit(page,'events');
 await shot(page,'events-catalog-iphone');
 await page.locator('.ep-search input').fill('Santa');
 assert.ok((await page.locator('.ep-event-card').count())>=1);
 await page.locator('.ep-event-card').first().getByRole('button',{name:/Ver detalles/i}).click();
 await page.locator('.ep-event-detail').waitFor();
 assert.match(await page.locator('.ep-detail-text h1').innerText(),/Santa/i);
 assert.equal(await page.locator('.ep-detail-sections a[href^="https:"]').count()>0,true);
 await audit(page,'event detail');
 await shot(page,'events-detail-iphone');
 await page.getByRole('button',{name:/Guardar carrera/i}).click();
 await page.getByRole('button',{name:/Ya me inscribí afuera/i}).click();
 await page.getByRole('dialog',{name:/Ya te inscribiste/i}).waitFor();
 const register=page.locator('.ep-modal');
 assert.ok(await register.getByText(/no verifica/i).count()>0);
 await register.getByRole('checkbox').check();
 await register.getByRole('button',{name:/Crear dorsal personal/i}).click();
 await page.locator('.ep-bib-object').waitFor();
 assert.match(await page.locator('.ep-bib-foot').innerText(),/NO ACREDITA ACCESO/);
 assert.match(await page.locator('.ep-bib-caption').innerText(),/NÚMERO PENDIENTE/);
 await audit(page,'personal bib');
 await shot(page,'events-bib-iphone');
 await page.locator('.ep-checkrow').first().locator('input').check();
 await page.reload({waitUntil:'networkidle'});
 await page.locator('.ep-bottom-nav').getByRole('button',{name:'Mi dorsal'}).click();
 assert.equal(await page.locator('.ep-bib-object').count(),1,'Participation not persisted');
 assert.ok(await page.locator('.ep-checkrow').first().locator('input').isChecked(),'Checklist not persisted');
 await page.locator('.ep-bottom-nav').getByRole('button',{name:'Fasty'}).click();
 await page.locator('.ep-fasty-page').waitFor();
 await page.getByRole('button',{name:/Dónde retiro el kit/i}).click();
 assert.match(await page.locator('.ep-fasty-bubble').last().innerText(),/no tengo una entrega de kit confirmada|Materiales/i);
 await audit(page,'Fasty');
 await shot(page,'events-fasty-iphone');
 await ctx.close();

 const intro=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const pt=await intro.newPage();
 await pt.goto(base,{waitUntil:'networkidle'});
 await pt.locator('.ep-tour-panel').waitFor();
 const targets=['intro','upcoming','catalog','event-detail','save-event','register-event','bib','preparation','calendar','fasty'];
 for(let step=0;step<targets.length;step++){
  if(step)await pt.getByRole('button',{name:/Seguir/i}).click();
  const target=targets[step];
  await pt.waitForFunction((name)=>{
   const focus=document.querySelector('.ep-tour-outline')?.getBoundingClientRect();
   const t=document.querySelector('[data-ep-tour="'+name+'"]')?.getBoundingClientRect();
   return Boolean(focus&&t&&Math.abs(focus.top-t.top)<20);
  },target,{timeout:6500});
  const state=await pt.evaluate((name)=>{
   const panel=document.querySelector('.ep-tour-panel')?.getBoundingClientRect();
   const focus=document.querySelector('.ep-tour-outline')?.getBoundingClientRect();
   const t=document.querySelector('[data-ep-tour="'+name+'"]')?.getBoundingClientRect();
   return{step:name,panelTop:panel?.top,focusTop:focus?.top,focusBottom:focus?.bottom,targetTop:t?.top};
  },target);
  console.log('TOUR_STEP',JSON.stringify(state));
  assert.ok(state.focusBottom<=state.panelTop-3,'Spotlight overlaps Fasty panel: '+target);
  if(step===0)await shot(pt,'events-tour-intro');
  if(step===1)await shot(pt,'events-tour-upcoming');
  if(step===5)await shot(pt,'events-tour-participation');
  if(step===6)await shot(pt,'events-tour-bib');
  if(step===9)await shot(pt,'events-tour-fasty');
 }
 await intro.close();
 console.log('EVENT_PASSPORT_MOBILE_QA_PASSED');
}finally{await browser.close()}

import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
fs.mkdirSync('qa',{recursive:true});
const base='http://127.0.0.1:3000';
async function screenshot(page,name,locator){
 const p=locator??page;
 const buf=await p.screenshot({path:`qa/${name}.jpg`,type:'jpeg',quality:61,animations:'disabled'});
 if(process.env.QA_INLINE==='1')console.log(`QA_IMAGE_BEGIN ${name}\n${buf.toString('base64')}\nQA_IMAGE_END ${name}`);
}
async function checkOverflow(page,label){
 const m=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
 console.log('VIEWPORT',label,JSON.stringify(m));
 assert.ok(Math.max(m.scroll,m.body)<=m.w+3,`Horizontal overflow in ${label}`);
}
try{
 for(const width of [390,375]){
  const ctx=await browser.newContext({viewport:{width,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const page=await ctx.newPage();
  await page.addInitScript(()=>localStorage.setItem('zancada-event-tour-v1','done'));
  await page.goto(base,{waitUntil:'networkidle'});
  await page.locator('.za-hero-visual').waitFor();
  await checkOverflow(page,'home '+width);
  assert.equal(await page.locator('.za-journey-step').count(),3);
  assert.match(await page.locator('.ep-home-heading h1').innerText(),/próxima historia/i);
  const fonts=await page.evaluate(()=>({
   display:getComputedStyle(document.querySelector('.ep-home-heading h1')).fontFamily,
   ui:getComputedStyle(document.querySelector('.ep-bottom-nav button')).fontFamily,
   photo:document.querySelector('.za-hero-photo')?.currentSrc
  }));
  console.log('FONT_AUDIT',width,JSON.stringify(fonts));
  assert.match(fonts.display,/Archivo Black/);
  assert.match(fonts.ui,/Nunito Sans/);
  assert.ok(fonts.photo.includes('images.unsplash.com'));
  if(width===390){
   await screenshot(page,'avon-zancada-home');
   await screenshot(page,'avon-zancada-journey',page.locator('.za-journey'));
  }
  await page.locator('.za-journey-step').first().click();
  await page.locator('.ep-events-grid').waitFor();
  await checkOverflow(page,'events '+width);
  assert.equal(await page.locator('.za-race-photo').count(),10);
  assert.match(await page.locator('.ep-event-card').first().innerText(),/FOTOGRAFÍA ILUSTRATIVA/);
  if(width===390)await screenshot(page,'avon-zancada-events');
  await page.locator('.ep-search input').fill('AVON');
  await page.locator('.ep-event-card').first().getByRole('button',{name:/Ver detalles/i}).click();
  await page.locator('.ep-event-detail').waitFor();
  assert.match(await page.locator('.ep-detail-facts').innerText(),/5K.*10K/s);
  assert.equal(await page.locator('.za-detail-icon').count(),3);
  await checkOverflow(page,'AVON details '+width);
  if(width===390)await screenshot(page,'avon-zancada-event-detail');
  await ctx.close();
 }
 console.log('AVON_INSPIRED_MOBILE_QA_PASSED');
}finally{await browser.close()}

import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const base='http://127.0.0.1:3000';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
async function screenshot(page,name){
 const buffer=await page.screenshot({path:`qa/${name}.jpg`,type:'jpeg',quality:65,animations:'disabled'});
 if(process.env.QA_INLINE==='1'&&['home-iphone','plan-iphone','races-iphone','fasty-iphone','tour-training','tour-fasty'].includes(name)){
  console.log(`QA_IMAGE_BEGIN ${name}\n${buffer.toString('base64')}\nQA_IMAGE_END ${name}`);
 }
}
async function viewportAudit(page,label){
 const box=await page.evaluate(()=>({
  width:window.innerWidth,
  documentWidth:document.documentElement.scrollWidth,
  bodyWidth:document.body.scrollWidth
 }));
 console.log('VIEWPORT',label,JSON.stringify(box));
 assert.ok(Math.max(box.documentWidth,box.bodyWidth)<=box.width+3,`Horizontal overflow in ${label}`);
}
async function visibleInWidth(page,selector,label){
 const box=await page.locator(selector).first().boundingBox();
 assert.ok(box,`Element not found: ${label}`);
 assert.ok(box.x>=-2,`Left clipping: ${label} at ${box.x}`);
 assert.ok(box.x+box.width<=await page.evaluate(()=>innerWidth)+2,`Right clipping: ${label}`);
 assert.ok(box.height>18,`Collapsed element: ${label}`);
}
try{
 const ctx=await browser.newContext({viewport:{width:384,height:832},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const page=await ctx.newPage();
 await page.addInitScript(()=>localStorage.setItem('zancada-tour-v2','done'));
 await page.goto(base,{waitUntil:'networkidle'});
 await page.locator('.run-hero').waitFor();
 await viewportAudit(page,'Inicio 384px');
 await visibleInWidth(page,'.run-hero','running hero');
 const geometry=await page.evaluate(()=>{
  const art=document.querySelector('.run-hero-visual')?.getBoundingClientRect();
  const copy=document.querySelector('.run-hero-copy')?.getBoundingClientRect();
  return {artBottom:art?.bottom,copyTop:copy?.top};
 });
 console.log('RUN_GEOMETRY',JSON.stringify(geometry));
 assert.ok(geometry.artBottom<=geometry.copyTop+3,'Track visual overlaps training headline');
 assert.equal(await page.locator('.sp-fasty-star').count(),0,'Legacy green emoji decoration is still present');
 await screenshot(page,'home-iphone');
 await page.locator('.uv-dock').getByRole('button',{name:/Mi plan/i}).click();
 await page.locator('.zi-plan').waitFor();
 await viewportAudit(page,'Mi plan 384px');
 await visibleInWidth(page,'.zi-plan-heading h1','plan title');
 await screenshot(page,'plan-iphone');
 await page.locator('.uv-dock').getByRole('button',{name:/Carreras/i}).click();
 await page.locator('.uv-race-grid').waitFor();
 await viewportAudit(page,'Carreras 384px');
 await visibleInWidth(page,'.uv-page-intro h1','races title');
 await page.locator('.uv-filter button').first().waitFor();
 const brokenFilters=await page.locator('.uv-filter button').evaluateAll(els=>els.filter(x=>x.getBoundingClientRect().width<48).map(x=>x.textContent));
 assert.deepEqual(brokenFilters,[],'Race distance filters too narrow');
 await screenshot(page,'races-iphone');
 await page.locator('.uv-dock').getByRole('button',{name:/Fasty/i}).click();
 await page.locator('.uv-chat').waitFor();
 await viewportAudit(page,'Fasty 384px');
 await visibleInWidth(page,'.run-fasty-screen h1','coach title');
 assert.equal(await page.locator('.sp-fasty-landing-art').count(),0,'Experimental Fasty sculpture is still mounted');
 await screenshot(page,'fasty-iphone');
 await ctx.close();

 const tourCtx=await browser.newContext({viewport:{width:384,height:832},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const tp=await tourCtx.newPage();
 await tp.goto(base,{waitUntil:'networkidle'});
 await tp.getByRole('button',{name:/Continuar/}).click();
 await tp.locator('.zt-spotlight').waitFor({timeout:6000});
 await tp.waitForTimeout(350);
 const tour=await tp.evaluate(()=>{
  const panel=document.querySelector('.zt-panel')?.getBoundingClientRect();
  const highlight=document.querySelector('.zt-spotlight')?.getBoundingClientRect();
  const target=document.querySelector('[data-tour-id="today"]')?.getBoundingClientRect();
  return {panelTop:panel?.top,highlightBottom:highlight?.bottom,targetHeight:target?.height};
 });
 console.log('TOUR_GEOMETRY',JSON.stringify(tour));
 assert.ok(tour.highlightBottom<=tour.panelTop-4,'Fasty highlight extends behind the onboarding panel');
 assert.ok(tour.targetHeight<220,'Guide is highlighting an oversized card');
 await screenshot(tp,'tour-training');
 await tp.getByRole('button',{name:/Continuar/}).click();
 await tp.locator('.zt-spotlight').waitFor({timeout:6000});
 await tp.waitForTimeout(300);
 await screenshot(tp,'tour-fasty');
 await tourCtx.close();
 console.log('RUNNING_MOBILE_VISUAL_QA_PASSED');
}finally{await browser.close()}

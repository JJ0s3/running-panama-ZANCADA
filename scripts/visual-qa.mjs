import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='http://127.0.0.1:3000';
fs.mkdirSync('qa', {recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const issues=[];
async function screenshot(page,name){
 const buffer=await page.screenshot({path:`qa/${name}.jpg`,type:'jpeg',quality:59,fullPage:false,animations:'disabled'});
 if(process.env.QA_INLINE==='1'&&['home-iphone','plan-iphone','fasty-iphone','tour-training','tour-fasty'].includes(name)){
  console.log(`QA_IMAGE_BEGIN ${name}\n${buffer.toString('base64')}\nQA_IMAGE_END ${name}`);
 }
}
async function overflowCheck(page,label){
 const info=await page.evaluate(()=>({
  innerWidth:window.innerWidth,
  documentWidth:document.documentElement.scrollWidth,
  bodyWidth:document.body.scrollWidth,
  appWidth:document.querySelector('.uv-app')?.getBoundingClientRect().width
 }));
 console.log('VIEWPORT',label,JSON.stringify(info));
 assert.ok(Math.max(info.documentWidth,info.bodyWidth)-info.innerWidth<=3,`Horizontal overflow on ${label}`);
}
try{
 const context=await browser.newContext({viewport:{width:384,height:832},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const page=await context.newPage();
 await page.addInitScript(()=>{localStorage.setItem('zancada-tour-v2','done')});
 await page.goto(base,{waitUntil:'networkidle'});
 await page.locator('.sp-hero').waitFor();
 await overflowCheck(page,'home iphone 384');
 const geometry=await page.evaluate(()=>{
   const a=document.querySelector('.sp-object-wrap')?.getBoundingClientRect();
   const b=document.querySelector('.sp-hero h2')?.getBoundingClientRect();
   return{artBottom:a?.bottom,titleTop:b?.top,artWidth:a?.width};
 });
 console.log('HERO_GEOMETRY',JSON.stringify(geometry));
 assert.ok(geometry.artBottom<=geometry.titleTop+8,'Spatial Z must not overlap headline on mobile');
 await screenshot(page,'home-iphone');
 await page.locator('.uv-dock').getByRole('button',{name:/Mi plan/i}).click();
 await page.locator('.zi-plan').waitFor();
 await overflowCheck(page,'plan iphone 384');
 await screenshot(page,'plan-iphone');
 await page.locator('.uv-dock').getByRole('button',{name:/Fasty/i}).click();
 await page.locator('.uv-chat').waitFor();
 await overflowCheck(page,'fasty iphone 384');
 await screenshot(page,'fasty-iphone');
 await context.close();
 const tutorial=await browser.newContext({viewport:{width:384,height:832},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const tp=await tutorial.newPage();
 await tp.goto(base,{waitUntil:'networkidle'});
 await tp.getByRole('button',{name:/Continuar/}).click();
 await tp.locator('.zt-spotlight').waitFor({timeout:6000});
 await tp.waitForTimeout(500);
 const tourState=await tp.evaluate(()=>{
   const p=document.querySelector('.zt-panel')?.getBoundingClientRect();
   const t=document.querySelector('.zt-spotlight')?.getBoundingClientRect();
   const target=document.querySelector('[data-tour-id="today"]')?.getBoundingClientRect();
   return {panelTop:p?.top,spotlightBottom:t?.bottom,targetTop:target?.top,targetHeight:target?.height};
 });
 console.log('TOUR_GEOMETRY',JSON.stringify(tourState));
 assert.ok(tourState.spotlightBottom<=tourState.panelTop-4,'Spotlight must not extend behind Fasty panel');
 assert.ok(tourState.targetHeight<230,'Training focus should be an actionable element, not whole hero card');
 await screenshot(tp,'tour-training');
 await tp.getByRole('button',{name:/Continuar/}).click();
 await tp.locator('.zt-spotlight').waitFor({timeout:5000});
 await tp.waitForTimeout(350);
 await screenshot(tp,'tour-fasty');
 await tutorial.close();
 console.log('MOBILE_VISUAL_QA_PASSED');
}finally{await browser.close()}

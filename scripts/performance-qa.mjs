import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';

const base=process.env.QA_BASE_URL??'http://127.0.0.1:3000';
await mkdir('qa',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const styles=async locator=>locator.evaluate(el=>{const s=getComputedStyle(el);return {bg:s.backgroundColor,image:s.backgroundImage,font:s.fontFamily,color:s.color}});
try{
 for(const width of [320,390,430,768,1280]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('zancada-event-tour-v1','done'));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.locator('.za-hero-photo').waitFor({state:'visible'});
  await page.locator('.st-home-metrics button').first().waitFor();
  if(await page.locator('.st-home-metrics button').count()!==3)throw Error('Dashboard metrics changed at '+width);
  if(await page.locator('.za-journey-step').count()!==3)throw Error('Original step cards changed at '+width);
  if(await page.locator('.ep-bottom-nav button').count()!==5)throw Error('Navigation count changed at '+width);
  const body=await styles(page.locator('.ep-app'));
  if(body.bg!=='rgb(8, 13, 21)')throw Error('Dark identity missing '+width+': '+JSON.stringify(body));
  const logo=await styles(page.locator('.ep-logo'));
  if(!logo.font.includes('Racing Sans One'))throw Error('Sport logo type missing '+width+': '+logo.font);
  if(width<=960){
   if(!await page.locator('.ep-bottom-nav').isVisible())throw Error('Dock missing at '+width);
   if(await page.locator('.ep-sidebar').isVisible())throw Error('Mobile sidebar visible at '+width);
   const navHeight=await page.locator('.ep-bottom-nav').evaluate(el=>Math.round(el.getBoundingClientRect().height));
   if(navHeight!==80)throw Error('Dock not 80 px '+width+': '+navHeight);
   const activeIcon=await page.locator('.ep-bottom-nav button.active svg').evaluate(el=>getComputedStyle(el).backgroundImage);
   if(!activeIcon.includes('gradient'))throw Error('Active orange circular icon missing '+width+': '+activeIcon);
   const rect=await page.locator('.ep-logo').boundingBox();
   if(!rect||Math.abs(rect.x+rect.width/2-width/2)>21)throw Error('Logo not centered at '+width);
  }else{
   if(!await page.locator('.ep-sidebar').isVisible())throw Error('Desktop sidebar hidden');
   if(await page.locator('.ep-bottom-nav').isVisible())throw Error('Duplicate dock on desktop');
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  if(overflow>6)throw Error('Horizontal overflow '+width+': '+overflow);
  await page.screenshot({path:'qa/performance-'+width+'-home.png',fullPage:true});
  if(width===390){
   await page.locator('.ep-bottom-nav button').filter({hasText:'Eventos'}).click();
   await page.locator('.za-race-photo').first().waitFor();
   await page.locator('.ep-event-footer button').first().click();
   await page.locator('.ep-event-detail').waitFor();
   await page.locator('#st-event-route').waitFor();
   await page.screenshot({path:'qa/performance-390-evento.png',fullPage:true});
   await page.locator('.ep-bottom-nav button').filter({hasText:'Resultados'}).click();
   await page.locator('.zr-card').first().waitFor();
   await page.screenshot({path:'qa/performance-390-resultados.png',fullPage:true});
   await page.locator('.ep-bottom-nav button').filter({hasText:'Preparación'}).click();
   await page.locator('.st-prep-hub').waitFor();
   await page.locator('.ep-fasty-header .ep-avatar').waitFor();
   const fasty=await styles(page.locator('.ep-fasty-header .ep-avatar'));
   if(!fasty.image.includes('gradient'))throw Error('Fasty recolor missing: '+JSON.stringify(fasty));
   await page.screenshot({path:'qa/performance-390-fasty.png',fullPage:true});
   await page.locator('.ep-bottom-nav button').filter({hasText:'Mi dorsal'}).click();
   await page.locator('.ep-bib-object').waitFor();
   await page.screenshot({path:'qa/performance-390-dorsal.png',fullPage:true});
   await page.locator('.ep-profile-button').click();
   await page.getByRole('button',{name:/Repetir recorrido/}).click();
   await page.locator('.ep-tour-panel').waitFor();
   await page.getByText('PARADA 1 DE 10').waitFor({state:'visible',timeout:9000});
   await page.screenshot({path:'qa/performance-390-guia.png',fullPage:true});
  }
  if(errors.length)throw Error('JS runtime error '+width+': '+errors.join('; '));
  console.log('QA OK '+width+'px: sports skin, original UX and layout');
  await page.close();
 }
}finally{await browser.close()}

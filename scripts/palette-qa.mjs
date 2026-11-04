import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';
const base=process.env.QA_BASE_URL??'http://127.0.0.1:3000';
await mkdir('qa',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const rgb=async locator=>locator.evaluate(el=>getComputedStyle(el).backgroundColor);
try {
 for(const width of [390,1280]){
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>localStorage.setItem('zancada-event-tour-v1','done'));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.locator('.za-hero-photo').waitFor({state:'visible'});
  if(await page.locator('.ep-bottom-nav button').count()!==5)throw Error('Original five buttons missing');
  if(await page.locator('.st-home-metrics button').count()!==3)throw Error('Original three summary cards missing');
  if(await page.locator('.za-journey-step').count()!==3)throw Error('Original journey cards missing');
  const active=page.locator('.ep-primary').first();
  if(await rgb(active)!=='rgb(255, 107, 44)')throw Error('Primary CTA is not mango at '+width+': '+await rgb(active));
  const lead=await page.locator('.ep-home-heading h1 em').evaluate(el=>getComputedStyle(el).color);
  if(lead!=='rgb(30, 79, 216)')throw Error('Headline accent is not Pacific: '+lead);
  if(width===390){
   const navVisible=await page.locator('.ep-bottom-nav').isVisible();
   if(!navVisible)throw Error('Mobile dock hidden');
   const logo=await page.locator('.ep-logo').boundingBox();
   if(!logo||Math.abs(logo.x+logo.width/2-width/2)>18)throw Error('Original centered mobile logo changed');
   if(await page.locator('.ep-sidebar').isVisible())throw Error('Mobile sidebar unexpectedly visible');
  } else {
   if(!await page.locator('.ep-sidebar').isVisible())throw Error('Desktop sidebar missing');
   if(await page.locator('.ep-bottom-nav').isVisible())throw Error('Desktop has duplicate mobile dock');
  }
  const horizontal=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  if(horizontal>4)throw Error('Horizontal overflow '+width+' px: '+horizontal);
  await page.screenshot({path:'qa/palette-'+width+'-home.png',fullPage:true});
  if(width===390){
   await page.locator('.ep-bottom-nav button').filter({hasText:'Eventos'}).click();
   await page.locator('.za-race-photo').first().waitFor();
   await page.locator('.ep-event-footer button').first().click();
   await page.locator('.ep-event-detail').waitFor();
   await page.locator('#st-event-route').waitFor();
   await page.screenshot({path:'qa/palette-390-evento.png',fullPage:true});
   await page.locator('.ep-bottom-nav button').filter({hasText:'Resultados'}).click();
   await page.locator('.zr-card').first().waitFor();
   await page.screenshot({path:'qa/palette-390-resultados.png',fullPage:true});
   await page.locator('.ep-bottom-nav button').filter({hasText:'Preparación'}).click();
   await page.locator('.st-prep-hub').waitFor();
   await page.locator('.ep-bottom-nav button').filter({hasText:'Mi dorsal'}).click();
   await page.locator('.ep-bib-object').waitFor();
   await page.locator('.ep-profile-button').click();
   await page.getByRole('button',{name:/Repetir recorrido/}).click();
   await page.locator('.ep-tour-panel').waitFor();
   if(!await page.getByText('PARADA 1 DE 10').count())throw Error('Original 10 step tour missing');
   await page.screenshot({path:'qa/palette-390-guia.png',fullPage:true});
  }
  if(errors.length)throw Error('Runtime errors: '+errors.join('; '));
  await page.close();
 }
 console.log('Palette QA OK: original cards, photos, mobile/desktop navigation, guide, maps and results.');
} finally {await browser.close()}

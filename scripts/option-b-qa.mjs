import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';

const base=process.env.QA_BASE_URL??'http://127.0.0.1:3000';
await mkdir('qa',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const width of [320,360,390,430,768,1280]){
  const page=await browser.newPage({viewport:{width,height:850},deviceScaleFactor:1});
  await page.addInitScript(()=>localStorage.setItem('zancada-event-tour-v1','done'));
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.locator('.zb-featured').waitFor({state:'visible'});
  const nav=page.locator('.ep-bottom-nav');
  if(await nav.locator('button').count()!==5)throw Error('Navigation not five buttons at '+width);
  const color=await page.locator('.zb-featured').evaluate(el=>getComputedStyle(el).backgroundColor);
  if(color!=='rgb(255, 107, 44)')throw Error('Mango is not active at '+width+': '+color);
  const pageOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  if(pageOverflow>3)throw Error('Horizontal overflow at '+width+': '+pageOverflow);
  const navHeight=await nav.evaluate(el=>Math.round(el.getBoundingClientRect().height));
  if(navHeight!==64)throw Error('Nav pill wrong height at '+width+': '+navHeight);
  await page.getByRole('tab',{name:'Resultados'}).click();
  if(!(await page.getByRole('tabpanel').innerText()).includes('Cerro Azul'))throw Error('Results tab not connected');
  await page.getByRole('tab',{name:'Guardadas'}).click();
  if(!(await page.getByRole('tabpanel').innerText()).includes('Tu próxima historia'))throw Error('Saved empty state not shown');
  await page.getByRole('tab',{name:'Próximas'}).click();
  await page.screenshot({path:'qa/option-b-'+width+'.png',fullPage:true});
  if(width===390){
   await nav.getByRole('button',{name:'Resultados'}).click();
   await page.locator('.zb-results').waitFor();
   await page.locator('.zb-result-card').first().locator('button').click();
   if(!(await page.locator('.zb-result-card').first().innerText()).includes('Consultar en Papaya25'))throw Error('Source detail missing');
   await nav.getByRole('button',{name:'Eventos'}).click();
   await page.locator('.zb-catalog-row').first().click();
   await page.locator('.ep-event-detail').waitFor();
   await page.locator('#st-event-route').waitFor();
   await nav.getByRole('button',{name:'Plan'}).click();
   await page.locator('.st-prep-hub').waitFor();
   await nav.getByRole('button',{name:'Dorsal'}).click();
   await page.locator('.ep-bib-object').waitFor();
  }
  if(errors.length)throw Error('JS runtime errors at '+width+': '+errors.join('; '));
  await page.close();
 }
 console.log('Option B QA: 6 viewports, home tabs, results source, route, plan and dorsal OK.');
}finally{await browser.close()}

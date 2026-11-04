import {chromium} from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('qa',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const response=await page.goto('https://carreraavon.com/',{waitUntil:'domcontentloaded',timeout:45000});
 await page.waitForTimeout(1800);
 const info=await page.evaluate(()=>{
  const html=document.documentElement.outerHTML;
  const resources=performance.getEntriesByType('resource').map(e=>e.name);
  const css=resources.filter(x=>/\.css|fonts|font/.test(x));
  const scripts=resources.filter(x=>/\.js|gtm|analytics/.test(x));
  const seen=x=>html.includes(x)||resources.some(r=>r.includes(x));
  const sig={wordpress:seen('wp-content')||seen('wp-includes'),elementor:seen('elementor-'),webflow:seen('w-webflow'),wix:seen('static.parastorage.com'),nextjs:seen('/_next/'),astro:seen('astro-island'),jquery:seen('jquery'),bootstrap:seen('bootstrap'),tailwind:seen('tailwind'),gtm:seen('googletagmanager')};
  const fontOf=sel=>{const el=document.querySelector(sel);if(!el)return null;const c=getComputedStyle(el);return {tag:el.tagName,text:el.textContent?.trim().slice(0,70),family:c.fontFamily,size:c.fontSize,weight:c.fontWeight,lineHeight:c.lineHeight,letterSpacing:c.letterSpacing}};
  return{title:document.title,generator:document.querySelector('meta[name="generator"]')?.getAttribute('content'),bodyClass:document.body.className,signatures:sig,fonts:{h1:fontOf('h1'),h2:fontOf('h2'),paragraph:fontOf('p'),button:fontOf('button'),nav:fontOf('nav a')},stylesheetUrls:css.slice(0,25),scripts:scripts.slice(0,18),images:[...document.images].slice(0,10).map(i=>({src:i.currentSrc?.slice(0,150),alt:i.alt}))};
 });
 info.httpStatus=response?.status();
 info.responseHeaders={server:response?.headers()['server'],poweredBy:response?.headers()['x-powered-by'],cache:response?.headers()['cf-cache-status']};
 console.log('AVON_SITE_AUDIT='+JSON.stringify(info));
 await page.screenshot({path:'qa/avon-mobile-reference.jpg',type:'jpeg',quality:60,fullPage:false,animations:'disabled'});
 const buffer=fs.readFileSync('qa/avon-mobile-reference.jpg');console.log('AVON_SCREENSHOT_BEGIN\n'+buffer.toString('base64')+'\nAVON_SCREENSHOT_END');
}finally{await browser.close()}

'use client';
import {useEffect,useRef,useState} from 'react';
import type {CSSProperties} from 'react';
import {clipTourFocus} from '../lib/tour-geometry';

type Section='inicio'|'plan'|'explorar'|'asistente';
type Stop={id:string;page:Section;title:string;message:string};
type FocusRect={top:number;left:number;width:number;height:number};
const stops:Stop[]=[
 {id:'welcome',page:'inicio',title:'¡Hey! Soy Fasty.',message:'Te voy a enseñar ZANCADA señalando las partes que usarás para empezar a correr. Puedes avanzar, retroceder u omitir el recorrido.'},
 {id:'today',page:'inicio',title:'Tu próximo entrenamiento',message:'Aquí está el nombre y la duración de tu siguiente sesión. En «Ver entrenamiento» encontrarás el plan y podrás marcarla cuando termines.'},
 {id:'fasty',page:'inicio',title:'Tu compañero de ruta',message:'Soy Fasty. Te explico los entrenamientos y puedo consultar tu progreso sin inventar resultados. Las acciones que modifican datos requieren confirmación.'},
 {id:'goal',page:'inicio',title:'Tus datos, sin adornos',message:'Estos números provienen de actividades que registraste en la demo. Puedes consultar kilómetros, salidas y objetivo.'},
 {id:'register',page:'inicio',title:'Registra una carrera',message:'Introduce primero la distancia y luego el tiempo real. Al guardar, tu nueva actividad aparecerá en el progreso.'},
 {id:'progress',page:'inicio',title:'Mira lo que avanzas',message:'Aquí aparecen tus salidas guardadas. El ritmo indica el tiempo promedio por kilómetro.'},
 {id:'calendar',page:'plan',title:'Organiza tu semana',message:'Toca los días para explorar la agenda. Las pausas y la recuperación son parte de un plan sostenible.'},
 {id:'events',page:'explorar',title:'Descubre carreras',message:'Desde estos controles guardas una carrera ficticia o la usas como meta. Por ahora no hay inscripciones oficiales.'},
 {id:'coach',page:'asistente',title:'Pregúntame lo que quieras',message:'Puedes empezar con alguna de estas preguntas. Mis respuestas actuales funcionan con reglas de la demo.'},
 {id:'profile',page:'inicio',title:'Tu espacio personal',message:'Desde tu perfil modificas nombre y nivel. En Ayuda puedes volver a realizar este recorrido.'},
 {id:'finish',page:'inicio',title:'Listo para empezar.',message:'Ya sabes dónde encontrar tu sesión, tu plan, los registros y mi ayuda. Explora ZANCADA a tu ritmo.'}
];
export default function GuidedTour({onNavigate,onClose}:{onNavigate:(page:Section)=>void;onClose:()=>void}){
 const [index,setIndex]=useState(0);
 const [rect,setRect]=useState<FocusRect|null>(null);
 const [view,setView]=useState({width:390,height:780});
 const heading=useRef<HTMLHeadingElement>(null);
 const panel=useRef<HTMLElement>(null);
 const current=stops[index];
 const end=()=>{try{localStorage.setItem('zancada-tour-v2','done')}catch{}onClose()};
 useEffect(()=>{onNavigate(current.page)},[current.page,onNavigate]);
 useEffect(()=>{
  let active=true,moved=false,tries=0,frame=0;
  setRect(null);
  const measure=()=>{
   if(!active)return;
   const width=window.innerWidth,height=window.innerHeight;
   setView(old=>old.width===width&&old.height===height?old:{width,height});
   if(current.id==='welcome'||current.id==='finish'){setRect(null);return}
   const el=document.querySelector<HTMLElement>(`[data-tour-id="${current.id}"]`);
   if(!el){setRect(null);return}
   const pos=el.getBoundingClientRect();
   const mobile=width<680;
   const topOfPanel=mobile?panel.current?.getBoundingClientRect().top??height*.57:height-20;
   if(!moved){
    moved=true;
    const desiredTop=mobile?Math.max(78,Math.min(120,topOfPanel*.29)):Math.max(100,Math.min(200,height*.21));
    const destination=Math.max(0,window.scrollY+pos.top-desiredTop);
    window.scrollTo({top:destination,behavior:'instant'});
    return;
   }
   const result=clipTourFocus({top:pos.top,left:pos.left,width:pos.width,height:pos.height},{width,height,panelTop:topOfPanel,mobile});
   if(!result){setRect(null);return}
   setRect(old=>old&&Math.abs(old.top-result.top)<1&&Math.abs(old.left-result.left)<1&&Math.abs(old.width-result.width)<1&&Math.abs(old.height-result.height)<1?old:result);
  };
  const update=()=>{window.cancelAnimationFrame(frame);frame=window.requestAnimationFrame(measure)};
  const timer=window.setInterval(()=>{tries++;measure();if(tries>24)window.clearInterval(timer)},80);
  const initial=window.requestAnimationFrame(measure);
  window.addEventListener('scroll',update,true);
  window.addEventListener('resize',update);
  return()=>{active=false;window.cancelAnimationFrame(frame);window.cancelAnimationFrame(initial);window.clearInterval(timer);window.removeEventListener('scroll',update,true);window.removeEventListener('resize',update)}
 },[index,current.id,current.page]);
 useEffect(()=>{heading.current?.focus({preventScroll:true})},[index]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')end();if(e.key==='ArrowRight')setIndex(n=>Math.min(stops.length-1,n+1));if(e.key==='ArrowLeft')setIndex(n=>Math.max(0,n-1))};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 const mobile=view.width<680,cardWidth=Math.min(380,view.width-28);
 const top=mobile?Math.max(10,view.height-310):rect?Math.max(15,Math.min(view.height-300,rect.top>300?rect.top-284:rect.top+rect.height+18)):Math.max(18,(view.height-292)/2);
 const left=mobile?14:rect?Math.max(14,Math.min(view.width-cardWidth-14,rect.left)):Math.max(14,(view.width-cardWidth)/2);
 const shade=(style:CSSProperties,key:string)=><div className="zt-shade" style={style} key={key} aria-hidden="true"/>;
 return <div className="zt-root" role="dialog" aria-modal="true" aria-labelledby="fasty-zt-title" aria-describedby="fasty-zt-copy">
  {!rect&&<div className="zt-dim" aria-hidden="true"/>}
  {rect&&<>
   {shade({top:0,left:0,width:'100%',height:rect.top},'top')}
   {shade({top:rect.top+rect.height,left:0,width:'100%',bottom:0},'bottom')}
   {shade({top:rect.top,left:0,width:rect.left,height:rect.height},'left')}
   {shade({top:rect.top,left:rect.left+rect.width,right:0,height:rect.height},'right')}
   <div className="zt-spotlight" aria-hidden="true" style={{top:rect.top,left:rect.left,width:rect.width,height:rect.height}}/>
  </>}
  <section ref={panel} className="zt-panel" style={{top,left,width:cardWidth}}>
   <div className="zt-top"><div className="zt-fasty" aria-hidden="true"><span className="zt-symbol">F</span><span>✦</span></div><div><span className="zt-eyebrow">FASTY TE GUÍA</span><div className="zt-count">PASO {index+1} / {stops.length}</div></div><button type="button" className="zt-close" onClick={end} aria-label="Cerrar recorrido">×</button></div>
   <div className="zt-track" role="progressbar" aria-valuenow={index+1} aria-valuemin={1} aria-valuemax={stops.length} aria-label="Pasos del recorrido"><div style={{width:`${(index+1)/stops.length*100}%`}}/></div>
   <h2 id="fasty-zt-title" ref={heading} tabIndex={-1}>{current.title}</h2>
   <p id="fasty-zt-copy">{current.message}</p>
   <div className="zt-controls"><button type="button" className="zt-skip" onClick={end}>Omitir</button><div className="zt-buttons"><button type="button" className="zt-back" disabled={index===0} onClick={()=>setIndex(i=>Math.max(0,i-1))}>Atrás</button><button type="button" className="zt-next" onClick={()=>index===stops.length-1?end():setIndex(i=>Math.min(stops.length-1,i+1))}>{index===stops.length-1?'Empezar':'Continuar'} <span aria-hidden="true">↗</span></button></div></div>
  </section>
 </div>;
}

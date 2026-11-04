'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowLeft,X} from 'lucide-react';
import {clipTourFocus} from '../lib/tour-geometry';

export type EventTab='inicio'|'eventos'|'dorsal'|'fasty';
type Step={target:string;tab:EventTab;eventId?:string;title:string;copy:string};
const steps:Step[]=[
 {target:'intro',tab:'inicio',title:'Bienvenido a ZANCADA',copy:'Soy Fasty. Aquí no solo cuentas kilómetros: descubres carreras, preparas tu participación y conservas tus historias.'},
 {target:'upcoming',tab:'inicio',title:'Todo empieza con una carrera',copy:'Aquí encontrarás un evento anunciado públicamente, su fecha y una puerta de entrada a toda la información.'},
 {target:'catalog',tab:'eventos',title:'Descubre carreras reales',copy:'Filtra por distancia y abre cada ficha. ZANCADA enlaza siempre al origen de la información.'},
 {target:'event-detail',tab:'eventos',eventId:'avon-2026',title:'Una ficha para llegar preparado',copy:'Consulta distancias, fecha, lugar y qué datos faltan por confirmar. La inscripción se realiza en la web externa correspondiente.'},
 {target:'save-event',tab:'eventos',eventId:'avon-2026',title:'Guarda una carrera',copy:'Guardar es solo agregarla a tu lista. No significa que estés inscrito, ni realiza ningún pago.'},
 {target:'register-event',tab:'eventos',eventId:'avon-2026',title:'Registra tu participación',copy:'Después de inscribirte oficialmente fuera de ZANCADA puedes declararlo aquí y añadir tu número si ya lo conoces.'},
 {target:'bib',tab:'dorsal',title:'Este será tu dorsal personal',copy:'Cuando declares una participación verás un dorsal digital. Nunca será una credencial oficial ni un QR para ingresar.'},
 {target:'preparation',tab:'dorsal',title:'Prepara tu día de carrera',copy:'Tu checklist reúne lo esencial. El lugar de retiro, hora y recorrido solo aparecen cuando una fuente los confirma.'},
 {target:'calendar',tab:'inicio',title:'Organiza tus próximas fechas',copy:'Tu agenda prioriza carreras y próximas acciones. Los entrenamientos pasan a ser apoyo a estas experiencias.'},
 {target:'fasty',tab:'fasty',title:'Pregúntame por los eventos',copy:'Puedo explicarte qué llevar, cuándo es una carrera o dónde revisar la inscripción. Si desconozco un dato, te diré dónde verificarlo.'}
];
export default function EventTour({onNavigate,onClose}:{onNavigate:(tab:EventTab,eventId?:string)=>void;onClose:()=>void}){
 const [index,setIndex]=useState(0);
 const [focus,setFocus]=useState<{top:number;left:number;width:number;height:number}|null>(null);
 const panel=useRef<HTMLElement>(null);
 const title=useRef<HTMLHeadingElement>(null);
 const step=steps[index];
 const close=()=>{try{localStorage.setItem('zancada-event-tour-v1','done')}catch{}onClose()};
 useEffect(()=>{onNavigate(step.tab,step.eventId)},[index]);
 useEffect(()=>{
  let active=true,moved=false,checks=0;
  const measure=()=>{
   if(!active)return;
   const el=document.querySelector<HTMLElement>(`[data-ep-tour="${step.target}"]`);
   if(!el){setFocus(null);return}
   const box=el.getBoundingClientRect();
   const mobile=window.innerWidth<680;
   if(!moved){
    moved=true;
    window.scrollTo({top:Math.max(0,window.scrollY+box.top-(mobile?90:130)),behavior:'instant'});
    return;
   }
   const bounds=el.getBoundingClientRect();
   const panelTop=panel.current?.getBoundingClientRect().top??window.innerHeight;
   const clipped=clipTourFocus({top:bounds.top,left:bounds.left,width:bounds.width,height:bounds.height},
    {width:window.innerWidth,height:window.innerHeight,mobile,panelTop});
   setFocus(clipped);
  };
  setFocus(null);
  const timer=window.setInterval(()=>{checks++;measure();if(checks>=34)window.clearInterval(timer)},75);
  window.addEventListener('resize',measure);
  window.addEventListener('scroll',measure,true);
  return()=>{active=false;window.clearInterval(timer);window.removeEventListener('resize',measure);window.removeEventListener('scroll',measure,true)};
 },[index,step.target,step.tab]);
 useEffect(()=>{title.current?.focus({preventScroll:true})},[index]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();if(e.key==='ArrowRight')setIndex(i=>Math.min(i+1,steps.length-1));if(e.key==='ArrowLeft')setIndex(i=>Math.max(i-1,0))};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 const shade=(style:React.CSSProperties,key:string)=><div key={key} className="ep-tour-shade" style={style} aria-hidden="true"/>;
 return <div className="ep-tour-layer" role="dialog" aria-modal="true" aria-labelledby="ep-tour-title">
  {!focus?<div className="ep-tour-shade ep-tour-whole" aria-hidden="true"/>:<>
   {shade({top:0,left:0,width:'100%',height:focus.top},'top')}
   {shade({top:focus.top+focus.height,left:0,right:0,bottom:0},'bottom')}
   {shade({top:focus.top,left:0,width:focus.left,height:focus.height},'left')}
   {shade({top:focus.top,left:focus.left+focus.width,right:0,height:focus.height},'right')}
   <div className="ep-tour-outline" style={focus} aria-hidden="true"/>
  </>}
  <section ref={panel} className="ep-tour-panel">
   <div className="ep-tour-head"><div className="ep-avatar" aria-hidden="true"><i/><i/><b/></div><div><strong>FASTY TE ACOMPAÑA</strong><small>PASO {index+1} DE {steps.length}</small></div><button aria-label="Cerrar recorrido" type="button" onClick={close}><X size={20}/></button></div>
   <div className="ep-tour-progress"><span style={{width:(index+1)/steps.length*100+'%'}}/></div>
   <h2 ref={title} tabIndex={-1} id="ep-tour-title">{step.title}</h2>
   <p>{step.copy}</p>
   <div className="ep-tour-actions"><button type="button" className="ep-tour-skip" onClick={close}>Omitir</button><div><button type="button" disabled={!index} onClick={()=>setIndex(i=>i-1)}><ArrowLeft size={16}/> Atrás</button><button type="button" className="ep-tour-next" onClick={()=>index===steps.length-1?close():setIndex(i=>i+1)}>{index===steps.length-1?'Empezar':'Seguir'} <ArrowRight size={16}/></button></div></div>
  </section>
 </div>;
}

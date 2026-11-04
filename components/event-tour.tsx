'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,ArrowLeft,Compass,Flag,Map,ShieldCheck,Ticket,X} from 'lucide-react';
import {clipTourFocus} from '../lib/tour-geometry';

export type EventTab='inicio'|'eventos'|'resultados'|'dorsal'|'fasty';
type Step={target:string;tab:EventTab;eventId?:string;title:string;copy:string};
const steps:Step[]=[
 {target:'intro',tab:'inicio',title:'Tu punto de partida',copy:'Conoce ZANCADA: aquí descubres eventos, organizas tu asistencia y conservas tus carreras.'},
 {target:'upcoming',tab:'inicio',title:'Tu próxima salida',copy:'La portada destaca una carrera documentada. Abre la ficha para descubrir su fecha, distancias y preparación.'},
 {target:'catalog',tab:'eventos',title:'Explora tu calendario',copy:'Busca por ciudad o distancia. Desliza para explorar tarjetas e información de las carreras.'},
 {target:'event-detail',tab:'eventos',eventId:'avon-2026',title:'Descubre los detalles',copy:'Fecha, lugar y distancias antes de inscribirte. Más abajo encontrarás un mapa interactivo del recorrido publicado.'},
 {target:'save-event',tab:'eventos',eventId:'avon-2026',title:'Guárdala para después',copy:'Guardar una carrera crea un acceso rápido, pero nunca inscribe ni realiza pagos.'},
 {target:'register-event',tab:'eventos',eventId:'avon-2026',title:'Tu inscripción es externa',copy:'Después de inscribirte con la organización, registra aquí tu participación personal.'},
 {target:'bib',tab:'dorsal',title:'Tu dorsal de recuerdo',copy:'Conserva tu historial y el número que tú introduzcas. No es una acreditación oficial.'},
 {target:'preparation',tab:'dorsal',title:'Todo listo para salir',copy:'Marca tu checklist y vuelve a consultar la ficha del evento cuando falten detalles.'},
 {target:'calendar',tab:'inicio',title:'Organiza las fechas',copy:'Puedes guardar eventos y consultar tu agenda sin perderte en un registro de entrenamientos.'},
 {target:'fasty',tab:'fasty',title:'Fasty vive en Preparación',copy:'Aquí puedes pedir orientación sobre cómo prepararte, revisar fuentes útiles y abrir el mapa de tu próxima carrera.'}
];
const chapters=[{at:0,label:'Inicio',Icon:Compass},{at:2,label:'Explorar',Icon:Flag},{at:3,label:'Ficha y mapa',Icon:Map},{at:6,label:'Mi dorsal',Icon:Ticket},{at:9,label:'Preparación',Icon:ShieldCheck}];
export default function EventTour({onNavigate,onClose}:{onNavigate:(tab:EventTab,eventId?:string)=>void;onClose:()=>void}){
 const [index,setIndex]=useState(0);
 const [focus,setFocus]=useState<{top:number;left:number;width:number;height:number}|null>(null);
 const [moving,setMoving]=useState(false);
 const panel=useRef<HTMLElement>(null);
 const title=useRef<HTMLHeadingElement>(null);
 const touch=useRef<number|null>(null);
 const step=steps[index];
 const close=()=>{try{localStorage.setItem('zancada-event-tour-v1','done')}catch{}onClose()};
 useEffect(()=>{onNavigate(step.tab,step.eventId)},[index]);
 useEffect(()=>{
  let active=true,moved=false,checks=0;
  setMoving(true);setFocus(null);
  const measure=()=>{
   if(!active)return;
   const el=document.querySelector<HTMLElement>(`[data-ep-tour="${step.target}"]`);
   if(!el){setFocus(null);return}
   const rect=el.getBoundingClientRect();
   const mobile=window.innerWidth<680;
   if(!moved){
    moved=true;
    const top=Math.max(0,window.scrollY+rect.top-(mobile?100:140));
    window.scrollTo({top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    return;
   }
   const box=el.getBoundingClientRect();
   const panelTop=panel.current?.getBoundingClientRect().top??window.innerHeight;
   setFocus(clipTourFocus({top:box.top,left:box.left,width:box.width,height:box.height},
    {width:window.innerWidth,height:window.innerHeight,mobile,panelTop}));
   if(checks>=4)setMoving(false);
  };
  const timer=window.setInterval(()=>{checks++;measure();if(checks>=36)window.clearInterval(timer)},90);
  window.addEventListener('resize',measure);window.addEventListener('scroll',measure,true);
  return()=>{active=false;window.clearInterval(timer);window.removeEventListener('resize',measure);window.removeEventListener('scroll',measure,true)};
 },[index,step.target,step.tab]);
 useEffect(()=>{title.current?.focus({preventScroll:true})},[index]);
 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();if(e.key==='ArrowRight')setIndex(i=>Math.min(i+1,steps.length-1));if(e.key==='ArrowLeft')setIndex(i=>Math.max(i-1,0))};
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[]);
 const shade=(style:React.CSSProperties,key:string)=><div key={key} className="ep-tour-shade" style={style} aria-hidden="true"/>;
 return <div className="ep-tour-layer st-tour-layer" role="dialog" aria-modal="true" aria-labelledby="ep-tour-title"
  onTouchStart={e=>{touch.current=e.touches[0]?.clientX??null}}
  onTouchEnd={e=>{if(touch.current===null)return;const dx=(e.changedTouches[0]?.clientX??touch.current)-touch.current;touch.current=null;if(Math.abs(dx)>75)setIndex(i=>Math.min(steps.length-1,Math.max(0,i+(dx<0?1:-1))))}}>
  {!focus?<div className="ep-tour-shade ep-tour-whole" aria-hidden="true"/>:<>
   {shade({top:0,left:0,width:'100%',height:focus.top},'top')}
   {shade({top:focus.top+focus.height,left:0,right:0,bottom:0},'bottom')}
   {shade({top:focus.top,left:0,width:focus.left,height:focus.height},'left')}
   {shade({top:focus.top,left:focus.left+focus.width,right:0,height:focus.height},'right')}
   <div className="ep-tour-outline" style={focus} aria-hidden="true"/>
  </>}
  <section ref={panel} className="ep-tour-panel st-tour-panel">
   <div className="ep-tour-head"><div className="st-tour-symbol"><Compass size={22}/></div><div><strong>RECORRIDO INTERACTIVO</strong><small>{moving?'DESPLAZANDO HACIA LA SECCIÓN':`PARADA ${index+1} DE ${steps.length}`}</small></div><button aria-label="Cerrar recorrido" type="button" onClick={close}><X size={20}/></button></div>
   <nav className="st-tour-chapters" aria-label="Saltar entre capítulos">
    {chapters.map(({at,label,Icon})=><button key={label} type="button" aria-pressed={index===at} className={index===at?'active':''} onClick={()=>setIndex(at)}><Icon size={15}/><span>{label}</span></button>)}
   </nav>
   <div className="ep-tour-progress"><span style={{width:(index+1)/steps.length*100+'%'}}/></div>
   <h2 ref={title} tabIndex={-1} id="ep-tour-title">{step.title}</h2><p>{step.copy}</p>
   <div className="ep-tour-actions"><button type="button" className="ep-tour-skip" onClick={close}>Salir de la guía</button><div><button type="button" disabled={!index} onClick={()=>setIndex(i=>i-1)}><ArrowLeft size={16}/> Atrás</button><button type="button" className="ep-tour-next" onClick={()=>index===steps.length-1?close():setIndex(i=>i+1)}>{index===steps.length-1?'Explorar ZANCADA':'Siguiente'} <ArrowRight size={16}/></button></div></div>
   <small className="st-tour-hint">Desliza lateralmente o pulsa un capítulo para saltar de sección.</small>
  </section>
 </div>;
}

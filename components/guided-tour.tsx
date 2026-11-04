'use client';
import {useEffect,useLayoutEffect,useRef,useState} from 'react';

type Section='inicio'|'plan'|'explorar'|'asistente';
type Stop={id:string;page:Section;title:string;message:string};
const stops:Stop[]=[
{id:'welcome',page:'inicio',title:'¡Hey! Soy Fasty.',message:'Voy a enseñarte ZANCADA sobre la propia aplicación. Puedes retroceder, omitir el recorrido o volver a hacerlo desde tu perfil.'},
{id:'today',page:'inicio',title:'Tu próximo entrenamiento',message:'Aquí encontrarás tu siguiente sesión. Empieza por entender cuánto tiempo dura y cómo debería sentirse.'},
{id:'fasty',page:'inicio',title:'No corres solo',message:'Soy Fasty: puedo explicar tu entrenamiento, consultar tu avance y proponerte acciones que siempre tendrás que confirmar.'},
{id:'goal',page:'inicio',title:'Una meta alcanzable',message:'Estas cifras presentan los registros de tu demo. Tu meta se ajusta en Mi plan y cambiará según lo que elijas.'},
{id:'register',page:'inicio',title:'Registra cada zancada',message:'Después de correr, introduce distancia y tiempo reales. El esfuerzo y una nota te ayudarán a recordar cómo te sentiste.'},
{id:'progress',page:'inicio',title:'Reconoce tu progreso',message:'Aquí verás las actividades guardadas. El ritmo es el tiempo promedio que tardas en recorrer un kilómetro.'},
{id:'calendar',page:'plan',title:'Tu calendario',message:'Elige los días disponibles y consulta las sesiones sugeridas. La recuperación es parte del proceso, no un fracaso.'},
{id:'events',page:'explorar',title:'Descubre carreras',message:'Guarda eventos y explora distancias. Las carreras actuales son ficticias y no disponen de inscripción oficial.'},
{id:'coach',page:'asistente',title:'Puedes preguntarme',message:'Prueba con «¿Qué tengo esta semana?» o «¿Cómo voy?». Para modificar tus datos, pediré confirmación.'},
{id:'profile',page:'inicio',title:'Tu espacio personal',message:'Edita tu nombre y nivel desde Mi perfil. En Ayuda encontrarás la opción para repetir este recorrido cuando quieras.'},
{id:'finish',page:'inicio',title:'¡Tu primera zancada!',message:'Ya sabes dónde encontrar tu meta, tu plan, el registro y mi ayuda. Ahora explora a tu ritmo.'}
];
export default function GuidedTour({onNavigate,onClose}:{onNavigate:(page:Section)=>void;onClose:()=>void}){
 const [index,setIndex]=useState(0);
 const [rect,setRect]=useState<{top:number;left:number;width:number;height:number}|null>(null);
 const [view,setView]=useState({width:1200,height:800});
 const heading=useRef<HTMLHeadingElement>(null);
 const current=stops[index];
 const end=()=>{try{localStorage.setItem('zancada-zt-v2','done')}catch{}onClose()};
 useEffect(()=>{onNavigate(current.page)},[index,current.page,onNavigate]);
 useLayoutEffect(()=>{
  let alive=true;
  const update=()=>{
    const width=window.innerWidth,height=window.innerHeight;
    setView({width,height});
    const el=current.id==='welcome'||current.id==='finish'?null:document.querySelector<HTMLElement>(`[data-zt-id="${current.id}"]`);
    if(!el){setRect(null);return}
    const r=el.getBoundingClientRect();
    setRect({top:Math.max(5,r.top-6),left:Math.max(5,r.left-6),width:Math.min(width-10,r.width+12),height:r.height+12});
  };
  const frame=window.requestAnimationFrame(()=>{
    const el=document.querySelector<HTMLElement>(`[data-zt-id="${current.id}"]`);
    if(el){el.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center',inline:'nearest'})}
    update();
  });
  const delayed=window.setTimeout(()=>{if(alive)update()},380);
  window.addEventListener('resize',update);
  window.addEventListener('scroll',update,true);
  return()=>{alive=false;window.cancelAnimationFrame(frame);window.clearTimeout(delayed);window.removeEventListener('resize',update);window.removeEventListener('scroll',update,true)}
 },[index,current.id,current.page]);
 useEffect(()=>{heading.current?.focus()},[index]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')end();if(e.key==='ArrowRight')setIndex(n=>Math.min(stops.length-1,n+1));if(e.key==='ArrowLeft')setIndex(n=>Math.max(0,n-1))};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 const mobile=view.width<680;
 const cardWidth=Math.min(380,view.width-32);
 const above=rect && rect.top>270;
 const top=mobile?Math.max(12,view.height-300):rect?Math.max(15,Math.min(view.height-295,above?rect.top-278:rect.top+rect.height+22)):Math.max(20,(view.height-290)/2);
 const left=mobile?16:rect?Math.max(16,Math.min(view.width-cardWidth-16,rect.left)):Math.max(16,(view.width-cardWidth)/2);
 return <div className="zt-root" role="dialog" aria-modal="true" aria-labelledby="fasty-zt-title" aria-describedby="fasty-zt-copy">
  {!rect&&<div className="zt-dim" aria-hidden="true"/>}
  {rect&&<div className="zt-spotlight" aria-hidden="true" style={{top:rect.top,left:rect.left,width:rect.width,height:rect.height}}/>}
  <section className="zt-panel" style={{top,left,width:cardWidth}}>
   <div className="zt-top"><div className="zt-fasty" aria-hidden="true"><span className="zt-symbol">F</span><span>✦</span></div><div><span className="zt-eyebrow">FASTY TE GUÍA</span><div className="zt-count">PASO {index+1} / {stops.length}</div></div><button className="zt-close" onClick={end} aria-label="Cerrar recorrido">×</button></div>
   <div className="zt-track" aria-label={`Progreso del recorrido: ${index+1} de ${stops.length}`}><div style={{width:`${(index+1)/stops.length*100}%`}}/></div>
   <h2 id="fasty-zt-title" ref={heading} tabIndex={-1}>{current.title}</h2>
   <p id="fasty-zt-copy">{current.message}</p>
   <div className="zt-controls"><button type="button" className="zt-skip" onClick={end}>Omitir</button><div className="zt-buttons"><button type="button" className="zt-back" disabled={index===0} onClick={()=>setIndex(i=>Math.max(0,i-1))}>Atrás</button><button type="button" className="zt-next" onClick={()=>index===stops.length-1?end():setIndex(i=>Math.min(stops.length-1,i+1))}>{index===stops.length-1?'Empezar':'Continuar'} <span aria-hidden="true">↗</span></button></div></div>
  </section>
 </div>
}

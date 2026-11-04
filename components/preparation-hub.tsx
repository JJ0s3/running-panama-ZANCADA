'use client';
import {useState} from 'react';
import {BookOpen,CalendarCheck,ChevronRight,Droplets,ExternalLink,Footprints,HeartPulse,Map,ShieldCheck,Sun,Timer} from 'lucide-react';
import type {EventRecord} from '../lib/event-passport';

const resources=[
 {title:'Empezar a correr: de cero a 5K',org:'NHS · Reino Unido',url:'https://www.nhs.uk/better-health/get-active/get-running-with-couch-to-5k/couch-to-5k-running-plan/',detail:'Programa gratuito y progresivo para principiantes, de nueve semanas.',Icon:Footprints},
 {title:'Cómo avanzar sin sobrecargarte',org:'World Athletics',url:'https://worldathletics.org/personal-best/performance/advice-runners-beginners',detail:'Consejos generales de técnica, adaptación y recuperación.',Icon:HeartPulse},
 {title:'Guía de actividad física semanal',org:'CDC',url:'https://www.cdc.gov/physical-activity-basics/guidelines/adults.html',detail:'Referencias públicas sobre actividad aeróbica y fuerza.',Icon:BookOpen}
] as const;
const intents=[
 {label:'Estoy comenzando',question:'¿Cómo empiezo a preparar una carrera de 5K?',Icon:Footprints},
 {label:'Quiero mejorar mi preparación',question:'¿Cómo preparo una carrera de 10K?',Icon:Timer},
 {label:'Correré con calor',question:'¿Cómo debo prepararme para correr con calor en Panamá?',Icon:Sun},
 {label:'Quiero organizar el día',question:'¿Qué debo revisar antes del día de carrera?',Icon:CalendarCheck}
];
export default function PreparationHub({event,onAsk,onShowRoute}:{event:EventRecord;onAsk:(question:string)=>void;onShowRoute:()=>void}){
 const [selected,setSelected]=useState<string|null>(null);
 return <div className="st-prep-hub" aria-label="Preparación con Fasty">
  <div className="st-prep-intro"><span className="st-eyebrow"><HeartPulse size={16}/> UNA AYUDA PARA PREPARARTE</span><h2>De elegir una carrera a llegar listo.</h2><p>Fasty puede orientarte con preguntas prácticas, hábitos generales y materiales de terceros. No inventa planes personalizados ni reemplaza a un profesional.</p></div>
  <div className="st-prep-grid" role="group" aria-label="Qué necesitas preparar">
   {intents.map(({label,question,Icon})=><button type="button" key={label} className={selected===label?'st-prep-choice selected':'st-prep-choice'} onClick={()=>{setSelected(label);onAsk(question)}}>
     <span className="st-prep-choice-icon"><Icon size={21}/></span><span>{label}</span><ChevronRight size={17}/>
   </button>)}
  </div>
  <section className="st-prep-next"><div><span className="st-eyebrow"><Map size={15}/> TU PRÓXIMO TERRENO</span><strong>{event.name}</strong><p>Antes de elegir dónde entrenar, consulta el mapa de su ruta publicada, si existe.</p></div><button onClick={onShowRoute} type="button">Abrir mapa en ZANCADA <ChevronRight size={17}/></button></section>
  <section className="st-resources"><header><span className="st-eyebrow"><ShieldCheck size={17}/> RECURSOS PARA APRENDER</span><h3>Guías que sí puedes consultar.</h3></header><div className="st-resource-grid">
   {resources.map(({title,org,url,detail,Icon})=><a key={title} href={url} target="_blank" rel="noopener noreferrer" className="st-resource-card"><Icon size={22}/><span className="st-resource-org">{org}</span><strong>{title}</strong><span>{detail}</span><span className="st-resource-cta">Consultar recurso <ExternalLink size={15}/></span></a>)}
  </div><p className="st-resource-note"><Droplets size={16}/> La preparación depende de tu experiencia, salud, clima y duración de la prueba. Aumenta la carga gradualmente y consulta a un profesional cuando corresponda.</p></section>
 </div>;
}

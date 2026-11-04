'use client';
import {useState} from 'react';
import {ArrowRight,Bookmark,ChevronRight,CalendarDays} from 'lucide-react';
import {daysToEvent,distanceLabel,events} from '../lib/event-passport';
import type {EventRecord} from '../lib/event-passport';
import {RESULT_CATALOG} from '../lib/results-catalog';

type View='upcoming'|'results'|'saved';
type Props={
 featured:EventRecord;
 upcoming:EventRecord[];
 savedIds:string[];
 onOpen:(id:string)=>void;
 onSave:(id:string)=>void;
 onNavigate:(tab:'eventos'|'resultados'|'dorsal')=>void;
};
const dateParts=(date:string)=>{
 const dateAtNoon=new Date(date+'T12:00:00-05:00');
 return {
  day:date.slice(8,10),
  month:new Intl.DateTimeFormat('es-PA',{month:'short',timeZone:'America/Panama'}).format(dateAtNoon).replace('.','').toUpperCase(),
  full:new Intl.DateTimeFormat('es-PA',{weekday:'short',day:'2-digit',month:'short',timeZone:'America/Panama'}).format(dateAtNoon).replace('.','')
 };
};
function RaceRow({date,name,detail,onOpen,priority=false}:{date:string;name:string;detail:string;onOpen:()=>void;priority?:boolean}){
 const stamp=dateParts(date);
 return <button type="button" className="zb-race-row" onClick={onOpen} aria-label={'Abrir '+name}>
  <span className={'zb-date-box'+(priority?' zb-date-box-primary':'')} aria-hidden="true"><strong>{stamp.day}</strong><small>{stamp.month}</small></span>
  <span className="zb-race-description"><strong>{name}</strong><small>{detail}</small></span>
  <ChevronRight size={19} aria-hidden="true" className="zb-row-arrow"/>
 </button>;
}
export default function OptionBHome({featured,upcoming,savedIds,onOpen,onSave,onNavigate}:Props){
 const [view,setView]=useState<View>('upcoming');
 const d=daysToEvent(featured.date);
 const nextRaces=[...upcoming].sort((a,b)=>a.date.localeCompare(b.date)).filter(e=>e.id!==featured.id).slice(0,4);
 const savedRaces=events.filter(e=>savedIds.includes(e.id)).slice(0,4);
 const rows=view==='saved'?savedRaces:nextRaces;
 return <main className="zb-home" aria-label="Inicio ZANCADA">
  <div data-ep-tour="intro" className="zb-home-start"><h1 className="zb-screen-title">Mañana de carrera<span>.</span></h1></div>
  <section className="zb-featured" data-ep-tour="upcoming" aria-label="Tu próxima carrera destacada">
   <div className="zb-featured-top">
    <span className="zb-date-pill">{dateParts(featured.date).full}</span>
    <span className="zb-distance-pill">{distanceLabel(featured.distancesKm)}</span>
   </div>
   <div className="zb-featured-center">
    <strong className="zb-featured-number" aria-label={d>=0?d+' días para la carrera':'Evento finalizado'}>{d<0?'—':d}</strong>
    <span className="zb-featured-message"><span>{d<0?'Fecha pasada':d===0?'¡Es hoy!':d===1?'día para la':'días para la'}</span><b>{featured.name}</b></span>
   </div>
   <div className="zb-featured-actions">
    <button type="button" className="zb-featured-open" onClick={()=>onOpen(featured.id)}>Ver evento <ArrowRight size={19} aria-hidden="true"/></button>
    <button type="button" className={'zb-featured-save'+(savedIds.includes(featured.id)?' is-saved':'')} aria-label={savedIds.includes(featured.id)?'Quitar carrera de guardados':'Guardar '+featured.name} aria-pressed={savedIds.includes(featured.id)} onClick={()=>onSave(featured.id)}><Bookmark size={21} fill={savedIds.includes(featured.id)?'currentColor':'none'} aria-hidden="true"/></button>
   </div>
  </section>
  <section className="zb-race-list-section" data-ep-tour="calendar" aria-label="Tus carreras">
   <div className="zb-segment" role="tablist" aria-label="Explorar carreras">
    {([['upcoming','Próximas'],['results','Resultados'],['saved','Guardadas']] as const).map(([key,label])=>
     <button key={key} id={'zb-tab-'+key} type="button" role="tab" aria-controls="zb-races-panel" aria-selected={view===key} className={view===key?'is-active':''} onClick={()=>setView(key)}>{label}</button>)}
   </div>
   <div id="zb-races-panel" role="tabpanel" aria-labelledby={'zb-tab-'+view} className="zb-race-list" tabIndex={0}>
    {view==='results'?<>
      {RESULT_CATALOG.slice(0,4).map((result,i)=><RaceRow key={result.id} date={result.date} name={result.name} detail={result.linkStatus==='published'?'Resultados publicados · '+result.location:'Consultar en fuente · '+result.location} priority={i===0} onOpen={()=>onNavigate('resultados')}/>)}
      <button type="button" className="zb-view-all" onClick={()=>onNavigate('resultados')}>Consultar resultados <ArrowRight size={18}/></button>
    </>:rows.length?<>
      {rows.map((e,i)=><RaceRow key={e.id} date={e.date} name={e.name} detail={distanceLabel(e.distancesKm)} onOpen={()=>onOpen(e.id)} priority={i===0}/>)}
      <button type="button" className="zb-view-all" onClick={()=>onNavigate(view==='saved'?'dorsal':'eventos')}>{view==='saved'?'Ir a mi dorsal':'Ver todas las carreras'} <ArrowRight size={18}/></button>
    </>:<div className="zb-empty-state">
      <div className="zb-empty-icon" aria-hidden="true"><CalendarDays size={28}/></div>
      <strong>{view==='saved'?'Tu próxima historia empieza aquí':'No hay carreras próximas por mostrar'}</strong>
      <p>{view==='saved'?'Guarda una carrera y vuelve cuando quieras.':'Explora el catálogo de eventos publicados.'}</p>
      <button type="button" className="zb-dark-button" onClick={()=>onNavigate('eventos')}>Explorar carreras <ArrowRight size={18}/></button>
    </div>}
   </div>
  </section>
  <p className="zb-home-disclaimer">Las fechas pueden cambiar. Consulta siempre la fuente original.</p>
 </main>;
}

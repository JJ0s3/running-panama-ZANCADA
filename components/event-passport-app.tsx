'use client';
import {useCallback,useEffect,useMemo,useState} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Bookmark,CalendarDays,Check,CheckCircle2,ChevronRight,ClipboardCheck,Clock3,Compass,ExternalLink,Flag,Footprints,Info,MapPin,Search,Send,Ticket,UserRound,X} from 'lucide-react';
import {events,eventById,emptyPassport,STORAGE_KEY,dateLabel,daysToEvent,distanceLabel,eventChecklist,participationFor,recordParticipation,sanitizedPassport,toggleChecklist,toggleSaved} from '../lib/event-passport';
import type {EventRecord,PassportState,Participation} from '../lib/event-passport';
import EventTour from './event-tour';
import type {EventTab} from './event-tour';

const views:[EventTab,string,typeof Compass][]=[['inicio','Inicio',Compass],['eventos','Eventos',Flag],['dorsal','Mi dorsal',Ticket],['fasty','Fasty',Footprints]];
const checkedLabel='Registro personal · No acredita inscripción';
const pretty=(n:number)=>new Intl.NumberFormat('es-PA',{maximumFractionDigits:1}).format(n);
function countdown(e:EventRecord){
 const d=daysToEvent(e.date);
 return d<0?'Evento finalizado':d===0?'¡Es hoy!':d===1?'Mañana':`Faltan ${d} días`;
}
function FastyFace(){return <span className="ep-avatar" aria-hidden="true"><i/><i/><b/></span>}
function IconStamp({number}:{number:number}){return <span className="ep-small-date"><strong>{String(number).padStart(2,'0')}</strong><small>NOV · DIC</small></span>}
function EventCard({event,index,selected,onOpen,onSave}:{event:EventRecord;index:number;selected:boolean;onOpen:()=>void;onSave:()=>void}){
 return <article className="ep-event-card" data-ep-tour={index===0?'event-card':undefined}>
  <button type="button" className={'ep-event-art ep-art-'+index%4} onClick={onOpen} aria-label={'Ver '+event.name}>
   <span className="ep-art-label">PANAMÁ / RUNNING 2026</span><strong>{event.distancesKm.some(k=>k>=21)?'21K+':event.distancesKm.some(k=>k===10)?'10K':event.distancesKm.some(k=>k===5)?'5K':distanceLabel(event.distancesKm.slice(0,1))}</strong>
   <span className="ep-art-track" aria-hidden="true"/>
   <span className="ep-art-caption">CARRERA / EVENTO</span>
  </button>
  <div className="ep-event-meta"><span><CalendarDays size={15}/>{dateLabel(event.date)}</span><span><MapPin size={15}/>{event.city}</span></div>
  <h3>{event.name}</h3>
  <p>{event.venue} · {distanceLabel(event.distancesKm)}</p>
  <div className="ep-event-footer"><button type="button" onClick={onOpen}>Ver detalles <ArrowUpRight size={17}/></button><button type="button" className={selected?'ep-saved':''} onClick={onSave} aria-label={selected?'Eliminar de guardados':'Guardar '+event.name}><Bookmark size={19} fill={selected?'currentColor':'none'}/></button></div>
 </article>;
}
export default function EventPassportApp(){
 const [tab,setTab]=useState<EventTab>('inicio');
 const [detailId,setDetailId]=useState<string|null>(null);
 const [store,setStore]=useState<PassportState>(emptyPassport);
 const [ready,setReady]=useState(false);
 const [name,setName]=useState('Corredor');
 const [profile,setProfile]=useState(false);
 const [tour,setTour]=useState(false);
 const [filter,setFilter]=useState('Todas');
 const [search,setSearch]=useState('');
 const [registrationId,setRegistrationId]=useState<string|null>(null);
 const [distance,setDistance]=useState(5);
 const [bibInput,setBibInput]=useState('');
 const [declareConfirmed,setDeclareConfirmed]=useState(false);
 const [asked,setAsked]=useState('');
 const [answer,setAnswer]=useState('');
 const [message,setMessage]=useState('');
 const [toast,setToast]=useState('');
 useEffect(()=>{
  try{
   const p=localStorage.getItem(STORAGE_KEY);if(p)setStore(sanitizedPassport(JSON.parse(p)));
   const ownName=localStorage.getItem('zancada-event-name-v1');
   const legacy=localStorage.getItem('zancada-demo-v1');
   if(ownName)setName(ownName);else if(legacy){const v=JSON.parse(legacy);if(typeof v.name==='string'&&v.name.trim())setName(v.name)}
   if(localStorage.getItem('zancada-event-tour-v1')!=='done')setTour(true);
  }catch{setTour(true)}
  setReady(true);
 },[]);
 useEffect(()=>{if(ready)try{localStorage.setItem(STORAGE_KEY,JSON.stringify(store))}catch{}},[store,ready]);
 useEffect(()=>{if(ready)try{localStorage.setItem('zancada-event-name-v1',name)}catch{}},[name,ready]);
 const notify=(s:string)=>{setToast(s);window.setTimeout(()=>setToast(''),3500)};
 const goto=useCallback((next:EventTab,eventId?:string)=>{setTab(next);setDetailId(eventId??null);window.scrollTo({top:0,behavior:'instant'})},[]);
 const open=(id:string)=>goto('eventos',id);
 const save=(id:string)=>{setStore(s=>toggleSaved(s,id));notify(store.savedIds.includes(id)?'Eliminada de guardados':'Carrera guardada. Todavía no es una inscripción.')};
 const upcoming=events.filter(e=>daysToEvent(e.date)>=0);
 const activeParticipations=store.participations.map(p=>({p,e:eventById(p.eventId)})).filter((x):x is {p:Participation;e:EventRecord}=>Boolean(x.e)).sort((a,b)=>a.e.date.localeCompare(b.e.date));
 const nextRegistration=activeParticipations.find(x=>daysToEvent(x.e.date)>=0)??activeParticipations[0];
 const featured=nextRegistration?.e??upcoming[0]??events[0];
 const selectedEvent=detailId?eventById(detailId):undefined;
 const registrationEvent=registrationId?eventById(registrationId):undefined;
 const bibEvent=nextRegistration?.e;
 const bib=nextRegistration?.p;
 const eventForFasty=bibEvent??selectedEvent??featured;
 const shown=useMemo(()=>events.filter(e=>(filter==='Todas'||e.distancesKm.some(k=>filter==='5K'?k===5:filter==='10K'?k===10:filter==='21K'?k>=21:true))&&(!search||[e.name,e.city,e.venue].join(' ').toLowerCase().includes(search.toLowerCase()))),[filter,search]);
 const prepareRegistration=(e:EventRecord)=>{setDistance(e.distancesKm[0]);setBibInput('');setDeclareConfirmed(false);setRegistrationId(e.id)};
 const declare=(e:React.FormEvent)=>{e.preventDefault();if(!registrationEvent||!declareConfirmed)return;
  setStore(s=>recordParticipation(s,registrationEvent.id,distance,bibInput,new Date().toISOString()));
  setRegistrationId(null);goto('dorsal');notify('Participación personal guardada. No verifica inscripción oficial.');
 };
 const ask=(q:string)=>{const t=q.toLowerCase();setAsked(q);setMessage('');const e=eventForFasty;
  if(/dorsal|número/.test(t)){setAnswer('Tu dorsal personal aparece en «Mi dorsal» después de declarar una participación. Si aún no tienes número, lo dejamos pendiente. No funciona como acreditación oficial.');return}
  if(/kit|retir/.test(t)){setAnswer(e.kitInfo?`Para «${e.name}»: ${e.kitInfo} Confírmalo en la fuente del evento.`:`Para «${e.name}» no tengo una entrega de kit confirmada. Consulta el sitio original; no voy a inventarte hora o ubicación.`);return}
  if(/cuánto|cuando|cuándo|fecha|falta/.test(t)){setAnswer(`${e.name}: ${dateLabel(e.date)}. ${countdown(e)}. Lugar publicado: ${e.venue}, ${e.city}. Puedes consultar su fuente desde la ficha del evento.`);return}
  if(/dónde|donde|salida|ruta/.test(t)){setAnswer(`El lugar anunciado para ${e.name} es ${e.venue}, ${e.city}. No dispongo de un recorrido oficial validado para todas las distancias; abre la ficha y sigue la fuente original.`);return}
  if(/llevar|prepar|checklist/.test(t)){setAnswer('Antes de salir: confirma la inscripción en el sitio oficial, revisa ruta y llegada, averigua el retiro de kit, prepara zapatillas y ropa y organiza tu transporte. Puedes marcar estas tareas en «Mi dorsal».');return}
  if(/evento|carrera|5k|10k/.test(t)){setAnswer(`Encontré ${events.length} carreras anunciadas en el catálogo curado de Panamá. Abre «Eventos» y filtra por distancia. ZANCADA solo muestra información pública; confirma cupos y precio con el organizador.`);return}
  setAnswer('Te ayudo con eventos, inscripción externa, dorsales personales, kit, ruta, fechas y preparación. Puedes preguntar «¿Cuándo retiro el kit?» o «¿Cuánto falta para mi carrera?».');
 };
 const sourceLink=(e:EventRecord,label='Consultar fuente original')=><a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">{label} <ExternalLink size={15}/></a>;
 return <div className="ep-app">
  <header className="ep-top"><button type="button" onClick={()=>goto('inicio')} className="ep-logo" aria-label="ZANCADA Inicio"><span>ZANCADA</span><b>PTY</b><i/></button><div className="ep-top-right"><span className="ep-top-edition">EL PASAPORTE DEL CORREDOR</span><button type="button" className="ep-profile-button" aria-label="Abrir perfil" onClick={()=>setProfile(true)}><UserRound size={21}/></button></div></header>
  <div className="ep-desktop-shell"><aside className="ep-sidebar" aria-label="Navegación principal"><p>TU ESPACIO</p>{views.map(([key,label,Icon])=><button type="button" key={key} className={key===tab?'active':''} onClick={()=>goto(key)}><Icon size={20}/>{label}</button>)}<div className="ep-side-note"><FastyFace/><strong>Una carrera a la vez.</strong><span>Fasty te acompaña antes y después de la meta.</span></div></aside>
  <div className="ep-page">
  {tab==='inicio'&&<main className="ep-home">
   <section className="ep-home-heading" data-ep-tour="intro"><span className="ep-kicker"><span className="ep-kicker-dot"/> BIENVENIDO A TU PASAPORTE</span><h1>Tu próxima historia <em>empieza en una salida.</em></h1><p>Descubre carreras. Prepara lo importante. Guarda cada meta que cruces.</p></section>
   <section className="ep-next-event" data-ep-tour="upcoming"><div className="ep-next-visual"><span className="ep-hero-caption">{nextRegistration?'TU PRÓXIMA PARTICIPACIÓN':'EVENTO DESTACADO · PANAMÁ'}</span><div className="ep-hero-track" aria-hidden="true"><i/><i/><i/></div><span className="ep-hero-distance">{pretty(featured.distancesKm.find(d=>d>=5)??featured.distancesKm[0])}<small>K</small></span><span className="ep-hero-seal">RUN<br/>PTY</span></div><div className="ep-next-info"><span className="ep-tag">{nextRegistration?'PARTICIPACIÓN DECLARADA · NO VERIFICADA':'INFORMACIÓN PÚBLICA CURADA'}</span><h2>{featured.name}</h2><div className="ep-next-meta"><span><CalendarDays size={16}/>{dateLabel(featured.date)}</span><span><MapPin size={16}/>{featured.city}</span></div><strong className="ep-countdown"><Clock3 size={18}/>{countdown(featured)}</strong><div className="ep-action-row"><button className="ep-primary" onClick={()=>nextRegistration?goto('dorsal'):open(featured.id)}>{nextRegistration?'Ver mi dorsal':'Ver evento'} <ArrowRight size={19}/></button><button className="ep-secondary" onClick={()=>save(featured.id)}><Bookmark size={17} fill={store.savedIds.includes(featured.id)?'currentColor':'none'}/>{store.savedIds.includes(featured.id)?'Guardado':'Guardar'}</button></div></div></section>
   <section className="ep-fasty-strip" data-ep-tour="fasty-strip"><FastyFace/><div><span>FASTY / TE ACOMPAÑA</span><p>{nextRegistration?`Tienes una carrera registrada. Antes de salir, revisa la información del evento y lo que necesitas llevar.`:'¿Aún no eliges carrera? Te ayudo a encontrar una que encaje con tu distancia.'}</p></div><button onClick={()=>goto('fasty')} aria-label="Preguntar a Fasty"><ArrowUpRight size={19}/></button></section>
   <div className="ep-section-heading"><div><span>DESCUBRE TU PRÓXIMO RETO</span><h2>Carreras en camino</h2></div><button onClick={()=>goto('eventos')}>Ver todas <ArrowUpRight size={16}/></button></div>
   <div className="ep-home-list">{upcoming.slice(0,3).map(e=><button key={e.id} onClick={()=>open(e.id)} className="ep-home-event"><span className="ep-home-date"><strong>{e.date.slice(8)}</strong><small>{new Intl.DateTimeFormat('es-PA',{month:'short',timeZone:'America/Panama'}).format(new Date(e.date+'T12:00:00-05:00')).toUpperCase()}</small></span><span className="ep-home-event-info"><strong>{e.name}</strong><small>{distanceLabel(e.distancesKm)} · {e.city}</small></span><ChevronRight size={19}/></button>)}</div>
   <section className="ep-calendar-teaser" data-ep-tour="calendar"><div className="ep-section-heading"><div><span>AGENDA DEL CORREDOR</span><h2>Fechas importantes</h2></div><CalendarDays size={22}/></div><p>{store.savedIds.length? `Tienes ${store.savedIds.length} carreras guardadas. Consulta cada ficha antes de salir.`:'Guarda un evento para empezar tu propia agenda de carreras.'}</p><div className="ep-calendar-tags">{events.filter(e=>store.savedIds.includes(e.id)).slice(0,3).map(e=><button key={e.id} onClick={()=>open(e.id)}>{dateLabel(e.date)} · {e.name} <ChevronRight size={15}/></button>)}{!store.savedIds.length&&<button onClick={()=>goto('eventos')}>Explorar carreras <ArrowUpRight size={16}/></button>}</div></section>
  </main>}
  {tab==='eventos'&&<main className="ep-events">
   {selectedEvent?<><button className="ep-back" onClick={()=>setDetailId(null)}><ArrowLeft size={18}/> Volver a eventos</button>
    <section className="ep-event-detail" data-ep-tour="event-detail"><div className="ep-detail-cover"><span>PASAPORTE DE CARRERAS / PANAMÁ</span><strong>{distanceLabel(selectedEvent.distancesKm)}</strong><span>FICHA DE EVENTO · INFORMACIÓN PÚBLICA</span></div><div className="ep-detail-text"><span className="ep-kicker">CARRERA / INFORMACIÓN VERIFICABLE EN SU ORIGEN</span><h1>{selectedEvent.name}</h1><p>{selectedEvent.description}</p><div className="ep-detail-facts"><div><CalendarDays size={18}/><small>FECHA</small><strong>{dateLabel(selectedEvent.date)}</strong></div><div><Clock3 size={18}/><small>HORA</small><strong>{selectedEvent.startTime??'Por confirmar'}</strong></div><div><MapPin size={18}/><small>LUGAR</small><strong>{selectedEvent.venue}, {selectedEvent.city}</strong></div><div><Flag size={18}/><small>DISTANCIAS</small><strong>{distanceLabel(selectedEvent.distancesKm)}</strong></div></div>
     <div className="ep-action-row"><button data-ep-tour="save-event" className="ep-secondary" onClick={()=>save(selectedEvent.id)}><Bookmark size={17} fill={store.savedIds.includes(selectedEvent.id)?'currentColor':'none'}/>{store.savedIds.includes(selectedEvent.id)?'Quitar de guardados':'Guardar carrera'}</button><button data-ep-tour="register-event" className="ep-primary" onClick={()=>prepareRegistration(selectedEvent)}>Ya me inscribí afuera <ArrowRight size={17}/></button></div>
    </div></section>
    <div className="ep-detail-sections"><section><h2>Inscripción externa</h2><p>ZANCADA no procesa pagos ni confirma cupos. Visita la plataforma correspondiente para conocer las condiciones actuales.</p>{selectedEvent.registrationUrl?<a href={selectedEvent.registrationUrl} target="_blank" rel="noopener noreferrer" className="ep-external-primary">Ir al sitio de inscripción <ExternalLink size={17}/></a>:sourceLink(selectedEvent,'Ver información en el sitio original')}</section><section><h2>Antes de la salida</h2><p><strong>Ruta:</strong> consulta el trazado oficial en el enlace de origen.</p><p><strong>Kit:</strong> {selectedEvent.kitInfo??'Fecha y punto de retiro por confirmar en la fuente.'}</p>{selectedEvent.evidenceNote&&<p><strong>Nota publicada:</strong> {selectedEvent.evidenceNote}</p>}</section><section><h2>Origen de la información</h2><p>Fuente consultada el 3 de noviembre de 2026. Los horarios, cupos, rutas y precios pueden cambiar.</p>{sourceLink(selectedEvent)}</section></div>
   </>:<><section className="ep-list-heading" data-ep-tour="catalog"><span className="ep-kicker"><span className="ep-kicker-dot"/> CALENDARIO DE RUNNING / PANAMÁ</span><h1>Corre donde <em>quieras estar.</em></h1><p>Diez eventos anunciados públicamente y documentados con fuentes. La inscripción se hace fuera de ZANCADA.</p></section><div className="ep-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} aria-label="Buscar carreras" placeholder="Carrera, ciudad o lugar…"/></div><div className="ep-chips" role="group" aria-label="Filtrar distancia">{['Todas','5K','10K','21K'].map(x=><button key={x} className={filter===x?'selected':''} onClick={()=>setFilter(x)} aria-pressed={filter===x}>{x}</button>)}</div><div className="ep-events-grid">{shown.map((e,i)=><EventCard key={e.id} event={e} index={i} selected={store.savedIds.includes(e.id)} onOpen={()=>open(e.id)} onSave={()=>save(e.id)}/>)}</div>{!shown.length&&<div className="ep-empty"><Search size={29}/><h2>Sin coincidencias</h2><p>Prueba otra distancia o ubicación.</p></div>}<p className="ep-data-note"><Info size={16}/> Catálogo curado · última revisión 03/11/2026. Consulta siempre el enlace original antes de inscribirte.</p></>}
  </main>}
  {tab==='dorsal'&&<main className="ep-bib-view"><span className="ep-kicker"><span className="ep-kicker-dot"/> TU HISTORIA DE CARRERAS</span><h1>Mi Dorsal<span>.</span></h1><p className="ep-lead">Tu participación, tus preparativos y los recuerdos que todavía vas a construir.</p>
   <section className="ep-bib-object" data-ep-tour="bib"><div className="ep-bib-top"><span>ZANCADA / PASAPORTE PERSONAL</span><span>PTY · RUNNING</span></div><div className="ep-bib-holes" aria-hidden="true"><i/><i/></div><div className="ep-bib-body"><span className="ep-bib-event">{bibEvent?bibEvent.name:'TU PRÓXIMA LÍNEA DE SALIDA'}</span><strong className="ep-bib-number">{bib?.bibNumber??'— — —'}</strong><span className="ep-bib-caption">{bib?.bibNumber?'NÚMERO INTRODUCIDO POR TI':'NÚMERO PENDIENTE'}</span><h2>{name}</h2><div className="ep-bib-details"><div><span>DISTANCIA</span><strong>{bib?pretty(bib.distanceKm)+'K':'SIN CARRERA'}</strong></div><div><span>FECHA</span><strong>{bibEvent?dateLabel(bibEvent.date):'Por elegir'}</strong></div></div></div><div className="ep-bib-foot"><span>{bib?'PARTICIPACIÓN DECLARADA POR TI':'AÚN SIN PARTICIPACIÓN'}</span><span>NO ACREDITA ACCESO</span></div></section>
   <div className="ep-bib-disclaimer"><Info size={18}/><p>Este dorsal es un <strong>registro personal</strong>. No verifica inscripciones, no sustituye el dorsal del organizador y no incluye un QR de acceso.</p></div>
   {!bibEvent&&<section className="ep-empty-bib"><h2>Tu pasaporte comienza con una carrera.</h2><p>Explora un evento, inscríbete por el canal indicado y registra aquí tu participación cuando corresponda.</p><button className="ep-primary" onClick={()=>goto('eventos')}>Explorar eventos <ArrowRight size={17}/></button></section>}
   {bibEvent&&<section className="ep-bib-brief"><div><strong>{bibEvent.name}</strong><span>{countdown(bibEvent)} · {bibEvent.venue}</span></div><button onClick={()=>open(bibEvent.id)}>Abrir ficha <ArrowUpRight size={16}/></button></section>}
   <section className="ep-prep" data-ep-tour="preparation"><div className="ep-section-heading"><div><span>ANTES DE SALIR</span><h2>Checklist de carrera</h2></div><ClipboardCheck size={23}/></div><p>{bibEvent?'Marca lo que vayas preparando. Esta lista se guarda solo en tu dispositivo.':'Así podrás organizar tu preparación cuando registres una participación.'}</p>{eventChecklist.map(t=><label key={t.id} className={'ep-checkrow '+(bibEvent&&store.completedChecklist[bibEvent.id]?.includes(t.id)?'checked':'')}><input type="checkbox" disabled={!bibEvent} checked={Boolean(bibEvent&&store.completedChecklist[bibEvent.id]?.includes(t.id))} onChange={()=>bibEvent&&setStore(s=>toggleChecklist(s,bibEvent.id,t.id))}/><span className="ep-checkmark"><Check size={14}/></span><span>{t.label}</span></label>)}</section>
   <section className="ep-bib-passport"><div className="ep-section-heading"><div><span>HISTORIAL DEL CORREDOR</span><h2>Mi pasaporte</h2></div><Ticket size={22}/></div>{store.participations.length?store.participations.map(p=>{const e=eventById(p.eventId);return e?<button className="ep-history-row" key={p.eventId} onClick={()=>open(p.eventId)}><span className="ep-history-stamp">{pretty(p.distanceKm)}K</span><span><strong>{e.name}</strong><small>Participación declarada · {dateLabel(e.date)}</small></span><ChevronRight size={18}/></button>:null}):<p>Cuando registres una participación, su dorsal aparecerá en tu pasaporte. Los resultados reales se incorporarán más adelante.</p>}</section>
  </main>}
  {tab==='fasty'&&<main className="ep-fasty-page" data-ep-tour="fasty"><div className="ep-fasty-header"><FastyFace/><span className="ep-kicker">FASTY / ASISTENTE DE CARRERAS</span><h1>Una carrera. <em>Todo más claro.</em></h1><p>Te acompaño desde la inscripción externa hasta el día del evento. Si falta información, te diré dónde verificarla.</p></div><section className="ep-fasty-chat"><div className="ep-fasty-bubble"><FastyFace/><p>¡Hola, {name}! ¿Quieres saber qué carreras hay, cuándo retirar el kit o cómo preparar tu próxima salida?</p></div>{answer&&<><div className="ep-fasty-question">{asked}</div><div className="ep-fasty-bubble"><FastyFace/><p>{answer}</p></div></>}<div className="ep-fasty-options">{['¿Qué carreras de 5K hay?','¿Cuánto falta para mi carrera?','¿Dónde retiro el kit?','¿Qué necesito llevar?','Muéstrame mi dorsal'].map(q=><button key={q} onClick={()=>{if(q.includes('dorsal'))goto('dorsal');else ask(q)}}>{q}<ArrowUpRight size={16}/></button>)}</div><form className="ep-fasty-form" onSubmit={e=>{e.preventDefault();if(message.trim())ask(message.trim())}}><input value={message} onChange={e=>setMessage(e.target.value)} aria-label="Pregunta para Fasty" placeholder="Pregúntale a Fasty…"/><button aria-label="Enviar pregunta"><Send size={20}/></button></form><p className="ep-fasty-disclaimer">Modo demo basado en el catálogo curado. No consulta inscripciones oficiales, clima en vivo ni datos médicos.</p></section></main>}
  <footer className="ep-footer"><span>ZANCADA · PASAPORTE DEL CORREDOR</span><span>INFORMACIÓN CURADA · VERIFICA EN FUENTE ORIGINAL</span></footer>
  </div></div>
  <nav className="ep-bottom-nav" aria-label="Navegación principal">{views.map(([key,label,Icon])=><button type="button" key={key} aria-current={tab===key?'page':undefined} className={tab===key?'active':''} onClick={()=>goto(key)}><Icon size={21}/><span>{label}</span></button>)}</nav>
  {registrationEvent&&<div className="ep-modal-layer" role="presentation"><form className="ep-modal" onSubmit={declare} role="dialog" aria-modal="true" aria-labelledby="ep-register-title"><div className="ep-modal-title"><div><span className="ep-kicker">REGISTRO PERSONAL</span><h2 id="ep-register-title">¿Ya te inscribiste por fuera?</h2></div><button type="button" onClick={()=>setRegistrationId(null)} aria-label="Cerrar"><X size={21}/></button></div><p>Esto no realiza una inscripción ni procesa un pago. Solo crea un registro personal para preparar tu participación en <strong>{registrationEvent.name}</strong>.</p><label>Distancia que elegiste<select value={String(distance)} onChange={e=>setDistance(Number(e.target.value))}>{registrationEvent.distancesKm.map(x=><option key={x} value={x}>{pretty(x)} km</option>)}</select></label><label>Número de dorsal (si ya te lo entregaron)<input value={bibInput} maxLength={24} onChange={e=>setBibInput(e.target.value)} placeholder="Déjalo vacío si no lo sabes"/></label><label className="ep-confirm"><input type="checkbox" checked={declareConfirmed} onChange={e=>setDeclareConfirmed(e.target.checked)}/><span>Confirmo que realicé mi inscripción fuera de ZANCADA. Entiendo que este registro personal no verifica mi participación ni reemplaza el dorsal oficial.</span></label><div className="ep-modal-actions"><button type="button" className="ep-secondary" onClick={()=>setRegistrationId(null)}>Cancelar</button><button className="ep-primary" type="submit" disabled={!declareConfirmed}>Crear dorsal personal <ArrowRight size={17}/></button></div></form></div>}
  {profile&&<div className="ep-modal-layer" role="presentation"><section className="ep-modal" role="dialog" aria-modal="true" aria-labelledby="ep-profile-title"><div className="ep-modal-title"><h2 id="ep-profile-title">Tu perfil</h2><button onClick={()=>setProfile(false)} aria-label="Cerrar perfil"><X size={21}/></button></div><p>Este es tu pasaporte personal de demostración. Los datos se guardan localmente en este navegador.</p><label>Nombre en el dorsal<input value={name} maxLength={50} onChange={e=>setName(e.target.value)}/></label><button className="ep-secondary ep-replay" onClick={()=>{setProfile(false);setTour(true)}}>Ayuda · Repetir recorrido <ArrowRight size={17}/></button><button className="ep-primary ep-modal-done" onClick={()=>setProfile(false)}>Guardar cambios <Check size={18}/></button></section></div>}
  {tour&&ready&&<EventTour onNavigate={goto} onClose={()=>setTour(false)}/>}
  {toast&&<div role="status" className="ep-toast"><CheckCircle2 size={18}/>{toast}</div>}
 </div>;
}

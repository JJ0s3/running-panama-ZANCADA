'use client';
import {useMemo,useState} from 'react';
import {ArrowRight,ArrowUpRight,CalendarDays,ChevronDown,ExternalLink,Flag,Info,MapPin,Search,Trophy,Route,Medal} from 'lucide-react';
import {RESULT_CATALOG,RESULTS_CHECKED_AT,filterResultCatalog,resultDate} from '../lib/results-catalog';
import type {ResultRecord} from '../lib/results-catalog';

const months=[['Todos','Todos los meses'],['01','Enero'],['02','Febrero'],['03','Marzo'],['04','Abril'],['05','Mayo'],['06','Junio'],['07','Julio'],['08','Agosto'],['09','Septiembre'],['10','Octubre'],['11','Noviembre'],['12','Diciembre']];
const published=RESULT_CATALOG.filter(x=>x.linkStatus==='published');

function SourceStatus({item}:{item:ResultRecord}){
 return <span className={'zr-status '+(item.linkStatus==='published'?'zr-status-published':'zr-status-followup')}>
  {item.linkStatus==='published'?<Medal size={14}/>:<Route size={14}/>}
  {item.linkStatus==='published'?'Resultados enlazados':'Seguimiento en fuente'}
 </span>;
}

export function ResultsPreview({onOpen}:{onOpen:()=>void}){
 return <section className="zr-home-preview" aria-labelledby="zr-home-title">
  <div className="zr-home-title"><span className="zr-eyebrow"><Trophy size={17}/> DESDE LAS METAS DE PANAMÁ</span><h2 id="zr-home-title">Últimos resultados</h2><p>Carreras con consulta publicada por la plataforma de cronometraje. Sin tiempos inventados.</p></div>
  <div className="zr-home-items">{RESULT_CATALOG.slice(0,3).map(item=><div key={item.id} className="zr-home-item"><span className="zr-home-date">{item.date.slice(8,10)}<small>{item.date.slice(5,7)==='11'?'NOV':'OCT'}</small></span><div><strong>{item.name}</strong><small>{item.location}</small></div><Trophy size={18} aria-hidden="true"/></div>)}</div>
  <button className="zr-home-open" type="button" onClick={onOpen}>Explorar resultados <ArrowRight size={18}/></button>
 </section>;
}

export default function ResultsHub(){
 const [query,setQuery]=useState('');
 const [year,setYear]=useState('Todos');
 const [month,setMonth]=useState('Todos');
 const [modality,setModality]=useState('Todas');
 const [status,setStatus]=useState('Todos');
 const [selectedId,setSelectedId]=useState<string|null>(null);
 const filtered=useMemo(()=>filterResultCatalog(RESULT_CATALOG,{query,year,month,modality,status}),[query,year,month,modality,status]);
 const clear=()=>{setQuery('');setYear('Todos');setMonth('Todos');setModality('Todas');setStatus('Todos');setSelectedId(null)};
 return <main className="zr-screen ep-results-page" aria-labelledby="zr-title">
   <section className="zr-hero" data-ep-tour="results">
    <span className="zr-eyebrow"><Flag size={17}/> EL MOMENTO DE CRUZAR LA META</span>
    <h1 id="zr-title">Cada meta tiene <em>una historia.</em></h1>
    <p>Encuentra carreras que ya ocurrieron en Panamá y accede a los resultados publicados por su fuente.</p>
    <div className="zr-hero-art" aria-hidden="true"><div className="zr-track zr-track-one"/><div className="zr-track zr-track-two"/><div className="zr-track zr-track-three"/><Trophy size={79} strokeWidth={1.4}/></div>
    <div className="zr-hero-foot"><span><strong>{published.length}</strong><small>Eventos con resultados enlazados</small></span><span><strong>{RESULT_CATALOG.length}</strong><small>Eventos en el catálogo</small></span></div>
   </section>
   <section className="zr-filter-card" aria-labelledby="zr-filter-title">
    <div className="zr-filter-head"><div><span className="zr-eyebrow"><Search size={16}/> EXPLORA</span><h2 id="zr-filter-title">Encuentra tu carrera</h2></div><span className="zr-counter">{filtered.length} coincidencias</span></div>
    <label className="zr-search"><Search size={20}/><span className="zr-visually-hidden">Buscar por carrera, zona o modalidad</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busca una carrera o ciudad…" type="search"/></label>
    <div className="zr-filters">
     <label>Año <span><select value={year} onChange={e=>setYear(e.target.value)}><option>Todos</option><option>2026</option></select><ChevronDown size={15}/></span></label>
     <label>Mes <span><select value={month} onChange={e=>setMonth(e.target.value)}>{months.map(([k,t])=><option value={k} key={k}>{t}</option>)}</select><ChevronDown size={15}/></span></label>
     <label>Modalidad <span><select value={modality} onChange={e=>setModality(e.target.value)}><option>Todas</option><option>Running</option><option>Trail</option><option>Por confirmar</option></select><ChevronDown size={15}/></span></label>
     <label>Consulta <span><select value={status} onChange={e=>setStatus(e.target.value)}><option value="Todos">Todas</option><option value="published">Resultados enlazados</option><option value="followup">Seguimiento en fuente</option></select><ChevronDown size={15}/></span></label>
    </div>
    <div className="zr-filter-foot"><span><Info size={15}/> Datos de eventos, no clasificación propia de ZANCADA</span><button type="button" onClick={clear}>Limpiar filtros</button></div>
   </section>
   <section className="zr-list" aria-label="Carreras con resultados">
    {filtered.map(item=><article className="zr-card" key={item.id}>
     <div className="zr-card-heading"><span className="zr-date-chip"><CalendarDays size={15}/>{resultDate(item.date)}</span><SourceStatus item={item}/></div>
     <h3>{item.name}</h3><div className="zr-location"><MapPin size={16}/><span>{item.location}</span></div>
     <div className="zr-card-footer"><span className="zr-type"><Flag size={15}/>{item.modality}</span><button type="button" aria-expanded={selectedId===item.id} onClick={()=>setSelectedId(old=>old===item.id?null:item.id)}>{selectedId===item.id?'Cerrar ficha':'Explorar ficha'}<ArrowRight size={17}/></button></div>
     {selectedId===item.id&&<div className="zr-detail"><h4><Trophy size={19}/> Consulta disponible</h4><p>{item.linkStatus==='published'?'La plataforma de origen tiene una página de resultados para esta carrera. Los tiempos, posiciones y dorsales deben consultarse allí hasta contar con integración autorizada.':'La plataforma de origen ofrece un enlace de seguimiento. No afirmamos que siga en vivo ni conocemos el estado actual del cronometraje.'}</p><div className="zr-detail-data"><span><CalendarDays size={15}/> {resultDate(item.date)}</span><span><MapPin size={15}/> {item.location}</span></div><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="zr-source-link">Consultar en Papaya25 <ExternalLink size={16}/></a></div>}
    </article>)}
    {!filtered.length&&<div className="zr-empty"><Search size={33}/><h3>Sin resultados para estos filtros</h3><p>Prueba otro mes, modalidad o nombre. El catálogo continuará creciendo con fuentes verificadas.</p><button type="button" onClick={clear}>Ver todas las carreras</button></div>}
   </section>
   <p className="zr-disclosure"><Info size={18}/> Catálogo curado a partir de <a href="https://papaya25.info/resultados.php" target="_blank" rel="noopener noreferrer">Papaya25 Resultados <ArrowUpRight size={15}/></a> · revisión {resultDate(RESULTS_CHECKED_AT)}. No hay integración oficial, ni tiempos individuales almacenados, ni garantía de actualización en tiempo real.</p>
 </main>;
}

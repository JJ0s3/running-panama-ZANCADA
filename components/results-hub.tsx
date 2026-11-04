'use client';
import {useMemo,useState} from 'react';
import {ArrowUpRight,ChevronDown,ChevronRight,ExternalLink,Info,Search} from 'lucide-react';
import {RESULT_CATALOG,RESULTS_CHECKED_AT,filterResultCatalog,resultDate} from '../lib/results-catalog';

const months=[['Todos','Todos los meses'],['01','Enero'],['02','Febrero'],['03','Marzo'],['04','Abril'],['05','Mayo'],['06','Junio'],['07','Julio'],['08','Agosto'],['09','Septiembre'],['10','Octubre'],['11','Noviembre'],['12','Diciembre']];
const monthShort=(date:string)=>new Intl.DateTimeFormat('es-PA',{month:'short',timeZone:'America/Panama'}).format(new Date(date+'T12:00:00-05:00')).replace('.','').toUpperCase();

export default function ResultsHub(){
 const [query,setQuery]=useState('');
 const [year,setYear]=useState('Todos');
 const [month,setMonth]=useState('Todos');
 const [modality,setModality]=useState('Todas');
 const [status,setStatus]=useState('Todos');
 const [selectedId,setSelectedId]=useState<string|null>(null);
 const filtered=useMemo(()=>filterResultCatalog(RESULT_CATALOG,{query,year,month,modality,status}),[query,year,month,modality,status]);
 const clear=()=>{setQuery('');setYear('Todos');setMonth('Todos');setModality('Todas');setStatus('Todos');setSelectedId(null)};
 return <main className="zb-results ep-results-page" aria-labelledby="zb-results-title">
  <header className="zb-results-head" data-ep-tour="results">
   <h1 id="zb-results-title">Resultados<span>.</span></h1>
   <p>Consulta carreras anteriores. Los tiempos oficiales siguen en la fuente.</p>
  </header>
  <section className="zb-results-filters" aria-label="Filtros de resultados">
   <label className="zb-results-search"><Search size={19} aria-hidden="true"/><span className="zr-visually-hidden">Buscar por carrera, zona o modalidad</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busca una carrera o ciudad…" type="search"/></label>
   <div className="zb-results-selects">
    <label>Año <span><select value={year} onChange={e=>setYear(e.target.value)}><option>Todos</option><option>2026</option></select><ChevronDown size={15}/></span></label>
    <label>Mes <span><select value={month} onChange={e=>setMonth(e.target.value)}>{months.map(([k,label])=><option key={k} value={k}>{label}</option>)}</select><ChevronDown size={15}/></span></label>
    <label>Modalidad <span><select value={modality} onChange={e=>setModality(e.target.value)}><option>Todas</option><option>Running</option><option>Trail</option><option>Por confirmar</option></select><ChevronDown size={15}/></span></label>
    <label>Consulta <span><select value={status} onChange={e=>setStatus(e.target.value)}><option value="Todos">Todas</option><option value="published">Publicados</option><option value="followup">En fuente</option></select><ChevronDown size={15}/></span></label>
   </div>
   <div className="zb-results-filter-footer"><span>{filtered.length} carreras</span><button type="button" onClick={clear}>Limpiar filtros</button></div>
  </section>
  <section className="zb-results-list" aria-label="Carreras con resultados">
   {filtered.map((item,i)=><article className="zb-result-card" key={item.id}>
    <button type="button" className="zb-race-row" aria-expanded={selectedId===item.id} onClick={()=>setSelectedId(old=>old===item.id?null:item.id)} aria-label={'Explorar ficha: '+item.name}>
     <span className={'zb-date-box'+(i===0?' zb-date-box-primary':'')} aria-hidden="true"><strong>{item.date.slice(8)}</strong><small>{monthShort(item.date)}</small></span>
     <span className="zb-race-description"><strong>{item.name}</strong><small>{item.location} · {item.modality}</small></span>
     <ChevronRight size={19} className="zb-row-arrow" aria-hidden="true"/>
    </button>
    {selectedId===item.id&&<div className="zb-result-detail">
     <span className="zb-result-state">{item.linkStatus==='published'?'Resultados publicados en la fuente':'Consulta de seguimiento'}</span>
     <p>{resultDate(item.date)}. {item.linkStatus==='published'?'Los tiempos y posiciones se consultan en Papaya25.':'El enlace proviene de la fuente; no afirmamos que siga en vivo.'}</p>
     <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Consultar en Papaya25 <ExternalLink size={16}/></a>
    </div>}
   </article>)}
   {!filtered.length&&<div className="zb-empty-state"><strong>Sin coincidencias</strong><p>Prueba otros filtros o busca por ciudad.</p><button type="button" className="zb-dark-button" onClick={clear}>Ver todas</button></div>}
  </section>
  <p className="zb-results-disclosure"><Info size={16}/> Datos de eventos tomados de <a href="https://papaya25.info/resultados.php" target="_blank" rel="noopener noreferrer">Papaya25 <ArrowUpRight size={14}/></a> (revisión {resultDate(RESULTS_CHECKED_AT)}). No hay integración oficial ni cronometraje propio.</p>
 </main>;
}

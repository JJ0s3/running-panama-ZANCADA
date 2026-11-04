'use client';
import {useEffect,useRef,useState} from 'react';
import type * as Leaflet from 'leaflet';
import {Compass,ExternalLink,Flag,MapPin,RefreshCw,Route as RouteIcon,AlertCircle} from 'lucide-react';
import {centerForCity,routeFor} from '../lib/route-sources';
import type {LatLng} from '../lib/parse-gpx';
import type {EventRecord} from '../lib/event-passport';

type RoutePayload={points:LatLng[];sourceUrl:string;publisher:string;label:string;kind:'published-gpx'};
export default function RouteViewer({event}:{event:EventRecord}){
 const supported=event.distancesKm.filter(distance=>Boolean(routeFor(event.id,distance)));
 const [distance,setDistance]=useState<number>(supported[0]??event.distancesKm[0]);
 const [route,setRoute]=useState<RoutePayload|null>(null);
 const [status,setStatus]=useState<'loading'|'available'|'unavailable'>('loading');
 const [error,setError]=useState('');
 const [revision,setRevision]=useState(0);
 const el=useRef<HTMLDivElement>(null);
 const map=useRef<Leaflet.Map|null>(null);
 useEffect(()=>{setDistance((event.distancesKm.find(n=>routeFor(event.id,n))??event.distancesKm[0]));},[event.id]);
 useEffect(()=>{
  const controller=new AbortController();
  const source=routeFor(event.id,distance);
  setRoute(null);setError('');
  if(!source){setStatus('unavailable');return()=>controller.abort()}
  setStatus('loading');
  fetch(`/api/race-route?id=${encodeURIComponent(event.id)}&distance=${encodeURIComponent(distance)}`,{signal:controller.signal})
   .then(async response=>{const data=await response.json();if(!response.ok)throw Error(data.error??'Ruta no disponible');return data as RoutePayload})
   .then(data=>{if(!controller.signal.aborted){setRoute(data);setStatus('available')}})
   .catch(e=>{if(!controller.signal.aborted){setStatus('unavailable');setError(String(e.message??e))}});
  return()=>controller.abort();
 },[event.id,distance,revision]);
 useEffect(()=>{
  let alive=true;
  if(!el.current)return;
  import('leaflet').then(L=>{
   if(!alive||!el.current)return;
   if(!map.current){
    map.current=L.map(el.current,{zoomControl:true,scrollWheelZoom:false,touchZoom:true,attributionControl:true})
      .setView(centerForCity(event.city),12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
     attribution:'© OpenStreetMap contributors',maxZoom:19
    }).addTo(map.current);
   }
   const current=map.current;
   if(!current)return;
   current.eachLayer(layer=>{if(!(layer instanceof L.TileLayer))current.removeLayer(layer)});
   if(route?.points?.length){
    const line=L.polyline(route.points,{color:'#FF721F',weight:5,opacity:.95,lineJoin:'round'}).addTo(current);
    const p=route.points[0],last=route.points[route.points.length-1];
    L.circleMarker(p,{radius:9,color:'#FFFFFF',weight:3,fillColor:'#00C8FF',fillOpacity:1}).addTo(current).bindPopup('Inicio del GPX publicado');
    L.circleMarker(last,{radius:7,color:'#FFFFFF',weight:3,fillColor:'#FF721F',fillOpacity:1}).addTo(current).bindPopup('Final del GPX publicado');
    current.fitBounds(line.getBounds().pad(.12),{animate:false,maxZoom:16});
   }else current.setView(centerForCity(event.city),12,{animate:false});
   requestAnimationFrame(()=>{if(alive)current.invalidateSize()});
  }).catch(()=>{if(alive){setError('No se pudo inicializar el mapa interactivo.')}});
  return()=>{alive=false};
 },[event.city,route]);
 useEffect(()=>()=>{map.current?.remove();map.current=null},[]);
 const published=routeFor(event.id,distance);
 return <section className="st-route-section" id="st-event-route" aria-labelledby="st-route-title">
  <div className="st-section-heading"><span className="st-eyebrow"><RouteIcon size={17}/> RECORRIDO DENTRO DE ZANCADA</span><h2 id="st-route-title">Conoce el terreno.</h2><p>Explora las calles, acerca el mapa y revisa el recorrido antes de la carrera.</p></div>
  {supported.length>0&&<div className="st-distance-tabs" role="group" aria-label="Distancia de la ruta">
   {event.distancesKm.map(d=><button type="button" key={d} onClick={()=>setDistance(d)} aria-pressed={distance===d} className={distance===d?'active':''}>{d}K {routeFor(event.id,d)?'· GPX':''}</button>)}
  </div>}
  <div className="st-map-wrap">
   <div className="st-leaflet-map" ref={el} role="application" aria-label={`Mapa interactivo de ${event.name}`} />
   <div className="st-map-info" role="status">
    {status==='loading'?<><RefreshCw size={18} className="st-spin"/><span>Cargando ruta publicada…</span></>:
      status==='available'?<><Flag size={18}/><span>Ruta {distance}K trazada desde GPX de {route?.publisher}. {route?.points.length} puntos.</span></>:
      <><AlertCircle size={18}/><span>{error||'Sin GPX disponible para esta distancia. Se muestra solo la zona general, no el recorrido ni el punto exacto de salida.'}</span></>}
   </div>
  </div>
  <div className="st-map-footer">
   <span><Compass size={16}/> {status==='available'?'La ruta sigue la geometría publicada; confirma posibles cambios.':'Vista de referencia general; no representa un trazado.'}</span>
   {published&&<a href={published.sourceUrl} rel="noopener noreferrer" target="_blank">Fuente GPX: {published.publisher} <ExternalLink size={15}/></a>}
   {error&&<button type="button" onClick={()=>setRevision(i=>i+1)}><RefreshCw size={15}/> Reintentar</button>}
  </div>
 </section>;
}

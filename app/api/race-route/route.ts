import {NextRequest,NextResponse} from 'next/server';
import {routeFor} from '../../../lib/route-sources';
import {parseGpx} from '../../../lib/parse-gpx';

// Server-side proxy for allowlisted public GPX; no generic fetch/proxy or secrets.
export async function GET(request:NextRequest){
 const id=request.nextUrl.searchParams.get('id')??'';
 const rawDistance=request.nextUrl.searchParams.get('distance')??'';
 const distance=Number(rawDistance);
 if(!/^[-\w]{1,64}$/.test(id)||!/^\d+(?:\.\d+)?$/.test(rawDistance))
  return NextResponse.json({error:'Parámetros inválidos.'},{status:400});
 const route=routeFor(id,distance);
 if(!route)return NextResponse.json({error:'No hay una ruta GPX publicada para esta distancia.'},{status:404});
 try{
  const response=await fetch(route.gpxUrl,{cache:'no-store',signal:AbortSignal.timeout(12000),headers:{Accept:'application/gpx+xml,application/xml,text/xml,*/*'}});
  if(!response.ok)return NextResponse.json({error:'El proveedor de la ruta no responde.'},{status:502});
  if(Number(response.headers.get('content-length')??0)>2_000_000)return NextResponse.json({error:'GPX demasiado grande.'},{status:502});
  const xml=await response.text();
  const points=parseGpx(xml);
  if(points.length<2)return NextResponse.json({error:'La fuente no devolvió puntos de ruta válidos.'},{status:502});
  return NextResponse.json({points,sourceUrl:route.sourceUrl,publisher:route.publisher,label:route.label,kind:'published-gpx'},
   {headers:{'Cache-Control':'public, max-age=300, s-maxage=3600'}});
 }catch{
  return NextResponse.json({error:'No fue posible cargar el GPX. Inténtalo de nuevo.'},{status:502});
 }
}

/** Strict extraction of GPX track / route points. No arbitrary XML execution or remote URL input. */
export type LatLng=[number,number];
export function parseGpx(xml:string):LatLng[]{
 if(typeof xml!=='string'||xml.length>2_000_000)throw new Error('GPX excede el límite permitido.');
 const read=(tag:'trkpt'|'rtept')=>{
  const pattern=new RegExp(`<${tag}\\b([^>]*)>`, 'gi');
  const coords:LatLng[]=[];
  for(const m of xml.matchAll(pattern)){
   const lat= m[1].match(/\blat\s*=\s*['"]([^'"]+)['"]/i)?.[1];
   const lon= m[1].match(/\blon\s*=\s*['"]([^'"]+)['"]/i)?.[1];
   if(lat===undefined||lon===undefined)continue;
   const la=Number(lat),lo=Number(lon);
   if(!Number.isFinite(la)||!Number.isFinite(lo)||Math.abs(la)>90||Math.abs(lo)>180)continue;
   if(!coords.length||coords[coords.length-1][0]!==la||coords[coords.length-1][1]!==lo)coords.push([la,lo]);
   if(coords.length>10_000)throw new Error('GPX excede el límite de puntos.');
  }
  return coords;
 };
 const points=read('trkpt');
 return points.length>=2?points:read('rtept');
}

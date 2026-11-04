/** Explicit allowlist. These are public GPX published by the registration platform, not inferred routes. */
export type RouteSource = {gpxUrl:string; sourceUrl:string; publisher:string; label:string};
export const ROUTE_SOURCES:Record<string,Record<number,RouteSource>>={
 'avon-2026':{
  5:{gpxUrl:'https://papaya25.info/events/carrera-avon/routes/15/gpx',sourceUrl:'https://papaya25.info/events/carrera-avon',publisher:'Papaya25',label:'5K'},
  10:{gpxUrl:'https://papaya25.info/events/carrera-avon/routes/16/gpx',sourceUrl:'https://papaya25.info/events/carrera-avon',publisher:'Papaya25',label:'10K'}
 },
 'santas-race-2026':{
  5:{gpxUrl:'https://papaya25.info/events/santas-race-2026/routes/14/gpx',sourceUrl:'https://papaya25.info/events/santas-race-2026',publisher:'Papaya25',label:'5K'}
 }
};
export const routeFor=(eventId:string,distance:number):RouteSource|undefined=>ROUTE_SOURCES[eventId]?.[distance];
/** City reference, deliberately not a start / finish pin. */
export const regionalCenters:Record<string,[number,number]>={
 'Ciudad de Panamá':[8.983,-79.516],
 'David, Chiriquí':[8.427,-82.432],
 'Penonomé, Coclé':[8.518,-80.358]
};
export function centerForCity(city:string):[number,number]{return regionalCenters[city]??regionalCenters['Ciudad de Panamá']}

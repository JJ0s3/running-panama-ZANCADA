export type SourceLevel='organizer'|'registration_platform';
export type EventRecord={
 id:string;name:string;date:string;city:string;venue:string;distancesKm:number[];
 startTime?:string;organizer?:string;sourceUrl:string;sourceLevel:SourceLevel;
 registrationUrl?:string;description:string;priceUsd?:number;kitInfo?:string;
 lastCheckedAt:'2026-11-03'; evidenceNote?:string;
};
export type Participation={eventId:string;declaredAt:string;distanceKm:number;bibNumber?:string;category?:string;resultMinutes?:number};
export type PassportState={savedIds:string[];participations:Participation[];completedChecklist:Record<string,string[]>};
export const STORAGE_KEY='zancada-event-passport-v1';
export const emptyPassport:PassportState={savedIds:[],participations:[],completedChecklist:{}};
export const events:EventRecord[]=[
 {id:'avon-2026',name:'Carrera AVON Panamá',date:'2026-11-08',startTime:'06:30',city:'Ciudad de Panamá',venue:'Cinta Costera 3',distancesKm:[5],organizer:'Carrera AVON',sourceUrl:'https://carreraavon.com/',sourceLevel:'organizer',registrationUrl:'https://papaya25.info/events/carrera-avon',description:'Una carrera y caminata que vuelve a Panamá como parte de una iniciativa regional de concienciación sobre el cáncer de mama.',priceUsd:20,lastCheckedAt:'2026-11-03'},
 {id:'pafra-nov-2026',name:'Campeonato PAFRA · Noviembre',date:'2026-11-15',startTime:'07:00',city:'Ciudad de Panamá',venue:'Clayton',distancesKm:[2,3,5,8,10],sourceUrl:'https://papaya25.info/calendario.php',sourceLevel:'registration_platform',description:'Jornada deportiva con diferentes distancias anunciadas en el calendario de Papaya25.',lastCheckedAt:'2026-11-03'},
 {id:'maraton-intl-2026',name:'Maratón Internacional de Panamá 2026',date:'2026-11-15',city:'Ciudad de Panamá',venue:'Punto de salida por confirmar',distancesKm:[5,10,21.097,42.195],organizer:'Club Corredores del Istmo',sourceUrl:'https://maratoninternacionaldepanama.com/',sourceLevel:'organizer',description:'Maratón con opciones de 5K, 10K, media maratón, maratón y relevos. Consultar disponibilidad por categoría directamente con la organización.',lastCheckedAt:'2026-11-03',evidenceNote:'La web ha anunciado cupos agotados en algunas modalidades.'},
 {id:'futuro-david-2026',name:'Carrera por el Futuro 5K',date:'2026-11-22',startTime:'07:00',city:'David, Chiriquí',venue:'Parque de las Madres',distancesKm:[1,5],organizer:'Cámara Junior de David',sourceUrl:'https://carreras.strydpanama.com/race/6d494596-07e0-4108-af73-8fdb57cca548',sourceLevel:'registration_platform',registrationUrl:'https://carreras.strydpanama.com/race/6d494596-07e0-4108-af73-8fdb57cca548',description:'Primera edición de una carrera comunitaria organizada para apoyar proyectos sociales en David.',lastCheckedAt:'2026-11-03',evidenceNote:'La ficha contiene precios distintos entre resumen y descripción técnica: confirmar antes de pagar.'},
 {id:'christmas-night-2026',name:'Christmas Night Run Fest',date:'2026-12-05',startTime:'18:30',city:'Ciudad de Panamá',venue:'Calzada de Amador',distancesKm:[5],organizer:'Green Solutions',sourceUrl:'https://carrerasnocturnaspty.com/',sourceLevel:'organizer',description:'Carrera recreativa nocturna de 5K con ambientación navideña junto a la bahía.',lastCheckedAt:'2026-11-03'},
 {id:'dogs-2026',name:'Christmas Running With Dogs',date:'2026-12-06',city:'Ciudad de Panamá',venue:'Mirador del Pacífico, Cinta Costera 1',distancesKm:[3],organizer:'Panama Runners',sourceUrl:'https://panamarunners.com/site/index.php?s=cDBoMnBPLlJzZWVNbGxhRWMxbzJsMF8yc09vUnRlbk1lbHZFZTE%3D',sourceLevel:'organizer',description:'Actividad de 3K anunciada en el calendario de Panama Runners para corredores que participan con sus mascotas.',lastCheckedAt:'2026-11-03'},
 {id:'pafra-dec-2026',name:'Campeonato PAFRA · Diciembre',date:'2026-12-06',startTime:'07:00',city:'Ciudad de Panamá',venue:'Clayton',distancesKm:[2,3,5,8,10],sourceUrl:'https://papaya25.info/calendario.php',sourceLevel:'registration_platform',description:'Nueva jornada del campeonato con pruebas anunciadas desde 2K hasta 10K.',lastCheckedAt:'2026-11-03'},
 {id:'navidad-penonome-2026',name:'Carrera Navideña Penonomé',date:'2026-12-13',city:'Penonomé, Coclé',venue:'El Retorno',distancesKm:[0.5,1,5],organizer:'Panama Runners',sourceUrl:'https://panamarunners.com/v2/?e=185',sourceLevel:'organizer',description:'Carrera familiar con horarios de salida distintos según distancia.',kitInfo:'Materiales: sábado 12 de diciembre, 11:00 a 17:00, Lucía Coffee House en El Retorno Food Park.',lastCheckedAt:'2026-11-03',evidenceNote:'Salidas anunciadas: 0.5K 06:30, 1K 06:40 y 5K 07:00.'},
 {id:'santas-race-2026',name:"Santa's Race 2026",date:'2026-12-13',startTime:'07:00',city:'Ciudad de Panamá',venue:'Ciudad del Saber',distancesKm:[5],organizer:'Sport & Health',sourceUrl:'https://www.santasrace.com/',sourceLevel:'organizer',registrationUrl:'https://www.santasrace.com/',description:'Carrera festiva de 5K con punto de salida y llegada en Ciudad del Saber; el número se compra o activa mediante los canales de la organización.',priceUsd:10,lastCheckedAt:'2026-11-03',evidenceNote:'Solo el sitio de la organización puede activar y validar el BIB.'},
 {id:'san-silvestre-2026',name:'San Silvestre · Despedida de Temporada',date:'2026-12-27',city:'Ciudad de Panamá',venue:'Clayton, Ciudad del Saber',distancesKm:[1,5],organizer:'Panama Runners',sourceUrl:'https://panamarunners.com/site/index.php?s=cDBoMnBPLlJzZWVNbGxhRWMxbzJsMF8yc09vUnRlbk1lbHZFZTE%3D',sourceLevel:'organizer',description:'Carrera de cierre de temporada anunciada por Panama Runners en las distancias 1K y 5K.',lastCheckedAt:'2026-11-03'}
];
export const eventById=(id:string):EventRecord|undefined=>events.find(e=>e.id===id);
export const dateLabel=(iso:string)=>new Intl.DateTimeFormat('es-PA',{day:'numeric',month:'long',year:'numeric',timeZone:'America/Panama'}).format(new Date(iso+'T12:00:00-05:00'));
export const distanceLabel=(kms:number[])=>kms.map(x=>Number.isInteger(x)?x+'K':x.toLocaleString('es-PA',{maximumFractionDigits:3})+'K').join(' · ');
export function daysToEvent(iso:string,now:Date=new Date()):number{
 const panamaDay=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Panama',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 const toEpoch=(d:string)=>Date.UTC(Number(d.slice(0,4)),Number(d.slice(5,7))-1,Number(d.slice(8,10)));
 return Math.round((toEpoch(iso)-toEpoch(panamaDay))/86400000);
}
export const eventChecklist=[
 {id:'registration',label:'Confirmar los datos en la plataforma de inscripción'},
 {id:'route',label:'Revisar ruta, punto de salida y transporte'},
 {id:'kit',label:'Consultar fecha y lugar de retiro del kit'},
 {id:'gear',label:'Preparar zapatillas, ropa y número si ya lo tienes'},
 {id:'hydration',label:'Preparar hidratación según las indicaciones del evento'},
 {id:'alarm',label:'Organizar el horario de llegada y despertador'}
] as const;
export function sanitizedPassport(value:unknown):PassportState{
 if(!value||typeof value!=='object')return {...emptyPassport,completedChecklist:{}};
 const p=value as Partial<PassportState>;
 const ids=new Set(events.map(e=>e.id));
 const saved=Array.isArray(p.savedIds)?p.savedIds.filter((id):id is string=>typeof id==='string'&&ids.has(id)):[];
 const participations=Array.isArray(p.participations)?p.participations.filter((x):x is Participation=>Boolean(x&&typeof x.eventId==='string'&&ids.has(x.eventId)&&typeof x.distanceKm==='number'&&eventById(x.eventId)?.distancesKm.includes(x.distanceKm)&&typeof x.declaredAt==='string')).map(x=>({...x,bibNumber:typeof x.bibNumber==='string'?x.bibNumber.slice(0,24):undefined})):[];
 const completedChecklist:Record<string,string[]>={};
 if(p.completedChecklist&&typeof p.completedChecklist==='object'){
  for(const [eventId,v] of Object.entries(p.completedChecklist)){
   if(ids.has(eventId)&&Array.isArray(v))completedChecklist[eventId]=v.filter((code):code is string=>typeof code==='string'&&eventChecklist.some(c=>c.id===code));
  }
 }
 return {savedIds:[...new Set(saved)],participations,completedChecklist};
}
export const participationFor=(p:PassportState,id:string)=>p.participations.find(x=>x.eventId===id);
export function recordParticipation(p:PassportState,eventId:string,distanceKm:number,bibNumber:string,at:string):PassportState{
 const e=eventById(eventId);
 if(!e||!e.distancesKm.includes(distanceKm))throw new Error('Distancia o evento no válido');
 const number=bibNumber.trim().slice(0,24);
 const next:Participation={eventId,declaredAt:at,distanceKm,...(number?{bibNumber:number}:{})};
 return {...p,savedIds:[...new Set([...p.savedIds,eventId])],participations:[...p.participations.filter(x=>x.eventId!==eventId),next]};
}
export function toggleSaved(p:PassportState,id:string):PassportState{
 if(!eventById(id))return p;
 return {...p,savedIds:p.savedIds.includes(id)?p.savedIds.filter(x=>x!==id):[...p.savedIds,id]};
}
export function toggleChecklist(p:PassportState,eventId:string,code:string):PassportState{
 if(!eventById(eventId)||!eventChecklist.some(x=>x.id===code))return p;
 const present=p.completedChecklist[eventId]??[];
 return {...p,completedChecklist:{...p.completedChecklist,[eventId]:present.includes(code)?present.filter(x=>x!==code):[...present,code]}};
}

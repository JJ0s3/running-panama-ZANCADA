/**
 * Public event-level metadata curated from Papaya25's public results index.
 * This is NOT a timing database and is not an official ZANCADA integration.
 * Indexed 2026-11-04 America/Panama; results may change at their source.
 */
export type ResultModality = 'Running' | 'Trail' | 'Por confirmar';
export type ResultLinkStatus = 'published' | 'followup';
export type ResultRecord = {
  id: string;
  name: string;
  date: string;
  location: string;
  modality: ResultModality;
  sourceUrl: string;
  linkStatus: ResultLinkStatus;
  sourceName: 'Papaya25';
};

export const RESULTS_CHECKED_AT = '2026-11-04';
export const RESULT_CATALOG: readonly ResultRecord[] = [
  {id:'cerro-azul-trail-2026',name:'Cerro Azul Trail Challengue',date:'2026-11-01',location:'Utivé, Pacora',modality:'Trail',sourceUrl:'https://papaya25.info/events/cerro-azul-trail-challengue/live',linkStatus:'followup',sourceName:'Papaya25'},
  {id:'vikings-2026',name:'VIKINGS RACE',date:'2026-10-18',location:'Hacienda Country Club, Cerro Azul',modality:'Por confirmar',sourceUrl:'https://papaya25.info/events/vikings-race/results',linkStatus:'published',sourceName:'Papaya25'},
  {id:'carrera-esperanza-2026',name:'Carrera por la esperanza',date:'2026-10-18',location:'Cinta Costera, Mirador del Pacífico',modality:'Running',sourceUrl:'https://papaya25.info/events/carrera-por-la-esperanza/results',linkStatus:'published',sourceName:'Papaya25'},
  {id:'pafra-octubre-2026',name:'Campeonato PAFRA Octubre',date:'2026-10-11',location:'Clayton, Ciudad de Panamá',modality:'Running',sourceUrl:'https://papaya25.info/resultados/mod/index.php?idc=16935',linkStatus:'published',sourceName:'Papaya25'},
  {id:'istmo-race-2026',name:'ISTMO RACE 2026',date:'2026-10-11',location:'Panamá Pacífico',modality:'Running',sourceUrl:'https://papaya25.info/events/istmo-race-2026/results',linkStatus:'published',sourceName:'Papaya25'},
];

export const resultDate = (iso:string) => new Intl.DateTimeFormat('es-PA',{
  day:'numeric',month:'long',year:'numeric',timeZone:'America/Panama'
}).format(new Date(`${iso}T12:00:00-05:00`));

const normalized = (value:string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es-PA');

export function filterResultCatalog(
  catalog:readonly ResultRecord[],
  filters:{query?:string;year?:string;month?:string;modality?:string;status?:string}
): ResultRecord[] {
  const q=normalized((filters.query??'').trim());
  return catalog.filter(item=>
    (!q||normalized(`${item.name} ${item.location} ${item.modality}`).includes(q))&&
    (!filters.year||filters.year==='Todos'||item.date.slice(0,4)===filters.year)&&
    (!filters.month||filters.month==='Todos'||item.date.slice(5,7)===filters.month)&&
    (!filters.modality||filters.modality==='Todas'||item.modality===filters.modality)&&
    (!filters.status||filters.status==='Todos'||item.linkStatus===filters.status)
  );
}

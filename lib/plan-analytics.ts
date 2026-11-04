import type {Activity} from './domain';
export type DayWithDate={key:string};
export type PlannedSession={date:string;title:string;minutes:number};
export function weeklyActivitySummary(week:DayWithDate[],activities:Activity[]){
 const daySet=new Set(week.map(d=>d.key));
 const included=activities.filter(a=>daySet.has(a.date));
 const dailyKm=week.map(d=>included.filter(a=>a.date===d.key).reduce((sum,a)=>sum+a.distance,0));
 return {
  dailyKm,
  distance:Math.round(included.reduce((sum,a)=>sum+a.distance,0)*10)/10,
  minutes:included.reduce((sum,a)=>sum+a.minutes,0),
  activities:included.length
 };
}
export function markedSessionProgress(sessions:PlannedSession[],completed:string[]){
 const sessionDates=new Set(sessions.map(s=>s.date));
 const count=new Set(completed.filter(date=>sessionDates.has(date))).size;
 return {count,percent:sessions.length?Math.round(count/sessions.length*100):0};
}

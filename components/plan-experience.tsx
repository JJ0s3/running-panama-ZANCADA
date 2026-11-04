'use client';
import {ChevronLeft,ChevronRight,Check,Footprints,ArrowUpRight,CalendarDays,Settings2} from 'lucide-react';
import type {Activity,Goal} from '../lib/domain';
import {weeklyActivitySummary,markedSessionProgress} from '../lib/plan-analytics';

type Session={date:string;title:string;minutes:number};
type WeekDay={key:string;day:number;label:string;training:boolean;complete:boolean};
type Props={
 goal:Goal;activities:Activity[];sessions:Session[];completed:string[];week:WeekDay[];
 weekOffset:number;selected:string;onSelect:(date:string)=>void;onWeek:(offset:number)=>void;
 onMark:(date:string)=>void;onGoal:(goal:Goal)=>void;onFasty:(query:string)=>void;
};
const shortDay=['L','M','X','J','V','S','D'];
function shortDate(date:string){const d=new Date(date+'T12:00:00');return new Intl.DateTimeFormat('es-PA',{day:'numeric',month:'short'}).format(d)}
function formatRange(week:WeekDay[]){if(!week.length)return 'Tu semana';const d1=new Date(week[0].key+'T12:00:00');const d2=new Date(week[6].key+'T12:00:00');const month=new Intl.DateTimeFormat('es-PA',{month:'long'});return `${d1.getDate()}–${d2.getDate()} de ${month.format(d2)}`}
export default function PlanExperience({goal,activities,sessions,completed,week,selected,onSelect,onWeek,onMark,onGoal,onFasty}:Props){
 const weeklySessions=sessions.filter(s=>week.some(d=>d.key===s.date));
 const completedWeek=weeklySessions.filter(s=>completed.includes(s.date)).length;
 const summary=weeklyActivitySummary(week,activities);
 const weekKm=summary.distance,weekMinutes=summary.minutes,dailyKm=summary.dailyKm;
 const maxKm=Math.max(...dailyKm,1);
 const {count:planDone,percent}=markedSessionProgress(sessions,completed);
 const picked=weeklySessions.find(s=>s.date===selected);
 const next=sessions.find(s=>s.date>=week[0]?.key&&!completed.includes(s.date))??sessions[0];
 const focus=picked??next;
 const focusComplete=Boolean(focus&&completed.includes(focus.date));
 return <main className="zi-plan">
  <header className="zi-plan-heading">
    <div><div className="zi-eyebrow"><span className="zi-status-dot"/> MI PLAN DE RUNNING</div><h1>Tu semana<span className="zi-heading-dot">.</span></h1><p>Un paso a la vez. Tú marcas el ritmo.</p></div>
    <div className="zi-goal-tag"><span>Objetivo actual</span><strong>{goal.distance}K</strong></div>
  </header>

  <section className="zi-plan-overview" aria-label="Resumen del plan">
    <div className="zi-overview-top"><span>PLAN ACTIVO · DEMOSTRACIÓN</span><span>{planDone} de {sessions.length} sesiones marcadas</span></div>
    <div className="zi-overview-title"><div><p>Construyendo constancia</p><h2>Tu camino hacia los {goal.distance}K</h2></div><strong>{percent}%</strong></div>
    <div className="zi-progress-rail" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Sesiones marcadas del plan"><span style={{width:percent+'%'}}/></div>
    <div className="zi-progress-bottom"><span>{completedWeek} completadas esta semana</span><span>Plan orientativo · 4 semanas</span></div>
  </section>

  <section className="zi-week" data-tour-id="calendar">
    <div className="zi-week-header"><div><span className="zi-eyebrow">VISTA SEMANAL</span><h2>{formatRange(week)}</h2></div><div className="zi-week-arrows"><button onClick={()=>onWeek(-1)} aria-label="Semana anterior"><ChevronLeft size={19}/></button><button onClick={()=>onWeek(1)} aria-label="Semana siguiente"><ChevronRight size={19}/></button></div></div>
    <div className="zi-week-days" role="group" aria-label="Elegir día">{week.map((d,i)=><button key={d.key} onClick={()=>onSelect(d.key)} aria-pressed={selected===d.key} className={(selected===d.key?'active ':'')+(d.complete?'done':'')}><span>{shortDay[i]}</span><strong>{d.day}</strong><i>{d.complete?<Check size={11}/>:d.training?'•':'·'}</i></button>)}</div>
    <div className="zi-chart-heading"><div><h3>Tus kilómetros</h3><p>Distancia registrada · no estimada</p></div><strong>{weekKm.toLocaleString('es-PA',{maximumFractionDigits:1})}<small> km</small></strong></div>
    <div className="zi-bars" role="img" aria-label={'Distancias registradas por día: '+dailyKm.map((km,i)=>shortDay[i]+': '+km+' km').join(', ')}>{dailyKm.map((km,i)=><div key={week[i].key} className="zi-bar-column"><div className="zi-bar-region"><span className={'zi-bar '+(km>0?'filled':'empty')+(selected===week[i].key?' selected':'')} style={{height:(km>0?Math.max(14,km/maxKm*100):10)+'%'}}/></div><small>{shortDay[i]}</small></div>)}</div>
    <div className="zi-week-bottom"><span><i className="zi-key-dot violet"/>Actividad real</span><span><i className="zi-key-dot muted"/>Sin registro</span></div>
  </section>

  <section className="zi-week-stats" aria-label="Actividad semanal">
    <div><span>Distancia</span><strong>{weekKm.toFixed(1)}<small> km</small></strong></div>
    <div><span>Tiempo registrado</span><strong>{weekMinutes}<small> min</small></strong></div>
    <div><span>Sesiones marcadas</span><strong>{completedWeek}<small> / {weeklySessions.length}</small></strong></div>
  </section>

  <section className="zi-focus" aria-label="Entrenamiento seleccionado">
    <div className="zi-focus-top"><span className="zi-eyebrow"><Footprints size={15}/> {picked?'SESIÓN DEL DÍA':'PRÓXIMO ENTRENAMIENTO'}</span><span className="zi-date-chip">{focus?shortDate(focus.date):'Sin sesión'}</span></div>
    <h2>{focus?.title??'Tu próximo paso'}</h2>
    <p>{focus?focus.minutes+' minutos · ritmo cómodo':'Elige al menos un día para planificar tus sesiones.'}</p>
    <div className="zi-fasty-tip"><span className="zi-fasty-orb" aria-hidden="true"><i/><i/></span><div><strong>Fasty te acompaña</strong><p>Hoy no importa la velocidad. Intenta mantener una intensidad a la que puedas conversar. Si necesitas descansar, también está bien.</p></div></div>
    <div className="zi-focus-actions"><button className="zi-main-action" disabled={!focus} onClick={()=>focus&&onMark(focus.date)}>{focusComplete?'Desmarcar sesión':'Marcar como completada'} <Check size={18}/></button><button className="zi-sub-action" onClick={()=>onFasty('Explícame el entrenamiento de esta semana')}>Preguntar a Fasty <ArrowUpRight size={18}/></button></div>
  </section>

  <section className="zi-edit">
    <div className="zi-edit-head"><div><span className="zi-eyebrow">TU RUTINA</span><h2>Hazla tuya.</h2></div><Settings2 size={21}/></div>
    <div className="zi-edit-fields"><label>Distancia objetivo<select value={String(goal.distance)} onChange={e=>onGoal({...goal,distance:Number(e.target.value)})}><option value="5">Primer 5K</option><option value="10">10K</option><option value="21.1">21K</option></select></label><label>Fecha meta<input type="date" value={goal.date} onChange={e=>onGoal({...goal,date:e.target.value})}/></label></div>
    <p>Días en los que puedes entrenar</p>
    <div className="zi-day-picker">{['D','L','M','X','J','V','S'].map((d,i)=><button key={i} aria-pressed={goal.days.includes(i)} className={goal.days.includes(i)?'active':''} onClick={()=>onGoal({...goal,days:goal.days.includes(i)?goal.days.filter(v=>v!==i):[...goal.days,i].sort()})}>{d}</button>)}</div>
    <small>La agenda es orientativa. Los días de descanso también importan.</small>
  </section>
  <section className="zi-list"><div className="zi-list-title"><h2>Lo que viene</h2><span>SESIONES PROGRAMADAS</span></div>{sessions.slice(0,12).map(s=><button key={s.date} className="zi-session" onClick={()=>onMark(s.date)}><span className={completed.includes(s.date)?'zi-tick completed':'zi-tick'}>{completed.includes(s.date)?<Check size={18}/>:<Footprints size={17}/>}</span><span className="zi-session-name"><strong>{s.title}</strong><small>{shortDate(s.date)} · {s.minutes} min</small></span><span className="zi-session-state">{completed.includes(s.date)?'Hecha':'Pendiente'}</span></button>)}</section>
 </main>;
}

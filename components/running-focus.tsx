'use client';
import {ArrowUpRight,Timer,Footprints,Route} from 'lucide-react';

export function RunningHero({sessionName,minutes,onPlan,onFasty}:{sessionName:string;minutes:number;onPlan:()=>void;onFasty:()=>void}){
 return <section className="run-hero" aria-label="Tu próximo entrenamiento">
  <div className="run-hero-bar"><span><i/> ENTRENAMIENTO / ZANCADA</span><span>RUNNING EN PANAMÁ</span></div>
  <div className="run-hero-layout">
   <div className="run-hero-copy">
    <p className="run-eyebrow">TU PRÓXIMA SESIÓN</p>
    <h2>Una salida.<br/><em>Un paso más.</em></h2>
    <div data-tour-id="today" className="run-session-detail">
     <div className="run-session-time"><strong>{minutes}</strong><span>MINUTOS<br/>DE MOVIMIENTO</span></div>
     <div className="run-session-info"><span><Footprints size={16}/> {sessionName}</span><span><Timer size={16}/> Intensidad cómoda</span></div>
    </div>
    <div className="run-hero-actions"><button className="run-button-primary" onClick={onPlan}>Ver entrenamiento <ArrowUpRight size={19}/></button><button className="run-button-quiet" onClick={onFasty}>Hablar con Fasty</button></div>
   </div>
   <div className="run-hero-visual" aria-hidden="true">
    <svg className="run-track-svg" viewBox="0 0 530 320" role="presentation">
     <defs><linearGradient id="trackShade" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#D3B5FF"/><stop offset="1" stopColor="#6153A5"/></linearGradient></defs>
     <path d="M478 320 C510 230 459 121 354 85 C255 51 128 83 66 160 C22 213 29 282 43 320" fill="none" stroke="#8980A6" strokeWidth="2" opacity=".34"/>
     <path d="M447 320 C484 236 439 145 345 113 C257 83 157 104 101 174 C65 219 63 280 79 320" fill="none" stroke="#9683C0" strokeWidth="2" opacity=".5"/>
     <path d="M412 320 C446 243 418 173 336 141 C262 113 181 129 137 187 C108 225 106 282 119 320" fill="none" stroke="#AC9BDA" strokeWidth="2" opacity=".68"/>
     <path d="M380 320 C418 255 387 200 324 171 C264 146 201 159 173 205 C153 235 150 284 164 320" fill="none" stroke="url(#trackShade)" strokeWidth="5" strokeLinecap="round"/>
     <path d="M173 205 Q201 159 255 161" fill="none" stroke="#FFD85A" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 12"/>
     <circle cx="173" cy="205" r="21" fill="#FFD85A" stroke="#161321" strokeWidth="8"/>
     <path d="M167 205 l5 5 9 -12" fill="none" stroke="#211B2F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
     <circle cx="361" cy="195" r="5" fill="#D8D0F4"/>
     <text x="263" y="290" fill="#F1E5C9" fontFamily="system-ui,sans-serif" fontWeight="750" fontSize="13" letterSpacing="3">KEEP MOVING</text>
    </svg>
    <span className="run-track-legend"><Route size={15}/> TU RUTA EMPIEZA AQUÍ</span>
   </div>
  </div>
  <div className="run-hero-bottom"><span>01 / ENTRENA SIN PRISA</span><span>HECHO PARA CORREDORES, NO PARA ATLETAS PERFECTOS</span></div>
 </section>
}

export function RunningWeekLine({distance,activities,goal,children}:{distance:number;activities:number;goal:number}){
 return <div className="run-ledger-title"><div><span>REGISTRO DEL CORREDOR</span><h2>Tus kilómetros cuentan<span>.</span></h2></div><p>{activities} {activities===1?'salida registrada':'salidas registradas'} · Objetivo {goal}K</p></div>
}

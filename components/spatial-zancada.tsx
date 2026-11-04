'use client';
import {ArrowUpRight, MoveUpRight, Sparkles, Orbit, Footprints} from 'lucide-react';

type HeroProps={name:string;sessionName:string;minutes:number;onPlan:()=>void;onFasty:()=>void};
export function SpatialHero({sessionName,minutes,onPlan,onFasty}:HeroProps){
 return <section className="sp-hero" aria-label="Próximo entrenamiento">
  <div className="sp-hero-grain" aria-hidden="true"/>
  <div className="sp-hero-topline"><span>RUNNING JOURNAL <i/> ZANCADA</span><span>EDICIÓN 01 / PANAMÁ</span></div>
  <div className="sp-hero-copy">
   <p className="sp-meta"><span className="sp-live"/> TU PRÓXIMO MOVIMIENTO</p>
   <h2>HAZLO <span>TUYO</span><b>.</b></h2>
   <p className="sp-session-label">PRÓXIMA SESIÓN</p>
   <div data-tour-id="today" className="sp-session"><strong>{sessionName}</strong><span>{minutes} MIN <i/> RITMO CÓMODO</span></div>
   <div className="sp-actions"><button className="sp-action-primary" onClick={onPlan}>Ver entrenamiento <ArrowUpRight size={18}/></button><button className="sp-action-secondary" onClick={onFasty}>Preguntar a Fasty <MoveUpRight size={17}/></button></div>
  </div>
  <div className="sp-object-wrap" aria-hidden="true">
   <div className="sp-orbit sp-orbit-outer"/><div className="sp-orbit sp-orbit-inner"/>
   <div className="sp-object-shadow"/>
   <div className="sp-object-depth">Z</div>
   <div className="sp-object-main">Z</div>
   <span className="sp-object-serial">Z / 001<br/>MOVE FORWARD</span>
  </div>
  <div className="sp-hero-footer"><span>NO HAY UNA SOLA FORMA DE CORRER.</span><span>DESLIZA PARA DESCUBRIR <span aria-hidden="true">↓</span></span></div>
 </section>
}

export function FastyArtifact({onTalk,minutes}:{onTalk:()=>void;minutes:number}){
 return <section className="sp-fasty">
  <div className="sp-fasty-sculpture" aria-hidden="true">
   <div className="sp-fasty-halo"/>
   <div className="sp-fasty-body"><span className="sp-fasty-eye left"/><span className="sp-fasty-eye right"/><span className="sp-fasty-smile"/></div>
   <span className="sp-fasty-star star-a">✳</span><span className="sp-fasty-star star-b">✦</span>
  </div>
  <div data-tour-id="fasty" className="sp-fasty-content"><div className="sp-fasty-label"><Sparkles size={14}/> FASTY / TE ACOMPAÑA</div><h3>Un paso más.<br/><em>A tu manera.</em></h3><p>Tu siguiente sesión dura {minutes} minutos. Si necesitas ir más despacio, está bien. Lo importante es saber por dónde empezar.</p><button onClick={onTalk}>Hablar con Fasty <ArrowUpRight size={17}/></button></div>
  <div className="sp-fasty-index">TU COACH DIGITAL <span>02 / 04</span></div>
 </section>
}

export function SpatialFastyLanding(){
 return <div className="sp-fasty-landing-art" aria-hidden="true"><div className="sp-fasty-halo"/><div className="sp-fasty-body"><span className="sp-fasty-eye left"/><span className="sp-fasty-eye right"/><span className="sp-fasty-smile"/></div><span className="sp-fasty-star star-a">✳</span></div>
}

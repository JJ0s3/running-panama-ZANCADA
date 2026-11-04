import {ArrowUpRight, CalendarClock, CheckCircle2, CircleHelp, ClipboardCheck, ExternalLink, Flag, Footprints, Info, MapPin, ShieldCheck, Ticket} from 'lucide-react';
import {dateLabel} from '../lib/event-passport';
import type {EventRecord} from '../lib/event-passport';

type Props={
  event:EventRecord;
  onDeclareParticipation:()=>void;
};

/** A guide to external registration, never a substitute for the organiser's instructions. */
export default function RaceDayGuide({event,onDeclareParticipation}:Props){
  const sourceKind=event.sourceLevel==='organizer'?'Organizador del evento':'Plataforma que publica el evento';
  return <section className="za-race-guide" aria-labelledby={`za-race-guide-title-${event.id}`}>
    <header className="za-race-guide-heading">
      <span className="za-race-guide-eyebrow"><Footprints size={16} aria-hidden="true"/> ASÍ SE PREPARA TU CARRERA</span>
      <h2 id={`za-race-guide-title-${event.id}`}>De descubrirla <em>a vivirla.</em></h2>
      <p>Estos pasos te orientan, pero la inscripción y las condiciones vigentes siempre las confirma la organización.</p>
    </header>
    <div className="za-race-guide-steps">
      <article className="za-race-guide-step">
        <span className="za-race-guide-step-top"><span className="za-race-guide-icon"><ShieldCheck size={23} aria-hidden="true"/></span><span className="za-race-guide-number">01</span></span>
        <h3>Conoce el evento</h3>
        <p>Revisa lugar, distancias y cambios de última hora antes de decidir.</p>
        <span className="za-race-guide-status"><CheckCircle2 size={15} aria-hidden="true"/> Fuente disponible: {sourceKind.toLowerCase()}</span>
        <a className="za-race-guide-link" href={event.sourceUrl} target="_blank" rel="noopener noreferrer">Consultar la fuente <ExternalLink size={16} aria-hidden="true"/></a>
      </article>
      <article className="za-race-guide-step">
        <span className="za-race-guide-step-top"><span className="za-race-guide-icon za-race-guide-icon-yellow"><Ticket size={23} aria-hidden="true"/></span><span className="za-race-guide-number">02</span></span>
        <h3>Inscríbete afuera</h3>
        <p>{event.registrationUrl?'Accede al enlace de registro identificado. Consulta cupos, precio y requisitos allí.':'No tenemos un enlace de inscripción independiente confirmado. Consulta la fuente publicada.'}</p>
        <span className="za-race-guide-status"><Info size={15} aria-hidden="true"/> ZANCADA no cobra ni reserva cupos</span>
        <a className="za-race-guide-link" href={event.registrationUrl??event.sourceUrl} target="_blank" rel="noopener noreferrer">{event.registrationUrl?'Ver enlace de inscripción':'Consultar cómo participar'} <ExternalLink size={16} aria-hidden="true"/></a>
      </article>
      <article className="za-race-guide-step">
        <span className="za-race-guide-step-top"><span className="za-race-guide-icon"><ClipboardCheck size={23} aria-hidden="true"/></span><span className="za-race-guide-number">03</span></span>
        <h3>Prepara tu salida</h3>
        <p>Si ya te inscribiste por fuera, guarda tu participación personal para crear tu checklist y tu dorsal de recuerdo.</p>
        <span className="za-race-guide-status"><Flag size={15} aria-hidden="true"/> Registro personal, no acreditación oficial</span>
        <button type="button" className="za-race-guide-link za-race-guide-button" onClick={onDeclareParticipation}>Ya me inscribí afuera <ArrowUpRight size={16} aria-hidden="true"/></button>
      </article>
    </div>
    <div className="za-race-guide-brief" aria-label="Información útil antes de asistir">
      <div className="za-race-guide-brief-heading"><CalendarClock size={21} aria-hidden="true"/><strong>Antes del día de carrera</strong></div>
      <div className="za-race-guide-brief-grid">
        <div><span className="za-race-guide-brief-icon"><CalendarClock size={18} aria-hidden="true"/></span><div><strong>Hora de salida</strong><p>{event.startTime?`${event.startTime} (hora anunciada)`: 'Horario por confirmar con la fuente'}</p></div></div>
        <div><span className="za-race-guide-brief-icon"><MapPin size={18} aria-hidden="true"/></span><div><strong>Lugar anunciado</strong><p>{event.venue}, {event.city}</p></div></div>
        <div><span className="za-race-guide-brief-icon"><Ticket size={18} aria-hidden="true"/></span><div><strong>Entrega de kit</strong><p>{event.kitInfo??'Información todavía no confirmada'}</p></div></div>
        <div><span className="za-race-guide-brief-icon"><CircleHelp size={18} aria-hidden="true"/></span><div><strong>Recorrido y puntos de agua</strong><p>Consulta el plano publicado por la organización; no contamos con datos validados para esta ficha.</p></div></div>
      </div>
      <div className="za-race-guide-caveat"><Info size={17} aria-hidden="true"/><span>Datos consultados el {dateLabel(event.lastCheckedAt)}. Pueden cambiar; confirma el día anterior con la fuente original.</span></div>
    </div>
  </section>;
}

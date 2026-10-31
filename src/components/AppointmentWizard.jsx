import React,{useEffect,useMemo,useRef,useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {ArrowLeft,ArrowRight,CalendarDays,Check,CheckCircle2,Clock3,Info,LockKeyhole,Mail,ShieldCheck,UserRound,AlertCircle,RotateCcw} from 'lucide-react';
import {services,practitioners,timePreferences} from '../data/clinic.js';
import {cleanRequest,isValidFutureDate,localToday,readRequests,validateContact,validateSelection,writeRequests} from '../lib/appointments.js';
import {Wrap,Eyebrow} from './Primitives.jsx';

const stepTitles=['Your visit','Your practitioner','Your preference','About you','Review request'];
const initial={service:'',practitioner:'',date:'',time:'',name:'',email:'',phone:'',consent:false};
const tomorrow=()=>{const d=new Date();d.setDate(d.getDate()+1);return localToday(d)};
function dateLabel(s){if(!s)return 'Not chosen';return new Date(`${s}T12:00:00`).toLocaleDateString('en-MA',{weekday:'long',month:'long',day:'numeric',year:'numeric'});}
function Stepper({step}){return <div className="stepper" aria-label={`Step ${step+1} of ${stepTitles.length}`}><div className="step-label">YOUR REQUEST <span>{String(step+1).padStart(2,'0')} / 05</span></div><div className="step-bars">{stepTitles.map((title,i)=><span key={title} className={i<=step?'active':''} aria-hidden="true"/>)}</div><div className="step-headings"><h3>{stepTitles[step]}</h3><p>{['Where would you like to begin?','Who would you like to meet?','Which date and time suit you?','A few demo contact details.','One last look before saving.'][step]}</p></div></div>}
function Choice({selected,onClick,title,description,index,icon}) {return <button className={`choice-tile ${selected?'selected':''}`} type="button" aria-pressed={selected} onClick={onClick}><span className="choice-index">{icon||String(index+1).padStart(2,'0')}</span><span className="choice-text"><strong>{title}</strong><small>{description}</small></span><span className="choice-check">{selected?<Check size={16}/>:<span/>}</span></button>}
function ErrorLine({children}){if(!children)return null;return <span className="field-error" role="alert"><AlertCircle size={14}/>{children}</span>}

export default function AppointmentWizard({prefill}){
 const [form,setForm]=useState(initial);
 const [step,setStep]=useState(0),[errors,setErrors]=useState({}),[saved,setSaved]=useState(null),[storageError,setStorageError]=useState('');
 const cardRef=useRef(null);
 const select=(key,value)=>{setForm(f=>({...f,[key]:value}));setErrors(e=>({...e,[key]:undefined}));setStorageError('')};
 useEffect(()=>{
   if(!prefill)return;
   if(prefill.service){setForm(f=>({...f,service:prefill.service}));setStep(1);}
   if(prefill.practitioner){setForm(f=>({...f,practitioner:prefill.practitioner,service:f.service||'general'}));setStep(0);}
   setSaved(null);setErrors({});
 },[prefill]);
 const selectedService=services.find(x=>x.id===form.service);
 const selectedPractitioner=practitioners.find(x=>x.id===form.practitioner);
 const selectedTime=timePreferences.find(x=>x.id===form.time);
 const allChoices=useMemo(()=>({serviceIds:services.map(x=>x.id),practitionerIds:practitioners.map(x=>x.id),timeIds:timePreferences.map(x=>x.id)}),[]);
 const goNext=()=>{
   let e={};
   if(step===0&&!selectedService)e.service='Please select one service to continue.';
   if(step===1&&!selectedPractitioner)e.practitioner='Please select an example practitioner.';
   if(step===2){if(!isValidFutureDate(form.date))e.date='Please select a future date.';if(!selectedTime)e.time='Please select an example time preference.';}
   if(step===3)e=validateContact(form);
   setErrors(e);if(Object.keys(e).length===0){setStep(x=>Math.min(x+1,4));cardRef.current?.scrollIntoView({behavior:'smooth',block:'start'});}
 };
 const goBack=()=>{setErrors({});setStep(x=>Math.max(0,x-1));};
 const save=()=>{
  const e={...validateSelection(form,allChoices),...validateContact(form)};
  if(Object.keys(e).length){setErrors(e);setStep(e.service?0:e.practitioner?1:(e.date||e.time)?2:3);return;}
  const entry=cleanRequest({id:typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,...form,serviceName:selectedService.label,practitionerName:selectedPractitioner.name,timeLabel:`${selectedTime.label} (${selectedTime.hours})`});
  try{
   const store=window.localStorage; const read=readRequests(store);
   if(read.error){setStorageError(read.error+' Please resolve this in your browser before saving.');return;}
   const result=writeRequests(store,[entry,...read.items]);
   if(!result.ok){setStorageError(result.error);return;}
   setStorageError('');setSaved(entry);window.dispatchEvent(new Event('nova-requests-updated'));
   try{window.localStorage.removeItem('nova_wizard_prefs_v1')}catch{}
  }catch{setStorageError('Browser storage is unavailable. Your request was not saved.');}
 };
 const reset=()=>{setForm(initial);setStep(0);setErrors({});setSaved(null);setStorageError('');};
 return <section id="appointment" className="booking-section section-padding"><Wrap><div className="booking-intro"><div><Eyebrow light>04 / A considered first step</Eyebrow><h2>Let's begin with<br/><em>your smile.</em></h2></div><p>Take a moment to build a sample visit request. This is an interactive portfolio experience—not a clinical reservation or availability checker.</p></div><div className="booking-layout"><div ref={cardRef} className="booking-card"><div className="booking-topline"><span className="booking-symbol">✳</span><span>NOVA / APPOINTMENT ATELIER</span><span className="demo-chip">DEMO ONLY</span></div>{saved?<div className="booking-confirmation" role="status"><div className="confirm-symbol"><CheckCircle2 size={34}/></div><div className="eyebrow"><span className="eyebrow-dot"/> LOCALLY SAVED</div><h3>All set, <em>{saved.name.split(' ')[0]}.</em></h3><p>Your example request is saved <strong>only in this browser</strong>. No clinic was contacted, no appointment was booked, and no email was sent.</p><div className="review-box"><div><span>Example visit</span><strong>{saved.serviceName}</strong></div><div><span>Preferred date</span><strong>{dateLabel(saved.date)}</strong></div><div><span>Example time</span><strong>{saved.timeLabel}</strong></div><div><span>Demo status</span><strong>{saved.status} · not confirmed</strong></div></div><div className="confirm-actions"><a className="btn btn-solid" href="#reception">View demo dashboard <ArrowRight size={17}/></a><button type="button" className="btn btn-outline" onClick={reset}>New sample request <RotateCcw size={15}/></button></div></div>:<><Stepper step={step}/><div className="wizard-body" key={step}>
  {step===0&&<><div className="choice-grid">{services.map((s,i)=><Choice key={s.id} index={i} selected={form.service===s.id} onClick={()=>select('service',s.id)} title={s.label} description={s.short}/>)}</div><ErrorLine>{errors.service}</ErrorLine></>}
  {step===1&&<><p className="wizard-helper">All practitioners below are fictional characters for this concept.</p><div className="choice-grid">{practitioners.map((p,i)=><Choice key={p.id} index={i} selected={form.practitioner===p.id} onClick={()=>select('practitioner',p.id)} title={p.name} description={p.specialty}/>)}</div><ErrorLine>{errors.practitioner}</ErrorLine></>}
  {step===2&&<><div className="form-field"><label htmlFor="visit-date">Preferred visit date <span>*</span></label><div className="field-with-icon"><CalendarDays size={19}/><input aria-invalid={!!errors.date} id="visit-date" type="date" value={form.date} min={tomorrow()} onChange={e=>select('date',e.target.value)} /></div><ErrorLine>{errors.date}</ErrorLine></div><label className="field-label" id="time-label">Example time preference <span>*</span></label><div role="group" aria-labelledby="time-label" className="time-options">{timePreferences.map(t=><button type="button" key={t.id} aria-pressed={form.time===t.id} className={`time-option ${form.time===t.id?'selected':''}`} onClick={()=>select('time',t.id)}><Clock3 size={18}/><strong>{t.label}</strong><small>{t.hours}</small></button>)}</div><ErrorLine>{errors.time}</ErrorLine><p className="hint-box"><Info size={17}/> These are example preferences. No live availability is checked, and selecting a date does not reserve it.</p></>}
  {step===3&&<><p className="wizard-helper">Please use fictional/sample contact information only. Do not enter medical or other sensitive information.</p><div className="form-fields-grid"><div className="form-field wide"><label htmlFor="demo-name">Sample full name <span>*</span></label><input id="demo-name" value={form.name} placeholder="e.g. Demo Visitor" autoComplete="off" maxLength={80} aria-invalid={!!errors.name} onChange={e=>select('name',e.target.value)}/><ErrorLine>{errors.name}</ErrorLine></div><div className="form-field"><label htmlFor="demo-email">Sample email <span>*</span></label><input id="demo-email" type="email" value={form.email} placeholder="visitor@example.com" autoComplete="off" maxLength={120} aria-invalid={!!errors.email} onChange={e=>select('email',e.target.value)}/><ErrorLine>{errors.email}</ErrorLine></div><div className="form-field"><label htmlFor="demo-phone">Sample phone <span className="optional">(optional)</span></label><input id="demo-phone" type="tel" value={form.phone} placeholder="+212 600 000 000" autoComplete="off" maxLength={22} aria-invalid={!!errors.phone} onChange={e=>select('phone',e.target.value)}/><ErrorLine>{errors.phone}</ErrorLine></div></div><label className="consent-row"><input type="checkbox" checked={form.consent} onChange={e=>select('consent',e.target.checked)}/><span>I understand this is a fictional demo that stores sample details locally in this browser. Nothing is sent or booked.</span></label><ErrorLine>{errors.consent}</ErrorLine></>}
  {step===4&&<><p className="wizard-helper">Review your choices. Your request will be stored locally only.</p><div className="review-box"><div><span>Service</span><strong>{selectedService?.label}</strong></div><div><span>Practitioner · fictional</span><strong>{selectedPractitioner?.name}</strong></div><div><span>Preferred date</span><strong>{dateLabel(form.date)}</strong></div><div><span>Time preference</span><strong>{selectedTime?.label} · {selectedTime?.hours}</strong></div><div><span>Sample contact</span><strong>{form.name}<br/>{form.email}</strong></div><div><span>Demo request state</span><strong>New · not a booking</strong></div></div><p className="hint-box"><LockKeyhole size={18}/> No external transmission. Saved requests are visible only in this browser and can be deleted in the receptionist demo.</p></>}
 </div>{storageError&&<div className="save-error" role="alert"><AlertCircle size={18}/>{storageError}</div>}<div className="wizard-actions">{step>0?<button type="button" className="wizard-back" onClick={goBack}><ArrowLeft size={17}/> Back</button>:<span className="wizard-back-placeholder"/>}{step<4?<button className="btn btn-solid" type="button" onClick={goNext}>Continue <ArrowRight size={17}/></button>:<button className="btn btn-solid" type="button" onClick={save}>Save example request <Check size={17}/></button>}</div></> }</div><aside className="booking-aside"><div className="booking-aside-inner"><span className="aside-asterisk">✳</span><div><span className="aside-kicker">WHAT TO EXPECT</span><h3>Good care begins with being heard.</h3><p>Our demo request flow is designed to feel just as considered as the rest of the experience.</p></div><div className="aside-points"><div><ShieldCheck size={20}/><span><strong>Clear choices</strong>Pick a sample service and clinician.</span></div><div><CalendarDays size={20}/><span><strong>Flexible preferences</strong>Explore dates without making a booking.</span></div><div><LockKeyhole size={20}/><span><strong>Local-only storage</strong>Try the workflow safely with fictional information.</span></div></div><div className="aside-footnote">DESIGNED WITH INTENTION. <span>BUILT BY INNOVATECHS.</span></div></div></aside></div></Wrap></section>
}

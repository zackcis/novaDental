export const STORAGE_KEY = 'innovatechs_nova_dental_requests_v1';
export const STATUS_OPTIONS = ['New', 'Reviewing', 'Closed']; // Administrative demo labels, not booking confirmation.
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function localToday(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
export function isValidFutureDate(date, today=localToday()) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T12:00:00`);
  return !Number.isNaN(parsed.getTime()) && localToday(parsed) === date && date > today;
}
export function validateContact(contact) {
  const errors = {};
  const name = typeof contact.name === 'string' ? contact.name.trim() : '';
  const email = typeof contact.email === 'string' ? contact.email.trim() : '';
  const phone = typeof contact.phone === 'string' ? contact.phone.trim() : '';
  if (name.length < 2 || name.length > 80) errors.name = 'Enter a demo name (2–80 characters).';
  if (email.length > 120 || !EMAIL_REGEX.test(email)) errors.email = 'Enter a valid sample email address.';
  if (phone && !/^[+0-9()\s.-]{7,22}$/.test(phone)) errors.phone = 'Enter a valid sample phone number or leave it blank.';
  if (!contact.consent) errors.consent = 'Please confirm that you understand this is a local-only demo.';
  return errors;
}
export function validateSelection(form, {serviceIds, practitionerIds, timeIds, today=localToday()} = {}) {
  const errors={};
  if (!serviceIds?.includes(form.service)) errors.service='Choose an example service.';
  if (!practitionerIds?.includes(form.practitioner)) errors.practitioner='Choose an example practitioner.';
  if (!isValidFutureDate(form.date, today)) errors.date='Choose a valid future date.';
  if (!timeIds?.includes(form.time)) errors.time='Choose a time preference.';
  return errors;
}
export function readRequests(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return {items:[], error:null};
    const data=JSON.parse(raw);
    if (!Array.isArray(data)) return {items:[], error:'Saved demo data had an unexpected format.'};
    return {items:data.filter(x=>x && typeof x==='object' && typeof x.id==='string' && STATUS_OPTIONS.includes(x.status)),error:null};
  } catch { return {items:[],error:'Cannot read saved demo requests. Browser storage may be blocked or corrupt.'}; }
}
export function writeRequests(storage,items) {
  try { storage.setItem(STORAGE_KEY,JSON.stringify(items)); return {ok:true,error:null}; }
  catch { return {ok:false,error:'Unable to save locally. Check private browsing or browser storage settings.'}; }
}
export function filterRequests(requests,{query='',status='All'}={}) {
  const q=query.toLocaleLowerCase().trim();
  return requests.filter(x=>(status==='All'||x.status===status) && (!q || [x.name,x.email,x.serviceName,x.practitionerName,x.date,x.id].some(v=>String(v||'').toLocaleLowerCase().includes(q))));
}
export function cleanRequest(input) {
  return {
    id: String(input.id),
    name:String(input.name).trim().slice(0,80),
    email:String(input.email).trim().slice(0,120),
    phone:String(input.phone||'').trim().slice(0,22),
    service:input.service,serviceName:input.serviceName,
    practitioner:input.practitioner, practitionerName:input.practitionerName,
    date:input.date,time:input.time,timeLabel:input.timeLabel,
    status:'New', createdAt:new Date().toISOString()
  };
}

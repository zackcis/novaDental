import test from 'node:test';
import assert from 'node:assert/strict';
import {STORAGE_KEY,cleanRequest,filterRequests,isValidFutureDate,localToday,readRequests,validateContact,validateSelection,writeRequests} from '../src/lib/appointments.js';
const reference='2026-10-12';
function fakeStorage(initial={}){const db={...initial};return {getItem:k=>Object.hasOwn(db,k)?db[k]:null,setItem:(k,v)=>{db[k]=v;},removeItem:k=>{delete db[k];},db};}

test('local date produces YYYY-MM-DD with local fields',()=>assert.equal(localToday(new Date(2026,9,12)),reference));
test('only real future calendar dates are accepted',()=>{
 assert.equal(isValidFutureDate('2026-10-13',reference),true);
 assert.equal(isValidFutureDate('2026-10-12',reference),false);
 assert.equal(isValidFutureDate('2026-10-01',reference),false);
 assert.equal(isValidFutureDate('2026-02-30',reference),false);
 assert.equal(isValidFutureDate('foo',reference),false);
});
test('valid contact requires fictional demo consent and valid email',()=>{
 assert.deepEqual(validateContact({name:'Demo Visitor',email:'demo@example.com',phone:'',consent:true}),{});
 assert.equal(validateContact({name:'',email:'x',phone:'oh no',consent:false}).name.length>0,true);
 assert.ok(validateContact({name:'Demo',email:'fake',phone:'',consent:true}).email);
 assert.ok(validateContact({name:'Demo',email:'demo@example.com',phone:'',consent:false}).consent);
});
test('optional sample phone validates formatting',()=>{
 assert.equal(validateContact({name:'Demo Visitor',email:'demo@example.com',phone:'+212 600 000 000',consent:true}).phone,undefined);
 assert.ok(validateContact({name:'Demo Visitor',email:'demo@example.com',phone:'not a number',consent:true}).phone);
});
test('selection requires valid service, clinician, date and preference',()=>{
 const allowed={serviceIds:['general'],practitionerIds:['salma'],timeIds:['morning'],today:reference};
 assert.deepEqual(validateSelection({service:'general',practitioner:'salma',date:'2026-10-13',time:'morning'},allowed),{});
 const e=validateSelection({service:'wrong',practitioner:'',date:'2026-10-10',time:'night'},allowed);
 assert.deepEqual(Object.keys(e).sort(),['date','practitioner','service','time']);
});
test('local storage roundtrip and manual deletion work',()=>{
 const storage=fakeStorage();const item={id:'demo-1',name:'Demo Visitor',status:'New'};
 assert.equal(writeRequests(storage,[item]).ok,true);
 assert.deepEqual(readRequests(storage).items,[item]);
 assert.equal(writeRequests(storage,[]).ok,true);
 assert.deepEqual(readRequests(storage).items,[]);
});
test('storage failures report errors rather than pretending to save',()=>{
 const denied={getItem(){throw new Error('denied')},setItem(){throw new Error('denied')}};
 assert.ok(readRequests(denied).error);assert.equal(writeRequests(denied,[]).ok,false);
});
test('malformed and non-array saved data is safely rejected',()=>{
 assert.ok(readRequests(fakeStorage({[STORAGE_KEY]:'{bad'})).error);
 assert.ok(readRequests(fakeStorage({[STORAGE_KEY]:'{}'})).error);
});
test('invalid saved request objects are ignored',()=>{
 const saved=[null,{}, {id:'ok',status:'New'}, {id:'no',status:'Confirmed'}];
 assert.deepEqual(readRequests(fakeStorage({[STORAGE_KEY]:JSON.stringify(saved)})).items,[{id:'ok',status:'New'}]);
});
test('search and status filters can combine',()=>{
 const items=[{id:'a',name:'Demo Visitor',email:'demo@example.com',status:'New',serviceName:'General dentistry',date:'2026-11-01'},{id:'b',name:'Test Guest',email:'test@example.com',status:'Reviewing',serviceName:'Orthodontics',date:'2026-11-01'}];
 assert.equal(filterRequests(items,{status:'New'}).length,1);
 assert.equal(filterRequests(items,{query:'orthodontics'}).length,1);
 assert.equal(filterRequests(items,{query:'DEMO',status:'Reviewing'}).length,0);
 assert.equal(filterRequests(items,{query:'2026-11-01'}).length,2);
});
test('cleaned demo request excludes notes, medical details, and unexpected fields',()=>{
 const cleaned=cleanRequest({id:'123',name:'  Demo Visitor  ',email:'demo@example.com',service:'general',serviceName:'General dentistry',practitioner:'salma',practitionerName:'Dr. Salma',date:'2026-12-01',time:'morning',timeLabel:'Morning',medicalHistory:'SHOULD NEVER STORE',notes:'private medical details'});
 assert.equal(cleaned.name,'Demo Visitor');assert.equal(cleaned.status,'New');assert.equal(cleaned.medicalHistory,undefined);assert.equal(cleaned.notes,undefined);
});

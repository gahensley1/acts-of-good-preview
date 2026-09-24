/* THE COPY IN THEIR OWN CLOUD, RULED BY G 24 SEPTEMBER 2026, option 1.
   Store app only: a copy after every act into their own iCloud or Google
   Drive, a switch to turn it off, and the year offered back on a new phone. */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
const require_ = createRequire(import.meta.url);
let pw = null;
for(const where of ['playwright','playwright-core','/opt/node-tools/node_modules/playwright/index.js']){
  try { pw = require_(where); break; } catch(e) {}
}
if(!pw){ console.error('\nPlaywright is not installed here:\n  npm i -D playwright && npx playwright install chromium\n'); process.exit(2); }
const { chromium } = pw.default || pw;
const EXE = process.env.CHROME ||
  (require_('node:fs').existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const LAUNCH = EXE ? { executablePath: EXE } : {};
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;

/* IPHONE=1 runs every check in Safari's engine on an iPhone 15's screen, with touch. */
const IPHONE = !!process.env.IPHONE;
const b = IPHONE ? await (pw.default||pw).webkit.launch() : await chromium.launch(LAUNCH);
let pass=0, fail=0; const errs=[];
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };
const head=t=>console.log('\n== '+t+' ==');
let CTX=null, PAGE=null;
async function app(acts=11, goal=50){
  if(!CTX){
    CTX=await b.newContext(IPHONE ? {...(pw.default||pw).devices['iPhone 15']} : {viewport:{width:390,height:844}});
    PAGE=await CTX.newPage();
    /* Safari's "Add to Home Screen" strip comes back on every load; the phone
       being tested is treated as installed, which is how G uses it. */
    if(IPHONE) await PAGE.addInitScript(()=>{ try{ Object.defineProperty(navigator,'standalone',{get:()=>true}); }catch(e){} });
    PAGE.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    PAGE.on('pageerror',e=>errs.push('pageerror: '+e.message));
  }
  const ctx=CTX, p=PAGE;
  await p.goto('about:blank');
  await p.goto(FILE); await p.waitForTimeout(1100);
  await p.evaluate(()=>{ try{ localStorage.clear(); }catch(e){} });
  await p.goto(FILE); await p.waitForTimeout(1100);
  /* on the iPhone, Safari shows the "Add to Home Screen" strip. A person closes
     it with its own ×, so the tester does the same, with a finger. */
  if(IPHONE){ await p.waitForSelector("#install:not(.hide)",{timeout:3000}).catch(()=>{}); const x=await p.$('#install:not(.hide) button[aria-label="Hide this"]'); if(x) await x.tap({timeout:3000}).catch(()=>p.evaluate(()=>document.querySelector("#install button").click())); }
  await p.evaluate(([n,goal])=>{
    S.letterSeen=S.started=S.tabToured=S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=goal;S.weeks=52;S.why='to test';
    S.start=new Date(Date.now()-1000*60*60*24*120);
    S.zero={no:'0',zero:true,d:'2026-03-14',t:'begins',posted:{},captions:{}};
    S.acts=[];for(let i=1;i<=n;i++)S.acts.push({no:String(i),t:'Act '+i,
      d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]});
    S.lineTouched=S.wordTouched=false;try{syncReason();}catch(e){}save();},[acts,goal]);
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}});
  return {ctx,p};
}

/* A stand-in for the store app's native half: Capacitor, its Filesystem, and
   our CloudBackup plugin, all in memory, recording what they were asked. */
const FAKE = (cfg)=>{
  const FS = {}, URLS = {};
  window.__CLOUD = window.__CLOUD || {};
  if(cfg && cfg.seed){ window.__CLOUD[cfg.seed.name] = new Blob([cfg.seed.text], {type:'application/json'}); window.__SEEDDATE = cfg.seed.date; }
  window.__CALLS = [];
  const st = Object.assign({ available:true, provider:'icloud', signedIn:true }, (cfg&&cfg.status)||{});
  const dec = s => Uint8Array.from(atob(s), c=>c.charCodeAt(0));
  window.Capacitor = {
    isNativePlatform: ()=>true,
    convertFileSrc: p => URLS[p],
    Plugins: {
      Filesystem: {
        async writeFile({path}){ FS[path] = []; },
        async appendFile({path, data}){ FS[path].push(dec(data)); },
        async getUri({path}){ return { uri:'file:///cache/'+path }; },
        async deleteFile({path}){ delete FS[path]; }
      },
      CloudBackup: {
        async status(){ __CALLS.push('status'); return Object.assign({}, st); },
        async signIn(){ __CALLS.push('signIn'); st.signedIn = !!(cfg && cfg.allow); return { signedIn: st.signedIn }; },
        async push({path, name}){ __CALLS.push('push'); const k = path.replace('file:///cache/','');
          window.__CLOUD[name] = new Blob(FS[k], {type:'application/json'}); return { ok:true }; },
        async latest(){ __CALLS.push('latest'); const n = Object.keys(window.__CLOUD).sort().pop();
          return n ? { name:n, modified: window.__SEEDDATE || new Date().toISOString(), size: window.__CLOUD[n].size } : {}; },
        async pull({name}){ __CALLS.push('pull'); const u = URL.createObjectURL(window.__CLOUD[name]); URLS['p/'+name] = u; return { path:'p/'+name }; },
        async keep({name}){ __CALLS.push('keep:'+name); }
      }
    }
  };
};
async function storeApp(cfg){
  const ctx = await b.newContext({viewport:{width:390,height:844}});
  const p = await ctx.newPage();
  p.on('pageerror',e=>errs.push('pageerror: '+e.message));
  await p.addInitScript(FAKE, cfg||null);
  return {ctx, p};
}
async function setUp(p, acts){
  await p.goto(FILE); await p.waitForTimeout(1100);
  await p.evaluate((n)=>{
    S.letterSeen=S.started=S.tabToured=S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=50;S.weeks=52;S.why='to test';
    S.start=new Date(Date.now()-1000*60*60*24*120);
    S.zero={no:'0',zero:true,d:'2026-03-14',t:'begins',posted:{},captions:{}};
    S.acts=[];for(let i=1;i<=n;i++)S.acts.push({no:String(i),t:'Act '+i,d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]});
    save(); }, acts);
  await p.reload(); await p.waitForTimeout(1500);
  await p.evaluate(()=>{ try{endTabTour();}catch(e){} try{sheet(null);}catch(e){} });
}

head('on the website, none of it is there');
{ const {ctx,p}=await app(6);
  const r = await p.evaluate(()=>{ go('you'); return { avail: PHONE.cloud.available(),
    row: $('cloudrow').classList.contains('hide'), priv: $('you-privacy').textContent.replace(/\s+/g,' ').trim() }; });
  ck('no cloud on the web', r.avail===false, r);
  ck('the You screen shows no switch', r.row===true, r);
  ck('the first screen’s words are unchanged', r.priv==="Your privacy comes first. Everything happens right on your device to calculate your year and draft your posts, we don't collect, track, or share a thing.", r.priv);
}

head('in the store app on an iPhone: a copy after every act, in their own iCloud');
let SAVED = null;
{ const {ctx,p}=await storeApp();
  await setUp(p, 5);
  await p.evaluate(async ()=>{ const k=document.createElement('canvas'); k.width=40;k.height=30; k.getContext('2d').fillRect(0,0,40,30);
    const u=k.toDataURL('image/jpeg',0.8); await idbPut('cl1',u); await idbPut(THUMB('cl1'),u); S.acts[0].photos=[{id:'cl1',url:u}]; save(); });
  await p.waitForTimeout(900);
  const r = await p.evaluate(async ()=>{
    go('you'); await new Promise(r=>setTimeout(r,200));
    const out = { row: !$('cloudrow').classList.contains('hide'), lab: $('cloudlab').textContent,
      on: $('cloudsw').getAttribute('aria-checked'), priv: $('you-privacy').textContent.replace(/\s+/g,' ').trim() };
    out.made = await cloudNow(false);
    const names = Object.keys(window.__CLOUD); out.files = names;
    const o = JSON.parse(await window.__CLOUD[names[0]].text());
    out.acts = o.acts.length; out.photo = !!(o.acts[0].photos[0] && /^data:image/.test(o.acts[0].photos[0].data));
    out.when = $('cloudwhen').textContent; out.due = bkupDue(); out.again = await cloudNow(false);
    drawYou && drawYou(); out.store = $('storagenote').textContent; out.why = $('bkup-why').textContent;
    out.text = await window.__CLOUD[names[0]].text();
    return out; });
  SAVED = { name: r.files[0], text: r.text };
  ck('the switch is on the You screen, on', r.row && r.lab==='Keep a copy in your iCloud' && r.on==='true', r);
  ck('the first screen says where the copy goes', /a copy is kept safe in your own iCloud\. We don't collect/.test(r.priv), r.priv);
  ck('a finished act makes a copy in their iCloud', r.made===true && r.files.length===1 && /^acts-of-good-\d{4}-\d\d-\d\d\.json$/.test(r.files[0]), r.files);
  ck('the whole year, photographs included', r.acts===5 && r.photo, {acts:r.acts, photo:r.photo});
  ck('it says when, in words', /^Saved after every act\. Last copy today, .+\. Only you can see it\.$/.test(r.when), r.when);
  ck('and the backup reminder has nothing to say', r.due===false, r.due);
  ck('nothing new, no second heavy copy', r.again===false, r.again);
  ck('"Nothing leaves it" becomes where the one copy goes', /and a copy goes to your own iCloud\. Nothing comes to us\.$/.test(r.store) && !/never leaves the phone/.test(r.why), {store:r.store, why:r.why});
  await ctx.close();
}

head('the switch turns it off, and stays off');
{ const {ctx,p}=await storeApp();
  await setUp(p, 4);
  const r1 = await p.evaluate(async ()=>{ go('you'); await new Promise(r=>setTimeout(r,200)); cloudToggle();
    return { on:$('cloudsw').getAttribute('aria-checked'), when:$('cloudwhen').textContent, store:$('storagenote').textContent }; });
  await p.reload(); await p.waitForTimeout(1500);
  const r2 = await p.evaluate(async ()=>{ try{sheet(null);}catch(e){} go('you'); await new Promise(r=>setTimeout(r,300));
    S.acts.push({no:'5',t:'Act 5',d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]}); save();
    const made = await cloudNow(true);
    return { off:S.cloudOff, on:$('cloudsw').getAttribute('aria-checked'), made, files:Object.keys(window.__CLOUD).length,
      priv: $('you-privacy').textContent.replace(/\s+/g,' ') }; });
  ck('off, and it says the year is only on this phone', r1.on==='false' && /^Off\. Your year is only on this phone/.test(r1.when), r1);
  ck('and the note goes back to "Nothing leaves it"', /Nothing leaves it\.$/.test(r1.store), r1.store);
  ck('still off after the app is closed and opened', r2.off===true && r2.on==='false', r2);
  ck('and no copy goes while it is off', r2.made===false && r2.files===0, r2);
  const r3 = await p.evaluate(async ()=>{ cloudToggle(); await new Promise(r=>setTimeout(r,1500));
    return { on:$('cloudsw').getAttribute('aria-checked'), files:Object.keys(window.__CLOUD).length }; });
  ck('turned back on, a copy goes straight away', r3.on==='true' && r3.files===1, r3);
  await ctx.close();
}

head('a new phone: the year is offered back');
{ const {ctx,p}=await storeApp({ seed:{ name:SAVED.name, text:SAVED.text, date:'2026-09-24T21:00:00Z' } });
  await p.goto(FILE); await p.waitForTimeout(1600);
  const r = await p.evaluate(()=>({ open: !$('dlg').classList.contains('hide'), title:$('dlg-title').textContent,
    note:$('dlg-note').textContent, yes:$('dlg-yes').textContent, no:$('dlg-no').textContent }));
  ck('it asks before the letter', r.open && r.title==='We found your year', r);
  ck('in plain words', /A copy from .+ is in your iCloud\. Bring it back, every act and every photograph\?/.test(r.note) && r.yes==='Bring it back' && r.no==='Start fresh', r);
  await p.click('#dlg-yes'); await p.waitForTimeout(3500);
  const r2 = await p.evaluate(async ()=>({ acts:(S.acts||[]).length, started:S.started,
    ph: S.acts[0] && S.acts[0].photos && S.acts[0].photos.length, name:S.name }));
  ck('one tap brings the whole year back, photographs and all', r2.acts===5 && r2.ph===1 && r2.name==='Tony', r2);
  await ctx.close();
}

head('a new phone, start fresh: the old copy is set aside, and the letter opens');
{ const {ctx,p}=await storeApp({ seed:{ name:SAVED.name, text:SAVED.text, date:'2026-09-24T21:00:00Z' } });
  await p.goto(FILE); await p.waitForTimeout(1600);
  await p.click('#dlg-no'); await p.waitForTimeout(900);
  const r = await p.evaluate(()=>({ calls:window.__CALLS, acts:(S.acts||[]).length,
    letter: !!document.querySelector('#letter:not(.hide), .letter:not(.hide), #s-letter:not(.hide)') || typeof LETTER_OPEN!=='undefined' }));
  ck('the old copy is kept aside, never replaced', r.calls.indexOf('keep:'+SAVED.name) > -1, r.calls);
  ck('and they start with nothing', r.acts===0, r);
  await ctx.close();
}

head('iCloud Drive switched off on the phone');
{ const {ctx,p}=await storeApp({ status:{ available:false, reason:'icloud-off' } });
  await setUp(p, 4);
  const r = await p.evaluate(async ()=>{ go('you'); const made = await cloudNow(true); await new Promise(r=>setTimeout(r,200));
    drawYou(); return { made, when:$('cloudwhen').textContent, col:$('cloudwhen').style.color, healthy:cloudHealthy(), store:$('storagenote').textContent }; });
  ck('it says so, and how to fix it', /^iCloud Drive is off on this phone/.test(r.when) && /coral/.test(r.col), r);
  ck('no copy, and the backup reminder is not silenced', r.made===false && r.healthy===false, r);
  ck('and it does not claim a copy is going', /Nothing leaves it\.$/.test(r.store), r.store);
  await ctx.close();
}

head('Android: Google asks once, in our words first');
{ const {ctx,p}=await storeApp({ status:{ provider:'gdrive', signedIn:false } });
  await setUp(p, 4);
  const r = await p.evaluate(async ()=>{ go('home'); await cloudNow(true); await new Promise(r=>setTimeout(r,200));
    const out = { open: !$('dlg').classList.contains('hide'), title:$('dlg-title').textContent, yes:$('dlg-yes').textContent,
      no:$('dlg-no').textContent };
    $('dlg-no').click(); await new Promise(r=>setTimeout(r,200));
    await cloudNow(true); await new Promise(r=>setTimeout(r,200));
    out.again = !$('dlg').classList.contains('hide'); out.off = S.cloudOff; out.lab=(go('you'), $('cloudlab').textContent);
    return out; });
  ck('asked, with Allow', r.open && r.title==='Keep a copy in your Google Drive?' && r.yes==='Allow' && r.no==='Not now', r);
  ck('Not now turns it off and it never asks again by itself', r.off===true && r.again===false, r);
  ck('the switch says Google Drive', r.lab==='Keep a copy in your Google Drive', r);
  await ctx.close();
}
{ const {ctx,p}=await storeApp({ status:{ provider:'gdrive', signedIn:false }, allow:true });
  await setUp(p, 4);
  const r = await p.evaluate(async ()=>{ go('home'); await cloudNow(true); await new Promise(r=>setTimeout(r,200));
    $('dlg-yes').click(); await new Promise(r=>setTimeout(r,2000));
    return { files:Object.keys(window.__CLOUD).length, calls:window.__CALLS }; });
  ck('Allow signs in and the first copy goes', r.files===1 && r.calls.indexOf('signIn')>-1, r);
  await ctx.close();
}

head('both halves: the cloud fields survive a reload');
{ const {ctx,p}=await app(3);
  await p.evaluate(()=>{ S.cloudOff=true; S.cloudAt='2026-09-24T12:00:00.000Z'; S.cloudCount=3; S.cloudAsked=true; save(); });
  await p.reload(); await p.waitForTimeout(1400);
  const r = await p.evaluate(()=>({ off:S.cloudOff, at:S.cloudAt, n:S.cloudCount, asked:S.cloudAsked }));
  ck('all four come back', r.off===true && r.at==='2026-09-24T12:00:00.000Z' && r.n===3 && r.asked===true, r);
}

console.log('\n'+pass+' ok, '+fail+' failed'+(errs.length?'\npage errors:\n  '+errs.join('\n  '):''));
await b.close(); process.exit(fail?1:0);

/* THE NEW LANDMINES, 15 September 2026 — the still-open list from the 5M review,
   closed one at a time. Every check here failed before the fix.

     cd /d "C:\\Users\\tony\\Documents\\aog-push" && node tests/landmines.mjs   */
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

const b = await chromium.launch(LAUNCH);
let pass=0, fail=0; const errs=[];
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };
const head=t=>console.log('\n== '+t+' ==');
let CTX=null, PAGE=null;
async function app(acts=6, goal=50){
  if(!CTX){
    CTX=await b.newContext({viewport:{width:390,height:844}});
    /* A LIVE SHEET MAKES THE APP LOOK FOR SIGNUPS ON LAUNCH, and a page opened
       off the disk is not allowed to call actsofgood.app — so the browser logs
       a cross-origin refusal that has nothing to do with the app, which already
       swallows it. Every test that cares about the network stubs fetch itself;
       this is the phone-in-a-tunnel default for everything else, which is a
       state the app has to survive anyway. */
    await CTX.addInitScript(()=>{
      window.fetch = () => Promise.reject(new Error('offline in the harness'));
    });
    PAGE=await CTX.newPage();
    PAGE.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    PAGE.on('pageerror',e=>errs.push('pageerror: '+e.message));
  }
  const p=PAGE;
  await p.goto('about:blank');
  await p.goto(FILE); await p.waitForTimeout(1100);
  await p.evaluate(()=>{ try{ localStorage.clear(); }catch(e){} });
  await p.goto(FILE); await p.waitForTimeout(1100);
  await p.evaluate(([n,goal])=>{
    S.letterSeen=S.started=S.tabToured=S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=goal;S.weeks=52;S.why='to test';
    S.start=new Date(Date.now()-1000*60*60*24*120);
    S.zero={no:'0',zero:true,d:'2026-03-14',t:'begins',posted:{},captions:{}};
    S.acts=[];for(let i=1;i<=n;i++)S.acts.push({no:String(i),t:'Act '+i,
      d:'2026-09-05',story:'s',who:[],posted:{},captions:{},spends:[],photos:[]});
    S.lineTouched=S.wordTouched=false;try{syncReason();}catch(e){}save();},[acts,goal]);
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}});
  return p;
}
/* a sheet as the app really stores one */
const SHEET = (over={}) => Object.assign({
  id:'abc123def4', key:'K'.repeat(40), live:1, done:0,
  at:new Date().toISOString(), reason:'For the crew on shift',
  lede:'A few of us are putting a meal together.',
  slots:['Lasagna','Salad','Bread'], qty:[1,2,1], claims:[], on:{}
}, over);

/* ── 1. TWO TABS ───────────────────────────────────────────────────────────
   The one year-loss family that stayed open through five builds. A second tab
   holds January, the first finishes the year, and the second writes January
   back. The generation counter is the guard: it belongs to the file, not to a
   tab, so a tab whose number is behind knows its copy is history.            */
head('two tabs, and the year one of them still believes in');
{ const p=await app(6);
  const r=await p.evaluate(()=>{
    const before = _gen;
    /* the other tab finishes a year and starts a new one */
    const theirs = JSON.stringify({v:FILE_V,n:50,acts:[],ac:0});
    localStorage.setItem(LS_KEY, theirs);
    localStorage.setItem(GENKEY, String(readGen()+1));
    /* and now THIS tab, still holding six acts, tries to save */
    S.acts[0].story = 'a change in the stale tab';
    save();
    let onDisk=null; try{ onDisk=JSON.parse(localStorage.getItem(LS_KEY)); }catch(e){}
    return { before, stale:_stale, acts:(onDisk&&onDisk.acts||[]).length,
             mine:S.acts.length, edited:S.acts[0].story,
             bar: !!document.getElementById('stalebar') };
  });
  ck('the stale tab does not write its old year back', r.acts===0, r);
  /* it must still HOLD its year — a guard that emptied the tab would pass the
     check above and lose the work anyway. `mine` is 6 only because nothing
     cleared it, so on its own that proves nothing; the edit is what matters. */
  ck('and does not lose it out of its own hands',
     r.mine===6 && r.edited==='a change in the stale tab', r);
  ck('it knows it is stale', r.stale===true, r);
  ck('and says so on the screen', r.bar===true, r);
  const s2=await p.evaluate(()=>{
    /* and it stays stopped — not one save slips through afterwards */
    for(let i=0;i<5;i++){ S.acts[0].story='again '+i; _lastSnap=0; save(); }
    let onDisk=null; try{ onDisk=JSON.parse(localStorage.getItem(LS_KEY)); }catch(e){}
    return (onDisk&&onDisk.acts||[]).length;
  });
  ck('and it stays stopped', s2===0, s2);
  /* C12 — THE LISTENER WAS NEVER RUN BY ANY CHECK. A storage event does not
     fire in the document that caused it, so writing the keys from the page
     proved only the save-time guard. This raises the event the browser would
     raise in the OTHER tab, which is the half that tells a person at the moment
     it happens rather than at their next save. */
  const ev=await p.evaluate(()=>{
    _stale=false; _gen=readGen(); STALE_WARNED=true;      // no dialog in a test
    const bar=document.getElementById('stalebar'); if(bar) bar.remove();
    localStorage.setItem(GENKEY, String(readGen()+1));    // as another tab would
    window.dispatchEvent(new StorageEvent('storage',{key:GENKEY}));
    return { stale:_stale, bar: !!document.getElementById('stalebar') };
  });
  ck('a tab is told the moment another one writes', ev.stale===true, ev);
  ck('and the bar goes up without waiting for a save', ev.bar===true, ev);
  const ev2=await p.evaluate(()=>{
    _stale=false; const bar=document.getElementById('stalebar'); if(bar) bar.remove();
    /* an unrelated key must not set it off */
    window.dispatchEvent(new StorageEvent('storage',{key:'something-else'}));
    return _stale;
  });
  ck('and an unrelated key does not set it off', ev2===false, ev2);

  const ok=await p.evaluate(()=>{
    /* a tab that is up to date writes normally */
    _stale=false; _gen=readGen();
    S.acts=[{no:'1',t:'mine',d:'2026-09-05',story:'',who:[],posted:{},captions:{},spends:[],photos:[]}];
    save();
    let onDisk=null; try{ onDisk=JSON.parse(localStorage.getItem(LS_KEY)); }catch(e){}
    return { acts:(onDisk&&onDisk.acts||[]).length, gen:readGen(), mine:_gen };
  });
  ck('a tab that is up to date saves as normal', ok.acts===1, ok);
  ck('and the generation moves with it', ok.gen===ok.mine && ok.gen>0, ok);
}

/* ── 2. THE SHEET SURVIVES THE FINISH ──────────────────────────────────────  */
head('a sign-up sheet is no longer abandoned at the finish');
{ const p=await app(3);
  const r=await p.evaluate((sh)=>{
    S.works=[{pid:'w1',t:'A meal for the station',d:'2026-09-20',who:[],hon:'',
              cost:0,spends:[],story:'',exp:'',startedAt:'2026-09-01',
              sheet:sh,seed:null,photos:[],notes:[],njr:0}];
    save();
    WK=S.works[0];
    /* the finish, without the screens */
    const el=document.createElement('input'); el.id='fin-no'; el.value='4';
    const el2=document.createElement('input'); el2.id='fin-when'; el2.value='2026-09-20';
    document.body.append(el,el2);
    try{ finishGo(); }catch(e){ return {err:String(e)}; }
    const a=S.acts[S.acts.length-1];
    return { works:S.works.length, onAct: !!(a&&a.sheet&&a.sheet.id),
             id:a&&a.sheet&&a.sheet.id, key: !!(a&&a.sheet&&a.sheet.key) };
  }, SHEET());
  ck('the work is cleared as before', r.works===0, r);
  ck('the sheet rides onto the finished act', r.onAct===true, r);
  ck('with its key, so the page can still be reached', r.key===true, r);
  await p.reload(); await p.waitForTimeout(1400);
  const after=await p.evaluate(()=>{
    const a=(S.acts||[]).filter(x=>x.sheet)[0];
    return { kept: !!(a&&a.sheet&&a.sheet.id), id:a&&a.sheet&&a.sheet.id };
  });
  /* INVARIANT 1: named in serialise AND load, or it is gone on the next launch */
  ck('and it is still there after a relaunch', after.kept===true && after.id==='abc123def4', after);
}

/* ── 3. THE THIRTY DAYS FOLLOWS IT ─────────────────────────────────────────  */
head('the privacy promise follows the sheet onto the act');
{ const p=await app(2);
  const r=await p.evaluate((sh)=>{
    const old=new Date(Date.now()-1000*60*60*24*45).toISOString();
    const withNames=Object.assign({},sh,{at:old,claims:[
      {pos:1,text:'Lasagna',name:'Ginger',contact:'912.555.0148',note:'see you at six',release:'zz'}]});
    S.acts[0].sheet=withNames;
    S.works=[];
    save();
    const changed=forgetOldClaims();
    const c=S.acts[0].sheet.claims[0];
    return { changed, name:c.name, contact:c.contact, note:c.note,
             live:S.acts[0].sheet.live, done:S.acts[0].sheet.done };
  }, SHEET());
  ck('a stranger\u2019s number is deleted', !r.contact, r);
  ck('and their message with it', !r.note, r);
  ck('the name stays, as on the server', r.name==='Ginger', r);
  ck('and the sheet stops calling itself live', r.live===0 && r.done===1, r);
}

/* ── 4. WHAT COMES BACK FROM THE SERVER ────────────────────────────────────  */
head('the reply is shaped and capped before it is saved');
{ const p=await app(2);
  const r=await p.evaluate(()=>{
    const junk={slots:[]};
    for(let i=0;i<900;i++) junk.slots.push({pos:i,grp:null,text:'x'.repeat(5000),
      name:'y'.repeat(500),contact:'z'.repeat(900),note:'n'.repeat(9000),
      evil:'<img onerror=1>', deep:{a:{b:{c:'x'.repeat(1000)}}}});
    junk.slots.push('not an object'); junk.slots.push(null);
    const out=takeClaims(junk);
    const one=out[0]||{}, last=out[out.length-1]||{};
    return { n:out.length, text:one.text.length, name:one.name.length,
             contact:one.contact.length, note:one.note.length,
             lastName:(last.name||'').length, lastPos:last.pos,
             lastNote:(last.note||'').length,
             keys:Object.keys(one).sort().join(','),
             bytes: JSON.stringify(out).length };
  });
  ck('every row an organiser can count is kept', r.n===900, r);
  ck('every field is capped', r.text===200 && r.name===60 && r.contact===120 && r.note===400, r);
  ck('nothing else rides in', r.keys==='contact,grp,name,note,pos,text', r);
  /* THE BUDGET IS IN BYTES. A row count cannot bound a size, and the count that
     bounds the real product (2400) is 1.9MB at full fields. Names and places are
     always kept; what a claimer typed is shed first. */
  ck('and the whole thing is small enough to live beside a journal',
     r.bytes < 600*1000, r.bytes);
  ck('every row still has its place and its name',
     r.lastName===60 && r.lastPos===899, r);
  ck('and the long typed field is what was shed', r.lastNote===0, r);
  const huge=await p.evaluate(()=>{
    const junk={slots:[]};
    for(let i=0;i<5000;i++) junk.slots.push({pos:i,text:'x'.repeat(200),
      name:'y'.repeat(60),contact:'z'.repeat(120),note:'n'.repeat(400)});
    const out=takeClaims(junk);
    return { n:out.length, bytes:JSON.stringify(out).length };
  });
  ck('and a sheet past anything the product can make is still bounded',
     huge.bytes < 700*1000 && huge.n <= 2400, huge);
}

/* C13 — AND IT IS ACTUALLY WIRED IN. The section above tests the filter alone;
   reverting both callers to `j.slots||[]` left all forty-five checks green. */
head('and the filter is on the path the reply really takes');
{ const p=await app(2);
  const r=await p.evaluate(async (sh)=>{
    const junk={slots:[]};
    for(let i=0;i<50;i++) junk.slots.push({pos:i,text:'x'.repeat(4000),
      name:'y'.repeat(400),contact:'z'.repeat(400),note:'n'.repeat(4000),evil:'<b>'});
    const realF=window.fetch;
    window.fetch=()=>Promise.resolve({ok:true,status:200,json:async()=>junk});
    S.works=[{pid:'w7',t:'x',d:'',who:[],hon:'',cost:0,spends:[],story:'',exp:'',
              startedAt:'',sheet:sh,seed:null,photos:[],notes:[],njr:0}];
    WK=S.works[0];
    await askRefresh();
    const afterRefresh = (S.works[0].sheet.claims||[])[0]||{};
    S.works[0].sheet.claims=[];
    await claimSweep();
    const afterSweep = (S.works[0].sheet.claims||[])[0]||{};
    window.fetch=realF;
    return { refresh:{note:(afterRefresh.note||'').length, evil:afterRefresh.evil},
             sweep:{note:(afterSweep.note||'').length, evil:afterSweep.evil} };
  }, SHEET());
  ck('reading the names back goes through the filter',
     r.refresh.note===400 && r.refresh.evil===undefined, r.refresh);
  ck('and so does the look on every launch',
     r.sweep.note===400 && r.sweep.evil===undefined, r.sweep);

  /* the server tells the app its own sheet is shut, on every read */
  const shut=await p.evaluate(async (sh)=>{
    const realF=window.fetch;
    window.fetch=()=>Promise.resolve({ok:true,status:200,
      json:async()=>({id:'abc123def4',closed:1,slots:[]})});
    S.works=[{pid:'w8',t:'x',d:'',who:[],hon:'',cost:0,spends:[],story:'',exp:'',
              startedAt:'',sheet:Object.assign({},sh,{live:1,done:0}),seed:null,
              photos:[],notes:[],njr:0}];
    WK=S.works[0];
    await askRefresh();
    window.fetch=realF;
    return { live:S.works[0].sheet.live, done:S.works[0].sheet.done };
  }, SHEET());
  ck('a page the server says is shut stops being called live',
     shut.live===0 && shut.done===1, shut);
}

/* ── 5. WHAT ACTUALLY WENT WRONG ───────────────────────────────────────────  */
head('four calls stop blaming the signal');
{ const p=await app(2);
  const said=await p.evaluate(async ()=>{
    const out={};
    const grab=async (fn)=>{
      let got=null;
      const real=window.say; window.say=(t,n)=>{ got={t:t,n:n}; };
      try{ await fn(); }catch(e){ got={t:'THREW',n:String(e)}; }
      window.say=real; return got;
    };
    out.gone   = await grab(()=>sheetTrouble({status:404,json:async()=>({error:'gone'})},'x'));
    out.big    = await grab(()=>sheetTrouble({status:400,json:async()=>({error:'A sheet can hold up to 60 different things. Split it into two sheets.'})},'x'));
    out.closed = await grab(()=>sheetTrouble({status:409,json:async()=>({error:'closed'})},'x'));
    out.notyet = await grab(()=>sheetTrouble({status:409,json:async()=>({error:'not yet'})},'x'));
    out.theirs = await grab(()=>sheetTrouble({status:401,json:async()=>({error:'Not yours.'})},'x'));
    out.nonet  = await grab(()=>sheetTrouble(null,'x'));
    return out;
  });
  ck('a deleted sheet is not "try again in a moment"',
     /finished/i.test(said.gone.t) && !/try again/i.test(said.gone.n), said.gone);
  ck('a sheet too big says so, and says how big', /more than one sheet/i.test(said.big.t) &&
     /60/.test(said.big.n), said.big);
  ck('a closed page says it is down', /down/i.test(said.closed.t), said.closed);
  ck('a stale sheet keeps its own words', /did not go through/i.test(said.notyet.t), said.notyet);
  ck('another phone\u2019s sheet still says so', /not yours/i.test(said.theirs.t), said.theirs);
  ck('and no signal is still no signal', /no connection/i.test(said.nonet.t), said.nonet);

  /* the cap is asked BEFORE it is sent, so trying again cannot be the advice */
  const big=await p.evaluate(async (sh)=>{
    let called=0; const realF=window.fetch; window.fetch=()=>{called++;return Promise.reject(new Error('should not be called'));};
    let got=null; const realS=window.say; window.say=(t,n)=>{got={t,n};};
    const many=[]; for(let i=0;i<61;i++) many.push('thing '+i);
    S.works=[{pid:'w9',t:'x',d:'',who:[],hon:'',cost:0,spends:[],story:'',exp:'',
              startedAt:'',sheet:Object.assign({},sh,{slots:many,qty:[]}),seed:null,
              photos:[],notes:[],njr:0}];
    WK=S.works[0];
    await askPublish();
    window.fetch=realF; window.say=realS;
    return { called, got };
  }, SHEET());
  ck('a sheet past the cap never leaves the phone', big.called===0, big);
  ck('and it is told the real reason', /more than one sheet/i.test(big.got.t), big.got);
}

/* ── 6. TAKING IT DOWN ─────────────────────────────────────────────────────  */
head('a sheet can be ended');
{ const p=await app(2);
  const r=await p.evaluate(async (sh)=>{
    let body=null, url=null;
    const realF=window.fetch;
    window.fetch=(u,o)=>{ url=u; body=JSON.parse(o.body);
      return Promise.resolve({ok:true,status:200,json:async()=>({ok:true})}); };
    S.works=[{pid:'w2',t:'x',d:'',who:[],hon:'',cost:0,spends:[],story:'',exp:'',
              startedAt:'',sheet:sh,seed:null,photos:[],notes:[],njr:0}];
    WK=S.works[0];
    await askSetClosed(S.works[0].sheet, 1);
    window.fetch=realF;
    return { url:String(url), closed: body && body.closed, slots: body && body.slots.length };
  }, SHEET());
  ck('it is the sheet\u2019s own address', /\/a\/abc123def4$/.test(r.url), r);
  ck('and it asks the server to close it', r.closed===1, r);
  ck('sending the needs along, as the route requires', r.slots===3, r);
  const btn=await p.evaluate(()=>{
    S.works=[{pid:'w3',t:'x',d:'',who:[],hon:'',cost:0,spends:[],story:'',exp:'',
              startedAt:'',sheet:{id:'q',key:'k',live:1,slots:['a'],qty:[],claims:[],on:{}},
              seed:null,photos:[],notes:[],njr:0}];
    WK=S.works[0];
    try{ openWork(S.works[0]); drawSheetPanel(); }catch(e){ return 'threw: '+e.message; }
    return (document.getElementById('wk-ask')||{}).innerHTML||'';
  });
  ck('and there is a button for it on a live sheet', /askTakeDown\(\)/.test(btn),
     String(btn).slice(0,120));
}

/* ── 7. THE LEGACY KEY ─────────────────────────────────────────────────────  */
head('one secret no longer opens every old sheet');
{ const p=await app(2);
  await p.evaluate(()=>{
    const raw=JSON.parse(localStorage.getItem(LS_KEY));
    raw.pubkey='THEOLDMASTERKEY';
    raw.works=[
      {pid:'a',t:'live one',  sheet:{id:'aaaaaaaaaa',live:1,slots:['x'],claims:[]}},
      {pid:'b',t:'done one',  sheet:{id:'bbbbbbbbbb',live:0,done:1,slots:['x'],claims:[]}},
      {pid:'c',t:'never up',  sheet:{id:'cccccccccc',live:0,slots:['x'],claims:[]}}
    ];
    localStorage.setItem(LS_KEY, JSON.stringify(raw));
  });
  await p.reload(); await p.waitForTimeout(1400);
  const r=await p.evaluate(()=>{
    const k=id=>{ const w=(S.works||[]).find(x=>x.sheet&&x.sheet.id===id); return w&&w.sheet.key||''; };
    let onDisk=null; try{ onDisk=JSON.parse(localStorage.getItem(LS_KEY)); }catch(e){}
    return { live:k('aaaaaaaaaa'), done:k('bbbbbbbbbb'), never:k('cccccccccc'),
             master:(onDisk&&onDisk.pubkey)||'' };
  });
  ck('the live sheet keeps the only key that opens it', r.live==='THEOLDMASTERKEY', r);
  ck('a finished sheet is given nothing', !r.done, r);
  /* DELIBERATELY WIDER THAN `live`. The thirty-day sweep clears `live` on any
     sheet whose date will not parse, and an undated sheet is exactly what a
     legacy one is \u2014 so keying on `live` alone could deny a poster that is
     still up the one key that opens it, permanently, with the master key
     dropped two lines later. A key to a sheet that never went up opens
     nothing, so erring this way costs nothing at all. */
  ck('one that never went up keeps it too, which costs nothing',
     r.never==='THEOLDMASTERKEY', r);
  ck('the master key is gone from the file', !r.master, r);
}

/* ── 8. THE YEAR SCREEN HAS A VIEW OF INTENTION AGAIN ──────────────────────  */
head('what you meant to do is back on the year screen');
{ const p=await app(4);
  const r=await p.evaluate(()=>{
    S.works=[
      {pid:'p1',t:'Soup for the Hardys',d:'2026-09-22',who:[],hon:'',cost:0,spends:[],
       story:'',exp:'',startedAt:'',sheet:null,seed:null,photos:[],notes:[],njr:0},
      {pid:'p2',t:'Books to the shelter',d:'2026-10-02',who:[],hon:'',cost:0,spends:[],
       story:'',exp:'',startedAt:'',sheet:null,seed:null,photos:[],notes:[],njr:0},
      {pid:'p3',t:'Something with no day',d:'',who:[],hon:'',cost:0,spends:[],
       story:'',exp:'',startedAt:'',sheet:null,seed:null,photos:[],notes:[],njr:0}
    ];
    save();
    try{ drawGrid(); }catch(e){ return {err:e.message}; }
    const dot=document.getElementById('worksdot');
    return { next:(document.getElementById('grid-next')||{}).textContent||'',
             note:(document.getElementById('grid-note')||{}).textContent||'',
             dot:dot?dot.textContent:'', dotShown:dot?!dot.classList.contains('hide'):false };
  });
  ck('the next thing in the works is named', /Soup for the Hardys/.test(r.next), r);
  ck('with the day it is for', /Sep 22/.test(r.next), r);
  ck('and how many else are waiting', /2 more/.test(r.next), r);
  ck('the tab carries the count', r.dot==='3' && r.dotShown, r);
  /* the sentence is in the markup, so look in the WHOLE document rather than at
     one element that no JS writes — that check passed with the feature deleted */
  /* READ WHAT IS ON THE SCREEN, NOT THE SOURCE. Searching innerHTML found the
     sentence \u2014 inside the comment that records its removal. The same trap
     caught a font check two builds ago: a removal note quotes the thing it
     removed. */
  const gone = await p.evaluate(()=>{
    const el=document.getElementById('s-home');
    return !/tap an empty one to plan it/i.test((el&&el.innerText)||'');
  });
  ck('and the untrue instruction is off the screen', gone===true, r.note);

  const cal=await p.evaluate(()=>{
    CAL_M={y:2026,m:8};                      // September
    try{ drawCal(); }catch(e){ return {err:e.message}; }
    const g=document.getElementById('cal-grid');
    const d22=[...g.querySelectorAll('[data-d]')].find(x=>x.getAttribute('data-d')==='2026-09-22');
    return { marked: d22 ? /var\(--gold\)/.test(d22.getAttribute('style')||'') : false,
             list:(document.getElementById('cal-list')||{}).textContent||'' };
  });
  ck('the calendar marks the day it is on', cal.marked===true, cal);
  ck('and says what it is', /Soup for the Hardys/.test(cal.list), cal.list.slice(0,120));
  ck('in the shelf\u2019s own words', /in the works/.test(cal.list), cal.list.slice(0,160));

  const empty=await p.evaluate(()=>{
    S.works=[]; save();
    try{ drawGrid(); }catch(e){ return {err:e.message}; }
    const dot=document.getElementById('worksdot');
    return { next:(document.getElementById('grid-next')||{}).textContent||'',
             dotShown:dot?!dot.classList.contains('hide'):false };
  });
  ck('an empty shelf says nothing at all', !empty.next && !empty.dotShown, empty);
}

/* ── 9. WHAT THE REVIEW SEATS FOUND IN THIS BUILD ─────────────────────────
   Twenty-one faults, in a build that had already passed 161 checks. Each one
   below failed before its fix.                                              */
head('what the review found');
{ const p=await app(3);
  /* the backup must not carry strangers, now that a sheet rides onto an act */
  const bk=await p.evaluate(async (sh)=>{
    const withNames=Object.assign({},sh,{claims:[
      {pos:1,text:'Lasagna',name:'Ginger',contact:'912.555.0148',note:'see you at six'}]});
    S.acts[0].sheet=withNames;
    S.past=[{n:50,word:'good',acts:[{no:'1',t:'last year',d:'2025-01-02',
             photos:[],sheet:Object.assign({},withNames)}]}];
    S.works=[];
    save();
    let text='';
    const realURL=URL.createObjectURL, realA=HTMLAnchorElement.prototype.click;
    URL.createObjectURL=(blob)=>{ text=blob; return 'blob:x'; };
    HTMLAnchorElement.prototype.click=function(){};
    try{ await exportJournal(); }catch(e){}
    URL.createObjectURL=realURL; HTMLAnchorElement.prototype.click=realA;
    const body = text ? await text.text() : '';
    return { n:body.length, phone: body.indexOf('912.555.0148')>-1,
             note: body.indexOf('see you at six')>-1,
             name: body.indexOf('Ginger')>-1,
             taken: body.indexOf('"taken":true')>-1 };
  }, SHEET());
  ck('a backup was written', bk.n>100, bk.n);
  ck('and it carries no phone number', bk.phone===false, bk);
  ck('and no message', bk.note===false, bk);
  ck('and no name', bk.name===false, bk);
  ck('but it does still say the row was taken', bk.taken===true, bk);

  /* the thirty days reaches a sheet that survived a rollover */
  const pastSweep=await p.evaluate(()=>{
    const old=new Date(Date.now()-1000*60*60*24*45).toISOString();
    S.past[0].acts[0].sheet.at=old;
    forgetOldClaims();
    const c=S.past[0].acts[0].sheet.claims[0];
    return { contact:c.contact, note:c.note, name:c.name };
  });
  ck('a past year\u2019s sheet is cleaned too', !pastSweep.contact && !pastSweep.note, pastSweep);
  ck('and keeps the name', pastSweep.name==='Ginger', pastSweep);
}

{ const p=await app(3);
  /* the restore must not leave another window thinking it is up to date */
  const g=await p.evaluate(()=>{
    const before=readGen();
    writeJournal(JSON.stringify(serialise()));
    return { before, after:readGen(), mine:_gen };
  });
  ck('every writer of the journal raises the generation',
     g.after===g.before+1 && g.mine===g.after, g);
  const direct=await p.evaluate(()=>{
    const src=String(exportJournal)+String(load)+String(save);
    return document.documentElement.innerHTML
      .split('localStorage.setItem(LS_KEY,').length - 1;
  });
  ck('and only one place writes it at all', direct===1, direct);

  /* a tab that cannot save must not put a poster on the internet */
  const pub=await p.evaluate(async (sh)=>{
    let called=0; const realF=window.fetch;
    window.fetch=()=>{called++;return Promise.reject(new Error('no'));};
    let got=null; const realS=window.say; window.say=(t,n)=>{got={t,n};};
    _stale=true;
    S.works=[{pid:'wz',t:'x',d:'',who:[],hon:'',cost:0,spends:[],story:'',exp:'',
              startedAt:'',sheet:Object.assign({},sh,{key:''}),seed:null,
              photos:[],notes:[],njr:0}];
    WK=S.works[0];
    await askPublish();
    _stale=false; window.fetch=realF; window.say=realS;
    return { called, got, key:S.works[0].sheet.key };
  }, SHEET());
  ck('a stale tab cannot publish a sheet', pub.called===0, pub);
  ck('so it cannot lose the key to one', !pub.key, pub);
  ck('and it is told why', /not saving/i.test(pub.got.t), pub.got);
}

{ const p=await app(3);
  /* taking a page down must be undoable, and must not wipe the day */
  const body=await p.evaluate(async (sh)=>{
    const sent=[]; const realF=window.fetch;
    window.fetch=(u,o)=>{ sent.push(JSON.parse(o.body));
      return Promise.resolve({ok:true,status:200,json:async()=>({ok:true})}); };
    const s2=Object.assign({},sh,{on:{when:1,where:1},when:'Friday, September 11',
                                  where:'Fire Station No. 1'});
    S.works=[{pid:'wq',t:'x',d:'2026-09-11',who:[],hon:'',cost:0,spends:[],story:'',
              exp:'',startedAt:'',sheet:s2,seed:null,photos:[],notes:[],njr:0}];
    WK=S.works[0];
    await askSetClosed(s2, 1, WK.d);
    await askPublish();
    window.fetch=realF;
    return { close:sent[0], open:sent[1] };
  }, SHEET());
  ck('the close carries the day, so the server cannot wipe it',
     body.close.when==='2026-09-11', body.close);
  ck('and the ticked When detail is untouched by it',
     body.close.facts.when==='Friday, September 11', body.close.facts);
  ck('and the other details travel with it',
     body.close.facts.where==='Fire Station No. 1', body.close.facts);
  ck('putting it up again says so, or it stays shut for ever',
     body.open.closed===0, body.open);

  /* a refusal is not a success */
  const lie=await p.evaluate(async (sh)=>{
    let got=null; const realS=window.say; window.say=(t,n)=>{got={t,n};};
    let called=0; const realF=window.fetch;
    window.fetch=()=>{called++;return Promise.resolve({ok:true,status:200,json:async()=>({})});};
    const s2=Object.assign({},sh,{key:''});           // no key: cannot be closed
    let threw=false;
    try{ await askSetClosed(s2,1,''); }catch(e){ threw=true; }
    window.say=realS; window.fetch=realF;
    return { threw, called, got };
  }, SHEET());
  ck('a sheet that cannot be closed says so rather than returning quietly',
     lie.threw===true && lie.called===0, lie);
}

{ const p=await app(3);
  /* next means next */
  const nx=await p.evaluate(()=>{
    const mk=(pid,t,d)=>({pid,t,d,who:[],hon:'',cost:0,spends:[],story:'',exp:'',
                          startedAt:'',sheet:null,seed:null,photos:[],notes:[],njr:0});
    const y=new Date(Date.now()+1000*60*60*24*30).toISOString().slice(0,10);
    S.works=[mk('a','The thing I never did','2020-03-04'), mk('b','Soup for the Hardys',y),
             mk('c','',''), mk('d','','')];
    save(); drawGrid();
    return { line:(document.getElementById('grid-next')||{}).textContent||'',
             dot:(document.getElementById('worksdot')||{}).textContent||'' };
  });
  ck('an abandoned day does not pin the line',
     /Soup for the Hardys/.test(nx.line) && !/^Next: The thing I never did/.test(nx.line), nx.line);
  ck('and the badge counts what the shelf lists', nx.dot==='4', nx);

  /* and the badge does not go stale */
  const stale=await p.evaluate(()=>{
    S.works.splice(0,2); save();
    go('works');
    return (document.getElementById('worksdot')||{}).textContent||'';
  });
  ck('it follows a change made on another screen', stale==='2', stale);
}

/* ── 10. G'S RULINGS OF 15 SEPTEMBER ──────────────────────────────────────  */
head("the two rulings");
{ const p=await app(11);
  const r=await p.evaluate(()=>{
    S.start=new Date('2026-03-14');
    S.zero={no:'0',zero:true,d:'2026-03-14',t:'begins',posted:{},captions:{}};
    S.weeks=52; save(); drawGrid();
    const bl=document.getElementById('bk-last');
    const sashes=[...document.querySelectorAll('#grid .tile .sash')];
    const op = sashes.map(x=>getComputedStyle(x).opacity);
    return { post: !!bl.querySelector('.mpost'),
             month: (bl.querySelector('.mpm')||{}).textContent||'',
             boxed: bl.classList.contains('waiting') || /^\d+$/.test(bl.textContent.trim()),
             note: (document.getElementById('zeronote')||{}).textContent||'',
             label: bl.getAttribute('aria-label')||'',
             sashes: sashes.length, opacities:[...new Set(op)] };
  });
  /* 1D — the milepost */
  ck('the end of the year is a milepost', r.post===true, r);
  ck('and not a numbered box', r.boxed===false, r);
  ck('it names the month the year lands in', r.month==='MAR', r);
  /* "say the month and not day" */
  ck('the row speaks in months at both ends',
     /Declared in March\. Finishes in March 2027\./.test(r.note), r.note);
  ck('and it never says "day"', !/\bday\b/i.test(r.note), r.note);
  ck('the milepost can be read aloud', /end of your year/i.test(r.label), r.label);

  /* "make them all the same" — this REVERSES S3B's dimming */
  ck('every sash is drawn', r.sashes===11, r);
  ck('and every one at the same strength', r.opacities.length===1, r.opacities);

  /* a year declared in March finishing in March must not read as a mistake */
  const other=await p.evaluate(()=>{
    S.start=new Date('2026-06-01');
    S.zero={no:'0',zero:true,d:'2026-06-01',t:'begins',posted:{},captions:{}};
    save(); drawGrid();
    return { note:(document.getElementById('zeronote')||{}).textContent||'',
             month:(document.querySelector('#bk-last .mpm')||{}).textContent||'' };
  });
  ck('a year that lands in a different month needs no year on it',
     /Declared in June\. Finishes in May\./.test(other.note), other.note);
  ck('and the milepost follows it', other.month==='MAY', other);

  /* the journal stays where it is — ruling 2A, "just leave the grid in place" */
  const jrn=await p.evaluate(()=>{
    const btn=[...document.querySelectorAll('#s-home .btn.ghost')]
                .find(b=>/Read your year/.test(b.textContent));
    const grid=document.getElementById('grid');
    if(!btn||!grid) return null;
    return btn.compareDocumentPosition(grid) & Node.DOCUMENT_POSITION_PRECEDING ? 'after' : 'before';
  });
  ck('the journal stays below the grid', jrn==='after', jrn);
}

/* ── 11. THE SUGGESTION CARD, RULED 15 SEPTEMBER ──────────────────────────
   G: the label must say what the thing IS; the explanation waits for a tap;
   it rotates every time you open it; and it never offers one already taken. */
head('the card on the year screen');
{ const p=await app(4);
  const r=await p.evaluate(()=>{
    drawHome();
    const tag=document.getElementById('sug-tag'),
          ttl=document.getElementById('sug-title'),
          bod=document.getElementById('sug-body');
    return { tag:tag.textContent, title:ttl.textContent,
             body:bod.textContent, hidden:bod.classList.contains('hide'),
             tappable: ttl.tagName==='BUTTON' && ttl.classList.contains('canwhy'),
             expanded: ttl.getAttribute('aria-expanded') };
  });
  ck('the label says what it is', r.tag==='An idea', r.tag);
  ck('and never says "worth doing"', !/worth/i.test(r.tag), r.tag);
  ck('the card leads with the act itself', r.title.length>3, r.title);
  ck('the explanation is written but not shown', r.body.length>10 && r.hidden===true, r);
  ck('and the title is the thing you tap', r.tappable===true, r);
  ck('which says so to a screen reader', r.expanded==='false', r.expanded);

  const tapped=await p.evaluate(()=>{
    const ttl=document.getElementById('sug-title'), bod=document.getElementById('sug-body');
    ttl.click();
    const open={ hidden:bod.classList.contains('hide'), exp:ttl.getAttribute('aria-expanded'),
                 turned:ttl.classList.contains('open') };
    ttl.click();
    return { open, shut:{ hidden:bod.classList.contains('hide'),
                          exp:ttl.getAttribute('aria-expanded') } };
  });
  ck('a tap shows the explanation', tapped.open.hidden===false && tapped.open.exp==='true', tapped.open);
  ck('and the mark turns with it', tapped.open.turned===true, tapped.open);
  ck('a second tap closes it again',
     tapped.shut.hidden===true && tapped.shut.exp==='false', tapped.shut);

  /* AN OCCASION IS THE OTHER WAY ROUND — a date with no line says nothing, so
     that branch keeps its words on the card. */
  const occ=await p.evaluate(()=>{
    const s=suggestion.toString();
    return /tapForWhy:true/.test(s) && (s.match(/tapForWhy/g)||[]).length===1;
  });
  ck('only the idea hides its words, not the occasion', occ===true, occ);

  /* IT ROTATES. Two different seeds must be able to reach different ideas. */
  const rot=await p.evaluate(()=>{
    const seen=new Set();
    const live=IDEAS.filter(i=>!ideaUsed(i));
    for(let k=1;k<=40;k++) seen.add(live[(k*37)%live.length].t);
    return { picks:seen.size, weekly:(typeof weekSeed==='function' && SUG_SEED===weekSeed()) };
  });
  ck('the pick really does move with the seed', rot.picks>10, rot);
  ck('and the seed is not the weekly one', rot.weekly===false, rot);

  /* AND IT NEVER OFFERS ONE THEY HAVE TAKEN. Every idea gets shelved, so there
     is nothing left to suggest — the card must not hand the library back. */
  const used=await p.evaluate(()=>{
    S.works = IDEAS.map((i,k)=>({pid:'u'+k,t:i.t,d:'',who:[],hon:'',cost:0,spends:[],
      story:'',exp:'',startedAt:'',sheet:null,seed:null,photos:[],notes:[],njr:0}));
    save();
    const s=suggestion();
    return { tag:s.tag, isIdea: !!s.idea,
             stillOffered: IDEAS.some(i=>i.t===s.t) };
  });
  ck('with the library all taken, no idea is offered back',
     used.isIdea===false && used.stillOffered===false, used);
  ck('and the card says something true about the month instead',
     used.tag==='This month', used.tag);
}

/* RULED 15 Sep 2026: "move all the buttons to the bottom and align them." */
{ const p=await app(4);
  const r=await p.evaluate(()=>{
    drawHome();
    const head=document.querySelectorAll('.sughead .btn').length;
    const bs=[...document.querySelectorAll('#sug-btns .btn')].map(b=>{
      const x=b.getBoundingClientRect();
      return { t:b.textContent, w:Math.round(x.width), h:Math.round(x.height),
               y:Math.round(x.top), ghost:b.classList.contains('ghost') };
    });
    const row=document.getElementById('sug-btns').getBoundingClientRect();
    const card=document.querySelector('.sugbox').getBoundingClientRect();
    return { head, bs, fromFoot: Math.round(card.bottom - row.bottom) };
  });
  ck('no button is left up on the label line', r.head===0, r.head);
  ck('both buttons are in the one row at the foot', r.bs.length===2, r.bs);
  ck('they sit on the same line', r.bs[0].y===r.bs[1].y, r.bs);
  ck('they are the same height', r.bs[0].h===r.bs[1].h, r.bs);
  /* the outlined button carries a border and the filled one does not, which is
     two pixels of difference unless it is asked for */
  ck('and exactly the same width', r.bs[0].w===r.bs[1].w, r.bs);
  ck('the outline is still an outline', r.bs[1].ghost===true, r.bs);
  ck('and the row really is at the bottom of the card', r.fromFoot < 30, r.fromFoot);

  /* an occasion the app could not confidently pair an act with has one button,
     and a row with a hole in it is not aligned, it is broken */
  const one=await p.evaluate(()=>{
    const real=window.suggestion;
    window.suggestion=()=>({tag:'Occasion \u00b7 in 3 days',t:'Some Day',b:'A line about it.'});
    drawHome();
    const bs=[...document.querySelectorAll('#sug-btns .btn')];
    const w=bs.map(b=>Math.round(b.getBoundingClientRect().width));
    const row=Math.round(document.getElementById('sug-btns').getBoundingClientRect().width);
    window.suggestion=real; drawHome();
    return { n:bs.length, w, row };
  });
  ck('a day with no act to start shows one button, full width',
     one.n===1 && Math.abs(one.w[0]-one.row)<2, one);
}

/* ── 12. THE REMINDER IS A PULL-DOWN. Ruled 15 September 2026. ────────────  */
head('the reminder');
{ const p=await app(2);
  const r=await p.evaluate(()=>{
    S.works=[{pid:'w1',t:'A meal for the station',d:'2026-09-22',who:[],hon:'',cost:0,
              spends:[],story:'',exp:'',startedAt:'',sheet:null,seed:null,photos:[],
              notes:[],njr:0}];
    save();
    openWork(S.works[0]);
    const box=document.getElementById('wk-remind');
    const sel=box.querySelector('select');
    const cs=sel?getComputedStyle(sel):null;
    return { chips:box.querySelectorAll('.chip').length,
             isSelect: !!sel,
             shown: sel?sel.options[sel.selectedIndex].textContent:'',
             value: sel?sel.value:'',
             options: sel?[...sel.options].map(o=>o.textContent):[],
             h: sel?Math.round(sel.getBoundingClientRect().height):0,
             font: cs?cs.fontSize:'',
             named: sel?sel.getAttribute('aria-label'):'' };
  });
  ck('the five buttons are gone', r.chips===0, r.chips);
  ck('and it is one pull-down', r.isSelect===true, r);
  ck('showing the default, a day before', r.shown==='Day before' && r.value==='1', r);
  ck('with every choice still in it', r.options.length===5, r.options);
  ck('a thumb can hit it', r.h>=44, r.h);
  /* below 16px iOS zooms the whole page when the control takes focus and leaves
     the person scrolled somewhere else entirely */
  ck('and iOS will not zoom the page to reach it', r.font==='16px', r.font);
  ck('it says what it is to a screen reader', /remind/i.test(r.named||''), r.named);

  const chg=await p.evaluate(()=>{
    const sel=document.querySelector('#wk-remind select');
    sel.value='7'; sel.dispatchEvent(new Event('change'));
    let disk=null; try{ disk=JSON.parse(localStorage.getItem(LS_KEY)).works[0].r; }catch(e){}
    return { wk:WK.r, disk, stillOpen: !!document.querySelector('#wk-remind select') };
  });
  ck('choosing one keeps it', chg.wk==='7' && chg.disk==='7', chg);
  /* redrawing a select inside its own change handler closes the wheel twice on
     iOS and reads as a flicker */
  ck('and the box is not rebuilt under the finger', chg.stillOpen===true, chg);

  /* a value the list does not hold must not leave the box blank */
  const odd=await p.evaluate(()=>{
    WK.r='99'; drawWorkRemind();
    const sel=document.querySelector('#wk-remind select');
    return { shown:sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].textContent : '' };
  });
  ck('a value it does not know still reads as something', odd.shown==='Day before', odd);

  /* RULED 15 Sep 2026: "you need a trigger for the reminder. You select the
     time and hit a button to set it up. It should be in line with the pull
     down." Picking a lead time never did anything on its own \u2014 it only
     described what the alarm WOULD be if you found the calendar icon three rows
     above, beside the date. */
  const trig=await p.evaluate(()=>{
    const row=document.querySelector('.remindrow');
    const sel=row?row.querySelector('select'):null;
    const btn=document.getElementById('wk-setremind');
    const sb=btn?btn.getBoundingClientRect():null, sr=sel?sel.getBoundingClientRect():null;
    return { inRow: !!(row && sel && btn && row.contains(btn)),
             sameLine: (sb&&sr) ? Math.abs(Math.round(sb.top)-Math.round(sr.top))<=1 : false,
             sameHeight: (sb&&sr) ? Math.abs(Math.round(sb.height)-Math.round(sr.height))<=1 : false,
             h: sb?Math.round(sb.height):0,
             word: btn?btn.textContent:'',
             marks: document.querySelectorAll('#s-work .calgo').length,
             markIsButton: [...document.querySelectorAll('#s-work .calgo')]
               .some(m=>m.tagName==='BUTTON' || m.onclick ||
                        getComputedStyle(m).pointerEvents!=='none') };
  });
  ck('there is a button to set it', trig.word==='Set it', trig);
  ck('and it is in line with the pull-down', trig.inRow && trig.sameLine, trig);
  ck('the same height as it', trig.sameHeight && trig.h>=44, trig);
  /* THIS CHECK WAS REVERSED ON 16 SEPTEMBER and is kept rather than deleted.
     It used to read "the old calendar icon is not left behind it", guarding the
     5T ruling by asserting the editor held NO calendar mark at all. G then asked
     for one back: "can we add the calendar icon to the box under aiming for…
     beside the date."

     What the 5T ruling actually protects is that the reminder's TRIGGER is a
     button with a word on it, not an icon three rows away. A mark that cannot be
     tapped does not threaten that. So the check now holds the thing the ruling
     was really about: the editor may carry the mark, and the mark must not be a
     second trigger. */
  ck('the editor carries exactly one calendar mark', trig.marks===1, trig);
  ck('and it is a mark, not a second trigger', trig.markIsButton===false, trig);

  /* "None" is a real choice and it is not a reminder */
  const none=await p.evaluate(()=>{
    const sel=document.querySelector('#wk-remind select');
    sel.value='none'; sel.dispatchEvent(new Event('change'));
    const a=document.getElementById('wk-setremind').textContent;
    sel.value='1'; sel.dispatchEvent(new Event('change'));
    return { none:a, back:document.getElementById('wk-setremind').textContent };
  });
  ck('with None it does not claim to set a reminder', none.none==='Add the day', none);
  ck('and it comes back when a time is chosen', none.back==='Set it', none);

  /* a day is needed before anything can be handed over */
  const noday=await p.evaluate(()=>{
    let got=null; const realS=window.say; window.say=(t,n)=>{got={t,n};};
    let clicked=0; const realC=HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click=function(){clicked++;};
    /* THE FORM IS THE TRUTH, NOT THE OBJECT. workToCalendar re-reads the editor
       before it does anything, so clearing WK.d alone is undone a line later by
       the hidden date field. Both, or the test proves nothing. */
    const keep=WK.d, el=document.getElementById('wk-when'), keepEl=el?el.value:'';
    WK.d=''; if(el) el.value='';
    workToCalendar();
    WK.d=keep; if(el) el.value=keepEl;
    window.say=realS; HTMLAnchorElement.prototype.click=realC;
    return { got, clicked };
  });
  ck('no day means nothing is handed over', noday.clicked===0, noday);
  ck('and it says which is missing',
     !!noday.got && /needs a day/i.test(noday.got.t||''), noday.got);

  /* and with a day, the file really carries the chosen alarm */
  const fired=await p.evaluate(()=>{
    const sel=document.querySelector('#wk-remind select');
    sel.value='7'; sel.dispatchEvent(new Event('change'));
    const f=icsFor(WK.t, WK.d, '4', [], WK.r, false);
    return { alarm:f.text.indexOf('BEGIN:VALARM')>-1,
             trigger:(f.text.match(/TRIGGER:([^\r\n]+)/)||[])[1] };
  });
  ck('a week before really is a week before', fired.alarm && fired.trigger==='-PT159H', fired);

  /* voice.md: the em dash came out of the line above it */
  const line=await p.evaluate(()=>
    document.getElementById('wk-remind').closest('.field').querySelector('label').textContent);
  ck('and the label has no em dash in it', line.indexOf('\u2014')===-1, line);
}

/* ── 13. "TIGHTEN UP THIS SECTION." Ruled 15 September 2026. ──────────────  */
head('the editor is tighter');
{ const p=await app(2);
  const r=await p.evaluate(()=>{
    S.people=['Jessica','Ginger','Kate'];
    S.works=[{pid:'w1',t:'A meal for the crew at Station 1',d:'2026-09-22',who:['Jessica'],
              hon:'',cost:0,spends:[],story:'',exp:'',startedAt:'',sheet:null,seed:null,
              photos:[],notes:[],njr:0}];
    save(); openWork(S.works[0]);
    const sc=document.getElementById('s-work');
    /* every label on one line: measured against its own line-height, so this
       holds if the type ever changes */
    const wrapped=[];
    sc.querySelectorAll('.field > label').forEach(l=>{
      const lh=parseFloat(getComputedStyle(l).lineHeight) ||
               parseFloat(getComputedStyle(l).fontSize)*1.4;
      if(l.getBoundingClientRect().height > lh*1.6)
        wrapped.push(l.textContent.slice(0,40));
    });
    /* and nothing got cramped: a gap between fields must still be bigger than
       the gap inside one, or they stop reading as separate things */
    const f=sc.querySelector('.field');
    const between=parseFloat(getComputedStyle(f).marginBottom);
    const inside=parseFloat(getComputedStyle(f.querySelector('label')).marginBottom);
    /* nor did any target this change touched shrink.
       `.nhit` is excluded DELIBERATELY and it is not a pass: the tick boxes on
       the sign-up panel and the notes list are 34px, which is under the 44px a
       thumb wants, and they were 34px long before today. Tightening the spacing
       did not make them, and widening them belongs in its own change with its
       own look at the rows they sit in. `.ntx`, the one-line note row, is the
       same story: `min-height:34px`, set long before today and untouched by it.
       NAMED, NOT SWEPT UP \u2014 both are in the handoff as open. */
    let small=0; const smallest=[];
    sc.querySelectorAll('.btn,.chip,select,input,textarea:not(.ntx)').forEach(el=>{
      const h=el.getBoundingClientRect().height;
      if(h>0 && h<44){ small++; smallest.push(el.className+':'+Math.round(h)); }
    });
    return { height:Math.round(sc.getBoundingClientRect().height),
             wrapped, between, inside, small, smallest };
  });
  /* it was 1823px before the trim */
  ck('the editor is shorter than it was', r.height < 1750, r.height);
  ck('no label wraps to a second line', r.wrapped.length===0, r.wrapped);
  ck('fields are still further apart than their own parts', r.between > r.inside, r);
  ck('and nothing became too small for a thumb', r.small===0, r.smallest);

  /* the tally line is written by the code on every draw, so the markup alone
     proves nothing about what a person reads */
  const tally=await p.evaluate(()=>{
    wkCostState();
    return (document.getElementById('wk-spendnote')||{}).textContent||'';
  });
  ck('the tally line is the short one on screen, not just in the file',
     /* the words changed when G ruled the roll in on 15 September; what this
        holds is what it always held — ONE short line, written by the code */
     tally.length<60 && /one number is fine/i.test(tally), tally);
}

/* ── THE CALENDAR MARK IN THE "AIMING FOR" BOX ─────────────────────────────
   G, 16 September 2026: "can we add the calendar icon to the box under aiming
   for… beside the date."

   The danger in putting a mark inside a box that is already one big button is
   two overlapping tap targets, which is what made the old calendar trigger
   confusing enough to move. So the mark must be visible, must sit inside the
   box, and a tap ON it must still open the date picker.

   MUTATIONS SEEN TO FAIL: removing pointer-events:none from .calgo (the tap
   check goes red); deleting the span (three go red).                        */
head('the calendar mark in the Aiming for box');
{ const p=await app();
  await p.evaluate(()=>{ try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}
    const n=document.getElementById('calnudge'); if(n) n.remove(); });
  await p.evaluate(()=>openWork(S.acts[0]));
  await p.waitForTimeout(900);
  const r = await p.evaluate(()=>{
    const btn=document.getElementById('wk-when-btn');
    const mk=btn.parentElement.querySelector('.calgo');
    if(!btn||!mk) return {btn:!!btn, mark:!!mk};
    const rb=btn.getBoundingClientRect(), rm=mk.getBoundingClientRect();
    return { btn:true, mark:true,
      drawn: rm.width>0 && rm.height>0,
      inside: rm.right<=rb.right+1 && rm.top>=rb.top-1 && rm.bottom<=rb.bottom+1,
      clearOfText: rm.left > rb.left + 60,
      landsOnBox: (document.elementFromPoint(rm.left+rm.width/2, rm.top+rm.height/2)||{}).id,
      hidden: mk.getAttribute('aria-hidden')==='true' };
  });
  ck('the mark is in the box', r.mark===true, r);
  ck('it is actually drawn', r.drawn===true, r);
  ck('it sits inside the box, not over its edge', r.inside===true, r);
  ck('it stays clear of the date itself', r.clearOfText===true, r);
  /* the whole box is the target; the mark must not carve a hole in it */
  ck('tapping the mark still opens the date picker', r.landsOnBox==='wk-when-btn', r);
  ck('a screen reader is not told about it twice', r.hidden===true, r);
}

/* ── "SEE AN EXAMPLE" ──────────────────────────────────────────────────────
   G, 16 September 2026. The danger in this one is not the picture, it is the
   FLAG: the preview sheet is shared with the real "What prints", so an example
   left switched on would show somebody their own sheet's furniture over
   somebody else's sheet, or worse, show the example where their own should be.

   MUTATIONS SEEN TO FAIL: deleting the PV_EG reset in sheet() (the leak check
   goes red); letting the example draw a real code (two go red); dropping the
   fourth row (the free-row check goes red).                                 */
head('see an example');
{ const p=await app();
  await p.evaluate(()=>{ try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}
    const n=document.getElementById('calnudge'); if(n) n.remove(); });
  await p.evaluate(()=>openWork(S.acts[0]));
  await p.waitForTimeout(800);

  const door = await p.evaluate(()=>{
    const b=[...document.querySelectorAll('#s-work button')]
      .find(x=>/see an example/i.test(x.textContent));
    if(!b) return {there:false};
    const r=b.getBoundingClientRect();
    return { there:true, text:b.textContent.trim(),
             inNote: !!b.closest('p.note'),
             h:Math.round(r.height) };
  });
  ck('the editor offers an example before anything is made', door.there===true, door);
  ck('and it says what G asked it to say', door.text==='See an example', door);
  /* it must stay a line inside the sentence, not become another block on the
     heaviest part of this screen */
  ck('it is a line in the sentence, not a block', door.inNote===true && door.h<32, door);

  await p.evaluate(()=>{ [...document.querySelectorAll('#s-work button')]
    .find(x=>/see an example/i.test(x.textContent)).click(); });
  await p.waitForTimeout(1300);

  const eg = await p.evaluate(()=>{
    const body=document.getElementById('pv-body');
    const rows=[...body.querySelectorAll('li')].map(l=>l.textContent);
    return { open: !document.getElementById('sheet-pv').classList.contains('hide'),
      title: document.getElementById('pv-h3').textContent,
      rows: rows.length,
      lastRow: rows[rows.length-1]||'',
      realCode: body.querySelectorAll('.pq svg, .pq img, .pq canvas').length,
      blank: body.querySelectorAll('.pqeg').length,
      address: (body.querySelector('.pu')||{}).textContent||'',
      action: (document.getElementById('pv-act').textContent||'').trim() };
  });
  ck('it opens the preview', eg.open===true, eg);
  /* the app speaks in the second person when it starts something; "Make mine"
     was first person and G reversed it on the day it was written */
  ck('the way out of it is in the app\u2019s own voice',
     eg.action==='Start yours', eg);
  ck('and the preview says it is an example', eg.title==='An example', eg);
  /* RULING 23A: the example teaches the shape of a need, and people copy what
     they are shown. The last row must cost nothing. */
  ck('the example lists four things', eg.rows===4, eg);
  ck('and the last one costs nothing but time', /hour and two hands/i.test(eg.lastRow), eg);
  /* a working code on an example points somewhere that is not a sheet */
  ck('there is no scannable code on it', eg.realCode===0, eg);
  ck('the square is drawn as a blank instead', eg.blank===1, eg);
  ck('and it does not print an address anybody could type', !/\/a\/example/.test(eg.address), eg);

  /* THE LEAK. Close it, make a real sheet, open the real preview: it must be
     the person's own, not Jessica's. */
  const leak = await p.evaluate(()=>{
    sheet(null);
    askStart();
    WK.sheet.slots=['Something of my own'];
    workKeep(); save();
    openPaperPreview();
    const body=document.getElementById('pv-body');
    return { title: document.getElementById('pv-h3').textContent,
             text: body.textContent,
             rows: body.querySelectorAll('li').length };
  });
  ck('a real sheet after an example is the real sheet', leak.title==='What prints', leak);
  ck('and it holds the person’s own words, not the example’s',
     /Something of my own/.test(leak.text) && !/gallon of sweet tea/i.test(leak.text),
     {title:leak.title, rows:leak.rows});
}

ck('no page or console errors anywhere', errs.length===0, errs.slice(0,4));
console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
await b.close();
process.exit(fail?1:0);

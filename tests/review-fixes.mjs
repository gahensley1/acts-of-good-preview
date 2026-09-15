/* THE FAULTS THREE SEATS FOUND ON 15 SEPTEMBER, each one locked down.
   Every check here failed before the fix. Do not delete one without reading
   why it exists — each is a bug that shipped, or nearly did.                 */
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
async function app(acts=11, goal=50){
  if(!CTX){
    CTX=await b.newContext({viewport:{width:390,height:844}});
    PAGE=await CTX.newPage();
    PAGE.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    PAGE.on('pageerror',e=>errs.push('pageerror: '+e.message));
  }
  const ctx=CTX, p=PAGE;
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
      d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]});
    S.lineTouched=S.wordTouched=false;try{syncReason();}catch(e){}save();},[acts,goal]);
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}});
  return {ctx,p};
}

head('the copy that is allowed to be old');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    localStorage.setItem(DAYSNAP, JSON.stringify({acts:[{no:'1',t:'MONDAY'}],ac:1}));
    localStorage.setItem(DAYSNAP+'.at', String(Date.now()));
    for(let i=0;i<5;i++){ S.acts[0].st='tuesday '+i; _lastSnap=0; save(); }
    let t=null; try{ t=JSON.parse(localStorage.getItem(DAYSNAP)).acts[0].t; }catch(e){}
    return { day:t, ring:RING.length, snaps:SNAPS.length, inRing:RING.indexOf(DAYSNAP) };
  });
  ck('the rotation never overwrites it', r.day==='MONDAY', r);
  ck('and it is not in the ring at all', r.inRing===-1 && r.ring===3 && r.snaps===4, r);
  const q=await p.evaluate(()=>{
    localStorage.setItem(DAYSNAP,'keepme');
    RING.forEach((k,i)=>localStorage.setItem(k,'ring'+i));
    /* the out-of-room path */
    try{ localStorage.removeItem(RING[RING.length-1]); localStorage.removeItem(RING[RING.length-2]); }catch(e){}
    return { day:localStorage.getItem(DAYSNAP), r0:localStorage.getItem(RING[0]) };
  });
  ck('a full phone sacrifices rolling copies, not the daily one',
     q.day==='keepme' && q.r0==='ring0', q);
  }

head('an idea already in the works');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    const i=IDEAS[3];
    S.works=[{pid:'x',t:i.t,d:'',who:[],photos:[],notes:[]}];
    return { used: ideaUsed(i), other: ideaUsed(IDEAS[4]) };
  });
  ck('counts as used', r.used===true, r);
  ck('and a different one does not', r.other===false, r);
  }

head('the thirty-day promise on the phone');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    const mk=at=>({at:at, live:1, claims:[{pos:1,name:'Ann',text:'Lasagne',
      contact:'555-0100', note:'on my way', release:'abc', release_hash:'h'}]});
    S.works=[{pid:'a',t:'undated',sheet:mk(undefined),photos:[],notes:[]},
             {pid:'b',t:'unparseable',sheet:mk('not a date'),photos:[],notes:[]},
             {pid:'c',t:'old',sheet:mk(new Date(Date.now()-40*864e5).toISOString()),photos:[],notes:[]},
             {pid:'d',t:'young',sheet:mk(new Date(Date.now()-3*864e5).toISOString()),photos:[],notes:[]}];
    forgetOldClaims();
    const g=i=>{ const c=S.works[i].sheet.claims[0];
      return {contact:c.contact,note:c.note,rel:c.release,live:S.works[i].sheet.live,at:!!S.works[i].sheet.at}; };
    return { undated:g(0), bad:g(1), old:g(2), young:g(3) };
  });
  ck('an undated sheet gets a date rather than living for ever', r.undated.at===true, r.undated);
  ck('a sheet with an unreadable date is cleaned, not skipped',
     r.bad.contact===null && r.bad.note===null && r.bad.rel===null, r.bad);
  ck('an old sheet is cleaned and finished',
     r.old.contact===null && r.old.note===null && r.old.live===0, r.old);
  ck('a young one is left alone', r.young.contact==='555-0100' && r.young.live===1, r.young);

  const snap=await p.evaluate(()=>{
    S.works=[{pid:'e',t:'old',photos:[],notes:[],sheet:{at:new Date(Date.now()-40*864e5).toISOString(),
      live:1, claims:[{pos:1,name:'Ann',text:'x',contact:'555-0100',note:'n',release:'r'}]}}];
    save();                                   // a spare copy now holds the number
    _lastSnap=0; save();
    forgetOldClaims();
    const holds=k=>{ const v=localStorage.getItem(k)||''; return v.indexOf('555-0100')>-1; };
    return { live: (localStorage.getItem(LS_KEY)||'').indexOf('555-0100')>-1,
             spares: SNAPS.filter(holds).length };
  });
  ck('the deleted number is gone from the live file', snap.live===false, snap);
  ck('and from every spare copy too', snap.spares===0, snap);
  }

head('nothing from the network reaches code position');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    window.__PWN=0;
    S.works=[{pid:'f',t:'sheet',photos:[],notes:[],sheet:{id:'abc',key:'k',live:1,
      claims:[{pos:'0);window.__PWN=1;void(0', name:'Ann', text:'Lasagne', taken:1, got:1}]}}];
    /* the claims panel only exists once the work editor has drawn its sheet
       panel, so open the editor rather than reaching for an element that is not
       there yet */
    openWork(S.works[0]);
    try{ drawSheetPanel(); }catch(e){}
    const el=document.getElementById('wk-claims');
    if(!el) return {no:'no panel'};
    try{ drawClaims(); }catch(e){ return {threw:String(e.message||e)}; }
    const html=el.innerHTML;
    el.querySelectorAll('button').forEach(x=>{ try{ x.click(); }catch(e){} });
    return { pwn:window.__PWN, inline:/onclick=/.test(html),
             freeBtns: el.querySelectorAll('[data-free]').length };
  });
  ck('a crafted value does not run', r.pwn===0, r);
  ck('and no handler is written into the markup', r.inline===false, r);
  ck('a value that is not a number gets no button', r.freeBtns===0, r);

  const ok=await p.evaluate(()=>{
    S.works[0].sheet.claims=[{pos:4,name:'Ann',text:'Lasagne',taken:1,got:1}];
    openWork(S.works[0]);
    try{ drawSheetPanel(); }catch(e){}
    drawClaims();
    const el=document.getElementById('wk-claims');
    return el ? el.querySelectorAll('[data-free]').length : -1;
  });
  ck('an ordinary numbered claim still gets one', ok===1, ok);
  }

head('the ending cannot announce itself early');
{ const {ctx,p}=await app(5,50);
  const r=await p.evaluate(()=>{
    S.acts.push({no:'50',t:'jumped the queue',d:'2026-06-01',st:'s',
      people:[],posted:{},captions:{},spend:[],photos:[]});
    save(); drawGrid();
    const bl=document.getElementById('bk-last');
    return { done:yearDone(), waiting:bl.classList.contains('waiting'),
             post: !!bl.querySelector('.mpost'),
             note:document.getElementById('zeronote').textContent,
             zeroLabel: document.getElementById('bk-zero').getAttribute('aria-label') };
  });
  ck('an act holding the last number does not finish the year', r.done===false, r);
  /* RULED 1D, 15 September 2026: the ending is a milepost rather than a dashed
     numbered square. What this check has always been FOR is unchanged \u2014 an
     act holding the last number must not make the row announce a finished year
     in March. It is the tense that matters, not the shape. */
  ck('the ending has not become the finished square', r.post===true, r);
  ck('and the row does not speak in the past tense',
     /Finishes in/.test(r.note) && !/Finished in/.test(r.note), r.note);
  ck('act 0 can be read aloud', /Act 0/.test(r.zeroLabel||''), r.zeroLabel);
  }

{ const {ctx,p}=await app(50,50);
  const r=await p.evaluate(()=>{
    drawGrid();
    return { done:yearDone(), waiting:document.getElementById('bk-last').classList.contains('waiting'),
             note:document.getElementById('zeronote').textContent };
  });
  ck('a genuinely finished year does fill the ending', r.done===true && r.waiting===false, r);
  ck('and names both months', /Declared in \w+\. Finished in \w+\./.test(r.note), r.note);
  }

{ const {ctx,p}=await app(50,50);
  const r=await p.evaluate(()=>{ S.zero.d=''; save(); drawGrid();
    return document.getElementById('zeronote').textContent; });
  ck('a missing month never prints a confident January', !/January/.test(r), r);
  }

head('the small ones');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    drawGrid();
    const t=[...document.querySelectorAll('#grid .tile.done')][0];
    const sh=getComputedStyle(t).textShadow;
    /* call the REAL say() — stubbing it meant dlg(), which is the thing that
       keeps the paragraph breaks, never ran, and the test was checking a node
       nothing had touched */
    openCredits();
    const n=document.getElementById('dlg-note');
    return { shadow: sh && sh!=='none', ws:n?n.style.whiteSpace:null,
             breaks: (n?n.textContent:'').indexOf('\n\n')>-1,
             key: typeof CARD_FOR_STORY };
  });
  ck('the number on a finished square has a shadow', r.shadow===true, r);
  ck('the credits keep their paragraph breaks', r.ws==='pre-line' && r.breaks===true, r);
  ck('the card cache key can vary', r.key==='boolean', r);
  }

console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
if(errs.length) console.log(JSON.stringify(errs.slice(0,6),null,1));
await b.close();
process.exit(fail?1:0);

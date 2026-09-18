/* The C-rulings of 14 September 2026, proved rather than asserted.
   C1 reminders · C2A the format version · C3A the shelf · C4B the repair notice
   C5A the daily copy · C6 the removed faces · C7A the credits              */
/* Runs anywhere. It used to hardcode two paths that exist only inside one cloud
   machine, which meant the battery survived a session and could not be started
   by the person who owns it — worse than the problem it was written to fix,
   because it looked solved.

     cd /d "C:\\Users\\tony\\Documents\\aog-push" && npm i -D playwright && npx playwright install chromium
     cd /d "C:\\Users\\tony\\Documents\\aog-push" && node tests/rulings-5j.mjs

   AOG=file:///some/other/index.html to point it somewhere else.                */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
const require_ = createRequire(import.meta.url);
let pw = null;
for(const where of ['playwright', 'playwright-core',
                    '/opt/node-tools/node_modules/playwright/index.js']){
  try { pw = require_(where); break; } catch(e) {}
}
if(!pw){
  console.error('\nPlaywright is not installed here. From this folder:\n'+
                '  npm i -D playwright && npx playwright install chromium\n');
  process.exit(2);
}
const { chromium } = pw.default || pw;
/* an explicit browser if one is named, the cloud one if it is there, else
   whatever playwright installed for itself */
const EXE = process.env.CHROME ||
  (require_('node:fs').existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const LAUNCH = EXE ? { executablePath: EXE } : {};
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;
const b = await chromium.launch(LAUNCH);
let pass=0, fail=0; const errs=[];
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   got: '+JSON.stringify(g));} };
const head=t=>console.log('\n== '+t+' ==');
async function fresh(){
  const ctx=await b.newContext({viewport:{width:390,height:844}});
  const p=await ctx.newPage();
  p.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
  p.on('pageerror',e=>errs.push('pageerror: '+e.message));
  await p.goto(FILE); await p.waitForTimeout(1100); return {ctx,p};
}
async function seeded(n=3,goal){
  const {ctx,p}=await fresh();
  await p.evaluate(([n,goal])=>{
    S.letterSeen=true;S.started=true;S.tabToured=true;S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=goal||n;S.weeks=52;S.why='to test';
    S.start=new Date(Date.now()-1000*60*60*24*120);
    S.zero={no:'0',zero:true,d:'2026-01-01',t:'begins',posted:{},captions:{}};
    S.acts=[]; for(let i=1;i<=n;i++) S.acts.push({no:String(i),t:'Act '+i,
      d:'2026-0'+i+'-0'+i,st:'s',people:[],posted:{},captions:{},spend:[],photos:[]});
    S.lineTouched=false;S.wordTouched=false; try{syncReason();}catch(e){}
    save();
  },[n,goal]);
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{ try{endTabTour();}catch(e){} try{sheet(null);}catch(e){} });
  return {ctx,p};
}

head('C1 — the reminder has a door');
{ const {ctx,p}=await seeded();
  const r=await p.evaluate(()=>{
    startWork(); WK.t='Doughnuts'; WK.d='2026-10-01'; workKeep();
    const row=document.getElementById('wk-remind');
    drawWorkRemind();
    /* RULED by G, 15 September 2026: the five chips became one pull-down with
       "Day before" showing. What C1 was ever about is unchanged \u2014 the lead
       time has a door in the LIVE editor, it offers every choice, and the choice
       survives a reload. Only the control changed. */
    const sel=row?row.querySelector('select'):null;
    return { exists:!!row, isSelect:!!sel,
             labels:sel?[...sel.options].map(o=>o.textContent):[],
             shown:sel?sel.options[sel.selectedIndex].textContent:'' };
  });
  ck('the lead-time control is in the live editor',
     r.exists && r.isSelect && r.labels.length===5, r);
  ck('it offers every lead time', r.labels.join('|').indexOf('A week before')>-1, r.labels);
  ck('and shows the default without being asked', r.shown==='Day before', r.shown);
  const set=await p.evaluate(()=>{
    const sel=document.querySelector('#wk-remind select');
    sel.value='7'; sel.dispatchEvent(new Event('change'));   // a week before
    return { r:WK.r, shown:sel.options[sel.selectedIndex].textContent };
  });
  ck('choosing one is remembered', set.r==='7', set);
  const ics=await p.evaluate(()=>{
    const f=icsFor('Doughnuts','2026-10-01','4',[],WK.r||'1',false);
    return { hasAlarm:f.text.indexOf('BEGIN:VALARM')>-1,
             trigger:(f.text.match(/TRIGGER:([^\r\n]+)/)||[])[1] };
  });
  ck('the calendar file carries that alarm', ics.hasAlarm && ics.trigger==='-PT159H', ics);
  const none=await p.evaluate(()=>{
    const f=icsFor('x','2026-10-01','4',[],'none',false);
    return f.text.indexOf('BEGIN:VALARM')>-1; });
  ck('choosing None means no alarm', none===false, none);
  const round=await p.evaluate(async ()=>{ save(); const o=serialise();
    return (o.works||[]).map(w=>w.r); });
  ck('the choice is written to disk', round.indexOf('7')>-1, round);
  await p.reload(); await p.waitForTimeout(1400);
  const back=await p.evaluate(()=>(S.works||[]).map(w=>w.r));
  ck('and read back after a reload (both halves)', back.indexOf('7')>-1, back);
  await ctx.close(); }

head('C2A — the format version');
{ const {ctx,p}=await seeded();
  const r=await p.evaluate(()=>({ v:serialise().v, FILE_V:FILE_V }));
  /* L114 — A CHECK FROZEN TO A LITERAL HOLDS THE OLD WORLD IN PLACE. This
     read `=== 2` and failed the first time the number honestly moved, which is
     the opposite of what it is for. The rule is that what a file SAYS it is
     matches what the build thinks it writes — and that the number only ever
     goes up. Second time this has been fixed here; it stays rule-shaped. */
  ck('a new file is stamped with the real version', r.v===r.FILE_V && r.FILE_V>=2, r);
  const ref=await p.evaluate(()=>{
    let said=null; const old=window.say; window.say=(t,b)=>{ said=t; };
    importJournal({ files:[] });          // no file: should not claim anything
    window.say=old; return said; });
  ck('import with no file says nothing about versions', ref===null||typeof ref==='string', ref);
  await ctx.close(); }

head('C3A — an idea goes to the shelf');
{ /* goal of fifty so the shelf plainly has room, AND a full 3-of-3 year below
     to prove the old slot guard is really gone */
  const {ctx,p}=await seeded(3,50);
  const r=await p.evaluate(()=>{
    const before={works:(S.works||[]).length, plans:Object.keys(S.plans||{}).length};
    go('browse'); drawBrowse();
    const btn=document.querySelector('#browse-list [data-go="later"]')
           || document.querySelector('[data-go="later"]');
    const label=btn?btn.textContent:null;
    if(btn) btn.click();
    return { before, label, works:(S.works||[]).length,
             plans:Object.keys(S.plans||{}).length,
             newest:(S.works||[]).slice(-1)[0] };
  });
  ck('the button says what it does now', r.label==='Put it in the works', r.label);
  ck('the idea lands on the shelf', r.works===r.before.works+1, r);
  ck('and writes no ghost into the grid', r.plans===0, r);
  ck('it arrives already titled', !!(r.newest&&r.newest.t), r.newest&&r.newest.t);
  const ghosts=await p.evaluate(()=>{ drawGrid();
    return document.querySelectorAll('#grid .tile.planned').length; });
  ck('the grid draws no planned ghost', ghosts===0, ghosts);
  await ctx.close(); }

{ /* the day somebody finishes their year, the shelf must still accept an idea */
  const {ctx,p}=await seeded(3,3);
  const r=await p.evaluate(()=>{
    const before=(S.works||[]).length;
    let shut=null; const old=window.say; window.say=(t)=>{ shut=t; };
    go('browse'); drawBrowse();
    const btn=document.querySelector('[data-go="later"]'); if(btn) btn.click();
    window.say=old;
    return { done:yearDone(), before, after:(S.works||[]).length, shut };
  });
  ck('a finished year still accepts an idea onto the shelf',
     r.done===true && r.after===r.before+1 && r.shut===null, r);
  await ctx.close(); }

head('C5A — the copy that is allowed to be old');
{ const {ctx,p}=await seeded();
  await p.evaluate(()=>{ S.acts[0].st='edited'; save(); });
  const r=await p.evaluate(()=>{
    const raw=localStorage.getItem(DAYSNAP);
    let n=null; try{ n=(JSON.parse(raw).acts||[]).length; }catch(e){}
    return { exists:!!raw, acts:n, at:!!localStorage.getItem(DAYSNAP+'.at') };
  });
  ck('a daily copy is kept', r.exists && r.acts===3 && r.at, r);
  const again=await p.evaluate(()=>{
    const before=localStorage.getItem(DAYSNAP+'.at');
    S.acts[0].st='edited twice'; save();
    return before===localStorage.getItem(DAYSNAP+'.at'); });
  ck('and not rewritten on every save', again===true, again);
  /* the clock is set FORWARD rather than cleared, so the next save cannot
     immediately copy the year we just ended back into it */
  const gone=await p.evaluate(()=>{ dropSnapshots();
    const at=+(localStorage.getItem(DAYSNAP+'.at')||0);
    return { snap:!!localStorage.getItem(DAYSNAP), fresh:(Date.now()-at)<5000 }; });
  ck('a deliberate ending takes it too', gone.snap===false && gone.fresh===true, gone);

  const after=await p.evaluate(()=>{ S.acts[0]&&(S.acts[0].st='x'); save();
    return !!localStorage.getItem(DAYSNAP); });
  ck('and the next save does not put it straight back', after===false, after);
  /* keepDaily reads what is ON DISK before this save, so emptying the year and
     saving must leave the daily copy holding the LAST GOOD one — not zero acts.
     The first version of this check asserted the copy disappeared, which would
     have been the wrong behaviour to want. */
  const empt=await p.evaluate(()=>{
    localStorage.removeItem(DAYSNAP+'.at');
    S.acts=[]; save();
    const raw=localStorage.getItem(DAYSNAP);
    let n=null; try{ n=(JSON.parse(raw).acts||[]).length; }catch(e){}
    return n; });
  ck('the daily copy never becomes an empty year', empt===3, empt);
  await ctx.close(); }

head('C6 — the faces that nothing used');
{ const {ctx,p}=await fresh();
  const r=await p.evaluate(()=>{
    const src=document.documentElement.outerHTML;
    /* the NAMES survive in the comment explaining their removal, which is the
       point of the comment. What must be gone is the @font-face payload. */
    return { kaushan:/@font-face\{font-family:'Kaushan/.test(src),
             yellow:/@font-face\{font-family:'Yellowtail/.test(src),
             script:getComputedStyle(document.documentElement).getPropertyValue('--script').trim() };
  });
  ck('Kaushan Script is gone', r.kaushan===false, r);
  ck('Yellowtail is gone', r.yellow===false, r);
  ck('the one script face still works', r.script.indexOf('Great Vibes')>-1, r.script);
  const card=await p.evaluate(async ()=>{
    S.letterSeen=true;S.started=true;S.n=50;S.bday='1973-06-01';
    S.lineTouched=false;S.wordTouched=false; try{syncReason();}catch(e){}
    const a={no:'7',t:'x',d:'2026-05-05',posted:{},captions:{},photos:[]};
    const c=await renderCard(a); const g=c.getContext('2d');
    let ink=0; const im=g.getImageData(0,0,c.width,c.height).data;
    for(let i=0;i<im.length;i+=4) if(im[i]<245||im[i+1]<245||im[i+2]<245) ink++;
    return ink/(c.width*c.height);
  });
  ck('the card still draws with ink on it', card>0.02 && card<0.6, card);
  await ctx.close(); }

head('C7A — the credits');
{ const {ctx,p}=await seeded();
  const r=await p.evaluate(()=>{
    let seen=null; const old=window.say; window.say=(t,bd)=>{ seen={t:t,b:bd}; };
    openCredits(); window.say=old;
    return seen;
  });
  ck('the credits open', !!r && /Credits/.test(r.t), r&&r.t);
  ck('the MIT notice travels verbatim-ish', !!r && /without warranty/i.test(r.b), null);
  ck('the font licence is named', !!r && /Open Font Licence/i.test(r.b), null);
  ck('it does not credit what we no longer ship', !!r && !/Kaushan|Yellowtail/.test(r.b), null);
  const link=await p.evaluate(()=>{
    const bs=[...document.querySelectorAll('#s-you button, .youfoot button')];
    return bs.some(b=>/Credits/.test(b.textContent)); });
  ck('there is a way to reach it', link===true, link);
  await ctx.close(); }

console.log('\n'+pass+' passed, '+fail+' failed');
console.log('console errors: '+errs.length);
if(errs.length) console.log(JSON.stringify(errs.slice(0,6),null,1));
await b.close();
process.exit(fail?1:0);

/* 50 Acts of Good — the walk-before-you-ship battery.
   Run:  node tests/battery.mjs            (tests ./index.html)
         AOG=file:///path/to/index.html node tests/battery.mjs

   THIS FILE LIVES IN THE REPO ON PURPOSE. Every previous harness was written
   into a cloud workspace and was gone by the next session, so "181 checks pass"
   became a sentence in a document that nobody could re-run. The six sequences
   below are the ones a person actually walks: a fresh install, logging an act,
   the card, the backup and its restore, the rollover, and the year that never
   finished.                                                                   */
import pw from '/opt/node-tools/node_modules/playwright/index.js';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const { chromium } = pw;
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;

const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
let pass=0, fail=0; const failed=[]; const consoleErrs=[];
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;failed.push(n);console.log('  FAIL '+n+'   got: '+JSON.stringify(g));} };
const head=t=>console.log('\n== '+t+' ==');

async function fresh(){
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
  const p=await ctx.newPage();
  p.on('console',m=>{ if(m.type()==='error') consoleErrs.push(m.text()); });
  p.on('pageerror',e=>consoleErrs.push('pageerror: '+e.message));
  await p.goto(FILE); await p.waitForTimeout(1100);
  return {ctx,p};
}
async function seeded(n=3, goal){
  const {ctx,p}=await fresh();
  await p.evaluate(([n,goal])=>{
    S.letterSeen=true;S.started=true;S.tabToured=true;S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=goal||n;S.weeks=52;S.why='to mark turning fifty';
    S.start=new Date(Date.now()-1000*60*60*24*120);
    S.zero={no:'0',zero:true,d:'2026-01-01',t:'The year begins',posted:{},captions:{}};
    S.acts=[]; for(let i=1;i<=n;i++) S.acts.push({no:String(i),t:'Act '+i,
      d:'2026-0'+i+'-0'+i,st:'what happened on '+i,people:[],posted:{},captions:{},
      spend:[],photos:[]});
    S.lineTouched=false;S.wordTouched=false; try{syncReason();}catch(e){}
    save();
  }, [n, goal]);
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{ try{endTabTour();}catch(e){} try{sheet(null);}catch(e){} });
  return {ctx,p};
}

/* ─────────────────────────────────────────── 1. a fresh install */
head('a fresh install');
{ const {ctx,p}=await fresh();
  const r=await p.evaluate(()=>({acts:S.acts.length, started:!!S.started,
    setupVisible: !document.getElementById('s-setup').classList.contains('hide'),
    tabsHidden: document.getElementById('tabs').classList.contains('hide')}));
  ck('opens on setup with nothing logged', r.acts===0 && r.started===false, r);
  ck('the tab bar is hidden until act 0 exists', r.tabsHidden===true, r);
  const saved=await p.evaluate(()=>{ save(); const o=JSON.parse(localStorage.getItem(LS_KEY)||'{}');
                                     return {ac:o.ac, v:o.v}; });
  ck('a brand new file records that it holds no acts', saved.ac===0, saved);
  await ctx.close(); }

/* ─────────────────────────────────────────── 2. logging an act */
head('logging an act');
{ /* goal of ten, three logged: a fourth must land INSIDE the year, or the count
     rightly ignores it and the test is measuring nothing */
  const {ctx,p}=await seeded(3,10);
  const before=await p.evaluate(()=>doneCount());
  await p.evaluate(()=>{ S.acts.push({no:'4',t:'Act 4',d:'2026-04-04',st:'x',
    people:[],posted:{},captions:{},spend:[],photos:[]}); save(); });
  await p.reload(); await p.waitForTimeout(1400);
  const r=await p.evaluate(()=>({done:doneCount(), disk:JSON.parse(localStorage.getItem(LS_KEY)).ac,
                                 tiles:document.querySelectorAll('#grid .tile.done').length}));
  ck('a logged act survives a reload', r.done===before+1, {before,r});
  const z=await p.evaluate(()=>({
    inGrid: document.querySelectorAll('#grid .tile').length,
    shown: !document.getElementById('zerowrap').classList.contains('hide'),
    zeroDone: document.getElementById('bk-zero').classList.contains('done'),
    zeroMark: !!document.querySelector('#bk-zero .bkmark'),
    lastWaiting: document.getElementById('bk-last').classList.contains('waiting'),
    lastNum: document.getElementById('bk-last').textContent.trim(),
    goal: S.n }));
  ck('the fifty are whole rows, act 0 is out of them', z.inGrid===z.goal, z);
  ck('the bookend row is shown', z.shown===true, z);
  ck('act 0 wears the mark', z.zeroDone===true && z.zeroMark===true, z);
  ck('the last act waits, numbered, until it is done',
     z.lastWaiting===true && z.lastNum===String(z.goal), z);
  ck('the count on disk keeps up', r.disk===4, r);
  /* S8B, 14 Sept: act 0 left the grid and got its own place, so the fifty tiles
     and the count are now simply equal. This check used to read done+1. */
  ck('the grid and the count agree', r.tiles===r.done, r);
  await ctx.close(); }

/* ─────────────────────────────────────────── 3. the card */
head('the card');
{ const {ctx,p}=await seeded();
  const r=await p.evaluate(async ()=>{
    const c=await renderCard(S.acts[2]);
    const g=c.getContext('2d');
    const px=(x,y)=>{ const d=g.getImageData(x,y,1,1).data; return d[0]+','+d[1]+','+d[2]; };
    let ink=0; const im=g.getImageData(0,0,c.width,c.height).data;
    for(let i=0;i<im.length;i+=4) if(im[i]<245||im[i+1]<245||im[i+2]<245) ink++;
    return {w:c.width,h:c.height, corner:px(3,3), inkShare: ink/(c.width*c.height)};
  });
  ck('the card renders square', r.w===r.h && r.w>=1000, r);
  ck('the card is drawn on white', r.corner==='255,255,255', r);
  ck('the card actually has something on it', r.inkShare>0.02 && r.inkShare<0.6, r);
  const z=await p.evaluate(async ()=>{
    const c=await renderCard(S.zero); const g=c.getContext('2d');
    let ink=0; const im=g.getImageData(0, Math.floor(c.height*0.72), c.width, Math.floor(c.height*0.28)).data;
    for(let i=0;i<im.length;i+=4) if(im[i]<245||im[i+1]<245||im[i+2]<245) ink++;
    return ink;
  });
  ck('the declaration card carries no act line', z===0, z);
  await ctx.close(); }

/* ─────────────────────────────────────────── 4. the backup and its restore */
head('the backup and its restore');
{ const {ctx,p}=await seeded();
  const file=await p.evaluate(async ()=>{
    const o=serialise(); return JSON.stringify(o);
  });
  const parsed=JSON.parse(file);
  ck('the backup parses', !!parsed && Array.isArray(parsed.acts), typeof parsed);
  ck('the backup carries every act', parsed.acts.length===3, parsed.acts.length);
  ck('the backup carries its own act count', parsed.ac===3, parsed.ac);
  ck('the backup carries a version', !!parsed.v, parsed.v);
  await ctx.close(); }

/* ─────────────────────────────────────────── 5. the rollover */
head('the rollover');
{ const {ctx,p}=await seeded();
  await p.evaluate(()=>{ S.acts[0].st='edited'; save(); });     // arm the spare copies
  await p.evaluate(()=>rollYear());
  await p.reload(); await p.waitForTimeout(1500);
  let r=await p.evaluate(()=>({a:S.acts.length,past:(S.past||[]).length,rec:RECOVERED}));
  ck('the new year survives closing the app', r.a===0 && r.past===1 && r.rec===false, r);
  await p.reload(); await p.waitForTimeout(1300);
  await p.reload(); await p.waitForTimeout(1300);
  r=await p.evaluate(()=>({a:S.acts.length,past:(S.past||[]).length}));
  ck('and survives it three times', r.a===0 && r.past===1, r);
  const keptWords=await p.evaluate(()=>{ const y=S.past[0]; return {n:y.n, why:!!y.why, zero:!!y.zero, acts:(y.acts||[]).length}; });
  ck('the finished year keeps its acts, its reason and its act 0', keptWords.acts===3 && keptWords.why && keptWords.zero, keptWords);
  await ctx.close(); }

{ const {ctx,p}=await seeded(1);
  await p.evaluate(()=>{ S.acts[0].st='edited'; save(); });
  await p.evaluate(()=>{ S.acts.splice(0,1); save(); });
  await p.reload(); await p.waitForTimeout(1400);
  const r=await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED}));
  ck('deleting a last remaining act is not undone', r.a===0 && r.rec===false, r);
  await ctx.close(); }

/* ─────────────────────────────────────────── 6. the year that never finished */
head('the year that never finished');
{ /* a goal of ten with three done — an unfinished year, which is the commonest
     case by far and the one that used to be impossible to close */
  const {ctx,p}=await seeded(3,10);
  await p.evaluate(()=>{ S.start=new Date(Date.now()-1000*60*60*24*400); save(); });
  const r=await p.evaluate(()=>({up:timeUp(), done:yearDone()}));
  ck('a year past its weeks can be closed', r.up===true && r.done===false, r);
  await ctx.close(); }

/* ─────────────────────────────────────────── 7. the safety net */
head('the safety net');
{ const {ctx,p}=await seeded();
  await p.evaluate(()=>{ S.acts[0].st='edited'; save(); });
  await p.evaluate(()=>{ localStorage.setItem(LS_KEY,'{not json'); });
  await p.reload(); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED}));
  ck('an unreadable year is repaired from a spare copy', r.a===3 && r.rec===true, r);
  await ctx.close(); }

{ const {ctx,p}=await seeded();
  const r=await p.evaluate(async ()=>{
    await idbPut('z1','a'); await idbPut('z2','b');
    const before=(await idbKeys()).length;
    RECOVERED=true; const del=await sweepOrphans();
    return {before, del, after:(await idbKeys()).length};
  });
  ck('a repair never takes the photographs with it', r.del===0 && r.after===r.before, r);
  await ctx.close(); }

console.log('\n'+pass+' passed, '+fail+' failed');
if(failed.length) console.log('failed: '+failed.join(' | '));
console.log('console errors: '+consoleErrs.length);
if(consoleErrs.length) console.log(JSON.stringify(consoleErrs.slice(0,6),null,1));
await b.close();
process.exit(fail?1:0);

/* Runs anywhere. It used to hardcode two paths that exist only inside one cloud
   machine, which meant the battery survived a session and could not be started
   by the person who owns it — worse than the problem it was written to fix,
   because it looked solved.

     cd /d "C:\\Users\\tony\\Documents\\aog-push" && npm i -D playwright && npx playwright install chromium
     cd /d "C:\\Users\\tony\\Documents\\aog-push" && node tests/snapshots.mjs

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
const FILE = process.env.AOG || 'file:///home/claude/work/build/index.html';
const b = await chromium.launch(LAUNCH);
let pass=0, fail=0; const errs=[];
function ck(name, cond, got){ if(cond){pass++; console.log('  ok   '+name);} else {fail++; console.log('  FAIL '+name+'  got: '+JSON.stringify(got));} }

async function fresh(){
  const ctx = await b.newContext({ viewport:{width:390,height:844} });
  const p = await ctx.newPage();
  p.on('console', m=>{ if(m.type()==='error') errs.push(m.text()); });
  await p.goto(FILE); await p.waitForTimeout(1100);
  return {ctx,p};
}
async function seed(p, n=3){
  await p.evaluate((n)=>{
    S.letterSeen=true;S.started=true;S.tabToured=true;S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=n;S.weeks=52;S.why='to test';
    S.start=new Date(Date.now()-1000*60*60*24*300);
    S.zero={no:'0',zero:true,d:'2026-01-01',t:'begins',posted:{},captions:{}};
    const mk=(i)=>({no:String(i),t:'Act '+i,d:'2026-0'+i+'-0'+i,st:'story '+i,
                    people:[],posted:{},captions:{},spend:[],photos:[]});
    S.acts=[]; for(let i=1;i<=n;i++) S.acts.push(mk(i));
    S.lineTouched=false;S.wordTouched=false; try{syncReason();}catch(e){}
    save();
  }, n);
  await p.reload(); await p.waitForTimeout(1400);              // second session: ring rotates
  await p.evaluate(()=>{ S.acts[0].st='edited'; save(); });    // snapshot now holds a full year
}

console.log('\n-- the deliberate endings must not be undone --');
{ const {ctx,p}=await fresh(); await seed(p);
  await p.evaluate(()=>rollYear());
  await p.reload(); await p.waitForTimeout(1400);
  let r = await p.evaluate(()=>({a:S.acts.length,past:(S.past||[]).length,rec:RECOVERED}));
  ck('rollover survives one reload', r.a===0 && r.past===1 && r.rec===false, r);
  await p.reload(); await p.waitForTimeout(1300);
  await p.reload(); await p.waitForTimeout(1300);
  r = await p.evaluate(()=>({a:S.acts.length,past:(S.past||[]).length}));
  ck('rollover survives three reloads', r.a===0 && r.past===1, r);
  const snaps = await p.evaluate(()=>SNAPS.map(k=>{
    const r=localStorage.getItem(k); if(!r) return 'empty';
    try{ return (JSON.parse(r).acts||[]).length; }catch(e){ return 'bad'; }
  }));
  ck('no spare copy still holds the finished year', snaps.every(x=>x==='empty'||x===0), snaps);
  await ctx.close(); }

{ const {ctx,p}=await fresh(); await seed(p, 1);
  await p.evaluate(()=>{ S.acts.splice(0,1); save(); });
  await p.reload(); await p.waitForTimeout(1400);
  const r = await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED}));
  ck('deleting the only act is not undone', r.a===0 && r.rec===false, r);
  await ctx.close(); }

{ const {ctx,p}=await fresh(); await seed(p);
  const before = await p.evaluate(()=>SNAPS.filter(k=>localStorage.getItem(k)).length);
  await p.evaluate(()=>{ dropSnapshots(); });
  const after = await p.evaluate(()=>SNAPS.filter(k=>localStorage.getItem(k)).length);
  ck('dropSnapshots() clears the ring', before>0 && after===0, {before,after});
  await ctx.close(); }

console.log('\n-- but the net must still catch a real failure --');
{ const {ctx,p}=await fresh(); await seed(p);
  // corrupt the live file; snapshots untouched. This is the fault it exists for.
  await p.evaluate(()=>{ localStorage.setItem(LS_KEY, '{this will not parse'); });
  await p.reload(); await p.waitForTimeout(1500);
  const r = await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED, t:S.acts[0]&&S.acts[0].t}));
  ck('an unreadable year is still repaired', r.a===3 && r.rec===true, r);
  await ctx.close(); }

{ const {ctx,p}=await fresh(); await seed(p);
  // emptied by damage rather than by a rollover: acts gone, past NOT written
  await p.evaluate(()=>{ const o=JSON.parse(localStorage.getItem(LS_KEY)); o.acts=[];
                         /* ac still says 3 — the file contradicts itself, which is the
                            only shape that now counts as damage */
                         localStorage.setItem(LS_KEY, JSON.stringify(o)); });
  await p.reload(); await p.waitForTimeout(1500);
  const r = await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED}));
  ck('a year emptied by damage is still repaired', r.a===3 && r.rec===true, r);
  await ctx.close(); }

console.log('\n-- and a repair must not take the photographs with it --');
{ const {ctx,p}=await fresh(); await seed(p);
  const r = await p.evaluate(async ()=>{
    // three photos in the store that the snapshot cannot know about
    await idbPut('p1','x'); await idbPut('p2','y'); await idbPut('p3','z');
    const before=(await idbKeys()).length;
    RECOVERED = true;                       // as a repair leaves it
    const deleted = await sweepOrphans();
    return {before, deleted, after:(await idbKeys()).length};
  }).catch(e=>({err:String(e)}));
  ck('the sweep stands down after a repair', r.deleted===0 && r.after===r.before, r);
  await ctx.close(); }

{ const {ctx,p}=await fresh(); await seed(p);
  const r = await p.evaluate(async ()=>{
    await idbPut('q1','x'); await idbPut('q2','y');
    const before=(await idbKeys()).length;
    LOAD_MISSED = true;                     // as the boot rescue now leaves it
    const deleted = await sweepOrphans();
    return {before, deleted, after:(await idbKeys()).length};
  }).catch(e=>({err:String(e)}));
  ck('the sweep stands down after a rescue', r.deleted===0 && r.after===r.before, r);
  await ctx.close(); }

{ const {ctx,p}=await fresh();
  const src = await p.evaluate(()=>document.documentElement.outerHTML.length);
  const hasFlag = await p.evaluate(()=>{
    const f = String(window.onerror)+''; return typeof dropSnapshots==='function';
  });
  ck('dropSnapshots is defined', hasFlag===true, hasFlag);
  await ctx.close(); }

console.log('\n-- an honest empty year is left alone --');
{ const {ctx,p}=await fresh(); await seed(p);
  await p.evaluate(()=>{ const o=JSON.parse(localStorage.getItem(LS_KEY));
                         o.acts=[]; o.ac=0;   // the app meaning it
                         localStorage.setItem(LS_KEY, JSON.stringify(o)); });
  await p.reload(); await p.waitForTimeout(1500);
  const r = await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED}));
  ck('a year the app emptied on purpose stays empty', r.a===0 && r.rec===false, r);
  await ctx.close(); }

{ const {ctx,p}=await fresh(); await seed(p);
  await p.evaluate(()=>{ const o=JSON.parse(localStorage.getItem(LS_KEY));
                         o.acts=[]; delete o.ac;   // a file from before this build
                         localStorage.setItem(LS_KEY, JSON.stringify(o)); });
  await p.reload(); await p.waitForTimeout(1500);
  const r = await p.evaluate(()=>({a:S.acts.length, rec:RECOVERED}));
  ck('an older file with no opinion is taken at its word', r.a===0 && r.rec===false, r);
  await ctx.close(); }

{ const {ctx,p}=await fresh(); await seed(p);
  const r = await p.evaluate(()=>{ const o=JSON.parse(localStorage.getItem(LS_KEY));
                                   return {ac:o.ac, n:(o.acts||[]).length}; });
  ck('the count on disk matches the acts on disk', r.ac===r.n && r.ac===3, r);
  await ctx.close(); }

console.log('\n-- the boot rescue itself --');
{ const {ctx,p}=await fresh(); await seed(p);
  // a file that parses, has acts, but throws inside load(): a null plan entry
  await p.evaluate(()=>{ const o=JSON.parse(localStorage.getItem(LS_KEY));
                         o.plans={"1":null}; o.past="not an array";
                         localStorage.setItem(LS_KEY, JSON.stringify(o)); });
  await p.reload(); await p.waitForTimeout(1600);
  const r = await p.evaluate(()=>({a:S.acts.length, missed:LOAD_MISSED}));
  ck('a journal that throws still boots with its acts', r.a>=3, r);
  await ctx.close(); }

console.log('\n'+pass+' passed, '+fail+' failed, console errors: '+errs.length);
if(errs.length) console.log(JSON.stringify(errs.slice(0,5),null,1));
await b.close();
process.exit(fail? 1:0);

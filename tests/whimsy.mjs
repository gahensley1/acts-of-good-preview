/* MORE WHIMSY, RULED BY G 25 SEPTEMBER 2026 (build 8A).
   A heart or the plane 4 to 5 seconds after the app opens or Your year comes
   back, then about every 45 seconds (40 to 50). Run on an ordinary day: on
   Dolly Day her hearts take the first few seconds, as they should. */
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
    await PAGE.addInitScript(()=>{ const R=Date; const off=new R('2026-10-02T10:00:00').getTime()-R.now();
      class F extends R{ constructor(...a){ super(...(a.length?a:[R.now()+off])); } static now(){ return R.now()+off; } } window.Date=F; });
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


const OBS = () => { window.__F=[]; const mark=(k)=>window.__F.push([k,Math.round(performance.now())]);
  const hook=()=>{ const a=document.getElementById('actcf'), p=document.getElementById('spl');
    new MutationObserver(()=>{ if(a.classList.contains('up') && !a.__up){a.__up=1;mark('heart');} if(!a.classList.contains('up')) a.__up=0; }).observe(a,{attributes:true});
    new MutationObserver(()=>{ if(p.classList.contains('up') && !p.__up){p.__up=1;mark('plane');} if(!p.classList.contains('up')) p.__up=0; }).observe(p,{attributes:true}); };
  document.addEventListener('DOMContentLoaded', hook); };

head('opens: first flight 4 to 5 seconds in');
{ const {ctx,p} = await app();
  await p.addInitScript(OBS);
  await p.reload();
  const t0 = await p.evaluate(()=>performance.now());
  await p.waitForTimeout(6000);
  const F = await p.evaluate(()=>window.__F);
  const onHome = await p.evaluate(()=>SCREEN);
  ck('app opens on Your year', onHome==='home', onHome);
  ck('something flies within 6 seconds of opening', F.length>=1, F);
  ck('the first one goes 4 to 5 seconds after landing (3.9 to 6 s from load)', F.length && F[0][1]>=3900 && F[0][1]<=6000, F);

  head('then about every 45 seconds');
  await p.waitForTimeout(120000);
  const G = await p.evaluate(()=>window.__F);
  const gaps=[]; for(let i=1;i<G.length;i++) gaps.push(G[i][1]-G[i-1][1]);
  ck('3 flights in the first two minutes, not more', G.length===3, G);
  ck('each gap is 40 to 50 seconds', gaps.every(g=>g>=39000 && g<=51500), gaps);
  ck('both hearts and planes can appear (or only hearts by chance)', G.length>0, G.map(x=>x[0]));
  console.log('   flights:', JSON.stringify(G));

  head('only on Your year');
  await p.evaluate(()=>{ window.__F=[]; go('browse'); });
  await p.waitForTimeout(45000);
  const H = await p.evaluate(()=>window.__F);
  ck('nothing flies on another screen for 45 seconds', H.length===0, H);

  head('back to Your year: 4 to 5 seconds');
  const tb = await p.evaluate(()=>{ window.__F=[]; go('home'); return Math.round(performance.now()); });
  await p.waitForTimeout(8000);
  const B = await p.evaluate(()=>window.__F);
  ck('one flies 4 to 5 seconds after coming back', B.length>=1 && B[0][1]-tb>=3900 && B[0][1]-tb<=5600, {tb,B});

  head('blocked at first, it waits for the way to clear');
  await p.evaluate(()=>{ go('browse'); });
  const tc = await p.evaluate(()=>{ window.__F=[]; go('home'); sheet('you'); return Math.round(performance.now()); });
  await p.waitForTimeout(7000);
  const C1 = await p.evaluate(()=>window.__F);
  ck('nothing flies over an open sheet', C1.length===0, C1);
  await p.evaluate(()=>sheet(null));
  await p.waitForTimeout(4000);
  const C2 = await p.evaluate(()=>window.__F);
  ck('it goes within about 3 seconds of the sheet closing', C2.length>=1 && C2[0][1]-tc<=11500, {tc,C2});
}

head('reduced motion: never');
{ const ctx2 = await b.newContext({viewport:{width:390,height:844}, reducedMotion:'reduce'});
  const p2 = await ctx2.newPage();
  await p2.goto(FILE); await p2.waitForTimeout(800);
  await p2.evaluate(()=>{ S.letterSeen=S.started=S.tabToured=S.ideasNudged=true; S.name='T'; S.n=50; S.weeks=52; S.why='x';
    S.start=new Date(Date.now()-864e5*30); S.zero={no:'0',zero:true,d:'2026-03-14',t:'begins',posted:{},captions:{}}; S.acts=[]; save(); });
  await p2.addInitScript(OBS);
  await p2.reload(); await p2.waitForTimeout(1500);
  await p2.evaluate(()=>{try{endTabTour();}catch(e){}});
  await p2.waitForTimeout(8000);
  const R = await p2.evaluate(()=>window.__F);
  ck('nothing flies when the phone asks for less motion', R.length===0, R);
  await ctx2.close();
}

console.log(`\n${pass} ok, ${fail} failed, console/page errors: ${errs.length}`);
if(errs.length) console.log(errs.slice(0,5));
await b.close();
process.exit(fail?1:0);

/* THE PAPER PLANE AND THE BACKUP CLOSE, RULED BY G 24 SEPTEMBER 2026.
   "Perfection include it." About one stray in three is the plane; it loops
   once or twice; its dotted line pops away; the backup bar has a corner X. */
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

async function stepped(p){
  await p.evaluate(()=>{ window.__T=performance.now(); window.__Q=[]; const real=performance.now.bind(performance);
    performance.now=()=>__T; window.requestAnimationFrame=cb=>{__Q.push(cb);return __Q.length;}; window.cancelAnimationFrame=()=>{}; });
}
async function run(p, ms){ return p.evaluate(async (ms)=>{ const out={maxDash:0,maxHeart:0,maxRing:0,planeSeen:false};
  for(let t=0;t<ms;t+=1000/30){ __T+=1000/30; const q=__Q; __Q=[]; q.forEach(c=>c(__T));
    out.maxDash=Math.max(out.maxDash,document.querySelectorAll('#spl .spl-dash').length);
    out.maxHeart=Math.max(out.maxHeart,document.querySelectorAll('#spl .spl-heart').length);
    out.maxRing=Math.max(out.maxRing,document.querySelectorAll('#spl .spl-ring').length);
    const pl=document.querySelector('#spl .spl-plane'); if(pl && pl.getAttribute('transform')) out.planeSeen=true;
    if(!document.getElementById('spl').classList.contains('up')){ out.endedAt=t; break; } }
  out.up=document.getElementById('spl').classList.contains('up'); out.strayOn=STRAY_ON; out.left=document.getElementById('spl').innerHTML.length; return out; }, ms); }

for(const loops of [1,2]){
  head('the plane, '+loops+' loop'+(loops>1?'s':''));
  const {ctx,p}=await app();
  await p.evaluate(()=>{ go('home'); strayStop(); });
  await stepped(p);
  const info = await p.evaluate((l)=>{ const R=splRoute(innerWidth,innerHeight,l,true,.55); const xs=R.pts.map(q=>q.x), ys=R.pts.map(q=>q.y);
    splFly({loops:l, fromLeft:true, y:.55}); return {len:R.len, x0:xs[0], x1:xs[xs.length-1], ymin:Math.min(...ys), W:innerWidth}; }, loops);
  const r = await run(p, 45000);
  ck('it starts off the left edge and ends off the right', info.x0 < -40 && info.x1 > info.W + 40, info);
  ck('the loops stay on the screen, below the top', info.ymin > 40, info);
  ck('the plane flies, with its dotted line', r.planeSeen && r.maxDash > 10, r);
  ck('one or two hearts in the line', r.maxHeart >= 1 && r.maxHeart <= 2, r);
  ck('the dashes pop, leaving rings', r.maxRing > 0, r);
  ck('and when the last one has popped it is all gone, and a heart may come again', !r.up && r.strayOn===0 && r.left===0 && r.endedAt > 5000, r);
}

head('the line is never cut off early on a slow phone');
{ const {ctx,p}=await app();
  await p.evaluate(()=>{ go('home'); strayStop(); });
  await stepped(p);
  await p.evaluate(()=>splFly({loops:2, fromLeft:false, y:.55}));
  await p.waitForTimeout(100);
  const r = await run(p, 45000);
  ck('a two-loop flight ends by itself, not by the timer', r.endedAt > 8000 && r.endedAt < 30000, r);
}

head('the plane goes the moment you leave Your year');
{ const {ctx,p}=await app();
  await p.evaluate(()=>{ go('home'); strayStop(); });
  await stepped(p);
  await p.evaluate(()=>splFly({loops:1}));
  await run(p, 1500);
  await p.evaluate(()=>go('you'));
  const r = await run(p, 200);
  ck('gone, nothing left behind', !r.up && r.strayOn===0 && r.left===0, r);
}

head('it cannot be tapped');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>getComputedStyle(document.getElementById('spl')).pointerEvents);
  ck('the plane’s layer lets every tap through', r==='none', r);
}

head('about one in three strays is the plane, by chance, with one or two loops');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>{ const was=window.splFly; let planes=0, loops={1:0,2:0};
    window.splFly=(o)=>{ planes++; loops[o.loops]++; };
    const acS=window.acSpawn; let hearts=0; window.acSpawn=function(){ hearts++; };
    for(let k=0;k<600;k++){ STRAY_ON=0; SCREEN='home'; try{ strayGo(); }catch(e){} try{ acStop(); }catch(e){} $('actcf').classList.remove('up'); }
    strayStop(); window.splFly=was; window.acSpawn=acS; return {planes, hearts, loops}; });
  ck('some are planes and most are hearts', r.planes > 120 && r.planes < 280 && r.hearts > r.planes, r);
  ck('both one and two loops come up', r.loops[1] > 30 && r.loops[2] > 30, r);
}

head('the backup reminder has its X in the corner');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{ go('home'); BKUPBAR_SHOWN=false; S.bkupAt=0; S.bkupToldAt=0; S.bkup=''; 
    try{ sheet(null); }catch(e){} const n=$('calnudge'); if(n) n.classList.remove('on'); const t=$('toastbar'); if(t) t.classList.remove('up');
    bkupBar(); await new Promise(r=>setTimeout(r,400));
    const bar=$('bkupbar'), x=bar.querySelector('.bkx-close'); const b=bar.getBoundingClientRect(), c=x.getBoundingClientRect();
    const out={ up:bar.classList.contains('up'), bar:[b.right,b.top], x:[c.left,c.top,c.width,c.height],
      label:x.getAttribute('aria-label'), msg:bar.querySelector('.msg').textContent };
    const hit=document.elementFromPoint(c.left+c.width/2, c.top+c.height/2); out.hit = !!(hit && hit.closest('.bkx-close'));
    x.click(); await new Promise(r=>setTimeout(r,300)); out.after=bar.classList.contains('up'); out.screen=SCREEN; return out; });
  ck('the reminder is up', r.up && /backed up/.test(r.msg), r);
  ck('the X sits on the top-right corner, not in the line of words', Math.abs((r.x[0]+r.x[2]/2) - r.bar[0]) < 4 && Math.abs((r.x[1]+r.x[3]/2) - r.bar[1]) < 4, r);
  ck('a thumb-sized target, named Close', r.x[2]>=44 && r.x[3]>=44 && r.label==='Close', r);
  ck('and nothing covers it', r.hit, r);
  ck('tapping it closes the reminder and goes nowhere', r.after===false && r.screen==='home', r);
}

console.log('\n'+pass+' ok, '+fail+' failed'+(errs.length?'\npage errors:\n  '+errs.join('\n  '):''));
await b.close(); process.exit(fail?1:0);

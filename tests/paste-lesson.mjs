/* THE PASTE LESSON, RULED BY G 24 SEPTEMBER 2026. Testers did not know their
   words were copied. The first three Instagram sends show three moves before
   anybody leaves; Posted? offers the words again.                         */
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

head('the first Instagram send teaches, then sends');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={ shares:0 };
    window.__CL=[];
    try{ Object.defineProperty(navigator,'clipboard',{ value:{ writeText:(t)=>{ window.__CL.push(t); return Promise.resolve(); } }, configurable:true }); }catch(e){}
    PHONE.canShareFiles=()=>true;
    PHONE.share=async (pl)=>{ out.shares++; };
    S.platforms.instagram.on=true;
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    const ig=[...document.querySelectorAll('#cm-plats button')].find(b=>/Instagram/.test(b.textContent)); if(ig) ig.click();
    for(let k=0;k<60 && (PACK.busy||!PACK.files);k++) await new Promise(r=>setTimeout(r,150));
    out.label=document.getElementById('cm-go').textContent.trim();
    document.getElementById('cm-go').click();
    await new Promise(r=>setTimeout(r,300));
    const d=document.getElementById('dlg');
    out.open=!d.classList.contains('hide');
    out.title=document.getElementById('dlg-title').textContent;
    out.steps=d.querySelectorAll('.pth-step').length;
    out.finger=!!d.querySelector('.pth-hand');
    out.copied=window.__CL[window.__CL.length-1]===document.getElementById('cm-text').value;
    out.sharesBefore=out.shares;
    document.getElementById('dlg-yes').click();
    await new Promise(r=>setTimeout(r,600));
    out.sharesAfter=out.shares; out.taught=S.pasteTaught;
    return out;
  });
  ck('the button says what it does', /^Copy my words & open Instagram$/.test(r.label), r.label);
  ck('the first tap opens the lesson, titled truthfully', r.open && r.title==='Your words are copied', r);
  ck('three steps, one with the drawn finger', r.steps===3 && r.finger, r);
  ck('and the words really are on the clipboard', r.copied, r);
  ck('nothing leaves before Open Instagram', r.sharesBefore===0, r);
  ck('Open Instagram sends, once, and counts the lesson', r.sharesAfter===1 && r.taught===1, r);
}

head('the lesson count survives a reload, and stops after three');
{ const {ctx,p}=await app();
  await p.evaluate(()=>{ S.pasteTaught=3; save(); });
  await p.reload(); await p.waitForTimeout(1400);
  const r = await p.evaluate(async ()=>{
    try{ endTabTour(); }catch(e){} try{ sheet(null); }catch(e){}
    const out={ kept:S.pasteTaught, shares:0 };
    PHONE.canShareFiles=()=>true; PHONE.share=async ()=>{ out.shares++; };
    try{ navigator.clipboard.writeText=async()=>{}; }catch(e){}
    S.platforms.instagram.on=true;
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    const ig=[...document.querySelectorAll('#cm-plats button')].find(b=>/Instagram/.test(b.textContent)); if(ig) ig.click();
    for(let k=0;k<60 && (PACK.busy||!PACK.files);k++) await new Promise(r=>setTimeout(r,150));
    document.getElementById('cm-go').click();
    await new Promise(r=>setTimeout(r,500));
    out.lesson=!document.getElementById('dlg').classList.contains('hide') && document.getElementById('dlg-title').textContent==='Your words are copied';
    return out;
  });
  ck('three lessons are remembered across a reload', r.kept===3, r);
  ck('the fourth send goes straight out, no lesson', !r.lesson && r.shares===1, r);
}

head('Not now leaves everything as it was');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={ shares:0 };
    PHONE.canShareFiles=()=>true; PHONE.share=async ()=>{ out.shares++; };
    try{ navigator.clipboard.writeText=async()=>{}; }catch(e){}
    S.platforms.instagram.on=true;
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    const ig=[...document.querySelectorAll('#cm-plats button')].find(b=>/Instagram/.test(b.textContent)); if(ig) ig.click();
    for(let k=0;k<60 && (PACK.busy||!PACK.files);k++) await new Promise(r=>setTimeout(r,150));
    document.getElementById('cm-go').click(); await new Promise(r=>setTimeout(r,300));
    document.getElementById('dlg-no').click(); await new Promise(r=>setTimeout(r,300));
    out.taught=S.pasteTaught||0; out.screen=SCREEN;
    out.extraGone=document.getElementById('dlg-extra').classList.contains('hide');
    return out;
  });
  ck('no send, no count, still on the post page', r.shares===0 && r.taught===0 && r.screen==='compose', r);
}

head('Posted? on Instagram offers the words again; other dialogs stay plain');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={};
    window.__CL=[];
    try{ Object.defineProperty(navigator,'clipboard',{ value:{ writeText:(t)=>{ window.__CL.push(t); return Promise.resolve(); } }, configurable:true }); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    const a=S.current||S.acts[S.acts.length-1];
    LEFT_FOR={act:a, plat:'instagram', at:Date.now()-10000}; askIfPosted();
    await new Promise(r=>setTimeout(r,200));
    const btn=document.querySelector('#dlg-extra .pth-again');
    out.has=!!btn; out.note=(document.querySelector('#dlg-extra .pth-againnote')||{}).textContent;
    if(btn){ btn.click(); await new Promise(r=>setTimeout(r,100)); out.lab=btn.textContent; }
    out.copied=window.__CL[window.__CL.length-1]===document.getElementById('cm-text').value;
    document.getElementById('dlg-no').click(); await new Promise(r=>setTimeout(r,200));
    LEFT_FOR={act:a, plat:'facebook', at:Date.now()-10000}; askIfPosted();
    await new Promise(r=>setTimeout(r,200));
    out.fbPlain=document.getElementById('dlg-extra').classList.contains('hide') && !document.querySelector('#dlg-extra .pth-again');
    document.getElementById('dlg-no').click();
    return out;
  });
  ck('a Copy my words again button, with its line', r.has && /Caption box empty\? Tap, then paste it in\./.test(r.note||''), r);
  ck('it copies the words and says so', r.copied && r.lab==='Copied', r);
  ck('Facebook’s Posted? has none of it', r.fbPlain, r);
}

console.log('\n'+pass+' ok, '+fail+' failed'+(errs.length?'\npage errors:\n  '+errs.join('\n  '):''));
await b.close(); process.exit(fail?1:0);

/* THE CUT OF 15 SEPTEMBER, locked down.
   G's ruling: "if it's old code remove it to streamline." Two screens that
   nothing could reach any more — the plan sheet and the log screen — went, with
   twenty-five functions and every branch in live code that mentioned them.

   Deleting code needs the OPPOSITE kind of check from adding it. These prove
   three things: the dead screens really are gone, every door that used to lead
   through them still leads somewhere, and the one path that was deliberately
   kept alive for people upgrading actually works.

   Two of these were watched failing on the pre-fix file before being kept
   (L75). They are marked SEEN TO FAIL.                                        */
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
const fs = require_('node:fs');
const EXE = process.env.CHROME ||
  (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const LAUNCH = EXE ? { executablePath: EXE } : {};
const SRC_PATH = path.resolve(process.cwd(),'index.html');
const FILE = process.env.AOG || pathToFileURL(SRC_PATH).href;
const SRC = fs.readFileSync(SRC_PATH,'utf8');

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
      d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]});
    S.lineTouched=S.wordTouched=false;try{syncReason();}catch(e){}save();},[acts,goal]);
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}});
  return {p};
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('the two screens really are gone');
{ const {p}=await app();
  const r=await p.evaluate(()=>{
    const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
    return {
      log:   ids.filter(i=>/^l-/.test(i)),
      plan:  ids.filter(i=>/^pl-/.test(i)),
      sheets:[...document.querySelectorAll('[id^="sheet-"]')].map(e=>e.id),
      screens:[...document.querySelectorAll('.screen[id]')].map(e=>e.id)
    };
  });
  ck('no part of the log screen is left in the page', r.log.length===0, r.log);
  ck('nor of the plan sheet', r.plan.length===0, r.plan);
  ck('there is no plan sheet to open', r.sheets.indexOf('sheet-plan')<0, r.sheets);
  ck('and no log screen to walk onto', r.screens.indexOf('log')<0, r.screens);

  /* the file itself, not just the rendered page — a screen can be built by code */
  const gone = ['function drawLog','function drawPlan','function savePlan','function saveAct',
                'function newAct','function logMode','function remindMe','function askCalendar',
                'function planToCalendar','function actToCalendar','function planDone',
                'function fillLogFromPlan','function clearPlan','function costTyped',
                'function readActNo','function keptNote','function mergeFromPlan',
                'function planKey','function saveDraft','function draftHasWork',
                'function updateSpendNote','function newPlanId','function nextFreeSlot',
                'function logSlot','function openPlan'];
  const left = gone.filter(g=>SRC.indexOf(g+'(')>=0 || SRC.indexOf(g+' (')>=0);
  ck('and none of the twenty-five is rebuilt in the file', left.length===0, left);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('every door still leads somewhere');
{ const {p}=await app();
  /* THE TRAP: a handler can be written into the markup by name and simply not
     exist. The page says nothing; the button does nothing. So ask the page. */
  const r=await p.evaluate(()=>{
    const bad=[];
    document.querySelectorAll('[onclick],[oninput],[onchange]').forEach(el=>{
      ['onclick','oninput','onchange'].forEach(a=>{
        const v=el.getAttribute(a); if(!v) return;
        /* only BARE names. A method call — .trim(), .click(), .add() — lives on
           an object, not on window, and matching those made this check shout at
           perfectly good markup. The negative look-behind is the whole check. */
        (v.match(/(?<![.\w$])([A-Za-z_$][\w$]*)\s*\(/g)||[]).forEach(m=>{
          const n=m.slice(0,-1).trim();
          if(['if','for','while','return','typeof','catch','function','new'].indexOf(n)>=0) return;
          /* AND a top-level `const fn = ...` is NOT a window property — it lives
             in the script's own lexical scope. Asking window alone shouted at $,
             which is about as alive as a name in this file gets. */
          let live=false;
          try{ live = (typeof window[n]==='function') || eval('typeof '+n)==='function'; }catch(e){}
          if(!live) bad.push((el.id||el.className||'?')+' -> '+n);
        });
      });
    });
    return bad;
  });
  ck('no button in the page calls a name that is gone', r.length===0, r);

  /* an empty square */
  const sq = await p.evaluate(()=>{
    const before=(S.works||[]).length;
    startInSquare(19);
    return { before, screen:SCREEN, exp: WK && WK.exp, works:(S.works||[]).length };
  });
  ck('tapping an empty square opens the editor', sq.screen==='work', sq);
  ck('aimed at that square', String(sq.exp)==='19', sq);

  /* a day on the calendar */
  const day = await p.evaluate(()=>{
    startInSquare(null,'2026-12-24');
    return { screen:SCREEN, d: WK && WK.d };
  });
  ck('picking a calendar day opens it too', day.screen==='work', day);
  ck('on that day', day.d==='2026-12-24', day);

  /* the invite */
  const ask = await p.evaluate(()=>{
    startInSquare(7);
    WK.t='Doughnuts for the vets'; WK.d='2026-11-02'; WK.who=['Ruth'];
    openAsk('work');
    const a = askDetails();
    return { t:a.t, d:a.d, no:a.no, who:a.who, open:!!document.querySelector('#sheet-ask.up, #sheet-ask.open, #sheet-ask:not(.hide)') };
  });
  ck('the invite still reads the act it was opened from', ask.t==='Doughnuts for the vets' && ask.d==='2026-11-02', ask);
  ck('and carries who is coming', (ask.who||[]).join()==='Ruth', ask);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('the half-written act somebody is upgrading with');
{ /* SEEN TO FAIL. The old screen wrote the day under the name "when" and the
     money as the TEXT standing in the field — "$12.50". Read under the new
     names this handed back an act with no day and nothing spent, one line under
     a dialog that had just promised to pick it up where she left off. */
  const {p}=await app();
  const r=await p.evaluate(async ()=>{
    const old = { no:'4', t:'Doughnuts for the vet', cost:'$12.50',
                  when:'2026-10-02', who:['Ruth'], spends:[], photos:[] };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(old));
    const worth = draftWorth(old);
    await draftToWork(old);
    const w=(S.works||[])[(S.works||[]).length-1]||{};
    return { worth, t:w.t, d:w.d, cost:w.cost, exp:w.exp, who:(w.who||[]).join(),
             cleared: localStorage.getItem(DRAFT_KEY)===null };
  });
  ck('it is judged worth offering back', r.worth===true, r);
  ck('it keeps its name', r.t==='Doughnuts for the vet', r);
  ck('it keeps its day', r.d==='2026-10-02', r);
  ck('it keeps what had been spent', r.cost===12.5, r);
  ck('it keeps the square it was aimed at', String(r.exp)==='4', r);
  ck('and who was in it', r.who==='Ruth', r);
  ck('and the old draft is put away afterwards', r.cleared===true, r);

  /* the other half of the promise: nothing writes a draft any more */
  const w=await p.evaluate(()=>{
    localStorage.removeItem(DRAFT_KEY);
    startInSquare(21); WK.t='Something new'; workKeep(); save();
    syncCost();
    return { draft: localStorage.getItem(DRAFT_KEY), works:(S.works||[]).length };
  });
  ck('and nothing writes a new one', w.draft===null, w);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('the tally, now it has one screen instead of two');
{ const {p}=await app();
  const r=await p.evaluate(()=>{
    startInSquare(9); WK.t='Tally test'; workKeep();
    const l=currentSpends(); l.push({a:5,w:'flour',p:'me',n:''}); l.push({a:3,w:'jam',p:'Ruth',n:''});
    syncCost();
    return { onWork:(WK.spends||[]).length, cost:WK.cost,
             field:($('wk-cost')||{}).value, ro:($('wk-cost')||{}).readOnly,
             note:($('wk-spendnote')||{}).textContent };
  });
  ck('a tally line lands on the act in the works', r.onWork===2, r);
  ck('the cost follows it', r.cost===5, r);
  ck('the field shows it', /5/.test(r.field||''), r);
  ck('the field stops being typeable', r.ro===true, r);
  ck('and the line under it says where the number came from', /tally/i.test(r.note||''), r);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('the reminder still asks the phone first');
{ /* SEEN TO FAIL. remindMe() held the only call to PHONE.canRemind(), and the
     cut took it out with the screen it lived on. On the web canRemind() is
     false and this falls straight through to the calendar, which is why it can
     be deleted without anybody noticing until the native build ships. */
  const {p}=await app();
  const r=await p.evaluate(()=>{
    /* THE TRAP, TWICE NOW: workToCalendar re-reads the form before it does
       anything, so a test that sets WK and not the inputs is testing a state
       the app can never be in. Fill the fields. */
    startInSquare(12);
    $('wk-t').value='Soup run'; $('wk-when').value='2026-11-20';
    WK.r='3'; wkEdited();
    let asked=null, handed=null;
    const rm=PHONE.remind, cr=PHONE.canRemind, tc=window.toCalendar;
    PHONE.canRemind=()=>true;
    PHONE.remind=(d,lead,title)=>{ asked={d,lead,title}; return Promise.resolve(true); };
    window.toCalendar=(...a)=>{ handed=a; };
    workToCalendar();
    PHONE.canRemind=cr; PHONE.remind=rm; window.toCalendar=tc;
    return { asked, handed };
  });
  ck('when the phone can, the phone is asked', !!r.asked, r);
  ck('for the right day', r.asked && r.asked.d==='2026-11-20', r);
  ck('with the lead time that was chosen', r.asked && r.asked.lead==='3', r);
  ck('and the calendar is NOT also handed one', r.handed===null, r);

  const f=await p.evaluate(async ()=>{
    let handed=null, said=null;
    const rm=PHONE.remind, cr=PHONE.canRemind, tc=window.toCalendar, sy=window.say;
    PHONE.canRemind=()=>true;
    PHONE.remind=()=>Promise.resolve(false);        // she refused permission
    window.toCalendar=(...a)=>{ handed=a; };
    window.say=(t)=>{ said=t; };
    workToCalendar();
    await new Promise(r=>setTimeout(r,60));
    PHONE.canRemind=cr; PHONE.remind=rm; window.toCalendar=tc; window.say=sy;
    return { handed, said };
  });
  ck('a refusal falls back to the calendar', !!f.handed, f);
  ck('with no scolding', f.said===null, f);

  const web=await p.evaluate(()=>{
    let handed=null;
    const tc=window.toCalendar; window.toCalendar=(...a)=>{ handed=a; };
    workToCalendar();                                // canRemind() is false here
    window.toCalendar=tc;
    return { handed };
  });
  ck('and on the web it goes straight to the calendar as it always did', !!web.handed, web);
  ck('carrying the chosen lead time', web.handed && web.handed[4]==='3', web);

  const noday=await p.evaluate(()=>{
    let said=null, handed=null;
    const sy=window.say, tc=window.toCalendar;
    window.say=(t,n)=>{ said=t+' / '+n; }; window.toCalendar=(...a)=>{ handed=a; };
    $('wk-when').value=''; WK.d='';
    workToCalendar();
    window.say=sy; window.toCalendar=tc;
    return { said, handed };
  });
  ck('no day still means nothing is handed over', noday.handed===null, noday);
  ck('and it still says which is missing', /day/i.test(noday.said||''), noday);
}

console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
errs.slice(0,8).forEach(e=>console.log('   '+e));
await b.close();
process.exit(fail || errs.length ? 1 : 0);

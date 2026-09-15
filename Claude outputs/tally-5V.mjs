/* THE TALLY AND THE MONEY IN IT.
   G's ruling, 15 September: "It needs to automatically keep what you put in,
   and then you delete it yourself, but it should always keep it in tally."

   A figure typed straight into the cost box used to be replaced the moment a
   tally started, silently, under a line saying the tally was the authority.
   It is carried into the tally as its first line now, visible, with an × beside
   it. Nothing decides for her; nothing disappears.

   These were all watched failing before the fix (L75). AND THEN A REVIEW SEAT
   DELETED ONE LINE OF THE FEATURE — the syncCost() at the foot of carryCostIn()
   — and all twenty-three still passed, while the cost box stayed editable and
   silently threw away the next figure she typed into it. So they now assert the
   STATE OF THE SCREEN, not just the numbers: the field's readOnly, the words
   under it, a reload in the middle, and the buttons clicked rather than their
   functions called.                                                           */
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
/* open an act in the works and TYPE into it, the way a thumb does — setting WK
   directly tests a state the app can never be in (this harness fell for that
   once already, in tests/streamline.mjs) */
const typeCost = (p, amount) => p.evaluate(a=>{
  startInSquare(9);
  $('wk-t').value='Doughnuts for the vets'; wkEdited();
  $('wk-cost').value=a; wkCostTyped();
  return { cost: WK.cost, lines:(WK.spends||[]).length };
}, amount);

/* ─────────────────────────────────────────────────────────────────────────── */
head('a figure typed in is carried into the tally');
{ const {p}=await app();
  const typed = await typeCost(p, '12.50');
  ck('typing it keeps it', typed.cost===12.5 && typed.lines===0, typed);

  await p.click('#wk-tabbtn'); await p.waitForTimeout(160);
  const r = await p.evaluate(()=>{
    return { lines:(WK.spends||[]).length, first:(WK.spends||[])[0],
             cost:WK.cost, field:$('wk-cost').value, ro:$('wk-cost').readOnly,
             note:($('wk-spendnote')||{}).textContent||'',
             shown:($('spend-list')||{}).innerText||'' };
  });
  ck('opening the tally puts it in', r.lines===1, r);
  ck('for the amount she typed', r.first && r.first.a===12.5, r);
  ck('recorded as hers', r.first && r.first.p==='me', r);
  ck('and the line says where it came from', /entered/i.test(r.shown), r);
  ck('the total has not changed', r.cost===12.5, r);
  ck('and neither has the field', /12\.50/.test(r.field||''), r);
  /* THE SEAT'S DELETED LINE SHOWS UP HERE AND NOWHERE ELSE. Without the
     syncCost() the numbers are all still right and the screen is a liar. */
  ck('the field knows the tally owns it now', r.ro===true, r);
  ck('and the words under it say so', /from your tally/i.test(r.note), r);

  /* she types over a field the tally owns: it must not silently vanish */
  const over = await p.evaluate(()=>{
    const f=$('wk-cost'); const was=f.readOnly;
    f.readOnly=false; f.value='40'; wkCostTyped();    // force the attempt
    f.readOnly=was;
    return { cost:WK.cost, lines:(WK.spends||[]).length };
  });
  ck('a figure typed over a live tally changes nothing behind her back', over.cost===12.5, over);

  /* THE POINT OF THE WHOLE RULING */
  await p.evaluate(()=>{ $('sp-amt').value='5'; $('sp-what').value='jam'; SP_WHO='me'; });
  await p.click('#sheet-spend .btn.mini'); await p.waitForTimeout(140);
  const add = await p.evaluate(()=>
    ({ lines:(WK.spends||[]).length, cost:WK.cost, field:$('wk-cost').value }));
  ck('adding a second thing ADDS to it, it does not replace it', add.cost===17.5, add);
  ck('and there are two lines, not one', add.lines===2, add);

  /* and she can take it off herself */
  const del = await p.evaluate(()=>{
    const btns=[...document.querySelectorAll('#spend-list button')];
    if(btns[0]) btns[0].click();
    return { lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('she can delete it herself', del.lines===1 && del.cost===5, del);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('and it never doubles');
{ const {p}=await app();
  await typeCost(p, '12.50');
  const r = await p.evaluate(()=>{
    openSpends(); sheet(null);
    openSpends(); sheet(null);
    openSpends();
    return { lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('opening the tally three times still leaves one line', r.lines===1, r);
  ck('and one total', r.cost===12.5, r);

  /* the trap the old code named: after removing a line the FIELD still holds
     the old total, which looks exactly like a figure she typed */
  const after = await p.evaluate(()=>{
    const list=WK.spends; list.push({a:5,w:'jam',p:'me',n:''}); syncCost();
    const was = WK.cost;
    list.splice(0,1); syncCost();                 // take the first one off
    const mid = { cost:WK.cost, field:$('wk-cost').value, lines:list.length };
    openSpends();                                  // and look again
    return { was, mid, lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('removing a line does not re-add it as a phantom', after.lines===1, after);
  ck('and the total goes down, not up', after.cost===5, after);

  /* emptying it completely, then typing again, must still work */
  const again = await p.evaluate(()=>{
    WK.spends.length=0; syncCost();
    const empty = { cost:WK.cost, field:$('wk-cost').value };
    $('wk-cost').value='8'; wkCostTyped();
    openSpends();
    return { empty, lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('an emptied tally clears the field', again.empty.cost===0 && again.empty.field==='', again);
  ck('and a figure typed after that is carried in too', again.lines===1 && again.cost===8, again);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('it survives the app being closed');
{ const {p}=await app();
  await typeCost(p, '12.50');
  await p.evaluate(()=>{ openSpends(); sheet(null); save(); });
  await p.reload(); await p.waitForTimeout(1400);
  const r = await p.evaluate(()=>{
    const w=(S.works||[])[(S.works||[]).length-1]; openWork(w);
    return { lines:(w.spends||[]).length, cost:w.cost,
             field:$('wk-cost').value, ro:$('wk-cost').readOnly,
             note:($('wk-spendnote')||{}).textContent||'' };
  });
  ck('the carried line is still there after a reload', r.lines===1, r);
  ck('with its money', r.cost===12.5, r);
  ck('the field still shows it', /12\.50/.test(r.field||''), r);
  ck('and still knows the tally owns it', r.ro===true && /from your tally/i.test(r.note), r);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('doing it again does not double last time\'s money');
{ /* SEEN TO FAIL, and found by a review seat rather than by me. "Do it again"
     copied a finished act's cost onto a fresh act with NO lines under it, which
     is the one state carryCostIn() reads as "she typed this". Sixty spent,
     a hundred and twenty written down. */
  const {p}=await app();
  const r = await p.evaluate(()=>{
    S.current = { no:'1', t:'Soup run', cost:60, who:['Ruth'],
                  spends:[{a:60,w:'soup',p:'me',n:''}], d:'2026-09-05' };
    doItAgain();
    const w = WK || {};
    const before = { cost:w.cost, lines:(w.spends||[]).length };
    openSpends();
    return { before, lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('a repeat act starts with no money on it', r.before.cost===0, r);
  ck('and no lines', r.before.lines===0, r);
  ck('opening the tally invents nothing', r.lines===0, r);
  ck('and the total stays at nought', r.cost===0, r);

  const real = await p.evaluate(()=>{
    $('sp-amt').value='60'; $('sp-what').value='soup'; SP_WHO='me';
    addSpend();
    return { lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('this year\'s receipt is the only one on it', real.lines===1, real);
  ck('and it cost sixty, not a hundred and twenty', real.cost===60, real);

  const keeps = await p.evaluate(()=>({ t:WK.t, who:(WK.who||[]).join() }));
  ck('it still brings the title', keeps.t==='Soup run', keeps);
  ck('and the people', keeps.who==='Ruth', keeps);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('nothing is invented out of nothing');
{ const {p}=await app();
  const r = await p.evaluate(()=>{
    startInSquare(14); $('wk-t').value='No money in this one'; wkEdited();
    openSpends();
    return { lines:(WK.spends||[]).length, cost:WK.cost,
             shown:($('spend-list')||{}).innerText||'' };
  });
  ck('an act with no cost gets no line', r.lines===0, r);
  ck('and still says the tab is empty', /nothing on the tab/i.test(r.shown), r);

  const zero = await p.evaluate(()=>{
    $('wk-cost').value='0'; wkCostTyped();
    openSpends();
    return { lines:(WK.spends||[]).length };
  });
  ck('nor does a nought', zero.lines===0, zero);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('a contribution is still not a purchase');
{ /* the tally's own arithmetic must not have moved: somebody handing you twenty
     dollars comes off YOUR share, it does not reduce what the act cost */
  const {p}=await app();
  const r = await p.evaluate(()=>{
    startInSquare(16); $('wk-t').value='Soup run'; wkEdited();
    $('wk-cost').value='30'; wkCostTyped();
    openSpends();
    WK.spends.push({a:20,w:'',p:'gave',n:'Ruth'}); syncCost();
    const t = tally(WK.spends);
    return { lines:WK.spends.length, all:t.all, mine:t.mine, cost:WK.cost };
  });
  ck('the thirty she typed is in the tally', r.lines===2, r);
  ck('the act still cost thirty', r.all===30, r);
  ck('and her share is ten', r.mine===10, r);
  ck('which is what is written down', r.cost===10, r);
}

console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
errs.slice(0,8).forEach(e=>console.log('   '+e));
await b.close();
process.exit(fail || errs.length ? 1 : 0);

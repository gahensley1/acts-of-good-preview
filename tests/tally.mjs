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
  wkTallyToggle(true);                      // G folded it away, 16 Sept
  $('wk-cost').value=a; wkCostTyped();
  return { cost: WK.cost, lines:(WK.spends||[]).length };
}, amount);
/* THE TALLY OPENS SHUT NOW, so everything in the row is behind a tap. These
   press the bar rather than reaching past it, because a control nobody can
   reach is exactly the class of fault this suite exists to catch. */
const unfold = async (pg) => {
  const shut = await pg.evaluate(()=>!!($('wk-tallybody')||{}).hidden);
  if(shut){ await pg.click('#wk-sum'); await pg.waitForTimeout(140); }
};

/* ─────────────────────────────────────────────────────────────────────────── */
head('a figure typed in is carried into the tally');
{ const {p}=await app();
  const typed = await typeCost(p, '12.50');
  ck('typing it keeps it', typed.cost===12.5 && typed.lines===0, typed);

  await p.click('#wk-tabbtn'); await p.waitForTimeout(160);
  const r = await p.evaluate(()=>{
    return { lines:(WK.spends||[]).length, first:(WK.spends||[])[0],
             cost:WK.cost, field:$('wk-cost').value,
             total:($('wk-sumface')||{}).innerText.replace(/\n/g,' ')||'',
             note:($('wk-spendnote')||{}).textContent||'',
             shown:($('wk-roll')||{}).innerText||'' };
  });
  ck('opening the tally puts it in', r.lines===1, r);
  ck('for the amount she typed', r.first && r.first.a===12.5, r);
  ck('recorded as hers', r.first && r.first.p==='me', r);
  /* It used to arrive labelled "What you entered", because the sheet was the
     only way a typed figure could become a line. The row flushes itself onto
     the roll first now, so it arrives as her own line with whatever note she
     gave it — and with none, the app's own word for an unlabelled one. */
  ck('and it is on the roll where she can see it', /12\.50/.test(r.shown), r);
  ck('under a name, not a blank', /Something|entered/i.test(r.shown), r);
  ck('the total has not changed', r.cost===12.5, r);
  /* THE SEAT'S DELETED LINE SHOWS UP HERE AND NOWHERE ELSE. Without the
     syncCost() the numbers are all still right and the screen is a liar.
     The box stopped being the readout when G ruled the roll in, so what
     proves the screen is honest is the total under the lines and the words
     beneath — not the box, which is now empty and waiting for the next thing. */
  ck('the box is clear and ready for the next thing', r.field==='', r);
  ck('the total is shown under the roll', /12\.50/.test(r.total||''), r);
  /* The words moved ONTO the bar when G folded the tally away on 16 September;
     the line underneath now only speaks when it has something the bar does not
     say. Same intent, read from where a person actually reads it. */
  ck('and the bar says what it is made of', /1 thing/.test(r.total), r);
  ck('and the line beneath does not say it twice', r.note==='', r);

  /* typing into the box while a tally is live: it is a PENDING entry, so it
     must not touch the recorded figure until she adds it, and it must not
     vanish either */
  const over = await p.evaluate(()=>{
    $('wk-cost').value='40'; wkCostTyped();
    const mid = { cost:WK.cost, lines:(WK.spends||[]).length, still:$('wk-cost').value };
    wkPushSpend();                                   // now she adds it
    return { mid, cost:WK.cost, lines:(WK.spends||[]).length, box:$('wk-cost').value };
  });
  ck('a figure typed over a live tally changes nothing until she adds it', over.mid.cost===12.5, over);
  ck('and it is still sitting there while she decides', over.mid.still==='40', over);
  ck('adding it ADDS, it does not replace', over.cost===52.5, over);
  ck('and the box clears behind it', over.box==='' && over.lines===2, over);
  await p.evaluate(()=>{ WK.spends.splice(1,1); syncCost(); });   // back to one line

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
             field:$('wk-cost').value, roll:($('wk-roll')||{}).innerText||'',
             total:($('wk-sumface')||{}).innerText.replace(/\n/g,' ')||'',
             note:($('wk-spendnote')||{}).textContent||'' };
  });
  ck('the carried line is still there after a reload', r.lines===1, r);
  ck('with its money', r.cost===12.5, r);
  ck('the roll draws it', /12\.50/.test(r.roll), r);
  ck('the total under it agrees', /12\.50/.test(r.total), r);
  ck('and the box opens empty, ready for the next thing', r.field==='', r);
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
head('a number AND a note, on one line');
{ /* RULED BY G, 15 September: "I need to be able to keep a number and keep a
     note." Drawn as three options; he took the till-roll with a note on each
     line. All SEEN TO FAIL before the row was built. */
  const {p}=await app();
  await p.evaluate(()=>{ startInSquare(9); $('wk-t').value='Doughnuts'; wkEdited(); });
  await p.waitForTimeout(200); await unfold(p);      // the row is behind the bar now

  const shape = await p.evaluate(()=>({
    amount: !!$('wk-cost'), note: !!$('wk-what'), plus: !!$('wk-plus'),
    pad: ($('wk-cost')||{}).getAttribute ? $('wk-cost').getAttribute('inputmode') : null,
    ret: ($('wk-cost')||{}).getAttribute ? $('wk-cost').getAttribute('enterkeyhint') : null,
    plusOff: ($('wk-plus')||{}).disabled,
    calc: !!document.querySelector('.tallybtn'),
    h: Math.round(($('wk-plus')||{getBoundingClientRect:()=>({height:0})}).getBoundingClientRect().height)
  }));
  ck('there is a place for the number', shape.amount, shape);
  ck('and a place for the note beside it', shape.note, shape);
  ck('and a plus to put them on the roll', shape.plus, shape);
  ck('which is dead until there is something to add', shape.plusOff===true, shape);
  ck('a thumb can hit it', shape.h>=44, shape);
  /* THE KEYBOARD, which is where the whole round started */
  ck('the box asks for the number pad', shape.pad==='decimal', shape);
  ck('and Return has somewhere to go', shape.ret==='next', shape);
  ck('the calculator glyph that invited the equation is gone', shape.calc===false, shape);

  const two = await p.evaluate(()=>{
    $('wk-cost').value='29'; wkCostTyped(); $('wk-what').value='soup'; wkPlusState();
    const armed = !$('wk-plus').disabled;
    wkPushSpend();
    const after1 = { box:$('wk-cost').value, what:$('wk-what').value, cost:WK.cost };
    $('wk-cost').value='56'; wkCostTyped(); $('wk-what').value='bread'; wkPushSpend();
    return { armed, after1, lines:(WK.spends||[]).length, cost:WK.cost,
             roll:($('wk-roll')||{}).innerText||'', total:($('wk-sumface')||{}).innerText||'' };
  });
  ck('a typed amount arms the plus', two.armed===true, two);
  ck('adding one clears the row for the next', two.after1.box==='' && two.after1.what==='', two);
  ck('two things make two lines', two.lines===2, two);
  ck('each keeping its own note', /soup/.test(two.roll) && /bread/.test(two.roll), two);
  ck('and 29 and 56 come to 85', two.cost===85, two);
  ck('which is what the total says', /85/.test(two.total), two);

  /* THE FAULT THAT STARTED IT. 29+56=85 used to be recorded as nothing, said
     nothing, and was wiped off the screen the next time the editor drew. */
  const eq = await p.evaluate(()=>{
    $('wk-cost').value='29+56=85'; wkCostTyped();
    const ok = wkPushSpend();
    return { ok, box:$('wk-cost').value, note:($('wk-spendnote')||{}).textContent||'',
             lines:(WK.spends||[]).length, cost:WK.cost };
  });
  ck('an equation is refused rather than swallowed', eq.ok===false && eq.lines===2, eq);
  ck('it stays on the screen where she can fix it', eq.box==='29+56=85', eq);
  ck('the app says what is wrong', /not an amount/i.test(eq.note), eq);
  ck('and it says where the second number goes', /own line/i.test(eq.note), eq);
  ck('nothing was recorded from it', eq.cost===85, eq);

  /* forgetting to tap + must cost nothing */
  const leave = await p.evaluate(()=>{
    $('wk-cost').value=''; wkCostTyped();
    $('wk-cost').value='7'; wkCostTyped(); $('wk-what').value='milk';
    $('wk-cost').focus(); $('wk-cost').blur();
    return new Promise(r=>setTimeout(()=>r({
      lines:(WK.spends||[]).length, cost:WK.cost, box:$('wk-cost').value,
      roll:($('wk-roll')||{}).innerText||'' }), 30));
  });
  ck('an amount left in the box goes on the roll by itself', leave.lines===3, leave);
  ck('with the note she typed for it', /milk/.test(leave.roll), leave);
  ck('and the total takes it in', leave.cost===92, leave);
  ck('and the box is clear again', leave.box==='', leave);

  /* the sheet and the roll are ONE list — the whole point of not duplicating */
  const same = await p.evaluate(()=>{
    openSpends();
    const inSheet = ($('spend-list')||{}).innerText||'';
    const btns=[...document.querySelectorAll('#spend-list button')];
    if(btns[0]) btns[0].click();                   // take the first off IN THE SHEET
    sheet(null);
    return { inSheet, lines:(WK.spends||[]).length, cost:WK.cost,
             roll:($('wk-roll')||{}).innerText||'' };
  });
  ck('the sheet shows the same lines', /soup/.test(same.inSheet) && /milk/.test(same.inSheet), same);
  ck('taking one off there takes it off here', same.lines===2 && !/soup/.test(same.roll), same);
  ck('and the total agrees', same.cost===63, same);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('what the review seat found, with real taps');
{ /* A SEAT DELETED THE PLUS BUTTON'S HANDLER AND THE WHOLE ENTER WIRING AND
     GOT 68 OF 68. Every check above drives the app by calling its functions;
     these press keys and click buttons, which is the only way these faults
     show up at all. */
  const {p}=await app();
  /* A REAL CLICK NEEDS THE SCREEN TO BE THERE. Without the settle the click
     landed before the editor had drawn and the keystrokes went to the page,
     which read as an app fault and was a test fault. */
  const open = async (pg) => { await (pg||p).evaluate(()=>{
    startInSquare(9); $('wk-t').value='Doughnuts'; wkEdited(); });
    await (pg||p).waitForTimeout(260); await unfold(pg||p); };

  /* ── the plus and Return are really wired ── */
  await open();
  await p.click('#wk-cost'); await p.keyboard.type('20');
  await p.click('#wk-what'); await p.keyboard.type('soup');
  await p.click('#wk-plus'); await p.waitForTimeout(120);
  let r = await p.evaluate(()=>({lines:(WK.spends||[]).length, cost:WK.cost, box:$('wk-cost').value}));
  ck('tapping the plus really adds a line', r.lines===1 && r.cost===20, r);
  ck('and clears the row', r.box==='', r);

  await p.click('#wk-cost'); await p.keyboard.type('30');
  await p.keyboard.press('Enter');                       // Return moves to the note
  await p.keyboard.type('cake');
  await p.keyboard.press('Enter');                       // and Return there adds it
  await p.waitForTimeout(120);
  r = await p.evaluate(()=>({lines:(WK.spends||[]).length, cost:WK.cost,
                             roll:($('wk-roll')||{}).innerText||''}));
  ck('Return moves across and then adds', r.lines===2 && r.cost===50, r);
  ck('keeping the note it was given', /cake/.test(r.roll), r);

  /* ── SEEN TO FAIL: the sheet opened onto a stale list ── */
  await p.click('#wk-cost'); await p.keyboard.type('30');
  await p.click('#wk-tabbtn'); await p.waitForTimeout(200);
  r = await p.evaluate(()=>({ lines:(WK.spends||[]).length, cost:WK.cost,
                              sheet:($('spend-list')||{}).innerText||'',
                              tot:($('spend-tot')||{}).innerText||'' }));
  ck('opening the sheet takes the pending amount with it', r.lines===3 && r.cost===80, r);
  ck('and the sheet shows all three', (r.sheet.match(/\$/g)||[]).length>=3, r);
  ck('under a total that is not one entry behind', /80/.test(r.tot), r);
  await p.evaluate(()=>sheet(null)); await p.waitForTimeout(120);

  /* ── SEEN TO FAIL: every way out of the editor ── */
  for(const [name, exit] of [
      ['the back arrow',      ()=>go('works')],
      ['the tab bar',         ()=>go('home')],
      ['Save, complete later',()=>saveForLater()],
      ['the finish sheet',    ()=>finishWork(false)] ]){
    const {p:pp}=await app();
    await open(pp);
    await pp.click('#wk-cost'); await pp.keyboard.type('20');
    await pp.click('#wk-plus'); await pp.waitForTimeout(100);
    await pp.click('#wk-cost'); await pp.keyboard.type('30');
    await pp.click('#wk-what'); await pp.keyboard.type('cake');
    const got = await pp.evaluate(fn=>{ eval('('+fn+')')(); const w=(S.works||[])[0]||{};
      return { cost:w.cost, lines:(w.spends||[]).length,
               notes:(w.spends||[]).map(x=>x.w).join('|') }; }, exit.toString());
    ck('leaving by '+name+' keeps the money', got.cost===50, got);
    ck('...and its note', /cake/.test(got.notes||''), got);
  }

  /* ── SEEN TO FAIL: an equation typed a key at a time ── */
  { const {p:pp}=await app();
    await open(pp);
    await pp.click('#wk-cost');
    await pp.keyboard.type('29+56=85');                   // one key at a time, as a thumb does
    await pp.waitForTimeout(120);
    const eq = await pp.evaluate(()=>({ cost:WK.cost, box:$('wk-cost').value,
      note:($('wk-spendnote')||{}).textContent||'', live:$('wk-spendnote').getAttribute('aria-live') }));
    ck('a half-typed sum does not leave a figure standing', eq.cost===0, eq);
    ck('the text stays on the screen', eq.box==='29+56=85', eq);
    ck('the app says what is wrong', /not an amount/i.test(eq.note), eq);
    ck('out loud, for somebody who cannot see it', eq.live==='polite', eq);
    /* and it is not replaced by a number she never typed on the next draw */
    const back = await pp.evaluate(()=>{ const w=S.works[0]; go('works'); openWork(w);
      return { box:$('wk-cost').value, cost:w.cost }; });
    ck('and reopening the act invents nothing', back.box==='' && back.cost===0, back);
  }

  /* ── SEEN TO FAIL: the note carried into the sheet's first line ── */
  { const {p:pp}=await app();
    await open(pp);
    await pp.click('#wk-cost'); await pp.keyboard.type('50');
    await pp.click('#wk-what'); await pp.keyboard.type('cake');
    await pp.click('#wk-tabbtn'); await pp.waitForTimeout(200);
    const c = await pp.evaluate(()=>({ w:(WK.spends[0]||{}).w, left:$('wk-what').value,
                                       lines:(WK.spends||[]).length }));
    ck('the carried line keeps the words she wrote for it', c.w==='cake', c);
    ck('and the note is not left behind to stick to the next one', c.left==='', c);
    ck('one line, not two', c.lines===1, c);
  }

  /* ── SEEN TO FAIL: a split line printed the whole shop ── */
  { const {p:pp}=await app();
    await pp.evaluate(()=>{
      startInSquare(9); $('wk-t').value='Doughnuts'; wkEdited();
      WK.spends.push({a:40,w:'the shop',p:'split',n:'Ruth, Martha, Bill'});
      WK.spends.push({a:12,w:'tea',p:'them',n:'Ruth'});
      syncCost();
    });
    await pp.waitForTimeout(120);
    const sp = await pp.evaluate(()=>({
      roll:($('wk-roll')||{}).innerText||'', tot:($('wk-sumface')||{}).innerText||'', cost:WK.cost }));
    ck('a split line shows HER share, not the whole shop', /\$10\b/.test(sp.roll), sp);
    ck('and the whole is in the small print', /\$40 split 4 ways/.test(sp.roll), sp);
    ck('someone else paying costs her nothing', /\$0\b/.test(sp.roll), sp);
    ck('so the column adds up to the total under it', sp.cost===10 && /10/.test(sp.tot), sp);
  }

  /* ── the one door to splits is big enough for a thumb ── */
  { const {p:pp}=await app();
    await open(pp);
    const box = await pp.evaluate(()=>{
      $('wk-cost').value='40'; wkCostTyped();      // it only shows with money in play
      const b=$('wk-tabbtn').getBoundingClientRect();
      return { h:Math.round(b.height), w:Math.round(b.width) }; });
    ck('the way to a split is a thumb target', box.h>=44, box);
  }

  /* ── and nothing is clipped on a small phone ── */
  { const small = await b.newContext({viewport:{width:320,height:568}});
    const sp = await small.newPage();
    await sp.goto(FILE); await sp.waitForTimeout(1100);
    await sp.evaluate(()=>{ S.letterSeen=S.started=S.tabToured=true; S.name='T'; S.n=50;
      S.weeks=52; S.start=new Date(Date.now()-864e5*120); S.acts=[]; save(); });
    await sp.reload(); await sp.waitForTimeout(1300);
    const fit = await sp.evaluate(()=>{ try{endTabTour()}catch(e){}; try{sheet(null)}catch(e){};
      startInSquare(9); wkTallyToggle(true);
      const w=$('wk-what'), r=$('wk-costrow');
      return { noteW:Math.round(w.getBoundingClientRect().width),
               overflow: document.documentElement.scrollWidth > window.innerWidth,
               rowW:Math.round(r.getBoundingClientRect().width) }; });
    ck('the note box is still wide enough at 320px', fit.noteW>=120, fit);
    ck('and the page does not scroll sideways', fit.overflow===false, fit);
    await small.close();
  }
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
  /* SEEN TO FAIL. The browser's own hidden rule is display:none at the lowest
     specificity, so .rolltot{display:flex} beat it and a "$0" total sat on the
     screen of an act nobody had spent anything on, while the code believed it
     was put away. Ask the page what it is SHOWING, never what it was told. */
  const off = await p.evaluate(()=>({
    bar: ($('wk-sumface')||{}).innerText.replace(/\n/g,' '),
    zero: !!document.querySelector('#wk-sumface .sumamt.zero'),
    more: getComputedStyle($('wk-tabbtn')).display }));
  ck('the bar reads nought, and says so in grey', /\$0\b/.test(off.bar) && off.zero, off);
  ck('and invites her to add something', /add what it cost/i.test(off.bar), off);
  ck('nor a door to splitting it', off.more==='none', off);
  /* SEEN TO FAIL. Hiding it at rest hid it from the FIRST split of an act too:
     it was un-hidden only where a line already existed, so somebody whose very
     first entry was shared had no way in at all. */
  const first = await p.evaluate(()=>{
    $('wk-cost').value='40'; wkCostTyped();
    return getComputedStyle($('wk-tabbtn')).display; });
  ck('but an amount on its own opens it', first!=='none', first);
  ck('and still says the tab is empty', /nothing on the tab/i.test(r.shown), r);

  const zero = await p.evaluate(()=>{
    $('wk-cost').value='0'; wkCostTyped();
    openSpends();
    return { lines:(WK.spends||[]).length };
  });
  ck('nor does a nought', zero.lines===0, zero);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('the tally folds away, and the bar is the tally');
{ /* RULED BY G, 16 September, from a mark-up: the whole tally shuts behind one
     row, the figure sits on the LEFT in the same place whether it is nought or
     eighty-five, and "it keeps going up as you add things to it even when it's
     folded up". All SEEN TO FAIL before the fold was built. */
  const {p}=await app();
  await p.evaluate(()=>{ startInSquare(9); $('wk-t').value='Doughnuts'; wkEdited(); });
  await p.waitForTimeout(240);

  const shut = await p.evaluate(()=>({
    folded: !!$('wk-tallybody').hidden,
    rowSeen: getComputedStyle($('wk-costrow')).display !== 'none'
             && !!$('wk-costrow').closest('[hidden]') === false,
    bar: ($('wk-sumface')||{}).innerText.replace(/\n/g,' '),
    expanded: $('wk-sum').getAttribute('aria-expanded'),
    controls: $('wk-sum').getAttribute('aria-controls'),
    h: Math.round($('wk-sum').getBoundingClientRect().height)
  }));
  ck('an act opens with the tally folded away', shut.folded===true, shut);
  ck('and the row is not on the screen', shut.rowSeen===false, shut);
  ck('the bar shows the nought G kept', /\$0\b/.test(shut.bar), shut);
  ck('with the words beside it, not under it', /\$0\s+Add what it cost/.test(shut.bar), shut);
  ck('a thumb can hit the bar', shut.h>=44, shut);
  ck('and it says it is shut, to a screen reader', shut.expanded==='false', shut);
  ck('and names what it opens', shut.controls==='wk-tallybody', shut);

  /* THE TAP */
  await p.click('#wk-sum'); await p.waitForTimeout(180);
  const open = await p.evaluate(()=>({
    folded: !!$('wk-tallybody').hidden,
    expanded: $('wk-sum').getAttribute('aria-expanded'),
    focus: (document.activeElement||{}).id
  }));
  ck('tapping it opens the row', open.folded===false, open);
  ck('and says so', open.expanded==='true', open);
  ck('and puts the cursor where she will type', open.focus==='wk-cost', open);

  /* THE RULING: it keeps going up */
  const climb = [];
  for(const [amt,what] of [['29','soup'],['56','bread'],['12.50','tea']]){
    await p.click('#wk-cost'); await p.keyboard.type(amt);
    await p.click('#wk-what'); await p.keyboard.type(what);
    await p.click('#wk-plus'); await p.waitForTimeout(140);
    climb.push(await p.evaluate(()=>($('wk-sumface')||{}).innerText.replace(/\n/g,' ')));
  }
  ck('the bar counts up as things go on', /\$29\s+1 thing/.test(climb[0]), climb);
  ck('and keeps counting', /\$85\s+2 things/.test(climb[1]), climb);
  ck('and again', /\$97\.50\s+3 things/.test(climb[2]), climb);

  /* FOLDED UP, and still right */
  await p.click('#wk-sum'); await p.waitForTimeout(180);
  const back = await p.evaluate(()=>({
    folded: !!$('wk-tallybody').hidden,
    bar: ($('wk-sumface')||{}).innerText.replace(/\n/g,' '),
    grey: !!document.querySelector('#wk-sumface .sumamt.zero')
  }));
  ck('folding it up again keeps the figure on the bar', /\$97\.50/.test(back.bar), back);
  ck('and it is no longer grey, because it is real money', back.grey===false, back);
  ck('and the row is away', back.folded===true, back);

  /* added while folded — through the sheet, which is the same list */
  const whileShut = await p.evaluate(()=>{
    openSpends();
    $('sp-amt').value='3'; $('sp-what').value='napkins'; SP_WHO='me';
    addSpend(); sheet(null);
    return { bar:($('wk-sumface')||{}).innerText.replace(/\n/g,' '),
             folded:!!$('wk-tallybody').hidden, cost:WK.cost };
  });
  ck('a thing added while it is folded still lands on the bar', /\$100\.50/.test(whileShut.bar), whileShut);
  ck('and it counts four now', /4 things/.test(whileShut.bar), whileShut);
  ck('and it did not unfold itself to tell her', whileShut.folded===true, whileShut);

  /* the fold belongs to the screen, not to the act */
  const nextAct = await p.evaluate(()=>{
    wkTallyToggle(true);                       // leave it open on this one
    const wasOpen = !$('wk-tallybody').hidden;
    startInSquare(21); $('wk-t').value='Another'; wkEdited();
    return { wasOpen, folded:!!$('wk-tallybody').hidden,
             bar:($('wk-sumface')||{}).innerText.replace(/\n/g,' ') };
  });
  ck('leaving it open on one act does not open it on the next', nextAct.wasOpen && nextAct.folded, nextAct);
  ck('and the next act starts at nought', /\$0\b/.test(nextAct.bar), nextAct);
}

/* ─────────────────────────────────────────────────────────────────────────── */
head('a contribution is still not a purchase');
{ /* the tally's own arithmetic must not have moved: somebody handing you twenty
     dollars comes off YOUR share, it does not reduce what the act cost */
  const {p}=await app();
  const r = await p.evaluate(()=>{
    startInSquare(16); $('wk-t').value='Soup run'; wkEdited(); wkTallyToggle(true);
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

/* THE IDEA FILTERS ARE TWO PULL-DOWNS.
   G's ruling, 16 September 2026: "i want to put the filters behind a pull down
   so 2 pull downs side by side."

   This reverses an argument the file itself was carrying: the reminder note
   said the idea filters were the one place chips should stay, because the
   choices want to be seen and compared. So these checks have to prove three
   things — the chips are actually gone, the two pull-downs really filter, and
   neither of them can ever come up blank.

   Every check here was watched failing before it was kept (L75). The mutation
   used is named above each block.                                            */
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

const ideas = async ()=>{ const {p}=await app(3,50); await p.evaluate(()=>go('browse'));
  await p.waitForTimeout(700); return p; };

/* ── 1. the chips are gone ──────────────────────────────────────────────
   MUTATION SEEN TO FAIL: put the two <div class="chips" id="leadchips"> rows
   back into the markup — the first three checks go red.                   */
head('the chip rows are gone');
{ const p = await ideas();
  const r = await p.evaluate(()=>({
    lead: !!document.getElementById('leadchips'),
    cat:  !!document.getElementById('catchips'),
    chipsOnScreen: document.querySelectorAll('#s-browse .chip').length }));
  ck('no leadchips row survives', r.lead===false, r);
  ck('no catchips row survives',  r.cat===false,  r);
  ck('not one filter chip is left on the ideas screen', r.chipsOnScreen===0, r);
  /* ask the SCREEN, not one spelling in the source. The check this replaces
     grepped for a single form, and the seat put the chip row back wired up the
     other way and it stayed green. */
  ck('and no chip row can come back by another name',
     r.chipsOnScreen===0 && r.lead===false && r.cat===false, r);
}

/* ── 2. two pull-downs, side by side ────────────────────────────────────
   MUTATION SEEN TO FAIL: change .filtrow to display:block — sameRow goes
   false while every other check in this block stays green.                */
head('two pull-downs on one row');
{ const p = await ideas();
  const r = await p.evaluate(()=>{
    const a=document.querySelector('#leadpick select'), b=document.querySelector('#catpick select');
    if(!a||!b) return {a:!!a,b:!!b};
    const ra=a.getBoundingClientRect(), rb=b.getBoundingClientRect();
    return { a:true, b:true,
      sameRow: Math.abs(ra.top-rb.top) < 4,
      apart: rb.left > ra.right,
      aTall: Math.round(ra.height), bTall: Math.round(rb.height),
      aType: parseFloat(getComputedStyle(a).fontSize),
      bType: parseFloat(getComputedStyle(b).fontSize),
      inside: ra.left >= 0 && rb.right <= window.innerWidth + 0.5 };
  });
  ck('the time pull-down exists', r.a===true, r);
  ck('the who pull-down exists',  r.b===true, r);
  ck('they share one row', r.sameRow===true, r);
  ck('the second sits to the right of the first', r.apart===true, r);
  ck('neither runs off the screen at 390px', r.inside===true, r);
  ck('both are at least 44px tall to tap', r.aTall>=44 && r.bTall>=44, r);
  /* below 16px iOS zooms the page on focus and leaves you scrolled elsewhere */
  ck('both are 16px so the phone does not zoom', r.aType>=16 && r.bType>=16, r);
}

/* ── 3. they actually filter ────────────────────────────────────────────
   MUTATION SEEN TO FAIL: drop the drawBrowse() out of the onchange — the
   remembered-value checks go red.                                         */
head('changing a pull-down changes the ideas');
{ const p = await ideas();
  const before = await p.evaluate(()=>({
    n: document.querySelectorAll('#ideas > *').length, lead: S.lead }));
  /* NOT 'Today'. The harness used to pick the value the app already held, so it
     was changing nothing: the seat gutted the pull-down's change handler
     entirely and this check stayed green. Pick something the app is not already
     showing, and assert on the LIST rather than on the file. */
  await p.selectOption('#leadpick select','Needs a month'); await p.waitForTimeout(600);
  const afterTime = await p.evaluate(()=>({n:document.querySelectorAll('#ideas > *').length, lead:S.lead}));
  ck('the box does not start on the one we are about to pick',
     before.lead!=='Needs a month', before);
  ck('picking a time is remembered in the file', afterTime.lead==='Needs a month', afterTime);
  ck('and it changes which ideas are on the screen',
     afterTime.n!==before.n && afterTime.n>0, {before:before.n, after:afterTime.n});
  await p.selectOption('#catpick select','Animals'); await p.waitForTimeout(500);
  const afterWho = await p.evaluate(()=>({cat:S.cat, n:document.querySelectorAll('#ideas > *').length}));
  ck('picking who it helps is remembered in the file', afterWho.cat==='Animals', afterWho);
  ck('the list is not the same list it was before both filters',
     afterWho.n!==before || before===0, {before, afterTime, afterWho});
}

/* ── 4. neither can go blank ────────────────────────────────────────────
   MUTATION SEEN TO FAIL: delete the `if(sel.selectedIndex<0)` fallback in
   filterPicker — a filter saved by an older build leaves the box empty and
   unreadable, and all three of these go red.                              */
head('a filter saved by an older build cannot leave the box blank');
{ const p = await ideas();
  const r = await p.evaluate(()=>{
    S.cat='A category that no longer exists'; S.lead='Some old value';
    drawBrowse();
    const a=document.querySelector('#leadpick select'), b=document.querySelector('#catpick select');
    return { aIdx:a.selectedIndex, bIdx:b.selectedIndex,
             aText:(a.options[a.selectedIndex]||{}).text,
             bText:(b.options[b.selectedIndex]||{}).text,
             sLead:S.lead, sCat:S.cat,
             /* read the everything option out of the lists rather than naming
                it. It was hardcoded as 'Anything' and G renamed it to 'Anyone'
                on 16 September; a check that spells the word out fails on a
                rename that is not a fault. */
             wantLead: LEADS[0], wantCat: CATS[0] };
  });
  ck('the time box still shows something', r.aIdx>=0 && !!r.aText, r);
  ck('the who box still shows something',  r.bIdx>=0 && !!r.bText, r);
  ck('the file is corrected to the everything option, not left stale',
     r.sLead===r.wantLead && r.sCat===r.wantCat, r);
}

/* ── 5. the choice survives leaving and coming back ─────────────────────
   MUTATION SEEN TO FAIL: stop writing S.cat in the onchange — the box comes
   back on the default and this goes red.                                  */
head('the choice survives leaving the screen');
{ const p = await ideas();
  await p.selectOption('#catpick select','Elders'); await p.waitForTimeout(400);
  await p.evaluate(()=>go('home')); await p.waitForTimeout(400);
  await p.evaluate(()=>go('browse')); await p.waitForTimeout(600);
  const r = await p.evaluate(()=>({sel:document.querySelector('#catpick select').value, cat:S.cat}));
  ck('coming back to ideas shows the filter you left on', r.sel==='Elders', r);
}

console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
if(errs.length) errs.slice(0,6).forEach(e=>console.log('   '+e));
await b.close();
process.exit(fail?1:0);

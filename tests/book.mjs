/* K6A — the book is 8.5 x 8.5. `.bpage` is overflow:hidden, so a page that no
   longer fits loses its words with no error at all. This measures every page of
   a full year against its own box.                                            */
/* Runs anywhere. It used to hardcode two paths that exist only inside one cloud
   machine, which meant the battery survived a session and could not be started
   by the person who owns it — worse than the problem it was written to fix,
   because it looked solved.

     cd /d "C:\\Users\\tony\\Documents\\aog-push" && npm i -D playwright && npx playwright install chromium
     cd /d "C:\\Users\\tony\\Documents\\aog-push" && node tests/book.mjs

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
const ctx = await b.newContext({ viewport:{width:390,height:844} });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.message));
await p.goto(FILE); await p.waitForTimeout(1200);
let pass=0, fail=0;
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };

await p.evaluate(()=>{
  S.letterSeen=S.started=S.tabToured=S.ideasNudged=true;
  S.name='Tony'; S.bday='1973-06-01'; S.n=50; S.weeks=52;
  S.why='to mark turning fifty by doing fifty good things, one at a time, for a year';
  S.start=new Date(Date.now()-1000*60*60*24*300);
  S.zero={no:'0',zero:true,d:'2026-03-14',t:'The year begins',posted:{},captions:{}};
  const long='We got there just after seven and the place was already full. '.repeat(9);
  S.acts=[];
  for(let i=1;i<=50;i++) S.acts.push({ no:String(i),
    t: i%4===0 ? 'A deliberately long title that runs past one line and keeps going for a while yet'
               : 'Act number '+i,
    d:'2026-'+String((i%12)+1).padStart(2,'0')+'-'+String((i%28)+1).padStart(2,'0'),
    st: i%3===0 ? long : 'Something short happened.',
    people:i%2?['Jessica','Ginger','Kate']:[], posted:{}, captions:{}, spend:[], photos:[] });
  S.lineTouched=S.wordTouched=false; try{syncReason();}catch(e){}
  save();
});
const geo = await p.evaluate(()=>{
  const cs=getComputedStyle(document.documentElement);
  return { w:cs.getPropertyValue('--bookw').trim(), h:cs.getPropertyValue('--bookh').trim() };
});
ck('the book is square', geo.w===geo.h && geo.w==='8.5in', geo);

await p.evaluate(()=>{ try{ printJournal(true); }catch(e){} });
await p.waitForTimeout(2500);
const pages = await p.evaluate(()=>{
  const bk=document.getElementById('book'); if(!bk) return null;
  bk.style.display='block';
  const out=[];
  bk.querySelectorAll('.bpage').forEach((el,i)=>{
    out.push({ i:i, over: el.scrollHeight - el.clientHeight,
               w: el.clientWidth, h: el.clientHeight,
               kind: (el.className||'').replace('bpage','').trim() || 'act' });
  });
  bk.style.display='none';
  return out;
});
if(!pages){ console.log('  FAIL  no book was built'); fail++; }
else {
  ck('the book has pages', pages.length>10, pages.length);
  ck('every page is square', pages.every(x=>Math.abs(x.w-x.h)<3), pages.slice(0,2));
  const bad = pages.filter(x=>x.over>1);
  ck('no page clips its words', bad.length===0,
     bad.slice(0,6).map(x=>'page '+x.i+' ('+x.kind+') overflows by '+x.over+'px'));
}
console.log('\n'+pass+' passed, '+fail+' failed, page errors: '+errs.length);
await b.close();
process.exit(fail?1:0);

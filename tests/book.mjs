/* K6A — the book is 8.5 x 8.5. `.bpage` is overflow:hidden, so a page that no
   longer fits loses its words with no error at all. This measures every page of
   a full year against its own box.

   TWO FAULTS OF ITS OWN, FIXED 15 Sep 2026.

   1. IT SEEDED THE WRONG FIELD NAMES. It wrote `st`, `people` and an empty
      `photos` onto every act; the book reads `story`, `who` and `photos`. So
      every page it measured carried a title, a date and nothing else, and the
      long story it was built to stress never reached the paper. A test that
      passes on blank pages is a document, not a measurement.

   2. IT MEASURED THE HALF `scrollHeight` CAN SEE. A centred page spills at both
      ends and `scrollHeight` only ever reveals what runs off the bottom — the
      same blind spot the book's own fitter had until 5M. It walks the children's
      boxes now, exactly as `fitBook` does.

   And the page the review named and nobody had ever built: an act with FOUR
   photographs, a long story, a long title and an honour line. It is the tallest
   page the book makes.

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
  /* a real picture, so the photo rows have height. Four of these on one page is
     the tallest thing the book ever has to hold. */
  const PIC = 'data:image/svg+xml;base64,' + btoa(
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">'+
    '<rect width="1200" height="900" fill="#EC9C90"/></svg>');
  const long = 'We got there just after seven and the place was already full. '.repeat(9);
  const longer = 'We got there just after seven and the place was already full. '.repeat(16);
  S.acts=[];
  for(let i=1;i<=50;i++){
    const heavy = i%5===0;                 // the page the review named
    S.acts.push({ no:String(i),
      t: i%4===0
        ? 'A deliberately long title that runs past one line and keeps going for a while yet'
        : 'Act number '+i,
      d:'2026-'+String((i%12)+1).padStart(2,'0')+'-'+String((i%28)+1).padStart(2,'0'),
      /* THE REAL FIELD NAMES. `st` and `people` were read by nothing. */
      story: heavy ? longer : (i%3===0 ? long : 'Something short happened.'),
      who: i%2 ? ['Jessica','Ginger','Kate','Jenny Seck Watkins'] : [],
      /* DISTINCT names, or the roll groups to one and never paginates \u2014 which
         is how the pagination check used to pass on a single name. Nineteen fit
         a page, so twenty-five forces a second. */
      hon: i<=25 ? ('Honoured person number '+i) : '',
      posted:{}, captions:{}, spends:[],
      /* four, two, one and none \u2014 the two-photo page had never been built,
         and it was printing two tall slivers of a landscape photograph */
      photos: heavy ? [0,1,2,3].map(k=>({id:'t'+i+'-'+k, url:PIC}))
            : i%5===2 ? [0,1].map(k=>({id:'d'+i+'-'+k, url:PIC}))
            : i%7===0 ? [{id:'s'+i, url:PIC}] : [] });
  }
  S.lineTouched=S.wordTouched=false; try{syncReason();}catch(e){}
  save();
});
const geo = await p.evaluate(()=>{
  const cs=getComputedStyle(document.documentElement);
  return { w:cs.getPropertyValue('--bookw').trim(), h:cs.getPropertyValue('--bookh').trim() };
});
ck('the book is square', geo.w===geo.h && geo.w==='8.5in', geo);

await p.evaluate(()=>{ try{ printJournal(true); }catch(e){} });
await p.waitForTimeout(3500);
const pages = await p.evaluate(()=>{
  const bk=document.getElementById('book'); if(!bk) return null;
  const prev = bk.style.display;
  bk.style.display='block';
  /* THE SAME MEASURE THE BOOK'S OWN FITTER USES. scrollHeight reveals only what
     runs off the BOTTOM; a centred page spills at both ends. */
  const spill = g => {
    const box = g.getBoundingClientRect();
    const cs = getComputedStyle(g);
    const padT = parseFloat(cs.paddingTop) || 0, padB = parseFloat(cs.paddingBottom) || 0;
    let top = Infinity, bot = -Infinity;
    g.querySelectorAll(':scope > *').forEach(ch=>{
      if(ch.classList.contains('bplate')) return;
      const r = ch.getBoundingClientRect();
      if(!r.height && !r.width) return;
      if(r.top < top) top = r.top;
      if(r.bottom > bot) bot = r.bottom;
    });
    if(top === Infinity) return { up:0, down:0 };
    return { up: Math.round(Math.max(0, (box.top + padT) - top)),
             down: Math.round(Math.max(0, bot - (box.bottom - padB))) };
  };
  const out=[];
  bk.querySelectorAll('.bpage').forEach((el,i)=>{
    const sp = spill(el);
    out.push({ i:i, over: el.scrollHeight - el.clientHeight,
               up: sp.up, down: sp.down,
               shots: el.querySelectorAll('.bshots img').length,
               /* every cell's shape, so a block that is the wrong height for its
                  count is caught rather than merely fitting */
               cells: [...el.querySelectorAll('.bshots img')].map(im=>{
                 const r=im.getBoundingClientRect();
                 return r.height ? +(r.width/r.height).toFixed(2) : 0; }),
               story: (el.querySelector('.bstory')||{}).textContent ? 1 : 0,
               names: el.querySelectorAll('.bhonlist li, .bhonlist div').length,
               w: el.clientWidth, h: el.clientHeight,
               kind: (el.className||'').replace(/\bbpage\b/,'').replace(/\bs[1-5]\b/g,'').trim() || 'act' });
  });
  bk.style.display=prev;
  return out;
});
if(!pages){ console.log('  FAIL  no book was built'); fail++; }
else {
  ck('the book has pages', pages.length>10, pages.length);
  ck('every page is square', pages.every(x=>Math.abs(x.w-x.h)<3), pages.slice(0,2));

  /* the seed actually reached the paper — the fault this file had.
     EXACT counts: every one of the fifty acts is seeded with a story, and
     i%5===0 gives ten photo-heavy pages. `>= 20` and `>= 8` let two pages lose
     their photographs in silence. */
  const withStory = pages.filter(x=>x.story).length;
  ck('every act page carries its story', withStory === 50, withStory);
  const heavy = pages.filter(x=>x.shots>=4);
  ck('all ten photo-heavy pages are built', heavy.length === 10, heavy.length);
  const pair = pages.filter(x=>x.shots===2);
  ck('and the two-photograph pages', pair.length === 10, pair.length);

  const bad = pages.filter(x=>x.over>1 || x.up>1 || x.down>1);
  ck('no page clips its words', bad.length===0,
     bad.slice(0,6).map(x=>'page '+x.i+' ('+x.kind+') spills up '+x.up+
                          ' down '+x.down+' scroll '+x.over));
  const badHeavy = heavy.filter(x=>x.up>1 || x.down>1);
  ck('the photo-heavy page fits', badHeavy.length===0,
     badHeavy.slice(0,4).map(x=>'page '+x.i+' up '+x.up+' down '+x.down));

  /* NO PHOTOGRAPH IS PRINTED AS A SLIVER. A landscape picture crushed into a
     tall cell loses its sides to object-fit:cover, which is what a block shaped
     for four does to two. Nothing should be narrower than square. */
  const slivers = pages.filter(x=>x.cells.some(r=>r>0 && r<0.95));
  ck('no photograph is printed as a sliver', slivers.length===0,
     slivers.slice(0,4).map(x=>'page '+x.i+' shots '+x.shots+' ratios '+x.cells.join(' ')));

  /* the roll paginates — twenty-five distinct names cannot fit one page, and
     every one of them must be printed. This used to pass on ONE name. */
  const rollPages = pages.filter(x=>x.names>0);
  const rolled = rollPages.reduce((n,x)=>n+x.names,0);
  ck('the honour roll runs to more than one page', rollPages.length >= 2, rollPages.length);
  ck('and prints every name', rolled === 25, rolled);
}
ck('no page errors', errs.length===0, errs.slice(0,3));
console.log('\n'+pass+' passed, '+fail+' failed, page errors: '+errs.length);
await b.close();
process.exit(fail?1:0);

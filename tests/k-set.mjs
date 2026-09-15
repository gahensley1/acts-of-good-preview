/* The K rulings of 14 September 2026.
   K2B the date on the card (and S2A: the preview must match) · K3A closed ·
   K5 the logo on the book's first and last pages · K6A the square book.     */
import pw from '/opt/node-tools/node_modules/playwright/index.js';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const { chromium } = pw;
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
let pass=0, fail=0; const errs=[];
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };
const head=t=>console.log('\n== '+t+' ==');
async function seeded(){
  const ctx=await b.newContext({viewport:{width:390,height:844}});
  const p=await ctx.newPage();
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  p.on('pageerror',e=>errs.push('pageerror: '+e.message));
  await p.goto(FILE); await p.waitForTimeout(1200);
  await p.evaluate(()=>{
    S.letterSeen=S.started=S.tabToured=S.ideasNudged=true;
    S.name='Tony';S.bday='1973-06-01';S.n=50;S.weeks=52;S.why='to test';
    S.start=new Date(Date.now()-1000*60*60*24*120);
    S.zero={no:'0',zero:true,d:'2026-03-14',t:'begins',posted:{},captions:{}};
    S.acts=[];for(let i=1;i<=11;i++)S.acts.push({no:String(i),t:'Act '+i,
      d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]});
    S.lineTouched=S.wordTouched=false;try{syncReason();}catch(e){}save();});
  await p.reload(); await p.waitForTimeout(1400);
  await p.evaluate(()=>{try{endTabTour();}catch(e){}try{sheet(null);}catch(e){}});
  return {ctx,p};
}

head('K2B — the date on the card');
{ const {ctx,p}=await seeded();
  const r=await p.evaluate(()=>{
    const a=S.acts[10];
    return { line: cardDateLine(a), none: cardDateLine({no:'1'}),
             zero: cardDateLine(S.zero) };
  });
  ck('the date reads month first, matching the square and the journal',
     r.line==='September 5, 2026', r);
  ck('an act with no date gets no line', r.none==='', r);

  const prev=await p.evaluate(()=>{
    S.current=S.acts[10]; go('card'); try{drawCardScreen&&drawCardScreen();}catch(e){}
    const el=document.getElementById('cd-act');
    const d=el?el.querySelector('.actdate'):null;
    return { act: el?el.firstChild.textContent.trim():null,
             date: d?d.textContent:null };
  });
  ck('the preview shows the count', prev.act==='act 11 of 50', prev);
  ck('the preview shows the date under it', prev.date==='September 5, 2026', prev);

  /* S2A: the posted file and the preview must agree. Read the pixels of the
     bottom band of the rendered card and confirm something coral is drawn
     below the act line, where the date goes. */
  const drawn=await p.evaluate(async ()=>{
    const c=await renderCard(S.acts[10],1080); const g=c.getContext('2d');
    const band=g.getImageData(0, Math.floor(1080*0.855), 1080, Math.floor(1080*0.06)).data;
    let coral=0;
    for(let i=0;i<band.length;i+=4)
      if(band[i]>180 && band[i+1]<160 && band[i+2]<150) coral++;
    const c2=await renderCard({no:'7',t:'x',posted:{},captions:{},photos:[]},1080);
    const g2=c2.getContext('2d');
    const band2=g2.getImageData(0, Math.floor(1080*0.855), 1080, Math.floor(1080*0.06)).data;
    let coral2=0;
    for(let i=0;i<band2.length;i+=4)
      if(band2[i]>180 && band2[i+1]<160 && band2[i+2]<150) coral2++;
    return {withDate:coral, without:coral2};
  });
  ck('the posted card draws the date too (S2A: preview = post)',
     drawn.withDate>300 && drawn.without===0, drawn);

  const zc=await p.evaluate(async ()=>{
    const c=await renderCard(S.zero,1080); const g=c.getContext('2d');
    const band=g.getImageData(0, Math.floor(1080*0.70), 1080, Math.floor(1080*0.29)).data;
    let ink=0;
    for(let i=0;i<band.length;i+=4) if(band[i]<245||band[i+1]<245||band[i+2]<245) ink++;
    return ink; });
  ck('the declaration card still carries nothing below the artwork (K4A)', zc===0, zc);
  await ctx.close(); }

head('S9B — the backup offer really can come back');
{ const {ctx,p}=await seeded();
  const r=await p.evaluate(()=>{
    /* the exact branch that threw in 5J: the nudge is up, so the bar defers */
    const n=document.getElementById('calnudge'); if(n) n.classList.add('on');
    let threw=null;
    try{ bkupBar(); }catch(e){ threw=String(e.message||e); }
    return { threw, deferred: !document.getElementById('bkupbar').classList.contains('on'),
             named: typeof bkupBar==='function', wrong: typeof showBkupBar };
  });
  ck('the deferral does not throw', r.threw===null, r);
  ck('the bar holds back while the nudge is up', r.deferred===true, r);
  ck('the name it retries with actually exists', r.named===true, r);
  await ctx.close(); }

head('K5 — the logo opens and closes the book');
{ const {ctx,p}=await seeded();
  await p.evaluate(()=>{ try{ printJournal(true); }catch(e){} });
  await p.waitForTimeout(2600);
  const r=await p.evaluate(()=>{
    const bk=document.getElementById('book'); if(!bk) return null;
    const pages=[...bk.querySelectorAll('.bpage')];
    const marks=[...bk.querySelectorAll('.bmark')];
    const first=pages[0], last=pages[pages.length-1];
    return { pages:pages.length, marks:marks.length,
             onFirst: !!(first&&first.querySelector('.bmark')),
             onLast: !!(last&&last.querySelector('.bmark')),
             onMiddle: pages.slice(1,-1).some(x=>!!x.querySelector('.bmark')),
             isLogo: marks.length? marks[0].getAttribute('src').slice(0,14) : null };
  });
  ck('the book has a mark on its first page', r && r.onFirst===true, r);
  ck('and on its last page', r && r.onLast===true, r);
  ck('and on no other page', r && r.onMiddle===false, r);
  ck('exactly two of them', r && r.marks===2, r);
  ck('it is the real artwork, not a drawing of it',
     r && /^data:image\/web/.test(r.isLogo||''), r && r.isLogo);
  await ctx.close(); }

console.log('\n'+pass+' passed, '+fail+' failed, console errors: '+errs.length);
if(errs.length) console.log(JSON.stringify(errs.slice(0,5),null,1));
await b.close();
process.exit(fail?1:0);

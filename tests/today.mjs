/* RULED BY G 25 SEPTEMBER 2026 (build 7X). The month card no longer lists the
   month's acts (the grid shows them); it says what day it really is. And an
   occasion's act reads "One way to mark it". */
import pw0 from '/opt/node-tools/node_modules/playwright/index.js';
import { pathToFileURL } from 'node:url'; import path from 'node:path';
const pw = pw0.default || pw0;
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;
const b = await pw.chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
let pass=0, fail=0; const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };
async function open(dateISO, acts){
  const c = await b.newContext({viewport:{width:390,height:844}});
  const p = await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(d=>{ const R=Date; const off=new R(d).getTime()-R.now();
    class F extends R{ constructor(...a){ super(...(a.length?a:[R.now()+off])); } static now(){ return R.now()+off; } }
    window.Date=F; }, dateISO);
  await p.goto(FILE); await p.waitForTimeout(700);
  await p.evaluate(a=>{ S.letterSeen=S.started=S.tabToured=S.ideasNudged=true; S.name='T'; S.n=25; S.weeks=52; S.why='x'; S.turning=50;
    S.start=new Date(Date.now()-864e5*40); S.zero={no:'0',zero:true,d:'2026-08-14',t:'begins',posted:{},captions:{}};
    S.acts=a.map((d,i)=>({no:String(i+1),t:'Act '+(i+1),d:d,st:'s',people:[],posted:{},captions:{},spend:[],photos:[]})); save(); }, acts);
  await p.reload(); await p.waitForTimeout(700);
  await p.evaluate(()=>{ try{endTabTour();}catch(e){} try{sheet(null);}catch(e){} });
  return {c,p,errs};
}
console.log('\n== the month card ==');
{ const {c,p,errs} = await open('2026-09-25T10:00:00', ['2026-09-12','2026-09-15','2026-09-17']);
  const m = await p.evaluate(()=>({ rows: $('month').querySelectorAll(':scope > div[style*="border-top"]').length,
    big: $('month').querySelector('.big').textContent.trim(), today: ($('month').querySelector('.mtoday')||{}).textContent,
    cal: !!$('calbtn'), tiles: document.querySelectorAll('[id^="tile-"]').length }));
  ck('no list of acts under the month', m.rows===0, m);
  ck('still says September · 3 acts', /September\s*·\s*3 acts/.test(m.big), m);
  ck('says what day it really is', m.today==='Today is Friday, September 25', m);
  ck('the calendar button is still there', m.cal, m);
  const lab = await p.evaluate(()=>/This month/.test($('month').textContent));
  ck('the words This month are gone', !lab, lab);
  const occ = await p.evaluate(()=>$('sug-act').textContent);
  ck('an occasion reads One way to mark it', /^One way to mark it: /.test(occ), occ);
  ck('no page errors', errs.length===0, errs);
  await c.close(); }
{ const {c,p} = await open('2026-10-02T08:00:00', []);
  const m = await p.evaluate(()=>({ today: ($('month').querySelector('.mtoday')||{}).textContent, big: $('month').querySelector('.big').textContent.trim() }));
  ck('another day, another date', m.today==='Today is Friday, October 2', m);
  await c.close(); }
console.log(`\n${pass} ok, ${fail} failed`);
await b.close(); process.exit(fail?1:0);

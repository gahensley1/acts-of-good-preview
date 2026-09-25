/* DOLLY DAY, RULED BY G 25 SEPTEMBER 2026 (build 7W).
   On 25 September the idea box dresses for the day and pink hearts fly out of
   it like the butterflies. Any other day, nothing changes. */
import pw0 from '/opt/node-tools/node_modules/playwright/index.js';
import { pathToFileURL } from 'node:url'; import path from 'node:path';
const pw = pw0.default || pw0;
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;
const b = await pw.chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
let pass=0, fail=0; const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };
async function open(dateISO, rm){
  const c = await b.newContext({viewport:{width:390,height:844}, reducedMotion: rm?'reduce':'no-preference'});
  const p = await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(d=>{ const R=Date; const off=new R(d).getTime()-R.now();
    class F extends R{ constructor(...a){ super(...(a.length?a:[R.now()+off])); } static now(){ return R.now()+off; } }
    window.Date=F; }, dateISO);
  await p.goto(FILE); await p.waitForTimeout(700);
  await p.evaluate(()=>{ S.letterSeen=S.started=S.tabToured=S.ideasNudged=true; S.name='T'; S.n=50; S.weeks=52; S.why='x'; S.turning=50;
    S.start=new Date(Date.now()-864e5*100); S.zero={no:'0',zero:true,d:'2026-06-14',t:'begins',posted:{},captions:{}};
    S.acts=[{no:'1',t:'Act 1',d:'2026-09-05',st:'s',people:[],posted:{},captions:{},spend:[],photos:[]}]; save(); });
  await p.reload(); await p.waitForTimeout(600);
  await p.evaluate(()=>{ try{endTabTour();}catch(e){} try{sheet(null);}catch(e){} document.querySelector('.sugbox').scrollIntoView({block:'center'}); });
  return {c,p,errs};
}
console.log('\n== on 25 September ==');
{ const {c,p,errs} = await open('2026-09-25T10:00:00');
  const i = await p.evaluate(()=>({dly:document.querySelector('.sugbox').classList.contains('dly'), tag:$('sug-tag').textContent, t:$('sug-title').textContent, act:$('sug-act').textContent}));
  ck('the box is dressed for the day', i.dly, i);
  ck('it says Today · 9/25', i.tag==='Today · 9/25', i);
  ck('its name is Dolly Day', i.t==='Dolly Day', i);
  ck('it brings the book act', /Little Free Library/.test(i.act), i);
  await p.waitForTimeout(1400);
  const f = await p.evaluate(()=>({up:$('actcf').classList.contains('up'), pink:AC_FILL, n:AC_PARTS.length+AC_QUEUE.length}));
  ck('pink hearts fly out of it on opening', f.up && f.pink==='#F06EA9' && f.n>0, f);
  await p.waitForTimeout(9000);
  const g = await p.evaluate(()=>({up:$('actcf').classList.contains('up'), pink:AC_FILL}));
  ck('and then they are gone and the colour is put back', !g.up && g.pink===null, g);
  await p.evaluate(()=>$('sug-title').click()); await p.waitForTimeout(500);
  const h = await p.evaluate(()=>({up:$('actcf').classList.contains('up'), pink:AC_FILL}));
  ck('tapping the name sends them again', h.up && h.pink==='#F06EA9', h);
  ck('no page errors', errs.length===0, errs);
  await c.close(); }
console.log('\n== any other day ==');
{ const {c,p,errs} = await open('2026-10-02T10:00:00');
  const i = await p.evaluate(()=>({dly:document.querySelector('.sugbox').classList.contains('dly'), gems:document.querySelectorAll('.dly-gem').length}));
  ck('the box is plain', !i.dly && i.gems===0, i);
  await c.close(); }
{ const {c,p,errs} = await open('2026-09-20T10:00:00');
  const i = await p.evaluate(()=>({dly:document.querySelector('.sugbox').classList.contains('dly'), tag:$('sug-tag').textContent, t:$('sug-title').textContent}));
  ck('five days before it is an ordinary occasion, counting down', !i.dly && /in 5 days/.test(i.tag) && i.t==='Dolly Day', i);
  await c.close(); }
console.log('\n== reduced motion ==');
{ const {c,p,errs} = await open('2026-09-25T10:00:00', true);
  await p.waitForTimeout(1600);
  const f = await p.evaluate(()=>({dly:document.querySelector('.sugbox').classList.contains('dly'), up:$('actcf').classList.contains('up')}));
  ck('still dressed, but nothing flies', f.dly && !f.up, f);
  await c.close(); }
console.log(`\n${pass} ok, ${fail} failed`);
await b.close(); process.exit(fail?1:0);

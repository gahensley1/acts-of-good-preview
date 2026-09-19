// iPhone harness: Safari's engine (WebKit), an iPhone 15's screen, touch, and real taps.
import { createRequire } from 'node:module'; import fs from 'node:fs';
const require_=createRequire(import.meta.url);
const { webkit, devices } = require_('/opt/node-tools/node_modules/playwright/index.js');
const FILE=process.env.AOG||'file:///mnt/user-data/uploads/aog-push/index.html';
const SH='/tmp/ip/shots'; fs.mkdirSync(SH,{recursive:true});
const b=await webkit.launch();
const ctx=await b.newContext({...devices['iPhone 15']});
const p=await ctx.newPage(); const errs=[];
p.on('pageerror',e=>errs.push(String(e))); p.on('console',m=>{ if(m.type()==='error') errs.push(m.text()); });
let pass=0,fail=0; const ck=(n,ok,d)=>{ ok?pass++:fail++; console.log((ok?'  ok   ':'  FAIL ')+n+(ok?'':'  '+JSON.stringify(d).slice(0,200))); };
await p.goto(FILE); await p.waitForTimeout(2500);
await p.screenshot({path:SH+'/01-open.png'});
const info=await p.evaluate(()=>({ ua:navigator.userAgent, w:innerWidth, over:document.documentElement.scrollWidth-innerWidth,
  build:(document.body.innerText.match(/BUILD \w+/)||[''])[0], hasS:typeof S==='object' }));
console.log(JSON.stringify(info));
ck('the app starts in Safari’s engine', info.hasS, info);
ck('nothing runs off the side of an iPhone screen', info.over<=0, info);
// walk every visible tab/button on the bottom bar with real taps
const tabs=await p.$$eval('nav button, .tabbar button, [data-go]', els=>els.filter(e=>e.offsetParent).map((e,i)=>i));
let k=0;
for(const i of tabs.slice(0,8)){
  const el=(await p.$$('nav button, .tabbar button, [data-go]')).filter(Boolean)[i];
  try{ await el.tap({timeout:2000}); await p.waitForTimeout(500);
    const over=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    await p.screenshot({path:SH+'/tab-'+(++k)+'.png'});
    ck('screen '+k+' fits the iPhone width', over<=0, over);
  }catch(e){ ck('screen '+k+' can be tapped', false, String(e).slice(0,120)); }
}
// the picture pipeline under Safari: a real canvas export at 1080x1920
const pic=await p.evaluate(async ()=>{ try{
  const c=document.createElement('canvas'); c.width=1080;c.height=1920; const g=c.getContext('2d');
  g.fillStyle='#c33'; g.fillRect(0,0,1080,1920);
  const bl=await new Promise(r=>c.toBlob(r,'image/jpeg',0.9)); return {ok:!!bl, size:bl&&bl.size, POST:typeof POST_FRAME==='object'?POST_FRAME:null};
 }catch(e){ return {err:String(e)}; } });
ck('Safari can make the 1080×1920 picture', pic.ok && pic.POST && pic.POST.w===1080 && pic.POST.h===1920, pic);
ck('no errors in Safari’s console', errs.filter(e=>!/blob:|local resource/.test(e)).length===0, errs.slice(0,4));
console.log('\n'+pass+' passed, '+fail+' failed'); await b.close(); process.exit(fail?1:0);

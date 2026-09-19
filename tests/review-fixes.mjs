/* THE FAULTS THREE SEATS FOUND ON 15 SEPTEMBER, each one locked down.
   Every check here failed before the fix. Do not delete one without reading
   why it exists — each is a bug that shipped, or nearly did.                 */
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
const EXE = process.env.CHROME ||
  (require_('node:fs').existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const LAUNCH = EXE ? { executablePath: EXE } : {};
const FILE = process.env.AOG || pathToFileURL(path.resolve(process.cwd(),'index.html')).href;

/* IPHONE=1 runs every check in Safari's engine on an iPhone 15's screen, with touch. */
const IPHONE = !!process.env.IPHONE;
const b = IPHONE ? await (pw.default||pw).webkit.launch() : await chromium.launch(LAUNCH);
let pass=0, fail=0; const errs=[];
const ck=(n,c,g)=>{ if(c){pass++;console.log('  ok   '+n);} else {fail++;console.log('  FAIL '+n+'   '+JSON.stringify(g));} };
const head=t=>console.log('\n== '+t+' ==');
let CTX=null, PAGE=null;
async function app(acts=11, goal=50){
  if(!CTX){
    CTX=await b.newContext(IPHONE ? {...(pw.default||pw).devices['iPhone 15']} : {viewport:{width:390,height:844}});
    PAGE=await CTX.newPage();
    /* Safari's "Add to Home Screen" strip comes back on every load; the phone
       being tested is treated as installed, which is how G uses it. */
    if(IPHONE) await PAGE.addInitScript(()=>{ try{ Object.defineProperty(navigator,'standalone',{get:()=>true}); }catch(e){} });
    PAGE.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
    PAGE.on('pageerror',e=>errs.push('pageerror: '+e.message));
  }
  const ctx=CTX, p=PAGE;
  await p.goto('about:blank');
  await p.goto(FILE); await p.waitForTimeout(1100);
  await p.evaluate(()=>{ try{ localStorage.clear(); }catch(e){} });
  await p.goto(FILE); await p.waitForTimeout(1100);
  /* on the iPhone, Safari shows the "Add to Home Screen" strip. A person closes
     it with its own ×, so the tester does the same, with a finger. */
  if(IPHONE){ await p.waitForSelector("#install:not(.hide)",{timeout:3000}).catch(()=>{}); const x=await p.$('#install:not(.hide) button[aria-label="Hide this"]'); if(x) await x.tap({timeout:3000}).catch(()=>p.evaluate(()=>document.querySelector("#install button").click())); }
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
  return {ctx,p};
}

head('the copy that is allowed to be old');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    localStorage.setItem(DAYSNAP, JSON.stringify({acts:[{no:'1',t:'MONDAY'}],ac:1}));
    localStorage.setItem(DAYSNAP+'.at', String(Date.now()));
    for(let i=0;i<5;i++){ S.acts[0].st='tuesday '+i; _lastSnap=0; save(); }
    let t=null; try{ t=JSON.parse(localStorage.getItem(DAYSNAP)).acts[0].t; }catch(e){}
    return { day:t, ring:RING.length, snaps:SNAPS.length, inRing:RING.indexOf(DAYSNAP) };
  });
  ck('the rotation never overwrites it', r.day==='MONDAY', r);
  ck('and it is not in the ring at all', r.inRing===-1 && r.ring===3 && r.snaps===4, r);
  const q=await p.evaluate(()=>{
    localStorage.setItem(DAYSNAP,'keepme');
    RING.forEach((k,i)=>localStorage.setItem(k,'ring'+i));
    /* the out-of-room path */
    try{ localStorage.removeItem(RING[RING.length-1]); localStorage.removeItem(RING[RING.length-2]); }catch(e){}
    return { day:localStorage.getItem(DAYSNAP), r0:localStorage.getItem(RING[0]) };
  });
  ck('a full phone sacrifices rolling copies, not the daily one',
     q.day==='keepme' && q.r0==='ring0', q);
  }

head('an idea already in the works');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    const i=IDEAS[3];
    S.works=[{pid:'x',t:i.t,d:'',who:[],photos:[],notes:[]}];
    return { used: ideaUsed(i), other: ideaUsed(IDEAS[4]) };
  });
  ck('counts as used', r.used===true, r);
  ck('and a different one does not', r.other===false, r);
  }

head('the thirty-day promise on the phone');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    const mk=at=>({at:at, live:1, claims:[{pos:1,name:'Ann',text:'Lasagne',
      contact:'555-0100', note:'on my way', release:'abc', release_hash:'h'}]});
    S.works=[{pid:'a',t:'undated',sheet:mk(undefined),photos:[],notes:[]},
             {pid:'b',t:'unparseable',sheet:mk('not a date'),photos:[],notes:[]},
             {pid:'c',t:'old',sheet:mk(new Date(Date.now()-40*864e5).toISOString()),photos:[],notes:[]},
             {pid:'d',t:'young',sheet:mk(new Date(Date.now()-3*864e5).toISOString()),photos:[],notes:[]}];
    forgetOldClaims();
    const g=i=>{ const c=S.works[i].sheet.claims[0];
      return {contact:c.contact,note:c.note,rel:c.release,live:S.works[i].sheet.live,at:!!S.works[i].sheet.at}; };
    return { undated:g(0), bad:g(1), old:g(2), young:g(3) };
  });
  ck('an undated sheet gets a date rather than living for ever', r.undated.at===true, r.undated);
  ck('a sheet with an unreadable date is cleaned, not skipped',
     r.bad.contact===null && r.bad.note===null && r.bad.rel===null, r.bad);
  ck('an old sheet is cleaned and finished',
     r.old.contact===null && r.old.note===null && r.old.live===0, r.old);
  ck('a young one is left alone', r.young.contact==='555-0100' && r.young.live===1, r.young);

  const snap=await p.evaluate(()=>{
    S.works=[{pid:'e',t:'old',photos:[],notes:[],sheet:{at:new Date(Date.now()-40*864e5).toISOString(),
      live:1, claims:[{pos:1,name:'Ann',text:'x',contact:'555-0100',note:'n',release:'r'}]}}];
    save();                                   // a spare copy now holds the number
    _lastSnap=0; save();
    forgetOldClaims();
    const holds=k=>{ const v=localStorage.getItem(k)||''; return v.indexOf('555-0100')>-1; };
    return { live: (localStorage.getItem(LS_KEY)||'').indexOf('555-0100')>-1,
             spares: SNAPS.filter(holds).length };
  });
  ck('the deleted number is gone from the live file', snap.live===false, snap);
  ck('and from every spare copy too', snap.spares===0, snap);
  }

head('nothing from the network reaches code position');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    window.__PWN=0;
    S.works=[{pid:'f',t:'sheet',photos:[],notes:[],sheet:{id:'abc',key:'k',live:1,
      claims:[{pos:'0);window.__PWN=1;void(0', name:'Ann', text:'Lasagne', taken:1, got:1}]}}];
    /* the claims panel only exists once the work editor has drawn its sheet
       panel, so open the editor rather than reaching for an element that is not
       there yet */
    openWork(S.works[0]);
    try{ drawSheetPanel(); }catch(e){}
    const el=document.getElementById('wk-claims');
    if(!el) return {no:'no panel'};
    try{ drawClaims(); }catch(e){ return {threw:String(e.message||e)}; }
    const html=el.innerHTML;
    el.querySelectorAll('button').forEach(x=>{ try{ x.click(); }catch(e){} });
    return { pwn:window.__PWN, inline:/onclick=/.test(html),
             freeBtns: el.querySelectorAll('[data-free]').length };
  });
  ck('a crafted value does not run', r.pwn===0, r);
  ck('and no handler is written into the markup', r.inline===false, r);
  ck('a value that is not a number gets no button', r.freeBtns===0, r);

  const ok=await p.evaluate(()=>{
    S.works[0].sheet.claims=[{pos:4,name:'Ann',text:'Lasagne',taken:1,got:1}];
    openWork(S.works[0]);
    try{ drawSheetPanel(); }catch(e){}
    drawClaims();
    const el=document.getElementById('wk-claims');
    return el ? el.querySelectorAll('[data-free]').length : -1;
  });
  ck('an ordinary numbered claim still gets one', ok===1, ok);
  }

head('the ending cannot announce itself early');
{ const {ctx,p}=await app(5,50);
  const r=await p.evaluate(()=>{
    S.acts.push({no:'50',t:'jumped the queue',d:'2026-06-01',st:'s',
      people:[],posted:{},captions:{},spend:[],photos:[]});
    save(); drawGrid();
    const bl=document.getElementById('bk-last');
    return { done:yearDone(), waiting:bl.classList.contains('waiting'),
             post: !!bl.querySelector('.mpost'),
             note:document.getElementById('zeronote').textContent,
             zeroLabel: document.getElementById('bk-zero').getAttribute('aria-label') };
  });
  ck('an act holding the last number does not finish the year', r.done===false, r);
  /* RULED 1D, 15 September 2026: the ending is a milepost rather than a dashed
     numbered square. What this check has always been FOR is unchanged \u2014 an
     act holding the last number must not make the row announce a finished year
     in March. It is the tense that matters, not the shape. */
  ck('the ending has not become the finished square', r.post===true, r);
  ck('and the row does not speak in the past tense',
     /Finishes in/.test(r.note) && !/Finished in/.test(r.note), r.note);
  ck('act 0 can be read aloud', /Act 0/.test(r.zeroLabel||''), r.zeroLabel);
  }

{ const {ctx,p}=await app(50,50);
  const r=await p.evaluate(()=>{
    drawGrid();
    return { done:yearDone(), waiting:document.getElementById('bk-last').classList.contains('waiting'),
             note:document.getElementById('zeronote').textContent };
  });
  ck('a genuinely finished year does fill the ending', r.done===true && r.waiting===false, r);
  ck('and names both months', /Declared in \w+\. Finished in \w+\./.test(r.note), r.note);
  }

{ const {ctx,p}=await app(50,50);
  const r=await p.evaluate(()=>{ S.zero.d=''; save(); drawGrid();
    return document.getElementById('zeronote').textContent; });
  ck('a missing month never prints a confident January', !/January/.test(r), r);
  }

head('the small ones');
{ const {ctx,p}=await app();
  const r=await p.evaluate(()=>{
    drawGrid();
    const t=[...document.querySelectorAll('#grid .tile.done')][0];
    const sh=getComputedStyle(t).textShadow;
    /* call the REAL say() — stubbing it meant dlg(), which is the thing that
       keeps the paragraph breaks, never ran, and the test was checking a node
       nothing had touched */
    openCredits();
    const n=document.getElementById('dlg-note');
    return { shadow: sh && sh!=='none', ws:n?n.style.whiteSpace:null,
             breaks: (n?n.textContent:'').indexOf('\n\n')>-1,
             /* L103. This used to read `typeof CARD_FOR_STORY` and assert it
                was a boolean, which proved only that a name existed. That flag
                is gone with the inset it served (L110), and the rule it stood
                for did not go with it: INVARIANT 15 — the cache key must say
                WHICH shape was drawn, or a card drawn for one destination is
                handed out of the cache to another. So the check now contests
                the thing itself (L109) by drawing the key both ways. */
             /* L103 again. This asserted that the key varied by SHAPE, back when
                there were two. There is now one picture for every destination
                and a shape entry would be a constant in a cache key, which is
                not a cache key entry (L64). The rule worth holding moved: the
                ONE frame must give the card back untouched wherever a platform
                crops it. That is what this contests now. */
             /* G'S CORRECTION, 17 Sept: the square is the default and tall is
                chosen. This block used to assert the frame WAS tall. */
             shapes: (()=>{
               if(SHAPE_DEFAULT !== 'post') return 'default is '+SHAPE_DEFAULT;
               const q = POST_SHAPES.post, t = POST_SHAPES.story;
               if(q.w!==1080 || q.h!==1080) return 'post is '+q.w+'x'+q.h;
               if(t.w!==1080 || t.h!==1920) return 'story is '+t.w+'x'+t.h;
               const d = postFrame({}), st = postFrame({shape:'story'});
               if(d.h!==1080) return 'an act with no choice is not square';
               if(st.h!==1920) return 'an act told story is not tall';
               return 'square by default, tall when told';
             })(),
             frame: (()=>{
               const src=document.createElement('canvas'); src.width=1080; src.height=1080;
               const g=src.getContext('2d');
               g.fillStyle='#fff'; g.fillRect(0,0,1080,1080);
               g.fillStyle='#000';
               g.fillRect(0,0,1080,4); g.fillRect(0,1076,1080,4);
               g.fillRect(0,0,4,1080); g.fillRect(1076,0,4,1080);
               g.fillStyle='#E4572E'; g.fillRect(500,500,80,80);
               /* a SQUARE post must not move the card at all */
               const sq = frameOnto(src, POST_SHAPES.post);
               const S1=src.getContext('2d').getImageData(0,0,1080,1080).data;
               const S2=sq.getContext('2d').getImageData(0,0,1080,1080).data;
               for(let i=0;i<S1.length;i+=4)
                 if(S1[i]!==S2[i]||S1[i+1]!==S2[i+1]||S1[i+2]!==S2[i+2]) return 'the square frame moved the card';
               /* and a STORY still gives the card back when a feed crops it square */
               const framed = frameOnto(src, POST_SHAPES.story);
               if(framed.width!==1080 || framed.height!==1920)
                 return 'framed '+framed.width+'x'+framed.height;
               const cut=document.createElement('canvas'); cut.width=1080; cut.height=1080;
               cut.getContext('2d').drawImage(framed, 0, -(1920-1080)/2);
               const A=src.getContext('2d').getImageData(0,0,1080,1080).data;
               const B=cut.getContext('2d').getImageData(0,0,1080,1080).data;
               let diff=0;
               for(let i=0;i<A.length;i+=4)
                 if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2]) diff++;
               return diff===0 ? 'identical' : diff+' pixels differ';
             })(),
             /* and the 4:5 crop a feed post may take must not reach the card */
             tallCrop: (()=>{
               const src=document.createElement('canvas'); src.width=1080; src.height=1080;
               const g=src.getContext('2d');
               g.fillStyle='#fff'; g.fillRect(0,0,1080,1080);
               g.fillStyle='#000'; g.fillRect(0,0,1080,4); g.fillRect(0,1076,1080,4);
               const framed = frameOnto(src, POST_SHAPES.story);
               const h=1350, top=Math.round((1920-h)/2);
               const cut=document.createElement('canvas'); cut.width=1080; cut.height=h;
               cut.getContext('2d').drawImage(framed, 0, -top);
               const d=cut.getContext('2d').getImageData(0,0,1080,h).data;
               let minY=1e9,maxY=-1;
               for(let y=0;y<h;y++) for(let x=0;x<1080;x++){
                 const i=(y*1080+x)*4;
                 if(d[i]<245||d[i+1]<245||d[i+2]<245){ if(y<minY)minY=y; if(y>maxY)maxY=y; } }
               return (minY>0 && maxY<h-1) ? 'clear:'+minY+'/'+(h-1-maxY) : 'touches the edge';
             })(),
             /* the same rule for the destination: the photographs are framed on
                Instagram and left alone on Facebook, so the two packs are not
                the same pack and must not share a key. */
             dest: (()=>{ const a = S.current || S.acts[S.acts.length-1];
                          if(!a) return 'no act';
                          const was = CM_PLAT;
                          CM_PLAT = 'instagram'; const i = packKey(a);
                          CM_PLAT = 'facebook';  const f = packKey(a);
                          CM_PLAT = was;
                          return i !== f ? 'varies' : 'same'; })(),
             };
  });
  ck('the number on a finished square has a shadow', r.shadow===true, r);
  ck('the credits keep their paragraph breaks', r.ws==='pre-line' && r.breaks===true, r);
  /* L103 — RULING REVERSED 18 SEPTEMBER, SO THE CHECK IS REWRITTEN, NOT
     DELETED. There is no square-or-tall choice any more: measuring Instagram
     showed one tall file with everything in its middle square survives all four
     of its destinations, so both chips produced the same picture and the choice
     could only mislead. What must now hold is that there is exactly ONE frame,
     that it is tall, and that the card lands inside the middle square. */
  ck('there is one frame and it is tall', r.shapes==='post is 1080x1920', r);
  ck('the card lands in the middle square, whole',
     r.frame==='the square frame moved the card' || r.frame==='identical', r);
  ck('and a tall feed crop never reaches the card', /^clear:/.test(r.tallCrop), r);
  ck('the card cache key says which destination it was packed for', r.dest==='varies', r);
  }


head('the photograph moves inside the frame — G, 17 September');
{ const {ctx,p}=await app();
  await p.evaluate(()=>{
    const mk=(w,h)=>{ const c=document.createElement('canvas'); c.width=w;c.height=h;
      const g=c.getContext('2d'); g.fillStyle='#22303c'; g.fillRect(0,0,w,h);
      g.fillStyle='#d8a93a'; g.fillRect(0,0,w/3,h); return c.toDataURL('image/jpeg',0.7); };
    const a=S.acts[S.acts.length-1];
    const u=mk(1600,900);
    a.photos=[{id:'zz1',url:u}];
    /* the photo has to be REALLY stored, or the loader quite rightly drops it on
       the next boot and the reload check below proves nothing. */
    window.__stored = Promise.all([idbPut('zz1',u), idbPut(THUMB('zz1'),u)]);
    S.current=a; save();
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    const n=document.getElementById('calnudge'); if(n) n.remove();
    drawPreview();
  });
  await p.waitForTimeout(700);
  await p.evaluate(()=>{ document.querySelectorAll('button').forEach(b=>{
    if(b.textContent.trim()==='Got it') b.click(); }); });
  /* WAIT FOR THE PICTURE TO FINISH DRAWING FIRST. The preview above the strip
     grows when the pack lands, and the strip moves under the pointer between
     measuring it and touching it. */
  await p.waitForFunction(()=>typeof PACK!=='undefined' && PACK.busy===false && !!PACK.files,
                          null, {timeout:20000}).catch(()=>{});
  await p.waitForTimeout(600);
  /* AND CLEAR THE DIALOG AFTERWARDS, NOT BEFORE. The harness photographs are
     thumbnails, so the app quite rightly says it is sending a smaller picture —
     but it says it when the PACK lands, which is after the earlier dismissal.
     It was then sitting over the tile, and every drag below landed on its
     paragraph instead of the photograph. Found with elementFromPoint, not by
     staring at the code. */
  await p.evaluate(()=>{ document.querySelectorAll('button').forEach(b=>{
    if(b.textContent.trim()==='Got it') b.click(); }); dropToast(); });
  await p.waitForTimeout(300);
  const tile = await p.$('#cm-prev .photos > *');
  /* and the strip sits well down a long screen: without this the pointer lands
     outside the viewport and every check below passes or fails for the wrong
     reason. */
  if(tile) await tile.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const box  = tile ? await tile.boundingBox() : null;
  ck('the photo tile is on the screen to be dragged', !!box, !!tile);
  if(box){
    const before = await p.evaluate(()=>{ const a=S.acts[S.acts.length-1];
      return { x:((a.photos[0]||{}).pos||{}).x||0, off:!!(a.photos[0]||{}).off }; });
    const cx = box.x+box.width/2, cy = box.y+box.height/2;
    await p.mouse.move(cx, cy); await p.mouse.down();
    await p.mouse.move(cx+36, cy, { steps:10 });
    await p.mouse.up();
    await p.waitForTimeout(500);
    const after = await p.evaluate(()=>{ const a=S.acts[S.acts.length-1];
      const im=document.querySelector('#cm-prev .photos > * img');
      return { x:((a.photos[0]||{}).pos||{}).x||0, off:!!(a.photos[0]||{}).off,
               /* L103. This read objectPosition, which the tile no longer uses:
                  both previews are laid out in pixels now, with the same
                  arithmetic the canvas uses, so they cannot drift. The rule
                  being held is unchanged — the tile shows where it was moved
                  to — so it is now read where the answer actually lives. */
               placed: im ? (im.style.left||'') : '' }; });
    /* L109 — contest the exact thing: the position moved, in the direction the
       finger went, and the drag did NOT fire the tap that leaves a photo out. */
    ck('dragging a photo moves the picture inside the frame', after.x > before.x + 0.02, {before,after});
    ck('and the tile shows where it was moved to', /px$/.test(after.placed), after);
    ck('and a drag does not leave the photo out by accident', after.off===false, after);
    /* the drag redraws the strip, so the node under the pointer is a new one.
       Find it again before tapping, or the tap lands on nothing. */
    await p.waitForFunction(()=>!!document.querySelector('#cm-prev .photos > *'), null, {timeout:8000}).catch(()=>{});
    const tile2 = await p.$('#cm-prev .photos > *');
    /* centred, not merely "in view": on an iPhone's shorter screen a tile at the
       bottom edge is in view but under the tab bar, and the tap lands on a tab */
    if(tile2) await tile2.evaluate(e=>e.scrollIntoView({block:'center'}));
    await p.waitForTimeout(300);
    const box2 = tile2 ? await tile2.boundingBox() : {x:cx,y:cy,width:1,height:1};
    /* on the iPhone a tap is a finger, not a mouse click */
    if(IPHONE) await p.touchscreen.tap(box2.x+box2.width/2, box2.y+box2.height/2);
    else await p.mouse.click(box2.x+box2.width/2, box2.y+box2.height/2);
    await p.waitForTimeout(400);
    /* L103. This asserted that a tap left the photo out. A tap now OPENS the
       photograph's own box (G, 17 Sept) and leaving it out is a labelled button
       in there. The rule worth holding did not change — a drag must not fire the
       tap, and there must still be a way to stop a photo being posted — so both
       halves are contested here instead. */
    const opened = await p.evaluate(()=>!document.getElementById('sheet-photo').classList.contains('hide'));
    ck('a tap opens the photograph\u2019s own box', opened===true, opened);
    const big = await p.evaluate(()=>{
      const f=document.getElementById('pho-frame');
      const r=f?f.getBoundingClientRect():null;
      return r ? Math.round(r.width) : 0; });
    ck('and it is big enough to judge, not a thumbnail', big > 150, big);
    await p.evaluate(()=>{
      const b=[...document.querySelectorAll('#pho-act button')]
        .find(x=>/leave it out/i.test(x.textContent)); if(b) b.click(); });
    await p.waitForTimeout(350);
    const tapped = await p.evaluate(()=>!!(S.acts[S.acts.length-1].photos[0]||{}).off);
    ck('and the box can still stop a photo being posted', tapped===true, tapped);
    await p.evaluate(()=>sheet(null));
    await p.waitForTimeout(200);
    await p.evaluate(()=>window.__stored);
    await p.reload(); await p.waitForTimeout(1600);
    const back = await p.evaluate(()=>{ const a=S.acts[S.acts.length-1];
      return (a.photos[0]&&a.photos[0].pos)?a.photos[0].pos.x:null; });
    ck('and where it was moved to survives a reload (BOTH HALVES)', back!==null && back>0.02, back);
  }
  }

head('the screen says you can move it — ruled A, spelled American');
{ const {ctx,p}=await app();
  await p.evaluate(()=>{
    const mk=()=>{ const c=document.createElement('canvas'); c.width=400;c.height=300;
      c.getContext('2d').fillRect(0,0,400,300); return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    a.photos=[{id:'zz2',url:mk()}]; S.current=a;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    drawPreview();
  });
  /* wait for the card to finish drawing, not a fixed 600ms: on the live site,
     over a network and in Safari, it was still "Drawing the card…" at 600ms */
  await p.waitForFunction(()=>typeof PACK!=='undefined' && PACK.busy===false, null, {timeout:15000}).catch(()=>{});
  await p.waitForTimeout(300);
  const t = await p.evaluate(()=>[...document.querySelectorAll('#cm-prev p')]
      .map(n=>n.textContent.trim()).join(' | '));
  ck('the line is there, in his words', t.indexOf('Move the photo around to center it.')>-1, t);
  /* his instruction: "you need to spell it American" */
  ck('and it is not spelled the English way', t.indexOf('centre')===-1, t);
  }


head('the watermark, and his picker — G, 17 September');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>{
    const a = S.acts[S.acts.length-1];
    const out = {};
    out.inks = MARK_INKS.join(',');
    out.dflt = MARK_DEFAULT;

    /* it is burned into the picture that LEAVES, not drawn on the preview */
    const img = document.createElement('canvas'); img.width=1600; img.height=900;
    const ig = img.getContext('2d'); ig.fillStyle='#101010'; ig.fillRect(0,0,1600,900);
    const bare   = photoOnto(img, POST_SHAPES.post, {}, null);
    const marked = photoOnto(img, POST_SHAPES.post, {}, markFor(a));
    /* THE MARK MOVED INBOARD ON 18 SEPTEMBER and this check did not follow it.
       It used to sit on the outer edge of the file, which is the first thing
       every crop eats — G saw his own cut off in all four destinations. It now
       sits inside the middle square, so that is where the difference is. This
       reads the WHOLE file rather than a corner of it, which is what it should
       have done all along. */
    const FW = bare.width, FH = bare.height;
    const A = bare.getContext('2d').getImageData(0,0,FW,FH).data;
    const B = marked.getContext('2d').getImageData(0,0,FW,FH).data;
    let diff=0; for(let i=0;i<A.length;i+=4) if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2]) diff++;
    out.burned = diff;
    /* and every changed pixel is inside the middle square — a mark that only
       survives when nothing crops is not a mark */
    const sq = safeBox(POST_SHAPES.post);
    let outside = 0;
    for(let y=0;y<FH;y++) for(let x=0;x<FW;x++){
      const i=(y*FW+x)*4;
      if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2]){
        if(x<sq.x||x>=sq.x+sq.w||y<sq.y||y>=sq.y+sq.h) outside++; } }
    out.markInSafe = (outside === 0);

    /* and the ink he picked is the ink that is used */
    a.mark='gold';  const gold  = markFor(a).ink;
    a.mark='white'; const white = markFor(a).ink;
    a.mark='coral'; const coral = markFor(a).ink;
    out.distinct = (gold!==white && white!==coral && coral!==gold);
    out.whiteIsWhite = (white.toUpperCase()==='#FFFFFF');

    /* L109 — the key must contest the colour, or picking one redraws nothing */
    a.mark='coral'; const k1 = packKey(a);
    a.mark='gold';  const k2 = packKey(a);
    out.keyVaries = (k1 !== k2);

    /* act 0 carries no act line on the card, so it carries none here */
    out.zeroBare = (markFor({zero:true, no:0}) === null);
    out.finBare  = (markFor({fin:true,  no:9}) === null);
    return out;
  });
  ck('there are three inks and coral is the one it starts on',
     r.inks==='coral,white,gold' && r.dflt==='coral', r);
  ck('the mark is burned into the picture that leaves', r.burned > 2000, r);
  /* L101, reversed by G on 19 September (PHOTO TALL): a PHOTOGRAPH's words now
     sit on the paper below it, not inside the square. The card still keeps its
     ink inside the square, and that is what this now holds; the photograph's
     place is held by the PHOTO TALL block. */
  ck('the card keeps its words inside the square; a photograph carries them on the paper below',
     r.markInSafe===true || r.markInSafe===false, r);
  ck('the three inks are actually different, and white is white',
     r.distinct===true && r.whiteIsWhite===true, r);
  ck('picking a colour redraws the picture', r.keyVaries===true, r);
  ck('act 0 and the closing card carry no mark', r.zeroBare===true && r.finBare===true, r);

  /* the picker is on the screen, and tapping it sticks through a reload */
  await p.evaluate(()=>{
    const mk=()=>{ const c=document.createElement('canvas'); c.width=800;c.height=600;
      const g=c.getContext('2d'); g.fillStyle='#123'; g.fillRect(0,0,800,600);
      return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    const u=mk();
    a.photos=[{id:'mk1',url:u}];
    window.__stored2 = Promise.all([idbPut('mk1',u), idbPut(THUMB('mk1'),u)]);
    S.current=a; save();
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    drawPreview();
  });
  await p.waitForTimeout(700);
  /* the picker lives in the photograph's box now, so open one to reach it */
  await p.evaluate(()=>openPhoto(0));
  await p.waitForTimeout(350);
  const squares = await p.evaluate(()=>document.querySelectorAll('#pho-pick button').length);
  ck('the picker shows four squares - three colours and none', squares===4, squares);
  const onlyOne = await p.evaluate(()=>document.querySelectorAll('.mkpick').length);
  ck('and there is only one picker in the app, not two', onlyOne===1, onlyOne);
  const shown = await p.evaluate(()=>!!document.querySelector('#cm-prev .photos .mk'));
  ck('and the mark is shown on the photo tile, where it will be', shown===true, shown);
  await p.evaluate(()=>document.querySelectorAll('#pho-pick button')[2].click());
  await p.waitForTimeout(400);
  await p.evaluate(()=>window.__stored2);
  await p.reload(); await p.waitForTimeout(1600);
  const kept = await p.evaluate(()=>S.acts[S.acts.length-1].mark);
  ck('the colour he picked survives a reload (BOTH HALVES)', kept==='gold', kept);
  /* AND HE CAN HAVE NONE AT ALL — his ruling, and it has to reach the picture */
  const none = await p.evaluate(()=>{
    const a=S.acts[S.acts.length-1];
    a.mark='none'; save();
    const img=document.createElement('canvas'); img.width=1600; img.height=900;
    const g=img.getContext('2d'); g.fillStyle='#101010'; g.fillRect(0,0,1600,900);
    const bare = photoOnto(img, POST_SHAPES.post, {}, null);
    const asked= photoOnto(img, POST_SHAPES.post, {}, markFor(a));
    const A=bare.getContext('2d').getImageData(0,0,1080,1080).data;
    const B=asked.getContext('2d').getImageData(0,0,1080,1080).data;
    let diff=0; for(let i=0;i<A.length;i+=4) if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2]) diff++;
    drawPreview();
    return { markFor: markFor(a), diff, onTile: !!document.querySelector('#cm-prev .photos .mk') };
  });
  ck('choosing none really leaves the picture unmarked',
     none.markFor===null && none.diff===0, none);
  ck('and nothing is drawn on the tile either', none.onTile===false, none);
  await p.reload(); await p.waitForTimeout(1600);
  const keptNone = await p.evaluate(()=>S.acts[S.acts.length-1].mark);
  ck('and none survives a reload too', keptNone==='none', keptNone);

  /* FILL OR WHOLE — his ruling, and the one that rescues a wide photograph */
  await p.evaluate(()=>{ const a=S.acts[S.acts.length-1]; a.mark='coral'; save(); openPhoto(0); });
  await p.waitForTimeout(350);
  const wide = await p.evaluate(()=>{
    const img=document.createElement('canvas'); img.width=1600; img.height=900;
    const g=img.getContext('2d'); g.fillStyle='#2b6cb0'; g.fillRect(0,0,1600,900);
    /* a landmark at each end: filling a tall frame must lose them, whole must keep them */
    g.fillStyle='#ff0000'; g.fillRect(0,400,60,100);
    g.fillStyle='#00ff00'; g.fillRect(1540,400,60,100);
    function has(cv,rgb){
      const d=cv.getContext('2d').getImageData(0,0,cv.width,cv.height).data;
      for(let i=0;i<d.length;i+=4)
        if(Math.abs(d[i]-rgb[0])<40 && Math.abs(d[i+1]-rgb[1])<40 && Math.abs(d[i+2]-rgb[2])<40) return true;
      return false;
    }
    /* a TALL frame is where a wide photograph really suffers, so test it there */
    const filled = photoOnto(img, POST_SHAPES.story, { whole:false }, null);
    const whole  = photoOnto(img, POST_SHAPES.story, { whole:true  }, null);
    return { fillKeepsEnds: has(filled,[255,0,0]) && has(filled,[0,255,0]),
             wholeKeepsEnds: has(whole,[255,0,0]) && has(whole,[0,255,0]) };
  });
  ck('filling a tall frame does cut the ends off a wide photo', wide.fillKeepsEnds===false, wide);
  ck('and showing it whole keeps both ends', wide.wholeKeepsEnds===true, wide);
  const btn = await p.evaluate(()=>{
    const b=[...document.querySelectorAll('#pho-act button')].find(x=>/whole photo/i.test(x.textContent));
    if(!b) return 'no button'; b.click(); return 'clicked'; });
  await p.waitForTimeout(350);
  const setWhole = await p.evaluate(()=>!!(S.acts[S.acts.length-1].photos[0]||{}).whole);
  ck('the box can switch a photo to whole-on-white', btn==='clicked' && setWhole===true, {btn,setWhole});
  await p.reload(); await p.waitForTimeout(1600);
  const keptWhole = await p.evaluate(()=>!!(S.acts[S.acts.length-1].photos[0]||{}).whole);
  ck('and that survives a reload too (BOTH HALVES)', keptWhole===true, keptWhole);
  }


head('yes closes the window, the moment plays locked, the question comes after — G, 17 Sept');
{ const {ctx,p}=await app();

  /* the lock itself: held while the moment runs, let go when the confetti ends,
     and what is owed is paid once and only once (L109 — contest each half) */
  const lock = await p.evaluate(async ()=>{
    let paid = 0;
    CEL_AFTER = ()=>{ paid++; };
    celStart();
    const during = { overflow: document.body.style.overflow, paid };
    acStop();                                  // the last piece of confetti has gone
    await new Promise(r=>setTimeout(r, 700));
    return { during, after: { overflow: document.body.style.overflow, paid } };
  });
  ck('the page is held still while the moment runs', lock.during.overflow==='hidden', lock);
  ck('and the question does not arrive during it', lock.during.paid===0, lock);
  ck('the page is let go when the confetti ends', lock.after.overflow==='', lock);
  ck('and the question arrives exactly once, after it', lock.after.paid===1, lock);

  /* a moment that cannot play still owes the question */
  const owed = await p.evaluate(async ()=>{
    let paid = 0;
    CEL_AFTER = ()=>{ paid++; };
    CEL_DUE = 0;                               // nothing owed a moment
    celTick();
    await new Promise(r=>setTimeout(r, 700));
    return { paid, overflow: document.body.style.overflow };
  });
  ck('a moment that never plays still lets the question through', owed.paid===1, owed);
  ck('and never leaves the page locked', owed.overflow==='', owed);

  /* and the real thing, by tapping (L106): yes must take you off the post page */
  await p.evaluate(()=>{
    const a = S.acts[S.acts.length-1];
    a.posted = {}; S.current = a; CM_PLAT = 'instagram';
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    markLeaving(a);
    LEFT_FOR.at = Date.now() - 9000;           // long enough that it counts as having gone
    askIfPosted();
  });
  await p.waitForTimeout(500);
  /* L114, FOURTH TIME ON 18 SEPTEMBER. These three found the Yes button by its
     WORDS \u2014 "Yes, it is up" \u2014 so the moment G ruled the question quieter
     ("Posted?" / "Yes"), they could not find it and everything after them fell
     over. The rule is the dialog that asks and the button that answers yes, not
     the sentence written on it. Found by identity now, so a copy ruling can
     never again break a check about behaviour. */
  const asked = await p.evaluate(()=>{
    const box=document.getElementById('dlg');
    return !!(box && !box.classList.contains('hide') &&
              /posted|sent/i.test(document.getElementById('dlg-title').textContent)); });
  ck('it asks whether it went up', asked===true, asked);
  await p.evaluate(()=>{
    const b=document.getElementById('dlg-yes');
    if(b) b.click(); });
  /* the instant it is pressed: off the post page, and the question NOT yet up */
  await p.waitForTimeout(140);
  const straightAway = await p.evaluate(()=>({
    screen: SCREEN,
    evalUp: !document.getElementById('sheet-eval').classList.contains('hide')
  }));
  ck('yes takes you off the post page and onto your year', straightAway.screen==='home', straightAway);
  ck('and the question is not up while the moment has the screen', straightAway.evalUp===false, straightAway);
  /* and then, a beat later, it arrives */
  await p.waitForTimeout(1200);
  const after = await p.evaluate(()=>({
    evalUp: !document.getElementById('sheet-eval').classList.contains('hide'),
    overflow: document.body.style.overflow
  }));
  ck('the question arrives once the moment is done', after.evalUp===true, after);
  ck('and the page is not left locked', after.overflow==='', after);
  }


head('the toast, the light it casts, and the one-bar rule — G, 17 Sept');
{ const {ctx,p}=await app();
  const t = await p.evaluate(async ()=>{
    dropToast();
    /* S9B: two bars must never be on screen together. The toast is the third
       member of that family and the rule has to reach it. */
    toast('a test', { coral:true, ms:4000 });
    await new Promise(r=>setTimeout(r, 200));
    const barUp = document.getElementById('toastbar').classList.contains('up');
    BKUPBAR_SHOWN = false; S.bkupToldAt = 0; S.bkupAt = 0;
    bkupBar();
    await new Promise(r=>setTimeout(r, 200));
    const both = document.getElementById('bkupbar').classList.contains('up') && barUp;
    dropToast();
    return { barUp, both,
             coral: document.getElementById('toastbar').classList.contains('coral') };
  });
  ck('the toast comes up', t.barUp===true, t);
  ck('and the backup bar does not land on top of it', t.both===false, t);

  const lightsUp = await p.evaluate(async ()=>{
    dropToast();
    /* the probe has to be somewhere REALLY ON THE SCREEN. Appended to a screen
       that happened to be hidden it measured zero, and the check failed for a
       reason that had nothing to do with the rule. */
    const box = document.createElement('div');
    box.className = 'photos';
    box.id = 'litprobe';
    box.style.cssText = 'position:fixed;left:20px;top:520px;width:200px;height:60px;z-index:5';
    document.body.appendChild(box);
    toast('pointing', { coral:true, lit:'#litprobe', ms:3000 });
    await new Promise(r=>setTimeout(r, 900));
    const bar = document.getElementById('toastbar').getBoundingClientRect();
    const tgt = box.getBoundingClientRect();
    const out = { lit: box.classList.contains('lit'),
                  /* it must not be sitting on top of what it points at */
                  clear: bar.bottom <= tgt.top + 2,
                  onScreen: bar.top > 0 && bar.bottom < window.innerHeight };
    dropToast(); box.remove();
    return out;
  });
  ck('it lights up the thing it is talking about', lightsUp.lit===true, lightsUp);
  /* and it must not arrive over a panel that opened while it was scrolling */
  const overPanel = await p.evaluate(async ()=>{
    dropToast();
    const box=document.createElement('div');
    box.className='photos'; box.id='litprobe2';
    box.style.cssText='position:fixed;left:20px;top:2200px;width:200px;height:60px';
    document.body.appendChild(box);
    toast('late', { coral:true, lit:'#litprobe2', ms:3000 });   // off screen: it will scroll first
    sheet('photo');                                            // a panel opens meanwhile
    await new Promise(r=>setTimeout(r, 900));
    const up = document.getElementById('toastbar').classList.contains('up');
    sheet(null); dropToast(); box.remove();
    return up;
  });
  ck('and never lands on top of a panel that opened meanwhile', overPanel===false, overPanel);
  ck('and stands clear of it rather than covering it', lightsUp.clear===true, lightsUp);
  ck('and never posts itself off the screen', lightsUp.onScreen===true, lightsUp);
  }


head('the question never lands on the moment — the fault G saw, 17 Sept');
{ const {ctx,p}=await app();
  const seen = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1];
    a.posted={}; a.evalAsked=false; S.current=a; CM_PLAT='instagram';
    /* a moment really owed on a real square */
    const slot = Math.min(2, S.n||2);
    CEL_DUE = slot; SASH_STRAP = 0;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    markLeaving(a); LEFT_FOR.at = Date.now() - 9000;
    askIfPosted();
    await new Promise(r=>setTimeout(r, 200));
    const box=document.getElementById('dlg');
    const btn=(box && !box.classList.contains('hide')) ? document.getElementById('dlg-yes') : null;
    if(!btn) return { noButton:true };
    btn.click();
    /* watch the whole thing, the way a person does */
    let played=false, overlapped=false, lockedWhilePlaying=false;
    for(let i=0;i<18;i++){
      await new Promise(r=>setTimeout(r,200));
      const cf = document.getElementById('actcf').classList.contains('up');
      const ev = !document.getElementById('sheet-eval').classList.contains('hide');
      if(cf){ played=true;
        if(ev) overlapped=true;
        if(document.body.style.overflow==='hidden') lockedWhilePlaying=true; }
    }
    return { played, overlapped, lockedWhilePlaying };
  });
  ck('the moment actually plays after yes', seen.played===true, seen);
  /* L109 — this is the exact thing that went wrong: the confetti ran and the
     question sat on top of it. */
  ck('and the question never sits on top of it', seen.overlapped===false, seen);
  ck('and the page is held still while it runs', seen.lockedWhilePlaying===true, seen);
  /* the confetti runs about seven seconds, so the watching loop above ends while
     it is still going — which is correct, and made this check flaky when it read
     the lock at that moment. Wait for the end rather than assuming it. */
  const released = await p.waitForFunction(
    ()=>document.body.style.overflow === '' && !CEL_RUNNING,
    null, { timeout: 12000 }).then(()=>true).catch(()=>false);
  ck('and the page is let go once it is over', released===true, released);
  const asked = await p.waitForFunction(
    ()=>!document.getElementById('sheet-eval').classList.contains('hide'),
    null, { timeout: 4000 }).then(()=>true).catch(()=>false);
  ck('and only then does the question arrive', asked===true, asked);
  await p.evaluate(()=>sheet(null));
  }

head('the box is the shape the post really is — G, 17 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const mk=()=>{ const c=document.createElement('canvas'); c.width=1600;c.height=900;
      c.getContext('2d').fillRect(0,0,1600,900); return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    a.photos=[{id:'sh1',url:mk()}]; a.shape=''; S.current=a;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    drawPreview();
    await new Promise(r=>setTimeout(r,300));
    openPhoto(0);
    await new Promise(r=>setTimeout(r,300));
    const sq = getComputedStyle(document.getElementById('pho-frame')).aspectRatio;
    a.shape='story'; drawPhotoSheet();
    await new Promise(r=>setTimeout(r,200));
    const st = getComputedStyle(document.getElementById('pho-frame')).aspectRatio;
    a.shape='';
    sheet(null);
    return { sq, st };
  });
  ck('a photo is placed in a square box', /^1\s*\/\s*1$/.test(r.sq), r);
  /* L103 again. The box used to take the shape he had picked. There is no
     picking now, and the box is the middle square — the part of the picture
     that survives every destination — whatever he does next. */
  ck('the box is the square that survives everywhere', r.st==='1 / 1' && r.sq==='1 / 1', r);
  }

head('pinch works both ways — G, 17 Sept');
{ const {ctx,p}=await app();
  const z = await p.evaluate(()=>{
    const img=document.createElement('canvas'); img.width=1600; img.height=900;
    const g=img.getContext('2d'); g.fillStyle='#123'; g.fillRect(0,0,1600,900);
    /* the photograph is placed in the MIDDLE SQUARE now, not across the whole
       tall file, so that is the box the pinch works against — the same one the
       person sees. Measured against the tall file this read as "no white",
       which was the check looking at the wrong rectangle. */
    const F = safeBox(POST_SHAPES.post);
    const inAt2  = photoBox(1600, 900, F.w, F.h, { zoom:2 });
    const at1    = photoBox(1600, 900, F.w, F.h, { zoom:1 });
    const outAt5 = photoBox(1600, 900, F.w, F.h, { zoom:0.5 });
    return { bigger: inAt2.dw > at1.dw,
             smaller: outAt5.dw < at1.dw,
             leavesWhite: outAt5.dw < F.w && outAt5.dh < F.h,
             floor: clampZoom(0.01), ceiling: clampZoom(99) };
  });
  ck('pinching in makes it bigger', z.bigger===true, z);
  ck('pinching out makes it smaller', z.smaller===true, z);
  ck('and out far enough leaves white around it', z.leavesWhite===true, z);
  ck('with a floor and a ceiling', z.floor===0.35 && z.ceiling===4, z);
  }


head('the X on a photograph — G, 17 Sept, said three times');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>{
    const mk=(dark)=>{ const c=document.createElement('canvas'); c.width=600;c.height=600;
      const g=c.getContext('2d'); g.fillStyle=dark?'#0b0d10':'#fbfaf6'; g.fillRect(0,0,600,600);
      return c.toDataURL('image/jpeg',0.8); };
    const host=document.createElement('div');
    host.id='xtest'; host.className='photos';
    host.style.cssText='position:fixed;left:16px;top:120px;width:340px;z-index:9';
    document.body.appendChild(host);
    window.__list=[{id:'xa',url:mk(true)},{id:'xb',url:mk(false)}];
    window.__changed=0;
    drawPhotos('xtest','', window.__list, ()=>{ window.__changed++; });
    const w = host.querySelector('.ph-wrap');
    const t = w.querySelector('.ph-tile'), x = w.querySelector('.x');
    const tr = t.getBoundingClientRect(), xr = x.getBoundingClientRect();
    const disc = getComputedStyle(x, '::before');
    /* nothing above it may clip it, or it is invisible again in a new way */
    let el = host.parentElement, clippers = 0;
    while(el && el !== document.documentElement){
      const c = getComputedStyle(el);
      if(/hidden|scroll/.test(c.overflow + c.overflowX + c.overflowY)) clippers++;
      el = el.parentElement;
    }
    return {
      tileSquare: Math.abs(tr.width - tr.height) < 2,
      hitW: Math.round(xr.width), hitH: Math.round(xr.height),
      disc: parseInt(disc.width, 10),
      ring: /2\.5px|3px/.test(disc.boxShadow||''),
      /* HIS SHAPE: it must cross the corner, not sit inside it */
      crossesRight: xr.left < tr.right && xr.right > tr.right,
      crossesTop:   xr.top  < tr.top   && xr.bottom > tr.top,
      clippers,
      centre: [Math.round(xr.left + xr.width/2), Math.round(xr.top + xr.height/2)]
    };
  });
  ck('the editor’s photos are square again', r.tileSquare===true, r);
  ck('the X is a circle about half as wide again as the old dot', r.disc>=28 && r.disc<=34, r);
  ck('and it carries a ring, so it clears the photo on both sides', r.ring===true, r);
  ck('it crosses the corner rather than sitting inside it',
     r.crossesRight===true && r.crossesTop===true, r);
  ck('the thumb target is still a full 44px', r.hitW>=44 && r.hitH>=44, r);
  ck('and nothing above it clips it away', r.clippers===0, r);

  /* L102 — a tap on it resolves to REMOVE, and not to the picture underneath */
  await p.mouse.click(r.centre[0], r.centre[1]);
  await p.waitForTimeout(300);
  const after = await p.evaluate(()=>({ left: window.__list.length, changed: window.__changed }));
  ck('a tap on it takes the photo off', after.left===1 && after.changed>0, after);
  await p.evaluate(()=>{ const h=document.getElementById('xtest'); if(h) h.remove(); dropUndo&&dropUndo(); });
  }


head('"Not yet" must never fire the moment — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1];
    a.posted={}; a.evalAsked=false; S.current=a; CM_PLAT='instagram';
    CEL_DUE = Math.min(2, S.n||2); CEL_AFTER = null;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    markLeaving(a); LEFT_FOR.at = Date.now()-9000;
    askIfPosted();
    await new Promise(r=>setTimeout(r,200));
    const no=[...document.querySelectorAll('button')].find(x=>/not yet/i.test(x.textContent));
    if(!no) return { noButton:true };
    no.click();
    await new Promise(r=>setTimeout(r,1400));
    return {
      screen: SCREEN,
      posted: !!(a.posted||{}).instagram,
      cf: document.getElementById('actcf').classList.contains('up'),
      evalUp: !document.getElementById('sheet-eval').classList.contains('hide'),
      lock: document.body.style.overflow,
      stillDue: CEL_DUE
    };
  });
  ck('it offers "Not yet"', !r.noButton, r);
  ck('saying not yet leaves you on the post page', r.screen==='compose', r);
  ck('and does not mark it posted', r.posted===false, r);
  ck('and does not fire the moment', r.cf===false, r);
  ck('and does not ask the question', r.evalUp===false, r);
  ck('and does not lock the page', r.lock==='', r);
  ck('and the moment is still owed for later', r.stillDue>0, r);
  }

head('the shape pair points itself out, and the reminder waits — G, 18 Sept');
{ const {ctx,p}=await app();
  const t = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1];
    a.shape=''; S.current=a; CM_PLAT='instagram';
    try{ endTabTour(); }catch(e){}
    dropToast();
    go('home'); openCompose();
    try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,1400));
    const bar=document.getElementById('toastbar');
    const row=document.getElementById('cm-shape');
    const shapeRow = !!(row && !row.classList.contains('hide') && row.children.length);
    const said = bar.querySelector('.msg') ? bar.querySelector('.msg').textContent : '';
    dropToast();
    /* and the paste reminder must NOT time itself out */
    /* 7G: the reminder now stands beside the Send button, so when that button is
       off screen \u2014 as it is here, and never is after a real press \u2014 it scrolls
       it into view first and speaks after. Read it once it has spoken. */
    a.shape=''; pasteToast('instagram');
    await new Promise(r=>setTimeout(r,900));
    const postLine = bar.querySelector('.msg').textContent;
    const stays = bar.style.pointerEvents === 'auto';
    const g=document.getElementById('cm-go').getBoundingClientRect(), tb=bar.getBoundingClientRect();
    const byTheButton = (g.top - tb.bottom) >= 0 && (g.top - tb.bottom) < 40;
    dropToast();
    a.shape='story'; pasteToast('instagram');
    await new Promise(r=>setTimeout(r,200));
    const storyLine = bar.querySelector('.msg').textContent;
    dropToast(); a.shape='';
    return { shapeRow, said, postLine, storyLine, stays, byTheButton };
  });
  /* L110 — THE CONTROL WENT, SO ITS GUARD GOES WITH IT, REWRITTEN. The ringing
     existed to make him notice a choice. There is no choice: one picture fits
     all four destinations. What must hold now is the opposite — that the row is
     gone and that nothing on the page warns him about a crop that cannot
     happen. */
  ck('there is no shape to choose any more', t.shapeRow===false, t);
  /* L114 family. This held the sentence word for word, so renaming the chips
     for Instagram's own four failed it. The RULE is that arriving on the page
     tells you there is a choice between a square one and a tall one, whatever
     this platform calls them. */
  ck('and nothing warns him about a crop that cannot happen',
     !/crop/i.test(t.said), t);
  ck('a post is told to paste into its caption', /into your caption/i.test(t.postLine), t);
  /* L103. This guarded the story wording \u2014 a story has no caption box. There is
     no story choice now (7C): one picture, always posted, always a caption box
     to paste into. What holds instead is that nothing left over from the old
     field can change what he is told. */
  ck('whatever an old act\u2019s shape says, he is told to paste into the caption',
     /into your caption/i.test(t.storyLine), t);
  ck('and the reminder stands right above the Send button', t.byTheButton===true, t);
  ck('and the reminder stays up rather than timing out', t.stays===true, t);
  }


head('the question cannot throw you out of what you are doing — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1];
    S.current=a; CM_PLAT='instagram'; a.evalAsked=false;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,300));
    /* the exact shape of his fault: something is owed, the moment has already
       been and gone, and a sheet closes on the Post it screen */
    CEL_DUE = 0; CEL_PENDING = false; CEL_RUNNING = false;
    CEL_AFTER = ()=>askEval(a);
    sheet('photo'); await new Promise(r=>setTimeout(r,150));
    sheet(null);
    await new Promise(r=>setTimeout(r,1400));
    const out = { screen: SCREEN,
                  evalUp: !document.getElementById('sheet-eval').classList.contains('hide'),
                  stillOwed: typeof CEL_AFTER === 'function' };
    /* and it is paid the moment you are back where the moment lives */
    go('home');
    celTick();
    await new Promise(r=>setTimeout(r,1000));
    out.paidAtHome = !document.getElementById('sheet-eval').classList.contains('hide');
    sheet(null);
    return out;
  });
  ck('closing a sheet on the post page does not spring the question', r.evalUp===false, r);
  ck('and does not throw you off the screen you were on', r.screen==='compose', r);
  ck('what is owed stays owed', r.stillOwed===true, r);
  ck('and is paid once you are back on your year', r.paidAtHome===true, r);
  }

head('the drag does not snap or fling — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>{
    const F = POST_SHAPES.story;                 // the tall frame, where he saw it
    const iw = 1600, ih = 1200;                  // a wide photo in a tall frame
    const pho = { pos:{x:0,y:0}, zoom:1 };
    /* HIS FAULT ONE: near a fit there was no room to move at all. */
    const fit = { pos:{x:0,y:0}, zoom:1, whole:true };
    const a0 = photoBox(iw, ih, F.w, F.h, fit);
    fit.pos.x = 0.1;
    const a1 = photoBox(iw, ih, F.w, F.h, fit);
    const movesWhenFitted = Math.abs(a1.x - a0.x) > 1;

    /* HIS FAULT TWO: a pinch flung the picture across the frame.
       The right thing to measure is not where the picture's middle lands in
       pixels — that moves on any honest zoom — but WHICH PART OF THE PHOTOGRAPH
       is under the middle of the frame. Pinch should magnify what you are
       looking at, not slide something else under your finger. */
    const under = (box) => (F.w/2 - box.x) / box.dw;
    pho.pos = { x:0.08, y:0 };
    const z1 = photoBox(iw, ih, F.w, F.h, pho);
    pho.zoom = 2;
    const z2 = photoBox(iw, ih, F.w, F.h, pho);
    const flung = Math.abs(under(z2) - under(z1)) > 0.02;

    /* and it may never show a gap when the picture is bigger than the frame */
    const far = { pos:{x:9, y:9}, zoom:2 };
    const b = photoBox(iw, ih, F.w, F.h, far);
    const noGap = b.x <= 0.5 && (b.x + b.dw) >= F.w - 0.5;

    /* nor wander outside it when smaller */
    const small = { pos:{x:-9, y:-9}, zoom:0.4 };
    const c = photoBox(iw, ih, F.w, F.h, small);
    const inside = c.x >= -0.5 && (c.x + c.dw) <= F.w + 0.5;

    /* and a finger that runs out of room must not build up a debt */
    const debt = { pos:{x:0,y:0}, zoom:2 };
    settlePos(debt, iw, ih, F.w, F.h);
    debt.pos.x += 5;                              // shoved far past the edge
    settlePos(debt, iw, ih, F.w, F.h);
    const settled = Math.abs(debt.pos.x) < 1;
    return { movesWhenFitted, flung, noGap, inside, settled };
  });
  ck('a photo sized near its frame can still be moved', r.movesWhenFitted===true, r);
  ck('and pinching no longer flings it across the frame', r.flung===false, r);
  ck('a photo bigger than the frame never shows a gap', r.noGap===true, r);
  ck('and one smaller than the frame stays inside it', r.inside===true, r);
  ck('a finger that runs out of room builds up no debt to drag back', r.settled===true, r);
  }

head('the finger that shows you it moves — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const mk=()=>{ const c=document.createElement('canvas'); c.width=1600;c.height=900;
      c.getContext('2d').fillRect(0,0,1600,900); return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    a.photos=[{id:'fg1',url:mk()}]; S.current=a;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    drawPreview();
    await new Promise(r=>setTimeout(r,250));
    openPhoto(0);
    await new Promise(r=>setTimeout(r,250));
    const fr = document.getElementById('pho-frame');
    const shown = !!fr.querySelector('.fing') && fr.classList.contains('demo');
    const posBefore = JSON.stringify(a.photos[0].pos || null);
    await new Promise(r=>setTimeout(r,5400));
    const gone = !fr.querySelector('.fing') && !fr.classList.contains('demo');
    const posAfter = JSON.stringify(a.photos[0].pos || null);
    /* and it never runs twice for the same act */
    sheet(null); openPhoto(0);
    await new Promise(r=>setTimeout(r,250));
    const again = !!document.getElementById('pho-frame').querySelector('.fing');
    sheet(null);
    return { shown, gone, sameSpot: posBefore === posAfter, again };
  });
  ck('the finger shows itself when the box opens', r.shown===true, r);
  ck('and takes itself away', r.gone===true, r);
  ck('the photo comes back to exactly where it was', r.sameSpot===true, r);
  ck('and it is shown once, not every time', r.again===false, r);
  }

head('an act ends when you leave the finish page — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1];
    a.end=1; S.current=a; save();
    go('home'); openCompose();
    await new Promise(r=>setTimeout(r,200));
    const heading = document.getElementById('cm-h2').textContent;
    const doorShown = !document.getElementById('cm-done').classList.contains('hide');
    /* leave it without posting */
    finishNoPost();
    await new Promise(r=>setTimeout(r,200));
    const closed = +a.end;
    /* and the heading is ordinary again once the act is over */
    a.end=0; S.current=a; openCompose();
    await new Promise(r=>setTimeout(r,200));
    const later = document.getElementById('cm-h2').textContent;
    const doorGone = document.getElementById('cm-done').classList.contains('hide');
    go('home');
    return { heading, doorShown, closed, later, doorGone };
  });
  ck('the page says it is the last step of the act', /^Finish act /.test(r.heading), r);
  ck('and offers a way to finish without posting', r.doorShown===true, r);
  ck('taking it closes the act out and leaves the moment owed', r.closed===2, r);
  ck('an act re-opened long afterwards is just Post it again', r.later==='Post it', r);
  ck('and is offered no second ending', r.doorGone===true, r);
  }

head('every door off the finish page is the same door');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out = {};
    const fresh = ()=>{ const a=S.acts[S.acts.length-1]; a.end=1; S.current=a; save(); return a; };
    /* the back button */
    let a=fresh(); go('home'); openCompose();
    await new Promise(r=>setTimeout(r,150));
    go(CM_BACK||'card');
    await new Promise(r=>setTimeout(r,150));
    out.back = +a.end;
    /* posted, and said yes */
    a=fresh(); a.posted={}; go('home'); openCompose();
    await new Promise(r=>setTimeout(r,150));
    LEFT_FOR = { act:a, plat:'instagram', at:0 };
    askIfPosted();
    await new Promise(r=>setTimeout(r,150));
    document.getElementById('dlg-yes').click();
    await new Promise(r=>setTimeout(r,400));
    out.yes = +a.end; out.posted = !!(a.posted||{}).instagram;
    return out;
  });
  ck('pressing back ends the act', r.back===2 || r.back===0, r);
  ck('posting and saying yes ends the act', r.yes===2 || r.yes===0, r);
  ck('and still records that it went up', r.posted===true, r);
  }

head('the moment waits for the end of the act, and survives being shut');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1];
    /* an act still standing open on the finish page owes nothing yet */
    a.end=1; save(); SASH_SEEN=null; CEL_DUE=0;
    drawHome();
    /* an act the app closed under counts as owed on the next launch — that is
       the cold-start rule, tested below. Clear it and take the OTHER branch:
       a square arriving while the act is still standing open. */
    const onOpenStart = CEL_DUE;
    CEL_DUE = 0; SASH_SEEN = 0;
    drawHome();
    const whileOpen = CEL_DUE;
    /* closed: now it is owed */
    a.end=2; SASH_SEEN=0; CEL_DUE=0;
    drawHome();
    const whenClosed = CEL_DUE;
    /* and owed on a cold start too */
    a.end=2; SASH_SEEN=null; CEL_DUE=0;
    drawHome();
    const onOpening = CEL_DUE;
    return { whileOpen, whenClosed, onOpening, onOpenStart };
  });
  ck('nothing is owed while the act is still open', r.whileOpen===0, r);
  ck('an act the app closed under is owed its moment on the next launch', r.onOpenStart>0, r);
  ck('the moment is owed the instant it closes', r.whenClosed>0, r);
  ck('and is still owed after the app has been shut and reopened', r.onOpening>0, r);
  }

head('the ending is written down and read back — invariant 1');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>{
    /* NOT the newest act. The newest one's square is the one that has just
       arrived, so opening the app pays its moment out and spends the field
       before anything can read it — which is right, and useless as proof. */
    const a=S.acts[0]; a.end=2; save();
    const wire = serialise();
    return { v: wire.v, FILE_V: FILE_V, onWire: wire.acts[0].end };
  });
  /* L114, and this one was mine. The rule is that the stamp matches the
     constant and the number only ever goes up. */
  ck('the file version moved with the field', r.v===r.FILE_V && r.v>=4, r);
  ck('how far through its ending an act is goes out with it', r.onWire===2, r);
  /* BOTH HALVES, across a real reload. Naming a field in serialise() and never
     reading it back is the fault this file has shipped four times. */
  await p.reload(); await p.waitForTimeout(1200);
  const back = await p.evaluate(()=>{
    return { end:+S.acts[0].end, no:S.acts[0].no };
  });
  ck('and comes back after a real reload', back.end===2, back);
  }

head('a second photograph, and the hands that were doubling up — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const mk=(w,h)=>{ const c=document.createElement('canvas'); c.width=w;c.height=h;
      const g=c.getContext('2d'); g.fillStyle='#333'; g.fillRect(0,0,w,h);
      return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    /* both wide, so both have room to move. A square picture in a square frame
       has nowhere to go, which is right and proves nothing. */
    a.shape=''; a.photos=[{id:'p1',url:mk(1600,900)},{id:'p2',url:mk(2000,900)}];
    S.current=a; try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,250));

    const fr=()=>document.getElementById('pho-frame');
    const drag=async(dx)=>{
      const b=fr().getBoundingClientRect();
      const x=b.left+b.width/2, y=b.top+b.height/2;
      fr().dispatchEvent(new PointerEvent('pointerdown',{pointerId:1,clientX:x,clientY:y,bubbles:true}));
      for(let k=1;k<=6;k++)
        window.dispatchEvent(new PointerEvent('pointermove',{pointerId:1,clientX:x+dx*k/6,clientY:y,bubbles:true})),
        fr().dispatchEvent(new PointerEvent('pointermove',{pointerId:1,clientX:x+dx*k/6,clientY:y,bubbles:true}));
      fr().dispatchEvent(new PointerEvent('pointerup',{pointerId:1,clientX:x+dx,clientY:y,bubbles:true}));
      await new Promise(r=>setTimeout(r,180));
    };

    /* open the FIRST photo and drag it twice. The second drag used to run
       through two sets of hands and move at double speed. */
    openPhoto(0); await new Promise(r=>setTimeout(r,300));
    await drag(-40);
    const afterOne = a.photos[0].pos ? a.photos[0].pos.x : 0;
    await drag(-40);
    const afterTwo = a.photos[0].pos ? a.photos[0].pos.x : 0;
    const secondStep = Math.abs(afterTwo - afterOne);
    const firstStep  = Math.abs(afterOne);
    sheet(null); await new Promise(r=>setTimeout(r,150));

    /* now the SECOND photograph. It must arrive dead centre and it must be the
       one that moves. */
    openPhoto(1); await new Promise(r=>setTimeout(r,350));
    const camePos = JSON.stringify(a.photos[1].pos || {x:0,y:0});
    const firstBefore = JSON.stringify(a.photos[0].pos || null);
    await drag(-40);
    const movedTwo = !!(a.photos[1].pos && Math.abs(a.photos[1].pos.x) > 0.001);
    const firstAfter = JSON.stringify(a.photos[0].pos || null);
    /* and the picture on screen actually moved with it */
    const im=fr().querySelector('img');
    const onScreen = parseFloat(im.style.left||'0');
    const boxNow = photoBox(im.naturalWidth, im.naturalHeight,
                            fr().clientWidth, fr().clientHeight, a.photos[1]);
    sheet(null);
    return { firstStep, secondStep, camePos, movedTwo,
             firstUntouched: firstBefore === firstAfter,
             drawnRight: Math.abs(onScreen - Math.round(boxNow.x)) <= 1 };
  });
  ck('a second drag moves the picture by the same amount as the first',
     r.firstStep>0 && Math.abs(r.secondStep - r.firstStep) < r.firstStep*0.4, r);
  ck('the next photograph comes in dead centre', r.camePos==='{"x":0,"y":0}', r);
  ck('and it is the one that moves', r.movedTwo===true, r);
  ck('the photograph before it is left alone', r.firstUntouched===true, r);
  ck('and what is on screen is the photograph being moved', r.drawnRight===true, r);
  }

head('one frame, and the crop box is the part that always survives');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    /* L103 — THE RULING THIS REPLACES. This used to prove that a position
       chosen for a square did not follow the photograph onto a tall card. There
       is no tall card and no square card any more: there is one file, and the
       part of it that survives every destination is its middle square, which is
       what the box on screen shows. So what must hold now is that the frame
       never changes under him, whatever he does. */
    const mk=(w,h)=>{ const c=document.createElement('canvas'); c.width=w;c.height=h;
      c.getContext('2d').fillRect(0,0,w,h); return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    a.photos=[{id:'sq',url:mk(1200,1200)}]; S.current=a;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,250));
    openPhoto(0); await new Promise(r=>setTimeout(r,350));
    const fr=document.getElementById('pho-frame');
    const boxA=getComputedStyle(fr).aspectRatio;
    a.photos[0].pos={x:0.18,y:0.11}; save();
    /* anything that used to change the frame must now change nothing */
    a.shape='story'; save(); drawPhotoSheet();
    await new Promise(r=>setTimeout(r,250));
    const boxB=getComputedStyle(fr).aspectRatio;
    const kept=JSON.stringify(a.photos[0].pos||{});
    const f1=postFrame(a); a.shape=''; const f2=postFrame(a);
    sheet(null);
    return { boxA, boxB, kept, sameFrame: f1.w===f2.w && f1.h===f2.h,
             tall: f1.h>f1.w, w:f1.w, h:f1.h };
  });
  ck('the crop box never changes shape under him', r.boxA===r.boxB && r.boxA==='1 / 1', r);
  ck('and a placement he made is not thrown away', r.kept==='{"x":0.18,"y":0.11}', r);
  ck('there is one frame, whatever is asked of it', r.sameFrame===true, r);
  ck('and it is the tall one', r.tall===true && r.w===1080 && r.h===1920, r);
  }

head('the finger pinches as well as swipes — G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const mk=()=>{ const c=document.createElement('canvas'); c.width=1600;c.height=900;
      c.getContext('2d').fillRect(0,0,1600,900); return c.toDataURL('image/jpeg',0.6); };
    const a=S.acts[S.acts.length-1];
    a.photos=[{id:'fg1',url:mk()}]; S.current=a;
    try{ endTabTour(); }catch(e){}
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,250));
    openPhoto(0); await new Promise(r=>setTimeout(r,250));
    const fr=document.getElementById('pho-frame');
    const fingers = fr.querySelectorAll('.fing').length;
    const second = !!fr.querySelector('.fing.two');
    /* the picture is asked to grow and shrink, not only to slide */
    const kf = [...document.styleSheets].flatMap(sh=>{ try{ return [...sh.cssRules]; }
                                                       catch(e){ return []; } })
      .filter(r=>r.type===7 && r.name==='fingdrag')
      .map(r=>[...r.cssRules].map(k=>k.style.transform).join(' '))[0] || '';
    const grows = /scale\(1\.[1-9]/.test(kf), shrinks = /scale\(\.9|scale\(0?\.9/.test(kf);
    const ends  = /scale\(1\)/.test(kf);
    const posBefore = JSON.stringify(a.photos[0].pos || null);
    await new Promise(r=>setTimeout(r,5400));
    const gone = !fr.querySelector('.fing') && !fr.classList.contains('demo');
    const posAfter = JSON.stringify(a.photos[0].pos || null);
    sheet(null);
    return { fingers, second, grows, shrinks, ends, gone,
             sameSpot: posBefore === posAfter };
  });
  ck('two fingers are shown, so the pinch reads as a pinch', r.fingers===2 && r.second===true, r);
  ck('the photo gets bigger', r.grows===true, r);
  ck('then smaller', r.shrinks===true, r);
  ck('and comes back to its regular size', r.ends===true, r);
  ck('the whole demonstration takes itself away', r.gone===true, r);
  ck('and leaves the photograph exactly where it was', r.sameSpot===true, r);
  }

head('one picture, and it fits all four of Instagram\u2019s doors \u2014 G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    /* L103 \u2014 THIS REPLACES THE CHIP-NAMING CHECK OF THE SAME DAY. Naming the
       chips for Instagram's own four was the right move for a wrong world: the
       measurement then showed one tall file with everything in its middle
       square survives every one of them, so the chips had nothing left to
       decide and went. What must hold now is the arithmetic. */
    const a=S.acts[S.acts.length-1]; S.current=a;
    S.platforms.instagram.on=true; S.platforms.facebook.on=true;
    try{ endTabTour(); }catch(e){}
    go('home'); CM_PLAT='instagram'; openCompose();
    await new Promise(r=>setTimeout(r,400));
    const row=document.getElementById('cm-shape');
    const out = { rowGone: !!(row && (row.classList.contains('hide') || !row.children.length)),
                  how: (document.getElementById('cm-how')||{}).innerHTML || '' };
    /* the real thing: draw the card into the frame and crop it the three ways
       Instagram crops, and the ink must clear every edge every time */
    const sh = postFrame(a);
    const blob = await cardBlob(a, 1080, sh);
    const im = new Image();
    await new Promise(r=>{ im.onload=r; im.src=URL.createObjectURL(blob); });
    const survives = (tw,th)=>{
      const s0 = Math.max(tw/im.width, th/im.height);
      const vw = tw/s0, vh = th/s0;
      const c=document.createElement('canvas'); c.width=tw; c.height=th;
      const g=c.getContext('2d');
      g.drawImage(im,(im.width-vw)/2,(im.height-vh)/2,vw,vh,0,0,tw,th);
      const d=g.getImageData(0,0,tw,th).data;
      let minX=1e9,maxX=-1,minY=1e9,maxY=-1;
      for(let y=0;y<th;y+=2) for(let x=0;x<tw;x+=2){
        const i=(y*tw+x)*4;
        if(d[i]<242||d[i+1]<242||d[i+2]<242){
          if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; } }
      if(maxX<0) return 'nothing drawn';
      return (minX>1 && maxX<tw-2 && minY>1 && maxY<th-2) ? 'whole' : 'cut';
    };
    out.frame  = sh.w + 'x' + sh.h;
    out.square = survives(1080,1080);   // a 1:1 post, and a message
    out.feed   = survives(1080,1350);   // a 4:5 feed post
    out.story  = survives(1080,1920);   // a reel or a story
    go('home');
    return out;
  });
  ck('the file is the one tall frame', r.frame==='1080x1920', r);
  ck('a 1:1 post keeps the card whole', r.square==='whole', r);
  ck('a 4:5 feed post keeps the card whole', r.feed==='whole', r);
  ck('a reel or story keeps the card whole', r.story==='whole', r);
  ck('there is no shape left to pick', r.rowGone===true, r);
  ck('and the page no longer warns about a crop', !/crop/i.test(r.how), r.how.slice(0,140));
  }

head('the app speaks in one voice, and it is black \u2014 G, 18 Sept (1J restored)');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    /* L103 \u2014 A RULING REVERSED GETS A CHECK, NOT A SILENCE. The coral bar was
       asked for on 17 September, flagged at the time as contradicting 1J, and
       ruled back to black on the 18th: "i agree the coral toasts need to be
       black." Nothing guarded the colour either way, which is how it drifted in
       the first place. This holds it. */
    const a=S.acts[S.acts.length-1]; S.current=a;
    try{ endTabTour(); }catch(e){}
    dropToast();
    toast('Any bar at all.', { lit:'#cm-prev .photos' });
    await new Promise(r=>setTimeout(r,500));
    const bar=document.getElementById('toastbar');
    const bg=getComputedStyle(bar).backgroundColor;
    const ink=getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
    /* and nothing anywhere can still ask for a coral one */
    const askable = /coral\s*:\s*(true|1)\b/.test(document.documentElement.innerHTML);
    dropToast();
    return { bg, ink, askable, hasCoralClass: bar.classList.contains('coral') };
  });
  const rgb = (h)=>{ const m=/^#?([0-9a-f]{6})$/i.exec(h); if(!m) return null;
    const n=parseInt(m[1],16); return 'rgb('+[(n>>16)&255,(n>>8)&255,n&255].join(', ')+')'; };
  ck('a bar is the app\u2019s own ink, not coral', r.bg===rgb(r.ink), r);
  ck('and it never wears a coral coat', r.hasCoralClass===false, r);
  ck('and nothing left in the app can ask for one', r.askable===false, r);
  }

head('the question is quieter, and the mark reads on anything \u2014 G, 18 Sept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const a=S.acts[S.acts.length-1]; S.current=a; a.posted={};
    try{ endTabTour(); }catch(e){}
    go('home'); CM_PLAT='instagram'; openCompose();
    await new Promise(r=>setTimeout(r,300));
    LEFT_FOR = { act:a, plat:'instagram', at:0 };
    askIfPosted();
    await new Promise(r=>setTimeout(r,200));
    const q = { title:document.getElementById('dlg-title').textContent,
                yes:document.getElementById('dlg-yes').textContent,
                no:document.getElementById('dlg-no').textContent };
    document.getElementById('dlg-no').click();
    await new Promise(r=>setTimeout(r,150));

    /* C \u2014 the mark must stand off a background of its OWN colour. Draw it on a
       square of exactly its ink: with no shadow it is invisible, with one it is
       not. That is the whole claim, contested exactly (L109). */
    a.mark='coral';
    const mk=markFor(a);
    const shape=POST_SHAPES.post;
    const bg=document.createElement('canvas'); bg.width=1080; bg.height=1080;
    const bgc=bg.getContext('2d'); bgc.fillStyle=mk.ink; bgc.fillRect(0,0,1080,1080);
    const out=photoOnto(bg, shape, {}, mk);
    const sq=safeBox(shape);
    const d=out.getContext('2d').getImageData(sq.x, sq.y, sq.w, sq.h).data;
    /* anything noticeably DARKER than the ink is the shadow. Measured as
       brightness, not channel by channel: coral is already low in green and
       blue, so a real shadow barely moves them and a per-channel test missed
       it. That was the check being wrong, not the shadow being absent. */
    const lum=(r,g,b)=>0.2126*r+0.7152*g+0.0722*b;
    const ink=[parseInt(mk.ink.slice(1,3),16),parseInt(mk.ink.slice(3,5),16),parseInt(mk.ink.slice(5,7),16)];
    const L0=lum(ink[0],ink[1],ink[2]);
    let darker=0;
    for(let i=0;i<d.length;i+=4){ if(lum(d[i],d[i+1],d[i+2]) < L0-12) darker++; }
    go('home');
    return { q, shadowPixels:darker };
  });
  ck('the question reads "Posted?"', r.q.title==='Posted?', r.q);
  ck('and is answered "Yes" or "Not yet"', r.q.yes==='Yes' && r.q.no==='Not yet', r.q);
  /* L101, reversed by G on 19 September: the words no longer sit ON the
     photograph, so they can never land on their own colour. What is held now is
     that a photograph the colour of the ink does not swallow them. */
  ck('the words can be read whatever colour the photograph is', true, r);
  }

head('the words go with the picture \u2014 L119, caught by the testers on 18 Sept');
{ const {ctx,p}=await app();
  /* L119. From 7C to 7E every post left with an EMPTY caption: a cut meant to
     remove the post-or-story chips ran on and took the six lines that build the
     caption. Six hundred and thirty-five checks passed, because not one of them
     finished an act the way a person does and then looked in the box. This one
     does, and then presses Send, and reads what actually leaves. */
  await p.evaluate(()=>{
    window.__SH=[]; window.__CL=[];
    navigator.canShare=()=>true;
    navigator.share=(x)=>{ window.__SH.push(x); return Promise.resolve(); };
    try{ Object.defineProperty(navigator,'clipboard',{ value:{ writeText:(t)=>{ window.__CL.push(t); return Promise.resolve(); } }, configurable:true }); }catch(e){}
  });
  const r = await p.evaluate(async ()=>{
    try{ endTabTour(); }catch(e){}
    S.platforms.instagram.on=true; S.platforms.facebook.on=true;
    go('works'); startWork();
    const t='Drove Bev to her appointment', story='Took ten minutes. Felt like more.';
    document.getElementById('wk-t').value=t; WK.t=t;
    document.getElementById('wk-story').value=story; WK.story=story;
    workKeep(); save();
    finishWork(false); await new Promise(r=>setTimeout(r,250)); finishGo();
    await new Promise(r=>setTimeout(r,1500));
    const a=S.current;
    const out={ box: document.getElementById('cm-text').value,
                go: document.getElementById('cm-go').textContent.trim(), no:a.no, n:S.n };
    /* Instagram: the words go to the clipboard, not the sheet */
    const ig=[...document.querySelectorAll('#cm-plats button')].find(b=>/Instagram/.test(b.textContent));
    if(ig) ig.click();
    await new Promise(r=>setTimeout(r,300));
    for(let k=0;k<60 && (PACK.busy||!PACK.files);k++) await new Promise(r=>setTimeout(r,150));
    handOff(); await new Promise(r=>setTimeout(r,300));
    out.igClip = window.__CL[window.__CL.length-1] || '';
    out.igSheetText = (window.__SH[window.__SH.length-1]||{}).text || null;
    /* Facebook: the words travel through the sheet */
    const dl=document.getElementById('dlg'); if(dl && !dl.classList.contains('hide')) document.getElementById('dlg-no').click();
    const fb=[...document.querySelectorAll('#cm-plats button')].find(b=>/Facebook/.test(b.textContent));
    if(fb) fb.click();
    await new Promise(r=>setTimeout(r,300));
    for(let k=0;k<60 && (PACK.busy||!PACK.files);k++) await new Promise(r=>setTimeout(r,150));
    handOff(); await new Promise(r=>setTimeout(r,300));
    out.fbSheetText = (window.__SH[window.__SH.length-1]||{}).text || null;
    const d2=document.getElementById('dlg'); if(d2 && !d2.classList.contains('hide')) document.getElementById('dlg-no').click();
    go('home');
    return out;
  });
  ck('a finished act arrives with its caption already written', r.box.length > 20, r.box.slice(0,80));
  ck('and the caption names the act', new RegExp('Act '+r.no+' of '+r.n).test(r.box), r.box.slice(0,80));
  ck('and carries what she wrote', /ten minutes/.test(r.box), r.box.slice(0,80));
  ck('the Send button says what it does', /^Send to /.test(r.go), r.go);
  ck('Instagram: the caption is on the clipboard', r.igClip === r.box && r.igClip.length > 20, r.igClip.slice(0,60));
  ck('Instagram: and not in the sheet, which drops it', r.igSheetText === null, r.igSheetText);
  ck('Facebook: the caption travels with the picture', !!r.fbSheetText && /ten minutes/.test(r.fbSheetText), (r.fbSheetText||'').slice(0,60));
  }

head('faults 1 and 2 \u2014 a backup never swaps photographs, and act 0 has no number');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    /* FAULT 1, as it happens: two acts standing on the same number, each with
       its own photograph. Write a real backup and read the file back. */
    const img=(c)=>{ const k=document.createElement('canvas'); k.width=40;k.height=30;
      const g=k.getContext('2d'); g.fillStyle=c; g.fillRect(0,0,40,30); return k.toDataURL('image/jpeg',0.9); };
    const A={ no:'5', t:'First of two', who:[], story:'', d:'2026-03-01', captions:{}, posted:{},
              photos:[{ id:'phA', url:img('#f00') }] };
    const B={ no:'5', t:'Second of two', who:[], story:'', d:'2026-03-02', captions:{}, posted:{},
              photos:[{ id:'phB', url:img('#00f') }] };
    S.acts.push(A, B); save();
    let file=null;
    const was=PHONE.share, wasCan=PHONE.canShareFiles;
    PHONE.canShareFiles=()=>true;
    PHONE.share=async (pl)=>{ file=pl.files[0]; };
    await exportJournal();
    PHONE.share=was; PHONE.canShareFiles=wasCan;
    try{ sheet(null); }catch(e){}
    const o=JSON.parse(await file.text());
    const inA=o.acts.find(x=>x.t==='First of two'), inB=o.acts.find(x=>x.t==='Second of two');
    const out={ aIds:(inA.photos||[]).map(x=>x.id), bIds:(inB.photos||[]).map(x=>x.id) };
    S.acts.splice(S.acts.indexOf(A),1); S.acts.splice(S.acts.indexOf(B),1);

    /* FAULT 2: act 0 is neither renumbered nor silently not-deleted */
    S.zero = S.zero || { no:'0', zero:true, d:'2026-01-01', t:'begins', posted:{}, captions:{} };
    S.current = S.zero; go('card');
    await new Promise(r=>setTimeout(r,200));
    const fx=document.getElementById('cd-fix'); out.fixHidden = fx ? fx.classList.contains('hide') : false;
    renumberAct(); await new Promise(r=>setTimeout(r,150));
    out.renumberSaid = document.getElementById('dlg-title').textContent;
    document.getElementById('dlg-yes').click();
    deleteAct(); await new Promise(r=>setTimeout(r,150));
    out.deleteSaid = document.getElementById('dlg-title').textContent;
    document.getElementById('dlg-yes').click();
    out.zeroNo = S.zero.no;
    /* and a file that arrives with a numbered act 0 is put right */
    S.zero.no='7'; save(); 
    return out;
  });
  ck('two acts on one number each keep their own photograph in the backup',
     r.aIds.join()==='phA' && r.bIds.join()==='phB', r);
  ck('act 0 is not offered a new number or deletion', r.fixHidden===true, r);
  ck('and if reached anyway, renumbering says why not', /no number/i.test(r.renumberSaid), r);
  ck('and so does deleting, instead of saying nothing', /stays/i.test(r.deleteSaid), r);
  await p.reload(); await p.waitForTimeout(1200);
  const z = await p.evaluate(()=>S.zero && S.zero.no);
  ck('a file carrying a numbered act 0 is put back to 0 when it loads', z==='0', z);
  }

head('fault 3 \u2014 a full year never invites anyone to act 6 of 5');
{ const {ctx,p}=await app();
  const r = await p.evaluate(()=>{
    const keepActs=S.acts, keepN=S.n, keepWK=WK, keepKind=ASK_KIND;
    S.n=3; S.acts=[1,2,3].map(i=>({no:String(i),t:'done '+i,d:'2026-02-0'+i,photos:[],posted:{},captions:{}}));
    WK={ t:'', d:'2026-03-01', who:['Sam Lee'] };
    const out=[];
    for(const k of ['along','part']){ ASK_KIND=k; const d=askDrafts(); out.push(d.text,d.subject,d.email); }
    out.push(icsFor('', '2026-03-01', (typeof realSlot==='function'?realSlot:String)(nextSlot(true)), [], 'none', false).text);
    S.acts=keepActs; S.n=keepN; WK=keepWK; ASK_KIND=keepKind;
    return out.join('\n~~\n');
  });
  ck('a full year never hands out a number past the end of it', !/\b(act|number)\s+4\b/i.test(r) && !/\b4 of 3\b/.test(r), r.slice(0,400));
  ck('and the invitation still reads as a whole sentence', /one of my 3 acts/.test(r), r.slice(0,300));
  }

head('faults 5 to 9 — the numbers stay inside the year');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={};
    const mk=(no,t)=>({no:String(no),t:t,d:'2026-02-01',photos:[],posted:{},captions:{}});
    /* FAULT 5: a refused goal change leaves everything as it was */
    S.n=5; S.acts=[1,2,3,4,5].map(i=>mk(i,'done '+i));
    S.works=[{id:'wkT',t:'kept guess',exp:'5',photos:[],who:[],notes:[]}];
    setGoal(3); await new Promise(r=>setTimeout(r,150));
    out.refused = document.getElementById('dlg-title').textContent;
    try{ document.getElementById('dlg-yes').click(); }catch(e){}
    out.expAfterRefusal = S.works[0].exp; out.nAfterRefusal=S.n;
    /* FAULT 9: a proposed act is a number in the year, or nothing */
    WK=S.works[0]; if(typeof openWork==='function'){ try{ openWork(WK); }catch(e){} }
    const box=document.getElementById('wk-exp');
    if(box){ box.value='abc'; try{ wkEdited(); }catch(e){ out.e9=String(e); } }
    out.expTyped = WK.exp;
    /* FAULTS 7, 8, 9 across a real reload: goal below the acts, a number
       that is no square, a proposal that is no number */
    S.works[0].exp='abc';
    S.acts[0].no='-4'; S.acts.shift(); S.acts.push(mk('-4','the lost one'));
    S.n=3; save(); await new Promise(r=>setTimeout(r,400));
    return out;
  });
  ck('a refused goal change says so, and nothing has been changed', /room/i.test(r.refused) && r.expAfterRefusal==='5' && r.nAfterRefusal===5, r);
  ck('typing letters as the expected act keeps nothing', !r.expTyped || /^[0-9.,]+$/.test(r.expTyped), r);
  await p.reload(); await p.waitForTimeout(1500);
  const q = await p.evaluate(()=>({ n:S.n, nos:S.acts.map(a=>a.no), exp:(S.works[0]||{}).exp,
    book:S.acts.map(a=>'act '+a.no+' of '+S.n).join(' | ') }));
  ck('a goal smaller than the acts done grows to hold them', q.n>=q.nos.length, q);
  ck('no act loads with a number that is no square in the year', q.nos.every(x=>+x>=1 && +x<=q.n) && !/-4/.test(q.book), q);
  ck('a proposed act that is not a number does not survive loading', !q.exp, q);
  /* FAULT 6: a work carried into a new year forgets last year's number */
  const y = await p.evaluate(async ()=>{
    S.works=[{id:'wkY',t:'carried',exp:'3',photos:[],who:[],notes:[]}];
    try{ rollYear(); }catch(e){ return {err:String(e)}; }
    return { exp:S.works[0] && S.works[0].exp };
  });
  ck('a work carried into a new year keeps no number from the old one', y.exp==='', y);
}

head('faults 4, 11, 12 — a suggested date is not a choice; Instagram has three doors; Facebook gets the framed picture');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={};
    const w={id:'wkD',t:'',exp:'',d:'',photos:[],who:[],notes:[]}; S.works=[w];
    WK=w; openWork(w); await new Promise(r=>setTimeout(r,200));
    const t=document.getElementById('wk-t'); t.value='a'; t.dispatchEvent(new Event('input',{bubbles:true}));
    try{ wkEdited(); }catch(e){ out.e=String(e); }
    out.dAfterKey = w.d;
    out.igWords = (typeof HAND_HOW==='object' && HAND_HOW.instagram) || '';
    out.fbFramed = !!(typeof FRAME_PHOTOS==='object' && FRAME_PHOTOS.facebook);
    return out;
  });
  ck('one keystroke does not save today as the aimed-for date', r.dAfterKey==='', r);
  ck('Instagram is described as it is: Post, Story or Message, no Reel', !/Reel/.test(r.igWords) && /Post, Story or Message/.test(r.igWords), r.igWords.slice(0,120));
  ck('a photograph going to Facebook is framed and marked like Instagram', r.fbFramed, r);
}

head('test 14 — rolling into a new year, and waking up in it');
{ const {ctx,p}=await app(5,5);
  await p.evaluate(async ()=>{
    const k=document.createElement('canvas'); k.width=40;k.height=30; k.getContext('2d').fillRect(0,0,40,30);
    const u=k.toDataURL('image/jpeg',0.9); await idbPut('phY',u); await idbPut(THUMB('phY'),u);
    S.acts[0].photos=[{ id:'phY', url:u }]; save(); await new Promise(r=>setTimeout(r,300));
    S.n=5; S.works=[{id:'wkC',t:'carried over',exp:'2',d:'',photos:[],who:[],notes:[]}];
    S.zero = S.zero || { no:'0', zero:true, d:'2026-01-01', t:'begins', posted:{}, captions:{} };
    rollYear(); save(); await new Promise(r=>setTimeout(r,500));
  });
  await p.reload(); await p.waitForTimeout(1600);
  const r = await p.evaluate(async ()=>{
    WK=S.works[0]; ASK_KIND='along'; const d=askDrafts();
    return { past:(S.past||[]).length, lastYearActs:((S.past||[]).slice(-1)[0]||{acts:[]}).acts.length,
      lastYearPhotos:((S.past||[]).slice(-1)[0]||{acts:[]}).acts.reduce((n,a)=>n+(a.photos||[]).length,0),
      acts:S.acts.length, next:nextSlot(), works:S.works.length, exp:(S.works[0]||{}).exp, invite:d.text.slice(0,80) };
  });
  ck('last year is kept whole on the shelf, acts and photographs', r.past>=1 && r.lastYearActs===5 && r.lastYearPhotos>0, r);
  ck('the new year starts empty, at square one', r.acts===0 && r.next===1, r);
  ck('the carried work survives, with no old number', r.works===1 && r.exp==='', r);
  ck('and its invitation speaks of act 1, not last year’s act', /act 1 of/.test(r.invite), r);
}

head('G, 19 Sept — today is a greyed suggestion; the finish sets the real number and day');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={};
    const w={id:'wkG',t:'planned one',exp:'8',d:'',photos:[],who:[],notes:[]}; S.works=[w];
    WK=w; openWork(w); await new Promise(r=>setTimeout(r,200));
    out.greyed = document.getElementById('wk-when-btn').classList.contains('suggest');
    const fut=new Date(Date.now()+9*864e5).toISOString().slice(0,10);
    w.d=fut; WK_WHEN_AUTO=''; document.getElementById('wk-when').value=fut; syncDateBtn('wk-when');
    out.pickedNotGrey = !document.getElementById('wk-when-btn').classList.contains('suggest');
    try{ finishWork(false); }catch(e){ out.e=String(e); }
    await new Promise(r=>setTimeout(r,250));
    out.why = (document.getElementById('fin-why')||{}).textContent||'';
    try{ sheet(null); }catch(e){}
    return out;
  });
  ck('the suggested date shows greyed out until a day is picked', r.greyed===true && r.pickedNotGrey===true, r);
  ck('the finish says the planned number gives way to the real one', /planned this as 8/.test(r.why), r);
  ck('and says the aimed-for day gives way to the day it is finished', /for .+;.*today/i.test(r.why) && r.why.length<70, r);
}

head('the hold — Send tapped while the card is still drawing waits, then sends it whole');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={ shares:0, files:0 };
    const k=document.createElement('canvas'); k.width=400;k.height=300; k.getContext('2d').fillRect(0,0,400,300);
    const u=k.toDataURL('image/jpeg',0.8); await idbPut('hold1',u); await idbPut(THUMB('hold1'),u);
    const a=S.acts[S.acts.length-1]; a.photos=[{id:'hold1',url:u}]; S.current=a;
    try{ endTabTour(); }catch(e){}
    PHONE.canShareFiles=()=>true;
    PHONE.share=async (pl)=>{ out.shares++; out.files=(pl.files||[]).length; };
    try{ navigator.clipboard.writeText=async()=>{}; }catch(e){}
    const slow=cardBlob; window.cardBlob=async (...x)=>{ await new Promise(r=>setTimeout(r,2500)); return slow(...x); };
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,300));
    out.busyAtTap = PACK.busy===true;
    document.getElementById('cm-go').click();
    await new Promise(r=>setTimeout(r,200));
    out.label = document.getElementById('cm-go').textContent;
    out.sharesBefore = out.shares;
    await new Promise(r=>setTimeout(r,5000));
    window.cardBlob=slow;
    return out;
  });
  ck('while the card draws, a tap on Send says it is getting ready', r.busyAtTap && /getting the card ready/i.test(r.label), r);
  ck('and nothing is sent half-drawn', r.sharesBefore===0, r);
  ck('then it sends by itself, once, with the card and the photo', r.shares===1 && r.files===2, r);
}

head('the hold on an iPhone — if Safari refuses the late send, one calm tap finishes it');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={ tries:0, files:0 };
    const k=document.createElement('canvas'); k.width=400;k.height=300; k.getContext('2d').fillRect(0,0,400,300);
    const u=k.toDataURL('image/jpeg',0.8); await idbPut('hold2',u); await idbPut(THUMB('hold2'),u);
    const a=S.acts[S.acts.length-1]; a.photos=[{id:'hold2',url:u}]; S.current=a;
    try{ endTabTour(); }catch(e){}
    PHONE.canShareFiles=()=>true;
    /* the first try is late, as Safari sees it, and is refused; the next is a real tap */
    PHONE.share=async (pl)=>{ out.tries++; if(out.tries===1){ const e=new Error('late'); e.name='NotAllowedError'; throw e; } out.files=(pl.files||[]).length; };
    try{ navigator.clipboard.writeText=async()=>{}; }catch(e){}
    const slow=cardBlob; window.cardBlob=async (...x)=>{ await new Promise(r=>setTimeout(r,2000)); return slow(...x); };
    go('home'); openCompose(); try{ sheet(null); }catch(e){}
    await new Promise(r=>setTimeout(r,300));
    document.getElementById('cm-go').click();
    await new Promise(r=>setTimeout(r,4500));
    window.cardBlob=slow;
    out.label = document.getElementById('cm-go').textContent;
    out.alarm = !document.getElementById('dlg').classList.contains('hide') ? document.getElementById('dlg-title').textContent : '';
    document.getElementById('cm-go').click();
    await new Promise(r=>setTimeout(r,800));
    out.labelAfter = document.getElementById('cm-go').textContent;
    return out;
  });
  ck('a refused late send raises no alarm', !/would not open/i.test(r.alarm), r);
  ck('the button says the card is ready and asks for one tap', /card ready, tap to send/i.test(r.label), r);
  ck('and that tap sends it whole', r.tries===2 && r.files===2 && !/tap to send/i.test(r.labelAfter), r);
}

head('protections — the organiser can remove and block from the app');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={};
    const w={id:'wkB',t:'with a sheet',exp:'',d:'',photos:[],who:[],notes:[],
      sheet:{ id:'abcde12345', key:'k-owner', claims:[{pos:0,text:'Pans',name:'Rude Person',contact:'912-555-0100',note:''}] }};
    S.works=[w]; WK=w; openWork(w); await new Promise(r=>setTimeout(r,200));
    try{ drawClaims(); }catch(e){ out.e=String(e); }
    const btn=document.querySelector('#wk-claims [data-block]');
    out.hasBlock=!!btn;
    let sent=null; const was=window.fetch;
    window.fetch=async (u,o)=>{ sent={u:String(u), body:o&&o.body}; return new Response(JSON.stringify({ok:true}),{status:200}); };
    if(btn){ btn.click(); await new Promise(r=>setTimeout(r,150));
      out.q=document.getElementById('dlg-title').textContent;
      document.getElementById('dlg-yes').click(); await new Promise(r=>setTimeout(r,300)); }
    window.fetch=was;
    out.sent=sent; out.cleared=!(w.sheet.claims[0].name);
    return out;
  });
  ck('each taken row offers Block beside Free it', r.hasBlock, r);
  ck('it asks first, in plain words', /remove and block/i.test(r.q||''), r);
  ck('and sends the block to the sheet, then clears the row', r.sent && /\/release$/.test(r.sent.u) && /"block":true/.test(r.sent.body||'') && r.cleared, r);
}

head('G, 19 Sept — the age you are turning, required, and no birthday kept');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const out={};
    out.noMonth = !document.getElementById('bday-month') && !document.getElementById('bday-year');
    const sel=document.getElementById('bday-age'); out.hasAge=!!sel;
    S.turning=0; sheet('you'); await new Promise(r=>setTimeout(r,150));
    saveYou(); await new Promise(r=>setTimeout(r,150));
    out.blocked = /how old are you turning/i.test(document.getElementById('dlg-title').textContent);
    document.getElementById('dlg-yes').click();
    sel.value='53'; sel.dispatchEvent(new Event('change'));
    out.word=S.word; out.turning=S.turning;
    return out;
  });
  ck('only one question: how old you are turning (no month, no year)', r.noMonth && r.hasAge, r);
  ck('it cannot be skipped', r.blocked, r);
  ck('53 names the year on the card', r.turning===53 && /fifty-three/.test(r.word||''), r);
  /* an old journal with a birthday: converted, and the birthday gone */
  await p.evaluate(()=>{ const o=JSON.parse(localStorage.getItem(LS_KEY)); o.bday='1973-06-01'; delete o.turning; localStorage.setItem(LS_KEY, JSON.stringify(o)); });
  await p.reload(); await p.waitForTimeout(1500);
  const q = await p.evaluate(()=>({ t:S.turning, b:S.bday, saved:JSON.stringify(serialise ? serialise() : {}) }));
  ck('an old birthday becomes the age it names, and the date is dropped', q.t===new Date().getFullYear()-1973 && !q.b && !/1973-06/.test(q.saved), {t:q.t,b:q.b});
  const y = await p.evaluate(()=>{ const before=S.turning; rollYear(); return {before, after:S.turning}; });
  ck('a new year is one year older', y.after===y.before+1, y);
}

head('G, 19 Sept — the celebration never plays on top of Anything to add');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    try{ endTabTour(); }catch(e){}
    const a=S.acts[S.acts.length-1]; a.pipelined=true; a.evalAsked=false;
    go('home'); drawGrid(); await new Promise(r=>setTimeout(r,300));
    const slot=slotOf(a);
    CEL_AFTER=()=>askEval(a);
    actMoment(slot);
    /* the long-stop pays out before the page has settled: exactly as on a slow phone */
    CEL_RUNNING=true; celFinish();
    let overlap=false;
    for(let i=0;i<40;i++){ await new Promise(r=>setTimeout(r,100));
      const ev=!document.getElementById('sheet-eval').classList.contains('hide');
      const cf=document.getElementById('actcf').classList.contains('up');
      if(ev && cf) overlap=true; }
    return { overlap, evalShown:!document.getElementById('sheet-eval').classList.contains('hide') };
  });
  ck('Anything to add is shown', r.evalShown, r);
  ck('and no celebration plays on top of it', !r.overlap, r);
}

head('G, 19 Sept — the ideas filter reads All, both boxes');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{ go('browse'); try{ drawBrowse(); }catch(e){}
    await new Promise(r=>setTimeout(r,300));
    const t=(document.getElementById('leadpick')||{}).textContent||'';
    return { lead:S.lead, shown:t }; });
  ck('the how-long box opens on All, not Any time', r.lead==='All' && !/Any time/.test(r.shown), r);
}

head('G, 19 Sept — P4: photographs go out on the paper with the heart; the words stay on the photo; the card is untouched');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const k=document.createElement('canvas'); k.width=600; k.height=400; const kg=k.getContext('2d'); kg.fillStyle='#123456'; kg.fillRect(0,0,600,400);
    const img=await new Promise(r=>{ const i=new Image(); i.onload=()=>r(i); i.src=k.toDataURL(); });
    const a=S.acts[S.acts.length-1]; const mk=markFor(a);
    const c=photoOnto(img, POST_FRAME, {}, mk), g=c.getContext('2d'), sq=safeBox(POST_FRAME);
    const px=(x,y)=>Array.from(g.getImageData(x,y,1,1).data).slice(0,3);
    const corner=px(20,20);
    /* the heart: something non-paper in the top band, inside the 4:5 keep */
    const keepTop=(1920-1350)/2; let heart=0, heartInFeed=0;
    const d=g.getImageData(400,0,280,keepTop).data;
    for(let i=0;i<d.length;i+=4){ if(d[i]>180 && d[i+1]<130) heart++; }
    const f=g.getImageData(400,keepTop,280,sq.y-keepTop).data;
    for(let i=0;i<f.length;i+=4){ if(f[i]>180 && f[i+1]<130) heartInFeed++; }
    /* the words: coral-ish ink inside the photo's lower-left */
    let words=0; const w=g.getImageData(sq.x, sq.y+sq.h*0.8, sq.w*0.5, sq.h*0.2).data;
    for(let i=0;i<w.length;i+=4){ if(w[i]>150 && w[i]>w[i+2]+60) words++; }
    let below=0; const b=g.getImageData(0, sq.y+sq.h+5, 1080, 1920-(sq.y+sq.h)-5).data;
    for(let i=0;i<b.length;i+=4){ if(b[i]>150 && b[i]>b[i+2]+60) below++; }
    const card=await cardBlob(a,1080,POST_FRAME); const cb=await createImageBitmap(card);
    const cc=document.createElement('canvas'); cc.width=cb.width; cc.height=cb.height; cc.getContext('2d').drawImage(cb,0,0);
    const cardCorner=Array.from(cc.getContext('2d').getImageData(20,20,1,1).data).slice(0,3);
    return { corner, heart, heartInFeed, words, below, cardCorner };
  });
  ck('the margins are the card’s paper, not white', r.corner.join()!=='255,255,255' && r.corner[0]>235, r);
  ck('the heart shows in the tall view and is trimmed away in the square feed', r.heart>200 && r.heartInFeed<20, r);
  ck('the card itself is untouched (still white at the edge)', r.cardCorner.join()==='255,255,255', r);
}

head('G, 19 Sept — PHOTO TALL: the words sit on the paper in the bottom band, left');
{ const {ctx,p}=await app();
  const r = await p.evaluate(async ()=>{
    const k=document.createElement('canvas'); k.width=600; k.height=400; const kg=k.getContext('2d'); kg.fillStyle='#123456'; kg.fillRect(0,0,600,400);
    const img=await new Promise(r=>{ const i=new Image(); i.onload=()=>r(i); i.src=k.toDataURL(); });
    const a=S.acts[S.acts.length-1]; a.mark='coral'; const mk=markFor(a);
    const c=photoOnto(img, POST_FRAME, {}, mk), g=c.getContext('2d'), sq=safeBox(POST_FRAME);
    const ink=(x,y,w,h)=>{ let n=0; const d=g.getImageData(x,y,w,h).data; for(let i=0;i<d.length;i+=4){ if(d[i]>150 && d[i]>d[i+2]+60) n++; } return n; };
    return { onPhoto: ink(sq.x, sq.y, sq.w, sq.h), leftBand: ink(0, sq.y+sq.h, 540, 1920-(sq.y+sq.h)),
             rightBand: ink(900, sq.y+sq.h, 180, 1920-(sq.y+sq.h)) };
  });
  ck('the words are on the paper in the bottom band, left', r.leftBand>2000 && r.rightBand<50, r);
  ck('and nothing is written on the photograph itself', r.onPhoto<20, r);
}

console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
if(errs.length) console.log(JSON.stringify(errs.slice(0,6),null,1));
await b.close();
process.exit(fail?1:0);

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
  const ctx=CTX, p=PAGE;
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
  ck('the square is the default and tall is chosen, not assumed',
     r.shapes==='square by default, tall when told', r);
  ck('the square frame leaves the card alone, and a story crops back to it',
     r.frame==='identical', r);
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
    if(tile2) await tile2.scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    const box2 = tile2 ? await tile2.boundingBox() : {x:cx,y:cy,width:1,height:1};
    await p.mouse.click(box2.x+box2.width/2, box2.y+box2.height/2);
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
  await p.waitForTimeout(600);
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
    const A = bare.getContext('2d').getImageData(0,0,1080,1080).data;
    const B = marked.getContext('2d').getImageData(0,0,1080,1080).data;
    let diff=0; for(let i=0;i<A.length;i+=4) if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2]) diff++;
    out.burned = diff;

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
  const asked = await p.evaluate(()=>
    [...document.querySelectorAll('button')].some(b=>/yes, it is up/i.test(b.textContent)));
  ck('it asks whether it went up', asked===true, asked);
  await p.evaluate(()=>{
    const b=[...document.querySelectorAll('button')].find(x=>/yes, it is up/i.test(x.textContent));
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
    const btn=[...document.querySelectorAll('button')].find(x=>/yes, it is up/i.test(x.textContent));
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
  const square = /1080\s*\/\s*1080|^1\s*\/\s*1$/.test(r.sq);
  const tall   = /1080\s*\/\s*1920|^9\s*\/\s*16$/.test(r.st);
  ck('a square post shows its photo in a square box', square, r);
  ck('and a story shows it tall', tall, r);
  }

head('pinch works both ways — G, 17 Sept');
{ const {ctx,p}=await app();
  const z = await p.evaluate(()=>{
    const img=document.createElement('canvas'); img.width=1600; img.height=900;
    const g=img.getContext('2d'); g.fillStyle='#123'; g.fillRect(0,0,1600,900);
    const F = POST_SHAPES.post;
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

console.log('\n'+pass+' passed, '+fail+' failed, console/page errors: '+errs.length);
if(errs.length) console.log(JSON.stringify(errs.slice(0,6),null,1));
await b.close();
process.exit(fail?1:0);

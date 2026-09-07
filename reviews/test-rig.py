# -*- coding: utf-8 -*-
"""Plays a whole year of Acts of Good in a real browser and records every
   defect it can measure. One process per run so the runs cannot poison
   each other."""
import sys, json, random, pathlib, traceback, time
from playwright.sync_api import sync_playwright

EXE='/sessions/serene-lucid-fermat/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell'
import os
APP=os.environ.get("AOG_URL") or pathlib.Path("/sessions/serene-lucid-fermat/mnt/aog-push/index.html").as_uri()

NAMES=['Priya','Marcus','Holly','Dev','Ada','Nils','Rosa','Kenji','Amara','Tom']
TITLES=['Soup for the Alvarez family','A ride to the clinic','An hour of yard work',
 'Groceries left on a porch','Read to the class','Coffee for the night shift',
 'Fixed a fence','Drove to the airport','Bagged leaves','Cards for every door',
 'A meal in the freezer','Sat with someone','Shovelled the walk','Paid a lunch balance',
 'Took the bins out','Mended a coat','Walked the dog','Delivered the boxes']
EDGE=['','   ','A'*180,'Ünïcødé ✓ ★ — test','<script>x</script>','O’Brien & Sons',
 'Tab\tand\nnewline','🙂🙂🙂','12.50','act 2.5']

class Run:
    def __init__(self, name, n, weeks, seed, chaos=False):
        self.name=name; self.n=n; self.weeks=weeks; self.chaos=chaos
        self.rng=random.Random(seed)
        self.errors=[]; self.checks=0; self.acts_done=0
        self.pageerrors=[]; self.console=[]

    def fail(self, where, what, extra=None):
        self.errors.append({'where':where,'what':what,'extra':extra})

    def ok(self, cond, where, what, extra=None):
        self.checks+=1
        if not cond: self.fail(where,what,extra)
        return cond

    # ---------------------------------------------------------------- setup
    def boot(self, pg):
        pg.goto(APP); pg.wait_for_timeout(500)
        pg.evaluate("""(o)=>{localStorage.setItem('actsofgood.state',JSON.stringify({
          n:o.n,weeks:o.weeks,started:true,letterSeen:true,tabToured:true,
          name:'Sam Ortega',word:'good',line:'a little',bday:'1976-04-02',why:'because',
          people:o.people,acts:[],plans:{},email:'sam@example.com'}));}""",
          {'n':self.n,'weeks':self.weeks,'people':NAMES[:4]})
        pg.reload(); pg.wait_for_timeout(700)

    def title(self, i):
        if self.chaos and self.rng.random()<0.25:
            t=self.rng.choice(EDGE)
            return t if t.strip() else 'Untitled act '+str(i)
        return self.rng.choice(TITLES)+' ('+str(i)+')'

    # ------------------------------------------------------------- one act
    def do_act(self, pg, i):
        who=self.rng.sample(NAMES, self.rng.randint(0,3))
        t=self.title(i)
        day='2026-%02d-%02d'%(self.rng.randint(1,9), self.rng.randint(1,28))
        made = pg.evaluate("""(o)=>{
          try{
            startWork('', '');
            WK.t=o.t; WK.d=o.d; WK.who=o.who; WK.story=o.story;
            WK.notes=o.notes;
            $('wk-t').value=o.t; $('wk-when').value=o.d; $('wk-story').value=o.story;
            wkEdited(); workKeep(); save();
            return {ok:true, works:(S.works||[]).length};
          }catch(e){ return {ok:false, err:String(e)}; }
        }""", {'t':t,'d':day,'who':who,
               'story':('' if self.rng.random()<.3 else 'It went about as well as these things go.'),
               'notes':[{'t':'Buy bread','d':0},{'t':who[0] if who else 'Someone','d':1}]})
        if not self.ok(made.get('ok'), 'act %d'%i, 'startWork threw', made.get('err')): return

        # a sheet on some of them
        if self.rng.random() < (0.5 if self.chaos else 0.25):
            items=[self.rng.choice(['A big salad','Rolls','Cookies','Iced tea','Napkins',
                    'Paper plates','Ice','A folding table','Serving spoons','Trash bags',
                    'Someone to carry','Cups']) for _ in range(self.rng.randint(0,12))]
            r=pg.evaluate("""(o)=>{ try{
                askStart(); const s=askOf();
                s.slots=o.items; s.live=1;
                if(o.full){ s.when='Friday, September 11'; s.time='6:00 pm';
                  s.where='Fire Station #1, 535 E. 63rd'; s.who='The 600 block';
                  s.drop='Before 5:30'; s.phone='912.555.0148'; s.why='To thank them';
                  s.tag='Bring one thing.';
                  s.on={greet:1,when:1,time:1,where:1,who:1,drop:1,sign:1,phone:1,why:1,tag:1};
                }
                save(); drawSheetPanel(); return {ok:true, slots:(askOf().slots||[]).length};
              }catch(e){ return {ok:false, err:String(e)}; } }""",
              {'items':items,'full':self.rng.random()<0.6})
            if self.ok(r.get('ok'),'act %d sheet'%i,'askStart/sheet threw',r.get('err')):
                for shape in ((('full','half') if self.rng.random()<0.35 else (self.rng.choice(('full','half')),))):
                    try:
                        pg.evaluate("(k)=>askPoster(k)", shape); pg.wait_for_timeout(70)
                        pg.emulate_media(media='print'); pg.wait_for_timeout(100)
                        over=pg.evaluate("()=>[...document.querySelectorAll('#poster .pgt')]"
                                         ".map(g=>g.scrollHeight-g.clientHeight)")
                        pg.emulate_media(media='screen')
                        bad=[o for o in over if o>1]
                        self.ok(not bad,'act %d poster %s'%(i,shape),
                                'plate overflow', {'items':len(items),'over':over})
                    except Exception as e:
                        self.fail('act %d poster %s'%(i,shape),'print threw',str(e))
        # finish it
        fin = pg.evaluate("""()=>{ try{
            finishWork(false);
            if(document.getElementById('sheet-finish').classList.contains('hide'))
              return {ok:false, err:'finish sheet did not open'};
            finishGo();
            return {ok:true, acts:S.acts.length, screen:SCREEN};
          }catch(e){ return {ok:false, err:String(e)}; } }""")
        if not self.ok(fin.get('ok'),'act %d'%i,'finish threw',fin.get('err')): return
        pg.wait_for_timeout(30)
        pg.evaluate("()=>{ try{ sheet(null); go('home'); }catch(e){} }")
        pg.wait_for_timeout(20)
        self.acts_done = fin.get('acts', self.acts_done)

    # ---------------------------------------------------------------- sweeps
    def sweep(self, pg, tag):
        for v in ('home','people','browse','you','journal','works','log','setup'):
            try:
                pg.evaluate("(v)=>go(v)", v); pg.wait_for_timeout(110)
                txt=pg.evaluate("()=>document.body.innerText")
                if '—' in txt:
                    lines=[l.strip()[:90] for l in txt.split('\n') if '—' in l]
                    keep=[l for l in lines if not l.startswith('—')]
                    self.ok(not keep, tag+' '+v, 'em dash on screen', keep[:4])
                else: self.checks+=1
                h=pg.evaluate("()=>document.documentElement.scrollWidth - window.innerWidth")
                self.ok(h<=1, tag+' '+v, 'horizontal overflow', h)
            except Exception as e:
                self.fail(tag+' '+v,'screen threw',str(e))

    def verify(self, pg, tag):
        st=pg.evaluate("""()=>({acts:S.acts.length,n:S.n,done:doneCount(),
            tiles:document.querySelectorAll('#grid .tile').length,
            fin:(function(){try{return yearDone()}catch(e){return 'ERR'}})()})""")
        self.ok(st['acts']==self.acts_done, tag, 'act count drifted',
                {'expected':self.acts_done,'got':st['acts']})
        self.ok(st['done']<=st['n'], tag, 'done exceeds the goal', st)
        return st

    # ------------------------------------------------------------------ go
    def go(self):
        with sync_playwright() as pw:
            b=pw.chromium.launch(executable_path=EXE)
            pg=b.new_page(viewport={'width':390,'height':844})
            pg.on('pageerror', lambda e: self.pageerrors.append(str(e)))
            pg.on('console', lambda m: self.console.append(m.type+': '+m.text[:200])
                  if m.type in ('error','warning') else None)
            pg.route('**/actsofgood.app/**', lambda r: r.fulfill(
                status=200, content_type='application/json', body='{"ok":true,"slots":[]}'))
            try:
                self.boot(pg)
                self.sweep(pg,'start')
                for i in range(1, self.n+1):
                    self.do_act(pg, i)
                    if i % max(1,self.n//5) == 0:
                        pg.reload(); pg.wait_for_timeout(650)
                        self.verify(pg,'after reload at %d'%i)
                        self.sweep(pg,'at %d'%i)
                pg.reload(); pg.wait_for_timeout(700)
                st=self.verify(pg,'final')
                self.ok(st['fin'] is True or self.acts_done<self.n, 'final',
                        'year did not register as complete', st)
                self.sweep(pg,'final')
                # the journal must render every act
                pg.evaluate("()=>go('journal')"); pg.wait_for_timeout(700)
                pages=pg.evaluate("()=>document.querySelectorAll('#s-journal .jpage, #s-journal .cardbox').length")
                self.ok(pages>0,'journal','journal rendered nothing',pages)
                # a second year
                if self.acts_done>=self.n:
                    r=pg.evaluate("""()=>{ try{ beginAnotherYear();
                      const y=document.getElementById('dlg-yes'); if(y) y.click();
                      return {ok:true}; }catch(e){ return {ok:false,err:String(e)}; } }""")
                    pg.wait_for_timeout(500)
                    self.ok(r.get('ok'),'second year','beginAnotherYear threw',r.get('err'))
                    past=pg.evaluate("()=>((S.past||[]).length)")
                    self.ok(past==1,'second year','the finished year was not archived',past)
            except Exception as e:
                self.fail('run','harness threw', traceback.format_exc()[-800:])
            finally:
                self.ok(not self.pageerrors,'run','page errors', self.pageerrors[:6])
                bad=[c for c in self.console if c.startswith('error')]
                self.ok(not bad,'run','console errors', bad[:6])
                b.close()
        return {'run':self.name,'n':self.n,'weeks':self.weeks,'chaos':self.chaos,
                'acts_completed':self.acts_done,'checks':self.checks,
                'errors':self.errors,'error_count':len(self.errors)}

if __name__=='__main__':
    name=sys.argv[1]; n=int(sys.argv[2]); weeks=int(sys.argv[3])
    seed=int(sys.argv[4]); chaos=(len(sys.argv)>5 and sys.argv[5]=='chaos')
    t0=time.time()
    out=Run(name,n,weeks,seed,chaos).go()
    out['seconds']=round(time.time()-t0,1)
    open('/tmp/rig/%s.json'%name,'w').write(json.dumps(out,indent=1,ensure_ascii=False))
    print(name,'errors',out['error_count'],'checks',out['checks'],
          'acts',out['acts_completed'],'in',out['seconds'],'s')

# Everything still open

Written 7 September 2026, against build **3I**. This is the one place to look.
`HANDOFF.md` says what was built and why; this says what has not been decided.

**The research behind the decisions is in `reviews/`:**
`RESEARCH-signup-apps.md` (nine competitors, what they do about reminders,
cancelling and printing), `RESEARCH-journaling-apps.md` (how sixteen apps make
writing feel optional, plus the streak evidence and the two invented statistics),
and `IDEAS-the-act-moment.md` (twelve celebration ideas and the rule that solves
the escalation problem). Read those before re-opening anything in section A.

Each item says **who owns it**. Where I could check whether a thing is still
true, I did, and the check is written down. Where I could not, it says so.

---

**RULED and BUILT, 8 September, build 3L: every act keeps its sash, and the
moment waits until you are actually looking.**

**1. The sash stays on. This overturns the older ruling.** It used to ride the
newest completed square only and move forward through the year. G, seeing it:
*"The banner doesn't stay on when you do another act. That's weird. They should
always stay on."* Every finished act now wears its own sash carrying its own
date, act 0 included. `SASH_LAST` survives, but it now means only *which one has
just arrived*, and therefore which one animates.

**2. The strap was playing where nobody could see it, and this was a real bug.**
Completing an act lands on Your year and immediately covers it with the
follow-up sheet. The sash was animating on redraw, which meant it strapped
itself on **behind that sheet** and was finished before the sheet was dismissed.
G: *"the banners are not animating."* He was right. The strap is no longer added
in `drawGrid()` at all; it is held in `SASH_STRAP` and applied by the moment.

**3. The sash is the closing beat, not the opening one.** It goes on 1500ms
after the moment starts, so the order reads: the act is done, here is the
moment, here is the record of it. The first attempt put it 620ms in, on top of
the celebration beginning.

**4. The moment waits for the screen to STOP MOVING, then holds a beat.**
G: *"the animation should wait a beat when you go back to the page. When you go
back to the page it may not totally be on it, and you're gonna miss it, and
that's half the fun."* It no longer fires on a timer and hope. It watches the
square's position each frame and waits until it has not moved for four frames -
covering a smooth scroll into place, and a screen still settling after a sheet
was put away - then waits 620ms and begins. Capped at 1400ms so a page that
never settles cannot swallow the moment.

**Every early exit still lands the sash** (`sashStrap(0)`), including reduced
motion, where the class arrives and the CSS turns the travelling off. A sash
that never appears because the moment could not play would be a worse bug than
the one being fixed.

---

**RULED and BUILT, 8 September, build 3K: the sign-up panel rolls back up.**

G: *"I don't want to delete the sheet once it's filled in. I just don't want it
rolled down on your screen in Plan and Log. Oh, I'm gonna create a sign up
sheet. Oh, I have a better idea. That sign up sheet is still rolled down, so it
picks up so much room in your screen. I wanna roll it back up."*

**This is a fold, not a delete and not a take-down.** The panel used to unfurl
when you made a sheet and stay unfurled for the life of the act: 939px of
screen whether you still wanted it or not. Now there is an X in the top right
and it folds to 87px.

- **Nothing is thrown away.** Everything typed stays typed and comes straight
  back when you open it again.
- **A published sheet stays live.** Folding the panel does nothing to the page
  people are holding a poster for.
- **The folded button says where it got to** — G's ruling: "Sign-up sheet" with
  a quiet line under it reading *Started, not published yet.* or *Live. 1 of 3
  claimed.* A half-made sheet is never silently hiding behind a plain button.
- Remembered per act in `askShut`, so it is still folded when you come back.
- A brand new sheet always opens unfurled.

**Not what was asked for, and worth recording so it is not built by mistake:** I
first read this as wanting to take a sheet DOWN, and started designing around
what happens when somebody has already claimed something. That is a real
question but it is not this one. **The server can already close a sheet**
(`closed` on the sheet row; a claim then returns 409 and the public page shows a
thank-you rather than a dead list), so if that is ever wanted, the hard half
exists and only the app side is missing.

**And the standing rule caught me again.** `askShut` went into the loader but
not into `serialise()`, which builds `works` as an explicit field list rather
than copying the object. It worked perfectly until a reload and then silently
forgot. **That is four times in this file.** The test that caught it asserts
across a real reload, which is the only thing that ever catches it.

---

## A. Yours to rule. Nothing moves until you do.

**A1. Does a delete option go back on the You screen?**
*Start over* came off on 6 September. Nothing can now clear the app. Nobody is
trapped by it: the number, the word and the rhythm all change through setup, so
a bad start is recoverable. The only lost case is handing the phone to somebody
else. `wipe()` is still in the file, unreachable and marked, waiting on this.
**If the answer is no, delete `wipe()`.**

**A2. RULED, 7 September: no push. The app tells you when you open it, and
that is the ceiling.**

G: *"this is the route we should take. We shouldn't do it any more robust than
this."*

**This is a decision, not an omission. Do not add web push to this app.**

What was on the table and was turned down: a service worker, a VAPID
subscription, and the Worker sending a real notification with the app closed —
all of it free, all of it already proven in G's own Deerstalker repo, so it was
a day's work rather than a research project. It was still the wrong trade:

- It costs a **second file**. This app has been one file all year, and that
  property is why the file you edit is the file that ships.
- A service worker caches the document, and getting that wrong pins every
  returning person to the build they last loaded. That is the stale screen G was
  looking at on the morning of the 7th.
- iOS grants **one** permission prompt, ever. Spending it well is a design
  problem in its own right, and the honest moment to ask — when a sheet goes up —
  is late enough that most people would already have published without it.

**What we have instead, and it is enough:** the app reads every live sheet when
it opens, and raises a bar saying *"Someone signed up for the chili supper."* It
never says the same claim twice, it needs no permission, no service worker, no
account and no second file. If someone signs up on Tuesday and you open the app
on Thursday, you find out on Thursday. **For a fortnightly act of kindness that
is the right resolution.** It is not a delivery service.

If this is ever revisited: the mechanism is in `Documents\Hunt` and the timing
argument is above. Nothing in this app needs to change to accommodate it later.

**RULED 7 September, and already built. Recorded because they exist nowhere
else.**

**The journal draws a page from whatever the person gave it, and never says what
is missing.** The line *"Not written up yet. The story is the page"* is gone from
the screen and from the printed book. A page with a title, a date, the names and
the photographs is a finished page; with no story the photographs take a taller
crop and carry it. G: *"that's fine and rather dignified."* **Do not reintroduce
a placeholder that names an absence.**

**The journal's closing page is the catchphrase and one line, nothing else.**

> **Look at the good you've done.**
> Under way. / Halfway there. / The year is complete.

**No names and no count.** It led on the number before, which made it a
scoreboard; putting the names there instead was worse, because *a list is a
thing somebody can be left off*, and a page about who was with you is a page
about how many people you know. G raised that himself and he was right.
**Do not put names, a count, a percentage or money on this page.**

**Agreed, not yet built: a calendar entry for the person who claims something on
a sign-up sheet**, alarm set two days out, item in the title. It is the only
reminder mechanism that works without a mail server, and every competitor puts
one on their confirmation screen. Half a day.

**Parked: the app is a plug-in to social media, not a social network.** It hands
you a card and a post to take wherever you already are. That is why the
no-account position is worth protecting rather than a gap to close.

**RULED, 7 September: the act moment is a rotation of SIX. All six are in.**
G, on the finished set: *"These are awesome. These are great. I think these will
be a really cool celebration and a reward."*

**The six: the plume, the firework, the salvo, the butterflies, the balloons,
the bubbles.** Plume-and-firework was tried and cut as redundant once the plume
and the firework were both in. The salute was tried and cut; see below.

Not a streak — a streak rewards not missing and punishes gaps; this rewards the
act itself, so there is nothing to protect and nothing to break. G, on the five:
*"These are great. A level. All these go in. Record all these as options. We need
to put them on a rotation, period."*

**The rotation.** One is chosen when an act is completed. **Never the same one
twice running.** The salvo is the biggest and should come up least. Nothing
escalates with the count, so act 3 and act 47 get the same treatment and nothing
has to be saved up.

**1. The plume.** A single tight jet out of the tile that was just filled. Angle
straight up ±0.25 rad, speed 12.8 to 16.4 tapering, gravity 0.44, drag 0.995,
hearts 16 to 30px, about a hundred over 56 frames shaped `1-0.5t²` so the
pressure drops as it goes. A crown, two curtains, gone in a second and a half.
**No lanes, no symmetry, nothing arranged.**

**2. The firework** (chrysanthemum). One heart climbs out of the tile at
**-15.7**, gravity 0.30, hangs **9** frames past apogee, then opens: **70 stars,
V 11.6, drag K 0.0138**, gravity 0.132, trails 20, ring 96px, stars 13-27px.
They stall and droop. **This is the BIG burst, and it is deliberately larger
than the shells in the salvo** — on its own it is the whole moment rather than a
third of one. The salvo keeps CHRYS: 48 stars, V 8.6, K 0.0165, ring 64px.

**3. The butterflies.** RULED 7 September, and the one G was most pleased with:
*"The motion and everything is perfect."*

**No wings are drawn. The heart already has two.** The line straight down from
the cleft between the lobes is the hinge, never drawn. Each lobe is a flat wing
turning about it, and a flat plate rotated out of the plane by alpha foreshortens
to `cos(alpha)` — so the flap is the heart itself opening and closing about its
own middle: `scale(0.26 + 0.74*open, 1 + 0.11*(1-open))`, where
`open = 0.12 + 0.88*|sin(phase)|`. The small vertical stretch as it closes is
the one cheat on top of the physics, and it is what a real wing does at the top
of the stroke. **Do not add drawn wings. That was tried and rejected.**

**The flight, which is the part that works.** Twenty-four of them, released 1 to
2 frames apart. Kareiva & Shigesada (1983) analysed cabbage white butterflies as
a **correlated random walk**: turning angles drawn from a von Mises distribution,
mean zero, concentration kappa. Here `sigma = 0.50*(1-t)^2 + 0.028` where
`t = min(1, age/36)`, so **kappa climbs** — and that climb is a documented
behavioural switch, not an animation trick. Inside a patch a butterfly does
**area-restricted search**: short steps, constant turning, everyone milling in
the same small place. Leaving it, it switches to **ballistic dispersal**: longer
steps, straighter paths, each holding its own bearing until it is gone. So they
come out together and then go their separate ways, which is exactly what G asked
for and turns out to be what butterflies do.

- Each has **its own bearing**, spread evenly over a 150 degree fan
  (`-pi/2 + ((i+0.5)/N - 0.5)*2.62`), locked onto harder as `0.052*t^2`.
- **Separation** (Reynolds): a shove away from any neighbour inside **62px**,
  strength `(62-r)*0.050/r`. **This is the rule that fixes clustering.** It was
  missing in the first build and the swarm clumped.
- **Lift on the downstroke** (`vy -= lift*max(0,sin(phase))`, lift 0.44 to 0.62)
  with weight `lift*0.318` cancelling it over a beat. That bobbing is the most
  recognisable thing about butterfly flight.
- Wingbeat `phv` 0.25 to 0.34. Slowed by a third from the first build on G's
  note; do not speed it back up.
- **Size opens as they fly**: 19-23px at the tile to 34-41px, smoothstepped over
  62 frames, so they are small and busy while milling and the lobes read as wings
  by the time they disperse. Two rounds of tuning landed here; **bigger was
  explicitly too large.**
- Speed `sp0 * (0.52 + 2.15*t^2)`, sp0 1.40 to 1.92.
- **They leave by the edges**, culled at 70px beyond any side. Nothing lands,
  nothing fades in place, nothing comes back.

Sources: Kareiva & Shigesada, *Analyzing insect movement as a correlated random
walk*, Oecologia 56:234 (1983); Dorfman & Hills, *A guide to area-restricted
search*; Franzen et al., *Distance of movement in three threatened butterfly
species*.

**Cut, 7 September: the salute (`H`).** Same shell with more charge and heavier
drag, snapping open in three frames. **G: "I don't see any difference between H
and the firework."** He was right — at 390px with 20px hearts the only
distinction was opening speed, and it was lost. **The parameters stay in the
code because the salvo still fires salutes about a third of the time**, so the
flavour survives without spending a rotation slot on it. Do not restore it as a
standalone option.

**4. The salvo. ALWAYS THREE.** It used to be one, two or three at random, and
**G cut that: a salvo of one is just the firework again and reads as a mistake,
not as variety.** The first shell leaves the tile just filled; the other two come
from their own zone across the width (x bands 52-124, 159-231, 266-338,
shuffled), 11 to 25 frames apart, each with its own apogee (vy -12.9 to -17.4).
Each shell independently has about a one-in-three chance of being a salute
rather than a chrysanthemum, so it is three every time but never the same three.
**The salvo uses the small CHRYS, not BIG.**

**5. The balloons.** RULED after nine iterations, and the record of that matters
more than the numbers: **G rejected every constrained version and chose the one
from before the constraining started.** Restored exactly as it stood then.

Twenty of them, released `i*3.4 + rand(9)` frames apart. `B = 0.155 + 0.115d`,
`K = 0.040`, so terminal is `sqrt(B/K)` = 118 to 156 px/s. `om = (0.052 +
0.018d)*rand`, `amp = (0.13 + 0.15d)*rand`, sway `sin(ph)*amp*0.24`.
`fan = ((i/(N-1)) - 0.5) * 15.5 * rand(0.8,1.2)`, applied as `vx += fan*0.0125`.
Size `15 + 19d`, so the field has depth. `vx *= 0.945` each frame.

**The separation term here is the ACCUMULATING one** — added into `vx` and then
damped, which amplifies it roughly eighteen-fold — and it is left that way **on
purpose**. It is part of why they spread the way they do, and this behaviour is
what was chosen. **Do not "fix" it here.** (The fresh-per-frame version is the
correct one, and it is what the butterflies and bubbles use.)

**Rejected on the way, all by G, in order:** strings under the balloons (*"they
look like sperm"*); depth-driven transparency (*"keep the same consistency"*);
two rounds of slowing (*"too slow", "the other one is more dynamic"*); bearing
steering at 45 and then 22.5 degrees with a hard angle cap (*"boring"*); and a
final fast-and-free version at 160-207 px/s (*"these are not the right ones"*).

**6. The bubbles.** Eighteen, `i*3.0 + rand(8)` frames apart, lifted off the
tile rather than fired: cone `+/-36 degrees`, speed only **0.34 to 0.80**
(halved twice on G's note — *"they're kind of being ejected"*, then *"slow it
down by almost fifty percent"*).

- **Size decides the drift, and it is real physics.** Lift goes as the volume and
  the film's own weight goes as the surface, so net buoyancy runs like
  `r^3 - k*r^2`: `B = 0.082u - 0.024`. **Above u = 0.29 they climb, below it they
  sink.** The mixed drift falls out of the physics; it is not scattered in.
- **The film drains**: `h -= 0.0026 + 0.0052u`, so 2.1s of film on the largest
  out to 6.4s on the smallest. Only the **ink line** thins with it
  (`0.52 + 0.48h`) — **the fill never fades. G rejected transparency twice.**
- **Popping is a hazard, not a clock**, because rupture is set off by local
  thinning or a stray speck and does not reliably start at the apex:
  `if(h < 0.42 && random() < (0.42-h)*0.055)`. Some pop early, some late, and
  **some drift off the screen having never popped.**
- **A long-lived bubble pops harder.** The film tears at the Taylor-Culick
  velocity `V = sqrt(2*sigma/(rho*h))`; h is underneath, so
  `V = 1.15/sqrt(max(0.055, h))`. Fragments fly at V, 8 to 13 of them.
- **Slow air**, and this is what buys the float: two long sine terms out of
  phase (`w1` 0.0075-0.0135, `w2` 0.0055-0.0105, amplitude 0.010-0.024) on both
  axes, so they wander instead of travelling.
- Rayleigh shape wobble, `scale(1+w, 1-w)` with `w = sin(ph)*0.055`.
- They grow to about 2.2x over 74 frames, coming toward the viewer the way the
  butterflies do. Separation fresh per frame at 70px.
- **Same coral as every other heart. No lighter fill** — that was tried and cut.
  A small catch-light dot is the only bubble-specific mark.

Sources: Nature Comms, *Universal non-monotonic drainage in large bare viscous
bubbles*; *Lifetime of a Single Bubble at Different Liquid Surfaces*, Liquids
6(2) 19; Bico, *Cracks in bursting soap films*.

**The burst mathematics, and why it matters.** Stars leave the surface of a
**sphere**, not a circle: pick `u` uniform in [-1,1], `phi` uniform in [0,2pi],
`r = sqrt(1-u^2)`, then `vx = V*r*cos(phi)`, `vy = V*r*sin(phi)`, `vz = V*u`.
Screen speed therefore goes as `V*sin(theta)`, so the stars flying toward the
viewer barely move and the rim races — **that is why a real burst reads as a
filled disc and a naive one reads as a ring.** `vz` is kept and spent on size, so
the near stars are bigger. Drag is **quadratic** (`d = 1 - K*|v|`, floored at
0.70), not the flat 0.99-per-frame most demos use: it bites hard while a star is
fast and lets go once it slows, which is the stall you feel in a real firework.
Reference: fwsim.com "How Firework Shells Work"; Khan Academy's fireworks
simulator.

**The heart is drawn, not a sprite.** A bezier path filled coral with the colour
slipped a hair off a thin ink outline, the way the rest of the app prints. That
outline is what makes a coral heart read against a coral tile. It also costs
nothing to ship, where the cropped sprite cost 18KB.

**Killed, and not to be brought back: every arranged version.** Matched pairs of
lanes with the outer lanes flying widest, in both a narrow and a wide tuning; a
version where the falling hearts steered onto the acts already done and kicked
each tile as they landed; twelve hearts on drawn arcs; a hand at the foot of the
page holding one balloon per act. Some of them were pretty. **G's ruling:
arrangement reads as a diagram — you can feel the lanes. The plume reads as
something happening.** Four rounds of tuning went into proving that, and the
answer did not move.

**The standing rule the plume obeys, and any successor must:**
**hearts rise and leave through the top; confetti falls and leaves through the
bottom.** A per-act moment can then be as bright as you like and still never be
the finish, because the finish is the only time the sky comes down.

**The heart is drawn, not a sprite, in all five.** A bezier path filled coral
with the colour slipped a hair off a thin ink outline, the way the rest of the
app prints. That outline is what makes a coral heart read against a coral tile.
It ships for nothing, where the cropped sprite cost 18KB.
`heartPath`: `moveTo(0, .32s)`, `bezierCurveTo(-.56s, -.09s, -.43s, -.53s, 0, -.27s)`,
`bezierCurveTo(.43s, -.53s, .56s, -.09s, 0, .32s)`. Offset `max(0.9, .055s)`,
line width `min(2.1, max(1.0, s/14))`.

---

**RULED, 7 September: the sash straps on, then the date stamps onto it.**
G: *"I love this."*

**How it works today, and this is the part to be careful of.** The sash is one
SVG inside the tile. `SASH_LAST` is recomputed on **every** `drawGrid()` as the
highest filled slot, and the sash is appended to that one tile only, so it is
not one-per-completed-act: **it moves forward through the year** as each new act
lands. It carries the date and nothing else, from `sashDate(a)`, which is
**M-D-YY** — `9-7-26`. No date means no sash. Today it simply appears, instantly,
with no animation.

**The two beats, in order.**

1. **The strap.** The ribbon is pulled across along its own 45 degree axis:
   `translate(-78%,-78%)` to `translate(0,0)` over **420ms**,
   `cubic-bezier(.2,.85,.3,1)`, opacity up by 60%. Because the band already runs
   at 45 degrees, sliding it along that axis reads as being strapped on rather
   than appearing.
2. **The stamp**, starting at **520ms** — a beat after the ribbon has landed, not
   overlapping it. **This is the Deerstalker's own stamp, unchanged:**
   `Hunt/index.html` line 530, `0%{scale(.9)} 60%{scale(1.04)} 100%{scale(1)}`,
   0.3s ease. A bulge. Nothing more.

**One structural change is needed in `sashSVG()` and it is the only one:** move
`transform="rotate(45 131 68)"` off the `<text>` element and onto a wrapping
`<g>`. A CSS transform on the text overrides that presentation attribute and
throws the date clean off the band. Then style the text with
`transform-box:fill-box; transform-origin:center` and animate the scale.

**Do not touch the tile number.** It stays exactly where it is. I hid it during
this work to dodge a collision, and the collision was my own fault for centring
the date instead of putting it at (131, 68) where `sashSVG` puts it. With the
date on the band there is no conflict. G: *"The twelve stays exactly where it
is."*

**Do not invent a date format.** "7 SEP" was written during this work and is
wrong. The app has used `sashDate()`'s M-D-YY the whole time.

**The one hazard when building this into `index.html`:** `SASH_LAST` is
recomputed on every redraw, so the animation must fire **only when the sash has
genuinely moved to a new tile**, or it re-straps itself every time anything
repaints the grid. That needs a remembered value; if it is stored on `S`, the
standing rule at the foot of this file applies to it.

**Timing against the act moment:** the sash arrives as the celebration is
spending itself, not on top of it — 1.5s after the plume, 2.0 firework,
2.3 butterflies, 2.5 salvo and balloons, 2.7 bubbles.

---

**BUILT INTO `index.html` on 8 September, build 3J.** Engine, six moments, the
bag, the sash strap and the stamp. 42 assertions pass, all six spawn clean, and
three rig runs (50, 100 and a 25-act chaos run) show no new errors. The one
error the chaos run does report, a poster plate overflowing on a 180-character
title, was reproduced identically on the build from before this work.

**What the build changed beyond the six, and why:**

- **The rotation is a shuffled BAG, not a random pick.** Random-with-the-last-one-barred
  clustered badly in testing: plume, butterflies, bubbles, plume, bubbles,
  plume in six acts, which is not a rotation. The bag deals all six before it
  deals any of them twice, and the head of a new bag is swapped if it would
  repeat across the join. `S.celBag` and `S.celLast`, **both named in both
  halves of `serialise()`** and proved across a real reload.
- **`SASH_SEEN` and `CEL_DUE` are session-only, deliberately.** A moment is for
  the act you just did. Reloading the app days later must not replay one, and
  the test asserts that.
- **The moment scrolls the square into view first.** The grid sits below the
  pace card, so on a phone the tile that was just filled is under the fold, and
  the first build erupted hearts off-screen. Caught by looking at a screenshot,
  not by an assertion.
- **It waits for the follow-up sheet** and stands down entirely for halfway and
  the finish, which outrank it. `sheet(null)` gives it another go.
- **The backup bar now stands down while a moment is playing.** It fired at
  2600ms, which was fine when nothing ran longer than that; the bubbles run
  about seven seconds and it was landing on top of them.
- **`celTick` guarded on the wrong class first time round** (`hide` on
  `#moment`, which shows with `up`), so it stood down every single time and
  nothing ever played. **This is the third time that exact mistake has been made
  in this file.** Line 8867 had the right idiom all along.

**Still not done here:** the celebration only fires from Your year. Route two
into a finished act, `openCompose()` after finishing a planned work, lands on
the posting screen instead, so the moment waits until Your year is next opened.
That is arguably right, but it has not been ruled.

**What is left to decide about the rotation:** whether the salvo is weighted
down or simply takes its turn, and whether the sequence is remembered across
launches (which means one more field in both halves of `serialise()`, and the
rule at the foot of this file applies) or is just "not the last one" held in
memory for the session.

**Loose end from that work:** `numWord()` still stops at twenty, so the finish
moment says *"25 acts of good"* where it means twenty-five. Extending it to
ninety-nine is about ten lines and fixes every place the app spells a number.

---

**A3. Lossy artwork.**
The five hands are lossless WebP, pixel-identical wherever visible. Quality 90
would save **another 57KB** and composites identically — I measured it. That is
a judgement about somebody's artwork, so it is yours. Doing nothing is fine.

**A4. Which printer, and therefore the real trim size.**
The printed journal is US Letter today. Trim and margins are four CSS variables
at the top of the book's CSS and nothing else knows about them: change those
four, add bleed, and no other rule moves.

**A5. Does Jessica own the postcard artwork?**
It ships inside the app now, so it is redistributed to everyone who installs it.
Also: **the copy we have is a crop of a screenshot** and is soft at print size,
about 110dpi at 4.2in. **Get the original file from her.**

**A6. Should *Print your journal* also appear at the finish?**
It is on the journal screen. The finish moment is arguably where somebody most
wants it.

**A7. The three surviving em dashes.**
Two list bullets and the signature rule you asked for yourself. Everything else
is gone. Say if those go too.

**A8. The build mark.**
`BUILD 3I` still prints at the foot of Your year. Useful while you are testing,
wrong the day it ships.

---

## B. The seventeen older questions, re-checked today

Numbers are the ones in `DECISIONS-OPEN.md`. I verified what I could.

**Now closed by later work, no longer worth your time:**

- **3** — the zero square no longer offers *Mark as half*; half acts went in 1X.
  Checked: the only trace is a comment recording the removal.
- **15** — Jessica's Facebook download. You corrected me; the posts are all there.

**Verified still true today:**

- **5** — *"week 1 of 52"* really does appear **twice** on Your year, once in
  the header and once in the pace card. Checked: `home-sub` and `p-week` both
  write it. Which one goes?
- **12** — setup says **"Three questions"**. I counted three headings, so this
  may already be right; it needs one look rather than a code check.
- **13** — the person form still asks for an X handle the app will never post to.

**Still open, unchanged, and yours:**

- **1** — the year counts from the day you fill in setup, not from act 1.
- **2** — act 0 makes a card and a post but leaves no journal page.
- **4** — **the big one.** Your year opens on four numbers before anybody's
  name, one screen after a letter promising nobody is keeping score.
- **6** — the occasion card's suggestions.
- **7** — the You tab says the same thing three ways at once.
- **8** — **the other big one.** That screen cannot be used without tapping: no
  keyboard, no screen reader. It is the settings screen. I would fix it.
- **9**, **10**, **11**, **14**, **17** — unchanged.

**Needs one focused look, because my check was inconclusive:**

- **16** — "an old dead version of the app inside the file". Partly true. The
  cold wording (*"Complete this act"*, *"Nicely done"*) is still there, on the
  **log screen**, which is reachable **only** through the plan sheet's *This
  one's done* button. But plans are migrated into works on **every** load and
  `S.plans` is then emptied, so whether a person can still reach that screen at
  all depends on timing I did not chase down. **Do not delete it on my say-so.**

---

## C. Found by audit, not yet acted on

- **`check-nothing-of-hers.py` does not look for social handles.** Two real
  Instagram handles of her circle survived every previous sweep and were only
  caught on 7 September, in comments. **Add handles to that script.**
- **The plan-to-work migration runs on every load** and is labelled "one-way,
  once" with no version guard. A plan saved today becomes a work tomorrow. It
  works, but it is not what the comment says.
- **Comments are 41% of the download** — 294KB of 718KB, now 588KB. They stay:
  they have caught three persistence holes, a duplicate function name and nine
  builds of stale copy. **The discipline is to stop growing them.**

---

## D. Not decisions, just unfinished

- **The other 65 ideas** could each take a *why*. Twenty-four have one.
- **The invitation text message** still writes its own words instead of drawing
  on the act's why and tagline, so a printed sheet and a text about the same act
  do not sound like each other.
- **`app.actsofgood.app`** instead of the GitHub address. Needs a journal export
  first, because storage belongs to the origin and moving loses it.
- **The graphic catalogue.** One idea carries art. If more do, they want named
  marks drawn inline, not 89 embedded pictures — that is roughly four megabytes.

---

## The standing rules worth repeating

1. **Both halves.** Any field added to `S` or to a work must be named in
   `serialise()` AND the loader, and tested across a real reload. **This has
   shipped broken three times**, most recently the finish and halfway moments,
   which re-fired on every launch for nine builds.
2. **Grep before you name a function** — or better, run
   `reviews/check-duplicate-names.py`, which does it for you and exits non-zero.
   This has now happened **twice**: `drawAsk` killed the invitation panel for
   nine builds, and `drawPreview` nearly killed post composing on 7 September.
   Neither threw an error. The later declaration wins and the earlier one dies.
3. **Measure, do not guess.** The poster and the book both step their type by
   measurement now. The guess was wrong fourteen times in 222 acts.
4. **Look at it.** A passing assertion is not a look. And when you do look,
   check the instrument: Playwright's `element.screenshot()` **waits for
   animations to settle**, so every frame of a CSS animation captured that way
   shows the finished state. Use `page.screenshot(animations='allow', clip=...)`
   instead. Nine frames of a sash animation were captured on 7 September that all
   showed the same still, and it read as a broken animation rather than a broken
   camera.
5. **An edit that matches nothing is an edit that did nothing.** A string
   replacement anchored on text that has since changed fails silently. On
   7 September a spec was never inserted because its anchor had been renamed
   three edits earlier; the page threw on first property access and rendered as
   bare text. **Assert after replacing**, and for anything with a lookup table,
   assert every key in the list exists in the table before shipping.

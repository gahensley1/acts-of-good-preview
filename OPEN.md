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

**Open, and the interesting one: a moment when every act is completed.** Not a
streak — a streak rewards not missing and punishes gaps; this rewards the act
itself, so there is nothing to protect and nothing to break. A brainstorm ran on
7 September and produced one rule worth keeping whatever gets built:
**hearts rise and leave through the top; confetti falls and leaves through the
bottom.** A per-act moment can then be as bright as you like and still never be
the finish, because the finish is the only time the sky comes down. The idea
argued hardest for was **a drawn hand at the foot of Your year holding one heart
balloon per act** — same one-second gesture every time, so nothing escalates,
but act 24 is visibly bigger than act 4, and the finish becomes the hand opening
and the whole year going up at once, which cannot happen early.

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
4. **Look at it.** A passing assertion is not a look.

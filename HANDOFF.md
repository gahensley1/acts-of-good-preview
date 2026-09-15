# HANDOFF — read this first, updated 15 Sep 2026

Build in G's hands: **5M**. `index.html`, **1,219,324 bytes**,
md5 `40007e76253fa43687b1bde43ac1397f`, on both folders, read back off his disk and checksummed.

**5I THROUGH 5M ARE ALL UNPUSHED.** 5H is live on the site. One push carries all of them.

The Worker is at 5F on `actsofgood.app`. **5G–5M are phone-side only; it does not need redeploying.**

**111 checks across six harnesses, 0 failing, no console errors.**
`tests/battery.mjs` (25) · `tests/snapshots.mjs` (14) · `tests/rulings-5j.mjs` (29) ·
`tests/book.mjs` (4) · `tests/k-set.mjs` (14) · `tests/review-fixes.mjs` (25).
**The harnesses read PAGE ERRORS, not only assertions.** That is what caught the 5J bug below.

**AND THEY RUN ON HIS MACHINE NOW.** Every harness used to hardcode two paths that exist only
inside one cloud machine, so the battery **could not be started by the person who owns it**. First
time only:

```
cd /d "C:\Users\tony\Documents\aog-push" && npm i -D playwright && npx playwright install chromium
cd /d "C:\Users\tony\Documents\aog-push" && node tests/battery.mjs
```

---

## 5H SHIPPED A BUG THAT LOSES A YEAR. 5I FIXED IT.

Finish a year, start a new one, close the app — **the next launch put the old year back and threw
the new one away**, permanently, silently. The 5H safety net could not tell a deliberate fresh start
from damage. Also fixed in 5I: deleting a last remaining act was undone under a confirmation saying
it could not be; the boot rescue deleted **every photograph** and then told the person to back up;
and a repair deleted photographs taken since.

The fix that matters most is the idea, not the code: **`serialise()` now writes `ac`, the act count
the app believed it was writing, and `load()` reads it.** "Emptied" means *the file says it holds
some and holds none* — not *it holds none*. **Invariant 19: an empty year is a legitimate state, not
a symptom.**

---

## 5J — G's rulings of 14 September

**The code seat's list, C1–C7.** All ruled, all built.

- **C1 — reminders have a door.** G: *"why cant we do this now."* He was right. Almost all of it was
  already built — the calendar button beside the date in the live act editor has always handed the
  day over with an alarm in it. What was missing was the **choice** of lead time: the list lived
  only on the dead plan screen, so every act was silently given "the day before". The chip row is in
  the editor now and `workToCalendar()` honours it. **`w.r` is named in serialise AND load.**
  What is still impossible on the web: a notification from the app itself. `PHONE.canRemind()`
  returns false until the native shell exists. **UNTESTED, and only G can test it: does an imported
  calendar file's alarm actually fire on an iPhone?** PART D #4.
- **C2A — the backup format version moves.** `FILE_V = 2`, and a build **refuses** a file newer than
  itself rather than half-reading it and dropping the rest on the next save. This was cheap today and
  impossible after the first store build ships.
- **C3A — "Put it in the works."** The idea goes straight to the shelf instead of a numbered square
  that could not be opened. Takes the last unfinished ghost out of the grid. **And it removed a
  vestigial slot guard that would have refused an idea on the day somebody finished their fifty** —
  caught by a test that watched nothing happen.
- **C4B — a repair now says so**, once, quietly, with a one-tap offer to save a copy. `RECOVERED` had
  been set since 5H and read by nothing.
- **C5A — one copy is allowed to be old**, replaced at most once in twenty hours, so somebody who
  dips in and out for a week can still reach back past this week.
- **C6 — Kaushan Script and Yellowtail are out.** 56KB, referenced by nothing, two more licences for
  no benefit. G: *"if they are not used in the app, cards etc remove."* Verified against the CSS and
  the card canvas first.
- **C7A — a credits screen**, carrying the MIT and Open Font notices that are required to travel with
  the software.

**The design seats' list.** Ruled `S1C S2A S3B S4B S5B S6A S8B S9B`.

- **S1C + S2A — the card posts at full strength.** Both design seats found this independently and it
  was the strongest finding of the round: the posted file was inset 9% a side to survive an
  Instagram **story** crop, but a square posted to the **feed** is never cropped, so every feed post
  paid for a problem it did not have. `CARD_CROP` is kept, named and reserved for a story; the feed
  gets the composition as drawn, which is also exactly what the preview shows. **Nothing inside the
  lockup moved.** `packKey()` names the destination — invariant 15.
- **S3B** every sash keeps its date; only the newest is at full strength. **S4B** the finished
  squares are the artwork coral again, so the grid, the bar and the card agree. **S5B** both idea
  buttons are outlines. **S6A** the journal envelope is left alone. **S9B** the backup offer waits
  rather than landing on the grid, and two black bars can no longer share the screen.
- **S8 → THE BOOKENDS ROW.** Act 0 is out of the grid, so the fifty are ten clean rows. This
  reversed his 31 August "just make it normal"; he reopened it himself, then ruled the treatment
  from four drawn options as **"b and d"**: B's compact single row with no heading, plus D's mark on
  the two bookends. So there is one row above the grid — **act 0 on the left, the LAST act on the
  right**, a rule between them, both wearing Jessica's balloon, and a line that reads *"The day you
  declared it. And the day you finish."* until the year is done and then *"Declared in March.
  Finished in February."*
  The last act's square sits there dashed and numbered from the first morning, so the row is the
  shape of the whole year from day one.
  **I recommended against the mark and said so; he ruled it.** The reading that keeps both true:
  **the mark lives ONLY in that row. The grid stays fifty-one plain numbered squares.**

- **S7 — dates, ruled "keep A journal page and On a finished square, standardize rest."** The two he
  kept both read American, month first; the other three were day-first by accident, so they follow.
  Now: square `3-14-26` (unchanged) · lists `Mar 21` · button `Mar 21 '26` · messages
  `Saturday, March 21, 2026` · journal `March 21, 2026` in gold script (unchanged).
  **This also restored `longDate`'s missing `if(!iso)` guard** — L48, a latent crash in the note and
  invite renderers.

- **S10 — CLOSED, LEFT AS IT WAS.** Ruled in three steps: B, then "just make words in a warm
  bubble", then **"i do not want to make it diffeerent than other pages"**. Checking settled it —
  Ideas, Plan & Log and You all put their intro note as plain grey text on white, so a bubble on
  People alone would have made it the one screen unlike its siblings. **Do not re-propose warming
  this screen on its own.**

---

## 5K — the card and the book, 14 September

**K6A — THE BOOK IS ONE SIZE AND IT IS SQUARE, 8.5 × 8.5.** G: *"k6 neds to be one size for now
8.5x8.5."* It had to be ruled because the app carried two answers at once: the printer was told US
Letter 8.5×11 while a comment and the on-screen journal pages were laid out square, so what a person
read and what a printer produced were different shapes. Trim and margin still live in four tokens and
nowhere else (`--bookw --bookh --bookmx --bookmy`), and `setPageSize()` reads them, so a real printer's
spec is still a four-number change.
**The page lost 2.5 inches of height and `.bpage` is `overflow:hidden`, which clips in silence** — so
`tests/book.mjs` now measures every page of a fifty-act year, with deliberately long titles and long
stories, against its own box. Nothing clips.

**K1A — CLOSED.** The foot of the card sits on a different centre from the numeral and script word
above it. Three ways to close it were drawn; G ruled leave it. The axis is the whole picture
including the balloon. **Recorded in the source beside the code that would have changed.**

**K4A — CLOSED.** The composition sits high in its square and the declaration card has an empty
lower third. G: leave both. *"Nothing has happened yet and the emptiness says so."* **Also recorded
in the source, on the three numbers that would have moved.**

## 5L — the K set, 14 September

- **K2B — THE DATE IS ON THE CARD**, under the count, smaller, same coral, in the part of the square
  both design seats called empty. Fifty postings used to differ only by a small number, and a count
  is an index — it says where you are in a list, not what happened.
  **Drawn in TWO places, because S2A ruled the preview must be what posts:** `cardDateLine()` is the
  single source of the words, `renderCard` draws it on the canvas and `.actdate` draws it on screen.
  Change one and change the other. The test reads the pixels of the posted card to prove they agree.
  Rendering settled the shape: the same-line version had to shrink the act number to fit.
- **K3A — CLOSED.** The card leads a post; the photographs follow. Recorded in the source.
- **K5 — THE LOGO OPENS AND CLOSES THE BOOK.** G: *"use the logo."* Not a drawing of it — the same
  licensed artwork the card uses, at the person's own skin tone, straight out of `HANDS`, so if the
  artwork is ever replaced this follows it for free. First page and last page only; the fifty act
  pages are untouched. **The closing mark is smaller than the opening one because at the same size
  that page overflowed its box by 6px and `.bpage` clips in silence — `tests/book.mjs` caught it.**

### A BUG THAT SHIPPED IN 5J AND WAS CAUGHT HERE

`bkupBar()`'s S9B deferral called **`showBkupBar`, which is not a name that exists.** The moment the
branch was taken — the calendar nudge up when the backup offer was due — it threw, and the offer
never came back at all. Nothing asserted it, because assertions pass while a page error goes by
unread. **The harnesses now listen for page errors.**
**This is the third silent name mistake in this file. Check a name exists before calling it —
functions as well as CSS classes.**

---

**The earlier drawings, kept for the record.** `reviews/K-SET.html`. Every card on that page is really
rendered by the app. What rendering settled: **the same-line date (K2C) has to shrink the act number
to fit** — the line is already near its width limit — while the stacked version costs nothing and
fills the part of the square both seats called empty.

---

## 5M — THE REVIEW ROUND, 15 September. THIRTEEN FAULTS FOUND AND FIXED.

**Full account: `claude/the-engineers-5m.md`. Read it.** It carries L52–L67 and the still-open list.

Commissioned because **one person had written and reviewed four builds in a row**, and a name that
does not exist had already shipped in 5J on the back of it. Three seats read 5L: seat 4 twice (once
over the whole 5H→5L diff, once on the sign-up sheet's app side, which nobody had ever read) and
seat 3 on the judgment rather than the code.

**Six of the thirteen faults were written the day before by the person reviewing them.**

**THE RULE THIS ROUND EXISTS TO ESTABLISH: the author must not be the only reviewer.**
And the sharper one: **the comments in this file are unusually good, which makes them unusually
dangerous.** Two of the worst faults were places where a careful, convincing comment described
behaviour the code did not have. A reviewer who reads the comment instead of the code will agree
with it.

**The ones that undid a ruling**

- **C5A did not work at all.** The daily copy was put inside the array the rolling rotation walks, so
  every four minutes it was overwritten — and its own clock was untouched, so the app then believed
  it held a fresh one for twenty hours. All four copies could be of the same afternoon: the exact
  failure the ruling existed to prevent. **Two seats found it independently.** The rolling three and
  the four are different things now.
- **And the quota path sacrificed it first.** Out of room, the app dropped the copy meant to survive
  longest. The two oldest **rolling** copies go now.

**The ones that broke a promise**

- **An undated sheet was never cleaned, ever** — a stranger's phone number, their message and their
  release code sat on the phone permanently while the app believed the sheet was live. The public
  page had promised those people the opposite. It is dated on the next launch now, or cleaned at once
  if the date will not read.
- **The thirty-day delete was undone in the spare copies**, because a save copies what is on disk
  before it writes. **L61: a deletion made to keep a PROMISE has to take the snapshots with it.**
- **A network value was written into a click handler and PROVED to execute.** Every word a stranger
  types is escaped — a seat threw four payloads and could not get through — but the row's position
  number went straight into the handler. Only our own Worker writes it, so it was a trip-wire rather
  than an open door. **L66: "nothing a human TYPED reaches the page unescaped" was the invariant we
  held. The one that was missing is "nothing from the NETWORK reaches code position."**

**The ones in the book**

- **The honour roll cut names off, silently** — at about twenty-one names on the tall page and
  **nineteen** on the square one. At thirty names a third of them were simply not printed. **These
  are the names the year was for.** It paginates now, and how many fit is derived from the trim
  tokens rather than guessed.
- **The fitting loop could not see half the overflow it exists to catch.** A centred page spills at
  both ends and the measurement only ever revealed the half below, so the loop declared it fitted.
  And its step-downs only ever reached an act's story and photographs, so the reason page, the honour
  roll and the closing page could not be rescued at all.

**The ones in the newest code**

- **The bookend row could announce the year finished in March**, and tapping the empty ending started
  an act aimed at it. It fills only when the year is done now, and the empty ending opens the journal.
- **Act 0's bookend had no name for a screen reader.** The other one had been given one.
- **A missing month printed a confident January.**
- **S4B was argued on a fact that is not true.** The case for the lighter coral said the number "sits
  on top with its own shadow". **It had no shadow** — that belongs to planned squares. White measures
  3.28:1 on the lighter coral against 5.27:1 on the darker. **G's colour ruling stands; the number now
  has the protection the argument assumed it already had.**
- **The credits rendered as one solid block.** It is the one screen where readability is a legal point.
- **The card's cache key could not vary** — it carried the word "feed" as a fixed string, so the story
  crop and the feed crop shared one cached picture. **L64: a cache key entry written as a constant is
  not a cache key entry.**
- **The boot rescue still lost photographs, one launch later.** Blocking the sweep bought exactly one
  launch; the next ordinary save wrote the picture-less journal to disk. Nothing can overwrite the
  real file now until the app is restarted, and the message says so.

**SEAT 3 ON THE JUDGMENT — the part that is not a bug.** Its verdict: the day made the product
**correct and shippable** and moved it **not one inch toward completable.** Every change touched the
artefact or the safety net; **none touched return.** Its findings, all G's to rule:

- **The year screen has no view of intention.** The grid correctly became the finished year and
  nothing replaced what it used to show. Dated plans no longer appear on the calendar after a
  relaunch, the shelf's tab carries no count, and the line under the grid still says *"Tap an empty
  one to plan it"* when tapping leaves the square exactly as empty as before. **Its recommendation:
  one line above the grid showing the next thing in the works and its date; a mark on the tab; the
  journal moved above the grid rather than below ten rows of tiles.**
- **The bookend row's idea is right and its form is wrong.** A visible ending is a real asset almost
  nobody else has. But an empty dashed numbered square is *the app's own visual language for undone
  work*, promoted to the middle of the screen for twelve months. **Draw a horizon — a date, a
  destination — never an empty box you have not ticked.**
- **The date on the card earns its place for a reason nobody wrote down.** Not "fifty cards looked the
  same" — nobody ever sees fifty cards side by side. **The card is the only artefact that leaves the
  device.** An undated card in a camera roll two years later is an orphan; a dated one is a record.

### STILL OPEN AFTER 5M — named, not fixed

- **A live sheet is abandoned when the act is finished.** Public page still up, key thrown away, and
  **there is no way in the app to end a sheet.** Needs a ruling: take it down on the server, ask at
  the finish, or add a button.
- **The server's reply is persisted whole**, unvalidated and uncapped. A large but entirely legal
  sheet was measured pushing storage to 4.3MB — the same budget the journal lives in.
- **Four network calls report every failure as "try again in a moment"** — including a sheet the
  server has deleted, and a refusal for exceeding a cap the app never checks before sending.
- **Legacy sheets all share one key.** The master key was retired correctly from the file and the
  backup, but the migration copied the same value into every keyless sheet.
- **Two tabs.** The one year-loss family seat 4 could not close.
- **The photo-heavy book page** was never measured. It is the tallest page the book makes.

---

## Open, waiting on G

- **`reviews/S7-S10.html`** — S7 the five date formats (the real question is **which order the app
  speaks in**: the square and the journal already read American month-first, the other three are
  day-first by accident), S10 the empty People screen, and **S8 the placement above**.
- **`reviews/K-SET.html`** — K2, K3 and K5 as they were put to him. All three now ruled and built.
- **`reviews/BOOKENDS.html`** — ruled "b and d", built. Kept for the record.
- **K7 — seat 12's third house.** Explained to G 14 Sep; awaiting his word. The seat wants Max Shkret
  replaced with **On Kawara** (or **Karel Martens** if the book becomes the centre of gravity rather
  than the feed).
- **`reviews/OCCASION-PAIRINGS.html`** — the sixteen occasions, ruled `1A 2B …`.
- The act-0 prompt. Book and printables pricing. The "In honor of" page.

## Open, needing nobody's permission

- **The dead code cut is now UNBLOCKED.** C1 lifted the reminder out and C3A moved the last live
  writer of `S.plans` off it, which were steps 0 and 1 of the safe order. **L4 was wrong:**
  `saveAct()` is not reachable, so the region is fully dead. Trace in `claude/the-engineers-5i.md`.
  **The single most dangerous line: `$('l-file').addEventListener(...)` runs at top level, so
  deleting the markup without it throws and silently un-binds eight later handlers — L42.**
- The store listing and its first three screenshots. The book's cover and spine. Privacy policy.

## Only G can do these

- **Walk a whole year on a real phone.** Nobody ever has, and three builds have now rewritten how the
  year is saved.
- **Does a calendar file's alarm actually fire?** C1 rests on it and it is two minutes to test.
- **Print the book and a poster from his iPhone** — and rule K6, because the book is currently set to
  Letter 8.5×11 in the print rule and square 8.5×8.5 in a comment and on screen.
- The artwork licence hour with Jessica. Her Facebook download. A home for the thirty screenshots.

## Working method

- **He decides. I recommend.** Rule Zero: less technical when asking him questions.
- **He rules from renders.** Send a picture. Options lettered so he can answer `C2A S3B`.
- **Verify by measurement.** Read the bytes back and compare md5. **L19 bit again this session** —
  a handoff commit reported success twice and left the old file on disk; the size check caught it,
  and committing from a freshly-named staged file fixed it. **Give every delivered file its own name
  in outputs.**
- **Open the source before believing anything is missing.** Held three more times: the card's blank
  year word was a test state that never called `syncReason()`; the tooltip "on every screen" was an
  artefact of full-page capture (**judge overlap only from viewport shots**); and the whole reminder
  route was already built.
- **When a test fails, first ask whether the test is wrong.** Five did this session and four were.
  The fifth was a real bug I had just written.
- **Save documentation to the project as you make it.** Only project docs survive a session.

## Live connection notes

- **`device_bash` has been broken since 8 September.** Staging and committing work; anything needing
  a shell on his machine (git, wrangler) is handed to him as a command.
- The battery lives in `tests/` in the repo and **runs on his machine now** — the install line is at
  the top of this page. In the cloud it finds Playwright at `/opt/pw-browsers/chromium` and the
  module at `/opt/node-tools/node_modules/playwright/index.js`; the harnesses resolve either.

## The notebook

`claude/the-engineers.md` is the permanent one (L1–L37). **Two rounds are still sitting outside it:
`claude/the-engineers-5i.md` (L38–L51) and `claude/the-engineers-5m.md` (L52–L67). Merge both in and
delete them.**

---

## THE PUSH FOR 5I THROUGH 5M

```
cd /d "C:\Users\tony\Documents\aog-push" && git add -A && git commit -m "5I-5M: the rollover is no longer undone, the rescue keeps its photographs, reminders get a door, the card posts at full strength and carries its date, the book is square and paginates its honour roll, the sheet keeps its privacy promise, and the battery moves into the repo and runs anywhere" && git push
```

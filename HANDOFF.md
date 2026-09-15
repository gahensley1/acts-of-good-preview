# HANDOFF — read this first, updated 15 Sep 2026

Build in G's hands: **5Q**. `index.html`, **1,259,378 bytes**,
md5 `6a254fd05b232b904bd2c61879e00715`, on both folders, read back off his disk and checksummed.

**5I THROUGH 5P ARE PUSHED** — 5I–5M as `9bb6596..459a558`, then 5O–5P. **5Q IS NOT.** The command
is at the foot of this page.

**5N WAS NEVER PUSHED AND MUST NOT BE.** It passed 161 checks and a three-seat review found
**twenty-one faults in it**, two of which could lose a year. 5O is 5N with all of them fixed.
Nothing labelled 5N exists anywhere but in that day's record.

The Worker is at 5F on `actsofgood.app`. **5G–5O are phone-side only; it does not need
redeploying.** Taking a sheet down needed no Worker change at all: the `closed` route has been
there since the sheet shipped and the phone simply never called it.

**227 checks across seven harnesses, 0 failing, no page or console errors.**
`tests/battery.mjs` (26) · `tests/snapshots.mjs` (14) · `tests/rulings-5j.mjs` (29) ·
`tests/book.mjs` (12) · `tests/k-set.mjs` (14) · `tests/review-fixes.mjs` (25) ·
`tests/landmines.mjs` (107).
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

## 5Q — THE SUGGESTION CARD ON THE YEAR SCREEN. G's rulings, 15 September.

G, looking at the card: *"I do not like the words 'worth doing', it needs to say what it is … and
don't have an explanation that's when you tap and it needs to rotate everytime you open it (don't
show if they have borrowed it)"*, then *"move all the buttons to the bottom and align them."*

- **THE LABEL SAYS WHAT THE THING IS.** Copy change:

  | Where | Before | After | Why |
  |---|---|---|---|
  | The card's eyebrow | WORTH DOING | AN IDEA | It is one of Jessica's ideas. The old label told the person how to feel about it; the new one names it, and matches the tab and the button below. |
  | Same card, library exhausted | WORTH KNOWING | THIS MONTH | The same fault in the same place. Changed with it so the card does not have two voices. |

- **THE EXPLANATION WAITS FOR A TAP.** The card is the act's name, a chevron and the buttons. Tap
  the name and the idea's own words open; tap again and they close. **The occasion branch is
  deliberately NOT changed** — it names a DATE, and a date with no line under it says nothing.
- **IT ROTATES ON EVERY OPEN.** It turned over once a *week* before, which on an app opened most
  mornings is the same card six days running. `SUG_SEED` is drawn fresh at launch and held for the
  session, so tabbing about does not shuffle it and closing the app does. **Deliberately separate
  from `IDEA_SEED`**, which orders the Ideas screen: shuffling the card must not reorder the library
  under somebody halfway down it.
- **IT NEVER OFFERS ONE ALREADY TAKEN.** The `ideaUsed` filter was here and then `: IDEAS` handed
  the whole library straight back the moment it came up empty — so a person who had worked through
  all 89 was shown their own finished acts as suggestions. Nothing left to suggest now falls through
  to the month note. **L85: a fallback that undoes the filter above it is not a fallback.**
- **BOTH BUTTONS IN ONE ROW AT THE FOOT, EQUAL HALVES.** They used to sit in opposite corners, one
  up on the label line and one down under a rule. One rule now, and it marks where reading stops and
  doing starts. A day with no confident act shows one full-width button, because a row with a hole
  in it is not aligned, it is broken.

**Two faults caught before they shipped, both in the same twenty minutes.** A local `const go` in
`drawHome` shadowing the app's own navigation function — the FOURTH name collision in this file.
And a border rule on the button row that beat `.btn.ghost` and rubbed the outline off the button
beside it, so "Browse all ideas" rendered as plain text. **The measurements were perfectly happy —
152px and 152px. Only the picture showed it.** L86: equal numbers are not a correct picture.

---

## 5P — G'S RULINGS OF 15 SEPTEMBER. THE LAST TWO AESTHETIC QUESTIONS ARE CLOSED.

Put to him as `reviews/TWO-RULINGS.html`, four options drawn onto the live screen at phone size.

- **1D — THE END OF THE YEAR IS A MILEPOST.** The empty dashed square numbered 50 is gone. In its
  place, in the same 52px column, a fine coral rule and the month the year lands in. **Why it went:
  a dashed numbered square is the app's own language for work you have not done** — it is exactly
  what an unplanned act looks like in the grid two inches below — and that one sat in the middle of
  the screen for twelve months. The month is the declared day plus the weeks the year was set for.
  Tapping it opens the journal, as the empty ending already did.
- **"say the month and not day" — THE ROW SPEAKS IN MONTHS AT BOTH ENDS.** Copy change, shown
  before it landed:

  | Where | Before | After | Why |
  |---|---|---|---|
  | Under the bookends row | The day you declared it. And the day you finish. | Declared in March. Finishes in March 2027. | G's ruling. It also stops promising a day nobody has picked, and the row no longer shows one at either end. |

  The finished line is unchanged and was already months: *"Declared in March. Finished in May."*
  **The year is added only when the two month names match** — a year declared in March finishes in
  March, and two identical months side by side read as a mistake rather than as a lap of the
  calendar.
- **2A — THE JOURNAL STAYS BELOW THE GRID.** G: *"just leave the grid in place."* Moving it up
  worked exactly as the seat argued and pushed *The 50* off the first screen entirely on a 390px
  phone. **Do not re-propose this.**
- **EVERY SASH IS THE SAME STRENGTH. THIS REVERSES S3B.** G: *"i do not like the more transparent
  sash make them all the same."* S3B set older sashes back so eleven of them would not line up into
  one repeating diagonal; he has looked at it and ruled the other way. The `older` class is still
  applied and now does nothing, so nothing has to be unpicked if he changes his mind.

**One thing I did NOT change and he may have meant:** act 0's own sash still carries a full date
(`3-14-26`), because that is the sash system S3B ruled on and not this row's copy. If "say the month
and not day" was meant to reach the sashes too, it is one line.

**Three checks in the battery asserted the old dashed square and had to be rewritten.** They now
hold the same intent — an act holding the last number must not make the row announce a finished year
in March — against the new shape, and against the tense rather than the box.

---

## 5O — THE REVIEW OF 5N. TWENTY-ONE FAULTS, ALL FIXED. 15 September.

**Full account: `claude/the-engineers-5o.md`.** Three seats read the 5N diff, because the rule from
the previous round — the author must not be the only reviewer — had been followed for the code and
not for the day's own work.

**The finding that matters most is about the tests, not the code: FOUR OF THE FORTY-FIVE NEW
CHECKS PASSED WITH THE FEATURE DELETED.** A seat proved it by deleting the code and re-running.
**L75: a check that has never been seen to fail has not been written yet.**

The two that could have cost a year:

- **The two-tab guard was written and then bypassed three times.** Three other places write the
  journal directly and none raised the version — including the backup restore, which is the one
  operation with no undo. Restore a backup in one window and the other one writes its old year
  straight back over it, after the restore has already deleted the old year's photographs and
  dropped all four spare copies. One function writes the journal now.
- **The backup carried strangers' phone numbers again.** The rule that strips them has lived in the
  works loop since the sheet shipped, because an act never had a sheet. 5N gave an act a sheet.

And, in short: taking a page down could not be undone while the dialog promised it could; taking it
down wiped the day off the sheet; a refusal reported "The page is down" and hid the buttons that
could have fixed it; a two-photograph book page printed two tall slivers; the honour roll's
pagination was still arithmetic and overflowed by 185px on twenty-five real names; "Next" on the
year screen was the *oldest* thing on the shelf rather than the next one; and the tab count went
stale whenever anything changed it from another screen.

---

## 5N — THE STILL-OPEN LIST, CLOSED. 15 September. **SUPERSEDED BY 5O — DO NOT SHIP 5N.**

G: **"NEW LANDMINES fix what is not aesthetic."** Everything the 5M review left open and named is
done except the two things that are his to rule. **Full account: `claude/the-engineers-5n.md`.**

- **A live sign-up sheet can be ended, and is no longer abandoned at the finish.** Finishing an act
  used to delete the sheet's key along with the work, leaving a public page up asking strangers to
  help with something already done and no way to read it, change it or take it down. The sheet rides
  onto the act now, the thirty-day promise follows it there, and **there is a button that takes the
  page down** — which the server has been able to do the whole time and the phone never asked for.
- **What the server sends back is shaped and capped before it is saved.** It used to be written into
  the journal whole: a legal sheet was measured pushing the file to 4.3MB, in the same few megabytes
  the journal lives in, and every byte of it rode out in the backup.
- **Four calls stop blaming the signal.** A sheet the server had deleted, a sheet refused for being
  too big, a closed page and a phone in a tunnel all said "try again in a moment". Only the last one
  was true; the second was a loop that could never end. **And the size limit is now checked before
  the sheet is sent**, so the app knows rather than finding out.
- **One secret no longer opens every old sheet.** The retired master key was handed to every keyless
  sheet — the same value into all of them. It now goes only to a sheet that is still live, which is
  the only one it can still open.
- **TWO TABS — the last of the year-loss family, closed.** A second tab holding January would write
  January back over a year finished in the first. The file carries a version beside it now; a tab
  whose copy is behind stops writing, before the spare copies, and says so.
- **The photo-heavy book page was measured for the first time and it was clipping by 366px.** Four
  photographs are more than seven inches of an eight-and-a-half inch page before a word is set, and
  the step-downs only ever shrank type. The pictures are what give now.
- **The year screen has a view of intention again.** Dated plans had vanished from the calendar
  entirely — the migration empties the old plan store on first load and nothing else read the shelf.
  The calendar reads the shelf, the tab carries its count, one line above the grid names what is
  next and when, and **"Tap an empty one to plan it" is gone**, because it had stopped being true.

**AND A FAULT IN THE TESTS.** `tests/book.mjs` seeded `st` and `people`; the book reads `story` and
`who`. Every page it had ever measured was blank. It passed on nothing.

### Still G's to rule — not built

- **The bookend row's form.** Seat 3: an empty dashed numbered square is the app's own language for
  undone work, sat in the middle of the screen for twelve months. *Draw a horizon, not an empty box.*
- **Whether the journal moves above the grid** rather than below ten rows of tiles.

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

### What 5M left open — **all of it closed in 5N above**, except the two aesthetic rulings.

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

`claude/the-engineers.md` is the permanent one (L1–L37). **THREE rounds are sitting outside it:
`claude/the-engineers-5i.md` (L38–L51), `claude/the-engineers-5m.md` (L52–L67) and
`claude/the-engineers-5n.md` (L68–L74) and `claude/the-engineers-5o.md` (L75–L84). Merge all four
in and delete them.**

---

## THE PUSH FOR 5Q

```
cd /d "C:\Users\tony\Documents\aog-push" && git add -A && git commit -m "5Q: the card says what the thing is, keeps the reasoning behind a tap, turns over on every open, never offers back an act already taken, and puts both buttons in one aligned row at the foot" && git push
```

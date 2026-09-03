# HANDOFF — 50 Acts of Good

**Read this first, then the `acts-of-good` skill.** This file is the live state.
The skill carries the standing rules and the working method; this one carries
what is true right now. When they disagree, this file is newer — say so and fix
the skill.

Last updated: **30 August 2026**, end of the defect-fix session.
Build in G's hands: **1S**.

---

## Where everything is

- The app: **`C:\Users\tony\Documents\acts of good\index.html`** — one file, ~1 MB,
  no build step. Fonts inlined base64, manifest inlined as a data URL.
- The version tag is the faint label bottom-right of every screen
  (`<div id="buildtag">`). **Bump the letter on every delivered build.** The
  tagged div is marked for deletion at ship.
- If G's phone doesn't show the current tag, he's on a stale copy: re-upload,
  load once in Safari, force-quit the Home Screen app.
- Project docs (brief, voice, reviews, decisions, act library, the book) live in
  the Claude project, not in this folder.

---

## Where to edit and push from

The git clone is **`C:\Users\tony\Documents\aog-push`** — that is the copy that
ships, and the one to edit. `C:\Users\tony\Documents\acts of good` is kept as a
mirror; keep the two identical. Repo `gahensley1/acts-of-good-preview`, branch
`main`, served by GitHub Pages at
<https://gahensley1.github.io/acts-of-good-preview/>. Push with `git add -A`,
`git commit -m "…"`, `git push origin main`, then load the site with a `?v=<tag>`
cache-buster and confirm the build tag bottom-right.

### Standing rule — the three copies must never drift

**G's instruction, 31 Aug: save the current HTML into the folder every time.**
There are three copies of this app and they go stale in this order:

| copy | what it is | goes stale when |
|---|---|---|
| `aog-push/index.html` | what git pushes | never — it is where edits land |
| `acts of good/index.html` | the mirror | an edit is made and not copied across |
| the Pages site | what G's phone loads | the push has not happened yet |

**After EVERY edit**, without being asked:
1. `cp aog-push/index.html "acts of good/"` and `cmp -s` the two.
2. Bump the build mark, and update this file's "Build in G's hands" line.

**After G says he has pushed**, without being asked:
3. Fetch `https://gahensley1.github.io/acts-of-good-preview/index.html?cb=$RANDOM`
   and read its build mark. Say plainly which build is live and which are not.

This has already gone wrong twice: at 1Q the mirror was a build behind, and at
1M–1N several builds sat undeployed while G was looking for changes he could not
see. **A build that is not in all three places is not done.**

---

## Shipped in 1S — two defects and a button

16. **Act 0 stranded first-run users — critical, found by the UX seat.**
    `startYear()` hides the tab bar; the only function restoring it was
    `zeroDone()`, which **nothing ever called**. Measured from empty storage:
    after "I'm doing this", pressing back landed on Your year with `#tabs` at
    `display:none`, height 0 — no Ideas, People, You or Plan & Log, and no route
    to them. A reload rescued it; an installed Home Screen app has no reload.
    The tab bar now returns inside `zeroGo()`, the moment act 0 exists.

17. **Act 0 was asked how it went.** `askIfPosted` → `askEval` had no `a.zero`
    guard, so "Yes, it is up" opened *"About act 0… How did it go?"* Guarded;
    real acts unaffected.

18. **"Save, complete later" nearly deleted your work.** The instruction was to
    make the foot button say that. It called `dropWork()`, which **removes the
    act from the shelf and releases its photos**. It now calls a new
    non-destructive `saveForLater()` — everything there already auto-saves, so
    it just leaves and the shelf holds it. The note above it is gone.
    **Consequence: no way to delete an act in the works from that screen.**

    10 checks pass.

---

## Shipped in 1O–1R — copy and the act calculator

14. **Three labels, on G's wording.**
    | before | after |
    |---|---|
    | Add anyone to your act? | **Invite someone to join you** |
    | What it cost *(if anything)* | **Keep a tally of your costs** *(if anything)* |

    Both hold one line at 390px and 430px.

15. **The act tally is a named, bordered control.** It was a bare icon carrying
    `class="calgo"` — which is `position:absolute; right:8px`. That works for the
    calendar because `.datewrap` is `position:relative`; the cost row had **no
    positioned parent**, so the icon was placing itself against the page rather
    than its own row. It is now `.tallybtn`: in flow, bordered, 44px, reading
    **act tally** to the left of the glyph, pushed right so its edge lines up
    with the calendar button above it. **Measured Δ0 at both 390px and 430px.**

    **1R, on G's markup:** it reads **act calculator**, and both boxes run out to
    fill the row — 95% of it, near-equal halves at 390px (167px + 166px) —
    rather than a small field beside a floating glyph. The right edge still
    lands on the calendar's, Δ0.

    **Named, not changed:** the note under it still reads *"One number is fine.
    Or the calculator keeps a tally as you buy things."* — which now says
    "tally" twice and calls the control a calculator. Trimming it to *"One
    number is fine."* is G's call.

---

## Shipped in 1M–1N — act 0

13. **Act 0 is built, and it is the last step of the introduction.**
    Setup runs as it always did (all three steps); `startYear()` then routes to
    a new `s-zero` screen instead of home, and **the tab bar stays hidden until
    act 0 is done. There is no Skip** — one escape hatch makes it optional, and
    an optional ceremony is a form with nicer type.

    **The card is the YEAR card** — the same lockup, with **no act line** under
    the rule. That is the entire difference between act 0's card and every other
    one, and it is what Jessica's own announcement carried. `drawActNo()` hides
    the `<hr>` and the act line when `a.zero`.

    **It runs the real pipeline**, which is the point: it is a tutorial wearing
    a ceremony. Card → the actual posting page with the declaration already
    written → the same *"Did it go up?"* → the year screen. By act 1 she has
    been everywhere the app will take her, having supplied nothing: the thing
    that happened is the decision, the date is today, the story is written.

    **The declaration**, generated, opening on the decision rather than a number
    (§3's "Act n of N" does not fit an act with no n):
    > I'm doing this.
    > 25 acts of good over the next year — one every two weeks. Starting now.
    > It began with … *(the blank)*
    > I'll be reaching out to some of you to come along. And if you're up to some good — invite me.

    That last line is **hers**, not a paraphrase. Act 21 recalls act 0 verbatim:
    *"When I started this challenge in April, I told friends I'd be reaching out
    to them to accompany me on some acts, but I also asked my people to invite
    ME if they were up to some good good."* (1N)

    **`S.zero`, never `S.acts`** — so act 0 never counts toward the year and
    never takes one of the N squares.

    **The tile is an ordinary tile.** `class="tile done"`, first in the grid,
    no special class and no spacer. Two other treatments were tried and G ruled
    both out: a gold outline (rejected because `.tile.planned` is *already* gold
    outline, meaning "planned, not done" — a hollow zero would have read as the
    zeroth empty box) and a separate line above the grid (rejected: *"just make
    it normal"*). **Consequence, accepted:** 26 tiles do not divide by five, so
    the last row ends on 25 alone.

    **The sash moves.** Act 0 wears it on day one — it genuinely is the newest
    thing done — and it moves to act 1 the moment act 1 lands. Two permanent
    sashes would collapse the word *newest* into decoration. The sash leaving
    the zero is the argument without words: the declaration was real, then it
    was overtaken by living.

    **The year screen never opens on "0 of 25"** — `p-count` reads **Begun**
    until there is a count.

    24 checks pass.

    **Act 0's card is CONFIRMED, 31 Aug.** G supplied it. It is the **year
    card** — the lockup, gold numeral, "acts of good" in black, "in year", the
    script word in gold, the balloon-heart-and-hand — **no act line, no rule**,
    which is exactly what `s-zero` already draws. Verified against the live
    build. **The same card for everyone**; only the number and the script word
    change per person. Do not re-open this.

    Jessica's Facebook "Download Your Information" is still wanted for the seven
    acts with no post recovered (0, 3, 4, 8, 14, 15, 19), the text truncated at
    "… See more", and print-resolution originals for the book.

    **Checked against the corpus and deliberately NOT changed:**
    - Act 0's draft carries her strongest sentence — *"There's nothing quite
      like seeing someone post a simple gesture of kindness and thinking, 'Oh, I
      could do that.'"* It is **already in the letter**, three screens earlier.
      Saying it twice in one sitting spends it.
    - Act 21's caption reads "Act 21 of 30" against a card reading "act 21 of
      50" — a hand-typed slip. The app generates that line from the goal, so it
      cannot make the mistake. Confirms existing behaviour.

    **Still open:** whether act 0 should set `S.start`, so the year counts from
    the day it was said out loud rather than from setup. And a real mismatch —
    **every dated post in the corpus is Facebook** (acts 6, 20, 21), while the
    app ships Instagram first and the posting flow is built around Instagram's
    paste problem. Not a bug; a question about the app's centre of gravity.

---

## Shipped in 1K–1L

11. **The build mark sits at the foot of Your year.** Not a floating corner
    label any more — a bordered box reading **BUILD 1L**, centred, in the page,
    below "The journal, page by page" and clear of the tab bar. Measured
    visible at both a 0px and a 34px bottom inset. Delete the div and the
    `#buildtag` rule at ship.

12. **"Expected act", one line.** The In the works field label was
    *"Expecting · act no."* in a 126px column and wrapped to two lines.
    *"Expected act no."* needs ~140px and still wrapped, so the **"no."** went
    rather than the meaning — the number sits directly under the label anyway.
    Now 105px in 126px, one line at 390px and up. The Plan & Log card line
    follows it: *"· expecting act 4"* → *"· expected act 4"*.

    **Known limit, same as the suggestion box:** at 320px the "Aiming for" date
    button's min-content squeezes this column to ~79px and any label wraps.

---

## Shipped in 1J

10. **The build mark is findable, and the gap bar is black.**
    The mark sat at `bottom:calc(4px + env(safe-area-inset-bottom))` in 9px
    `#B9B2A9`. On a notched phone that inset is ~34px, so it landed *inside the
    tab bar*, pale grey beside the "You" label — perfectly visible in a desktop
    browser where the inset is 0, invisible on the phone it exists to be read
    on. It now sits at `bottom:calc(88px + var(--safebot))`, clear of the tabs,
    in 11px `#3A342C` on an opaque white pill with a hairline border, so it
    reads over any content. `--safebot` joins `--safetop` as a named inset.
    The gap bar was tried in coral and **ruled back to black — "it reads
    better"**; its **Add** now takes Undo's gold rather than inheriting white.

    **Named, not built:** `.tabs` sets `padding-bottom:calc(9px +
    env(safe-area-inset-bottom))` and then a `padding:9px 6px 24px` shorthand
    later in the same rule overrides it to a flat 24px. The tab bar has never
    actually paid the bottom inset.

---

## Shipped in 1G–1I

8. **"Diary" is "journal" everywhere.** The letter has always said *journal* —
   *"I kept a journal filled with ideas, notes, expenses, and memories"* — and
   the rest of the app had drifted to *diary*, contradicting Jessica's own
   words. 43 occurrences swept, including `exportDiary` / `importDiary` →
   `exportJournal` / `importJournal` so the code reads like the screen.
   **Two left alone on purpose**, both about the *other* person's calendar
   rather than this app's journal: the `.ics` comment, and
   *"Nobody can put it in their diary without one."* If those should read
   "calendar", say so — that is a different word, not this sweep.

9. **The You screen names what is missing — ruled A **and** C.**
   **A**, `#gapbar`: the app's own bar, sharing `#undobar`'s geometry but
   **coral, ruled 1I** — Undo is black because it is the app being neutral about
   something you did; this one asks for something. `--coralink` not `--coral`:
   white on `--coral` is 3.4:1 and fails as body text, white on `--coralink` is
   5.3:1 and passes. The action is white, not the gold the black bar uses.
   Raised
   260ms after arriving at You. It names the gaps in row order —
   *"Your card still needs a name and a birthday."* — carries **Add**, which
   opens the card sheet, and drops after 7s. **Once per session** (`GAPBAR_SHOWN`)
   and on no other screen: the dot on the tab is the standing reminder, this is
   only the greeting after acting on it.
   **C**, `.gapdot` + `.setrow.gap`: the missing rows wear the same coral dot
   the tab does, and grey **Not set** becomes coral **Add**. `cardGaps()` is the
   single list all three readers use — the tab dot, the bar and the rows.

   **Trap worth remembering:** the first build used `.mark` for the dot. `.mark`
   is already the card artwork lockup, carrying `min-height:57.2cqw`, which
   beats `height:7px` — the dot rendered as a 7×223px coral sliver and blew the
   row to 252px. Every assertion passed, because they tested classes and colour
   and not geometry. **The screenshot caught it, not the tests.** Assert size,
   not just state.

7. **The suggestion box is compacted.** G: *"I don't think we need those words"*
   about the **"Worth knowing about"** heading — removed; the card's own first
   line already says it. The full-width **Browse all ideas** button that closed
   the box now sits **in the upper right, on the occasion line**, which is what
   made the box shorter: *"that way the box gets smaller."*
   `.sugbox` / `.sughead`. It was briefly restyled as a plain coral link; G
   ruled it back to a box — *"just like it was, so it looks like we can click
   it."* It is the same `.btn.mini.ghost` it always was, moved rather than
   restyled, one step smaller (13px / 10x14) because at full size it pushed
   "Occasion · in 11 weeks" onto a second line and put back the height this was
   meant to save. Its words are unchanged.
   **205px → 163px, and the grid starts ~75px higher.**

   **Known limit:** at a 320px viewport (SE-era) the occasion line and the
   button cannot share a row — the tag needs ~175px and the button ~149px in
   246px of space — so the tag wraps to two lines there. One line holds at 390px
   and up. Fixing 320 means either stacking the button under the tag below
   ~360px, or dropping the tag to roughly 9px type. Not decided.

---

## Shipped in 1D

6. **The safe-area inset has one owner.** G's diagnosis was right: the whole app
   had been pulled up to the physical top of the screen. `body` reserved the
   inset, and `.top` added it again — but only inside
   `@media (display-mode:standalone)`. `.top` is `position:sticky`, and sticky
   pins to the top of the **viewport**, which under `viewport-fit=cover` with a
   translucent status bar begins at the physical top of the screen. So on scroll
   the header left the body's padding behind and parked under the clock.
   Now: **`:root{--safetop:env(safe-area-inset-top)}`** is the single name;
   `body` no longer reserves it; `.top` pays it unconditionally
   (`padding:calc(14px + var(--safetop)) 20px 14px`); the standalone media query
   is deleted. Every other rule that clears the clock — the letter, the storage
   bar, the setup wrap — reads `--safetop` too, at the same computed value.

   **The letter did not move**, which was G's condition. It is
   `position:fixed;inset:0` with its own padding and never read either rule;
   measured identical at a 0px and a 47px inset, before and after.

   Measured at a simulated 47px inset, distance from the physical top of the
   screen to the header text — under 47 is inside the clock and battery band:

   | screen | before, Safari | before, installed | after, both |
   |---|---|---|---|
   | Your year | 61 → **14 on scroll** | 108 → 61 on scroll | 61, no jump |
   | In the works | 73 | 120 | 73 |
   | Ideas | **26** | 73 | 73 |
   | People | 61 | 108 | 61 |
   | You | **14** | 61 | 61 |
   | Journal | **26** | 73 | 73 |

   It showed on **Your year** first because that is the only screen long enough
   to scroll in normal use, and its header is the shortest — it has no back
   button, so it had the least accidental clearance to begin with.

---

## Shipped in 1C

5. **The "Your card is missing…" block is gone from the year screen.** G ruled it
   out: *"that needs to go away, it's annoying."* It was ~100px of being told off
   at the top of the screen, one screen below a letter promising nobody is
   keeping score. In its place, a **coral dot on the You tab** (`.tabdot`,
   `#youdot`, `var(--coral)`), shown **on every other opening** — *"it's not that
   important"* — counted by `S.todoOpens`, once per session so tab-hopping does
   not flip it. It clears itself the moment the card is complete, and the tab's
   `aria-label` says what is missing so the dot is not colour alone.
   If a gap ever genuinely blocks something, that is to be handled **at the
   posting page, when the post comes up** — not on the year screen. Not built.

---

## Shipped in 1B

1. **The year card and the month card are one card.** The greys touch, the
   corners square off where they meet, the seam is 24px. *Nothing was dropped
   and nothing moved* — G's words: "the gray parts need to touch so that's one
   card… all the information can stay exactly where it is."
   Classes `.pace.joint-top` / `.pace.joint-bot`. The calendar button moved from
   `top:12px` to `top:6px` only to keep its original 6px relationship to the
   content as the seam tightened; the icon and its breathing animation are
   otherwise untouched.

2. **The floating paste bar is deleted.** `#pastebar` was fixed to the top of the
   screen, parked at `translate(-50%,-160%)` against `top:calc(10px +
   env(safe-area-inset-top))`. On a phone the message wraps to three lines, so
   −160% no longer cleared the inset and its bottom edge sat below the top of
   the screen **on every screen in the app**, above the header and the sheets,
   with no `pointer-events:none` to stop it swallowing taps.
   Replaced by **`#pastenote`**: a quiet coral line in the layout, under the Send
   button, on the post page only, shown only after sending, and cleared
   automatically when another platform is picked.

3. **The scrim is gone.** The white wash behind the tab-tour balloon and the
   Ideas nudge is removed entirely — calls, function and CSS. The balloon runs
   over a clean screen. G ruled it out; do not propose it again.

4. **Setup is three steps.** The old step 4, "Has anyone offered to help?", is
   out of the introduction — *"too much pressure."* It wrote into `S.people` /
   `S.places`, which the People tab still owns, so nothing was lost. The sheet,
   `drawHelpers()` and `addHelper()` were removed with it.

Verified with headless Chromium against the real file: 17 checks, no JS errors.

---

## The 25-act test run — 2 September, build 1V

An agent played a complete year in headless Chromium at 390x844@2x: setup, act 0,
25 acts across Apr 2026 - Apr 2027, two halves, two anonymous, one honoree, three
carrying costs, the journal, the works list. **Zero JS errors across the whole
run.**

Card geometry is immovable: all 27 cards measured identical to within 0.01% -
numeral top 12.31%, "acts of good" 25.21%, "in year" 30.88%, script 34.54%, rule
left 11.22% / width 77.55%, act line top 73.17%. The act line is one line on
every card. Act 0 correctly hides the rule and the act line. Sash rules hold.
Journal renders 29 pages with no overflow. The composer is sound: per-platform
handles, honoree on the opening line, anonymous withholding correctly.

Eight defects found, worst first:

1. **The year cannot end.** `drawHome()` uses `const done = S.acts.length`, so
   halves count as whole acts; 23 numbered + 2 halves reads "25 of 25" at 100%
   while acts 24 and 25 never happened, and 25 logged reads "27 of 25 - 27 so
   far, plenty of room". `p-state` has no branch for `done >= S.n`. **There is no
   end-of-year state anywhere in the app.** The journal's closing page repeats it
   ("so far - 27 acts").
2. **`.struck::after` misses every two-digit numeral.** It is a fixed stroke
   (`left:50%; width:.030em`). On "12" it clips the edge; on "25" it lands in the
   gap between the glyphs and crosses neither. Affects acts 10-25, sixteen of
   twenty-five. The journal's own rule (`left:-8%;right:-8%;top:56%`) is correct -
   the two renderings disagree with each other.
3. **`a.t` never reaches a public caption.** `buildCaption()` pushes `a.story`
   for public platforms; `a.t` appears only in the `private` branch. The quick Log
   flow has no story field, so an act can post without saying what was done.
4. **`openCompose()` sets `cm-no` to "act 0 of 25"** with no zero branch, while
   `drawActNo()` deliberately hides the number on the card.
5. **`halfNo('1')` returns 0.5**, colliding with act 0.
6. A half act's caption says "Act 2.5 of 25" while its card says "act 3 of 25".
7. "week N of 52" printed twice on one screen (already logged as question 5).
8. The newest tile's number is occluded by its sash.

**`50-acts-of-good.html` DELETED, 3 September, on G's instruction.** A fourth copy
of the app, 1,024,736 bytes, last written 30 August, no build mark, referenced by
nothing. A backup sits at `/tmp/50-acts-of-good.30aug.bak` for this session only.
It was tracked by git, so the commit will show it as a deletion - that is correct.
**There are now three copies and only three: `aog-push/index.html`,
`acts of good/index.html`, and the Pages site.**

**`THE-IDEAS.md` written, both folders.** Every one of the 89 ideas extracted
straight out of `IDEAS` in the built file, in full, grouped by the nine `CATS`
in screen order and sorted within each by `LEADS` order then title. Carries each
idea's lead time, size and d-line verbatim, plus the screen's own copy and the
empty-state message. Generated - do not hand-edit it; if G rewrites an idea there,
change `IDEAS` in `index.html` and regenerate.

## BUILD 1W — the double-tap delete (BUILT, 3 September)

Ruled 10B + 10.1 and shipped. The first thing built from this whole session; the
finish and the halfway note are still unbuilt and still waiting on G.

- **CSS** `.killer` / `.killer.armed`, added after `.hashalf`. Name checked free
  before use. Resting: transparent, `--coralink`, 11.5px, `text-transform:uppercase`,
  `letter-spacing:.06em`, full width, `min-height:44px`. Armed: solid `--coralink`,
  white, 13px, `text-transform:none`.
- **Markup** `<button id="wk-kill" class="killer" onclick="killTap()">` directly
  under `#wk-drop` in `s-work`.
- **JS** `KILL_ARMED` / `KILL_T` / `KILL_REST`, `killDisarm()`, `killTap()`, placed
  after `saveForLater()`. Disarm is wired into `go()` (`if(v !== 'work')`) and into
  `drawWork()`, so a primed delete cannot survive leaving or re-entering.
- **The delete is soft.** `S.works.splice` and `save()` happen at once so the list
  is honest, then `undoBar()` holds it: UNDO re-splices at the original index,
  COMMIT calls `releasePhotos()`. **`releasePhotos` is deliberately the commit, not
  inline** — otherwise undo would restore an act whose photographs were gone.
- `dropWork()` and its `checkFirst()` sheet are now unreachable from this screen.
  Left in place; flagged for the dead-code pass (open question 16).

**Verified** in headless Chromium at 390x844@2x, zero JS errors: resting reads
"Delete, remove this act" in rgb(192,63,43), uppercase, 350x44; arming gives white
on rgb(192,63,43) reading "Tap again to delete" on one line; it self-disarms after
4s; two taps delete, land on `works`, drop `S.works` to 0 and raise the undo bar
reading '"Take soup to the Harpers" is gone.'; tapping undo restores the act
intact. Screenshots taken and looked at, both states.

**Note for whoever is next: there is a FOURTH copy of the app.**
`aog-push/50-acts-of-good.html`, 1,024,736 bytes, last written 30 August, no build
mark. It is not `index.html`, nothing serves it, and it has been drifting since.
Not touched. Worth asking G whether it can go.

**REQUEST, 2 Sept: a double-tap delete on the works page.** G: *"UNDER THE SAVE
COMPLETE LATER BUTTON PUT A DOUBLE TAP DELETE OPTION TEXT IN CORAL 'DELETE, REMOVE
THIS ACT'."* Drawn as section 10. This reopens decision **C** in
`DECISIONS-OPEN.md` - saveForLater() was made non-destructive at 1S and left no way
to delete a half-finished act from that screen. `dropWork()` already exists and
already does the right thing (splices `S.works`, calls `releasePhotos`), and it
already carries a `checkFirst()` confirm sheet - **the double tap replaces that
sheet, it does not sit alongside it.** Not built; two wording choices are with G
(case, and the armed label). Behaviour proposed and stated to him: disarms after
~4s, disarms on leaving the screen, and the existing undo bar catches the delete.

**MISTAKE, 2 Sept — caught by G, worth not repeating.** A mockup used
"Holly, Marcus, Beth" as stand-in names. Holly/Marcus/Mrs Ellery were invented by
the test agent; **Beth was not** - Beth Howells is in `ACT-0-RECOVERED.md`, the
friend whose Fifty Walks started the idea. Pulled across without noticing. This is
the reference-not-content rule failing in the smallest possible way, which is how
it will always fail. Replaced with "Priya", and the page now states outright that
the names are invented. **Lesson: before using any example name, check it against
`ACT-0-RECOVERED.md` and `the-posts.md`.**

Sweeping for the same leak found her circle inside `index.html`'s own code
comments: Judy (5), Holly (5), Mabe (3), Leigh (3), Ginger (2), baked4good (1) -
20 mentions. **Outside comments the only occurrence of anything of hers is
"Jessica" x2, which is her letter signature and is intended.** So no user-visible
leak. `check-nothing-of-hers.py` reported CLEAN because it deliberately skips
comments; that rule had a hole. The script now runs a **second pass over `/* */`
and `<!-- -->` blocks** and prints what it finds under "IN THE CODE NOTES", never
as a failure. Offered to G to strip them; **not yet answered.**

**Section 8 added to the proposal page: the closing post.** G: *"YOU DO NEED TO
CREATE A POST WITH THIS CARD SO MAYBE JUST USE THIS AND STRIP THE NAMES."* Three
captions drawn on a faithful `s-compose` mockup, all nameless, none repeating the
card's line. Numbered 8 rather than inserted, so letters he has already been given
do not shift. Section 4's 4A is now split 4A·1 (named) / 4A·2 (unnamed) - the
private on-screen message is the one open name question.

**RULING: the confetti is TWO bursts and runs off the bottom.** G: *"CONFETTI NEEDS
TO 2 BURSTS AND RUN OFF THE BOTTOM OF THE PAGE."* Implemented on the proposal page
and measured: burst one at t=0, burst two at +780ms, 95 pieces each, every piece
spawned above the top edge, gravity 48px/s^2, and culled only once `y - h` clears
`height + 24`. **No opacity fade at any point** - the pieces leave by falling past
the bottom. Clears in about four seconds. Reduced-motion still settles in place.

**RULING, 2 September: HALF ACTS ARE REMOVED.** G: *"REMOVE 1/2 ACTS THIS WILL FIX
SOME HOLES."* This overturns a previously settled design (skill s3 listed the
crossed-out 2.5 as closed). It is his call and it is correct: it closes defects 1,
2, 5 and 6 from the test run at a stroke.

Touch points, all in `index.html`: `.struck` / `.struck .half` / `.hashalf` (~358-366),
`.jpage .jno .struck` + `.half` (~204-207), `.tile.half` (446), `halfNo()` /
`wholeNo()` (6014-6015), `toggleHalf` (~6034-6035), `setNo` (~6060), `drawActNo`'s
half branch (6087-6099), the menu button label (6102-6104), the journal's `noLine`
(3580-3581), `a.no = a.half ? String(slot-0.5)` (4109), the card/export path
(6417, 6431), and `half:!!a.half` in the three state serialisers (1702, 1835, 7050).
Keep reading `a.half` on load so old data migrates: **a saved half becomes a whole
act and keeps its square.** `wholeNo()` may still be wanted; `halfNo()` goes.

**RULING: the closing card's line is 3E in capitals, punctuated.** Three lines,
`PUT A LITTLE / MORE GOOD INTO / THE WORLD.` in the `.actno` slot with the rule
restored. Drawn at `font-size:7.2cqw; line-height:1.20; top:69.4cqw;
letter-spacing:.02em; font-weight:700`, which runs 69.3%-95.1% of the card height
and leaves 4.9% below - G asked for the white space filled and the type made
bigger, and that is the measured result. Open: full stop or exclamation.
Consequence handled: the reaffirming message above the card was rewritten so it no
longer repeats the line.

**Two rulings landed 2 September, both on the proposal page:**

1. **The half-act slash is now TWO rules, not one.** G: *"the journal's slash is
   correct... note the slash will be different for a single number and 2 digits."*
   A single numeral keeps `.struck::after` as it stands (steep upright stroke,
   `left:50%; top:.05em; height:1.09em; width:.030em; rotate(30deg)`) — that is her
   act 2.5 exactly and was never wrong. A two-digit numeral takes the journal's
   rule (`left:-8%; right:-8%; top:56%; border-top; rotate(-14deg)`) drawn across
   both glyphs. Implement by branching on `wholeNo(a.no).length` in `drawActNo()`
   and adding the matching class; do the same in the journal so single numerals
   there pick up the stroke. Both renderings must agree on both cases.
2. **The closing card carries a line at the bottom.** G: *"there needs to be words
   saying I DID IT! or COMPLETED! something inspirational."* The rule (`<hr>`)
   comes back and the words take the `.actno` slot in coral. The no-line "bookend"
   option is RETIRED — do not propose it again. Six wordings are drawn (3A-3F);
   only the choice of words is open. G then sent **"put a little more good into
   the world"**, which is drawn as 3E (two lines at ~5.1cqw, half the act-number
   size) and 3F (that line in the message, "I did it." on the card). He has been
   told plainly that the phrase is close to Jessica's own sentence in her act 0
   and that choosing it must be deliberate.

**None of this is fixed.** 1 through 5 are drawn as proposals in
`reviews/the-finish.html` (live at
https://claude.ai/code/artifact/4fdec46e-58ab-459e-9154-d4f308085279) and
summarised in plain English at the top of `DECISIONS-OPEN.md`. Do not build any
of it until G rules by letter.

**The counting is a design question, not just a bug.** `slotOf()` rounds a half
UP, so act 2.5 owns square 3 - a half consumes a whole square while the count
treats it as a whole act. Either a square is an act (recommended: the number on
screen becomes the number of filled squares, so it can never disagree with the
grid) or a half adds a half (truer, but the grid can be full while the count is
short). G has both, as 1A and 1B.

**The proposed finish**, all unbuilt: confetti on the year screen once, when the
last square fills - canvas, coral/gold/cream, ~3s, reduced-motion falls back to a
static settle; a reaffirming message beneath it built from Jessica's own act 0
("put a little more good out into the world", "nothing grand required... small
intentional acts that add up") generalised, with three wordings offered; the year
card again as the closing card, with three treatments; and a permanent finished
state on the year screen and the journal's closing page.

---

## Open

- **X.** `HANDLE_KEYS` includes `'x'` and the person sheet asks for an X handle,
  but `PLATS` deliberately excludes X — the reason is in the file: *"280
  characters turns an act into a slogan."* Either drop X from the person form or
  restore it to `PLATS`. Not both.
  Note the posting page is **not** wrong: it shows the platforms that are
  switched on, and Threads ships off by default.
- **Copy overlap on the post page.** `#cm-how` already ends with "long press
  Instagram's caption box and paste", which now duplicates the new coral line.
  Flagged under working-rule §2, not changed.

## Longer horizon, G and Jessica's to decide

The artwork-license conversation with Jessica, the native-build go/no-go,
whether act 0 exists, printables and book pricing, honoree-as-durable-entity
(data is kept; the book's "In honor of" index page is unbuilt), dead-code
excision and a file-size pass.

---

## Known doc drift — do not trust either blindly

`handoff.md` in the project says the six-seat panel work is done and "Nothing
else is open." `panel-full-review.md` says "Nothing fixed yet; G to rule" and
lists blockers. They contradict each other. `decisions.md` items 10, 16 and 17
are orphaned, and item 12 conflicts with working-rule §4 (no script fonts).
Surface the conflict; never resolve it silently.

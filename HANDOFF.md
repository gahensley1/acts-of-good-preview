# HANDOFF — 50 Acts of Good

**Read this first, then the `acts-of-good` skill.** This file is the live state.
The skill carries the standing rules and the working method; this one carries
what is true right now. When they disagree, this file is newer — say so and fix
the skill.

Last updated: **6 September 2026**.
Build in G's hands: **2W** — pushed and live. **The sign-up sheet in it cannot
publish until `npx wrangler deploy` is run from `aog-sheets`** (see the CORS
entry below).

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

## BUILDS 2M-2P — EVERYTHING OUTSTANDING, CLOSED (6 September)

G: *"I want this all wrapped up tonight so there's no outstanding things to do."*

**2M — the friendly / anonymous split.** Two chips at the top of the panel, his
framing and his words. **For people you know**: greeting, name, number, details,
letter layout. **Anonymous**: those rows do not render at all — not greyed,
absent — and the sheet prints centred and plated with the code as the only way
in. `askAnon()`, `askMode()`, and `askIsOn()` refuses greet/sign/phone whenever
`sh.anon`. `pick()` does the same on the print side, so a sheet flipped to
anonymous cannot leak a name that was ticked earlier. **The `letter` class now
follows the MODE, not the paper size.** Verified: 8 rows friendly / 5 anonymous;
printed anonymous carries no name, no number, no greeting and is not `.letter`;
switching back restores every typed word.

**2N — a second year.** G: *"these are not just a single time usage app. This is
to keep you going for your goal."* `beginAnotherYear()` appears on the finished
year screen. It pushes the whole year into `S.past` — `n, weeks, word, line,
start, end, zero, acts` — then clears acts, plans, zero, `finShown`, `halfShown`
and `current`, sets a new start date and routes to **act 0**, because a new year
deserves declaring the way the first one was. People, ideas, handles and the
card all stay. **`S.past` is in BOTH `serialise()` and the loader** — the rule
from the notes-panel failure. The journal appends every past year after the
closing page, each behind a "the year before" divider. Verified across a full
reload: 25 acts archived, grid empty, people intact, journal 27 pages with the
old stories still readable.

**2O — PER-SHEET KEYS. Nobody types a key any more.**
- App: `sheetToken()` mints 40 random characters at `askStart()`, kept on
  `sh.key`. `askKeyGet()` returns it. **The `prompt()` is gone** — grep for
  `prompt(` returns 0.
- Worker: `authed()` replaced by `bearer()`, `sameSecret()`, `isOwner()` and
  `ownsSheet()`. A PUT to an id that does not exist belongs to whoever creates
  it and stores `sha256(token)`. A PUT to one that does requires the token to
  hash-match. `.json` requires the same. **`PUBLISHER_KEY` still works as an
  owner master key**, so G's pre-existing sheets stay reachable.
- Verified against the real worker with eight cases: Ada creates and edits hers;
  Ben cannot edit hers (401); Ben cannot read her claimers' numbers (401); Ada
  can; Ben creates his own with no key from anybody; the master key still
  reaches hers; no token at all is 401.
- **The honest cost, and it is in the code comment:** lose the phone, lose the
  ability to edit that sheet or read its names. The sheet keeps working.

**2P/2Q — the feedback route. Sign-by-hand was DECLINED and removed.**
- **Sign-by-hand (`on.pen`) is gone.** Built in 2P, declined by G at once:
  *"no don't do this... if we want a signature we can use the font we used for
  her signature, but not needed for the sign up sheet."* Removed whole in 2Q —
  the tick, the flag, the print branch and the CSS; grep confirms nothing left.
  **Closed. Do not propose a write-on line for the sheet again.** Note the
  standing rule it brushes against: s4, no new script faces — the only
  handwriting in the app is Jessica's traced signature on the letter, and that
  is the face he means if a signature is ever wanted.
- `tellUs()` at the foot of You opens the person's own mail to
  **`info@donoharmcompany.com`**, subject "Acts of Good", with the build tag in
  the body so a report says which version it came from. **The app sends nothing
  and stores nothing** — the standing rule survives. One constant, `AOG_MAIL`,
  if the address changes.
- **2R moved it.** It sat on **You**, fifth of six buttons, and G ruled that
  wrong at sight: *"I think it has to sit somewhere more prominent. It needs to
  be somewhere where you can see it."* It is now at the **foot of Your year,
  directly above the build mark** — the screen the app opens on — as a coral
  line with a small envelope, 210×44 measured, not a sixth ghost button. The
  note explaining that it opens their own mail came with it. **The You screen
  lost the row entirely**; nothing is duplicated, and *Start over* is still last
  there. Report and version travel together now: the build mark and the way to
  tell us about it are the same square inch of the page.
- **G confirmed the mailbox exists**, so the Worker splash page got the address
  back too: *"Say hello"* now points at `info@donoharmcompany.com`. His personal
  address appears nowhere in either codebase.

**2S — A NAME COLLISION THAT BROKE THE INVITATION, AND THE SHEET'S SECOND PASS.**

- **DEFECT, shipped in 2A-2R and found by reading, not by testing: two functions
  called `drawAsk`.** The invitation panel has had one since 30 Aug; patch-02
  added a second for the sign-up sheet. Declarations hoist, so the later one won
  every call — including `openAsk()`'s. **Measured on the live 2R build**: after
  opening the invitation, `#ask-kind` and `#ask-mode` were both empty strings,
  so the Come along / Be part of it chips, the Text / Email chips, the message
  body, the subject and the send-button label never drew. The sign-up sheet's
  copy is now `drawSheetPanel()` and the invitation panel measures correct again
  (chips present, 201-character body, "Open Messages").
  **The lesson for this file: a patch that introduces a top-level function must
  grep for the name first.** Nothing warns you. No error is thrown. The older
  feature simply stops working, silently, and the newer one looks fine.

- **The two chips no longer hold their own state.** G: *"it seems like we're
  doubling up the same thing... we also have tick marks on the other side."*
  Correct — `sh.anon` secretly overrode ticks that the person could still see
  ticked. The chips now *move* the ticks and nothing more: **Signed by you**
  sets greeting and name on; **No name on it** clears greeting, name and number.
  Anonymity is read off the ticks (`anonOf()`), the three personal rows are
  always visible, and the tick list is the single truth about what prints.
  `sh.anon` is deleted on load — with a migration in `askOf()`, because an old
  anonymous sheet may still carry those ticks set and they would otherwise start
  printing on a sheet somebody made anonymous on purpose.

- **"Anonymous" is gone as a word.** It described a legal state, not what the
  paper looks like. The pair is now **Signed by you** / **No name on it**.

- **Both personal lines say (optional).** G ruled it for the number, then for
  the name. Noted for whoever reads this: every row in that list is optional —
  that is what the ticks are — so the word marks the two that people hesitate
  over rather than the two that are special.

- **The printed code says what it is.** The old line — *"Point a camera at it.
  Choose your one thing"* — never said the square was a sign-up list. It is now
  a bold **Scan this to sign up** hard against the code, the instruction in
  full, and **the address in plain text underneath**, which was missing
  entirely: before this, a person who would not scan had no way in at all.
  SignUpGenius's own published guidance is a short instruction against the code
  and two inches minimum for arm's length; ours is 2in on the full page, down
  from 2.35in, which is what G meant by *"it's just too big."*

- **You can see the paper before you print it.** G: *"can we say preview view so
  they can understand what they're looking at?"* The panel now shows the actual
  poster, at real proportions, scaled to the column, with two chips for the
  shape and one **Print it** button. **This is why the `.pgt` rules moved out of
  `@media print`** — the geometry has to exist on screen too. `#poster` is still
  `display:none`; the preview frame is the only place a `.pgt` shows. One CSS
  inch is 96px, so a full page is 816x1056 and the scale is measured width over
  that. `fitPreview()` retries on `requestAnimationFrame` because the panel is
  drawn while its section is still hidden and measures zero.

- **Both shapes re-measured at zero overflow** with a twelve-item potluck, after
  the taller footer pushed the full page 50px and each handout 53px over the
  plate. Row gaps and the handout's n4 step were tightened to pay for it.

**2W — THE FOOT OF YOU, AND TELLING PEOPLE WHERE TO PUT THE FILE.**

- **"This device" now holds only the two device things.** *Read your year* is
  gone from You: it was a second door to the journal, and the first one is on
  the screen the app opens on. *Read Jessica's letter again* is no longer a
  full-width button competing with the backup for weight. It is an underlined
  line of words at the very foot of the screen, 44px tall, 27px clear of the tab
  bar when scrolled to the bottom (measured). G: *"maybe it's just a simple set
  of words below... but don't put it up here."*

- **The backup note now names the destination.** G: *"if you can't auto save,
  there needs to be somewhere to go and what to save periodically."* Right.
  *"Keep it somewhere safe"* is advice; **"Choose Save to Files and put it in
  iCloud Drive"** is something a person can follow while holding the phone. The
  note covers both platforms, says **once a month is plenty**, and points at the
  line under the button for when the last one was. The success dialog says the
  same thing rather than *"keep it somewhere off this phone."*

**2V — THE BACKUP, AND WHY IT CANNOT BE AUTOMATIC.**

G asked whether the app could *"secretly try to auto save"*, and whether a new
phone could fetch the backup on its own. **It cannot, and this is worth writing
down so it is not re-litigated every few builds.**

- **A web app on iOS cannot write a file anywhere by itself.** There is no API.
  The File System Access API, which would allow a silent repeat save to a folder
  the person picked once, does not exist in Safari. The share sheet is the only
  route a file can take off the phone, and it needs a tap.
- **A new phone has nothing to identify itself with.** Storage is per origin, per
  browser, per device. Install the app again and it is empty; nothing connects it
  to the old phone. For a server to hand back a backup, something has to prove
  who is asking, and there are exactly two candidates: **an account**, which ends
  the app's "nothing leaves the phone" promise, or **a recovery code** the person
  keeps, which is a secret they can lose. There is no third option.
- **Photographs are the real obstacle**, not the mechanism. The text of a year is
  a few kilobytes. The photographs are tens of megabytes, they have never left
  the phone, and putting them on a server means real file storage and a rewritten
  privacy promise. Encrypting them first fixes the privacy half and makes the
  recovery code the only key in existence.
- **The one silent protection that IS possible is already in**:
  `navigator.storage.persist()`, which asks the browser not to evict the data.
  It has been there since before this build.

**So the app cannot do it, and now it reminds instead.** *Save a copy of my
journal* and *Bring a copy back* are named as the pair they always were:
**Create a backup** and **Restore from a backup**. `S.bkup` records when the last
one was actually handed over, set on BOTH export routes (the share sheet and the
download link), and a line under the button says so in words: *"Last backup:
3 weeks ago."* It turns coral at thirty days, or when there has never been one,
and it says nothing at all until there is an act worth losing. `S.bkup` is in
`serialise()` and the loader, per the standing rule, and was tested across a
reload.

**2U — NO EM DASHES. STANDING RULE.**

G, 6 September: *"no em dashes whatsoever to be used in this app."* **This is a
standing rule, not a one-off pass. Do not write one into a new string.**

- **Forty-four em dashes were rewritten by hand, one at a time**, not swapped for
  a hyphen. A find-and-replace to " - " would have left the same rhythm on the
  page, which is the thing he is objecting to. Each became whatever that sentence
  actually wanted: a colon where a list or a definition followed, a comma where
  it was an aside, a full stop where it was really two sentences.
- **Verified by rendering, not by grep.** The app was walked across Your year,
  People, Ideas, You, the journal, the works list, the log, setup, an act in the
  works with a live sheet, the letter and the invitation, and `body.innerText`
  checked for the character on each. Clean everywhere.
- **Three dashes survive on purpose, and they are not punctuation:** the bullet
  before each item in the app's needs list (`.adash`), the same bullet on the
  printed poster (`<li><span>`), and the signature rule G asked for himself on
  6 September (`.psg`, *"tabbed over dash Jessica Hensley"*). **OPEN for G**:
  whether those three go too.
- **A stale line was found while sweeping and removed**: the finish screen still
  said *"Halves are allowed, act 2.5 is a real act."* Half acts came out in 1X.
  It had been lying to people for nine builds.
- Comments in the source still contain em dashes. They are not in the app.

**2T — G'S RULINGS ON THE SHEET, THE YOU PAGE AND THE GRID (6 September).**

- **The sign-up panel's words are his, verbatim.** The field label carries the
  whole explanation now: *"Ask for help — using a sign-up: a shareable list that
  lets people claim one of the things you need, from any phone. No back and
  forth, and nothing for them to sign up to."* It replaced *"(a sign-up sheet,
  and a code to print)"*, which explained neither the thing nor the doing.
  **This is how SignUpGenius does it too** — their own definition never
  describes the mechanism: *"a shareable form that lets people claim time slots,
  tasks, or items from any device… no account required for participants."*
  The box beneath was saying the same thing again immediately underneath, so it
  is now one line: *"List what you need. The app makes the page to put up or
  hand out, and the list behind it."*
  **The explanation lives in exactly one of those two places. Do not restore it
  to both.**

- **The Signed by you / No name on it chips are gone.** They were a shortcut for
  three ticks sitting directly beneath them, and a second identical-looking chip
  pair in a panel that already has one for the preview. The panel opens on a
  sentence instead, and *Sign it* carries the teaching the chips used to:
  *"Leave both unticked and nothing on the paper points back to you — which is
  what you want for a noticeboard or a shop window."* `askMode()` is deleted;
  `anonOf()` still reads anonymity off the ticks for the poster.

- **Start over is off the You screen.** G: *"I don't like the idea of start over
  on the You page."* The wipe sat one tap from a confirm dialog on the screen
  people open to export their journal. `wipe()` is still in the file but nothing
  calls it. **Nobody is trapped by this**: the number, the word and the rhythm
  are all still changeable any time through the setup sheet (`setGoal`). The one
  case that is genuinely lost is handing the phone to somebody else. **OPEN for
  G**: whether a quiet double-tap line goes back at the foot of You.

- **"Begin another year" is now "Start a new goal"**, dialog and all. It appears
  under the pace bar only when the year is complete, which is what G asked for —
  a fresh start that arrives by finishing, not one that sits in settings all
  year waiting to be tapped by mistake.

- **Photographs no longer take over a grid tile. RULED — do not re-propose.**
  G: *"leave it as a one, a two, and go forward with how it is. So when it fills
  in red, it's completed with the sash."* A finished act used to wear its first
  photograph as the tile face with the numeral shrunk into a corner; at 60px
  that made the year a patchwork and no two grids read alike. The grid is a
  count, not a gallery. The `.tile img` rule went with it.

- **STILL OPEN: the poster's scan wording.** Three versions were drawn and
  rendered (A as shipped, B one plain paragraph, C three numbered steps). G has
  not ruled. **A is what is in the build.** B and C each ran 28px over the plate
  and would need the step thresholds moved down one band.

**G's personal address was removed from the Worker splash page** and redeployed;
verified gone from the live site with a cache-busting fetch. No `mailto:` remains
anywhere in the Worker.

## BUILD 2L — TICK ONLY WHAT YOU NEED (6 September)

G, on seeing the filled form: *"how do you know all this information? You're
gonna have to type it in... if you don't need the who, what, when and where,
then you don't click that."* He was right — the form had become a wall of boxes,
and worse, **the labels were only placeholders, so they vanished the moment you
typed.** Four detail lines sat bare with nothing saying which was which.

Every optional line is now a **tick**: circle, permanent label, and the field
only once it is on. `askOpt(key,label,placeholder)` renders one; `askTick()`
toggles `sh.on[key]` and focuses the new field. Same circle, same `pointerdown`
+ `preventDefault` as the notes list, so there is ONE gesture in this app for
"include this".

**Unticking keeps the words.** `sh[key]` is never cleared; only `sh.on[key]`
flips. Verified: typed an address into Where, unticked it — gone from the form
AND from the printed sheet — ticked it back, address intact.

**Printing reads the ticks, not the values:** `pick(k)` returns the value only
when `on[k]` is set, and `facts`, the greeting, the signature and the contact
line all go through it. The load-aware size step counts ticked lines only.

**Defaults on a new sheet:** greeting, When (from the act's date, as text now,
not an ISO date) and your name. Everything else off.

**Also fixed here:** the greeting moved above the narrative, so the form runs in
the order the printed page reads.

## BUILDS 2F-2K — THE POSTER BECOMES A LETTER (6 September, NOT PUSHED)

G showed Jessica's own door-to-door handout for the September 11 firefighters
dinner and said *"this is for our neighbors"*. Taken wholesale.

**2F — the parts lifted from hers.** New optional fields on `w.sheet`, all
printing only when filled: `greet`, `time`, `where`, `who`, `drop`, `sign`,
`phone` (`when` already existed and was never printed). They render as a
labelled facts block (`.pfx`) exactly as hers does — **When / What time / Where /
Who's involved / Drop off** — plus a greeting, and a footer line offering the
phone as an alternative to the code. No serialiser change needed: `sheet` is
stored and restored as a whole object.

**2G — the head stays centred.** G: the eyebrow, the gold rule and the bold title
stay centred; only the body sits left. `.pgt.letter` now left-aligns just
`.pgr`, `.ps` and the signature. Also moved *"Take whichever is easiest"* back to
directly after the list — it had ended up stranded after "Drop off", reading as
another fact.

**2H — the signature moved up**, tabbed behind an em-dash, and everything below
it (code, caption, mark) became the footer.

**2I — a REAL BUG that only measuring caught.** With the greeting, five detail
lines and a signature all filled, the content came to **881px inside an 874px
plate — 8px over**. `space-between` then had negative free space, the gaps
collapsed and the gold rule sat on top of the eyebrow text. Two fixes:
`row-gap` (0.12in full / 0.07in half) so nothing can ever touch, and the size
step now counts **the whole load** — `items + facts + greeting + signature` —
not just the items. Same sheet now has 143px of slack and drops to two columns
on its own.

**2J/2K — where the name goes. RULED by G from two rendered options.** Declined:
folding it into the details as a `Contact:` line — it read as another fact.
**Chosen: the name signs the paragraph**, `— Jessica Hensley` directly under
what was written, before the list. The number stays in the footer as *"or just
call or text"*, so the practical detail is where somebody scanning for it will
look, and the personal one is where it is personal. The declined branch was
**removed, not left in** — `signpos` is gone entirely.

**STILL OPEN, and the next thing to build:**
- **The friendly / anonymous split.** G's framing, and it is the right one. A =
  people you know (your street, your congregation, your friends): signed, with
  the number and the details. B = a public board: no name, no number, no
  address, code only. Two questions before printing — who it is for, and what
  size — with no middle ground. Proposed and awaiting his go.
- **Tick-and-write lines** on the friendly version, for people who will not scan.
- **A place for a graphic** under the eyebrow and rule. G: *"we're not gonna do
  that... we'll have to create a catalog, but that's a future item."*
- An explicit **Edit** affordance on the pre-filled fields.
- **Per-sheet keys** — still the blocker for anyone but G publishing.

## BUILD 2E — THE POSTER FILLS ITS PLATE (6 September, NOT PUSHED)

G: *"too much white space to the top and bottom... whatever is at the top of the
page should be the margin on the bottom."*

`.pgt` was `justify-content:center`, which centred the block and left an equal
dead band above and below it whatever was on the sheet. Now
**`justify-content:space-between`**, and **every fixed vertical margin inside the
panel was zeroed** (`.pr .pt .pd .ps .pq .pf .pm`, plus the `n4` and `half`
overrides) so they stop fighting the distribution. The list keeps its own
internal rhythm via `li` margins; everything else is spaced by the flex.

**Measured, all four cases:** the gap from the plate to the first line and the
gap from the last line to the plate are **identical** — 64px on the full page,
38px on the handout — with 3 items and with 12, on both paper shapes. Nothing
overflows. Screenshotted and looked at: three items now fill the sheet without
reading sparse.

## BUILDS 2C + 2D — THE HANDOUT ROTATED, AND THE LIST SCALED (6 Sept, NOT PUSHED)

**2C — the handouts are portrait, side by side on a landscape sheet.** G:
*"they're all reading horizontal on a portrait page. They all need to read
portrait on a horizontal page."* Correct — a door handout is portrait.

- `.pgt.half` is now **5.5in wide x 8.5in tall**, two inside `.psheet`
  (`display:flex; 11in x 8.5in`), dashed rule **down the middle** for the cut.
- **The paper rotates too.** One document cannot be both shapes, so
  `askPoster()` writes `@page{size:letter landscape}` into a `#postersize`
  style element before printing handouts, and plain `letter` for the full page.
- More vertical room in the taller panel, so the handout type came back up:
  needs 14pt, code 1.7in.

**2D — the list scales with how long it is.** G: *"if you're doing a potluck,
you need, like, twelve items."* Right — 19pt x 12 runs straight off the page.
`posterPanel()` counts the needs and adds a step class:

| items | class | full page | handout |
|---|---|---|---|
| 1-5 | *(none)* | 19pt, one column | 14pt, one column |
| 6-9 | `n2` | 15pt | 11.5pt |
| 10-14 | `n3` | 12.5pt, **two columns** | 10pt, one column |
| 15+ | `n4` | 11pt, two columns, smaller code | 9pt |

`break-inside:avoid` on every item so a line never splits across columns.

**Verified** headless in print media at both paper shapes, four cases —
full/3, full/12, handout/3, handout/12. Full page measures 816x1056 every time;
each handout measures 528x816 (5.5 x 8.5) with two on a 1056x816 sheet. Twelve
items on the full page go to two columns at 12.5pt; twelve on the handout stay
one column at 10pt. **Nothing overflows its plate in any of the four.**
All four screenshotted and looked at.

## BUILDS 2A + 2B — THE SHEET MADE USABLE (6 September, NOT PUSHED)

**2A — the panel is a form.** G: *"it needs to be a little bit more template
like."* Three labelled sections — **Who it is for**, **What is happening** (one
or two lines), **What is needed** (one per line) — with `Add an item` as the
placeholder on every empty row and the hint reading "Return for the next item."
The button is now **Make a sign-up sheet**, and the empty state explains the
point: *"List what you need and the app makes a code you can print. People scan
it, put their name to one thing each, and you see who is bringing what. No
account, and nothing for them to install."* New `.asklab` class; the two top
rows lost their dash and its indent.

**2B — the poster is paper-sized, and there are two of them.** G: *"even if
there's only three items on it, needs to fill an eight and a half by eleven...
it's very tiny"*, plus *"create an option to do two half a sheet posters so they
could be cut out and handed out"* — which is how Jessica works a street door to
door.

- `@page{size:letter;margin:0}` and `.pgt` is now **8.5in x 11in exactly**, with
  0.95in/1.05in padding and the gold plate inset 0.28in. Type in **points**, not
  pixels: eyebrow and reason 15pt, lede 13pt, the needs **19pt**, code 2.35in.
- `.pgt.half` is **5.5in**; two per sheet, dashed rule between them for the cut,
  everything scaled (needs 12pt, code 1.35in). `posterPanel(sh, half)` builds
  one; `askPoster(kind)` emits one or two. **Same words either way.**
- **The critical fix, found only by rendering it:** the app's `body` is a 520px
  centred phone column, and it was squeezing the poster and pushing it off the
  right edge of the paper. `@media print` now resets `html,body` width, margin,
  padding and background. Without that the whole thing prints wrong and nothing
  else matters.
- Two buttons replace one: **One full page** / **Two handouts**, under the line
  "Same words either way — only the size changes."

**Pre-written, not blank.** G: *"I would rather us pre write everything, and they
do have the option to edit it."* `askStart()` now fills the reason from the act's
title (falling back to "For a neighbor who could use a hand") and writes a real
lede. **This overrides my earlier concern** that pre-filling the reason puts the
act's title on the public poster — G was told and chose pre-fill, with editing.

**Verified** headless at 816x1056 (letter at 96dpi) with `emulateMedia('print')`:
full page measures 816x1056, ratio 1.294 = 11/8.5; two handouts measure 816x528
each, 1056 together, with identical text. Both screenshotted and looked at.

**STILL OPEN, and G's to rule:**
- **An explicit Edit control.** He said *"maybe there's a edit button in the
  prefilled field."* Not built — the fields are labelled and editable but look
  like plain text. Ask him whether he wants a visible Edit affordance or a
  boxed-input look.
- **The custom graphic** Jessica puts on her door-to-door handout. Named by G,
  deferred by him: *"we can talk about that later."*
- **Per-sheet keys** — still the blocker for anyone but G publishing.

## THE WORKER — CORS, WITHOUT WHICH 1Z DOES NOTHING (6 September)

**`C:\Users\tony\Documents\aog-sheets` is now mounted.** Patched `worker.js`
directly; six additive edits, nothing removed. Backup at `/tmp/worker.bak.js`
(this session only). 398 lines -> 441.

**The defect.** The app is served from `gahensley1.github.io` and calls
`actsofgood.app`. Cross-origin. `askPublish()` sends a PUT with
`content-type: application/json` and an `Authorization` header — a non-simple
request, so the browser sends an `OPTIONS` preflight first. **The Worker answered
OPTIONS with 405 and no CORS headers**, so the publish never left the phone;
`askPublish`'s `catch` swallowed it and showed "No connection". Reading claims
back failed identically. **Found by probing the live service from a real browser.
The sandbox test could not have caught it — Playwright route interception
bypasses CORS entirely.** Moving the app to `app.actsofgood.app` would NOT have
fixed it: a subdomain is still another origin.

**The fix.** `ORIGINS` allowlist (`gahensley1.github.io` + `app.actsofgood.app`),
`cors(req)` returning headers only for those, `co(res, req)` to stamp a response,
an `OPTIONS` branch at the top of `fetch`, and five wrapped returns: PUT's
401/400/200 and `.json`'s 401/200. **`vary: Origin`** so no cache serves one
origin's answer to another.

**The 401s are wrapped deliberately.** Without CORS headers on the 401 the
browser hides the status from the app, a wrong key becomes indistinguishable from
a dead network, and `askPublish`'s "clear the key and ask again" recovery never
fires.

**The sheet page and the claim route are untouched** — a stranger who scanned a
poster is already on that origin, and those routes must advertise nothing.

**Verified** by importing `worker.js` into Node and calling `fetch()` directly
(wrangler will not run in this sandbox: `workerd` in `node_modules` is the Windows
binary). Six cases, all correct: the app's preflight -> 204 with allow-origin,
allow-methods `GET, PUT, OPTIONS`, allow-headers `content-type, authorization`,
`vary: Origin`; a stranger's preflight -> 403 advertising nothing;
`app.actsofgood.app` -> 204; a wrong key on PUT -> 401 **carrying the header, so
the app can see it**; a wrong key on `.json` -> 401 likewise; the public sheet
page -> 200 with **no** allow-origin.

**DEPLOYED by G, 6 September.** Version `7e3132e8-ec15-4840-93b3-a88f74c6d698`.

**A seventh edit, found only after deploying.** The first live probe showed the
publish working and the owner's read still failing. Cause: `load()` returns null
for an unknown id and the handler fell through to `page(shell('Nothing here'...))`
— an HTML 404 with no CORS header — so a request for a sheet that no longer
exists reached the app as a network failure and was reported as "no connection".
Now `if (!data)` branches on `asJson`: the app gets `co(ok({error:'gone'},404))`,
a person opening a dead link still gets the page and no header. Redeployed.

**Confirmed live from `https://gahensley1.github.io`**, which is the only place
this can honestly be tested: `PUT /a/:id` with a wrong key reaches the Worker and
returns a readable **401 `{"error":"Not yours."}"`**; `GET /a/:id.json` for a
missing sheet reaches it and returns a readable **404 `{"error":"gone"}`**. Before
the deploy neither request left the browser at all.

**Still never tested end to end:** a real publish with the real key, a printed
poster, and a stranger scanning the code. Only G can run that.

**Noticed, not changed:** `GET /a/:id.json` calls `load()` before `authed()`, so
an unauthenticated request still costs two D1 queries. Not a leak, nothing is
returned — but it is free work for anyone who has the sheet id off a poster.
Worth reordering some day.

---

## BUILD 1Z — THE SIGN-UP SHEET, FROM THE APP (BUILT, 6 September)

Applied from `patch-02-sheet.py`, read in full first. All nine anchors verified
as matching exactly once before applying. The `.bak` and the spent patch removed
from `aog-push`; both corrected patches archived in `acts of good/patches/`.

**"Ask for help" under Photos on the act-in-the-works screen.** Make a sheet —
the reason, the warm sentence, the list of what is needed (same list behaviour as
Notes). Publish sends one `PUT`. "Who signed up" reads `/a/<id>.json` back. Print
the poster renders through a print stylesheet.

**THIS ENDS "NO NETWORK CALLS".** `fetch` now exists in the app — two calls, both
to `actsofgood.app`, both only when G taps a button. Writing an act still works
with no signal, and so does printing a poster.

**The id is minted on the phone** by `sheetId()` — 10 chars from
`crypto.getRandomValues`, before anything is online. **Never the act number:**
with no accounts the link is the credential and `/a/22` must not be guessable.

**The key.** `askKeyGet()` prompts once and keeps it in `S.pubkey`, serialised to
localStorage. A 401 clears it and re-asks. **Claude never handles this key** — the
app asks G directly. For the record: it is plain text in localStorage on his
phone, which is the documented design, but it is the credential that both creates
sheets and reads claimers' phone numbers.

**The code.** `askQR()` uses bundled `qrcode-generator` 1.4.4 (MIT, ~20KB) for the
module matrix only; the SVG, the clearing and the heart are ours. Level H, 37
modules, 17x17 cleared, heart at 95%. **MEASURED upstream: 17x17 decodes, 19x19
fails. DO NOT ENLARGE THE HEART.** Drawn entirely offline.

**Verified** headless at 390x844 with `actsofgood.app` intercepted, zero page
errors: the empty state offers "Make a sheet"; it mints a 10-char id that is not
the act number; the `PUT` carries the right body and `Bearer` header; `live`
flips; the code renders at viewBox 41 (37 modules + 4) with the heart `<image>`
present; reading back shows three rows, two claimed, with `sms:` and `mailto:`
links; **the poster contains the needs and does NOT contain the act's title, the
claimer's name or the phone number**; and after a **full page reload** the sheet,
its id, `live`, all three slots and the key survive.

---

## MY MISTAKE, 6 September — the notes did not survive a reload

I applied the FIRST version of `patch-01-notes.py`, which did not edit
`serialise()` or the works loader. **Notes and the journal flag were written to
`WK` and never reached localStorage.** My test closed the act with
`saveForLater()` and reopened it within the same page load, which looked exactly
like persistence and was not. **It shipped, and it was live on the site.**

Fixed by applying the two missing edits from `patch-01-notes-b846925b.py`
(serialise + loader), then re-testing with an actual `page.reload()`.

**Standing rule this proves: any change that adds a field to a work or to `S`
must edit BOTH `serialise()` and the loader, and must be tested across a real
page reload.** A test that never reloads cannot see this class of bug.

---

## BUILD 1Y — THE NOTES PANEL (BUILT, 6 September)

Applied from `patch-01-notes.py`, which G uploaded from another session. **The
script was read in full before it was run** — it only edits `index.html`, writes
a `.bak`, makes no network calls and deletes nothing. All six anchors verified
against 1X as matching exactly once before applying. The `.bak` (1MB) and the
spent patch were then removed from `aog-push` so neither gets committed;
`README-PATCHES.md` is kept in both folders.

A Notes list under The story on an act in the works. `w.notes = [{t,d}]`,
`w.njr = 0|1`. Private: never on a card, a post or a poster.

**The architecture is not a preference and must not be "simplified".** Separate
one-line `<textarea>` elements, never one contenteditable. iOS dictation fires
the text once then re-fires it word by word 100-500ms later with no composition
events and the DOM already updated; in a contenteditable a re-render during
input permanently desyncs the editor and later text lands in the wrong place.
**G dictates everything.** Separate fields give native undo per field,
`selectionStart` as a stable caret, working `enterkeyhint`, and dictation landing
in a plain `.value` you can diff.

The circle is a **sibling** of the field, never inside it, and the handler is on
`pointerdown` with `preventDefault()` — not `click` — so a tap cannot move the
caret or drop the keyboard.

**A trap already hit and fixed upstream: `noteSave()` does no tidying.** An
earlier version stripped trailing empty rows on every save, which deleted the new
line the instant Return created it and made the panel look completely inert.
Empty rows are removed by Return-on-empty and by nothing else. Do not add a trim.

**Verified here against 1Y**, headless Chromium 390x844@2x, zero page errors:
34x34 hit target with a 21px circle; the circle is confirmed NOT a descendant of
the field; typing seven lines with Return between gives seven rows in order;
four coral dots for the four names in People and none for the one that is not;
Return on an empty line takes 8 rows to 7 and blurs; ticking two sets `d:1` on
both without moving focus; Backspace at position 0 merges upward and joins the
text; the journal flag persists; closing and reopening the act restores all six
rows, both ticks, the flag, and every field's value; and **a caption built from
an act carrying notes contains none of them.** Screenshot taken and looked at —
it matches the design G supplied.

**NOT WIRED, deliberately, and G has been told:** the notes do not appear in the
journal page even when `njr` is set, and they are not in `exportJournal`. Both
change what the journal prints, which is a s2 copy decision he has not seen.

**Also not built** (drawn in `SHEETS-AND-NOTES.md`, not in the patch): no indent,
no drag to reorder, no auto-sort of ticked items, and no "notice, never convert"
hold-a-line menu offering to add a person or put a line on the sign-up sheet.

## BUILD 1X — THE YEAR CAN END (BUILT, 6 September)

G: *"all of it go."* Built against his own marked recommendations because the
eleven questions in `THE-WORDS.md` were still unanswered — **3E·1, 4A·1, 5A,
6 all, 9A** — and he was told exactly which words went in so he can overrule any
of them in one line. Documented default, not a guess.

**1. Half acts are gone.** Every touchpoint removed: `.struck` / `.struck .half`
/ `.hashalf` / `.jpage .jno .struck` / `.tile.half`, the "Mark as half an act"
button and its note, `toggleHalf()`, `halfNo()`, the `a.half` branches in
`drawActNo()`, the journal's `noLine`, both canvas branches in `renderCard()`,
`half:!!a.half` in all three serialisers, and `a.half` in `finishGo` /
`renumberAct` / the stranded-renumber path. `fin-no` is now `inputmode="numeric"`
and rounds. `wholeNo()` kept (still used); `halfNo()` gone. **Old data migrates
silently** — a saved `a.half` is simply ignored and the act keeps its square.

**2. The count is the filled squares.** New `doneCount()` counts distinct
occupied slots between 1 and `S.n`, and `yearDone()` is `doneCount() >= S.n`.
`drawHome()` reads `doneCount()`, not `S.acts.length`. The number on screen and
the grid under it now cannot disagree. **"27 of 25" is impossible.**

**3. The year has an ending.** `p-state` gains a `fin` branch reading
**"the year is complete"** (5A) in `--coralink` at weight 600. NOTE: the muted
colour and weight were **inline styles** on `#p-state`, which beat any
stylesheet rule — both moved into `#p-state{}` so `.complete` can win. The
journal's closing page swaps "so far" for the same words.

**4. The moment.** `#moment` (fixed, over Your year) + `#momentcf` canvas.
`confetti(bursts)`: 95 pieces per burst, second at +780ms, gravity 48px/s^2,
**no opacity fade at any point** — pieces are culled only once `y - h` clears
`height + 24`. Reduced motion settles them in place. `showMoment('fin'|'half')`,
`hideMoment()`, `checkMilestones()`. **One hook only**, in `go()` under
`v==='home'` at +420ms, so the moment lands on Your year whatever route the act
took. `S.finShown` / `S.halfShown` make each fire exactly once — renumbering
afterwards cannot replay them. Halfway is `doneCount() >= Math.ceil(S.n/2)`.

**5. The closing card and post.** `S.fin` is a pseudo-act like `S.zero` — never
in `S.acts`, never counted. `drawActNo()` gains a `fin` branch giving the
`.actno.caps` line **PUT A LITTLE / MORE GOOD INTO / THE WORLD.** at 7.2cqw.
`buildCaption()` gains the 8C caption. `askEval()` skips it.
**`#cardface` became `.cardface`** (7 rules) so `#m-face` can wear the same
container-query geometry — the element keeps its id; only `renderCard`'s
`querySelector('#cardface .handimg')` still uses it.

**6. The two repairs.** 6A: `buildCaption` now falls back to `a.t` when there is
no story, so a quick-logged act finally says what was done — and `more` counts
the title too. 6C: `cm-no` reads **"your declaration"** for act 0 and
**"the year"** for the closing post; `finPost()` sets it explicitly because
`drawCompose()` does not.

**7. Her friends' names are out of the code notes.** Judy, Mabe, Ginger, Leigh,
Holly, baked4good — 20 mentions, all generalised in place ("the honoree", "one
friend", "two friends"). The reasoning survives; whose act it was does not.
`check-nothing-of-hers.py` now reports zero in notes and zero outside them, with
"Jessica" x2 remaining as her letter signature, which is intended.

**Verified** by playing a whole year in headless Chromium at 390x844@2x, **zero
JS errors**: 12 of 25 shows no moment; logging 13 fires halfway once and never
again after dismissal; filling to 25 fires the finish with the card, the caps
line and both buttons; Your year then reads "25 of 25 · the year is complete" in
rgb(192,63,43) at weight 600 with the bar at 100%; mid-year still reads muted;
the journal's 27 pages close on "the year is complete · 25 acts"; the closing
post carries the 8C caption under the subtitle "the year"; and a normal act's
caption now contains its title. Screenshots taken and looked at for halfway, the
finish, the year screen and the post.

**Still G's to rule** (built to my recommendation, one line changes any of them):
full stop vs exclamation on the card; 4A·1 naming people on the private finish
screen vs 4A·2 not; 5A vs 5B vs 5C; 9A vs 9B vs 9C. And **question 8 is still
open and unbuilt: does the app offer a second year?**

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

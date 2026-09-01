# HANDOFF — 50 Acts of Good

**Read this first, then the `acts-of-good` skill.** This file is the live state.
The skill carries the standing rules and the working method; this one carries
what is true right now. When they disagree, this file is newer — say so and fix
the skill.

Last updated: **30 August 2026**, end of the defect-fix session.
Build in G's hands: **1R**.

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

    **Act 0's card image does not exist to be matched.** `the-posts.md`, added
    31 Aug, lists acts **0, 3, 4, 8, 14, 15, 19** as still missing entirely.
    What survives of act 0 is a marked-up draft of its text — the source the
    app's letter was adapted from. So the year card (lockup, no act line) stays
    an inference until Jessica's Facebook download produces the original.

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

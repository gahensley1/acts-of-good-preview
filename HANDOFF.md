# HANDOFF — 50 Acts of Good

**Read this first, then the `acts-of-good` skill.** This file is the live state.
The skill carries the standing rules and the working method; this one carries
what is true right now. When they disagree, this file is newer — say so and fix
the skill.

Last updated: **30 August 2026**, end of the defect-fix session.
Build in G's hands: **1C**.

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

- **The safe-area collision** — "your ear gets caught up into the numbers and
  phone and date." `body` carries `padding-top:env(safe-area-inset-top)` *and*
  the sticky `.top` header adds the same inset again in a
  `@media (display-mode:standalone)` rule. Sticky pins to the viewport, which
  under `viewport-fit=cover` + `black-translucent` starts at the physical top of
  the screen — so on first scroll the header leaves the body padding and parks
  under the clock, and the title jumps by one inset. **Fix:** drop `padding-top`
  from `body`, give `.top` the inset unconditionally. Diagnosed, awaiting
  approval.
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

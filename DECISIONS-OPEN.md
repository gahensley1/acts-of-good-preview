# Open decisions — 50 Acts of Good

**Build 1S, 31 August 2026.** Everything here needs G. Nothing on this list is
being built until it is ruled. Numbered so they can be answered by number.

The panel that produced the findings below: the **theme critic** (does the app
argue for one thing, does every detail earn its place) and a **UX and
accessibility review** that ran the real build in headless Chromium at 390×844
and measured every number it quotes. More seats are still running; this file
gets appended, not rewritten.

---

## Fixed on the way in, not asked about

Two genuine defects in what shipped tonight. §1's narrow exception — a broken
thing inside what was already being touched, flagged rather than buried.

**1S-a — act 0 stranded first-run users.** `startYear()` hides the tab bar and
routes to act 0; the only function that brought it back was `zeroDone()`, which
**nothing ever called.** Measured from empty storage: after "I'm doing this",
pressing back landed on Your year with `#tabs` at `display:none`, height 0 —
**no Ideas, no People, no You, no Plan & Log, and no route to them.** A reload
rescued it; an installed Home Screen app has no reload, so the only way out was
force-quitting. The tab bar now returns inside `zeroGo()`, the moment act 0
exists.

**1S-b — the app asked whether declaring your year went to plan.** `askIfPosted`
→ `askEval` had no guard for act 0, so answering "Yes, it is up" opened *"About
act 0… How did it go? Went to plan / Partly / Didn't go to plan."* Guarded.

**1S-c — "Save, complete later" nearly deleted your work.** The instruction was
to take the "Let this one go" button and make it say *save, complete later*. That
button calls `dropWork()`, which **removes the act from the shelf and releases
its photos.** A button saying "Save" that deletes is the worst kind of bug, so
it now calls a new non-destructive `saveForLater()` — everything on that screen
already keeps itself as you type, so it just leaves and the shelf holds it.
**Consequence to note: there is now no way to delete an act in the works from
that screen.** If you want one back, say where it should live.

---

## 1. Act 0 — three questions left

**1.1 Does act 0 set the start date?**
Right now setup sets `S.start`. If act 0 set it instead, the year would count
from the day you said it out loud rather than from the day you filled in a form.
That is a truer clock and real accountability. It also means offering
*Today / The 1st / My birthday* rather than a date wheel — named landmarks beat
raw dates, and that effect is measured, not folklore.
**Yes / No.**

**1.2 Act 0 has no journal page.**
The journal's opening page is commented in the code as *"the opening page: why
the year began. Act 0, in her words"* — but it renders `S.why`, not act 0. So
act 0 makes a card and a post and then leaves no page in the book. Should it
have one?
**Yes, its own page / No, the opening page already covers it.**

**1.3 Opening act 0's tile offers the wrong menu.**
Tapping the zero square opens the card screen, which offers *"Do it again"*,
*"Mark as half an act"*, *"Change its number"* and *"Delete this act"*. None of
those mean anything for a declaration.
**Hide them for act 0 / leave it.**

---

## 2. The year screen — the theme critic's one change

> *"Make the first thing on the year screen a person, not a number."*

The app's argument, taken from the file rather than the brief, is: **the good is
the pretext, the people are the point, and the way in is to say so out loud and
then ask.** The letter states it, the pipeline enacts it, act 0 closes on it.

The year screen contradicts it. The first things on it are `p-count`, a progress
bar, `home-sub` "week 12 of 52" — and then `p-week`, **"week 12 of 52" again,
immediately below** — then "Spent so far / Your share". **Four numbers before a
single name.** The code comments know: *"one screen below a letter promising
nobody is keeping score."* The words have been fixed three times; the layout
never was.

**2.1** Move the count and bar below the month card, and let Your year open on
who was in the last act?
**Yes / No / show me both.**

**2.2** "week 1 of 52" appears twice on that screen — in the header sub and
again in the pace card. This was on Jessica's own list of small things that
annoyed her. Drop one?
**Drop the header one / drop the pace one / leave it.**

---

## 3. Things the app says that it should not

**3.1 The black gap bar on You.** The theme critic wants it pulled. On that
screen you are now told the same thing three times at once: the tab dot you just
tapped, three coral row dots reading **Add**, and a bar reading *"Your card
still needs a name and a birthday."* It also wears Undo's exact shape and
colour, so the app's neutral voice and its asking voice look identical. And
*"still needs"* accuses.
**Pull the bar / keep it / soften the wording.**

**3.2 The tally note.** *"One number is fine. Or the calculator keeps a tally as
you buy things."* — sitting under a label saying **keep a tally** and beside a
button saying **act calculator**. It repeats both words back.
**Trim to "One number is fine." / leave it.**

**3.3 Three names for one control.** The dead code still calls it *"Keep a
tally"*, the label says *"The act tally"*, the button now says *"act
calculator"*.
**Settle on one word.**

**3.4 The occasion card.** "National Volunteer Week", "Make a Difference Day" —
the critic's view: the only place on Your year that sounds like a content
calendar rather than like her. The Ideas library is the opposite and is the best
writing in the app (*"Zucchini season exists for this"*, *"Call the district
food services office, not the school"*).
**Keep / cut / rewrite in the library's voice.**

**3.5 Setup's fourth question.** *"Three questions. You can change any of them
later"* sits **below** "The hand on your card" — a fourth field. The promise
arrives after the question it fails to count.
**Fix the number / move the line / drop the line.**

---

## 4. Accessibility — measured, not estimated

Ran against WCAG 2.2. Everything below is a real measurement from the live
build.

**4.1 The You screen is unusable by keyboard or screen reader.** Seven
`<div class="setrow" onclick=…>` — name, birthday, reason, the hand on your
card, accounts. No `tabindex`, no `role`, no label. Announced as plain text.
**Fix / leave.** (My view: fix. It is the settings screen.)

**4.2 Text failing contrast.**

| where | ratio | needs |
|---|---|---|
| the card's big number `25` | **1.85:1** | 3:1 |
| the script word on the card | **1.96:1** | 3:1 |
| the journal's heading | **2.17:1** | 3:1 |
| the `›` chevrons on You | **2.10:1** | 4.5:1 |

The gold is your artwork and arguably decorative — but on act 0 that number is
carrying real meaning, and the chevrons are the only affordance on the You rows.
**Darken the chevrons / leave the artwork alone / both.**

**4.3 Every field border is 1.31:1** — `#E4E0DA` on white, against a 3:1
requirement. Field edges are effectively invisible outdoors, which is where a
lot of this app gets used.
**Darken the borders / leave.**

**4.4 The selected tab is colour-only**, 1.19:1 against the unselected colour,
same weight, no other differentiator. Screen readers are covered by
`aria-current`; a colour-blind sighted user gets nothing. Tab labels are 10.5px
— roughly 7.9pt, under Apple's minimum.
**Add weight to the selected tab / raise the label size / leave.**

**4.5 One tap target genuinely too small:** "Shuffle these" in Ideas at
**90×17**, and it is an `<a href="#">` doing a JavaScript action rather than a
button.

---

## 5. Older questions still open

**5.1 X.** `HANDLE_KEYS` includes `'x'` and the person form asks for an X handle,
but `PLATS` deliberately excludes X — the reason is in the file: *"280
characters turns an act into a slogan."* The posting page is not wrong; it shows
what is switched on.
**Drop X from the person form / restore X to the posting page.** Not both.

**5.2 Facebook or Instagram.** Every dated post in `the-posts.md` is **Facebook**
(acts 6, 20, 21). The app ships Instagram first and the whole posting flow is
built around Instagram's paste problem. Not a bug — a question about where the
app's centre of gravity should be.

**5.3 Act 0's real card does not exist to be matched.** `the-posts.md` lists
acts **0, 3, 4, 8, 14, 15, 19** as missing entirely. The year card the app now
draws — your lockup with the act line removed — is an inference. Jessica's
Facebook "Download Your Information" is the only source with print-resolution
originals, and the printed book will need it regardless.

**5.4 The dead product still in the file.** `sheet('plan')` is never called, so
`#sheet-plan`, `#s-log`, `#sheet-done`, `planDone()`, `fillLogFromPlan()`,
`newAct()`, `restoreDraft()` and `newActChecked()` are unreachable. That is
where the older accounting app's vocabulary survives — *"Complete this act"*,
*"Put it in the grid"*, *"Nicely done. Two quick questions while it's fresh."*
**Excise it / leave it for the size pass.**

**5.5 `.tabs` never pays the bottom inset.** `padding-bottom:calc(9px +
env(safe-area-inset-bottom))` is overridden by a `padding:9px 6px 24px`
shorthand later in the same rule. The tab labels sit inside the home-indicator
area on every notched phone.

**5.6 The 320px limits.** On an SE-era screen the occasion line and "Browse all
ideas" cannot share a row, and the "Expected act" label wraps. Both hold at
390px and up.

**5.7 Longer horizon, yours and Jessica's:** the artwork licence, the
native-build go/no-go, printables and book pricing, honoree-as-a-durable-entity,
and a file-size pass.

---

## What I would answer first, if only three

1. **2.1** — the year screen opening on a person rather than a number. It is the
   app's own thesis, contradicted on its most-visited screen.
2. **4.1** — the You screen's seven unreachable rows. It is the settings screen
   and it currently cannot be operated without sight and a touchscreen.
3. **5.3** — Jessica's download. Everything about the card, the book and the
   missing seven acts is blocked behind it, and it gets harder to get the longer
   it waits.

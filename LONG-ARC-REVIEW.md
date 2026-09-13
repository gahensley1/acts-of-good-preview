# The long arc — product seat review, build 4Z
**13 September 2026.** Read-only review by the Product & the long arc seat. Nothing built off this.

Companion to the code seat's review of the same build. Neither is permission to build.

---

## REAL DEFECTS — these will go wrong for a real person

**1. The ending can be thrown away in one tap, permanently.**
When the fiftieth act lands the app shows "That's the year", the closing card, and two buttons:
*Post it* and *Not now*. The moment marks itself spent the instant it appears. Tap *Not now* —
on a bus, or wanting to write something better, or wanting to show your husband first — and there
is no route back. The closing post and closing card cannot be reached from anywhere else, ever.
Your year screen then offers one thing: *Start a new goal*. **The most important screen in a year
of work is a one-shot.**

**2. Growing the goal after finishing kills the ending outright.**
Set 25, finish 25, raise it to 50 to keep going — the obvious, intended behaviour. The "finished"
flag is set once and nothing resets it when the goal changes. They reach act 50 and the app says
nothing at all. Same for halfway.

**3. The rollover deletes the closing post.**
The archive keeps act 0 — the declaration — and discards the closing post and its card. The
beginning of the year survives into the journal forever; the ending is thrown away. **Backwards.**

**4. A finished year loses all its photographs from the journal.**
The pictures are stored and loaded back correctly — that was fixed in 4T. But the journal page
that draws a past year's acts does not draw photographs at all. Current year shows them; last year
doesn't. On the first day of year two a person opens their journal and every photograph from the
year they just completed has vanished from the book. They are still on the phone and still come
out in the printed book, and **nothing tells the person they are not lost.** Most likely single
cause of somebody feeling robbed by this app.

**5. The rollover destroys planned acts and their photos while promising it won't.**
The confirmation says the year moves into the journal "whole: all N acts, their cards, their
stories and their photographs", and "your people, your ideas and your card stay exactly as they
are". It does not mention that every planned, unfinished tile — with any photos already attached —
is deleted outright, no undo, photos swept at next launch. Somebody finishing with acts 47–50
planned for next month loses that work silently, having just been told nothing would be lost.

**6. Year two starts by forgetting everyone.**
The people directory only counts the current year. On day one of year two the friend who was in
twelve acts with you reads "not in an act yet · no handles yet", and the sort collapses. The one
screen that is about the people carries no memory across the boundary.

**7. Every card in year two prints the wrong age.**
The age word is only recalculated on the setup screen. The rollover goes straight to act 0 and
never passes through it. A fifty-one-year-old spends year two printing "in year fifty" on every
card and every hashtag. Given the birthday is **the hook**, that matters. Second edge: cards draw
from current settings rather than from what the act was written under, so the day they do open
setup the word silently changes on every card ever made, last year's included.

**8. The printed book mislabels every act from a previous year.**
The book includes past years now — good — but stamps every page with the *current* goal. A 25-act
year printed inside a 50-act year reads "act 1 of 50" … "act 25 of 50", then year two starts at
"act 1 of 50" again. No divider between years, one merged title page carrying only the current
year's word, one date range spanning both.

**9. The backup reminder goes silent for the whole of year two.**
Counted in acts since last backup; the rollover doesn't reset it. Back up at act 48, start a new
year, and you are 48 acts "in credit" — 51 more before backups are mentioned again. **It switches
itself off at the exact moment the journal becomes irreplaceable**: two years of photographs, one
phone, no account, no cloud.

**10. A year that doesn't finish can never be ended.**
There is no way to start a new year except the button that appears at 100%. Nothing happens when
the fifty-two weeks elapse — the week count clamps at "week 52 of 52" forever. A person at 34 of 50
after eighteen months is stuck: no ending, no archive, no fresh start. The only escape is working
out for themselves that lowering the goal to 34 unlocks it — which also rewrites the number printed
on every card they have made. **The most important structural gap in the long arc, and far commoner
than finishing.**

**11. A backup file can be silently corrupt.**
If any photograph has gone missing from storage the exported file can come out as invalid text and
fail to import at all. The export already counts what it lost; it writes the file wrongly. With no
accounts and no cloud this file is the only thing between a person and losing two years.

---

## WEAK OR MISSING

- **Nothing ever reaches out.** No notifications of any kind in the file. The only thing that can
  bring somebody back on day 40 is a calendar event they made themselves, or memory. The honest
  answer to "what brings them back when they're behind" is: nothing does.
- **The month card's one piece of commentary is reserved for the person who is behind.** "Nothing
  logged in September yet" shows only when short of pace, hidden when ahead. Everywhere else pace
  judgement was stripped out; this line is the survivor, and it speaks only to the person least
  able to take it.
- **Saving an idea after finishing reads as a refusal.** "Your year is full. Every slot has
  something in it already" — on the day they completed fifty acts of good.
- **No lifetime total anywhere in the app.** Only the printed book adds across years. Nothing ever
  tells a two-year user they have done seventy-five acts of good. That is the number that would
  bring them back.
- **Past acts are frozen shut.** No write-it-up, no change-anything. An act whose story was never
  written can never be written. The current year's journal promises "everything in it can still be
  changed" — that promise expires at the rollover.
- **A past year has no opening page.** "Why you began" belongs only to the current year and is not
  carried into the archive, so year two overwrites the reason year one happened.
- **Every archived year is labelled "the year before."** By year three there are two of them.
- **The fiftieth act's own small celebration misfires** — stands aside for the ending, correctly,
  but is not cancelled, so it plays days later out of context. The fiftieth tile never gets its
  sash animation either.
- **The rollover never asks what the next year should be.** Same number, same length, straight to
  the declaration. The one moment they are certain to be thinking about it is the one moment they
  are not asked.
- **The people directory reads as a ledger.** Sorted by act count, highest first — a league table
  of your friends. Each row: a count, then two absences, and nothing about what any of them did
  with you. The data is right there — the acts remember names, the book already builds an "in honor
  of" roll. The directory doesn't use it.
- **Contributions are matched by name substring** — a "Jo" on your list gets credited with
  everything "Joanna" chipped in on.
- **"Started 30 weeks ago"** on a stalled act is the nearest thing in the app to a reproach. Fine
  at three weeks; at thirty it reads as a comment on you.
- Half-finished acts carried into year two keep slot expectations from a year that no longer exists.

---

## WHAT WE ALREADY DO BETTER — verified in the source

- **The progress bar has no target line.** It was built, then deliberately removed. It shows how
  far you have come and refuses to show where somebody thinks you ought to be. Essentially every
  habit app does the opposite. **The single most consequential difference here.**
- **No streak, and nothing that accumulates and can be broken.** Nothing to lose by missing a week.
  No competitor in this space can say that.
- **The unit of progress is the act, never the day.** You cannot miss a day; the app has no concept
  of one. Five weeks of nothing is not a failure — only the week number changes.
- **The count names what it counts.** "12 of 50 acts of good", not a bare score. An empty year says
  "Begun" rather than "0".
- **Empty pages are not accusations.** A page with no story is drawn as a page with no story, not
  as grey italic where the story should be. Twenty-five acts and nine stories are sixteen pages,
  not sixteen prompts.
- **The ending leads with names, not numbers.** "and Sarah, Marcus and Dee were in it with you"
  comes before any count, and when nobody was: "it was yours alone, which counts just the same."
  That sentence is the whole product in nine words.
- **Ideas rotate on a weekly seed, not randomly.** Reshuffling on every open turns the one
  editorial surface into a slot machine; this gives a reason to look on Monday.
- **An act in the works has no deadline and no status.** "Started three weeks ago · Marcus is in ·
  two photos already · the story has begun" — progress described without a schedule attached. No
  other journalling app seen describes an unfinished thing without implying it is late.
- **Money is stated plainly and split properly** — total and your share. Most gratitude and
  volunteering apps pretend cost doesn't exist, and cost is what actually ends these projects.
- **The app hands over and never posts.**

## WHAT THE MARKET DOES THAT WOULD BE WRONG FOR US

- **Streaks, streak freezes, paid streak restoration.** Makes the fiftieth act a chore and a
  fortnight of grief a failure. The exact mechanism this product exists to refuse.
- **A daily reminder push.** An act of good is not a daily habit. It also taps somebody on the
  shoulder on the day their mother is in hospital. Any notification must be tied to a day the
  person themselves chose.
- **Projected completion dates.** "At this pace you'll finish in March 2028" is a verdict dressed
  as arithmetic — the deleted target line in a longer sentence.
- **Leaderboards, friend comparison, social proof counters.** Fatal. The act is *for* someone; the
  moment it is also *against* someone this is a different product.
- **An automated year-in-review every December.** The ending here is earned by the fiftieth act,
  not by a date. The fix for defect 10 is an offered ending the person chooses, never a scheduled
  one.
- **Badges and levels for volume.** Rewards twenty easy acts over one that took a fortnight.
- **"You haven't opened this in 14 days" mail.** Absence is not a problem to be solved.
- **Cloud sync with accounts.** Closed, and right — which is why the export file has to be perfect
  and currently is not.

---

## COVERAGE — read this before treating silence as approval

**Read:** storage, save/load, export and import, photo retention and the orphan sweep; setup, the
age derivation, the year word; halfway and finish, the closing post and caption, the rollover;
Your year, the pace card, the month card, the suggestion rotation; the journal, current and past
years; the printed book; acts in the works, the finish sheet, the grid and sashes; the people
directory and person editing; ideas/browse; the card-gap and backup bars; navigation, panel
handling, boot.

**NOT read:** the stylesheet (~first 1,200 lines), the ideas library, the canvas animation code,
the sign-up sheet publishing and claims code, photo capture and the spend tally, the log-and-save
flow in detail, the compose/share/hand-off code, the card and poster drawing internals.

**Therefore uncovered:** the closing card's appearance, the sign-up sheet across a year, and
anything in the sharing hand-off. **Silence on those is silence, not approval.**

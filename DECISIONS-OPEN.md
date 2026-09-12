# Questions for you

31 August–2 September 2026. Nothing here gets built until you answer.
Answer by number — "1 yes, 4 show me" is plenty.

---

## NEWEST — the sign-up sheet (12 September)

Seven testers looked at the poster, the page behind the code, and the claim.
It is all drawn here, with the options rendered:
**`reviews/PANEL-11-the-sign-up-sheet.html`**

All seven stopped at the same thing, which has never happened before.

**18. Giving a thing back. — RULED 18A, 12 September. BUILT, waiting on you to
put it live.** Two commands, from `Documents\aog-sheets`, in this order:

    npx wrangler d1 execute aog --remote --command "ALTER TABLE slots ADD COLUMN release_hash TEXT"
    npx wrangler deploy

Nothing breaks if you run them out of order or not at all — until the first one
is run, the sheet simply behaves as it does today. Drawn and driven in a browser
first: `reviews/PANEL-11a-item-18-spelled-out.html`.

**What it does.** The row you took stays marked **Yours**, and underneath it sits
one line — *I can't after all* — right up to the day. Tap it and it asks once:
*Hand it back? Keep it / Yes.* The row opens again for the next person. No name
is shown, nothing is sent, nobody explains themselves. Only the phone that took
the row ever sees the way out; everybody else still reads *In good hands*. And
the form now says so before you commit, which is the part that actually matters:
people take things when taking them is not a trap.

*The original question, for the record:* Someone takes the pans, then can't — a night shift,
a sick child, a Saturday that goes wrong. There is no way to hand it back, so
they go quiet, and the page still says "In good hands" until nobody turns up.
Four of them said they would rather take nothing at all than risk being the hole.
That means a sheet nobody dares claim from looks exactly like a quiet sheet.

  - **18A** — the page remembers on their phone that the row is theirs, and
    offers "I can't after all" right up to the day. The row simply opens again.
  - **18B** — the same, but it comes back to the top of your list marked *came
    back*, so you see it rather than find a gap.
  - **18C** — leave it. They text you, with a number they were never given.

**18, continued — how they get back to the list at all.** Raised by you, not by
the panel, and it was a hole: the way out of a claim is useless if there is no
way back to the page. A claimer has no app and no account, and the poster may be
somewhere they never pass again.

- **18·1 — the calendar.** DONE, unasked, because it was already your ruling:
  *your app shows what is outstanding, their calendar reminds them.* The reminder
  now carries the link. Only reaches people who add it.
- **18·2 — show the link on the page** after they take something, so they can
  screenshot it or text it to themselves. **Still open.**
- **18·3 — your message carries the link. RULED 12 September.** When the app
  writes the message telling them where and when, the link rides along in it.
  Then every single person who took a row has it in a text from someone they
  know. **Nothing to build today** — the app side of the sheet does not exist
  yet; this is now a requirement written into its spec so it cannot be missed.
  *Next question when that gets built: the actual words of that message. Named,
  not drafted.*
- **18·4 — tell them the poster works.** Scanning the code again already
  recognises them; nothing says so. Tested four ways: same phone recognises,
  another phone does not, a different browser on the same phone does not.
  **Still open**, and it is free.
- **18·5 — put that line on the printed poster too. RULED IN, 12 September**,
  against my recommendation. The poster now closes:
  *Point a camera at it. Choose your one thing — no account, no app to install.*
  *Scan it again any time to edit.*
  The paper is now the mechanism as well as the advertisement. Recorded in the
  poster spec in `SHEETS-AND-NOTES.md`; nothing is printed yet because the app
  side that generates the poster is not built.

**19. The poster that outlived its act. — I owe you a correction here.** I told
you a dead code gives a blank error page. It does not: it gives a proper page of
ours that says *"Nothing here — that link does not lead anywhere."* I had read a
fetch failure as a blank page without checking the code, and I was wrong.

The finding still stands, smaller than I said it was. That page is cold, and it
cannot tell a **finished** sheet from a **wrong** link — so the person who scans
your poster a month late is told they made a mistake, when what actually happened
is that a good thing finished.

  - **19A** — a finished sheet keeps its page and says so kindly, ending on the
    creed.
  - **19B** — the same, and it says what the act became: "Eight firefighters got
    dinner. Thank you for scanning."
  - **19C** — leave the error page.

**20. How many are still wanted.** One line, one person is a shopping list, not
a sign-up sheet. Ask a church for pantry staples and eleven bags of rice arrive.

  - **20A** — a row can want more than one: "six dozen cookies — two dozen still
    wanted."
  - **20B** — a row can be taken by several people, with no number: "a few of
    these."
  - **20C** — leave it at one each.

**21. What you are promising, before you promise it.** Four of them stopped on
the same line — *"Someone with a van, Saturday morning."* Which Saturday, and how
far. **Nobody asked for the address**; they asked whether they could keep the
promise.

  - **21A** — the date and the rough area only: "Saturday the 14th, east side."
    The street still arrives privately.
  - **21B** — the date only.
  - **21C** — leave it; they find out after saying yes.

  *This brushes a ruling you already closed — the page never shows where and
  when. That was written to stop a church wall broadcasting a drop-off address,
  which 21A does not do. Your ruling, so your call whether to reopen it.*

**22. The poster looks finished.** It reads as an order of service — the
official one, already dealt with. Beside a handwritten flyer with tear-off tabs
it is the one nobody scans. Jessica's own flyer worked partly because it looked
home-made. Both of these are looks, so both are yours:

  - **22A — RULED 12 September, and built into the spec.** Neither line got
    smaller; both grew, by different amounts. The coral ask is up **25%** and is
    now plainly the headline. The black title is up **15%**, which keeps it out
    of the ask's way and fixes something we had not noticed: it used to be
    *smaller than the paragraph underneath it*, which is backwards and was part
    of why the top read as flat. Drawn, shrunk and re-checked at walking
    distance: `reviews/POSTER-TOP.html`.
  - **22B** — the thin gold frame comes off **the printed sheet only**. A home
    printer pulls paper a millimetre crooked and a crooked frame is the one thing
    everybody notices.
  - **22C** — leave the poster exactly as it is.

**23. The example on the poster.** Two testers, from opposite directions. One
counted that **every one of the four things costs money** — bedding, pans,
staples, a van — and she has four dollars a week and two hands. The other said a
family arriving in March is the one example half her nine thousand women would
read as a political position rather than a kindness.

  - **23A** — change the example to act 22's shape: a meal for the fire station.
    A pan of something hot. A gallon of sweet tea. An hour on Saturday to carry
    boxes. No politics, and not everything costs.
  - **23B** — bigger: the app always nudges you to include at least one row that
    costs nothing, so a sheet is never a wall of receipts.
  - **23C** — leave the example alone.

**Also named, not built:** the front page's "put a little more good into the
world" reads to one tester as one side of her town — while "a neighbor, a
congregation or a staff room" in the next paragraph she praised unprompted. Say
the word and I'll draw options.

**Ruled and closed on 12 September, so not on this list:** the notes panel holds
prose as well as ticks ("B with 1"). See `SHEETS-AND-NOTES.md`.

---

## FIRST — the end of the year

A full 25-act year was played through the app on 2 September. It never crashed
once. But **the year cannot end**: finish everything and the screen says
*"27 of 25 — plenty of room"*, because half acts are being added up as whole
ones, and there is no finishing state anywhere in the app.

You asked for confetti, a card about putting good back into the world, and a
reaffirming message. All of it is drawn — the confetti actually runs on the
page — here:

**https://claude.ai/code/artifact/4fdec46e-58ab-459e-9154-d4f308085279**
(also saved as `reviews/the-finish.html`)

Where it stands after your rulings:

1. **The counting** — **RULED: half acts are removed entirely.** That closes four
   of the eight defects on its own: the count can't overshoot, there's no slash to
   get wrong, act 1 can't become "act 0.5", and the card stops disagreeing with the
   caption. What comes out: the "Mark as half an act" button, the struck numeral,
   the small coral "2.5", the diagonally-split square, and the journal's version of
   all of it. **Note:** Jessica's own year had a half act; the app will no longer
   be able to draw one. Any half already saved becomes a whole act.
2. **The moment** — confetti, the message and the card, once, on the day you finish.
   Still open, though nothing about it is contested.
3. **The card** — **RULED: 3E, in capitals, punctuated.** It reads
   **PUT A LITTLE / MORE GOOD INTO / THE WORLD.** across three lines, filling the
   space under the rule. Only one thing left: full stop (3E·1) or exclamation
   (3E·2).
4. **The words above it** — three, all about the people now, because the card
   already says the line in capitals and the two must not repeat each other.
5. **The year screen afterwards** — "the year is complete" (5A), "all of them"
   (5B), or "a full year of good" (5C).
6. **The repairs** — 6A (what you did never reaches your post) and 6C (act 0's
   posting page contradicts its own card). **6B is withdrawn** — no half acts, no
   slash. Say **6 all** for the two that remain.
7. **Not building it, just asking** — should the app offer a second year?
8. **The closing post** — the card needs a caption and I had not drawn one.
   Three, all with the names stripped out, none repeating the line on the card:
   *I did it.* (8A), *That's 25.* (8B), or *25 of 25 ... invite me.* (8C).
   Numbered 8 so nothing already given to you changed number.

**Names, corrected.** One of the stand-in names I used in a mockup — Beth — was
not invented. It came from Jessica's act 0. It is gone, and the page now says
plainly that the names are made up.

Checking for the same mistake elsewhere: **her friends' real names are in the
app file's own notes** — Judy and Mabe, Ginger, Leigh, Holly, baked4good, twenty
mentions. Nobody using the app can see them; anyone opening the file can. The
automated check now reports them every run instead of skipping them.
**Still waiting on you: strip those names out of the notes?** The reasoning stays,
only whose act it was goes.

Nothing here is built yet.

---

## About act 0

**1.** Right now your year starts counting from the day you fill in the setup
form. Should it start the day you declare it instead?

**2.** Act 0 makes a card and a post, but leaves no page in your journal. Should
it have one?

**3.** If you tap the zero square, you get offered "Do it again", "Mark as half
an act", "Change its number" and "Delete this act". None of those make sense for
a declaration. Hide them?

---

## About Your year

**4.** Your year opens with your count, a progress bar, "week 12 of 52", then
"week 12 of 52" a second time, then how much you've spent. Four numbers before
anyone's name — on the screen right after a letter promising nobody is keeping
score.

The reviewer's strongest note was: make the first thing on that screen a person,
not a number. That would mean opening on who was with you in your last act, and
moving the count and bar down below the month.

Do you want that? I can draw it both ways first.

**5.** "week 1 of 52" appears twice on that screen. Which one goes?

**6.** The "worth knowing about" card suggests things like "National Volunteer
Week" and "Make a Difference Day". It's the one part of that screen that sounds
like a marketing calendar rather than like Jessica. Meanwhile the Ideas library
is the best writing in the app — "Zucchini season exists for this".

Keep it, cut it, or rewrite it to sound like the Ideas?

---

## About the You screen

**7.** Tap the You tab and you're told the same thing three times at once: the
dot you just tapped, a coral "Add" on each missing row, and a black bar saying
"Your card still needs a name and a birthday."

The reviewer wants the bar gone. It also looks identical to the Undo bar, so the
app's neutral voice and its asking voice look the same. And "still needs" nags.

Pull the bar, keep it, or just soften the words?

**8.** Every row on that screen — your name, birthday, reason, the hand on your
card, your accounts — can only be used by tapping. Someone using a screen reader
or a keyboard can't reach any of it. It's the settings screen, so I'd fix it.
Agreed?

**9.** The little arrows at the end of those rows are the only sign the rows are
tappable, and they're too pale to see properly. Darken them?

---

## Small wording things

**10.** The note under the calculator says "One number is fine. Or the
calculator keeps a tally as you buy things." The label above it says *keep a
tally*. The button beside it says *act calculator*. That's three mentions in
three inches. Cut the note down to "One number is fine."?

**11.** That control has three different names across the app — "Keep a tally",
"The act tally", and "act calculator". Which is it?

**12.** Setup says "Three questions" above four questions.

---

## Bigger things still waiting

**13.** The person form asks for someone's X handle, but the app will never post
to X — the reason is written into the app: *"280 characters turns an act into a
slogan."* So people can type in something that never gets used. Stop asking for
it, or start posting to X?

**14.** Every post of Jessica's we have is on **Facebook**. The app puts
Instagram first, and the whole posting flow is built around working around
Instagram's limitations. Is that the right way round?

**15.** ~~Jessica's Facebook download~~ — **I was wrong about this and you
were right.** The notes said seven of her acts had no post saved at all. That
was true of our archive, not of Facebook. The posts are all there. I found act 0
in two searches and pulled it in full — it's in `ACT-0-RECOVERED.md`, and it's
the first time this project has had the whole thing.

And I withdraw the offer I made with it. I said I'd read them all and write
them down properly — that was the wrong shape. Her posts are reference, not
content: they exist to keep the app's voice honest and to suggest ideas worth
generalising. Building an archive of her personal writing isn't the job, and
none of it belongs inside anyone's copy of the app.

So nothing is needed here. If a question ever comes up about how she said
something, I can go and look at that one thing.

**16.** There's an old, dead version of the app still sitting inside the file —
whole screens nobody can reach. It's where the colder wording survives, like
"Complete this act" and "Nicely done. Two quick questions while it's fresh."
Clear it out now, or leave it for a tidy-up later?

**17.** On newer iPhones the row of buttons at the bottom sits slightly too low
and overlaps the home bar. Worth fixing?

---

## Three things I fixed without asking

These were broken, not choices.

**A.** Anyone starting fresh got stuck. After declaring their year, the row of
buttons at the bottom never came back — so a new person finished act 0 and found
four fifths of the app missing with no way to reach it.

**B.** After posting act 0, the app asked "How did it go? Went to plan / Partly
/ Didn't go to plan." That's a fine question for an act. It's nonsense for a
decision.

**C.** The button you asked me to rename to "Save, complete later" was wired to
throw the act away, along with its photos. It now actually saves. **One thing to
know:** there's no longer any way to delete a half-finished act from that
screen. Tell me if you want one back, and where it should go.

---

## If you only answer three

**4** and **8**.

Number 4 because it's the app's own point, contradicted on the screen people see
most. Number 8 because it's the settings screen and some people simply can't use
it. And number 15 is closed — nothing needed.

# Sheets and Notes — build brief

**For a fresh session. Read this, then `HANDOFF.md`, then the `acts-of-good` skill.**
Written 6 September 2026. Everything here was decided or built in one session with G.

Two pieces of work, one shipped and one drawn:

1. **The sign-up sheet.** Backend is **live in production** on `actsofgood.app`. The app side
   is not built at all. **Reviewed by the panel 12 Sep 2026 — see "What the panel found" below.**
2. **The notes panel.** **BUILT AND LIVE IN `index.html` SINCE BEFORE 12 SEP — this brief said
   "nothing built" and was wrong for days.** It shipped as a checklist only. Ruling B-with-1 on
   12 Sep turned it into a note that also holds prose; that change is **build 4K**, on disk in both
   folders and pushed by G. See "RULED: B with 1" and "What 4K actually changed" in Part Two.

`index.html` has **not been touched** *by this brief*. (It was build 1W on 6 Sep; the pushed build
as of 12 Sep is **4J**, from other work.)

---

## Standing rules that govern all of this

From the `acts-of-good` skill, and they hold here without exception:

- **§1 Ask before you build.** Do the thing asked, nothing else. Adjacent findings get named in
  the message, not built.
- **§2 No copy change lands silently.** Show before/after with the reason.
- **§3 The settled three are closed** — the half-act, "How did it go?", "Act n of N".
- **§4 No script or cursive faces, ever.** The only handwriting is Jessica's traced signature.
- G rules by letter and number. Show options as **rendered A/B visuals**, never prose lists.
- He dictates. Transcripts garble. When a garble changes what gets built, **ask**.

---

# PART ONE — THE SIGN-UP SHEET (live)

## Where it came from — act 22

**Confirmed by G, 12 September 2026.** The sign-up sheet exists because of
**act 22** — Jessica's neighborhood meal for the eight firefighters at Station
No. 1, in honor of September 11. She ran that act on **SignUpGenius**, built
the menu around a Boston butt with the sides filled in around it, and put a
paper flyer on **all 28 doors of the two closest blocks**. The app could not
hold any part of it, so she went elsewhere — the same shape of evidence that
produced the notes panel (Apple Notes, the postcard party).

Act 22 is therefore the sheet's **proof case**, and it should be read against
this brief whenever something here is in doubt. Four things it settles or
sharpens:

- **The poster is real and it works.** Her flyer on 28 doors is the thing the
  poster section below describes, done by hand, before the app could print
  one. Compare the drawn poster against her actual flyer before finalising the
  copy. *(Her flyer carries a real street address and a live QR code — see the
  production flag in `act-library.md`; it never travels into a published page.)*
- **"Tell me what holes you have and I'll fill them."** David Costrini, a
  friend a few streets down, said that to her. It is a person asking, in
  plain words, for the thing `/a/:id` renders: what is still outstanding.
  That single line is the strongest argument in the corpus for the sheet, and
  it should be quoted whenever the feature has to justify its cost.
- **Quantities per slot is not optional.** It is in "Still open" below. A
  potluck for eight, anchored on one protein, is precisely where "two dozen
  taken" decides whether two people bring the same pans. Act 22 moves this
  from nice-to-have to required.
- **The recipient count is known before the sheet is made.** She knew it was
  eight. Whatever the app asks for when a sheet is created, *how many people
  is this for* is a real field she would have filled in.

## What the panel found — 12 September 2026

Seven testers reviewed the poster, the page behind the code, and the claim.
`reviews/PANEL-11-the-sign-up-sheet.html`. **All seven stopped in the same
place, which has never happened on this panel before.**

**THE FINDING — nobody can hand a thing back.** Each of them took something in
their head, thought about the Saturday that goes wrong, and took nothing.
Marcus: *"That is not a claim lost. That is worse — that is a hole with a lid
on it."* The page says **"In good hands"**, the organiser believes it, nobody
turns up. Four of them said they would rather take nothing than risk being the
hole — so the damage is invisible: **a sheet nobody dares claim from looks
exactly like a quiet sheet.** This is listed third in "Still open" below. The
panel says it is not third; it is the credibility of the whole feature.

**Six of seven — the dead poster.** *Corrected 12 Sep: a dead code does NOT
return a blank browser error — it returns our own `shell()` page reading
"Nothing here — that link does not lead anywhere." The review page said
otherwise; that was a fetch failure read as a blank page without checking the
source. Do not repeat the original claim.* The finding survives in reduced
form: that page is cold, and **it cannot tell a finished sheet from a wrong
link**, so somebody scanning a month-old poster is told they made a mistake
rather than that a good thing finished. Paper outlives the act it advertises;
one tester said *"My church has a flyer up from 2019. Somebody's mother is
going to scan that."*

**Four of seven — what you are promising, before you promise it.** They all
stopped on *"Someone with a van, Saturday morning."* Which Saturday, how far.
**Nobody asked for the address**; they asked whether they could keep the
promise. This brushes ruling 9 below, which exists to stop a church wall
broadcasting a drop-off address — a date and a rough area would not do that.
G's closed ruling, so G's to reopen or leave shut.

**Paula, on the printed object.** She read it as an order of service — the
finished, official one. *"Finished things don't get scanned."* Beside a
handwritten flyer with tear-off tabs, ours is the one nobody touches, and
Jessica's real flyer worked partly because it looked home-made. Her three craft
notes: the coral line and the black line are the same size with an even rule
between them, so neither is the headline; a hairline frame inset from the sheet
edge will print visibly crooked on a home printer, and a crooked frame is what
everyone sees; the dashed list will not hang straight under a centred block.

**Renata and Sherri, from opposite directions, on the example.** Renata counted
that **every one of the four demo items costs money** — bedding, pans, staples,
a van: *"I have four dollars and two hands and you've asked for neither."*
Sherri, separately: a family arriving in March is the one example half her nine
thousand women would read as **a political position** rather than a kindness.
She praised *"a neighbor, a congregation or a staff room"* in the same breath,
so the voice can do it.

**Two said no at six weeks — Marcus and Brianne — for one reason only: the
organiser's side does not exist.** That is a vote for the build order below, not
a mark against the design.

**Six rulings are waiting on G, written plainly as items 18–23 in
`DECISIONS-OPEN.md`.** Nothing from this review is built.

## Handing a thing back — LIVE 12 September 2026 (ruling 18A)

**Deployed and verified the same day.** Worker version `46bc45cb-4ac1-40f4-80ac-109d902cb2ad`;
the `release_hash` column confirmed present on the remote `aog` database (a repeat of the migration
answered *duplicate column name*, which is the proof). Verified against the live site afterwards:
`POST /a/:id/release` answers as JSON — proving the route exists and the new code is serving —
while a made-up path beside it still returns the HTML not-found page, and the splash and dead-link
pages are both healthy.

*Not yet exercised end to end in the wild, because that needs a real sheet: **the first sheet
anybody publishes is the real test.** Take a row on it, close the page, scan the poster again, and
confirm the row reads "Yours" with "I can't after all" underneath.*

The panel's unanimous finding, answered. **In `worker.js` and `schema.sql`, not
in `index.html`**, which is untouched. It went live with two commands run from
`Documents\aog-sheets` — and they must be run **from that folder**: run them from `aog-push` and
wrangler finds no settings, offers to create a stray Worker named after the app repo, and asks for
a name. *If wrangler ever asks you to name the Worker, you are in the wrong folder.*

    npx wrangler d1 execute aog --remote --command "ALTER TABLE slots ADD COLUMN release_hash TEXT"
    npx wrangler deploy

**How it works, and why it works this way.** There is no account here, so the
proof that a row is yours cannot be a login. When you take a row your own phone
makes a random key, keeps it in that browser, and sends only its SHA-256 to the
Worker (`slots.release_hash`) — exactly how the owner token is handled. Send the
key back to **`POST /a/:id/release`** and the row opens again. The condition
lives in the SQL, like the claim it undoes:

    UPDATE slots SET name = NULL, contact = NULL, note = NULL,
                     release_hash = NULL, claimed_at = NULL
    WHERE sheet_id = ? AND pos = ? AND name IS NOT NULL AND release_hash = ?

**What a person sees.** Their row reads **Yours** and carries one quiet line,
*I can't after all*. Tapping asks once — *Hand it back? Keep it / Yes* — using
the app's own "Keep it" idiom for the cancel. Everybody else still reads *In
good hands* with no control at all. The claim form and the thank-you both now
say the way out exists **before** you commit, which is the real mechanism: four
of seven testers said they would rather take nothing than risk being the hole,
so **the button's job is mostly to be there, not to be pressed.**

**Three decisions inside it, all reversible:**
- **The thank-you page keeps the list** when a sheet fills up, hidden unless
  this phone is holding a row. A sheet filling must never trap the one person
  who can no longer come. Ruling 7's gracious close is unchanged for everyone
  else.
- **Lose the phone and you lose the way out.** That is the honest price of never
  asking anyone to sign up for anything. The organiser is still reachable.
- **The give-back reads quieter than the take** — sentence case against the
  uppercase *I'LL BRING IT*. Aesthetic, therefore G's; say the word and it
  changes.

**The key is wiped with the phone number**, thirty days after the day, in the
same nightly job.

**Verified before it was handed over:** driven in a headless browser at phone
size — take a row, reload, confirm it still reads *Yours* with the way out while
another person's row reads *In good hands* with none, hand it back, confirm the
row reopens and stays open after a reload. Zero page errors. A release sent with
a wrong key is refused.

## How many a need wants — RULED 20A, BUILT 12 September 2026

Three of seven testers hit this independently and act 22 required it: a row used to be one thing
for one person, so "twelve casseroles" had to be typed twelve times, and nothing ever said how many
were still wanted. Marcus: *ask my church for pantry staples and you will get eleven bags of rice in
a hall on a Tuesday.*

**The model, and why it is safe.** A need is now a **group of rows** sharing a `grp`. Twelve
casseroles is twelve rows. **One row still holds one name**, so the compare-and-swap that stops two
people bringing the same pans, the release, and the nightly retention wipe are all *exactly* as they
were — only the shape of the list changed, never the shape of a claim. A need arrives at the Worker
either as a plain string (one pair of hands) or as `{text, n}`, so **an old app against the new
Worker works untouched** and deploy order cannot bite. Ceiling of forty, because one stray keystroke
should not write nine thousand rows into somebody's act.

**What a stranger sees.** One line per need, not per place: *A casserole — **Nine still wanted***.
Taking one counts it down to eight and the button moves on to the next free place rather than
closing. When they are all gone the line reads *All twelve in good hands*. If this phone holds one
of them, the way out appears underneath, labelled **You took one of these**.

**What the organiser sees.** People are listed one by one, with their message link and their
*Free it*; the places still going spare collapse into a single line — *A casserole — two of four
still going spare* — instead of a wall of empty rows.

**On the poster.** A need that wants several says so: **A casserole ×12**. One pair of hands says
nothing, as before.

**Two things that had to move together:** the counts live in their own array beside `sh.slots`
rather than changing what a slot is, so every existing read of the slots keeps working — and
Return and Backspace in the builder splice both arrays, or twelve casseroles quietly become twelve
vans.

**Two bugs found by building it**, one of them pre-existing: the claim button stayed disabled
reading *One moment…* after a successful claim, which never mattered when nobody claimed twice from
one page and matters constantly now; and the page advanced to the next place in the whole group
rather than the next **free** one.

**Verified end to end** against a sheet of fourteen places in three needs: the list collapses to
three lines, *Nine still wanted* counts down to eight and then seven, it survives a reload, handing
one back puts it to eight, and another phone sees eight with no way out of its own. Zero page
errors. Poster and claims list screenshotted and looked at.

## What the page says, and what stays on paper — RULED 21A, BUILT 12 September 2026

**The problem, in one line.** The printed poster has always carried a ticked table of *why, when,
what time, where* and *who*. The page carried **none of it**. It showed what was needed and never
when or where.

Four of seven testers stopped on *Someone with a van, Saturday morning* and would not promise.
Trent: *I need to know if it's forty minutes away before I promise my Saturday.* **Not one of them
asked for the address.** They were not trying to find the place. They were trying to work out
whether they could be there at all — and the app already knew, and never said.

**What it took.** More than a display change. `askPublish` sent four fields — reason, lede, date,
slots — and the details were not among them, so the Worker had never seen them and had nowhere to
put them. The app now sends a `facts` object; the Worker whitelists five keys, caps each at 140
characters, stores them as one JSON column and prints them in a card between the story and the
list. **Above the list, deliberately** — it is what a person needs *before* they promise a
Saturday, not after.

**The drop-off line stays on paper, and that is the whole of the privacy ruling here.** It is
somebody's front door. A poster on a noticeboard is read by the street; a link is read by the
internet, and those are not the same audience. It is blocked **twice**: the app never sends it, and
the Worker would refuse to store it if a malformed client did. Tested by deliberately sending it.

**One thing fell out for free.** Once the page knows *where*, so does the calendar reminder —
the `.ics` now carries `LOCATION:`, which is the line that makes a calendar entry open a map.

**An older phone cannot strip a sheet's details.** A publish that never mentions `facts` leaves the
column alone; a publish that does mention it writes what it sends, so unticking *Where* in the app
does take it off the page. Both directions tested.

**Verified:** publish body carries the five and not the sixth, across a real reload. Worker stores
what is whitelisted and nothing else — an injected `<script>` and the drop-off line both refused.
Page renders the card, one detail or five. A sheet with no facts, and a sheet with garbage in the
column, both render exactly as before. Worst case — long story, all five details at full length,
six needs — still puts the first **I'll bring it** above the fold on a 390pt phone, at 610pt. No
horizontal overflow. Screenshotted and looked at.

## The example — RULED 23A, BUILT 12 September 2026

Two testers hit the old example from opposite directions. Renata counted that **every one of the
four things cost money** — bedding, pans, staples, a van — and said *I have four dollars and two
hands and you've asked for neither.* Sherri, separately: *a family arriving in March* is the one
example half her nine thousand women would read as a political position rather than a kindness.

**Why an example is worth a ruling.** It is the only thing a first-time organiser sees before
writing their own, and people copy the shape of what they are shown. The old one quietly taught
every sheet made after it that a need costs money.

**It was also not one example.** The placeholders had drifted into a mixture of two different acts —
a voter-participation *why*, *Sips. Snacks. Stamps.* from the postcard party, a fire-station
*where*, and a September 11 date. Nobody had ever read them top to bottom in one go.

**So the whole example is act 22 now** — Jessica's meal for the eight on shift at Station No. 1,
the act that produced this feature — and **G ruled that the last row costs nothing**: an hour and
two hands, in his words, *someone to help drop off the thing*.

| | was | now |
|---|---|---|
| Who it is for | For a family arriving in March | For the crew on shift at Station 1 |
| Greeting | Dear neighbors on Oak Street, | Dear neighbors on the 600 block, |
| What is happening | A few of us are putting a box together to meet them. | A few of us are putting a meal together. |
| What is needed | *Add an item* ×4 | A pan of something hot / A gallon of sweet tea / Paper plates and napkins / **Someone to help drop it all off** |
| A line under the title | Sips. Snacks. Stamps. | Hot food. Cold tea. One hour. |
| Why | To encourage voter participation | They work while the rest of us are home |
| Where | Fire Station #1, 535 E. 63rd | Fire Station No. 1, on East 63rd |
| When / What time / Who's involved / Drop off | — | unchanged; they were already act 22's shape |

**The street number came off the *where*.** Jessica's real flyer carries a real address and
`act-library.md` flags it as never travelling into shipped material. A placeholder only has to show
the *shape* of a location, so it names the station and the street and stops there.

**Placeholders only.** They vanish the moment anybody types, and they are never stored, never
published and never printed — verified by driving the builder and reading the sheet back.

**A pre-existing defect this uncovered, named and not built:** a placeholder longer than one line is
**clipped**, because the fields grow on input and nothing grows them for placeholder text. The old
*box together to meet them* line was already being cut off and nobody had noticed. The new copy is
written to fit, and every placeholder in the panel is now measured as fitting — but the underlying
fault is still there and will bite the next long placeholder anybody writes.

## The row that costs nothing — RULED 23B as A, BUILT 12 September 2026

23A fixed the example. It did not finish the job, because **a placeholder vanishes the moment
somebody types over it** — so the person most likely to build a wall of receipts, the one who fills
the list, was exactly the person who never saw the free row.

So it stops being an example and becomes a standing one. **A greyed line sits under whatever has
been typed, however long the list gets**, reading *Someone to help deliver the food*. Tap it and it
becomes an ordinary row with the caret at the end, ready to be rewritten into whatever that act
actually needs.

**G's framing, and it governs the whole thing:** *"it's up to them whether they change it or not.
We can't force them to do that. That's just a nudge."* So it is **the notes panel's ghost circle
again** — a faint thing you tap to make real — and never a rule, a warning, a required field or a
nag. The app's second use of that idiom; it should be the first place anyone looks next time
something needs offering rather than demanding.

**It holds nothing.** A plain button, not a field: it cannot be typed into, it is never stored, and
it reaches neither the poster nor the page unless somebody taps it. Verified by publishing with it
untouched and reading the body.

**The example dropped to three** — pan, tea, plates — because the fourth was the free one and it
now lives at the bottom permanently. Tapping while the last row is blank fills that row rather than
adding a second blank beneath it.

### The defect this build turned up, and it was mine

**`askFree` already existed.** Build 4L gave the organiser a *Free it* button on every taken claim,
and its handler is `askFree(pos)` — the release. The new ghost row was given the same name. Two
function declarations, one name: **the later one silently wins**, so the ghost row was calling the
release with no position and doing nothing at all, with no error anywhere.

Renamed `askFreeRow`. The release is verified intact.

**It was caught by driving the button, not by reading the code** — the CSS class names were checked
for collisions, as the standing rule says, and the function name was not. *Check that a name is
free before using it, functions included.* A comment sits at the collision site so the next person
finds it.

## What it is

Some acts are too big for one pair of hands. The app makes a **sheet** of what is needed and a
**printable code**. A neighbor, a congregation or a staff room scans it and takes one thing each.
No account, no app to install, and nobody's name on a public wall.

## Where it lives

| | |
|---|---|
| Domain | **actsofgood.app** — Cloudflare registrar, same account as Deerstalker |
| Worker | **aog-sheets** — Custom Domain on the apex, plus `aog-sheets.tony-13f.workers.dev` |
| Database | **D1 `aog`**, id `e3e2d868-efba-4ae1-8865-0d50015cf1e7` |
| Source | `C:\Users\tony\Documents\aog-sheets` — `worker.js`, `schema.sql`, `wrangler.toml`, `SETUP.md` |
| Cron | `17 4 * * *` — nightly retention wipe |
| Studio site | `donoharmcompany.com` — untouched, separate |

Deploy with `npx wrangler deploy` from that folder. **The Worker is deployed once and never again
for a new act** — `/a/:id` reads the id off the URL and renders whatever row it finds.

## Routes

- `GET /` — the splash page. The brand's front door, not a tidy 404.
- `GET /a/:id` — the sheet, as a page. **Read only, always.** Mail clients and link previewers
  fetch URLs before a human sees them, so a link must never claim anything by being opened.
- `POST /a/:id/claim` — the only stranger-facing write.
- `GET /a/:id/ics?pos=N` — a calendar file for whoever claimed that row.
- `GET /a/:id.json` — the owner's read. **Key required.**
- `PUT /a/:id` — publish or edit. **Key required.**

## Security model

**One key**, `PUBLISHER_KEY`, held as a Cloudflare secret. Never in the page, never in the repo.
It gates creating, editing, and reading back who claimed what. Set with
`npx wrangler secret put PUBLISHER_KEY`.

**Claiming stays open** to anyone with the link. That was ruled and it is the point.

**A leak that was found and closed:** `/a/:id.json` was public and returned every claimer's phone
number, while the sheet id is printed inside a code on a public wall. It now returns 401 without
the key. Watch for this shape of mistake again.

**Double-booking** is one conditional statement, not a transaction:
`UPDATE slots SET name=?, contact=? WHERE sheet_id=? AND pos=? AND name IS NULL`.
`meta.changes = 0` means someone won the race. **The condition must live in the SQL**, never in
JavaScript — read-then-write is how two people end up bringing the same pans.

**Bots:** a honeypot field and a two-second floor on how fast the form comes back. Free, invisible,
no CAPTCHA. **Humans:** 20 claims per IP per hour, counted in `claim_log`, pruned nightly.

**Ids are ten random characters**, made on the phone before anything is online, so a poster can be
printed with no connection. **Never the act number** — with no accounts, the link is the credential,
and `/a/22` must not be guessable.

**Retention:** contact details are wiped **thirty days after the day itself**, first names kept.
Scheduled, not promised. The page says so plainly, and the only real legal exposure at this scale
is saying something you then don't do.

## The twelve rulings (all closed)

0. **RULED 19B and BUILT, 12 September 2026 — the finished sheet says what the act came to.**
   *A correction first, because the panel oversold this and I repeated it: a sheet that finished
   already got a warm page* — "Everything for this one is spoken for. Thank you for stopping to
   look," ending on the creed. The cold "Nothing here — that link does not lead anywhere" only ever
   appeared when the sheet was **not in the database at all**: a mistyped address, or a poster
   printed from a sheet that was never published. So 19 was never about the common case.
   19B adds the good news to the page people actually land on. **Derived, never typed** — the page
   already knows what the sheet was for and how many rows were taken, so nobody writes a closing
   line and no name ever appears:
   - four taken -> *Four people brought one thing each, and that was all it needed.*
   - one taken -> *One person brought one thing, and that was all it needed.*
   - none taken (closed early) -> the old sentence, unchanged.
   Goes live with `npx wrangler deploy` from `Documents\aog-sheets`. **No migration this time.**
   *Named, not built: letting the organiser write their own closing line. Nobody asked.*
1. The sheet reads as an invitation, as drawn.
2. Anyone with the link may claim.
3. The poster prints **the needs and the reason**, not the act title.
4. The heart sits at 95% of the cleared area. Re-decoded at that size.
5. A sheet never comes up on its own. It exists only if you make one.
6. A claimed row reads **"In good hands"**. No name, ever, on a public page.
7. A gracious close when everything is taken, ending on the creed.
8. A first name and one contact — wiped after thirty days.
9. You message them where and when. **The page never shows it.** A poster on a church wall must
   not broadcast a drop-off address.
10. Your app shows what is outstanding; **their calendar reminds them**.
11. `actsofgood.app`, as a Cloudflare Custom Domain.
12. **One code per act** — the code is the door to the list, not to a single thing.

**The app never sends anything.** No email, no texts, no push, no notification service. Your phone
shows; their calendar reminds. That is what keeps it small and out of deliverability and TCPA.

## The QR code — measured, not assumed

- Level **H** error correction, the letterhead heart (`lmark`, 105×132 PNG) dead centre.
- Address `actsofgood.app/a/<10 chars>` gives **37×37 modules at 3.24px each** on a 146px poster.
- **17×17 of 37 decodes. 19×19 fails.** Published guidance says 20% of the area is safe; at this
  payload it is not. Decode with the mark composited in, not a blank square.
- A subdomain (`sheets.actsofgood.app`) would push it to 41×41 at 2.98px — measurably worse in
  print. Don't.
- Generate offline. `datalog/qrcode-svg`, MIT, zero deps, single SVG path.
- *Panel note: one tester said "Nobody needed the heart. Take the heart out." It is G's aesthetic
  call and the heart decodes at size — recorded, not proposed.*

## The poster

**The block below is the 6 September sketch and the shipped poster is RICHER than it** — it has a
heading over the code, a longer instruction, the address in plain text, an optional greeting,
tagline, signature, picture and a labelled details table, and `fitPlate()` measures the finished
plate and steps the whole thing down until it fits the paper. Read `posterPanel()` for the truth.
The rulings of 12 September are applied **in the code**: the ask at 18.8pt (+25%), the title at
17.3pt (+15%), *whatever you can bring* in place of *the one thing you can bring*, and
*Scan it again any time to edit.* added under it.

    WE COULD USE A HAND            (coral, small caps — RULED 12 Sep at +25% on
                                    the old size. The headline of the sheet.)
    ———                            (gold rule, 21.5px above and below — equal)
    FOR A FAMILY ARRIVING IN MARCH (bold, all caps, black — RULED 12 Sep at +15%
                                    on the old size, so it clears the paragraph
                                    beneath it without challenging the ask)

    A few of us are putting a box together to meet them. Four things are still
    missing, and any one of them would be a help.

    — New bedding, double
    — A set of pans
    — Pantry staples — rice, oil, tea
    — Someone with a van, Saturday morning

    Take whichever is easiest for you. That's the whole of it.

    [the code, heart in the middle]

    Point your camera. Choose what you can. No account, no app to install.
    Scan it again any time to edit.

    50 acts of good

Gold hairline plate inset 13px, as the letter and every journal page carry it.

**RULED 12 September 2026 (22B): the frame stays, at the inset as specified — 13px.** G kept the
frame and, shown three margins on real A4, chose the existing one. **The inset does not change.
Do not re-propose widening it.**

**But the risk it was drawn to answer is real, so it moves to the printing instead.** At this inset
the frame sits almost exactly on the line most home printers cannot cross — they hold back roughly
a quarter of an inch on all four sides, more at the bottom where the rollers grip — so a sheet sent
at full size, edge to edge, can print three sides of the frame and lose the fourth. A continuous
rectangle with a gap in it looks broken rather than close.

**So the printable poster must never be produced at full bleed.** Whatever generates it has to hand
the printer a page that already sits inside the printable area: normal page margins on the print,
or scale-to-fit, never borderless-at-full-size. Done that way the design is safe exactly as
specified and the whole question goes away — which is why the inset did not need to move. This is a
build requirement on the app side of the sheet, not a design change. Drawn at three margins for the
record in `reviews/POSTER-MARGIN.html`.

**A separate finding from that drawing, named and not built:** on a real A4 sheet the poster fills
about two thirds of the page and **the frame encloses an empty bottom third.** It was designed as a
card that flows to whatever height it needs and has never been laid out on the paper it prints on.
A frame around nothing reads as a page that ran out. Three ways out — centre the content in the
frame, grow the type to fill A4, or end the frame where the content ends — and it wants its own
drawing before anyone chooses.

**The two top lines — RULED 22A, 12 September 2026, at 25%.** They used to be the same size, so
neither was the headline and at walking distance you could not tell what the poster was about. G
asked whether 15% would do it; drawn and checked shrunk-and-blurred, **15% did almost nothing** —
at that distance the coral/black colour difference was doing all the work and a 1.5px size step was
noise. He moved it to **25%** himself, which is past the threshold: the ask is unmistakably the
headline both up close and at distance. Working page: `reviews/POSTER-TOP.html`.

G then ruled the black title up **15%** as well. I expected that to undo the hierarchy — it takes
the gap between the two lines from a quarter down to about a twelfth — and drawn and re-checked, it
does not. The ask still arrives first, because size was never the only thing carrying it: coral
against black, centred, wider tracking, and first on the page all point the same way.

**It also fixes a fault neither of us had named.** The black title used to sit at the same size as
the body paragraph directly beneath it — in fact slightly smaller. **A title smaller than its own
body copy is backwards**, and it is part of why the top of the sheet read as flat no matter what
the coral line did. Check this whenever the poster is re-set: the title must clear the lede.

*Consequence worth knowing: the size difference now carries the hierarchy on its own, so the gold
rule's equal spacing stops mattering. The "tuck the rule up under the ask" option is a refinement,
not a fix. **22B** — the gold frame off the printed sheet — is still open.*

**The first line under the code is RULED 12 September 2026**, replacing *"Point a camera at it.
Choose your one thing — no account, no app to install."* Three things changed and one of them
matters:

- *Point your camera* — second person, shorter, and it is the instruction, not a description.
- **"Choose what you can" replaces "choose your one thing", and that is a promise change, not a
  rewording.** The old line was deliberately singular: it made the ask feel tiny, which is most of
  why people say yes at all. The new one lets a person take two or three. Nothing in the app ever
  stopped them; the poster simply never said so. G was told this before ruling and ruled it in —
  **do not quietly revert it to the singular.** It also answers the tester who counted that every
  row on the sheet cost money: *what you can* acknowledges capacity without ever mentioning it.
- *No account, no app to install* is now its own sentence rather than a trailing clause.

**The second line under the code is RULED 18·5, 12 September 2026, and it is G's, against my
recommendation** — I argued the poster already reads as too finished and this is a fourth line of
small print. He ruled it in. It earns its place: scanning the code again already recognises the
person and offers them the way out, and until this line existed nothing anywhere told them so. The
paper is now the mechanism as well as the advertisement.

*Note for whoever sets this: rulings 18·5 and 22 touch the same object. If 22A or 22B is ever
ruled — the two top lines stop competing, or the gold frame comes off the printed sheet — this line
is part of what has to still fit. Do not quietly drop it to make the layout work; take it back to G.*

**Check this against Jessica's real act-22 flyer before it ships.** Hers went on 28 doors and
worked. It is the only field test this design will get before a stranger's wall.

**The panel read this poster as finished rather than asking** — see "What the panel found" above,
and items 22 and 23 in `DECISIONS-OPEN.md`.

## What the app side still needs — CORRECTED 12 September 2026

**This section said NOT BUILT. It was wrong, in the same way Part Two was wrong about the notes
panel.** Read before believing any list in this file. Verified in the source of build 4K, every
one of these already exists in `index.html`:

- ~~"Ask for help with this" → type the needs, pick the date~~ — `askStart`, `askInput`, `askKey`
- ~~Generate the id and the poster on the phone~~ — `sheetId`, `sheetToken`, `askPoster`,
  `posterPanel`
- ~~Publish with one `PUT`, carrying the key~~ — `askPublish`, against `AOG_BASE`
- ~~Draw the QR offline~~ — `askQR`, with qrcode-generator inlined, no network
- ~~The printable poster~~ — built, and it carries an "or just call or text" line
- ~~Read claims back~~ — `askRefresh` polls `/a/:id.json` with the key; `drawClaims` lists each
  claimer with an Email or Message link

**So the sheet is end-to-end already, and "no network calls" ended some time ago.**

### All three of these were BUILT as build 4L, 12 September 2026

1. **Free a row from the app — done.** Every taken row in the claims list carries a quiet
   **Free it**. It asks once (*"Put it back on the list?"* / Leave it / Put it back), then posts to
   the Worker's release route proved by the sheet's own key, and the row opens again for the next
   person. Nothing is sent and nobody is named. **This is the organiser's half of the panel's
   unanimous finding** — most people who cannot come will text you rather than open the page.
2. **Ruling 18·3 — done.** The Email and Message links are no longer bare. Both open prefilled:
   *Hi {name} — thank you for taking {thing}.* then **four blank lines left deliberately empty,
   because where and when are the organiser's words**, then *If anything changes you can hand it
   back here, no explaining needed:* and the sheet address. The text link uses `?&body=`, which is
   the spelling both iOS and Android accept.
3. **The poster's ruled sizes and copy — done.** Measured in the rendered plate afterwards: the ask
   at 25.07px against the title's 23.07px, where both used to be 20px.

*Named and not built, because nobody asked: the sign-up builder's own hint still says "Return twice
to stop", which is correct for that list (it has no circles) but now differs from the notes panel's
hint. Two list editors, two behaviours, two hints.*

Blocked behind rulings, and building them now would mean building them twice: **20** (quantities
changes the row model), **21** (what the page shows before somebody commits), **23** (the example).
**19** is independent and small.
- **The message you send them must carry the sheet link — RULED 18·3, 12 September 2026.** When
  the app writes the message telling a claimer where and when, **the link to the sheet rides along
  in it.** This is not a nicety: a claimer has no app, no account and no bookmark, so without it
  the way out of a claim is unreachable for anyone who cannot walk past the poster again. Putting
  it in the message is the only route that reaches **everybody** who took a row, rather than only
  the calendar-keepers or only the neighbours. Do not build the messaging step without it.
  *Open when that is built: the actual wording of the message.*

Roughly 25–35KB against a 1.05MB file. **This ends "no network calls."** The app stays offline-first
— you can write an act on a plane — but publishing and reading claims need the network. That is a
real change to the app's character and G accepted it knowingly.

## Still open on the sheet

- ~~**Letting a claimer cancel.**~~ **RULED 18A AND BUILT, 12 September 2026 — not open.** See
  "Handing a thing back" below.
- ~~**Quantities per slot**~~ — **RULED 20A AND BUILT, 12 September 2026.** A need can want more
  than one pair of hands. See "How many a need wants" below.
- ~~**The sheet that has finished**~~ — **RULED 19B AND BUILT, 12 September 2026.** Note the
  premise was wrong as written: a finished sheet never returned a blank browser error, it returned
  the styled *Nothing here* page. I had read a fetch failure as a blank page and wrote it down.
  What 19B added is the good news — *Nine people brought one thing each, and that was all it
  needed* — derived, never typed, and no name on it.
- ~~**The page never said when or where**~~ — **RULED 21A AND BUILT, 12 September 2026.** The page
  now shows what the poster shows, minus the drop-off address. See "What the page says, and what
  stays on paper" below.
- **Verification.** A typed name and email are not accountability; anyone can type anything.
  Only a confirmation link makes an address real, and that means sending mail — which costs an
  email service and breaks "the app never sends anything". G has not ruled.

---

# PART TWO — THE NOTES PANEL (ruled, and built as 4K)

## What 4K actually changed — and the drift that hid it

**The panel was already in the app.** `drawNotes`, `noteTap`, `noteKey`, `noteSave`, the `.ntx`
fields, the coral dot on a name the app knows, the "keep these notes in the journal" tick — all of
it shipped some time after 6 September, and this brief went on saying "nothing built" until
12 September. The whole B-with-1 discussion was therefore about **changing live code**, not writing
new code, and nobody realised until the file was opened. *Read the source before trusting any
"not built" line in this document.*

What shipped was **option A: checklist only.** Every row carried a circle; Return on an empty line
deleted the row and dropped you out of the field entirely. There was no way to write a paragraph.

**Build 4K makes it the note that was ruled.** Five changes, all in `index.html`:

1. A row can now be **plain** — `p:1` on the row object. Absent means circled, so every note anyone
   had already written stays exactly as it was.
2. **Return on an empty circled line takes the circle off** and leaves the caret there, instead of
   deleting the row and blurring. Return on an empty *plain* line still ends the note and drops the
   keyboard, which keeps the old way out of the field.
3. Return from a line with text in it **makes the next line the same kind** as the one it came from.
4. **Backspace at the start of a circled line takes the circle off and does not merge.** Only a
   plain line merges into the one above.
5. The **ghost circle**: on a plain line the circle is hidden rather than removed, so the gutter and
   the text column never move, and it fades in — dashed, coral — on the line you are standing on.
   Tapping it joins the list again.

**Both halves, verified by a real save and reload**, not by reading: `notes` was already passed
through whole on both the write and the read, so the new flag rode along for nothing. Driven in a
headless browser at phone size — two names, Return on the empty one, two paragraphs typed, the
ghost circle tapped, Backspace at the start, then a reload: four rows back, two of them plain, zero
page errors.

**Copy changed, under working-rule §2** — the hint line under the list had to stop describing the
old behaviour:

- was: *Return for the next one. Return twice to stop.*
- now: *Return for the next one. Return on an empty one to write in sentences.*

Reversible; say the word.

**Still not built, and named rather than done:** the hold-a-line menu (add to your people / invite
them / put it on the sign-up sheet / leave it as words), and the coral mark on a line that has gone
onto a public sheet. Both are described below and neither was asked for.

## Why

Jessica is doing this **right now**, in Apple Notes, for her postcard party on **8 October**. Her
note holds a checklist of nine names — Ginger, Betsy, Laura, Laura, Tiffani, Nan, Leisel, Jenny,
Eva — then her own invitation draft, then the ask. The app can't hold any of it, so she went
elsewhere. That is the whole case.

Two things it revealed:

1. **She tracks people, not things.** The sign-up sheet tracks what's needed. Her live problem is
   who did I ask and who came back. Different lists.
2. **She asked for money.** *"In no way required to attend, but if you'd like to donate $5 towards
   the cost of the postage, it would be much appreciated."*

---

## RULED 12 September 2026 — **B with 1**: it is a note, not a checklist

G's question that forced it: *"is it just a checklist function, or can one write just notes?"*
As the brief stood, the answer was **no** — every line carried a circle, so the only thing the
panel could hold was something to tick. **Her own note is two-thirds prose.** A panel that holds
only the names sends her back to Apple Notes for the invitation and the ask, which is the exact
problem it was drawn to solve.

**The ruling, in five parts:**

1. **One field, mixed freely.** Circled lines and plain lines live in the same note, in any order,
   as many times as she likes. Not a checklist with a notes box bolted under it — that would decide
   for her that the list comes first and the words come after, and leave "Buy stamps" nowhere to go.
2. **Return on an empty circled line lands on a plain line.** The brief already specified that this
   *ends the list*; it never said what you land in. Now it does: the circle comes off, the caret
   stays put, and you carry on in sentences.
3. **The way back is the ghost circle.** Stand on any plain line and a faint dashed circle appears
   in the margin **of that line only**. Tap it and the line joins a list. No toolbar, no mode
   button, and the rule as written — *you tap the circle* — stays literally true: the circle is
   always there, just unlit until you are on the line.
4. **Backspace at the start of a circled line takes the circle off. It does not merge.** Only a
   plain line merges into the one above. One deliberate step out of the list, so a name is never
   accidentally glued onto the line before it.
5. **The text column never moves.** Apple Notes shifts a line right when it becomes a checklist
   item. This does not. The gutter is always present, holding a circle, a ghost circle, or nothing,
   so a line changing kind never makes the page jump under your thumb. This matters more here than
   in Notes **because he dictates rather than watches the screen.**

**Rejected, with the reason — the typed trigger.** Every notes app turns `- ` or `[] ` at the start
of a line into a list item. Not here: **speech does not reliably produce a leading dash or
bracket**, so it is a door only a typist can open, in a panel whose entire architecture was chosen
because the user speaks. Do not re-propose it as "just a convenience".

**A working prototype exists**, published 12 Sep 2026 — the real mechanic, seeded with her actual
postcard-party note: `claude.ai/code/artifact/f7f22793-4cc3-46ac-8ec6-902a60b5dad1`, saved as
`reviews/NOTES-PANEL-working.html`. Whoever builds this into `index.html` should use it as the
spec; its script is ~90 lines and already handles Return-splits-at-caret, Return-on-empty,
Backspace-at-0, autogrow, arrow navigation between fields, and pointerdown on the circle. The
options that lost are at `claude.ai/code/artifact/9d5899aa-60c4-4969-990f-540a2a200d76`, saved as
`reviews/NOTES-PANEL-three-shapes.html`.

---

## The design

**One list per act. It behaves exactly like Apple Notes** — except for the no-shift rule above.

- **No mode button.** No "tick a line" toolbar. You tap the circle.
- **Return makes the next line. Return on an empty line ends the list** and leaves you on a plain
  line to keep writing.
- Return is **not** state-aware — it always inserts a new unchecked line of the same kind.
- Checked text does **not** strike through. Apple doesn't, and it reads as punishment.
- The list takes anything: names, things to buy, calls to make — **and paragraphs.**
- **Private. Never printed, never on a card or a poster.** In the journal only if you tick a box,
  off by default.
- The notes survive into the finished act.

**A ticked circle has no meaning the app assigns.** Not "asked", not "confirmed". It is a circle in
a note and the meaning is hers. Two states was considered and rejected as too much.

## Stitching — one list, three doors

This is the important architectural call, and it came out of the research.

**Do not build relations.** The strongest simple apps don't link objects at all — Things is the
clearest: one record appears wherever it is relevant, as a function of its own state. Notion, which
links everything, is the one people describe as heavy. *The Notion Relations Trap* is worth reading
before anyone proposes a linked-record model here.

**Notice, never convert.** Hold a line and the app offers:

    "Tiffani"
    + Add her to your people
    ✉ Invite her to this act
    ○ Put it on the sign-up sheet
    × Leave it as words          ← always present, always the default

Obsidian calls this **unlinked mentions** — the app spots what a line could be and offers rather
than deciding. Linking that happens behind the user's back is the thing people cannot predict or
undo.

A name the app already knows gets a small **coral dot**. Names it doesn't know stay plain words.

*Note: "make it a checklist line" was considered for this menu and **not** chosen — a hold is too
deep a gesture for something done constantly, and this menu is for occasional decisions. The ghost
circle carries it instead.*

**Public is marked on the line.** Any line that has gone onto the sign-up sheet says so, in coral,
on the line. The documented way small apps hurt people is a private page quietly exposing a child
page — a private note sitting beside a public sheet is exactly that shape, so the mark is a safety
model, not decoration.

**The invitation sits beside the notes and works with them.** Neither replaces the other.

## How to build it — the constraint that decides the architecture

**Separate one-line `<textarea>` elements. NOT one contenteditable box.**

iOS dictation fires the full text once, then **re-fires the same text word by word 100–500ms
later**, with no composition events, with the DOM already updated. There is no reliable way to
detect it. In a contenteditable, a re-render during input **permanently desyncs** the editor from
the DOM and later text lands in the wrong place. **G dictates everything.** This is the deciding
constraint, not a preference.

Separate fields give you: native undo per field, no selection restoration, `selectionStart` as a
stable integer caret model, working `enterkeyhint`, and dictation landing in a plain value you can
diff. You hand-roll Return (split at `selectionStart`, focus the new field, caret to 0),
Backspace-at-0 (merge up), and autogrow.

**Never re-render or move selection during an input event.** Read the DOM, update state, write back
on blur or debounced. In the prototype the `input` handler does exactly three things — store the
value, grow the field, stop. Every re-render is triggered by Return, Backspace or a circle tap,
never by typing or dictation.

**Do not use an editor library.** Editor.js's checklist tool is deprecated. Quill, ProseMirror,
Lexical, Tiptap and Milkdown all solve rich-text problems this doesn't have, want React, and none
of them give Return-on-empty-ends-list for free. Hand-roll it.

**The circle:** 21px inside a 34px hit area. It must be a **sibling** of the field, not inside it,
and `preventDefault()` on `pointerdown` — not `click` — so tapping it never moves the caret or
drops the keyboard. The ghost circle sits in the same slot and is shown with `:focus-within` on the
row, which needs no JavaScript at all.

## Settled

- **Money may be asked for, gracefully.** Sometimes it is expensive and you have to break even.
  Her own words are the model. The old blanket rule that invitations never mention money is
  **softened** — it must never read as a price, and never as required.
- One circle, no label.
- **It holds prose as well as ticks** — ruled 12 Sep 2026, above.

---

# WHAT TO BUILD FIRST

G's own forcing function: **Jessica's postcard party is 8 October.** Both pieces would serve it.

Recommended order:

1. ~~**The notes panel.**~~ **DONE — build 4K, 12 September 2026.** It holds prose as well as
   ticks. What remains of it is the hold-a-line menu and the public-line mark, neither asked for.
2. **The app side of the sign-up sheet.** Two testers said no at six weeks for this reason alone.
   Wait for G's rulings on items 18–23 first; item 18 changes what the app has to read back.
3. **THE-WORDS.md** — eleven decisions on the finish, the halfway note and the closing card. These
   finish the *year*, which is the actual product, and they have been waiting.

Nothing else should be added until something ships. The 6 Sep session added sheets, posters, codes,
a domain, a splash page and a notes panel, and `index.html` did not change once.

---

# OPEN, AND G'S TO RULE

- **DECISIONS-OPEN.md** — twenty-three now. Items **18–23** are the sign-up sheet, from the panel.
  **All six — 18 through 23 — are ruled and built, and nothing from the panel is open.** 23 went
  23A and then 23B-as-A on 12 September: the example became act 22, and the free row became a
  standing ghost line rather than a nudge. Options drawn at `reviews/FREE-ROW.html`.
- **THE-WORDS.md** — eleven, unanswered. `3E·1 4A·1 5A 6 all 9A yes yes strip 7 later` clears them.
- **THE-IDEAS.md** — 89 ideas to rewrite over the top of.
- **X** — `HANDLE_KEYS` includes it, `PLATS` excludes it. One or the other, not both.
- **Post-page copy overlap** — `#cm-how` duplicates the coral paste line.
- **The free/no-planning gap** in the library. Measured: about 13 of 89 acts cost nothing. Thinner
  than it should be, not the desert `act-library.md` describes. *One tester made this concrete: on
  a sheet where every row costs money, she has nothing to give but her hands.*

# KNOWN DOC DRIFT — DO NOT TRUST BLINDLY

- `claude/handoff.md` in the project describes **build 1A**. The pushed build as of 12 Sep is **4J**.
- `panel-full-review.md` says "Nothing fixed yet; G to rule." **Every item is implemented** —
  verified in source.
- `pipeline-review.md` says the post-evaluation popup "was G's explicit choice… do not
  relitigate." That was written when the build had no popups anywhere; 16B was then ruled as a
  popup on 9 Sep and `sheet-bkup` exists.
- `decisions.md` #10 still poses the traveling category as open. It was **declined 30 August**.
- `aesthetic-decisions.html` shows two share chips; `posting.md` ships four.

Surface these. Never resolve them silently.

---

# THE APP'S OWN ADDRESS — NOT DONE

`index.html` is still served from `gahensley1.github.io/acts-of-good-preview/`. It should move to
**`app.actsofgood.app`**, still on GitHub Pages, which keeps the `aog-push` → `git push` workflow
untouched.

1. Cloudflare DNS: `CNAME`, name `app`, target `gahensley1.github.io`, **DNS only** (grey cloud)
2. In `aog-push`: a `CNAME` file containing `app.actsofgood.app`, committed and pushed
3. GitHub → Settings → Pages → Custom domain → Enforce HTTPS

**Export the journal first.** `localStorage` and IndexedDB are per-origin, so the app at the new
address opens **empty**. Also add a `www` CNAME — `www.actsofgood.app` currently dead-ends.

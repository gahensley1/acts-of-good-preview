# Sheets and Notes — build brief

**For a fresh session. Read this, then `HANDOFF.md`, then the `acts-of-good` skill.**
Written 6 September 2026. Everything here was decided or built in one session with G.

Two pieces of work, one shipped and one drawn:

1. **The sign-up sheet.** Backend is **live in production** on `actsofgood.app`. The app side
   is not built at all.
2. **The notes panel.** Designed and drawn, nothing built.

`index.html` has **not been touched**. It is still build **1W**.

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

## The poster

    WE COULD USE A HAND            (coral, small caps)
    ———                            (gold rule, 21.5px above and below — equal)
    FOR A FAMILY ARRIVING IN MARCH (bold, all caps, black, same size as the line above)

    A few of us are putting a box together to meet them. Four things are still
    missing, and any one of them would be a help.

    — New bedding, double
    — A set of pans
    — Pantry staples — rice, oil, tea
    — Someone with a van, Saturday morning

    Take whichever is easiest for you. That's the whole of it.

    [the code, heart in the middle]

    Point a camera at it. Choose your one thing — no account, no app to install.

    50 acts of good

Gold hairline plate inset 13px, as the letter and every journal page carry it.

## What the app side still needs (NOT BUILT)

In `index.html`, on an act in the works:

- **"Ask for help with this"** → type the needs, pick the date
- Generate the id and the poster **on the phone**, before publishing
- Publish with one `PUT`, carrying the key
- Draw the QR offline
- The printable poster
- Read claims back: poll `/a/:id.json` when the act is opened, show name and contact, free a row

Roughly 25–35KB against a 1.05MB file. **This ends "no network calls."** The app stays offline-first
— you can write an act on a plane — but publishing and reading claims need the network. That is a
real change to the app's character and G accepted it knowingly.

## Still open on the sheet

- **Quantities per slot** — "six dozen cookies, two dozen taken". Half the village-size acts want it.
- **Letting a claimer cancel** — if someone can't back out gracefully, they don't back out, they
  just don't turn up. Cheapest version: the page remembers on their phone that the row is theirs.
- **Verification.** A typed name and email are not accountability; anyone can type anything.
  Only a confirmation link makes an address real, and that means sending mail — which costs an
  email service and breaks "the app never sends anything". G has not ruled.

---

# PART TWO — THE NOTES PANEL (drawn, not built)

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

## The design

**One list per act. It behaves exactly like Apple Notes.**

- **No mode button.** No "tick a line" toolbar. You tap the circle.
- **Return makes the next line. Return on an empty line ends the list.** That last one is the
  behaviour that makes Notes feel like nothing at all, and it is the one everybody forgets.
- Return is **not** state-aware — it always inserts a new unchecked line.
- Checked text does **not** strike through. Apple doesn't, and it reads as punishment.
- The list takes anything: names, things to buy, calls to make.
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

**Do not use an editor library.** Editor.js's checklist tool is deprecated. Quill, ProseMirror,
Lexical, Tiptap and Milkdown all solve rich-text problems this doesn't have, want React, and none
of them give Return-on-empty-ends-list for free. Hand-roll it.

**The circle:** 21px inside a 34px hit area. It must be a **sibling** of the field, not inside it,
and `preventDefault()` on `pointerdown` — not `click` — so tapping it never moves the caret or
drops the keyboard.

**Never re-render or move selection during an input event.** Read the DOM, update state, write back
on blur or debounced.

## Settled

- **Money may be asked for, gracefully.** Sometimes it is expensive and you have to break even.
  Her own words are the model. The old blanket rule that invitations never mention money is
  **softened** — it must never read as a price, and never as required.
- One circle, no label.

---

# WHAT TO BUILD FIRST

G's own forcing function: **Jessica's postcard party is 8 October.** Both pieces would serve it.

Recommended order:

1. **The notes panel.** She is using Apple Notes for it today. Needs no domain, no printing, no
   strangers, no network.
2. **The app side of the sign-up sheet.**
3. **THE-WORDS.md** — eleven decisions on the finish, the halfway note and the closing card. These
   finish the *year*, which is the actual product, and they have been waiting.

Nothing else should be added until something ships. This session added sheets, posters, codes, a
domain, a splash page and a notes panel, and `index.html` did not change once.

---

# OPEN, AND G'S TO RULE

- **THE-WORDS.md** — eleven, unanswered. `3E·1 4A·1 5A 6 all 9A yes yes strip 7 later` clears them.
- **THE-IDEAS.md** — 89 ideas to rewrite over the top of.
- **DECISIONS-OPEN.md** — seventeen.
- **X** — `HANDLE_KEYS` includes it, `PLATS` excludes it. One or the other, not both.
- **Post-page copy overlap** — `#cm-how` duplicates the coral paste line.
- **The free/no-planning gap** in the library. Measured: about 13 of 89 acts cost nothing. Thinner
  than it should be, not the desert `act-library.md` describes.

# KNOWN DOC DRIFT — DO NOT TRUST BLINDLY

- `claude/handoff.md` in the project describes **build 1A**. The live build is **1W**.
- `panel-full-review.md` says "Nothing fixed yet; G to rule." **Every item is implemented** —
  verified in source.
- `pipeline-review.md` says the post-evaluation popup "was G's explicit choice… do not
  relitigate." The build has **no popups anywhere**.
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

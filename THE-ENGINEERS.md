# THE ENGINEERS — standing notebook

**This file is the engineers' memory.** It is written to be READ FIRST by whoever picks up
50 Acts of Good, and WRITTEN TO at the end of every session that learns something durable.
It compounds. Nothing in it should ever be deleted to make it shorter — condense, never drop.

**G's ruling, 12 September 2026:** *"I want the engineers to keep their memory. I want them to
take everything they've learned and get smarter from us. All the sites they've seen, everything
that they know, this is a compounding exercise. They'll learn more as we go. These are our lead
engineers from now on."*

**The engineers are equal with the tester panel. G decides.** (Ruling, 12 Sep.)

**How the memory actually works, plainly:** the engineers are summoned fresh each session and do
not remember on their own. THIS FILE is what remembers. Read it before researching anything —
most questions below are already answered, and several are answered *"do not search for this
again, here is why."*

---

## THE STANDING SEATS

Four seats, established 12 September 2026. Each has a permanent brief.

1. **Market & competition** — who else builds this, what they charge, what their users complain about.
2. **Platform & integration** — what the phone, the browser and other companies' APIs will and will not permit.
3. **Product & the long arc** — journalling, memory, the ending of a year, what makes someone come back.
4. **Code & architecture** — what will break, what is fragile, what must not be touched.

---

# PART A — WHAT WE KNOW (the compounding part)

## A1. Permanent facts. Do not research these again.

These are settled. Re-open only if a named source says the world changed.

**Instagram / posting**
- **No API, URL scheme, intent or share payload can pre-fill an Instagram FEED caption.** True since
  ~2015. The native iOS feed path has no caption parameter either. This is not a policy we can
  appeal — no mechanism exists. Stories has no caption field at all.
- **Instagram's feed accepts ONE image at a time from outside the app.**
- **A web page cannot write named native pasteboard types**, so the Instagram Stories door
  (`instagram-stories://`) is permanently closed to a PWA regardless of Meta's policy. Reaching it
  means shipping native iOS and Android apps.
- **Instagram never appears in a share sheet for a text-only payload** — its share extension
  declares image/video types only.
- **Safari does not implement Web Share Target** (receiving shares). Open since 2019, still
  unimplemented May 2026.
- **Instagram Basic Display API died 4 December 2024.** Every remaining Instagram API is
  professional-accounts-only.

**Browser storage**
- **Storage eviction is all-or-nothing per origin.** The whole dataset goes at once, by design.
- **`localStorage` is ~5MB and throws on overflow. Photos cannot live there.** IndexedDB only.
- **iOS has no widgets, no app-icon shortcuts, no background sync for web apps.** Architectural.
- The oft-repeated **"50MB iOS PWA limit" is OBSOLETE** — quota is a percentage of disk since
  Safari 17. Guides published in 2026 still repeat the old number. Ignore them.

**The market**
- **No sign-up-sheet product in existence makes a sheet without a network connection.** Ours does.
- **No sign-up-sheet product auto-deletes contact details on a schedule.** Ours does.
- **No sign-up-sheet product outputs a finished printed poster.** Ours does.
- **The consumer "doing good" app category is commercially dead.** Deed — the best-funded entrant —
  was acquired by Bonterra in March 2026 and folded into corporate CSR software. The four apps
  left have a combined rating count in the low hundreds. We are not competing with kindness
  apps; we are competing with journalling apps and habit apps, which is where the craft is.
- **Research backing our design (Lyubomirsky, Sheldon & Schkade 2005, via Berkeley's Greater Good):**
  five acts of kindness a week raised happiness ONLY when performed in a single day, because
  "many acts of kindness are small, so spreading them out might make them harder to remember and
  savor" — and "variety is key: there's a risk that kindness can start to feel routine."
  Deliberate, written-up, savoured acts plus an 89-idea library against repetition. **We built the
  protocol without knowing it existed. Cite this, not a blog.**

## A2. Facts with an expiry date. Re-check before quoting.

| Fact | Verified | Re-check |
|---|---|---|
| Meta App ID mandatory for Stories sharing (since Jan 2023) | 12 Sep 2026 | yearly; likelier to tighten |
| Content Publishing API: professional accounts, app review, public HTTPS image host, JPEG only, 100 posts/24h, token ~60 days | 12 Sep 2026 | yearly |
| Meta API version v25.0 | 12 Sep 2026 | **quarterly — never hard-code** |
| iOS "Allow Paste" per-app override at Settings → Apps → Instagram → Paste from Other Apps | 12 Sep 2026 | **the path already moved once — re-verify each September** |
| Safari evicts script storage after 7+ days with no interaction | 12 Sep 2026 | yearly |
| WebKit exempts origins with an active page OR persistent storage, granted on heuristics "like whether the website is opened as a Home Screen Web App" | 12 Sep 2026 | yearly — **load-bearing for our whole storage story** |
| Instagram opened in-app scheduling to all public accounts, ~25/day, 75 days ahead, no Stories | Mar 2026, **secondary sources only** | verify against Meta |
| SignUpGenius $11.99 / $29.99 / $59.99 per month | 12 Sep 2026, Capterra | **conflicts with another source saying $8.99+** |
| Meal Train donation fee 7.9% + $0.30 | 12 Sep 2026, vendor | before quoting |
| Day One $49.99 / $74.99 per year; book $19.99 for 50 colour pages at 5.5×8.5in, iOS only | 12 Sep 2026, vendor | **tier names changed Mar 2026; unstable** |
| Doodle paused its iOS and Android apps 1 July 2026 | secondary | worth confirming — it is our best external validation of no-install |
| Buffer free = 3 channels / 10 queued; Essentials ~$6 per channel per month | Aug 2026, affiliate source | **fast** |

## A3. Dead ends. Do not repeat these searches.

- **Reddit is unreachable with our search tool.** Every Reddit-targeted query returns Wikipedia
  articles about Reddit. Go to App Store reviews, Trustpilot and Capterra instead.
- **Stack Overflow could not be reached directly** in three attempts. This is a real hole — it is
  where the current answer on share-sheet behaviour most likely lives. Needs a manual search.
- **Looking for a well-made kindness app.** Five differently-phrased searches, same four thin
  results. Do not repeat for at least six months.
- **Current Timehop analysis** — nothing of substance since ~2017.
- **A quantified study of year-end-recap design** — does not exist. Everything is vendor marketing
  or listicle. Spotify Wrapped journalism is the best available.
- **What happens to people at the END of a 50-act challenge** — no literature at all. Our ideas for
  the ending are reasoned, not evidenced. Say so.
- **signupgenius.com/pricing, caringbridge.org, punchbowl.com/pricing** — all return nothing usable
  to a fetch (JS-rendered, metadata-only, or 404).
- **Almost every top search result in this category is written by a competitor.** Zelos,
  SignUpReady, Grasshopper, SignupKit, Mixily, InviteDrop. Treat category research as adversarial.
  Corollary: this is a wide-open marketing channel and nobody in it has a story as good as an
  offline poster and a thirty-day wipe.

## A4. Things rated LIKELY, not confirmed. Never quote these as fact.

- "Sending text alongside files removes Instagram from the iOS share sheet" — rests on a 2018 bug
  report and an undated Apple forum thread. **No 2024–26 evidence found.** Mechanism plausible.
- "Android multi-image share offers Story only, never Feed" — one author, 2021, undocumented by
  Meta, but matches observed Google Photos behaviour.
- "Nobody else tracks who you did acts *with*" — absence of evidence across ~20 product pages.
- Every price sourced from an aggregator rather than the vendor.
- Whether persistent storage actually survives nine days untouched on a real iPhone. **This is the
  highest-value unknown in the whole project and can only be settled by testing on a device.**

---

# PART B — THE CODEBASE (from the code seat)

## B1. Map of `index.html` (~10,100 lines, 1.16MB)

| Lines | What |
|---|---|
| 1–33 | head. `theme-color` at 20 is read by iOS at launch — order-sensitive |
| 34–39 | fonts, ~143KB base64 WOFF2, inlined so no third party sees a request |
| 40–1144 | **all application CSS.** `:root` tokens at 41–58 |
| 1146–2143 | body markup — every screen is in the DOM at once |
| 2144–10095 | the entire application script |

**Script regions, the ones that matter:**

- **2162–2500 — persistence. The most important 340 lines in the file.**
  `idb` 2180 · `fullPhoto` 2294 · `serialise` 2316 · `save` 2342 · `load` 2403
- 2501–2743 — export/import: `exportJournal` 2506 · `importJournal` 2660
- 2741–2843 — escaping and the photo lifecycle: `currentPhotoIds` 2776 · `heldPhotoIds` 2816
- **2844–2856 — `const S`, the whole application state**
- 3155 — 47KB single line: the ideas library
- 3517–3995 — the canvas celebration engine
- 4211–4280 — `beginAnotherYear` 4237
- 4786–4954 — date picker. **`longDate` defined at BOTH 4790 and 4810**
- 5236–5361 — `drawJournal`; past years at 5335–5360
- 5535 — 20KB single line: the QR library
- 5537–6321 — sign-up sheet, app side: `askPublish` 5975 · `claimSweep` 6035 · `posterPanel` 6199
- 6322–6462 — the printed book: `printJournal` 6380
- 6862–7176 — plans. **See L4 — this region is half-live**
- 7309–7443 — photos: `takeFiles` 7353 · `sweepOrphans` 7429
- 7777–8004 — `saveAct` 7884
- 8083–8480 — card and caption: `buildCaption` 8171
- **8481–8830 — posting/share/clipboard: `prepack` 8532 · `handOff` 8607**
- 8904–9278 — canvas rendering of the card: `renderCard` 9152
- 9956–10028 — the boot

**The seams that matter:** persistence is defined before `S` exists (both only run after full
evaluation) · `serialise`/`load` are the ONLY sanctioned crossing between memory and disk ·
`currentPhotoIds`/`heldPhotoIds` must agree with `sweepOrphans` or photos die · `AOG_BASE` 5545 is
the only network boundary · `prepack`/`handOff` is the gesture boundary.

## B2. THE INVARIANTS — unwritten rules that break silently

1. **BOTH HALVES.** Any persisted field must be named in `serialise()` AND `load()`. Has shipped
   broken three times.
2. **A photo is `{id,url,off?}` in memory and a bare string id on disk.** `serialise` must slim;
   only `load` may rehydrate.
3. **Every collection holding photos must appear in `currentPhotoIds()` or `heldPhotoIds()`,
   or `sweepOrphans()` deletes its blobs.** There is no other registry. Adding one without touching
   these two is silently destructive on the NEXT launch, not this one.
4. **Every rehydration loop that skips a missing blob must set `LOAD_MISSED = true`** — it gates
   the sweep. `fatPlans()` does not comply.
5. **IndexedDB writes are paired**: `id` is the print-size image, `THUMB(id)` the 420px copy.
   `fullPhoto()` infers "legacy single-size" from the absence of the thumb.
6. **No reactive layer.** `save()` must be called explicitly. Inside the work editor, `workKeep()`
   must come first or the edit never reaches `S.works`.
7. **`_storageOK === false` makes `save()` a silent no-op**, and the flag never clears in a session.
8. **Nothing may call `heldPhotoIds()` or `load()` at module-evaluation time** — they reference
   consts declared thousands of lines later. Safe only because the boot runs last.
9. **`a.no` is a string, `slotOf(a)` is a number.** Explicit coercion at every crossing.
10. **(Worker) One slots row holds exactly one name.** Quantities are N rows sharing a `grp`, never
    a count column. This is what keeps the lock, the release and the retention wipe unchanged.
11. **(Worker) `pos` is the identity of a claim** — the row, the calendar link and the release key
    are all keyed on it. It must be stable for the life of a sheet.
12. **(Worker) GET never writes.** Mail clients and Slack fetch links before a human sees them.
13. **(Worker) Every new column needs a try/catch fallback ladder** so the Worker can be deployed
    before its migration runs. Deploy order is deliberately not something anyone must get right.
14. **Nothing a human typed ever reaches innerHTML unescaped.** Four escaping functions plus a
    script-context escape. The Worker's claim-success path builds DOM with `textContent`
    specifically so slot text can never be markup. Keep it that way.
15. **`packKey()` must name everything the card draws from**, or editing a field ships the stale
    cached image.
16. **Nothing global is read after an await** in the share path, or the wrong destination's file ships.

## B3. LANDMINES — the obvious change is the wrong one

- **L1** `longDate` is defined twice (4790, 4810) in one scope. The second wins. Renaming either
  changes behaviour. **This is the same class of bug as the `askFree` collision found on 12 Sep —
  check that a function name is free before using it.**
- **L2** `load()` exists in both files with different jobs. Cross-file grep misleads.
- **L4** **`S.plans` is always `{}` after boot** — `load()` migrates plans into `S.works` on EVERY
  launch under a comment claiming "one-way, once". But `saveAct()` still CREATES plans for
  future-dated acts. ~300 lines read a collection that is empty at all times. **This code is not
  dead, it is half-live. Deleting it breaks logging a future-dated act.** Resolve the model first.
- **L5** `S.newPhotos` is not declared in `S` — undefined until `newAct()` runs, guarded in seven
  places and unguarded in one.
- **L6** `--coral` is the artwork colour, `--coralink` the text colour. Different on purpose;
  unifying them fails contrast.
- **L7** The QR heart is MEASURED: 17×17 of 37 modules decodes, 19×19 does not. **Do not make the
  heart bigger.**
- **L8** `AOG_BASE` is baked into every QR code already printed. Changing the domain invalidates
  posters on walls, and the Worker's allowed-origins list must change first or the app reports
  "no connection".
- **L9** **The Worker's sheet-page markup is an API.** The hand-it-back script reads specific
  attributes off the list items. Restyling them breaks the feature with no error.
- **L13** `wipe()` is intentionally unreachable and is the ONLY code that clears the app. Do not
  delete it as dead code.
- **L15** Three known, deliberate imperfections (a length-comparison shortcut and two modulo
  biases) are irrelevant at the lengths used. **Every future reviewer will "find" them. They are
  not bugs.**
- **L16** `navigator.share` and the clipboard write must happen in the same task as the tap.
  `prepack` exists solely to satisfy this. **The clipboard write is now the first line of the
  posting hand-off and must stay there.**
- **L17** The chip glyph CSS is scoped to `.chip`. Any other button reusing one of the app's drawn
  marks needs its own size and stroke rule, or the drawing comes out invisible — which it did on
  the first attempt at the Open Instagram button.
- **L18** `instagram://camera` opens the app from a web page. If Instagram is not installed it does
  **nothing at all, silently** — no error, no page. It can therefore never be the only route to
  anywhere, and any screen offering it must also work for somebody who does not have the app.

## B4. What is genuinely well done — do not "improve" these

- It never pretends to have saved. Distinguishes "your journal isn't saving" from "the photo
  didn't save" and refuses to let a picture stop the words.
- **It refuses to tidy up when uncertain**: if even one photo failed to load at startup, the
  orphan sweep does not run at all that launch. The most mature decision in the file.
- The startup rescue: on a read failure it re-reads raw, salvages the acts, says so plainly.
- Two people cannot claim the same thing — compare-and-swap in SQL, with the reasoning written down.
- Photos kept at two sizes, and the app knows which one it handed you.
- The comments. Nearly every guard records the bug it exists to prevent. This is what makes a
  10,000-line single file workable for someone who is not a developer.

---

# PART C — THE OPEN FINDINGS

Ranked. Nothing here is built. G rules.

## C1. CRITICAL — starting a second year destroys the first year's photographs
Three separate faults converge on one event. The finished year's photos are copied whole into the
small text store (likely blowing the quota outright); the orphan sweep does not know past years own
photos and deletes every full-size original on the next launch; and the book only ever prints the
current year. **The headline promise — at the end of the year it is a book — currently fails at the
exact moment the year ends.** About a day's work. **Do not press "Start a new goal" until fixed.**

## C2. ~~CONFIRMED — the caption is silently not copied~~ **BUILT 12 Sep 2026, build 4R**
`handOff()` has two paths. When the card is already prepared, the copy happens on the tap and
works. When it is not — several photos, or a slow phone — the function returns early WITHOUT
copying, prepares the card across several awaits, then re-enters itself programmatically. By then
the tap is spent, Safari refuses the clipboard write, the fallback also refuses, both are swallowed,
and **the clipboard is left holding whatever was there before.** The app then tells the user the
caption is copied.

**This is almost certainly the cause of G's complaint.** Instagram is the only destination whose
caption depends on the clipboard — every other platform gets the text through the share sheet — so
the fault is invisible everywhere else. The same bug exists a second time in the invite's
"copy card and note together", which also claims success falsely.

**FIXED in build 4R** — the copy is now the first statement of the function, above the early
return, on both paths. Verified by forcing the slow path and confirming the copy fires on the tap.
**The invitation screen's version of the same bug is NOT fixed** and is still open.
**New invariant:** nothing may be inserted above that copy which waits for anything.

## C3. "Update the sheet" does not update the sheet
The Worker's publish only ever ADDS rows. Changing wording does nothing, removing a need does
nothing, and changing a quantity can merge two needs into one. Only appending to the end works.
The sheet is on a wall and the organiser has no way of knowing it is out of step. Half a day.

## C4. The privacy promise on the sign-up page is not being kept
The page tells every stranger their details are deleted thirty days after the day. The Worker does
that. But the app downloads names, numbers and messages and keeps them on the phone forever, and
they go into the backup file. And the thirty-day wipe only runs for sheets that have a date — an
undated sheet keeps everyone's number indefinitely, and the free-text message field is never wiped
at all. Not a leak; a gap between what is written and what happens. Hours.

## C5. The master key travels inside the backup file
The key that can read every claimant's name and number on every sheet ever made is written into
the export, which the user is encouraged to put in cloud storage. An hour.

## C6. Anyone can fill the server with junk sheets
Nothing caps how many items a sheet can have or how long each line can be. One request can ask for
millions of rows. Free to fix now, expensive to discover later. Under an hour.

## C7. The device-only storage risk — the most serious thing in the product
Safari deletes an origin's entire data after seven days without interaction. When it goes, it all
goes, with no warning and no partial state. A user loses a year of their own writing and their own
photographs of people they helped. Installing to the home screen and requesting persistent storage
materially reduces the risk and does not eliminate it.
**The answer that needs no accounts:** one button, one file, through the share sheet — the user
chooses Files, iCloud Drive, an email to themselves. We never see it. Offer it at the moment an act
is finished, when the thing feels precious, not as a chore in a settings screen.
**Diarium is the existence proof** that no-account and safe-data can coexist: it syncs through the
user's OWN cloud storage and has no account at all.

## C8. Named risks nobody had raised
- **The people directory's vocabulary is a debt ledger.** "Who owes nothing", combined with a
  per-act cost tally attached to named recipients, can be read as receipts for generosity — a
  record of who is in your debt. The precise opposite of what the app is for, and one unfortunate
  label away from being visible. Needs a copy pass over every field name.
- **Nothing asks whether the people in a photo agreed to be posted.** The originator made that
  choice for herself, deliberately. A generalised app makes it the default path.
- **The post-data-loss screen is the cruellest in the app.** If storage is evicted, the app boots
  empty and shows the welcome letter again — to someone who has just lost a year and does not yet
  know it. There should be a "this looks like a fresh start — was it?" path leading to import.
- **There is no lock.** "On the device only" is a guarantee against us, not against whoever picks
  up an unlocked phone. The people directory is a more sensitive document than a diary, because
  its subjects did not consent to being in it.
- **"Nothing is sent anywhere" may not be literally true** now the sign-up sheet exists. Read the
  letter against the sheet's actual behaviour. A privacy claim that is 95% true is worse than one
  that is precise.

## C9. What the market does that we do not — ranked by value for effort
1. **Make the calendar entry do a reminder's job** — an alarm the evening before, the details in
   the notes, the link back, and the calendar offer made the main event rather than a footnote.
   Closes our single biggest gap against the entire market without sending anything, creating an
   account, or showing a name. **RISK: nobody has verified that an imported calendar file's alarm
   actually fires on iOS. Test before building.**
2. **Carry the details into the claim** — at five o'clock on the day the claimer has no poster, no
   app and no email. Everything they need must already be on their phone.
3. **Show the thing without the name** — "Lasagne, no nuts — in good hands". Five lasagnes is the
   failure everyone in this category actually has, and we have no defence against it.
4. **A recovery key** for a lost phone, which doubles as the co-organiser feature others charge for.
5. **Duplicate a sheet** — the most praised feature in the whole category.
6. **"A while ago"** — open the app and it gives you something instead of asking for something.
   The answer to returning without nagging. Needs a "not this one" mute, because acts are done
   with and for people, some of whom will have died by the time the act resurfaces.
7. **Kill the blank page** — the write-up should arrive half-written from what we already know.
8. **A print-ready book PDF.** Fifty acts is almost exactly fifty pages, and Day One prints at
   5.5×8.5in for $19.99. We do not need to be in the printing business — we need to hand someone
   a file they can walk into a shop with.
9. **Say "no subscription, no account" loudly.** The field costs $35–75 a year and its loudest
   complaints are surprise renewals. We are already what people say they want and nobody knows.

## C10. What NOT to do, and why
Taking money (identity checks, chargebacks, and a permanent reason for a stranger to wonder what
our angle is) · sending email or text ourselves (bounce dashboards, opt-in dances, and our server
becomes a machine any stranger can point at any phone number) · accounts for claimers (we lose the
neighbour who scanned a poster on a dog walk, who is our entire reason for existing) · names on the
public page · ads · an app to install (Doodle left the app stores; SignUpGenius's app sits at 1.3
stars) · wishlists and gift-card wallets · AI form generation (our input is a person typing what
they need; there is no friction to remove).

**The single most useful competitive fact in the study:** SignUpGenius scores **4.5 stars on
Trustpilot and 1.3 stars on the App Store.** The gap is ads and a crippled app. Both are things we
have already refused.

---

# PART D — WHAT MUST BE TESTED ON A REAL PHONE

Remote research cannot settle these. Each needs a human with a handset.

1. **Does Instagram appear in the share sheet at all?** If not, compare against sharing a single
   photo from the Photos app. If Instagram appears there and not in ours, our payload is the
   problem, not the phone.
2. **Copy something obvious first** (type "ZZZ TEST ZZZ" in Notes and copy it), then post an act
   and paste in Instagram. If "ZZZ TEST ZZZ" comes out, the caption never reached the clipboard —
   which confirms C2.
3. **On Android: does Instagram offer "Feed", or only "Story"?** Only Story confirms the
   multiple-images theory.
4. **Does an imported calendar file's alarm actually fire** on iOS and on Android? The whole
   reminder recommendation rests on this.
5. **Does an installed home-screen app actually get persistent storage, and does data survive nine
   days untouched?** The highest-value unknown in the project.
6. **How big is a finished year in bytes?** One line in a console converts every quota estimate
   into a fact.
7. **Does the book actually print?** `@page` plus off-screen measurement through Safari's print
   pipeline, at the resolution the book assumes. The book is the product's end state and nobody
   has ever verified it prints.

**Always record the phone model, the OS version and the Instagram version before testing.
Instagram's app version is the hidden variable in every share-sheet behaviour above.**

---

# PART E — COVERAGE. WHERE WE ARE SILENT, NOT CLEAN

The code review read closely: all of the Worker, the schema, and about a dozen regions of the app
including persistence, export/import, the sign-up sheet, photos, `saveAct`, and the whole posting
and clipboard path.

**It did NOT read, and therefore says nothing about:**
- **All ~1,100 lines of CSS.** No review of layout, print styles, safe areas, focus or
  reduced-motion has happened.
- **The body markup** — no audit of ARIA, tab order or form labelling.
- **`renderCard` and the canvas rendering of the card, invite and note** (~350 lines) — the app's
  signature artefact, entirely unexamined.
- The inlined QR library (provenance and licence unverified) · the ideas library content · the
  celebration engine · the occasions and suggestion date arithmetic · caption composition · the
  poster renderer · the people screen · the spends tally · the dialogs · navigation.
- **Nothing was executed.** All sizing figures are computed, not measured.

**Do not read this silence as approval.**

---

# PART F — HOUSEKEEPING

**When a session ends having learned something durable, write it here.** New permanent facts go in
A1. New expiring facts go in A2 with a date. New dead ends go in A3 so nobody repeats the search.
New invariants and landmines go in B2/B3 — those are the most valuable entries in the file, because
they are the things that cannot be rediscovered by reading.

**When a finding is built, move it out of PART C and into the build ledger in
`SHEETS-AND-NOTES.md` or `HANDOFF.md`, with the date and the ruling.** PART C is a list of things
that are still true and still open. It should get shorter as well as longer.

**Established 12 September 2026**, from four studies commissioned by G: the sign-up sheet against
the market, the Instagram hand-off, the journal against the best journalling and habit apps, and an
architecture review of the app and the Worker.

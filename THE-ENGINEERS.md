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

- **L19 THE WRITE TOOL CAN WRITE AN OLD FILE AND REPORT SUCCESS.** Confirmed three times now, and
  on 13 Sep it was not merely stale by minutes: a commit of build 4Z reported both paths written,
  updated the timestamp, and put **build 4Q on his disk** — a version from six hours and eight
  builds earlier, 24KB short. Had it not been read back, a push would have deleted the clipboard
  fix, the past-years rollover, Open Instagram, the phone layer, the reminder and the birthday fix,
  with a successful-looking log. **The size check alone was what caught it.**
  **The rule, now mandatory: after every write, list the folder and compare the byte count, then
  stage the file BACK and compare the build mark or the checksum. A write is not done until the
  bytes on his disk have been read.** Re-committing from a freshly named staged file fixed it,
  which suggests something caches by path — so give each build its own name in outputs and commit
  from that, never from a reused `index.html`.

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

## C1. ~~CRITICAL — starting a second year destroys the first year's photographs~~ **BUILT 12 Sep 2026, build 4T**
Three separate faults converge on one event. The finished year's photos are copied whole into the
small text store (likely blowing the quota outright); the orphan sweep does not know past years own
photos and deletes every full-size original on the next launch; and the book only ever prints the
current year. **The headline promise — at the end of the year it is a book — currently fails at the
exact moment the year ends.** **FIXED in build 4T**, on G's ruling: *"the journal should stay intact no matter what, and a
second session should build on the first."* Six changes: finished years are stored as photo ids
rather than inlined pictures; they are made back into pictures on load, with a missing blob
disabling the tidy-up for that launch; **the tidy-up now knows a finished year owns its
photographs**, which was the whole disaster in one omission; the backup streams finished years act
by act instead of through one giant string, and carries them at full size; restoring a backup brings
their pictures back; and the book prints every year, oldest first.

**Verified against a real rollover**, not by reading: twelve acts with photographs, rolled over,
reloaded, tidy-up run deliberately — all twelve full-size originals and all twelve thumbnails
survived, and the stored state stayed at ~2KB instead of blowing the quota. The exported file was
parsed back and confirmed to carry the finished year's photographs at full size, not thumbnails.

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
**The invitation screen's version is also FIXED, build 4T.** The words now go on the clipboard
first, synchronously, before anything is drawn — so the note is always there — and the rich version
with the card is attempted separately, handed over as a promise, which is the one shape Safari
accepts for work that has not finished. Nothing claims the card was included unless the write
actually resolved, and the fallback no longer says the words are copied as though it were news.
**New invariant:** nothing may be inserted above that copy which waits for anything.

## C3. ~~"Update the sheet" does not update the sheet~~ **BUILT 12 Sep 2026**
The Worker's publish only ever ADDS rows. Changing wording does nothing, removing a need does
nothing, and changing a quantity can merge two needs into one. Only appending to the end works.
**FIXED.** The rule that decided the shape: **a row somebody has claimed keeps its words.** They
said yes to those words, and the app must never change what a person promised. So claimed rows are
matched to needs rather than edited — only their grouping is corrected — and everything still wanted
is poured into the free rows, with the leftovers retired.

**The first attempt at this fix was wrong and testing caught it.** Rewriting by position lost a need
outright the moment somebody inserted one at the front of a list with a claim held: the claimed row
froze at the old position's words and the organiser's new need vanished. Positions are identity, not
order — see invariant 11. Matching by words fixed it.

**A claimed row whose need was deleted or reworded becomes an orphan**: kept, never deleted out from
under the person holding it, counted, and reported back so the app can tell the organiser what it
could not change. Six failure modes tested end to end against a real database.

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

## C11. DECLINED — do not re-propose

**The platform defaults on the setup step. RULED "leave it", 12 September 2026.**

The question: setup's step three asks *Where do you post?* and arrives with Instagram and Facebook
already ticked, so the app has effectively answered on behalf of somebody it has not met. Two
alternatives were drawn and put to G — **A**, arrive with nothing ticked; and **C**, ask nothing at
setup and put the question on the posting screen the first time somebody reaches it with an act in
hand.

**G: "we will not know what the user uses."** Then: **"leave it."**

His observation is the reason, and it cuts against the alternatives rather than for them: if the app
cannot know, then A only helps the person who engages with that step at all — and somebody who taps
Start or Skip without touching anything ends up seeing *more* chips under A (all three, via the
existing empty-state fallback) than under what ships today (two). The change would have improved the
engaged case and worsened the disengaged one, which is the wrong way round.

**What is already true and needs no change:** the hiding works — anything left unticked never appears
on the posting screen; the adding-back works — the same three rows sit on the You screen with their
handle fields; and ticking nothing shows all three rather than an empty screen, which is deliberate.

**Closed.** Drawn for the record at `reviews/WHERE-YOU-POST.html`.

## C12. RULED 12 September 2026 — **it ships as a real app in both stores**

G: *"it will be a store app so accommodate it."* Every decision from here assumes this. The full
study is `THE-STORE-APP.md` beside this file; the headlines, because they change the priority order
of everything above:

**The biggest risk is not the one anybody expected.** Apple treats a sheet where strangers type
their names and messages as **user-generated content**, which drags in four permanent obligations —
filter it, let people report it, be able to block people, and publish contact details for yourself —
and "egregious or repeated" failure is grounds for removing the whole developer account. **The
recommendation is that version one ships WITHOUT the sign-up sheet inside the app.** The sheet loses
nothing: the poster already points at the website. **G has not ruled on this.**

**Second biggest: rule 4.2, minimum functionality.** A wrapped website gets rejected, and a 2026
case had a reviewer say sharing alone is "not robust enough". The pattern that passes is two or
three genuine native capabilities plus review notes naming them in plain words. We are well placed:
reminders, photographs, offline and a lock are four things the product wants anyway.

**The best news in the whole study:** the market's single biggest gap against us — *no reminders of
any kind* — is answered by **local notifications**, which need no server, no account, no push
service, no fee and no privacy declaration. The phone schedules them and the phone shows them. It is
the most philosophically aligned feature available to this product and it is nearly free. It also
retires the untested gamble in C9 #1 about whether a calendar file's alarm fires.

**Instagram Stories opens.** A native app plus a Meta App ID, no Meta review. The card lands on the
Stories canvas and the person writes their own words on top — which makes the caption problem moot
rather than solving it. The Instagram **feed** caption stays permanently closed to everyone.

**Routine work stays instant.** Both stores explicitly permit shipping new HTML into an installed
app without a review, so wording, design, bug fixes and new ideas still go out the moment G pushes.
Only new native capabilities, icons, permissions and store text need a submission — perhaps twice a
year. **The store is an occasional event, not a release process.**

**But somebody technical must do the releases.** Building for iPhone needs a Mac with Xcode or a
paid cloud builder. There is no browser-only path to a first submission; the people claiming
otherwise are selling something.

**Nobody's data comes across** — a home-screen web app and a store app are two unrelated programs to
the phone, and there is no mechanism that lets one read the other. **CORRECTED SAME DAY: G — "no one
is using it. This is all testing."** So there is nobody to strand, and the migration problem that
looked like the top of the list is very nearly nothing. Build the way-across for the backup it is,
not for a rescue nobody needs. **Whoever picks this up later: check whether that is still true
before repeating the reassurance — it stops being true the day a real year starts.**

**THE CONSEQUENCE THAT MATTERS MORE, and it is a clock.** With no journals in the world, there is
nothing to keep compatible. Storage can be restructured, fields renamed, the whole persistence layer
moved to native — the most dangerous refactor in the codebase, which the study says to defer — at a
fraction of its eventual cost, because the only thing that can break is test data. **That freedom
ends permanently the moment somebody begins a real year, and it never comes back.** Anything
structural that is ever going to happen is cheapest today. That is the real deadline on this
project, and it is self-imposed rather than external.

Other things to do now, from the study: route anything assuming a fixed web address through one
setting; **put every phone-dependent behaviour — sharing, clipboard, saving, photographs, printing,
reminding — behind one switch each**, which is the difference between a wrapper project and a
rewrite; keep everything changeable in the HTML and only freeze icons and permissions natively;
make the birthday optional and declare the app not directed at under-13s; write an exact privacy
policy; and promise the website forever, because every QR poster on every wall points at it.

**Costs:** $99/year Apple, $25 once for Google, optional ~$12–14/month for live updates. Three to
six weeks elapsed for a first submission, and **budget for one rejection — it is normal.** Google
also requires **twelve testers opted in continuously for fourteen days** before a new personal
account can publish at all; start that early, in parallel.

## C13. THE FRAMING THAT SETTLES MOST STORE QUESTIONS — G, 13 September 2026

> *"We are building a carriage and a harness for people to post a journal. That's something they
> post, not us."*
> *"To me, it's like saying, is Photoshop responsible for what you write and create there when you
> post it."*

**He is right, and this should be the first thing anyone reaches for when a store rule looks
alarming.** The journal, the photographs, the card, the caption: made on the phone, kept on the
phone, posted by the person themselves through the phone's own share sheet. Nothing is transmitted
to us, nothing is hosted by us, nothing is shown by us to anybody. That is Photoshop's position
exactly, and nobody asks Adobe to moderate what people make in it.

**An error to learn from rather than repeat.** I told him the sign-up sheet made the app
user-generated content and listed four obligations. Then I read our own source: **the public sheet
page uses a claimer's name only to decide whether a row is taken, and prints "In good hands". The
message is never rendered publicly at all** — it reaches the organiser alone, through their own app,
behind their key. Nothing a stranger types is ever seen by another stranger. It is a form, not a
noticeboard.

Worse, I know why I believed otherwise: **the market study I commissioned that morning PROPOSED
showing the note publicly** (*"Lasagne, no nuts — in good hands"*, to stop five people bringing
lasagne). G never ruled it and it was never built. I then remembered my own proposal as though it
were the app. **Third time in one day this project was bitten by somebody trusting a document over
the source, and that time the document was mine.**

**Where the analogy genuinely stops, and it is narrow.** Photoshop does not host a public web page
for you. We do: the organiser publishes their sheet at an address anyone with the link can open. At
that moment we are not Photoshop, we are closer to a site builder — and nobody holds a site builder
responsible for what you write either, but a host does carry two small, ordinary duties: **be
reachable, and be able to take a page down.** That is an email address and a quiet report link. It
is not a moderation regime, and filtering and blocking do not apply, because there is nobody posting
to anybody.

**The rule of thumb for future sessions: ask whether we HOST it, not whether a user MADE it.**
Made-and-kept-on-the-phone is the carriage. Hosted-at-our-address is the narrow exception, and it
covers exactly one page in the whole product.

## C14. THE FOUR SEATS' TAKES — 13 September 2026, after the store ruling

Each seat, four points, asked for after everything above was built.

**Code & architecture** — (1) Nobody has ever finished a year in this app, and the first people to
do so will be strangers; the rollover is fixed **on paper** and someone must complete a real year on
a real phone with real photographs, reopen it, and print the book, before launch. (2) A phone can be
lost or replaced and everything lives on it — that is the right design, so **the backup stops being
a nicety and becomes the product**; consider making it impossible to reach act ten without having
made one. (3) The sheet's thirty-day promise must be true everywhere or the sentence must change —
do not ship the gap into a store that asks you to declare what you collect. (4) **Changed his mind:**
he defended having no tests; a store release means versions and review queues and a bug reaching
people you cannot ring. Not a test suite — **six named sequences walked by hand before every
release**, rollover and backup among them. *"The carriage is fine; it is the harness coming loose
that will hurt somebody."*

**Platform & integration** — (1) Going native changes his verdict on exactly one thing: **Instagram
Stories**, which needs only a Meta App ID and lands the card on the canvas with a tappable link. The
feed caption stays impossible for everyone. (2) The clipboard fault being real changes how he reads
the original complaint: *"he was not asking for the impossible, he was describing a bug."* **Do three
real posts on the phone and confirm** — if it works now, most of the frustration is already gone.
(3) The direct-open button is right, but it should say where it is about to take somebody, and must
never be the only route. (4) **The carriage framing is the safest decision anyone has made here** —
every route that removes the human (publishing from a server, scheduling on their behalf) is
available to a native app and would quietly make us the author of somebody else's good deed.

**Market & competition** — (1) The stores improve the position **because the reminder now lives on
the phone**: the whole category rents its core value from an email provider; we own it outright and
still work with no signal. **Drop the calendar-alarm recommendation** — obsolete before it was
built. (2) **The one thing the stores cost us is our best argument.** Doodle pulled its apps; the
market leader is 1.3 stars in the store and 4.5 on the web. Protect it by keeping the stranger's
side exactly as it is: **whoever scans a poster must never be asked to install anything**, and the
page should say so. (3) The editing work just shipped is a trust story nobody else in the category
can tell — say it out loud. (4) **Watch for the store pulling us toward accounts.** Sign in, sync,
restore, notify: the moment the organiser has an account, the thirty-day wipe and no-names-in-public
stop being architecture and become promises. Also: **"meal train" is a competitor's trademark, not
a common noun** — get a real opinion before any copy uses it.

**Product & the long arc** — (1) The stores solve his two worst findings at once, so he **withdraws
the export file as the highest-value next thing** — it is insurance rather than rescue now. But the
freedom lasts only until one real person starts a real year, so **every structural decision should
be settled before the first user**. (2) **The ending should be ruled now, not discovered in month
eleven**: the fiftieth act offers to close the year rather than firing a celebration; the book leads
with the people rather than the totals; and it must be available at thirty-seven acts as readily as
at fifty, **titled by what happened rather than what did not**. (3) **The debt-ledger wording in the
people directory** is the one open risk to fix before launch — "who owes nothing" is accounting
language beside named real people and what was spent on them, and it is what a stranger screenshots.
An afternoon of copy. (4) An app anyone can download is used by people who never read the letter:
**a lock over the directory, and one honest moment at the card step asking whether the people in the
photograph agreed.** *"If they post it, the app owes them that."*

## C15. THE BIRTHDAY — RULED AND FIXED, 13 September 2026

**It is the hook, and it is not optional.** G: *"it is its hook."* Jessica turned fifty and did
fifty acts; **the number and the age are the same number**, and that is the whole conceit. Asking
for it and handing back *fifty* is the moment the app knows something about the person. A proposal
to replace it with *"which year are you marking?"* was drawn and **declined** — that turns the
product into a goal tracker. A change that labelled the field **(optional)** in the same grey as the
email was **reverted the same hour**: it satisfied a store rule by quietly demoting the most
important question in setup.

**Apple's rule was already satisfied without the label.** Nothing checks an age, nothing gates on
it, *Skip this for now* clears it properly on first run, and the note says plainly what it is for.
That is a design purpose stated honestly, which is what the rule asks for.

**And pushing on it found a real bug.** G asked what the month was for. The answer: the app worked
out whether the birthday had already come round this year — and **threw the answer away**, both
branches of the decision returning the same number. So it was only ever *this year minus the birth
year*, and **anyone whose birthday had not yet happened was told the wrong one**. A December
birthday in September was handed *year fifty-three* while they were still fifty-two, on the word
that goes on their card.

**Jessica's April birthday hid it** — hers has always passed by the time anyone looks. Roughly half
of everybody else's has not. Fixed and verified against every month of a year.

**The lesson worth keeping:** a field that is collected, stored and displayed back can still be
doing nothing where it counts. *"What is this for?"* is a better question than it sounds, and it is
the one that found this.

---

## C16. BUILD 5A — THE DEFECT SWEEP, 13 September 2026

G: *"fix the defects."* Both reviews of build 4Z were acted on in one pass. **Fifteen real
defects and eight of the weaker findings.** 32 automated checks pass on a two-year journal
walked in headless Chromium, plus 13 on a fresh install; no console errors in either.

### From the code seat

| | What it was | What it is |
|---|---|---|
| **1** | The posted picture could disagree with the card on screen — the cache key named the goal but not the **hand tone** or the **year word**, so changing either redrew every card in the app while the one going to Instagram stayed the old one, silently and in public | `packKey` names everything the card draws from, including whether the act is act 0 or the closing card |
| **2** | The **declaration card** posted with "act 0 of 50" printed on it, and the **closing card** with "act of 50" — the screen knew better, the canvas did not | `renderCard` has the same three cases the screen has: no rule and no number for act 0, the creed for the closing card |
| **3** | **Printing the book after a poster** came out on the wrong paper — two `@page` style elements, `#booksize` and `#postersize`, alive at once and of equal weight, so whichever was created last won every print thereafter | One `#printsize` element, written and re-appended by whichever print is about to happen. `setPageSize()` |
| **4** | **Two preview panels ran a 60fps loop forever.** A closed panel has no width; both fitters asked for another frame until they got one | Bounded to 60 frames, and they stop at once if the panel is shut. **`fitPvScale` was also handed straight to `rAF`, so it received a timestamp — the retry counter has to be wrapped** |
| **5** | The **artwork race** — share straight after choosing a new skin tone and the card went out with no hand on it | `renderCard` waits up to 1.5s for the image, then draws whatever is there |
| **6** | **A long word ran off the card.** `wrapLines` only ever broke *between* words | Breaks by letter when one word is wider than the line |
| **7** | The **"this month" card** counted `S.acts.length`, the old way, so it could disagree with the number directly above it | `doneCount()` |
| **8** | The **weekly idea changed every seven weeks** — `IDEA_SEED` already counts in weeks and was being divided by seven again, while the comment beside it said weekly | `IDEA_SEED % pool.length` |
| **9** | The **month calendar reopened stale** — page back to March, close it, and it opened on March for the rest of the year | Opening it is a request for now |

### From the long-arc seat — the eleven

| | What it was | What it is |
|---|---|---|
| **1** | **The ending was a one-shot.** *Not now* spent the moment; the closing card and closing post could never be reached again | **"Read the ending again"** on Your year, beside Start a new goal |
| **2** | **Raising the goal after finishing killed the ending.** Set 25, finish, raise to 50 — act 50 arrived in silence. Same for halfway | `finShown`/`halfShown` store **the goal they fired at**, not a yes-or-no. A legacy `1` is read as the goal in the same file |
| **3** | **The rollover deleted the closing post** while carefully keeping act 0 | `fin` and `why` and `name` travel into the archive |
| **4** | **A finished year lost all its photographs from the journal.** Stored right, loaded right, printed right — and the page a person actually opens never drew them | Past-year pages draw photographs exactly as this year's do |
| **5** | **The rollover destroyed planned acts and their photos** while the confirmation promised nothing would be lost | `rollYear()` migrates plans into the works shelf, as boot does, and the confirmation says how many come along |
| **6** | **Year two forgot everyone.** The directory counted only the current year | `allActs()` spans every year. Where the lifetime count and this year differ, the row says both |
| **7** | **Every card in year two printed the wrong age** — the word is derived on the Setup screen and the rollover goes nowhere near it. And opening Setup rewrote the word on every card ever made, last year's included | `rollYear()` calls `syncReason()`; **`cardWords(a)`** reads a past act's own year record, so an archived year keeps its own goal and its own words |
| **8** | **The book mislabelled every act from a previous year** — a 25-act year read "act 1 of 50", no divider, one merged title page | Year by year, each with its own divider, its own reason page and its own goal. Closing page totals across years |
| **9** | **The backup reminder went silent for all of year two** — counted in acts, and the rollover sent the count backwards | The rollover carries across **how much is unsaved**, which is the only part that mattered |
| **10** | **A year that did not finish could never be ended** — no ending, no archive, no fresh start, "week 52 of 52" forever. The only escape anybody found was lowering the goal, which rewrites every card. **The commonest case by far** | `timeUp()`; the line becomes **"the year is up"**, and **"Close this year"** runs the same rollover with copy that does not call it a failure |
| **11** | **The backup file could come out as invalid text.** Four photo loops wrote their separating comma on the loop index rather than on having written anything, so one missing photo produced `"photos":[,{…}]` | A `wrotePh` flag in all four. **Tested with a photo that cannot be read: the file parses and the missing one is simply absent** |

### Weaker findings also cleared

- The month card's one piece of commentary was shown **only to the person who was behind**. An empty month is an empty month; it is said to everybody now, which makes it a description rather than a verdict. The pace arithmetic behind it has no reader left and is gone.
- **"Your year is full"** on the day somebody completed fifty acts of good now says every square is spoken for, and where to make room.
- **A lifetime total** — it existed nowhere in the app. The journal header now reads "75 acts of good · 12 of 50 this year".
- **"Started 30 weeks ago"** stops counting up past four months and says *started in March* instead.
- **Every archived year was called "the year before."** Named by the year it ended.
- **A past year's divider hardcoded "in year"**, so "this summer" was archived as "in year summer". It uses the year's own two words.
- **A past year had no opening page** — its `why` is carried and printed.
- **Contributions matched by substring**, so a "Jo" was credited with everything "Joanna" put in. Exact, trimmed, case-insensitive.

### New landmines this build

- **L20 `rAF` HANDS YOUR FUNCTION A TIMESTAMP.** `requestAnimationFrame(fn)` where `fn` takes a retry count reads roughly 12000 attempts already spent and gives up on the first frame. Wrap it: `requestAnimationFrame(()=>fn())`.
- **L21 A PANEL THAT IS SHUT HAS NO WIDTH.** Any measure-and-retry loop must test `offsetParent` and must be bounded. Two shipped without either.
- **L22 A SEPARATOR COMMA BELONGS TO WHAT WAS WRITTEN, NOT TO THE LOOP INDEX.** Any loop that can `continue` and also writes JSON by hand needs a flag. This shipped four times in one function.
- **L23 `finShown` AND `halfShown` ARE NOW GOALS, NOT FLAGS.** Anything comparing them to `true` is wrong. Both halves named; a legacy `1` is migrated on load.
- **L24 A PAST ACT IS THE OBJECT IN `S.past`, NOT A COPY.** `actYear()` matches by identity and depends on that. Anything that clones past acts into a new array breaks `cardWords`, and cards silently revert to the current year's words.

### Still open, deliberately

- **The people directory is still sorted by act count** — a league table of your friends, highest first, with no word about what any of them did with you. The seat is right that it reads as a ledger, but the sort order and what a row says are design, not defects. **For G.**
- **"See their acts" still filters this year only**, while the count spans every year. The row says both rather than quietly disagreeing; a past-year filter is a bigger change.
- **Past acts are still frozen shut** — no write-it-up, no change-anything, no envelope. The current year's journal promises "everything in it can still be changed" and that promise still expires at the rollover.
- **The rollover still does not ask what the next year should be.** Same number, same length, straight to the declaration.
- **Nothing still ever reaches out.** No notifications of any kind. This is the store build's whole reason and it is not written yet.

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

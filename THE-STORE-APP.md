# PLATFORM & INTEGRATION — REPORT TO G
## Shipping 50 Acts of Good as a real app in the App Store and Google Play
### 12 September 2026 · research and recommendation only, nothing was changed

---

## THE SHORT ANSWER

**Submitted as it stands — the 1.16MB page wrapped in a shell — it will be rejected.** Not "might be". Apple's rule 4.2 exists specifically to catch this, and from a reviewer's chair the app currently has no native behaviour at all. That part is fixable, and cheaply: two or three genuine native features plus honest review notes is the well-documented pattern that gets borderline apps through.

**But rule 4.2 is not your biggest problem. The sign-up sheet is.** The moment this becomes an app, strangers typing their names onto a public page becomes "user-generated content" in Apple's eyes, and four requirements land on you that nobody imposes on a website: filter what gets posted, provide a way to report it, be able to block people, and **publish contact details so users can reach you**. Those are permanent operational obligations, not a one-time form. My strongest recommendation in this report is that **version one ships without the sign-up sheet inside the app**, and the sheet stays exactly what it is today — a website you reach from a QR code. That single decision removes the largest rejection risk and the largest ongoing burden, and costs you nothing, because the poster points at the web anyway.

**The genuinely great news:** the thing the market study called your single biggest gap — no reminders of any kind — is solved by *local* notifications, which need no server, no account, no push service, no third party, and send nothing anywhere. The phone schedules them and the phone shows them. That is perfectly in keeping with everything this app promises. It is, by a distance, the best reason to do this at all.

**The unavoidable news:** somebody technical has to do the releases. Not "should" — must. Building for iPhone requires a Mac with Xcode, or a paid cloud build service with certificates loaded into it. There is no browser-only path to a first release. There *is* a browser-only path to every routine update afterwards, which I'll explain.

---

# 1. WHAT WOULD GET IT REJECTED
*Ranked by how likely it is to actually happen to you.*

## 1.1 — HIGHEST RISK: the sign-up sheet triggers the user-generated-content rule

Apple's Guideline 1.2, quoted exactly:

> "apps with user-generated content or social networking services must include: A method for filtering objectionable material from being posted to the app · A mechanism to report offensive content and timely responses to concerns · The ability to block abusive users from the service · Published contact information so users can easily reach you"

Your sheet lets any stranger with a phone type a first name, a contact detail and a free-text message onto a page that other strangers see. That is textbook user-generated content. Today nobody makes you police it. As an app, all four requirements apply, **"timely responses" is an obligation you personally take on**, and "published contact information" means a real, reachable address for you on a public page.

There is a second sting. Apple adds: *"It is your responsibility to remove content that violates this guideline... Egregious or repeated behavior is grounds for immediate removal of your app from the App Store, and from the Apple Developer Program."* One person writing something vile into a sheet message field, unhandled, is a threat to the whole account.

**Recommendation, strongly: leave the sheet out of the app binary for v1.** The organiser makes a sheet on the website; the poster sends claimers to the website. Nothing is lost — the sheet has never needed the app, that's its whole design. Revisit later if you want to, with the moderation machinery built and budgeted.
*Confidence: high that 1.2 applies. Medium-high that a reviewer would actually catch it on submission — but this is a rule that bites later, on a complaint, which is worse.*

## 1.2 — VERY HIGH RISK: Guideline 4.2, minimum functionality

Apple's words:

> "Your app should include features, content, and UI that elevate it beyond a repackaged website. If your app is not particularly useful, unique, or 'app-like,' it doesn't belong on the App Store."
> "4.2.2 — Other than catalogs, apps shouldn't primarily be marketing materials, advertisements, **web clippings**, content aggregators, or a collection of links."

What the real accounts look like in 2024–2026:

- A developer on Apple's own forums converted his web app to a **partly native** shell — native main screen, native menus, only two or three screens still in a web view — and was **rejected ten times in a row**. Apple sent a screenshot of his menu, said it "didn't have enough content", and when pressed for detail "just copied and pasted the 4.2 clauses". The advice he eventually got was to make it fully native.
- Another 2026 forum thread involves a Capacitor app rejected with reviewer feedback that *"the experience is not sufficiently differentiated from web browsing and that features such as Core Location or sharing alone are not robust enough."* **Sharing alone is explicitly called out as not enough.** That matters to you, because sharing is currently the only phone feature you touch.
- A commenter on that thread made a point worth more than any guideline: the developer had written his appeal in jargon the reviewer wouldn't recognise as features at all. **Describe what a person gets, not what you built.**

The working consensus across the vendor guides — and they all agree, which is itself informative — is that **two or three substantive native capabilities, plus reviewer notes that name them in plain language, is the pattern that gets borderline apps through.** One widely used checklist asks for three or more of: push or scheduled notifications, biometric lock, native navigation, offline function, camera or sensor access, a proper icon, and a description that names the native features.

**You are unusually well placed here.** The three things reviewers most want to see are three things this product genuinely wants anyway:
1. **Reminders** (scheduled notifications) — the market gap.
2. **Photographs** through the native picker and saving cards to the Photos library.
3. **Offline** — you are already completely offline. Say so loudly. It is a real native virtue and costs nothing to claim, because it's true.

Add a **biometric lock** (Face ID) and you have four, and you simultaneously close the "there is no lock" risk in the engineers' notebook — the people directory is the most sensitive document in the app and currently anyone holding the unlocked phone can read it.

**Blunt:** budget for one rejection round. It is normal. One source claims appeals against 4.2 fail around 85% of the time — treat that number as unverified vendor marketing, but the underlying lesson stands: **do not plan to argue your way through. Plan to resubmit with more.**
*Confidence: high on the rule and the pattern. Low on any specific statistic quoted by vendors.*

## 1.3 — HIGH RISK: the birthday, and the age rules, which have just changed hard

This is the fastest-moving area in the whole report and it moved *this year*.

**Apple's age ratings were overhauled.** Since 24 July 2025 the tiers are 4+, 9+, **13+, 16+, 18+**, with a new required questionnaire covering in-app controls, capabilities, medical or wellness topics, and violent themes. Every app had to answer by **31 January 2026** or be blocked from submitting updates. You will meet this questionnaire on day one.

**Apple's rule on asking for a birthday at all (5.1.4):**
> "Apps may ask for birthdate and parental contact information **only for the purpose of complying with these statutes**, but must include some useful functionality or entertainment value regardless of a person's age."

Read that carefully. You ask for a birthday for a *design* reason — it frames the year. That is not a compliance purpose. I do not think this gets you rejected on its own, but it is a question you may be asked, and the safe answer is architectural, not rhetorical: **make the birthday skippable, ask for it plainly as "so we can frame your year", and don't call it age verification.**

**The amended COPPA rule is now fully in force.** The FTC's amendments were finalised January 2025, published April 2025, and the compliance deadline was **22 April 2026** — passed. It brings a broader definition of personal information, new data retention limits, and separate parental consent for disclosures to third parties. If an under-13 uses your app and you hold their name, their friends' names, their photographs and their contact details, you are inside COPPA. The practical defence is that **nothing leaves the device** — and that defence is strong, but it evaporates the moment the sign-up sheet is in the binary and a child claims a row.

**Then there are the new state and national laws, which are the surprise.** Apple published on **24 February 2026**: from that date users in Australia, Brazil and Singapore are blocked from downloading 18+ apps unless confirmed adult. **Utah from 6 May 2026** and **Louisiana from 1 July 2026** require developers to implement Apple's **Declared Age Range API** to receive age categories, and to use a "Significant Update" mechanism where a child user's parent must approve material changes. Texas's App Store Accountability Act took effect **1 January 2026** after the Fifth Circuit stayed the injunction, and Google's own guidance says plainly: *"It is the developer's responsibility to decide what constitutes a significant change for their app"* and *"Google Play doesn't mandate the use of these features"* — meaning Google will hand you the signal and the legal exposure is yours.

**Recommendation:** declare the app **not directed to children**, rate it honestly (almost certainly 4+ on content), make the birthday optional, and do not go anywhere near the Kids Category — it forbids links out of the app and triggers a much heavier regime. On Google Play, declare target audience as adults, or if you want teens in it, "mixed audience" — which then requires a **neutral age screen** designed so as not to encourage children to lie about their age.
*Confidence: high on Apple's and Google's published rules and dates. Medium on how aggressively the state laws will be enforced against a tiny free app — but the cost of getting this wrong is regulatory, not commercial, and it does not scale down with your size.*

## 1.4 — MEDIUM RISK, EASY TO FIX: privacy labels and Data Safety

Here is the best news in the whole compliance section. Apple's definition, verbatim:

> **"'Collect' refers to transmitting data off the device** in a way that allows you and/or your third-party partners to access it for a period longer than what is necessary to service the transmitted request in real time."

**Data that stays on the device is not collected and does not have to be declared.** Your journal, your photographs, your people directory, your birthday, your spends tally — none of it is "collected". If the sign-up sheet stays out of the binary, you can legitimately declare **"Data Not Collected"** on the App Store, which produces the cleanest privacy label Apple offers. That is a genuine marketing asset in a category where everyone else's label is a wall of red.

Apple also says explicitly:
> "You're not responsible for disclosing all possible data that users may manually enter in the app through free-form fields... However, **if you ask a user to input a specific data type into a text field, such as their name or email**... then you'll need to disclose the specific type of data."

So: free-text journal entries, fine. But **the people directory asks for names, and the sheet asks claimers for a name and a contact detail** — both are named fields, and the sheet's travel off-device.

**If the sheet ships inside the app**, you must declare, at minimum: **Name** and **Email Address / Phone Number** under Contact Info, collected, linked or not linked to identity, used for App Functionality. And you'd be declaring data belonging to *third parties* — people who are not your user and never agreed to your privacy policy. Apple's 5.1.2(i) is unambiguous: *"you may not use, transmit, or share someone's personal data without first obtaining their permission."* Your sheet page does get their permission, by telling them plainly what happens. Keep that page's wording exact — and note the engineers' existing finding C4, that the promise on that page is **not currently being kept in full**: the app downloads those names and numbers and keeps them on the phone forever, undated sheets never wipe, and the message field is never wiped at all. **Fix that before a word of it goes into a privacy label.** A privacy declaration that contradicts your own behaviour is the kind of thing that gets accounts terminated, not apps rejected.

**Both stores require a privacy policy URL** — Apple in App Store Connect metadata *and* reachable inside the app; Google in the Data safety form. You need to write one. It must be precise, and per the engineers' own C8 note, "nothing is sent anywhere" is not literally true today.

## 1.5 — LOW RISK: account deletion

**You are exempt, and cleanly so.** Google's rule: *"If your app allows users to create an account from within your app... it must also allow users to request for their account to be deleted."* You allow no account creation. Apple's 5.1.1(v): *"If your app supports account creation, you must also offer account deletion within the app"* — and, helpfully, the same clause says *"If your app doesn't include significant account-based features, let people use it without a login."* You are the model citizen of that rule.

**The strangers on a sheet are a different question.** They have no account, so the account-deletion rules don't reach them. But GDPR and similar laws give them a right to erasure regardless of whether you call it an account. Your thirty-day wipe is a strong answer — *when it runs*. Undated sheets and the message field currently escape it. Fix before shipping.
*Confidence: high on the store rules. Medium on data-protection law, which I am not qualified to advise on and which varies by country.*

## 1.6 — The rest of the rulebook, briefly

- **2.1 App Completeness.** Reviewers get a real device and poke at it. If the sheet is in, **give them a live demo sheet with seeded content** in the review notes, or they'll see an empty screen and reject for incompleteness. If the sheet is out, make sure the app's first launch is not a blank page — seed it or make the welcome letter do real work.
- **2.3.1 Hidden features.** *"All new features... must be described with specificity in the Notes for Review (generic descriptions will be rejected)."* This is where you name your native features in plain English. It is free and it is the single highest-leverage thing you will write.
- **2.3.8 metadata.** You cannot use "for kids"/"for children" anywhere in the name, subtitle, icon, screenshots or description unless you're in the Kids Category.
- **4.2.3(i)** — *"Your app should work on its own without requiring installation of another app to function."* You're fine; sharing to Instagram is enhancement, not dependency. Make sure nothing *breaks* if Instagram isn't installed.
- **4.5.4 push notifications** — consent required, clear opt-out, and notifications may never be a condition of using the app. Also 5.1.2(i): *"Your app may not require users to enable system functionalities (e.g. push notifications...) in order to access functionality."* Your reminders must always be declinable with no loss.
- **EU trader status.** Since **17 February 2025**, apps without a declared trader status are removed from the EU App Store. The relief: Apple's own guidance says *"If you're a hobbyist and you developed your app with no intention of commercialising it, you may not be considered a trader."* You self-assess. **But if you ever were deemed a trader, an individual's address, phone number and email are published on the product page.** Keep it free, keep it non-commercial, and this stays off.
- **Guideline 1.2 requires "published contact information" regardless** — and Google publishes your developer email on your Play profile automatically. **Get an address and an email you're content to have in public before you register anything.**

## 1.7 — The gate nobody expects: Google's twelve testers

If you open a **new personal Google Play account**, you cannot publish at all until you have run a **closed test with at least 12 testers who stay opted in continuously for 14 days**. This applies to personal accounts created after 13 November 2023. It was 20 testers; it dropped to 12 in December 2024. Organisation accounts are exempt.

**That is twelve real people with Google accounts, found and kept for a fortnight, before anything reaches the store.** It is not hard, but it is a two-week wall you must start climbing early, and it should go in the timeline as a parallel track, not a step.
*Confidence: high — this is Google's own community guidance.*

---

# 2. WHAT BREAKS OR GETS HARDER

## 2.1 — Updates stop being instant. Mostly.

Real 2026 numbers: Apple typically **24–48 hours**, first submissions and major updates up to 72, and peak periods (September, December) running past three days. Google Play a few hours to three days, and **up to seven days for a new developer account's first review**. Apple's expedited review exists for genuine emergencies, is granted case-by-case, is never guaranteed, and **overusing it damages your standing** — treat it as a fire extinguisher, not a workflow. Google has no formal expedited path.

**But here is the reprieve, and it is large.** Apple's rules permit downloading interpreted code — JavaScript, HTML, CSS — that runs in the system web engine, provided it *"does not change the primary purpose of the app"*. Google's Device and Network Abuse policy says the equivalent: *"This restriction does not apply to code that runs in a virtual machine or an interpreter... (such as JavaScript in a webview)."*

**Translated: you can keep pushing new versions of `index.html` instantly, without a store, without a review, without a Mac, forever.** Wording changes, design changes, bug fixes, new ideas in the library — all instant. What needs a store review is only: new native capabilities, icons, permissions, store metadata, and anything that changes what the app fundamentally is.

That reframes the whole project. **The store submission is an occasional event, not a release process.** Perhaps twice a year.
*Confidence: high on both policies as currently written. This is a rule that has been stable for years, but it is Apple's to change.*

## 2.2 — Nobody's data comes across. Confirmed.

An installed home-screen web app and a store app are, to the phone, **two unrelated programs with two unrelated sets of data**. The store app's web content runs under a different origin inside the app's own private container. There is no mechanism by which one reads the other, and no setting that enables it. **This is certain.**

What a person actually experiences: she gets a notification that a new Acts of Good app is available. She installs it. She opens it. **It is empty. It shows her the welcome letter — the same one she read in January — and asks her to pick a birthday.** Her thirty-one acts, her photographs of the people she helped, her people directory: still there, in the old icon, which now looks identical and sits on another page of her home screen. She does not know that. She may well delete one of them.

The engineers' notebook already names this as "the cruellest screen in the app" — a data-loss screen shown to someone who doesn't yet know they've lost anything. **Shipping to a store converts that from a rare accident into the guaranteed first experience of every existing user.**

There is exactly one answer, and it already half exists: **the export file.** One tap in the old version writes a file; the new app's first screen offers "I've used Acts of Good before" and imports it. This must be built, tested on a real phone in both directions, and **shipped in the web version months before the app exists**, so people have a file by the time they need one. See §6.

## 2.3 — Storing things is *better* but not *solved*

Half-truth to avoid: "in a real app your data is safe." Capacitor's own documentation is blunt that web storage inside a native app must *"be considered transient, meaning your app needs to expect that the data will be lost eventually. This is because the OS will reclaim local storage from Web Views if a device is running low on space."*

It is materially better than Safari — the seven-day-without-interaction eviction is a Safari behaviour, and Apple's own statement is that a home-screen web app has its own counter and *"we do not expect the first-party in such a web application to have its website data deleted."* An app's container is more durable still. But "more durable" is not "safe", and the only genuinely safe answer is to move the journal out of web storage and into native storage (the phone's own preferences store, or a real database file). **That means rewriting the single most dangerous region of the codebase** — the 340 lines the engineers call the most important in the file, with the both-halves invariant and the photo-orphan sweep hanging off it.

**My recommendation: do not do that for v1.** Ship on web storage, gain the durability of the app container for free, and keep pushing the export file as the real answer — which it already is, and which works today, and which a person can put in iCloud Drive where no eviction policy can touch it.

## 2.4 — Everything else that needs rethinking

- **The sign-up sheet's connection will fail on day one** unless the Worker's allowed-origins list is updated first. In the store build, the app's origin is not `actsofgood.app` — it's a local scheme inside the app. The engineers' landmine L8 already notes the Worker must change before the app does, or the app reports "no connection". (Moot if the sheet stays out of v1.)
- **The QR posters are unaffected and must stay that way.** They point at the website. **The website must live forever, unchanged in address.** You now maintain two things, not one.
- **Printing the book goes through a different engine.** The print path has never been verified even in Safari (the engineers' Part D, item 7). Now it must work in a second engine too. Test both.
- **The share and clipboard gesture rules still apply** — the code must still act in the same instant as the tap — but native plugins actually make this *easier*, not harder. The confirmed caption bug (C2) should be fixed in the web version regardless; it is not a wrapper problem.
- **Two builds to keep honest forever.** Every change must be considered against both. This is real ongoing cost.

---

# 3. WHAT IT UNLOCKS
*Ranked by value to this product specifically.*

### 1. Reminders — and they need no server, no account, and send nothing anywhere. ★ the reason to do this
The market study found no reminders of any kind is your single biggest gap against every competitor. **Local notifications are the answer and they are almost free.** The phone schedules them; the phone shows them; nothing leaves the device; there is no push service, no certificate, no monthly fee, no third party, and nothing to declare in a privacy label. They work in flight mode.

This is the single most philosophically aligned feature available to you. "The evening before you said you'd take Margaret her shopping" — delivered by her own phone, from a note she wrote herself, with nobody in between.

It also does the second job of satisfying rule 4.2 as a genuine native capability.

One practical limit: iOS is widely understood to hold roughly **64 pending scheduled notifications** at once. For you that is plenty — but schedule a rolling window rather than the whole year, and re-top it up each time the app opens.
*Confidence: high that local notifications work and need no server. Medium on the exact 64 figure — it is documented for the old interface and consistently observed for the current one, but I could not find Apple stating it plainly for the modern API.*

**This also relieves the untested calendar-alarm gamble.** The engineers' C9 recommendation #1 rests on an unverified assumption that an imported calendar file's alarm actually fires. A local notification does not depend on that at all.

### 2. Instagram Stories — the door that has been shut since the beginning ★★
Confirmed against Meta's current documentation. It requires a native app and a Meta App ID:
- iOS: the `instagram-stories://share?source_application=[AppID]` scheme, the scheme declared in the app's configuration, and the image written to named pasteboard slots as a background asset, a sticker asset, or both.
- Android: an intent with the action `com.instagram.share.ADD_TO_STORY`.
- Since January 2023 the Meta App ID is mandatory; without it the user gets an error.
- Minimum 720×1280, 9:16, JPG or PNG.
- **Crucially: no Meta app review is required for this.** Unlike the publishing API, which demands a professional account, review, a public image host and a token that expires — Stories sharing is just a registered App ID.

**What it delivers:** the card lands directly on the Stories canvas as the background. The person adds their own words on top, in their own hand, which is better than any caption you could pre-fill. **It makes the caption-copying problem moot rather than solving it.** And there is no caption field in Stories for anyone, so you are not at a disadvantage to any other app.

**What it does not deliver:** the Instagram *feed* caption. That is permanently closed to everyone — no mechanism exists, native or otherwise. Do not let anyone tell you a native app fixes that.

### 3. Photos and Files, properly ★★
Native pickers, and two things that are awkward or impossible today:
- **"Save this card to my photos"** — one tap, no share sheet dance.
- **"Save my journal to Files / iCloud Drive"** — which is the backup story, the answer to the most serious risk in the product, made into one tap instead of a chore. Do this.

### 4. A lock ★
Face ID or the phone's passcode on opening. The people directory holds names of friends and family, notes about them, and photographs of them — subjects who never consented to being in a list. "On the device only" currently protects them from *you* and from nobody else. This is cheap, it closes a named risk, and it counts as a native feature for rule 4.2.

### 5. Receiving a share ★
Safari has never implemented receiving shares — open since 2019, still unimplemented. A native app can be a destination in the phone's own share sheet: photograph something, share it *into* Acts of Good, and the write-up starts half-written. That is a direct answer to the "kill the blank page" finding.

### 6. Home-screen widgets — real, but not for version one
"Three done, forty-seven to go" on the home screen is a lovely idea and I understand the pull. Be clear on the cost: a widget is a **separate program inside your app**, built as its own target in Apple's development software, written in Apple's own interface language. Bridging tools exist and reduce the work, but every honest account says you still create the extension target and still write native interface code. **This is the first thing in the whole plan that genuinely cannot be done from the HTML.** Defer it. Revisit once a release has shipped twice without incident.

### 7. The softer ones
Being findable at all. An icon that is an app rather than a bookmark. A store page that says *no account, no subscription, nothing sent anywhere* to people actively searching — which, per the market study, is exactly what this field's customers complain they can't find. Reviews and a rating, which is both an asset and a permanent public record of your bugs.

---

# 4. HOW IT WOULD ACTUALLY BE BUILT

## The honest headline
**Somebody technical has to do the first release, and every release that changes the native part.** There is no browser-only path to a first submission. I have looked hard; the people claiming otherwise are selling something.

**But the routine can be made browser-only**, and that is the settlement I'd recommend you aim for:

| | Who | How often |
|---|---|---|
| Set up the wrapper, sign it, first submission to both stores | Someone technical, with a Mac or a paid cloud service | Once |
| New wording, new design, bug fixes, new ideas — the actual work | **You, exactly as today** — push the HTML, it appears | Continuously |
| New native capability, new permission, new icon, store text | Someone technical | Perhaps twice a year |

## Capacitor is the right tool
It is the current standard for exactly this job, it is free and open source, and it takes an existing folder of HTML unchanged. What it demands, from its own documentation as of Capacitor 8:

- **Node 22 or higher** — a command-line runtime, installed on a computer.
- **For Android:** Android Studio 2025.2.1 or newer. Large, free, runs on Windows.
- **For iPhone: macOS with Xcode 26.0 or newer.** Their words: *"To build iOS apps, you will need macOS."* There is no exception and no workaround on your own machine.

## Can you avoid the Mac?
Yes — by renting one. Cloud build services run the Mac for you and hand back a finished app:

| Service | Status (2026) | Notes |
|---|---|---|
| **Codemagic** | Active | Handles signing certificates in the cloud |
| **Bitrise** | Active | Same; more configuration |
| **Capawesome Cloud** | Active | Built specifically for Capacitor; bundles live updates |
| **Ionic Appflow** | **Sunsetting** — no new sales, existing customers until **31 Dec 2027** | Was the obvious answer; no longer is |
| **Microsoft App Center** | **Dead** — retired 31 March 2025 | — |

All of them still require a code repository, a configuration file, and your signing certificates uploaded. **None of them is a website with a button.** They remove the Mac; they do not remove the technician.

## What I'd tell you *not* to do
- **PWABuilder's iPhone output.** It generates a project you still need a Mac and Xcode to build, its own blog says *"PWABuilder doesn't guarantee that your app will be accepted"*, and the consistent independent read is that its iPhone output typically fails rule 4.2 because it is precisely the bare wrapper the rule exists to catch. It is not a shortcut. It is the long way to a rejection.
- **MobiLoud at $1,499/month** (or $1,274 annually), plus a one-time build fee, plus $50 per additional 1,000 users beyond 10,000. They are excellent at what they do and they do it for online shops with revenue. For a free, non-commercial app this is not a serious proposal.
- **Median's full-service tier from $7,200.** They will publish it for you with "acceptance guaranteed", which is a real thing to want. Their free self-serve tier gives you the build tools but not the submission. Worth a look only if you have no technical person at all and would rather pay once than find one.

## Live updates (how the browser-only routine actually works)
Once the shell exists, a live-update service ships new HTML into the installed app without any store. Current options and prices: **Capgo** from $12–14/month for up to 2,000 monthly users (14-day trial, no permanent free tier); **Capawesome Cloud** and **OtaKit** compete on the same ground. Both stores permit this explicitly, within the limits in §2.1.

**Verify before committing:** vendor prices in this niche change fast and the three vendors write most of the comparison articles about each other. Treat all of them as adversarial sources, exactly as the engineers' notebook says of the sign-up-sheet category.

---

# 5. REAL COSTS AND TIMELINE

## Money, per year
| | Cost | Notes |
|---|---|---|
| Apple Developer Program | **$99/year** | Recurring. No way round it. |
| Google Play Console | **$25 one-time** | Plus identity verification |
| Live-update service | **$0–$170/year** | Optional but recommended; ~$12–14/month entry tier |
| Mac, if buying | One-off, several hundred | Or use a cloud build service instead |
| Cloud build, if renting | Varies; free tiers exist on some | Verify current terms |
| Domain, Worker | **Unchanged** | Already paid |

**On the nonprofit fee waiver: you do not qualify.** Apple waives the $99 for nonprofits, accredited schools and government bodies, but the eligibility rules say in terms that you must *"not be an individual, sole proprietor, or single-person business."* A waiver would require registering an actual charitable legal entity, which is a much bigger decision than an app.

## Time
**First submission, done by a competent technical person working part-time: three to six weeks elapsed.** Of that, maybe five to ten working days of real work, and the rest waiting.

The critical path:
1. **Day 1** — open both developer accounts. Google's identity verification and Apple's enrolment both take days, not minutes, and the Play account's first review can take up to seven days.
2. **Day 1 also** — start recruiting twelve Play testers. **This is the long pole.** Fourteen continuous days, and the clock only starts when they're all opted in.
3. Week 1–2 — wrapper, icon, splash, notifications, photo picker, lock. Test on real hardware.
4. Week 2 — export/import migration path tested both ways on real phones.
5. Week 3 — store listings, screenshots, privacy policy, privacy labels, the age questionnaire, Data Safety form, review notes.
6. Week 3–4 — submit. **Expect one rejection.** Fix, resubmit: another 1–3 days each round.

**Add two weeks if the sign-up sheet is inside the app**, for the moderation and reporting machinery that Guideline 1.2 requires.

---

# 6. WHAT SHOULD CHANGE TODAY
*Before any wrapper exists. Ranked. Every one of these is worth doing even if the app never ships.*

### 1. Make "move my journal" a first-class path, and ship it now
The export and import already exist. They need to become: one obvious button that writes a named file and hands it to the share sheet; and, on the welcome screen, **"I've used Acts of Good before"** leading straight to import. Ship it in the web version **months** before the app exists, so that by the time anyone needs a file they already have one.

This is the highest-value item on this entire list. It is the migration story, it is the answer to the storage-eviction risk, it is the fix for the cruellest screen in the app, and it is the one thing that makes the store move survivable for the people already using it.

### 2. Decide the sign-up sheet's future — and my recommendation is: keep it out of v1
One sentence in the plan removes the largest rejection risk, the largest ongoing obligation (moderating strangers' text, "timely responses"), and the entire privacy-label complication that stands between you and a clean **"Data Not Collected"** badge. The sheet loses nothing: the poster already points at the web.

If you overrule me and keep it in, then **before submission** you need: a report button, a block mechanism, filtering, published contact details, a demo sheet for reviewers, and the C4 privacy gaps closed so the page's promise is actually kept.

### 3. Stop assuming the app is a website at a fixed address
Anywhere the code assumes it is running at `actsofgood.app`, route it through one setting. The Worker's list of permitted origins needs to be ready to accept the app's own origin **before** the app exists — the engineers' landmine L8 already says the deploy order matters and that the app reports "no connection" if you get it backwards.

### 4. Put every phone-dependent behaviour behind a single switch
Sharing, the clipboard, saving a file, taking a photograph, printing, and (new) reminding. Today each is written once, for one engine. Wrap each in one small place so a native version can be dropped in later without touching the ten thousand lines around it. **This is the difference between a wrapper project and a rewrite.** Do it now, while it's tidying; do it later and it's surgery.

### 5. Fix C1 and C2 before anyone can leave a review
- **C1 — starting a second year destroys the first year's photographs.** In a store, that is a one-star review, in public, permanently, attached to the exact promise the product is built on. A day's work. Today the bug is private. In a store it is a record.
- **C2 — the caption is silently not copied and the app says it was.** Fix it in the web version now; it is not a wrapper problem and the store build inherits it.

### 6. Write the privacy policy, and make it exact
Both stores demand a URL. It must match what the software does. Per the engineers' own note, "nothing is sent anywhere" is not literally true now the sheet exists — and **a privacy claim that is 95% true is worse than one that is precise.** Fix the words on the website first, where you can change them instantly. Once they're in a store listing, changing them is a submission.

### 7. Settle the age question and make the birthday optional
Decide now that the app is not directed at under-13s, say so in the listing, ask for the birthday plainly as a framing device rather than a gate, let people skip it, and store the least you can get away with. This costs almost nothing today and saves you from a bad conversation with a reviewer or a regulator later.

### 8. From today, build nothing that needs a review to change
Every choice about where something lives — in the HTML or in the app's native configuration — is a choice about whether you can change it yourself. **Keep everything you might want to change in the HTML.** Colours, wording, the ideas library, the card design, the letter: all of it stays where you can reach it. Icons, permissions and capabilities go native and get frozen between releases.

### 9. Promise the website forever
Every QR poster on every wall points at it and always will. It is now a permanent commitment, independent of the app. Say so in the working rules.

---

## THINGS I THINK ARE BAD IDEAS, plainly

- **Submitting without a tested import path.** You would be asking every existing user to start again, without telling them, and some will delete the version that holds their year.
- **Shipping the sign-up sheet inside v1.** Largest risk, largest ongoing burden, smallest benefit — the sheet has never needed the app.
- **Believing you can do releases yourself.** You cannot, and planning as though you can will strand the project at the first store rejection.
- **Paying a managed wrapper service four figures a month** for a free, non-commercial app.
- **Building a widget for version one.** It is the one piece that genuinely requires native programming, and it buys the least.
- **Moving the journal into native storage for v1.** The most dangerous refactor available to you, for a durability gain the export file already delivers more completely.

---
---

# TECHNICAL APPENDIX

**Wrapper:** Capacitor 8. Requires Node ≥22; Android Studio ≥2025.2.1 with SDK API ≥24; **macOS + Xcode ≥26.0 for iOS**. SPM replaced CocoaPods as the default iOS dependency manager in Capacitor 8. The existing `index.html` goes in the web directory unchanged; no bundler, no build step, no framework — the single-file architecture is an asset here, not a liability.

**Origin:** the app's web content runs under an app-local scheme, not `https://actsofgood.app`. Consequences: (a) `localStorage`/IndexedDB start empty — no migration path except export/import; (b) `AOG_BASE` continues to point at the live Worker over the network — the Worker's CORS allow-list must add the app origin **before** the app ships (landmine L8, deploy-order rule, invariant B2-13); (c) any code reading `location.origin` needs auditing.

**Storage:** WKWebView storage lives in the app container and is not subject to Safari's 7-day ITP script-writable-storage cap (that's a Safari counter; installed home-screen web apps already get their own counter and WebKit's stated expectation is that first-party data in such an app is not deleted). It **is** still reclaimable under device storage pressure per Capacitor's own docs. Native alternatives when/if the persistence rewrite happens: `@capacitor/preferences` for the small text store, a SQLite plugin for the journal, `Directory.Library` for photo blobs. That rewrite touches the 340 lines at ~2162–2500 and must preserve invariants B2-1 (both halves), B2-2 (slim/rehydrate), B2-3 (`currentPhotoIds`/`heldPhotoIds` registry), B2-4 (`LOAD_MISSED` gates the sweep), B2-5 (paired `id`/`THUMB(id)` writes). **Not recommended for v1.**

**Notifications:** `@capacitor/local-notifications`. No APNs certificate, no FCM project, no server, no third-party SDK, no privacy-label entry. Practical ceiling ~64 pending requests on iOS (documented for the deprecated `UILocalNotification`, consistently observed for `UNUserNotificationCenter`; **medium confidence**) — schedule a rolling window and top up on each foreground. Android 13+ requires a runtime `POST_NOTIFICATIONS` permission request. Guideline 4.5.4 and 5.1.2(i): consent, opt-out, never a precondition of functionality.

**Instagram Stories:** iOS — register `instagram-stories` in `LSApplicationQueriesSchemes`; open `instagram-stories://share?source_application=[MetaAppID]`; write to `com.instagram.sharedSticker.backgroundImage` and/or `.stickerImage`, optional `.backgroundTopColor` / `.backgroundBottomColor`. Android — implicit intent `com.instagram.share.ADD_TO_STORY`, resolve before launching. Meta App ID mandatory since Jan 2023. Assets ≥720×1280, 9:16, JPG/PNG; stickers ~640×480. **No Meta app review required.** This is the one native capability that is permanently closed to a PWA, because a web page cannot write named native pasteboard types — which is the notebook's own permanent finding (A1), now confirmed as solvable only this way. Preserve invariant B2-16: nothing global read after an `await` in the share path.

**OTA live updates:** permitted by Apple §3.3.1(B) (interpreted code executed by WebKit/JavaScriptCore, not altering primary purpose, no code storefront, no OS-security circumvention) and by Google's Device and Network Abuse policy (explicit webview-JavaScript carve-out). Vendors: Capgo (Solo $14/mo, 2k MAU), Capawesome Cloud, OtaKit. Verify pricing at purchase — this niche moves monthly and the vendors write each other's comparison articles.

**Cards / canvas:** `renderCard` (~9152) and the canvas region (8904–9278) are unreviewed by the code seat (Part E) and are about to become the source of the Stories background asset at a new fixed 9:16 aspect. That region needs a read before it carries this weight. `packKey()` (B2-15) must name every field the Stories asset draws from.

**Print:** the book path (`printJournal` ~6380, `@page` rules, off-screen measurement) is unverified in Safari and will now also need verifying in WKWebView. Two engines, zero tests. See Part D item 7.

**Build/CI:** Codemagic, Bitrise, Capawesome Cloud all viable; Ionic Appflow sunsetting 31 Dec 2027; App Center retired 31 Mar 2025. All need a repo, a config file and uploaded signing assets. App Store Connect and Play Console themselves are browser-only — only the *binary* needs a Mac.

**Store-side forms to complete:** Apple — privacy nutrition label (likely "Data Not Collected" if the sheet stays out), updated age-rating questionnaire (mandatory since 31 Jan 2026), EU DSA trader self-assessment, privacy policy URL in metadata *and* in-app, detailed §2.3.1 review notes. Google — Data safety form, target audience & content declaration, privacy policy URL, account-deletion questions (answer: no accounts), and the 12-tester/14-day closed test if the account is a post-Nov-2023 personal one.

**Open items requiring a real device, added to the engineers' Part D list:**
8. Does a local notification fire reliably on both platforms after the app has been closed for days?
9. Does export-then-import reproduce a year byte-for-byte, including photographs, across the PWA→app boundary?
10. Does the Stories hand-off place the card correctly, at what quality, on current Instagram builds?
11. Does the book print from WKWebView at the assumed resolution?

---

## Sources

**Apple — primary**
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — §1.2 UGC, §1.3 Kids, §2.1, §2.3.1, §2.3.8, §4.2 & subsections, §5.1.1, §5.1.2, §5.1.4 — accessed 12 Sep 2026
- [App Privacy Details](https://developer.apple.com/app-store/app-privacy-details/) — definition of "collect", optional-disclosure criteria, data categories — accessed 12 Sep 2026
- [Updated age ratings in App Store Connect](https://developer.apple.com/news/?id=ks775ehf) — 24 Jul 2025, deadline 31 Jan 2026
- [Age requirements for apps distributed in Brazil, Australia, Singapore, Utah, and Louisiana](https://developer.apple.com/news/?id=f5zj08ey) — 24 Feb 2026
- [Apps without trader status will be removed from the App Store in the EU](https://developer.apple.com/news/?id=einwn76m) — effective 17 Feb 2025
- [Manage EU Digital Services Act trader requirements](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/) — trader definition, hobbyist guidance, published contact info — accessed 12 Sep 2026
- [Apple Developer Program Fee Waiver](https://developer.apple.com/help/account/membership/fee-waivers/) — individuals explicitly excluded — accessed 12 Sep 2026
- [Developer Forums thread 806726](https://developer.apple.com/forums/thread/806726) — ten consecutive 4.2 rejections of a partly-native web app
- [Developer Forums thread 812889](https://developer.apple.com/forums/thread/812889) — Capacitor app, "sharing alone is not robust enough"
- [Developer Forums thread 811171](https://developer.apple.com/forums/thread/811171) — the 64-notification question, unresolved
- [WebKit: Full Third-Party Cookie Blocking and More](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) — 24 Mar 2020, home-screen web app exemption

**Google — primary**
- [Families Policies / target audience & neutral age screen](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) — accessed 12 Sep 2026
- [Account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) — scope and exemptions — accessed 12 Sep 2026
- [Changes to Google Play for upcoming app store bills for users in applicable US states](https://support.google.com/googleplay/android-developer/answer/16569691?hl=en) — Texas SB 2420 in effect Dec 2025; Play Age Signals API
- [Contact information requirements for developer accounts](https://support.google.com/googleplay/android-developer/answer/10840893?hl=en) — what is published publicly
- [Everything about the 12 testers requirement](https://support.google.com/googleplay/android-developer/community-guide/255621488/everything-about-the-12-testers-requirement?hl=en) — post-13 Nov 2023 personal accounts, 12 testers / 14 continuous days

**Meta — primary**
- [Sharing to Stories — Instagram Platform](https://developers.facebook.com/docs/instagram-platform/sharing-to-stories/) — URL scheme, App ID since Jan 2023, pasteboard keys, asset specs — accessed 12 Sep 2026

**Capacitor / tooling — primary**
- [Capacitor Environment Setup](https://capacitorjs.com/docs/getting-started/environment-setup) — Node 22+, Xcode 26, macOS required for iOS, Android Studio 2025.2.1 — accessed 12 Sep 2026
- [Capacitor Storage guide](https://capacitorjs.com/docs/guides/storage) — "must be considered transient" — accessed 12 Sep 2026
- [Capgo WidgetKit plugin docs](https://capgo.app/docs/plugins/widget-kit/) — Xcode extension target still required
- [Capgo pricing](https://capgo.app/pricing/) — Solo $14/mo, no permanent free tier — accessed 12 Sep 2026

**Secondary / vendor — treat as adversarial, corroborated where possible**
- [Capawesome: Best CI/CD Platforms for Capacitor Apps in 2026](https://capawesome.io/blog/comparing-ci-cd-platforms-for-capacitor-apps/) — 12 May 2026, updated 14 Jul 2026 — Appflow sunset 31 Dec 2027, App Center retired 31 Mar 2025
- [OtaKit: Are OTA Updates Allowed? App Store & Google Play Rules Explained](https://www.otakit.app/blog/ota-policies-for-app-store-and-google-play) — 2 Jul 2026 — quotes Apple §2.5.2 / §3.3.1(B) and Google's webview carve-out
- [MobiLoud: Will Your Webview App Be Rejected?](https://www.mobiloud.com/blog/app-store-review-guidelines-webview-wrapper) — 15 Dec 2025
- [MobiLoud: Can You Publish a PWA to the App Store?](https://www.mobiloud.com/blog/publishing-pwa-app-store/) — updated 2026
- [PWABuilder: Publish your PWA to the iOS App Store](https://blog.pwabuilder.com/posts/publish-your-pwa-to-the-ios-app-store/) — updated 21 Feb 2024 — Mac + Xcode required, no acceptance guarantee
- [Code2Native: App Store Rejection 4.2 — How to Get Your WebView App Approved](https://code2native.com/blog/fix-app-store-rejection-42-webview) — 27 Jan 2026 — the "three or more native features" checklist
- [AscAuto: Guideline 4.2 Rejection](https://ascauto.org/rejections/guideline-4-2) — "last updated July 2026"; the 85% appeal-failure figure is **unverified**
- [LowCode: App Store Review Time for Mobile Apps in 2026](https://www.lowcode.agency/blog/app-store-review-time) — updated 3 Sep 2026 — 24–48h typical, 72h first submissions, 7 days for new Play accounts
- [Median.co pricing](https://median.co/pricing) and [MobiLoud pricing](https://www.mobiloud.com/pricing) — accessed 12 Sep 2026
- [MagicBell: PWA iOS Limitations and Safari Support](https://www.magicbell.com/blog/pwa-ios-limitations-safari-support-complete-guide) — 20 Mar 2026 — **contains the obsolete "50MB iOS storage limit" claim the engineers' notebook already flagged as wrong. Cited only as an example of the stale-guide problem.**
- [PrimeTestLab: TWA App Rejected on Google Play?](https://primetestlab.com/blog/twa-app-rejected-google-play-switch-to-webview) — Jun 2026 — **low confidence**; claims TWA builds fail Play's engagement review more often, on the vendor's own unverifiable data, and the author sells testing services

**Law / regulation — secondary**
- [Hunton: COPPA Rule Amendment Compliance Deadline Approaches](https://www.hunton.com/privacy-and-cybersecurity-law-blog/coppa-rule-amendment-compliance-deadline-approaches) — compliance deadline 22 Apr 2026
- [Federal Register: Children's Online Privacy Protection Rule](https://www.federalregister.gov/documents/2025/04/22/2025-05904/childrens-online-privacy-protection-rule) — published 22 Apr 2025
- [Morrison Foerster: Texas App Store Law Takes Effect After Fifth Circuit Stays Preliminary Injunction](https://www.mofo.com/resources/insights/251111-texas-targets-app-stores-with-new-accountability-law)
- [Frankfurt Kurnit: Countdown to Jan. 1, 2026 — Mobile Developers Must Adopt Apple, Google APIs](https://technologylaw.fkks.com/post/102lxsp/countdown-to-jan-1-2026-mobile-developers-must-adopt-apple-google-apis-to-com)

**Not legal advice.** The age-assurance and children's-privacy section describes published store rules and published summaries of law; before shipping anything that collects a birthday or a stranger's contact details, that section should be read by someone qualified.
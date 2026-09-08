# What the sign-up sheet apps actually do

Researched 7 September 2026 against SignUpGenius, SignUp.com, Perfect Potluck,
Meal Train, Take Them A Meal, CaringBridge, Give InKind, Buy Nothing, Nextdoor.
Every claim traced to vendor documentation. **Where something could not be
verified it says so; a marked gap is worth more than a confident invention.**

## Two corrections to what we assumed

- **CaringBridge retired its Planner in December 2023.** Replaced by "Requests",
  much thinner. Any comparison against the Planner is three years stale.
- **Buy Nothing and Nextdoor have no slot-claiming at all.** They are feeds and
  maps. There is nothing there to copy.

## Where we already win

**Only three products let the ORGANISER work without an account**: ours, Perfect
Potluck and Take Them A Meal. The other two are built by the same two-person
shop in Virginia (Scott Rogers and Adina Bailey). Their mechanism is email
address as identity plus a per-sheet admin password. SignUpGenius, SignUp.com,
Meal Train, CaringBridge and Give InKind all require the organiser to sign in.

**Meal Train makes the CLAIMER create a password** to bring a meal. For a
neighbour scanning a poster on a noticeboard that is where the funnel dies.

**Our poster is better than anything they ship.** SignUpGenius charges for a QR
generator (premium, Share tab) and hands you a bare code. SignUp.com emails one
at creation. **Neither produces a laid-out page.** Ours composes the code into a
printed sheet with the list, the date, the address and the heart in the square.

**And we are already right about privacy where two of them are wrong.** Perfect
Potluck and Take Them A Meal print every claimer's phone number on a page anyone
with the link can read. A QR poster on a fire-station noticeboard is as public
as a link gets. SignUpGenius has a setting to hide names and comments; for us it
should stay the default, not a setting.

## The one real gap: nothing reminds the claimer

| Product | When it reminds | Who controls it |
|---|---|---|
| SignUp.com | **2 days** default, settable 1 to 7 | organiser; claimer opts into SMS |
| Perfect Potluck | 2 days, fixed, email only | automatic, only if an email was typed |
| Take Them A Meal | 1 day, **copied to coordinator and recipient** | automatic |
| Meal Train | **1 day and 7 days, opt-in checkboxes** | **the claimer, at booking** |
| Give InKind | confirmation plus two reminders | automatic |
| SignUpGenius | configurable — **but NOT on slots-only sheets** | organiser |
| CaringBridge | none found in the help centre | — |

**The consensus is two days**, because one day is too late to shop.

**The finding that matters most:** SignUpGenius, the biggest product in the
category, offers **no automatic reminder at all on the "slots only" format** —
which is exactly the shape of ours. The format that most needs the nudge gets
none, in the market leader.

**Our answer, agreed 7 September:** every one of those needs a mail server and we
have none. Hand the claimer a calendar entry instead: a generated `.ics` with the
item they claimed in the title and an alarm at minus two days. It lands on their
phone, owned by them, and we keep no list, send nothing and store nothing about
them. Better for the thesis than email, not merely cheaper.

## Cancelling, in ascending order of how well it works

1. **Manual and unnotified** — CaringBridge. Unassign yourself, then separately
   contact the requester. The organiser finds out by accident.
2. **Open to everyone** — Perfect Potluck and Take Them A Meal. Change and Remove
   sit beside every entry and **by default any visitor can use them on anyone
   else's**. Avoid.
3. **Self-serve, identity-anchored** — SignUpGenius: *"Already signed up? You can
   change your sign up"* at the top of the public sheet AND *Edit My Sign Up* in
   the confirmation. Two doors, no account.
4. **Self-serve with automatic notification** — Give InKind. Unclaim reopens the
   slot and emails both sides. **And cancelling opens a message box** so the
   reason travels with the change, in one action instead of two.

Copy 3 and 4. Never 2.

## Worth stealing, ranked by value over effort

1. **Add-to-calendar on the confirmation, alarm already set.** See above.
2. **"Already claimed something? You can change it"** printed on the sheet
   itself, not only in a confirmation.
3. **A print stylesheet for the FILLED sheet**, not just the poster. SignUpGenius
   tells organisers to print it, carry it to the event and key in walk-ups
   afterwards. SignUp.com has a dedicated check-in sheet report. Everyone treats
   the poster and the filled sheet as separate features; for us it is CSS over a
   page we already render. **The organiser standing in a church hall at five
   o'clock with a list of who said they were bringing rolls is the whole job.**
4. **A hint in the category heading.** Perfect Potluck's own sample: "Side Dish
   *(to serve 10 +/-)*", "Dessert *(fruit? chocolate? cake?)*". A text field.
5. **Say why you want a contact, inline.** Give InKind justifies the ask in one
   sentence at the point of asking. That is the difference between typing an
   address and abandoning.
6. **Duplicate last time's sheet.** SignUp.com clones the shape, deliberately not
   the people. Perfect Potluck says this is their most-requested missing feature.

## One product principle worth stealing outright

Perfect Potluck: **once somebody has signed up under a category, the coordinator
cannot rename or delete it** — "since participants are not automatically made
aware of changes to the schedule. This ensures that the person who signed up
isn't caught off-guard." That is one conditional and a real ethic.

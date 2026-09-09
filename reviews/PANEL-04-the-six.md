# The six, on build 3U

8 September 2026. Six reviewers, run **separately**. None of them saw the app at
the same time as another, none saw another's notes, and none knew who else was
looking. That is the whole point of the exercise and it is why the places they
agree are worth something.

They reviewed the same packet: every screen as the words appear on it, the
accessibility tree, the 89 ideas, and the calendar engine.

---

## Verified before writing this down

Four of their claims were checkable in the file. **All four check out.**

| Claim | Checked | Result |
|---|---|---|
| The date picker's day cells are `div`s, not buttons | `drawDate()` | **True.** `g+='<div style="…" data-p="…">'+d+'</div>'` — no role, no tabindex, no name |
| Five date buttons carry a hardcoded `aria-label` that overrides the real date | lines 1440, 1499, 1563, 1627, 1666 | **True.** All five say "pick a date" forever, whatever date they hold |
| Eight back buttons named only "‹" | `class="back" onclick` | **True.** Eight of them |
| Wreaths Across America fires a week early | `nth(y,11,6,2)` | **True.** 2nd Saturday computes 12 Dec 2026; the real date is **19 Dec 2026** |

**One claim of theirs is MY fault, not the app's.** Hollis reported the calendar
file ends in an unterminated array. That is the packet — I cut it at line 4292,
mid-array. The real file closes correctly. Discount it.

---

## Where they agreed without conferring

Three things were hit by more than one of them, independently. Those are the
findings to trust most.

1. **The home screen's clock is wrong and says itself twice.** "week 1 of 52"
   appears twice on one screen, over acts dated April, under a month reading
   September. Eileen, Kayla and Ruth all stopped on it separately. Ruth: if the
   year opened 2 April, on 8 September it is week 23, not week 1.
2. **Twenty-six tiles under a heading that says 25.** Act 0 sits in the grid and
   nothing on that screen says what it is. Eileen counted them twice with her
   finger. Ruth called it a straight contradiction between the heading, the grid
   and the counter.
3. **Posting is the main road and the private route is the footnote.** "Send it
   as a note to someone" is last, smallest, after everything else — and it is the
   only route Eileen and Kayla would ever use. Both said so independently.

---

## Eileen Prosser, 68 — the one who does the most and would be lost first

**Verdict: no.** Not from lack of wanting it.

Stopped on the first screen — four numbers before she had done anything, two of
them the same. Then the backup: *"Choose Save to Files and put it in iCloud
Drive"* over a coral line saying the year will be lost if she doesn't. She does
not know what Files is. **The app tells her she will lose everything and then
gives instructions she cannot follow.** That is the screen she puts the phone
down on.

Also: *"press and hold"*, *"hands the card to Instagram"*, *"Save Image"* — all
assume she knows where things go.

Her five: backup that never mentions iCloud (email it to herself or her son);
send-to-one-person as the main road; fix the 0 tile; say each number once and cut
"plenty of room"; and every time the app says save or share, say **where it goes**.

> *"I have never in my life called what I do 'acts of good', and if my
> daughter-in-law saw that phrase on my phone with my name attached to it I
> would want the ground to open."*

> *"A number like twenty-five stops being a promise and turns into a debt the
> moment you show it to me as a grid of empty squares with a running score at
> the top. I cooked for Nancy every Tuesday for eleven years without counting."*

She loved the ideas list, "In honor of" — *"my Don has been gone two years and
there is not another app on this phone that has made room for him"* — and the
letter's temperature.

---

## Kayla Ocampo, 19 — the one the app has never met

**Verdict: no.** And she counted.

**She went through all 89 ideas and found eleven she could do for free.** The
rest have a receipt: doughnuts, pastries, adoption fees, gift cards *kept in the
car* (she has no car), a stepladder, a monthly standing gift. **So she runs out
of affordable ideas at act 11 of 25 and looks at fourteen empty tiles for the
rest of the year.** Her words: *"that's not a nudge, that's a bill."*

On the card: *"It's a plaque."* Gold script, balloon, a number — a retirement
gift. And it is generated **for** her, which is the part she can't get past: the
app makes the trophy, she supplies the act. Anonymous mode posts only the card,
which she called exactly backwards — the numbered trophy with the evidence
stripped out.

Her five: a real free-only filter with honest costs; kill or hide "act 2 of 25"
on the card; **make the sign-up sheet the front door, not a paragraph inside a
form**; a letter for someone who isn't fifty; let the card be ugly.

> *"The single best thing in here — a shareable list where people claim one of
> the things you need, nothing to sign up to — is buried in a form field, and if
> you rebuilt the whole app around that one sentence I'd use it on Monday."*

Two of the ideas — fund a classroom wish list, clear a school's lunch balances —
she was on the receiving end of five years ago.

---

## Desmond Iyer, 37 — blind, screen reader, the hard audit

**Verdict: he can log a year of things done today. He cannot plan one.**

The spine works — setup, the letter, act 0, log, write up, card, caption. It
breaks at **the date**, and the date is the whole planning half of the app.

**Blockers**
1. **The date picker has no controls in it.** Day cells are `div`s with an
   onclick. Selected is a background colour; today is a border. Both colour only.
   The only date he can reliably set is "Today".
2. **Every date button says the wrong thing, permanently.** The real date is
   written into the button's text, but a hardcoded label overrides it — so it
   reads "When, pick a date" whether empty or set to next March. He cannot read
   back a date already in his own journal.
3. **Eight back buttons whose entire name is "‹".**
4. **The month calendar is a wall of numbers** — done, planned and today are
   three colours and no words.

Serious but survivable: thirty-two identical "Save for later" buttons; the skin
tone chips named as colours with no state and the hand image with empty alt;
seven sheets with no name; "Write it up" and "Change anything" flattened to the
same spoken label; the coral dot on the You tab is invisible to him by design.

**What he says the app gets right, and he was specific:** the 25 tiles are real
buttons whose labels carry state in words; screen changes move focus and announce;
the tab bar sets `aria-current`; sheets get modality genuinely right; the dialog
helper is textbook; the four status bars are hidden when parked so they don't
litter his swipe order; labels are wired to their fields; **the card is live text,
not a picture — he can read his own card, and it should never be flattened.**

> *"Do one and two and I'll use this. I mean that literally. Right now I could
> log it. I just couldn't plan it."*

---

## Ruth Kinnaird, 55 — the claims audit

**23 claims checked. 13 findings.** Ten passed clean.

**The three that would embarrass somebody:**

1. **The organ donor / marrow line is wrong in every clause.** *"Two forms, ten
   minutes, once in a lifetime."* The marrow registry is not a form — a swab kit
   is posted to you. It is **age-gated 18–40**, so a large share of this app's
   readers cannot join at all. And it isn't once in a lifetime. It is tagged
   *Today · An hour*, so it is written to be acted on within the hour.
2. **"Register people to vote — nonpartisan and legal everywhere."** The
   legal-everywhere half is the untrue half. Texas requires county deputisation
   to handle completed forms; Florida requires registering as an organisation,
   with fines to $50,000. Handing out blank forms is fine everywhere; collecting
   filled ones is not.
3. **"Tools, paint and lumber to a Habitat ReStore."** ReStores cannot accept
   paint. The reader loads the car before they find out.

And one she would not ship on principle: **"Don't overthink the allergies, the
welcome is the point."** The only line in 89 that tells a reader to set aside a
safety consideration.

Others: Meals on Wheels age floor is local, not 18; nine states now serve free
school meals so the lunch-balance idea returns zero there; Make a Difference Day
has had no national organiser since 2014; National Night Out is October in Texas;
literacy tutor training runs 6–20 hours, not nine; platelet aspirin deferral is
two *full* days, not 48 hours.

**Nineteen consistency findings.** The worst: the You screen promises "Nothing
leaves it" and forty words later tells you to put it in iCloud Drive. Three
screens are all headed "Plan & Log". Threads counts characters for a network you
cannot post to. "Read Jessica's letter again" names her, and the project's own
rule says her name never travels into anybody's copy.

**Where she says the writing is genuinely good** — and she is not generous by
default: *"Dignity travels in small denominations."* · *"'You are great'
evaporates, 'the way you handled June' does not."* · *"The doorstep welfare check
is the point, not the food."* · *"Turning up four times beats turning up once at
four places."* · and on screen, *"This is the journal entry. The post comes out
of it, not the other way round"* — which she called the clearest sentence in the
product.

---

## Priya Raghunathan, 43 — the social read

**Her lead finding, and it is the one nobody has raised before:**

> The number creates demand for recipients, and nobody has asked what it is like
> to be the supply.

By September a person who is behind does not look for the greatest need, they
look for the **easiest available** need — and that is a friend, a neighbour, an
older relative. Help that arrives in a cluster at the end of a quarter reads as
administrative. The app has worked hard to protect the user from guilt and not at
all to protect the people around them from becoming inventory.

**The structural error:** helpers and helped share one data structure. The People
screen holds "everyone who's been part of an act", tagging draws from it, and so
the person you helped ends up in the same list as the friend who came along, with
the whole app pointed at getting handles onto their name. **They must not share a
list.** That one fix makes several others unnecessary.

**The printed book.** "The names it was all for at the back." A bound index of
everyone in your life who needed something. *"Ray took ten seconds to say yes to
his bins going out. He did not say yes to being on page 114 of a book."*

On anonymous mode: it half-solves and half-performs. It hides the recipient from
strangers and does nothing about the forty people on the street who watched, and
leaves the name in the journal and the book. Anonymity should be a property of
the act chosen at planning, not a caption setting.

On the sign-up sheet — the best object in the app — it is doing two jobs that
behave nothing alike: *I need eight people to bring things*, and *this is a meal
train for a family in trouble*. The second is a public inventory of a household's
needs. Split them.

**Where she says publicness genuinely works:** the acts where being seen IS the
good (a review, an email to a principal cc'ing the teacher, naming a staff member
to their manager); act 0 as a commitment device; Make a Difference Day, because
synchrony costs nobody anything; and the private send offered at equal weight on
the posting screen, which she called a real piece of moral design.

> *"Posting kindness is not vanity and I would fight anyone who says it is, but
> it earns its place only where being seen is the mechanism rather than the
> reward — and your own letter already says so better than any warning screen."*

---

## Hollis Wray — the calendar

**Six of eight floating dates compute correctly. Two are wrong, and one is wrong
in a way that matters.**

**Wreaths Across America is a week early, every year.** The rule is 2nd Saturday
of December, which gives 12 Dec 2026. The real date is **19 Dec 2026** (and 18 Dec
2027). It is neither the second nor the third Saturday — across 2016–2030 it is
always the Saturday falling between the 13th and 19th. **The app would send
somebody to a cold cemetery seven days before anyone else arrives.** Worse, its
own advice line says sponsorships close in November, and the entry doesn't
surface until December — after the deadline it names.

**Teacher Appreciation Week is in there twice** — once correctly as a floater,
once wrongly pinned to a fixed 1 May, with the same advice line word for word.
Delete the fixed one.

**Camp season is four months late.** Pinned to 1 June; fees and scholarship places
close January to March. By June they're allocated.

Also: Teacher Appreciation Week displays a Sunday when the observed week is
Mon–Fri; National Night Out is October in Texas; Juneteenth's observance moves
when the 19th is a Saturday (2027); two entries collide on 1 September; and the
World Kindness Day entry mentions Veterans Day *two days after it has passed*.

**Nothing religious is in the calendar at all**, and each kind needs different
machinery: Ramadan and Eid must be computed and shown as provisional (moon
sighting); Rosh Hashanah and Yom Kippur can be computed exactly but begin at
sundown the evening before; Diwali cannot be ruled and needs a lookup table;
Easter and Lent are a ten-line computation, with Orthodox Pascha carried
separately. He gave dates for 2026 and 2027 for all of them.

**Missing secular days the ideas library already depends on:** Memorial Day (and
the flag-in the Thursday before), Veterans Day, Mother's and Father's Day,
National Voter Registration Day, Election Day and its registration cut-offs,
Black History Month, the daylight-saving change — which is the natural hook for
the smoke-alarm-battery act already in the library.

**His most valuable point is not a date at all.** The calendar fires on the day of
the event, when the thing a person actually has to do — register, apply, sponsor,
get cleared — happened weeks earlier. He rewrote the lead time for eighteen
entries. The single highest-value change: **"Background checks take weeks" should
fire twice a year, in January and July**, because the acts it unlocks all have
autumn intakes.

---

## What I would do first

1. **The Wreaths date.** It is wrong, it is checked, and it is the only finding
   here that could send somebody somewhere on the wrong day. One line.
2. **The date picker's day cells become buttons.** It unlocks the entire planning
   half of the app for anyone using a screen reader, and it is twenty minutes.
3. **The five date buttons stop lying about what date they hold.** Three lines,
   fixes every date field at once.
4. **The three wrong claims in the ideas** — marrow registry, voter registration,
   ReStore paint — plus the allergies line.
5. **The home screen clock**, which three of them stopped on separately.

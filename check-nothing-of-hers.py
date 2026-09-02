#!/usr/bin/env python3
"""
Checks that nothing of Jessica's personal year is readable inside the app.

Her posts are reference — her voice, the essence, and ideas worth generalising.
They are never content. Nobody's copy of the app should name her acts, her
friends, her towns or her trips. An idea taken from one of her acts keeps what
was learned and drops whose act it was learned on.

TWO things are hers on purpose and are skipped:
  · her letter on first launch — her words, her signature, her town
  · notes left in the code for the next person working on the app

Run it:      python3 check-nothing-of-hers.py
Or point it: python3 check-nothing-of-hers.py "path/to/index.html"

Says CLEAN, or lists what to look at.
"""
import io, re, sys

APP = sys.argv[1] if len(sys.argv) > 1 else 'index.html'
try:
    src = io.open(APP, encoding='utf-8').read()
except FileNotFoundError:
    print(f"\n  Can't find {APP}\n"); sys.exit(2)

# Where her letter lives. Its real end, by matching its own closing tag — an
# earlier version guessed at "the next screen" and swallowed six screens with
# it, so the check was silently reading a third of the app.
LET_A = src.find('<div id="letter"')
LET_B = -1
if LET_A > 0:
    depth = 0
    for m in re.finditer(r'<div\b|</div>', src[LET_A:]):
        depth += 1 if m.group(0).startswith('<div') else -1
        if depth == 0:
            LET_B = LET_A + m.end(); break
if LET_A < 0 or LET_B < LET_A:
    LET_A = LET_B = -1

# Where the code notes are, so a hit inside one can be ignored.
# A real note is short. A "note" of 300,000 characters means a stray marker
# inside a piece of text paired with a distant one — that once blinded this
# check over a third of the app. Anything longer than 4,000 characters is not
# a note and is searched normally.
NOTES = [(m.start(), m.end()) for m in re.finditer(r'/\*.*?\*/', src, re.S)
         if m.end() - m.start() < 4000]
NOTES += [(m.start(), m.end()) for m in re.finditer(r'<!--.*?-->', src, re.S)]
# Where the embedded fonts and pictures are — long strings that throw false alarms.
BLOBS = [(m.start(), m.end()) for m in
         re.finditer(r'data:[a-z/+;.-]+base64,[A-Za-z0-9+/=]{40,}', src)]

# Said on purpose: the button that reopens her letter names whose letter it is.
INTENDED = ["Read Jessica", "A letter from Jessica"]

def skip(i):
    for phrase in INTENDED:
        a = src.rfind(phrase, max(0, i-60), i+60)
        if a >= 0 and a <= i < a+len(phrase)+60: return "said on purpose"
    if LET_A >= 0 and LET_A <= i < LET_B: return "her letter"
    for a, b in NOTES:
        if a <= i < b: return "a code note"
    for a, b in BLOBS:
        if a <= i < b: return "an embedded picture"
    return None

CHECKS = {
  "A real person's name": ["Jessica","Hensley","Beth Howells","Kate Carrico",
    "Elaine Zhang","Gillian","Judy Mabe","Miss Judy","Jenny Seck","Leisel",
    "Weatherford","Ginger Wilder","Sam Watkins","Brenda Parkey","Catlyne",
    "Leigh Vinson","Holly Williams","Carrico","Howells"],
  "A real place": ["Savannah","Tybee","Chattanooga","Charlottesville",
    "Hamilton County","Cumberland","Trinity UMC","Neighborhood Comics",
    "Will Low","Massage Envy"],
  "Something only hers": ["blooms4good","bloom4good","baked4good","Fight Dirty",
    "DO GOOD RECKLESSLY","NO ONE CAN STOP ME","Fifty Walks"],
  # NOT a plain "act 7" — the app numbers everyone's acts that way.
  "One of her acts": [r"\bAct \d+ of 50\b", "year fifty", "Year 50",
    "did for act", "on her act", "when she did"],
}

found, skipped = [], 0
for label, terms in CHECKS.items():
    for t in terms:
        pat = t if t.startswith(r"\b") else re.escape(t)
        for m in re.finditer(pat, src, re.I):
            why = skip(m.start())
            if why: skipped += 1; continue
            i, j = max(0, m.start()-70), min(len(src), m.end()+70)
            ctx = re.sub(r'<[^>]+>', '', re.sub(r'\s+', ' ', src[i:j])).strip()
            found.append((label, m.group(0), ctx))

seen, uniq = set(), []
for label, hit, ctx in found:
    k = (hit.lower(), ctx[:60])
    if k not in seen:
        seen.add(k); uniq.append((label, hit, ctx))

print()
if LET_A < 0:
    print("  NOTE: her letter was not found, so it is not being skipped.\n")
# ── second pass: the notes in the code ────────────────────────────────────
# Nobody using the app can read these. But they ship inside the file, so a
# real name left in one is still a real name sitting on everybody's phone.
# Reported separately, and never as a failure — this is a tidy-up list.
_comments = re.findall(r"/\*.*?\*/", src, re.S) + re.findall(r"<!--.*?-->", src, re.S)
_notes = "\n".join(_comments)
REAL = ["Judy", "Mabe", "Ginger", "Leigh", "Holly", "Beth", "Howells",
        "Carrico", "Elaine", "Zhang", "baked4good", "blooms4good"]
in_notes = {}
for _n in REAL:
    _k = len(re.findall(r"\b" + re.escape(_n) + r"\b", _notes))
    if _k:
        in_notes[_n] = _k

if in_notes:
    print("  IN THE CODE NOTES — not on any screen, but in the file:")
    for _n, _k in sorted(in_notes.items(), key=lambda x: -x[1]):
        print(f"     {_n} ({_k})")
    print("  Nobody using the app sees these. Anyone opening the file does.")
    print()

if not uniq:
    print("  CLEAN — nothing of Jessica's year is readable in the app.")
    print(f"  ({skipped} mentions skipped: her letter, and notes left in the code.)")
    print()
    sys.exit(0)

print(f"  {len(uniq)} thing(s) to look at:\n")
for label, hit, ctx in uniq:
    print(f"  {label}: \"{hit}\"")
    print(f"     …{ctx[:130]}…\n")
print("  Generalise anything real here — keep what was learned, drop whose")
print("  act it was learned on.\n")
sys.exit(1)

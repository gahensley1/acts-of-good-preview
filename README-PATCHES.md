# Patches — apply these to index.html

Written 6 September 2026. Each patch is a Python script that edits `index.html`
in place, using exact anchors with `assert count == 1`. **If any anchor does not
match exactly once, nothing is written** and the script names the anchor that
failed. That is the point: a replacement that silently matches zero or two
places is how this file gets corrupted.

## Before you start — the three copies have drifted

| copy | build | bytes |
|---|---|---|
| `C:\Users\tony\Documents\acts of good\index.html` | **1X** | 1,093,075 |
| `C:\Users\tony\Documents\aog-push\index.html` | assume 1X, unverified | — |
| GitHub `main`, and the live Pages site | **1W** | 1,083,033 |

**1X has never been pushed.** Roughly 10KB of work exists only on the laptop.
Patch against **1X**, not the GitHub copy — but the anchors were chosen to exist
in both, so either will apply.

Edit in `aog-push`, then copy across to `acts of good` and `cmp -s` the two, per
the standing rule in `HANDOFF.md`.

## Applying

```
cd C:\Users\tony\Documents\aog-push
python patch-01-notes.py index.html
```

It prints the file, the byte count, the build letter it found, and the letter it
bumped to. A `.bak` is written beside the file first.

## Verifying — do all three, in this order

**1. The JavaScript parses.** Extract the non-src `<script>` blocks, concatenate,
and `node --check`. A patch that breaks the parse breaks the whole app, and it is
silent until you load it.

**2. Look at it.** Load `index.html` in a browser at 390×844. A passing assertion
is not a look — that lesson is already written into `HANDOFF.md` at item 9, where
every test passed on a dot that was rendering as a 7×223px sliver.

**3. Bump and mirror.** The patch bumps the build letter itself. Update the
"Build in G's hands" line in `HANDOFF.md`, copy to the mirror, push, then load
the site with `?v=<tag>` and confirm the mark.

---

## patch-01-notes.py — the notes panel

Adds a **Notes** panel under The story on the act-in-the-works screen.

**What it does**

- A list that takes anything: names, things to buy, calls to make.
- Tap the circle to tick. No mode button, no toolbar.
- **Return makes the next line. Return on an empty line ends the list.** That
  second one is the behaviour that makes Apple Notes feel like nothing at all,
  and it is the one everybody forgets to copy.
- Backspace at the start of a line merges it into the line above, caret at the
  join.
- A name already in `S.people` gets a small coral dot. Names it doesn't know
  stay plain words.
- One checkbox: *Keep these notes in the journal.* Off by default.
- Notes are **private**. They never reach a card, a post or a poster.

**What it does not do.** No indent, no drag to reorder, no auto-sort of ticked
items to the bottom, no "turn this line into an invitation". Those were drawn
but not built — see `sheets-and-notes.md`.

**Why separate one-line `<textarea>` elements and not one contenteditable box**

iOS dictation fires the text once, then re-fires it word by word 100–500ms
later, with no composition events and the DOM already updated. There is no
reliable way to detect it. In a contenteditable, re-rendering during input
permanently desyncs the editor from the DOM and later text lands in the wrong
place or overwrites what is there. **G dictates everything.** This is the
deciding constraint, not a matter of taste. Do not "simplify" this into one
editable div.

**The circle is a sibling of the field, never inside it**, and the handler is on
`pointerdown` with `preventDefault()` — not `click`. That is what stops a tap
moving the caret or dropping the keyboard.

**A trap already hit and fixed, so nobody re-introduces it.** An earlier version
stripped trailing empty rows on every save. That deleted the new line the instant
Return created it, and the panel looked completely inert. Empty rows are removed
by Return-on-empty and by nothing else.

**Tested** against build 1X with headless Chromium at 390×844:

- panel renders; 34×34 tap target measured
- typing, Return, and a third line — three rows
- two coral dots for the two names in People, none for the name that isn't
- ticking a circle sets `d:1` and does not move focus
- Return on an empty line removes it: 4 rows → 3
- Backspace at position 0 merges upward, text joined correctly
- the journal flag persists
- state survives closing and reopening the act
- no page errors

**State shape**

    w.notes = [ {t:'Ginger', d:1}, {t:'Order stamps', d:0} ]
    w.njr   = 0 | 1        // keep these notes in the journal

`workKeep()` was widened so an act holding only notes is still kept.

**Not yet wired:** the notes do not appear in the journal page even when `njr`
is set, and they are not carried in `exportJournal`. Both are small and both are
deliberate — they change what the journal prints, and that is a §2 copy decision
G has not seen yet.

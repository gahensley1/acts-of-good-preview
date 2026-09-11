#!/usr/bin/env python3
"""
PATCH 04 (card half only) - the Instagram margin. 11 September 2026.

Applies to index.html build 4H. Two anchors, each asserted exactly once; if
either does not match, nothing is written.

    python patch-04-card-safe.py "C:\\Users\\tony\\Documents\\aog-push\\index.html"

THE CARD WAS NEVER DRAWN WRONG. Measured at 1080 the ink cleared the left edge
by 4.7% and the right by 4.4%. What cut "thirty-seven" in half was INSTAGRAM: a
square dropped into a story or a reel is scaled up and cropped about 11% off
each side. Crop a correct card by 11% a side and you get G's screenshot exactly.

So the fix is the margin, not the drawing. The whole composition is drawn at
CARD_SAFE (0.82) of its size, centred, on the same white square. Every
proportion inside the card is untouched, and the band Instagram eats is white.

Measured after: ink runs 12.87% - 87.31%. An 11% crop cuts at 11 and 89, so it
takes nothing.

NOTE: this is the CARD half of what the README calls patch 04. The field-width
half (the "Which act" label, the shorter placeholder, the abbreviated date
button) is NOT in this script.
"""
import sys, os, io, re

OLD_HEAD = """  const g = c.getContext('2d');
  g.fillStyle = '#FFFFFF'; g.fillRect(0,0,W,W);
"""

NEW_HEAD = """  const g = c.getContext('2d');
  g.fillStyle = '#FFFFFF'; g.fillRect(0,0,W,W);

  /* THE INSTAGRAM MARGIN - patch 04, 11 September.
     The card was never drawn wrong: measured at 1080 the ink cleared the left
     edge by 4.7% and the right by 4.4%. What cut "thirty-seven" in half was
     INSTAGRAM - a square dropped into a story or a reel is scaled up and
     cropped about 11% off each side.

     So the fix is the margin, not the drawing. The whole composition is drawn
     at CARD_SAFE of its size, centred, on the same white square. EVERY
     PROPORTION INSIDE THE CARD IS UNTOUCHED, and the band Instagram eats is
     white. Raise CARD_SAFE toward 1 for a bolder card that risks the crop;
     lower it for more protection. One character either way. */
  const CARD_SAFE = 0.82;
  g.save();
  g.translate(W*(1-CARD_SAFE)/2, W*(1-CARD_SAFE)/2);
  g.scale(CARD_SAFE, CARD_SAFE);
"""

OLD_TAIL = """  g.fillText(parts[2], x, base);

  return c;
}"""

NEW_TAIL = """  g.fillText(parts[2], x, base);

  g.restore();                 // out of the safe-margin transform
  return c;
}"""


def die(m):
    print("FAILED - nothing was written.\n  " + m); sys.exit(1)

def sub(s, old, new, label):
    n = s.count(old)
    if n != 1: die("anchor matched %d times, expected exactly 1: %s" % (n, label))
    return s.replace(old, new)

def main():
    if len(sys.argv) < 2: die("usage: python patch-04-card-safe.py <path to index.html>")
    path = sys.argv[1]
    if not os.path.exists(path): die("no such file: " + path)
    s = io.open(path, encoding="utf-8").read()
    if "CARD_SAFE" in s: die("this patch is already applied (found CARD_SAFE).")
    tag = re.search(r'<div id="buildtag">BUILD ([0-9A-Z]+)</div>', s)
    print("  file  : %s" % path)
    print("  chars : %d" % len(s))
    print("  build : %s" % (tag.group(1) if tag else "not found"))
    s = sub(s, OLD_HEAD, NEW_HEAD, "the renderCard white square")
    s = sub(s, OLD_TAIL, NEW_TAIL, "the end of renderCard")
    if tag:
        cur = tag.group(1)
        nxt = cur[:-1] + chr(ord(cur[-1]) + 1) if cur[-1] != "Z" else cur + "A"
        s = s.replace('<div id="buildtag">BUILD %s</div>' % cur,
                      '<div id="buildtag">BUILD %s</div>' % nxt)
        print("  build : %s -> %s" % (cur, nxt))
    io.open(path + ".bak", "w", encoding="utf-8").write(io.open(path, encoding="utf-8").read())
    io.open(path, "w", encoding="utf-8").write(s)
    print("  wrote : %d chars\n\nApplied. Backup at %s.bak" % (len(s), path))

if __name__ == "__main__":
    main()

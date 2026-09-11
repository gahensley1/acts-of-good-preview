#!/usr/bin/env python3
import sys, os, io, re

BUILD_BUMP = True

OLD_CARD = """const CARD = {
  nTop: 12.7, aogTop: 23.0, iyTop: 28.8, scrTop: 34.3,   // ink tops, % of width
  artTop: 6.4, ruleY: 65.9, actTop: 75.1,
  nSize: 15.6, aogSize: 4.9, iySize: 3.6, scrSize: 25, actSize: 10.4
};"""

NEW_CARD = """/* BASELINES, as a percentage of the card's width - not ink tops. The HTML card
   stacks line boxes, so what is fixed there is each line's baseline; the canvas
   used to place by ink top, the two only agree by coincidence, and they had
   stopped agreeing. "acts of good" was starting 1.09% of the card's width ABOVE
   where the 25's ink stops, so on every exported card the 5 sat inside the
   words, while the card on screen had a clean 2.0% gap.

   Every number below is measured off the card on screen. If one is ever touched
   again, measure the screen card and match it - two drawings of one thing will
   drift apart unless something forces them together, and this is the something.

   The script is the exception: it is the only line whose size changes, because a
   long word shrinks to clear the balloon, and on screen its line box is 0.9em
   with a -0.04em top margin, so its baseline rises as it shrinks. Measured at
   four widths from "six" down to "one hundred and one", the screen's baseline is
   linear in the size to within 0.05%:  35.53 + 0.631 x size.                  */
const CARD = {
  nBase: 24.09, aogBase: 29.55, iyBase: 34.50,           // baselines, % of width
  scrBase0: 35.53, scrBaseK: 0.631,                      // scr baseline = B0 + K*size
  artTop: 6.4, ruleY: 65.8, actBase: 83.17,
  nSize: 15.6, aogSize: 4.9, iySize: 3.6, scrSize: 25, actSize: 10.4
};"""

OLD_LINE = """  const line = (txt, size, weight, family, colour, inkTop) => {
    if(!txt) return;
    g.font = f(size, weight, family);
    g.fillStyle = colour;
    const m = g.measureText(txt);
    g.textBaseline = 'alphabetic';
    g.fillText(txt, cx*k - m.width/2, inkTop*k + (m.actualBoundingBoxAscent||size*k*0.72));
  };
  line(nTxt,           CARD.nSize,   800, 'Montserrat', gold,      CARD.nTop);
  line('acts of good', CARD.aogSize, 700, 'Montserrat', '#000000', CARD.aogTop);
  line(iyTxt,          CARD.iySize,  500, 'Montserrat', '#000000', CARD.iyTop);
  line(scrTxt,         scrSize,      '',  'Great Vibes', gscr,     CARD.scrTop);"""

NEW_LINE = """  /* baseY is a BASELINE, the way the HTML card's line boxes fix a baseline, so
     the two stay in step whatever letters the string happens to contain */
  const line = (txt, size, weight, family, colour, baseY) => {
    if(!txt) return;
    g.font = f(size, weight, family);
    g.fillStyle = colour;
    const m = g.measureText(txt);
    g.textBaseline = 'alphabetic';
    g.fillText(txt, cx*k - m.width/2, baseY*k);
  };
  line(nTxt,           CARD.nSize,   800, 'Montserrat', gold,      CARD.nBase);
  line('acts of good', CARD.aogSize, 700, 'Montserrat', '#000000', CARD.aogBase);
  line(iyTxt,          CARD.iySize,  500, 'Montserrat', '#000000', CARD.iyBase);
  line(scrTxt,         scrSize,      '',  'Great Vibes', gscr,
       CARD.scrBase0 + CARD.scrBaseK*scrSize);"""

OLD_ACT = """  const base = CARD.actTop*k + (g.measureText('act').actualBoundingBoxAscent || CARD.actSize*k*0.72);"""
NEW_ACT = """  const base = CARD.actBase*k;"""


def die(m):
    print("FAILED - nothing was written.\n  " + m)
    sys.exit(1)

def sub(s, old, new, label):
    n = s.count(old)
    if n != 1:
        die("anchor matched %d times, expected exactly 1: %s" % (n, label))
    return s.replace(old, new)

def main():
    if len(sys.argv) < 2: die("usage")
    path = sys.argv[1]
    if not os.path.exists(path): die("no such file: " + path)
    s = io.open(path, encoding="utf-8").read()
    if "scrBase0" in s: die("this patch is already applied (found scrBase0).")
    tag = re.search(r'<div id="buildtag">BUILD ([0-9A-Z]+)</div>', s)
    print("  file  : %s" % path)
    print("  chars : %d" % len(s))
    print("  build : %s" % (tag.group(1) if tag else "not found"))
    s = sub(s, OLD_CARD, NEW_CARD, "the CARD block")
    s = sub(s, OLD_LINE, NEW_LINE, "the line() helper and its four calls")
    s = sub(s, OLD_ACT,  NEW_ACT,  "the act N of N baseline")
    if BUILD_BUMP and tag:
        cur = tag.group(1)
        nxt = cur[:-1] + chr(ord(cur[-1]) + 1) if cur[-1] != "Z" else cur + "A"
        s = s.replace('<div id="buildtag">BUILD %s</div>' % cur,
                      '<div id="buildtag">BUILD %s</div>' % nxt)
        print("  build : %s -> %s" % (cur, nxt))
    bak = path + ".bak"
    io.open(bak, "w", encoding="utf-8").write(io.open(path, encoding="utf-8").read())
    io.open(path, "w", encoding="utf-8").write(s)
    print("  wrote : %d chars" % len(s))
    print("\nApplied. Backup at %s" % bak)

if __name__ == "__main__":
    main()

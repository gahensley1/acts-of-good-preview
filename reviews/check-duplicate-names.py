#!/usr/bin/env python3
"""Every top-level function name in index.html, checked for duplicates.

Two functions with the same name do not error. The later declaration wins and
the earlier feature dies in silence. It has happened twice in this file:
drawAsk killed the invitation panel for nine builds, and drawPreview nearly
killed the post composer. This runs in a second; run it before every commit."""
import io,re,sys
p = sys.argv[1] if len(sys.argv)>1 else '/sessions/serene-lucid-fermat/mnt/aog-push/index.html'
s = io.open(p, encoding='utf-8').read()
blocks = re.findall(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', s, re.S)
js = '\n'.join(blocks)
js = re.sub(r'/\*.*?\*/', '', js, flags=re.S)
js = re.sub(r'(?m)^\s*//.*$', '', js)
names = {}
for m in re.finditer(r'(?m)^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(', js):
    names.setdefault(m.group(1), []).append(js.count('\n',0,m.start())+1)
dups = {k:v for k,v in names.items() if len(v)>1}
print('top-level functions: %d' % len(names))
if dups:
    print('\nDUPLICATE NAMES — the later one wins and the earlier one is dead:')
    for k,v in sorted(dups.items()): print('   %-24s declared at script lines %s' % (k, v))
    sys.exit(1)
print('no duplicates')

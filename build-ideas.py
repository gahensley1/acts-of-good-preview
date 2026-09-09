#!/usr/bin/env python3
"""
build-ideas.py — THE-IDEAS.md is where the ideas live. This puts them in the app.

    cd C:\\Users\\tony\\Documents\\aog-push
    python build-ideas.py

It reads THE-IDEAS.md, rebuilds the IDEAS list inside index.html, and says what
changed. Nothing else in index.html is touched. Run it after any edit to the
ideas file — or say what you want changed and Claude will run it.

    python build-ideas.py --check     read and report, write nothing

This never touches the network and never ships to anybody's phone. It is a tool
on this computer that builds the app.
"""
import io, json, os, re, sys, collections

HERE  = os.path.dirname(os.path.abspath(__file__))
IDEAS_MD = os.path.join(HERE, 'THE-IDEAS.md')
ART_JSON = os.path.join(HERE, 'ideas-art.json')
APP      = os.path.join(HERE, 'index.html')

WHEN = ['Today', 'This weekend', 'A week or two', 'Needs a month']
SIZE = ['An hour', 'A weekend', 'A village']
COST = ['Free', 'Under $20', '$20 or more']
KEYS = ('when', 'size', 'cost', 'fact', 'why', 'tag', 'needs', 'art')


def die(msg):
    print('\nSTOPPED. Nothing was changed.\n  ' + msg + '\n')
    sys.exit(1)


def read_ideas():
    """THE-IDEAS.md -> a list of dicts, in file order."""
    if not os.path.exists(IDEAS_MD):
        die('Cannot find %s' % IDEAS_MD)
    lines = io.open(IDEAS_MD, encoding='utf-8').read().split('\n')

    ideas, cat, cur, in_needs, seen = [], None, None, False, {}
    preamble = True

    for n, raw in enumerate(lines, 1):
        line = raw.rstrip()

        # the preamble's own examples are indented; never read them as data
        if preamble:
            if line.startswith('# ') and 'ideas library' not in line.lower():
                preamble = False
            elif line.startswith('---') and n > 40:
                preamble = False
            else:
                continue

        if line.startswith('# '):
            cat, cur, in_needs = line[2:].strip(), None, False
            continue
        if line.startswith('## '):
            if not cat:
                die('Line %d: "%s" is not under a category heading.' % (n, line[3:]))
            cur = {'t': line[3:].strip(), 'c': cat, 'needs': [], 'line': n}
            if cur['t'] in seen:
                die('Line %d: two ideas are both called "%s" (the other is line %d).'
                    % (n, cur['t'], seen[cur['t']]))
            seen[cur['t']] = n
            ideas.append(cur)
            in_needs = False
            continue
        if cur is None or not line.strip():
            continue

        if in_needs and line.lstrip().startswith('-'):
            cur['needs'].append(line.lstrip()[1:].strip())
            continue

        m = re.match(r'^\s*([a-z]+)\s*:\s*(.*)$', line)
        if not m:
            continue
        k, v = m.group(1), m.group(2).strip()
        if k not in KEYS:
            die('Line %d: "%s:" is not something an idea has. Use one of: %s'
                % (n, k, ', '.join(KEYS)))
        in_needs = (k == 'needs')
        if k != 'needs':
            cur[k] = v

    for i in ideas:
        where = '"%s" (line %d)' % (i['t'], i['line'])
        for req in ('when', 'size', 'fact'):
            if not i.get(req):
                die('%s has no %s.' % (where, req))
        if i['when'] not in WHEN:
            die('%s: when is "%s". It must be one of: %s' % (where, i['when'], ' / '.join(WHEN)))
        if i['size'] not in SIZE:
            die('%s: size is "%s". It must be one of: %s' % (where, i['size'], ' / '.join(SIZE)))
        if i.get('cost') and i['cost'] not in COST:
            die('%s: cost is "%s". It must be blank or one of: %s' % (where, i['cost'], ' / '.join(COST)))
    return ideas


def to_js(ideas, art):
    q = lambda s: json.dumps(s or '', ensure_ascii=False)
    out = ['const IDEAS = [']
    for i in ideas:
        a = art.get(i['t'], '')
        out.append(' {t:%s,l:%s,s:%s,c:%s,cost:%s,' % (
            q(i['t']), q(i['when']), q(i['size']), q(i['c']), q(i.get('cost'))))
        out.append('  d:%s,' % q(i['fact']))
        out.append('  why:%s,tag:%s,needs:[%s],art:%s},' % (
            q(i.get('why')), q(i.get('tag')),
            ','.join(q(x) for x in i['needs']), q(a)))
    out.append('];')
    return '\n'.join(out)


def splice(html, js):
    """Replace the IDEAS array and nothing else, by counting brackets."""
    i = html.find('const IDEAS')
    if i < 0:
        die('index.html has no IDEAS list in it.')
    start = html.index('[', i)
    depth, j = 0, start
    while j < len(html):
        ch = html[j]
        # comments first: an apostrophe inside one ("Jessica's edit") used to be
        # read as the start of a string and ate the rest of the file
        if ch == '/' and html[j+1:j+2] == '*':
            j = html.index('*/', j) + 2
            continue
        if ch == '/' and html[j+1:j+2] == '/':
            j = html.index('\n', j) + 1
            continue
        if ch in '"\'':                       # skip over strings
            quote, j = ch, j + 1
            while j < len(html) and html[j] != quote:
                j += 2 if html[j] == '\\' else 1
        elif ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                break
        j += 1
    else:
        die('Could not find the end of the IDEAS list in index.html.')
    end = html.index(';', j) + 1
    return html[:i] + js + html[end:]


def main():
    check = '--check' in sys.argv
    ideas = read_ideas()
    art = json.load(open(ART_JSON, encoding='utf-8')) if os.path.exists(ART_JSON) else {}

    for t in art:
        if t not in [i['t'] for i in ideas]:
            print('  note: ideas-art.json has a picture for "%s", which is no longer an idea.' % t)

    cats = collections.Counter(i['c'] for i in ideas)
    costs = collections.Counter(i.get('cost') or '(not set)' for i in ideas)
    print('\n%d ideas read from THE-IDEAS.md' % len(ideas))
    print('  categories: ' + ' · '.join('%s %d' % (c, n) for c, n in cats.items()))
    print('  cost:       ' + ' · '.join('%s %d' % (c, n) for c, n in costs.items()))
    blank = [i['t'] for i in ideas if not i.get('cost')]
    if blank:
        print('  %d with no cost set: %s' % (len(blank), ', '.join(blank[:4])))

    html = io.open(APP, encoding='utf-8').read()
    new = splice(html, to_js(ideas, art))
    if new == html:
        print('\nThe app already matches the file. Nothing to do.\n')
        return
    if check:
        print('\n--check: the app does NOT match the file. Run it without --check to fix that.\n')
        return
    io.open(APP + '.bak', 'w', encoding='utf-8').write(html)
    io.open(APP, 'w', encoding='utf-8').write(new)
    print('\nindex.html updated. The old one is index.html.bak.')
    print('Remember to copy it to the mirror folder and bump the build mark.\n')


if __name__ == '__main__':
    main()

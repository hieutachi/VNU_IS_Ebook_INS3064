#!/usr/bin/env node
/**
 * check-project-paths.js — the project layout is flat, and every file must say so.
 *
 * schedule.md and project/spec.md fix one structure: all .php pages at the
 * project root, with includes/ css/ js/ sql/ uploads/ as the only subfolders.
 * Once fifteen chapters, fifteen exercises and fifteen homework sheets are
 * written by hand, the drift is guaranteed: one sheet says `../includes/db.php`,
 * another invents `admin/dashboard.php`, and a student following both gets a
 * "failed to open stream" they cannot debug.
 *
 * This scans every PHP snippet in every teaching file and rejects:
 *   1. any `../` in a require/include/href/src/action path
 *   2. any require/include of includes/... not written as __DIR__ . '/includes/...'
 *   3. any path that implies a directory outside the five allowed ones
 *
 * Only real PHP/HTML code is scanned: a fence state machine locates the fenced
 * blocks, and prose mentions of a path are ignored.
 *
 *   node _tools/check-project-paths.js
 *
 * Non-destructive: reads only. Exit 1 on any violation.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['ebook', 'slides', 'exercises', 'homework', 'exams', 'project', 'examples'];
const ALLOWED_DIRS = new Set(['includes', 'css', 'js', 'sql', 'uploads']);

let fail = 0;
const bad = (msg) => { console.log(`BAD  ${msg}`); fail = 1; };

const walk = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '_archive', '.git'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

/** Yield { lang, startLine, body } for every fenced code block in a markdown file. */
function fences(text) {
  const lines = text.split(/\r?\n/);
  const res = [];
  let cur = null;
  lines.forEach((line, i) => {
    const m = line.match(/^\s*```+\s*([A-Za-z0-9+#-]*)/);
    if (m) {
      if (cur === null) cur = { lang: (m[1] || '').toLowerCase(), start: i + 2, body: [] };
      else { res.push({ lang: cur.lang, startLine: cur.start, body: cur.body.join('\n') }); cur = null; }
      return;
    }
    if (cur) cur.body.push(line);
  });
  if (cur) res.push({ lang: cur.lang, startLine: cur.start, body: cur.body.join('\n') });
  return res;
}

const CODE_LANGS = new Set(['php', 'html', 'js', 'javascript', 'css', '']);

let filesScanned = 0;
let blocksScanned = 0;
const seenPaths = new Set();

for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    const isMd = file.endsWith('.md');
    const isCode = /\.(php|html|js|css)$/.test(file);
    if (!isMd && !isCode) continue;
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const text = fs.readFileSync(file, 'utf8');
    filesScanned++;

    const blocks = isMd
      ? fences(text).filter((b) => CODE_LANGS.has(b.lang))
      : [{ lang: path.extname(file).slice(1), startLine: 1, body: text }];

    for (const b of blocks) {
      blocksScanned++;
      b.body.split('\n').forEach((line, k) => {
        const lineNo = b.startLine + k;
        const at = `${rel}:${lineNo}`;

        // 1. no ../ anywhere in code
        if (/\.\.\//.test(line)) bad(`${at}  uses "../" — the project layout is flat\n         ${line.trim()}`);

        // 2. require/include of a project include must be __DIR__-anchored
        const inc = line.match(/\b(?:require|require_once|include|include_once)\b\s*\(?\s*([^;)]+)/);
        if (inc) {
          const arg = inc[1].trim();
          if (/includes\//.test(arg) && !/__DIR__\s*\.\s*['"]\/includes\//.test(arg)) {
            bad(`${at}  include of includes/ is not __DIR__-anchored\n         ${line.trim()}`);
          }
        }

        // 3. any dir/ referenced from an attribute or include must be an allowed one
        const re = /(?:href|src|action|from)\s*=\s*["']([^"'#?]+)["']|['"]([A-Za-z0-9_.\-/]*\/[A-Za-z0-9_.\-/]+)['"]/g;
        let m;
        while ((m = re.exec(line))) {
          const p = m[1] || m[2];
          if (!p || /^(?:https?:|mailto:|data:|\/\/|#|\$)/.test(p)) continue;
          if (p.startsWith('/')) continue;                 // absolute URL path: fine
          const first = p.split('/')[0];
          if (!p.includes('/') || first === '' || first === '.') continue;
          seenPaths.add(p);
          if (!ALLOWED_DIRS.has(first)) {
            bad(`${at}  "${p}" implies a folder "${first}/" that the layout does not have\n         ${line.trim()}`);
          }
        }
      });
    }
  }
}

console.log(`scanned ${filesScanned} file(s), ${blocksScanned} code block(s)`);
console.log(`${seenPaths.size} distinct relative path(s) referenced; allowed roots: ${[...ALLOWED_DIRS].join(' ')}`);
console.log();
console.log(fail ? 'PROJECT-PATHS FAIL - see BAD lines' : 'PROJECT-PATHS PASS');
process.exit(fail);

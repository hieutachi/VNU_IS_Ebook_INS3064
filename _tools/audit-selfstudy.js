#!/usr/bin/env node
/**
 * audit-selfstudy.js — measure the self-study affordances of the INS3064 package.
 *
 * Why this exists: inline PowerShell one-liners lose their output, and regex-based
 * fence stripping gives false positives — a `<details>` shown *as an example*
 * inside a code fence gets counted as a real one. In the reference package that
 * mistake inflated the numbers badly (2,104 vs 445 real matches; 31.5 vs 13.6 per
 * chapter). This walks every file line by line with a proper fence state machine,
 * so "inside code" and "real markup" never get mixed up.
 *
 * Writes to stdout AND to _tools/audit-selfstudy.txt.
 *
 *   node _tools/audit-selfstudy.js
 *
 * Non-destructive: reads only. Exit 1 on an integrity failure; the measurement
 * sections never fail the run.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'audit-selfstudy.txt');

// Raw source material kept for history is not part of the taught package.
const SKIP_DIRS = new Set([
  'node_modules', '_archive', 'backups', '.git',
  'Vietnamese', 'English', 'Slide', 'Worksheet',
]);

const lines = [];
const say = (s = '') => { lines.push(s); console.log(s); };

/** Split a file into { code, prose } line arrays using a fence state machine. */
function splitFences(text) {
  const code = [];
  const prose = [];
  let inFence = false;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      code.push(line);
      continue;
    }
    (inFence ? code : prose).push(line);
  }
  return { code, prose, unclosed: inFence };
}

/**
 * Strip inline `code spans` so a mention of `<details>` in prose is not counted.
 * Must run PER LINE — running it on joined text lets a backtick on one line pair
 * with a backtick many lines later and swallow real markup in between.
 */
const stripInline = (s) => s
  .split('\n')
  .map((line) => line.replace(/`[^`]*`/g, ''))
  .join('\n');

const count = (hay, needle) => hay.split(needle).length - 1;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

const allFiles = walk(ROOT);
const mdFiles = allFiles.filter((f) => f.endsWith('.md'));
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

// ---------------------------------------------------------------- 1. integrity
say('== 1. markdown integrity =========================================');

const failures = [];
for (const f of mdFiles.sort()) {
  const buf = fs.readFileSync(f);
  const text = buf.toString('utf8');
  const { prose, unclosed } = splitFences(text);
  const body = stripInline(prose.join('\n'));

  const problems = [];
  if (unclosed) problems.push('unclosed code fence');
  const dOpen = count(body, '<details>');
  const dClose = count(body, '</details>');
  if (dOpen !== dClose) problems.push(`details ${dOpen}/${dClose}`);
  const sOpen = count(body, '<summary>');
  const sClose = count(body, '</summary>');
  if (sOpen !== sClose) problems.push(`summary ${sOpen}/${sClose}`);
  // Agent artefacts only. TODO/FIXME can be deliberate teaching content.
  const stray = body.match(/<additional-note|<\/additional-note|<thinking|<\/thinking/g);
  if (stray) problems.push(`stray tag ${stray.join(',')}`);
  if (buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) problems.push('BOM');
  if (text.includes('\uFFFD')) problems.push('U+FFFD');

  if (problems.length) failures.push(`FAIL ${rel(f)} — ${problems.join('; ')}`);
}
if (failures.length) failures.forEach(say);
else {
  say(`clean: ${mdFiles.length} markdown files — fences closed, details/summary`
    + ' balanced, no agent artefacts, no BOM, no U+FFFD');
}

// ------------------------------------------------------------- 2. self-study
say('');
say('== 2. self-study affordances =====================================');

function tally(dirName, opts = {}) {
  const dir = path.join(ROOT, dirName);
  if (!fs.existsSync(dir)) return null;
  const files = walk(dir).filter((f) => f.endsWith('.md')).sort();
  let words = 0;
  const rows = [];
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    const { prose } = splitFences(text);
    const body = stripInline(prose.join('\n'));
    const w = text.trim().split(/\s+/).filter(Boolean).length;
    words += w;
    rows.push({
      name: opts.byParent ? path.basename(path.dirname(f)) : path.basename(f),
      words: w,
      lines: text.split(/\r?\n/).length,
      details: count(body, '<details>'),
      tryIt: count(text, 'Try It Yourself'),
      answers: /^##\s+(Self-Check|Answer Key)/m.test(text),
      errTable: /^#+ .*(common error|what (?:the browser|php) shows|error and how to fix)/im.test(text),
      canvas: count(text, 'canvases/buoi-'),
      phpFences: (text.match(/^\s*```php/gm) || []).length,
      sqlFences: (text.match(/^\s*```sql/gm) || []).length,
    });
  }
  return { files, words, rows };
}

const layers = ['ebook', 'exercises', 'homework', 'slides', 'exams', 'project', 'references'];
say('layer         files  words    details  tryIt  answers  errTable');
let grandWords = 0;
const store = {};
for (const l of layers) {
  const t = tally(l, { byParent: l === 'exercises' || l === 'homework' });
  if (!t) continue;
  store[l] = t;
  grandWords += t.words;
  const d = t.rows.reduce((a, r) => a + r.details, 0);
  const ti = t.rows.reduce((a, r) => a + r.tryIt, 0);
  const an = t.rows.filter((r) => r.answers).length;
  const et = t.rows.filter((r) => r.errTable).length;
  say(l.padEnd(13) + ' '
    + String(t.files.length).padEnd(6) + ' '
    + String(t.words).padEnd(8) + ' '
    + String(d).padEnd(8) + ' '
    + String(ti).padEnd(6) + ' '
    + `${an}/${t.files.length}`.padEnd(8) + ' '
    + `${et}/${t.files.length}`);
}
say(`TOTAL words across teaching layers = ${grandWords}`);

// -------------------------------------------------------------- 3. per chapter
say('');
say('== 3. ebook per chapter ==========================================');
if (store.ebook) {
  say('chapter                                      lines  words   det  try  php  sql  cvLink');
  for (const r of store.ebook.rows) {
    say(r.name.padEnd(44) + ' '
      + String(r.lines).padEnd(6) + ' '
      + String(r.words).padEnd(7) + ' '
      + String(r.details).padEnd(4) + ' '
      + String(r.tryIt).padEnd(4) + ' '
      + String(r.phpFences).padEnd(4) + ' '
      + String(r.sqlFences).padEnd(4) + ' '
      + r.canvas);
  }
  const n = store.ebook.rows.length || 1;
  const avg = (k) => (store.ebook.rows.reduce((a, r) => a + r[k], 0) / n).toFixed(1);
  say(`AVG per chapter: words=${avg('words')} details=${avg('details')} tryIt=${avg('tryIt')} php=${avg('phpFences')}`);
}

// ------------------------------------------------------------- 4. exercises
say('');
say('== 4. exercises: answer key + section order ======================');
for (const f of walk(path.join(ROOT, 'exercises')).filter((f) => f.endsWith('.md')).sort()) {
  const text = fs.readFileSync(f, 'utf8');
  const { prose } = splitFences(text);
  const heads = prose.filter((l) => /^## /.test(l)).map((l) => l.replace(/^##\s+/, ''));
  const iSelf = heads.findIndex((h) => /^Self-Check/.test(h));
  const iChk = heads.findIndex((h) => /^Checklist/.test(h));
  const order = iSelf >= 0 && iChk >= 0 && iSelf < iChk ? 'ok' : 'ORDER?';
  const body = stripInline(prose.join('\n'));
  say(path.basename(path.dirname(f)).padEnd(12)
    + ' details=' + String(count(body, '<details>')).padEnd(3)
    + ' selfCheck=' + (iSelf >= 0 ? 'yes' : 'NO ')
    + ' order=' + order.padEnd(7)
    + ' heads=' + heads.length);
}

// ----------------------------------------------------------- 5. canvas decks
say('');
say('== 5. canvas decks ===============================================');
const canvasDir = path.join(ROOT, 'canvases');
if (fs.existsSync(canvasDir)) {
  let tSlides = 0;
  let tDiag = 0;
  for (const f of walk(canvasDir).filter((x) => x.endsWith('.tsx')).sort()) {
    const text = fs.readFileSync(f, 'utf8');
    const slides = count(text, '<PresentationSlide');
    const diag = (text.match(/^function [A-Z]/gm) || []).length;
    const svg = count(text, '<svg');
    tSlides += slides;
    tDiag += diag;
    say(path.basename(f).padEnd(26)
      + ' slides=' + String(slides).padEnd(4)
      + ' diagramFns=' + String(diag).padEnd(4)
      + ' svg=' + String(svg).padEnd(4)
      + ' KB=' + (fs.statSync(f).size / 1024).toFixed(1));
  }
  say(`TOTAL slides=${tSlides} diagramFns=${tDiag}`);
}

// ------------------------------------------------------------ 6. PHP vs SQL mix
say('');
say('== 6. code fence language mix ====================================');
const fenceLangs = new Map();
for (const f of mdFiles) {
  const text = fs.readFileSync(f, 'utf8');
  for (const m of text.matchAll(/^\s*```+\s*([A-Za-z0-9+#-]+)\s*$/gm)) {
    const lang = m[1].toLowerCase();
    fenceLangs.set(lang, (fenceLangs.get(lang) || 0) + 1);
  }
}
const totalFences = [...fenceLangs.values()].reduce((a, b) => a + b, 0);
for (const [lang, n] of [...fenceLangs].sort((a, b) => b[1] - a[1])) {
  say(lang.padEnd(14) + String(n).padStart(5) + '  ' + (100 * n / (totalFences || 1)).toFixed(1) + '%');
}
say(`TOTAL opening fences with a language = ${totalFences}`);

say('');
say(failures.length ? `AUDIT: ${failures.length} integrity failure(s)` : 'AUDIT: integrity PASS');

fs.writeFileSync(OUT, lines.join('\n') + '\n', 'utf8');
console.log(`\n(written to ${rel(OUT)})`);
process.exit(failures.length ? 1 : 0);

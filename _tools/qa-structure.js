#!/usr/bin/env node
/**
 * qa-structure.js — the package must have every file the docs promise.
 *
 * For each of the 15 sessions it checks the five matching pieces of material
 * named in README.md ("Where everything lives") and schedule.md ("Material for
 * each session"), then checks the one-off files. Nothing is written.
 *
 *   node _tools/qa-structure.js
 *
 * Exit 1 if anything promised is missing or misnamed.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SESSIONS = 15;

/** Slugs are fixed: the ebook, slides and canvas file names must agree. */
const SLUGS = [
  'introduction-to-php',
  'programming-with-php',
  'dynamic-websites-and-forms',
  'introduction-to-mysql',
  'introduction-to-sql',
  'database-design',
  'advanced-sql',
  'review-and-midterm',
  'error-handling-and-debugging',
  'php-with-mysql',
  'programming-techniques',
  'web-application-development',
  'cookies-and-sessions',
  'security-methods',
  'jquery-and-ajax',
];

let fail = 0;
const bad = (msg) => { console.log(`BAD  ${msg}`); fail = 1; };
const nn = (i) => String(i).padStart(2, '0');
const has = (rel) => fs.existsSync(path.join(ROOT, rel));

console.log('== 1. slug list length ============================================');
SLUGS.length === SESSIONS
  ? console.log(`ok   ${SESSIONS} slugs`)
  : bad(`slug list has ${SLUGS.length} entries, expected ${SESSIONS}`);

console.log('== 2. five files per session =======================================');
for (let i = 1; i <= SESSIONS; i++) {
  const n = nn(i);
  const slug = SLUGS[i - 1];
  const expected = [
    `ebook/${n}-${slug}.md`,
    `slides/${n}-${slug}.md`,
    `canvases/buoi-${n}.canvas.tsx`,
    `exercises/session-${n}/exercise.md`,
    `homework/session-${n}/homework.md`,
  ];
  const missing = expected.filter((r) => !has(r));
  if (missing.length) missing.forEach((r) => bad(`missing ${r}`));
  else console.log(`ok   session ${n}  ${slug}`);
}

console.log('== 3. no stray session files ======================================');
// Anything numbered in ebook/ or slides/ must match the slug for that number.
for (const dir of ['ebook', 'slides']) {
  const p = path.join(ROOT, dir);
  if (!fs.existsSync(p)) { bad(`missing directory ${dir}/`); continue; }
  for (const f of fs.readdirSync(p).filter((x) => x.endsWith('.md')).sort()) {
    const m = f.match(/^(\d\d)-(.+)\.md$/);
    if (!m) {
      if (!/^appendix-[a-z]-/.test(f)) bad(`${dir}/${f} is neither NN-slug.md nor appendix-x-*.md`);
      continue;
    }
    const i = Number(m[1]);
    if (i < 1 || i > SESSIONS) { bad(`${dir}/${f} has session number ${i}, outside 1..${SESSIONS}`); continue; }
    if (m[2] !== SLUGS[i - 1]) bad(`${dir}/${f} slug is "${m[2]}", expected "${SLUGS[i - 1]}"`);
  }
}
// exercises/ and homework/ must hold exactly session-01..session-15.
for (const [dir, leaf] of [['exercises', 'exercise.md'], ['homework', 'homework.md']]) {
  const p = path.join(ROOT, dir);
  if (!fs.existsSync(p)) { bad(`missing directory ${dir}/`); continue; }
  const found = fs.readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
  const want = Array.from({ length: SESSIONS }, (_, k) => `session-${nn(k + 1)}`);
  for (const extra of found.filter((x) => !want.includes(x))) bad(`unexpected ${dir}/${extra}/`);
  for (const d of found.filter((x) => want.includes(x))) {
    const inside = fs.readdirSync(path.join(p, d)).filter((x) => x.endsWith('.md'));
    if (!inside.includes(leaf)) bad(`${dir}/${d}/ has no ${leaf}`);
  }
}
if (!fail) console.log('ok   every numbered file matches its slug');

console.log('== 4. one-off files ===============================================');
const ONE_OFF = [
  'README.md',
  'schedule.md',
  'package.json',
  '.gitignore',
  '.gitattributes',
  'references/resources.md',
  'ebook/appendix-a-deployment-and-technology-choices.md',
  'project/spec.md',
  'project/milestones.md',
  'project/rubric.md',
  'exams/midterm/sample-exam.md',
  'exams/midterm/sample-solution.md',
  'exams/midterm/rubric.md',
  'exams/final/sample-exam.md',
  'exams/final/sample-solution.md',
  'exams/final/rubric.md',
  'examples/club-hub/README.md',
  '.github/workflows/qa.yml',
];
for (const r of ONE_OFF) (has(r) ? console.log(`ok   ${r}`) : bad(`missing ${r}`));

console.log('== 5. no placeholder files left ===================================');
// The scaffold wrote "TODO" stubs. None may survive into a finished package.
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '_archive', 'Vietnamese', 'English', 'Slide', 'Worksheet', '.git'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};
const stubs = walk(ROOT)
  .filter((f) => f.endsWith('.md') || f.endsWith('.tsx'))
  .filter((f) => {
    const t = fs.readFileSync(f, 'utf8');
    return t.trim().length < 400 || /^<!--\s*(TODO|PLACEHOLDER)/im.test(t);
  })
  .map((f) => path.relative(ROOT, f).replace(/\\/g, '/'));
if (stubs.length) {
  console.log(`     ${stubs.length} file(s) still short or marked TODO:`);
  stubs.forEach((s) => console.log(`     PENDING  ${s}`));
} else {
  console.log('ok   no stubs remain');
}

console.log();
console.log(fail ? 'STRUCTURE FAIL - see BAD lines' : 'STRUCTURE PASS (PENDING lines are informational)');
process.exit(fail);

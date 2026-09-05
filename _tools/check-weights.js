#!/usr/bin/env node
/**
 * check-weights.js — the numbers a student is graded on must add up.
 *
 * Three independent sums, all read from the files that students actually see:
 *   1. schedule.md assessment table            -> 100
 *   2. schedule.md milestone points            -> 40  (= the project weight)
 *   3. project/rubric.md criterion points      -> 40
 *   4. each exam rubric                        -> its own stated total
 * It also checks that README.md quotes the same four weights as schedule.md,
 * because those two files are the ones people read first and they drift apart.
 *
 *   node _tools/check-weights.js
 *
 * Non-destructive: reads only. Exit 1 on any mismatch.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = (rel) => {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
};

let fail = 0;
const bad = (msg) => { console.log(`BAD  ${msg}`); fail = 1; };
const ok = (msg) => console.log(`ok   ${msg}`);

/** Split a markdown file into prose and code, so example tables in fences are ignored. */
function proseOf(text) {
  const out = [];
  let inFence = false;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) { inFence = !inFence; continue; }
    if (!inFence) out.push(line);
  }
  return out;
}

console.log('== 1. schedule.md assessment weights ==============================');
const schedule = read('schedule.md');
if (!schedule) {
  bad('schedule.md not found');
} else {
  const prose = proseOf(schedule);
  const rows = prose.filter((l) => /^\|[^|]+\|\s*\d{1,3}%\s*\|/.test(l));
  const weights = rows.map((l) => ({
    name: l.split('|')[1].trim(),
    pct: Number(l.match(/\|\s*(\d{1,3})%\s*\|/)[1]),
  }));
  const total = weights.reduce((a, w) => a + w.pct, 0);
  weights.forEach((w) => console.log(`     ${String(w.pct).padStart(3)}%  ${w.name}`));
  console.log(`     ----  ${weights.map((w) => w.pct).join(' + ')} = ${total}`);
  total === 100 ? ok('assessment weights sum to 100') : bad(`assessment weights sum to ${total}, expected 100`);
  weights.length === 4 ? ok('4 assessment components') : bad(`${weights.length} assessment components, expected 4`);

  console.log('== 2. schedule.md milestone points ================================');
  const ms = prose
    .map((l) => l.match(/^\|\s*(M\d)\s*\|[^|]*\|[^|]*\|\s*(\d{1,2})\s*\|/))
    .filter(Boolean)
    .map((m) => ({ id: m[1], pts: Number(m[2]) }));
  const msTotal = ms.reduce((a, m) => a + m.pts, 0);
  console.log(`     ${ms.map((m) => `${m.id}=${m.pts}`).join('  ')}`);
  console.log(`     ${ms.map((m) => m.pts).join(' + ')} = ${msTotal}`);
  ms.length === 8 ? ok('8 milestones') : bad(`${ms.length} milestone rows, expected 8`);
  const projectWeight = (weights.find((w) => /project/i.test(w.name)) || {}).pct;
  msTotal === projectWeight
    ? ok(`milestone points (${msTotal}) equal the project weight (${projectWeight}%)`)
    : bad(`milestone points sum to ${msTotal} but the project is worth ${projectWeight}%`);

  console.log('== 3. README.md agrees with schedule.md ===========================');
  const readme = read('README.md');
  if (!readme) bad('README.md not found');
  else {
    for (const w of weights) {
      readme.includes(`${w.pct}%`)
        ? ok(`README quotes ${w.pct}% (${w.name})`)
        : bad(`README never mentions ${w.pct}% for "${w.name}"`);
    }
  }
}

console.log('== 4. project/rubric.md ===========================================');
const rubric = read('project/rubric.md');
if (!rubric) {
  bad('project/rubric.md not found');
} else {
  // Criterion rows end in a points column: | ... | 6 |
  const pts = proseOf(rubric)
    .map((l) => l.match(/^\|(?!\s*-+)(?![^|]*(?:Points|Weight|Criterion)\s*\|)[^|]+\|.*\|\s*(\d{1,3})\s*\|\s*$/))
    .filter(Boolean)
    .map((m) => Number(m[1]));
  const total = pts.reduce((a, b) => a + b, 0);
  console.log(`     ${pts.length} criterion row(s): ${pts.join(' + ')} = ${total}`);
  const stated = (rubric.match(/\b(?:out of|Total[^0-9]{0,20})(\d{2,3})\b/i) || [])[1];
  if (stated === undefined) {
    console.log('     no "Total"/"out of" figure stated - skipping the comparison');
  } else if (Number(stated) === total) {
    ok(`criterion points (${total}) match the stated total (${stated})`);
  } else {
    bad(`criterion points sum to ${total} but the file states ${stated}`);
  }
}

console.log('== 5. exam rubrics ================================================');
for (const rel of ['exams/midterm/rubric.md', 'exams/final/rubric.md']) {
  const text = read(rel);
  if (!text) { bad(`${rel} not found`); continue; }
  const pts = proseOf(text)
    .map((l) => l.match(/^\|(?!\s*-+)(?![^|]*(?:Points|Marks|Weight)\s*\|)[^|]+\|.*\|\s*(\d{1,3})(?:\.\d)?\s*\|\s*$/))
    .filter(Boolean)
    .map((m) => Number(m[1]));
  const total = pts.reduce((a, b) => a + b, 0);
  const stated = (text.match(/\b(?:out of|Total[^0-9]{0,20})(\d{1,3})\b/i) || [])[1];
  console.log(`     ${rel}: ${pts.length} row(s) = ${total}${stated ? `, stated ${stated}` : ''}`);
  if (stated !== undefined && Number(stated) !== total) {
    bad(`${rel}: rows sum to ${total} but the file states ${stated}`);
  }
}

console.log();
console.log(fail ? 'WEIGHTS FAIL - see BAD lines' : 'WEIGHTS PASS');
process.exit(fail);

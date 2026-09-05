#!/usr/bin/env node
/* INS3064 canvas QA sweep.

   Nine checks over canvases/*.canvas.tsx. There is no compiler for the
   `qoder/canvas` runtime on this machine, so a deck can never be type-checked
   here — these structural checks are the only gate. Exit 1 if any hard check
   fails; SMALL-TYPE and UNUSED-IMPORT stay advisory.

   Usage, from anywhere:
     node _tools/qa-canvases.js [canvasesDir]
   Default canvasesDir is ../canvases relative to this file. */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { stripLiterals } = require(path.join(__dirname, "strip-literals.js"));

const dir = path.resolve(process.argv[2] || path.join(__dirname, "..", "canvases"));
const files = fs.readdirSync(dir).filter((n) => n.endsWith(".canvas.tsx")).sort();
const src = new Map(files.map((f) => [f, fs.readFileSync(path.join(dir, f), "utf8")]));

let fail = 0;
const bad = (msg) => { console.log(msg); fail = 1; };
const count = (s, re) => (s.match(re) || []).length;

console.log("== 1. bracket balance ==============================================");
for (const f of files) {
  // Code only: string literals and comments are blanked first, so prose such as
  // notes="...1) False..." or a "{" inside a label cannot skew the count.
  let p = 0, b = 0, k = 0;
  for (const c of stripLiterals(src.get(f))) {
    if (c === "(") p++; else if (c === ")") p--;
    else if (c === "{") b++; else if (c === "}") b--;
    else if (c === "[") k++; else if (c === "]") k--;
  }
  const line = `${f}  paren=${p} brace=${b} brk=${k}`;
  if (p || b || k) bad("BAD  " + line); else console.log("ok   " + line);
}

console.log("== 2. every diagram function is referenced by a slide ===============");
for (const f of files) {
  const s = src.get(f);
  for (const m of s.matchAll(/^function ([A-Za-z0-9_]+)/gm)) {
    if (!s.includes(`<${m[1]} `) && !s.includes(`<${m[1]}/>`) && !s.includes(`<${m[1]} />`)) {
      bad(`UNUSED-FN  ${f} :: ${m[1]}`);
    }
  }
}

console.log("== 3. unused named imports =========================================");
for (const f of files) {
  const s = src.get(f);
  const block = s.match(/^import \{([\s\S]*?)\} from "qoder\/canvas";/m);
  if (!block) continue;
  for (const raw of block[1].split(",")) {
    const c = raw.trim();
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(c)) continue;
    // Used as a JSX tag (<Card ...) or called as a function (canvasImage(...)).
    const n = count(s, new RegExp(`<${c}([ />}]|$)|(^|[^A-Za-z0-9_])${c}\\(`, "gm"));
    if (n === 0) console.log(`UNUSED-IMPORT  ${f} :: ${c}`);
  }
}

console.log("== 4. svg accessibility (role=img + aria-label per svg) =============");
for (const f of files) {
  const s = src.get(f);
  const n = count(s, /<svg/g);
  if (!n) continue;
  const r = count(s, /role="img"/g);
  const a = count(s, /aria-label/g);
  if (r < n) bad(`MISSING-ROLE  ${f}  svg=${n} role=${r}`);
  if (a < n) bad(`MISSING-ARIA  ${f}  svg=${n} aria=${a}`);
}

console.log("== 5. type floor: no fontSize below 11 =============================");
for (const f of files) {
  for (const m of src.get(f).matchAll(/fontSize="([0-9.]+)"/g)) {
    if (parseFloat(m[1]) < 11) console.log(`SMALL-TYPE  ${f}  ${m[1]}px`);
  }
}

console.log("== 6. dangling url(#id) references =================================");
for (const f of files) {
  const s = src.get(f);
  const defs = new Set([...s.matchAll(/id="([^"]*)"/g)].map((m) => m[1]));
  for (const ref of new Set([...s.matchAll(/url\(#([^)]*)\)/g)].map((m) => m[1]))) {
    if (!defs.has(ref)) bad(`DANGLING  ${f} :: url(#${ref})`);
  }
}

console.log("== 7. duplicate svg defs ids inside one file =======================");
for (const f of files) {
  const seen = new Set(), dup = new Set();
  const re = /<(?:marker|linearGradient|radialGradient|pattern|filter|clipPath) id="([^"]*)"/g;
  for (const m of src.get(f).matchAll(re)) {
    if (seen.has(m[1])) dup.add(m[1]); else seen.add(m[1]);
  }
  if (dup.size) bad(`DUP-ID  ${f} :: ${[...dup].map((d) => `id="${d}"`).join(" ")}`);
}

console.log("== 8. slide ids: unique per deck, non-empty =========================");
for (const f of files) {
  const ids = [...src.get(f).matchAll(/<PresentationSlide[^>]*\bid="([^"]*)"/g)].map((m) => m[1]);
  const slides = count(src.get(f), /<PresentationSlide/g);
  if (slides === 0) continue;
  if (ids.length < slides) bad(`MISSING-SLIDE-ID  ${f}  slides=${slides} withId=${ids.length}`);
  const seen = new Set(), dup = new Set();
  for (const id of ids) {
    if (!id.trim()) dup.add("(empty)");
    else if (seen.has(id)) dup.add(id); else seen.add(id);
  }
  if (dup.size) bad(`DUP-SLIDE-ID  ${f} :: ${[...dup].join(" ")}`);
}

console.log("== 9. non-ASCII characters inside svg (labels must be English) =====");
try {
  console.log(execFileSync(process.execPath, [path.join(__dirname, "check-svg-ascii.js"), dir],
    { encoding: "utf8" }).trimEnd());
} catch (e) {
  console.log((e.stdout || "").trimEnd());
  fail = 1;
}

console.log("== 10. estimated text width vs viewBox (labels must not run off) ===");
try {
  const out = execFileSync(process.execPath,
    [path.join(__dirname, "check-text-width.js"), ...files.map((f) => path.join(dir, f))],
    { encoding: "utf8" });
  const over = out.split(/\r?\n/).filter((l) => l.includes("OVERFLOW"));
  if (over.length) { over.forEach((l) => console.log(l)); fail = 1; }
  else console.log("every measurable label fits inside its viewBox");
} catch (e) {
  (e.stdout || "").split(/\r?\n/).filter(Boolean).forEach((l) => console.log(l));
  fail = 1;
}

console.log();
console.log(fail
  ? "QA FAIL - see BAD/MISSING/DANGLING/DUP/NON-ASCII/OVERFLOW lines"
  : "QA PASS (SMALL-TYPE and UNUSED-IMPORT lines are advisory)");
process.exit(fail);

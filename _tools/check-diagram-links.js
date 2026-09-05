#!/usr/bin/env node
/* Verify every "> 🖼 **Diagram(s):**" line in the ebook resolves to a real
   deck, a real diagram function, a slide id that exists, and a mount site.

     node _tools/check-diagram-links.js [root]

   Chapters that have no diagram line yet are reported as PENDING, not BAD, so
   this can run while the package is still being written. Exits non-zero as soon
   as a line exists but does not resolve. */
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || path.join(__dirname, ".."));
const ebookDir = path.join(root, "ebook");
const canvasDir = path.join(root, "canvases");

const decks = new Map();
function deckSource(deck) {
  if (!decks.has(deck)) {
    const p = path.join(canvasDir, `${deck}.canvas.tsx`);
    decks.set(deck, fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
  }
  return decks.get(deck);
}

const REF = /`([A-Z][\w$]*)` — slide `([^`]+)`/g;
let checked = 0;
let bad = 0;
const pending = [];

for (const file of fs.readdirSync(ebookDir).filter((f) => f.endsWith(".md")).sort()) {
  const text = fs.readFileSync(path.join(ebookDir, file), "utf8");
  const lines = text.split(/\r?\n/);
  let sawLine = false;

  lines.forEach((line, i) => {
    if (!/^> .*\*\*Diagram/.test(line)) return;
    sawLine = true;
    const deck = (line.match(/canvases\/(buoi-\d\d)\.canvas\.tsx/) || [])[1];
    const src = deck && deckSource(deck);
    if (!src) {
      console.log(`BAD  ${file}:${i + 1}  deck not found: ${deck}`);
      bad++;
      return;
    }
    let m;
    REF.lastIndex = 0;
    let found = 0;
    while ((m = REF.exec(line))) {
      const [, fn, id] = m;
      found++;
      checked++;
      const defined = new RegExp(`^function\\s+${fn}\\b`, "m").test(src);
      const mounted = new RegExp(`<${fn}\\b`).test(src);
      const slide = src.includes(`id="${id}"`);
      if (defined && mounted && slide) continue;
      console.log(
        `BAD  ${file}:${i + 1}  ${fn}: defined=${defined} mounted=${mounted} ` +
          `slide "${id}"=${slide}`
      );
      bad++;
    }
    if (found === 0) {
      console.log(`BAD  ${file}:${i + 1}  no parsable reference on the line`);
      bad++;
    }
  });

  // Appendices are not tied to a deck; numbered chapters are.
  if (!sawLine && /^\d\d-/.test(file)) pending.push(file);
}

console.log(`\nchecked ${checked} reference(s) across ${[...decks.values()].filter(Boolean).length} deck(s)`);
if (pending.length) {
  console.log(`PENDING  ${pending.length} chapter(s) have no Diagram line yet:`);
  pending.forEach((p) => console.log(`         ebook/${p}`));
}
console.log(bad ? `${bad} PROBLEM(S)` : "all diagram cross-links resolve");
process.exit(bad ? 1 : 0);

#!/usr/bin/env node
/* Fails if text inside an <svg> block contains a character that is not English.
   INS3064 is taught to international students, so every diagram label must be
   English. Typographic punctuation used in English (em dash, en dash, ellipsis,
   middot, curly quotes, arrows, check/cross marks) is allowed; Vietnamese
   diacritics and CJK are not.

   Usage: node check-svg-ascii.js [canvasesDir] */
const fs = require("fs");
const path = require("path");

const ALLOWED = new Set([
  ..."–—…·‘’“” ×°",
  ..."→←↑↓⇄✓✗●■□«»₫≈≤≥",
]);

const dir = path.resolve(process.argv[2] || path.join(__dirname, "..", "canvases"));
let fail = 0;

for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".canvas.tsx")).sort()) {
  const lines = fs.readFileSync(path.join(dir, f), "utf8").split(/\r?\n/);
  let inSvg = false;
  lines.forEach((line, i) => {
    if (line.includes("<svg")) inSvg = true;
    if (inSvg) {
      const bad = [...new Set(line.match(/[^\x00-\x7F]/g) || [])].filter((c) => !ALLOWED.has(c));
      if (bad.length) {
        console.log(`NON-ENGLISH-IN-SVG  ${f}:${i + 1}  chars: ${bad.join(" ")}`);
        fail = 1;
      }
    }
    if (line.includes("</svg>")) inSvg = false;
  });
}

console.log(fail ? "non-English characters found in svg labels" : "all svg labels are English");
process.exit(fail);

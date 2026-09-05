#!/usr/bin/env node
/* Estimate the rendered width of every <text> in a canvas deck and flag any that
   would spill outside its viewBox. Catches the one defect a bracket check cannot:
   a label that is simply too long for the diagram it lives in.

   Usage: node check-text-width.js <file.canvas.tsx> [more...]
   With no arguments it checks every deck in ../canvases. */
const fs = require("fs");
const path = require("path");

const FACTOR_SANS = 0.52;   // average glyph advance as a fraction of font-size
const FACTOR_MONO = 0.60;
const FACTOR_BOLD_BONUS = 0.03;

let files = process.argv.slice(2);
if (files.length === 0) {
  const dir = path.join(__dirname, "..", "canvases");
  files = fs.readdirSync(dir).filter((f) => f.endsWith(".canvas.tsx")).sort()
    .map((f) => path.join(dir, f));
}

let bad = 0;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split(/\r?\n/);

  // map line index -> viewBox width in force
  const vbAt = [];
  let vb = 560;
  lines.forEach((l, i) => {
    const m = l.match(/viewBox="0 0 (\d+(?:\.\d+)?) /);
    if (m) vb = parseFloat(m[1]);
    vbAt[i] = vb;
  });

  const re = /<text\b([^>]*)>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const attrs = m[1];
    let body = m[2];
    const lineNo = src.slice(0, m.index).split("\n").length;
    const width = vbAt[lineNo - 1] || 560;

    // rotated text runs along a different axis, so a horizontal fit test is meaningless
    if (/transform="[^"]*rotate\(/.test(attrs)) continue;

    // skip anything whose x is computed from a variable we cannot evaluate
    const xm = attrs.match(/\bx=["{]\s*([0-9.]+)\s*["}]/);
    const anchorM = attrs.match(/textAnchor="(\w+)"/);
    const fsM = attrs.match(/fontSize=["{]?["]?([0-9.]+)/);
    if (!xm || !fsM) continue;

    const x = parseFloat(xm[1]);
    const fontSize = parseFloat(fsM[1]);
    const anchor = anchorM ? anchorM[1] : "start";
    const mono = /fontFamily=\{MONO\}/.test(attrs) || /fontFamily=\{MONO\}/.test(body);
    const bold = /fontWeight="?\{?"?[67]00/.test(attrs) || /fontWeight="700"/.test(body);

    // visible characters only
    body = body
      .replace(/<[^>]*>/g, "")
      .replace(/\{"[^"]*"\}/g, "x")
      .replace(/\{[^}]*\}/g, "")
      .replace(/&lt;|&gt;|&amp;|&quot;|&#\d+;|&nbsp;/g, "x")
      .replace(/\s+/g, " ")
      .trim();
    if (!body) continue;

    let f = mono ? FACTOR_MONO : FACTOR_SANS;
    if (bold) f += FACTOR_BOLD_BONUS;
    const w = body.length * fontSize * f;

    let left = x;
    if (anchor === "middle") left = x - w / 2;
    else if (anchor === "end") left = x - w;
    const right = left + w;

    if (right > width + 2 || left < -2) {
      bad++;
      console.log(
        "OVERFLOW  " + path.basename(file) + ":" + lineNo +
        "  x=" + x + " fs=" + fontSize + " chars=" + body.length +
        " est=" + Math.round(left) + ".." + Math.round(right) + " > " + width +
        "\n          " + body.slice(0, 96)
      );
    }
  }
}

if (bad) {
  console.log("\n" + bad + " text element(s) estimated to overflow");
  process.exit(1);
}
console.log("no estimated text overflow");

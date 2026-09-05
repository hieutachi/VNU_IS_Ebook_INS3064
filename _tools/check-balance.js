#!/usr/bin/env node
/* Crude JSX/brace balance sanity check over every canvas deck.
   Deliberately independent of qa-canvases.js check 1: this one does NOT strip
   literals, and it also compares open tags against close tags. Two different
   crude checks disagreeing is a useful signal.

     node _tools/check-balance.js [file...]

   With no arguments it checks every deck in ../canvases. */
const fs = require('fs');
const path = require('path');

let files = process.argv.slice(2);
if (files.length === 0) {
  const dir = path.join(__dirname, '..', 'canvases');
  files = fs.readdirSync(dir).filter((f) => f.endsWith('.canvas.tsx')).sort()
    .map((f) => path.join(dir, f));
}

let fail = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  let par = 0, brace = 0, brk = 0;
  for (const ch of src) {
    if (ch === '(') par++; else if (ch === ')') par--;
    else if (ch === '{') brace++; else if (ch === '}') brace--;
    else if (ch === '[') brk++; else if (ch === ']') brk--;
  }
  const opens = (src.match(/<([A-Za-z][A-Za-z0-9.]*)(?=[\s>/])/g) || []).length;
  const selfclose = (src.match(/\/>/g) || []).length;
  const closes = (src.match(/<\/[A-Za-z][A-Za-z0-9.]*>/g) || []).length;
  const bad = par !== 0 || brace !== 0 || brk !== 0 || (opens - selfclose) !== closes;
  if (bad) fail = 1;
  console.log((bad ? 'BAD  ' : 'ok   ') + path.basename(f)
    + `  paren=${par} brace=${brace} brk=${brk}`
    + ` tags:${opens}-${selfclose}=${opens - selfclose} vs close=${closes}`);
}

console.log();
console.log(fail ? 'BALANCE FAIL - see BAD lines' : `BALANCE PASS (${files.length} file(s))`);
process.exit(fail);

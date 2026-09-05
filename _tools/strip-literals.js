/* Blank out comments and string/template literals in a TSX source so bracket
   counting only sees code. Used by check 1 of the canvas QA sweep, which would
   otherwise report false BAD lines for files whose prose contains "1)" or "{".

   The replacement keeps the original length and every newline, so line and
   column offsets in the stripped text still match the real file.

   Double quotes, backticks and comments are unambiguous and always blanked.
   Single quotes are the hard case, because a deck uses them BOTH ways:

     row(24, 'name="email"', ...)          <- a real JS string
     <H2>Naming rules - do vs don't</H2>   <- an apostrophe in JSX text

   Telling those apart properly needs a JSX parser, which is not available here.
   So a single quote only opens a string when it sits where a JS expression can
   start (just after "(", ",", "[" or "{") AND a closing quote appears later on
   the same line in a position where a value can end (before ",", ")", "]", "}"
   or end of line). Anything else is treated as an ordinary character.

   Consequence of the heuristic: a bracket inside an apostrophe-bearing prose
   run is still counted. That direction is deliberate - it can only cause a
   false BAD that a human then reads, never a silently missed real imbalance.

   Verified by _tools/test-strip-literals.js. */

const OPENERS = new Set(["(", ",", "[", "{"]);
const CLOSERS = new Set([",", ")", "]", "}"]);

/* Does the single quote at index i open a JS string, or is it an apostrophe?
   Returns the index just past the closing quote, or -1 for "not a string". */
function singleQuotedEnd(src, i) {
  let b = i - 1;
  while (b >= 0 && (src[b] === " " || src[b] === "\t")) b--;
  if (b < 0 || !OPENERS.has(src[b])) return -1;

  for (let j = i + 1; j < src.length; j++) {
    const c = src[j];
    if (c === "\n") return -1; // no close on this line: treat as apostrophe
    if (c === "\\") { j++; continue; }
    if (c !== "'") continue;
    let a = j + 1;
    while (a < src.length && (src[a] === " " || src[a] === "\t")) a++;
    if (a >= src.length || src[a] === "\n" || CLOSERS.has(src[a])) return j + 1;
    return -1; // closes somewhere implausible: leave the whole run alone
  }
  return -1;
}

function stripLiterals(src) {
  const out = src.split("");
  const n = src.length;
  const blank = (a, b) => {
    for (let j = a; j < b; j++) if (out[j] !== "\n") out[j] = " ";
  };

  let i = 0;
  while (i < n) {
    const c = src[i];

    if (c === "/" && src[i + 1] === "/") {
      let j = src.indexOf("\n", i);
      if (j < 0) j = n;
      blank(i, j);
      i = j;
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      let j = src.indexOf("*/", i + 2);
      j = j < 0 ? n : j + 2;
      blank(i, j);
      i = j;
      continue;
    }
    if (c === '"' || c === "`") {
      let j = i + 1;
      while (j < n) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === c) break;
        j++;
      }
      const end = Math.min(j + 1, n);
      blank(i, end);
      i = end;
      continue;
    }
    if (c === "'") {
      const end = singleQuotedEnd(src, i);
      if (end > 0) { blank(i, end); i = end; continue; }
      i++;
      continue;
    }
    i++;
  }
  return out.join("");
}

module.exports = { stripLiterals };

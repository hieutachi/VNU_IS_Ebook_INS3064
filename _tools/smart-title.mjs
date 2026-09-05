/* Course sources shout in ALL CAPS. Ease that back to sentence case while
   keeping technical tokens (PHP, SELECT, MySQL) intact. */

/* Acronyms and SQL words that are never ordinary English in this course. */
const STRONG = new Set([
  "PHP", "SQL", "HTML", "CSS", "JS", "JSON", "AJAX", "DOM", "CRUD", "API", "URL", "URI", "HTTP", "HTTPS",
  "SELECT", "INSERT", "UPDATE", "DELETE", "WHERE", "LIMIT", "OFFSET", "JOIN", "INNER", "OUTER", "HAVING",
  "UNION", "DISTINCT", "TRUNCATE", "NULL", "DDL", "DML", "DCL", "PDO", "OOP", "MVC", "XSS", "CSRF",
  "IDE", "UI", "UX", "XAMPP", "MAMP", "WAMP", "PDF", "CSV", "SEO", "REST", "TCP", "IP", "OS", "RAM",
  "MB", "GB", "CLI", "GET", "POST", "ORDER", "GROUP", "BMI", "XML", "LMS", "GPA", "FAQ", "PC", "SSL", "TLS",
]);
/* Words that are keywords only when they sit next to other keywords. */
const WEAK = new Set([
  "AND", "OR", "NOT", "IN", "ON", "BY", "IS", "AS", "SET", "KEY", "ALL", "ANY", "ADD", "FROM", "INTO",
  "LEFT", "RIGHT", "ID", "TABLE", "VIEW", "INDEX", "PRIMARY", "FOREIGN", "CREATE", "ALTER", "DROP",
]);
/* Ordinary English words that must never turn a weak keyword into SQL. */
const ENGLISH = new Set(["WHAT", "WHY", "HOW", "WHEN", "WHO", "THE", "A", "AN", "THIS", "THAT", "THESE", "THOSE", "IT", "WE", "YOU", "USE", "USING", "DOES", "DO", "DID", "CAN", "WILL", "VS", "VERSUS"]);
const MIXED_CASE = new Map([
  ["MYSQL", "MySQL"], ["PHPMYADMIN", "phpMyAdmin"], ["JQUERY", "jQuery"], ["JAVASCRIPT", "JavaScript"],
  ["GITHUB", "GitHub"], ["MARIADB", "MariaDB"], ["POSTGRESQL", "PostgreSQL"], ["EBOOK", "ebook"],
  ["AUTO_INCREMENT", "AUTO_INCREMENT"], ["VS", "vs"], ["VERSUS", "versus"],
]);
/* Words that read better capitalised even mid-sentence. */
const PROPER = new Set(["WINDOWS", "MACOS", "LINUX", "APACHE", "CHROME", "FIREFOX", "WORDPRESS", "FACEBOOK", "WIKIPEDIA"]);
/* Product names written as two words. */
const PHRASES = [[/\bVS\s+CODE\b/gi, "VS Code"], [/\bVISUAL\s+STUDIO\s+CODE\b/gi, "Visual Studio Code"]];

const coreOf = (word) => word.replace(/[^\p{L}\p{N}_+#]/gu, "").toUpperCase();
/* Every English word carries a vowel, so a vowel-less run of capitals such as
   BMI, VS, or LMS is an acronym worth preserving. */
const isAcronym = (segment) => segment.length > 1 && !/[AEIOUY]/.test(segment.toUpperCase());
const isShouted = (token) => /\p{Lu}/u.test(token) && !/\p{Ll}/u.test(token);

function easeSegment(segment, { capitalise, keep, label }) {
  const upper = segment.toUpperCase();
  if (MIXED_CASE.has(upper)) return MIXED_CASE.get(upper);
  if (keep || isAcronym(segment)) return segment;
  /* Codes that mix letters and digits (INS3064, LO4, PHP8) stay as written. */
  if (/\d/.test(segment) && /\p{Lu}/u.test(segment) && !/^\d/.test(segment)) return segment;
  const lower = segment.toLowerCase();
  if (PROPER.has(upper)) return lower.charAt(0).toUpperCase() + lower.slice(1);
  /* A lone letter is a list label ("Part A:") only when punctuation follows. */
  if (segment.length === 1) return capitalise || label ? upper : lower;
  return capitalise ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower;
}

function easeWord(word, { capitalise, keep }) {
  const label = /^\p{Lu}[.):]/u.test(word);
  let first = capitalise;
  return word.split(/([^\p{L}\p{N}_+#]+)/u).map((piece) => {
    if (!/\p{L}/u.test(piece)) return piece;
    const eased = easeSegment(piece, { capitalise: first, keep, label });
    first = false;
    return eased;
  }).join("");
}

export function smartTitle(text) {
  const source = String(text);
  if (!/\p{Lu}\p{Lu}/u.test(source)) return source;

  /* Tokenise into tags, whitespace, and words so decisions can use context. */
  const parts = source.split(/(<[^>]*>|\s+)/).filter((piece) => piece !== "");
  const entries = parts.map((token, index) => ({
    token,
    index,
    core: /^</.test(token) || /^\s+$/.test(token) ? "" : coreOf(token),
  }));
  /* Only words with letters take part in keyword context; "3.2" does not.
     Words inside code spans are excluded: `ORDER BY` next to "and" must not
     make that "and" look like SQL. */
  let insideCode = false;
  const speakable = entries.filter((entry) => {
    if (entry.token.startsWith("<")) {
      if (/^<code\b/i.test(entry.token)) insideCode = true;
      else if (/^<\/code>/i.test(entry.token)) insideCode = false;
      return false;
    }
    return !insideCode && entry.core && /\p{L}/u.test(entry.token);
  });
  const keepIds = decideKeywords(speakable);

  let inCode = false;
  let capitalise = true;
  const out = entries.map((entry) => {
    const { token, core } = entry;
    if (token.startsWith("<")) {
      if (/^<code\b/i.test(token)) inCode = true;
      if (/^<\/code>/i.test(token)) inCode = false;
      return token;
    }
    if (/^\s+$/.test(token)) return token;
    /* A colon, full stop, or question mark opens a new clause. */
    const opensClause = /[:.?!]$/.test(token.trim());
    if (inCode || !core || !/\p{L}/u.test(token)) {
      if (opensClause) capitalise = true;
      /* Code spans count as content, so the next word is mid-sentence. */
      else if (inCode && /\p{L}/u.test(token)) capitalise = false;
      return token;
    }
    /* Only shouted words are eased; anything already mixed case is trusted. */
    const result = isShouted(token) ? easeWord(token, { capitalise, keep: keepIds.has(entry.index) }) : token;
    capitalise = opensClause;
    return result;
  }).join("");
  return PHRASES.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), out);
}

/* Strong keywords always stay uppercase. Weak ones (BY, ON, IS, KEY…) only stay
   when they belong to a SQL phrase rather than to an English sentence. */
function decideKeywords(speakable) {
  const keep = new Set();
  let cursor = 0;
  while (cursor < speakable.length) {
    const entry = speakable[cursor];
    if (STRONG.has(entry.core)) { keep.add(entry.index); cursor += 1; continue; }
    if (!WEAK.has(entry.core)) { cursor += 1; continue; }
    let end = cursor;
    while (end + 1 < speakable.length && WEAK.has(speakable[end + 1].core)) end += 1;
    const run = speakable.slice(cursor, end + 1);
    const previous = speakable[cursor - 1];
    const next = speakable[end + 1];
    const keepRun = previous
      ? STRONG.has(previous.core)
      : Boolean((next && STRONG.has(next.core)) || run.length >= 2);
    if (keepRun) for (const item of run) keep.add(item.index);
    cursor = end + 1;
  }
  return keep;
}

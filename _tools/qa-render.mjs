/* Unit checks for the rendering layer: highlighting, title easing, slide planning.
   Read-only; runs before the whole-site QA pass. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { detectLanguage, highlight, languageLabel } from "./highlight.mjs";
import { smartTitle } from "./smart-title.mjs";
import { planSlides } from "./deck.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;
const bad = (message) => { failures += 1; console.log(`BAD  ${message}`); };
const ok = (message) => console.log(`ok   ${message}`);
const unescape = (value) => value
  .replace(/<[^>]+>/g, "")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, "&");

const SOURCES = [
  "English/00_course_overview.md",
  "English/00_installation_guide.md",
  "English/appendix/cheat_sheet.md",
  "English/part_1_php_foundation/session_01_intro_php.md",
  "English/part_1_php_foundation/session_02_programming_php.md",
  "English/part_1_php_foundation/session_03_dynamic_websites.md",
  "English/part_2_mysql_database/session_04_intro_mysql.md",
  "English/part_2_mysql_database/session_05_intro_sql.md",
  "English/part_2_mysql_database/session_06_database_design.md",
  "English/part_2_mysql_database/session_07_advanced_sql.md",
  "English/part_3_integration_advanced/session_08_review_midterm.md",
  "English/part_3_integration_advanced/session_09_error_handling.md",
  "English/part_3_integration_advanced/session_10_php_mysql.md",
  "English/part_3_integration_advanced/session_11_programming_techniques.md",
  "English/part_3_integration_advanced/session_12_web_app_development.md",
  "English/part_4_security_jquery/session_13_cookies_sessions.md",
  "English/part_4_security_jquery/session_14_security_methods.md",
  "English/part_4_security_jquery/session_15_jquery_intro.md",
];

console.log("== highlighting fidelity =========================================");
let blocks = 0;
const languages = new Map();
for (const relative of SOURCES) {
  const raw = await readFile(path.join(ROOT, relative), "utf8");
  const pattern = /^```([^\n]*)\r?\n([\s\S]*?)^```/gm;
  let match;
  while ((match = pattern.exec(raw))) {
    blocks += 1;
    const [, declared, code] = match;
    const language = detectLanguage(code, declared.trim());
    languages.set(language, (languages.get(language) || 0) + 1);
    const html = highlight(code, language);
    if (unescape(html) !== code) bad(`${relative}: highlighting changed the ${language} source text`);
    if (/<(?!span|\/span)/.test(html)) bad(`${relative}: unescaped markup leaked from a ${language} block`);
    if (!languageLabel(language)) bad(`${relative}: no caption label for ${language}`);
  }
}
ok(`${blocks} fenced blocks highlighted without text loss (${[...languages].map(([k, v]) => `${k}:${v}`).join(", ")})`);
console.log("== heading case ==================================================");
const TITLE_CASES = [
  ["1. WHAT IS PHP?", "1. What is PHP?"],
  ["2. SELECT – QUERYING DATA", "2. SELECT – querying data"],
  ["3.2 ON DELETE / ON UPDATE Options", "3.2 ON DELETE / ON UPDATE Options"],
  ["EXERCISE 1: BMI Calculator", "Exercise 1: BMI Calculator"],
  ["PART A: KNOWLEDGE SUMMARY", "Part A: Knowledge summary"],
  ["6.2 AUTO_INCREMENT", "6.2 AUTO_INCREMENT"],
  ["2. GET VS POST", "2. GET vs POST"],
  ["INTRODUCTION TO MySQL", "Introduction to MySQL"],
  ["Already sentence case", "Already sentence case"],
  ["<code>SELECT</code> AND FRIENDS", "<code>SELECT</code> and friends"],
];
for (const [input, expected] of TITLE_CASES) {
  const actual = smartTitle(input);
  if (actual !== expected) bad(`heading case: "${input}" became "${actual}", expected "${expected}"`);
}
ok(`${TITLE_CASES.length} heading-case rules hold (acronyms, SQL phrases, codes preserved)`);

console.log("== slide planning ================================================");
const stripTitle = (markdown) => {
  let removed = 0;
  return markdown.split(/\r?\n/).filter((line) => {
    if (removed < 2 && /^#\s+/.test(line)) { removed += 1; return false; }
    return true;
  }).join("\n");
};
const weightOf = (slide) => slide.tokens.reduce((total, token) => {
  if (token.type === "code") return total + token.text.split("\n").length;
  return total + Math.max(1, Math.ceil((token.raw || token.text || "").split(/\s+/).length / 11));
}, 0);

let planned = 0;
for (const relative of SOURCES.filter((item) => /session_\d\d/.test(item))) {
  const raw = await readFile(path.join(ROOT, relative), "utf8");
  const slides = planSlides(marked.lexer(stripTitle(raw), { gfm: true }));
  planned += slides.length;
  if (slides.length < 10) bad(`${relative}: only ${slides.length} planned slides`);
  const contentSlides = slides.filter((slide) => slide.kind === "content");
  if (contentSlides.some((slide) => !slide.tokens.length)) bad(`${relative}: a planned slide carries no content`);
  if (contentSlides.some((slide) => !slide.title)) bad(`${relative}: a planned slide has no heading`);
  const heavy = contentSlides.filter((slide) => !slide.listing && weightOf(slide) > 34);
  if (heavy.length) bad(`${relative}: ${heavy.length} slides exceed the visual budget (${heavy.map((slide) => slide.title).join("; ")})`);
}
ok(`${planned} slides planned across 15 chapters, each titled and within budget`);

console.log("");
console.log(failures ? `RENDER QA FAIL: ${failures} problem(s)` : "RENDER QA PASS");
process.exitCode = failures ? 1 : 0;


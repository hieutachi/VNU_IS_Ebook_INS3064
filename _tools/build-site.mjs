/* Build the public INS3064 portal from an explicit student-safe allowlist. */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import { decorateHeading, esc, foldCallouts, makeRenderer, renderStream } from "./render.mjs";
import { buildDeck } from "./deck.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(ROOT, "site");
const ASSETS = path.join(HERE, "site-assets");
const COURSE = "INS3064 · Multimedia Design and Web Development";
const SCHOOL = "International School, Vietnam National University, Hanoi";

const PARTS = [
  { id: 1, name: "PHP foundation", range: "Sessions 1–3", blurb: "Syntax, output, variables, control flow, and your first dynamic pages." },
  { id: 2, name: "MySQL and databases", range: "Sessions 4–7", blurb: "Design tables, write SQL, and query data with confidence." },
  { id: 3, name: "Integration and advanced", range: "Sessions 8–12", blurb: "Connect PHP to MySQL, handle errors, and structure a real application." },
  { id: 4, name: "Security and jQuery", range: "Sessions 13–15", blurb: "Sessions, authentication, defensive coding, and interactive front ends." },
];

const RAW_SESSIONS = [
  [1, "introduction-to-php", "Introduction to PHP", "part_1_php_foundation/session_01_intro_php.md", "PHP foundations", 1, ["PHP tags", "echo", "XAMPP"]],
  [2, "programming-with-php", "Programming with PHP", "part_1_php_foundation/session_02_programming_php.md", "Variables, types, control flow", 1, ["Variables", "Loops", "Functions"]],
  [3, "dynamic-websites-and-forms", "Dynamic Websites and Forms", "part_1_php_foundation/session_03_dynamic_websites.md", "Forms and validation", 1, ["Forms", "GET/POST", "Validation"]],
  [4, "introduction-to-mysql", "Introduction to MySQL", "part_2_mysql_database/session_04_intro_mysql.md", "Databases and phpMyAdmin", 2, ["MySQL", "phpMyAdmin", "Tables"]],
  [5, "introduction-to-sql", "Introduction to SQL", "part_2_mysql_database/session_05_intro_sql.md", "SQL and CRUD", 2, ["SELECT", "CRUD", "Functions"]],
  [6, "database-design", "Database Design", "part_2_mysql_database/session_06_database_design.md", "Normalisation and relationships", 2, ["Normalisation", "Keys", "Relationships"]],
  [7, "advanced-sql", "Advanced SQL", "part_2_mysql_database/session_07_advanced_sql.md", "Joins, subqueries, aggregation", 2, ["JOIN", "Subquery", "GROUP BY"]],
  [8, "review-and-midterm", "Review and Midterm", "part_3_integration_advanced/session_08_review_midterm.md", "PHP and SQL review", 3, ["Review", "Practice", "Checklists"]],
  [9, "error-handling-and-debugging", "Error Handling and Debugging", "part_3_integration_advanced/session_09_error_handling.md", "Exceptions, logs, debugging", 3, ["try/catch", "Logs", "Debugging"]],
  [10, "php-with-mysql", "PHP with MySQL", "part_3_integration_advanced/session_10_php_mysql.md", "PDO and database integration", 3, ["PDO", "Prepared", "CRUD"]],
  [11, "programming-techniques", "Programming Techniques", "part_3_integration_advanced/session_11_programming_techniques.md", "OOP and MVC", 3, ["OOP", "MVC", "Includes"]],
  [12, "web-application-development", "Web Application Development", "part_3_integration_advanced/session_12_web_app_development.md", "Application structure and CRUD", 3, ["Structure", "Routing", "Mini project"]],
  [13, "cookies-and-sessions", "Cookies and Sessions", "part_4_security_jquery/session_13_cookies_sessions.md", "State and authentication", 4, ["Cookies", "Sessions", "Login"]],
  [14, "security-methods", "Security Methods", "part_4_security_jquery/session_14_security_methods.md", "SQL injection, XSS, CSRF", 4, ["SQL injection", "XSS", "CSRF"]],
  [15, "jquery-and-ajax", "jQuery and AJAX", "part_4_security_jquery/session_15_jquery_intro.md", "DOM, events, AJAX", 4, ["jQuery", "Events", "AJAX"]],
];
const SESSIONS = RAW_SESSIONS.map(([n, slug, title, file, summary, part, tags]) => ({
  n, slug, title, summary, part, tags, source: `English/${file}`,
}));
const GUIDES = [
  ["course-overview", "Course Overview", "English/00_course_overview.md", "Outcomes, structure, and the learning path.", "Start here"],
  ["installation", "Installation Guide", "English/00_installation_guide.md", "Set up XAMPP, PHP, MySQL, and VS Code.", "Setup"],
  ["php-mysql-cheat-sheet", "PHP & MySQL Cheat Sheet", "English/appendix/cheat_sheet.md", "Quick syntax reference for practical work.", "Reference"],
].map(([slug, title, source, summary, kicker]) => ({ slug, title, source, summary, kicker }));

const pad = (n) => String(n).padStart(2, "0");
const partOf = (session) => PARTS.find((part) => part.id === session.part);
const checksum = (text) => createHash("sha256").update(text, "utf8").digest("hex");

function stripOpeningTitle(markdown) {
  let removed = 0;
  return markdown.split(/\r?\n/).filter((line) => {
    if (removed < 2 && /^#\s+/.test(line)) { removed += 1; return false; }
    return true;
  }).join("\n");
}

function localTarget(href) {
  const clean = decodeURIComponent(href).split("#")[0];
  const hash = href.includes("#") ? `#${href.split("#").slice(1).join("#")}` : "";
  const name = path.posix.basename(clean.replace(/\\/g, "/"));
  const match = /^session_(\d{2})_.*\.md$/i.exec(name);
  if (match) {
    const session = SESSIONS.find((item) => pad(item.n) === match[1]);
    return session ? `../ebook/${match[1]}-${session.slug}.html${hash}` : null;
  }
  if (name === "00_course_overview.md") return `../guides/course-overview.html${hash}`;
  if (name === "00_installation_guide.md") return `../guides/installation.html${hash}`;
  if (name === "cheat_sheet.md") return `../guides/php-mysql-cheat-sheet.html${hash}`;
  if (/^readme\.md$/i.test(name)) return `../index.html${hash}`;
  return null;
}

/* The public site never carries submission instructions that are not in force,
   and the portal's own pager replaces the chapters' hand-written back links. */
function preparePublicMarkdown(markdown) {
  return markdown
    .replace(/^##\s+📎\s+SUBMISSION GUIDELINES\s*$[\s\S]*?(?=^#{1,6}\s+)/gim,
      "## 💾 SAVE YOUR PRACTICE WORK\n\nThis portal does not collect or grade files. Save the completed work in your local project and follow instructions announced by your lecturer.\n\n")
    .replace(/\bFile to Submit\b/gi, "File to Save")
    .replace(/^\s*\*\*Previous:\s*\[[^\]]*\]\([^)]*\)\*\*\s*$/gim, "")
    /* Collapse the rules left behind, and any the sources already doubled up. */
    .replace(/(?:^[ \t]*---[ \t]*$\s*){2,}/gm, "---\n\n");
}

function lex(markdown) {
  return marked.lexer(stripOpeningTitle(preparePublicMarkdown(markdown)), { gfm: true });
}

/* Render a chapter, promoting the leading briefing block into a summary card. */
function renderChapter(markdown) {
  const headings = [];
  const renderer = makeRenderer({ headings, localTarget, mode: "doc" });
  const tokens = foldCallouts(lex(markdown));
  return { html: renderStream(tokens, renderer), headings };
}

function tocHtml(headings) {
  if (!headings.length) return "";
  const items = headings.map((h) => `<li class="depth-${h.depth}"><a href="#${h.id}">${esc(h.label)}</a></li>`).join("");
  /* Open by default so the outline works without JavaScript. On phones site.js
     collapses it, because a 49-entry list would otherwise bury the chapter. */
  return `<details class="toc" data-toc open><summary><span class="toc-title">On this page</span><span class="toc-count">${headings.length} sections</span></summary><ol>${items}</ol></details>`;
}

/* The shortest honest route through a chapter, for a student who is short on time
   or losing confidence: one theory section, one worked example, one exercise, and
   the error table to check the result against. Built from the real headings so
   every step is a working link. */
function minimumPath(headings) {
  const find = (pattern) => headings.find((h) => pattern.test(h.label));
  /* Source headings often start with an emoji; the badge is decoration here. */
  const clean = (label) => label.replace(/^(?:\p{Extended_Pictographic}|\uFE0F|\u200D)+\s*/u, "");
  const steps = [
    [find(/before you start/i), "Set up the database first"],
    [find(/^\d+\.\s/), "Read one theory section"],
    [find(/^Example 1\b/i), "Type the first worked example"],
    [find(/^(?:Exercise|Practical exercise) 1\b/i) || find(/^\d+\.\d+ Main Practice/i), "Build the first exercise yourself"],
    [find(/common error/i), "Check your errors against the table"],
    [find(/self-check|knowledge to achieve|key takeaways|theory summary/i), "Test yourself"],
  ].filter(([heading]) => heading);
  if (steps.length < 3) return "";
  const items = steps.map(([heading, copy]) =>
    `<li><a href="#${heading.id}">${esc(copy)}</a><span class="path-target">${esc(clean(heading.label))}</span></li>`).join("");
  return `<aside class="callout is-goal minimum-path" aria-labelledby="minimum-path-h">`
    + `<p class="callout-title" id="minimum-path-h">Minimum path</p>`
    + `<div class="callout-body"><p>Short on time, or stuck? These ${steps.length} steps are enough to keep up. Come back for the rest.</p>`
    + `<ol class="path-list">${items}</ol></div></aside>`;
}

function page({ title, heading, lead, body, depth = 0, section = "", eyebrow = "INS3064 student learning portal", extraHead = "", pageClass = "", meta = "", head = true }) {
  const base = depth ? ".." : ".";
  const pageHead = head
    ? `<header class="page-head"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(heading)}</h1><p class="lead">${esc(lead)}</p>${meta}</header>`
    : `<h1 class="visually-hidden">${esc(heading)}</h1>`;
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — ${esc(COURSE)}</title>
<meta name="description" content="${esc(lead)}">
<meta name="generator" content="INS3064 static-site builder">
<meta name="color-scheme" content="light dark">
${extraHead}<link rel="stylesheet" href="${base}/assets/site.css">
<script>(function(){try{var t=localStorage.getItem("ins3064.theme");if(!t&&matchMedia("(prefers-color-scheme: dark)").matches)t="dark";document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){}})();</script>
</head>
<body class="${esc(pageClass)}">
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><span data-reading-progress></span></div>
<header class="topbar"><div class="topbar-inner">
<a class="brand" href="${base}/index.html" aria-label="INS3064 home"><span class="brand-mark" aria-hidden="true">PHP</span><span class="brand-copy"><strong>INS3064</strong><span>Web Development</span></span></a>
<nav class="primary-nav" aria-label="Learning resources"><a data-nav="sessions" href="${base}/sessions/index.html">Sessions</a><a data-nav="ebook" href="${base}/ebook/index.html">Ebook</a><a data-nav="slides" href="${base}/slides/index.html">Slides</a><a data-nav="guides" href="${base}/guides/index.html">Guides</a></nav>
<button class="theme-toggle" type="button" data-theme-toggle><span class="theme-dot" aria-hidden="true"></span><span data-theme-label>Dark</span></button>
</div></header>
${depth ? `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>${esc(section)}</span></nav>` : ""}
<main id="main">${pageHead}${body}</main>
<footer class="footer"><div><strong>INS3064</strong><p>${esc(SCHOOL)}</p></div><p>Student learning materials. Assessment files, solutions, rubrics, and lecturer-only resources are not published here.</p></footer>
<script src="${base}/assets/site.js" defer></script>
</body></html>`;
}

function sourceHead(source, raw) {
  return `<meta name="source-file" content="${esc(source)}">\n<meta name="source-sha256" content="${checksum(raw)}">\n`;
}

function chip(text) {
  return `<span class="chip">${esc(text)}</span>`;
}

function chapterPage(session, raw) {
  const rendered = renderChapter(raw);
  const part = partOf(session);
  const meta = `<div class="head-meta">${chip(`Part ${part.id} · ${part.name}`)}${session.tags.map(chip).join("")}</div>`
    + `<div class="head-actions"><a class="button-link primary" href="../slides/${pad(session.n)}-${session.slug}.html">Open the slide deck</a><a class="button-link" href="../sessions/session-${pad(session.n)}.html">Session hub</a></div>`;
  return page({
    title: `Chapter ${session.n}: ${session.title}`,
    heading: session.title,
    lead: session.summary,
    depth: 1,
    section: "Ebook",
    eyebrow: `Chapter ${pad(session.n)} · Ebook`,
    pageClass: "reading-page",
    extraHead: sourceHead(session.source, raw),
    meta,
    body: `<div class="reading-layout">${tocHtml(rendered.headings)}<article class="doc" data-source="${esc(session.source)}">${minimumPath(rendered.headings)}${rendered.html}</article></div>${pager(session, "chapters")}`,
  });
}

function guidePage(guide, raw) {
  const rendered = renderChapter(raw);
  return page({
    title: guide.title,
    heading: guide.title,
    lead: guide.summary,
    depth: 1,
    section: "Guides",
    eyebrow: `${guide.kicker} · Guides`,
    pageClass: "reading-page",
    extraHead: sourceHead(guide.source, raw),
    body: `<div class="reading-layout">${tocHtml(rendered.headings)}<article class="doc" data-source="${esc(guide.source)}">${rendered.html}</article></div>`,
  });
}

function deckPage(session, raw) {
  const slides = buildDeck({ session, tokens: lex(raw), localTarget });
  /* The rail and the select show the most specific label available, plus the
     step number when one section spans several slides. */
  const baseLabel = (slide) => (slide.kind === "part"
    /* Dividers are signposts, not content: say so, or a divider and the first
       slide under it end up with the same name in the list. */
    ? `Section: ${slide.title || "Next part"}`
    : `${slide.sub || slide.title || "Slide"}${slide.steps ? ` (${slide.step}/${slide.steps})` : ""}`);
  /* Two identical entries in the slide list are a navigation dead end, so
     qualify any remaining repeats with the section they belong to. */
  const seenLabels = new Map();
  for (const slide of slides) seenLabels.set(baseLabel(slide), (seenLabels.get(baseLabel(slide)) || 0) + 1);
  const labelOf = (slide) => {
    const label = baseLabel(slide);
    if (seenLabels.get(label) === 1) return label;
    const parent = slide.title && slide.title !== slide.sub ? slide.title : slide.part;
    return parent ? `${label} — ${parent}` : label;
  };
  const rail = slides.map((slide) => `<li><button type="button" data-deck-jump="${slide.index}"><span class="rail-index">${pad(slide.index + 1)}</span><span class="rail-title">${esc(labelOf(slide))}</span></button></li>`).join("");
  const options = slides.map((slide) => `<option value="${slide.index}">${slide.index + 1}. ${esc(labelOf(slide))}</option>`).join("");
  const sections = slides.map((slide) => {
    const kind = `deck-slide is-${slide.kind}${slide.listing ? " has-listing" : ""}`;
    const eyebrow = slide.kind === "content"
      ? `<p class="slide-eyebrow"><span class="slide-part">${esc(slide.part)}</span>${slide.sub ? `<span class="slide-sub">${esc(slide.sub)}</span>` : ""}</p>`
      : "";
    const heading = slide.kind === "content" && slide.title
      ? `<h2 class="slide-title">${decorateHeading(esc(slide.title))}${slide.steps ? `<span class="slide-cont">${slide.step} of ${slide.steps}</span>` : ""}</h2>`
      : "";
    return `<section class="${kind}" id="${slide.id}" tabindex="-1" data-slide data-slide-title="${esc(slide.title || "")}" aria-label="Slide ${slide.index + 1} of ${slides.length}">`
      + `<div class="slide-inner">${eyebrow}${heading}<div class="slide-body">${slide.html}</div></div>`
      + `<p class="slide-foot"><span>INS3064 · Session ${pad(session.n)}</span><span>${slide.index + 1} / ${slides.length}</span></p>`
      + `</section>`;
  }).join("\n");

  const body = `<div class="deck-shell">
<aside class="deck-rail" aria-label="Slide list"><p class="rail-head">Slides</p><ol>${rail}</ol></aside>
<div class="deck-main">
<nav class="deck-toolbar" aria-label="Slide controls">
<button class="deck-arrow" type="button" data-deck-prev aria-label="Previous slide">‹</button>
<label class="deck-select"><span class="visually-hidden">Choose a slide</span><select data-deck-select>${options}</select></label>
<span class="deck-counter" data-deck-counter>1 / ${slides.length}</span>
<button class="deck-arrow" type="button" data-deck-next aria-label="Next slide">›</button>
<button class="deck-mode" type="button" data-deck-mode aria-pressed="false">Overview</button>
</nav>
<div class="deck-progress" aria-hidden="true"><span data-deck-progress></span></div>
<div class="deck" data-deck>${sections}</div>
<p class="keyboard-help">Keyboard: ← → move, <kbd>O</kbd> overview, <kbd>Home</kbd>/<kbd>End</kbd> jump. Long slides scroll on their own.</p>
</div></div>`;

  return page({
    title: `Slides: ${session.title}`,
    heading: `Session ${session.n} slides`,
    lead: session.title,
    depth: 1,
    section: "Slides",
    eyebrow: `${slides.length} slides`,
    pageClass: "deck-page",
    extraHead: sourceHead(session.source, raw),
    head: false,
    body,
  });
}

/* ---------- index and hub pages ---------- */

function sessionCard(session, prefix) {
  const part = partOf(session);
  return `<li class="session-card" data-session-card data-part="${part.id}">
<div class="card-top"><span class="session-number">Session ${pad(session.n)}</span><span class="card-part">Part ${part.id}</span></div>
<a class="card-link" href="${prefix}sessions/session-${pad(session.n)}.html"><h3>${esc(session.title)}</h3></a>
<p>${esc(session.summary)}</p>
<div class="card-tags">${session.tags.map(chip).join("")}</div>
<div class="card-links"><a href="${prefix}ebook/${pad(session.n)}-${session.slug}.html">Read chapter</a><a href="${prefix}slides/${pad(session.n)}-${session.slug}.html">Slides</a></div>
</li>`;
}

function partSections(prefix) {
  return PARTS.map((part) => {
    const cards = SESSIONS.filter((session) => session.part === part.id).map((session) => sessionCard(session, prefix)).join("\n");
    return `<section class="part-block" data-part-block="${part.id}">
<div class="part-head"><div><p class="eyebrow">Part ${part.id} · ${esc(part.range)}</p><h2>${esc(part.name)}</h2></div><p>${esc(part.blurb)}</p></div>
<ul class="session-grid">${cards}</ul></section>`;
  }).join("\n");
}

function sessionsIndex() {
  const body = `<div class="filter-box">
<label for="session-filter">Filter sessions</label>
<input id="session-filter" type="search" placeholder="Search a topic: forms, JOIN, sessions, AJAX…" data-filter="[data-session-card]" autocomplete="off">
<span class="filter-status" data-filter-status></span>
</div>${partSections("../")}`;
  return page({
    title: "Sessions", heading: "Your 15-session learning path",
    lead: "Read the chapter, review the deck, then build the practice files on your own machine.",
    depth: 1, section: "Sessions", eyebrow: "Course map", body,
  });
}

function sessionPage(session) {
  const nn = pad(session.n);
  const part = partOf(session);
  const previous = SESSIONS.find((item) => item.n === session.n - 1);
  const next = SESSIONS.find((item) => item.n === session.n + 1);
  const adjacent = (item, label, direction) => (item
    ? `<a class="pager-link is-${direction}" href="session-${pad(item.n)}.html"><span class="pager-label">${label}</span><span class="pager-title">${esc(item.title)}</span></a>`
    : '<span class="pager-link is-empty"></span>');
  const steps = [
    ["01", "Before class", "Read the chapter", "Work through the explanation and type every example yourself.", `../ebook/${nn}-${session.slug}.html`, "Open chapter", true],
    ["02", "In class", "Follow the deck", "One idea per slide, with the code you need beside it.", `../slides/${nn}-${session.slug}.html`, "Open slides", false],
    ["03", "After class", "Practise locally", "Rebuild the exercises in your XAMPP htdocs folder until they run.", "../guides/installation.html", "Setup guide", false],
  ];
  const cards = steps.map(([number, when, title, copy, href, cta, primary]) =>
    `<li class="flow-card"><span class="step"><span class="step-number">${number}</span>${esc(when)}</span><h2>${esc(title)}</h2><p>${esc(copy)}</p><a class="button-link${primary ? " primary" : ""}" href="${href}">${esc(cta)}</a></li>`).join("");
  const body = `<div class="head-meta">${chip(`Part ${part.id} · ${part.name}`)}${session.tags.map(chip).join("")}</div>
<ol class="session-flow">${cards}</ol>
<aside class="notice"><p><strong>Practice only.</strong> Complete the tasks in your local project. Submission, grading, exam material, and answer keys are intentionally not hosted here.</p></aside>
<nav class="pager" aria-label="Adjacent sessions">${adjacent(previous, "Previous", "prev")}${adjacent(next, "Next", "next")}</nav>`;
  return page({
    title: `Session ${session.n}: ${session.title}`, heading: session.title, lead: session.summary,
    depth: 1, section: "Sessions", eyebrow: `Session ${nn} of 15`, body,
  });
}

function listPage({ kind, heading, lead, items, href, meta }) {
  const cards = items.map((item) => `<li class="resource-card">
<div class="card-top"><span class="badge">${esc(meta(item))}</span></div>
<a class="card-link" href="${href(item)}"><h2>${esc(item.title)}</h2></a>
<p>${esc(item.summary)}</p>
${item.tags ? `<div class="card-tags">${item.tags.map(chip).join("")}</div>` : ""}
</li>`).join("\n");
  return page({
    title: heading, heading, lead, depth: 1, section: kind,
    eyebrow: `${items.length} resources`, body: `<ul class="resource-grid">${cards}</ul>`,
  });
}

function pager(session, folder) {
  const previous = SESSIONS.find((item) => item.n === session.n - 1);
  const next = SESSIONS.find((item) => item.n === session.n + 1);
  const link = (item, label, direction) => (item
    ? `<a class="pager-link is-${direction}" href="${pad(item.n)}-${item.slug}.html"><span class="pager-label">${label}</span><span class="pager-title">${esc(item.title)}</span></a>`
    : '<span class="pager-link is-empty"></span>');
  return `<nav class="pager" aria-label="Adjacent ${folder}">${link(previous, "Previous", "prev")}${link(next, "Next", "next")}</nav>`;
}
function homePage() {
  const resources = [
    ["Sessions", "A guided route through all 15 weeks, grouped into four parts.", "sessions/index.html", "Course map"],
    ["Ebook", "Fifteen complete chapters with highlighted PHP, SQL, and HTML.", "ebook/index.html", "Read"],
    ["Slides", "Focused decks with one idea per slide for review and revision.", "slides/index.html", "Review"],
    ["Guides", "Install XAMPP, check your setup, and keep syntax within reach.", "guides/index.html", "Setup"],
  ].map(([title, summary, href, badge]) => `<li class="resource-card"><div class="card-top"><span class="badge">${esc(badge)}</span></div><a class="card-link" href="${href}"><h3>${esc(title)}</h3></a><p>${esc(summary)}</p></li>`).join("");

  const body = `<div class="hero-actions"><a class="button-link primary" href="sessions/session-01.html">Start with Session 1</a><a class="button-link" href="guides/installation.html">Set up your environment</a></div>
<ul class="stat-row"><li class="stat"><strong>15</strong><span>guided sessions</span></li><li class="stat"><strong>4</strong><span>learning parts</span></li><li class="stat"><strong>PHP 8 · MySQL</strong><span>server-side stack</span></li></ul>
<section><div class="section-head"><div><p class="eyebrow">Everything in one place</p><h2>Choose a resource</h2></div><p>Student-safe material for reading and review. Build the programming tasks in your local XAMPP project.</p></div><ul class="resource-grid home-grid">${resources}</ul></section>
<section id="course"><div class="section-head"><div><p class="eyebrow">The learning path</p><h2>From first echo to secure AJAX</h2></div><p>Each part builds on the previous one. Follow them in order for the smoothest ride.</p></div>${partSections("")}</section>`;

  return page({
    title: "Student Learning Portal", heading: "Build dynamic web applications.",
    lead: "INS3064 learning materials for PHP, MySQL, web security, jQuery, and AJAX — organised into one clear path.",
    eyebrow: "INS3064 · Student learning portal", pageClass: "home-page", body,
  });
}

async function write(rel, content) {
  const target = path.join(OUT, rel);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

async function build() {
  for (const item of [...SESSIONS, ...GUIDES]) {
    if (!existsSync(path.join(ROOT, item.source))) throw new Error(`Missing allowlisted source: ${item.source}`);
  }
  await rm(OUT, { recursive: true, force: true });
  for (const dir of ["assets", "ebook", "slides", "sessions", "guides"]) await mkdir(path.join(OUT, dir), { recursive: true });
  await cp(path.join(ASSETS, "site.css"), path.join(OUT, "assets", "site.css"));
  await cp(path.join(ASSETS, "site.js"), path.join(OUT, "assets", "site.js"));
  await write(".nojekyll", "");

  let slideTotal = 0;
  for (const session of SESSIONS) {
    const raw = await readFile(path.join(ROOT, session.source), "utf8");
    await write(`ebook/${pad(session.n)}-${session.slug}.html`, chapterPage(session, raw));
    const deck = deckPage(session, raw);
    slideTotal += (deck.match(/data-slide(?:\s|>)/g) || []).length;
    await write(`slides/${pad(session.n)}-${session.slug}.html`, deck);
    await write(`sessions/session-${pad(session.n)}.html`, sessionPage(session));
  }
  for (const guide of GUIDES) {
    const raw = await readFile(path.join(ROOT, guide.source), "utf8");
    await write(`guides/${guide.slug}.html`, guidePage(guide, raw));
  }
  await write("index.html", homePage());
  await write("sessions/index.html", sessionsIndex());
  await write("ebook/index.html", listPage({
    kind: "Ebook", heading: "The INS3064 ebook",
    lead: "Fifteen chapters in teaching order, from PHP syntax to secure AJAX applications.",
    items: SESSIONS, href: (s) => `${pad(s.n)}-${s.slug}.html`, meta: (s) => `Chapter ${pad(s.n)}`,
  }));
  await write("slides/index.html", listPage({
    kind: "Slides", heading: "Lecture slides",
    lead: "Focused review decks generated from the complete English chapters.",
    items: SESSIONS, href: (s) => `${pad(s.n)}-${s.slug}.html`, meta: (s) => `Session ${pad(s.n)}`,
  }));
  await write("guides/index.html", listPage({
    kind: "Guides", heading: "Setup and quick reference",
    lead: "Prepare your environment and keep the essential syntax nearby.",
    items: GUIDES, href: (g) => `${g.slug}.html`, meta: (g) => g.kicker,
  }));
  console.log(`Built site/: 15 chapters, 15 decks (${slideTotal} slides), 15 session hubs, 3 guides.`);
}

build().catch((error) => { console.error(error.stack || error); process.exitCode = 1; });

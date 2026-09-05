/* Semantic HTML rendering for INS3064 course Markdown.
   Turns plain teaching Markdown into cards, callouts, and highlighted code
   blocks that read well on screen. No runtime dependencies are emitted. */
import { marked } from "marked";
import { detectLanguage, highlight, languageLabel } from "./highlight.mjs";
import { smartTitle } from "./smart-title.mjs";

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESC[char]);
export const plain = (value) => String(value ?? "").replace(/<[^>]*>/g, "").replace(/[`*_~]/g, "").replace(/&amp;/g, "&").trim();
export const slugify = (value) => plain(value).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

/* Emoji-led headings in the sources map to visual callouts. */
const CALLOUTS = [
  [/^⚠️?/, "warn", "Watch out"],
  [/^❌/, "pitfall", "Common mistakes"],
  [/^✅/, "good", "Do this"],
  [/^💡/, "tip", "Tip"],
  [/^🎒/, "analogy", "Real-life analogy"],
  [/^🔍/, "compare", "Compare"],
  [/^📋/, "rules", "Rules"],
  [/^🧪/, "check", "Self-check"],
  [/^🏆/, "challenge", "Challenge"],
  [/^📝/, "note", "Note"],
  [/^📌/, "info", "Information"],
  [/^🎯/, "goal", "Goal"],
  [/^📤|^💾/, "result", "Result"],
];

const ICON_NOTES = [
  [/^🎯/, "goal"],
  [/^📝/, "note"],
  [/^📤/, "result"],
  [/^💾/, "save"],
  [/^🏆/, "challenge"],
  [/^💡/, "tip"],
  [/^⚠️?/, "warn"],
  [/^✅/, "good"],
  [/^❌/, "pitfall"],
  [/^📚/, "reference"],
  [/^🔗/, "link"],
];

function calloutOf(text) {
  const label = plain(text);
  for (const [pattern, kind, fallback] of CALLOUTS) {
    if (pattern.test(label)) {
      const title = label.replace(pattern, "").replace(/^[\s:–-]+/, "").replace(/:$/, "").trim();
      return { kind, title: title || fallback };
    }
  }
  return null;
}

function iconNoteOf(text) {
  const label = plain(text);
  for (const [pattern, kind] of ICON_NOTES) if (pattern.test(label)) return kind;
  return null;
}

/* Session briefing blocks are fenced plain text in the sources. */
export function isBriefBlock(token) {
  return token?.type === "code" && !token.lang
    && /^\s*(?:📅|🎯|📚|🔗|📖)\s*[A-Za-z]/.test(token.text)
    && parseBrief(token.text).length >= 2;
}

const BRIEF_KEYS = [
  [/^📅\s*Time:?/i, "Duration"],
  [/^📚\s*Reference:?/i, "Reference"],
  [/^🎯\s*(?:Session\s+)?Objectives:?/i, "Objectives"],
  [/^📖\s*Preparation:?/i, "Preparation"],
  [/^🔗\s*(?:Links? to\s+)?Learning Outcomes?:?/i, "Learning outcomes"],
];

function parseBrief(text) {
  const rows = [];
  for (const line of String(text).split(/\r?\n/)) {
    if (!line.trim()) continue;
    const bullet = /^\s{2,}-\s+(.*)$/.exec(line);
    if (bullet && rows.length) { rows[rows.length - 1].items.push(bullet[1].trim()); continue; }
    const match = BRIEF_KEYS.find(([pattern]) => pattern.test(line.trim()));
    if (match) {
      const value = line.trim().replace(match[0], "").trim();
      rows.push({ key: match[1], value, items: [] });
      continue;
    }
    if (rows.length) rows[rows.length - 1].items.push(line.trim());
  }
  return rows;
}

function briefHtml(text) {
  const rows = parseBrief(text);
  if (!rows.length) return "";
  const cells = rows.map((row) => {
    const list = row.items.length ? `<ul>${row.items.map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</ul>` : "";
    const value = row.value ? `<p class="brief-value">${inlineHtml(row.value)}</p>` : "";
    return `<div class="brief-item${row.items.length ? " is-wide" : ""}"><span class="brief-key">${esc(row.key)}</span>${value}${list}</div>`;
  }).join("");
  return `<div class="brief" role="group" aria-label="Session at a glance">${cells}</div>`;
}

/* Inline-only markdown (bold, code spans) for short strings we build ourselves. */
function inlineHtml(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<![\w*])\*([^*\n]+)\*(?![\w*])/g, "<em>$1</em>");
}

/* Long fill-in rules in worksheets read better as a drawn line. */
const BLANKS = /_{4,}/g;
const blanksToRules = (html) => html.replace(BLANKS, '<span class="blank"></span>');

/* Some listings are meant to be read, not run: deliberately broken code, or a
   statement that would delete a student's practice data. Label those in the
   caption so nobody pastes them into a terminal to find out. */
const READ_ONLY = [
  [/\bDROP\s+(?:TABLE|DATABASE)\b|\bTRUNCATE\s+TABLE\b/i, "Destructive — read only"],
  [/(?:^|\n)\s*(?:--|\/\/|#)\s*\u274C\s*DANGEROUS/i, "Destructive — read only"],
  [/(?:^|\n)\s*(?:--|\/\/|#)\s*Destructive:/i, "Destructive — read only"],
  [/\u274C\s*(?:Wrong|Violates|Incorrect)/i, "Broken on purpose"],
];

function readOnlyLabel(code) {
  for (const [pattern, label] of READ_ONLY) if (pattern.test(code)) return label;
  return "";
}

function codeFigure(token, { compact = false } = {}) {
  const language = detectLanguage(token.text, token.lang);
  const label = languageLabel(language);
  const lines = token.text.replace(/\n+$/, "").split("\n");
  const plainKinds = new Set(["diagram", "output", "text"]);
  const kind = plainKinds.has(language) ? "plain" : "code";
  const body = plainKinds.has(language) ? esc(token.text.replace(/\n+$/, "")) : highlight(token.text.replace(/\n+$/, ""), language);
  const classes = ["code-block", `is-${kind}`];
  if (compact) classes.push("is-compact");
  if (lines.length > 24) classes.push("is-tall");
  const warning = kind === "code" ? readOnlyLabel(token.text) : "";
  if (warning) classes.push("is-read-only");
  const copy = kind === "code"
    ? '<button class="code-copy" type="button" data-code-copy>Copy</button>'
    : "";
  const flag = warning ? `<span class="code-flag">${esc(warning)}</span>` : "";
  return `<figure class="${classes.join(" ")}" data-language="${esc(language)}" data-lines="${lines.length}">`
    + `<figcaption><span class="code-language">${esc(label)}</span>${flag}`
    + `<span class="code-meta"><span class="code-lines">${lines.length} line${lines.length === 1 ? "" : "s"}</span>${copy}</span></figcaption>`
    + `<pre tabindex="0"><code>${body}</code></pre></figure>`;
}

/* Headings in the sources start with an emoji or a section number. Wrap those
   so the stylesheet can present them as a badge instead of inline text. */
const LEADING_ICON = /^((?:\p{Extended_Pictographic}|\uFE0F|\u200D|[\u0030-\u0039]\uFE0F?\u20E3)+)\s*/u;
const LEADING_NUMBER = /^(\d+(?:\.\d+)*)\.?\s+(?=\p{L})/u;

export function decorateHeading(html) {
  let out = String(html);
  const icon = LEADING_ICON.exec(out);
  if (icon) {
    out = out.slice(icon[0].length);
    out = `<span class="h-icon" aria-hidden="true">${icon[1]}</span>${out}`;
  }
  const number = LEADING_NUMBER.exec(out.replace(/^<span class="h-icon"[^>]*>[\s\S]*?<\/span>/, ""));
  if (number) {
    const prefix = icon ? out.slice(0, out.indexOf("</span>") + 7) : "";
    const rest = out.slice(prefix.length);
    out = `${prefix}<span class="h-num">${number[1]}</span>${rest.slice(number[0].length)}`;
  }
  return out;
}

const PART_WORDS = /^(?:theory|practice|hands-on practice|examples? ?&? ?illustrations?|examples?|real-world examples|mini project|review)/i;
/* Source h1s such as THEORY or PRACTICE act as part dividers. */
export const isPartDivider = (text) => PART_WORDS.test(plain(text));

/* Fold emoji-led sub-sections into single callout tokens so both the ebook and
   the decks can present them as boxes instead of bare headings. */
export function foldCallouts(tokens) {
  const out = [];
  let index = 0;
  while (index < tokens.length) {
    const token = tokens[index];
    /* Headings carry their own separation, so drop the rule that precedes one. */
    if (token.type === "hr" && nextBlock(tokens, index) === "heading") { index += 1; continue; }
    const callout = token.type === "heading" && token.depth >= 3 ? calloutOf(token.text) : null;
    if (!callout) { out.push(token); index += 1; continue; }
    const inner = [];
    let cursor = index + 1;
    while (cursor < tokens.length) {
      const next = tokens[cursor];
      if (next.type === "hr") break;
      if (next.type === "heading" && next.depth <= token.depth) break;
      inner.push(next);
      cursor += 1;
    }
    out.push({ type: "calloutBlock", kind: callout.kind, title: callout.title, heading: token, tokens: inner });
    index = cursor;
  }
  return out;
}

function nextBlock(tokens, index) {
  for (let cursor = index + 1; cursor < tokens.length; cursor += 1) {
    if (tokens[cursor].type !== "space") return tokens[cursor].type;
  }
  return null;
}

/* Render a folded token stream, keeping briefing cards and callouts intact. */
export function renderStream(tokens, renderer) {
  const parts = [];
  let run = [];
  const drain = () => { if (run.length) { parts.push(marked.parser(run, { renderer, gfm: true })); run = []; } };
  for (const token of tokens) {
    if (isBriefBlock(token)) { drain(); parts.push(briefHtml(token.text)); continue; }
    if (token.type === "calloutBlock") {
      drain();
      const inner = renderStream(token.tokens, renderer);
      const id = renderer.uniqueId ? renderer.uniqueId(`${token.kind} ${token.title}`, "callout") : slugify(`${token.kind} ${token.title}`);
      parts.push(`<aside class="callout is-${token.kind}" aria-labelledby="${id}"><p class="callout-title" id="${id}">${esc(token.title)}</p><div class="callout-body">${inner}</div></aside>`);
      continue;
    }
    run.push(token);
  }
  drain();
  return parts.join("\n");
}

export function makeRenderer({ headings = [], localTarget = () => null, mode = "doc" } = {}) {
  const renderer = new marked.Renderer();
  const seen = new Map();
  const uniqueId = (label, fallback) => {
    let id = slugify(label) || fallback;
    const count = (seen.get(id) || 0) + 1;
    seen.set(id, count);
    return count > 1 ? `${id}-${count}` : id;
  };
  renderer.uniqueId = uniqueId;

  renderer.heading = function ({ tokens, depth }) {
    const raw = this.parser.parseInline(tokens);
    const eased = smartTitle(raw);
    const label = plain(eased);
    const id = uniqueId(label, `section-${headings.length + 1}`);
    const content = decorateHeading(eased);
    if (mode === "doc" && depth <= 3) headings.push({ id, label, depth });
    if (mode === "slides") {
      if (depth <= 2) return "";
      return `<h3 class="slide-h">${content}</h3>\n`;
    }
    if (depth === 1 && isPartDivider(label)) {
      return `<h2 class="part-divider" id="${id}"><span>${content}</span></h2>\n`;
    }
    /* The page h1 is the chapter title, so source levels shift into h2–h5
       without skipping a level: "#" and "##" both open a section. */
    const level = Math.min(6, Math.max(2, depth));
    return `<h${level} id="${id}">${content}<a class="anchor" href="#${id}" aria-label="Link to ${esc(label)}">#</a></h${level}>\n`;
  };

  renderer.code = function (token) {
    return codeFigure(token, { compact: mode === "slides" });
  };

  renderer.blockquote = function ({ tokens }) {
    return `<blockquote class="quote">${this.parser.parse(tokens)}</blockquote>\n`;
  };

  renderer.table = function (token) {
    const head = `<tr>${token.header.map((cell, index) => `<th${align(token.align[index])}>${this.parser.parseInline(cell.tokens)}</th>`).join("")}</tr>`;
    const rows = token.rows.map((row) => `<tr>${row.map((cell, index) => `<td${align(token.align[index])}>${blanksToRules(this.parser.parseInline(cell.tokens))}</td>`).join("")}</tr>`).join("");
    return `<div class="table-wrap" role="region" tabindex="0"><table><thead>${head}</thead><tbody>${rows}</tbody></table></div>\n`;
  };

  renderer.paragraph = function ({ tokens }) {
    const content = blanksToRules(this.parser.parseInline(tokens));
    const kind = iconNoteOf(content);
    if (!kind) return `<p>${content}</p>\n`;
    /* Lift the leading emoji into its own span so it can be aligned as an icon. */
    const icon = LEADING_ICON.exec(content);
    const body = icon ? content.slice(icon[0].length) : content;
    const mark = icon ? `<span class="note-icon" aria-hidden="true">${icon[1]}</span>` : "";
    return `<p class="note-line is-${kind}">${mark}<span class="note-copy">${body}</span></p>\n`;
  };

  renderer.list = function (token) {
    const tag = token.ordered ? "ol" : "ul";
    const start = token.ordered && token.start !== 1 ? ` start="${token.start}"` : "";
    const task = token.items.some((item) => item.task);
    const body = token.items.map((item) => this.listitem(item)).join("");
    return `<${tag}${start}${task ? ' class="task-list"' : ""}>${body}</${tag}>\n`;
  };

  renderer.checkbox = () => "";

  renderer.listitem = function (item) {
    const inner = blanksToRules(this.parser.parse(item.tokens, !!item.loose));
    if (!item.task) return `<li>${inner}</li>\n`;
    const box = `<span class="task-box${item.checked ? " is-done" : ""}" aria-hidden="true"></span>`;
    const state = `<span class="visually-hidden">${item.checked ? "Done" : "To do"}: </span>`;
    return `<li class="task-item">${box}<span class="task-copy">${state}${inner.replace(/^\s+/, "")}</span></li>\n`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const label = this.parser.parseInline(tokens);
    if (/^(https?:|mailto:)/i.test(href)) {
      const rel = /^https?:/i.test(href) ? ' rel="noopener noreferrer"' : "";
      return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ""}${rel}>${label}</a>`;
    }
    const target = localTarget(href);
    return target ? `<a href="${esc(target)}">${label}</a>` : `<span class="source-reference" title="Available from the lecturer">${label}</span>`;
  };

  renderer.html = function (token) {
    const literal = esc(token.text.replace(/\n+$/, ""));
    if (!token.block) return `<code>${literal}</code>`;
    return codeFigure({ type: "code", text: token.text, lang: "html" }, { compact: mode === "slides" });
  };

  renderer.hr = function (token) {
    /* A line of underscores in a worksheet is a writing line, not a divider. */
    if (/^\s*_{3,}/.test(token.raw || "")) return '<p class="blank-line"><span class="blank is-wide"></span></p>\n';
    return mode === "slides" ? "" : '<hr class="rule">\n';
  };

  renderer.text = function (token) {
    const base = token.tokens ? this.parser.parseInline(token.tokens) : esc(token.text);
    return blanksToRules(base);
  };
  return renderer;
}

const align = (value) => (value ? ` style="text-align:${value}"` : "");

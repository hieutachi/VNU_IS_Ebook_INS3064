/* Slide deck assembly for INS3064: turns a chapter's Markdown tokens into
   focused, evenly weighted slides instead of one slide per heading. */
import { esc, foldCallouts, isBriefBlock, isPartDivider, makeRenderer, plain, renderStream, slugify } from "./render.mjs";
import { smartTitle } from "./smart-title.mjs";

const BUDGET = 22;
const CODE_BUDGET = 26;

/* Rough visual weight of a token, in "lines of slide space". */
function weigh(token) {
  switch (token.type) {
    case "space":
    case "hr":
      return 0;
    case "heading":
      return 2;
    case "code":
      return Math.min(CODE_BUDGET, token.text.split("\n").length) + 2;
    case "table":
      return token.rows.length + 3;
    case "blockquote":
      return 3;
    case "calloutBlock":
      return 2 + token.tokens.reduce((total, inner) => total + weigh(inner), 0);
    case "list":
      return token.items.reduce((total, item) => total + Math.max(1, Math.ceil(plain(item.text).split(/\s+/).length / 11)), 0) + 1;
    default:
      return Math.max(1, Math.ceil(plain(token.raw || token.text || "").split(/\s+/).length / 11));
  }
}

const PART_ICONS = [
  [/theory/i, "Theory"],
  [/example/i, "Examples"],
  [/practice/i, "Practice"],
  [/project/i, "Project"],
  [/worksheet/i, "Worksheet"],
  [/review|summary|knowledge|takeaway/i, "Review"],
  [/preparation|next/i, "Next steps"],
  [/reference/i, "Reference"],
];

function partLabel(text) {
  const label = plain(text).replace(/^[^\p{L}\p{N}]+/u, "").trim();
  for (const [pattern, name] of PART_ICONS) if (pattern.test(label)) return name;
  return label || "Session";
}

const cleanTitle = (text) => smartTitle(plain(text).replace(/^[^\p{L}\p{N}]+/u, "").trim());
/* Exercise and worksheet-part headings are boundaries a student navigates by, so
   they always start their own slide instead of sharing one with the previous task. */
const BOUNDARY_TITLE = /^(?:practical\s+)?(?:exercise|part)\s+(?:\d|[A-D]\b)/i;

/* Split the token stream into slide-sized chunks that respect headings. */
export function planSlides(tokens) {
  const slides = [];
  let part = "Start here";
  let heading = "Session overview";
  let sub = null;
  let current = null;
  let weight = 0;

  const flush = () => {
    if (current && current.tokens.length) slides.push(current);
    current = null;
    weight = 0;
  };
  const open = (options = {}) => {
    current = { part, title: heading, sub, tokens: [], kind: "content", ...options };
    weight = 0;
  };

  for (const token of foldCallouts(tokens)) {
    if (token.type === "space" || token.type === "hr") continue;

    if (token.type === "heading" && token.depth === 1 && isPartDivider(token.text)) {
      flush();
      part = partLabel(token.text);
      /* Content that follows a divider before its first heading belongs to the part. */
      heading = part;
      sub = null;
      slides.push({ kind: "part", part, title: part, tokens: [] });
      continue;
    }
    if (token.type === "heading" && token.depth <= 2) {
      flush();
      heading = cleanTitle(token.text);
      sub = null;
      if (token.depth === 1) part = partLabel(token.text);
      open();
      continue;
    }
    if (token.type === "heading" && token.depth >= 3) {
      const title = cleanTitle(token.text);
      if (current && weight > 0) {
        if (weight > BUDGET * 0.45 || BOUNDARY_TITLE.test(title)) {
          flush();
          sub = title;
          open();
        } else {
          current.tokens.push(token);
          weight += 2;
          /* The slide keeps the sub-heading it opened under, but everything that
             follows belongs to this one. Without this, later slides in the same
             section are labelled with the previous exercise's name. */
          sub = title;
        }
        continue;
      }
      sub = title;
      if (!current) open();
      current.sub = title;
      continue;
    }
    if (!current) open();

    /* A very long listing gets a slide of its own; splitting code would hurt. */
    if (token.type === "code" && token.text.split("\n").length > 26) {
      const trailing = takeTrailingHeadings(current);
      const lastHeading = [...trailing].reverse().find((item) => item.type === "heading");
      flush();
      if (lastHeading) sub = cleanTitle(lastHeading.text);
      open({ listing: true });
      for (const heldToken of trailing) {
        if (heldToken === lastHeading) continue;
        current.tokens.push(heldToken);
      }
      current.tokens.push(token);
      flush();
      continue;
    }

    const cost = isBriefBlock(token) ? 8 : weigh(token);
    if (weight && weight + cost > BUDGET) {
      /* Never end a slide on a heading or a dangling lead-in line. */
      const trailing = takeTrailingHeadings(current);
      const lastHeading = [...trailing].reverse().find((item) => item.type === "heading");
      const carry = { part, title: heading, sub, continued: !lastHeading };
      if (lastHeading) carry.sub = cleanTitle(lastHeading.text);
      flush();
      open(carry);
      sub = carry.sub ?? sub;
      for (const heldToken of trailing) {
        if (heldToken === lastHeading) continue;
        current.tokens.push(heldToken);
        weight += weigh(heldToken);
      }
    }
    current.tokens.push(token);
    weight += cost;
  }
  /* A trailing heading with nothing under it would render as an empty promise. */
  if (current) takeTrailingHeadings(current);
  flush();
  return numberRuns(slides);
}

/* Consecutive slides that share a label are one long section split across
   screens. Number them so the slide list reads "2 of 3" instead of repeating
   the same title, which is what makes a deck feel lost. */
function numberRuns(slides) {
  const labelOf = (slide) => (slide.kind === "content" ? slide.sub || slide.title || "" : "");
  let start = 0;
  for (let index = 0; index <= slides.length; index += 1) {
    const same = index < slides.length && labelOf(slides[index]) && labelOf(slides[index]) === labelOf(slides[start]);
    if (same) continue;
    const total = index - start;
    if (total > 1) {
      for (let step = 0; step < total; step += 1) {
        slides[start + step].step = step + 1;
        slides[start + step].steps = total;
        if (step > 0) slides[start + step].continued = true;
      }
    }
    start = index;
  }
  return slides;
}

/* Remove and return tokens stranded at the end of a slide: headings, and short
   lead-in lines such as "Process:" that only make sense above what follows. */
function takeTrailingHeadings(slide) {
  const held = [];
  const isLeadIn = (token) => {
    if (token.type !== "paragraph") return false;
    const text = plain(token.text || "");
    return /:$/.test(text) && text.split(/\s+/).length <= 8;
  };
  while (slide.tokens.length) {
    const last = slide.tokens[slide.tokens.length - 1];
    if (last.type !== "heading" && !isLeadIn(last)) break;
    held.unshift(slide.tokens.pop());
  }
  return held;
}

export function buildDeck({ session, tokens, localTarget }) {
  const planned = planSlides(tokens);
  const renderer = makeRenderer({ localTarget, mode: "slides" });
  const agenda = planned
    .filter((slide) => slide.kind === "content" && slide.title && !slide.continued)
    .map((slide) => slide.title)
    .filter((title, index, list) => list.indexOf(title) === index)
    .filter((title) => /^\d/.test(title))
    /* The agenda list numbers itself, so drop the source numbering. */
    .map((title) => title.replace(/^\d+(?:\.\d+)*\.?\s*/, ""))
    .slice(0, 8);

  const slides = [];
  slides.push({
    kind: "title",
    part: "Session",
    title: session.title,
    html: `<p class="title-course">INS3064 · Multimedia Design and Web Development</p>`
      + `<h2>${esc(session.title)}</h2>`
      + `<p class="title-lead">${esc(session.summary)}</p>`
      + `<p class="title-meta"><span>Session ${String(session.n).padStart(2, "0")} of 15</span><span>Use ← → to move</span></p>`,
  });
  if (agenda.length >= 3) {
    slides.push({
      kind: "agenda",
      part: "Start here",
      title: "What this session covers",
      html: `<h2>What this session covers</h2><ol class="agenda">${agenda.map((item) => `<li><span>${esc(item)}</span></li>`).join("")}</ol>`,
    });
  }
  for (const slide of planned) {
    if (slide.kind === "part") {
      slides.push({
        kind: "part", part: slide.part, title: slide.title,
        html: `<p class="part-lead">Session ${String(session.n).padStart(2, "0")}</p><h2>${esc(slide.title)}</h2>`,
      });
      continue;
    }
    const html = renderStream(slide.tokens, renderer);
    if (!plain(html) && !/<(?:figure|table|img)/.test(html)) continue;
    slides.push({ ...slide, html });
  }
  return slides.map((slide, index) => ({ ...slide, index, id: `slide-${index + 1}`, anchor: slugify(slide.title || `slide ${index + 1}`) }));
}

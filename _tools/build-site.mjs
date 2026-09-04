/* Build the public INS3064 portal from an explicit student-safe allowlist. */
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const OUT = path.join(ROOT, "site");
const ASSETS = path.join(HERE, "site-assets");
const COURSE = "INS3064 · Multimedia Design and Web Development";
const SCHOOL = "International School, Vietnam National University, Hanoi";
const RAW_SESSIONS = [
  [1,"introduction-to-php","Introduction to PHP","part_1_php_foundation/session_01_intro_php.md","PHP foundations"],
  [2,"programming-with-php","Programming with PHP","part_1_php_foundation/session_02_programming_php.md","Variables, types, control flow"],
  [3,"dynamic-websites-and-forms","Dynamic Websites and Forms","part_1_php_foundation/session_03_dynamic_websites.md","Forms and validation"],
  [4,"introduction-to-mysql","Introduction to MySQL","part_2_mysql_database/session_04_intro_mysql.md","Databases and phpMyAdmin"],
  [5,"introduction-to-sql","Introduction to SQL","part_2_mysql_database/session_05_intro_sql.md","SQL and CRUD"],
  [6,"database-design","Database Design","part_2_mysql_database/session_06_database_design.md","Normalisation and relationships"],
  [7,"advanced-sql","Advanced SQL","part_2_mysql_database/session_07_advanced_sql.md","Joins, subqueries, aggregation"],
  [8,"review-and-midterm","Review and Midterm","part_3_integration_advanced/session_08_review_midterm.md","PHP and SQL review"],
  [9,"error-handling-and-debugging","Error Handling and Debugging","part_3_integration_advanced/session_09_error_handling.md","Exceptions, logs, debugging"],
  [10,"php-with-mysql","PHP with MySQL","part_3_integration_advanced/session_10_php_mysql.md","PDO and database integration"],
  [11,"programming-techniques","Programming Techniques","part_3_integration_advanced/session_11_programming_techniques.md","OOP and MVC"],
  [12,"web-application-development","Web Application Development","part_3_integration_advanced/session_12_web_app_development.md","Application structure and CRUD"],
  [13,"cookies-and-sessions","Cookies and Sessions","part_4_security_jquery/session_13_cookies_sessions.md","State and authentication"],
  [14,"security-methods","Security Methods","part_4_security_jquery/session_14_security_methods.md","SQL injection, XSS, CSRF"],
  [15,"jquery-and-ajax","jQuery and AJAX","part_4_security_jquery/session_15_jquery_intro.md","DOM, events, AJAX"],
];
const SESSIONS = RAW_SESSIONS.map(([n,slug,title,file,summary]) => ({n,slug,title,source:`English/${file}`,summary}));
const GUIDES = [
  ["course-overview","Course Overview","English/00_course_overview.md","Outcomes, structure, and the learning path."],
  ["installation","Installation Guide","English/00_installation_guide.md","Set up XAMPP, PHP, MySQL, and VS Code."],
  ["php-mysql-cheat-sheet","PHP & MySQL Cheat Sheet","English/appendix/cheat_sheet.md","Quick syntax reference for practical work."],
].map(([slug,title,source,summary]) => ({slug,title,source,summary}));

const ESC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
const esc=(v)=>String(v??"").replace(/[&<>"']/g,(c)=>ESC[c]);
const pad=(n)=>String(n).padStart(2,"0");
const plain=(v)=>String(v??"").replace(/<[^>]*>/g,"").replace(/[`*_~]/g,"").replace(/&amp;/g,"&").trim();
const slugify=(v)=>plain(v).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,"").trim().replace(/\s+/g,"-").replace(/-+/g,"-");

function stripOpeningTitle(markdown){
  let removed=0;
  return markdown.split(/\r?\n/).filter((line)=>{
    if(removed<2&&/^#\s+/.test(line)){removed+=1;return false;}
    return true;
  }).join("\n");
}
function localTarget(href){
  const clean=decodeURIComponent(href).split("#")[0];
  const hash=href.includes("#")?`#${href.split("#").slice(1).join("#")}`:"";
  const name=path.posix.basename(clean.replace(/\\/g,"/"));
  const match=/^session_(\d{2})_.*\.md$/i.exec(name);
  if(match){const s=SESSIONS.find((item)=>pad(item.n)===match[1]);return s?`../ebook/${match[1]}-${s.slug}.html${hash}`:null;}
  if(name==="00_course_overview.md")return `../guides/course-overview.html${hash}`;
  if(name==="00_installation_guide.md")return `../guides/installation.html${hash}`;
  if(name==="cheat_sheet.md")return `../guides/php-mysql-cheat-sheet.html${hash}`;
  if(/^readme\.md$/i.test(name))return `../index.html${hash}`;
  return null;
}

function makeRenderer(headings=[]){
  const renderer=new marked.Renderer();
  const seen=new Map();
  renderer.heading=function({tokens,depth}){
    const content=this.parser.parseInline(tokens);
    const label=plain(content);
    let id=slugify(label)||`section-${headings.length+1}`;
    const count=(seen.get(id)||0)+1;seen.set(id,count);if(count>1)id+=`-${count}`;
    if(depth<=3)headings.push({id,label,depth});
    const level=Math.min(6,depth+1);
    return `<h${level} id="${id}">${content}<a class="anchor" href="#${id}" aria-label="Link to ${esc(label)}">#</a></h${level}>\n`;
  };
  renderer.link=function({href,title,tokens}){
    const label=this.parser.parseInline(tokens);
    if(/^(https?:|mailto:)/i.test(href)){
      const rel=/^https?:/i.test(href)?' rel="noopener noreferrer"':"";
      return `<a href="${esc(href)}"${title?` title="${esc(title)}"`:""}${rel}>${label}</a>`;
    }
    const target=localTarget(href);
    return target?`<a href="${esc(target)}">${label}</a>`:`<span class="source-reference" title="Available from the lecturer">${label}</span>`;
  };
  renderer.html=function(token){
    const literal=esc(token.text);
    return token.block?`<pre class="literal-html"><code>${literal}</code></pre>`:`<code>${literal}</code>`;
  };
  return renderer;
}
function renderMarkdown(markdown){
  const headings=[];
  const html=marked.parse(stripOpeningTitle(markdown),{renderer:makeRenderer(headings),gfm:true,breaks:false});
  return {html,headings};
}
function checksum(text){
  return createHash("sha256").update(text,"utf8").digest("hex");
}
function tocHtml(headings){
  if(!headings.length)return "";
  return `<nav class="toc" aria-labelledby="toc-title"><h2 id="toc-title">On this page</h2><ol>${headings.map((h)=>`<li class="depth-${h.depth}"><a href="#${h.id}">${esc(h.label)}</a></li>`).join("")}</ol></nav>`;
}
function page({title,heading,lead,body,depth=0,section="",eyebrow="INS3064 student learning portal",extraHead="",pageClass=""}){
  const base=depth?"..":".";
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — ${esc(COURSE)}</title>
<meta name="description" content="${esc(lead)}">
<meta name="generator" content="INS3064 static-site builder">
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
${depth?`<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>${esc(section)}</span></nav>`:""}
<main id="main"><header class="page-head"><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(heading)}</h1><p class="lead">${esc(lead)}</p></header>${body}</main>
<footer class="footer"><div><strong>INS3064</strong><p>${esc(SCHOOL)}</p></div><p>Student learning materials. Assessment files, solutions, rubrics, and lecturer-only resources are not published here.</p></footer>
<script src="${base}/assets/site.js" defer></script>
</body></html>`;
}

function sourceHead(source,raw){
  return `<meta name="source-file" content="${esc(source)}">\n<meta name="source-sha256" content="${checksum(raw)}">\n`;
}
function pager(session,folder){
  const previous=SESSIONS.find((item)=>item.n===session.n-1);
  const next=SESSIONS.find((item)=>item.n===session.n+1);
  const link=(item,label)=>item?`<a href="${pad(item.n)}-${item.slug}.html">${label}: Session ${item.n}</a>`:"<span></span>";
  return `<nav class="pager" aria-label="Adjacent sessions">${link(previous,"Previous")}${link(next,"Next")}</nav>`;
}
function documentPage(item,raw,{kind,number=null}){
  const rendered=renderMarkdown(raw);
  const label=number?`Session ${number}`:kind;
  return page({
    title:item.title,heading:item.title,lead:item.summary,depth:1,section:kind,
    eyebrow:`${label} · INS3064`,pageClass:"reading-page",extraHead:sourceHead(item.source,raw),
    body:`${tocHtml(rendered.headings)}<article class="doc" data-source="${esc(item.source)}">${rendered.html}</article>${number?pager(item,kind.toLowerCase()):""}`,
  });
}
function listPage({kind,heading,lead,items,href}){
  const cards=items.map((item)=>`<li class="resource-card"><span class="badge">${esc(kind)}</span><a href="${href(item)}"><strong>${esc(item.title)}</strong></a><p>${esc(item.summary)}</p></li>`).join("\n");
  return page({title:heading,heading,lead,depth:1,section:kind,eyebrow:`${items.length} resources`,body:`<ul class="resource-grid">${cards}</ul>`});
}
function sessionCards(prefix=""){
  return SESSIONS.map((s)=>`<li class="session-card" data-session-card><span class="session-number">SESSION ${pad(s.n)}</span><a href="${prefix}sessions/session-${pad(s.n)}.html"><h2>${esc(s.title)}</h2><p>${esc(s.summary)}</p></a><div class="links"><a href="${prefix}ebook/${pad(s.n)}-${s.slug}.html">Read</a><a href="${prefix}slides/${pad(s.n)}-${s.slug}.html">Slides</a></div></li>`).join("\n");
}
function sessionsIndex(){
  return page({title:"Sessions",heading:"Your 15-session learning path",lead:"Read the chapter, review the lecture deck, then practise locally.",depth:1,section:"Sessions",eyebrow:"INS3064 course map",body:`<div class="filter-box"><label for="session-filter">Filter sessions</label><input id="session-filter" type="search" placeholder="Filter by topic: PHP, SQL, security…" data-filter="[data-session-card]"><span class="filter-status" data-filter-status></span></div><ul class="session-grid">${sessionCards("../")}</ul>`});
}
function sessionPage(s){
  const nn=pad(s.n);
  const previous=SESSIONS.find((item)=>item.n===s.n-1);
  const next=SESSIONS.find((item)=>item.n===s.n+1);
  const adjacent=(item,label)=>item?`<a href="session-${pad(item.n)}.html">${label}: Session ${item.n}</a>`:"<span></span>";
  const body=`<div class="session-flow"><section class="flow-card"><span class="step">01 · Before class</span><h2>Read the chapter</h2><p>Study the explanation and type the examples yourself.</p><a class="button-link primary" href="../ebook/${nn}-${s.slug}.html">Open chapter ${s.n}</a></section><section class="flow-card"><span class="step">02 · In class and review</span><h2>Use the lecture deck</h2><p>Move with arrow keys, Page Up/Page Down, J/K, Home, or End.</p><a class="button-link" href="../slides/${nn}-${s.slug}.html">Open slides</a></section></div><aside class="notice"><p><strong>Practice:</strong> complete tasks in your local XAMPP project. Submission, grading, exam material, and answer keys are intentionally not hosted here.</p></aside><nav class="pager" aria-label="Adjacent sessions">${adjacent(previous,"Previous")}${adjacent(next,"Next")}</nav>`;
  return page({title:`Session ${s.n}: ${s.title}`,heading:s.title,lead:s.summary,depth:1,section:"Sessions",eyebrow:`Session ${nn} · 15`,body});
}

function deckGroups(raw){
  const tokens=marked.lexer(stripOpeningTitle(raw),{gfm:true});
  const groups=[];let current=[];
  for(const token of tokens){
    if(token.type==="heading"&&token.depth<=2&&current.some((item)=>item.type!=="space"&&item.type!=="hr")){
      groups.push(current);current=[];
    }
    current.push(token);
  }
  if(current.some((item)=>item.type!=="space"&&item.type!=="hr"))groups.push(current);
  return groups;
}
function deckPage(session,raw){
  const groups=deckGroups(raw);
  const titleSlide=`<section class="deck-slide deck-title" id="slide-1" tabindex="-1" data-slide><p class="deck-kicker">INS3064 · Session ${pad(session.n)}</p><h2>${esc(session.title)}</h2><p>${esc(session.summary)}</p></section>`;
  const optionLabels=[session.title];
  const deckRenderer=makeRenderer([]);
  const content=groups.map((tokens,index)=>{
    const heading=tokens.find((token)=>token.type==="heading");
    optionLabels.push(heading?plain(heading.text):"Session overview");
    const html=marked.parser(tokens,{renderer:deckRenderer,gfm:true});
    return `<section class="deck-slide" id="slide-${index+2}" tabindex="-1" data-slide>${html}</section>`;
  }).join("\n");
  const options=optionLabels.map((label,index)=>`<option value="${index}">${index+1}. ${esc(label)}</option>`).join("");
  const body=`<nav class="deck-toolbar" aria-label="Slide controls"><button type="button" data-deck-prev aria-label="Previous slide">←</button><select data-deck-select aria-label="Choose a slide">${options}</select><span class="deck-counter" data-deck-counter>1 / ${groups.length+1}</span><button type="button" data-deck-next aria-label="Next slide">→</button></nav><div class="deck" data-deck>${titleSlide}${content}</div><p class="keyboard-help">Keyboard: ←/→, Page Up/Page Down, J/K, Home, End. Each slide scrolls when its content is taller than the screen.</p>`;
  return page({title:`Slides: ${session.title}`,heading:`Session ${session.n} slides`,lead:session.title,depth:1,section:"Slides",eyebrow:`${groups.length+1} responsive slides`,pageClass:"deck-page",extraHead:sourceHead(session.source,raw),body});
}
function homePage(){
  const resources=[
    ["Sessions","A guided route through all 15 weeks.","sessions/index.html","Course map"],
    ["Ebook","Complete English PHP and MySQL chapters.","ebook/index.html","Read"],
    ["Lecture slides","Responsive decks generated from the chapters.","slides/index.html","Review"],
    ["Setup & reference","Installation, overview, and cheat sheet.","guides/index.html","Guides"],
  ].map(([title,summary,href,label])=>`<li class="resource-card"><span class="badge">${label}</span><a href="${href}"><strong>${title}</strong></a><p>${summary}</p></li>`).join("");
  const body=`<div class="hero-actions"><a class="button-link primary" href="sessions/session-01.html">Start Session 1</a><a class="button-link" href="#course">Explore the course</a></div><div class="stat-row"><div class="stat"><strong>15</strong><span>guided sessions</span></div><div class="stat"><strong>PHP 8+</strong><span>server-side foundation</span></div><div class="stat"><strong>MySQL</strong><span>data and application skills</span></div></div><section><div class="section-head"><div><p class="eyebrow">Everything in one place</p><h2>Choose a resource</h2></div><p>Student-safe materials for reading and review. Work through programming tasks in your local XAMPP project.</p></div><ul class="resource-grid">${resources}</ul></section><section id="course"><div class="section-head"><div><p class="eyebrow">15-session path</p><h2>Learn from syntax to AJAX</h2></div><p>Start with PHP, build a database-backed application, then add authentication, security, and interactivity.</p></div><ul class="session-grid">${sessionCards()}</ul></section>`;
  return page({title:"Student Learning Portal",heading:"Build dynamic web applications.",lead:"INS3064 learning materials for PHP, MySQL, web security, jQuery, and AJAX — organised into one clear path.",eyebrow:"INS3064 · Student learning portal",pageClass:"home-page",body});
}
async function write(rel,content){const target=path.join(OUT,rel);await mkdir(path.dirname(target),{recursive:true});await writeFile(target,content,"utf8");}

async function build(){
  for(const item of [...SESSIONS,...GUIDES]){
    if(!existsSync(path.join(ROOT,item.source)))throw new Error(`Missing allowlisted source: ${item.source}`);
  }
  await rm(OUT,{recursive:true,force:true});
  for(const dir of ["assets","ebook","slides","sessions","guides"])await mkdir(path.join(OUT,dir),{recursive:true});
  await cp(path.join(ASSETS,"site.css"),path.join(OUT,"assets","site.css"));
  await cp(path.join(ASSETS,"site.js"),path.join(OUT,"assets","site.js"));
  await write(".nojekyll","");
  const sourceBytes=[];
  for(const session of SESSIONS){
    const raw=await readFile(path.join(ROOT,session.source),"utf8");
    sourceBytes.push(Buffer.byteLength(raw));
    await write(`ebook/${pad(session.n)}-${session.slug}.html`,documentPage(session,raw,{kind:"Ebook",number:session.n}));
    await write(`slides/${pad(session.n)}-${session.slug}.html`,deckPage(session,raw));
    await write(`sessions/session-${pad(session.n)}.html`,sessionPage(session));
  }
  for(const guide of GUIDES){
    const raw=await readFile(path.join(ROOT,guide.source),"utf8");
    sourceBytes.push(Buffer.byteLength(raw));
    await write(`guides/${guide.slug}.html`,documentPage(guide,raw,{kind:"Guides"}));
  }
  await write("index.html",homePage());
  await write("sessions/index.html",sessionsIndex());
  await write("ebook/index.html",listPage({kind:"Ebook",heading:"The INS3064 ebook",lead:"Fifteen chapters in teaching order, from PHP syntax to secure AJAX applications.",items:SESSIONS,href:(s)=>`${pad(s.n)}-${s.slug}.html`}));
  await write("slides/index.html",listPage({kind:"Slides",heading:"Lecture slides",lead:"Responsive review decks generated from the complete English chapters.",items:SESSIONS,href:(s)=>`${pad(s.n)}-${s.slug}.html`}));
  await write("guides/index.html",listPage({kind:"Guides",heading:"Setup and quick reference",lead:"Prepare your environment and keep essential syntax nearby.",items:GUIDES,href:(g)=>`${g.slug}.html`}));
  console.log(`Built site/: 15 chapters, 15 decks, 15 session hubs, 3 guides (${sourceBytes.reduce((a,b)=>a+b,0).toLocaleString()} source bytes).`);
}
build().catch((error)=>{console.error(error.stack||error);process.exitCode=1;});

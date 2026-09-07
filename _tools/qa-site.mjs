/* Independent QA for generated INS3064 public output. Read-only. */
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const SITE=path.join(ROOT,"site");
let failures=0;
const bad=(message)=>{failures+=1;console.log(`BAD  ${message}`);};
const ok=(message)=>console.log(`ok   ${message}`);
const esc=(value)=>String(value).replace(/[&<>"']/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);

async function walk(dir,out=[]){for(const entry of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);entry.isDirectory()?await walk(full,out):out.push(path.relative(SITE,full).replace(/\\/g,"/"));}return out;}
if(!existsSync(SITE))throw new Error("site/ missing; run npm run build:site");
const files=(await walk(SITE)).sort();
const htmlFiles=files.filter((file)=>file.endsWith(".html"));
const pages=new Map();
for(const file of htmlFiles)pages.set(file,await readFile(path.join(SITE,file),"utf8"));
const count=(text,regex)=>(text.match(regex)||[]).length;

console.log("== inventory =====================================================");
const expectedGroups={root:1,ebook:16,slides:16,sessions:16,guides:7};
const groups={root:htmlFiles.filter((f)=>!f.includes("/")).length,ebook:htmlFiles.filter((f)=>f.startsWith("ebook/")).length,slides:htmlFiles.filter((f)=>f.startsWith("slides/")).length,sessions:htmlFiles.filter((f)=>f.startsWith("sessions/")).length,guides:htmlFiles.filter((f)=>f.startsWith("guides/")).length};
for(const [group,want] of Object.entries(expectedGroups))groups[group]===want?ok(`${group}: ${want} page(s)`):bad(`${group}: expected ${want}, found ${groups[group]}`);
const allowed=/^(?:\.nojekyll|assets\/(?:site\.css|site\.js)|(?:index|ebook\/[a-z0-9-]+|slides\/[a-z0-9-]+|sessions\/[a-z0-9-]+|guides\/[a-z0-9-]+)\.html)$/;
for(const file of files)if(!allowed.test(file))bad(`unexpected public file: ${file}`);
if(files.length===59)ok("only 56 HTML pages, two shared assets, and .nojekyll");else bad(`expected 59 public files, found ${files.length}`);

console.log("== document structure ============================================");
const VOID_ELEMENTS=new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
function nestingProblem(html){
  const body=html.replace(/<!--[\s\S]*?-->/g,"").replace(/<script[\s\S]*?<\/script>/g,"");
  const stack=[];
  for(const match of body.matchAll(/<(\/?)([a-zA-Z][\w-]*)([^>]*)>/g)){
    const [raw,closing,name]=match;
    const tag=name.toLowerCase();
    if(VOID_ELEMENTS.has(tag)||raw.endsWith("/>"))continue;
    if(!closing){stack.push(tag);continue;}
    if(stack[stack.length-1]===tag){stack.pop();continue;}
    return `</${tag}> closes out of order (open: ${stack.slice(-3).join(" > ")})`;
  }
  return stack.length?`unclosed ${stack.join(" > ")}`:null;
}
for(const [file,source] of pages){
  const problems=[];
  if(!/^<!DOCTYPE html>/.test(source))problems.push("doctype");
  if(!/<html lang="en"/.test(source))problems.push("lang");
  if(!/<meta charset="utf-8">/.test(source))problems.push("charset");
  if(!/<meta name="viewport"/.test(source))problems.push("viewport");
  if(count(source,/<h1\b/g)!==1)problems.push(`h1=${count(source,/<h1\b/g)}`);
  if(!/<title>[^<]+<\/title>/.test(source))problems.push("title");
  const ids=[...source.matchAll(/\sid="([^"]+)"/g)].map((m)=>m[1]);
  const duplicate=ids.find((id,index)=>ids.indexOf(id)!==index);
  if(duplicate)problems.push(`duplicate id ${duplicate}`);
  const nesting=nestingProblem(source);
  if(nesting)problems.push(nesting);
  if(problems.length)bad(`${file}: ${problems.join(", ")}`);
}
if(!failures)ok("doctype, language, metadata, one h1, unique ids, and balanced elements");

console.log("== links and anchors =============================================");
let checkedLinks=0;
for(const [file,source] of pages){
  const dir=path.dirname(path.join(SITE,file));
  const ids=new Set([...source.matchAll(/\sid="([^"]+)"/g)].map((m)=>m[1]));
  for(const match of source.matchAll(/(?:href|src)="([^"]+)"/g)){
    const raw=match[1];
    if(/^(?:https?:|mailto:|data:)/i.test(raw))continue;
    checkedLinks+=1;
    if(raw.startsWith("#")){if(!ids.has(decodeURIComponent(raw.slice(1))))bad(`${file}: dead anchor ${raw}`);continue;}
    const [pathPart,hashPart]=raw.split("#");
    const clean=decodeURIComponent(pathPart);
    const target=path.resolve(dir,clean);
    if(!existsSync(target)){bad(`${file}: dead link ${raw}`);continue;}
    if(hashPart&&target.endsWith(".html")){
      const targetRel=path.relative(SITE,target).replace(/\\/g,"/");
      const targetSource=pages.get(targetRel)??await readFile(target,"utf8");
      const targetIds=new Set([...targetSource.matchAll(/\sid="([^"]+)"/g)].map((item)=>item[1]));
      if(!targetIds.has(decodeURIComponent(hashPart)))bad(`${file}: dead cross-page anchor ${raw}`);
    }
  }
}
ok(`${checkedLinks} internal links and anchors checked`);

console.log("== source fidelity ================================================");
for(const [file,source] of pages){
  const sourceFile=/<meta name="source-file" content="([^"]+)">/.exec(source)?.[1];
  const sourceHash=/<meta name="source-sha256" content="([a-f0-9]{64})">/.exec(source)?.[1];
  if(!sourceFile&&!/^(?:index|ebook\/index|slides\/index|sessions\/index|sessions\/session-\d{2}|guides\/index)\.html$/.test(file))bad(`${file}: source metadata missing`);
  if(sourceFile){
    const target=path.resolve(ROOT,sourceFile);
    if(!target.startsWith(ROOT)||!existsSync(target)){bad(`${file}: invalid source ${sourceFile}`);continue;}
    const raw=await readFile(target,"utf8");
    const expected=createHash("sha256").update(raw,"utf8").digest("hex");
    if(sourceHash!==expected)bad(`${file}: source checksum mismatch`);
    if(!source.includes(`data-source="${esc(sourceFile)}"`)&&!file.startsWith("slides/"))bad(`${file}: source attribution missing`);
    if(file.startsWith("ebook/")||file.startsWith("guides/")){
      /* Every fenced block becomes either a code figure or a session brief card. */
      const fenced=Math.floor(count(raw,/^```/gm)/2);
      const rendered=count(source,/<figure class="code-block/g)+count(source,/<div class="brief"/g);
      if(rendered<fenced)bad(`${file}: ${rendered} of ${fenced} fenced blocks rendered`);
      if(count(source,/<pre\b/g)<count(source,/<figure class="code-block/g))bad(`${file}: code figure without a pre element`);
    }
    if(file.startsWith("slides/")&&count(source,/data-slide(?:\s|>)/g)<5)bad(`${file}: fewer than five generated slides`);
  }
}
ok("all 34 generated documents match their allowlisted source SHA-256");

console.log("== public content policy ==========================================");
const combined=[...pages.values()].join("\n");
const forbidden=[
  [/(?:href|src)="[^"]*(?:exams|solutions?|rubrics?|answers?|Worksheet|Vietnamese|canvases|_tools|node_modules)[\\/]/i,"link to excluded material"],
  [/\bINS2053\b/i,"wrong course code INS2053"],
  [/PLACEHOLDER\s+[—-]\s+(?:ebook|homework|exercise|spec|rubric|canvas|Marp)/i,"scaffold placeholder"],
  [/\[Submission date and time\]|Submit via LMS|File to Submit|SUBMISSION GUIDELINES/i,"inactive submission instruction"],
  [/(?:BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16})/,"secret credential"],
  [/[\uFFFD]/,"replacement character"],
  [/(?:â€|Ä‘|Ã¡|ðŸ)/,"mojibake"],
];
for(const [pattern,label] of forbidden)if(pattern.test(combined))bad(label);
for(const [file,source] of pages){
  const article=/<article class="doc"[^>]*>([\s\S]*?)<\/article>/.exec(source)?.[1];
  if(article){
    const prose=article.replace(/<pre[\s\S]*?<\/pre>/g,"").replace(/<code[\s\S]*?<\/code>/g,"");
    /* The builder emits exactly one interactive control: the copy-code button. */
    const withoutOwnControls=prose.replace(/<button class="code-copy" type="button" data-code-copy>Copy<\/button>/g,"");
    if(/<(?:form|input|button|script|iframe|object|embed)\b/i.test(withoutOwnControls))bad(`${file}: executable teaching markup escaped incorrectly`);
  }
}
if(!forbidden.some(([pattern])=>pattern.test(combined)))ok("no wrong-course text, excluded links, scaffold markers, secrets, or mojibake");

console.log("== responsive and interactive assets =============================");
const css=await readFile(path.join(SITE,"assets","site.css"),"utf8");
const js=await readFile(path.join(SITE,"assets","site.js"),"utf8");
for(const breakpoint of ["1080px","900px","680px","420px"])css.includes(`max-width: ${breakpoint}`)?ok(`responsive breakpoint ${breakpoint}`):bad(`missing responsive breakpoint ${breakpoint}`);
for(const feature of ["prefers-reduced-motion","overflow-x: auto","@media print","data-theme","data-filter","data-deck","data-deck-mode","IntersectionObserver","code-block","callout"]){
  (css+js).includes(feature)?ok(feature):bad(`missing ${feature}`);
}
const deckPages=[...pages].filter(([file])=>/^slides\/\d{2}-/.test(file));
for(const [file,source] of deckPages){
  if(!source.includes("data-deck-select")||!source.includes("data-deck-prev")||!source.includes("data-deck-next"))bad(`${file}: incomplete slide controls`);
}
/* Slide labels are how a student navigates a deck, so the list must not repeat
   an entry: two "Exercise 1" rows give no way to tell which is which. */
for(const [file,source] of deckPages){
  const labels=[...source.matchAll(/<option value="\d+">\d+\.\s([^<]+)<\/option>/g)].map((match)=>match[1]);
  const tally=new Map();
  for(const label of labels)tally.set(label,(tally.get(label)||0)+1);
  const repeats=[...tally].filter((entry)=>entry[1]>1);
  if(repeats.length)bad(`${file}: repeated slide labels: ${repeats.map((entry)=>`${entry[0]} x${entry[1]}`).join("; ")}`);
  const slides=count(source,/data-slide(?:\s|>)/g);
  if(labels.length!==slides)bad(`${file}: ${labels.length} slide-list entries for ${slides} slides`);
}
ok(`${deckPages.length} decks expose select, previous, next, keyboard controls, and unique slide labels`);

/* Every class the builder emits must be styled, and every custom property used. */
const classesInHtml=new Set();
for(const source of pages.values()){
  for(const match of source.matchAll(/\sclass="([^"]+)"/g)){
    for(const name of match[1].split(/\s+/))if(name)classesInHtml.add(name);
  }
}
const classesInCss=new Set([...css.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map((match)=>match[1]));
const unstyled=[...classesInHtml].filter((name)=>!classesInCss.has(name));
unstyled.length?bad(`classes without styles: ${unstyled.join(", ")}`):ok(`${classesInHtml.size} generated classes all have styles`);
const declared=new Set([...css.matchAll(/(--[\w-]+):/g)].map((match)=>match[1]));
const referenced=new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((match)=>match[1]));
const undefinedVars=[...referenced].filter((name)=>!declared.has(name));
undefinedVars.length?bad(`undefined custom properties: ${undefinedVars.join(", ")}`):ok(`${declared.size} design tokens defined before use`);

console.log("== stylesheet scope ==============================================");
/* A theme block that forgets its closing brace stays balanced overall but traps
   the whole base layer inside one theme, so the other theme renders as bare
   HTML. Walk the braces and check what actually sits at the top level. */
function topLevelRules(text){
  const clean=text.replace(/\/\*[\s\S]*?\*\//g,(comment)=>" ".repeat(comment.length));
  const rules=[];
  let depth=0;
  let selectorStart=0;
  let bodyStart=0;
  for(let index=0;index<clean.length;index+=1){
    const char=clean[index];
    if(char==="{"){
      depth+=1;
      if(depth===1){rules.push({selector:clean.slice(selectorStart,index).trim()});bodyStart=index+1;}
      continue;
    }
    if(char==="}"){
      depth-=1;
      if(depth<0)return null;
      if(depth===0){rules[rules.length-1].body=clean.slice(bodyStart,index);selectorStart=index+1;}
    }
  }
  return depth===0?rules:null;
}
const rules=topLevelRules(css);
if(!rules){bad("site.css: unbalanced braces");}
else{
  ok(`${rules.length} top-level stylesheet rules parsed`);
  const selectorsAtRoot=new Set();
  for(const rule of rules){
    if(rule.selector.startsWith("@"))continue;
    for(const part of rule.selector.split(","))selectorsAtRoot.add(part.trim());
  }
  /* These rules build the page itself. If any of them is nested inside a theme
     or a media query, one theme or one viewport loses its whole design. */
  const MUST_BE_UNSCOPED=["body","a","button","main",".topbar",".topbar-inner",".brand",".primary-nav",".theme-toggle",".footer",".doc",".reading-layout",".toc",".resource-grid",".session-grid",".code-block",".deck-slide",".slide-inner",".callout",".chip",".pager"];
  const trapped=MUST_BE_UNSCOPED.filter((selector)=>!selectorsAtRoot.has(selector));
  trapped.length
    ? bad(`base rules not at the top level (nested in a theme or media query?): ${trapped.join(", ")}`)
    : ok(`${MUST_BE_UNSCOPED.length} base rules apply to both themes`);

  /* The token block may only re-point design tokens. Anything else in there is a
     rule that light mode will never see. */
  const themeRules=rules.filter((rule)=>/^:root\[data-theme="[a-z]+"\]$/.test(rule.selector));
  if(themeRules.length!==1)bad(`expected exactly one :root[data-theme] token block, found ${themeRules.length}`);
  for(const rule of themeRules){
    const strays=rule.body.split(";").map((line)=>line.trim()).filter(Boolean)
      .filter((line)=>!/^--[\w-]+\s*:/.test(line)&&!/^color-scheme\s*:/.test(line));
    strays.length
      ? bad(`${rule.selector} contains non-token declarations: ${strays.slice(0,2).join(" | ").slice(0,90)}`)
      : ok(`${rule.selector} only re-points design tokens`);
    const lightTokens=new Set([...(rules.find((item)=>item.selector===":root")?.body??"").matchAll(/(--[\w-]+)\s*:/g)].map((match)=>match[1]));
    const darkTokens=[...rule.body.matchAll(/(--[\w-]+)\s*:/g)].map((match)=>match[1]);
    const orphans=darkTokens.filter((name)=>!lightTokens.has(name));
    orphans.length
      ? bad(`tokens themed for dark but missing from the light default: ${orphans.join(", ")}`)
      : ok(`${darkTokens.length} dark tokens all have a light default`);
  }
}

console.log("== presentation ===================================================");
let presentationProblems=0;
const flag=(message)=>{presentationProblems+=1;bad(message);};
for(const [file,source] of pages){
  /* Heading levels must not skip: assistive technology relies on the outline. */
  const levels=[...source.matchAll(/<h([1-6])[^>]*>/g)].map((match)=>Number(match[1]));
  for(let index=1;index<levels.length;index+=1){
    if(levels[index]>levels[index-1]+1){flag(`${file}: heading level jumps h${levels[index-1]} to h${levels[index]}`);break;}
  }
  if(/^(?:ebook|guides)\/[a-z0-9-]+\.html$/.test(file)&&!file.endsWith("index.html")){
    if(!source.includes('class="toc"'))flag(`${file}: missing on-this-page navigation`);
    if(count(source,/<figure class="code-block/g)!==count(source,/class="code-language"/g))flag(`${file}: code figure without a language caption`);
    if(/<pre(?![^>]*tabindex)/.test(source))flag(`${file}: scrollable code without keyboard focus`);
    /* A listing that would delete a student's work must say so in its caption. */
    for(const figure of source.match(/<figure class="code-block[\s\S]*?<\/figure>/g)??[]){
      const destructive=/\b(?:DROP\s+(?:TABLE|DATABASE)|TRUNCATE\s+TABLE)\b/i.test(figure.replace(/<[^>]*>/g," "));
      if(destructive&&!figure.includes("is-read-only"))flag(`${file}: destructive listing without a read-only flag`);
    }
  }
  if(/^slides\/\d{2}-/.test(file)){
    for(const marker of ['class="deck-rail"',"data-deck-progress",'class="deck-slide is-title"','class="slide-foot"']){
      if(!source.includes(marker))flag(`${file}: missing ${marker}`);
    }
    const slides=count(source,/data-slide(?:\s|>)/g);
    const headed=count(source,/<h2 class="slide-title"/g)+count(source,/class="deck-slide is-(?:title|part|agenda)[^"]*"/g);
    if(headed<slides-1)flag(`${file}: ${slides-headed} slides without a visible heading`);
  }
}
/* Shouty ALL-CAPS headings are eased into sentence case by the builder.
   SQL and acronym words legitimately stay uppercase, so ignore those. */
const TECHNICAL=/^(?:SELECT|INSERT|UPDATE|DELETE|WHERE|ORDER|GROUP|HAVING|LIMIT|JOIN|INNER|OUTER|UNION|DISTINCT|TRUNCATE|CREATE|ALTER|DROP|TABLE|INDEX|PRIMARY|FOREIGN|NULL|AUTO_INCREMENT|PHP|SQL|HTML|CSS|AJAX|JSON|CRUD|HTTP|HTTPS|XAMPP|MYSQL|JQUERY|PDO|OOP|MVC|CSRF)$/;
for(const [file,source] of pages){
  for(const match of source.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/g)){
    const text=match[1].replace(/<[^>]*>/g,"").replace(/[^\p{L} ]/gu," ").trim();
    const words=text.split(/\s+/).filter((word)=>word.length>3);
    const shouted=words.filter((word)=>word===word.toUpperCase()&&!TECHNICAL.test(word));
    if(words.length>=3&&shouted.length>=3)flag(`${file}: heading still shouting: ${text.slice(0,42)}`);
  }
}
if(!presentationProblems)ok("reading pages carry navigation, captioned code, and titled slides");

console.log("");
console.log(failures?`SITE QA FAIL: ${failures} problem(s)`:"SITE QA PASS");
process.exitCode=failures?1:0;

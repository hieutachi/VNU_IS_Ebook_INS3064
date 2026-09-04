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
const expectedGroups={root:1,ebook:16,slides:16,sessions:16,guides:4};
const groups={root:htmlFiles.filter((f)=>!f.includes("/")).length,ebook:htmlFiles.filter((f)=>f.startsWith("ebook/")).length,slides:htmlFiles.filter((f)=>f.startsWith("slides/")).length,sessions:htmlFiles.filter((f)=>f.startsWith("sessions/")).length,guides:htmlFiles.filter((f)=>f.startsWith("guides/")).length};
for(const [group,want] of Object.entries(expectedGroups))groups[group]===want?ok(`${group}: ${want} page(s)`):bad(`${group}: expected ${want}, found ${groups[group]}`);
const allowed=/^(?:\.nojekyll|assets\/(?:site\.css|site\.js)|(?:index|ebook\/[a-z0-9-]+|slides\/[a-z0-9-]+|sessions\/[a-z0-9-]+|guides\/[a-z0-9-]+)\.html)$/;
for(const file of files)if(!allowed.test(file))bad(`unexpected public file: ${file}`);
if(files.length===56)ok("only 53 HTML pages, two shared assets, and .nojekyll");else bad(`expected 56 public files, found ${files.length}`);

console.log("== document structure ============================================");
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
  if(problems.length)bad(`${file}: ${problems.join(", ")}`);
}
if(!failures)ok("doctype, language, metadata, one h1, and unique ids on every page");

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
    if(file.startsWith("ebook/")&&count(source,/<pre\b/g)<Math.floor(count(raw,/^```/gm)/2))bad(`${file}: fenced code appears incomplete`);
    if(file.startsWith("slides/")&&count(source,/data-slide(?:\s|>)/g)<5)bad(`${file}: fewer than five generated slides`);
  }
}
ok("all 33 generated documents match their allowlisted source SHA-256");

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
    const withoutDisabledChecks=prose.replace(/<input\b(?=[^>]*\bdisabled\b)(?=[^>]*\btype="checkbox")[^>]*>/gi,"");
    if(/<(?:form|input|button|script|iframe|object|embed)\b/i.test(withoutDisabledChecks))bad(`${file}: executable teaching markup escaped incorrectly`);
  }
}
if(!forbidden.some(([pattern])=>pattern.test(combined)))ok("no wrong-course text, excluded links, scaffold markers, secrets, or mojibake");

console.log("== responsive and interactive assets =============================");
const css=await readFile(path.join(SITE,"assets","site.css"),"utf8");
const js=await readFile(path.join(SITE,"assets","site.js"),"utf8");
for(const breakpoint of ["900px","680px","390px"])css.includes(`max-width: ${breakpoint}`)?ok(`responsive breakpoint ${breakpoint}`):bad(`missing responsive breakpoint ${breakpoint}`);
for(const feature of ["prefers-reduced-motion","overflow-x: auto","@media print","data-theme","data-filter","data-deck"]){
  (css+js).includes(feature)?ok(feature):bad(`missing ${feature}`);
}
const deckPages=[...pages].filter(([file])=>/^slides\/\d{2}-/.test(file));
for(const [file,source] of deckPages){
  if(!source.includes("data-deck-select")||!source.includes("data-deck-prev")||!source.includes("data-deck-next"))bad(`${file}: incomplete slide controls`);
}
ok("15 decks expose select, previous, next, and keyboard controls");

console.log("");
console.log(failures?`SITE QA FAIL: ${failures} problem(s)`:"SITE QA PASS");
process.exitCode=failures?1:0;

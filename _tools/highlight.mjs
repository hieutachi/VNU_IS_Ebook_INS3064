/* Dependency-free build-time syntax highlighting for INS3064 teaching code.
   Tokens are matched on raw source, then escaped individually, so output is
   always safe HTML and never executes teaching markup. */

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESC[char]);

const PHP_KEYWORDS = "abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include_once|include|instanceof|insteadof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require_once|require|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield";
const PHP_TYPES = "bool|float|int|iterable|mixed|object|parent|self|string|void|never";
const SQL_KEYWORDS = "ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTO_INCREMENT|BETWEEN|BY|CASCADE|CASE|CHANGE|CHARACTER|CHARSET|CHECK|COLLATE|COLUMN|COMMENT|CONSTRAINT|CREATE|CROSS|DATABASE|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|ELSE|END|ENGINE|EXISTS|EXPLAIN|FOREIGN|FROM|FULL|GRANT|GROUP|HAVING|IF|IGNORE|IN|INDEX|INNER|INSERT|INTO|IS|JOIN|KEY|LEFT|LIKE|LIMIT|MODIFY|NOT|NULL|OFFSET|ON|OR|ORDER|OUTER|PRIMARY|REFERENCES|RENAME|REPLACE|RESTRICT|REVOKE|RIGHT|SELECT|SET|SHOW|TABLE|THEN|TRUNCATE|UNION|UNIQUE|UNSIGNED|UPDATE|USE|USING|VALUES|VIEW|WHEN|WHERE|WITH|ZEROFILL";
const SQL_TYPES = "BIGINT|BLOB|BOOLEAN|CHAR|DATETIME|DATE|DECIMAL|DOUBLE|ENUM|FLOAT|INT|JSON|LONGTEXT|MEDIUMINT|SMALLINT|TEXT|TIME|TIMESTAMP|TINYINT|VARCHAR|YEAR";
const JS_KEYWORDS = "async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|get|if|import|in|instanceof|let|new|of|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield";

/* Each rule is [pattern source, class name, optional nested renderer].
   Rule patterns must use non-capturing groups only. */
function phpRules() {
  return [
    ["\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*|#(?!\\[)[^\\n]*", "t-com"],
    ["<\\?php|<\\?=|\\?>", "t-meta"],
    ["'(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"", "t-str"],
    ["<\\/?[A-Za-z][\\w:-]*|\\/?>", "t-tag"],
    ["\\$(?:this\\b|[A-Za-z_]\\w*)", "t-var"],
    [`\\b(?:${PHP_KEYWORDS})\\b`, "t-kw"],
    ["\\b(?:true|false|null|TRUE|FALSE|NULL)\\b", "t-lit"],
    [`\\b(?:${PHP_TYPES})\\b(?=\\s*[$)|])`, "t-type"],
    ["\\b[A-Za-z_]\\w*(?=\\s*\\()", "t-fn"],
    ["\\b[A-Z][A-Z0-9_]{2,}\\b", "t-const"],
    ["\\b\\d[\\d_]*(?:\\.\\d+)?\\b", "t-num"],
    ["=>|->|::|[=+\\-*/%<>!.?:&|]+", "t-op"],
  ];
}

function sqlRules() {
  return [
    ["--[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/", "t-com"],
    ["'(?:''|\\\\.|[^'\\\\])*'", "t-str"],
    ["`[^`]*`", "t-att"],
    [`\\b(?:${SQL_KEYWORDS})\\b`, "t-kw"],
    [`\\b(?:${SQL_TYPES})\\b`, "t-type"],
    ["\\b(?:TRUE|FALSE|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME)\\b", "t-lit"],
    ["\\b(?:AVG|CONCAT|COALESCE|COUNT|CURDATE|CURRENT_TIMESTAMP|DATEDIFF|DATE_FORMAT|DAY|IFNULL|LENGTH|LOWER|MAX|MIN|MONTH|NOW|ROUND|SUBSTRING|SUM|TRIM|UPPER|YEAR)\\b(?=\\s*\\()", "t-fn"],
    ["\\b\\d+(?:\\.\\d+)?\\b", "t-num"],
    ["[=<>!]+|\\*|,|;", "t-op"],
  ];
}

function jsRules() {
  return [
    ["\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*", "t-com"],
    ["`(?:\\\\.|\\$\\{[^}]*\\}|[^`\\\\])*`|'(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"", "t-str"],
    [`\\b(?:${JS_KEYWORDS})\\b`, "t-kw"],
    ["\\b(?:true|false|null|undefined|NaN)\\b", "t-lit"],
    ["\\$(?=\\s*\\()|\\$\\.[A-Za-z_]\\w*|\\bjQuery\\b", "t-fn"],
    ["\\b(?:document|window|console|JSON|Math|Object|Array|Promise|fetch)\\b", "t-const"],
    ["\\b[A-Za-z_]\\w*(?=\\s*\\()", "t-fn"],
    ["\\b\\d[\\d_]*(?:\\.\\d+)?\\b", "t-num"],
    ["=>|===|!==|[=+\\-*/%<>!?:.&|]+", "t-op"],
  ];
}

function cssRules() {
  return [
    ["\\/\\*[\\s\\S]*?\\*\\/", "t-com"],
    ["'(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\"", "t-str"],
    ["@[A-Za-z-]+", "t-kw"],
    ["[.#][A-Za-z_][\\w-]*", "t-const"],
    ["[A-Za-z-]+(?=\\s*:)", "t-att"],
    ["#[0-9a-fA-F]{3,8}\\b|\\b\\d+(?:\\.\\d+)?(?:px|rem|em|%|s|ms|vh|vw|fr|deg)?\\b", "t-num"],
    ["[{}:;,>]", "t-op"],
  ];
}

function htmlRules() {
  return [
    ["<!--[\\s\\S]*?-->", "t-com"],
    ["<!(?:DOCTYPE|doctype)[^>]*>", "t-meta"],
    ["<\\?(?:php|=)[\\s\\S]*?(?:\\?>|$)", "t-embed", (text) => `<span class="t-embed">${highlight(text, "php")}</span>`],
    ["<(?:script|style)\\b[^>]*>[\\s\\S]*?<\\/(?:script|style)>", "t-embed", (text) => {
      const open = /^<[^>]*>/.exec(text)[0];
      const close = /<\/[^>]*>$/.exec(text)?.[0] ?? "";
      const inner = text.slice(open.length, text.length - close.length);
      const lang = /^<script/i.test(open) ? "javascript" : "css";
      return `${highlight(open, "html")}<span class="t-embed">${highlight(inner, lang)}</span>${highlight(close, "html")}`;
    }],
    ["<\\/?[A-Za-z][\\w:-]*", "t-tag"],
    ["'[^']*'|\"[^\"]*\"", "t-str"],
    ["\\b[A-Za-z_:][\\w:.-]*(?==)", "t-att"],
    ["\\/?>", "t-tag"],
    ["&[a-zA-Z#0-9]+;", "t-lit"],
  ];
}

function shellRules() {
  return [
    ["#[^\\n]*", "t-com"],
    ["'[^']*'|\"(?:\\\\.|[^\"\\\\])*\"", "t-str"],
    ["\\b(?:cd|composer|copy|curl|echo|git|mkdir|mysql|node|npm|php|sudo|xampp)\\b", "t-kw"],
    ["(?<=\\s)-{1,2}[A-Za-z][\\w-]*", "t-att"],
    ["\\b\\d+\\b", "t-num"],
  ];
}

function iniRules() {
  return [
    [";[^\\n]*|#[^\\n]*", "t-com"],
    ["^[ \\t]*\\[[^\\]\\n]+\\]", "t-const"],
    ["^[ \\t]*[A-Za-z_][\\w.]*(?=[ \\t]*=)", "t-att"],
    ["\\b(?:On|Off|true|false)\\b", "t-lit"],
    ["\\b\\d+[KMG]?\\b", "t-num"],
    ["=", "t-op"],
  ];
}

const RULES = { php: phpRules, sql: sqlRules, javascript: jsRules, css: cssRules, html: htmlRules, shell: shellRules, ini: iniRules };
const LABELS = { php: "PHP", sql: "SQL", javascript: "JavaScript", css: "CSS", html: "HTML", shell: "Terminal", ini: "Config", diagram: "Structure", output: "Output", text: "Notes" };
const ALIASES = {
  js: "javascript", jsx: "javascript", json: "javascript",
  bash: "shell", sh: "shell", console: "shell", cmd: "shell", powershell: "shell",
  mysql: "sql", htm: "html", scss: "css", conf: "ini",
  txt: "text", plaintext: "text", plain: "text",
};

export function normalizeLanguage(lang) {
  const key = String(lang ?? "").trim().toLowerCase().split(/[\s:,]/)[0];
  return ALIASES[key] ?? key;
}

/* Most fenced blocks in the course sources carry no language, so infer one. */
export function detectLanguage(code, lang) {
  const declared = normalizeLanguage(lang);
  if (declared && (RULES[declared] || LABELS[declared])) return declared;
  const sample = String(code ?? "");
  if (/[\u2500-\u257F]/.test(sample)) return "diagram";
  if (/^\s*(?:<!(?:DOCTYPE|doctype)|<html\b)/.test(sample)) return "html";
  if (/<\?php|<\?=/.test(sample)) return "php";
  if (/^[ \t]*(?:--[^\n]*\n)*[ \t]*(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+(?:TABLE|DATABASE)|ALTER\s+TABLE|DROP\s+(?:TABLE|DATABASE)|SHOW\s+\w|USE\s+\w)/im.test(sample)) return "sql";
  if (/<!DOCTYPE|<html|<\/(?:div|form|table|body|head|section|ul|p)>/i.test(sample)) return "html";
  if (/\$\(\s*(?:document|['"#.])|\bfunction\s*\(|=>|\bconsole\.log\b/.test(sample)) return "javascript";
  if (/^[ \t]*[A-Za-z-]+\s*:\s*[^\n]+;[ \t]*$/m.test(sample) && /[{}]/.test(sample)) return "css";
  if (/^[ \t]*(?:\$|>)[ \t]+\S|^[ \t]*(?:npm|php|mysql|composer|git|cd)[ \t]+\S/m.test(sample)) return "shell";
  if (/^[ \t]*[A-Za-z_][\w.]*[ \t]*=[ \t]*\S+[ \t]*$/m.test(sample) && !/\s{2,}\S/.test(sample)) return "ini";
  return "output";
}

export function languageLabel(lang) {
  return LABELS[lang] ?? (lang ? lang.toUpperCase() : "Code");
}

export function highlight(code, lang) {
  const language = normalizeLanguage(lang);
  const build = RULES[language];
  const source = String(code ?? "");
  if (!build) return esc(source);
  const rules = build();
  const pattern = new RegExp(rules.map(([expression]) => `(${expression})`).join("|"), "gm");
  let out = "";
  let last = 0;
  let match;
  while ((match = pattern.exec(source))) {
    if (!match[0]) { pattern.lastIndex += 1; continue; }
    if (match.index > last) out += esc(source.slice(last, match.index));
    const group = match.findIndex((value, index) => index > 0 && value !== undefined);
    const [, className, nested] = rules[group - 1];
    out += nested ? nested(match[0]) : `<span class="${className}">${esc(match[0])}</span>`;
    last = match.index + match[0].length;
  }
  return out + esc(source.slice(last));
}

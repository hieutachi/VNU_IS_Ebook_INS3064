# INS3064 — Multimedia Design and Web Development

English and Vietnamese learning materials for the 15-session PHP, MySQL, security, and jQuery course at VNU International School.

## Assessment

Weights are defined in `schedule.md` and repeated here because these are the two files
people read first:

| Component | Weight |
|---|---|
| Attendance, Participation & Homework | 10% |
| Midterm Exam (practical) | 30% |
| Final Exam (practical) | 20% |
| Capstone Project (Campus Club Hub) | 40% |

`node _tools/check-weights.js` fails if this table and `schedule.md` disagree.

## Student website

Published portal: <https://hieutachi.github.io/INS3064-Student-Site/>

The portal contains only student-safe material selected by an explicit allowlist:

- 15 English ebook chapters from `English/`
- 15 responsive lecture decks generated from the same reviewed chapters
- start here page, course overview, installation guide, and PHP/MySQL cheat sheet

Exam papers, solutions, rubrics, unfinished scaffold folders, authoring scripts, worksheets, and legacy binaries are not copied to the public site.

## Source layout

| Path | Purpose |
|---|---|
| `English/` | Canonical English ebook and guides |
| `Vietnamese/` | Vietnamese edition |
| `Slide/` | Legacy HTML slide sources retained for course history |
| `_tools/build-site.mjs` | Deterministic static-site builder |
| `_tools/render.mjs` | Markdown-to-HTML renderer: headings, callouts, tables, code figures |
| `_tools/highlight.mjs` | Language detection and syntax highlighting for fenced blocks |
| `_tools/deck.mjs` | Slide planner that splits a chapter into height-budgeted slides |
| `_tools/smart-title.mjs` | Heading case normaliser that preserves keywords and acronyms |
| `_tools/qa-render.mjs` | Unit QA for highlighting, heading case, and slide planning |
| `_tools/qa-site.mjs` | Output, link, content-policy, presentation, and responsive QA |
| `_tools/site-assets/` | Shared portal CSS and JavaScript |
| `site/` | Generated output; ignored in this source repository |

Other local folders may contain work in progress. Their presence does not make them publishable; the builder reads only the source paths declared in `_tools/build-site.mjs`.

## Local build

Requires Node.js 20 or newer.

```bash
npm ci
npm run verify
```

Open `site/index.html`, or serve `site/` with any static web server.

## Publishing model

This repository remains the authoring source. The generated `site/` directory is deployed to the separate public repository `hieutachi/INS3064-Student-Site`. Do not configure GitHub Pages directly from this source repository because it also stores lecturer and work-in-progress material.

## License

Course materials are provided for non-commercial educational use under CC BY-NC-SA 4.0 unless a file states otherwise.

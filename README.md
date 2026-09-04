# INS3064 — Multimedia Design and Web Development

English and Vietnamese learning materials for the 15-session PHP, MySQL, security, and jQuery course at VNU International School.

## Student website

Published portal: <https://hieutachi.github.io/INS3064-Student-Site/>

The portal contains only student-safe material selected by an explicit allowlist:

- 15 English ebook chapters from `English/`
- 15 responsive lecture decks generated from the same reviewed chapters
- course overview, installation guide, and PHP/MySQL cheat sheet

Exam papers, solutions, rubrics, unfinished scaffold folders, authoring scripts, worksheets, and legacy binaries are not copied to the public site.

## Source layout

| Path | Purpose |
|---|---|
| `English/` | Canonical English ebook and guides |
| `Vietnamese/` | Vietnamese edition |
| `Slide/` | Legacy HTML slide sources retained for course history |
| `_tools/build-site.mjs` | Deterministic static-site builder |
| `_tools/qa-site.mjs` | Output, link, content-policy, and responsive QA |
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

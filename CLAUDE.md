# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static Chinese-language community knowledge base for Claude Code, deployed to GitHub Pages at `https://stacktao.github.io/ClaudeCodeGuide/`. Content is authored in numbered Markdown chapter files under `content/{guide,commands,skills,examples,sources}/`; the site is a zero-dependency static page that loads a generated JS data file.

## Commands

- `npm run dev` — builds once then serves `dist/` at `http://127.0.0.1:4173/` (see `scripts/server.js:17`)
- `npm run build` — regenerates `dist/` from `content/` and `src/` (see `scripts/build-site.js`)
- `npm run check` — `node -c` syntax-check the three JS files; the only available "test"

There are no dependencies (`package.json` has no `dependencies`/`devDependencies`); only Node.js built-ins are used. No installation step is needed.

On Windows PowerShell, `npm.ps1` execution policy may block `npm`. Use `npm.cmd` instead (`npm.cmd run build`).

## Architecture

The site has three layers; understanding the boundary between them is the key to making changes safely.

1. **Authoring** — `content/{guide,commands,skills,examples,sources}/*.md`. Each directory maps to one top-level "doc" registered in the `docs` array at `scripts/build-site.js:7`. Chapter files use numeric prefixes for order, such as `00-overview.md` and `01-intro.md`. Adding a new top-level doc requires editing that array; adding a normal chapter only requires adding a numbered Markdown file in the right directory.

2. **Build** — `scripts/build-site.js` reads each doc directory in filename order, splits the combined stream into sections on `#` / `##` headings (code fences are respected, so `#` inside ``` blocks doesn't trigger a split), slugifies headings (including CJK punctuation stripping) with collision suffixes, and emits `dist/docs-data.js` as a single `window.DOCS = [...]` assignment. Each section keeps its real `sourceFile` so edit links and Issue templates point at the right chapter file. The build also copies `src/{index.html,app.js,styles.css,404.html}`, plus root `README.md` and `.nojekyll`, into `dist/`. `dist/` is fully rebuilt (`fs.rmSync` then `mkdir`) on every run.

3. **Runtime** — `src/app.js` is loaded by `src/index.html` and consumes `window.DOCS`. It contains its own minimal inline-Markdown renderer (`inlineMarkdown` at `src/app.js:66`) handling only `` ` ``, `**`, and `[]()` — it is **not** a full CommonMark renderer. Code fences and structural elements are handled separately. The slugify function in `src/app.js:50` mirrors the one in the build script; if you change one, change both, or section anchors will break.

Never edit `dist/` by hand — it is regenerated. Only edit `content/` and `src/`.

## Deployment

`.github/workflows/pages.yml` triggers on push to `main`, runs `npm run build`, verifies `dist/index.html` and `dist/docs-data.js` exist, then publishes `dist/` to GitHub Pages. Node 22. There is no separate `gh-pages` branch.

## Conventions

- Markdown headings drive navigation: only `#` and `##` create section anchors. `###` and below render normally but are not separately addressable.
- The first heading in each top-level doc directory becomes the doc's `overview` section. Later files keep their heading-derived section slugs.
- Preserve existing heading text when possible; section slugs are URL fragments, and changing headings can break shared links.
- The site's GitHub repo, branch, and Pages URL are hard-coded in `src/app.js:1` (`SITE_CONFIG`) — update there if the repo moves. The feedback / Issue draft links read from this config.

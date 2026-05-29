# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static Chinese-language community knowledge base for Claude Code, deployed to GitHub Pages at `https://stacktao.github.io/ClaudeCodeGuide/`. Content is authored in numbered Markdown chapter files under `content/{guide,commands,skills,examples,changelog,sources}/`; the site is a zero-dependency static page that loads a generated JS data file.

## Commands

- `npm run dev` — builds once then serves `dist/` at `http://127.0.0.1:4173/` (see `scripts/server.js:17`)
- `npm run build` — regenerates `dist/` from `content/` and `src/` (see `scripts/build-site.js`)
- `npm run check` — `node -c` syntax-check the three JS files; the only available "test"

There are no dependencies (`package.json` has no `dependencies`/`devDependencies`); only Node.js built-ins are used. No installation step is needed.

On Windows PowerShell, `npm.ps1` execution policy may block `npm`. Use `npm.cmd` instead (`npm.cmd run build`).

## Architecture

The site has three layers; understanding the boundary between them is the key to making changes safely.

1. **Authoring** — `content/{guide,commands,skills,examples,changelog,sources}/*.md`. Each directory maps to one top-level "doc" registered in the `docs` array at `scripts/build-site.js:7`. Chapter files use numeric prefixes for order, such as `00-overview.md` and `01-intro.md`. Adding a new top-level doc requires editing that array; adding a normal chapter only requires adding a numbered Markdown file in the right directory.

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

## Changelog mirror maintenance

`content/changelog/` is a **full Chinese mirror of the official Claude Code changelog** (`https://code.claude.com/docs/en/changelog`, canonical source `https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`). The user maintains this on request: **when they say a new version shipped and ask to update, append the new entries.** As of the last full sync it covers all 300 releases (v2.1.156 → v0.2.21).

How to update when new versions ship:

1. Download the latest `CHANGELOG.md` (e.g. `curl -s https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md`). On Windows, save to a Windows-accessible path like `C:/Users/<user>/cc-changelog.md` — the bash `/tmp` dir is NOT visible to the Read tool here.
2. Find versions newer than the top of `content/changelog/01-*.md` (currently 2.1.156). **Prepend** them to that file, keeping the file's `## v2.1.x 系列（newest – oldest）` heading range accurate (or start a new `01-`-prefixed series file and renumber if a new minor series like 2.2.x appears).
3. Translation style is **full faithful translation, grouped** into bold labels `**新功能**` / `**改进**` / `**修复**` / `**安全**` / `**其他**` (only the groups that are present). One `### X.Y.Z` heading per version.
4. **Keep in English (inside backticks):** commands (`/model`), flags (`--worktree`), env vars (`CLAUDE_CODE_*`), settings keys, file names, model IDs, and `[VSCode]`/`[SDK]`/`[Windows]` platform tags. Translate the prose around them.
5. Only `##` version-series headings become nav anchors; individual `### X.Y.Z` versions render but are intentionally **not** separate anchors (keeps the changelog nav to one entry per series file). The series-navigation table and "last synced" date live in `00-overview.md` — bump the date there.
6. Rebuild and verify: `npm.cmd run build && npm.cmd run check`, then sanity-check with `node -e "global.window={};require('./dist/docs-data.js');…"` that the `changelog` doc's `### ` version count matches the source. Commit `content/changelog/` plus the rebuilt `dist/app.js` + `dist/docs-data.js`, then push to `main`.

The official changelog has **no dates** — do not invent them. Series files are split at ~14 versions each to stay manageable; numeric filename prefixes (`01`…`12`) order newest-to-oldest.

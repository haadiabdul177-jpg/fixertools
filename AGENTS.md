# FixerTools — project notes

## Stack
Plain static HTML/CSS/JS, no build step. Deployed on Cloudflare Pages at https://fixertools.online/.
GitHub remote: https://github.com/haadiabdul177-jpg/fixertools.git (branch `main`).

## URL conventions (important)
- Internal links MUST be root-relative clean URLs: `/about`, `/age-calculator`, `/#tools`.
  Never link to `*.html` — Cloudflare 307‑redirects those to the clean URL, which wastes a hop.
- Canonical tags, `sitemap.xml` and `tools-data.js` `url` fields all use the same clean paths.
- Assets (style.css, tools.js, tools-data.js, favicons) stay relative (`./style.css`) so the site
  also works from a subdirectory and in local `file://` preview.

## Editing tool listings
`tools-data.js` is the single source of truth for the homepage cards and the "Explore More Tools"
section on every tool page. Add/rename/hide a tool there, not in the HTML.
The homepage also has a static card list in `index.html` — a new tool needs a card there too.

## ⚠️ Sandbox git warning (learned the hard way)
`git count-objects` in this sandbox always reports `.git/objects/*/.l2s.tmp_obj_*` as "garbage".
**Never delete those files.** They are the real loose object store on this filesystem layer;
deleting them empties the object database and destroys all commits (`fatal: bad object HEAD`).
Recovery means `rm -rf .git` and rebuilding from the working tree, which changes commit hashes.
The "garbage" warnings are cosmetic noise — ignore them.

## Git / deployment
- No GitHub credentials exist in this sandbox (no credential helper, no token, no askpass).
  `git push` over HTTPS therefore fails with `remote: No anonymous write access`.
- Always run network git commands with `GIT_TERMINAL_PROMPT=0`, otherwise git blocks forever
  waiting for an interactive username prompt and the command is killed on timeout.
- Anonymous **fetch/read works** (`git ls-remote`, `git fetch`), so remote history can be inspected.
- Because the remote has real history, never `git init` + push a fresh root commit — it would be
  rejected as non-fast-forward. Base work on `git fetch origin main` first.

## Known server-side settings (Cloudflare dashboard, not in this repo)
- `.html` → clean URL redirect is currently **307 Temporary**; should be **301 Permanent** to clear
  Google Search Console "Redirect error" reports.
- Cloudflare's managed robots.txt injects an AI‑bot `Disallow` block that conflicts with our own
  `Allow` groups for GPTBot / ClaudeBot / Google‑Extended.

## Local preview
Open `index.html` directly, or use the preview tool. No dev server required.

## Tool inventory (15 tools, 6 categories)
Calculators: age, percentage, bmi, loan-emi, gst · Text: word-counter, case-converter ·
Developer: password-generator, qr-code-generator, json-formatter · Converters: volume-converter ·
Image: image-compressor, youtube-thumbnail-downloader, image-to-text · Other: pdf-compressor.
`image-to-text` uses Tesseract.js from a CDN (loaded on demand, not on initial page load).

## Next steps
1. Push to GitHub with real credentials, let Cloudflare Pages deploy.
2. Change the `.html` → clean URL redirect from 307 to 301 in Cloudflare, then request re-indexing
   in Search Console for the 8 URLs flagged "Redirect error".
3. Resolve the managed robots.txt AI-bot conflict in Cloudflare.
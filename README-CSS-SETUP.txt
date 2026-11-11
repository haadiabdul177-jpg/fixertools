FixerTools — Shared CSS update
================================

WHAT CHANGED
- All 19 HTML pages now load the same root-level stylesheet: /style.css
- Page-specific CSS was moved into clearly labelled sections in style.css and scoped to each page.
- Existing inline style attributes were moved into stylesheet classes.
- Shared Inter typography, responsive focus states, reduced-motion support, and central theme tokens were added.
- Privacy Policy and Cookie Policy now explain browser-side tool processing and planned Google AdSense advertising more clearly.

HOW TO CHANGE THE SITE-WIDE THEME
Open style.css and edit the FIXERTOOLS GLOBAL THEME TOKENS near the top:
--ft-bg, --ft-surface, --ft-surface-soft, --ft-ink, --ft-muted,
--ft-line, --ft-brand, --ft-brand-dark, --ft-mint, and --ft-navy.

All page CSS is in this one file. Each page-specific section is labelled with its HTML filename.
For page-specific design changes, edit the matching labelled section lower down in style.css.

PRESERVED
- Existing tool JavaScript and JSON-LD script contents.
- Existing page filenames, internal links, canonical URLs, SEO titles/descriptions, sitemap.xml and robots.txt.
- Existing external tool library references.

ADVERTISING NOTE
The supplied ZIP did not contain an AdSense script, Google AdSense account meta tag, or ads.txt file.
No advertising code or publisher settings were added or changed. The policy pages now disclose the planned use of Google AdSense and describe the data/cookie handling that may occur when ads are enabled.

CHECKS
- All HTML pages have exactly one /style.css reference.
- No embedded <style> blocks or inline style attributes remain in the HTML pages.
- CSS parsed without syntax errors.
- All 26 executable inline JavaScript blocks passed Node syntax checks.
- Existing inline script contents were verified unchanged.
- Page structure, canonical metadata, and internal page links were checked.

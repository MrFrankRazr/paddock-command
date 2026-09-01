# Paddock Command Publishing Workflow

## Purpose

Paddock Command uses a review-first publishing process that connects the daily Editorial Desk and Social Desk to the GitHub Pages production site without sacrificing editorial control.

## Daily sequence

1. **07:00 — Editorial Desk**
   - Reviews the current race calendar, reliable current developments and existing editorial slate.
   - Produces an Editorial Pack only when a meaningful website update is warranted.
2. **Editorial review**
   - Verify facts, source quality, title, SEO description, internal links and publication priority.
   - Decide whether the item becomes a new article, an update to an existing article, or a homepage briefing change.
3. **Repository change**
   - Until direct GitHub write actions are available in ChatGPT, generate a versioned release package containing the exact changed files.
   - Upload the complete approved release to the `paddock-command` repository and commit it.
   - When connector write access is available, prefer a branch + pull request workflow for editorial changes.
4. **Production validation**
   - Confirm the canonical URL returns HTTP 200.
   - Test desktop/mobile layout, internal links, sitemap entry, structured data, monetization modules and analytics.
5. **08:00 — Social Desk**
   - Builds X, Instagram and Facebook copy around the live site content and current race cycle.
   - Social promotion should point to the canonical Paddock Command URL whenever a relevant site article/tool exists.

## GitHub release convention

- Version production releases as `vMAJOR.MINOR.PATCH`.
- Use concise commits such as `Add social publishing foundation v2.6.0` or `Publish Italian GP debrief`.
- Never mix unreviewed editorial facts with unrelated code changes when a focused content-only release is possible.
- Preserve `CNAME`, `.nojekyll`, PWA files, analytics scripts and monetization configuration on every full-repository upload.

## Article publication checklist

- Unique title, description and canonical URL.
- Current facts verified against authoritative/reliable sources.
- Article JSON-LD and Organization social identity present.
- 2–4 relevant internal links to Paddock Command tools.
- Added to `articles.html` and `sitemap.xml` when it is a new article.
- Independent-site disclaimer retained.
- Affiliate modules are contextual, disclosed and controlled by `monetization-config.js`.
- No official Formula 1 logos or misleading affiliation claims.

## Social channels

- X: https://x.com/PaddockCommand
- Instagram: https://www.instagram.com/paddockcommand/
- Facebook: https://www.facebook.com/PaddockCommand
- YouTube: https://www.youtube.com/@PaddockCommand

Threads is intentionally omitted while the account is unavailable.

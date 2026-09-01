# Paddock Command v2.7.0 — Social & Publishing Foundation

This release expands Paddock Command from a primarily single-page application into a search-friendly publishing surface while preserving the interactive command center.

## v2.1 additions

- Crawlable landing pages for standings, drivers, constructors, calendar, circuits, records, news, race weekend, comparisons, Fan Picks and the Scenario Calculator
- Direct landing-page handoff into the matching interactive dashboard view (`/?view=...`)
- Articles hub with three original evergreen race-intelligence guides
- Expanded internal linking from the main site footer
- Expanded `sitemap.xml` from the small legal/support set to the full public content surface
- Restored/verified PWA support files: `manifest.webmanifest`, `sw.js`, `favicon.svg`, `.nojekyll`, `CNAME`, `robots.txt`
- Current service-worker cache: v2.3.0
- Current app and stylesheet cache-busting: v2.3.0
- Existing analytics retained; `trackEvent()` now sends custom events to Zaraz when available

## Search Console after deployment

Resubmit `https://paddockcommand.com/sitemap.xml`, then use URL Inspection on several high-value pages such as `/standings.html`, `/drivers.html`, `/calendar.html`, `/records.html` and `/articles.html`. Indexing is controlled by Google and can take time even after successful sitemap discovery.

---

## Paddock Command v2.0.2

This release adds structured engagement-event instrumentation for Cloudflare Zaraz and restores the full PWA/SEO support file set (manifest, service worker, favicon, robots, sitemap, CNAME, .nojekyll). Cloudflare Web Analytics remains enabled for aggregate page traffic.

# Paddock Command v2.0.0

Paddock Command is an independent, static-hosted motorsport intelligence dashboard. This release rebrands the F1 Pulse project and adds a production-readiness layer while retaining the established race-data features.

## v2.0 production layer

- New Paddock Command independent brand identity
- PWA manifest and service worker
- Installable mobile/desktop application shell
- Offline fallback shell
- SEO, canonical, Open Graph and social-card metadata
- robots.txt and sitemap.xml
- About, Data Sources, Privacy, Terms, Disclosures and Contact pages
- Independent-site disclaimer and IP-safe brand positioning
- Accessibility improvements including skip navigation, focus states and reduced-motion support
- Analytics event hook (`paddockcommand:analytics`) with optional Plausible compatibility
- Monetization-ready hidden ad-slot architecture
- Custom 404 page
- GitHub Pages / Cloudflare custom-domain template
- Cache-busted v2.0.0 assets

## Existing fan features retained

Current/historical seasons, standings, race winners, calendar, circuits, Live Race Weekend Center, weather, driver/constructor profiles, Trends, Form, Head-to-Head, Scenario Calculator, My Paddock favorites, Records, Fan Picks, News, share cards and Circuit Intelligence.

## Data sources

- Jolpica F1 API — championship/race data
- Open-Meteo — race-weekend weather
- Public publisher feeds/links — headlines

Paddock Command does not claim to provide official real-time lap timing or telemetry.

## GitHub Pages deployment

For the current GitHub Pages URL, upload the complete v2 files except `CNAME-TEMPLATE.txt`. Keep the existing custom-domain setting unchanged until the Cloudflare DNS cutover.

When ready to activate `paddockcommand.com`:

1. Verify the domain in GitHub Pages settings.
2. Configure Cloudflare DNS for GitHub Pages.
3. Set the custom domain in GitHub Pages.
4. Create a root `CNAME` file containing only `paddockcommand.com` (or let GitHub create it).
5. Wait for DNS/HTTPS validation, then enable **Enforce HTTPS**.
6. Test both `paddockcommand.com` and `www.paddockcommand.com`.

Do not rename `CNAME-TEMPLATE.txt` before the domain cutover.

## Local testing

Service workers require HTTP(S). Use a local static server instead of double-clicking index.html, for example:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080.

## Public contact email

The static pages use `contact@paddockcommand.com`. Configure that address or Cloudflare Email Routing before public launch.

## Legal note

Paddock Command is an unofficial independent fan site. Formula 1 and related marks are referenced editorially and remain the property of their respective owners. This repository does not include official Formula 1 logos or circuit-outline artwork.


## Analytics

Cloudflare Web Analytics is enabled on all public HTML pages using the site beacon for `paddockcommand.com`. Traffic data is available in the Cloudflare dashboard under Web Analytics.


## v2.0.3

Adds manual Cloudflare Zaraz loading from `https://analytics.paddockcommand.com/cdn-cgi/zaraz/i.js` for the DNS-only GitHub Pages deployment. Existing Cloudflare Web Analytics remains enabled. Engagement events continue to use `zaraz.track()` when Zaraz is available.


## v2.2.2 corrective release
Major SEO routes now render the complete live Paddock Command application rather than static-only landing pages. Editorial article pages retain crawlable long-form content with expanded navigation and corrected brand sizing.


## v2.2.2 navigation correction
Primary navigation now uses canonical HTML URLs for every major section while client-side interception preserves instant in-app navigation. Added crawlable pages for Live Center, Form, Trends, My Paddock, and Winners; updated sitemap and service-worker cache.

## v2.2.2 navigation visual correction

- Restores the compact pill-style primary navigation used before the SEO routing change.
- Removes browser-default underlines from canonical HTML navigation links.
- Prevents desktop navigation labels from wrapping onto two lines.
- Keeps every primary navigation item as a real crawlable `.html` URL.
- Restores the accessibility skip link to its hidden-until-focused behavior.
- Adds tighter responsive spacing for medium-width desktop displays.


## v2.2.2 — Editorial & Growth Engine

- Adds the first current-season editorial slate: Italian GP preview, Championship Watch, Dutch GP debrief, Driver Form Watch and Monza Circuit Guide.
- Adds Article structured data, source notes, related-story navigation and direct links into live Paddock Command tools.
- Adds a Paddock Briefing module to Race Control so editorial content feeds engagement back into the application.
- Expands `/articles/` into a current + evergreen editorial hub.
- Adds `EDITORIAL-WORKFLOW.md` with a repeatable race-weekend publishing cadence and editorial standards.
- Expands the sitemap with current editorial URLs.
- Updates PWA/app cache to v2.2.2.


## v2.2.2 routing fix
- Editorial hub is now `/articles.html`.
- Articles is included in the primary top navigation.
- `/articles/` remains a compatibility redirect only.


## v2.3.0 — Monetization Foundation

This release adds a disabled-by-default commercial framework so revenue features can be activated deliberately after partner approval.

- `monetization-config.js` centralizes ad/affiliate/sponsor activation.
- `monetization.js` handles disclosure-aware affiliate links and Zaraz commercial events.
- Reserved ad inventory remains hidden until an approved ad provider is integrated.
- Affiliate recommendation modules remain hidden until a configured approved destination exists.
- `MONETIZATION-SETUP.md` documents activation and testing.
- `ads.txt.example` is provided for future ad-network setup; do not rename it to `ads.txt` until a network supplies a real publisher record.
- Commercial clicks are separated from ordinary outbound source links in analytics.
- App/PWA cache version is v2.3.0.


## v2.7.0 — Expedia Affiliate Launch

- Activates Expedia as Paddock Command's first approved affiliate partner.
- Adds disclosure-aware Race Weekend Travel modules to Live Center, Circuits, Circuit Intel and selected editorial pages.
- Tracks Expedia referrals through Zaraz `affiliate_click` events.
- Adds MutationObserver-based monetization refresh for dynamically rendered Circuit Intel content.
- Keeps display advertising disabled.
- App/PWA cache version is v2.7.0.


## v2.7.0 — Social & Publishing Foundation

- Adds live Paddock Command links for X, Instagram, Facebook and YouTube across public site footers and organization structured data.
- Updates Contact and About with the production Microsoft 365 business email identities.
- Adds `twitter:site=@PaddockCommand` metadata and Organization `sameAs` identity data.
- Replaces ambiguous legacy PWA/favicon monogram assets with the clearer PC social mark.
- Adds reusable `social-profile.png`, `social-banner.png` and `youtube-banner.png` brand assets.
- Adds `PUBLISHING-WORKFLOW.md` for Editorial Desk → review → GitHub → production → Social Desk handoff.
- Adds `SOCIAL-CHANNELS.md` as the source-of-truth for channel roles, addresses and brand assets.
- Keeps Expedia affiliate integration active and display advertising disabled.
- App/PWA cache version is v2.7.0.


## v2.7.0 Audience Capture
MailerLite-powered Paddock Command Race Weekend Briefing with contextual signup modules, dedicated newsletter landing page, privacy disclosure and Zaraz engagement events.

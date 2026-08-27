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

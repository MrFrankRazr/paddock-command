# Paddock Command engagement events

Version 2.0.2 instruments non-personal product events through the `trackEvent()` helper. If Cloudflare Zaraz is active, these are sent through `zaraz.track()`; otherwise they remain harmless local browser events.

Core events:

- `navigation` — primary view/jump navigation
- `season_change` — historical/current season selector changes
- `data_refresh` — manual main, Live Center, or News refresh
- `driver_profile_open` / `constructor_profile_open`
- `circuit_intel_open`
- `race_weekend_open`
- `favorite_add` / `favorite_remove`
- `comparison_type` / `comparison_update`
- `trend_toggle`
- `scenario_update` / `scenario_reset`
- `fan_pick_save` / `fan_pick_clear`
- `share_card` — comparison or Fan Pick share-card generation
- `outbound_click` — external-domain link clicks
- `pwa_install_prompt` / `pwa_installed`

Events intentionally exclude email addresses, names entered by visitors, account IDs, IP addresses, or other first-party identity fields.


## Monetization events (v2.3.0)

| Event | Purpose | Key properties |
|---|---|---|
| `affiliate_click` | Measures approved affiliate-link engagement | `placement`, `affiliate_key`, `merchant`, `campaign` |
| `sponsor_click` | Measures labeled sponsor-link engagement | `sponsor`, `placement` |
| `outbound_click` | Measures ordinary external links separately from paid links | `host`, `path`, `placement` |

Commercial events are emitted by `monetization.js`; paid features remain disabled by default in `monetization-config.js`.


## Expedia v2.5.0

`affiliate_click` includes:
- `affiliate_key`: `expediaTravel`
- `merchant`: `Expedia`
- `campaign`: `race-weekend-travel`
- `placement`: identifies Live Center, Circuits, Circuit Intel or editorial placement.


## Newsletter events (v2.7.0)

- `newsletter_impression` — MailerLite form rendered/initialized on a Paddock Command placement.
- `newsletter_cta_click` — visitor engages the newsletter submit/CTA control.
- `newsletter_signup_success` — best-effort browser detection of MailerLite confirmation/success state.

Properties: `placement`, `provider` (`MailerLite`), and `form_id`. No email addresses or subscriber names are sent to Zaraz by Paddock Command.


## v2.7 Growth attribution
- `acquisition_landing` — fires once per session when UTM parameters are present; includes source, medium, campaign, content, term and landing_path.
- `internal_link_click` — records navigation between Paddock Command pages with from_path, to_path and link_text.

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

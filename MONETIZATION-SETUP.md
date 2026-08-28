# Paddock Command Monetization Setup — v2.3.0

Paddock Command v2.3.0 is revenue-ready but intentionally ships with all paid monetization disabled.

## Design principles

1. Editorial/statistical content remains usable without commercial links.
2. Affiliate and sponsored links must be visibly disclosed and use `rel="sponsored"`.
3. Advertising inventory is reserved in non-disruptive locations and stays hidden until an ad provider is configured.
4. Commercial clicks are tracked as structured Zaraz events; ordinary source/reference links remain distinguishable as `outbound_click`.
5. Never paste a partner URL directly throughout the site. Add it once in `monetization-config.js` and bind page links with `data-affiliate-key`.

## Affiliate activation

Edit `monetization-config.js` only after Paddock Command is accepted into an affiliate program.

Example:

```js
window.PC_MONETIZATION_CONFIG = {
  version: '2.3.0',
  ads: { enabled: false, provider: '', publisherId: '' },
  affiliates: {
    enabled: true,
    disclosureUrl: '/disclosures.html',
    links: {
      simRacing: {
        href: 'APPROVED_AFFILIATE_URL',
        merchant: 'Merchant Name',
        campaign: 'sim-racing'
      }
    }
  },
  sponsors: { enabled: false }
};
```

The matching HTML link uses `data-affiliate-key="simRacing"`. It remains hidden until a configured destination exists.

## Advertising activation

Reserved inventory uses `data-ad-slot`. Slots remain hidden while `ads.enabled` is `false`.

Do not simply set `ads.enabled=true` when joining an ad network. First insert the network's approved loader/slot markup, update the privacy/cookie handling required for that provider, add a production `ads.txt` if required, and then enable the slots.

Recommended initial inventory:

- Home: one inline unit below editorial briefing.
- Articles: one mid/end article unit, away from navigation and primary content controls.
- Footer: optional low-priority unit.

Avoid ads inside standings rows, Fan Picks controls, Scenario controls, result tables or modal dialogs.

## Events

- `affiliate_click`: placement, affiliate_key, merchant, campaign
- `sponsor_click`: sponsor, placement
- `outbound_click`: host, path, placement

Existing product events remain unchanged.

## Before first paid link goes live

- Confirm the specific program's participation terms.
- Update `/disclosures.html` if a program requires exact wording.
- Place a clear disclosure near commercial recommendations.
- Verify the affiliate URL and attribution in a private browser window.
- Confirm Zaraz receives `affiliate_click`.
- Test mobile and desktop layouts.

## Before display ads go live

- Review the ad network's privacy/consent requirements.
- Add or update `ads.txt` when the network supplies the required publisher record.
- Validate layout shift and Core Web Vitals.
- Keep ad density conservative during the growth phase.


## v2.4.0 — Expedia Affiliate Launch

Expedia is the first active Paddock Command affiliate partner.

- Affiliate key: `expediaTravel`
- Merchant: Expedia
- Campaign: `race-weekend-travel`
- Placements: Live Center, Circuits, Circuit Intel, Articles resources, Italian GP preview and Monza guide.
- Every destination is configured centrally in `monetization-config.js`.
- Links are emitted with `rel="sponsored noopener"` and open in a new tab.
- Zaraz event: `affiliate_click` with `placement`, `affiliate_key`, `merchant`, and `campaign`.
- Display advertising remains disabled.

Do not duplicate the Expedia URL directly into article markup; update the central config if the approved tracking URL changes.

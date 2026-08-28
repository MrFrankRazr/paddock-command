/* Paddock Command monetization configuration.
 * Commercial features are intentionally OFF until a partner/network is approved.
 * Populate only destinations for programs Paddock Command has actually joined.
 */
window.PC_MONETIZATION_CONFIG = Object.freeze({
  version: '2.3.0',
  ads: {
    enabled: false,
    provider: '',
    publisherId: ''
  },
  affiliates: {
    enabled: false,
    disclosureUrl: '/disclosures.html',
    links: {
      // Example only — replace with approved affiliate destinations before enabling:
      // simRacing: { href: 'https://partner.example/...', merchant: 'Merchant', campaign: 'sim-racing' }
    }
  },
  sponsors: {
    enabled: false
  }
});

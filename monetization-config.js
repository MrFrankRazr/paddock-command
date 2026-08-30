/* Paddock Command monetization configuration.
 * Only approved partner destinations should be enabled here.
 */
window.PC_MONETIZATION_CONFIG = Object.freeze({
  version: '2.5.0',
  ads: {
    enabled: false,
    provider: '',
    publisherId: ''
  },
  affiliates: {
    enabled: true,
    disclosureUrl: '/disclosures.html',
    links: {
      expediaTravel: {
        href: 'https://expedia.com/affiliates/expedia-home.IfOEwW0',
        merchant: 'Expedia',
        campaign: 'race-weekend-travel'
      }
    }
  },
  sponsors: {
    enabled: false
  }
});

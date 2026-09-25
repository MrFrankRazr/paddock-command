
/* Paddock Command monetization configuration.
 * Only approved partner destinations should be enabled here.
 */
window.PC_MONETIZATION_CONFIG = Object.freeze({
  version: '2.5.1',
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
      },
      booksCollectibles: {
        href: 'https://fanatics.93n6tx.net/1GdYZz',
        merchant: 'Fanatics',
        campaign: 'f1-fan-library'
      }
    }
  },
  sponsors: {
    enabled: false
  }
});

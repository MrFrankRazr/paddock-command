/* Paddock Command affiliate compatibility layer — October 2026.
 * The existing base config is frozen; copy it into a mutable shape first.
 * Preserve other settings; supply only existing approved tracked destinations.
 * Load after monetization-config.js and before monetization.js.
 */
(function () {
  'use strict';
  const old = window.PC_MONETIZATION_CONFIG || {};
  const aff = old.affiliates || {};
  window.PC_MONETIZATION_CONFIG = {
    ...old,
    affiliates: {
      ...aff,
      enabled: true,
      links: {
        ...(aff.links || {}),
        simRacing: { href: 'https://bit.ly/3SITMJt', merchant: 'Thrustmaster', campaign: 't598-us-sim-racing' },
        booksCollectibles: { href: 'https://fanatics.93n6tx.net/1GdYZz', merchant: 'Fanatics', campaign: 'f1-merchandise-collectibles' }
      }
    }
  };
})();

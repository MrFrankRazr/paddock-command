/* Paddock Command — Fanatics affiliate overlay.
   Load AFTER base config and BEFORE monetization.js.
   Adds only the approved Fanatics link; does not overwrite Expedia or Thrustmaster. */
(function () {
  'use strict';
  var cfg = window.PC_MONETIZATION_CONFIG;
  if (!cfg || !cfg.affiliates || !cfg.affiliates.links) {
    console.warn('Paddock Command: base affiliate config unavailable; Fanatics inactive.');
    return;
  }
  cfg.affiliates.enabled = true;
  cfg.affiliates.links.booksCollectibles = {
    href: 'https://fanatics.93n6tx.net/1GdYZz',
    merchant: 'Fanatics',
    campaign: 'f1-merchandise-collectibles'
  };
})();

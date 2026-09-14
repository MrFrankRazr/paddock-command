/* Paddock Command — Thrustmaster affiliate overlay
 * Loads AFTER monetization-config.js and BEFORE monetization.js.
 * This preserves existing merchants (including Expedia) and adds only the approved
 * Thrustmaster T598 (US / PlayStation-PC) tracked destination.
 */
(function () {
  'use strict';

  const cfg = window.PC_MONETIZATION_CONFIG;
  if (!cfg || !cfg.affiliates || !cfg.affiliates.links) {
    console.warn('Paddock Command: base monetization configuration unavailable; Thrustmaster link not activated.');
    return;
  }

  try {
    cfg.affiliates.enabled = true;
    cfg.affiliates.links.simRacing = Object.freeze({
      href: 'https://bit.ly/3SITMJt',
      merchant: 'Thrustmaster',
      campaign: 't598-us-sim-racing'
    });
  } catch (error) {
    console.warn('Paddock Command: unable to activate Thrustmaster affiliate configuration.', error);
  }
})();

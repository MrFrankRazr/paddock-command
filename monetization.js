(() => {
  'use strict';
  const cfg = window.PC_MONETIZATION_CONFIG || {ads:{enabled:false},affiliates:{enabled:false,links:{}},sponsors:{enabled:false}};
  const track = (name, detail={}) => {
    if (typeof window.zaraz?.track === 'function') window.zaraz.track(name, detail);
    window.dispatchEvent(new CustomEvent('paddockcommand:analytics', {detail:{name,...detail}}));
  };

  function configureCommercialLinks(scope=document){
    scope.querySelectorAll?.('[data-affiliate-key]').forEach(link => {
      const key = link.dataset.affiliateKey;
      const item = cfg.affiliates?.links?.[key];
      if (!cfg.affiliates?.enabled || !item?.href) {
        link.hidden = true;
        link.removeAttribute('href');
        return;
      }
      link.href = item.href;
      link.hidden = false;
      link.dataset.merchant = item.merchant || '';
      link.dataset.campaign = item.campaign || key;
      link.rel = 'sponsored noopener';
      link.target = '_blank';
    });
    document.querySelectorAll('[data-commerce-module]').forEach(module => {
      const hasActiveLink = [...module.querySelectorAll('[data-affiliate-key]')].some(a => !a.hidden && a.getAttribute('href'));
      module.hidden = !cfg.affiliates?.enabled || !hasActiveLink;
    });
  }

  function configureAds(){
    document.querySelectorAll('[data-ad-slot]').forEach(slot => {
      if (!cfg.ads?.enabled) {
        slot.hidden = true;
        slot.setAttribute('aria-hidden','true');
        return;
      }
      slot.hidden = false;
      slot.removeAttribute('aria-hidden');
      slot.classList.add('monetization-slot-active');
      if (!slot.querySelector('.monetization-label')) {
        const label = document.createElement('span');
        label.className = 'monetization-label';
        label.textContent = 'Advertisement';
        slot.prepend(label);
      }
    });
  }

  function refresh(){
    configureCommercialLinks(document);
    configureAds();
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.href;
    if (!href) return;
    if (link.dataset.affiliateKey) {
      track('affiliate_click', {
        placement: link.dataset.placement || 'unknown',
        affiliate_key: link.dataset.affiliateKey,
        merchant: link.dataset.merchant || '',
        campaign: link.dataset.campaign || ''
      });
      return;
    }
    if (link.dataset.sponsor) {
      track('sponsor_click', {sponsor:link.dataset.sponsor, placement:link.dataset.placement || 'unknown'});
      return;
    }
    try {
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) track('outbound_click', {host:url.hostname, path:url.pathname, placement:link.dataset.placement || 'content'});
    } catch {}
  });

  refresh();
  window.PCMonetization = Object.freeze({refresh, config:cfg});

  // Circuit Intel and other panels are rendered after page load. Refresh commercial
  // bindings when new affiliate markup appears without coupling monetization to app.js.
  const observer = new MutationObserver(mutations => {
    if (mutations.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && (n.matches?.('[data-affiliate-key],[data-commerce-module]') || n.querySelector?.('[data-affiliate-key],[data-commerce-module]'))))) {
      configureCommercialLinks(document);
    }
  });
  if (document.body) observer.observe(document.body, {childList:true, subtree:true});
  else document.addEventListener('DOMContentLoaded', () => observer.observe(document.body, {childList:true, subtree:true}), {once:true});
})();

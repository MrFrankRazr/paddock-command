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


/* Paddock Command — Circuits travel-resource visibility, October 2026.
   Scoped to circuits.html. The existing Expedia affiliate card remains bound
   by the monetization engine above, preserving click tracking and disclosures.
   No historical race guide or site-wide editorial view is modified. */
(() => {
  'use strict';
  if (!/^\/circuits\.html$/i.test(window.location.pathname)) return;
  function enhanceCircuitTravel() {
    const panel = document.querySelector('#view-circuits, [data-view-panel="circuits"]');
    const module = panel?.querySelector('[data-commerce-module]');
    if (!module || module.dataset.pcTravelEnhanced === 'true') return;
    const heading = module.querySelector('h2');
    const kicker = module.querySelector('.eyebrow');
    const disclosure = module.querySelector('.commercial-disclosure');
    const card = module.querySelector('[data-affiliate-key="expediaTravel"]');
    if (!heading || !kicker || !disclosure || !card) return;
    module.dataset.pcTravelEnhanced = 'true';
    module.classList.add('pc-circuits-travel-showcase');
    kicker.textContent = 'GRAND PRIX TRAVEL RESOURCES · EXPEDIA AFFILIATE';
    heading.textContent = 'Plan Your Grand Prix Experience';
    const existingIntro = module.querySelector('[data-pc-circuits-travel-intro]');
    if (!existingIntro) {
      const intro = document.createElement('p');
      intro.dataset.pcCircuitsTravelIntro = '';
      intro.className = 'pc-circuits-travel-intro';
      intro.textContent = 'Exploring a circuit you would like to visit? Compare travel and accommodation options for a future Grand Prix weekend — whenever you are ready to plan.';
      heading.insertAdjacentElement('afterend', intro);
    }
    const small = card.querySelector('small');
    const strong = card.querySelector('strong');
    const span = card.querySelector('span');
    if (small) small.textContent = 'EXPEDIA · OPTIONAL TRAVEL RESOURCE';
    if (strong) strong.textContent = 'Explore hotels and travel options';
    if (span) span.textContent = 'Compare options for a Grand Prix trip with Expedia →';
    module.setAttribute('aria-label', 'Optional Grand Prix travel resources, Expedia affiliate');
    if (!document.getElementById('pc-circuits-travel-style')) {
      const style = document.createElement('style');
      style.id = 'pc-circuits-travel-style';
      style.textContent = `
        #view-circuits .pc-circuits-travel-showcase {
          position:relative;overflow:hidden;border:1px solid rgba(63,197,255,.45);
          border-radius:18px;padding:clamp(18px,3vw,28px);
          background:radial-gradient(circle at top left,rgba(24,155,224,.16),transparent 60%),linear-gradient(135deg,rgba(8,30,54,.98),rgba(4,17,32,.98));
          box-shadow:0 14px 36px rgba(0,0,0,.22);
          margin-block:24px;
        }
        #view-circuits .pc-circuits-travel-showcase::before {
          content:'';position:absolute;left:0;right:0;top:0;height:3px;
          background:linear-gradient(90deg,#35c9ff,rgba(53,201,255,.25),transparent);
        }
        #view-circuits .pc-circuits-travel-showcase h2 {margin:.3rem 0 .6rem;font-size:clamp(1.5rem,2.5vw,2rem)}
        #view-circuits .pc-circuits-travel-showcase .pc-circuits-travel-intro {color:#c2d6e6;max-width:760px;line-height:1.65;margin:0 0 12px}
        #view-circuits .pc-circuits-travel-showcase .commerce-card {
          border:1px solid rgba(255,198,86,.46);border-radius:14px;
          background:linear-gradient(135deg,rgba(55,43,19,.75),rgba(11,29,45,.96));
          transition:transform .2s ease,border-color .2s ease;
        }
        #view-circuits .pc-circuits-travel-showcase .commerce-card:hover,
        #view-circuits .pc-circuits-travel-showcase .commerce-card:focus-visible {
          border-color:#ffcf70;transform:translateY(-2px);
        }
        #view-circuits .pc-circuits-travel-showcase .commerce-card small {color:#ffd37b}
        @media(max-width:650px){#view-circuits .pc-circuits-travel-showcase{padding:18px}}
      `;
      document.head.append(style);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',enhanceCircuitTravel,{once:true});
  else enhanceCircuitTravel();
})();

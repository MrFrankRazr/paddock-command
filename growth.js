(() => {
  const track = (name, props = {}) => {
    try { if (window.zaraz && typeof window.zaraz.track === 'function') window.zaraz.track(name, props); } catch (_) {}
  };
  const params = new URLSearchParams(location.search);
  const campaign = {
    source: params.get('utm_source') || '', medium: params.get('utm_medium') || '', campaign: params.get('utm_campaign') || '',
    content: params.get('utm_content') || '', term: params.get('utm_term') || '', landing_path: location.pathname
  };
  const hasUtm = Object.entries(campaign).some(([k,v]) => k !== 'landing_path' && v);
  const key = 'pc_acquisition_landing';
  if (hasUtm && !sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, '1'); track('acquisition_landing', campaign);
  }
  document.addEventListener('click', (event) => {
    const a = event.target.closest('a[href]'); if (!a) return;
    try {
      const u = new URL(a.href, location.href);
      if (u.origin === location.origin && u.pathname !== location.pathname) {
        track('internal_link_click', {from_path: location.pathname, to_path: u.pathname, link_text: (a.textContent || '').trim().slice(0,80)});
      }
    } catch (_) {}
  }, {passive:true});
})();

(function(){
  'use strict';

  const isNewsletterPage = () => {
    const p = location.pathname.replace(/\/+$/,'').toLowerCase();
    return p === '/newsletter' || p === '/newsletter.html';
  };

  function removeLegacyNewsletterEmbeds(){
    if(isNewsletterPage()) return;

    // Known MailerLite/embed containers and iframes.
    const selectors = [
      '.ml-embedded',
      '.ml-form-embedContainer',
      '.ml-form-embedWrapper',
      '[class*="ml-form-embed"]',
      '[id*="mlb2-"]',
      'iframe[src*="mailerlite"]',
      'iframe[src*="mailer"]'
    ];

    document.querySelectorAll(selectors.join(',')).forEach(el => {
      if(el.closest('[data-newsletter-static]')) return;
      const shell = el.closest('section, aside, article') || el;
      if(!shell.hasAttribute('data-newsletter-static')) shell.remove();
    });

    // Catch the previous Paddock Command full-size signup treatment even if
    // a third-party script changes its classes.
    document.querySelectorAll('section, aside').forEach(el => {
      if(el.hasAttribute('data-newsletter-static')) return;
      const text = (el.textContent || '').replace(/\s+/g,' ').trim().toLowerCase();
      const hasLegacyHeadline = text.includes('get the key stories before the lights go out');
      const hasLegacyFormCopy = text.includes('join the briefing') && text.includes('free to join');
      if(hasLegacyHeadline || hasLegacyFormCopy) el.remove();
    });

    // Catch dynamically injected email forms that use generic wrappers.
    document.querySelectorAll('input[type="email"]').forEach(input => {
      if(input.closest('[data-newsletter-static]')) return;
      let node = input;
      for(let i=0; i<7 && node && node !== document.body; i++, node=node.parentElement){
        const text = (node.textContent || '').replace(/\s+/g,' ').trim().toLowerCase();
        if(text.includes('race weekend briefing') &&
           (text.includes('join the briefing') || text.includes('get the key stories before the lights go out'))){
          const shell = node.closest('section, aside, article') || node;
          if(!shell.hasAttribute('data-newsletter-static')) shell.remove();
          break;
        }
      }
    });
  }

  function startNewsletterPolicy(){
    if(isNewsletterPage()) return;
    removeLegacyNewsletterEmbeds();

    const observer = new MutationObserver(() => removeLegacyNewsletterEmbeds());
    observer.observe(document.documentElement, {childList:true, subtree:true});

    // Third-party injectors can be delayed after load.
    [100, 500, 1500, 3000, 6000].forEach(ms => setTimeout(removeLegacyNewsletterEmbeds, ms));
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', startNewsletterPolicy, {once:true});
  } else {
    startNewsletterPolicy();
  }
})();

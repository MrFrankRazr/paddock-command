(() => {
  const panel = document.getElementById('pc-race-updates');
  const weekend = document.getElementById('pc-race-updates-weekend');
  const status = document.getElementById('pc-race-updates-status');
  const list = document.getElementById('pc-race-updates-list');
  const pacificTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
  });
  const refreshInterval = 30_000;
  let pending = false;
  let lastFeed = '';

  function addText(parent, tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    parent.append(element);
    return element;
  }

  function renderFeed(feed) {
    if (typeof feed.event !== 'string' || !feed.event.trim() || !Array.isArray(feed.updates)) {
      throw new Error('Invalid race updates feed');
    }

    const entries = feed.updates.filter(update => (
      update && typeof update.time === 'string' && Number.isFinite(Date.parse(update.time))
      && typeof update.title === 'string' && typeof update.body === 'string'
      && typeof update.category === 'string'
    )).sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
    if (entries.length !== feed.updates.length) throw new Error('Invalid race update');

    const fragment = document.createDocumentFragment();
    for (const entry of entries) {
      const item = document.createElement('li');
      const metadata = document.createElement('div');
      metadata.className = 'pc-race-update-meta';
      addText(metadata, 'span', entry.category);
      const time = addText(metadata, 'time', pacificTime.format(new Date(entry.time)));
      time.dateTime = entry.time;
      item.append(metadata);
      addText(item, 'h3', entry.title);
      addText(item, 'p', entry.body);
      if (typeof entry.sourceUrl === 'string' && typeof entry.sourceLabel === 'string') {
        const url = URL.canParse(entry.sourceUrl) ? new URL(entry.sourceUrl) : null;
        if (url?.protocol === 'https:') {
          const link = addText(item, 'a', entry.sourceLabel + ' ↗');
          link.href = url.href;
        }
      }
      fragment.append(item);
    }

    weekend.textContent = feed.event;
    list.replaceChildren(fragment);
    list.hidden = entries.length === 0;
  }

  async function refresh() {
    if (pending || document.hidden || panel.getClientRects().length === 0) return;
    pending = true;
    try {
      const url = new URL('race-updates.json', window.location.href);
      url.searchParams.set('v', String(Math.floor(Date.now() / refreshInterval)));
      const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
      if (!response.ok) throw new Error('Race updates request failed');
      const rawFeed = await response.text();
      if (rawFeed !== lastFeed) {
        renderFeed(JSON.parse(rawFeed));
        lastFeed = rawFeed;
      }
      const message = list.hidden ? 'No updates have been posted for this weekend yet.' : '';
      if (status.textContent !== message) status.textContent = message;
    } catch {
      const message = lastFeed && !list.hidden
        ? 'Refresh unavailable. Showing the last loaded updates.'
        : 'Race updates are temporarily unavailable. Retrying automatically.';
      if (status.textContent !== message) status.textContent = message;
    } finally {
      pending = false;
    }
  }

  status.textContent = 'Loading race updates…';
  document.addEventListener('visibilitychange', refresh);
  window.setInterval(refresh, refreshInterval);
  refresh();
})();

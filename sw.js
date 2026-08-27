const CACHE='paddock-command-shell-v2.0.0';
const SHELL=['./','./index.html','./styles.css?v=2.0.0','./app.js?v=2.0.0','./favicon.svg','./logo.svg','./manifest.webmanifest','./offline.html','./about.html','./data-sources.html','./privacy.html','./terms.html','./disclosures.html','./contact.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&k.startsWith('paddock-command-shell')).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin===location.origin){e.respondWith(fetch(r).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy));return res;}).catch(()=>caches.match(r).then(x=>x||caches.match('./offline.html'))));}});

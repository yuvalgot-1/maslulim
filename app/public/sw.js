// Minimal offline support: the app shell and already-viewed routes/images
// keep working without a connection.
const CACHE = 'maslulim-v1';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw e;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  const fresh = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || fresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(request.mode === 'navigate' ? networkFirst(request) : staleWhileRevalidate(request));
    return;
  }

  if (url.hostname.endsWith('.supabase.co')) {
    if (url.pathname.startsWith('/storage/v1/object/public/')) {
      event.respondWith(staleWhileRevalidate(request));
      return;
    }
    // Cache route data only for anonymous visitors, so a logged-in creator's
    // drafts never end up in the cache that logged-out visitors could read.
    const isData = url.pathname.startsWith('/rest/v1/routes');
    const anonymous = request.headers.get('Authorization') === 'Bearer ' + request.headers.get('apikey');
    if (isData && anonymous) event.respondWith(networkFirst(request));
  }
});

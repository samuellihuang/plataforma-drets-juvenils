/* Service Worker — Plataforma de Drets Juvenils
   Estratègia: Cache-first per actius estàtics, Network-only per a l'API.
   Versió: v1.0 (juny 2026) */

const CACHE_NAME = 'pdj-cache-v1';
const STATIC_ASSETS = ['/', '/index.html'];

// ── Install: pre-caché dels assets principals ─────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: neteja de caches antics ────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first per a estàtics, network-only per a l'API ──────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Sempre xarxa per a crides a l'API del backend (Render)
  if (url.hostname.includes('onrender.com') || url.pathname.startsWith('/api/')) return;
  // Ignora mètodes no-GET i extensió de Chrome/Firefox
  if (request.method !== 'GET') return;
  if (!['http:', 'https:'].includes(url.protocol)) return;

  event.respondWith(
    caches.match(request).then(cached => {
      // Resposta cacheada → la servim i actualitzem en segon pla (stale-while-revalidate)
      const networkFetch = fetch(request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => cached); // si fallen la xarxa i no hi ha caché, retornem el que tenim

      return cached || networkFetch;
    })
  );
});

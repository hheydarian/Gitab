const CACHE_NAME = 'gitab-cache-v7';
const isDev = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';
const BASE_PATH = new URL('./', self.location.href).pathname.replace(/\/+$/, '');
const withBase = (p) => `${BASE_PATH}${p.startsWith('/') ? p : '/' + p}`;

const STATIC_ASSETS = [
  '/',
  '/books/list-books/',
  '/styles/main.css?v=2.4',
  '/styles/gitab-modern.css?v=2.5',
  '/fonts/Vazirmatn.woff2',
  '/fonts/Lalezar.woff2',
  '/icone/logo.svg',
  '/icone/github.svg',
  '/icone/sun.svg',
  '/icone/moon.svg',
  '/favicon.png'
];

// Install: pre-cache core app shell without bloating install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map((asset) => cache.add(withBase(asset)))
      );
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

function isImmutableAsset(pathname) {
  return (
    pathname.includes('/fonts/') ||
    pathname.includes('/styles/') ||
    pathname.includes('/images/') ||
    pathname.includes('/icone/') ||
    /\.(woff2?|ttf|css|png|jpe?g|webp|svg|ico)$/i.test(pathname)
  );
}

// Fetch: Cache-First for immutable fonts/styles/covers/icons, Stale-While-Revalidate for pages/JSON/assets
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  if (isDev) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  if (url.origin !== self.location.origin) return;
  if (url.pathname === withBase('/sw.js')) return;
  // Do not bloat CacheStorage with multi-megabyte PDF downloads
  if (url.pathname.includes('/downloads/') || /\.pdf$/i.test(url.pathname)) return;

  // 1. Immutable fonts, stylesheets, covers, chapter images, and icons: Cache-First
  if (isImmutableAsset(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(req).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(req).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              cache.put(req, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 2. HTML pages, search-index.json, and other same-origin assets: Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(req).then((cachedResponse) => {
        const networkPromise = fetch(req).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(req, networkResponse.clone());
          }
          return networkResponse;
        });

        if (cachedResponse) {
          event.waitUntil(networkPromise.catch(() => {}));
          return cachedResponse;
        }

        return networkPromise.catch(() => {
          if (req.mode === 'navigate') {
            return cache.match(withBase('/'));
          }
          return Response.error();
        });
      });
    })
  );
});

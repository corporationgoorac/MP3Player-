const CACHE_NAME = 'wavefy-app-shell-v1';
const AUDIO_CACHE = 'wavefy-audio-cache'; // Matches the cache name used in your HTML

// The core files needed to load the app offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// --- INSTALL EVENT ---
// Runs when the service worker is first registered. We cache the app shell here.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

// --- ACTIVATE EVENT ---
// Runs when the service worker starts. Great for cleaning up old, outdated caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches, but KEEP the audio cache so users don't lose downloaded songs
          if (cacheName !== CACHE_NAME && cacheName !== AUDIO_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Ensure the service worker takes control of the page immediately.
  self.clients.claim();
});

// --- FETCH EVENT ---
// Intercepts all network requests made by the app.
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests
  if (event.request.method !== 'GET') return;

  // 1. GitHub API Requests (Network First, fallback to Cache)
  // We want fresh track lists if online, but don't break if offline.
  if (event.request.url.includes('api.github.com')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // 2. Audio Files (Cache First, fallback to Network)
  // Your HTML handles a lot of this, but this guarantees MP3s are served from cache.
  if (event.request.url.endsWith('.mp3')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(event.request).then((networkResponse) => {
          return caches.open(AUDIO_CACHE).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // 3. App Shell & Everything Else (Cache First, fallback to Network)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached version immediately
      }

      // If not in cache, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Cache dynamic assets like Google Fonts on the fly
        if (event.request.url.startsWith('http')) {
           return caches.open(CACHE_NAME).then((cache) => {
             cache.put(event.request, networkResponse.clone());
             return networkResponse;
           });
        }
        return networkResponse;
      }).catch(() => {
        // OFF-LINE FALLBACK:
        // If the network fails (no internet) and they are trying to navigate to the app,
        // serve the cached index.html so there is NO offline dinosaur page.
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

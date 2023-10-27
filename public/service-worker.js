// Define a unique version for your service worker.
const CACHE_NAME = 'my-id-manager-app-v1';

// List the files and resources you want to cache.
const cacheFiles = [
  '/',
  '/index.html',
  // Add paths to other assets you want to cache, e.g., '/static/css/app.css', '/static/js/app.js'
];

// Install event: This event is triggered when the service worker is first registered.
this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(cacheFiles);
        })
    );
});

// Activate event: This event is triggered when the service worker becomes active.
this.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: This event is triggered whenever a network request is made from your app.
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// sw.js

// Define a cache name
const cacheName = "pwa-calculator-v1";

// Define a list of files to cache
const filesToCache = [
  "/",
  "/index.html",
  "/icon-192.png",
  "/icon-512.png"
];

// Install the service worker and cache the files
self.addEventListener("install", event => {
  console.log("Service worker installing");
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

// Activate the service worker and delete old caches
self.addEventListener("activate", event => {
  console.log("Service worker activating");
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== cacheName)
          .map(key => caches.delete(key))
      ))
  );
});

// Fetch the files from the cache or the network
self.addEventListener("fetch", event => {
  console.log("Service worker fetching");
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
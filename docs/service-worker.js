const CACHE_NAME = "impumat-cache-v1";

// Fichiers critiques à mettre en cache
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/index_fr.html",
  "/style.css",
  "/script.js",
  "/contact.css",
  "/images/logo.png",
  "/images/couverture2.jpg"
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE (nettoyage anciennes versions)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH (logique principale)
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;

  // 🔴 EXCLUSION PAYHIP (très important)
  if (requestUrl.includes("payhip.com")) {
    return;
  }

  // Cache-first pour ressources internes
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // clone pour cache
          const responseClone = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // fallback simple si offline
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
    })
  );
});

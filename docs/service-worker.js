// ============================
// Service Worker IMPUMAT v2
// Cache propre + offline léger + safe external calls
// ============================

const CACHE_NAME = "impumat-v2";

// 🎯 App Shell uniquement (UI stable)
const STATIC_CACHE = [
  "/",
  "/index.html",
  "/index_fr.html",
  "/style.css",
  "/script.js",
  "/icones/site.webmanifest",
  "/icones/web-app-manifest-192x192.png",
  "/icones/web-app-manifest-512x512.png"
];

// ============================
// INSTALL : pré-cache minimal
// ============================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_CACHE);
    })
  );

  self.skipWaiting();
});

// ============================
// ACTIVATE : nettoyage ancien cache
// ============================
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

// ============================
// FETCH STRATEGY
// ============================
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;

  // ❌ NE JAMAIS CACHER les services externes
  if (
    requestUrl.includes("payhip.com") ||
    requestUrl.includes("formsubmit.co") ||
    requestUrl.includes("google") ||
    requestUrl.includes("analytics")
  ) {
    return; // réseau direct uniquement
  }

  // 🟢 NAVIGATION HTML → Network First (forms inclus)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/index.html");
      })
    );
    return;
  }

  // 🟢 STATIC ASSETS → Cache First
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          // update cache dynamique léger
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
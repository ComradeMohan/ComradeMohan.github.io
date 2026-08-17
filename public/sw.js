const CACHE_NAME = "mohan-portfolio-v1";
const STATIC_ASSETS = [
  "/",
  "/about",
  "/developer",
  "/resume",
  "/blog",
  "/case-study/saveethahub",
  "/case-study/univault",
  "/favicon.png",
  "/comrademohan.webp",
  "/mohan-reddy-full-stack-developer.webp",
  "/site.webmanifest"
];

// Install Event: Pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up stale caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-first with Cache fallback for HTML / Stale-While-Revalidate for static
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests and external API calls (let them go directly to network)
  if (event.request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Static Assets: Stale-While-Revalidate
  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js")
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Navigation / HTML pages: Network First with Cache Fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedPage = await cache.match(event.request);
        return cachedPage || cache.match("/");
      })
    );
  }
});

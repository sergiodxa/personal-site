importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js"
);

if (!workbox) {
  console.error("ServiceWorker failed to load workbox");
} else {
  // cache HTML
  workbox.routing.registerRoute(
    new RegExp("(.*).html"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "html-content"
    })
  );

  // cache bundles
  workbox.routing.registerRoute(
    new RegExp("/_next/**/page/(.*)"),
    workbox.strategies.cacheFirst({
      cacheName: "bundled-content"
    })
  );

  // cache static files
  workbox.routing.registerRoute(
    new RegExp("/static/(.*)"),
    workbox.strategies.cacheFirst({
      cacheName: "static",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        })
      ]
    })
  );

  // offline analytics
  workbox.googleAnalytics.initialize();
}

const CACHE_NAME = "paycheck-calculator-v9";
const FILES_TO_CACHE = [
    "./background.jpg",
    "./icon.png",
    "./index.html",
    "./manifest.json",
    "./script.js",
    "./style.css"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) =>
                        cacheName.startsWith("paycheck-calculator-") &&
                        cacheName !== CACHE_NAME
                    )
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});

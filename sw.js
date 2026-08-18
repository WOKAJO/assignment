const CACHE_NAME = "zizo-cv-cache-v1";

const FILES_TO_CACHE = [
    "index.html",
    "pages/Change.html",    
    "pages/Distance.html",
    "pages/grade.html",    
    "pages/hobby.html",
    "pages/Temperature Converter.html",
    "manifest.json"
    
];

// Install
self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );

    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request).catch(() => {
                    if (event.request.mode === "navigate") {
                        return caches.match("index.html");
                    }
                })
            );
        })
    );
});

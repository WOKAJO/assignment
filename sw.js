const CACHE_NAME = "zizo-resume-v1";

const FILES_TO_CACHE = [
    "index.html",
    "pages/Change.html",    
    "pages/Distance.html",
    "pages/grade.html",    
    "pages/hobby.html",
    "pages/Temperature Converter.html",
    "manifest.json"
    
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
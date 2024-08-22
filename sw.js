const CACHE_NAME = 'eren-yeager-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/about.html',
    '/powers.html',
    '/development.html',
    '/battles.html',
    '/gallery.html',
    '/timeline.html',
    '/contact.html',
    '/styles.css',
    '/logo.png',
    '/eren_wall.jpg',
    '/eren_transformation.jpg',
    '/eren_fight.jpg',
    '/eren_command.jpg',
    '/eren_bertholdt.jpg',
    '/eren_founding_titan.jpg'
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

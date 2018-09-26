if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => {
            console.log('service worker registered')
        })
        .catch(() => {
            console.warn('service worker failed')
        })
}

var CACHE_NAME = 'static-v1';
this.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.js',
                '/sw.js',
                '/manifest.json',
            ]);
        })
    );
})

this.addEventListener('activate', function activator(event) {
    event.waitUntil(caches.keys()
        .then(function (keys) {
            return Promise.all(keys.filter(function (key) {
                return key.indexOf(CACHE_NAME) !== 0;
            }).map(function (key) {
                return caches.delete(key);
            }));
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || fetch(event.request);
        })
    );
});

this.addEventListener('notificationclose', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

this.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('https://www.google.com');
        notification.close();
    }
});
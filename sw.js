const version = 1.0;
const cacheName = `files-${version}`

// self.ski[pWaiting()

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            // cache.add("index.html")
            cache.addAll(["/css/master.css", "js/index.js", "index.html"])
        })
        )
})

self.addEventListener("activate", e => {
    // e.waitUntil(clients.claim())
    /* 
    e.waitUntil(
        caches.delete("kolohe-cache")
        )
    */ 
})

self.addEventListener("fetch", e => {
    e.respondWith(caches.open(cacheName).then(cache => {
        return cache.match(e.request.url).then(res => {
            if (res) {
                return fetch(e.request) || res;
            } else {
                // cache.add(res)
                return fetch(e.request)
            }
        })
    }))
    // e.respondWith(fetch(e.request))
})
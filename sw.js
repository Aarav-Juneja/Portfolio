const version = 1.0;
const cacheName = `files-${version}`

// self.ski[pWaiting()

const putInCache = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
}

const networkFirst = async (request, preloadResponsePromise) => {
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      console.info('using preload response', preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }

    // First try to get the resource from the network
    try {
        const responseFromNetwork = await fetch(request);
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        // Next try to get the resource from the cache
        const responseFromCache = await caches.match(request);
        if (responseFromCache) {
            return responseFromCache;
        }

        // const fallbackResponse = await caches.match(fallbackUrl);
        // if (fallbackResponse) {
        //     return fallbackResponse;
        // }

        // when even the fallback response is not available,
        // there is nothing we can do, but we must always
        // return a Response object
        return new Response('Network error happened', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    
};

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            // cache.add("index.html")
            cache.addAll(["/css/master.min.css", "js/index.min.js", "index.html"])
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
    e.respondWith(/*caches.open(cacheName).then(cache => {
        /*
        return cache.match(e.request.url).then(res => {
            /*
            if (res) {
                console.log('x')
                res2 = fetch(e.request);
                // if (res2) {
                //     // cache.add(e.request);
                //     return res2;
                // } else {
                //     return res;
                // }
                return fetch(e.request) || res;
            } else {
                // cache.add(res)
                // I find it faster to leave it by itself
                console.log('y');
                // return fetch(e.request)
            }
        })

        networkFirst(e.request, e.preloadResponse)
    })*/)
    // e.respondWith(fetch(e.request))
})
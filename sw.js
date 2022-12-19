const version = 1.0;
const cacheName = `files-${version}`

// self.ski[pWaiting()

const putInCache = async (request, response) => {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
}

const networkFirst = async (request, preloadResponsePromise, fallbackUrl) => {
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
      console.info('using preload response', preloadResponse);
      putInCache(request, preloadResponse.clone());
      return preloadResponse;
    }

    // First try to get the resource from the network
    try {
        const responseFromNetwork = await fetch(request);

        console.info("Using response from network")

        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        // Next try to get the resource from the cache
        const responseFromCache = await caches.match(request);
        if (responseFromCache) {
            console.info("using response from cache")
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

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
  
    // Next try to use (and cache) the preloaded response, if it's there
    const preloadResponse = await preloadResponsePromise;
    if (preloadResponse) {
        console.info('using preload response', preloadResponse);
        putInCache(request, preloadResponse.clone());
        return preloadResponse;
    }

    // Next try to get the resource from the network
    try {
        const responseFromNetwork = await fetch(request);
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
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

    if (e.request.destination = "image") {
        e.respondWith(cacheFirst(e.request, e.preloadResponse, "../408.html"))
    } else {
        e.respondWith(networkFirst(e.request, e.preloadResponse, "../408.html"))
    }

    /*e.respondWith(/*caches.open(cacheName).then(cache => {
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

        
    }) 
    )*/
    // e.respondWith(fetch(e.request))
})
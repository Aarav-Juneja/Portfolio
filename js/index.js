$("#date").append(new Date().getFullYear())
if('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('sw.js').then(function(reg){
        console.log("SW registration succeeded. Scope is "+reg.scope);
        reg.addEventListener("updatefound", () => {
    
        })

        // reg.active,waiting,installing

    }).catch(function(err){
        console.error("SW registration failed with error "+err);
    });

    navigator.serviceWorker.ready.then(r => {
        console.log("SW ready navigator: ". r.active)
        console.log(navigator.serviceWorker.controller) // active and in control of page
        // ^ returns an ServiceWorker
        // can only be in control if page load when workie ther
    })

    navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("new service worker in charge");
    });
}

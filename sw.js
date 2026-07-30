const CACHE_NAME="badamoa-mobile-v3";
const APP_FILES=["./","./?mode=demo","./index.html","./manifest.webmanifest","./assets/app-icon.svg","./css/styles.css","./css/recommendation.css","./css/mobile-pwa.css","./js/data-facilities.js","./js/storage.js","./js/app-facilities.js"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./?mode=demo"))))});

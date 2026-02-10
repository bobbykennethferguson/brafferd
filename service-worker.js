const CACHE_NAME = "bobby-rpg-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "bobby.png",
  "wes.png",
  "steven.png",
  "floor_tile.png",
  "hot_tub.png",

  "bobby_down_1.png",
  "bobby_down_2.png",
  "bobby_up_1.png",
  "bobby_up_2.png",
  "bobby_left_1.png",
  "bobby_left_2.png",
  "bobby_right_1.png",
  "bobby_right_2.png",

  "icon-192.png",
  "icon-512.png",

  "battlesong.mp3"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) =>
        cached || caches.match("./index.html")
      ))
  );
});
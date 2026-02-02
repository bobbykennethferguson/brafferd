const CACHE_NAME = "bobby-rpg-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./battle.html",
  "./overworld.js",
  "./battle.js",
  "./style.css",
  "bobby.png",
  "wes.png",
  "steven.png",

  "bobby_down_1.png",
  "bobby_down_2.png",
  "bobby_up_1.png",
  "bobby_up_2.png",
  "bobby_left_1.png",
  "bobby_left_2.png",
  "bobby_right_1.png",
  "bobby_right_2.png",

  "battlesong.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() =>
          caches.match("./index.html")
        )
      );
    })
  );
});
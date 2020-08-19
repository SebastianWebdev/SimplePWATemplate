const staticCachName = "site-static";
const assets = [
  "/menu",
  "rezerwacje/js/theme.js",
  "/rezerwacje/assets/5139a100/js/bootstrap.min.js",
  "https://use.fontawesome.com/releases/v5.6.0/css/all.css",
  "/rezerwacje/assets/7608c7f0/jquery.min.js",
  "/rezerwacje/js/popper.min.js",
  "/rezerwacje/js/jquery.jcarousel.min.js",
  "/rezerwacje/js/restaurants2.js",
  "/rezerwacje/img/images_for_template/bg.jpg",
  "/rezerwacje/img/images_for_template/logo.png",
  "/rezerwacje/img/images_for_template/check.png",
  "/rezerwacje/img/images_for_template/pick_up.png",
  "/rezerwacje/img/images_for_template/delivery.png",

  "/favicon.ico",
  "/manifest.json",
];

self.addEventListener("install", (evt) => {
  // console.log("Worker installed successfully", event);
  evt.waitUntil(
    caches.open(staticCachName).then((cache) => {
      cache.addAll(assets);
    })
  );
});
// event activate
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCachName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cashRes) => {
      return cashRes || fetch(evt.request);
    })
  );
});

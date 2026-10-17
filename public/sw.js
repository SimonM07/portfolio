const CACHE_NAME = 'portfolio-v2';
const urlsToCache = [
  '/',
  '/en',
  '/favicon.svg',
  '/favicon.ico',
  '/favicon.png',
  '/images/projects/profile.jpg',
  '/images/projects/kia-bbb-poster.webp',
  '/images/projects/mercedes-new-car-poster.webp',
  '/images/projects/classic-mercedes-poster.webp',
  '/images/projects/murko-poster.webp',
  '/images/projects/duster-poster.webp',
  '/images/projects/engerau-showcase-poster.webp',
  '/images/projects/gaelto-poster.webp',
  '/images/projects/kia-samorin-poster.webp',
  '/images/projects/outside-poster.webp',
  '/images/projects/quatro-outside-poster.webp',
  '/images/projects/r4-poster.webp',
  '/images/projects/rafale-poster.webp',
  '/images/projects/zilinka-fins-poster.webp',
  '/images/projects/aftermovie-stk-samorin-poster.webp',
  '/images/projects/autobazar-edit-poster.webp',
  '/images/projects/brno-city-poster.webp',
  '/images/projects/car-brno-poster.webp',
  '/images/projects/milionar-poster.webp',
  '/images/projects/zupne-dni-bts-poster.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

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
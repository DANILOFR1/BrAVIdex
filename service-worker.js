const CACHE_NAME = 'bravidex-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/data.js',
  '/manifest.json',
  '/public/images/ararajuba.jpg',
  '/public/images/tuiuiu.jpg',
  '/public/images/sabia.jpg',
  '/public/images/beija-flor.jpg',
  '/public/images/tucano.jpg',
  '/public/images/bem-te-vi.jpg',
  '/public/images/flamingo.jpg',
  '/public/images/harpia.jpg',
  '/public/images/arara-azul.jpg',
  '/public/images/coruja.jpg',
  '/public/images/joao-de-barro.jpg',
  '/public/images/pica-pau.jpg',
  '/public/images/icon-192x192.png',
  '/public/images/icon-512x512.png',
  '/public/images/icon.png',
  '/public/favicon.ico'
];

// Instalar service worker e cachear recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abrindo cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Ativar o service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições e servir do cache quando offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso cacheado se disponível
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request)
          .then(response => {
            // Se a resposta for inválida, retorna
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para usar no cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // Fallback para casos onde não há conexão nem cache
        if (event.request.url.indexOf('.html') > -1) {
          return caches.match('/index.html');
        }
      })
  );
}); 
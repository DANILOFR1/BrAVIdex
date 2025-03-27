const CACHE_NAME = 'bravidex-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './js/data.js',
  './manifest.json',
  './manual.html',
  './public/images/ararajuba.jpg',
  './public/images/tuiuiu.jpg',
  './public/images/sabia.jpg',
  './public/images/beija-flor.jpg',
  './public/images/tucano.jpg',
  './public/images/bem-te-vi.jpg',
  './public/images/flamingo.jpg',
  './public/images/harpia.jpg',
  './public/images/arara-azul.jpg',
  './public/images/coruja.jpg',
  './public/images/joao-de-barro.jpg',
  './public/images/pica-pau.jpg',
  './public/images/icon-192x192.png',
  './public/images/icon-512x512.png',
  './public/images/icon.png',
  './public/favicon.ico'
];

// Instalar service worker e cachear recursos
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Cacheando recursos');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('[Service Worker] Instalação concluída');
        return self.skipWaiting();
      })
  );
});

// Ativar o service worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Ativando...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[Service Worker] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Reivindicando clientes');
      return self.clients.claim();
    })
  );
});

// Interceptar requisições e servir do cache quando offline
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Interceptando fetch:', event.request.url);
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso cacheado se disponível
        if (response) {
          console.log('[Service Worker] Retornando do cache:', event.request.url);
          return response;
        }
        
        console.log('[Service Worker] Buscando na rede:', event.request.url);
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
                console.log('[Service Worker] Cacheando novo recurso:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Erro de fetch:', error);
            // Fallback para o offline
            if (event.request.url.match(/.html$/)) {
              return caches.match('./index.html');
            }
          });
      })
  );
}); 
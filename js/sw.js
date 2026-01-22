const CACHE_NAME = 'mario-game-v1';

// Lista de arquivos que devem ser salvos para funcionar offline
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './assets/mario.gif',
  './assets/pipe.png',
  './assets/clouds.png',
  './assets/icone-mario1.png'
];

// Instalando o Service Worker e guardando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto: Salvando arquivos do jogo');
      return cache.addAll(ASSETS);
    })
  );
});

// Interceptando as requisições para rodar o jogo do cache se estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o arquivo do cache se encontrar, senão busca na rede
      return response || fetch(event.request);
    })
  );
});
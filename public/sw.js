self.addEventListener("install", async () => {
    await self.skipWaiting();
});

self.addEventListener("activate", async () => {
    await self.clients.claim();
});

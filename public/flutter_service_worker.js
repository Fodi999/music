// Empty service worker placeholder
// This file prevents 404 errors when browsers/extensions look for service workers

self.addEventListener('install', function(event) {
  // Skip waiting
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

// Minimal service worker - no caching or functionality

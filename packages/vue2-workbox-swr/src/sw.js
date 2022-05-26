// build-sw.js
import { precacheAndRoute } from "workbox-precaching";
// import { registerRoute } from "workbox-routing";
// import { NetworkFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

// registerRoute(
//   ({ url }) => url.origin === "http://localhost:8080",
//   NetworkFirst({ cacheName: "api-response" })
// );

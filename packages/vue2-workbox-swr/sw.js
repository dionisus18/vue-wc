// build-sw.js
self.addEventListener("message", (evt) => {
  const { type, url } = evt.data;
  if (type === "REGISTER_URL") {
    if (!routes.has(url)) {
      console.log("registrando ruta", url);
      routes.add(url);
    }
  }

  // console.log("recibiendo registro de rutas", evt);
});

// import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { BroadcastUpdatePlugin } from "workbox-broadcast-update";

//esta comentado para que el data.json no use cache de sw
// precacheAndRoute(self.__WB_MANIFEST);
self.__WB_MANIFEST;
const routes = new Set();

registerRoute(
  ({ url: Url }) => {
    console.log(Url.href, routes.has(Url.href));
    return routes.has(Url.href);
  },
  new StaleWhileRevalidate({
    cacheName: "api-response",
    plugins: [
      new BroadcastUpdatePlugin({
        headersToCheck: ["etag"],
      }),
    ],
  })
);
/* registerRoute(
  ({ url }) => {
    // console.log(url, url.origin === "http://localhost:3011");
    return url.origin === "http://localhost:3011";
  },
  new StaleWhileRevalidate({
    cacheName: "api-response",
    plugins: [new BroadcastUpdatePlugin()],
  })
); */

// notas limpiar el codigo
// siempre async await
// siempre es6 o next para usar top await y demas
// cambiar la config del webpack a pwa
// hacer que un componente se actualize con los eventos del swr [quiza usando ref de vue]
// montar un express para las pruebas
// swr y los tiener funcionan siempre que no sean opacas las request [ideal en el mismo origin las pruebas]
// precache and route hay que desactivarlo si se prueba con un asset de estilo data.json en el src ya que recompila
// sacar sw del sw ya que los recompila
// vue: los listener globales se pueden escribir sin dramas en main.js es la forma correcta ya que es el entrypoint de toda la app
// si choca pnpm swr o pnpm build es porque serve-prod [o serve -s dist] esta corriendo aun [windows cosas]

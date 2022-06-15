// request.js
import { writable } from "svelte/store";
import { onMount } from "svelte";
export default function request(url, timeout) {
  const result = writable();
  const error = writable(null);
  // esperar el ready del service worker (on ready callback)
  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage({
      type: "REGISTER_URL",
      url,
    });
  });

  function mutate() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => result.set(data))
      .catch((err) => error.set(err));
  }

  const handlerBroadCastUpdate = async (event) => {
    // Do something with cacheName and updatedURL.
    // For example, get the cached content and update
    // the content on the page.
    const { cacheName, updatedURL } = event.detail;
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedURL);
    // const updatedText = await updatedResponse.text();
    const updatedJson = await updatedResponse.json();
    console.log("deteccion de cambios en broadcastupdate", event);
    console.log(
      "detección de cambios en broadcastupdate ----------------> verdadero"
    );
    result.set(updatedJson);
  };
  window.addEventListener(url, handlerBroadCastUpdate, false);
  mutate();
  if (timeout) {
    setTimeout(() => {
      console.log(
        "setTimeout removeEventListener message: workbox-broadcast-update"
      );
      window.removeEventListener(url, handlerBroadCastUpdate, false);
    }, timeout);
  }
  try {
    onMount(() => {
      return () => {
        console.log("svelte unmount");
        console.log("removeEventListener message: workbox-broadcast-update");
        window.removeEventListener(url, handlerBroadCastUpdate, false);
      };
    });
  } catch (error) {
    if (!timeout) {
      console.warn(
        "Se está ejecutando el request fuera de la inicialización, por lo tanto no se puede desconectar el evento. \
  Para llamar el request desvinculado al init debe llamar la función mutate, \
  siempre y cuanto request este inicializada en el init",
        error
      );
    }
  }
  return { result, mutate, error };
}

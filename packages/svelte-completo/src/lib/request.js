// request.js
import { writable } from "svelte/store";
import { onMount } from "svelte";
export default function request(url) {
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
      "deteccion de cambios en broadcastupdate ----------------> verdadero"
    );
    result.set(updatedJson);
  };
  window.addEventListener(url, handlerBroadCastUpdate, false);
  mutate();
  onMount(() => {
    return () => {
      console.log("svelte unmount");
      console.log("removeEventListener message: workbox-broadcast-update");
      window.removeEventListener(url, handlerBroadCastUpdate, false);
    };
  });
  return { result, mutate };
}

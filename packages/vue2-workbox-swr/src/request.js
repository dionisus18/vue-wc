// request.js
import { ref, onUnmounted } from "@vue/composition-api";

export function useRequest() {
  return function request(url) {
    const result = ref();
    const error = ref(null);
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
        .then((data) => (result.value = data))
        .catch((err) => (error.value = err));
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
      result.value = updatedJson;
    };
    window.addEventListener(url, handlerBroadCastUpdate, false);
    mutate();
    onUnmounted(() => {
      console.log("removeEventListener message: workbox-broadcast-update");
      window.removeEventListener(url, handlerBroadCastUpdate, false);
    });
    return { result, mutate };
  };
}

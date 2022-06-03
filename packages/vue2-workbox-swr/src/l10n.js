// l10n.js
import { watchEffect, onMounted, ref, onUnmounted } from "@vue/composition-api";

function checkAndMergeTranslations(ogList, newList) {
  const ogListKeys = Object.keys(ogList);
  const newListKeys = Object.keys(newList);
  if (
    ogListKeys.length === newListKeys.length &&
    ogListKeys.every((v, i) => v === newListKeys[i])
  )
    return newList;
  for (let key of ogListKeys) {
    if (!newList[key]) {
      console.log(key);
      newList[key] = ogList[key];
    }
  }
  return newList;
}

async function broadcastupdate(event, l10n) {
  // Optional: ensure the message came from workbox-broadcast-update
  console.log("message: workbox-broadcast-update");
  if (event.data.meta === "workbox-broadcast-update") {
    const { cacheName, updatedURL } = event.data.payload;

    // Do something with cacheName and updatedURL.
    // For example, get the cached content and update
    // the content on the page.
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedURL);
    // const updatedText = await updatedResponse.text();
    const updatedJson = await updatedResponse.json();
    l10n.value = checkAndMergeTranslations(l10n.value, updatedJson);
    console.log({ updatedJson, updatedResponse, cache, updatedURL, event });
  }
}

export function useL10n(original) {
  const l10n = ref([]);
  const error = ref(null);
  try {
    watchEffect(() => (l10n.value = original));
  } catch (error) {
    console.warn("error in watchEffect", error);
  }
  onMounted(async () => {
    try {
      const res = await fetch("http://localhost:3011/translations");
      const json = await res.json();
      l10n.value = checkAndMergeTranslations(original, json);
    } catch (err) {
      error.value = err;
      console.warn("onMounted", err);
    }
  });
  // navigator.serviceWorker.addEventListener("message", async (event) => {
  //   broadcastupdate(event, l10n);
  // });
  onUnmounted(() => {
    console.log("removeEventListener message: workbox-broadcast-update");
    navigator.serviceWorker.removeEventListener("message", broadcastupdate);
  });

  return { l10n, error };
}

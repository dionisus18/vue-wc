navigator.serviceWorker.addEventListener("message", async (event) => {
  console.log("message: workbox-broadcast-update");
  if (event.data.meta === "workbox-broadcast-update") {
    const { updatedURL } = event.data.payload;
    const broadcastupdate = new CustomEvent(updatedURL, {
      detail: event.data.payload,
    });
    console.log(broadcastupdate);
    window.dispatchEvent(broadcastupdate);
  }
});

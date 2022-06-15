<!--Add this line to your web component-->
<svelte:options tag="read-more" />

<script>
  console.log("read more init");
  import { onDestroy, onMount } from "svelte";
  import request from "./request";
  // import Dummy from "./ComponenteDummy.svelte";

  export let text = "";
  // let result;
  // new Promise((res) => setTimeout(res, 2000)).then(() => {
  //   ({ result } = request("http://localhost:3011/translations/readmore"));
  //   result.subscribe((value) => {
  //     console.log("subscribe", value);
  //     if (value) {
  //       text = value;
  //     }
  //   });
  // });

  const { result } = request("http://localhost:3011/translations/readmore");

  result.subscribe((value) => {
    console.log("subscribe", value);
    if (value) {
      text = value;
    }
  });

  export let maxlen;
  let readMore = false;

  onDestroy(() => {
    console.log("on destroy in component");
  });

  onMount(() => {
    console.log("onMount in component");
  });

  // console.log($$props);
  // console.log(result);
  // console.log(text, maxlen);
  let textDinamic;
  $: textDinamic = readMore ? text : text.slice(0, maxlen);
</script>

<span>
  {#if text}
    {@html textDinamic}
  {/if}
</span>
<a href="#fg" on:click|preventDefault={() => (readMore = !readMore)}>
  {#if readMore}
    Leer Menos...
  {:else}
    Leer Más...
  {/if}
</a>

<!-- <test-dummy /> -->
<!-- ver si funciona reactivamente con el svelte asi tal cual (sin ocupar ningun tipo de reactiividad) -->

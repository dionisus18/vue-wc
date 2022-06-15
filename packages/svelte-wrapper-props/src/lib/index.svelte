<!--Add this line to your web component-->
<svelte:options tag="wrapper-props" />

<script>
  import { beforeUpdate } from "svelte";
  // import { writable } from "svelte/store";
  import request from "./request";

  export let tag = "span";
  export let props = {};
  let localProps = {};

  // let storeProps = writable("guardado");

  beforeUpdate(() => {
    console.log("beforeUpdate props", $$props, $$slots);
    Object.entries(props).forEach(([key, value]) => {
      if (typeof value !== "object") {
        localProps[key] = value;
      } else if (!localProps[key]) {
        console.log("asignando", key);
        const { result } = request(
          `http://localhost:3011/translation/?textIndex=${value.text}`,
          2000
        );
        result.subscribe((value) => {
          // console.log("subscribe", value);
          localProps[key] = value;
        });
      }
    });
  });
</script>

<svelte:element this={tag} {...localProps}>
  <slot />
</svelte:element>

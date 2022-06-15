<svelte:options tag="test-dummy" />

<script>
  import { onDestroy } from "svelte";

  onDestroy(() => {
    console.log("on destroy dummy");
  });
</script>

<span>Hello World</span>

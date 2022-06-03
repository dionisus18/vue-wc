<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <itdComponentFunctional href="link" text="text" component="TestManualSwr" />
  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line no-unused-vars
import TestManualSwr from "@/components/TestManualSwr.vue";
import itdComponentFunctional from "@/components/wrapperFilterTagsToRender";
export default {
  name: "ManualView",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TestManualSwr,
    itdComponentFunctional,
  },
};
</script>

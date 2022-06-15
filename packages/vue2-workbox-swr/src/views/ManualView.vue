<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TestManualSwr />
  </div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line no-unused-vars
import TestManualSwr from "@/components/TestManualSwr.vue";
export default {
  name: "ManualView",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    TestManualSwr,
  },
};
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TestPluginTranslator />
  </div>
</template>

<script>
// @ is an alias to /src
import TestPluginTranslator from "@/components/TestPluginTranslator.vue";

export default {
  name: "AboutView",
  components: {
    TestPluginTranslator,
  },
};
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <testGeneralHome />
  </div>
</template>

<script>
// @ is an alias to /src
import testGeneralHome from "@/components/testGeneralHome.vue";

export default {
  name: "HomeView",
  components: {
    testGeneralHome,
  },
};
</script>

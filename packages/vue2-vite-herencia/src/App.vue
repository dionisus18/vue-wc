<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MapWidget msg="Welcome to Your Vue.js App" />
    <read-more maxlen="8" />
  </div>
</template>

<script>
import MapWidget from "./components/MapWidget.vue";
import "svelte-readmore";
export default {
  name: "App",
  components: {
    MapWidget,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

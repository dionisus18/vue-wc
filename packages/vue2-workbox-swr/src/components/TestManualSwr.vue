<template>
  <div class="hello">
    <!-- <h1>{{ titleTextManual }}</h1>
    <button @click="cargar">cargar</button> -->
    <a :data-algo="link" href="mailto:contacto@bancaeticalat.cl">{{ text }}</a>
    <wrapper-props
      tag="main"
      :props.prop="{ href: { text: 'https://google.cl' }, otra: 'asdasda' }"
    >
      <span names="juancarlos"> hijitos </span>
    </wrapper-props>
  </div>
</template>

<script>
import "svelte-wrapper-props";

export default {
  name: "TestManualSwr",
  data() {
    return {
      link: "https://google.cl",
      text: "ir a google",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

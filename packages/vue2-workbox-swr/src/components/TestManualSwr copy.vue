<template>
  <div class="hello">
    <h1>{{ titleTextManual }}</h1>
    <p>
      {{ viewDesc }}
    </p>
    <div>
      <h3>{{ listText }}</h3>
      <button @click="getTranslations">{{ btnLoadText }}</button>
      <div>
        <ul v-for="item in traducciones" :key="item.id">
          <li>
            {{ item.text }}
          </li>
        </ul>
      </div>
      <div>
        <p>{{ emptyText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "TestManualSwr",
  props: {
    msg: String,
  },
  data() {
    return {
      traducciones: [],
      titleTextManual: "Bienvenido a la vista de Manual",
      viewDesc:
        "Vista en la cual se puede probar el uso de swr para cargar las traducciones y manejar su cache y reactividad en vue",
      btnLoadText: "cargar traducciones",
      listText: "lista de traducciones",
      emptyText: "Vacia",
    };
  },
  methods: {
    async getTranslations() {
      // let res = await axios({ url: "http://localhost:3011/translations" });
      // const data = await res.data;
      let res = await fetch("http://localhost:3011/translations");
      const data = await res.json();
      this.traducciones = Object.values(data);
      console.log(this.traducciones, res);
    },
    async translateSite() {
      // let res = await axios({ url: "http://localhost:3011/translations" });
      // const data = res.data;
      let res = await fetch("http://localhost:3011/translations");
      const data = await res.json();
      const traducciones = data;
      this.titleTextManual = traducciones.titleTextManual;
      this.viewDesc = traducciones.viewDesc;
      this.btnLoadText = traducciones.btnLoadText;
      this.listText = traducciones.listText;
      this.emptyText = traducciones.emptyText;
    },
  },
  mounted() {
    this.translateSite();
    // this.getTranslations();
    // console.log(this.traducciones);
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

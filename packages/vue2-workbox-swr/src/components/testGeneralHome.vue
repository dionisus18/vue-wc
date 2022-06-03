<template>
  <div class="hello">
    <h1>{{ l10n.titleText }}</h1>
    <p>
      {{ l10n.viewDesc }}
    </p>
    <div>
      <h3>{{ l10n.listText }}</h3>
      <button>{{ l10n.btnLoadText }}</button>
      <div>
        <p>{{ l10n.emptyText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const original = {
  titleText: "Bienvenido a su inicio",
  viewDesc:
    "Vista en la cual se puede probar el uso de swr para cargar las traducciones y manejar su cache y reactividad en vue",
  btnLoadText: "cargar traducciones",
  listText: "lista de traducciones",
  emptyText: "Vacia",
};
import { useL10n } from "../l10n";
export default {
  setup() {
    const { l10n } = useL10n(original);
    return { l10n };
  },
  name: "testGeneralHome",
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

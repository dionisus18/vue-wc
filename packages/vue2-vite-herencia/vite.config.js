const { createVuePlugin } = require("vite-plugin-vue2");
import vueExtends from "../rollup-plugin-vue-extends";
module.exports = {
  plugins: [createVuePlugin(), { ...vueExtends(), enforce: "pre" }],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js",
    },
  },
};

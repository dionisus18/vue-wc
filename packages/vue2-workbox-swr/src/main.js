import Vue from "vue";
import App from "./App.vue";

import "./registerServiceWorker";
import "./broadcastSwrUpdate";

import router from "./router";
import store from "./store";

import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

// import AsyncComputed from "vue-async-computed";
// Vue.use(AsyncComputed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

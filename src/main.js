import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import mapper from "./plugins/ImageMapper";
import packager from "./plugins/BoargamePackager";

Vue.config.productionTip = false;

Vue.use(mapper);
Vue.use(packager);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

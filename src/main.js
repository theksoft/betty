import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import files from "./plugins/FileManager";
import mapper from "./plugins/ImageMapper";
import packager from "./plugins/BoargamePackager";
import skinner from "./plugins/SkinDesigner";

Vue.config.productionTip = false;

Vue.use(files);
Vue.use(mapper);
Vue.use(packager);
Vue.use(skinner);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

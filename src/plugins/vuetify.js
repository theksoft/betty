import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true
    /*,
    options: {
      customProperties: true
    }*/
  },
  icons: {
    iconfont: "mdiSvg", // default
    values: {
      about: "mdi-information",
      close: "mdi-close-thick",
      games: "mdi-package",
      gameAdd: "mdi-package-variant",
      home: "mdi-home",
      maps: "mdi-map-outline",
      mapAdd: "mdi-map-plus"
    }
  }
});

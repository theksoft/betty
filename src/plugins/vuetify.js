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
      about: "mdi-information-variant",
      close: "mdi-window-close",
      games: "mdi-package-variant-closed",
      gameAdd: "mdi-plus",
      home: "mdi-home",
      help: "mdi-help",
      maps: "mdi-image-filter-hdr",
      mapAdd: "mdi-plus"
    }
  }
});

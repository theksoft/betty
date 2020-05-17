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
      gameNew: "mdi-plus",
      gameLoad: "mdi-upload",
      gameSave: "mdi-download",
      gameClose: "mdi-window-close",
      home: "mdi-home",
      help: "mdi-help",
      maps: "mdi-image-filter-hdr",
      mapNew: "mdi-plus",
      mapLoad: "mdi-upload",
      mapImport: "mdi-import",
      mapExport: "mdi-export",
      mapSave: "mdi-download",
      mapPreview: "mdi-eye-outline",
      mapClose: "mdi-window-close"
    }
  }
});

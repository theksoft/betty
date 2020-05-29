import Vue from "vue";
import Vuetify from "vuetify/lib";
import VuetifyConfirm from "vuetify-confirm";

Vue.use(Vuetify);

const vuetify = new Vuetify({
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
      actionMore: "mdi-dots-horizontal",
      close: "mdi-window-close",
      games: "mdi-package-variant",
      gameClose: "mdi-window-close",
      gameEdit: "mdi-pencil-outline",
      gameLoad: "mdi-upload",
      gameNew: "mdi-plus",
      gameSave: "mdi-download",
      home: "mdi-home",
      help: "mdi-help",
      maps: "mdi-image-filter-hdr",
      mapClose: "mdi-window-close",
      mapEdit: "mdi-pencil-outline",
      mapExport: "mdi-export",
      mapImport: "mdi-import",
      mapLoad: "mdi-upload",
      mapNew: "mdi-plus",
      mapPreview: "mdi-eye-outline",
      mapSave: "mdi-download",
      modified: "mdi-sticker-alert-outline"
    }
  }
});

Vue.use(VuetifyConfirm, { vuetify });

export default vuetify;

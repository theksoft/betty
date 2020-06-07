import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
import VuetifyConfirm from "vuetify-confirm";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blueGrey.base,
        secondary: colors.brown.base,
        accent: colors.indigo.base,
        error: colors.red.base,
        warning: colors.orange.base,
        info: colors.blue.base,
        success: colors.green.base
      }
    },
    options: {
      customProperties: true
    }
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

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
      home: "mdi-home",
      help: "mdi-help",
      itemAdd: "mdi-plus",
      itemClose: "mdi-window-close",
      itemEdit: "mdi-pencil-outline",
      itemExport: "mdi-export",
      itemImport: "mdi-import",
      itemLoad: "mdi-upload",
      itemNew: "mdi-plus",
      itemPreview: "mdi-eye-outline",
      itemRemove: "mdi-delete",
      itemSave: "mdi-download",
      maps: "mdi-image-filter-hdr",
      modified: "mdi-sticker-alert-outline",
      skins: "mdi-drama-masks"
    }
  }
});

Vue.use(VuetifyConfirm, { vuetify });

export default vuetify;

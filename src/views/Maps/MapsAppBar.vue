<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-toolbar-title class="title">
      {{ title }}
    </v-toolbar-title>
    <v-icon v-if="unsaved" class="modified-indicator">$modified</v-icon>

    <v-spacer />

    <v-speed-dial v-model="showActions" right direction="left">
      <template v-slot:activator>
        <v-btn v-model="showActions" fab icon class="icon-activator">
          <v-icon>$actionMore</v-icon>
        </v-btn>
      </template>
      <v-tooltip
        v-for="(command, index) in commands"
        :key="index"
        bottom
        open-delay="1000"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            @click="runCommand(command.handler)"
            v-if="!command.disabled"
            x-small
            v-on="on"
            class="icon-menu"
          >
            <v-icon>{{ command.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ command.tip }}</span>
      </v-tooltip>
    </v-speed-dial>

    <template v-if="tabItems.length > 1" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
    </template>

    <maps-params-dialog ref="paramsDialog"></maps-params-dialog>

    <processing-dialog :show="processingDlg.dialog">
      {{ processingDlg.message }}
    </processing-dialog>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import routes from "@/router/resources.routes.js";
import MapsParamsDialog from "./MapsParamsDialog";
import ProcessingDialog from "@/components/ProcessingDialog";

export default {
  name: "maps-app-bar",
  components: {
    MapsParamsDialog,
    ProcessingDialog
  },
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    allCommands: [
      {
        icon: "$mapNew",
        tip: "New image map project",
        handler: "mapNew",
        target: false
      },
      {
        icon: "$mapLoad",
        tip: "Load image map project",
        handler: "mapLoad",
        target: false
      },
      {
        icon: "$mapSave",
        tip: "Save image map project",
        handler: "mapSave",
        target: true
      },
      {
        icon: "$mapPreview",
        tip: "Preview image map",
        handler: "mapPreview",
        target: true
      },
      {
        icon: "$mapImport",
        tip: "Import image map",
        handler: "mapImport",
        target: true
      },
      {
        icon: "$mapExport",
        tip: "Export image map",
        handler: "mapExport",
        target: true
      },
      {
        icon: "$mapEdit",
        tip: "Edit image map project parameters",
        handler: "mapEdit",
        target: true
      },
      {
        icon: "$mapClose",
        tip: "Close image map project",
        handler: "mapClose",
        target: true
      }
    ],
    maps: routes.maps,
    processingDlg: {
      dialog: false,
      message: ""
    },
    route: null,
    showActions: false
  }),
  computed: {
    commands() {
      return this.allCommands.map(({ icon, tip, handler, target }) => {
        return {
          icon,
          tip,
          handler,
          disabled: (!this.route || !this.$route.params.id) && target
        };
      });
    },
    tabItems() {
      return this.maps.routes();
    },
    title() {
      return this.maps.title;
    },
    unsaved() {
      if (!this.$route.params.id) {
        return false;
      }
      return this.mapModified(this.$route.params.id);
    },

    ...mapGetters("maps", ["elementById", "mapModified", "mapParams"])
  },

  methods: {
    async mapClose() {
      let id = this.$route.params.id;
      if (!this.mapModified(id)) {
        let r = this.maps.closestRoute(id);
        this.mapRemoveById(id);
        this.$router.push(r);
        return;
      }
      if (
        await this.$confirm(
          "Image map '" +
            this.elementById(id).name +
            "' has never been saved!<br>Do you really want to close it?",
          { title: "Warning" }
        )
      ) {
        let r = this.maps.closestRoute(id);
        this.mapRemoveById(id);
        this.$router.push(r);
      }
    },

    async mapEdit() {
      let params = await this.$refs.paramsDialog.open(
        "update",
        this.mapParams(this.$route.params.id),
        { width: 600 }
      );
      if (params) {
        const map = this.elementById(this.$route.params.id);
        if (map && !map.compare(params)) {
          this.mapUpdateParams({
            id: this.$route.params.id,
            params
          });
        }
      }
    },

    async mapLoad() {
      try {
        const file = await this.$files.selectFiles(this.$mapper.extension());
        if (file) {
          this.processingDlg.message = "Loading...";
          this.processingDlg.dialog = true;
          const map = await this.$mapper.loadBlob(file);
          this.mapAdd(map);
          if (map.id !== this.$route.params.id) {
            this.$router.push(this.maps.lastRoute());
          }
        }
      } catch (e) {
        alert(e.message);
      } finally {
        this.processingDlg.dialog = false;
      }
    },

    async mapNew() {
      let params = await this.$refs.paramsDialog.open(
        "new",
        this.$mapper.defaultParams(),
        { width: 600 }
      );
      if (params) {
        let map = this.$mapper.create(params);
        map.modified = true;
        this.mapAdd(map);
        this.$router.push(this.maps.lastRoute());
      }
    },

    async mapSave() {
      const map = this.elementById(this.$route.params.id);
      try {
        this.processingDlg.message = "Generating save...";
        this.processingDlg.dialog = true;
        const blob = await this.$mapper.blob(map);
        const filename = this.$mapper.filename(map);
        this.$files.saveBlobAs(blob, filename);
        // File download dialog is slow a bit to appear
        setTimeout(() => {
          this.mapSaved(this.$route.params.id);
        }, 1000);
      } catch (e) {
        alert(e.message);
      } finally {
        this.processingDlg.dialog = false;
      }
    },

    mapImport() {
      console.log("Import map!");
    },

    mapExport() {
      console.log("Export map!");
    },

    mapPreview() {
      console.log("Preview map!");
    },

    runCommand(command) {
      this[command]();
    },

    ...mapActions("maps", [
      "mapAdd",
      "mapUpdateParams",
      "mapRemoveById",
      "mapSaved"
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/app-bar.scss";
</style>

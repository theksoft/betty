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

    <skins-params-dialog ref="paramsDialog"></skins-params-dialog>

    <processing-dialog :show="processingDlg.dialog">
      {{ processingDlg.message }}
    </processing-dialog>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import routes from "@/router/resources.routes.js";
import SkinsParamsDialog from "./SkinsParamsDialog";
import ProcessingDialog from "@/components/ProcessingDialog";

export default {
  name: "skins-app-bar",
  components: {
    SkinsParamsDialog,
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
        icon: "$skinNew",
        tip: "New skin project",
        handler: "skinNew",
        target: false
      },
      {
        icon: "$skinLoad",
        tip: "Load skin project",
        handler: "skinLoad",
        target: false
      },
      {
        icon: "$skinSave",
        tip: "Save skin project",
        handler: "skinSave",
        target: true
      },
      {
        icon: "$skinEdit",
        tip: "Edit skin project parameters",
        handler: "skinEdit",
        target: true
      },
      {
        icon: "$skinClose",
        tip: "Close skin project",
        handler: "skinClose",
        target: true
      }
    ],
    skins: routes.skins,
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
      return this.skins.routes();
    },
    title() {
      return this.skins.title;
    },
    unsaved() {
      if (!this.$route.params.id) {
        return false;
      }
      return this.skinModified(this.$route.params.id);
    },

    ...mapGetters("skins", ["elementById", "skinModified", "skinParams"])
  },

  methods: {
    async skinClose() {
      let id = this.$route.params.id;
      if (!this.skinModified(id)) {
        let r = this.skins.closestRoute(id);
        this.skinRemoveById(id);
        this.$router.push(r);
        return;
      }
      if (
        await this.$confirm(
          "Skin '" +
            this.elementById(id).name +
            "' has never been saved!<br>Do you really want to close it?",
          { title: "Warning" }
        )
      ) {
        let r = this.skins.closestRoute(id);
        this.skinRemoveById(id);
        this.$router.push(r);
      }
    },

    async skinEdit() {
      let params = await this.$refs.paramsDialog.open(
        "update",
        this.skinParams(this.$route.params.id),
        { width: 600 }
      );
      if (params) {
        const skin = this.elementById(this.$route.params.id);
        if (skin && !skin.compare(params)) {
          this.skinUpdateParams({
            id: this.$route.params.id,
            params
          });
        }
      }
    },

    async skinLoad() {
      try {
        const file = await this.$files.selectFiles(this.$skinner.extension());
        if (file) {
          this.processingDlg.message = "Loading...";
          this.processingDlg.dialog = true;
          const skin = await this.$skinner.loadBlob(file);
          this.skinAdd(skin);
          if (skin.id !== this.$route.params.id) {
            this.$router.push(this.skins.lastRoute());
          }
        }
      } catch (e) {
        alert(e.message);
      } finally {
        this.processingDlg.dialog = false;
      }
    },

    async skinNew() {
      let params = await this.$refs.paramsDialog.open(
        "new",
        this.$skinner.defaultParams(),
        { width: 600 }
      );
      if (params) {
        let skin = this.$skinner.create(params);
        skin.modified = true;
        this.skinAdd(skin);
        this.$router.push(this.skins.lastRoute());
      }
    },

    async skinSave() {
      const skin = this.elementById(this.$route.params.id);
      try {
        this.processingDlg.message = "Generating save...";
        this.processingDlg.dialog = true;
        const blob = await this.$skinner.blob(skin);
        const filename = this.$skinner.filename(skin);
        this.$files.saveBlobAs(blob, filename);
        // File download dialog is slow a bit to appear
        setTimeout(() => {
          this.skinSaved(this.$route.params.id);
        }, 1000);
      } catch (e) {
        alert(e.message);
      } finally {
        this.processingDlg.dialog = false;
      }
    },

    runCommand(command) {
      this[command]();
    },

    ...mapActions("skins", [
      "skinAdd",
      "skinUpdateParams",
      "skinRemoveById",
      "skinSaved"
    ])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/app-bar.scss";
</style>

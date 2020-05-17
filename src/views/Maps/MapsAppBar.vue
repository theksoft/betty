<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-tooltip
      v-for="(command, index) in commands"
      :key="index"
      bottom
      open-delay="1000"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          @click="runCommand(command.handler)"
          :disabled="command.disabled"
          icon
          v-on="on"
        >
          <v-icon>{{ command.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ command.tip }}</span>
    </v-tooltip>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
import maps from "./resources/maps.routes.js";

export default {
  name: "maps-app-bar",
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    route: null,
    allCommands: [
      // eslint-disable-next-line
      { icon: "$mapNew", tip: "New image map project", handler: "newMap", target: false }, // eslint-disable-next-line
      { icon: "$mapLoad", tip: "Load image map project", handler: "loadMap", target: false }, // eslint-disable-next-line
      { icon: "$mapSave", tip: "Save image map project", handler: "saveMap", target: true }, // eslint-disable-next-line
      { icon: "$mapPreview", tip: "Preview image map", handler: "previewMap", target: true }, // eslint-disable-next-line
      { icon: "$mapImport", tip: "Import image map", handler: "importMap", target: true }, // eslint-disable-next-line
      { icon: "$mapExport", tip: "Export image map", handler: "exportMap", target: true }, // eslint-disable-next-line
      { icon: "$mapClose", tip: "Close image map project", handler: "closeMap", target: true }, // eslint-disable-next-line
    ]
  }),
  computed: {
    tabItems() {
      return maps.routes();
    },
    title() {
      return maps.name;
    },
    commands() {
      return this.allCommands.map(({ icon, tip, handler, target }) => {
        let noTabs = !this.route || !this.$route.params.id;
        return {
          icon,
          tip,
          handler,
          disabled: !noTabs || (noTabs && !target) ? false : true
        };
      });
    }
  },
  methods: {
    closeMap() {
      let r = maps.closestRoute(this.$route.params.id);
      this.removeMapById(this.$route.params.id);
      this.$router.push(r);
    },
    newMap() {
      this.addMap(this.$mapper.create());
      this.$router.push(maps.lastRoute());
    },
    loadMap() {
      console.log("Load map!");
    },
    importMap() {
      console.log("Import map!");
    },
    exportMap() {
      console.log("Export map!");
    },
    saveMap() {
      console.log("Save map!");
    },
    previewMap() {
      console.log("Preview map!");
    },

    ...mapActions("maps", ["addMap", "removeMapById"]),

    runCommand(command) {
      this[command]();
    }
  }
};
</script>

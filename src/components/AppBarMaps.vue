<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn @click="newMap" icon>
      <v-icon>$mapAdd</v-icon>
    </v-btn>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
      <v-btn @click="closeMap" icon>
        <v-icon>
          $close
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { ImageMap as Map } from "@/data/ImageMap.js";
import maps from "@/router/modules/mapsLinks.js";
import { mapActions } from "vuex";

export default {
  name: "app-bar-maps",
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    route: null
  }),
  computed: {
    tabItems() {
      return maps.routes();
    },
    title() {
      return maps.name;
    }
  },
  methods: {
    closeMap() {
      let r = maps.closestRoute(this.$route.params.id);
      this.removeMapById(this.$route.params.id);
      this.$router.push(r);
    },
    newMap() {
      this.addMap(new Map());
      this.$router.push(maps.lastRoute());
    },
    ...mapActions("maps", ["addMap", "removeMapById"])
  }
};
</script>

<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn @click="createMap" icon>
      <v-icon>$mapAdd</v-icon>
    </v-btn>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title class="mx-2">
      Mapper
    </v-toolbar-title>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
      <v-btn icon>
        <v-icon @click="closeMap">
          $close
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import maps from "@/router/links/mapsLinks.js";
import { mapActions } from "vuex";

export default {
  name: "app-bar-mapper",
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
    }
  },
  methods: {
    closeMap() {
      let r = maps.closestRoute(this.$route.params.id);
      this.removeMapById(this.$route.params.id);
      this.$router.push(r);
    },
    createMap() {
      this.newMap();
      this.$router.push(maps.lastRoute());
    },
    ...mapActions("maps", ["newMap", "removeMapById"])
  }
};
</script>

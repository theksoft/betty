<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn @click="$emit('new')" icon>
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
        <v-icon @click="$emit('close')">
          $close
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import maps from "@/router/links/mapsLinks.js";

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
  }
};
</script>

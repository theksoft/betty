<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn icon>
      <v-icon>$gameAdd</v-icon>
    </v-btn>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
      <v-btn icon>
        <v-icon>$close</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import games from "@/router/links/gamesLinks.js";

export default {
  name: "app-bar-designer",
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tabItems() {
      return [
        { id: 12, name: "Game 12", route: "/designer/12" },
        { id: 42, name: "Game 42", route: "/designer/42" },
        { id: 69, name: "Game 69", route: "/designer/69" }
      ];
    },
    title() {
      return games.name;
    }
  }
};
</script>

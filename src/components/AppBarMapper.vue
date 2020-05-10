<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn icon>
      <v-icon :color="color">mdi-map-plus</v-icon>
    </v-btn>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title :class="classTitle">
      Mapper
    </v-toolbar-title>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
      <v-btn icon>
        <v-icon :color="color">mdi-close-thick</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar-mapper",
  props: {
    clipped: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "default"
    },
    classText: {
      type: String,
      default: ""
    }
  },
  computed: {
    classTitle() {
      return this.classText + " mx-2";
    },
    tabItems() {
      return [
        { id: 12, name: "Map 12", route: "/mapper/12" },
        { id: 42, name: "Map 42", route: "/mapper/42" },
        { id: 69, name: "Map 69", route: "/mapper/69" }
      ];
    }
  }
};
</script>

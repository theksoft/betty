<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title :class="classTitle">
      Betty
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "app-bar-default",
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
    }
  }
};
</script>

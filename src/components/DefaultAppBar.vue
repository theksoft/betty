<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title class="mx-2">
      Betty
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "default-app-bar",
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  }
};
</script>

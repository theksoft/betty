<template>
  <v-dialog
    v-model="show"
    persistent
    :width="width"
    v-bind:style="{ zIndex: zIndex }"
  >
    <v-card :color="color" dark>
      <v-card-text class="py-2 justify-center align-center">
        <slot></slot>
        <v-progress-linear
          indeterminate
          color="white"
          class="my-2"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "processing-dialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "info"
    },
    width: {
      type: Number,
      default: 290
    },
    zIndex: {
      type: Number,
      default: 10
    }
  }
};
</script>

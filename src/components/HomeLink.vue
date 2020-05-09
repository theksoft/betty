<template>
  <v-card class="ma-6" :to="route" :width="width" :hover="true" :exact="true">
    <v-img class="pa-2" src="@/assets/app/background.jpg">
      <span></span>
      <v-img
        class="ma-auto rounded bordered"
        :width="imgSize"
        :height="imgSize"
        :src="imgLink"
      />
      <v-card-title class="brown--text text--lighten-3 justify-center">
        <slot></slot>
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "homelink",
  props: {
    width: {
      type: Number,
      required: true,
      default: 150
    },
    image: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  computed: {
    cardSize() {
      return this.width + "px";
    },
    imgSize() {
      return Math.round(this.width * 0.7) + "px";
    },
    imgLink() {
      if (!this.image) {
        return;
      }
      return require(`@/assets/home/${this.image}`);
    }
  }
};
</script>

<style scoped>
.rounded {
  border-radius: 50%;
}
.bordered {
  border: 3px solid #a1887f;
}
</style>

<template>
  <v-card
    :class="cardClass"
    :to="route"
    :width="cardWidth"
    :hover="true"
    :exact="true"
  >
    <v-img :class="imgPadding" src="@/assets/app/background.jpg">
      <span></span>
      <v-img
        class="ma-auto rounded bordered"
        :width="imgSize"
        :height="imgSize"
        :src="imgLink"
      />
      <v-card-title v-if="titlePresent" :class="titleClass">
        <slot></slot>
      </v-card-title>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "home-link",
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
    cardWidth() {
      let w = this.width;
      if (this.width <= 50) w = 50;
      else if (this.width > 250) w = 250;
      return w;
    },
    cardSize() {
      return this.cardWidth + "px";
    },
    imgSize() {
      return Math.round(this.cardWidth * 0.7) + "px";
    },
    imgLink() {
      if (!this.image) {
        return;
      }
      return require(`@/assets/home/${this.image}`);
    },
    cardClass() {
      let c = "ma-8",
        w = this.cardWidth;
      if (w < 80) c = "ma-2";
      else if (w < 110) c = "ma-4";
      else if (w < 150) c = "ma-6";
      return c;
    },
    imgPadding() {
      let c = "pa-4",
        w = this.cardWidth;
      if (w < 80) c = "pa-1";
      else if (w < 150) c = "pa-2";
      return c;
    },
    titlePresent() {
      return this.cardWidth >= 110;
    },
    titleClass() {
      let c = "brown--text text--lighten-3 justify-center",
        w = this.cardWidth;
      if (w >= 180) c += " headline font-weight-bold";
      else if (w < 130) c += " subtitle-2";
      return c;
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

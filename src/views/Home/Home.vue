<template>
  <div class="home" ref="home">
    <v-row class="flex-wrap">
      <home-link
        v-for="(link, index) in routes.filter(e => e.image)"
        :route="link.path"
        :image="link.image"
        :width="cardSize"
        :key="index"
      >
        {{ link.name }}
      </home-link>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeLink from "@/views/Home/components/HomeLink.vue";

export default {
  name: "home",
  components: {
    HomeLink
  },
  props: {
    routes: {
      type: Array,
      required: true
    },
    cardSize: {
      type: Number,
      default: 130
    }
  }
};
</script>

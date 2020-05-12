<template>
  <div class="home" ref="home">
    <v-row class="flex-wrap">
      <HomeLink
        v-for="(link, index) in links.filter(e => e.image)"
        :route="link.path"
        :image="link.image"
        :width="cardSize"
        :key="index"
      >
        {{ link.name }}
      </HomeLink>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeLink from "@/components/HomeLink.vue";

export default {
  name: "home",
  components: {
    HomeLink
  },
  props: {
    links: {
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

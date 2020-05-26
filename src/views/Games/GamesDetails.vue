<template>
  <div class="games-details">
    <h1>This is the game {{ id }} named {{ name }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "games-details",
  props: {
    id: {
      type: String,
      default: "NOT NAMED"
    }
  },
  computed: {
    name() {
      return this.elementById(this.id).name;
    },
    ...mapGetters("games", ["elementById"])
  }
};
</script>

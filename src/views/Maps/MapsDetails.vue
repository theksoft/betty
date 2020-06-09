<template>
  <div class="maps-details">
    <h1>This is the map {{ id }} named {{ name }} - version {{ version }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "maps-details",
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
    version() {
      return this.elementById(this.id).version;
    },
    ...mapGetters("maps", ["elementById"])
  }
};
</script>

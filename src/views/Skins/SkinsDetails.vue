<template>
  <div class="skins-details">
    <h1>This is the skin {{ id }} named {{ name }} - version {{ version }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "skins-details",
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
    ...mapGetters("skins", ["elementById"])
  }
};
</script>

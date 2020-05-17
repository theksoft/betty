<template>
  <div class="maps-details">
    <h1>This is the game {{ id }}!</h1>
  </div>
</template>

<script>
export default {
  name: "maps-details",
  props: {
    id: {
      type: String,
      default: "NOT NAMED"
    }
  }
};
</script>

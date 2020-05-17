<template>
  <div class="games-details">
    <h1>This is the game {{ id }}!</h1>
  </div>
</template>

<script>
export default {
  name: "games-details",
  props: {
    id: {
      type: String,
      default: "NOT NAMED"
    }
  }
};
</script>

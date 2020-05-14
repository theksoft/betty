<template>
  <div class="games">
    <h1>This is a designer page tab</h1>
    <p>I am {{ id }}!</p>
  </div>
</template>

<script>
export default {
  name: "games",
  props: {
    id: {
      type: String,
      default: "not named"
    }
  }
};
</script>

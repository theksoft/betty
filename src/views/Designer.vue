<template>
  <div class="designer">
    <h1>This is a designer page tab</h1>
    <p>I am {{ id }}!</p>
  </div>
</template>

<script>
export default {
  name: "designer",
  props: {
    id: {
      type: String,
      default: "not named"
    }
  }
};
</script>

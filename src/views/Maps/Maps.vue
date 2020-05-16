<template>
  <div class="maps">
    <h1>This is a map page tab</h1>
    <p>I am {{ id }}!</p>
  </div>
</template>

<script>
export default {
  name: "maps",
  props: {
    id: {
      type: String,
      default: "not named"
    }
  }
};
</script>

<template>
  <v-dialog v-model="show" action="action" params="params" persistent>
    Coucou!
    <v-btn @click.stop="$emit('valid', params)">
      OK
    </v-btn>
    <v-btn @click.stop="$emit('cancel')">
      Cancel
    </v-btn>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: "new"
    },
    params: {
      type: Object,
      default: null
    }
  }
};
</script>

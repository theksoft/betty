<template>
  <v-dialog
    v-model="show"
    action="action"
    params="params"
    persistent
    max-width="600"
  >
    <v-form class="pa-4 indigo darken-4" light v-model="valid">
      <h2 class="mb-1 primary--text text--lighten-3">
        Boardgame Parameters
      </h2>
      <v-divider />
      <v-text-field
        v-model="values.name"
        :rules="rules.name"
        label="Name"
        required
        @keypress.enter.prevent.stop
      ></v-text-field>
      <v-row class="justify-space-between mt-2">
        <v-btn @click.stop="$emit('cancel')" class="mx-4" color="primary">
          Cancel
        </v-btn>
        <v-btn
          @click.stop="valid && $emit('valid', values)"
          class="mx-4"
          color="primary"
          :disabled="!valid"
        >
          OK
        </v-btn>
      </v-row>
    </v-form>
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
  },
  data: () => ({
    valid: true,
    values: {
      name: ""
    },
    rules: {
      name: [v => !!v || "Name is required"]
    }
  }),
  watch: {
    show(value) {
      if (value) {
        this.values.name = this.params ? this.params.name || "" : "";
      }
    }
  }
};
</script>

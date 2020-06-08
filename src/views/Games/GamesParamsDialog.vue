<template>
  <v-dialog
    v-model="show"
    action="action"
    params="params"
    persistent
    max-width="600"
    @keydown.esc="onAbort"
    @keydown.enter.prevent="onValidate"
  >
    <v-form ref="form" class="form" v-model="valid">
      <h2 class="title">
        Boardgame Parameters
      </h2>
      <v-divider />
      <v-text-field
        v-model="values.name"
        :rules="rules.name"
        label="Name"
        required
      ></v-text-field>
      <v-row class="row-buttons">
        <v-btn @click.stop="onAbort" class="button">
          Cancel
        </v-btn>
        <v-btn @click.stop="onValidate" class="button" :disabled="!valid">
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
  },
  methods: {
    onAbort() {
      this.$emit("cancel");
    },
    onValidate() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$emit("valid", this.values);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/dialog-form.scss";
</style>

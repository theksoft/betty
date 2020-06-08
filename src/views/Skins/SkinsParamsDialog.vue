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
    <v-card>
      <v-card-title class="title">Skin Parameters</v-card-title>
      <v-form ref="form" class="form" lazy-validation>
        <v-text-field
          v-model="values.name"
          :rules="rules.name"
          label="Name"
          required
        ></v-text-field>
      </v-form>
      <v-card-actions class="row-buttons">
        <v-btn @click.stop="onAbort" class="button">Cancel</v-btn>
        <v-btn @click.stop="onValidate" class="button">OK</v-btn>
      </v-card-actions>
    </v-card>
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
      if (this.$refs.form.validate()) {
        this.$emit("valid", this.values);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/dialog-form.scss";
</style>

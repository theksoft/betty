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
        <v-row>
          <v-col cols="9">
            <v-text-field
              v-model="values.name"
              :rules="rules.name"
              label="Name"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-spacer />
          <v-col cols="2">
            <v-text-field
              v-model.number="values.version"
              type="Number"
              :min="1"
              :rules="rules.version"
              prefix="v"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="buttons">
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
      name: "",
      version: 1
    },
    rules: {
      name: [v => !!v || "Name is required"],
      version: [v => v >= 1 || "Must be greater than or equal to 1"]
    }
  }),
  watch: {
    show(value) {
      if (value) {
        this.values.name = this.params ? this.params.name || "" : "";
        this.values.version = this.params ? this.params.version || 1 : 1;
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

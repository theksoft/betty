<template>
  <v-dialog
    v-model="show"
    persistent
    :max-width="width"
    @keydown.esc="onAbort"
    @keydown.enter.prevent="onValidate"
  >
    <v-card>
      <v-card-title class="title">Boardgame Parameters</v-card-title>
      <v-form ref="form" class="form" lazy-validation>
        <v-row>
          <v-col cols="9">
            <v-text-field
              v-model="params.name"
              :rules="rules.name"
              label="Name"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-spacer />
          <v-col cols="2">
            <v-text-field
              v-model.number="params.version"
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
  data: () => ({
    show: false,
    resolve: null,
    action: "new",
    params: {
      name: "",
      version: 0
    },
    rules: {
      name: [v => !!v || "Name is required"],
      version: [v => v >= 1 || "Must be greater than or equal to 1"]
    },
    width: 0
  }),
  methods: {
    open(action, params, options) {
      this.show = true;
      this.width = options.width;
      this.action = action;
      this.params = Object.assign(this.params, params);
      return new Promise(resolve => {
        this.resolve = resolve;
      });
    },
    onAbort() {
      this.resolve(null);
      this.show = false;
    },
    onValidate() {
      if (this.$refs.form.validate()) {
        this.resolve(this.params);
        this.show = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/dialog-form.scss";
</style>

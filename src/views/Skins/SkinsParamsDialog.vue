<template>
  <v-dialog
    v-model="show"
    persistent
    :max-width="width"
    @keydown.esc="onAbort"
    @keydown.enter.prevent="onValidate"
  >
    <v-card>
      <v-card-title class="title">Skin Parameters</v-card-title>
      <v-form ref="form" class="form" lazy-validation>
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="params.name"
              :rules="rules.name"
              label="Name"
              clearable
              required
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model.number="params.version"
              type="Number"
              :min="1"
              :rules="rules.version"
              prefix="v"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="10">
            <v-text-field v-if="gameLink" label="Boardgame" disabled :rules="rules.game" required dense>
              {{ gameId }}
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn-toggle mandatory v-model="gameLink">
              <v-btn icon small><v-icon>mdi-link-box-outline</v-icon></v-btn>
              <v-btn icon small><v-icon>mdi-file-link-outline</v-icon></v-btn>
            </v-btn-toggle>
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
      version: 0,
      game: null
    },
    rules: {
      name: [v => !!v || "Name is required"],
      version: [v => v >= 1 || "Must be greater than or equal to 1"],
      game: [v => !!v || "Game must be assigned"]
    },
    gameLink: undefined,
    width: 0
  }),
  computed: {
    gameId() {
      return this.game ? this.game.id : undefined;
    }
  },
  watch: {
    gameLink(value) {
      console.log(value);
    }
  },
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

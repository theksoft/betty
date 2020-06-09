<template>
  <div class="games-details">
    <v-expansion-panels multiple focusable hover tile>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="header">
          <template v-slot:actions>
            <v-tooltip left open-delay="1000">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="header-action"
                  icon
                  @click.stop="gameEdit(id)"
                  v-on="on"
                >
                  <v-icon class="header-action-icon">$itemEdit</v-icon>
                </v-btn>
              </template>
              <span>Edit boardgame project parameters</span>
            </v-tooltip>
          </template>
          <div>
            <v-icon class="header-icon">$games</v-icon>
            <span>Parameters</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-card-title class="params-title">
              {{ name }} # {{ version }}
            </v-card-title>
            <v-card-subtitle class="params-subtitle">{{ id }}</v-card-subtitle>
            <v-card-text class="params-text">TODO</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="header">
          <template v-slot:actions>
            <v-tooltip left open-delay="1000">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="header-action"
                  icon
                  @click.stop="gameAddSkin(id)"
                  v-on="on"
                >
                  <v-icon class="header-action-icon">$itemAdd</v-icon>
                </v-btn>
              </template>
              <span>Add a skin to boardgame project</span>
            </v-tooltip>
          </template>
          <div>
            <v-icon class="header-icon">$skins</v-icon>
            <span>Skins</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ name }} # {{ version }} - {{ id }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <games-params-dialog ref="paramsDialog"></games-params-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import GamesParamsDialog from "./GamesParamsDialog";

export default {
  name: "games-details",
  components: {
    GamesParamsDialog
  },
  props: {
    id: {
      type: String,
      default: "NOT NAMED"
    }
  },
  computed: {
    name() {
      return this.elementById(this.id).name;
    },
    version() {
      return this.elementById(this.id).version;
    },
    ...mapGetters("games", ["elementById", "gameParams"])
  },
  methods: {
    async gameEdit(id) {
      let params = await this.$refs.paramsDialog.open(
        "update",
        this.gameParams(id),
        { width: 600 }
      );
      if (params) {
        const game = this.elementById(id);
        if (game && !game.compare(params)) {
          this.gameUpdateParams({ id, params });
        }
      }
    },

    gameAddSkin(id) {
      console.log(id);
    },

    ...mapActions("games", ["gameUpdateParams"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/details.scss";
</style>

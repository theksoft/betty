<template>
  <div class="games-details">
    <v-expansion-panels multiple focusable hover tile>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="header">
          <template v-slot:actions>
            <v-btn class="header-action" icon @click.stop>
              <v-icon class="header-action-icon">$gameEdit</v-icon>
            </v-btn>
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
            <v-btn class="header-action" icon @click.stop>
              <v-icon class="header-action-icon">$skinAdd</v-icon>
            </v-btn>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "games-details",
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
    ...mapGetters("games", ["elementById"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/details.scss";
</style>

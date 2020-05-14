<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn @click="newGame" icon>
      <v-icon>$gameAdd</v-icon>
    </v-btn>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
      <v-btn @click="closeGame" icon>
        <v-icon>$close</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { Game } from "@/data/Game.js";
import games from "@/router/modules/gamesLinks.js";
import { mapActions } from "vuex";

export default {
  name: "app-bar-games",
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    route: null
  }),
  computed: {
    tabItems() {
      return games.routes();
    },
    title() {
      return games.name;
    }
  },
  methods: {
    closeGame() {
      let r = games.closestRoute(this.$route.params.id);
      this.removeGameById(this.$route.params.id);
      this.$router.push(r);
    },
    newGame() {
      this.addGame(new Game());
      this.$router.push(games.lastRoute());
    },
    ...mapActions("games", ["addGame", "removeGameById"])
  }
};
</script>

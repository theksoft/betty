<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-btn @click="newGame" icon>
      <v-icon>$gameAdd</v-icon>
    </v-btn>
    <v-btn @click="closeGame" icon>
      <v-icon>$close</v-icon>
    </v-btn>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import games from "./resources/games.routes.js";

export default {
  name: "games-app-bar",
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
      if (this.route && this.elementById(this.$route.params.id)) {
        return (
          // eslint-disable-next-line prettier/prettier
          "[" + games.title + "] " + this.elementById(this.$route.params.id).name
        );
      }
      return games.title;
    },

    ...mapGetters("maps", ["elementById"])
  },
  methods: {
    closeGame() {
      let r = games.closestRoute(this.$route.params.id);
      this.removeGameById(this.$route.params.id);
      this.$router.push(r);
    },
    newGame() {
      this.addGame(this.$packager.create());
      this.$router.push(games.lastRoute());
    },
    ...mapActions("games", ["addGame", "removeGameById"])
  }
};
</script>

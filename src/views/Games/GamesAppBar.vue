<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-tooltip
      v-for="(command, index) in commands"
      :key="index"
      bottom
      open-delay="1000"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          @click="runCommand(command.handler)"
          :disabled="command.disabled"
          icon
          v-on="on"
        >
          <v-icon>{{ command.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ command.tip }}</span>
    </v-tooltip>
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
    route: null,
    allCommands: [
      // eslint-disable-next-line
      { icon: "$gameNew", tip: "New boardgame project", handler: "newGame", target: false }, // eslint-disable-next-line
      { icon: "$gameLoad", tip: "Load boardgame project", handler: "loadGame", target: false }, // eslint-disable-next-line
      { icon: "$gameSave", tip: "Save boardgame project", handler: "saveGame", target: true }, // eslint-disable-next-line
      { icon: "$gameClose", tip: "Close boardgame project", handler: "closeGame", target: true } // eslint-disable-next-line
    ]
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
    commands() {
      return this.allCommands.map(({ icon, tip, handler, target }) => {
        let noTabs = !this.route || !this.$route.params.id;
        return {
          icon,
          tip,
          handler,
          disabled: !noTabs || (noTabs && !target) ? false : true
        };
      });
    },

    ...mapGetters("games", ["elementById"])
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
    loadGame() {
      console.log("Load game!");
    },
    saveGame() {
      console.log("Save game!");
    },

    runCommand(command) {
      this[command]();
    },

    ...mapActions("games", ["addGame", "removeGameById"])
  }
};
</script>

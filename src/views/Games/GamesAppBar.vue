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
    <template v-if="tabItems.length > 1" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
    </template>
    <games-params-dialog
      :show="paramsDlg.dialog"
      :action="paramsDlg.action"
      :params="paramsDlg.params"
      @valid="onGamesParams($event)"
      @cancel="paramsDlg.dialog = false"
    />
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import routes from "@/router/resources.routes.js";
import GamesParamsDialog from "./GamesParamsDialog";

export default {
  name: "games-app-bar",
  components: {
    GamesParamsDialog
  },
  props: {
    clipped: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    route: null,
    allCommands: [
      {
        icon: "$gameNew",
        tip: "New boardgame project",
        handler: "newGame",
        target: false
      },
      {
        icon: "$gameLoad",
        tip: "Load boardgame project",
        handler: "loadGame",
        target: false
      },
      {
        icon: "$gameSave",
        tip: "Save boardgame project",
        handler: "saveGame",
        target: true
      },
      {
        icon: "$gameEdit",
        tip: "Edit boardgame project parameters",
        handler: "editGame",
        target: true
      },
      {
        icon: "$gameClose",
        tip: "Close boardgame project",
        handler: "closeGame",
        target: true
      }
    ],
    games: routes.games,
    paramsDlg: {
      dialog: false,
      action: "new",
      params: {}
    }
  }),
  computed: {
    tabItems() {
      return this.games.routes();
    },
    title() {
      if (this.route && this.elementById(this.$route.params.id)) {
        return (
          "[" +
          this.games.title +
          "] " +
          this.elementById(this.$route.params.id).name
        );
      }
      return this.games.title;
    },
    commands() {
      return this.allCommands.map(({ icon, tip, handler, target }) => {
        return {
          icon,
          tip,
          handler,
          disabled: (!this.route || !this.$route.params.id) && target
        };
      });
    },

    ...mapGetters("games", ["elementById", "gameCompareParams", "gameParams"])
  },
  methods: {
    closeGame() {
      let r = this.games.closestRoute(this.$route.params.id);
      this.gameRemoveById(this.$route.params.id);
      this.$router.push(r);
    },
    editGame() {
      this.paramsDlg.action = "update";
      this.paramsDlg.params = this.gameParams(this.$route.params.id);
      this.paramsDlg.dialog = true;
    },
    loadGame() {
      console.log("Load game!");
    },
    newGame() {
      this.paramsDlg.action = "new";
      this.paramsDlg.params = this.$packager.defaultParams();
      this.paramsDlg.dialog = true;
    },
    saveGame() {
      console.log("Save game!");
    },
    onGamesParams(e) {
      this.paramsDlg.dialog = false;
      switch (this.paramsDlg.action) {
        case "new":
          {
            let game = this.$packager.create(e);
            game.saved = false;
            this.gameAdd(game);
          }
          this.$router.push(this.games.lastRoute());
          break;
        case "update":
          {
            let arg = {
              id: this.$route.params.id,
              params: e
            };
            if (!this.gameCompareParams(arg)) {
              this.gameUpdateParams(arg);
            }
          }
          break;
        default:
          console.log(
            "Unexpected 'games-params-dialog' call:\n action --> " +
              this.paramsDlg.action +
              "\n event data --> " +
              e
          );
      }
    },

    runCommand(command) {
      this[command]();
    },

    ...mapActions("games", ["gameAdd", "gameUpdateParams", "gameRemoveById"])
  }
};
</script>

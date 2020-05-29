<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <v-icon v-if="modified" tile>$modified</v-icon>

    <v-spacer />

    <v-speed-dial v-model="showActions" right direction="left" open-on-hover>
      <template v-slot:activator>
        <v-btn v-model="showActions" fab icon>
          <v-icon>$actionMore</v-icon>
        </v-btn>
      </template>
      <v-tooltip
        v-for="(command, index) in commands"
        :key="index"
        bottom
        open-delay="1000"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            @click="runCommand(command.handler)"
            v-if="!command.disabled"
            x-small
            v-on="on"
          >
            <v-icon>{{ command.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ command.tip }}</span>
      </v-tooltip>
    </v-speed-dial>

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
    },
    route: null,
    showActions: false
  }),
  computed: {
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
    modified() {
      if (this.route) {
        return this.gameModified(this.$route.params.id);
      }
      return false;
    },
    tabItems() {
      return this.games.routes();
    },
    title() {
      if (this.route && this.elementById(this.$route.params.id)) {
        return (
          this.games.title +
          " - " +
          this.elementById(this.$route.params.id).name
        );
      }
      return this.games.title;
    },

    ...mapGetters("games", [
      "elementById",
      "gameCompareParams",
      "gameModified",
      "gameParams"
    ])
  },
  methods: {
    async closeGame() {
      let id = this.$route.params.id;
      if (
        this.gameModified(id) &&
        (await this.$confirm(
          "Boardgame '" +
            this.elementById(id).name +
            "' has never been saved!<br>Do you really want to close it?",
          { title: "Warning" }
        ))
      ) {
        let r = this.games.closestRoute(id);
        this.gameRemoveById(id);
        this.$router.push(r);
      }
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
            game.modified = true;
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

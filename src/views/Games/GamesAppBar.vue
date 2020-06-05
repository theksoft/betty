<template>
  <v-app-bar
    dense
    :clipped-left="clipped"
    app
    class="primary--text text--lighten-1"
  >
    <slot></slot>
    <v-toolbar-title class="mx-2">
      {{ title }}
    </v-toolbar-title>
    <v-icon v-if="unsaved" class="ml-2 error--text text--lighten-1">
      $modified
    </v-icon>

    <v-spacer />

    <v-speed-dial v-model="showActions" right direction="left">
      <template v-slot:activator>
        <v-btn v-model="showActions" fab icon color="primary lighten-1">
          <v-icon>$actionMore</v-icon>
        </v-btn>
      </template>
      <v-tooltip
        v-for="(command, index) in commands"
        :key="index"
        bottom
        open-delay="1000"
        color="info info--text text--lighten-5"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            @click="runCommand(command.handler)"
            v-if="!command.disabled"
            x-small
            v-on="on"
            color="secondary"
            class="black--text"
          >
            <v-icon>{{ command.icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ command.tip }}</span>
      </v-tooltip>
    </v-speed-dial>

    <template v-if="tabItems.length > 1" v-slot:extension>
      <v-tabs
        v-model="route"
        align-with-title
        show-arrows
        color="secondary lighten-2"
      >
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

    <processing-dialog :show="processingDlg.dialog">
      {{ processingDlg.message }}
    </processing-dialog>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import routes from "@/router/resources.routes.js";
import GamesParamsDialog from "./GamesParamsDialog";
import ProcessingDialog from "@/components/ProcessingDialog";

export default {
  name: "games-app-bar",
  components: {
    GamesParamsDialog,
    ProcessingDialog
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
        handler: "gameNew",
        target: false
      },
      {
        icon: "$gameLoad",
        tip: "Load boardgame project",
        handler: "gameLoad",
        target: false
      },
      {
        icon: "$gameSave",
        tip: "Save boardgame project",
        handler: "gameSave",
        target: true
      },
      {
        icon: "$gameEdit",
        tip: "Edit boardgame project parameters",
        handler: "gameEdit",
        target: true
      },
      {
        icon: "$gameClose",
        tip: "Close boardgame project",
        handler: "gameClose",
        target: true
      }
    ],
    games: routes.games,
    processingDlg: {
      dialog: false,
      message: ""
    },
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
    tabItems() {
      return this.games.routes();
    },
    title() {
      return this.games.title;
    },
    unsaved() {
      if (!this.$route.params.id) {
        return false;
      }
      return this.gameModified(this.$route.params.id);
    },

    ...mapGetters("games", [
      "elementById",
      "gameCompareParams",
      "gameModified",
      "gameParams"
    ])
  },

  methods: {
    async gameClose() {
      let id = this.$route.params.id;
      if (!this.gameModified(id)) {
        let r = this.games.closestRoute(id);
        this.gameRemoveById(id);
        this.$router.push(r);
        return;
      }
      if (
        await this.$confirm(
          "Boardgame '" +
            this.elementById(id).name +
            "' has never been saved!<br>Do you really want to close it?",
          { title: "Warning" }
        )
      ) {
        let r = this.games.closestRoute(id);
        this.gameRemoveById(id);
        this.$router.push(r);
      }
    },

    gameEdit() {
      this.paramsDlg.action = "update";
      this.paramsDlg.params = this.gameParams(this.$route.params.id);
      this.paramsDlg.dialog = true;
    },

    async gameLoad() {
      try {
        const file = await this.$files.selectFiles(this.$packager.extension());
        if (file) {
          this.processingDlg.message = "Loading...";
          this.processingDlg.dialog = true;
          const game = await this.$packager.loadBlob(file);
          this.gameAdd(game);
          if (game.id !== this.$route.params.id) {
            this.$router.push(this.games.lastRoute());
          }
        }
      } catch (e) {
        alert(e.message);
      } finally {
        this.processingDlg.dialog = false;
      }
    },

    gameNew() {
      this.paramsDlg.action = "new";
      this.paramsDlg.params = this.$packager.defaultParams();
      this.paramsDlg.dialog = true;
    },

    async gameSave() {
      const game = this.elementById(this.$route.params.id);
      try {
        this.processingDlg.message = "Generating save...";
        this.processingDlg.dialog = true;
        const blob = await this.$packager.blob(game);
        const filename = this.$packager.filename(game);
        this.$files.saveBlobAs(blob, filename);
        // File download dialog is slow a bit to appear
        setTimeout(() => {
          this.gameSaved(this.$route.params.id);
        }, 1000);
      } catch (e) {
        alert(e.message);
      } finally {
        this.processingDlg.dialog = false;
      }
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

    ...mapActions("games", [
      "gameAdd",
      "gameUpdateParams",
      "gameRemoveById",
      "gameSaved"
    ])
  }
};
</script>

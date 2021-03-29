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
            <span>Skins [{{ skinsCount }}]</span>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="skinsHeaders"
            :items="skins"
            dense
            fixed-header
            disable-pagination
            hide-default-footer
            class="item-table"
          >
            <template v-slot:item.actions="{ item }">
              <v-tooltip
                v-for="(command, index) in skinItemCommands"
                :key="index"
                bottom
                open-delay="1000"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    @click="runItemCommand(command.handler, item)"
                    small
                    v-on="on"
                    class="item-table-action"
                  >
                    {{ command.icon }}
                  </v-icon>
                </template>
                <span>{{ command.tip }}</span>
              </v-tooltip>
            </template>
            <template v-slot:no-data>
              No skin defined for this game.
            </template>
          </v-data-table>
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
  data: () => ({
    skinItemCommands: [
      { icon: "$itemEdit", tip: "Edit skin", handler: "dummy" },
      { icon: "$itemRemove", tip: "Remove skin", handler: "gameRemoveSkin" }
    ]
  }),
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
    skinsHeaders() {
      return [
        { text: "Name", align: "start", value: "name" },
        { text: "Version", align: "center", value: "version", sortable: false },
        { text: "ID", align: "start", value: "id", sortable: false },
        { text: "Actions", align: "start", value: "actions", sortable: false }
      ];
    },
    skins() {
      return this.elementById(this.id).skins;
    },
    skinsCount() {
      return this.elementById(this.id).skins.length;
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

    dummy(item) {
      console.log(item);
    },

    gameAddSkin(id) {
      let params = this.$skinner.defaultParams(this.elementById(id));
      this.gameSkinAdd({ id, skin: this.$skinner.create(params) });
    },
    async gameRemoveSkin(skin) {
      if (
        await this.$confirm(
          "Skin " +
            skin.id +
            " will be removed from game.<br> Do you really want continue?",
          { title: "Warning" }
        )
      ) {
        console.log("REMOVED!");
      }
    },
    runItemCommand(command, item) {
      this[command](item);
    },

    ...mapActions("games", ["gameUpdateParams", "gameSkinAdd"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/details.scss";
</style>

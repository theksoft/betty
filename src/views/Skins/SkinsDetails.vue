<template>
  <div class="skins-details">
    <v-expansion-panels multiple focusable hover tile>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="header">
          <template v-slot:actions>
            <v-tooltip left open-delay="1000">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="header-action"
                  icon
                  @click.stop="skinEdit(id)"
                  v-on="on"
                >
                  <v-icon class="header-action-icon">$itemEdit</v-icon>
                </v-btn>
              </template>
              <span>Edit skin project parameters</span>
            </v-tooltip>
          </template>
          <div>
            <v-icon class="header-icon">$skins</v-icon>
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
    </v-expansion-panels>

    <skins-params-dialog ref="paramsDialog"></skins-params-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SkinsParamsDialog from "./SkinsParamsDialog";

export default {
  name: "skins-details",
  components: {
    SkinsParamsDialog
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
    ...mapGetters("skins", ["elementById", "skinParams"])
  },
  methods: {
    async skinEdit(id) {
      let params = await this.$refs.paramsDialog.open(
        "update",
        this.skinParams(id),
        { width: 600 }
      );
      if (params) {
        const skin = this.elementById(id);
        if (skin && !skin.compare(params)) {
          this.skinUpdateParams({ id, params });
        }
      }
    },

    ...mapActions("skins", ["skinUpdateParams"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/details.scss";
</style>

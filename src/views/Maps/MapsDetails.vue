<template>
  <div class="maps-details">
    <v-expansion-panels multiple focusable hover tile>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="header">
          <template v-slot:actions>
            <v-tooltip left open-delay="1000">
              <template v-slot:activator="{ on }">
                <v-btn
                  class="header-action"
                  icon
                  @click.stop="mapEdit(id)"
                  v-on="on"
                >
                  <v-icon class="header-action-icon">$itemEdit</v-icon>
                </v-btn>
              </template>
              <span>Edit image map project parameters</span>
            </v-tooltip>
          </template>
          <div>
            <v-icon class="header-icon">$maps</v-icon>
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

    <maps-params-dialog ref="paramsDialog"></maps-params-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MapsParamsDialog from "./MapsParamsDialog";

export default {
  name: "maps-details",
  components: {
    MapsParamsDialog
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
    ...mapGetters("maps", ["elementById", "mapParams"])
  },
  methods: {
    async mapEdit(id) {
      let params = await this.$refs.paramsDialog.open(
        "update",
        this.mapParams(id),
        { width: 600 }
      );
      if (params) {
        const map = this.elementById(id);
        if (map && !map.compare(params)) {
          this.mapUpdateParams({ id, params });
        }
      }
    },

    ...mapActions("maps", ["mapUpdateParams"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/details.scss";
</style>

<template>
  <div class="maps">
    <v-card tile hover class="card" v-for="item in items" :key="item.id" exact>
      <v-list-item :to="item.id" append exact>
        <v-list-item-icon>
          <v-icon class="icon" x-large>$maps</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="headline item-title">
            {{ item.name }} # v{{ item.version }}
            <v-icon v-if="mapModified(item.id)" class="modified-indicator">
              $modified
            </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle class="item-text">
            {{ item.id }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click.prevent="mapClose(item.id)" class="icon-button" icon>
            <v-icon>$itemClose</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "maps",
  computed: {
    items() {
      return this.allParams;
    },
    ...mapGetters("maps", ["allParams", "elementById", "mapModified"])
  },
  methods: {
    async mapClose(id) {
      if (!this.mapModified(id)) {
        this.mapRemoveById(id);
        return;
      }
      if (
        await this.$confirm(
          "Image map '" +
            this.elementById(id).name +
            "' has never been saved!<br>Do you really want to close it?",
          { title: "Warning" }
        )
      ) {
        this.mapRemoveById(id);
      }
    },
    ...mapActions("maps", ["mapRemoveById"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/vue-items.scss";
</style>

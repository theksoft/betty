<template>
  <div class="games">
    <v-card tile hover class="card" v-for="item in items" :key="item.id" exact>
      <v-list-item :to="item.id" append exact>
        <v-list-item-icon>
          <v-icon class="icon" x-large>$games</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="headline item-title">
            {{ item.name }} # v{{ item.version }}
            <v-icon v-if="gameModified(item.id)" class="modified-indicator">
              $modified
            </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle class="item-text">
            {{ item.id }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click.prevent="gameClose(item.id)" class="icon-button" icon>
            <v-icon>$close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "games",
  computed: {
    items() {
      return this.allParams;
    },
    ...mapGetters("games", ["allParams", "elementById", "gameModified"])
  },
  methods: {
    async gameClose(id) {
      if (!this.gameModified(id)) {
        this.gameRemoveById(id);
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
        this.gameRemoveById(id);
      }
    },
    ...mapActions("games", ["gameRemoveById"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/vue-items.scss";
</style>

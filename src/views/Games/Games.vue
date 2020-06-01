<template>
  <div class="games">
    <v-card tile hover class="my-2" v-for="item in items" :key="item.id" exact>
      <v-list-item :to="item.id" append exact>
        <v-list-item-icon>
          <v-icon tile>$games</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ item.name }}
            <!--v-icon v-if="item.modified" tile>$modified</v-icon-->
            <v-icon v-if="gameModified(item.id)" tile>$modified</v-icon>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.id }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click.prevent="closeGame(item.id)" icon>
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
      return this.elementNames;
    },
    ...mapGetters("games", ["elementNames", "elementById", "gameModified"])
  },
  methods: {
    async closeGame(id) {
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

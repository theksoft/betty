<template>
  <div class="skins">
    <v-card tile hover class="card" v-for="item in items" :key="item.id" exact>
      <v-list-item :to="item.id" append exact>
        <v-list-item-icon>
          <v-icon class="icon" x-large>$skins</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="headline item-title">
            {{ item.name }} # v{{ item.version }}
            <v-icon v-if="skinModified(item.id)" class="modified-indicator">
              $modified
            </v-icon>
          </v-list-item-title>
          <v-list-item-subtitle class="item-text">
            {{ item.id }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click.prevent="skinClose(item.id)" class="icon-button" icon>
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
  name: "skins",
  computed: {
    items() {
      return this.allParams;
    },
    ...mapGetters("skins", ["allParams", "elementById", "skinModified"])
  },
  methods: {
    async skinClose(id) {
      if (!this.skinModified(id)) {
        this.skinRemoveById(id);
        return;
      }
      if (
        await this.$confirm(
          "Skin '" +
            this.elementById(id).name +
            "' has never been saved!<br>Do you really want to close it?",
          { title: "Warning" }
        )
      ) {
        this.skinRemoveById(id);
      }
    },
    ...mapActions("skins", ["skinRemoveById"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/vue-items.scss";
</style>

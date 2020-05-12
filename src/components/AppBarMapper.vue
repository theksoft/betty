<template>
  <v-app-bar dense :clipped-left="clipped" app>
    <slot></slot>
    <v-btn @click="$emit('new')" icon>
      <v-icon :color="color">mdi-map-plus</v-icon>
    </v-btn>
    <v-spacer />
    <v-divider vertical />
    <v-toolbar-title :class="classTitle">
      Mapper
    </v-toolbar-title>
    <template v-if="tabItems.length" v-slot:extension>
      <v-tabs v-model="route" align-with-title show-arrows>
        <v-tab v-for="e in tabItems" :to="e.route" :key="e.id" exact>
          {{ e.name }}
        </v-tab>
      </v-tabs>
      <v-btn icon>
        <v-icon @click="$emit('close', route)" :color="color">
          mdi-close-thick
        </v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app-bar-mapper",
  props: {
    clipped: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "default"
    },
    classText: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    route: null
  }),
  computed: {
    classTitle() {
      return this.classText + " mx-2";
    },
    tabItems() {
      return this.mapRoutes("/mapper/");
    },
    ...mapGetters("maps", ["mapRoutes", "data"])
  },
  watch: {
    route(value) {
      if (this.$route.name !== "Map" && this.data) {
        this.$router.push(this.data);
        return;
      }
      if (value && value !== this.$route.path) {
        this.$router.push(value);
      }
      this.storeData(value);
    },
    tabItems(value) {
      if (0 === value.length) {
        this.storeData(null);
        this.route = null;
        this.$router.push("/mapper/");
      }
    }
  },
  methods: {
    ...mapActions("maps", ["storeData"])
  }
};
</script>

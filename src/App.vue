<template>
  <v-app id="betty">
    <v-navigation-drawer
      v-model="drawer.model"
      :clipped="drawer.clipped"
      :mini-variant="drawer.mini"
      :expand-on-hover="drawer.mini"
      mini-variant-width="42"
      width="160"
      app
      overflow
    >
      <v-list nav dense>
        <v-list-item
          v-for="(link, index) in links"
          :to="link.path"
          :key="index"
        >
          <v-list-item-action>
            <v-icon :color="theme.color">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title :class="theme.classText">
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <component
      :is="showAppBar"
      :clipped="drawer.clipped"
      :color="theme.color"
      :classText="theme.classText"
      @new="newMap"
      @close="closeMap"
    >
      <v-app-bar-nav-icon
        :color="theme.color"
        @click.stop="drawer.model = !drawer.model"
      />
    </component>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>

    <v-footer app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { links } from "@/router/links.js";
import { mapActions } from "vuex";
import AppBarDefault from "@/components/AppBarDefault.vue";
import AppBarDesigner from "@/components/AppBarDesigner.vue";
import AppBarMapper from "@/components/AppBarMapper.vue";

export default {
  name: "Betty",
  components: {
    AppBarDefault,
    AppBarDesigner,
    AppBarMapper
  },
  data: () => ({
    drawer: {
      model: false,
      clipped: true,
      mini: true
    },
    links,
    theme: {
      color: "brown lighten-2",
      classText: "brown--text text--lighten-3"
    }
  }),
  computed: {
    showAppBar() {
      if ("Designer" === this.$route.name || "Game" === this.$route.name) {
        return "AppBarDesigner";
      }
      if ("Mapper" === this.$route.name || "Map" === this.$route.name) {
        return "AppBarMapper";
      }
      return "AppBarDefault";
    }
  },
  methods: {
    closeMap(route) {
      this.removeMapById(route.substring("/mapper/".length));
    },
    ...mapActions("maps", ["newMap", "removeMapById"])
  }
};
</script>

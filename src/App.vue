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
          v-for="(link, index) in routes.nav()"
          :to="link.path"
          :key="index"
          class="nav"
        >
          <v-list-item-action>
            <v-icon class="nav-icon">
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="nav-text">
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <component :is="showAppBar" :clipped="drawer.clipped">
      <v-app-bar-nav-icon
        @click.stop="drawer.model = !drawer.model"
        class="nav-activator"
      ></v-app-bar-nav-icon>
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
import routes from "@/router/resources.routes.js";
import DefaultAppBar from "@/components/DefaultAppBar.vue";
import GamesAppBar from "@/views/Games/GamesAppBar.vue";
import MapsAppBar from "@/views/Maps/MapsAppBar.vue";
import SkinsAppBar from "@/views/Skins/SkinsAppBar.vue";

export default {
  name: "Betty",
  components: {
    DefaultAppBar,
    GamesAppBar,
    MapsAppBar,
    SkinsAppBar
  },
  data: () => ({
    drawer: {
      model: false,
      clipped: true,
      mini: true
    },
    routes
  }),
  computed: {
    showAppBar() {
      return routes.appBar(this.$route) || "DefaultAppBar";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";
.nav {
  color: map-get($secondary, lighten-4) !important;
}
.nav-activator {
  color: $primary-text !important;
}
.nav-text {
  color: $primary-text;
}
.nav-icon {
  color: $primary-text-light !important;
}
</style>

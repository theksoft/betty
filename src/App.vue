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
            <v-icon color="brown lighten-2">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="brown--text text--lighten-3">
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="drawer.clipped" app>
      <v-app-bar-nav-icon
        color="brown lighten-2"
        @click.stop="drawer.model = !drawer.model"
      />
      <v-toolbar-title class="brown--text text--lighten-3">
        Betty
      </v-toolbar-title>
    </v-app-bar>

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
export default {
  name: "Betty",
  data: () => ({
    drawer: {
      model: false,
      clipped: true,
      mini: true
    },
    links: [
      {
        path: "/",
        name: "Home",
        icon: "mdi-home"
      },
      {
        path: "/designer",
        name: "Designer",
        icon: "mdi-package"
      },
      {
        path: "/mapper",
        name: "Mapper",
        icon: "mdi-map-outline"
      },
      {
        path: "/about",
        name: "About",
        icon: "mdi-information"
      }
    ]
  })
};
</script>

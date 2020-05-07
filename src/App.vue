<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>
          <router-link to="/">Home</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/designer">Designer</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/mapper">Mapper</router-link>
        </v-btn>
        <v-btn flat>
          <router-link to="/about">About</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <!--HelloWorld /-->
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/*
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
*/
</script>

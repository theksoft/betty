<template>
  <div class="home">
    <v-row class="flex-wrap">
      <v-card
        class="ma-6"
        width="150px"
        hover="true"
        to="/designer"
        exact="true"
      >
        <v-img class="pa-2" src="@/assets/app/background.jpg">
          <span></span>
          <v-img
            class="ma-auto rounded bordered"
            height="100px"
            width="100px"
            src="@/assets/home/game-package.png"
          />
          <v-card-title class="brown--text text--lighten-3 justify-center">
            Designer
          </v-card-title>
        </v-img>
      </v-card>
      <v-card
        class="ma-6"
        width="150px"
        hover="true"
        to="/mapper"
        exact="true"
      >
        <v-img class="pa-2" src="@/assets/app/background.jpg">
          <span></span>
          <v-img
            class="ma-auto rounded bordered"
            height="100px"
            width="100px"
            src="@/assets/home/ancient-map.png"
          />
          <v-card-title class="brown--text text--lighten-3 justify-center">
            Mapper
          </v-card-title>
        </v-img>
      </v-card>
    </v-row>
  </div>
</template>

<style scoped>
.rounded {
  border-radius: 50%;
}
.bordered {
  border: 3px solid #a1887f;
}
</style>

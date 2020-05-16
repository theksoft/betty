import Vue from "vue";
import Vuex from "vuex";

import { maps } from "@/views/Maps/resources/maps.store.js";
import { games } from "@/views/Games/resources/games.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { maps, games }
});

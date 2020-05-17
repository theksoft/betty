import Vue from "vue";
import Vuex from "vuex";

import { maps } from "./modules/maps.store.js";
import { games } from "./modules/games.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { maps, games }
});

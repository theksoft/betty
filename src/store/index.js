import Vue from "vue";
import Vuex from "vuex";
import { maps } from "./modules/mapsStore.js";
import { games } from "./modules/gamesStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { maps, games }
});

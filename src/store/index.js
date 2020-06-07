import Vue from "vue";
import Vuex from "vuex";

import { maps } from "./modules/maps.store.js";
import { games } from "./modules/games.store.js";
import { skins } from "./modules/skins.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { maps, games, skins }
});

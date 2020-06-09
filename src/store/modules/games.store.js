import { Boardgame } from "@/plugins/BoardgamePackager.js";

export const games = {
  namespaced: true,

  state: {
    content: []
  },

  getters: {
    closestElement: state => id => {
      let r = state.content.findIndex(e => e.id === id) + 1;
      if (r >= state.content.length) {
        r = r - 2;
      }
      return r < 0 ? null : state.content[r].id;
    },
    count: state => {
      return state.content.length;
    },
    elementById: state => id => {
      return state.content.find(e => e.id === id);
    },
    elementAt: state => index => {
      return state.content[index];
    },
    allParams: state => {
      return state.content.map(m => m.params);
    },
    gameModified: state => id => {
      let element = state.content.find(e => e.id === id);
      if (element) {
        return !!element.modified;
      }
      return false;
    },
    gameParams: state => id => {
      let element = state.content.find(e => e.id === id);
      return element ? element.params : {};
    }
  },

  mutations: {
    GAME_ADD: (state, game) => {
      try {
        // Check it is a game
        Boardgame.checkInstance(game);
        // id must not be present in content
        if (!state.content.find(e => e.id === game.id)) {
          state.content.push(game);
        }
      } catch (e) {
        console.log("Add game: " + e.message);
      }
    },
    GAME_REMOVE_BY_ID: (state, id) => {
      let i = state.content.findIndex(e => e.id === id);
      if (i !== -1) {
        state.content.splice(i, 1);
      }
    },
    GAME_SAVED: (state, id) => {
      let game = state.content.find(e => e.id === id);
      if (game) {
        game.modified = false;
      }
    },
    GAME_UPDATE: (state, { id, params }) => {
      let game = state.content.find(e => e.id === id);
      if (game) {
        game.params = params;
        game.modified = true;
      }
    }
  },

  actions: {
    gameAdd({ commit }, map) {
      commit("GAME_ADD", map);
    },
    gameRemoveById({ commit }, id) {
      commit("GAME_REMOVE_BY_ID", id);
    },
    gameSaved({ commit }, id) {
      commit("GAME_SAVED", id);
    },
    gameUpdateParams({ commit }, arg) {
      commit("GAME_UPDATE", arg);
    }
  }
};

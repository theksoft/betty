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
    elementNames: state => {
      return state.content.map(m => ({ name: m.name, id: m.id }));
    }
  },

  mutations: {
    ADD_GAME: (state, game) => {
      // Check it is a game
      if (game.type !== "boardgame" || !game.id) {
        return;
      }
      // id must not be present in content
      if (!state.content.find(e => e.id === game.id)) {
        state.content.push(game);
      }
    },
    REMOVE_GAME_BY_ID: (state, id) => {
      let i = state.content.findIndex(e => e.id === id);
      if (i !== -1) {
        state.content.splice(i, 1);
      }
    }
  },

  actions: {
    addGame({ commit }, map) {
      commit("ADD_GAME", map);
    },
    removeGameById({ commit }, id) {
      commit("REMOVE_GAME_BY_ID", id);
    }
  }
};

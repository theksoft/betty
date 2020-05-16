export const maps = {
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
    ADD_MAP: (state, map) => {
      // Check it is a map
      if (map.type !== "image-map" || !map.id) {
        return;
      }
      // id must not be present in content
      if (!state.content.find(e => e.id === map.id)) {
        state.content.push(map);
      }
    },
    REMOVE_MAP_BY_ID: (state, id) => {
      let i = state.content.findIndex(e => e.id === id);
      if (i !== -1) {
        state.content.splice(i, 1);
      }
    }
  },

  actions: {
    addMap({ commit }, map) {
      commit("ADD_MAP", map);
    },
    removeMapById({ commit }, id) {
      commit("REMOVE_MAP_BY_ID", id);
    }
  }
};

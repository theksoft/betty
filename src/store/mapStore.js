import { ImageMap } from "@/data/ImageMap.js";

export const maps = {
  namespaced: true,

  state: {
    content: []
  },

  getters: {
    closestMap: state => id => {
      let r = state.content.findIndex(e => e.id === id) + 1;
      if (r >= state.content.length) {
        r = r - 2;
      }
      return r < 0 ? null : state.content[r].id;
    },
    count: state => {
      return state.content.length;
    },
    map: state => id => {
      return state.content.find(e => e.id === id);
    },
    mapAt: state => index => {
      return state.content[index];
    },
    mapRoutes: state => path => {
      return state.content.map(m => {
        return { id: m.id, name: m.name, route: path + m.id };
      });
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
    newMap({ commit }) {
      commit("ADD_MAP", new ImageMap());
    },
    removeMapById({ commit }, id) {
      commit("REMOVE_MAP_BY_ID", id);
    }
  }
};

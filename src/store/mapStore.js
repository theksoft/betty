import { ImageMap } from "@/data/ImageMap.js";

export const maps = {
  namespaced: true,

  state: {
    content: [],
    data: null
  },

  getters: {
    count: state => {
      return state.content.length;
    },
    data: state => {
      return state.data;
    },
    mapRoutes: state => path => {
      return state.content.map(m => {
        return { id: m.id, name: m.name, route: path + m.id };
      });
    }
  },

  mutations: {
    addMap: (state, map) => {
      // Check it is a map
      if (map.type !== "image-map" || !map.id) {
        return;
      }
      // id must not be present in content
      if (!state.content.find(e => e.id === map.id)) {
        state.content.push(map);
      }
    },
    removeMapById: (state, id) => {
      let i = state.content.findIndex(e => e.id === id);
      if (i !== -1) {
        state.content.splice(i, 1);
      }
    },
    setData: (state, value) => {
      state.data = value;
    }
  },

  actions: {
    addMap({ commit }, map) {
      commit("addMap", map);
    },
    newMap({ commit }) {
      commit("addMap", new ImageMap());
    },
    removeMapById({ commit }, id) {
      commit("removeMapById", id);
    },
    storeData({ commit }, value) {
      commit("setData", value);
    }
  }
};

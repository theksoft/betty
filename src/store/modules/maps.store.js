import { Map } from "@/plugins/ImageMapper.js";

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
    },
    mapCompareParams: state => ({ id, params }) => {
      let element = state.content.find(e => e.id === id);
      return element.name === params.name;
    },
    mapModified: state => id => {
      let element = state.content.find(e => e.id === id);
      if (element) {
        return !!element.modified;
      }
      return false;
    },
    mapParams: state => id => {
      let element = state.content.find(e => e.id === id);
      let rtn = {};
      if (element) {
        Object.assign(rtn, {
          name: element.name
        });
      }
      return rtn;
    }
  },

  mutations: {
    MAP_ADD: (state, map) => {
      // Check it is a map
      if (map.type !== Map.type() || !map.id) {
        return;
      }
      // id must not be present in content
      if (!state.content.find(e => e.id === map.id)) {
        state.content.push(map);
      }
    },
    MAP_REMOVE_BY_ID: (state, id) => {
      let i = state.content.findIndex(e => e.id === id);
      if (i !== -1) {
        state.content.splice(i, 1);
      }
    },
    MAP_SAVED: (state, id) => {
      let map = state.content.find(e => e.id === id);
      if (map) {
        map.modified = false;
      }
    },
    MAP_UPDATE: (state, { id, params }) => {
      let map = state.content.find(e => e.id === id);
      if (map) {
        map.name = params.name;
        map.modified = true;
      }
    }
  },

  actions: {
    mapAdd({ commit }, map) {
      commit("MAP_ADD", map);
    },
    mapRemoveById({ commit }, id) {
      commit("MAP_REMOVE_BY_ID", id);
    },
    mapSaved({ commit }, id) {
      commit("MAP_SAVED", id);
    },
    mapUpdateParams({ commit }, arg) {
      commit("MAP_UPDATE", arg);
    }
  }
};

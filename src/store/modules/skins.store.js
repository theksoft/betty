import Skin from "../../plugins/SkinDesigner/Skin";

export const skins = {
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
    skinCompareParams: state => ({ id, params }) => {
      let element = state.content.find(e => e.id === id);
      return element.name === params.name;
    },
    skinModified: state => id => {
      let element = state.content.find(e => e.id === id);
      if (element) {
        return !!element.modified;
      }
      return false;
    },
    skinParams: state => id => {
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
    SKIN_ADD: (state, skin) => {
      // Check it is a skin
      if (skin.type !== Skin.type() || !skin.id) {
        return;
      }
      // id must not be present in content
      if (!state.content.find(e => e.id === skin.id)) {
        state.content.push(skin);
      }
    },
    SKIN_REMOVE_BY_ID: (state, id) => {
      let i = state.content.findIndex(e => e.id === id);
      if (i !== -1) {
        state.content.splice(i, 1);
      }
    },
    SKIN_SAVED: (state, id) => {
      let skin = state.content.find(e => e.id === id);
      if (skin) {
        skin.modified = false;
      }
    },
    SKIN_UPDATE: (state, { id, params }) => {
      let skin = state.content.find(e => e.id === id);
      if (skin) {
        skin.name = params.name;
        skin.modified = true;
      }
    }
  },

  actions: {
    skinAdd({ commit }, skin) {
      commit("SKIN_ADD", skin);
    },
    skinRemoveById({ commit }, id) {
      commit("SKIN_REMOVE_BY_ID", id);
    },
    skinSaved({ commit }, id) {
      commit("SKIN_SAVED", id);
    },
    skinUpdateParams({ commit }, arg) {
      commit("SKIN_UPDATE", arg);
    }
  }
};

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
    allParams: state => {
      return state.content.map(m => m.params);
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
      return element ? element.params : {};
    }
  },

  mutations: {
    SKIN_ADD: (state, skin) => {
      try {
        // Check it is a skin
        Skin.checkInstance(skin);
        // id must not be present in content
        if (!state.content.find(e => e.id === skin.id)) {
          state.content.push(skin);
        }
      } catch (e) {
        console.log("Add skin: " + e.message);
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
        skin.params = params;
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

import Game from "./BoardgamePackager/Boardgame.js";

const BoardgamePackager = {
  create: e => {
    return new Game(e);
  },

  defaultParams: () => {
    return {
      name: ""
    };
  },

  blob: game => {
    // Elaborate opbject copy
    let copy = Object.assign({}, game); // WARNING: Copy only properties that can be enumerated
    delete copy.modified;
    // Define content
    const data = JSON.stringify(copy);
    // return blob
    return {
      blob: new Blob([data], {
        type: "application/json"
      }),
      filename: game.id + ".json"
    };
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$packager", {
      value: BoardgamePackager
    });
  }
};

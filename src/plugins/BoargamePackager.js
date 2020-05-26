import Game from "./BoardgamePackager/Boardgame.js";

const BoardgamePackager = {
  create: e => {
    return new Game(e);
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$packager", {
      value: BoardgamePackager
    });
  }
};

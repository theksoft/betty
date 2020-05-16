import Game from "./BoardgamePackager/Boardgame.js";

const BoardgamePackager = {
  create: () => {
    return new Game();
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$packager", {
      value: BoardgamePackager
    });
  }
};

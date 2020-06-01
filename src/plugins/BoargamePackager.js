import Game from "./BoardgamePackager/Boardgame.js";

/*
  BoardgamePackager
  Private data
*/

const _extension = ".bgp";

const _buildBlob = game => {
  // Define content
  const data = JSON.stringify(game);
  // return blob
  return new Blob([data], { type: "application/json" });
};

const _loadBlob = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = e => reject(e);
    reader.onload = () => resolve(reader.result);
    reader.readAsText(blob);
  });
};

const _createFrom = obj => {
  return Game.reload(obj);
};

/*
  BoardgamePackager
  Public data
*/

const BoardgamePackager = {
  create: e => {
    return new Game(e);
  },

  defaultParams: () => {
    return {
      name: ""
    };
  },

  extension() {
    return _extension;
  },

  blob: game => {
    // Elaborate opbject copy
    // WARNING: Object.assign copies only properties that can be enumerated
    let copy = Object.assign({}, game);
    delete copy.modified;
    return {
      blob: _buildBlob(copy),
      filename: game.id + _extension
    };
  },

  loadBlob: async blob => {
    return _createFrom(JSON.parse(await _loadBlob(blob)));
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$packager", {
      value: BoardgamePackager
    });
  }
};

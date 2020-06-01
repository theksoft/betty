import Map from "./ImageMapper/ImageMap.js";

/*
  ImageMapper
  Private data
*/

const _extension = ".bgm";

const _buildBlob = map => {
  // Define content
  const data = JSON.stringify(map);
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
  return Map.reload(obj);
};

/*
  ImageMapper
  Public data
*/

const ImageMapper = {
  create: e => {
    return new Map(e);
  },

  defaultParams: () => {
    return {
      name: ""
    };
  },

  extension() {
    return _extension;
  },

  blob: map => {
    // Elaborate opbject copy
    // WARNING: Object.assign copies only properties that can be enumerated
    let copy = Object.assign({}, map);
    delete copy.modified;
    return {
      blob: _buildBlob(copy),
      filename: map.id + _extension
    };
  },

  loadBlob: async blob => {
    return _createFrom(JSON.parse(await _loadBlob(blob)));
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$mapper", { value: ImageMapper });
  }
};

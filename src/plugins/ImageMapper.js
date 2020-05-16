import Map from "./ImageMapper/ImageMap.js";

const ImageMapper = {
  create: () => {
    return new Map();
  }
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$mapper", { value: ImageMapper });
  }
};

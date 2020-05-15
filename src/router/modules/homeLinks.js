const HomeLinks = {
  _data: {
    rootPath: null, // Will be set by router
    rootName: null, // Will be set by router
    icon: "$home"
  },

  get data() {
    return this._data;
  },

  get rootName() {
    return this._data.rootName;
  },
  get rootPath() {
    return this._data.rootPath;
  },

  set params(params) {
    this._data.rootPath = params.rootPath;
    this._data.rootName = params.rootName;
    Object.freeze(this._data);
  }
};

export default HomeLinks;

("use strict");

export default class genericNavLinks {
  constructor(data) {
    this._data = {
      // BEGIN will be set after construction
      rootPath: null,
      rootName: null,
      // END will be set after construction
      icon: data.icon,
      appBar: data.appBar
    };
  }

  get appBar() {
    return this._data.appBar;
  }
  get data() {
    return this._data;
  }
  get rootName() {
    return this._data.rootName;
  }
  get rootPath() {
    return this._data.rootPath;
  }

  set params(params) {
    this._data.rootPath = params.rootPath;
    this._data.rootName = params.rootName;
    Object.freeze(this._data);
  }

  match(route) {
    if (!route) {
      return false;
    }
    return route.name === this.rootName;
  }
}

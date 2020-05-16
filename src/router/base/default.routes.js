("use strict");

export default class navigationRoutes {
  constructor(data) {
    this._data = {
      rootPath: data.rootPath,
      rootName: data.rootName,
      icon: data.icon,
      appBar: data.appBar
    };
    Object.freeze(this._data);
  }

  get appBar() {
    return this._data.appBar;
  }
  get data() {
    return this._data;
  }
  get name() {
    return this._data.rootName;
  }
  get rootName() {
    return this._data.rootName;
  }
  get rootPath() {
    return this._data.rootPath;
  }

  match(route) {
    if (!route) {
      return false;
    }
    return route.name === this.rootName;
  }
}

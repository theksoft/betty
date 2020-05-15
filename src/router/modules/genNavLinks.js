import store from "../../store";

("use strict");

export default class genericNavLinks {
  constructor(data) {
    this._data = {
      // BEGIN will be set after construction
      rootPath: null,
      rootName: null,
      idName: null,
      storeName: null,
      // END will be set after construction
      icon: data.icon,
      image: data.image,
      appBar: data.appBar
    };
    this._lastPath = null;
  }

  // Getters
  get data() {
    return this._data;
  }

  get appBar() {
    return this._data.appBar;
  }
  get idName() {
    return this._data.idName;
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

  // Setters
  set params(params) {
    this._data.rootPath = params.rootPath;
    this._data.rootName = params.rootName;
    this._data.idName = params.idName;
    this._data.storeName = params.storeName;
    Object.freeze(this._data);
  }

  beforeEach(to, from, r) {
    // If leaving an "id" route, store it if it exists
    if (from.name === this.idName) {
      this._lastPath = from.path;
      this.checkLastPath();
    }
    // Going to parent route, go to lastPath if valid or first map if any
    // Specific case if coming from "id" route, just prevent
    if (to.name === this.rootName) {
      if (this.checkLastPath()) {
        return from.name === this.idName && from.path === this._lastPath
          ? false
          : this._lastPath;
      }
    }
    return r;
  }

  checkLastPath() {
    if (this._lastPath) {
      if (!this.sGetArgs("elementById", this.getId(this._lastPath))) {
        this._lastPath = null;
      }
    }
    if (!this._lastPath && this.sGet("count")) {
      this._lastPath = this.rootPath + "/" + this.sGetArgs("elementAt", 0).id;
    }
    return this._lastPath;
  }

  closestRoute(id) {
    let r = this.sGetArgs("closestElement", id);
    return this.rootPath + (r ? "/" + r : "");
  }

  getId(path) {
    // Remove path + '/'
    return path ? path.substring(this.rootPath.length + 1) : null;
  }

  lastRoute() {
    let path = this.rootPath;
    let count = this.sGet("count");
    if (count) {
      path += "/" + this.sGetArgs("elementAt", count - 1).id;
    }
    return path;
  }

  match(route) {
    if (!route) {
      return false;
    }
    return route.name === this.rootName || route.name === this.idName;
  }

  routes() {
    return this.sGet("elementNames").map(m => {
      return { id: m.id, name: m.name, route: this.rootPath + "/" + m.id };
    });
  }

  sGet(getter) {
    return store.getters[this._data.storeName + "/" + getter];
  }
  sGetArgs(getter, ...args) {
    return store.getters[this._data.storeName + "/" + getter](...args);
  }
}

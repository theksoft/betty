import store from "../../store";

("use strict");

export default class NavigationRoutes {
  constructor(data) {
    this._data = {
      rootPath: data.rootPath,
      rootName: data.rootName,
      idName: data.idName,
      storeName: data.storeName,
      icon: data.icon,
      image: data.image,
      appBar: data.appBar,
      title: data.title
    };
    Object.freeze(this._data);
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
  get title() {
    return this._data.title;
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
    let rtn = this.sGet("allParams").map(m => {
      return { id: m.id, name: m.name, route: this.rootPath + "/" + m.id };
    });
    rtn.splice(0, 0, { name: "...", route: this.rootPath });
    return rtn;
  }

  sGet(getter) {
    return store.getters[this._data.storeName + "/" + getter];
  }
  sGetArgs(getter, ...args) {
    return store.getters[this._data.storeName + "/" + getter](...args);
  }
}

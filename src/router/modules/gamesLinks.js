import store from "../../store";


("use strict");

const GamesLinks = {
  /* TODO: Give credits to image maker
    <a href="https://www.vecteezy.com/free-vector/ancient-map">Ancient Map Vectors by Vecteezy</a>
  */
  data: {
    name: null, // Will be set by router
    nameId: null, // Will be set by router
    path: null, // Will be set by router
    icon: "$games",
    image: "game-package.png",
    appBar: "AppBarGames"
  },
  lastPath: null,
  get appBar() {
    return this.data.appBar;
  },
  get name() {
    return this.data.name;
  },
  get nameId() {
    return this.data.nameId;
  },
  get path() {
    return this.data.path;
  },

  beforeEach(to, from, r) {
    // If leaving an "id" route, store it if it exists
    if (from.name === this.data.nameId) {
      this.lastPath = from.path;
      this.checkLastPath();
    }
    // Going to parent route, go to lastPath if valid or first map if any
    // Specific case if coming from "id" route, just prevent
    if (to.name === this.data.name) {
      if (this.checkLastPath()) {
        return from.name === this.data.nameId && from.path === this.lastPath
          ? false
          : this.lastPath;
      }
    }
    return r;
  },

  checkLastPath() {
    if (this.lastPath) {
      if (!this.sGetArgs("game", this.getId(this.lastPath))) {
        this.lastPath = null;
      }
    }
    if (!this.lastPath && this.sGet("count")) {
      this.lastPath = this.data.path + "/" + this.sGetArgs("gameAt", 0).id;
    }
    return this.lastPath;
  },

  closestRoute(id) {
    let r = this.sGetArgs("closestGame", id);
    return this.data.path + (r ? "/" + r : "");
  },

  getId(path) {
    // Remove path + '/'
    return path ? path.substring(this.data.path.length + 1) : null;
  },

  lastRoute() {
    let path = this.data.path;
    let count = this.sGet("count");
    if (count) {
      path += "/" + this.sGetArgs("gameAt", count - 1).id;
    }
    return path;
  },

  match(route) {
    if (!route) {
      return false;
    }
    return route.name === this.data.name || route.name === this.data.nameId;
  },

  routes() {
    return this.sGet("gameNames").map(m => {
      return { id: m.id, name: m.name, route: this.data.path + "/" + m.id };
    });
  },

  setRouteParams(path, name, nameId) {
    this.data.path = path;
    this.data.name = name;
    this.data.nameId = nameId;
    Object.freeze(this.data);
  },

  sGet(getter) {
    return store.getters["games/" + getter];
  },
  sGetArgs(getter, ...args) {
    return store.getters["games/" + getter](...args);
  }
};

export default GamesLinks;

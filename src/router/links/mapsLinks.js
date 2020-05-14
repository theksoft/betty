import store from "../../store";

("use strict");

const MapsLinks = {
  data: {
    name: null, // Will be set by router
    nameId: null, // Will be set by router
    path: null, // Will be set by router
    icon: "$maps",
    image: "ancient-map.png"
  },
  lastPath: null,
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
      if (!store.getters["maps/map"](this.getId(this.lastPath))) {
        this.lastPath = null;
      }
    }
    if (!this.lastPath && store.getters["maps/count"]) {
      this.lastPath = this.data.path + "/" + store.getters["maps/mapAt"](0).id;
    }
    return this.lastPath;
  },

  closestRoute(id) {
    let r = store.getters["maps/closestMap"](id);
    return this.data.path + (r ? "/" + r : "");
  },

  getId(path) {
    // Remove path + '/'
    return path ? path.substring(this.data.path.length + 1) : null;
  },

  lastRoute() {
    let path = this.data.path;
    let count = store.getters["maps/count"];
    if (count) {
      path += "/" + store.getters["maps/mapAt"](count - 1).id;
    }
    return path;
  },

  routes() {
    return store.getters["maps/mapNames"].map(m => {
      return { id: m.id, name: m.name, route: this.data.path + "/" + m.id };
    });
;
  },

  setRouteParams(path, name, nameId) {
    this.data.path = path;
    this.data.name = name;
    this.data.nameId = nameId;
    Object.freeze(this.data);
  }
};

export default MapsLinks;

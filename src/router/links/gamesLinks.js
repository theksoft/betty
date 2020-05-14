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
    appBar: "AppBarDesigner"
  },
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

  match(route) {
    if (!route) {
      return false;
    }
    return route.name === this.data.name || route.name === this.data.nameId;
  },

  setRouteParams(path, name, nameId) {
    this.data.path = path;
    this.data.name = name;
    this.data.nameId = nameId;
    Object.freeze(this.data);
  }
};

export default GamesLinks;

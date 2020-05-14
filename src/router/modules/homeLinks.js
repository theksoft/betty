const HomeLinks = {
  data: {
    name: null, // Will be set by router
    path: null, // Will be set by router
    icon: "$home"
  },
  get name() {
    return this.data.name;
  },
  get path() {
    return this.data.path;
  },

  setRouteParams(path, name) {
    this.data.path = path;
    this.data.name = name;
    Object.freeze(this.data);
  }
};

export default HomeLinks;

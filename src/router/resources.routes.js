import Home from "@/views/Home/resources/home.routes.js";
import About from "@/views/About/resources/about.routes.js";
import Games from "@/views/Games/resources/games.routes.js";
import Maps from "@/views/Maps/resources/maps.routes.js";

const modules = [
  // Declared in order of menu
  Home,
  Games,
  Maps,
  About
];

const Resources = {
  get about() {
    return About;
  },

  get games() {
    return Games;
  },

  get home() {
    return Home;
  },

  get maps() {
    return Maps;
  },

  appBar(route) {
    return modules.reduce((r, e) => {
      if (r) {
        return r;
      }
      if (e.match && e.match(route)) {
        r = e.appBar;
      }
      return r;
    }, null);
  },

  beforeEach(to, from, next) {
    let v = modules.reduce((r, e) => {
      if (!e.beforeEach) {
        return r;
      }
      return e.beforeEach(to, from, r);
    }, null);
    v === null ? next() : next(v);
  },

  homeNav: () => {
    return modules
      .reduce((r, v) => {
        r.push(v.data);
        return r;
      }, [])
      .filter(e => {
        return e.image;
      })
      .map(e => ({
        path: e.rootPath,
        name: e.rootName,
        image: e.image
      }));
  },

  nav: () => {
    return modules
      .reduce((r, v) => {
        r.push(v.data);
        return r;
      }, [])
      .map(e => ({
        path: e.rootPath,
        name: e.rootName,
        icon: e.icon
      }));
  }
};

export default Resources;

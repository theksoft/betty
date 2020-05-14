import Home from "./modules/homeLinks.js";
import About from "./modules/aboutLinks.js";
import Games from "./modules/gamesLinks.js";
import Maps from "./modules/mapsLinks.js";

const modules = [
  // Declared in order of menu
  Home,
  Games,
  Maps,
  About
];

const Links = {
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
      });
    // Could have chained map to restrict to specific fields ... for another loop price
  },

  nav: () => {
    return modules.reduce((r, v) => {
      r.push(v.data);
      return r;
    }, []);
    // Could have chained map to restrict to specific fields ... for another loop price
  }
};

export default Links;
export const homeLinks = Links.homeNav;
export const navLinks = Links.nav;

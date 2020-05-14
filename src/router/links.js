import Home from "./links/homeLinks.js";
import About from "./links/aboutLinks.js";
import Games from "./links/gamesLinks.js";
import Maps from "./links/mapsLinks.js";

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
  },

  beforeEach(to, from, next) {
    let v = modules.reduce((r, e) => {
      if (!e.beforeEach) {
        return r;
      }
      return e.beforeEach(to, from, r);
    }, null);
    v === null ? next() : next(v);
  }
};

export default Links;
export const homeLinks = Links.homeNav;
export const navLinks = Links.nav;

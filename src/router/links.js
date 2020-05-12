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
  home: () => {
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
export const homeLinks = Links.home;
export const navLinks = Links.nav;

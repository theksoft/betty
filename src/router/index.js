import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Links from "./links.js";

Vue.use(VueRouter);

Links.home.setRouteParams("/", "Home");
Links.about.setRouteParams("/about", "About");
Links.maps.setRouteParams("/maps", "Maps", "Map");
Links.games.setRouteParams("/games", "Games", "Game");

const routes = [
  {
    path: Links.home.path,
    name: Links.home.name,
    component: Home,
    props: { links: Links.homeNav() }
  },
  {
    path: Links.games.path,
    name: Links.games.name,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // Use webpackChunkName: "designer"
    component: () => import("../views/Games.vue")
  },
  {
    path: Links.games.path + "/:id",
    name: Links.games.nameId,
    // Use webpackChunkName: "designer"
    component: () => import("../views/Games.vue"),
    props: true
  },
  {
    path: Links.maps.path,
    name: Links.maps.name,
    // Use webpackChunkName: "mapper"
    component: () => import("../views/Maps.vue")
  },
  {
    path: Links.maps.path + "/:id",
    name: Links.maps.nameId,
    // Use webpackChunkName: "mapper"
    component: () => import("../views/Maps.vue"),
    props: true
  },
  {
    path: Links.about.path,
    name: Links.about.name,
    // Use webpackChunkName: "about"
    component: () => import("../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (Links.beforeEach) {
    Links.beforeEach(to, from, next);
  }
});

export default router;

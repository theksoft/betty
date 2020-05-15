import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Links from "./links.js";

Vue.use(VueRouter);

Links.home.params = {
  rootPath: "/",
  rootName: "Home"
};

Links.about.params = {
  rootPath: "/about",
  rootName: "About"
};

Links.maps.params = {
  rootPath: "/maps",
  rootName: "Maps",
  idName: "Map",
  storeName: "maps"
};

Links.games.params = {
  rootPath: "/games",
  rootName: "Games",
  idName: "Game",
  storeName: "games"
};

const routes = [
  {
    path: Links.home.rootPath,
    name: Links.home.rootName,
    component: Home,
    props: { links: Links.homeNav() }
  },
  {
    path: Links.games.rootPath,
    name: Links.games.rootName,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // Use webpackChunkName: "games"
    component: () => import("../views/Games.vue")
  },
  {
    path: Links.games.rootPath + "/:id",
    name: Links.games.idName,
    // Use webpackChunkName: "games"
    component: () => import("../views/Games.vue"),
    props: true
  },
  {
    path: Links.maps.rootPath,
    name: Links.maps.rootName,
    // Use webpackChunkName: "maps"
    component: () => import("../views/Maps.vue")
  },
  {
    path: Links.maps.rootPath + "/:id",
    name: Links.maps.idName,
    // Use webpackChunkName: "maps"
    component: () => import("../views/Maps.vue"),
    props: true
  },
  {
    path: Links.about.rootPath,
    name: Links.about.rootName,
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

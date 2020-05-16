import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home/Home.vue";
import resources from "./resources.routes.js";

Vue.use(VueRouter);

const routes = [
  {
    path: resources.home.rootPath,
    name: resources.home.rootName,
    component: Home,
    props: { routes: resources.homeNav() }
  },
  {
    path: resources.games.rootPath,
    name: resources.games.rootName,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // Use webpackChunkName: "games"
    component: () => import("../views/Games/Games.vue")
  },
  {
    path: resources.games.rootPath + "/:id",
    name: resources.games.idName,
    // Use webpackChunkName: "games"
    component: () => import("../views/Games/Games.vue"),
    props: true
  },
  {
    path: resources.maps.rootPath,
    name: resources.maps.rootName,
    // Use webpackChunkName: "maps"
    component: () => import("../views/Maps/Maps.vue")
  },
  {
    path: resources.maps.rootPath + "/:id",
    name: resources.maps.idName,
    // Use webpackChunkName: "maps"
    component: () => import("../views/Maps/Maps.vue"),
    props: true
  },
  {
    path: resources.help.rootPath,
    name: resources.help.rootName,
    // Use webpackChunkName: "help"
    component: () => import("../views/Help/Help.vue")
  },
  {
    path: resources.about.rootPath,
    name: resources.about.rootName,
    // Use webpackChunkName: "about"
    component: () => import("../views/About/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (resources.beforeEach) {
    resources.beforeEach(to, from, next);
  }
});

export default router;

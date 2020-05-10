import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { links } from "./links.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: { links }
  },
  {
    path: "/designer",
    name: "Designer",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // Use webpackChunkName: "designer"
    component: () => import("../views/Designer.vue")
  },
  {
    path: "/designer/:id",
    name: "Game",
    // Use webpackChunkName: "designer"
    component: () => import("../views/Designer.vue"),
    props: true
  },
  {
    path: "/mapper",
    name: "Mapper",
    // Use webpackChunkName: "mapper"
    component: () => import("../views/Mapper.vue")
  },
  {
    path: "/mapper/:id",
    name: "Map",
    // Use webpackChunkName: "mapper"
    component: () => import("../views/Mapper.vue"),
    props: true
  },
  {
    path: "/about",
    name: "About",
    // Use webpackChunkName: "about"
    component: () => import("../views/About.vue")
  },
  {
    path: "/hello",
    name: "HelloWorld",
    // See above
    component: () =>
      import(/* webpackChunkName: "mapper" */ "../views/Hello.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

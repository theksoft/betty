import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { links } from "./links.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    props: { links }
  },
  {
    path: "/designer",
    component: () =>
      import(/* webpackChunkName: "designer" */ "../views/Designer.vue")
  },
  {
    path: "/mapper",
    component: () =>
      import(/* webpackChunkName: "mapper" */ "../views/Mapper.vue")
  },
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/hello",
    component: () =>
      import(/* webpackChunkName: "mapper" */ "../views/Hello.vue")
  }
].map(a => {
  return Object.assign(
    a,
    links.find(e => e.path === a.path)
  );
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

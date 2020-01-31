import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("views/home/Home");
const Gouwuche = () => import("views/gouwuche/Gouwuche");
const Goods = () => import("views/goods/Goods");
const Mine = () => import("views/mine/Mine");
const Details = () => import("views/details/Details");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/gouwuche",
    component: Gouwuche
  },
  {
    path: "/goods",
    component: Goods
  },
  {
    path: "/about",
    component: Mine
  },
  {
    path: "/details/:iid",
    component: Details
  }
];
const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;

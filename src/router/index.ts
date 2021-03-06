import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/article/:id",
    name: "article",
    component: () =>
      import(/* webpackChunkName: "article"*/ "../views/ArticleView.vue"),
  },
  {
    path: "/add-product",
    name: "add-product",
    component: () =>
      import(
        /* webpackChunkName: "add-product" */ "../views/AddProductView.vue"
      ),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () =>
      import(/* webpackChunkName:"edit" */ "../views/EditProductView.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName:"signin" */ "../views/SignInView.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () =>
      import(/* webpackChunkName:"products" */ "../views/ProductsView.vue"),
  },
  {
    path: "/send",
    name: "send",
    component: () =>
      import(/* webpackChunkName:"send" */ "../views/SendView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

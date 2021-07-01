import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

import restaurantsRoute from "./restaurants";

import Home from "../views/Home.vue";
import Login from "../views/Authentication/Login.vue";
import Signup from "../views/Authentication/Signup.vue";
import Profile from "../views/Authentication/Profile.vue";
import Monitoring from "../views/monitoring/Monitoring.vue";

import RestaurantPage from "../components/routes/RestaurantPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      roles: ["USR"],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/restaurant",
    name: "restaurant",
    redirect: "/",
    component: RestaurantPage,
    children: restaurantsRoute,
    meta: {
      requiresAuth: true,
      roles: ["USR", "RES"],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    redirect: "/",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/monitoring",
    name: "Monitoring",
    component: Monitoring,
    meta: {
      requiresAuth: true,
      roles: ["COM"],
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const defaultRoutes = [
  {
    role: "USR",
    path: "/",
  },
  {
    role: "RES",
    path: "/restaurant",
  },
  {
    role: "DEL",
    path: "/",
  },
  {
    role: "DEV",
    path: "/",
  },
  {
    role: "COM",
    path: "/monitoring",
  },
];

router.beforeEach(async (to: any, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.getters.isLoggedIn) {
      const userRole = store.getters.getInfos.role;
      if (to.meta.roles) {
        if (to.meta.roles.indexOf(userRole) != -1) {
          next();
        } else {
          next(defaultRoutes.find((route) => route.role == userRole)?.path);
        }
      } else {
        next();
      }
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;

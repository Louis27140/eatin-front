import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

import restaurantsRoute from './restaurants'

import Home from '../views/Home.vue'
import Login from '../views/Authentication/Login.vue'
import Signup from '../views/Authentication/Signup.vue'
import Profile from '../views/Authentication/Profile.vue'

import RestaurantPage from '../components/routes/RestaurantPage.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/restaurant',
    name: 'restaurant',
    redirect:'/',
    component: RestaurantPage,
    children: restaurantsRoute,
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    redirect: '/',
    meta: {
      requiresAuth:true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (await store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router

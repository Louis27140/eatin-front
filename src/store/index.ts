import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth';
import user from './modules/user';
import alert from './modules/alert';
import store from './modules/store';
import restaurant from './modules/restaurant';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, 
    user,
    alert, 
    store, 
    restaurant
  },
  plugins: [createPersistedState({paths: ['auth', 'user'], storage: window.sessionStorage})],
})

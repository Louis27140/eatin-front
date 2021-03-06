import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth';
import user from './modules/user';
import alert from './modules/alert';
import restaurant from './modules/restaurant';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, 
    user,
    alert, 
    restaurant
  },
  plugins: [createPersistedState({paths: ['auth', 'user'], storage: window.sessionStorage})],
})

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import helpers from '@/helpers'

import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(helpers)

const config = {
  apiKey: "AIzaSyCo2kAEcUAUYPcz8ltp5_IFU58aEtBh1II",
  authDomain: "cesi-push-notifications.firebaseapp.com",
  projectId: "cesi-push-notifications",
  storageBucket: "cesi-push-notifications.appspot.com",
  messagingSenderId: "906652977705",
  appId: "1:906652977705:web:7daa2976da891c44acaa38",
  measurementId: "G-N6BEC3WH49"

};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

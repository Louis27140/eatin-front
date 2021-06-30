import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import helpers from '@/helpers'
//import firebaseMessaging from './firebase'

Vue.config.productionTip = false

Vue.use(helpers)


//Vue.prototype.$messaging = firebaseMessaging

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import helpers from "@/helpers";
import vClickOutside from "v-click-outside";
import VueApexCharts from "vue-apexcharts";

Vue.config.productionTip = false

Vue.use(helpers);
Vue.use(vClickOutside);
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);



new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

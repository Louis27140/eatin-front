<template>
  <v-app>
    <navbar :isLoggedIn="isloggedIn" :initials="initials"></navbar>
    <v-main>
      <alert :error="msg"></alert>
      <router-view />
    </v-main>
    <foot :buttons="buttons"></foot>
    <cookie-law></cookie-law>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import Alert from "./components/layouts/Alert.vue";
import Footer from "./components/layouts/Footer.vue";
import NavBar from "./components/layouts/NavBar.vue";


import CookieLaw from "vue-cookie-law";

const buttons = [
  { name: "CGU", link: "cgu" },
  { name: "CGV", link: "cgv" },
  { name: "Mentions légales", link: "legals" },
  { name: "RGPD", link: "rgpd" },
];

export default Vue.extend({
  name: "App",

  data: () => ({
    buttons,
  }),
  components: {
    'navbar': NavBar,
    'foot': Footer,
    'alert': Alert,
  },
  computed: {
    isloggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    initials() {
      return this.$store.getters.getInitials;
    },
    msg() {
      return this.$store.getters.getMsg;
    },
    cart() {
      return this.$store.getters.getCart
    }
  }
});
</script>

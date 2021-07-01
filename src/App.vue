<template>
  <v-app>
    <navbar :isLoggedIn="isloggedIn" :initials="initials"></navbar>
    <v-main>
      <alert :error="msg"></alert>
      <router-view />
    </v-main>
    <cart :items="[]" :quantity="5"></cart>
    <foot :buttons="buttons"></foot>
    <cookie-law></cookie-law>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

import Alert from "./components/layouts/Alert.vue";
import Footer from "./components/layouts/Footer.vue";
import NavBar from "./components/layouts/NavBar.vue";

import firebase from "firebase";
import Cart from "./components/layouts/Cart.vue";

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
  created() {
    const messaging = firebase.messaging();

    const token = firebase
      .messaging()
      .getToken({
        vapidKey:
          "BNiHc6Sox1vukTgBDzEZpCR0e6GlNVFyN5w-lfcF9WnLZ0nEwQfyKZqhfPpRbt6lGsJlC-kd9nHlW59ZFutPkV0",
      })
      .catch((err) => console.log(err));
  },
  components: {
    navbar: NavBar,
    foot: Footer,
    alert: Alert,
    cart: Cart,
    CookieLaw,
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
  },
});
</script>
e>

<template>
  <v-app>
    <navbar></navbar>
    <v-main>
      <router-view/>
    </v-main>
    <foot :buttons="buttons"></foot>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from './components/layouts/Footer.vue';
import NavBar from './components/layouts/NavBar.vue';

const buttons = [
    {name: "CGU", link: "cgu"},
    {name: "CGV", link: "cgv"},
    {name: "Mentions légales", link: "legals"},
    {name: "RGPD", link: "rgpd"},
  ]

export default Vue.extend({
  name: 'App',

  data: () => ({
    buttons,
  }),
  components: {
    'navbar': NavBar,
    'foot': Footer
  }
});
</script>
e>

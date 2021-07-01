<template>
  <v-container width="75vw" absolute right class="py-5">
    <h1>Evènements en temps réel</h1>
    <v-spacer></v-spacer>
    <realtime-dashboard class="my-5" :token="this.token" :host="host" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import RealtimeDashboard from "ws-realtime-dashboard";

export default Vue.extend({
  components: { RealtimeDashboard },
  name: "Monitoring",

  data() {
    return {
      host: process.env.VUE_APP_WS_URL,
    };
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
});
</script>

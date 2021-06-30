<template>
    <v-container>
    <h1>Panier</h1>
    <v-list>
      <v-list-item>
        
      </v-list-item>
    </v-list>


    </v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'Home',
    computed: {
      restaurants() {
        return this.$store.getters.getRestaurants
      }
    }
  })
</script>

<style>

</style>
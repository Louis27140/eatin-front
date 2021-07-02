<template>
  <v-container class="d-flex">
      <v-container>
          <h2>Commandes disponibles à livrer</h2>
          <v-expansion-panels>
          <v-expansion-panel :key="delivery._id" v-for="delivery in available">
              <v-expansion-panel-header class="justify-space-between">
                  <v-container justify-space-between>
                    {{delivery.orderId}}
                    {{new Date(delivery.updated_at).toUTCString()}}
                    <v-chip :color="setChips(delivery.status)[1]" dense><v-icon>{{setChips(delivery.status)[0]}}</v-icon></v-chip>
                    <v-btn color="success" icon  @click="setStatus(delivery, 'MOV')"><v-icon>mdi-check</v-icon></v-btn>
                  </v-container>
                  
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                  <v-card>
                    <v-card-text>Personne à livrer: {{delivery.profileId}}</v-card-text>
                  </v-card>
              </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
      </v-container>
      <v-container>
          <h2>Mes livraisons en cours</h2>
          <v-expansion-panels>
          <v-expansion-panel :key="delivery._id" v-for="delivery in myDeliveries">
              <v-expansion-panel-header class="justify-space-between">
                  <v-container justify-space-between>
                    {{delivery.orderId}}
                    {{new Date(delivery.updated_at).toUTCString()}}
                    <v-chip :color="setChips(delivery.status)[1]" dense><v-icon>{{setChips(delivery.status)[0]}}</v-icon></v-chip>
                    <v-btn color="success" icon @click="setStatus(delivery, 'DEL')"><v-icon>mdi-check</v-icon></v-btn>
                  </v-container>
                  
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                  <v-card>
                    <v-card-text>Personne à livrer: {{delivery.profileId}}</v-card-text>
                  </v-card>
              </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
      </v-container>
      
  </v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name:"MyDeliveries",
    created() {
        this.$store.dispatch('setAvailableDeliveries')
        this.$store.dispatch('setMyDeliveries')
    },
    methods: {
        setStatus(delivery, status) {
            this.$store.dispatch('updateDelivery', {delivery:delivery, status:status})
        },
        setChips(status) {
            switch(status) {
                case 'PEN': return ['mdi-clock', 'warning']
                case 'MOV': return ['mdi-bike', 'primary']
                case 'DEL': return ['mdi-check', 'success']
            }
        },
    },
    computed: {
         getRestaurant(id) {
             if (this.$store.getters.getRestaurants !== undefined)
                return this.$store.getters.getRestaurants.find(e => e._id == id).name
            return 'pizza'
        },
        available() {
            return this.$store.getters.getAvailableDeliveries.filter(delivery => {
                return delivery.delivererId === undefined
            })
        },
        myDeliveries() {
            return this.$store.getters.getMyDeliveries
        }
    }
})
</script>

<style>

</style>
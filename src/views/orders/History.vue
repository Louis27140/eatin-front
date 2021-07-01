<template>
  <v-container>
      <h1>Historique des commandes</h1>
      <v-expansion-panels>
          <v-expansion-panel :key="order._id" v-for="order in orders.slice().reverse()">
              <v-expansion-panel-header class="justify-space-between">
                  <v-container justify-space-between>
                    {{getRestaurant(order.restaurantId)}}
                    {{new Date(order.updated_at).toUTCString()}}
                    <v-chip :color="setChips(order.status)[1]" dense><v-icon>{{setChips(order.status)[0]}}</v-icon></v-chip>
                    <v-btn color="success" icon @click="setStatus(order, 'PRE')" v-if="isRes && isPending(order.status)"><v-icon>mdi-check</v-icon></v-btn>
                    <v-btn color="success" icon @click="setStatus(order, 'DEL')" v-if="isRes && isPrepare(order.status)"><v-icon>mdi-check</v-icon></v-btn>
                    <v-btn color="success" icon @click="setStatus(order, 'AVA')" v-if="isDeliver && isPrepare(order.status)"><v-icon>mdi-check</v-icon></v-btn>
                  </v-container>
                  
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                  <v-card>
                    <v-card-text :key="item._id" v-for="item in order.content">{{item}}</v-card-text>
                  </v-card>
              </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
      
  </v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name:'History',
    data() {
        return {
            //
        }
    },
    created() {
        this.$store.dispatch('setOrders')
        this.$store.dispatch("setRestaurants");
        this.$store.dispatch('setArticles')
    },
    methods: {
        getRestaurant(id) {
            return this.$store.getters.getRestaurants.find(e => e._id == id).name
        },
        setStatus(order, status) {
            this.$store.dispatch('updateOrder', {order:order, status:status})
        },
        isPending(status) {
            return status == 'PEN'
        },
        isPrepare(status) {
            return status == 'PRE'
        },
        setChips(status) {
            switch(status) {
                case 'PEN': return ['mdi-clock', 'warning']
                case 'PRE': return ['mdi-chef-hat', 'primary']
                case 'DEL': return ['mdi-bike', 'yellow']
                case 'AVA': return ['pending', 'success']
            }
        },
        getItems(items, resid) {
            let tmp = []
            /*this.$store.dispatch('setRestaurantId', {id: resid}).then(() => {
                items.forEach(item => {
                tmp.push(this.$store.getters.getArticles.filter(e => e._id == item))
                })
            })*/
            return tmp
            
        }
    },
    computed:{
        orders() {
            return this.$store.getters.getOrders
        },
        isRes() {
            return this.$store.getters.getInfos.role == "RES"
        },
        
    }
})
</script>

<style>

</style>
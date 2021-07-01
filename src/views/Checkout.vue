<template>
    <v-container>
    <h1>Finaliser la commande</h1>
    <v-card>
    <v-card-title>Total : {{total}} €</v-card-title>
    <v-divider></v-divider>
    <v-virtual-scroll
    :items="cart"
    :item-height="50"
    height="400"
    width="300"
    >
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-content  >
              <v-card-text class="d-flex justify-space-between align-center"> <span><span class="font-weight-bold">{{item.name}}</span> - {{ item.price }} €</span> <v-btn @click="remove(item)" icon><v-icon>mdi-close</v-icon></v-btn></v-card-text>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>
        <v-card-actions>
          <v-btn class="success" @click="submit">
            Payer
          </v-btn>
        </v-card-actions>
    </v-card>


    </v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'Checkout',
    methods: {
      submit() {
          this.$store.dispatch('checkout').finally(() => {
          this.setAlert('success', 'Commande effectué')
          }).catch(err =>{ this.setAlert('error', 'Commande refusé') 
          console.log(err)})
      },
      setAlert(type, msg) {
        this.$store.dispatch('setAlert', {type:type,alert:msg})
      }
    },
    computed: {
      cart() {
        return this.$store.getters.getCart
      },
      total() {
        let tmp = 0
        this.$store.getters.getCart.forEach((item) => {
        tmp += item.price
        })
      return tmp.toPrecision(4)
      }
    }
  })
</script>

<style>

</style>
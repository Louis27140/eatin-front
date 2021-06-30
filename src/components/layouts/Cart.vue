<template>
  <v-menu
  v-model="menu"
  :close-on-content-click="false"
  offset-y
  origin="right top"
  transition="scale-transition"
  right
  v-if="isLoggedIn"
  >
  <template v-slot:activator="{ on, attrs }" >
        <v-badge
        bordered
        :content="quantity"
        overlap
        left
        bottom
      >
        <v-btn
          color="primary"
          fab
          dense
          v-bind="attrs"
          v-on="on"
          >
          <v-icon dark>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card>
    
    <v-card-title>Panier</v-card-title>
    <v-card-subtitle>Total : {{total}} €</v-card-subtitle>
    <v-divider></v-divider>
    <v-virtual-scroll
    :items="items"
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
          <v-btn to="/cart">
            Commander
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Emit, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters, mapState } from 'vuex';

@Component
export default class Cart extends Vue {
  @Prop() quantity!: number;
  @Prop() items!: Array<any>
  @Prop() isLoggedIn!: boolean

  data() {
    return {
      menu: false
    }
  }

  @Emit()
  remove(delItem:any) {
    this.$store.dispatch('removeToCart', {item:delItem})
  }

  get total() {
    let tmp = 0
    this.items.forEach((item:any) => {
      tmp += item.price
    })
    return tmp.toPrecision(4)
  }
}
</script>

<style scoped>

scrollbar {
      width: 20px; 
   }

scrollbar-track {
    background-color: black;
  }

scrollbar-thumb {
    background: #4e4e4e;
    border-radius: 25px;
  }

</style>
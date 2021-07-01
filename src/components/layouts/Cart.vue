<template>
  <v-menu
  v-model="menu"
  :close-on-content-click="false"
  offset-x
  origin="right top"
  transition="scale-transition"
  absolute right
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
          dark
          fab
          v-bind="attrs"
          v-on="on">
          <v-icon dark>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <v-card>
    
    <v-card-title>Panier</v-card-title>
    <v-card-subtitle>Total :</v-card-subtitle>
    <v-divider></v-divider>
    <v-virtual-scroll
    :items="items"
    :item-height="50"
    height="150"
    width="250"
    >
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-content>
              {{item.name}} {{item.quantity}} {{item.quantity * item.price }} €
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-virtual-scroll>
        <v-card-actions>
          <v-btn>
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
  data() {
    return {
      menu: false
    }
  }
}
</script>

<style>
</style>
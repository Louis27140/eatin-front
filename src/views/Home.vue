<template>
  <v-container width="75vw" absolute right>
    <v-text-field elevation="24" prepend-icon="mdi-search"></v-text-field>
    <v-spacer />
    <h2>Restaurant</h2>
    <v-spacer></v-spacer>
    <v-row>
      <v-col xs="12" md="4" :key="item.id" v-for="item in restaurants">
        <restaurant
          v-bind="item"
          :id="item._id"
          :src="item.profilePicture"
          :name="item.name"
          :desc="item.description"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Restaurant from "../components/Restaurant.vue";

export default Vue.extend({
  name: "Home",

  created() {
    console.log(this.$store.getters.getInfos.role);
    this.$store.dispatch("setRestaurants");
  },
  components: {
    Restaurant,
  },
  computed: {
    restaurants() {
      return this.$store.getters.getRestaurants;
    },
  },
});
</script>

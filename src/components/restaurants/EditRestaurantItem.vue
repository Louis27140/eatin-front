<template>
  <v-card class="ma-2">
    <v-card-title class="d-flex justify-space-between">
      <span class="mr-2">{{ item.name }}</span>
      <v-dialog v-model="dialog" width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="black" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-pen</v-icon>
          </v-btn>
        </template>
        <article-popup @close="close" :article="item" action="update" />
      </v-dialog>
    </v-card-title>
    <v-card-text>{{ item.description }}</v-card-text>
  </v-card>
</template>

<script>
import ArticlePopup from "@/components/restaurants/ArticlePopup.vue";

export default {
  components: { ArticlePopup },
  name: "EditRestaurantItem",
  props: ["item"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
  },
};
</script>

<style></style>

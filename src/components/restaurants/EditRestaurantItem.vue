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
        <article-popup
          v-if="type == 'article'"
          @close="close"
          :article="item"
          action="update"
        />
        <menu-popup
          v-if="type == 'menu'"
          @close="close"
          :menu="item"
          action="update"
        />
      </v-dialog>
    </v-card-title>
    <v-card-text>{{ item.description }}</v-card-text>
  </v-card>
</template>

<script>
import ArticlePopup from "@/components/restaurants/ArticlePopup.vue";
import MenuPopup from "@/components/restaurants/MenuPopup.vue";

export default {
  components: { ArticlePopup, MenuPopup },
  name: "EditRestaurantItem",
  props: ["item", "type"],
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

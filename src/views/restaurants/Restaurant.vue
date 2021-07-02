<template>
  <v-container fluid>
    <v-card>
      <v-img
        :src="img(restaurant.profilePicture)"
        height="250"
        class="align-end"
      >
        <v-btn rounded absolute top left @click="$router.go(-1)"
          ><v-icon>mdi-arrow-left</v-icon>Page précedente</v-btn
        >
        <v-container>
          <v-card-title class="white--text text-h2 justify-start ">{{
            restaurant.name
          }}</v-card-title>
          <v-card-subtitle class="white--text text-h6 justify-start ">{{
            restaurant.description
          }}</v-card-subtitle>
        </v-container>
        </v-img>
        <v-tabs v-model="tab">
            <v-tab>Menu</v-tab>
            <v-tab :key="category._id" v-for="category in categoriesTabs">
                {{category.name}}
            </v-tab>

        </v-tabs>
    </v-card>
    <v-tabs-items v-model="tab">
        <v-tab-item tabindex="0">
            <v-container>
                <v-col >
                    <v-row xs="12"  md="4">
                        <menue class="ma-5" :key="menu._id" v-for="menu in menues" :src="menu.profilePicture" :name="menu.name" :desc="menu.description" :price="menu.price"></menue>
                    </v-row>
                </v-col>
            </v-container>
        </v-tab-item>
        <v-tab-item :key="filter" v-for="filter in filteredArticles">
            <v-col >
                <v-row xs="12"  class="pa-4">
                    <my-article class="ma-5" :key="article._id" v-for="article in filter"  :desc="article.description" :id="article._id" :name="article.name" :src="article.profilePicture"></my-article>
                </v-row>
            </v-col>
        </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Vue from "vue";

import Article from "@/components/restaurants/Article.vue";
import Menu from "@/components/restaurants/Menu.vue";

export default Vue.extend({
  name: "Restaurant",
  components: {
    menue: Menu,
    "my-article": Article,
  },
  data() {
    return {
        tab:0,
        categories: [],
        articles: [],
    }
},
created() {
    this.$store.dispatch('setRestaurant', {id:this.$store.getters.getRestID})

    this.$store.dispatch('setMenues')
    this.$store.dispatch('setArticles')
    this.$store.dispatch('setCategories')
},
methods: {
    img(src) {
        try {
            return require('@/assets/restaurants/' + src + '.jpg')
        } catch (error) {
            return 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        }
    }
},
computed: {
    restaurant() { return this.$store.getters.getRestaurant },
    menues() { return this.$store.getters.getMenues },
    categoriesTabs() {return this.$store.getters.getCategories},
    filteredArticles() {
        let filtered = []
        this.$store.getters.getCategories.forEach(category => {
            let tmp = this.$store.getters.getArticles.filter(article => article.category == category._id)
            filtered.push(tmp)
        });
        return filtered
    }
}
})
</script>

<style></style>

import axios from "./API";

import store from "@/store/index";

export default {
    async getRestaurants() {
        return await axios.get('restaurant')
    },
    async getMenues() {
        return await axios.get('restaurant/' + store.getters.getRestID + '/menu')
    },
    async getarticles() {
        return await axios.get('restaurant/' + store.getters.getRestID + '/article')
    },
    async getCategories() {
        return await axios.get('restaurant/' + store.getters.getRestID + '/category')
    },
  async getSelfRestaurant() {
    return await axios.get("restaurant?profileId=" + store.getters.getUser._id);
  },
  async updateRestaurant(restaurant) {
    return await axios.put("restaurant/" + store.getters.getID, restaurant);
  },
  async updateArticle(article) {
    return await axios.put(
      "restaurant/" + store.getters.getID + "/article/" + article["_id"],
      article
    );
  },
  async createArticle(article) {
    return await axios.post(
      "restaurant/" + store.getters.getID + "/article",
      article
    );
  },
  async updateMenu(menu) {
    return await axios.put(
      "restaurant/" + store.getters.getID + "/menu/" + menu["_id"],
      menu
    );
  },
  async createMenu(menu) {
    return await axios.post(
      "restaurant/" + store.getters.getID + "/menu",
      menu
    );
  },
  async createCategory(category) {
    return await axios.post(
      "restaurant/" + store.getters.getID + "/category",
      category
    );
  },
};

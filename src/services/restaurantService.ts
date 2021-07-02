import axios from "./API";

import store from "@/store/index";

export default {
  async getRestaurants() {
    return await axios.get("restaurant");
  },
  async getRestaurant(id) {
    return await axios.get("restaurant/" + id);
  },
  async getMenues() {
    return await axios.get("restaurant/" + store.getters.getRestID + "/menu");
  },
  async getArticles() {
    return await axios.get(
      "restaurant/" + store.getters.getRestID + "/article"
    );
  },
  async getCategories() {
    return await axios.get(
      "restaurant/" + store.getters.getRestID + "/category"
    );
  },
  async getSelfRestaurant() {
    return await axios.get("restaurant?profileId=" + store.getters.getUser._id);
  },
  async updateRestaurant(restaurant) {
    return await axios.put("restaurant/" + store.getters.getRestID, restaurant);
  },
  async updateArticle(article) {
    return await axios.put(
      "restaurant/" + store.getters.getRestID + "/article/" + article["_id"],
      article
    );
  },
  async createArticle(article) {
    return await axios.post(
      "restaurant/" + store.getters.getRestID + "/article",
      article
    );
  },
  async updateMenu(menu) {
    return await axios.put(
      "restaurant/" + store.getters.getRestID + "/menu/" + menu["_id"],
      menu
    );
  },
  async createMenu(menu) {
    return await axios.post(
      "restaurant/" + store.getters.getRestID + "/menu",
      menu
    );
  },
  async createCategory(category) {
    return await axios.post(
      "restaurant/" + store.getters.getRestID + "/category",
      category
    );
  },
  async getStatistics() {
    return await axios.get("statistic/" + store.getters.getRestID);
  },
};

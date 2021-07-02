import restaurantService from "@/services/restaurantService";
import { Module } from "vuex";

const getDefaultState = () => {
  return {
    restaurants: [],
    currentRestaurant: {},
    menues: [],
    articles: [],
    categories: [],
    statistics: [],
  };
};

const restaurantModule: Module<any, any> = {
  state: getDefaultState(),
  getters: {
    getRestaurants: (state) => {
      return state.restaurants;
    },
    getRestaurant: (state) => {
      return state.currentRestaurant;
    },
    getMenues: (state) => {
      return state.menues;
    },
    getArticles: (state) => {
      return state.articles;
    },
    getCategories: (state) => {
      return state.categories;
    },
    getID: (state) => {
      return state.currentRestaurant._id;
    },
    getStatistics: (state) => {
      return state.statistics;
    },
  },
  mutations: {
    SET_RESTAURANTS: (state, restaurants) => {
      state.restaurants = restaurants;
    },
    SET_MENUES: (state, menues) => {
      state.menues = menues;
    },
    SET_ARTICLES: (state, articles) => {
      state.articles = articles;
    },
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories;
    },
    SET_RESTAURANT: (state, restaurant) => {
      state.currentRestaurant = restaurant;
    },
    RESET_RESTAURANT: (state) => {
      state.currentRestaurant = {};
      state.articles = [];
      state.categories = [];
      state.menues = [];
    },
    SET_STATISTICS: (state, statistics) => {
      state.statistics = statistics;
    },
  },
  actions: {
    setRestaurants: async ({ commit }) => {
      const res = await restaurantService.getRestaurants();
      commit("SET_RESTAURANTS", res.data);
    },
    setRestaurant: async ({ commit }, { id }) => {
      const res = await restaurantService.getRestaurant(id);
      commit("SET_RESTAURANT", res.data);
    },
    setSelfRestaurant: async ({ commit }) => {
      const res = await restaurantService.getSelfRestaurant();
      commit("SET_RESTAURANT", res.data);
      commit("SET_REST_ID", res.data._id);
    },
    setMenues: async ({ commit }) => {
      const res = await restaurantService.getMenues();
      commit("SET_MENUES", res.data);
    },
    setArticles: async ({ commit }) => {
      const res = await restaurantService.getArticles();
      commit("SET_ARTICLES", res.data);
    },
    setCategories: async ({ commit }) => {
      const res = await restaurantService.getCategories();
      commit("SET_CATEGORIES", res.data);
    },
    updateRestaurant: async ({ commit }, { restaurant }) => {
      await restaurantService.updateRestaurant(restaurant);
    },
    createArticle: async ({ dispatch }, { article }) => {
      await restaurantService.createArticle(article);
      await dispatch("setArticles");
    },
    updateArticle: async ({ dispatch }, { article }) => {
      await restaurantService.updateArticle(article);
      await dispatch("setArticles");
    },
    createMenu: async ({ dispatch }, { menu }) => {
      await restaurantService.createMenu(menu);
      await dispatch("setMenues");
    },
    updateMenu: async ({ dispatch }, { menu }) => {
      await restaurantService.updateMenu(menu);
      await dispatch("setMenues");
    },
    createCategory: async ({ dispatch }, { category }) => {
      await restaurantService.createCategory(category);
      await dispatch("setCategories");
    },
    setStatistics: async ({ commit }) => {
      const res = await restaurantService.getStatistics();
      commit("SET_STATISTICS", res.data);
    },
  },
};

export default restaurantModule;

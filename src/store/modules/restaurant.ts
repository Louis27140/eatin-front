import restaurantService from "@/services/restaurantService";
import { Module } from "vuex";
 
const getDefaultState = () => {
  return {
      restaurants: [],
      currentRestaurant: {},
      menues: [],
      articles: [],
      categories:[],
    }
}

const restaurantModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getRestaurants: state => {
        return state.restaurants
    },
    getRestaurant: state => {
        return state.currentRestaurant
    },
    getMenues: state => {
      return state.menues
    },
    getArticles: state => {
    return state.articles
    },
    getCategories: state => {
      return state.categories
    },
    getID: state => {
      return state.currentRestaurant._id
    }
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
      state.categories = categories
    },
    SET_RESTAURANT: (state, id) => {
        state.currentRestaurant = state.restaurants.filter((e:any) => (e._id === id))[0];
      },
      RESET_RESTAURANT: (state) => {
        state.currentRestaurant = {}
        state.articles = []
        state.categories = []
        state.menues = []
      }
  },
  actions: {
    setRestaurants: async ({commit}) => {
        const res = await restaurantService.getRestaurants();
      commit('SET_RESTAURANTS', res.data)
    },
    setRestaurant: ({commit}, {id}) => {
      commit('SET_RESTAURANT', id)
    },
    setMenues: async ({commit}) => {
      const res = await restaurantService.getMenues();
      commit('SET_MENUES', res.data)
    },
    setArticles: async ({commit}) => {
      const res = await restaurantService.getarticles();
      commit('SET_ARTICLES', res.data)
    },
    setCategories: async ({commit}) => {
      const res = await restaurantService.getCategories();
      commit('SET_CATEGORIES', res.data)
    },
  }
}

export default restaurantModule;
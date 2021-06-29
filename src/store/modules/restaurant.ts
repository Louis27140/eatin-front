import restaurantService from "@/services/restaurantService";
import { Module } from "vuex";
 
const getDefaultState = () => {
  return {
      restaurants: [],
      currentRestaurant: {},
      menues: [],
      articles: []
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
  },
  mutations: {
    SET_RESTAURANTS: (state, restaurants) => {
      state.restaurants = restaurants;
    },
    SET_MENUES: (state, menues) => {
      state.menues = menues;
    },
    SET_ARTICLES: (state, articles) => {
      state.restaurants = articles;
    },
    SET_RESTAURANT: (state, id) => {
        state.currentRestaurant = state.restaurants.filter((e:any) => (e._id === id))[0];
      },
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
    }
  }
}

export default restaurantModule;
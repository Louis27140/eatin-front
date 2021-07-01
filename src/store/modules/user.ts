import { Module } from "vuex";
import AuthService from '@/services/AuthService'
import orderService from "@/services/orderService";
import userService from "@/services/userService";
 
const getDefaultState = () => {
  return {
    user: {},
    cart: [],
  }
}

const userModule: Module<any, any> = {
  state: getDefaultState(),
  getters: {
    getInitials: (state) => {
      const fullname = state.user.fullName;
      if (fullname != undefined)
        return fullname.firstName[0] + fullname.lastName[0];
      return "";
    },
    getUser: (state) => {
      return state.user;
    },
    getCart: (state) => {
      return state.cart;
    },
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    ADD_TO_CART: (state, item) => {
      state.cart.push(item);
    },
    REMOVE_FROM_CART: (state, item) => {
      const index = state.cart.indexOf(item)
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },
    CLEAR_CART: (state) => {
      state.cart = []
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    profile: async ({ commit, dispatch }) => {
      const response = await AuthService.profile();
      commit("SET_USER", response.data);
    },
    logout: ({ commit, dispatch }) => {
      commit("RESET", "");
    },
    addToCart: ({ commit }, { item }) => {
      commit("ADD_TO_CART", item);
    },
    removeToCart: ({commit}, {item}) => {
      commit('REMOVE_FROM_CART', item)
    },
    async checkout({commit, state}) {
      const itemId = state.cart.map((e:any) => {return e._id})
      const restId = state.cart[0].restaurantId
      const data = {
        restaurantId:restId,
        content:itemId
      }
      await orderService.checkout(data)
      commit('CLEAR_CART')
    },
    updateProfile: async ({ commit }, { profile }) => {
      await userService.updateProfile(profile);
    },
  },
};

export default userModule;

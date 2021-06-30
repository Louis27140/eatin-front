import { Module } from "vuex";
import AuthService from '@/services/AuthService'
 
const getDefaultState = () => {
  return {
    user: {},
    cart: []
  }
}

const userModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getInitials: state => {
      const fullname = state.user.fullName
      if (fullname != undefined) return fullname.firstName[0]+fullname.lastName[0]
      return ''
    },
    getUser: state => {
      return state.user
    },
    getCart: state => {
        return state.cart
    },
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    ADD_TO_CART: (state, item) => {
      state.cart.push(item)
    },
    REMOVE_FROM_CART: (state, item) => {
      const index = state.cart.indexOf(item)
      if (index > -1) {
        state.cart.splice(index, 1);
      }
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    profile: async ({ commit, dispatch }) => {
        const response = await AuthService.profile()
        commit('SET_USER', response.data);
    },
    logout: ({ commit, dispatch }) => {
      commit('RESET', '');
    },
    addToCart: ({commit}, {item}) => {
      commit('ADD_TO_CART', item)
    },
    removeToCart: ({commit}, {item}) => {
      commit('REMOVE_FROM_CART', item)
    }
  }
}

export default userModule;
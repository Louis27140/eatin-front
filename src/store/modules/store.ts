import { Module } from "vuex";
import AuthService from '@/services/AuthService'
 
const getDefaultState = () => {
  return {
    items: []
  }
}

const storeModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getItems: state => {
      return state.items
    }
  },
  mutations: {
    SET_ITEMS: (state, items) => {
      state.items = items;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    setItems: async ({ commit, dispatch }, {items}) => {
        commit('SET_ITEMS', items);
    },
  }
}

export default storeModule;
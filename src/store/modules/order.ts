import orderService from "@/services/orderService";
import { Module } from "vuex";
 
const getDefaultState = () => {
  return {
    orders:[]
  }
}

const alertModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getOrders: state => {
      return state.orders
    },
  },
  mutations: {
    SET_ORDERS: (state, orders) => {
      state.orders = orders;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    setOrders: async ({ commit, dispatch }) => {
        const res = await orderService.history()
        commit('SET_ORDERS', res.data);
    },
    updateOrder: async ({ commit, dispatch }, {order, status}) => {
      order.status = status
      await orderService.updateOrder(order._id,status)
    },
    reset: async ({ commit, dispatch }) => {
      commit('RESET');
    },
  }
}

export default alertModule;
import deliveryService from "@/services/deliveryService";
import { Module } from "vuex";
import store from "..";
 
const getDefaultState = () => {
  return {
    availableDeliveries: [],
    myDeliveries: []
  }
}

const alertModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getAvailableDeliveries: state => {
      return state.availableDeliveries
    },
    getMyDeliveries: state => {
        return state.myDeliveries
    },
  },
  mutations: {
    SET_AVAILABLE_DELIVERIES: (state, deliveries) => {
      state.availableDeliveries = deliveries;
    },
    SET_MY_DELIVERIES: (state, deliveries) => {
      state.myDeliveries = deliveries;
    },
    ADD_TO_MY_DELIVERIES: (state, delivery) => {
        state.myDeliveries.push(delivery)
    },
    REMOVE_FROM_AVAILABLE: (state, delivery) => {
        const index = state.myDeliveries.indexOf(delivery)
        if (index > -1) {
          state.myDeliveries.splice(index, 1);
        }
    },
    UPDATE_ITEM_IN_MY_DELIVERIES: (state, delivery) => {
        const index = state.myDeliveries.indexOf(delivery)
        state.myDeliveries[index] = delivery
    },
    RESET_DELEVERIES: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    setAvailableDeliveries: async ({ commit, dispatch }) => {
        const res = await deliveryService.getAvailableDeliveries()
        commit('SET_AVAILABLE_DELIVERIES', res.data);
    },
    setMyDeliveries: async ({ commit, dispatch }) => {
        const res = await deliveryService.getMyDeliveries()
        commit('SET_MY_DELIVERIES', res.data);
    },
    updateDelivery: async ({ commit, dispatch }, {delivery, status}) => {
        delivery.status = status
        delivery.delivererId = store.getters.getID
        await deliveryService.updateDelivery(delivery._id,delivery.delivererId,status).then(() => {
            if (status == 'MOV') {
                commit('ADD_TO_MY_DELIVERIES', delivery)
                commit('REMOVE_FROM_AVAILABLE', delivery)
            } else if(status == 'DEL') {
                commit('UPDATE_ITEM_IN_MY_DELIVERIES', delivery)
            }

        })
      },
    resetDelieveries: async ({ commit, dispatch }) => {
      commit('RESET_DELEVERIES');
  },
  }
}

export default alertModule;
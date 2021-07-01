import { Module } from "vuex";
 
const getDefaultState = () => {
  return {
    message: ''
  }
}

const alertModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getMsg: state => {
        return state.message
    },
  },
  mutations: {
    SET_ALERT: (state, message) => {
      state.message = message;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    setAlert: async ({ commit, dispatch }, {alert}) => {
        commit('SET_ALERT', alert);
    },
    reset: async ({ commit, dispatch }) => {
      commit('RESET');
  },
  }
}

export default alertModule;
import { Module } from "vuex";
 
const getDefaultState = () => {
  return {
    type: '',
    message: ''
  }
}

const alertModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    getType: state => {
      return state.type
    },
    getMsg: state => {
        return state.message
    },
  },
  mutations: {
    SET_ALERT: (state, message) => {
      state.message = message;
    },
    SET_TYPE: (state, type) => {
      state.type = type;
    },
    RESET_ALERT: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    setAlert: async ({ commit, dispatch }, {type , alert}) => {
        commit('SET_ALERT', alert);
        commit('SET_TYPE', type);
    },
    resetAlert: async ({ commit, dispatch }) => {
      commit('RESET_ALERT');
  },
  }
}

export default alertModule;
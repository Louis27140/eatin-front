import { Module } from "vuex";
import AuthService from '@/services/AuthService'
 
const getDefaultState = () => {
  return {
    user: {}

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
    getFullName: state => {
        return state.fullName.firstName
    },
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
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
    }
  }
}

export default userModule;
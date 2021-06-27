import { Module } from "vuex";
import AuthService from '@/services/AuthService'
import jwt from 'jsonwebtoken'
 
const getDefaultState = () => {
  return {
    jwtToken: '',
    refreshToken: '',
    infos: {}
  }
}

const userModule: Module<any, any> = {
  state:getDefaultState(),
  getters:{
    isLoggedIn: state => {
      return state.jwtToken != '';
    },
    getToken: state => {
      return state.jwtToken;
    },
    getRefreshToken: state => {
        return state.refreshToken;
      },
    getInfos: state => {
        return state.infos;
    }
  },
  mutations: {
    SET_TOKENS_INFOS: (state, data) => {
        state.jwtToken = data.jwtToken
        state.refreshToken = data.refreshToken
        state.infos = data.infos
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    login: async ({ commit, dispatch }, { credentials }) => {
        const response = await AuthService.login(credentials)
        const token = response.data.jwtToken
        const data = {
            jwtToken: token,
            refreshToken: response.data.refreshToken,
            infos: jwt.decode(token)
        }
        commit('SET_TOKENS_INFOS', data);
    },
    refresh: ({ commit, dispatch }, {response}) => {
        const token = response.data.jwtToken
        const data = {
            jwtToken: token,
            refreshToken: response.data.refreshToken,
            infos: jwt.decode(token)
        }
        commit('SET_TOKENS_INFOS', data);
    },
    signup: async ({ commit, dispatch }, {infos}) => {
      const response = await AuthService.register(infos)
      const token = response.data.jwtToken
      const data = {
          jwtToken: token,
          refreshToken: response.data.refreshToken,
          infos: jwt.decode(token)
      }
      commit('SET_TOKENS_INFOS', data);
    },
    logout: ({ commit, dispatch }) => {
      commit('RESET', '');
    }
  }
}

export default userModule;
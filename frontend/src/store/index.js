import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userID: "",
    userOU: [],
    userName: "",
    userDeparment: "",
  },
  mutations: {
    setIsLogin(state, val) {
      state.isLogin = val
    },
    setUserID(state, val) {
      state.userID = val
    },
    setUserOU(state, val) {
      state.userOU = val
    },
    setUserName(state, val) {
      state.userName = val
    },
    setUserDeparment(state, val) {
      state.userDeparment = val
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({ storage: window.sessionStorage }, { key: 'portalsite' },)]
})

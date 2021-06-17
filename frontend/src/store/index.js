import Vue from 'vue'
import Vuex from 'vuex'

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
  }
})

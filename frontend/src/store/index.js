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
    userEmployeeNumber:"",
    userLastName:"",
    userFirstName:"",
    userDeparment: [],// departmentcode: 部署コード, department_name: 部署名
    userAuthorityCode: [],// authority_code: 権限コード
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
    setUserEmployeeNumber(state, val) {
      state.userEmployeeNumber = val
    },
    setUserLastName(state, val) {
      state.userLastName = val
    },
    setUserFirstName(state, val) {
      state.userFirstName = val
    },
    setUserDeparment(state, val) {
      state.userDeparment = val
    },
    setUserAuthorityCode(state, val) {
      state.userAuthorityCode = val
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({ storage: window.sessionStorage }, { key: 'portalsite' },)]
})

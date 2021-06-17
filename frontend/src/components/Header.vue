<template>
  <div class="header">
    <button @click="logout">ログアウト</button>
  </div>
</template>
<script>
import store from "../store/index.js";
export default {
  store,
  data() {
    return {};
  },
  methods: {
    logout() {
      this.userID = "";
      this.userOU = [];
      this.userName = "";
      this.userDepartment = "";
      this.isLogin = false;
      this.$router.push('Login');
    },
  },
  computed: {
    isLogin: {
      get() {
        return store.state.isLogin;
      },
      set(val) {
        store.commit("setIsLogin", val);
      },
    },
    userID: {
      get() {
        return store.state.userID;
      },
      set(val) {
        store.commit("setUserID", val);
      },
    },
    userOU: {
      get() {
        return store.state.userOU;
      },
      set(val) {
        store.commit("setUserOU", val);
      },
    },
    userName: {
      get() {
        return store.state.userName;
      },
      set(val) {
        store.commit("setUserName", val);
      },
    },
    userDepartment: {
      get() {
        return store.state.userDepartment;
      },
      set(val) {
        store.commit("setUserDepartment", val);
      },
    },
  },
};
</script>

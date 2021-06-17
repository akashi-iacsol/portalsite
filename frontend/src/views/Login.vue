<template>
  <div class="login">
    <div class="login-header login-div">
      <img alt="iacsol logo" src="../assets/logo.png" class="login-logo" />
    </div>
    <div class="container">
      <div class="login-box">
        <div class="login-div">
          <h3 colspan="2">ログイン</h3>
        </div>

        <div class="login-div">
          <a class="login-error" v-if="isError">ログインできませんでした。</a>
          <br v-if="!isError" />
        </div>

        <table class="login-form">
          <tr class="login-tr">
            <td>ユーザ名:</td>
            <td>
              <input v-model="userID" @keyup.enter="login" />
            </td>
          </tr>
          <tr class="login-tr">
            <td>パスワード:</td>
            <td>
              <input v-model="password" type="password" @keyup.enter="login" />
            </td>
          </tr>
        </table>

        <br />
        <div class="login-div">
          <button @click="login">ログイン</button>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/index.js";

export default {
  name: "Login",
  store,
  data() {
    return {
      params: "",
      password: "",
      isError: false,
    };
  },
  methods: {
    login: async function () {
      const path = "http://localhost:8080/api/auth";
      this.params = new URLSearchParams();
      this.params.append("samAccountName", this.userID);
      this.params.append("password", this.password);
      await axios
        .post(path, this.params)
        .then((res) => {
          if (res.data[0][0] !== "error") {
            this.isLogin = true;
            this.isError = false;

            let attributeArray = [];

            attributeArray = res.data.find((item) => item[0] === "DisplayName");
            this.userName = attributeArray[1];

            attributeArray = res.data.find((item) => item[0] === "OU");
            this.userOU = attributeArray.slice(1, attributeArray.length);
            // this.getDB();
            this.$router.push("/portal");
          } else {
            this.userName = "";
            this.userOU = [];
            this.isError = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
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

<style>
.login-div {
  text-align: center;
}
.login-form {
  margin-left: auto;
  margin-right: auto;
}
.login-tr {
  height: 3em;
}
.login-header {
  text-align: left;
}
.login-logo {
  width: 50px;
  height: 50px;
}
.login-box {
  display: inline-block;
  background-color: ghostwhite;
  padding: 0 3em;
  border: solid 3px steelblue;
  border-radius: 10px;
}
.login-error {
  color: red;
}
</style>
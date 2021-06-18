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
      paramsAD: "",
      paramsDB: "",
      password: "",
      isError: false,
    };
  },
  methods: {
    login: async function () {
      this.getAD();
      if (!this.isError) {
        this.getDB();
        this.$router.push("/portal");
      }
    },
    getAD: async function () {
      const pathAD = "http://localhost:8080/api/auth";
      this.paramsAD = new URLSearchParams();
      this.paramsAD.append("samAccountName", this.userID);
      this.paramsAD.append("password", this.password);
      await axios
        .post(pathAD, this.paramsAD)
        .then((res) => {
          if (res.data[0][0] !== "error") {
            this.isLogin = true;
            this.isError = false;

            let attributeArray = [];

            attributeArray = res.data.find((item) => item[0] === "DisplayName");
            this.userName = attributeArray[1];

            attributeArray = res.data.find((item) => item[0] === "OU");
            this.userOU = attributeArray.slice(1, attributeArray.length);
          } else {
            this.isLogin = false;
            this.isError = true;
            this.userName = "";
            this.userOU = [];
          }
        })
        .catch((error) => {
          this.isLogin = false;
          this.isError = true;
          console.log(error);
        });
    },
    getDB: async function () {
      const pathDB = "http://localhost:3000/login-user";
      this.paramsDB = new URLSearchParams();
      this.paramsDB.append("employee_id", this.userID);
      await axios
        .post(pathDB, this.paramsDB)
        .then((res) => {
          this.userEmployeeNumber = res.data.login_user.employee_number;
          this.userLastName = res.data.login_user.employee_last_name;
          this.userFirstName = res.data.login_user.employee_first_name;
          this.userDepartment = res.data.login_user.department;
          this.userAuthorityCode = res.data.login_user.authority_code;
          alert(
            res.data.login_user.employee_number +
              res.data.login_user.employee_last_name +
              res.data.login_user.employee_first_name +
              res.data.login_user.department[0].department_name +
              res.data.login_user.authority_code[0].authority_code
          );
        })
        .catch((error) => {
          alert(error);
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
    userEmployeeNumber: {
      get() {
        return store.state.userEmployeeNumber;
      },
      set(val) {
        store.commit("setUserEmployeeNumber", val);
      },
    },
    userLastName: {
      get() {
        return store.state.userLastName;
      },
      set(val) {
        store.commit("setUserLastName", val);
      },
    },
    userFirstName: {
      get() {
        return store.state.userFirstName;
      },
      set(val) {
        store.commit("setUserFirstName", val);
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
    userAuthorityCode: {
      get() {
        return store.state.userAuthorityCode;
      },
      set(val) {
        store.commit("setUserAuthorityCode", val);
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
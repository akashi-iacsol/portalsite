<template>
  <div class="login">
    <div class="login-container">
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
              <input v-model="userID" type="text" name="user-id" @keyup.enter="login" />
            </td>
          </tr>
          <tr class="login-tr">
            <td>パスワード:</td>
            <td>
              <input v-model="form.password" type="password" name="password" @keyup.enter="login" />
            </td>
          </tr>
        </table>

        <br />
        <div class="login-div">
          <button type="button" name="login-button" @click="login">ログイン</button>
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
      form: {
        password: "",
      },
      ad: {
        params: "",
      },
      db: {
        params: "",
      },
      isError: false,
    };
  },
  methods: {
    login: async function() {
      await this.getAD();
      if (!this.isError) {
        await this.getDB();
        await this.$router.push("/portal");
      }
    },
    getAD: async function () {
      const pathAD = "http://localhost:3000/ad-auth";
      this.ad.params = new URLSearchParams();
      this.ad.params.append("samAccountName", this.userID);
      this.ad.params.append("password", this.form.password);
      try {
        const res = await axios.post(pathAD, this.ad.params);

        if (!res.data.user["error"]) {
          this.isLogin = true;
          this.isError = false;
          this.userName = res.data.user.displayName;
          this.userOU = [];
          res.data.user.distinguishedName.split(",").forEach((item) => {
            if (item.match(/^OU=/g)) {
              this.userOU.push(item.slice(3));
            }
          });
        } else {
          this.isLogin = false;
          this.isError = true;
          this.userName = "";
          this.userOU = [];
        }
      } catch (error) {
        this.isLogin = false;
        this.isError = true;
        console.log(error);
      }
    },
    getDB: async function () {
      const pathDB = "http://localhost:3000/login-user";
      this.db.params = new URLSearchParams();
      this.db.params.append("employee_id", this.userID);
      try {
        const res = await axios.post(pathDB, this.db.params);
        this.userEmployeeNumber = res.data.login_user.employee_number;
        this.userLastName = res.data.login_user.employee_last_name;
        this.userFirstName = res.data.login_user.employee_first_name;
        this.userDepartment = res.data.login_user.department;
        this.userAuthorityCode = res.data.login_user.authority_code;
      } catch (error) {
        console.log(error);
      }
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
.login {
  height: 100vh;
}
.login-div {
  text-align: center;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  margin-left: auto;
  margin-right: auto;
}
.login-tr {
  height: 3em;
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

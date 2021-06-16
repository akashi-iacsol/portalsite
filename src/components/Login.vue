<template>
  <div>
    <div class="header">
      <img alt="iacsol logo" src="../assets/logo.png" class="logo" />
    </div>
    <div>
      <h3 colspan="2">ログイン</h3>
    </div>

    <div class="login-error">
      <a v-if="isError">ログインできませんでした。</a>
      <br v-if="!isError" />
    </div>

    <table class="form">
      <tr>
        <td>ユーザ名:</td>
        <td>
          <input v-model="samAccountName" @keyup.enter="login" />
        </td>
      </tr>
      <tr>
        <td>パスワード:</td>
        <td>
          <input v-model="password" type="password" @keyup.enter="login" />
        </td>
      </tr>
    </table>

    <br />
    <div>
      <button @click="login">ログイン</button>
    </div>
    {{userName}}
    {{userOU}}
    {{errorCode}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "",
      userOU: [],
      errorCode: "",
      params: "",
      samAccountName: "",
      password: "",
      isError: false,
    };
  },
  methods: {
    login() {
      const path = "http://localhost:8080/api/auth";
      this.params = new URLSearchParams();
      this.params.append("samAccountName", this.samAccountName);
      this.params.append("password", this.password);
      axios
        .post(path, this.params)
        .then((response) => {
          if (response.data[0][0] !== "error") {
            this.userName = response.data.find(
              (item) => item[0] === "DisplayName"
            )[1];
            this.userOU = response.data.find((item) => item[0] === "OU");
            this.userOU.shift();
            this.errorCode = "";
            this.isError = false;
          } else {
            this.errorCode = response.data[1][0];
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
};
</script>

<style>
.header {
  text-align: left;
}
.logo {
  width: 50px;
  height: 50px;
}
div {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
tr {
  height: 3em;
}
.login-error {
  color: red;
}
</style>
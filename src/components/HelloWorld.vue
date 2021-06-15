<template>
  <div>{{ people }}</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      people: [],
      params: "",
      samAccountName: "yuusuke_akashi",
      password: "p@ssw0rd"
    };
  },
  methods: {
    postPerson() {
      const path = "http://localhost:8080/api/auth";
      this.params = new URLSearchParams();
      this.params.append("samAccountName", this.samAccountName);
      this.params.append("password", this.password);
      axios
        .post(path, this.params)
        .then((response) => {
          this.people = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.postPerson();
  },
};
</script>
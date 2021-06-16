<template>
  <div id="app">
    <Header v-if="path !== '/login'" />
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  data() {
    return {
      path: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    createPageTitle(to) {
      if (to.path === "/login") {
        document.title = "ログイン";
      } else if (to.meta.title) {
        var setTitle = to.meta.title + " | IACSOLポータルサイト";
        document.title = setTitle;
      } else {
        document.title = "IACSOLポータルサイト";
      }
    },
  },
  mounted() {
    var to = this.$route;
    this.path = to.path;
    this.createPageTitle(to);
  },
  watch: {
    $route(to) {
      this.path = to.path;
      this.createPageTitle(to);
    },
  },
};
</script>
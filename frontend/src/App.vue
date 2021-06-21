<template>
  <div id="app">
    <div v-bind:class="{'wrapper': this.$route.path !== '/login'}">
      <MyHeader v-if="this.$route.path !== '/login'"></MyHeader>
      <MyAside v-if="this.$route.path !== '/login'"></MyAside>
      <div v-bind:class="{'content-wrapper': this.$route.path !== '/login'}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from "./components/MyHeader";
import MyAside from "./components/MyAside";

export default {
  name: "app",
  components: {
    MyHeader,
    MyAside,
  }
};
</script>
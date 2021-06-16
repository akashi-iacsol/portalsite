import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'va/lib/css'    // 追記
import 'va/lib/script' // 追記

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

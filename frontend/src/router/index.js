import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MasterMaintenance from '../views/MasterMaintenance.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mastermaintenance',
    name: 'MasterMaintenance',
    component: MasterMaintenance
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

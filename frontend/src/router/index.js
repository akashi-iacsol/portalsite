import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MasterMaintenance from '../views/MasterMaintenance.vue'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
// import store from "../store/index.js";


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
  {
    path: '/portal',
    name: 'Portal',
    component: () => import(/* webpackChunkName: "about" */ '../views/Portal.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/empMaintenance',
    name: 'EmpMaintenance',
    component: () => import('../views/EmpMaintenance.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login' && !store.state.isLogin) {
//     next('/login')
//   } else {
//     next();
//   }
// })

export default router

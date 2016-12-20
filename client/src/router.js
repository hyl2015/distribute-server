/**
 * Created by hyl on 16/10/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'index',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
]


const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'index22') {
    next('home')
  } else {
    next()
  }
})


export default router

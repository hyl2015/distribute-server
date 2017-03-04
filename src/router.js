/**
 * Created by hyl on 16/10/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from './containers/Login.vue'
import Home from './containers/Home.vue'
import Resources from './containers/Resources.vue'
import Publish from './containers/Publish.vue'
import NotFoundPage from './containers/NotFoundPage.vue'
import HomeTemplate from './containers/HomeTemplate.vue'
import userApi from './api/user'
Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'index',
    component: Login
  },
  {
    path: '/home',
    component: HomeTemplate,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/resources',
        component: Resources
      },
      {
        path: '/publish',
        component: Publish
      }
    ]
  },
  {
    path: '*',
    component: NotFoundPage
  }
]


const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'index') {
    userApi.isLogin().then(() => next('home'), () => next())
  } else {
    userApi.isLogin().then(() => next(), () => next('/'))
  }
})


export default router

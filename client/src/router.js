/**
 * Created by hyl on 16/10/25.
 */
import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";
import Resources from "./components/Resources.vue";
import Publish from "./components/Publish.vue";
import NotFoundPage from "./components/NotFoundPage.vue";
import HomeTemplate from "./components/HomeTemplate.vue";
import userApi from "./api/user";
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
        component: Resources,
        alias: '/resource' //利用别名  别名不能和 path 一样。
      },
      {
        path: '/publish-r',
        component: Publish,
        alias: '/publish' //利用别名  别名不能和 path 一样。
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

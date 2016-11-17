/**
 * Created by hyl on 16/10/25.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
Vue.use(Router)


const Home = {template: '<div><h1>Home</h1><router-view></router-view></div>'}
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}
const Baz = {template: '<div>baz</div>'}

const routes = [
  {
    path: '/home', component: Home,
    children: [
      // absolute alias
      {path: 'foo', component: Foo, alias: '/foo'},
      // relative alias (alias to /home/bar-alias)
      {path: 'bar', component: Bar, alias: 'bar-alias'},
      // multiple aliases
      {path: 'baz', component: Baz, alias: ['/baz', 'baz-alias']}
    ]
  }
]


const router = new Router({
  mode: 'history',
  routes
})


export default router

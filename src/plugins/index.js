/**
 * Created by hyl on 2016/12/21.
 */
import storeInject from './store-inject'
import './http-interceptors'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import Vuelidate from 'vuelidate'
import registerFilters from '../filters'


Vue.use(Vuelidate)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '4px'
})
registerFilters(Vue)

Vue.use(storeInject)

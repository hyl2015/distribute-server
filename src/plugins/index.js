/**
 * Created by hyl on 2016/12/21.
 */
import storeInject from './store-inject'
import './http-interceptors'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '4px'
})

Vue.use(storeInject)

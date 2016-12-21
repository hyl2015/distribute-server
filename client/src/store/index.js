/**
 * Created by hyl on 16/10/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import app from './app'

import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app
  },
  plugins: [createLogger()]
})
export default store




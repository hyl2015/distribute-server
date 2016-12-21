/**
 * Created by hyl on 16/10/25.
 */

import {APP_REQUEST_COUNT_DECREMENT, APP_REQUEST_COUNT_INCREMENT, APP_HTTP_ERROR_NORMAL} from '../mutation-types'
import actions from './actions'
import getters from './getters'

const user = {
  state: {
    requestCount: 0,
    httpError: null
  },
  mutations: {
    [APP_REQUEST_COUNT_DECREMENT] (state) {
      if (state.requestCount > 0) {
        state.requestCount--
      }
    },
    [APP_REQUEST_COUNT_INCREMENT] (state) {
      state.requestCount++
    },
    [APP_HTTP_ERROR_NORMAL] (state, msg) {
      state.httpError = msg
    }
  },
  actions,
  getters
}


export default user

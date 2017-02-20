/**
 * Created by hyl on 16/10/25.
 */
import {
  APP_REQUEST_COUNT_DECREMENT,
  APP_REQUEST_COUNT_INCREMENT,
  APP_HTTP_ERROR_NORMAL,
  APP_TITLE
} from "../mutation-types"
import actions from "./actions"
import getters from "./getters"

const user = {
  state: {
    requestCount: 0,
    httpError: null,
    appTitle: '首页'
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
    },
    [APP_TITLE] (state, title) {
      state.appTitle = title
    }
  },
  actions,
  getters
}


export default user

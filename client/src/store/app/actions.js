/**
 * Created by hyl on 16/10/25.
 */
import {APP_REQUEST_COUNT_INCREMENT, APP_REQUEST_COUNT_DECREMENT, APP_HTTP_ERROR_NORMAL} from '../mutation-types'
import {ACTION_APP_HTTP_START, ACTION_APP_HTTP_END, ACTION_APP_HTTP_ERROR_NORMAL} from '../action-types'

export default  {
  [ACTION_APP_HTTP_START]: ({commit}) => {
    commit(APP_REQUEST_COUNT_INCREMENT)
  },
  [ACTION_APP_HTTP_END]: ({commit}) => {
    commit(APP_REQUEST_COUNT_DECREMENT)
  },
  [ACTION_APP_HTTP_ERROR_NORMAL]: ({commit}, msg) => {
    commit(APP_HTTP_ERROR_NORMAL, msg)
    setTimeout(function () {
      commit(APP_HTTP_ERROR_NORMAL, null)
    }, 3000)
  },
}

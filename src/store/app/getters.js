/**
 * Created by hyl on 16/10/25.
 */
import {
  GET_APP_REQUEST_COUNT,
  GET_APP_HTTP_ERROR,
  GET_APP_TITLE,
  GET_APP_TOAST_MSG
} from '../getter-types'


export default  {
  [GET_APP_REQUEST_COUNT]: (state, getters) => state.requestCount,
  [GET_APP_HTTP_ERROR]: (state, getters) => state.httpError,
  [GET_APP_TITLE]: (state, getters) => state.appTitle,
  [GET_APP_TOAST_MSG]: (state, getters) => state.toastMsg
}


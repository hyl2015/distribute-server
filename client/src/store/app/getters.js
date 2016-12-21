/**
 * Created by hyl on 16/10/25.
 */

import {GET_APP_REQUEST_COUNT, GET_APP_HTTP_ERROR} from '../getter-types'


export default  {
  [GET_APP_REQUEST_COUNT]: (state, getters) => state.requestCount,
  [GET_APP_HTTP_ERROR]: (state, getters) => state.httpError
}


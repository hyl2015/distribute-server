/**
 * Created by wolf on 17/01/15.
 */

import {GET_PUBLISH_LIST, GET_PUBLISH_LIST_TOTAL, GET_PUBLISH_LIST_CURRENT} from '../getter-types'


export default  {
  [GET_PUBLISH_LIST]: (state, getters) => {
    return state.list
  },
  [GET_PUBLISH_LIST_TOTAL]: (state, getters) => {
    return state.total
  },
  [GET_PUBLISH_LIST_CURRENT]: (state, getters) => {
    return state.current
  }
}


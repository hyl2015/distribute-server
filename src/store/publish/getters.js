/**
 * Created by wolf on 17/01/15.
 */
import {
  GET_RES_VERSION_LIST,
  GET_RES_VERSION_PAGINATION
} from '../getter-types'


export default  {
  [GET_RES_VERSION_LIST]: (state, getters) => {
    return state.resVersionList
  },
  [GET_RES_VERSION_PAGINATION]: (state, getters) => {
    return state.resVersionListPagination
  }
}


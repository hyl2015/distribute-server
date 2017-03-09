/**
 * Created by wolf on 17/01/15.
 */
import {
  RES_VERSION_LIST,
  RES_VERSION_PAGINATION
} from '../mutation-types'
import {
  ACTION_RES_VERSION_LIST,
  ACTION_RES_VERSION_PAGINATION
} from '../action-types'

export default  {
  [ACTION_RES_VERSION_LIST]: ({commit}, list) => {
    commit(RES_VERSION_LIST, list)
  },
  [ACTION_RES_VERSION_PAGINATION]: ({commit}, pagination) => {
    commit(RES_VERSION_PAGINATION, pagination)
  }
}

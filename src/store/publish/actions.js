/**
 * Created by wolf on 17/01/15.
 */
import {PUBLISH_LIST} from '../mutation-types'
import {ACTION_PUBLISH_LIST} from '../action-types'

export default  {
  [ACTION_PUBLISH_LIST]: ({commit}, list) => {
    commit(PUBLISH_LIST, list)
  }
}

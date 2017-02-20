/**
 * Created by hyl on 16/10/25.
 */
import {USER_INFO} from '../mutation-types'
import {ACTION_USER_INFO} from '../action-types'

export default  {
  [ACTION_USER_INFO]: ({commit}, info) => {
    commit(USER_INFO, info)
  }
}

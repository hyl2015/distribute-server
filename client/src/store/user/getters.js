/**
 * Created by hyl on 16/10/25.
 */

import {GET_USER_INFO} from '../getter-types'


export default  {
  [GET_USER_INFO]: (state, getters) => {
    return state.info
  }
}


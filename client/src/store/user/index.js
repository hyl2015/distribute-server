/**
 * Created by hyl on 16/10/25.
 */

import {USER_INFO} from '../mutation-types'
import actions from './actions'
import getters from './getters'

const user = {
  state: {
    info: {
      name: 'hhhylll'
    }
  },
  mutations: {
    [USER_INFO] (state, info) {
      state.info = info
    }
  },
  actions,
  getters
}


export default user

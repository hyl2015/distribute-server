/**
 * Created by hyl on 16/10/25.
 */

import {USER_INFO} from '../mutations'
import * as actions from './actions'
import * as getters from './getters'

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

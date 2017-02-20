/**
 * Created by wolf on 17/01/15.
 */

import {PUBLISH_LIST} from '../mutation-types'
import actions from './actions'
import getters from './getters'

const publish = {
  state: {
    list: [],
    total: 1,
    current: 1
  },
  mutations: {
    [PUBLISH_LIST] (state, list) {
      state.list = list
      state.total = list.length
    }
  },
  actions,
  getters
}


export default publish

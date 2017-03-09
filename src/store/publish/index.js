/**
 * Created by wolf on 17/01/15.
 */
import {
  RES_VERSION_LIST,
  RES_VERSION_PAGINATION
} from '../mutation-types'
import actions from './actions'
import getters from './getters'

const publish = {
  state: {
    resVersionList: [],
    resVersionListPagination: {
      page: 1,
      pageSize: 20,
      total: 0
    }
  },
  mutations: {
    [RES_VERSION_LIST] (state, list) {
      state.resVersionList = list
    },
    [RES_VERSION_PAGINATION] (state, pagination) {
      state.resVersionListPagination = Object.assign(state.resVersionListPagination, pagination)
    }
  },
  actions,
  getters
}


export default publish

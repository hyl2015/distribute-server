/**
 * Created by wolf on 17/01/15.
 */
import {ACTION_PUBLISH_LIST} from '../store/action-types'
import store from '../store'
import lokka from '../plugins/lokka-client'
import {
  QUERY_RES_CREATE_INFO
} from './queries/ResQuery'

export default {
  getList () {
    store.dispatch(ACTION_PUBLISH_LIST, [
      {
        time: '2017/01/15',
        version: '0.0.1'
      }
    ])
  },
  getCreateInfo() {
    return lokka.query(QUERY_RES_CREATE_INFO, null, {loading: true}).then((data) => {
      return Promise.resolve(data)
    }).catch(() => Promise.reject())
  }
}

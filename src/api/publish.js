/**
 * Created by wolf on 17/01/15.
 */
import axios from 'axios'
import {ACTION_PUBLISH_LIST} from '../store/action-types'
import store from '../store'

export default {
  getList () {
    store.dispatch(ACTION_PUBLISH_LIST, [
      {
        time: '2017/01/15',
        version: '0.0.1'
      }
    ])
  }
}

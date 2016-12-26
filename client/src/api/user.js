/**
 * Created by hyl on 2016/12/20.
 */
import axios from 'axios'
import store from '../store'
import {ACTION_USER_INFO} from '../store/action-types'

export default {
  login (userName, userPwd) {
    return axios.post('api/user/login', {
      userName,
      userPwd
    }, {
      loading: true
    }).then(function (data) {
      store.dispatch(ACTION_USER_INFO, data)
      return Promise.resolve()
    })
  }
}

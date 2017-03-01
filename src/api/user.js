/**
 * Created by hyl on 2016/12/20.
 */
import axios from 'axios'
import {ACTION_USER_INFO} from '../store/action-types'
import store from '../store'
import {GET_USER_INFO} from '../store/getter-types'
import {TOKEN_STORAGE} from '../common/constants'
import lscache from 'lscache'
import lokka from '../plugins/lokka-client'

export default {
  login (userName, userPwd) {
    return axios.post('api/user/login', {
      userName,
      userPwd
    }, {
      loading: true
    }).then((data) => {
      lscache.set(TOKEN_STORAGE, data.token)
      store.dispatch(ACTION_USER_INFO, data.user)
      return Promise.resolve()
    }).catch(() => Promise.reject())
  },
  isLogin () {
    if (store.getters[GET_USER_INFO]) {
      return Promise.resolve()
    }
    
    return lokka.query(`
            {
              login{
                id
                nickName
                permission{
                  menus{
                    menuName
                    menuUrl
                    menuIcon
                  }
                }

              }
             }
      `, null, {loading: true}).then((data) => {
      store.dispatch(ACTION_USER_INFO, data.login)
      return Promise.resolve()
    }).catch(() => Promise.reject())
    
  }
}

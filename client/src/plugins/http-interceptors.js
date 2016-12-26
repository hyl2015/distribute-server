/**
 * Created by Hyl on 16/5/19.
 */
import {TOKEN_STORAGE, SERVER_ADDRESS, PRODUCT_SERVER} from '../common/constants'
import lscache from 'lscache'
import axios from 'axios'
import store from '../store'
import * as errorCodes from '../common/error-codes'
import {ACTION_APP_HTTP_END, ACTION_APP_HTTP_START, ACTION_APP_HTTP_ERROR_NORMAL} from '../store/action-types'


if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = PRODUCT_SERVER
} else {
  axios.defaults.baseURL = SERVER_ADDRESS
}
/**
 * 处理HTTP错误,如果没有预定义函数则返回False
 * @param response
 * @param data
 * @returns {boolean}
 */
const errorHandle = (response, data = {}) => {
  if (response instanceof Error) {
    store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, '网络无法连接,请稍后重试')
  } else if (response.status && response.status !== 200) {
    store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, '服务器开小差了,请稍后重试')
  } else {
    let code = data.code
    switch (code) {
      default:
        store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, data.errMsg)
    }
  }
}

axios.interceptors.request.use(function (request) {
  request.headers['Access-Token'] = lscache.get(TOKEN_STORAGE)
  if (request.loading) {
    store.dispatch(ACTION_APP_HTTP_START)
  }
  return request
})
axios.interceptors.response.use(function (response) {
  if (response.config.loading) {
    store.dispatch(ACTION_APP_HTTP_END)
  }
  let data = response.data
  if (data.code !== errorCodes.HTTP_RESPONSE_CODE_SUCCESS) {
    errorHandle(response, data)
    return Promise.reject(data)
  } else {
    return data
  }
}, function (error) {
  store.dispatch(ACTION_APP_HTTP_END)
  errorHandle(error)
  return Promise.reject(error)
})

/**
 * Created by hyl on 2017/3/1.
 */
import Lokka from 'lokka'
import HttpTransport from 'lokka-transport-http'
import {
  TOKEN_STORAGE,
  SERVER_ADDRESS,
  PRODUCT_SERVER
} from '../common/constants'
import lscache from 'lscache'
import store from '../store'
import {
  ACTION_APP_HTTP_START,
  ACTION_APP_HTTP_END,
  ACTION_APP_HTTP_ERROR_NORMAL
} from '../store/action-types'

let graphqlUrl = null
if (process.env.NODE_ENV === 'production') {
  graphqlUrl = `${PRODUCT_SERVER}api/graphql`
} else {
  graphqlUrl = `${SERVER_ADDRESS}api/graphql`
}

const errorHandle = (status, data = {}) => {

  switch (status) {
    case 200:
      let code = data.code
      switch (code) {
        default:
          store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, data.errMsg)
      }
      break
    case 401:
      store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, '用户未登录')
      break
    default:
      store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, '服务器开小差了,请稍后重试')
      break
  }
}

const client = new Lokka({
  transport: new HttpTransport(graphqlUrl, {
    headers: {'Authorization': lscache.get(TOKEN_STORAGE)}
  })
})


export  default {
  query({queryStr, args}, config) {
    if (config.loading) {
      store.dispatch(ACTION_APP_HTTP_START)
    }
    return client.query(queryStr, args).then((result) => {
      if (config.loading) {
        store.dispatch(ACTION_APP_HTTP_END)
      }
      if (result.error) {
        errorHandle(200, result.error)
        return Promise.reject(result)
      }
      return Promise.resolve(result)
    }).catch((errorMsg) => {
      const reg = /code:\s*([\d]+)/g
      reg.test(errorMsg)
      errorHandle(Number.parseInt(RegExp.$1))
      return Promise.reject(result)
    })
  }
}

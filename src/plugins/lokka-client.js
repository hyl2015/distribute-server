/**
 * Created by hyl on 2017/3/1.
 */
import Lokka from 'lokka'
import HttpTransport from 'lokka-transport-http'
import {
  SERVER_ADDRESS,
  PRODUCT_SERVER
} from '../common/constants'
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

const errorHandle = (error) => {
  
  const message = error.message
  let errMsg
  let code
  let status = 200
  try {
    const tmpObj = JSON.parse(message)
    code = tmpObj.code
    errMsg = tmpObj.message
    
  } catch (e) {
    const reg = /code:\s*([\d]+)/g
    reg.test(message)
    status = Number.parseInt(RegExp.$1)
  }
  switch (status) {
    case 200:
      switch (code) {
        default:
          store.dispatch(ACTION_APP_HTTP_ERROR_NORMAL, errMsg)
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
    handleErrors: (errors, data) => {
      const error = errors[0]
      throw new Error(JSON.stringify(error))
    }
  })
})


export  default {
  query(queryStr, vars, config) {
    if (config.loading) {
      store.dispatch(ACTION_APP_HTTP_START)
    }
    return client.query(queryStr, vars).then((result) => {
      if (config.loading) {
        store.dispatch(ACTION_APP_HTTP_END)
      }
      if (result.error) {
        errorHandle(200, result.error)
        return Promise.reject(result)
      }
      return Promise.resolve(result)
    }).catch((error) => {
      errorHandle(error)
      return Promise.reject()
    })
  },
  mutate(mutationStr, vars, config) {
    if (config.loading) {
      store.dispatch(ACTION_APP_HTTP_START)
    }
    
    return client.mutate(mutationStr, vars).then((result) => {
      if (config.loading) {
        store.dispatch(ACTION_APP_HTTP_END)
      }
      if (result.error) {
        errorHandle(200, result.error)
        return Promise.reject(result)
      }
      return Promise.resolve(result)
    }).catch((error) => {
      errorHandle(error)
      return Promise.reject()
    })
  }
}

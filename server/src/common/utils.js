/**
 * Created by hyl on 2016/12/26.
 */
import {HTTP_ERROR} from './http-constants'
export const success = (replay, data) => {
  return replay({
    code: HTTP_ERROR.SUCCESS.code,
    data: data
  })
}

export const error = (replay, errorObj) => {
  return replay({
    code: errorObj.code,
    errMsg: errorObj.msg
  })
}
export const graphqlError = (code, message) => {
  return Promise.reject({
    code,
    message
  })
}

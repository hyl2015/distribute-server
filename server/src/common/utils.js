/**
 * Created by hyl on 2016/12/26.
 */
import {HTTP_ERROR} from './http-constants'
import cache from './cache'
import Config from '../graphql/models/Config'

import {
  RES_MAX_PATCH_VERSION,
  SYS_CONFIG_CACHE
} from './constants'
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
export const graphqlError = ({code, msg}) => {
  return Promise.reject({
    code,
    message: msg
  })
}


export const getResMaxPatchVersion = () => {
  const sysConfig = cache.get(SYS_CONFIG_CACHE)
  return sysConfig && sysConfig['config.res.max.ver'] != null ? sysConfig['config.res.max.ver'] : RES_MAX_PATCH_VERSION
}

export const reSetSysCache = () => {
  return Config.forge().fetchAll().then((configs) => {
    const cfgObj = {}
    configs.forEach((cfg) => {
      cfgObj[cfg.get('key')] = cfg.get('value')
    })
    cache.set(SYS_CONFIG_CACHE, cfgObj)
    return Promise.resolve()
  })
}


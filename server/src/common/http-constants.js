/**
 * Created by hyl on 2016/12/26.
 */
export const HTTP_ERROR = {
  SUCCESS: {
    code: 0,
    msg: ''
  },
  SERVER_ERROR: {
    code: -1,
    msg: '服务器出错～'
  },
  USER_NOT_EXISTS: {
    code: 10000,
    msg: '用户名或密码错误'
  },
  CONFIG_RN_PATH_NOT_EXISTS: {
    code: 30001,
    msg: '请配置rn目录'
  },
  RES_PUBLISH_RN_PATH_NOT_EXISTS: {
    code: 20001,
    msg: 'rn项目目录不存在！'
  },
}

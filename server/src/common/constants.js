/**
 * Created by hyl on 2016/12/26.
 */

//版本状态：0 创建，1 打包完成，2 上线，3 下线
export const RES_VERSION_STATUS = {
  CREATED: 0,
  PACKAGED: 1,
  ONLINE: 2,
  OFFLINE: 3
}

export const PLATFORMS = {
  ALL: 0,
  IOS: 1,
  ANDROID: 2
}

export const SYS_CONFIG_CACHE = 'SYS_CONFIG_CACHE'
//资源更新相差最大版本
export const RES_MAX_PATCH_VERSION = 10

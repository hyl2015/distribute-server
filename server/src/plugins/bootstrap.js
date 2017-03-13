/**
 * Created by Hyl on 2016/11/17.
 */
import {reSetSysCache} from '../common/utils'

/**
 * 系统启动时加载必要缓存
 */

const bootstrap = (plugin, options, next) => {
  reSetSysCache().then(next)
}
bootstrap.attributes = {
  name: 'bootstrap'
}
module.exports = bootstrap

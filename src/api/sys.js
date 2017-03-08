/**
 * Created by hyl on 2016/12/20.
 */
import lokka from '../plugins/lokka-client'
import {
  QUERY_SYS_CONFIGS,
  MUTATION_SYS_CONFIGS
} from './queries/SysQuery'


export default {
  getConfigs () {
    return lokka.query(QUERY_SYS_CONFIGS, null, {loading: true}).then((data) => {
      const configs = data.sys.configs
      
      const configObj = {}
      
      for (const config of configs) {
        configObj[config.key] = config.value
        configObj[config.key + '_id'] = config.id
      }
      return Promise.resolve(configObj)
    }).catch(() => Promise.reject())
  },
  updateConfigs (cfgs) {
    return lokka.mutate(MUTATION_SYS_CONFIGS, {
      cfgs
    }, {loading: true}).then((data) => {
      return Promise.resolve(data)
    }).catch(() => Promise.reject())
  }
}

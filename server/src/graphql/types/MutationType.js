/**
 * Created by hyl on 2017/2/27.
 */
import {updateConfig} from '../mutations/sysConfig'
export default {
  name: 'Mutation',
  typeStr: `
    type Mutation {
      sys_updateConfigs(cfgs:String): Boolean
    }`,
  resolvers: {
    sys_updateConfigs: updateConfig
    
  }
}

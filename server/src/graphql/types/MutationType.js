/**
 * Created by hyl on 2017/2/27.
 */
import {updateConfig} from '../mutations/sysConfig'
import {createNewVer} from '../mutations/res'
export default {
  name: 'Mutation',
  typeStr: `
    type Mutation {
      sys_updateConfigs(cfgs:String): Boolean
      
      res_createNewVer(preVer:Int,verName:String,notes:String,gitBranch:String): Boolean
    }`,
  resolvers: {
    sys_updateConfigs: updateConfig,
    res_createNewVer: createNewVer
  }
}

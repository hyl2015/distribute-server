/**
 * Created by hyl on 2017/2/27.
 */
import {updateConfig} from '../mutations/sysConfig'
import {createNewVer,packaging,online,remove,offline} from '../mutations/res'
export default {
  name: 'Mutation',
  typeStr: `
    type Mutation {
      sys_updateConfigs(cfgs:String): Boolean
      
      res_createNewVer(preVer:Int,verName:String,notes:String,gitBranch:String): Boolean
      res_verPackaging(id: Int): ResVersion
      res_verOnLine(id: Int): Int
      res_verOffLine(id: Int): Int
      res_verRemove(id: Int): Boolean
    }`,
  resolvers: {
    sys_updateConfigs: updateConfig,
    res_createNewVer: createNewVer,
    res_verPackaging: packaging,
    res_verOnLine: online,
    res_verOffLine: offline,
    res_verRemove: remove,
  }
}

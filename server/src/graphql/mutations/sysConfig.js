/**
 * Created by hyl on 2017/3/7.
 */
import _ from 'lodash'
import Configs from '../collections/Configs'

export const updateConfig = (modelInstance, {cfgs}, context, info) => {
  
  const cfgObj = JSON.parse(cfgs)
  const vals = _.keys(cfgObj).filter((key) => !key.endsWith('_id'))
  
  const cols = []
  
  for (const key of vals) {
    cols.push({
      id: cfgObj[key + '_id'],
      key,
      value: cfgObj[key]
    })
  }
  
  return Configs.forge(cols).invokeThen('save').then(function (result) {
    return true
  })
}

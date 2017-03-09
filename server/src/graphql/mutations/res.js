/**
 * Created by hyl on 2017/3/7.
 */
import ResVersion from '../models/ResVersion'

export const createNewVer = (modelInstance, {verName, notes, preVer, gitBranch}, context, info) => {
  return new ResVersion({
    ver: verName,
    notes,
    preId: preVer,
    gitVer: gitBranch
  }).save().then(function () {
    return true
  })
}

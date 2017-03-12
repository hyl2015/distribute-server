/**
 * Created by hyl on 2017/3/7.
 */
import ResVersion from '../models/ResVersion'
import Config from '../models/Config'
import shell from 'shelljs'
import {graphqlError} from '../../common/utils'
import {HTTP_ERROR} from '../../common/http-constants'
import Build from '../../scripts/Build'
import {RES_VERSION_STATUS, PLATFORMS} from '../../common/constants'

export const createNewVer = (modelInstance, {verName, notes, preVer, gitBranch, platform}, context, info) => {
  return new ResVersion({
    ver: verName,
    notes,
    platform,
    preId: preVer,
    gitVer: gitBranch
  }).save().then(function () {
    return true
  })
}
export const online = (modelInstance, {id}, context, info) => {
  return ResVersion.forge({
    id
  }).save({
    status: RES_VERSION_STATUS.ONLINE
  }).then(function (result) {
    return RES_VERSION_STATUS.ONLINE
  })
}

export const offline = (modelInstance, {id}, context, info) => {
  return ResVersion.forge({
    id
  }).save({
    status: RES_VERSION_STATUS.OFFLINE
  }).then(function (result) {
    return RES_VERSION_STATUS.OFFLINE
  })
}

export const remove = (modelInstance, {id}, context, info) => {
  return ResVersion.forge({
    id
  }).destroy().then(function (result) {
    return true
  })
}

export const packaging = (modelInstance, {id}, context, info) => {

  return Config.forge().where('key', 'in', ['config.rn.dir',
    'config.resource.dir'
  ]).fetchAll().then((configs) => {
    let resDir = ''
    let rnDir = ''
    configs.forEach((cfg) => {
      const key = cfg.get('key')
      const value = cfg.get('value')
      if (key === 'config.rn.dir') {
        rnDir = value
      } else {
        resDir = value
      }
    })
    if (!resDir || !shell.test('-e', resDir)) {
      return graphqlError(HTTP_ERROR.RES_PUBLISH_RES_PATH_NOT_EXISTS)
    }

    return ResVersion.forge({
      id
    }).fetch().then((version) => {
      const gitVer = version.get('gitVer')
      const platform = version.get('platform')
      const commitId = gitVer.split('_')[1]
      shell.cd(rnDir)
      shell.exec(`git checkout -b res_ver${id} ${commitId}`)

      const build = new Build({
        inPath: rnDir,
        outPath: resDir,
        version: version.get('id'),
        preVersion: version.get('preId')
      })

      try {

        if (platform === PLATFORMS.ALL) {
          build.start(PLATFORMS.IOS)
          build.start(PLATFORMS.ANDROID)
        } else {
          build.start(platform)
        }

        version.set('status', RES_VERSION_STATUS.PACKAGED)
        return version.save().then(function (result) {
          return result.serialize()
        })
      } catch (e) {
        console.error(e)
        return graphqlError(HTTP_ERROR.RES_PUBLISH_RES_ERROR)
      } finally {
        shell.cd(rnDir)
        shell.exec(`git checkout .`)
        shell.exec(`git checkout master`)
        shell.exec(`git branch -D res_ver${id}`)
      }

    })
  })

}

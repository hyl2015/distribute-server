/**
 * Created by Hyl on 2016/11/17.
 */
import {success} from '../../common/utils'
import ResVersion from '../../graphql/models/ResVersion'
import cache from '../../common/cache'
import {
  SYS_CONFIG_CACHE,
  RES_MAX_PATCH_VERSION
} from '../../common/constants'
import Build from '../../scripts/Build'


export const checkVer = {
  auth: false,
  handler: function (request, reply) {
    const currentVer = Number.parseInt(request.params.version)
    
    ResVersion.forge().query(function (qb) {
      qb.where('status', '=', 2).where('id', '>', currentVer)
    }).orderBy('id', 'desc').fetchPage({
      limit: RES_MAX_PATCH_VERSION
    }).then(function (versions) {
      
      const ids = versions.map((ver) => {
        return ver.get('id')
      })
      if (ids.length === 0) {
        return success(reply, {
          isLatest: true
        })
      }
      const ver = ids[0]
      if (ver > currentVer) {
        
        const sysConfig = cache.get(SYS_CONFIG_CACHE)
        
        const build = new Build({
          inPath: sysConfig['config.rn.dir'],
          outPath: sysConfig['config.resource.dir'],
          version: ver,
          preVersion: currentVer
        })
        success(reply, build.getUpdateInfo(request.params.platform, currentVer, ids))
      } else {
        success(reply, {
          isLatest: true
        })
      }
    })
    
  }
}


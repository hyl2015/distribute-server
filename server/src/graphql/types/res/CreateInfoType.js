/**
 * Created by hyl on 2017/2/27.
 */
import shell from 'shelljs'
import {graphqlError} from '../../../common/utils'
import {HTTP_ERROR} from '../../../common/http-constants'
import {RES_VERSION_STATUS} from '../../../common/constants'
import Config from '../../models/Config'
import ResVersion from '../../models/ResVersion'

export default {
  name: 'ResCreateInfo',
  typeStr: `
  type ResCreateInfo {
    branches: [GitBranch]
    resVers: [ResVersion]
  }`,
  resolvers: {
    resVers: (modelInstance, args, context, info) => {
      return ResVersion.forge().where('status', '=', RES_VERSION_STATUS.ONLINE).fetchPage({
        pageSize: 5
      }).then(function (rets) {
        return rets.serialize()
      })
    },
    branches: (modelInstance, args, context, info) => {
      return Config.forge({
        key: 'config.rn.dir'
      }).fetch().then(function (data) {
        
        if (!data) {
          return graphqlError(HTTP_ERROR.RES_PUBLISH_RN_PATH_NOT_EXISTS)
        }
        
        const path = data.get('value')
        
        if (!path || !shell.test('-e', path)) {
          return graphqlError(HTTP_ERROR.RES_PUBLISH_RN_PATH_NOT_EXISTS)
        }
        
        shell.cd(path)
        return new Promise(function (resolve, reject) {
          const gitShell = 'git rev-parse'
          
          shell.exec(`git branch | sed 's/[*]//g' | xargs -t ${gitShell}`, function (code, stdout, stderr) {
            // if (stderr && stderr.length > 0) {
            //   return reject(stderr)
            // }
            const bArr = stdout.split('\n')
            // const shellStr = stderr
            const branchNames = stderr.substr(gitShell.length + 1).trim().split(/\s/)
            const branches = []
            for (let i = 0; i < branchNames.length; i++) {
              branches.push({
                name: branchNames[i],
                id: branchNames[i] + '_' + bArr[i]
              })
            }
            return resolve(branches)
          })
        })
        
      })
    }
  }
}

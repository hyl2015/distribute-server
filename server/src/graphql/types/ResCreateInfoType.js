/**
 * Created by hyl on 2017/2/27.
 */
import shell from 'shelljs'
import {graphqlError} from '../../common/utils'
import {HTTP_ERROR} from '../../common/http-constants'
import Config from '../models/Config'
export default {
  name: 'ResCreateInfo',
  typeStr: `
  type ResCreateInfo {
    branches: [String]
  }`,
  resolvers: {
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
          shell.exec('git branch', function (code, stdout, stderr) {
            if (stderr && stderr.length > 0) {
              return reject(stderr)
            }
            const branches = stdout.split('\n').map((branch) => {
              branch = branch.replace(/[*\s]/g, '')
              return branch.length === 0 ? undefined : branch
            }).filter((branch) => branch)
            return resolve(branches)
          })
        })
        
      })
    }
  }
}

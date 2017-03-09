/**
 * Created by hyl on 2017/2/27.
 */
import MenuType from './MenuType'
import UserType from './UserType'
import ConfigType from './ConfigType'
import PermissionType from './PermissionType'
import ResType from './ResType'
import VersionPagination from './res/VersionPagination'
import ResCreateInfoType from './res/CreateInfoType'
import GitBranchType from './res/GitBranchType'
import VersionType from './res/VersionType'
import SysType from './SysType'
import Query from './QueryType'
import MutationType from './MutationType'


const types = [
  VersionPagination,
  GitBranchType,
  ResCreateInfoType,
  SysType,
  ResType,
  VersionType,
  MenuType,
  UserType,
  ConfigType,
  PermissionType,
  MutationType,
  Query
]


const resolvers = {}


let typeStr = ``

for (const userType of types) {
  typeStr += userType.typeStr
  resolvers[userType.name] = userType.resolvers
}


export default {
  typeStr,
  resolvers
}

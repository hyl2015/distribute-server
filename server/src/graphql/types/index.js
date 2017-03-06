/**
 * Created by hyl on 2017/2/27.
 */
import MenuType from './MenuType'
import UserType from './UserType'
import ConfigType from './ConfigType'
import PermissionType from './PermissionType'
import Query from './QueryType'
import MutationType from './MutationType'


const types = [
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

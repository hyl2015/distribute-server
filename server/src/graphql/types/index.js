/**
 * Created by hyl on 2017/2/27.
 */
import MenuType from './MenuType'
import UserType from './UserType'
import PermissionType from './PermissionType'
import Query from './Query'


const types = [
  MenuType,
  UserType,
  PermissionType,
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

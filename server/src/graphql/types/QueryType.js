/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import User from '../models/User'
import Config from '../models/Config'

export default {
  name: 'Query',
  typeStr: `
    type Query {
      users: [User]
      base_isLogin: Boolean
      base_userInfo: User
      sys_configs: [Config]
    }`,
  resolvers: {
    users: graphQLBookshelf.resolverFactory(User),
    sys_configs: graphQLBookshelf.resolverFactory(Config),
    base_isLogin: (modelInstance, args, context, info) => {
      return User.forge({
        id: context.request.auth.credentials.id
      }).fetch().then(function (user) {
        if (user) {
          return true
        } else {
          throw new Error('用户不存在')
        }
      }, function (err) {
        throw new Error('查询出错')
      })
    },
    base_userInfo: (modelInstance, args, context, info) => {
      const id = context.request.auth.credentials.id
      const parentResolver = graphQLBookshelf.resolverFactory(User)
      return parentResolver(modelInstance, {id}, context, info)
    }
    
  }
}

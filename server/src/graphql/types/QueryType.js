/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import User from '../models/User'
import {graphqlError} from '../../common/utils'
import {HTTP_ERROR} from '../../common/http-constants'

export default {
  name: 'Query',
  typeStr: `
    type Query {
      users: [User]
      base_isLogin: Boolean
      base_userInfo: User
      sys: Sys
      res: Res      
    }`,
  resolvers: {
    users: graphQLBookshelf.resolverFactory(User),
    sys: () => ({}),
    res: () => ({}),
    base_isLogin: (modelInstance, args, context, info) => {
      return User.forge({
        id: context.request.auth.credentials.id
      }).fetch().then(function (user) {
        if (user) {
          return true
        } else {
          return graphqlError(HTTP_ERROR.USER_NOT_EXISTS)
        }
      }, function (err) {
        console.error(err)
        return graphqlError(HTTP_ERROR.SERVER_ERROR)
      })
    },
    base_userInfo: (modelInstance, args, context, info) => {
      const id = context.request.auth.credentials.id
      const parentResolver = graphQLBookshelf.resolverFactory(User)
      return parentResolver(modelInstance, {id}, context, info)
    }
  }
}

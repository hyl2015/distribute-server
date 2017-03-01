/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import User from '../models/user'

export default {
  name: 'Query',
  typeStr: `
    type Query {
      users: [User]
      login: User
    }`,
  resolvers: {
    users: graphQLBookshelf.resolverFactory(User),
    login: (modelInstance, args, context, info) => {
      const id = context.request.auth.credentials.id
      const parentResolver = graphQLBookshelf.resolverFactory(User)
      return parentResolver(modelInstance, {id}, context, info)
      // return graphqlError(110, '测试错误')
    }

  }
}

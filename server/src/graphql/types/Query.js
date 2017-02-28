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
      login(name:String,pwd: String): User
    }`,
  resolvers: {
    users: graphQLBookshelf.resolverFactory(User),
    login: (modelInstance, args, context, info) => {
      return User.forge({
        userName: args.name,
        userPwd: args.pwd
      }).fetch().then((user) => {
        return user.serialize()
      })
    }
  }
}

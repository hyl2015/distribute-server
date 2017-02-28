/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import User from '../models/user'


export default {
  name: 'User',
  typeStr: `
    type User {
      id: Int!
      nickName: String
      userName: String
      userPwd: String
      salt: String
      permission: Permission      
    }`,
  resolvers: {
    permission: graphQLBookshelf.resolverFactory(User)
  }
}

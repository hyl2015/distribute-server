/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import User from '../../orm/models/user'


export default {
  name: 'Query',
  typeStr: `
    type Query {
      users: [User]
    }`,
  resolvers: {
    users: graphQLBookshelf.resolverFactory(User)
  }
}

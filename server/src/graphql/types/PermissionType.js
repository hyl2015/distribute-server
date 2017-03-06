/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import Menu from '../models/Menu'

export default {
  name: 'Permission',
  typeStr: `
    type Permission {
      id: Int!
      name: String
      menus:[Menu]    
    }`,
  resolvers: {
    menus: graphQLBookshelf.resolverFactory(Menu)
  }
}

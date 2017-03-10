/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import ResVersion from '../../models/ResVersion'


export default {
  name: 'ResVersion',
  typeStr: `
    type ResVersion {
      id: Int!
      ver: String
      notes: String
      status: Int
      gitVer: String
      preId: Int!
      createdAt: String
      updatedAt: String
      preVersion: ResVersion      
    }`,
  resolvers: {
    preVersion: graphQLBookshelf.resolverFactory(ResVersion)
  }
}

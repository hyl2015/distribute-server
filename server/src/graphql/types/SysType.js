/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import Config from '../models/Config'
export default {
  name: 'Sys',
  typeStr: `
  type Sys {
    configs: [Config]
  }`,
  resolvers: {
    configs: graphQLBookshelf.resolverFactory(Config)
  }
}

/**
 * Created by hyl on 2017/2/27.
 */
import graphQLBookshelf from 'graphql-bookshelfjs'
import Config from '../models/Config'

export default {
  name: 'Mutation',
  typeStr: `
    type Mutation {
      sys_updateConfigs(cfgs:String): [Config]
    }`,
  resolvers: {
    sys_updateConfigs: graphQLBookshelf.resolverFactory(Config)
    
  }
}

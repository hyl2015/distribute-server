/**
 * Created by Hyl on 2016/11/17.
 */

import {graphqlHapi} from 'graphql-server-hapi'

const register = (plugin, options, next) => {
  graphqlHapi(plugin, options, next)
}
register.attributes = {
  name: 'graphql'
}
module.exports = register

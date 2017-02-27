/**
 * Created by hyl on 2017/2/27.
 */
import typeDef from '../server/src/graphql/types'
import graphQLBookshelf from 'graphql-bookshelfjs'
import Schema from 'graph.ql'

const schema = Schema(typeDef.typeStr, typeDef.resolvers)

const queryString = `
  {
    users{
      id
      permission{
        id
        name
        menus{
          menuName
        }
      }
    }
  }
`

schema(queryString, null, null, {loaders: graphQLBookshelf.getLoaders()}).then(function (result) {
  console.log(JSON.stringify(result, null, 4));
});

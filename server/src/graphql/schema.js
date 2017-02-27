/**
 * Created by hyl on 2017/2/27.
 */
import Schema from 'graph.ql'
import typeDef from './types'

const rootQuery = Schema(typeDef.typeStr, typeDef.resolvers)

export default rootQuery.schema

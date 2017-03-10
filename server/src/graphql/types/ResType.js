/**
 * Created by hyl on 2017/2/27.
 */
import ResVersion from '../models/ResVersion'
import graphQLBookshelf from 'graphql-bookshelfjs'
export default {
  name: 'Res',
  typeStr: `
  type Res {
    createInfo: ResCreateInfo
    versionList(page: Int,pageSize: Int): ResVersionPagination
    versionInfo(id: Int): ResVersion
  }`,
  resolvers: {
    createInfo: () => ({}),
    versionInfo: (modelInstance, {id}, context, info) => {
      const parentResolver = graphQLBookshelf.resolverFactory(ResVersion)
      return parentResolver(modelInstance, {id}, context, info)
    },
    versionList: (modelInstance, {page, pageSize}, context, info) => {
      return ResVersion.forge().fetchPage({
        page,
        pageSize
      }).then(function (result) {
        return {
          total: result.pagination.rowCount,
          listData: result.serialize()
        }
      })
    }
  }
}

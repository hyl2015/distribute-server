/**
 * Created by hyl on 2017/2/27.
 */
import ResVersion from '../models/ResVersion'
export default {
  name: 'Res',
  typeStr: `
  type Res {
    createInfo: ResCreateInfo
    versionList(page: Int,pageSize: Int): ResVersionPagination
  }`,
  resolvers: {
    createInfo: () => ({}),
    versionList: (modelInstance, {page, pageSize}, context, info) => {
      return ResVersion.forge().fetchPage({
        page,
        pageSize
      }).then(function (result) {
        return {
          total:result.pagination.rowCount,
          listData: result.serialize()
        }
      })
    }
  }
}

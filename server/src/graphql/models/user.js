/**
 * Created by hyl on 2016/12/15.
 */
import Permission from './permission'
import baseModel from './baseModel'

export default baseModel.extend({
  tableName: 'user',
  permission () {
    return this.belongsTo(Permission, 'permission_id')
  }
})

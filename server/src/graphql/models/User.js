/**
 * Created by hyl on 2016/12/15.
 */
import Permission from './Permission'
import baseModel from './BaseModel'

export default baseModel.extend({
  tableName: 'user',
  permission () {
    return this.belongsTo(Permission, 'permission_id')
  }
})

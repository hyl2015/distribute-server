/**
 * Created by hyl on 2016/12/15.
 */
import baseModel from './BaseModel'

export default baseModel.extend({
  tableName: 'res_version',
  preVersion () {
    return this.belongsTo(this, 'per_id')
  }
  
})

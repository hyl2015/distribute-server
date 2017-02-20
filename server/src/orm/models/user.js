/**
 * Created by hyl on 2016/12/15.
 */
module.exports = (baseModel, bookshelf) => {
    const Permission = require('./permission')(baseModel, bookshelf)

    return baseModel.extend({
        tableName: 'user',
        permission () {
            return this.belongsTo(Permission, 'permission_id')
        }
    })
}
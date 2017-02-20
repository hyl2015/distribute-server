/**
 * Created by hyl on 2016/12/15.
 */
module.exports = (baseModel, bookshelf) => {
    return baseModel.extend({
        tableName: 'sys_menu'
    })
}
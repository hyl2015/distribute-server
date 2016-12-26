/**
 * Created by hyl on 2016/12/15.
 */

module.exports = (baseModel, bookshelf) => {
    const Menu = require('./menu')(baseModel, bookshelf)
    return baseModel.extend({
        tableName: 'sys_permission',
        menus () {
            return this.belongsToMany(Menu, 'sys_permission_menu', 'permission_id', 'menu_id')
        }
    })
}
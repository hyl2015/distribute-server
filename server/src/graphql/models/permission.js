/**
 * Created by hyl on 2016/12/15.
 */
import Menu from './menu'
import baseModel from './baseModel'

export default baseModel.extend({
  tableName: 'sys_permission',
  menus () {
    return this.belongsToMany(Menu, 'sys_permission_menu', 'permission_id', 'menu_id')
  }
})

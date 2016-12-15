/**
 * Created by hyl on 2016/12/15.
 */
export default (baseModel, bookshelf) => {
    return baseModel.extend({
        tableName: 'users',
        roles: function () {
            return this.belongsToMany('Role')
        }
    })
}
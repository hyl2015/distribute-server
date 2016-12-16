/**
 * Created by hyl on 2016/12/15.
 */
module.exports = (baseCollection, bookshelf) => {
    return baseCollection.extend({
        model: bookshelf.model('User')
    })
}
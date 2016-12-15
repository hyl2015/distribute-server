/**
 * Created by hyl on 2016/12/15.
 */
export default function (bookshelf) {
    return bookshelf.Model.extend({
        hasTimestamps: true
    })
}
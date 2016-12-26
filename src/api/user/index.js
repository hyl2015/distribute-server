/**
 * Created by Hyl on 2016/11/17.
 */

import {success, error} from '../utils'
import {HTTP_ERROR} from '../http-constants'

export const login = {
    handler: function (request, reply) {
        const User = request.model('User')
        User.forge(request.payload).fetch({
            withRelated: ['permission.menus']
        }).then(function (user) {
            if (user) {
                success(reply, user)
            } else {
                error(reply, HTTP_ERROR.USER_NOT_EXISTS)
            }
        }, function (err) {
            console.error(err)
            error(reply, HTTP_ERROR.USER_NOT_EXISTS)
        })
    }
}

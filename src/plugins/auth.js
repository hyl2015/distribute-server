/**
 * Created by Hyl on 2016/11/17.
 */

import {SECRET_KEY} from '../api/constants'
exports.register = function (plugin, options, next) {

    plugin.auth.strategy('jwt', 'jwt', {
        key: SECRET_KEY, // Secret key
        verifyOptions: {
            algorithms: ['HS256']
        },
        // Implement validation function
        validateFunc: (decoded, request, callback) => {
            //TODO 解析用户，判断用户状态
            return callback(null, true)

        }
    })

    // Uncomment this to apply default auth to all routes
    //plugin.auth.default('jwt')

    next()
}

exports.register.attributes = {
    name: 'auth'
}
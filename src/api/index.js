/**
 * Created by Hyl on 2016/11/17.
 */

import * as Home from './home'

exports.register = (plugin, options, next) => {
    plugin.route([
        {method: 'GET', path: '/{version}', config: Home.hello},
        {method: 'GET', path: '/restricted', config: Home.restricted},
        {method: 'GET', path: '/{path*}', config: Home.notFound}
    ])

    next()
}

exports.register.attributes = {
    name: 'api'
}